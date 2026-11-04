// The five cards in the hero, with real sentences taken from the app's
// assets/word-examples.json and first meanings from assets/word-data.json.
// Hand-picked for a marketing page; the romaji is the app's own style.
import type { Locale } from './i18n/locales';
import type { Level } from './tokens';

export interface FanWord {
  id: number;
  level: Level;
  kanji: string;
  romaji: { before: string; word: string; after: string };
  reading: string;
  meaning: Record<Locale, string>;
  jp: string;
  mark: string;
  sentence: Record<Locale, string>;
  // The word's own part of the translation, marked in lime.
  sentenceMark: Record<Locale, string>;
}

export const FAN_WORDS: FanWord[] = [
  {
    "id": 6478,
    "level": "n1",
    "kanji": "憧れ",
    "reading": "akogare",
    "romaji": {
      "before": "pari wa watashi no ",
      "word": "akogare",
      "after": " no machi desu"
    },
    "meaning": {
      "en": "yearning",
      "fr": "admiration",
      "de": "Sehnsucht",
      "es": "anhelo",
      "ko": "동경",
      "vi": "niềm khao khát"
    },
    "jp": "パリは私の憧れの町です。",
    "mark": "憧れ",
    "sentence": {
      "en": "Paris is the city of my dreams.",
      "fr": "Paris est la ville de mes rêves.",
      "de": "Paris ist die Stadt meiner Träume.",
      "es": "París es la ciudad de mis sueños.",
      "ko": "파리는 제가 동경하는 도시예요.",
      "vi": "Paris là thành phố mơ ước của tôi."
    },
    "sentenceMark": {
      "en": "dreams",
      "fr": "rêves",
      "de": "Träume",
      "es": "sueños",
      "ko": "동경",
      "vi": "mơ ước"
    }
  },
  {
    "id": 1092,
    "level": "n4",
    "kanji": "夢",
    "reading": "yume",
    "romaji": {
      "before": "watashi no ",
      "word": "yume",
      "after": " wa isha ni naru koto da"
    },
    "meaning": {
      "en": "a dream",
      "fr": "rêve",
      "de": "Traum",
      "es": "sueño",
      "ko": "꿈",
      "vi": "giấc mơ"
    },
    "jp": "私の夢は医者になることだ。",
    "mark": "夢",
    "sentence": {
      "en": "My dream is to be a doctor.",
      "fr": "Mon rêve est de devenir médecin.",
      "de": "Mein Traum ist es, Arzt zu werden.",
      "es": "Mi sueño es convertirme en doctor.",
      "ko": "내 꿈은 의사가 되는 것이다.",
      "vi": "Ước mơ của tôi là trở thành bác sĩ."
    },
    "sentenceMark": {
      "en": "dream",
      "fr": "rêve",
      "de": "Traum",
      "es": "sueño",
      "ko": "꿈",
      "vi": "Ước mơ"
    }
  },
  {
    "id": 538,
    "level": "n5",
    "kanji": "花",
    "reading": "hana",
    "romaji": {
      "before": "kirei na ",
      "word": "hana",
      "after": " o arigatou"
    },
    "meaning": {
      "en": "flower",
      "fr": "fleur",
      "de": "Blume",
      "es": "flor",
      "ko": "꽃",
      "vi": "bông hoa"
    },
    "jp": "きれいな花をありがとう。",
    "mark": "花",
    "sentence": {
      "en": "Thank you for the beautiful flowers.",
      "fr": "Merci pour les belles fleurs.",
      "de": "Danke für die schönen Blumen.",
      "es": "Gracias por las hermosas flores.",
      "ko": "예쁜 꽃 고마워.",
      "vi": "Cảm ơn vì những bông hoa đẹp."
    },
    "sentenceMark": {
      "en": "flowers",
      "fr": "fleurs",
      "de": "Blumen",
      "es": "flores",
      "ko": "꽃",
      "vi": "bông hoa"
    }
  },
  {
    "id": 2365,
    "level": "n3",
    "kanji": "桜",
    "reading": "sakura",
    "romaji": {
      "before": "",
      "word": "sakura",
      "after": " no hana wa totemo kirei desu"
    },
    "meaning": {
      "en": "cherry blossom",
      "fr": "cerisier",
      "de": "Kirschbaum",
      "es": "cerezo",
      "ko": "벚꽃",
      "vi": "hoa anh đào"
    },
    "jp": "桜の花はとてもきれいです。",
    "mark": "桜",
    "sentence": {
      "en": "Cherry blossoms are very beautiful.",
      "fr": "Les fleurs de cerisier sont très belles.",
      "de": "Kirschblüten sind sehr schön.",
      "es": "Las flores de cerezo son muy bonitas.",
      "ko": "벚꽃은 정말 예뻐요.",
      "vi": "Hoa anh đào rất đẹp."
    },
    "sentenceMark": {
      "en": "Cherry blossoms",
      "fr": "fleurs de cerisier",
      "de": "Kirschblüten",
      "es": "flores de cerezo",
      "ko": "벚꽃",
      "vi": "Hoa anh đào"
    }
  },
  {
    "id": 4644,
    "level": "n2",
    "kanji": "懐かしい",
    "reading": "natsukashii",
    "romaji": {
      "before": "kare wa ",
      "word": "natsukashii",
      "after": " uta o hikihajimemashita"
    },
    "meaning": {
      "en": "dear, missed",
      "fr": "nostalgique",
      "de": "wehmütig",
      "es": "nostálgico",
      "ko": "그립다",
      "vi": "nhớ nhung"
    },
    "jp": "彼はなつかしい歌を弾き始めました。",
    "mark": "なつかしい",
    "sentence": {
      "en": "He began to play an old song.",
      "fr": "Il commença à jouer une vieille chanson.",
      "de": "Er begann, ein altes Lied zu spielen.",
      "es": "Empezó a tocar una canción antigua.",
      "ko": "그는 옛날 노래를 연주하기 시작했습니다.",
      "vi": "Anh ấy bắt đầu chơi một bài hát xưa gợi nhớ."
    },
    "sentenceMark": {
      "en": "old",
      "fr": "vieille",
      "de": "altes",
      "es": "antigua",
      "ko": "옛날",
      "vi": "xưa gợi nhớ"
    }
  }
];
