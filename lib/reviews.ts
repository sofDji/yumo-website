// Real App Store reviews, every 5-star one with text, from the public feed for
// app 6805975318 and the owner's App Store Connect list on 2026-11-04. A review shown in its own language is word for word. In any other
// language it is a faithful translation with spelling slips left out, and the
// page says so. Never edit what a review claims.
import type { Dictionary } from './i18n';
import { fill } from './i18n';
import type { Locale } from './i18n/locales';

export interface Review {
  author: string;
  stars: number;
  language: Locale;
  text: Record<Locale, { title: string; body: string }>;
}

export const REVIEWS: Review[] = [
  {
    author: 'Nada Yousra',
    stars: 5,
    language: 'en',
    text: {
      en: {
        title: 'My favorite way to learn Japanese',
        body: 'The lock screen widget got me hooked, but the app itself is what keeps me coming back. The quizzes, kanji breakdowns and writing practice make learning actually fun. Super clean design too. Highly recommend!',
      },
      fr: {
        title: 'Ma façon préférée d’apprendre le japonais',
        body: 'Le widget sur l’écran verrouillé m’a accrochée, mais c’est l’application elle-même qui me fait revenir. Les quiz, les explications des kanji et l’entraînement à l’écriture rendent vraiment l’apprentissage amusant. Un design super épuré en plus. Je recommande vivement !',
      },
      de: {
        title: 'Meine liebste Art, Japanisch zu lernen',
        body: 'Das Sperrbildschirm-Widget hat mich gepackt, aber die App selbst ist der Grund, warum ich immer wiederkomme. Die Quizze, die Kanji-Aufschlüsselungen und das Schreibtraining machen das Lernen wirklich zum Vergnügen. Dazu ein super klares Design. Sehr zu empfehlen!',
      },
      es: {
        title: 'Mi forma favorita de aprender japonés',
        body: 'El widget de la pantalla de bloqueo me enganchó, pero es la propia app lo que me hace volver. Los cuestionarios, las explicaciones de los kanji y la práctica de escritura hacen que aprender sea divertido de verdad. Además, tiene un diseño muy limpio. ¡Muy recomendable!',
      },
      ko: {
        title: '일본어를 배우는 제가 가장 좋아하는 방법',
        body: '잠금 화면 위젯에 빠져들었지만, 계속 돌아오게 만드는 건 앱 자체예요. 퀴즈, 한자 풀이, 쓰기 연습 덕분에 공부가 정말 재미있어요. 디자인도 아주 깔끔해요. 강력 추천해요!',
      },
      vi: {
        title: 'Cách học tiếng Nhật tôi thích nhất',
        body: 'Widget trên màn hình khóa đã cuốn hút tôi, nhưng chính ứng dụng mới là thứ khiến tôi luôn quay lại. Các bài trắc nghiệm, phần phân tích kanji và luyện viết khiến việc học thật sự thú vị. Thiết kế cũng rất gọn gàng. Rất nên dùng!',
      },
    },
  },
  {
    author: 'Princess achiever',
    stars: 5,
    language: 'en',
    text: {
      en: {
        title: 'Incredible',
        body: 'I’ve never left a review on the app store, but this simply deserves it. I think the fact that there’s so much competition with these language apps and yet this has left a very strong impression on me is all you need to know. Simple yet effective, keep up the good work!!!',
      },
      fr: {
        title: 'Incroyable',
        body: 'Je n’avais jamais laissé d’avis sur l’App Store, mais celle-ci le mérite tout simplement. Il y a tellement de concurrence entre ces applications de langues, et pourtant celle-ci m’a vraiment marquée : c’est tout ce qu’il faut savoir. Simple mais efficace, continuez comme ça !!!',
      },
      de: {
        title: 'Unglaublich',
        body: 'Ich habe noch nie eine Bewertung im App Store hinterlassen, aber diese App hat es einfach verdient. Es gibt so viel Konkurrenz unter diesen Sprach-Apps, und trotzdem hat diese einen sehr starken Eindruck bei mir hinterlassen: Mehr muss man nicht wissen. Einfach, aber wirkungsvoll. Macht weiter so!!!',
      },
      es: {
        title: 'Increíble',
        body: 'Nunca había dejado una reseña en la App Store, pero esta simplemente se la merece. Hay muchísima competencia entre estas apps de idiomas y, aun así, esta me ha dejado una impresión muy fuerte: no hace falta saber más. Sencilla pero eficaz, ¡seguid así!',
      },
      ko: {
        title: '놀라워요',
        body: '앱 스토어에 리뷰를 남긴 적이 한 번도 없었지만, 이 앱은 그럴 자격이 충분해요. 이런 언어 앱은 경쟁이 정말 치열한데도 이 앱은 저에게 아주 강한 인상을 남겼어요. 그것만으로 충분하죠. 단순하지만 효과적이에요. 앞으로도 힘내세요!!!',
      },
      vi: {
        title: 'Tuyệt vời',
        body: 'Tôi chưa bao giờ để lại đánh giá trên App Store, nhưng ứng dụng này thật sự xứng đáng. Có rất nhiều ứng dụng học ngôn ngữ cạnh tranh, vậy mà ứng dụng này vẫn để lại ấn tượng rất mạnh với tôi: chỉ cần biết vậy là đủ. Đơn giản mà hiệu quả, hãy tiếp tục phát huy nhé!!!',
      },
    },
  },
  {
    author: 'SevenCoD',
    stars: 5,
    language: 'fr',
    text: {
      fr: {
        title: 'Incroyable',
        body: 'Vraiment excellent ! J’en ai tester tellement des applis de japonais et celle là est l’une des meilleures, surtout pour les kanji ! Mettre le widget avec un mot tout les jours, tu le retiens facilement ! Et avec le jeu le soir, c’est encore mieux ! Vraiment bravo',
      },
      en: {
        title: 'Incredible',
        body: 'Really excellent! I’ve tried so many Japanese apps and this is one of the best, especially for kanji! Put the widget on with a word every day and it sticks easily! And with the game in the evening, it’s even better! Well done, really.',
      },
      de: {
        title: 'Unglaublich',
        body: 'Wirklich ausgezeichnet! Ich habe so viele Japanisch-Apps ausprobiert, und diese ist eine der besten, vor allem für Kanji! Mit dem Widget und einem Wort jeden Tag merkt man es sich ganz leicht! Und mit dem Spiel am Abend ist es noch besser! Wirklich großes Lob.',
      },
      es: {
        title: 'Increíble',
        body: '¡De verdad excelente! He probado muchísimas apps de japonés y esta es una de las mejores, sobre todo para los kanji. Con el widget y una palabra cada día, se te queda fácilmente. Y con el juego por la noche, ¡todavía mejor! De verdad, enhorabuena.',
      },
      ko: {
        title: '놀라워요',
        body: '정말 훌륭해요! 일본어 앱을 정말 많이 써 봤는데 이 앱은 그중 최고 중 하나예요. 특히 한자가 그래요! 위젯을 두고 매일 단어 하나를 보면 쉽게 외워져요! 저녁에 하는 게임까지 더하면 더 좋아요! 정말 대단해요.',
      },
      vi: {
        title: 'Tuyệt vời',
        body: 'Thật sự xuất sắc! Tôi đã thử rất nhiều ứng dụng tiếng Nhật và đây là một trong những ứng dụng tốt nhất, nhất là với kanji! Đặt widget với mỗi ngày một từ là nhớ rất dễ! Còn có trò chơi vào buổi tối thì càng tuyệt hơn! Thật sự rất đáng khen.',
      },
    },
  },
  {
    author: 'MatSaka 👌',
    stars: 5,
    language: 'fr',
    text: {
      fr: {
        title: 'Enfin une application qui me fait vraiment progresser ! 😍',
        body: 'Franchement, une application exceptionnelle 😱! J’ai essayé plusieurs méthodes pour apprendre le japonais, mais c’est la seule qui fonctionne vraiment pour moi. Son fonctionnement est tellement bien pensé qu’il me permet de mémoriser chaque mot naturellement, sans même avoir l’impression de forcer. Je prends plaisir à apprendre et je vois mes progrès chaque jour. Je la kiffe vraiment ! Un immense bravo pour cette application !',
      },
      en: {
        title: 'Finally an app that really helps me progress! 😍',
        body: 'Honestly, an exceptional app 😱! I’ve tried several methods for learning Japanese, but this is the only one that really works for me. It’s so well thought out that I memorize each word naturally, without even feeling like I’m forcing it. I enjoy learning and I see my progress every day. I absolutely love it! Huge congratulations on this app!',
      },
      de: {
        title: 'Endlich eine App, mit der ich wirklich vorankomme! 😍',
        body: 'Ehrlich, eine außergewöhnliche App 😱! Ich habe mehrere Methoden ausprobiert, um Japanisch zu lernen, aber das ist die einzige, die bei mir wirklich funktioniert. Sie ist so gut durchdacht, dass ich mir jedes Wort ganz natürlich merke, ohne das Gefühl zu haben, mich anzustrengen. Das Lernen macht mir Spaß und ich sehe jeden Tag Fortschritte. Ich liebe sie wirklich! Ein riesiges Lob für diese App!',
      },
      es: {
        title: '¡Por fin una app con la que progreso de verdad! 😍',
        body: 'Sinceramente, una app excepcional 😱. He probado varios métodos para aprender japonés, pero es el único que me funciona de verdad. Está tan bien pensada que memorizo cada palabra de forma natural, sin sentir que me esfuerzo. Disfruto aprendiendo y veo mis progresos cada día. ¡Me encanta! ¡Enhorabuena por esta app!',
      },
      ko: {
        title: '드디어 정말 실력이 느는 앱이에요! 😍',
        body: '솔직히 정말 뛰어난 앱이에요 😱! 일본어를 배우려고 여러 방법을 써 봤지만, 저에게 정말 효과가 있는 건 이것뿐이에요. 아주 잘 설계되어 있어서 애쓴다는 느낌 없이 단어 하나하나를 자연스럽게 외우게 돼요. 배우는 게 즐겁고 매일 실력이 느는 게 보여요. 정말 마음에 들어요! 이 앱에 큰 박수를 보내요!',
      },
      vi: {
        title: 'Cuối cùng cũng có ứng dụng giúp tôi thật sự tiến bộ! 😍',
        body: 'Thật lòng mà nói, đây là một ứng dụng tuyệt vời 😱! Tôi đã thử nhiều cách học tiếng Nhật, nhưng đây là cách duy nhất thật sự hiệu quả với tôi. Ứng dụng được thiết kế khéo đến mức tôi nhớ từng từ một cách tự nhiên mà không thấy gượng ép. Tôi thích học và thấy mình tiến bộ mỗi ngày. Tôi thật sự rất mê! Xin chúc mừng ứng dụng này!',
      },
    },
  },
  {
    author: 'HY Marwa',
    stars: 5,
    language: 'fr',
    text: {
      fr: {
        title: 'Excellente application',
        body: 'Cette application m’a permit d’apprendre le japonais sans me rendre compte grace au widget du lock screen',
      },
      en: {
        title: 'Excellent app',
        body: 'This app let me learn Japanese without even realizing it, thanks to the Lock Screen widget.',
      },
      de: {
        title: 'Ausgezeichnete App',
        body: 'Dank des Sperrbildschirm-Widgets habe ich mit dieser App Japanisch gelernt, ohne es überhaupt zu merken.',
      },
      es: {
        title: 'Excelente app',
        body: 'Esta app me ha permitido aprender japonés sin darme cuenta, gracias al widget de la pantalla de bloqueo.',
      },
      ko: {
        title: '훌륭한 앱',
        body: '잠금 화면 위젯 덕분에 저도 모르는 사이에 이 앱으로 일본어를 배웠어요.',
      },
      vi: {
        title: 'Ứng dụng tuyệt vời',
        body: 'Nhờ widget trên màn hình khóa, ứng dụng này giúp tôi học tiếng Nhật lúc nào không hay.',
      },
    },
  },
  {
    author: 'Bouton d’or 86',
    stars: 5,
    language: 'fr',
    text: {
      fr: {
        title: 'Superbe',
        body: 'Superbe application très facile à utiliser on apprend très facilement le japonais',
      },
      en: {
        title: 'Superb',
        body: 'A superb app that’s very easy to use. You learn Japanese very easily.',
      },
      de: {
        title: 'Großartig',
        body: 'Eine großartige, sehr einfach zu bedienende App. Man lernt ganz leicht Japanisch.',
      },
      es: {
        title: 'Magnífica',
        body: 'Una app magnífica y muy fácil de usar. Se aprende japonés con mucha facilidad.',
      },
      ko: {
        title: '최고예요',
        body: '정말 멋지고 사용하기 아주 쉬운 앱이에요. 일본어를 아주 쉽게 배울 수 있어요.',
      },
      vi: {
        title: 'Tuyệt vời',
        body: 'Ứng dụng tuyệt vời và rất dễ dùng. Học tiếng Nhật rất dễ dàng.',
      },
    },
  },
];

export function reviewFor(review: Review, locale: Locale, t: Dictionary['reviews']) {
  const { title, body } = review.text[locale];
  const translatedNote =
    review.language === locale ? null : fill(t.translatedFrom, { language: t.languages[review.language] });
  return { title, body, translatedNote };
}
