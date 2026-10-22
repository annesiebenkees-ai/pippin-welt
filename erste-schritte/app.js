/* Pippins erste Schritte — App-Logik.
   Alles bleibt im Browser (localStorage). Kein Server, keine KI-Anfrage, kein Tracking.
   Einzige Ausnahme: das freiwillige E-Mail-Formular (Brevo, Double-Opt-in). */
(function () {
  'use strict';

  const SPEICHER = 'pippin-erste-schritte-v1';
  const BREVO = 'https://2c76cb73.sibforms.com/serve/MUIFAFU656RgTPB6d3xjXPtXtC-xKfY_82THn0k01jBZbhlyJoVAPK5jC4vLDi6MQQdDxJ88gk-gf8BAGDR2iOmKfo23XEIR_ZGPz3UhBTuG0BP3olNHXgHZUqBqT4eABt6_pS1KtzfqzeH6XJ9ZEyY0FepMcPfh_-epAUZmRXiB_d3c-xExYFcxtG4_j0EKGG4pWVpEafDd6zS5Gw==';
  const TEST = /[?&]test=1/.test(location.search); // Testmodus: ein Tag pro Check-in statt pro Kalendertag
  const app = document.getElementById('app');
  const W = INHALT.wege;

  /* ---------- Speicher ---------- */
  function laden() {
    try { return JSON.parse(localStorage.getItem(SPEICHER)) || neu(); } catch (e) { return neu(); }
  }
  function neu() { return { v: 1, antworten: {}, weg: null, start: null, logs: [], pausen: [], zuletzt: {} }; }
  function sichern() { try { localStorage.setItem(SPEICHER, JSON.stringify(S)); } catch (e) { /* privater Modus: läuft trotzdem, nur ohne Gedächtnis */ } }
  let S = laden();

  const heute = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const weg = () => W[S.weg];

  /* ---------- Nachtmodus: 20–6 Uhr gedimmt ---------- */
  function nachtmodus() {
    const h = new Date().getHours();
    const dunkel = h >= 20 || h < 6 || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    document.body.classList.toggle('nacht', dunkel);
    const m = document.querySelector('meta[name=theme-color]');
    if (m) m.content = dunkel ? '#241a20' : '#ead9ee';
  }
  nachtmodus(); setInterval(nachtmodus, 60000);

  /* ---------- Zufallsantwort, nie zweimal dieselbe hintereinander ---------- */
  function antwort(art) {
    const liste = INHALT.antworten[art];
    let i;
    do { i = Math.floor(Math.random() * liste.length); } while (liste.length > 1 && i === S.zuletzt[art]);
    S.zuletzt[art] = i; sichern();
    return liste[i];
  }

  /* ---------- Weg berechnen ---------- */
  function wegBerechnen(a) {
    const stand = {}; Object.keys(W).forEach((k) => (stand[k] = 0));
    Object.keys(INHALT.punkte).forEach((frage) => {
      const p = INHALT.punkte[frage][a[frage]] || {};
      Object.keys(p).forEach((k) => (stand[k] += p[k]));
    });
    let best = 'morgenmaus';
    Object.keys(W).forEach((k) => { if (stand[k] > stand[best]) best = k; });
    return best;
  }

  /* ---------- Bausteine ---------- */
  function kopf(rechts) {
    return '<div class="kopf"><img class="logo" src="img/logo.png" alt="Pippin">' + (rechts || '') + '</div>';
  }
  function fuss() {
    return '<div class="fuss"><p>' + esc(INHALT.hinweis) + '</p><p><a href="../impressum.html">Impressum</a> · <a href="../datenschutz.html">Datenschutz</a></p></div>';
  }
  function mausSagt(text) {
    return '<div class="maus-zeile"><img src="img/face.png" alt=""><div class="sprechblase" style="flex:1">' + text + '</div></div>';
  }
  function zeigen(html) {
    app.innerHTML = '<div class="einblenden">' + html + '</div>';
    window.scrollTo(0, 0);
  }
  function an(id, fn) { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); }

  /* ---------- Startseite ---------- */
  function start() {
    if (S.weg && S.start) return tagesansicht();
    zeigen(kopf() +
      '<div class="karte mitte">' +
      '<img class="maus-bild" src="img/face.png" alt="Pippin, die Maus" style="width:46%">' +
      '<h1>Welcher Windelfrei-Weg passt zu euch?</h1>' +
      '<p>Zehn kurze Fragen zu eurem echten Alltag. Dann zeigt dir die Mama-Maus euren Weg — und begleitet dich sieben Tage lang mit einem kleinen Schritt pro Tag.</p>' +
      '<p class="zitat">' + esc(INHALT.bauch) + '</p>' +
      '<button class="btn" id="los">Los geht\'s · 2 Minuten</button>' +
      '<p class="klein">🔒 ' + esc(INHALT.datenschutz) + '</p>' +
      '</div>' + fuss());
    an('los', () => frage(0));
  }

  /* ---------- Fragen ---------- */
  function frage(i) {
    const f = INHALT.fragen[i];
    const proz = Math.round((i / INHALT.fragen.length) * 100);
    zeigen(kopf('<span class="klein">' + (i + 1) + ' von ' + INHALT.fragen.length + '</span>') +
      '<div class="fortschritt"><span style="width:' + proz + '%"></span></div>' +
      '<h2>' + esc(f.frage) + '</h2>' +
      f.antworten.map((a) => '<button class="wahl' + (S.antworten[f.id] === a.w ? ' an' : '') + '" data-w="' + esc(a.w) + '">' + esc(a.t) + '</button>').join('') +
      (i > 0 ? '<button class="btn leise" id="zurueck">← zurück</button>' : ''));
    app.querySelectorAll('.wahl').forEach((b) => b.addEventListener('click', () => {
      b.classList.add('an');
      S.antworten[f.id] = b.dataset.w; sichern();
      setTimeout(() => (i + 1 < INHALT.fragen.length ? frage(i + 1) : ergebnis(true)), 180);
    }));
    an('zurueck', () => frage(i - 1));
  }

  /* ---------- Ergebnis ---------- */
  function persoenlicheSaetze() {
    const a = S.antworten, P = INHALT.persoenlich, s = [];
    if (a.alter === 'schwanger') s.push(P.schwanger);
    if (P.kraft[a.kraft]) s.push(P.kraft[a.kraft]);
    if (P.betreuung[a.betreuung]) s.push(P.betreuung[a.betreuung]);
    if (P.partner[a.partner]) s.push(P.partner[a.partner]);
    return s;
  }

  /* Liefert die Zuhause-Variante eines Textes (z. B. textZuhause), wenn das Kind zu Hause betreut wird */
  function zh(o, feld) {
    const z = o[feld + 'Zuhause'];
    return (z && S.antworten.betreuung === 'zuhause') ? z : o[feld];
  }

  function ergebnis(neuBerechnen) {
    if (neuBerechnen || !S.weg) { S.weg = wegBerechnen(S.antworten); sichern(); }
    const w = weg();
    zeigen(kopf('<button class="icon-btn" id="zu">' + (S.start ? 'Zurück' : '') + '</button>') +
      '<div class="karte mitte">' +
      '<p class="tag-label">' + esc(w.untertitel) + '</p>' +
      '<img class="maus-bild" src="' + w.bild + '" alt="' + esc(w.name) + '">' +
      '<h1>Ihr seid <span class="markiert">' + esc(w.name.replace('Die ', 'die ')) + '</span></h1>' +
      '<p class="zitat">' + esc(w.tagline) + '</p>' +
      '</div>' +
      mausSagt(persoenlicheSaetze().map(esc).join(' ')) +
      '<div class="karte" style="margin-top:14px"><p>' + esc(zh(w, 'text')) + '</p></div>' +
      '<div class="karte salbei"><h3>Was du dir sparen kannst</h3><ul class="sparen">' + zh(w, 'sparen').map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul></div>' +
      '<div class="karte"><h3>Dein erster Schritt</h3><p>' + esc(w.ersterSchritt) + '</p></div>' +
      '<div class="karte weich"><h3>Ein Satz ' + esc(zh(w, 'satzFuer')) + '</h3><p class="zitat">' + esc(zh(w, 'satz')) + '</p></div>' +
      kraftsatzKarte(w) +
      (S.start ? '' : '<button class="btn" id="starten">Sieben Tage mit der Mama-Maus starten</button>') +
      '<button class="btn zweit" id="teilen">Unser Ergebnis teilen</button>' +
      formular('Willst du mehr? Am ' + INHALT.webinar.datum + ' erklärt Anne live, wie Windelfrei, Schlaf und Nähe zusammenhängen — kostenlos.') +
      '<button class="btn leise" id="neu">Fragen nochmal beantworten</button>' +
      fuss());
    an('starten', starten);
    an('zu', () => (S.start ? tagesansicht() : null));
    an('teilen', teilen);
    an('neu', () => { S.antworten = {}; S.weg = null; sichern(); frage(0); });
    formularVerdrahten();
  }

  function kraftsatzKarte(w, abstand) {
    if (!w.kraftsatz) return '';
    return '<div class="karte mitte"' + (abstand ? ' style="margin-top:14px"' : '') + '><p class="tag-label">Dein Kraftsatz</p><p class="kraftsatz">' + w.kraftsatz.split('\n').map(esc).join('<br>') + '</p><p class="klein">Sag ihn dir leise, wenn es schwer wird.</p></div>';
  }

  function starten() {
    S.start = heute(); S.logs = []; S.pausen = []; sichern();
    tagesansicht();
  }

  /* ---------- Tagesansicht ---------- */
  function letzteAktion() {
    const daten = S.logs.map((l) => l.datum).concat(S.pausen);
    return daten.length ? daten[daten.length - 1] : null;
  }

  function punkteLeiste(tag) {
    let h = '<div class="punkte">';
    for (let i = 1; i <= 7; i++) h += '<i class="' + (i < tag ? 'fertig' : i === tag ? 'heute' : '') + '"></i>';
    return h + '</div>';
  }

  function tagesansicht(meldung) {
    if (!S.weg || !S.start) return start();
    const w = weg();
    const tag = S.logs.length + 1;
    if (tag > 7) return rueckblick();
    const t = w.tage[tag - 1];
    let schritt = t.schritt;
    if (t.schrittAllein && S.antworten.partner === 'allein') schritt = t.schrittAllein;
    if (t.schrittZuhause && S.antworten.betreuung === 'zuhause') schritt = t.schrittZuhause;
    const fertigHeute = !TEST && letzteAktion() === heute();

    let html = kopf('<button class="icon-btn" id="mehr">☰ Mehr</button>') +
      '<p class="tag-label mitte">' + esc(w.name) + ' · Tag ' + tag + ' von 7</p>' + punkteLeiste(tag);

    if (meldung) html += mausSagt(esc(meldung)) + '<div style="height:12px"></div>';

    html += '<div class="karte"><h2>' + esc(zh(t, 'titel')) + '</h2><p>' + esc(schritt) + '</p>' +
      '<p class="klein"><b>Warum:</b> ' + esc(zh(t, 'warum')) + '</p>' +
      (zh(t, 'tipp') ? '<p class="klein"><b>Tipp:</b> ' + esc(zh(t, 'tipp')) + '</p>' : '') +
      (w.nachspueren && w.nachspueren[tag - 1] ? '<p class="nachspueren"><b>Zum Nachspüren</b><br>' + esc(w.nachspueren[tag - 1]) + '</p>' : '') + '</div>';

    if (fertigHeute) {
      html += '<div class="karte weich mitte"><h3>Für heute bist du fertig.</h3><p>Morgen wartet ' + (tag === 7 ? 'dein Rückblick' : 'Tag ' + tag) + ' auf dich. Schön, dass du da warst.</p></div>';
    } else if (tag === 7) {
      html += '<button class="btn" id="zumRueckblick">Zum Rückblick</button>';
    } else {
      html += '<div class="karte"><h3>Wie war es heute?</h3>' +
        (w.nacht && tag > 1 ? nachtFragen() : '') +
        '<div class="check-grid">' +
        '<button class="btn" data-s="geklappt">Hat geklappt</button>' +
        '<button class="btn zweit" data-s="nicht">Heute nicht</button>' +
        '<button class="btn zweit" data-s="daneben">Ging daneben</button>' +
        '</div></div>' +
        '<button class="btn leise" id="garnichts">Heute geht gar nichts</button>';
    }

    const m = muster();
    if (m) html += '<div class="karte salbei"><h3>Was mir bei euch auffällt</h3><p>' + esc(m) + '</p></div>';

    html += fuss();
    zeigen(html);

    app.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => checkin(b.dataset.s, tag)));
    app.querySelectorAll('.chip').forEach((c) => c.addEventListener('click', () => {
      app.querySelectorAll('.chip[data-g="' + c.dataset.g + '"]').forEach((x) => x.classList.remove('an'));
      c.classList.add('an');
    }));
    an('garnichts', () => { S.pausen.push(heute()); sichern(); tagesansicht(antwort('garnichts')); });
    an('zumRueckblick', () => { S.logs.push({ tag: 7, datum: heute(), status: 'rueckblick' }); sichern(); rueckblick(); });
    an('mehr', mehr);
  }

  function nachtFragen() {
    const chip = (g, w, t) => '<button class="chip" data-g="' + g + '" data-w="' + w + '">' + t + '</button>';
    return '<p class="klein">Letzte Nacht: Wie oft war dein Kind wach?</p><div class="chips">' +
      chip('wach', '0', 'gar nicht') + chip('wach', '1', 'einmal') + chip('wach', '2', 'zweimal') + chip('wach', '3', 'öfter') + '</div>' +
      '<p class="klein">Und die Windel beim Aufwachen?</p><div class="chips">' +
      chip('windel', 'nass', 'meist nass') + chip('windel', 'trocken', 'meist trocken') + chip('windel', 'unklar', 'weiß nicht') + '</div>';
  }

  function gewaehlt(g) { const c = app.querySelector('.chip.an[data-g="' + g + '"]'); return c ? c.dataset.w : null; }

  function checkin(status, tag) {
    const eintrag = { tag: tag, datum: heute(), status: status, wach: gewaehlt('wach'), windel: gewaehlt('windel') };
    if (status === 'nicht') return speichernUndWeiter(eintrag);
    // Bei geklappt / daneben: kurz nach der Tageszeit fragen (für das Muster), überspringbar
    zeigen(kopf() + '<div class="karte"><h2>Wann war das ungefähr?</h2><p class="klein">Daraus erkenne ich, wann es bei euch am ehesten passt. Du kannst das auch überspringen.</p><div class="chips">' +
      INHALT.zeiten.map((z) => '<button class="chip" data-g="zeit" data-w="' + z.w + '">' + z.t + '</button>').join('') +
      '</div><button class="btn" id="weiter">Speichern</button><button class="btn leise" id="ueberspringen">Überspringen</button></div>');
    app.querySelectorAll('.chip').forEach((c) => c.addEventListener('click', () => {
      app.querySelectorAll('.chip').forEach((x) => x.classList.remove('an')); c.classList.add('an');
    }));
    an('weiter', () => { eintrag.zeit = gewaehlt('zeit'); speichernUndWeiter(eintrag); });
    an('ueberspringen', () => speichernUndWeiter(eintrag));
  }

  function speichernUndWeiter(e) {
    S.logs.push(e); sichern();
    tagesansicht(antwort(e.status));
  }

  /* ---------- Muster: einfaches Zählen auf dem Handy ---------- */
  function muster() {
    const w = weg();
    if (w.nacht) {
      const n = S.logs.filter((l) => l.windel === 'nass' || l.windel === 'trocken');
      if (n.length >= 2) {
        const nass = n.filter((l) => l.windel === 'nass').length;
        if (nass >= Math.ceil(n.length / 2)) return 'In ' + nass + ' von ' + n.length + ' Nächten war die Windel beim Aufwachen meist nass. Gut möglich, dass bei euch die Blase mitweckt. Ein Abhalte-Moment vor dem Schlafen kann sich lohnen.';
        return 'In den meisten Nächten war die Windel beim Aufwachen eher trocken. Dann weckt bei euch wohl eher etwas anderes — Nähe, Hunger, Entwicklung. Auch das ist gut zu wissen.';
      }
    }
    const z = {};
    S.logs.filter((l) => l.status === 'geklappt' && l.zeit).forEach((l) => (z[l.zeit] = (z[l.zeit] || 0) + 1));
    const summe = Object.values(z).reduce((a, b) => a + b, 0);
    if (summe < 3) return null;
    const top = Object.keys(z).sort((a, b) => z[b] - z[a])[0];
    return INHALT.muster[top];
  }

  /* ---------- Rückblick (Tag 7) ---------- */
  function rueckblick() {
    const w = weg();
    const echte = S.logs.filter((l) => l.status !== 'rueckblick');
    const zahl = (s) => echte.filter((l) => l.status === s).length;
    const m = muster();
    zeigen(kopf('<button class="icon-btn" id="mehr">☰ Mehr</button>') +
      '<div class="karte mitte"><img class="maus-bild" src="' + w.bild + '" alt=""><p class="tag-label">Deine Woche als ' + esc(w.name.replace('Die ', '')) + '</p><h1>Geschafft.</h1>' +
      '<div class="statistik"><div><b>' + zahl('geklappt') + '</b><span>hat geklappt</span></div><div><b>' + (zahl('nicht') + zahl('daneben')) + '</b><span>gehörte dazu</span></div><div><b>' + S.pausen.length + '</b><span>Pause-Tage</span></div></div>' +
      '</div>' +
      mausSagt(esc(w.abschluss)) +
      kraftsatzKarte(w, true) +
      (m ? '<div class="karte salbei" style="margin-top:14px"><h3>Was mir bei euch aufgefallen ist</h3><p>' + esc(m) + '</p></div>' : '') +
      '<div class="karte" style="margin-top:14px"><h3>Und jetzt?</h3><p>Wenn du nach dieser Woche merkst, dass du tiefer einsteigen willst: Am ' + esc(INHALT.webinar.datum) + ' erklärt Anne live, wie Windelfrei, Schlaf und Nähe zusammenhängen. Kostenlos.</p></div>' +
      formular('Sichere dir deinen Platz — die Einladung kommt per Mail.') +
      '<button class="btn zweit" id="teilen">Unser Ergebnis teilen</button>' +
      '<button class="btn leise" id="nochmal">Eine neue Woche starten</button>' + fuss());
    an('mehr', mehr);
    an('teilen', teilen);
    an('nochmal', () => { S.logs = []; S.pausen = []; S.start = heute(); sichern(); tagesansicht(); });
    formularVerdrahten();
  }

  /* ---------- Mehr / Einstellungen ---------- */
  function mehr() {
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    zeigen(kopf('<button class="icon-btn" id="zu">Zurück</button>') +
      '<div class="karte"><h3>Als App aufs Handy</h3><p>' + (ios
        ? 'In Safari unten auf das Teilen-Symbol tippen, dann „Zum Home-Bildschirm". Danach öffnest du die Mama-Maus wie jede andere App.'
        : 'Im Browser-Menü (⋮) auf „App installieren" oder „Zum Startbildschirm hinzufügen" tippen.') + '</p></div>' +
      '<button class="btn zweit" id="meinWeg">Meinen Weg ansehen</button>' +
      '<button class="btn zweit" id="neuFinden">Weg neu finden</button>' +
      '<div class="karte" style="margin-top:16px"><h3>Deine Daten</h3><p class="klein">' + esc(INHALT.datenschutz) + '</p>' +
      '<button class="btn leise" id="loeschen">Alles auf diesem Handy löschen</button></div>' + fuss());
    an('zu', tagesansicht);
    an('meinWeg', () => ergebnis(false));
    an('neuFinden', () => { S.antworten = {}; S.weg = null; S.start = null; S.logs = []; S.pausen = []; sichern(); frage(0); });
    an('loeschen', () => {
      if (confirm('Wirklich alles löschen? Dein Weg und deine Einträge sind dann weg.')) {
        try { localStorage.removeItem(SPEICHER); } catch (e) {}
        S = neu(); start();
      }
    });
  }

  /* ---------- Anmeldeformular (einzige Datenübertragung, freiwillig) ---------- */
  function formular(einleitung) {
    return '<div class="karte weich" id="formkarte"><h3>📅 ' + esc(INHALT.webinar.zeile) + '</h3><p>' + esc(einleitung) + '</p>' +
      '<form id="anmeldung" action="' + BREVO + '" method="POST" target="brevo_iframe" novalidate>' +
      '<label class="feld" for="vn">Dein Vorname</label><input type="text" id="vn" name="VORNAME" autocomplete="given-name" required>' +
      '<label class="feld" for="em">Deine E-Mail</label><input type="email" id="em" name="EMAIL" autocomplete="email" required>' +
      '<input type="hidden" name="INTERESSE" value="ErsteSchritte-' + esc(S.weg || '') + '">' +
      '<input type="text" name="email_address_check" value="" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<input type="hidden" name="locale" value="de">' +
      '<button class="btn" type="submit">Platz fürs Webinar sichern</button>' +
      '<p class="klein" id="formfehler"></p>' +
      '<p class="klein">Du bekommst eine Mail zum Bestätigen. Danach schickt dir Pippin die Webinar-Einladung und ab und zu Post mit Herz. Jederzeit abbestellbar. Mehr in der <a href="../datenschutz.html">Datenschutzerklärung</a>.</p>' +
      '</form><div id="formdanke" class="versteckt"><h3>Fast geschafft 💜</h3><p>Schau in dein Postfach und bestätige deine Anmeldung. Ein Blick in den Spam-Ordner schadet nicht.</p></div></div>';
  }
  function formularVerdrahten() {
    const f = document.getElementById('anmeldung');
    if (!f) return;
    f.addEventListener('submit', (ev) => {
      const em = f.querySelector('#em').value.trim();
      const vn = f.querySelector('#vn').value.trim();
      if (!vn || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        ev.preventDefault();
        document.getElementById('formfehler').textContent = 'Bitte gib deinen Vornamen und eine gültige E-Mail-Adresse ein.';
        return;
      }
      setTimeout(() => { f.classList.add('versteckt'); document.getElementById('formdanke').classList.remove('versteckt'); }, 300);
    });
  }

  /* ---------- Teilen: Ergebniskarte im Story-Format, auf dem Handy gezeichnet ---------- */
  function teilen() {
    const w = weg();
    const c = document.createElement('canvas'); c.width = 1080; c.height = 1920;
    const x = c.getContext('2d');
    const bild = new Image(); const logo = new Image();
    let geladen = 0;
    const fertig = () => { if (++geladen < 2) return; zeichnen(); };
    bild.onload = logo.onload = fertig; bild.onerror = logo.onerror = fertig;
    bild.src = w.bild; logo.src = 'img/logo.png';

    function umbruch(text, maxB) {
      const woerter = text.split(' '), zeilen = []; let z = '';
      woerter.forEach((wo) => { const t = z ? z + ' ' + wo : wo; if (x.measureText(t).width > maxB && z) { zeilen.push(z); z = wo; } else z = t; });
      if (z) zeilen.push(z); return zeilen;
    }
    function zeichnen() {
      x.fillStyle = '#ead9ee'; x.fillRect(0, 0, 1080, 1920);
      x.fillStyle = '#f6eef7'; x.beginPath(); x.arc(540, 820, 430, 0, Math.PI * 2); x.fill();
      if (logo.naturalWidth) { const lb = 300, lh = lb * logo.naturalHeight / logo.naturalWidth; x.drawImage(logo, 540 - lb / 2, 120, lb, lh); }
      if (bild.naturalWidth) { const b = 720, h = b * bild.naturalHeight / bild.naturalWidth; x.drawImage(bild, 540 - b / 2, 820 - h / 2, b, h); }
      x.textAlign = 'center'; x.fillStyle = '#63192f';
      x.font = '600 46px Fredoka, Nunito, sans-serif'; x.fillText('Wir sind Team', 540, 1340);
      x.font = '600 96px Fredoka, Nunito, sans-serif'; const nm = w.name.replace('Die ', ''); const nb = x.measureText(nm).width; x.fillStyle = '#f7e3b0'; x.fillRect(540 - nb / 2 - 14, 1420, nb + 28, 44); x.fillStyle = '#63192f'; x.fillText(nm, 540, 1450);
      x.fillStyle = '#3d2a30'; x.font = '600 46px Nunito, sans-serif';
      umbruch(w.teilen, 860).forEach((z, i) => x.fillText(z, 540, 1560 + i * 62));
      x.fillStyle = '#63192f'; x.font = '700 40px Nunito, sans-serif'; x.fillText('Welcher Weg passt zu euch?', 540, 1760);
      x.fillStyle = '#6e5a60'; x.font = '600 38px Nunito, sans-serif'; x.fillText('pippin-welt.de/erste-schritte', 540, 1820);
      c.toBlob(async (blob) => {
        const datei = new File([blob], 'pippin-' + S.weg + '.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [datei] })) {
          try { await navigator.share({ files: [datei], text: 'Wir sind Team ' + w.name.replace('Die ', '') + ' 🐭 pippin-welt.de/erste-schritte' }); return; } catch (e) { if (e.name === 'AbortError') return; }
        }
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = datei.name; a.click();
      }, 'image/png');
    }
  }

  /* ---------- Offline-Fähigkeit ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  start();
})();
