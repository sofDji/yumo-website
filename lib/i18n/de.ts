import type { Dictionary } from './en';

// Typed as Dictionary, so a key added to en.ts and forgotten here fails the
// build rather than silently rendering English inside a German page. Informal
// "du" throughout, as the app itself addresses its users.
export const de: Dictionary = {
  nav: {
    home: 'Yumo Startseite',
    links: [
      { href: '#how', label: 'So funktioniert’s' },
      { href: '#features', label: 'Funktionen' },
      { href: '#kana', label: 'Kana' },
      { href: '#levels', label: 'Stufen' },
      { href: '#pricing', label: 'Preis' },
    ],
    comingSoon: 'Bald verfügbar',
    getIphone: 'Für iPhone laden',
    getAndroid: 'Für Android laden',
    getApp: 'App holen',
    language: 'Sprache',
  },
  cta: {
    comingSoon: 'Bald verfügbar',
    freeOn: 'Kostenlos im App Store und bei Google Play',
    androidSoon: 'Kostenlos im App Store. Android folgt bald.',
    iphoneSoon: 'Kostenlos bei Google Play. iPhone folgt bald.',
    iphone: 'Für iPhone laden',
    android: 'Für Android laden',
  },
  appBanner: {
    label: 'Hol dir die Yumo-App',
    get: 'Laden',
    dismiss: 'Schließen',
  },
  hero: {
    titleLead: 'Japanisch lernen,',
    titleAccent: 'ganz nebenbei',
    lede: "Alle paar Stunden ein neues japanisches Wort auf deinem Sperrbildschirm, mit einem echten Satz dazu. Übe es, schreibe es und behalte es ganz ohne Mühe.",
    ledeWithShare: "Alle paar Stunden ein neues japanisches Wort auf deinem Sperrbildschirm, mit einem echten Satz dazu. Übe es, schreibe es und teile es jetzt auch.",
    onStore: "im App Store",
    isNew: "Neu: Wörter als Story teilen",
    rated: "Mit {rating} von 5 bewertet",
  },
  how: {
    eyebrow: 'So funktioniert’s',
    titleLead: 'Drei Schritte, dann',
    titleAccent: 'nichts mehr',
    lede: 'Yumo richtest du einmal ein und vergisst es dann. Gelernt wird auf Bildschirmen, auf die du ohnehin schaust.',
    steps: [
      {
        n: '01',
        title: 'Widget hinzufügen',
        body: 'Drück lange auf deinen Sperr- oder Home-Bildschirm und setz Yumo dazu. Das ist die ganze Einrichtung.',
      },
      {
        n: '02',
        title: 'Wähl deinen Rhythmus',
        body: 'Ein neues Wort alle 6, 12 oder 24 Stunden in der Gratisversion. Alle 1, 2, 3 oder 4 Stunden mit Pro.',
      },
      {
        n: '03',
        title: 'Denk nicht mehr dran',
        body: 'Die Wörter kommen, während du auf die Uhr schaust. Tipp eins an, um es zu hören, zu speichern oder seine Striche nachzuzeichnen.',
      },
    ],
  },
  lockScreen: {
    eyebrow: 'Sperrbildschirm',
    titleLead: 'Gelernt, noch bevor du',
    titleAccent: 'entsperrst',
    date: 'Montag, 2. November',
    sentence: { before: 'Der ', word: 'Montag', after: ' gehört verboten.' },
    points: [
      {
        h: 'Der Bildschirm, den du am häufigsten siehst',
        p: 'Du schaust jeden Tag dutzende Male auf deinen Sperrbildschirm, ohne es dir vorzunehmen. Yumo legt dort ein Wort ab – so liest du es, bevor du überhaupt ans Lernen gedacht hast.',
      },
      {
        h: 'Ein Beispielsatz, genau dort',
        p: 'Mit Yumo Pro schaltest du eine Live-Aktivität ein: Jedes neue Wort bringt einen Beispielsatz auf deinen Sperrbildschirm, auf Japanisch, in Romaji und in deiner Sprache, das Wort hervorgehoben. Dafür brauchst du ein iPhone mit iOS 17.2 oder neuer und eine Internetverbindung.',
      },
      {
        h: 'Rechteckig oder einzeilig',
        p: 'Das rechteckige Widget zeigt das Kanji, seine Lesung und seine Bedeutung. Das einzeilige steht als schmale Zeile neben der Uhrzeit, wenn du es fast unsichtbar haben willst.',
      },
      {
        h: 'Nur auf dem iPhone, und wir sagen es offen',
        p: 'Sperrbildschirm-Widgets sind eine iOS-Funktion. Android-Handys haben keine, deshalb lebt Yumo auf Android stattdessen auf dem Home-Bildschirm.',
      },
    ],
  },
  homeScreen: {
    eyebrow: 'Home-Bildschirm',
    titleLead: 'Und auf dem Bildschirm, mit dem du',
    titleAccent: 'arbeitest',
    titleTail: '',
    points: [
      {
        h: 'Klein oder mittel',
        p: 'Jedes Widget hat seine eigene Stufe und seinen eigenen Rhythmus – so kannst du gleichzeitig N5 auf dem Sperrbildschirm und N3 auf dem Home-Bildschirm laufen lassen.',
      },
      {
        h: 'Auf Android',
        p: 'Ein skalierbares Widget für den Home-Bildschirm, das der Stufe und dem Rhythmus folgt, die du in der App einstellst. Android hat keine Sperrbildschirm-Widgets, und Yumo tut auch nicht so.',
      },
      {
        h: 'Immer richtig, immer offline',
        p: 'Welches Wort erscheint, ergibt sich allein aus der Uhrzeit und deinen Einstellungen. Kein Server entscheidet darüber, deshalb ist es auf jedem Gerät gleich und funktioniert im Flugmodus.',
      },
    ],
  },
  features: {
    eyebrow: 'Funktionen',
    titleLead: 'Kleine App,',
    titleAccent: 'viel',
    titleTail: 'dahinter',
    lede: 'Alles hier funktioniert ohne Konto, ohne Verbindung und ohne irgendetwas irgendwohin zu senden.',
    items: [
      {
        id: 'strokes',
        title: 'Striche nachzeichnen',
        body: 'Übe, Kanji und Kana zu schreiben – mit geführter Strichfolge von KanjiVG.',
      },
      {
        id: 'audio',
        title: 'Jedes Wort hören',
        body: 'Japanische Aussprache über die eingebaute Stimme deines Geräts. Keine Downloads, kein Streaming.',
      },
      {
        id: 'favourites',
        title: 'Behalten, was zählt',
        body: 'Speichere die Wörter, die du wiedersehen willst; sie bleiben auf deinem Gerät.',
      },
      {
        id: 'languages',
        title: 'Sechs Bedeutungssprachen',
        body: 'Englisch, Französisch, Deutsch, Spanisch, Koreanisch und Vietnamesisch, alle in der App enthalten.',
      },
      {
        id: 'browse',
        title: 'Das Wörterbuch entdecken',
        body: '7.972 Wörter mit Lesungen und Bedeutungen. N5 in der Gratisversion, alle Stufen mit Pro.',
      },
      {
        id: 'themes',
        title: 'Designs',
        body: 'Hell, dunkel oder wie das System, dazu mit Pro Widget-Farben, Transparenz und Textfarbe.',
      },
      {
        id: 'notifications',
        title: 'Mitteilungen im selben Takt',
        body: 'Optionale Wort-Mitteilungen im Rhythmus des Widgets, lokal geplant.',
      },
      {
        id: 'offline',
        title: 'Komplett offline',
        body: 'Der gesamte Datensatz steckt in der App. Lernen braucht keine Verbindung.',
      },
    ],
  },
  kana: {
    eyebrow: 'Kana',
    titleLead: 'Fang dort an, wo Japanisch',
    titleAccent: 'anfängt',
    tabTitle: 'Kana',
    hiragana: 'Hiragana',
    katakana: 'Katakana',
    basic: 'Grundzeichen',
    points: [
      {
        h: 'Beide Schriften, jedes Kana',
        p: 'Hiragana und Katakana nebeneinander: die {basic} Grundzeichen, {dakuten} mit Dakuten und Handakuten und {combo} Kombinationen, jeweils mit Romaji.',
      },
      {
        h: 'Tipp eins an, um es zu schreiben',
        p: 'Jedes Zeichen öffnet eine Übung zur Strichfolge, von あ bis ヲ. Kombinationen wie きゃ übst du Zeichen für Zeichen.',
      },
      {
        h: 'Für alle kostenlos',
        p: 'Der Kana-Tab gehört zur Gratisversion. Kein Pro, kein Konto, und er funktioniert offline wie der Rest von Yumo.',
      },
    ],
  },
  levels: {
    eyebrow: 'Stufen',
    titleLead: 'N5 bis N1, oder lass es',
    titleAccent: 'aufsteigen',
    lede: 'Alle {total} Wörter, sortiert nach JLPT-Stufe. Yumo startet dich im Auto-Modus bei N5; mit Yumo Pro steigst du mit den Tagen auf, und frühere Wörter kommen zur Wiederholung zurück. Oder wähl eine Stufe und bleib dabei.',
    words: '{n} Wörter',
    // The reference page is English-only, so the marker rides on the button.
    reference: {
      title: 'Die ganze N5-Liste ansehen',
      body: 'Alle {n} Wörter der Stufe, mit der alle anfangen – frei lesbar, ohne Konto, ohne Installation.',
      cta: 'N5-Wortschatz ansehen (EN)',
    },
    blurbs: {
      n5: 'Die ersten 718 Wörter. Alles in der Gratisversion.',
      n4: 'Alltägliche Verben und Adjektive, die du wirklich hören wirst.',
      n3: 'Die Brückenstufe und der größte Sprung im Wortschatz.',
      n2: 'Japanisch aus Zeitung und Büro.',
      n1: 'Die Kür – 2.699 Wörter, die die meisten Kurse nie erreichen.',
    },
  },
  browse: {
    eyebrow: 'Entdecken',
    titleLead: 'Das ganze Wörterbuch,',
    titleAccent: 'durchsuchbar',
    tabTitle: 'Entdecken',
    searchPlaceholder: 'Suche Kanji, Kana, Romaji, Bedeutung…',
    all: 'Alle',
    points: [
      {
        h: 'Such so, wie du dich erinnerst',
        p: 'Durchsuche {total} Wörter nach Kanji, Kana, Romaji oder Bedeutung. Jeder Eintrag hat seine Lesung, sein Romaji, seine JLPT-Stufe und Bedeutungen auf Englisch, Französisch, Deutsch, Spanisch, Koreanisch und Vietnamesisch.',
      },
      {
        h: 'N5 gratis, alle Stufen mit Pro',
        p: 'In der Gratisversion umfasst Entdecken die Stufe N5 – {n5} Wörter. Yumo Pro öffnet alle Stufen darüber.',
      },
      {
        h: 'Offline, wie der Rest von Yumo',
        p: 'Alles steckt in der App, die Suche funktioniert also ganz ohne Verbindung.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Preis',
    titleLead: 'Ein Preis,',
    titleAccent: 'für immer',
    lede: 'Yumo Pro ist ein Einmalkauf. Kein Abo, keine Verlängerung, kein Konto zum Kündigen.',
    freeName: 'Gratis',
    proName: 'Yumo Pro',
    once: 'einmalig',
    free: [
      'N5-Wortschatz – {n5} Wörter',
      'Ein neues Wort alle 6, 12 oder 24 Stunden',
      'Widgets für Sperr- und Home-Bildschirm',
      'Hiragana- und Katakana-Tabelle',
      'Aussprache und Strichfolge-Übung',
      'Favoriten, Mitteilungen und Designs',
    ],
    pro: [
      'Alle Stufen, N5 bis N1 – alle {total} Wörter',
      'Ein neues Wort alle 1, 2, 3 oder 4 Stunden',
      'Beispielsätze auf dem Sperrbildschirm (iPhone)',
      'Der Auto-Weg, von N5 bis N1',
      'Das ganze Wörterbuch entdecken',
      'Widget-Farben, Transparenz und Textfarbe',
    ],
  },
  privacy: {
    eyebrow: 'Datenschutz',
    titleLead: 'Sie sammelt',
    titleAccent: 'nichts',
    lede: 'Kein Konto, kein Profil, keine Werbung. Deine Wörter und dein Fortschritt verlassen nie dein Handy.',
    claims: [
      {
        title: 'Kein Konto',
        body: 'Es gibt nichts, wofür du dich anmelden müsstest. Yumo hat keinen Login, kein Profil und keine Cloud-Synchronisierung.',
      },
      {
        title: 'Kein Tracking',
        body: 'Keine Nutzungsanalyse, keine Absturzberichte, keine Werbe-IDs. Nichts folgt dir von App zu App.',
      },
      {
        title: 'Nichts verlässt das Gerät',
        body: 'Einstellungen, gespeicherte Wörter und Fortschritt liegen lokal. Wer die App löscht, löscht alles.',
      },
      {
        title: 'Offline aus Prinzip',
        body: 'Der gesamte Datensatz steckt in der App, Lernen funktioniert im Flugmodus also mit Absicht und nicht zufällig.',
      },
    ],
    exceptionBefore:
      'Drei Ausnahmen: Wenn du Yumo Pro kaufst, geht dein Kauf an Apple oder Google und an RevenueCat, das ihn prüft, damit du ihn später wiederherstellen kannst; auf dem iPhone laufen die optionalen „News & updates“-Mitteilungen über OneSignal, das den Push-Token deines Geräts erhält; und wenn du den Satz auf dem Sperrbildschirm (Yumo Pro) einschaltest, gehen deine Sprache, deine Zeitzone und deine Wort-Einstellungen an den Yumo-Server, damit er die Karte starten kann. Alles steht ausführlich in der ',
    exceptionLink: 'Datenschutzerklärung',
    exceptionAfter: ' (auf Englisch).',
  },
  faq: {
    eyebrow: 'Fragen',
    title: 'Bevor du fragst',
    playSoon: 'Die Android-Version kommt bald zu Google Play.',
    items: [
      {
        q: 'Was ist Yumo?',
        a: 'Yumo ist eine App für japanischen Wortschatz auf iPhone und Android. Ihr Widget zeigt dir alle paar Stunden ein neues japanisches Wort auf dem Sperr- oder Home-Bildschirm, und alles funktioniert offline. Die Stufe N5 ist kostenlos; ein einmaliger Kauf von Yumo Pro für {price} schaltet alle {total} Wörter frei, von N5 bis N1.',
      },
      {
        q: 'Kann ich Hiragana und Katakana lernen?',
        a: 'Ja. Der Kana-Tab zeigt beide Schriften mit Romaji – Grundzeichen, Dakuten und Handakuten sowie Kombinationen – und ein Tipp auf ein Kana öffnet die Strichfolge-Übung. Das ist kostenlos, ganz ohne Yumo Pro.',
      },
      {
        q: 'Warum hat sich das Wort nicht geändert?',
        a: 'Yumo wechselt in einem festen Rhythmus – alle 6, 12 oder 24 Stunden gratis, oder alle 1 bis 4 Stunden mit Pro. Dazwischen bleibt das Wort stehen. Das ist Absicht: Ein Wort, das du ein paar Stunden lang siehst, ist ein Wort, das du dir merkst.',
      },
      {
        q: 'Funktioniert es auf Android?',
        a: 'Ja, als Widget für den Home-Bildschirm. Android-Handys haben keine Sperrbildschirm-Widgets, diesen Teil gibt es also nur auf dem iPhone. {playSoon}',
      },
      {
        q: 'Ist Yumo Pro ein Abo?',
        a: 'Nein. Es ist ein Einmalkauf, verknüpft mit deinem App-Store- oder Google-Play-Konto, und auf jedem Gerät wiederherstellbar, auf dem du angemeldet bist.',
      },
      {
        q: 'Ich höre nichts, wenn ich auf den Lautsprecher tippe.',
        a: 'Yumo spricht über die eingebaute japanische Stimme deines Geräts. Ist keine installiert, füge eine in den Bedienungshilfen hinzu – auf dem iPhone unter „Gesprochene Inhalte“, auf Android unter „Sprachausgabe“.',
      },
      {
        q: 'Wie bekomme ich eine Erstattung?',
        a: 'Erstattungen laufen über Apple und Google, nicht über uns. Nutze reportaproblem.apple.com oder deinen Bestellverlauf bei Google Play.',
      },
    ],
  },
  reviews: {
    titleLead: "Die Leute",
    titleAccent: "mögen es",
    titleEnd: "wirklich",
    translatedFrom: "Aus dem {language} übersetzt",
    languages: { en: "Englischen", fr: "Französischen", de: '', es: '', ko: '', vi: '' },
  },
  story: {
    eyebrow: "Neu · Story-Maker",
    titleLead: "Ein Wort gelernt?",
    titleAccent: "Poste es.",
    lede: "Mach aus jedem Wort eine Instagram-Story. Wähle ein Foto, setze den Ausschnitt, dann Format und Farbe.",
    caption: "lerne Japanisch mit Yumo",
  },
  footer: {
    tagline: 'Japanisch, ohne eine App zu öffnen.',
    support: 'Hilfe',
    jlpt: 'N5-Wortliste',
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    contact: 'Kontakt',
    social: 'Yumo auf {network}',
    englishOnly: ' (EN)',
    attribution:
      '© 2026 Yumo von SofDji. Strichfolge-Diagramme © KanjiVG (Ulrich Apel), CC BY-SA 4.0. Die französischen, deutschen und spanischen Übersetzungen enthalten Daten aus JMdict/EDICT (EDRDG), verwendet unter CC BY-SA 4.0.',
  },
  meta: {
    title: 'Yumo — Japanische Vokabeln auf deinem Sperrbildschirm',
    description:
      'Alle paar Stunden ein neues japanisches Wort auf dem Sperrbildschirm deines iPhone oder dem Android-Home-Bildschirm. 7.972 Wörter von JLPT N5 bis N1, Hiragana und Katakana, komplett offline.',
    ogDescription:
      'Alle paar Stunden ein neues japanisches Wort. 7.972 Wörter, komplett offline, kein Konto.',
  },
};
