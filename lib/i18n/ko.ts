import type { Dictionary } from './en';

// Typed as Dictionary, so a key added to en.ts and forgotten here fails the
// build rather than silently rendering English inside a Korean page. Written
// in 해요체 with the app's own terms (가나, 로마자, 탁음, 요음, 찾아보기), so
// the site and the screens it pictures use the same words.
export const ko: Dictionary = {
  nav: {
    home: 'Yumo 홈',
    links: [
      { href: '#how', label: '사용 방법' },
      { href: '#features', label: '기능' },
      { href: '#kana', label: '가나' },
      { href: '#levels', label: '레벨' },
      { href: '#pricing', label: '가격' },
    ],
    comingSoon: '출시 예정',
    getIphone: 'iPhone용 받기',
    getAndroid: 'Android용 받기',
    getApp: '앱 받기',
    language: '언어',
  },
  cta: {
    comingSoon: '출시 예정',
    freeOn: 'App Store와 Google Play에서 무료',
    androidSoon: 'App Store에서 무료. Android는 곧 출시돼요.',
    iphoneSoon: 'Google Play에서 무료. iPhone은 곧 출시돼요.',
    iphone: 'iPhone용 다운로드',
    android: 'Android용 받기',
  },
  appBanner: {
    label: 'Yumo 앱 받기',
    get: '받기',
    dismiss: '닫기',
  },
  hero: {
    titleLead: '애쓰지 않아도 익히는',
    titleAccent: '일본어',
    lede: 'Yumo는 몇 시간마다 잠금 화면과 홈 화면에 새로운 일본어 단어를 띄워 줘요. 연속 기록도, 수업도 없어요. 그냥 눈에 들어와요.',
  },
  how: {
    eyebrow: '사용 방법',
    titleLead: '세 단계만 하면',
    titleAccent: '끝이에요',
    lede: 'Yumo는 한 번 설정하고 잊어버리도록 만들어졌어요. 학습은 이미 매일 보는 화면에서 이루어져요.',
    steps: [
      {
        n: '01',
        title: '위젯 추가하기',
        body: '잠금 화면이나 홈 화면을 길게 누르고 Yumo를 추가하세요. 설정은 이게 전부예요.',
      },
      {
        n: '02',
        title: '주기 고르기',
        body: '무료 버전은 6, 12, 24시간마다 새 단어가 나와요. Pro에서는 1, 2, 3, 4시간마다 나와요.',
      },
      {
        n: '03',
        title: '신경 끄기',
        body: '시간을 확인할 때마다 단어가 찾아와요. 단어를 탭하면 발음을 듣거나, 저장하거나, 획순을 따라 쓸 수 있어요.',
      },
    ],
  },
  lockScreen: {
    eyebrow: '잠금 화면',
    titleLead: '잠금을 풀기도 전에',
    titleAccent: '익혀요',
    points: [
      {
        h: '가장 자주 보는 화면',
        p: '우리는 하루에도 수십 번, 의식하지 않고 잠금 화면을 봐요. Yumo가 거기에 단어를 놓아두니, 공부해야겠다는 생각이 들기도 전에 이미 단어를 읽게 돼요.',
      },
      {
        h: '직사각형 또는 한 줄',
        p: '직사각형 위젯은 한자와 읽는 법, 뜻을 보여 줘요. 한 줄 위젯은 시간 옆에 한 줄로 자리 잡아서, 거의 보이지 않게 두고 싶을 때 좋아요.',
      },
      {
        h: 'iPhone 전용, 솔직하게 말할게요',
        p: '잠금 화면 위젯은 iOS 기능이에요. Android 휴대폰에는 이 기능이 없어서, Android에서는 Yumo가 홈 화면에 자리해요.',
      },
    ],
  },
  homeScreen: {
    eyebrow: '홈 화면',
    titleLead: '매일 쓰는 홈 화면에서도',
    titleAccent: '함께해요',
    titleTail: '',
    points: [
      {
        h: '소형 또는 중형',
        p: '위젯마다 레벨과 주기를 따로 정할 수 있어서, 잠금 화면에는 N5를, 홈 화면에는 N3를 동시에 띄울 수 있어요.',
      },
      {
        h: 'Android에서는',
        p: '크기를 조절할 수 있는 홈 화면 위젯으로, 앱에서 정한 레벨과 주기를 따라가요. Android에는 잠금 화면 위젯이 없고, Yumo도 있는 척하지 않아요.',
      },
      {
        h: '언제나 정확하게, 언제나 오프라인으로',
        p: '어떤 단어가 보일지는 오직 시간과 설정으로 정해져요. 서버가 결정하지 않으니 모든 기기에서 똑같고, 비행기 모드에서도 작동해요.',
      },
    ],
  },
  features: {
    eyebrow: '기능',
    titleLead: '작은 앱,',
    titleAccent: '깊은',
    titleTail: '내용',
    lede: '아래 기능은 모두 계정 없이, 인터넷 연결 없이, 어디에도 아무것도 보내지 않고 작동해요.',
    items: [
      {
        id: 'strokes',
        title: '획순 따라 쓰기',
        body: 'KanjiVG의 획순 안내를 따라 한자와 가나 쓰기를 연습해요.',
      },
      {
        id: 'audio',
        title: '모든 단어 듣기',
        body: '기기에 내장된 일본어 음성으로 발음을 들려줘요. 다운로드도, 스트리밍도 없어요.',
      },
      {
        id: 'favourites',
        title: '중요한 단어 저장',
        body: '다시 보고 싶은 단어를 저장하세요. 저장한 단어는 기기에만 남아요.',
      },
      {
        id: 'languages',
        title: '5개 언어로 보는 뜻',
        body: '영어, 프랑스어, 독일어, 스페인어, 한국어. 모두 앱에 들어 있어요.',
      },
      {
        id: 'browse',
        title: '사전 찾아보기',
        body: '읽는 법과 뜻이 담긴 7,972개 단어. 무료 버전은 N5, Pro는 모든 레벨이에요.',
      },
      {
        id: 'themes',
        title: '테마',
        body: '라이트, 다크, 시스템 설정에 더해, Pro에서는 위젯 색상과 투명도, 글자 색상까지 바꿀 수 있어요.',
      },
      {
        id: 'notifications',
        title: '알림도 같은 주기로',
        body: '원하면 위젯 주기에 맞춰 단어 알림을 받을 수 있어요. 알림은 기기에서 예약돼요.',
      },
      {
        id: 'offline',
        title: '완전한 오프라인',
        body: '모든 데이터가 앱 안에 들어 있어요. 학습에 인터넷 연결이 필요 없어요.',
      },
    ],
  },
  kana: {
    eyebrow: '가나',
    titleLead: '일본어가 시작되는 곳에서',
    titleAccent: '시작하세요',
    tabTitle: '가나',
    hiragana: '히라가나',
    katakana: '가타카나',
    basic: '기본',
    points: [
      {
        h: '두 문자, 모든 가나',
        p: '히라가나와 가타카나를 나란히 보여 줘요. 기본 문자 {basic}개, 탁음과 반탁음 {dakuten}개, 요음 {combo}개를 각각 로마자와 함께 담았어요.',
      },
      {
        h: '탭해서 써 보기',
        p: 'あ부터 ヲ까지, 모든 문자에서 획순 연습을 열 수 있어요. きゃ 같은 요음은 한 글자씩 연습해요.',
      },
      {
        h: '누구나 무료',
        p: '가나 탭은 무료 버전에 포함돼 있어요. Pro도, 계정도 필요 없고, Yumo의 다른 기능처럼 오프라인에서 작동해요.',
      },
    ],
  },
  levels: {
    eyebrow: '레벨',
    titleLead: 'N5부터 N1까지,',
    titleAccent: '차근차근',
    lede: 'JLPT 레벨별로 정리한 {total}개 단어. Yumo는 N5의 자동 모드로 시작해요. Yumo Pro에서는 날이 갈수록 레벨이 올라가고, 앞에서 배운 단어도 복습할 수 있게 다시 섞어 줘요. 원하는 레벨을 골라 계속 머물 수도 있어요.',
    words: '단어 {n}개',
    // The reference page is English-only, so the marker rides on the button.
    reference: {
      title: 'N5 전체 목록 보기',
      body: '모두가 처음 시작하는 레벨의 단어 {n}개. 계정도, 설치도 없이 무료로 볼 수 있어요.',
      cta: 'N5 단어 보기 (영어)',
    },
    blurbs: {
      n5: '첫 718개 단어. 모두 무료 버전에 포함돼요.',
      n4: '실제로 자주 듣게 될 일상 동사와 형용사.',
      n3: '중급으로 가는 다리이자, 어휘가 가장 크게 늘어나는 레벨.',
      n2: '신문과 직장에서 쓰는 일본어.',
      n1: '대부분의 강좌가 닿지 못하는 2,699개 단어.',
    },
  },
  browse: {
    eyebrow: '찾아보기',
    titleLead: '사전 전체를',
    titleAccent: '검색해 보세요',
    tabTitle: '찾아보기',
    searchPlaceholder: '한자, 가나, 로마자, 뜻으로 검색…',
    all: '전체',
    points: [
      {
        h: '기억나는 대로 검색',
        p: '{total}개 단어를 한자, 가나, 로마자, 뜻으로 검색할 수 있어요. 모든 단어에 읽는 법, 로마자, JLPT 레벨, 그리고 영어·프랑스어·독일어·스페인어·한국어 뜻이 담겨 있어요.',
      },
      {
        h: 'N5는 무료, 모든 레벨은 Pro',
        p: '무료 버전의 찾아보기는 N5 단어 {n5}개를 다뤄요. Yumo Pro를 사면 그 위의 모든 레벨이 열려요.',
      },
      {
        h: 'Yumo의 다른 기능처럼 오프라인으로',
        p: '모든 데이터가 앱 안에 있어서, 인터넷 연결이 전혀 없어도 검색할 수 있어요.',
      },
    ],
  },
  pricing: {
    eyebrow: '가격',
    titleLead: '한 번 결제로',
    titleAccent: '평생',
    lede: 'Yumo Pro는 한 번만 구매하면 돼요. 구독도, 갱신도, 해지할 계정도 없어요.',
    freeName: '무료',
    proName: 'Yumo Pro',
    once: '1회',
    free: [
      'N5 단어 {n5}개',
      '6, 12, 24시간마다 새 단어',
      '잠금 화면과 홈 화면 위젯',
      '히라가나와 가타카나 표',
      '발음 듣기와 획순 연습',
      '즐겨찾기, 알림, 테마',
    ],
    pro: [
      'N5부터 N1까지 모든 레벨, {total}개 단어 전체',
      '1, 2, 3, 4시간마다 새 단어',
      'N5에서 N1까지 올라가는 자동 모드',
      '사전 전체 찾아보기',
      '위젯 색상, 투명도, 글자 색상',
    ],
  },
  privacy: {
    eyebrow: '개인정보',
    titleLead: '수집하는 건',
    titleAccent: '아무것도 없어요',
    lede: '계정도, 프로필도, 광고도 없어요. 내 단어와 학습 기록은 휴대폰 밖으로 나가지 않아요.',
    claims: [
      {
        title: '계정 없음',
        body: '가입할 것이 없어요. Yumo에는 로그인도, 프로필도, 클라우드 동기화도 없어요.',
      },
      {
        title: '추적 없음',
        body: '사용 분석도, 오류 보고도, 광고 식별자도 없어요. 앱을 넘나들며 따라다니는 것도 없어요.',
      },
      {
        title: '기기 밖으로 나가는 것 없음',
        body: '설정, 저장한 단어, 학습 기록은 기기에만 저장돼요. 앱을 삭제하면 모두 지워져요.',
      },
      {
        title: '처음부터 오프라인',
        body: '모든 데이터가 앱 안에 들어 있어서, 비행기 모드에서도 학습할 수 있어요. 우연이 아니라 그렇게 설계했어요.',
      },
    ],
    exceptionBefore:
      '예외는 세 가지예요. Yumo Pro를 구매하면 구매 정보가 Apple 또는 Google, 그리고 나중에 복원할 수 있도록 구매를 확인하는 RevenueCat에 전달돼요. 또 iPhone에서 선택 사항인 ‘News & updates’ 알림은 OneSignal을 거치며, OneSignal은 기기의 푸시 토큰을 받아요. 그리고 잠금 화면 예문(Yumo Pro)을 켜면 언어, 시간대, 단어 설정이 카드를 시작할 수 있도록 Yumo 서버로 전달돼요. 세 가지 모두 ',
    exceptionLink: '개인정보 처리방침',
    exceptionAfter: '(영어)에 자세히 나와 있어요.',
  },
  faq: {
    eyebrow: '질문',
    title: '자주 묻는 질문',
    playSoon: 'Android 버전은 곧 Google Play에 출시돼요.',
    items: [
      {
        q: 'Yumo는 어떤 앱인가요?',
        a: 'Yumo는 iPhone과 Android용 일본어 단어 앱이에요. 위젯이 몇 시간마다 잠금 화면이나 홈 화면에 새로운 일본어 단어를 띄워 주고, 모든 기능이 오프라인으로 작동해요. N5 레벨은 무료이고, {price}의 Yumo Pro를 한 번 구매하면 N5부터 N1까지 {total}개 단어가 모두 열려요.',
      },
      {
        q: '히라가나와 가타카나도 배울 수 있나요?',
        a: '네. 가나 탭에서 두 문자를 로마자와 함께 보여 줘요. 기본 문자, 탁음과 반탁음, 요음이 있고, 가나를 탭하면 획순 연습이 열려요. Yumo Pro 구매 없이 무료예요.',
      },
      {
        q: '단어가 왜 바뀌지 않나요?',
        a: 'Yumo는 정해진 주기로 단어를 바꿔요. 무료는 6, 12, 24시간마다, Pro는 1~4시간마다예요. 그 사이에는 같은 단어가 유지돼요. 일부러 그렇게 만들었어요. 몇 시간 동안 본 단어는 기억에 남으니까요.',
      },
      {
        q: 'Android에서도 쓸 수 있나요?',
        a: '네, 홈 화면 위젯으로 쓸 수 있어요. Android 휴대폰에는 잠금 화면 위젯이 없어서 그 부분은 iPhone 전용이에요. {playSoon}',
      },
      {
        q: 'Yumo Pro는 구독인가요?',
        a: '아니요. App Store 또는 Google Play 계정에 연결된 1회 구매이고, 같은 계정으로 로그인한 기기라면 어디서든 복원할 수 있어요.',
      },
      {
        q: '스피커를 탭해도 소리가 안 나요.',
        a: 'Yumo는 기기에 내장된 일본어 음성으로 말해요. 설치된 음성이 없다면 손쉬운 사용 설정에서 추가하세요. iPhone은 ‘콘텐츠 말하기’, Android는 ‘텍스트 음성 변환 출력’에서 추가할 수 있어요.',
      },
      {
        q: '환불은 어떻게 받나요?',
        a: '환불은 저희가 아니라 Apple과 Google이 처리해요. reportaproblem.apple.com 또는 Google Play 주문 내역을 이용하세요.',
      },
    ],
  },
  footer: {
    tagline: '앱을 열지 않아도 만나는 일본어.',
    support: '지원',
    jlpt: 'N5 단어 목록',
    privacy: '개인정보 처리방침',
    terms: '이용약관',
    contact: '문의',
    social: '{network}의 Yumo',
    englishOnly: ' (영어)',
    attribution:
      '© 2026 Yumo by SofDji. 획순 그림 © KanjiVG (Ulrich Apel), CC BY-SA 4.0. 프랑스어, 독일어, 스페인어 번역에는 JMdict/EDICT (EDRDG) 데이터가 포함되어 있으며 CC BY-SA 4.0에 따라 사용해요.',
  },
  meta: {
    title: 'Yumo — 잠금 화면에 뜨는 일본어 단어 위젯',
    description:
      '몇 시간마다 iPhone 잠금 화면이나 Android 홈 화면에 새로운 일본어 단어가 떠요. JLPT N5부터 N1까지 7,972개 단어, 히라가나와 가타카나 표, 완전한 오프라인, 계정 없음.',
    ogDescription: '몇 시간마다 새로운 일본어 단어. 7,972개 단어, 완전한 오프라인, 계정 없음.',
  },
};
