/* Pippins erste Schritte — alle Texte der Mama-Maus.
   Hier wird nichts berechnet und nichts verschickt. Texte ändern = nur diese Datei.
   Regeln: kein „du musst", keine „Signale", keine „Fehler", keine Zahlen ohne Quelle,
   kein „so machst du es richtig". Jeder Schritt höchstens zwei Minuten. */

const INHALT = {

  webinar: {
    datum: 'Donnerstag, 19. November',
    zeile: 'Live-Webinar mit Anne am Donnerstag, 19. November, um 9 Uhr (Zoom)'
  },

  fragen: [
    { id: 'alter', frage: 'Wie alt ist dein Kind?', antworten: [
      { w: 'schwanger', t: 'Ich bin noch schwanger' },
      { w: '0-3', t: 'Bis 3 Monate' },
      { w: '4-8', t: '4 bis 8 Monate' },
      { w: '9-17', t: '9 bis 17 Monate' },
      { w: '18+', t: '1½ Jahre oder älter' } ] },
    { id: 'stand', frage: 'Wo steht ihr mit Windelfrei?', antworten: [
      { w: 'nie', t: 'Höre ich zum ersten Mal richtig' },
      { w: 'gelesen', t: 'Gelesen, noch nicht ausprobiert' },
      { w: 'abundzu', t: 'Wir probieren es ab und zu' },
      { w: 'hakt', t: 'Wir halten ab, aber gerade hakt es' },
      { w: 'raus', t: 'Mein Kind soll aus der Windel raus' } ] },
    { id: 'naechte', frage: 'Wie sind eure Nächte gerade?', antworten: [
      { w: 'ok', t: 'Meistens okay' },
      { w: 'oft', t: 'Mein Kind wird oft wach' },
      { w: 'hart', t: 'Sehr unruhig, wir sind erschöpft' } ] },
    { id: 'betreuung', frage: 'Wo ist dein Kind tagsüber?', antworten: [
      { w: 'zuhause', t: 'Bei mir bzw. bei uns zu Hause' },
      { w: 'teils', t: 'Teils Kita oder Tagesmutter' },
      { w: 'ganztags', t: 'Ganztags in der Betreuung' } ] },
    { id: 'partner', frage: 'Wie ist es bei euch zu Hause?', antworten: [
      { w: 'mit', t: 'Mein Partner oder meine Familie zieht mit' },
      { w: 'skeptisch', t: 'Die anderen sind eher skeptisch' },
      { w: 'allein', t: 'Ich mache das meiste allein' } ] },
    { id: 'kraft', frage: 'Ganz ehrlich: Wie viel Kraft hast du gerade?', antworten: [
      { w: '1', t: 'Fast leer' },
      { w: '2', t: 'Eher wenig' },
      { w: '3', t: 'Geht so' },
      { w: '4', t: 'Ganz gut' },
      { w: '5', t: 'Richtig viel' } ] },
    { id: 'nervt', frage: 'Was nervt dich am Wickeln am meisten?', antworten: [
      { w: 'muell', t: 'Der Müll und die Wäsche' },
      { w: 'protest', t: 'Das Gezappel und der Protest' },
      { w: 'po', t: 'Der wunde Po' },
      { w: 'nachts', t: 'Die volle Windel in der Nacht' },
      { w: 'nichts', t: 'Eigentlich nichts' } ] },
    { id: 'merken', frage: 'Merkst du manchmal, dass dein Kind gleich Pipi oder Kacka macht?', antworten: [
      { w: 'nein', t: 'Nein, eigentlich nie' },
      { w: 'aufwachen', t: 'Nach dem Aufwachen manchmal' },
      { w: 'trinken', t: 'Beim oder nach dem Trinken' },
      { w: 'unruhig', t: 'Es wird unruhig oder ganz still' },
      { w: 'sagt', t: 'Mein Kind sagt oder zeigt es schon' } ] },
    { id: 'zeit', frage: 'Wie viel Platz soll das im Alltag haben?', antworten: [
      { w: 'klein', t: 'Ein Moment am Tag reicht mir' },
      { w: 'mittel', t: 'Ein paar Momente, wenn es passt' },
      { w: 'gross', t: 'Ich will es richtig in unseren Alltag holen' } ] },
    { id: 'wunsch', frage: 'Was wünschst du dir am meisten?', antworten: [
      { w: 'druck', t: 'Weniger Druck' },
      { w: 'verstehen', t: 'Mein Kind besser verstehen' },
      { w: 'naechte', t: 'Ruhigere Nächte' },
      { w: 'leicht', t: 'Dass es einfach leichter wird' } ] }
  ],

  /* Welche Antwort zählt für welchen Weg (Punkte). Gleichstand: Reihenfolge in INHALT.wege. */
  punkte: {
    alter:     { schwanger: { morgenmaus: 3 }, '0-3': { morgenmaus: 2, nachtmaus: 1 }, '4-8': { nestmaus: 1, nachtmaus: 1 }, '9-17': { nestmaus: 1, mutmaus: 1 }, '18+': { entdeckermaus: 12 } },
    stand:     { nie: { morgenmaus: 3 }, gelesen: { morgenmaus: 2, nestmaus: 1 }, abundzu: { nestmaus: 3 }, hakt: { mutmaus: 5 }, raus: { entdeckermaus: 5 } },
    naechte:   { ok: {}, oft: { nachtmaus: 2 }, hart: { nachtmaus: 3, morgenmaus: 1 } },
    betreuung: { zuhause: {}, teils: { nestmaus: 3 }, ganztags: { nestmaus: 4 } },
    partner:   { mit: {}, skeptisch: { morgenmaus: 1 }, allein: { morgenmaus: 1 } },
    kraft:     { '1': { morgenmaus: 2 }, '2': { morgenmaus: 1 }, '3': {}, '4': { nestmaus: 1 }, '5': { nestmaus: 1 } },
    nervt:     { muell: { nestmaus: 1 }, protest: { mutmaus: 2 }, po: { morgenmaus: 1 }, nachts: { nachtmaus: 3 }, nichts: {} },
    merken:    { nein: { morgenmaus: 1 }, aufwachen: { morgenmaus: 1, nachtmaus: 1 }, trinken: { morgenmaus: 1 }, unruhig: { nestmaus: 1 }, sagt: { entdeckermaus: 3 } },
    zeit:      { klein: { morgenmaus: 2 }, mittel: { nestmaus: 1 }, gross: { nestmaus: 1, mutmaus: 1 } },
    wunsch:    { druck: { morgenmaus: 1, mutmaus: 1 }, verstehen: { morgenmaus: 1 }, naechte: { nachtmaus: 3 }, leicht: { nestmaus: 1 } }
  },

  /* Persönliche Sätze, die je nach Antwort im Ergebnis auftauchen */
  persoenlich: {
    kraft: {
      '1': 'Du hast mir gesagt, dass deine Kraft gerade fast leer ist. Darum ist dein Weg extra klein. Wirklich klein.',
      '2': 'Deine Kraft ist gerade knapp. Darum fängst du mit so wenig an, dass es kaum auffällt.',
      '3': 'Du hast ein bisschen Luft. Wir nutzen sie, ohne sie aufzubrauchen.',
      '4': 'Du hast gerade ganz gut Kraft. Schön. Trotzdem: lieber klein anfangen und dranbleiben.',
      '5': 'Du hast richtig Lust. Ich halte dich trotzdem ein bisschen zurück, damit es leicht bleibt.'
    },
    partner: {
      mit: 'Wie schön, dass ihr das zusammen macht. An Tag 6 holen wir den anderen extra mit ins Boot.',
      skeptisch: 'Wenn die anderen skeptisch sind: Du brauchst niemanden zu überzeugen. Lass sie einfach sehen, wie entspannt es sein kann.',
      allein: 'Du machst vieles allein. Darum ist dein Plan so gebaut, dass du ihn allein schaffst.'
    },
    schwanger: 'Du bist noch schwanger — ein schöner Zeitpunkt. Lies dich in Ruhe ein. Starte die sieben Tage, wenn dein Baby da ist und ihr ein bisschen angekommen seid.',
    betreuung: {
      teils: 'Kita oder Tagesmutter sind kein Hindernis. Dort bleibt einfach alles, wie es ist.',
      ganztags: 'Euer Tag ist gut gefüllt. Darum spielt sich dein Weg in den Momenten ab, in denen ihr ohnehin zu Hause seid.'
    }
  },

  wege: {
    morgenmaus: {
      name: 'Die Morgenmaus',
      untertitel: 'Der sanfte Einstieg',
      bild: 'img/morgenmaus.png',
      tagline: 'Ein Moment am Tag. Mehr nicht.',
      text: "Vielleicht bist du gerade müde, vielleicht steht ihr ganz am Anfang — und trotzdem ist da diese Neugier. Halt sie fest, aber trag sie leicht. Die Morgenmaus fängt dort an, wo es am wenigsten kostet: nach dem Aufwachen, in einem Moment, in dem viele Babys ohnehin Pipi machen. Du bietest deinem Kind einen Ort an. Kommt nichts, ist das kein Rückschlag. Es ist einfach ein Morgen.",
      sparen: [
        'Tabellen und feste Uhrzeiten',
        'den ganzen Tag ans Abhalten zu denken',
        'auf Windeln zu verzichten — die bleiben einfach dran',
        'dich mit anderen Familien zu vergleichen'
      ],
      ersterSchritt: 'Morgen nach dem Aufwachen: Windel ab, dein Kind kurz über Töpfchen oder Waschbecken halten, ein leises „Pssss" dazu. Zehn Atemzüge lang. Dann ist gut.',
      satz: '„Wir probieren morgens ein bisschen was aus. Ganz ohne Ehrgeiz."',
      satzFuer: 'für die Schwiegermutter',
      teilen: 'Ein Moment am Tag. Mehr nicht.',
      abschluss: "Sieben Morgen lang hast du hingeschaut. Nicht perfekt, nicht jeden Tag — aber du warst da. Und dabei ist etwas passiert, das dir kein Ratgeber abnehmen kann: Du kennst dein Kind ein Stück besser. Oft weiß dein Bauch längst, was dein Kopf gerade erst lernt.",
      kraftsatz: "Ein kleiner Moment reicht.\nIch schaue hin — und das ist genug.",
      nachspueren: ["Wie hat sich der Moment für dich angefühlt — leicht oder angestrengt?", "Wann am Tag bist du selbst am ruhigsten?", "Was ist dir heute an deinem Kind aufgefallen, das du vorher nie bemerkt hast?", "Wo hast du heute gemerkt: Eigentlich wusste ich es schon?", "Was hat dir heute gutgetan, ganz ohne Abhalten?", "Wer darf diesen Weg mit dir teilen?", "Was nimmst du aus dieser Woche mit — über dein Kind und über dich?"],
      tage: [
        { titel: 'Ein Moment nach dem Aufwachen', schritt: 'Nach dem Aufwachen: Windel ab, dein Kind kurz über Töpfchen oder Waschbecken halten, ein leises „Pssss" dazu. Zehn Atemzüge lang. Dann Windel wieder dran.', warum: 'Du suchst keinen Erfolg, du schaffst eine kleine Gewohnheit. Dein Kind erlebt: Hier darf ich loslassen.', tipp: 'Halte ein Tuch bereit. Und wenn nichts kommt: Windel dran, fertig.' },
        { titel: 'Dein Geräusch', schritt: 'Such dir ein Geräusch aus, das du jedes Mal machst, wenn du abhältst — ein „Pssss" oder ein leises Summen. Heute wieder nach dem Aufwachen, mit deinem Geräusch.', warum: 'Mit der Zeit verbindet dein Kind das Geräusch mit dem Loslassen. Wie ein Schlaflied vorm Einschlafen.', tipp: 'Nimm ein Geräusch, das du auch um sechs Uhr morgens noch gern machst.' },
        { titel: 'Hinschauen statt abfangen', schritt: 'Heute nur beobachten: Was macht dein Kind kurz bevor die Windel nass wird? Wird es still, zappelt es, verzieht es das Gesicht? Ein Blick reicht.', warum: 'Jedes Kind zeigt es anders. Du lernst gerade dein Kind kennen, keine Methode.', tipp: 'Es ist völlig okay, wenn dir heute gar nichts auffällt. Das Hinschauen selbst zählt.' },
        { titel: 'Nach dem Trinken', schritt: 'Biete einen zweiten Moment an: kurz nach dem Stillen oder dem Fläschchen. Gleiche Haltung, gleiches Geräusch.', warum: 'Trinken bringt den Bauch in Bewegung. Danach kommt bei vielen Babys etwas.', tipp: 'Wenn dein Kind beim Trinken einschläft: lass es schlafen. Der Moment kommt wieder.' },
        { titel: 'Ein Tag ohne Neues', schritt: 'Heute kommt nichts dazu. Wenn es morgens passt, gut. Wenn nicht, auch gut.', warum: 'Pausen gehören dazu. Was du die letzten Tage gesehen hast, bleibt.', tipp: 'Trink heute einen Kaffee, solange er warm ist.' },
        { titel: 'Nicht allein', schritt: 'Zeig einer vertrauten Person euren Morgenmoment — Partner, Oma, Freundin. Lass sie einmal zuschauen oder selbst abhalten.', schrittAllein: 'Erzähl heute einer Freundin oder einer anderen Mama von eurem Morgenmoment. Nur erzählen.', warum: 'Wenn mehr als eine Person den Moment kennt, wird er zur Familiensache und nicht zu deinem Extra-Job.', tipp: 'Rechne mit einem Schmunzeln. Das ist normal.' },
        { titel: 'Was du jetzt weißt', schritt: 'Schau zurück: Wann hat es geklappt? Was hast du über dein Kind gelernt?', warum: 'Du hast eine Woche lang hingeschaut. Das ist mehr, als die meisten Ratgeber schaffen.', tipp: '' }
      ]
    },

    nestmaus: {
      name: 'Die Nestmaus',
      untertitel: 'Teilzeit-Windelfrei',
      bild: 'img/nestmaus.png',
      tagline: 'Zu Hause ohne, unterwegs mit.',
      text: "Euer Alltag ist voll — Kita, Termine, Einkauf, und dazwischen das Leben. Vielleicht hast du gedacht, Windelfrei sei dann nichts für euch. Doch es geht nicht um alles oder nichts. Die Nestmaus hält ab, wo es leicht ist: zu Hause, im Nest. Draußen bleibt die Windel dran, ohne schlechtes Gewissen. Jedes Pipi, das nicht in der Windel landet, ist ein kleines Geschenk an euch beide.",
      sparen: [
        'mit der Kita zu diskutieren',
        'unterwegs abzuhalten, wenn es dich stresst',
        'ein „ganz oder gar nicht"',
        'dich zu rechtfertigen'
      ],
      ersterSchritt: 'Such dir einen festen Nest-Moment aus, an dem ihr sowieso zu Hause seid — zum Beispiel nach dem Heimkommen oder vor dem Baden. Dort hältst du ab, sonst nirgends.',
      satz: '„Zu Hause halten wir manchmal ab. Bei euch bleibt alles, wie es ist."',
      satzFuer: 'für Kita oder Tagesmutter',
      teilen: 'Zu Hause ohne, unterwegs mit.',
      abschluss: "Eine Woche lang hast du Windelfrei in euer volles Leben geholt, ohne dass es voller wurde. Dein Kind kennt jetzt einen Ort, an dem es loslassen darf. Und du weißt: Teilzeit ist kein halber Weg. Es ist euer Weg.",
      kraftsatz: "Nicht ganz oder gar nicht.\nSo, wie es zu uns passt — genau so ist es richtig.",
      nachspueren: ["Welcher Moment in eurem Tag ist am ruhigsten?", "Wo darfst du es dir leichter machen?", "Wie fühlt sich das Heimkommen für dein Kind an?", "Was zeigt dir dein Kind, wenn es keine Windel trägt?", "Was weiß nur du über dein Kind — weil du es in den stillen Momenten siehst?", "Wo darf „halb\" für dich ganz genug sein?", "Welcher Nest-Moment gehört jetzt zu euch — und warum gerade dieser?"],
      tage: [
        { titel: 'Euer Nest-Moment', schritt: 'Such dir einen festen Moment aus, an dem ihr sowieso zu Hause seid — nach dem Heimkommen, vor dem Baden. Heute hältst du dann einmal ab.', warum: 'Ein fester Moment spart dir das Nachdenken. Er wird zur Gewohnheit, ganz ohne Erinnerung im Handy.', tipp: 'Nimm den Moment, der am wenigsten hektisch ist.' },
        { titel: 'Ein fester Platz', schritt: 'Richte einen Abhalte-Platz ein: Töpfchen im Bad, ein Handtuch daneben, fertig. Heute im Nest-Moment dorthin.', warum: 'Dein Kind erkennt den Ort wieder. Und du suchst nicht jedes Mal.', tipp: 'Ein altes Handtuch reicht. Nichts kaufen.' },
        { titel: 'Nach dem Heimkommen', schritt: 'Wenn ihr nach Hause kommt: Jacke aus, Windel ab, kurz abhalten. Dann ankommen.', warum: 'Nach Autositz, Trage oder Kinderwagen ist oft ein Pipi fällig. Ein natürlicher Übergang.', tipp: 'Schuhe dürfen dabei anbleiben.' },
        { titel: 'Zeit ohne Windel', schritt: 'Lass dein Kind heute eine kleine Weile ohne Windel auf einer Decke liegen oder spielen, mit einer Unterlage darunter.', warum: 'Dein Kind spürt seinen Körper, und du siehst nebenbei, wann es Pipi macht.', tipp: 'Eine Viertelstunde ist genug.' },
        { titel: 'Was die Betreuung sieht', schritt: 'Frag beim Abholen ganz nebenbei: Wann war die Windel heute voll? Nichts erklären, nur fragen.', schrittZuhause: 'Probier heute einen zweiten Nest-Moment am Nachmittag aus.', warum: 'Andere sehen dein Kind in anderen Situationen. Das ergänzt dein Bild.', tipp: 'Wenn niemand darauf geachtet hat: auch gut. Du hast gefragt, ohne Druck zu machen.' },
        { titel: 'Ein Tag ohne Ehrgeiz', schritt: 'Heute zählt nur euer Nest-Moment. Alles andere darf in die Windel.', warum: 'Teilzeit heißt: Es darf Teilzeit bleiben.', tipp: '' },
        { titel: 'Was du jetzt weißt', schritt: 'Schau zurück: Welcher Moment passt in euren Alltag? Was hast du über dein Kind gelernt?', warum: 'Du hast Windelfrei in einen vollen Alltag geholt, ohne dass er voller wurde.', tipp: '' }
      ]
    },

    nachtmaus: {
      name: 'Die Nachtmaus',
      untertitel: 'Die Nacht-Spur',
      bild: 'img/nachtmaus.png',
      tagline: 'Manchmal weckt nicht der Schlaf, sondern die Blase.',
      text: "Eure Nächte sind unruhig, und du bist müde auf eine Art, die nur kennt, wer sie erlebt. Vielleicht hast du dich schon gefragt, was du falsch machst. Nichts. Aufwachen gehört zu Babys dazu. Die Nachtmaus schaut trotzdem mit dir auf etwas, das in vielen Schlaf-Ratgebern fehlt: Manchmal wird ein Baby wach, weil es Pipi machen muss und das nicht in die Windel will. Das ist kein Schlafprogramm und keine Garantie — sondern ein neuer Blick, der Nächte manchmal leichter macht.",
      sparen: [
        'Schlaftraining aus Verzweiflung',
        'nachts das große Licht anzumachen',
        'jede Nacht abzuhalten',
        'die Frage, was du falsch machst'
      ],
      ersterSchritt: 'Heute Nacht nur hinschauen: Wenn dein Kind wach wird, fühl kurz die Windel. Nass oder trocken? Morgen früh tippst du es in die App.',
      satz: '„Wir schauen gerade, ob die Nächte mit dem Pipi zusammenhängen. Kein Schlaftraining."',
      satzFuer: 'für alle, die Schlaftipps haben',
      teilen: 'Manchmal weckt nicht der Schlaf, sondern die Blase.',
      abschluss: "Eine Woche lang hast du nachts hingeschaut, obwohl du müde warst. Was auch immer dabei herauskam: Du hast eure Nächte nicht bekämpft, sondern kennengelernt. Und eine Mama, die versteht, was nachts passiert, liegt ruhiger da — auch wenn sie wach ist.",
      kraftsatz: "Ich kämpfe nicht gegen unsere Nächte.\nIch lerne sie kennen.",
      nachspueren: ["Wie geht es dir, wenn du nachts geweckt wirst — eher wütend, traurig oder einfach leer?", "Was wäre anders, wenn du nachts nicht mehr nach einem Grund suchen würdest?", "Wann ist dein Kind abends am entspanntesten?", "Was brauchst du selbst, um nachts ruhig zu bleiben?", "Wie hat dein Kind auf das Angebot reagiert — und was erzählt dir das über es?", "Wann hast du zuletzt etwas nur für dich getan?", "Was weißt du jetzt über eure Nächte, das du vorher nicht wusstest?"],
      nacht: true,
      tage: [
        { titel: 'Nur hinschauen', schritt: 'Wenn dein Kind heute Nacht wach wird: kurz die Windel fühlen. Nass oder trocken? Sonst nichts ändern.', warum: 'Bevor du etwas veränderst, schaust du, was ist. Das nimmt schon Druck raus.', tipp: 'Morgen früh trägst du es hier ein. Eine grobe Erinnerung reicht.' },
        { titel: 'Noch eine Nacht schauen', schritt: 'Gleiches wie gestern: beim Aufwachen kurz die Windel fühlen.', warum: 'Zwei Nächte zeigen mehr als eine.', tipp: 'Wenn du es nachts vergisst: völlig okay. Dann trägst du „weiß nicht" ein.' },
        { titel: 'Vor dem Einschlafen', schritt: 'Biete kurz vor dem Einschlafen einen Abhalte-Moment an. Gedimmtes Licht, leise, dein Geräusch.', warum: 'Eine leere Blase ist ein Grund weniger, wach zu werden. Manchmal hilft das, manchmal nicht. Beides ist okay.', tipp: 'Wenn dein Kind dabei munter wird: lieber weglassen.' },
        { titel: 'Das Nacht-Set', schritt: 'Leg dir alles griffbereit ans Bett: Töpfchen oder Schüssel, Tuch, Ersatzwindel.', warum: 'Je weniger du nachts aufstehst, desto schneller schlaft ihr wieder ein.', tipp: 'Eine kleine Leselampe mit warmem Licht ist Gold wert.' },
        { titel: 'Einmal nachts anbieten', schritt: 'Wenn dein Kind heute Nacht wach wird und die Windel trocken ist: einmal kurz abhalten, im Halbdunkel, ohne viele Worte. Wenn es protestiert, sofort aufhören.', warum: 'Manche Babys schlafen danach schneller wieder ein, andere nicht. Du findest gerade heraus, was zu euch passt.', tipp: 'Stillen geht vor. Wenn dein Kind trinken will, darf es trinken.' },
        { titel: 'Und du?', schritt: 'Heute geht es um dich. Leg dich hin, wenn dein Kind tagsüber schläft — oder bitte jemanden um eine Stunde nur für dich.', warum: 'Eine ausgeruhtere Mama hört ihr Kind besser. Das ist keine Belohnung, das ist Grundversorgung.', tipp: 'Die Wäsche läuft nicht weg.' },
        { titel: 'Was du jetzt weißt', schritt: 'Schau zurück auf eure Nächte. Was ist dir aufgefallen?', warum: 'Du hast eure Nächte nicht bekämpft, sondern verstanden.', tipp: '' }
      ]
    },

    mutmaus: {
      name: 'Die Mutmaus',
      untertitel: 'Mittendrin',
      bild: 'img/mutmaus.png',
      tagline: 'Rückschläge gehören dazu. Du bist trotzdem auf dem Weg.',
      text: "Ihr haltet schon ab, und gerade hakt es: Dein Kind dreht sich weg, vieles geht daneben, und irgendwo flüstert eine Stimme, ob das alles umsonst war. War es nicht. Du bist nicht gescheitert, ihr steckt mitten in einer Phase. Viele Kinder haben Zeiten, in denen sie nicht wollen — oft genau dann, wenn sie gerade etwas Neues lernen. Jetzt hilft nicht mehr, sondern weniger. Und ein bisschen Mut, loszulassen.",
      sparen: [
        'noch mehr Abhalte-Momente einzubauen',
        'Protest zu überhören',
        'dich zu fragen, ob alles umsonst war',
        'jedes Pipi daneben zu zählen'
      ],
      ersterSchritt: 'Streich heute alle Abhalte-Momente bis auf einen: den, der bisher am besten geklappt hat.',
      satz: '„Wir machen gerade eine kleine Windelfrei-Pause. Das gehört dazu."',
      satzFuer: 'für alle, die fragen, ob es noch klappt',
      teilen: 'Rückschläge gehören dazu.',
      abschluss: "Du hast in einer schweren Phase nicht festgehalten, sondern losgelassen. Das ist das Mutigste, was man beim Abhalten tun kann. Dein Kind hat gespürt, dass sein Nein gehört wird. Und genau daraus wächst das nächste Ja.",
      kraftsatz: "Ein Rückschritt ist kein Ende.\nIch lasse los — und wir finden zurück.",
      nachspueren: ["Wie fühlt es sich an, loszulassen statt festzuhalten?", "Wie zeigt dir dein Kind ein Nein — und was macht das mit dir?", "Was ist in eurem Leben gerade alles neu?", "Was mag dein Kind jetzt, was es vorher nicht mochte?", "Wo will dein Kind gerade selbst bestimmen?", "Wie ging es dir mit einem Tag ganz ohne?", "Was darf in Zukunft wegbleiben?"],
      tage: [
        { titel: 'Auf einen Moment reduzieren', schritt: 'Heute nur noch der eine Abhalte-Moment, der bisher am besten geklappt hat. Alle anderen fallen weg.', warum: 'Weniger Momente heißt weniger Kampf. Und der eine Moment bekommt wieder Ruhe.', tipp: 'Es fühlt sich vielleicht wie ein Rückschritt an. Ist es nicht.' },
        { titel: 'Ein Nein ernst nehmen', schritt: 'Wenn dein Kind sich heute beim Abhalten wegdreht, steif macht oder weint: sofort aufhören, Windel dran, kuscheln.', warum: 'Dein Kind sagt dir gerade etwas. Wenn es merkt, dass sein Nein gehört wird, kommt es oft von selbst zurück.', tipp: 'Kein „nur noch kurz". Wirklich sofort.' },
        { titel: 'Was ist gerade neu?', schritt: 'Überleg kurz: Zahnt dein Kind? Krabbelt, läuft oder spricht es gerade neu? Gab es eine Veränderung — Kita-Start, Umzug, Besuch?', warum: 'Wenn viel Neues passiert, ist für das Abhalten gerade wenig Platz. Das geht vorbei.', tipp: 'Wenn dir etwas einfällt: Du hast die Erklärung gefunden, nicht das Problem.' },
        { titel: 'Neue Haltung, neuer Ort', schritt: 'Probier etwas anderes aus: ein anderes Töpfchen, das Waschbecken, oder dein Kind sitzt, statt gehalten zu werden.', warum: 'Manchmal passt nicht das Abhalten nicht mehr, sondern die Haltung — weil dein Kind gewachsen ist.', tipp: 'Lass dein Kind ruhig mitentscheiden, wo es sitzen mag.' },
        { titel: 'Mitmachen lassen', schritt: 'Lass dein Kind heute mitmachen: das Töpfchen selbst holen, die Windel mit ausziehen, mit ins Bad gehen.', warum: 'Größere Babys wollen selbst. Wenn sie mitbestimmen, wird Abhalten wieder etwas Gemeinsames.', tipp: 'Das dauert länger. Plan die Zeit ein oder lass es heute weg.' },
        { titel: 'Ein bewusster Pause-Tag', schritt: 'Heute ganz ohne Abhalten. Schau nur, wie es dir damit geht.', warum: 'Eine Pause ist kein Rückschritt. Oft wird es nach einem freien Tag leichter.', tipp: 'Wenn dein Kind dir heute von selbst zeigt, dass es muss: Dann natürlich.' },
        { titel: 'Was du jetzt weißt', schritt: 'Schau zurück: Was hat geholfen? Was darf wegbleiben?', warum: 'Du kennst jetzt euren Rhythmus in einer schweren Phase. Das trägt euch durch die nächste.', tipp: '' }
      ]
    },

    entdeckermaus: {
      name: 'Die Entdeckermaus',
      untertitel: 'Sauber werden ohne Druck',
      bild: 'img/entdeckermaus.png',
      tagline: 'Dein Kind wird sauber. In seinem Tempo.',
      text: "Dein Kind ist schon größer, und von außen kommt Druck: „Ist es denn immer noch nicht trocken?\" Vielleicht hast du diesen Satz so oft gehört, dass er inzwischen in deinem eigenen Kopf mitspricht. Lass ihn draußen. Dein Kind ist nicht spät dran — es hat seinen eigenen Takt. Kinder werden sauber, wenn Körper und Kopf so weit sind, und du kannst sie dabei begleiten, statt sie zu trainieren. Ohne Belohnungssystem, ohne Tränen.",
      sparen: [
        'Sticker-Tabellen und Belohnungen',
        'Vergleiche mit anderen Kindern',
        'Sätze wie „Du bist doch schon groß"',
        'einen Stichtag'
      ],
      ersterSchritt: 'Stell ein Töpfchen sichtbar ins Bad oder ins Kinderzimmer. Sag nichts dazu. Lass dein Kind es entdecken.',
      satz: '„Unser Kind wird sauber, wenn es so weit ist. Wir begleiten es dabei."',
      satzFuer: 'für alle, die fragen, ob es „endlich" trocken ist',
      teilen: 'Sauber werden in seinem Tempo.',
      abschluss: "Eine Woche ohne Druck — und dein Kind hat seinen Körper ein Stück mehr entdeckt. Vielleicht hast du dabei auch etwas abgelegt: die Erwartungen der anderen. Genau so geht es weiter. In seinem Takt, an deiner Hand.",
      kraftsatz: "Mein Kind hat seinen eigenen Takt.\nIch begleite es, statt es anzutreiben.",
      nachspueren: ["Wie hat dein Kind das Töpfchen entdeckt?", "Was hat dein Kind heute bei dir abgeschaut?", "Welche Worte benutzt ihr in eurer Familie — und wie fühlen sie sich an?", "Wie ging es dir, als etwas danebenging?", "Wie fühlt sich das Nein deines Kindes an, wenn du es einfach stehen lässt?", "Wessen Erwartungen trägst du gerade mit — und sind es deine?", "Was hat dein Kind diese Woche über sich entdeckt?"],
      tage: [
        { titel: 'Das Töpfchen ist einfach da', schritt: 'Stell ein Töpfchen sichtbar ins Bad oder ins Kinderzimmer. Sag nichts dazu.', warum: 'Was dein Kind selbst entdeckt, gehört ihm. Was man ihm vorsetzt, gehört den Erwachsenen.', tipp: 'Wenn es das Töpfchen als Hut benutzt: auch eine Form von Kennenlernen.' },
        { titel: 'Mit ins Bad', schritt: 'Nimm dein Kind heute mit, wenn du selbst zur Toilette gehst, und erzähl ganz nebenbei, was du machst.', warum: 'Kinder lernen durch Nachmachen. Was in der Familie normal ist, wird für sie normal.', tipp: 'Wenn dir das unangenehm ist: Ein Geschwisterkind oder der Partner geht genauso.' },
        { titel: 'Worte geben', schritt: 'Benenne heute, was du siehst: „Oh, du hast Pipi gemacht." Ohne Lob und ohne Tadel, einfach feststellen.', warum: 'Dein Kind verbindet das Gefühl im Körper mit einem Wort. Das ist der Anfang davon, es dir sagen zu können.', tipp: 'Nimm die Wörter, die in eurer Familie üblich sind.' },
        { titel: 'Zeit ohne Windel', schritt: 'Lass dein Kind zu Hause eine Weile ohne Windel, Töpfchen in der Nähe. Was danebengeht, wischst du ohne Kommentar weg.', warum: 'Ohne Windel spürt dein Kind, was passiert. Und es merkt, dass nichts Schlimmes daran ist.', tipp: 'Teppich weg, Handtuch hin. Dann bleibst du entspannt.' },
        { titel: 'Zwei kleine Gelegenheiten', schritt: 'Frag heute an zwei Stellen ganz beiläufig: nach dem Aufwachen und bevor ihr rausgeht. „Magst du aufs Töpfchen?" Ein Nein ist ein Nein.', warum: 'Feste kleine Gelegenheiten helfen mehr als ständiges Fragen. Und ein respektiertes Nein macht das nächste Ja leichter.', tipp: 'Nicht öfter fragen als zweimal.' },
        { titel: 'Dein Satz für draußen', schritt: 'Leg dir einen Satz zurecht für alle, die fragen, ob dein Kind „endlich" trocken ist. Einen Vorschlag findest du in deinem Ergebnis.', warum: 'Wenn du eine Antwort parat hast, prallt der Druck an dir ab und erreicht dein Kind nicht.', tipp: 'Sag ihn einmal laut vor dem Spiegel. Dann sitzt er.' },
        { titel: 'Was du jetzt weißt', schritt: 'Schau zurück: Was hat dein Kind diese Woche entdeckt? Was hast du losgelassen?', warum: 'Sauber werden ist kein Projekt mit Ziellinie. Du hast es gerade zu einem gemeinsamen Weg gemacht.', tipp: '' }
      ]
    }
  },

  /* Antworten der Mama-Maus auf den Abend-Check-in. Werden zufällig gewählt, nie zweimal hintereinander. */
  antworten: {
    geklappt: [
      'Schön! Merk dir, wie sich das angefühlt hat — nicht das Ergebnis, sondern den Moment.',
      'Da habt ihr euch verstanden. Genau darum geht es.',
      'Ein kleiner Moment, und du hast deinem Kind zugehört. Das zählt.',
      'Wunderbar. Und wenn es morgen nicht klappt, ist das heute trotzdem passiert.',
      'Siehst du? Du wusstest es. Du hast nur hingeschaut.'
    ],
    nicht: [
      'Völlig in Ordnung. Es gibt Tage, da passt es einfach nicht.',
      'Kein Ding. Morgen ist ein neuer Moment.',
      'Du hast trotzdem an euch gedacht. Mehr braucht es heute nicht.',
      'Manche Tage sind zum Durchkommen da, nicht zum Ausprobieren.',
      'Ein Tag ohne heißt nicht: Ihr seid raus. Ihr seid einfach Menschen.'
    ],
    daneben: [
      'Daneben gehört dazu. Wirklich. Jede Familie, die abhält, kennt das.',
      'Wischen, durchatmen, weiter. Da ist nichts schiefgelaufen, ihr lernt euch gerade kennen.',
      'Ein Pipi daneben heißt nur: Ihr seid noch dabei, euch einzuspielen.',
      'Wenn es dich geärgert hat: Das ist okay. Ärger heißt nicht, dass du es schlecht machst.',
      'Gut, dass du es probiert hast. Treffen kommt mit der Zeit.'
    ],
    garnichts: [
      'Dann geht heute gar nichts. Windel dran, Kaffee warm machen, fertig. Dein Schritt wartet auf dich.',
      'Du darfst heute einfach nur durchkommen. Ich schiebe deinen Schritt auf morgen.',
      'Müde Mamas brauchen keinen Plan, sondern eine Pause. Leg eine Hand auf deinen Bauch und atme einmal länger aus, als du einatmest. Mehr ist heute nicht zu tun.',
      'Heute zählt nur, dass ihr beide gut durch den Tag kommt. Alles andere kann warten.',
      'Danke, dass du ehrlich bist. Ein Pause-Tag ist kein verlorener Tag. Du bist nicht zu wenig — du bist müde. Und das ist etwas ganz anderes.'
    ]
  },

  zeiten: [
    { w: 'morgens', t: 'morgens' },
    { w: 'mittags', t: 'mittags' },
    { w: 'nachmittags', t: 'nachmittags' },
    { w: 'abends', t: 'abends' },
    { w: 'nachts', t: 'nachts' }
  ],

  muster: {
    morgens: 'Bei euch klappt es am ehesten morgens. Das ist euer Moment — bau darauf.',
    mittags: 'Bei euch klappt es am ehesten mittags. Vielleicht rund ums Essen oder den Mittagsschlaf?',
    nachmittags: 'Bei euch klappt es am ehesten am Nachmittag. Ein ruhiger Moment im Tag — behalte ihn.',
    abends: 'Bei euch klappt es am ehesten abends. Vielleicht passt der Moment vor dem Schlafen gut zu euch.',
    nachts: 'Bei euch klappt es am ehesten nachts. Das ist ungewöhnlich und völlig in Ordnung — dein Kind zeigt dir seinen Rhythmus.'
  },

  bauch: 'Oft weiß dein Bauch längst, was dein Kopf gerade erst liest.',

  hinweis: 'Pippins erste Schritte ersetzt keine Hebamme und keine Kinderärztin. Wenn dir an deinem Kind etwas Sorgen macht — Schmerzen beim Pipi machen, Blut, Fieber oder etwas, das sich nicht richtig anfühlt — frag dort nach.',
  datenschutz: 'Alles, was du hier eingibst, bleibt auf deinem Handy. Nichts wird an uns oder an andere geschickt. Nur wenn du unten freiwillig deine E-Mail einträgst, geht diese an unseren Newsletter-Dienst.'
};
