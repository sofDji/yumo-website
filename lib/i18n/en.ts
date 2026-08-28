// Every string the site renders, in the source language. `fr.ts` is typed
// against this shape, so a key added here and forgotten there is a compile
// error rather than a silent fallback to English.
export const en = {
  nav: {
    home: 'Yumo home',
    links: [
      { href: '#how', label: 'How it works' },
      { href: '#features', label: 'Features' },
      { href: '#levels', label: 'Levels' },
      { href: '#pricing', label: 'Pricing' },
    ],
    comingSoon: 'Coming soon',
    availableNow: 'Available now',
    switchTo: 'Passer en français',
  },
  cta: {
    comingSoon: 'Coming soon',
    freeOn: 'Free on the App Store and Google Play',
    iphone: 'Download for iPhone',
    android: 'Get it on Android',
  },
  hero: {
    titleLead: 'Japanese, learned',
    titleAccent: 'without trying',
    lede: 'A new Japanese word appears on your Lock Screen and Home Screen every few hours. No streaks, no lessons, nothing to remember to open.',
  },
  how: {
    eyebrow: 'How it works',
    titleLead: 'Three steps, then',
    titleAccent: 'nothing',
    lede: 'Yumo is designed to be set up once and then forgotten. The learning happens on screens you already look at.',
    steps: [
      {
        n: '01',
        title: 'Add the widget',
        body: 'Long-press your Lock Screen or Home Screen and drop Yumo in. That is the entire setup.',
      },
      {
        n: '02',
        title: 'Pick your rhythm',
        body: 'A new word every 6, 12 or 24 hours on the free tier. Every 1, 2, 3 or 4 hours with Pro.',
      },
      {
        n: '03',
        title: 'Stop thinking about it',
        body: 'Words arrive while you check the time. Tap one to hear it, save it, or trace its strokes.',
      },
    ],
  },
  lockScreen: {
    eyebrow: 'Lock Screen',
    titleLead: 'Learned before you even',
    titleAccent: 'unlock',
    points: [
      {
        h: 'The screen you check most',
        p: 'You look at your Lock Screen dozens of times a day without deciding to. Yumo puts a word there, so the reading happens before you have thought about studying.',
      },
      {
        h: 'Rectangular or inline',
        p: 'The rectangular accessory shows the kanji, its reading and its meaning. The inline one sits beside the time as a single line, for when you want it almost invisible.',
      },
      {
        h: 'iPhone only, and we say so',
        p: 'Lock Screen widgets are an iOS feature. Android phones do not have them, so on Android Yumo lives on the home screen instead.',
      },
    ],
  },
  homeScreen: {
    eyebrow: 'Home Screen',
    titleLead: 'And on the screen you',
    titleAccent: 'work',
    titleTail: 'from',
    points: [
      {
        h: 'Small or medium',
        p: 'Every widget carries its own level and rhythm, so you can run N5 on the Lock Screen and N3 on the Home Screen at the same time.',
      },
      {
        h: 'On Android',
        p: 'A resizable home-screen widget that follows the level and rhythm you set in the app. Android has no Lock Screen widgets, so Yumo does not pretend otherwise.',
      },
      {
        h: 'Always right, always offline',
        p: 'The word shown is a pure function of the time and your settings. No server decides it, so it is identical on every device and works in aeroplane mode.',
      },
    ],
  },
  features: {
    eyebrow: 'Features',
    titleLead: 'Small app,',
    titleAccent: 'deep',
    titleTail: 'app',
    lede: 'Everything below works without an account, without a connection, and without sending anything anywhere.',
    items: [
      {
        id: 'strokes',
        title: 'Trace the strokes',
        body: 'Practise writing kanji and kana with guided stroke order from KanjiVG.',
      },
      {
        id: 'audio',
        title: 'Hear every word',
        body: 'Native pronunciation through your device&apos;s Japanese voice. No downloads, no streaming.',
      },
      {
        id: 'favourites',
        title: 'Save what matters',
        body: 'Keep the words you want to revisit; they stay on your device.',
      },
      {
        id: 'languages',
        title: 'Four meaning languages',
        body: 'English, French, German and Spanish, all bundled in the app.',
      },
      {
        id: 'browse',
        title: 'Browse the dictionary',
        body: '7,972 words with readings and meanings. N5 on the free tier, every level with Pro.',
      },
      {
        id: 'themes',
        title: 'Themes',
        body: 'Light, dark or system, plus widget colours, transparency and text colour with Pro.',
      },
      {
        id: 'notifications',
        title: 'Notifications, same rhythm',
        body: 'Optional word notifications on the widget schedule, scheduled locally.',
      },
      {
        id: 'offline',
        title: 'Completely offline',
        body: 'The whole dataset ships inside the app. Yumo makes no network requests of its own.',
      },
    ],
  },
  levels: {
    eyebrow: 'Levels',
    titleLead: 'N5 to N1, or let it',
    titleAccent: 'climb',
    lede: 'All {total} words, graded by JLPT level. Pick one and stay there, or turn on Auto and let Yumo move you up as you go, weaving earlier words back in for review.',
    words: '{n} words',
    blurbs: {
      n5: 'The first 718 words. Everything on the free tier.',
      n4: 'Everyday verbs and adjectives you will actually hear.',
      n3: 'The bridge level, and the largest jump in vocabulary.',
      n2: 'Newspaper and workplace Japanese.',
      n1: 'The long tail — 2,699 words most courses never reach.',
    },
  },
  browse: {
    eyebrow: 'Browse',
    titleLead: 'The whole dictionary,',
    titleAccent: 'searchable',
    tabTitle: 'Browse',
    searchPlaceholder: 'Search kanji, kana, romaji, meaning…',
    all: 'All',
    points: [
      {
        h: 'Search however you remember it',
        p: 'Search {total} words by kanji, kana, romaji or meaning. Every entry carries its reading, its romaji, its JLPT level and meanings in English, French, German and Spanish.',
      },
      {
        h: 'N5 free, every level with Pro',
        p: 'On the free tier Browse covers N5 — {n5} words. Yumo Pro opens every level above it.',
      },
      {
        h: 'Offline, like the rest of Yumo',
        p: 'It all ships inside the app, so search works with no connection at all.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    titleLead: 'One price,',
    titleAccent: 'forever',
    lede: 'Yumo Pro is a single purchase. No subscription, no renewal, no account to cancel.',
    freeName: 'Free',
    proName: 'Yumo Pro',
    once: 'once',
    free: [
      'N5 vocabulary — {n5} words',
      'A new word every 6, 12 or 24 hours',
      'Lock Screen and Home Screen widgets',
      'Pronunciation and stroke practice',
      'Favourites, notifications and themes',
    ],
    pro: [
      'Every level, N5 to N1 — all {total} words',
      'A new word every 1, 2, 3 or 4 hours',
      'The Auto journey, climbing N5 to N1',
      'Browse the full dictionary',
      'Widget colours, transparency and text colour',
    ],
  },
  privacy: {
    eyebrow: 'Privacy',
    titleLead: 'It collects',
    titleAccent: 'nothing',
    lede: 'Not as a policy decision that could change, but because there is no server to send anything to.',
    claims: [
      {
        title: 'No account',
        body: 'There is nothing to sign up for. Yumo has no login, no profile and no cloud sync.',
      },
      {
        title: 'No analytics',
        body: 'No usage tracking, no crash reporting, no advertising identifiers, no third-party SDKs beyond billing.',
      },
      {
        title: 'Nothing leaves the device',
        body: 'Settings, saved words and progress are stored locally. Deleting the app deletes all of it.',
      },
      {
        title: 'No network requests',
        body: 'The whole dataset ships inside the app. Yumo makes no requests of its own, so it works offline by design rather than by accident.',
      },
    ],
    exceptionBefore:
      'The one exception: buying Yumo Pro sends your purchase to Apple or Google and to RevenueCat, which validates it so you can restore it later. That is described in full in the ',
    exceptionLink: 'privacy policy',
    exceptionAfter: '.',
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Before you ask',
    items: [
      {
        q: 'Why has the word not changed?',
        a: 'Yumo rotates on a fixed rhythm — every 6, 12 or 24 hours free, or every 1 to 4 hours with Pro. Between those points the word holds. That is intended: a word you see for a few hours is a word you remember.',
      },
      {
        q: 'Does it work on Android?',
        a: 'Yes, as a home-screen widget. Android phones have no Lock Screen widgets, so that part is iPhone only.',
      },
      {
        q: 'Is Yumo Pro a subscription?',
        a: 'No. It is a single purchase tied to your App Store or Google Play account, restorable on any device you sign into.',
      },
      {
        q: 'I hear nothing when I tap the speaker.',
        a: 'Yumo speaks through your device&apos;s built-in Japanese voice. If none is installed, add one in Accessibility settings — iPhone under Spoken Content, Android under Text-to-speech output.',
      },
      {
        q: 'How do I get a refund?',
        a: 'Refunds are handled by Apple and Google, not by us. Use reportaproblem.apple.com, or your Google Play order history.',
      },
    ],
  },
  footer: {
    tagline: 'Japanese, without opening an app.',
    support: 'Support',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    /** Marker appended to links that leave the reader's language. */
    englishOnly: '',
    attribution:
      '© 2026 Yumo. Stroke order diagrams © KanjiVG (Ulrich Apel), CC BY-SA 4.0. French, German and Spanish translations include data from JMdict/EDICT (EDRDG), used under CC BY-SA 4.0.',
  },
  meta: {
    title: 'Yumo — Japanese on your Lock Screen',
    description:
      'A new Japanese word on your Lock Screen and Home Screen every few hours. 7,972 words, fully offline, no accounts, no tracking.',
    ogDescription:
      'A new Japanese word every few hours. 7,972 words, fully offline, no accounts.',
  },
};

export type Dictionary = typeof en;
