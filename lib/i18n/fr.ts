import type { Dictionary } from './en';

// Typed as Dictionary, so a key added to en.ts and forgotten here fails the
// build rather than silently rendering English inside a French page.
export const fr: Dictionary = {
  nav: {
    home: 'Accueil Yumo',
    links: [
      { href: '#how', label: 'Comment ça marche' },
      { href: '#features', label: 'Fonctionnalités' },
      { href: '#levels', label: 'Niveaux' },
      { href: '#pricing', label: 'Tarif' },
    ],
    comingSoon: 'Bientôt disponible',
    availableNow: 'Disponible',
    switchTo: 'Switch to English',
  },
  cta: {
    comingSoon: 'Bientôt disponible',
    freeOn: "Gratuit sur l'App Store et Google Play",
    iphone: 'Télécharger pour iPhone',
    android: 'Télécharger pour Android',
  },
  hero: {
    titleLead: 'Le japonais, appris',
    titleAccent: 'sans effort',
    lede: "Un nouveau mot japonais apparaît sur votre écran de verrouillage et votre écran d'accueil toutes les quelques heures. Pas de série à tenir, pas de leçon. Il apparaît, c'est tout.",
  },
  how: {
    eyebrow: 'Comment ça marche',
    titleLead: 'Trois étapes, puis',
    titleAccent: 'plus rien',
    lede: "Yumo se configure une fois, puis s'oublie. L'apprentissage se fait sur les écrans que vous regardez déjà.",
    steps: [
      {
        n: '01',
        title: 'Ajoutez le widget',
        body: "Appuyez longuement sur votre écran de verrouillage ou d'accueil et posez-y Yumo. C'est toute la configuration.",
      },
      {
        n: '02',
        title: 'Choisissez votre rythme',
        body: 'Un nouveau mot toutes les 6, 12 ou 24 heures en version gratuite. Toutes les 1, 2, 3 ou 4 heures avec Pro.',
      },
      {
        n: '03',
        title: "N'y pensez plus",
        body: "Les mots arrivent pendant que vous regardez l'heure. Touchez-en un pour l'écouter, l'enregistrer ou en tracer les traits.",
      },
    ],
  },
  lockScreen: {
    eyebrow: 'Écran de verrouillage',
    titleLead: 'Appris avant même de',
    titleAccent: 'déverrouiller',
    points: [
      {
        h: "L'écran que vous consultez le plus",
        p: "Vous regardez votre écran de verrouillage des dizaines de fois par jour sans y penser. Yumo y place un mot : la lecture se fait avant même que l'idée d'étudier vous vienne.",
      },
      {
        h: 'Rectangulaire ou en ligne',
        p: "L'accessoire rectangulaire affiche le kanji, sa lecture et son sens. La version en ligne se glisse à côté de l'heure, sur une seule ligne, pour un affichage presque invisible.",
      },
      {
        h: 'iPhone uniquement, et nous le disons',
        p: "Les widgets d'écran de verrouillage sont une fonctionnalité iOS. Les téléphones Android n'en ont pas : sur Android, Yumo vit sur l'écran d'accueil.",
      },
    ],
  },
  homeScreen: {
    eyebrow: "Écran d'accueil",
    titleLead: "Et sur l'écran d'où vous",
    titleAccent: 'travaillez',
    titleTail: '',
    points: [
      {
        h: 'Petit ou moyen',
        p: "Chaque widget porte son propre niveau et son propre rythme : vous pouvez afficher du N5 sur l'écran de verrouillage et du N3 sur l'écran d'accueil en même temps.",
      },
      {
        h: 'Sur Android',
        p: "Un widget d'écran d'accueil redimensionnable, qui suit le niveau et le rythme définis dans l'application. Android n'a pas de widgets d'écran de verrouillage, et Yumo ne prétend pas le contraire.",
      },
      {
        h: 'Toujours juste, toujours hors ligne',
        p: "Le mot affiché est une pure fonction de l'heure et de vos réglages. Aucun serveur ne le décide : il est identique sur chaque appareil et fonctionne en mode avion.",
      },
    ],
  },
  features: {
    eyebrow: 'Fonctionnalités',
    titleLead: 'Petite application,',
    titleAccent: 'riche',
    titleTail: '',
    lede: "Tout ce qui suit fonctionne sans compte, sans connexion, et sans rien envoyer nulle part.",
    items: [
      {
        id: 'strokes',
        title: 'Tracez les traits',
        body: "Entraînez-vous à écrire les kanji et les kana, ordre des traits guidé par KanjiVG.",
      },
      {
        id: 'audio',
        title: 'Écoutez chaque mot',
        body: "Prononciation par la voix japonaise de votre appareil. Aucun téléchargement, aucun streaming.",
      },
      {
        id: 'favourites',
        title: 'Gardez ce qui compte',
        body: 'Conservez les mots à revoir ; ils restent sur votre appareil.',
      },
      {
        id: 'languages',
        title: 'Quatre langues de traduction',
        body: "Anglais, français, allemand et espagnol, tous inclus dans l'application.",
      },
      {
        id: 'browse',
        title: 'Parcourez le dictionnaire',
        body: '7 972 mots avec lectures et traductions. N5 en version gratuite, tous les niveaux avec Pro.',
      },
      {
        id: 'themes',
        title: 'Thèmes',
        body: 'Clair, sombre ou système, plus les couleurs, la transparence et la couleur du texte du widget avec Pro.',
      },
      {
        id: 'notifications',
        title: 'Notifications, même rythme',
        body: 'Notifications de mots optionnelles, au rythme du widget, programmées localement.',
      },
      {
        id: 'offline',
        title: 'Entièrement hors ligne',
        body: "Tout le jeu de données est embarqué dans l'application. Yumo n'effectue aucune requête réseau.",
      },
    ],
  },
  levels: {
    eyebrow: 'Niveaux',
    titleLead: 'Du N5 au N1, ou laissez-le',
    titleAccent: 'progresser',
    lede: "Les {total} mots, classés par niveau JLPT. Choisissez-en un et restez-y, ou activez le mode Auto : Yumo vous fait monter au fil du temps, en réintroduisant les mots précédents pour les réviser.",
    words: '{n} mots',
    // The reference page is English-only, so the marker is carried inline
    // here rather than through footer.englishOnly — this string is the whole
    // link label, and a reader deserves the warning before the click.
    reference: 'Voir la liste complète du vocabulaire N5 (EN)',
    blurbs: {
      n5: 'Les 718 premiers mots. Tout est inclus dans la version gratuite.',
      n4: 'Les verbes et adjectifs du quotidien, ceux que vous entendrez vraiment.',
      n3: 'Le niveau charnière, et le plus grand saut de vocabulaire.',
      n2: 'Le japonais de la presse et du travail.',
      n1: "La longue traîne — 2 699 mots que la plupart des cours n'atteignent jamais.",
    },
  },
  browse: {
    eyebrow: 'Dictionnaire',
    titleLead: 'Tout le dictionnaire,',
    titleAccent: 'consultable',
    tabTitle: 'Dictionnaire',
    searchPlaceholder: 'Rechercher kanji, kana, romaji, sens…',
    all: 'Tous',
    points: [
      {
        h: 'Cherchez comme le mot vous revient',
        p: 'Recherchez parmi {total} mots par kanji, kana, romaji ou sens. Chaque entrée porte sa lecture, son romaji, son niveau JLPT et ses traductions en anglais, français, allemand et espagnol.',
      },
      {
        h: 'N5 gratuit, tous les niveaux avec Pro',
        p: 'En version gratuite, le dictionnaire couvre le N5 — {n5} mots. Yumo Pro ouvre tous les niveaux au-dessus.',
      },
      {
        h: 'Hors ligne, comme le reste de Yumo',
        p: "Tout est embarqué dans l'application : la recherche fonctionne sans aucune connexion.",
      },
    ],
  },
  pricing: {
    eyebrow: 'Tarif',
    titleLead: 'Un seul prix,',
    titleAccent: 'à vie',
    lede: "Yumo Pro est un achat unique. Pas d'abonnement, pas de renouvellement, aucun compte à résilier.",
    freeName: 'Gratuit',
    proName: 'Yumo Pro',
    once: 'une fois',
    free: [
      'Vocabulaire N5 — {n5} mots',
      'Un nouveau mot toutes les 6, 12 ou 24 heures',
      "Widgets écran de verrouillage et écran d'accueil",
      'Prononciation et tracé des traits',
      'Favoris, notifications et thèmes',
    ],
    pro: [
      'Tous les niveaux, du N5 au N1 — les {total} mots',
      'Un nouveau mot toutes les 1, 2, 3 ou 4 heures',
      'Le parcours Auto, du N5 au N1',
      'Le dictionnaire complet',
      'Couleurs, transparence et couleur du texte du widget',
    ],
  },
  privacy: {
    eyebrow: 'Confidentialité',
    titleLead: 'Elle ne collecte',
    titleAccent: 'rien',
    lede: "Non pas par choix de politique, qui pourrait changer, mais parce qu'il n'y a aucun serveur à qui envoyer quoi que ce soit.",
    claims: [
      {
        title: 'Aucun compte',
        body: "Il n'y a rien à créer. Yumo n'a ni connexion, ni profil, ni synchronisation dans le cloud.",
      },
      {
        title: 'Aucune analyse',
        body: "Aucun suivi d'usage, aucun rapport de plantage, aucun identifiant publicitaire, aucun SDK tiers en dehors de la facturation.",
      },
      {
        title: 'Rien ne quitte l’appareil',
        body: "Réglages, mots enregistrés et progression sont stockés localement. Supprimer l'application supprime tout.",
      },
      {
        title: 'Aucune requête réseau',
        body: "Tout le jeu de données est embarqué dans l'application. Yumo n'émet aucune requête : le hors-ligne est un choix de conception, pas un hasard.",
      },
    ],
    exceptionBefore:
      "La seule exception : l'achat de Yumo Pro transmet votre achat à Apple ou Google et à RevenueCat, qui le valide pour vous permettre de le restaurer ensuite. Tout est détaillé dans la ",
    exceptionLink: 'politique de confidentialité',
    exceptionAfter: ' (en anglais).',
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Avant de demander',
    items: [
      {
        q: "Pourquoi le mot n'a-t-il pas changé ?",
        a: "Yumo tourne à un rythme fixe — toutes les 6, 12 ou 24 heures en gratuit, ou toutes les 1 à 4 heures avec Pro. Entre deux, le mot reste. C'est voulu : un mot vu pendant quelques heures est un mot retenu.",
      },
      {
        q: 'Est-ce que ça marche sur Android ?',
        a: "Oui, sous forme de widget d'écran d'accueil. Les téléphones Android n'ont pas de widgets d'écran de verrouillage : cette partie est réservée à l'iPhone.",
      },
      {
        q: 'Yumo Pro est-il un abonnement ?',
        a: "Non. C'est un achat unique lié à votre compte App Store ou Google Play, restaurable sur tous les appareils où vous êtes connecté.",
      },
      {
        q: "Je n'entends rien quand je touche le haut-parleur.",
        a: "Yumo utilise la voix japonaise intégrée à votre appareil. Si aucune n'est installée, ajoutez-en une dans les réglages d'accessibilité — sur iPhone dans Contenu énoncé, sur Android dans Synthèse vocale.",
      },
      {
        q: 'Comment obtenir un remboursement ?',
        a: 'Les remboursements sont gérés par Apple et Google, pas par nous. Utilisez reportaproblem.apple.com, ou votre historique de commandes Google Play.',
      },
    ],
  },
  footer: {
    tagline: "Le japonais, sans ouvrir d'application.",
    support: 'Assistance',
    jlpt: 'Liste de mots N5',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    contact: 'Contact',
    englishOnly: ' (EN)',
    attribution:
      '© 2026 Yumo par SofDji. Diagrammes d’ordre des traits © KanjiVG (Ulrich Apel), CC BY-SA 4.0. Les traductions française, allemande et espagnole intègrent des données de JMdict/EDICT (EDRDG), utilisées sous licence CC BY-SA 4.0.',
  },
  meta: {
    title: 'Yumo — Le japonais sur votre écran de verrouillage',
    description:
      "Un nouveau mot japonais sur votre écran de verrouillage toutes les quelques heures. 7 972 mots, entièrement hors ligne, sans compte ni suivi.",
    ogDescription:
      'Un nouveau mot japonais toutes les quelques heures. 7 972 mots, entièrement hors ligne, sans compte.',
  },
};
