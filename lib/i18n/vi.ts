import type { Dictionary } from './en';

// Vietnamese, in the same register as the app's own UI: "bạn", northern
// standard. Typed against the English dictionary, so a missing key breaks the
// build rather than silently rendering English inside a Vietnamese page.
// Written by Claude, not a native speaker.
export const vi: Dictionary = {
  nav: {
    home: 'Trang chủ Yumo',
    links: [
      { href: '#how', label: 'Cách hoạt động' },
      { href: '#features', label: 'Tính năng' },
      { href: '#kana', label: 'Kana' },
      { href: '#levels', label: 'Cấp độ' },
      { href: '#pricing', label: 'Giá' },
    ],
    comingSoon: 'Sắp ra mắt',
    getIphone: 'Tải cho iPhone',
    getAndroid: 'Tải cho Android',
    getApp: 'Tải ứng dụng',
    language: 'Ngôn ngữ',
  },
  cta: {
    comingSoon: 'Sắp ra mắt',
    freeOn: 'Miễn phí trên App Store và Google Play',
    androidSoon: 'Miễn phí trên App Store. Android sắp ra mắt.',
    iphoneSoon: 'Miễn phí trên Google Play. iPhone sắp ra mắt.',
    iphone: 'Tải cho iPhone',
    android: 'Tải cho Android',
  },
  appBanner: {
    label: 'Tải ứng dụng Yumo',
    get: 'Tải',
    dismiss: 'Đóng',
  },
  hero: {
    titleLead: 'Học tiếng Nhật',
    titleAccent: 'thật nhẹ nhàng',
    lede: 'Cứ vài giờ, Yumo lại đưa một từ tiếng Nhật mới lên màn hình khóa và màn hình chính của bạn. Không chuỗi ngày, không bài học. Từ cứ thế hiện ra.',
  },
  how: {
    eyebrow: 'Cách hoạt động',
    titleLead: 'Ba bước, rồi',
    titleAccent: 'không cần làm gì nữa',
    lede: 'Yumo được tạo ra để cài một lần rồi quên đi. Việc học diễn ra ngay trên những màn hình bạn vẫn nhìn mỗi ngày.',
    steps: [
      {
        n: '01',
        title: 'Thêm tiện ích',
        body: 'Nhấn giữ màn hình khóa hoặc màn hình chính rồi thêm Yumo. Chỉ cần vậy thôi.',
      },
      {
        n: '02',
        title: 'Chọn nhịp của bạn',
        body: 'Một từ mới sau mỗi 6, 12 hoặc 24 giờ với bản miễn phí. Sau mỗi 1, 2, 3 hoặc 4 giờ với bản Pro.',
      },
      {
        n: '03',
        title: 'Không cần nghĩ đến nữa',
        body: 'Từ mới đến trong lúc bạn xem giờ. Chạm vào một từ để nghe, lưu lại hoặc tập viết theo nét.',
      },
    ],
  },
  lockScreen: {
    eyebrow: 'Màn hình khóa',
    titleLead: 'Học được cả trước khi',
    titleAccent: 'mở khóa',
    date: 'Thứ Hai, 2 tháng 11',
    sentence: { before: '', word: 'Thứ Hai', after: ' nên bị cấm theo luật.' },
    points: [
      {
        h: 'Màn hình bạn xem nhiều nhất',
        p: 'Mỗi ngày bạn nhìn màn hình khóa hàng chục lần mà không cần nghĩ. Yumo đặt một từ ở đó, nên bạn đã đọc nó trước cả khi nghĩ đến chuyện học.',
      },
      {
        h: 'Câu ví dụ ngay trên màn hình khóa',
        p: 'Với Yumo Pro, hãy bật Hoạt động trực tiếp: mỗi từ mới sẽ đi kèm một câu ví dụ bằng tiếng Nhật, romaji và ngôn ngữ của bạn, với từ được tô nổi bật. Cần iPhone chạy iOS 17.2 trở lên và có kết nối mạng.',
      },
      {
        h: 'Dạng chữ nhật hoặc một dòng',
        p: 'Tiện ích chữ nhật hiện kanji, cách đọc và nghĩa. Tiện ích một dòng nằm cạnh giờ, cho những lúc bạn muốn nó gần như vô hình.',
      },
      {
        h: 'Chỉ có trên iPhone, và chúng tôi nói rõ',
        p: 'Tiện ích màn hình khóa là tính năng của iOS. Điện thoại Android không có, nên trên Android Yumo nằm ở màn hình chính.',
      },
    ],
  },
  homeScreen: {
    eyebrow: 'Màn hình chính',
    titleLead: 'Và trên màn hình bạn',
    titleAccent: 'làm việc',
    titleTail: 'mỗi ngày',
    points: [
      {
        h: 'Cỡ nhỏ hoặc vừa',
        p: 'Mỗi tiện ích có cấp độ và nhịp riêng, nên bạn có thể học N5 trên màn hình khóa và N3 trên màn hình chính cùng lúc.',
      },
      {
        h: 'Trên Android',
        p: 'Một tiện ích màn hình chính có thể đổi kích thước, theo cấp độ và nhịp bạn chọn trong ứng dụng. Android không có tiện ích màn hình khóa, nên Yumo không giả vờ là có.',
      },
      {
        h: 'Luôn đúng, luôn không cần mạng',
        p: 'Từ được hiện chỉ phụ thuộc vào thời gian và cài đặt của bạn. Không có máy chủ nào quyết định, nên nó giống nhau trên mọi thiết bị và vẫn chạy ở chế độ máy bay.',
      },
    ],
  },
  features: {
    eyebrow: 'Tính năng',
    titleLead: 'Ứng dụng nhỏ,',
    titleAccent: 'nội dung',
    titleTail: 'sâu',
    lede: 'Mọi thứ dưới đây đều chạy không cần tài khoản, không cần mạng và không gửi gì đi đâu cả.',
    items: [
      {
        id: 'strokes',
        title: 'Tập viết theo nét',
        body: 'Luyện viết kanji và kana với thứ tự nét có hướng dẫn từ KanjiVG.',
      },
      {
        id: 'audio',
        title: 'Nghe từng từ',
        body: 'Phát âm bằng giọng tiếng Nhật có sẵn trong máy. Không cần tải, không cần phát trực tuyến.',
      },
      {
        id: 'favourites',
        title: 'Lưu những gì quan trọng',
        body: 'Giữ lại những từ bạn muốn xem lại; chúng ở ngay trên máy của bạn.',
      },
      {
        id: 'languages',
        title: 'Nghĩa bằng sáu ngôn ngữ',
        body: 'Tiếng Anh, Pháp, Đức, Tây Ban Nha, Hàn và Việt, tất cả đều có sẵn trong ứng dụng.',
      },
      {
        id: 'browse',
        title: 'Tra cứu từ điển',
        body: '7.972 từ với cách đọc và nghĩa. N5 với bản miễn phí, mọi cấp độ với bản Pro.',
      },
      {
        id: 'themes',
        title: 'Giao diện',
        body: 'Sáng, tối hoặc theo hệ thống, cùng màu tiện ích, độ trong suốt và màu chữ với bản Pro.',
      },
      {
        id: 'notifications',
        title: 'Thông báo cùng nhịp',
        body: 'Thông báo từ mới tùy chọn theo lịch của tiện ích, được đặt ngay trên máy.',
      },
      {
        id: 'offline',
        title: 'Hoàn toàn không cần mạng',
        body: 'Toàn bộ dữ liệu nằm sẵn trong ứng dụng. Việc học không cần kết nối.',
      },
    ],
  },
  kana: {
    eyebrow: 'Kana',
    titleLead: 'Bắt đầu từ nơi tiếng Nhật',
    titleAccent: 'bắt đầu',
    tabTitle: 'Kana',
    hiragana: 'Hiragana',
    katakana: 'Katakana',
    basic: 'Cơ bản',
    points: [
      {
        h: 'Cả hai bảng chữ, đủ mọi kana',
        p: 'Hiragana và katakana đặt cạnh nhau: {basic} chữ cơ bản, {dakuten} chữ có dakuten và handakuten, và {combo} chữ ghép, mỗi chữ đều có romaji.',
      },
      {
        h: 'Chạm để tập viết',
        p: 'Mỗi chữ đều mở phần luyện thứ tự nét, từ あ đến ヲ. Các chữ ghép như きゃ được luyện từng chữ một.',
      },
      {
        h: 'Miễn phí cho tất cả',
        p: 'Tab Kana thuộc bản miễn phí. Không cần Pro, không cần tài khoản, và không cần mạng như phần còn lại của Yumo.',
      },
    ],
  },
  levels: {
    eyebrow: 'Cấp độ',
    titleLead: 'Từ N5 đến N1, hoặc để nó',
    titleAccent: 'tự leo lên',
    lede: 'Toàn bộ {total} từ, chia theo cấp độ JLPT. Yumo bắt đầu ở chế độ Auto từ N5; với Yumo Pro, bạn được đưa lên dần theo ngày, và những từ đã gặp sẽ quay lại để ôn. Hoặc chọn một cấp độ và ở lại đó.',
    words: '{n} từ',
    reference: {
      title: 'Xem toàn bộ danh sách N5',
      body: 'Toàn bộ {n} từ ở cấp độ mà ai cũng bắt đầu: đọc miễn phí, không cần tài khoản, không cần cài đặt.',
      cta: 'Xem từ vựng N5',
    },
    blurbs: {
      n5: '718 từ đầu tiên. Tất cả đều có trong bản miễn phí.',
      n4: 'Động từ và tính từ hằng ngày mà bạn thật sự sẽ nghe thấy.',
      n3: 'Cấp độ cầu nối, và là bước nhảy từ vựng lớn nhất.',
      n2: 'Tiếng Nhật của báo chí và nơi làm việc.',
      n1: 'Phần đuôi dài: 2.699 từ mà hầu hết các khóa học không bao giờ chạm tới.',
    },
  },
  browse: {
    eyebrow: 'Tra cứu',
    titleLead: 'Toàn bộ từ điển,',
    titleAccent: 'tìm được ngay',
    tabTitle: 'Tra cứu',
    searchPlaceholder: 'Tìm kanji, kana, romaji, nghĩa…',
    all: 'Tất cả',
    points: [
      {
        h: 'Tìm theo cách bạn nhớ',
        p: 'Tìm trong {total} từ theo kanji, kana, romaji hoặc nghĩa. Mỗi mục đều có cách đọc, romaji, cấp độ JLPT và nghĩa bằng tiếng Anh, Pháp, Đức, Tây Ban Nha, Hàn và Việt.',
      },
      {
        h: 'N5 miễn phí, mọi cấp độ với Pro',
        p: 'Với bản miễn phí, phần Tra cứu gồm N5: {n5} từ. Yumo Pro mở tất cả các cấp độ cao hơn.',
      },
      {
        h: 'Không cần mạng, như phần còn lại của Yumo',
        p: 'Mọi thứ đều nằm sẵn trong ứng dụng, nên tìm kiếm chạy cả khi không có kết nối.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Giá',
    titleLead: 'Một mức giá,',
    titleAccent: 'dùng mãi mãi',
    lede: 'Yumo Pro chỉ trả một lần. Không thuê bao, không gia hạn, không có tài khoản nào phải hủy.',
    freeName: 'Miễn phí',
    proName: 'Yumo Pro',
    once: 'một lần',
    free: [
      'Từ vựng N5: {n5} từ',
      'Một từ mới sau mỗi 6, 12 hoặc 24 giờ',
      'Tiện ích màn hình khóa và màn hình chính',
      'Bảng hiragana và katakana',
      'Phát âm và luyện viết theo nét',
      'Yêu thích, thông báo và giao diện',
    ],
    pro: [
      'Mọi cấp độ từ N5 đến N1: toàn bộ {total} từ',
      'Một từ mới sau mỗi 1, 2, 3 hoặc 4 giờ',
      'Câu ví dụ trên màn hình khóa (iPhone)',
      'Hành trình Auto, leo từ N5 lên N1',
      'Tra cứu toàn bộ từ điển',
      'Màu tiện ích, độ trong suốt và màu chữ',
    ],
  },
  privacy: {
    eyebrow: 'Quyền riêng tư',
    titleLead: 'Không thu thập',
    titleAccent: 'gì cả',
    lede: 'Không tài khoản, không hồ sơ, không quảng cáo. Từ và tiến độ của bạn không bao giờ rời khỏi điện thoại.',
    claims: [
      {
        title: 'Không tài khoản',
        body: 'Không có gì để đăng ký. Yumo không có đăng nhập, không có hồ sơ và không đồng bộ đám mây.',
      },
      {
        title: 'Không theo dõi',
        body: 'Không phân tích sử dụng, không báo cáo lỗi, không mã quảng cáo. Không có gì theo bạn qua các ứng dụng khác.',
      },
      {
        title: 'Không có gì rời khỏi máy',
        body: 'Cài đặt, từ đã lưu và tiến độ đều nằm trên máy. Xóa ứng dụng là xóa hết.',
      },
      {
        title: 'Không cần mạng ngay từ thiết kế',
        body: 'Toàn bộ dữ liệu nằm sẵn trong ứng dụng, nên việc học chạy được ở chế độ máy bay là do thiết kế chứ không phải tình cờ.',
      },
    ],
    exceptionBefore:
      'Có ba ngoại lệ: khi mua Yumo Pro, giao dịch được gửi đến Apple hoặc Google và RevenueCat, bên xác nhận giao dịch để bạn có thể khôi phục sau này; trên iPhone, thông báo tùy chọn News & updates đi qua OneSignal, bên nhận mã thông báo đẩy của máy bạn; và nếu bạn bật Câu ví dụ trên màn hình khóa (Yumo Pro), ngôn ngữ, múi giờ và cài đặt từ của bạn được gửi đến máy chủ của Yumo để bắt đầu thẻ. Cả ba đều được mô tả đầy đủ trong ',
    exceptionLink: 'chính sách quyền riêng tư',
    exceptionAfter: ' (bằng tiếng Anh).',
  },
  faq: {
    eyebrow: 'Câu hỏi',
    title: 'Trước khi bạn hỏi',
    playSoon: 'Phiên bản Android sắp có trên Google Play.',
    items: [
      {
        q: 'Yumo là gì?',
        a: 'Yumo là ứng dụng học từ vựng tiếng Nhật cho iPhone và Android. Tiện ích của Yumo đưa một từ tiếng Nhật mới lên màn hình khóa hoặc màn hình chính sau mỗi vài giờ, và việc học không cần mạng. Cấp độ N5 miễn phí; mua Yumo Pro một lần với giá {price} để mở toàn bộ {total} từ, từ N5 đến N1.',
      },
      {
        q: 'Tôi có thể học hiragana và katakana không?',
        a: 'Có. Tab Kana hiện cả hai bảng chữ cùng romaji: chữ cơ bản, dakuten và handakuten, và chữ ghép. Chạm vào bất kỳ kana nào để luyện thứ tự nét. Phần này miễn phí, không cần mua Yumo Pro.',
      },
      {
        q: 'Vì sao từ chưa đổi?',
        a: 'Yumo đổi từ theo nhịp cố định: sau mỗi 6, 12 hoặc 24 giờ với bản miễn phí, hoặc sau mỗi 1 đến 4 giờ với bản Pro. Giữa các mốc đó từ được giữ nguyên. Đây là chủ ý: từ bạn thấy trong vài giờ là từ bạn sẽ nhớ.',
      },
      {
        q: 'Yumo có chạy trên Android không?',
        a: 'Có, dưới dạng tiện ích màn hình chính. Điện thoại Android không có tiện ích màn hình khóa, nên phần đó chỉ có trên iPhone. {playSoon}',
      },
      {
        q: 'Yumo Pro có phải là thuê bao không?',
        a: 'Không. Đây là giao dịch một lần gắn với tài khoản App Store hoặc Google Play của bạn, có thể khôi phục trên mọi thiết bị bạn đăng nhập.',
      },
      {
        q: 'Tôi chạm vào loa nhưng không nghe thấy gì.',
        a: 'Yumo phát âm bằng giọng tiếng Nhật có sẵn trong máy. Nếu chưa có, hãy thêm trong phần Trợ năng: trên iPhone là Nội dung được đọc, trên Android là Đầu ra chuyển văn bản thành giọng nói.',
      },
      {
        q: 'Làm sao để được hoàn tiền?',
        a: 'Việc hoàn tiền do Apple và Google xử lý, không phải chúng tôi. Hãy dùng reportaproblem.apple.com, hoặc lịch sử đơn hàng Google Play của bạn.',
      },
    ],
  },
  footer: {
    tagline: 'Tiếng Nhật, không cần mở ứng dụng.',
    support: 'Hỗ trợ',
    jlpt: 'Danh sách từ N5',
    privacy: 'Quyền riêng tư',
    terms: 'Điều khoản',
    contact: 'Liên hệ',
    social: 'Yumo trên {network}',
    englishOnly: ' (tiếng Anh)',
    attribution:
      '© 2026 Yumo by SofDji. Sơ đồ thứ tự nét © KanjiVG (Ulrich Apel), CC BY-SA 4.0. Bản dịch tiếng Pháp, Đức và Tây Ban Nha có dùng dữ liệu từ JMdict/EDICT (EDRDG), theo giấy phép CC BY-SA 4.0.',
  },
  meta: {
    title: 'Yumo: tiện ích từ vựng tiếng Nhật cho màn hình khóa',
    description:
      'Cứ vài giờ một từ tiếng Nhật mới trên màn hình khóa iPhone hoặc màn hình chính Android. 7.972 từ từ JLPT N5 đến N1, bảng hiragana và katakana, không cần mạng, không cần tài khoản.',
    ogDescription:
      'Cứ vài giờ một từ tiếng Nhật mới. 7.972 từ, không cần mạng, không cần tài khoản.',
  },
};
