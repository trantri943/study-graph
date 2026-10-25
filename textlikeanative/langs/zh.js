// Gói tiếng Trung (giản thể): đồng nghiệp người Hoa ở Irvine, California, nhắn qua WeChat.

const CHARACTERS = {
  xiaoyu: {
    name: "Xiaoyu", native: "小雨", color: "#F472B6", age: 23,
    role: "Đồng nghiệp trẻ",
    style: "Nhiều 哈哈哈, slang mạng, emoji",
    persona: "Xiaoyu (小雨), 23, a young coworker at a tech company in Irvine, California, originally from Chengdu. Texts on WeChat with lots of 哈哈哈, internet slang (yyds, 冲, 绝绝子, 家人们), and emoji. Loves hotpot and milk tea in the San Gabriel Valley.",
  },
  wang: {
    name: "Wang", native: "王伟", color: "#4F8CFF", age: 36,
    role: "Trưởng nhóm",
    style: "Ngắn gọn, rõ ràng, hay dùng 好的, 收到, 辛苦了",
    persona: "Wang Wei (王伟), 36, the learner's team lead in Irvine. Short, clear, professional WeChat messages (好的, 收到, 辛苦了, 👍). Friendly, has a young kid. Younger coworkers call him 王哥.",
  },
  leo: {
    name: "Leo", native: "李浩", color: "#FB923C", age: 28,
    role: "Đồng nghiệp cùng nhóm",
    style: "Hay chọc ghẹo, nói 666, 就这？, 你行你上",
    persona: "Li Hao (李浩), English name Leo, 28, a coworker on the same team. Teases a lot with internet banter (666, 就这？, 你行你上), plays basketball after work.",
  },
  zhou: {
    name: "Cô Zhou", native: "周阿姨", color: "#818CF8", age: 58,
    role: "Đồng nghiệp lớn tuổi (kế toán)",
    style: "Câu đầy đủ, dùng 您, emoji 🌹👍, rất nhiệt tình",
    persona: "Auntie Zhou (周阿姨), 58, a senior accountant at the company. Warm, chatty, writes full sentences, uses 🌹 👍 😊, loves feeding people and playing matchmaker. Calls the learner affectionately and uses 呀, 啊, 哈.",
  },
};

// [từ, nhóm, nghĩa, ví dụ, độ trang trọng, người dùng, cách đọc]
const LEX = [
  ["yyds", "abbr", "đỉnh của chóp, mãi đỉnh (viết tắt pinyin của 永远的神)", "这家奶茶yyds！", 1, "z", "yǒngyuǎn de shén"],
  ["xswl", "abbr", "cười chết mất (笑死我了)", "xswl 你太逗了", 1, "z", "xiào sǐ wǒ le"],
  ["666", "abbr", "giỏi quá, đỉnh (\"liù\" đọc giống 溜 = trơn tru, khéo)", "这操作666", 1, "y", "liù liù liù"],
  ["+1", "abbr", "đồng ý, tính cả mình", "— 吃火锅？ — +1", 2, "a", "jiā yī"],
  ["AA", "abbr", "chia đều tiền", "今天AA吧", 2, "a", "AA"],
  ["哈哈哈", "react", "cười. Càng nhiều 哈 càng thật lòng; chỉ một chữ 哈 nghe nhạt", "哈哈哈哈笑死", 2, "a", "hāhāhā"],
  ["好的", "react", "vâng, ok (lịch sự, an toàn). Chỉ 好 hoặc 嗯 có thể nghe lạnh", "好的，马上来", 3, "a", "hǎo de"],
  ["真的假的", "react", "thật hay đùa vậy?", "真的假的？！", 2, "a", "zhēnde jiǎde"],
  ["牛", "react", "giỏi, đỉnh", "你太牛了", 1, "y", "niú"],
  ["好家伙", "react", "chà, trời đất (ngạc nhiên)", "好家伙，这么多人", 1, "y", "hǎo jiāhuo"],
  ["收到", "phrase", "đã nhận, rõ (dùng rất nhiều ở công sở)", "收到，我来处理", 3, "a", "shōudào"],
  ["辛苦了", "phrase", "vất vả rồi (cảm ơn công sức của ai)", "大家辛苦了！", 3, "a", "xīnkǔ le"],
  ["在吗", "phrase", "có đó không? (mở đầu tin nhắn; nhiều người thấy hơi phiền nếu không nói luôn việc)", "在吗？问你个事", 2, "a", "zài ma"],
  ["人呢", "phrase", "người đâu rồi? (giục trả lời, kiểu đùa)", "人呢？？", 1, "y", "rén ne"],
  ["发红包", "phrase", "gửi lì xì (tiền) qua WeChat, để cảm ơn, chúc mừng", "老板发红包了！", 2, "a", "fā hóngbāo"],
  ["抢红包", "phrase", "giành lì xì trong nhóm chat (ai bấm nhanh được nhiều)", "手慢没抢到😭", 2, "a", "qiǎng hóngbāo"],
  ["冲", "slang", "quẩy! lên! (hào hứng làm gì đó)", "周末火锅，冲！", 1, "z", "chōng"],
  ["馋", "slang", "thèm ăn", "看得我好馋", 2, "a", "chán"],
  ["绝绝子", "slang", "tuyệt cú mèo, đỉnh (giới trẻ)", "这个蛋糕绝绝子", 1, "z", "juéjuézǐ"],
  ["摸鱼", "slang", "\"bắt cá\": lười, trốn việc trong giờ làm", "上班摸鱼被发现了", 1, "y", "mōyú"],
  ["打工人", "slang", "dân đi làm thuê (tự giễu)", "打工人，早安！", 1, "y", "dǎgōngrén"],
  ["社恐", "slang", "sợ giao tiếp xã hội", "我社恐，不敢打电话", 1, "z", "shèkǒng"],
  ["已读不回", "slang", "đã đọc mà không trả lời", "又已读不回😤", 1, "y", "yǐ dú bù huí"],
  ["就这？", "banter", "chỉ vậy thôi à? (chê, chọc)", "你说的大餐就这？", 1, "z", "jiù zhè?"],
  ["你行你上", "banter", "giỏi thì làm đi (đáp lại người chê)", "嫌我菜？你行你上", 1, "y", "nǐ xíng nǐ shàng"],
  ["等着瞧", "banter", "để rồi xem", "下次我赢，等着瞧", 2, "a", "děngzhe qiáo"],
  ["别装了", "banter", "đừng giả vờ nữa", "别装了，你就是想吃", 1, "y", "bié zhuāng le"],
  ["改天吧", "decline", "để hôm khác nhé", "今天有点累，改天吧", 3, "a", "gǎitiān ba"],
  ["不太方便", "decline", "không tiện lắm (từ chối nhẹ, không cần giải thích thêm)", "这周不太方便", 3, "a", "bú tài fāngbiàn"],
  ["心领了", "decline", "xin nhận tấm lòng (từ chối lời mời, quà một cách lịch sự)", "您的好意我心领了", 3, "a", "xīnlǐng le"],
  ["我考虑一下", "decline", "để mình suy nghĩ (thường là từ chối khéo)", "这个我考虑一下哈", 3, "a", "wǒ kǎolǜ yíxià"],
  ["下次一定", "decline", "lần sau nhất định (câu đùa trên mạng, thường có nghĩa là \"không\")", "— 来玩啊 — 下次一定", 1, "y", "xiàcì yídìng"],
  ["🙂", "emoji", "\"mỉm cười\" trên WeChat thường mang nghĩa mỉa mai, khó chịu. Nên tránh!", "哦🙂", 1, "a", ""],
  ["👍", "emoji", "tốt, ok. Người lớn tuổi dùng nhiều; giới trẻ đôi khi thấy hơi lạnh", "收到👍", 2, "a", ""],
  ["🌹", "emoji", "bông hồng: người lớn tuổi dùng để chào, cảm ơn, rất thân thiện", "早上好🌹", 2, "a", ""],
  ["🙏", "emoji", "cảm ơn / nhờ vả", "麻烦了🙏", 2, "a", ""],
];

const SCENARIOS = [
  {
    id: "plans", title: "Rủ đi ăn lẩu", en: "Making plans: hotpot on the weekend", chars: ["xiaoyu"],
    desc: "Xiaoyu rủ bạn thứ Bảy đi ăn lẩu ở San Gabriel.",
    turns: [
      {
        msgs: [
          { from: "xiaoyu", t: "在吗在吗😆", r: "zài ma zài ma", vi: "Có đó không có đó không 😆", tone: "friendly", s: ["在吗"] },
          { from: "xiaoyu", t: "周六要不要一起去圣盖博吃火锅！馋死我了😭", r: "zhōuliù yào bu yào yìqǐ qù Shènggàibó chī huǒguō! chán sǐ wǒ le", vi: "Thứ Bảy đi San Gabriel ăn lẩu chung không! Thèm chết đi được 😭", tone: "friendly", s: ["馋"] },
        ],
        replies: [
          { en: "好啊！几点？", r: "hǎo a! jǐ diǎn?", vi: "Được đó! Mấy giờ?" },
          { en: "冲！我也好久没吃火锅了", r: "chōng! wǒ yě hǎojiǔ méi chī huǒguō le", vi: "Đi luôn! Mình cũng lâu rồi chưa ăn lẩu", s: ["冲"] },
          { en: "火锅？你说到我心坎里了😂", r: "huǒguō? nǐ shuō dào wǒ xīnkǎn lǐ le", vi: "Lẩu á? Bạn nói trúng tim mình rồi 😂" },
        ],
      },
      {
        msgs: [
          { from: "xiaoyu", t: "哈哈哈哈太好了", r: "hāhāhāhā tài hǎo le", vi: "Hahaha tuyệt quá", tone: "friendly", s: ["哈哈哈"] },
          { from: "xiaoyu", t: "那家海底捞永远排队，但是真的yyds！", r: "nà jiā Hǎidǐlāo yǒngyuǎn páiduì, dànshì zhēnde yyds!", vi: "Quán Haidilao đó lúc nào cũng xếp hàng, nhưng đúng là đỉnh của chóp!", tone: "friendly", s: ["yyds"] },
        ],
        replies: [
          { en: "没问题，我们早点去吧", r: "méi wèntí, wǒmen zǎo diǎn qù ba", vi: "Không vấn đề, mình đi sớm chút nhé" },
          { en: "排队也值！我想吃毛肚", r: "páiduì yě zhí! wǒ xiǎng chī máodǔ", vi: "Xếp hàng cũng đáng! Mình muốn ăn lá sách bò" },
          { en: "yyds的话必须去，我负责点菜😎", r: "yyds dehuà bìxū qù, wǒ fùzé diǎn cài", vi: "Đã đỉnh thì phải đi, mình lo phần gọi món 😎", s: ["yyds"] },
        ],
      },
      {
        msgs: [
          { from: "xiaoyu", t: "那我们五点在那边见？", r: "nà wǒmen wǔ diǎn zài nàbiān jiàn?", vi: "Vậy 5 giờ gặp ở đó nhé?", tone: "friendly" },
          { from: "xiaoyu", t: "吃完AA哦，不许抢着买单😤", r: "chī wán AA o, bù xǔ qiǎngzhe mǎidān", vi: "Ăn xong chia đều nha, không được giành trả tiền đâu 😤", tone: "teasing", s: ["AA"] },
        ],
        replies: [
          { en: "好的，五点见！", r: "hǎo de, wǔ diǎn jiàn!", vi: "Ok, 5 giờ gặp!", s: ["好的"] },
          { en: "收到！AA没问题", r: "shōudào! AA méi wèntí", vi: "Rõ! Chia đều không vấn đề", s: ["收到", "AA"] },
          { en: "行吧行吧，那奶茶我请😏", r: "xíng ba xíng ba, nà nǎichá wǒ qǐng", vi: "Thôi được rồi, vậy trà sữa mình mời 😏" },
        ],
      },
    ],
  },
  {
    id: "smalltalk", title: "Nói chuyện với trưởng nhóm", en: "Small talk with the team lead", chars: ["wang"],
    desc: "Sáng thứ Hai, anh Vương hỏi thăm cuối tuần và nhờ việc.",
    turns: [
      {
        msgs: [
          { from: "wang", t: "早！周末过得怎么样？", r: "zǎo! zhōumò guò de zěnmeyàng?", vi: "Chào buổi sáng! Cuối tuần thế nào?", tone: "friendly" },
          { from: "wang", t: "我陪孩子去了趟迪士尼，累坏了😅", r: "wǒ péi háizi qù le tàng Díshìní, lèi huài le", vi: "Tôi dẫn con đi Disneyland một chuyến, mệt rã rời 😅", tone: "friendly" },
        ],
        replies: [
          { en: "早！还不错，在家休息了。迪士尼好玩吗？", r: "zǎo! hái búcuò, zài jiā xiūxi le. Díshìní hǎowán ma?", vi: "Chào anh! Cũng ổn, em ở nhà nghỉ. Disney vui không anh?" },
          { en: "早上好！我去海边了。孩子一定玩得很开心吧？", r: "zǎoshang hǎo! wǒ qù hǎibiān le. háizi yídìng wán de hěn kāixīn ba?", vi: "Chào buổi sáng! Em đi biển. Bé chắc chơi vui lắm ha?" },
          { en: "辛苦了哈哈，周末带娃比上班还累吧😂", r: "xīnkǔ le hāhā, zhōumò dài wá bǐ shàngbān hái lèi ba", vi: "Vất vả rồi haha, cuối tuần trông con còn mệt hơn đi làm ha 😂", s: ["辛苦了"] },
        ],
      },
      {
        msgs: [
          { from: "wang", t: "哈哈是的", r: "hāhā shì de", vi: "Haha đúng vậy", tone: "friendly" },
          { from: "wang", t: "对了，周三下班前把报告发我一下，可以吗？", r: "duìle, zhōusān xiàbān qián bǎ bàogào fā wǒ yíxià, kěyǐ ma?", vi: "À đúng rồi, trước giờ tan làm thứ Tư gửi tôi bản báo cáo nhé, được không?", tone: "serious" },
        ],
        replies: [
          { en: "好的，没问题。", r: "hǎo de, méi wèntí.", vi: "Vâng, không vấn đề.", s: ["好的"] },
          { en: "收到！我周三上午发给您。", r: "shōudào! wǒ zhōusān shàngwǔ fā gěi nín.", vi: "Đã rõ! Sáng thứ Tư em gửi anh.", s: ["收到"] },
          { en: "收到～我周二先发个初稿给您看看？", r: "shōudào~ wǒ zhōu'èr xiān fā ge chūgǎo gěi nín kànkan?", vi: "Rõ ạ~ Thứ Ba em gửi bản nháp trước để anh xem nhé?", s: ["收到"] },
        ],
      },
      {
        msgs: [
          { from: "wang", t: "好的，辛苦了👍", r: "hǎo de, xīnkǔ le", vi: "Ok, vất vả cho bạn rồi 👍", tone: "friendly", s: ["辛苦了", "👍"] },
        ],
        replies: [
          { en: "不辛苦，应该的！", r: "bù xīnkǔ, yīnggāi de!", vi: "Không vất vả đâu ạ, việc nên làm mà!" },
          { en: "谢谢王哥！", r: "xièxie Wáng gē!", vi: "Cảm ơn anh Vương! (王哥: cách gọi thân mật đồng nghiệp nam lớn tuổi hơn)" },
          { en: "没事～中午一起吃饭吗？", r: "méishì~ zhōngwǔ yìqǐ chīfàn ma?", vi: "Không sao ạ~ Trưa nay ăn cơm chung không anh?" },
        ],
      },
    ],
  },
  {
    id: "decline", title: "Từ chối mai mối", en: "Declining politely: auntie's matchmaking", chars: ["zhou"],
    desc: "Cô Zhou muốn giới thiệu cháu của cô cho bạn. Tập từ chối khéo.",
    turns: [
      {
        msgs: [
          { from: "zhou", t: "在吗？阿姨跟你说个事😊", r: "zài ma? āyí gēn nǐ shuō ge shì", vi: "Có đó không? Cô nói với con chuyện này nhé 😊", tone: "friendly", s: ["在吗"] },
          { from: "zhou", t: "我外甥也在尔湾工作，人很好，周末要不要见个面？🌹", r: "wǒ wàisheng yě zài Ěrwān gōngzuò, rén hěn hǎo, zhōumò yào bu yào jiàn ge miàn?", vi: "Cháu của cô cũng làm ở Irvine, người tốt lắm, cuối tuần gặp mặt thử không? 🌹", tone: "pushy", s: ["🌹"] },
        ],
        replies: [
          { en: "谢谢阿姨！不过我最近工作比较忙，改天吧。", r: "xièxie āyí! búguò wǒ zuìjìn gōngzuò bǐjiào máng, gǎitiān ba.", vi: "Cảm ơn cô! Nhưng dạo này con khá bận, để hôm khác ạ.", s: ["改天吧"] },
          { en: "阿姨您太热心了😂 我现在还不想考虑这个，心领了！", r: "āyí nín tài rèxīn le. wǒ xiànzài hái bù xiǎng kǎolǜ zhège, xīnlǐng le!", vi: "Cô nhiệt tình quá ạ 😂 Giờ con chưa muốn nghĩ tới chuyện này, con xin nhận tấm lòng!", s: ["心领了"] },
          { en: "哈哈谢谢阿姨，我考虑一下哈🙏", r: "hāhā xièxie āyí, wǒ kǎolǜ yíxià ha", vi: "Haha cảm ơn cô, để con suy nghĩ đã nha 🙏", s: ["我考虑一下", "🙏"] },
        ],
      },
      {
        msgs: [
          { from: "zhou", t: "哎呀，就吃个饭嘛，不用有压力😊", r: "āiyā, jiù chī ge fàn ma, búyòng yǒu yālì", vi: "Ôi dào, chỉ ăn bữa cơm thôi mà, không cần áp lực 😊", tone: "pushy" },
          { from: "zhou", t: "他做饭也很好吃的", r: "tā zuòfàn yě hěn hǎochī de", vi: "Nó nấu ăn cũng ngon lắm đó", tone: "pushy" },
        ],
        replies: [
          { en: "真的谢谢阿姨，但这周真的不太方便。", r: "zhēnde xièxie āyí, dàn zhè zhōu zhēnde bú tài fāngbiàn.", vi: "Thật sự cảm ơn cô, nhưng tuần này con thật sự không tiện lắm.", s: ["不太方便"] },
          { en: "阿姨，我知道您是为我好，但我现在想专心工作😅", r: "āyí, wǒ zhīdào nín shì wèi wǒ hǎo, dàn wǒ xiànzài xiǎng zhuānxīn gōngzuò", vi: "Cô ơi, con biết cô muốn tốt cho con, nhưng giờ con muốn tập trung làm việc 😅" },
          { en: "哈哈那下次一定！", r: "hāhā nà xiàcì yídìng!", vi: "Haha vậy lần sau nhất định! (câu đùa quen thuộc, thường nghĩa là \"không\")", s: ["下次一定"] },
        ],
      },
      {
        msgs: [
          { from: "zhou", t: "好吧好吧，那阿姨不勉强你了", r: "hǎo ba hǎo ba, nà āyí bù miǎnqiǎng nǐ le", vi: "Thôi được rồi, vậy cô không ép con nữa", tone: "friendly" },
          { from: "zhou", t: "有空来我家吃饺子啊😊", r: "yǒu kòng lái wǒ jiā chī jiǎozi a", vi: "Rảnh thì qua nhà cô ăn sủi cảo nhé 😊", tone: "friendly" },
        ],
        replies: [
          { en: "好的，谢谢阿姨！", r: "hǎo de, xièxie āyí!", vi: "Dạ, cảm ơn cô!", s: ["好的"] },
          { en: "一定去！阿姨包的饺子最好吃了", r: "yídìng qù! āyí bāo de jiǎozi zuì hǎochī le", vi: "Nhất định con qua! Sủi cảo cô gói là ngon nhất" },
          { en: "这个我真的一定去😂", r: "zhège wǒ zhēnde yídìng qù", vi: "Cái này thì con nhất định đi thật 😂" },
        ],
      },
    ],
  },
  {
    id: "group", title: "Nhóm WeChat của phòng", en: "Department group chat: red envelopes and dinner", chars: ["wang", "xiaoyu", "leo"], group: "部门群",
    desc: "Dự án xong, sếp gửi lì xì và cả nhóm hẹn đi ăn.",
    turns: [
      {
        msgs: [
          { from: "wang", t: "今天项目上线成功，大家辛苦了！", r: "jīntiān xiàngmù shàngxiàn chénggōng, dàjiā xīnkǔ le!", vi: "Hôm nay dự án ra mắt thành công, mọi người vất vả rồi!", tone: "friendly", s: ["辛苦了"] },
          { from: "wang", t: "[红包] 恭喜发财，大吉大利", r: "[hóngbāo] gōngxǐ fācái, dàjí dàlì", vi: "[Lì xì] Chúc phát tài, đại cát đại lợi (lời mặc định khi gửi lì xì WeChat)", tone: "friendly", s: ["发红包"] },
          { from: "xiaoyu", t: "谢谢老板！抢到了😆", r: "xièxie lǎobǎn! qiǎng dào le", vi: "Cảm ơn sếp! Giành được rồi 😆", tone: "friendly", s: ["抢红包"] },
        ],
        replies: [
          { en: "谢谢王哥！大家辛苦了！", r: "xièxie Wáng gē! dàjiā xīnkǔ le!", vi: "Cảm ơn anh Vương! Mọi người vất vả rồi!", s: ["辛苦了"] },
          { en: "谢谢老板🙏 手慢了，只抢到一块钱😂", r: "xièxie lǎobǎn, shǒu màn le, zhǐ qiǎng dào yí kuài qián", vi: "Cảm ơn sếp 🙏 Tay chậm quá, chỉ giành được 1 đồng 😂", s: ["抢红包", "🙏"] },
          { en: "老板大气！今晚是不是该庆祝一下👀", r: "lǎobǎn dàqi! jīnwǎn shì bu shì gāi qìngzhù yíxià", vi: "Sếp chịu chi! Tối nay có nên ăn mừng không nhỉ 👀" },
        ],
      },
      {
        msgs: [
          { from: "leo", t: "庆祝必须的！周五聚餐？", r: "qìngzhù bìxū de! zhōuwǔ jùcān?", vi: "Ăn mừng là phải rồi! Thứ Sáu đi ăn chung?", tone: "friendly" },
          { from: "xiaoyu", t: "我投烤肉一票🙋‍♀️", r: "wǒ tóu kǎoròu yí piào", vi: "Em bầu đồ nướng một phiếu 🙋‍♀️", tone: "friendly" },
          { from: "leo", t: "你上次吃两盘就饱了，就这？😂", r: "nǐ shàngcì chī liǎng pán jiù bǎo le, jiù zhè?", vi: "Lần trước em ăn hai đĩa đã no, chỉ vậy thôi à? 😂", tone: "teasing", s: ["就这？"] },
        ],
        replies: [
          { en: "周五可以！我都行。", r: "zhōuwǔ kěyǐ! wǒ dōu xíng.", vi: "Thứ Sáu được! Mình sao cũng được." },
          { en: "烤肉+1！", r: "kǎoròu jiā yī!", vi: "Đồ nướng +1!", s: ["+1"] },
          { en: "Leo你行你上，看你能吃几盘😏", r: "Leo nǐ xíng nǐ shàng, kàn nǐ néng chī jǐ pán", vi: "Leo giỏi thì làm đi, xem ăn được mấy đĩa 😏", s: ["你行你上"] },
        ],
      },
      {
        msgs: [
          { from: "wang", t: "那就周五七点，我订位子。", r: "nà jiù zhōuwǔ qī diǎn, wǒ dìng wèizi.", vi: "Vậy thứ Sáu 7 giờ, tôi đặt bàn.", tone: "friendly" },
          { from: "leo", t: "666，老板效率高👍", r: "liù liù liù, lǎobǎn xiàolǜ gāo", vi: "Đỉnh, sếp làm nhanh ghê 👍", tone: "friendly", s: ["666", "👍"] },
          { from: "xiaoyu", t: "冲冲冲！", r: "chōng chōng chōng!", vi: "Quẩy thôi!", tone: "friendly", s: ["冲"] },
        ],
        replies: [
          { en: "收到，周五见！", r: "shōudào, zhōuwǔ jiàn!", vi: "Rõ, thứ Sáu gặp!", s: ["收到"] },
          { en: "好的！谢谢王哥安排～", r: "hǎo de! xièxie Wáng gē ānpái~", vi: "Ok! Cảm ơn anh Vương sắp xếp~", s: ["好的"] },
          { en: "冲！Leo别又说就这😂", r: "chōng! Leo bié yòu shuō jiù zhè", vi: "Đi thôi! Leo đừng có lại nói \"chỉ vậy thôi à\" nha 😂", s: ["冲", "就这？"] },
        ],
      },
    ],
  },
  {
    id: "followup", title: "Trả lời sau khi im lặng", en: "Following up after no reply", chars: ["leo"],
    desc: "Bạn quên trả lời Leo 2 ngày. Giờ anh ấy nhắn lại.",
    history: [
      { from: "leo", t: "晚上打球去吗？🏀", r: "wǎnshang dǎ qiú qù ma?", vi: "Tối nay đi chơi bóng rổ không? 🏀", tone: "friendly", stamp: "2 ngày trước" },
    ],
    turns: [
      {
        msgs: [
          { from: "leo", t: "人呢？", r: "rén ne?", vi: "Người đâu rồi?", tone: "teasing", s: ["人呢"] },
          { from: "leo", t: "不回消息是吧😤", r: "bù huí xiāoxi shì ba", vi: "Không trả lời tin nhắn hả 😤", tone: "teasing" },
        ],
        replies: [
          { en: "不好意思！这两天太忙了，刚看到。", r: "bù hǎoyìsi! zhè liǎng tiān tài máng le, gāng kàn dào.", vi: "Xin lỗi nha! Hai hôm nay bận quá, giờ mới thấy." },
          { en: "我的错我的错😭 忘回了", r: "wǒ de cuò wǒ de cuò, wàng huí le", vi: "Lỗi mình lỗi mình 😭 Quên trả lời mất" },
          { en: "在呢在呢！被工作埋了😵", r: "zài ne zài ne! bèi gōngzuò mái le", vi: "Đây đây! Bị công việc chôn sống rồi 😵" },
        ],
      },
      {
        msgs: [
          { from: "leo", t: "哈哈没事", r: "hāhā méishì", vi: "Haha không sao", tone: "friendly" },
          { from: "leo", t: "今晚还打球吗？", r: "jīnwǎn hái dǎ qiú ma?", vi: "Tối nay còn chơi bóng rổ không?", tone: "friendly" },
        ],
        replies: [
          { en: "打！几点？", r: "dǎ! jǐ diǎn?", vi: "Chơi! Mấy giờ?" },
          { en: "可以啊，老地方？", r: "kěyǐ a, lǎo dìfang?", vi: "Được đó, chỗ cũ hả?" },
          { en: "打！输了请你喝奶茶😎", r: "dǎ! shū le qǐng nǐ hē nǎichá", vi: "Chơi! Thua thì mình mời trà sữa 😎" },
        ],
      },
      {
        msgs: [
          { from: "leo", t: "行，七点老地方", r: "xíng, qī diǎn lǎo dìfang", vi: "Ok, 7 giờ chỗ cũ", tone: "friendly" },
          { from: "leo", t: "这次别再不回消息了啊😂", r: "zhè cì bié zài bù huí xiāoxi le a", vi: "Lần này đừng không trả lời nữa nha 😂", tone: "teasing" },
        ],
        replies: [
          { en: "好的，七点见！", r: "hǎo de, qī diǎn jiàn!", vi: "Ok, 7 giờ gặp!", s: ["好的"] },
          { en: "收到收到😂", r: "shōudào shōudào", vi: "Rõ rõ 😂", s: ["收到"] },
          { en: "下次一定😏", r: "xiàcì yídìng", vi: "Lần sau nhất định 😏 (đùa: tức là chưa chắc)", s: ["下次一定"] },
        ],
      },
    ],
  },
];

const UNNATURAL = [
  { en: "你好。我很好，谢谢。你呢？", why: "Giống sách giáo khoa, không ai nhắn tin như vậy." },
  { en: "嗯。", why: "Chỉ một chữ 嗯 nghe lạnh lùng, như không muốn nói chuyện." },
  { en: "不去。", why: "Từ chối cụt lủn, nghe khó chịu. Thử \"改天吧\" hoặc \"不太方便\"." },
  { en: "我同意你的意见。", why: "Quá cứng, như văn viết. Thử \"对对对\" hoặc \"确实\"." },
  { en: "这个食物非常好吃。", why: "Đúng ngữ pháp nhưng như dịch máy. Người ta nói \"太好吃了！\"." },
  { en: "请告诉我时间。", why: "Quá trang trọng với bạn bè. Thử \"几点？\"." },
];

const LESSONS = [
  {
    id: "raa", title: "React → Add → Ask bằng tiếng Trung",
    sections: [
      { h: "Ý chính", body: "<p>Phản ứng, thêm thông tin của mình, rồi hỏi lại. Phản ứng trong tiếng Trung: <i>哇、真的假的、太好了、羡慕</i>. Tránh trả lời chỉ <i>哦</i> hoặc <i>嗯</i>: nghe rất lạnh.</p>" },
      { h: "Ví dụ", body: "<div class='ex'><div class='them'>周末去了趟大熊湖！</div><div class='bad'>❌ 哦。</div><div class='good'>✅ <b>哇好羡慕！</b> <span class='tag'>React</span> 我一直想去。 <span class='tag'>Add</span> 那边冷不冷？ <span class='tag'>Ask</span></div></div>" },
      { h: "Mẹo", body: "<ul><li>Câu hỏi ngắn kiểu wbu: <i>你呢？</i></li><li>Thêm 呀, 啊, 哈 cuối câu cho mềm: <i>好呀！</i>, <i>真的啊？</i></li></ul>" },
    ],
    check: { q: "Đồng nghiệp nhắn \"我买了新车！\". Câu nào đủ React → Add → Ask?", opts: ["哦。", "哇恭喜！我也在看车呢。买的什么车？", "车很贵。"], a: 1, why: "Có React (哇恭喜！), Add (我也在看车呢) và Ask (买的什么车？)." },
  },
  {
    id: "polite", title: "Xưng hô, lịch sự và từ chối khéo",
    sections: [
      { h: "Xưng hô", body: "<ul><li>Dùng <b>您</b> với sếp, người lớn tuổi, khách hàng.</li><li>Đồng nghiệp lớn tuổi hơn: <b>họ + 哥/姐</b> (<i>王哥, 李姐</i>), nghe thân mà vẫn tôn trọng.</li><li>Cô chú lớn tuổi: <b>阿姨, 叔叔</b>.</li></ul>" },
      { h: "Trả lời ở công sở", body: "<ul><li><b>好的 / 收到</b>: an toàn, lịch sự.</li><li>Chỉ <b>嗯</b>, <b>哦</b>, <b>好</b> có thể nghe hờ hững. Thêm chữ cho mềm: <i>好的～</i>, <i>嗯嗯</i>.</li><li><b>在吗？</b> rồi chờ: nhiều người thấy phiền. Nói luôn việc cần hỏi.</li><li>Hỏi trước khi gửi tin nhắn thoại dài cho sếp.</li></ul>" },
      { h: "Từ chối khéo", body: "<ul><li><b>改天吧</b>: để hôm khác.</li><li><b>不太方便</b>: không tiện lắm (không cần giải thích).</li><li><b>心领了</b>: xin nhận tấm lòng.</li><li><b>下次一定</b>: \"lần sau nhất định\", trên mạng thường là câu đùa, nghĩa là không.</li></ul>" },
    ],
    check: { q: "Sếp nhắn \"明天的会改到十点\". Trả lời nào tốt nhất?", opts: ["嗯。", "好的，收到！", "哦"], a: 1, why: "好的 / 收到 lịch sự và rõ ràng. 嗯 hoặc 哦 một mình nghe hờ hững." },
  },
  {
    id: "emoji", title: "Emoji, 哈哈 và lì xì WeChat",
    sections: [
      { h: "Emoji dễ hiểu nhầm", body: "<table class='emo'><tr><td>🙂</td><td>Trên WeChat thường mang nghĩa <b>mỉa mai, khó chịu</b>. Đừng dùng để tỏ ra thân thiện!</td></tr><tr><td>👍</td><td>Người lớn tuổi dùng bình thường; với giới trẻ đôi khi nghe hơi lạnh.</td></tr><tr><td>🌹</td><td>Cô chú lớn tuổi dùng để chào, cảm ơn: rất thân thiện.</td></tr><tr><td>😂</td><td>Vẫn phổ biến, nhưng giới trẻ hay dùng 🤣 hoặc sticker 捂脸 (che mặt cười).</td></tr></table>" },
      { h: "Cười", body: "<p><b>哈哈哈哈</b>: càng nhiều càng buồn cười. Chỉ <b>哈</b> hoặc <b>呵呵</b> có thể nghe gượng, thậm chí mỉa.</p>" },
      { h: "Lì xì trong nhóm (红包)", body: "<ul><li>Sếp hoặc đồng nghiệp hay <b>发红包</b> khi có tin vui.</li><li>Giành được (<b>抢到</b>) thì nhớ cảm ơn: <i>谢谢老板！</i></li><li>WeChat không hiện \"đã xem\", nhưng trả lời chậm vẫn nên xin lỗi một câu.</li></ul>" },
    ],
    check: { q: "Bạn muốn tỏ ra thân thiện với đồng nghiệp trẻ. Nên tránh emoji nào?", opts: ["🤣", "🙂", "😆"], a: 1, why: "🙂 trên WeChat thường bị hiểu là mỉa mai hoặc khó chịu." },
  },
  {
    id: "scam", title: "Nhận diện lừa đảo (杀猪盘)",
    sections: [
      { h: "杀猪盘 là gì?", body: "<p><b>杀猪盘</b> (shāzhūpán, \"vỗ béo heo rồi làm thịt\"): kẻ lừa làm quen, tạo tình cảm vài tuần, rồi rủ <b>đầu tư crypto</b> trên một app giả. Nhiều vụ nhắm vào người gốc Á ở Mỹ.</p>" },
      { h: "Dấu hiệu cờ đỏ 🚩", body: "<ul><li>Nhắn nhầm số: <i>你好，是李总吗？</i> rồi tiếp tục làm quen.</li><li>Khen, quan tâm quá nhanh nhưng né câu hỏi cụ thể.</li><li>Khoe giàu, rủ <i>带你投资</i> (dẫn bạn đầu tư).</li><li>Rủ chuyển sang WhatsApp hoặc Telegram.</li><li>Gọi điện giả làm <b>lãnh sự quán hoặc công an</b>, đòi chuyển tiền.</li></ul>" },
      { h: "Cách phản hồi", body: "<ul><li><i>可以视频一下吗？</i> (Gọi video được không?)</li><li><i>我不谈钱的事。</i> (Tôi không nói chuyện tiền bạc.)</li><li>Không bấm link, không chuyển tiền. Chặn và báo cáo (举报).</li></ul>" },
    ],
    check: { q: "Người mới quen trên WeChat sau 2 tuần nói \"我带你投资，稳赚不赔\". Đây là?", opts: ["Cơ hội tốt", "Dấu hiệu 杀猪盘", "Chuyện bình thường"], a: 1, why: "Làm quen một thời gian rồi rủ đầu tư \"chắc chắn có lời\" là kịch bản 杀猪盘 điển hình." },
  },
];

export default {
  id: "zh",
  name: "Tiếng Trung",
  native: "中文",
  htmlLang: "zh-CN",
  aiLanguage: "Mandarin Chinese (simplified characters, WeChat style)",
  reading: { label: "Pinyin", system: "Hanyu Pinyin with tone marks" },
  typeMs: 110,
  lead: "Luyện nhắn tin tiếng Trung (WeChat) với đồng nghiệp người Hoa ở Irvine, California.",
  example: "tiếng Trung",
  group: ["wang", "xiaoyu", "leo"],
  chars: CHARACTERS,
  lex: LEX,
  scenarios: SCENARIOS,
  unnatural: UNNATURAL,
  lessons: LESSONS,
};
