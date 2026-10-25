// Gói tiếng Nhật: đồng nghiệp người Nhật ở văn phòng Torrance, California.

const CHARACTERS = {
  yui: {
    name: "Yui", native: "結衣", color: "#F472B6", age: 24,
    role: "Đồng nghiệp trẻ, mới từ Tokyo sang",
    style: "Thân mật (タメ口), hay dùng 笑, emoji và slang giới trẻ",
    persona: "Yui (結衣), 24, a young coworker who recently transferred from Tokyo to the company's office in Torrance, California. Close in age to the learner and texts them in casual タメ口. Uses 笑 and w, emojis like 🥺 😭 🙏, youth slang (ガチ, めっちゃ, 神, りょ). Loves ramen and cafés.",
  },
  tanaka: {
    name: "Tanaka", native: "田中健二", color: "#4F8CFF", age: 38,
    role: "Trưởng nhóm",
    style: "Lịch sự (です/ます), thân thiện, câu rõ ràng",
    persona: "Tanaka Kenji (田中健二), 38, the learner's team lead at a Japanese company's office in Torrance, California. Texts politely in です/ます form, friendly but professional, occasionally (笑). Has two kids who play soccer. The learner should address him as 田中さん.",
  },
  haruto: {
    name: "Haruto", native: "陽翔", color: "#FB923C", age: 29,
    role: "Đồng nghiệp cùng nhóm",
    style: "Thân mật, hay chọc ghẹo, nhắn ngắn",
    persona: "Haruto (陽翔), 29, a coworker on the same team. Texts the learner in casual タメ口, short messages, teases a lot, organizes team drinks (飲み会).",
  },
  yamamoto: {
    name: "Yamamoto", native: "山本", color: "#818CF8", age: 60,
    role: "Giám đốc chi nhánh",
    style: "Kính ngữ, câu đầy đủ, dùng dấu 。",
    persona: "Yamamoto (山本), 60, the branch director sent from Japan HQ. Writes complete, very polite sentences with keigo and 。, rarely uses emoji. Kind but formal.",
  },
};

// [từ, nhóm, nghĩa, ví dụ, độ trang trọng, người dùng, cách đọc]
const LEX = [
  ["りょ", "abbr", "ok, hiểu rồi (rút gọn của 了解)", "りょ！あとでね", 1, "z", "ryo"],
  ["あざす", "abbr", "cảm ơn (rút gọn của ありがとうございます), kiểu thân", "あざす！助かった", 1, "z", "azasu"],
  ["おつ", "abbr", "vất vả rồi (rút gọn của お疲れ), chỉ với bạn thân", "今日もおつ〜", 1, "z", "otsu"],
  ["笑", "abbr", "cười, viết sau câu như \"haha\"", "それはない笑", 2, "a", "warai"],
  ["w", "abbr", "cười (từ 笑う warau). Càng nhiều w càng buồn cười", "まじかwww", 1, "z", "w"],
  ["了解", "phrase", "ok, đã hiểu. Với cấp trên nên dùng 承知しました", "了解です！", 2, "a", "ryōkai"],
  ["承知しました", "phrase", "tôi đã hiểu (lịch sự, dùng với cấp trên, khách hàng)", "承知しました。対応します", 3, "a", "shōchi shimashita"],
  ["お疲れ様です", "phrase", "câu chào ở công sở: \"anh/chị vất vả rồi\". Bạn thân rút gọn thành お疲れー", "お疲れ様です！今日もありがとうございました", 3, "a", "otsukaresama desu"],
  ["よろしくお願いします", "phrase", "nhờ anh/chị giúp đỡ, mong hợp tác (dùng rất nhiều ở công sở)", "明日の件、よろしくお願いします", 3, "a", "yoroshiku onegai shimasu"],
  ["ところで", "phrase", "à nhân tiện (chuyển chủ đề)", "ところで、来週空いてる？", 3, "a", "tokoro de"],
  ["飲み会", "phrase", "buổi đi uống cùng đồng nghiệp sau giờ làm", "金曜は飲み会です", 3, "a", "nomikai"],
  ["めっちゃ", "slang", "rất, cực kỳ (gốc vùng Kansai, giới trẻ dùng khắp nơi)", "めっちゃおいしい！", 1, "y", "meccha"],
  ["ガチ", "slang", "thật sự, nghiêm túc luôn", "ガチで眠い", 1, "z", "gachi"],
  ["神", "slang", "đỉnh, \"thần thánh\" (khen ai hay cái gì quá tuyệt)", "この店、神！", 1, "z", "kami"],
  ["ヤバい", "slang", "kinh khủng: khen hoặc chê tùy ngữ cảnh", "このラーメンやばい", 1, "y", "yabai"],
  ["草", "slang", "cười (chữ \"cỏ\", vì www trông giống cỏ)", "それは草", 1, "z", "kusa"],
  ["ぴえん", "slang", "mếu máo, tủi thân nhẹ (hay đi với 🥺)", "雨で中止…ぴえん", 1, "z", "pien"],
  ["既読スルー", "slang", "đã đọc mà không trả lời (LINE hiện chữ 既読 khi đã xem)", "既読スルーしないで〜", 1, "y", "kidoku surū"],
  ["マジ", "react", "thật á? thật luôn", "マジで？", 1, "y", "maji"],
  ["いいね", "react", "hay đó, được đó", "いいね！行こう", 2, "a", "ii ne"],
  ["えー", "react", "ơ, hả (ngạc nhiên, tiếc, nũng nịu)", "えー、残念", 2, "a", "ē"],
  ["さすが", "react", "đúng là… (khen: giỏi đúng như mong đợi)", "さすが田中さん！", 3, "a", "sasuga"],
  ["それな", "react", "đúng vậy, chuẩn luôn", "— 月曜つらい — それな", 1, "z", "sore na"],
  ["なるほど", "react", "ra vậy, hiểu rồi (với cấp trên nên nói なるほどですね hoặc そうなんですね)", "なるほど、勉強になります", 2, "a", "naruhodo"],
  ["どの口が言う", "banter", "nói câu đó mà không ngượng à (giống \"says you\")", "— 私、時間守るタイプ — どの口が言う笑", 1, "y", "dono kuchi ga iu"],
  ["負けないよ", "banter", "mình không thua đâu", "次のゲーム、負けないよ😤", 2, "a", "makenai yo"],
  ["調子乗んな", "banter", "đừng có mà vênh (chọc vui, chỉ với bạn thân)", "一回勝っただけで調子乗んな笑", 1, "y", "chōshi nonna"],
  ["はいはい", "banter", "rồi rồi (nghe cho có, tỉnh bơ)", "はいはい、すごいすごい", 1, "a", "hai hai"],
  ["ちょっと…", "decline", "\"hơi…\" rồi bỏ lửng: cách từ chối rất Nhật, không cần nói \"không\"", "その日はちょっと…", 3, "a", "chotto…"],
  ["また今度", "decline", "để lần sau nhé", "また今度誘って！", 2, "a", "mata kondo"],
  ["行けたら行く", "decline", "\"đi được thì đi\": thường nghĩa là sẽ không đi", "— 来る？ — 行けたら行く", 2, "a", "iketara iku"],
  ["せっかくですが", "decline", "rất tiếc dù anh/chị đã có lòng (mở đầu lời từ chối lịch sự)", "せっかくですが、今回は遠慮します", 3, "a", "sekkaku desu ga"],
  ["🙏", "emoji", "xin lỗi / nhờ vả / cảm ơn", "ごめん🙏", 2, "a", ""],
  ["🥺", "emoji", "mắt long lanh: năn nỉ, tủi thân (đi với ぴえん)", "行きたい🥺", 1, "z", ""],
  ["💦", "emoji", "giọt mồ hôi: bối rối, ngại, xin lỗi nhẹ", "遅れてすみません💦", 2, "a", ""],
];

const SCENARIOS = [
  {
    id: "plans", title: "Rủ đi ăn sau giờ làm", en: "Making plans: ramen after work", chars: ["yui"],
    desc: "Yui rủ bạn đi ăn ramen sau giờ làm.",
    turns: [
      {
        msgs: [
          { from: "yui", t: "お疲れー！", r: "otsukarē!", vi: "Vất vả rồi! (lời chào cuối ngày kiểu thân)", tone: "friendly", s: ["お疲れ様です"] },
          { from: "yui", t: "今日仕事終わったらラーメン行かない？めっちゃお腹すいた🥺", r: "kyō shigoto owattara rāmen ikanai? meccha onaka suita", vi: "Hôm nay làm xong đi ăn ramen không? Đói bụng quá trời 🥺", tone: "friendly", s: ["めっちゃ", "🥺"] },
        ],
        replies: [
          { en: "いいね！行こう！どこにする？", r: "ii ne! ikō! doko ni suru?", vi: "Hay đó! Đi thôi! Đi chỗ nào?", s: ["いいね"] },
          { en: "行く行く！私もお腹ぺこぺこ笑", r: "iku iku! watashi mo onaka pekopeko (warai)", vi: "Đi đi! Mình cũng đói meo luôn haha", s: ["笑"] },
          { en: "ラーメンって聞いたら断れないじゃん笑", r: "rāmen tte kiitara kotowarenai jan (warai)", vi: "Nghe tới ramen thì sao mà từ chối được haha", s: ["笑"] },
        ],
      },
      {
        msgs: [
          { from: "yui", t: "やった！", r: "yatta!", vi: "Yay!", tone: "friendly" },
          { from: "yui", t: "ソーテルの新しいお店、ガチでおいしいらしいよ", r: "Sōteru no atarashii omise, gachi de oishii rashii yo", vi: "Nghe nói quán mới ở Sawtelle ngon thật sự luôn đó", tone: "friendly", s: ["ガチ"] },
        ],
        replies: [
          { en: "いいね！何時に出る？", r: "ii ne! nanji ni deru?", vi: "Hay đó! Mấy giờ đi?", s: ["いいね"] },
          { en: "マジ？楽しみ！何系のラーメン？", r: "maji? tanoshimi! nani-kei no rāmen?", vi: "Thật hả? Háo hức ghê! Ramen kiểu gì vậy?", s: ["マジ"] },
          { en: "ガチなら行くしかない🔥", r: "gachi nara iku shika nai", vi: "Ngon thật thì phải đi thôi 🔥", s: ["ガチ"] },
        ],
      },
      {
        msgs: [
          { from: "yui", t: "とんこつだって！6時半に駐車場集合でいい？", r: "tonkotsu datte! roku-ji han ni chūshajō shūgō de ii?", vi: "Nghe nói là ramen xương heo! 6 rưỡi tập trung ở bãi đậu xe được không?", tone: "friendly" },
          { from: "yui", t: "車出すよー", r: "kuruma dasu yō", vi: "Mình lái xe cho nha", tone: "friendly" },
        ],
        replies: [
          { en: "了解！ありがとう！", r: "ryōkai! arigatō!", vi: "Ok! Cảm ơn nha!", s: ["了解"] },
          { en: "りょ！助かる〜", r: "ryo! tasukaru~", vi: "Ok! Đỡ quá~", s: ["りょ"] },
          { en: "神！じゃあデザートは私がおごるね", r: "kami! jā dezāto wa watashi ga ogoru ne", vi: "Đỉnh! Vậy món tráng miệng mình bao nha", s: ["神"] },
        ],
      },
    ],
  },
  {
    id: "smalltalk", title: "Nói chuyện với trưởng nhóm", en: "Small talk with the team lead", chars: ["tanaka"],
    desc: "Sáng thứ Hai, anh Tanaka hỏi thăm cuối tuần và nhờ việc.",
    turns: [
      {
        msgs: [
          { from: "tanaka", t: "おはようございます。週末はどうでしたか？", r: "ohayō gozaimasu. shūmatsu wa dō deshita ka?", vi: "Chào buổi sáng. Cuối tuần của bạn thế nào?", tone: "friendly" },
          { from: "tanaka", t: "僕は子供のサッカーの試合で一日終わりました(笑)", r: "boku wa kodomo no sakkā no shiai de ichinichi owarimashita (warai)", vi: "Tôi thì cả ngày đi xem con đá bóng (cười)", tone: "friendly", s: ["笑"] },
        ],
        replies: [
          { en: "おはようございます！ゆっくりできました。試合どうでしたか？", r: "ohayō gozaimasu! yukkuri dekimashita. shiai dō deshita ka?", vi: "Chào buổi sáng! Em được nghỉ ngơi thoải mái. Trận đấu thế nào ạ?" },
          { en: "おはようございます！ビーチに行ってきました。サッカー、勝ちましたか？", r: "ohayō gozaimasu! bīchi ni itte kimashita. sakkā, kachimashita ka?", vi: "Chào buổi sáng! Em đi biển về. Đội bóng thắng không ạ?" },
          { en: "お疲れ様です笑 週末なのに大変でしたね！", r: "otsukaresama desu (warai) shūmatsu na noni taihen deshita ne!", vi: "Anh vất vả rồi haha. Cuối tuần mà cũng bận ghê!", s: ["お疲れ様です", "笑"] },
        ],
      },
      {
        msgs: [
          { from: "tanaka", t: "2対1で勝ちました！", r: "ni tai ichi de kachimashita!", vi: "Thắng 2-1!", tone: "friendly" },
          { from: "tanaka", t: "ところで、木曜の会議の資料、水曜までにもらえますか？", r: "tokoro de, mokuyō no kaigi no shiryō, suiyō made ni moraemasu ka?", vi: "À nhân tiện, tài liệu cho cuộc họp thứ Năm, gửi tôi trước thứ Tư được không?", tone: "serious", s: ["ところで"] },
        ],
        replies: [
          { en: "はい、承知しました。", r: "hai, shōchi shimashita.", vi: "Vâng, em hiểu rồi ạ.", s: ["承知しました"] },
          { en: "おめでとうございます！資料は水曜の午前中に送りますね。", r: "omedetō gozaimasu! shiryō wa suiyō no gozenchū ni okurimasu ne.", vi: "Chúc mừng anh! Tài liệu em gửi trong sáng thứ Tư nhé." },
          { en: "さすがです！資料、了解です。火曜に一度見てもらえますか？", r: "sasuga desu! shiryō, ryōkai desu. kayō ni ichido mite moraemasu ka?", vi: "Đỉnh quá ạ! Tài liệu thì em ok. Thứ Ba anh xem qua một lần được không?", s: ["さすが", "了解"] },
        ],
      },
      {
        msgs: [
          { from: "tanaka", t: "ありがとうございます、助かります。", r: "arigatō gozaimasu, tasukarimasu.", vi: "Cảm ơn, giúp tôi nhiều lắm.", tone: "friendly" },
          { from: "tanaka", t: "今日も一日よろしくお願いします！", r: "kyō mo ichinichi yoroshiku onegai shimasu!", vi: "Hôm nay cũng mong mọi việc suôn sẻ, nhờ cả vào bạn nhé! (câu chào làm việc quen thuộc)", tone: "friendly", s: ["よろしくお願いします"] },
        ],
        replies: [
          { en: "こちらこそ、よろしくお願いします！", r: "kochira koso, yoroshiku onegai shimasu!", vi: "Em cũng vậy, mong anh giúp đỡ ạ!", s: ["よろしくお願いします"] },
          { en: "はい、よろしくお願いします！", r: "hai, yoroshiku onegai shimasu!", vi: "Vâng, nhờ anh giúp đỡ ạ!", s: ["よろしくお願いします"] },
          { en: "よろしくお願いします！お昼にまた試合の話聞かせてください😊", r: "yoroshiku onegai shimasu! ohiru ni mata shiai no hanashi kikasete kudasai", vi: "Nhờ anh giúp đỡ ạ! Trưa nay kể em nghe thêm về trận đấu nhé 😊", s: ["よろしくお願いします"] },
        ],
      },
    ],
  },
  {
    id: "decline", title: "Từ chối buổi nhậu", en: "Declining team drinks (nomikai)", chars: ["haruto"],
    desc: "Haruto rủ đi 飲み会 thứ Sáu. Tập từ chối kiểu Nhật.",
    turns: [
      {
        msgs: [
          { from: "haruto", t: "金曜、チームで飲み会やるんだけど来れる？🍻", r: "kin'yō, chīmu de nomikai yaru n da kedo koreru?", vi: "Thứ Sáu team có buổi đi uống, bạn tới được không? 🍻", tone: "friendly", s: ["飲み会"] },
          { from: "haruto", t: "山本さんも来るって", r: "Yamamoto-san mo kuru tte", vi: "Nghe nói ông Yamamoto cũng tới đó", tone: "pushy" },
        ],
        replies: [
          { en: "誘ってくれてありがとう！でも金曜はちょっと…", r: "sasotte kurete arigatō! demo kin'yō wa chotto…", vi: "Cảm ơn đã rủ! Nhưng thứ Sáu thì hơi…", s: ["ちょっと…"] },
          { en: "行きたいんだけど、その日は先約があって🙏", r: "ikitai n da kedo, sono hi wa sen'yaku ga atte", vi: "Mình muốn đi lắm, mà hôm đó có hẹn trước rồi 🙏", s: ["🙏"] },
          { en: "うわー行きたい！けど金曜は無理そう😭 また今度誘って！", r: "uwā ikitai! kedo kin'yō wa muri sō. mata kondo sasotte!", vi: "Trời ơi muốn đi ghê! Mà thứ Sáu chắc không được 😭 Lần sau rủ nữa nha!", s: ["また今度"] },
        ],
      },
      {
        msgs: [
          { from: "haruto", t: "えー、一杯だけでも！", r: "ē, ippai dake demo!", vi: "Ơ, một ly thôi cũng được mà!", tone: "pushy", s: ["えー"] },
          { from: "haruto", t: "最初の30分だけとか、どう？", r: "saisho no sanjuppun dake toka, dō?", vi: "Chỉ 30 phút đầu thôi thì sao?", tone: "pushy" },
        ],
        replies: [
          { en: "ごめん、今回は本当に厳しいんだ。", r: "gomen, konkai wa hontō ni kibishii n da.", vi: "Xin lỗi, lần này thật sự khó lắm." },
          { en: "気持ちはうれしいけど、また今度ね！", r: "kimochi wa ureshii kedo, mata kondo ne!", vi: "Mình vui vì bạn rủ, nhưng để lần sau nha!", s: ["また今度"] },
          { en: "行けたら行く…って言ったら来ないやつだよね笑 正直、今回はパス！", r: "iketara iku… tte ittara konai yatsu da yo ne (warai). shōjiki, konkai wa pasu!", vi: "Nói \"đi được thì đi\" là kiểu không đi rồi haha. Nói thật là lần này mình xin kiếu!", s: ["行けたら行く", "笑"] },
        ],
      },
      {
        msgs: [
          { from: "haruto", t: "そっか、了解！", r: "sokka, ryōkai!", vi: "Vậy à, ok!", tone: "friendly", s: ["了解"] },
          { from: "haruto", t: "山本さんには言っとくね。次は絶対来てよ笑", r: "Yamamoto-san ni wa ittoku ne. tsugi wa zettai kite yo (warai)", vi: "Mình sẽ nói với ông Yamamoto. Lần sau nhất định phải tới đó haha", tone: "teasing", s: ["笑"] },
        ],
        replies: [
          { en: "ありがとう！次は絶対行く！", r: "arigatō! tsugi wa zettai iku!", vi: "Cảm ơn nha! Lần sau nhất định đi!" },
          { en: "助かる🙏 楽しんできてね！", r: "tasukaru. tanoshinde kite ne!", vi: "Đỡ quá 🙏 Đi vui nha!", s: ["🙏"] },
          { en: "了解！写真送ってね笑", r: "ryōkai! shashin okutte ne (warai)", vi: "Ok! Gửi hình cho mình nha haha", s: ["了解", "笑"] },
        ],
      },
    ],
  },
  {
    id: "group", title: "Nhóm LINE của team", en: "Team group chat: beach BBQ", chars: ["tanaka", "yui", "haruto"], group: "チームLINE",
    desc: "Cả team lên kế hoạch BBQ ở bãi biển Redondo.",
    turns: [
      {
        msgs: [
          { from: "tanaka", t: "今週の土曜、レドンドビーチでBBQしませんか？", r: "konshū no doyō, Redondo bīchi de bābekyū shimasen ka?", vi: "Thứ Bảy tuần này, mọi người đi BBQ ở bãi biển Redondo không?", tone: "friendly" },
          { from: "yui", t: "行きたいです！！", r: "ikitai desu!!", vi: "Em muốn đi!! (Yui nói lịch sự vì có trưởng nhóm trong nhóm)", tone: "friendly" },
          { from: "haruto", t: "行く行く〜🍖", r: "iku iku~", vi: "Đi đi~ 🍖", tone: "friendly" },
        ],
        replies: [
          { en: "私も行きたいです！何か持っていきましょうか？", r: "watashi mo ikitai desu! nanika motte ikimashō ka?", vi: "Em cũng muốn đi! Em mang gì đi ạ?" },
          { en: "参加します！何時集合ですか？", r: "sanka shimasu! nanji shūgō desu ka?", vi: "Em tham gia! Mấy giờ tập trung ạ?" },
          { en: "BBQと聞いて飛んできました笑 ぜひ！", r: "bābekyū to kiite tonde kimashita (warai) zehi!", vi: "Nghe BBQ là em bay tới liền haha. Nhất định rồi!", s: ["笑"] },
        ],
      },
      {
        msgs: [
          { from: "tanaka", t: "ありがとうございます！11時集合でお願いします", r: "arigatō gozaimasu! jūichi-ji shūgō de onegai shimasu", vi: "Cảm ơn mọi người! Tập trung lúc 11 giờ nhé.", tone: "friendly" },
          { from: "haruto", t: "肉は任せて！誰か飲み物お願い〜", r: "niku wa makasete! dareka nomimono onegai~", vi: "Thịt để mình lo! Ai lo đồ uống giùm nha~", tone: "friendly" },
          { from: "yui", t: "じゃあ私はおにぎり作ります🍙", r: "jā watashi wa onigiri tsukurimasu", vi: "Vậy em làm cơm nắm 🍙", tone: "friendly" },
        ],
        replies: [
          { en: "じゃあ飲み物は私が持っていきます！", r: "jā nomimono wa watashi ga motte ikimasu!", vi: "Vậy đồ uống để em mang!" },
          { en: "飲み物、了解です！ベトナムコーヒーも持っていきますね☕", r: "nomimono, ryōkai desu! Betonamu kōhī mo motte ikimasu ne", vi: "Đồ uống em lo nhé! Em mang thêm cà phê Việt Nam ☕", s: ["了解"] },
          { en: "飲み物係やります！ついでに春巻きも作ろうかな😋", r: "nomimono-gakari yarimasu! tsuide ni harumaki mo tsukurō ka na", vi: "Em lo đồ uống! Tiện em làm thêm chả giò luôn 😋" },
        ],
      },
      {
        msgs: [
          { from: "yui", t: "楽しみすぎる〜！", r: "tanoshimi sugiru~!", vi: "Háo hức quá đi~!", tone: "friendly" },
          { from: "haruto", t: "雨降らないといいけどね☀️", r: "ame furanai to ii kedo ne", vi: "Mong là trời không mưa ☀️", tone: "friendly" },
          { from: "tanaka", t: "では土曜日、よろしくお願いします！", r: "dewa doyōbi, yoroshiku onegai shimasu!", vi: "Vậy thứ Bảy nhé, mong mọi người!", tone: "friendly", s: ["よろしくお願いします"] },
        ],
        replies: [
          { en: "よろしくお願いします！楽しみです！", r: "yoroshiku onegai shimasu! tanoshimi desu!", vi: "Mong mọi người! Em háo hức lắm!", s: ["よろしくお願いします"] },
          { en: "カリフォルニアだから大丈夫ですよ笑", r: "Kariforunia da kara daijōbu desu yo (warai)", vi: "California mà, chắc không sao đâu ạ haha", s: ["笑"] },
          { en: "よろしくお願いします！日焼け止め忘れずに〜☀️", r: "yoroshiku onegai shimasu! hiyakedome wasurezu ni~", vi: "Mong mọi người! Đừng quên kem chống nắng nha~ ☀️", s: ["よろしくお願いします"] },
        ],
      },
    ],
  },
  {
    id: "followup", title: "Trả lời sau khi im lặng", en: "Following up after no reply", chars: ["yui"],
    desc: "Bạn quên trả lời Yui 2 ngày. Giờ cô ấy nhắn lại.",
    history: [
      { from: "yui", t: "週末、映画行かない？🍿", r: "shūmatsu, eiga ikanai?", vi: "Cuối tuần đi xem phim không? 🍿", tone: "friendly", stamp: "2 ngày trước · 既読 (Đã đọc)" },
    ],
    turns: [
      {
        msgs: [
          { from: "yui", t: "おーい、生きてる？笑", r: "ōi, ikiteru? (warai)", vi: "Ê ơi, còn sống không đó? haha", tone: "teasing", s: ["笑"] },
          { from: "yui", t: "既読スルーされた〜🥺", r: "kidoku surū sareta~", vi: "Bị đọc rồi bơ luôn~ 🥺", tone: "teasing", s: ["既読スルー", "🥺"] },
        ],
        replies: [
          { en: "ごめん！返信遅くなっちゃった🙏", r: "gomen! henshin osoku nacchatta", vi: "Xin lỗi! Mình trả lời trễ mất rồi 🙏", s: ["🙏"] },
          { en: "ごめんごめん、仕事バタバタしてて忘れてた💦", r: "gomen gomen, shigoto batabata shitete wasureteta", vi: "Xin lỗi nha, công việc bận tối mắt nên quên mất 💦", s: ["💦"] },
          { en: "生きてる生きてる笑 既読スルーしてごめん！", r: "ikiteru ikiteru (warai) kidoku surū shite gomen!", vi: "Còn sống còn sống haha. Xin lỗi vì đọc rồi không trả lời!", s: ["笑", "既読スルー"] },
        ],
      },
      {
        msgs: [
          { from: "yui", t: "全然大丈夫！", r: "zenzen daijōbu!", vi: "Không sao đâu!", tone: "friendly" },
          { from: "yui", t: "で、映画どうする？土曜の夜とか", r: "de, eiga dō suru? doyō no yoru toka", vi: "Vậy phim thì sao? Tối thứ Bảy chẳng hạn?", tone: "pushy" },
        ],
        replies: [
          { en: "行きたい！土曜の夜で大丈夫！", r: "ikitai! doyō no yoru de daijōbu!", vi: "Muốn đi! Tối thứ Bảy được!" },
          { en: "いいね！何時からにする？", r: "ii ne! nanji kara ni suru?", vi: "Hay đó! Mấy giờ bắt đầu?", s: ["いいね"] },
          { en: "行く！お詫びにポップコーンおごる🍿", r: "iku! owabi ni poppukōn ogoru", vi: "Đi! Để chuộc lỗi mình bao bắp rang 🍿" },
        ],
      },
      {
        msgs: [
          { from: "yui", t: "やったー！じゃあ7時にトーランスの映画館ね", r: "yattā! jā shichi-ji ni Tōransu no eigakan ne", vi: "Yay! Vậy 7 giờ ở rạp phim Torrance nha", tone: "friendly" },
          { from: "yui", t: "今度は既読スルーしないでよ〜笑", r: "kondo wa kidoku surū shinaide yo~ (warai)", vi: "Lần này đừng đọc rồi bơ nữa nha~ haha", tone: "teasing", s: ["既読スルー", "笑"] },
        ],
        replies: [
          { en: "了解！7時ね！", r: "ryōkai! shichi-ji ne!", vi: "Ok! 7 giờ nhé!", s: ["了解"] },
          { en: "りょ！もうしません笑", r: "ryo! mō shimasen (warai)", vi: "Ok! Không dám nữa đâu haha", s: ["りょ", "笑"] },
          { en: "それは約束できないかも😏 うそうそ、楽しみ！", r: "sore wa yakusoku dekinai kamo. uso uso, tanoshimi!", vi: "Cái đó chắc không hứa được 😏 Đùa thôi, háo hức lắm!" },
        ],
      },
    ],
  },
];

const UNNATURAL = [
  { en: "こんにちは。私は元気です。ありがとう。", why: "Giống sách giáo khoa, không ai nhắn tin như vậy." },
  { en: "はい。", why: "Quá cụt, làm câu chuyện dừng lại." },
  { en: "行きません。", why: "Từ chối thẳng thừng, người Nhật nghe rất gắt. Thử \"ちょっと…\" hoặc \"また今度\"." },
  { en: "あなたは何をしていますか？", why: "Gọi \"あなた\" nghe xa cách và lạ. Người Nhật thường bỏ chủ ngữ hoặc gọi tên + さん." },
  { en: "私はあなたの意見に同意します。", why: "Như dịch máy, quá cứng. Thử \"それな！\" hoặc \"たしかに！\"." },
  { en: "それはとても美味しい食べ物です。", why: "Đúng ngữ pháp nhưng cứng như văn viết." },
];

const LESSONS = [
  {
    id: "raa", title: "React → Add → Ask bằng tiếng Nhật",
    sections: [
      { h: "Ý chính", body: "<p>Công thức vẫn giống tiếng Anh: <b>phản ứng</b>, <b>thêm thông tin của mình</b>, rồi <b>hỏi lại</b>. Người Nhật rất coi trọng phần phản ứng, gọi là 相槌 (aizuchi): <i>えー、へー、なるほど、いいですね</i>.</p>" },
      { h: "Ví dụ", body: "<div class='ex'><div class='them'>週末、ヨセミテに行ってきました！</div><div class='bad'>❌ そうですか。</div><div class='good'>✅ <b>えー、いいですね！</b> <span class='tag'>React</span> 私もずっと行きたかったんです。 <span class='tag'>Add</span> 何泊したんですか？ <span class='tag'>Ask</span></div></div><p>\"そうですか。\" một mình nghe như không quan tâm.</p>" },
      { h: "Mẹo", body: "<ul><li>Câu hỏi ngắn kiểu wbu: <i>〇〇さんは？</i> (còn anh/chị thì sao?)</li><li>Với bạn thân: <i>え、まじ？いいな〜！どうだった？</i></li></ul>" },
    ],
    check: { q: "Đồng nghiệp nhắn \"新しい車買いました！\" (Tôi mới mua xe). Câu nào đủ React → Add → Ask?", opts: ["そうですか。", "えー、すごい！私も車探してるんです。何の車ですか？", "車は高いです。"], a: 1, why: "Có React (えー、すごい！), Add (私も車探してるんです) và Ask (何の車ですか？)." },
  },
  {
    id: "polite", title: "Lịch sự hay thân mật: です/ます và タメ口",
    sections: [
      { h: "Khi nào dùng です/ます", body: "<ul><li>Cấp trên, người lớn tuổi hơn, người mới quen: luôn dùng <b>です/ます</b>.</li><li>Đồng nghiệp cùng tuổi đã thân: có thể dùng <b>タメ口</b> (thể thường).</li><li>Mẹo: chờ người kia chuyển sang タメ口 trước, hoặc hỏi <i>タメ口でいい？</i></li><li>Trong nhóm chat có cấp trên, cả nhóm thường nói lịch sự.</li></ul>" },
      { h: "Gọi tên", body: "<p>Gọi bằng <b>họ + さん</b>: <i>田中さん</i>. Đừng dùng <i>あなた</i>: nghe xa cách, thậm chí như vợ gọi chồng. Với cấp trên, nói <i>承知しました</i> thay vì <i>了解しました</i>.</p><p>Tin nhắn công việc hay mở đầu bằng <i>お疲れ様です</i> và kết thúc bằng <i>よろしくお願いします</i>.</p>" },
      { h: "Từ chối khéo", body: "<p>Người Nhật hiếm khi nói thẳng \"không\". Họ dùng:</p><ul><li><b>ちょっと…</b>: bỏ lửng là người kia hiểu.</li><li><b>せっかくですが</b>: rất tiếc dù anh/chị đã có lòng.</li><li><b>また今度</b>: để lần sau.</li><li><b>行けたら行く</b>: \"đi được thì đi\", thường có nghĩa là không đi.</li></ul><div class='ex'><div class='them'>金曜、飲み会来れる？</div><div class='bad'>❌ 行きません。</div><div class='good'>✅ 誘ってくれてありがとう！でも金曜はちょっと…</div></div>" },
    ],
    check: { q: "Trưởng nhóm nhắn \"明日の会議、10時からに変更です\". Trả lời nào phù hợp nhất?", opts: ["りょ！", "承知しました！ありがとうございます。", "了解〜"], a: 1, why: "Với cấp trên dùng 承知しました và nói lịch sự. りょ và 了解〜 chỉ dùng với bạn bè." },
  },
  {
    id: "emoji", title: "笑, w, emoji và 既読",
    sections: [
      { h: "Cười kiểu Nhật", body: "<table class='emo'><tr><td>笑</td><td>Cười nhẹ, ai cũng dùng được, kể cả với cấp trên thân thiện: <i>大変でした笑</i></td></tr><tr><td>w</td><td>Giới trẻ, càng nhiều càng buồn cười: <i>まじかwww</i></td></tr><tr><td>草</td><td>Slang mạng, \"cười\": <i>それは草</i>. Chỉ với bạn thân.</td></tr><tr><td>(^^)</td><td>Kaomoji: mặt cười bằng ký tự, người lớn tuổi hay dùng.</td></tr></table>" },
      { h: "Emoji hay gặp", body: "<ul><li><b>🙏</b>: xin lỗi, nhờ vả, cảm ơn.</li><li><b>💦</b>: bối rối, ngại, kèm lời xin lỗi: <i>遅れてすみません💦</i></li><li><b>🥺</b>: năn nỉ, tủi thân (giới trẻ, đi với <i>ぴえん</i>).</li><li>Trên LINE người Nhật dùng rất nhiều <b>sticker (スタンプ)</b> thay cho lời.</li></ul>" },
      { h: "既読 và 既読スルー", body: "<p>LINE hiện chữ <b>既読</b> khi người kia đã đọc. Đọc mà không trả lời gọi là <b>既読スルー</b> và có thể làm người kia buồn. Nếu chưa trả lời được, gửi một câu ngắn hoặc một sticker: <i>あとで返すね！</i></p>" },
    ],
    check: { q: "Bạn đọc tin của đồng nghiệp nhưng chưa trả lời được ngay. Nên làm gì?", opts: ["Để đó, mai trả lời", "Gửi ngắn: \"ごめん、あとで返すね！🙏\"", "Gửi \"はい。\""], a: 1, why: "Một câu ngắn báo sẽ trả lời sau giúp tránh bị coi là 既読スルー." },
  },
  {
    id: "scam", title: "Nhận diện lừa đảo qua LINE",
    sections: [
      { h: "Dấu hiệu cờ đỏ 🚩", body: "<ul><li><b>Nhắn nhầm số</b>: <i>田中さんですか？</i> rồi tiếp tục làm quen dù bạn nói nhầm người.</li><li><b>Khen và thân quá nhanh</b>, nhưng né khi bạn hỏi cụ thể.</li><li><b>Nói tới đầu tư (投資)</b>, crypto, \"kiếm tiền dễ\".</li><li><b>Rủ chuyển app</b> sang LINE hoặc Telegram rất sớm.</li><li>Không chịu gọi video.</li></ul>" },
      { h: "Ví dụ", body: "<div class='ex'><div class='them'>すみません、佐藤さんですか？</div><div class='me'>いいえ、違います</div><div class='them'>失礼しました！でもこれも縁ですね😊 お友達になりませんか？ 🚩</div><div class='them'>私は投資で成功しています。教えてあげます 🚩</div></div>" },
      { h: "Cách phản hồi", body: "<ul><li><i>ビデオ通話できますか？</i> (Gọi video được không?)</li><li><i>お金の話はしません。</i> (Tôi không nói chuyện tiền bạc.)</li><li>Không bấm link, không chuyển tiền. Chặn và báo cáo (ブロック・通報).</li></ul>" },
    ],
    check: { q: "Người lạ nhắn nhầm số rồi rủ kết bạn và nói về 投資. Bạn nên?", opts: ["Kết bạn cho vui", "Không trả lời, chặn và báo cáo", "Gửi tiền thử một ít"], a: 1, why: "Nhắn nhầm số + làm quen + đầu tư là kịch bản lừa đảo rất phổ biến." },
  },
];

export default {
  id: "ja",
  name: "Tiếng Nhật",
  native: "日本語",
  htmlLang: "ja",
  aiLanguage: "Japanese",
  reading: { label: "Romaji", system: "Hepburn romaji" },
  typeMs: 110,
  lead: "Luyện nhắn tin tiếng Nhật với đồng nghiệp người Nhật ở văn phòng Torrance, California.",
  example: "tiếng Nhật",
  group: ["tanaka", "yui", "haruto"],
  chars: CHARACTERS,
  lex: LEX,
  scenarios: SCENARIOS,
  unnatural: UNNATURAL,
  lessons: LESSONS,
};
