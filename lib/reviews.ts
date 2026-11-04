// Real App Store reviews, from the public feed for app 6805975318 on
// 2026-11-04. A review shown in its own language is word for word. In any other
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
];

export function reviewFor(review: Review, locale: Locale, t: Dictionary['reviews']) {
  const { title, body } = review.text[locale];
  const translatedNote =
    review.language === locale ? null : fill(t.translatedFrom, { language: t.languages[review.language] });
  return { title, body, translatedNote };
}
