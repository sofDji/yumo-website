import type { Dictionary } from './en';

// Typed as Dictionary, so a key added to en.ts and forgotten here fails the
// build rather than silently rendering English inside a Spanish page. Informal
// "tú" throughout, as the app itself addresses its users. Four-digit numbers
// carry no separator (7972), which is both the RAE rule and what Intl's es-ES
// formatter prints for the counts filled in at render time.
export const es: Dictionary = {
  nav: {
    home: 'Inicio de Yumo',
    links: [
      { href: '#how', label: 'Cómo funciona' },
      { href: '#features', label: 'Funciones' },
      { href: '#kana', label: 'Kana' },
      { href: '#levels', label: 'Niveles' },
      { href: '#pricing', label: 'Precio' },
    ],
    comingSoon: 'Próximamente',
    getIphone: 'Descargar para iPhone',
    getAndroid: 'Descargar para Android',
    getApp: 'Obtener la app',
    language: 'Idioma',
  },
  cta: {
    comingSoon: 'Próximamente',
    freeOn: 'Gratis en el App Store y Google Play',
    androidSoon: 'Gratis en el App Store. Android, próximamente.',
    iphoneSoon: 'Gratis en Google Play. iPhone, próximamente.',
    iphone: 'Descargar para iPhone',
    android: 'Descargar para Android',
  },
  appBanner: {
    label: 'Consigue la app Yumo',
    get: 'Obtener',
    dismiss: 'Cerrar',
  },
  hero: {
    titleLead: 'Japonés, aprendido',
    titleAccent: 'sin esfuerzo',
    lede: 'Yumo pone una palabra japonesa nueva en tu pantalla de bloqueo y de inicio cada pocas horas. Sin rachas, sin lecciones. Simplemente aparece.',
  },
  how: {
    eyebrow: 'Cómo funciona',
    titleLead: 'Tres pasos, y luego',
    titleAccent: 'nada',
    lede: 'Yumo está pensado para configurarlo una vez y olvidarte. El aprendizaje ocurre en pantallas que ya miras.',
    steps: [
      {
        n: '01',
        title: 'Añade el widget',
        body: 'Mantén pulsada la pantalla de bloqueo o de inicio y coloca Yumo. Esa es toda la configuración.',
      },
      {
        n: '02',
        title: 'Elige tu ritmo',
        body: 'Una palabra nueva cada 6, 12 o 24 horas en la versión gratuita. Cada 1, 2, 3 o 4 horas con Pro.',
      },
      {
        n: '03',
        title: 'Deja de pensar en ello',
        body: 'Las palabras llegan mientras miras la hora. Toca una para oírla, guardarla o practicar su escritura.',
      },
    ],
  },
  lockScreen: {
    eyebrow: 'Pantalla de bloqueo',
    titleLead: 'Aprendida antes incluso de',
    titleAccent: 'desbloquear',
    points: [
      {
        h: 'La pantalla que más miras',
        p: 'Miras la pantalla de bloqueo decenas de veces al día sin proponértelo. Yumo pone ahí una palabra, así que la lees antes de haber pensado en estudiar.',
      },
      {
        h: 'Rectangular o en línea',
        p: 'El accesorio rectangular muestra el kanji, su lectura y su significado. El de una línea se coloca junto a la hora, para cuando lo quieres casi invisible.',
      },
      {
        h: 'Solo en iPhone, y lo decimos',
        p: 'Los widgets de pantalla de bloqueo son una función de iOS. Los teléfonos Android no los tienen, así que en Android Yumo vive en la pantalla de inicio.',
      },
    ],
  },
  homeScreen: {
    eyebrow: 'Pantalla de inicio',
    titleLead: 'Y en la pantalla desde la que',
    titleAccent: 'trabajas',
    titleTail: '',
    points: [
      {
        h: 'Pequeño o mediano',
        p: 'Cada widget tiene su propio nivel y su propio ritmo, así que puedes tener N5 en la pantalla de bloqueo y N3 en la de inicio a la vez.',
      },
      {
        h: 'En Android',
        p: 'Un widget de pantalla de inicio redimensionable que sigue el nivel y el ritmo que elijas en la app. Android no tiene widgets de pantalla de bloqueo, y Yumo no finge lo contrario.',
      },
      {
        h: 'Siempre correcto, siempre sin conexión',
        p: 'La palabra que aparece depende solo de la hora y de tus ajustes. Ningún servidor la decide, así que es idéntica en todos tus dispositivos y funciona en modo avión.',
      },
    ],
  },
  features: {
    eyebrow: 'Funciones',
    titleLead: 'App pequeña,',
    titleAccent: 'mucho',
    titleTail: 'dentro',
    lede: 'Todo lo que sigue funciona sin cuenta, sin conexión y sin enviar nada a ninguna parte.',
    items: [
      {
        id: 'strokes',
        title: 'Practica los trazos',
        body: 'Practica la escritura de kanji y kana con el orden de trazos guiado de KanjiVG.',
      },
      {
        id: 'audio',
        title: 'Escucha cada palabra',
        body: 'Pronunciación con la voz japonesa integrada de tu dispositivo. Sin descargas, sin streaming.',
      },
      {
        id: 'favourites',
        title: 'Guarda lo que importa',
        body: 'Conserva las palabras que quieras repasar; se quedan en tu dispositivo.',
      },
      {
        id: 'languages',
        title: 'Cinco idiomas de significado',
        body: 'Inglés, francés, alemán, español y coreano, todos incluidos en la app.',
      },
      {
        id: 'browse',
        title: 'Explora el diccionario',
        body: '7972 palabras con lecturas y significados. N5 en la versión gratuita, todos los niveles con Pro.',
      },
      {
        id: 'themes',
        title: 'Temas',
        body: 'Claro, oscuro o del sistema, y con Pro colores, transparencia y color de texto del widget.',
      },
      {
        id: 'notifications',
        title: 'Notificaciones, mismo ritmo',
        body: 'Notificaciones de palabras opcionales al ritmo del widget, programadas en el dispositivo.',
      },
      {
        id: 'offline',
        title: 'Totalmente sin conexión',
        body: 'Todos los datos vienen dentro de la app. Aprender no necesita conexión.',
      },
    ],
  },
  kana: {
    eyebrow: 'Kana',
    titleLead: 'Empieza donde empieza',
    titleAccent: 'el japonés',
    tabTitle: 'Kana',
    hiragana: 'Hiragana',
    katakana: 'Katakana',
    basic: 'Básicos',
    points: [
      {
        h: 'Los dos silabarios, todos los kana',
        p: 'Hiragana y katakana lado a lado: los {basic} caracteres básicos, {dakuten} con dakuten y handakuten, y {combo} combinaciones, cada uno con su romaji.',
      },
      {
        h: 'Toca uno para escribirlo',
        p: 'Cada carácter abre la práctica del orden de trazos, de あ a ヲ. Las combinaciones como きゃ se practican carácter a carácter.',
      },
      {
        h: 'Gratis para todos',
        p: 'La pestaña Kana forma parte de la versión gratuita. Sin Pro, sin cuenta, y funciona sin conexión como el resto de Yumo.',
      },
    ],
  },
  levels: {
    eyebrow: 'Niveles',
    titleLead: 'De N5 a N1, o deja que',
    titleAccent: 'suba',
    lede: 'Las {total} palabras, ordenadas por nivel del JLPT. Yumo te empieza en Auto en N5; con Yumo Pro te hace subir con los días, volviendo a mezclar palabras anteriores para repasarlas. O elige un nivel y quédate en él.',
    words: '{n} palabras',
    // The reference page is English-only, so the marker rides on the button.
    reference: {
      title: 'Ver toda la lista N5',
      body: 'Las {n} palabras del nivel por el que todos empiezan: de lectura libre, sin cuenta y sin nada que instalar.',
      cta: 'Ver el vocabulario N5 (EN)',
    },
    blurbs: {
      n5: 'Las primeras 718 palabras. Todo en la versión gratuita.',
      n4: 'Verbos y adjetivos cotidianos que de verdad vas a oír.',
      n3: 'El nivel puente, y el mayor salto de vocabulario.',
      n2: 'El japonés de la prensa y del trabajo.',
      n1: 'La recta final: 2699 palabras a las que la mayoría de cursos nunca llega.',
    },
  },
  browse: {
    eyebrow: 'Explorar',
    titleLead: 'Todo el diccionario,',
    titleAccent: 'con buscador',
    tabTitle: 'Explorar',
    searchPlaceholder: 'Busca kanji, kana, romaji, significado…',
    all: 'Todos',
    points: [
      {
        h: 'Busca como lo recuerdes',
        p: 'Busca entre {total} palabras por kanji, kana, romaji o significado. Cada entrada incluye su lectura, su romaji, su nivel del JLPT y significados en inglés, francés, alemán, español y coreano.',
      },
      {
        h: 'N5 gratis, todos los niveles con Pro',
        p: 'En la versión gratuita, Explorar cubre N5: {n5} palabras. Yumo Pro abre todos los niveles superiores.',
      },
      {
        h: 'Sin conexión, como el resto de Yumo',
        p: 'Todo viene dentro de la app, así que la búsqueda funciona sin ninguna conexión.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Precio',
    titleLead: 'Un solo precio,',
    titleAccent: 'para siempre',
    lede: 'Yumo Pro es una compra única. Sin suscripción, sin renovaciones, sin cuenta que cancelar.',
    freeName: 'Gratis',
    proName: 'Yumo Pro',
    once: 'una vez',
    free: [
      'Vocabulario N5: {n5} palabras',
      'Una palabra nueva cada 6, 12 o 24 horas',
      'Widgets de pantalla de bloqueo y de inicio',
      'Tabla de hiragana y katakana',
      'Pronunciación y práctica de trazos',
      'Favoritos, notificaciones y temas',
    ],
    pro: [
      'Todos los niveles, de N5 a N1: las {total} palabras',
      'Una palabra nueva cada 1, 2, 3 o 4 horas',
      'El recorrido Auto, de N5 a N1',
      'Explora el diccionario completo',
      'Colores, transparencia y color de texto del widget',
    ],
  },
  privacy: {
    eyebrow: 'Privacidad',
    titleLead: 'No recopila',
    titleAccent: 'nada',
    lede: 'Sin cuenta, sin perfil, sin publicidad. Tus palabras y tu progreso nunca salen de tu teléfono.',
    claims: [
      {
        title: 'Sin cuenta',
        body: 'No hay nada en lo que registrarse. Yumo no tiene inicio de sesión, ni perfil, ni sincronización en la nube.',
      },
      {
        title: 'Sin rastreo',
        body: 'Sin analíticas de uso, sin informes de errores, sin identificadores publicitarios. Nada te sigue de una app a otra.',
      },
      {
        title: 'Nada sale del dispositivo',
        body: 'Los ajustes, las palabras guardadas y el progreso se guardan en local. Borrar la app lo borra todo.',
      },
      {
        title: 'Sin conexión por diseño',
        body: 'Todos los datos vienen dentro de la app, así que aprender funciona en modo avión por diseño y no por casualidad.',
      },
    ],
    exceptionBefore:
      'Dos excepciones: al comprar Yumo Pro, tu compra se envía a Apple o Google y a RevenueCat, que la valida para que puedas restaurarla más adelante; y en iPhone, las notificaciones opcionales «News & updates» pasan por OneSignal, que recibe el token de notificaciones de tu dispositivo. Ambas se describen en detalle en la ',
    exceptionLink: 'política de privacidad',
    exceptionAfter: ' (en inglés).',
  },
  faq: {
    eyebrow: 'Preguntas',
    title: 'Antes de que preguntes',
    playSoon: 'La versión para Android llegará pronto a Google Play.',
    items: [
      {
        q: '¿Qué es Yumo?',
        a: 'Yumo es una app de vocabulario japonés para iPhone y Android. Su widget pone una palabra japonesa nueva en tu pantalla de bloqueo o de inicio cada pocas horas, y todo funciona sin conexión. El nivel N5 es gratis; una compra única de Yumo Pro por {price} desbloquea las {total} palabras, de N5 a N1.',
      },
      {
        q: '¿Puedo aprender hiragana y katakana?',
        a: 'Sí. La pestaña Kana muestra los dos silabarios con su romaji (caracteres básicos, dakuten y handakuten, y combinaciones), y al tocar cualquier kana se abre la práctica del orden de trazos. Es gratis, sin necesidad de comprar Yumo Pro.',
      },
      {
        q: '¿Por qué no ha cambiado la palabra?',
        a: 'Yumo cambia a un ritmo fijo: cada 6, 12 o 24 horas gratis, o cada 1 a 4 horas con Pro. Entre medias, la palabra se queda. Es a propósito: una palabra que ves durante unas horas es una palabra que recuerdas.',
      },
      {
        q: '¿Funciona en Android?',
        a: 'Sí, como widget de pantalla de inicio. Los teléfonos Android no tienen widgets de pantalla de bloqueo, así que esa parte es solo para iPhone. {playSoon}',
      },
      {
        q: '¿Yumo Pro es una suscripción?',
        a: 'No. Es una compra única vinculada a tu cuenta del App Store o de Google Play, y puedes restaurarla en cualquier dispositivo en el que inicies sesión.',
      },
      {
        q: 'No oigo nada al tocar el altavoz.',
        a: 'Yumo habla con la voz japonesa integrada de tu dispositivo. Si no tienes ninguna instalada, añade una en los ajustes de accesibilidad: en iPhone, en Contenido leído; en Android, en Salida de texto a voz.',
      },
      {
        q: '¿Cómo consigo un reembolso?',
        a: 'Los reembolsos los gestionan Apple y Google, no nosotros. Usa reportaproblem.apple.com o tu historial de pedidos de Google Play.',
      },
    ],
  },
  footer: {
    tagline: 'Japonés, sin abrir ninguna app.',
    support: 'Ayuda',
    jlpt: 'Lista de palabras N5',
    privacy: 'Privacidad',
    terms: 'Condiciones',
    contact: 'Contacto',
    social: 'Yumo en {network}',
    englishOnly: ' (EN)',
    attribution:
      '© 2026 Yumo por SofDji. Diagramas de orden de trazos © KanjiVG (Ulrich Apel), CC BY-SA 4.0. Las traducciones al francés, alemán y español incluyen datos de JMdict/EDICT (EDRDG), usados bajo licencia CC BY-SA 4.0.',
  },
  meta: {
    title: 'Yumo — Vocabulario japonés en tu pantalla de bloqueo',
    description:
      'Una palabra japonesa nueva en la pantalla de bloqueo del iPhone o la pantalla de inicio de Android cada pocas horas. 7972 palabras del JLPT N5 al N1, hiragana y katakana, sin conexión.',
    ogDescription:
      'Una palabra japonesa nueva cada pocas horas. 7972 palabras, sin conexión, sin cuentas.',
  },
};
