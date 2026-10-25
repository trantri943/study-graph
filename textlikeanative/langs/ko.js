// Gói tiếng Hàn: đồng nghiệp người Hàn ở văn phòng Irvine, California, nhắn qua KakaoTalk.

const CHARACTERS = {
  jiwoo: {
    name: "Jiwoo", native: "지우", color: "#F472B6", age: 25,
    role: "Đồng nghiệp cùng tuổi",
    style: "Thân mật (반말), nhiều ㅋㅋ, ㅠㅠ, viết tắt",
    persona: "Jiwoo (지우), 25, a coworker the same age as the learner at a Korean company's office in Irvine, California. They agreed to speak casually, so she texts in 반말 with lots of ㅋㅋ, ㅠㅠ, consonant abbreviations (ㅇㅋ, ㄱㄱ), and slang (대박, 헐, 맛집). Loves K-BBQ and 치맥 in Koreatown.",
  },
  minho: {
    name: "Minho", native: "이민호", color: "#4F8CFF", age: 41,
    role: "Trưởng nhóm (팀장님)",
    style: "Lịch sự (해요체), ngắn gọn, hay dùng ^^",
    persona: "Lee Minho (이민호), 41, the learner's team lead (팀장님). Texts politely in 해요체, short and kind, often ends with ^^. Has two young kids. The learner addresses him as 팀장님.",
  },
  junho: {
    name: "Junho", native: "준호", color: "#FB923C", age: 31,
    role: "Đồng nghiệp đàn anh",
    style: "Nửa thân mật (해요체), hay chọc ghẹo, ㅋㅋ",
    persona: "Junho (준호), 31, a slightly senior coworker. Uses polite 해요체 with the learner but jokes and teases a lot with ㅋㅋ.",
  },
  park: {
    name: "Park", native: "박", color: "#818CF8", age: 57,
    role: "Giám đốc (이사님)",
    style: "Kính ngữ trang trọng (하십시오체), câu đầy đủ",
    persona: "Director Park (박 이사님), 57. Writes formal Korean (하십시오체 / polite 해요체), full sentences, occasionally ^^. Organizes company dinners (회식). The learner addresses him as 이사님.",
  },
};

// [từ, nhóm, nghĩa, ví dụ, độ trang trọng, người dùng, cách đọc]
const LEX = [
  ["ㅋㅋ", "abbr", "cười (âm \"khư khư\"). Càng nhiều ㅋ càng buồn cười", "ㅋㅋㅋ 진짜 웃겨", 1, "a", "kk"],
  ["ㅎㅎ", "abbr", "cười nhẹ, mỉm cười (nhẹ nhàng hơn ㅋㅋ, dùng được với người lớn hơn)", "감사합니다ㅎㅎ", 2, "a", "hh"],
  ["ㅠㅠ", "abbr", "mắt khóc: buồn, tủi, xin lỗi kiểu dễ thương", "미안ㅠㅠ", 1, "a", "yu-yu"],
  ["ㅇㅇ", "abbr", "ừ ừ (chỉ dùng với bạn thân; với người lớn nghe cộc)", "ㅇㅇ 알았어", 1, "y", "eung-eung"],
  ["ㅇㅋ", "abbr", "ok", "ㅇㅋ 이따 봐", 1, "y", "o-keu"],
  ["ㄱㄱ", "abbr", "đi thôi! (고고 = go go)", "점심 ㄱㄱ?", 1, "y", "go-go"],
  ["ㅈㅅ", "abbr", "xin lỗi (죄송), chỉ với bạn thân", "늦어서 ㅈㅅ", 1, "z", "joesong"],
  ["ㄱㅅ", "abbr", "cảm ơn (감사), chỉ với bạn thân", "ㄱㅅㄱㅅ", 1, "z", "gamsa"],
  ["읽씹", "slang", "đọc rồi lơ, không trả lời (읽고 씹다)", "왜 읽씹해ㅠㅠ", 1, "y", "ilkssip"],
  ["칼답", "slang", "trả lời ngay lập tức", "칼답 감사합니다", 1, "y", "kaldap"],
  ["칼퇴", "slang", "tan làm đúng giờ, không ở lại thêm", "오늘은 칼퇴!", 1, "y", "kaltoe"],
  ["대박", "slang", "đỉnh, khủng, quá đã (cũng dùng khi ngạc nhiên)", "대박 맛있다", 1, "a", "daebak"],
  ["헐", "slang", "trời / hả? (sốc, bất ngờ)", "헐 진짜?", 1, "y", "heol"],
  ["맛집", "slang", "quán ngon nổi tiếng", "여기 완전 맛집이야", 2, "a", "matjip"],
  ["치맥", "slang", "gà rán + bia (치킨 + 맥주)", "불금엔 치맥이지", 2, "a", "chimaek"],
  ["콜", "slang", "chốt! (đồng ý ngay)", "— 치맥? — 콜!", 1, "y", "kol"],
  ["쏠게", "phrase", "mình bao, mình mời (쏘다 = bao)", "오늘은 내가 쏠게!", 2, "a", "ssolge"],
  ["진짜?", "react", "thật á?", "진짜? 대박", 2, "a", "jinjja?"],
  ["네네", "react", "vâng vâng (có thể nghe hời hợt, hoặc mỉa khi chọc)", "네네 그렇다고 해요ㅋㅋ", 2, "a", "nene"],
  ["넵", "react", "dạ! (cách nói \"vâng\" nhanh, tích cực ở công sở)", "넵 확인했습니다!", 3, "a", "nep"],
  ["알겠습니다", "phrase", "tôi hiểu rồi (lịch sự, dùng với cấp trên)", "네, 알겠습니다!", 3, "a", "algetseumnida"],
  ["고생 많으셨어요", "phrase", "anh/chị vất vả rồi (cảm ơn công sức)", "오늘 고생 많으셨어요!", 3, "a", "gosaeng maneusyeosseoyo"],
  ["화이팅", "phrase", "cố lên!", "시험 화이팅!", 2, "a", "hwaiting"],
  ["퇴근", "phrase", "tan làm", "퇴근하고 뭐 해?", 3, "a", "toegeun"],
  ["회식", "phrase", "liên hoan, đi ăn uống cùng công ty", "금요일에 회식 있어요", 3, "a", "hoesik"],
  ["1차", "phrase", "tăng 1 (quán đầu tiên của buổi liên hoan; sau đó còn 2차, 3차)", "1차만 갈게요", 2, "a", "il-cha"],
  ["팀장님", "phrase", "trưởng nhóm (gọi bằng chức danh + 님, không gọi tên trống)", "팀장님, 자료 보냈습니다", 3, "a", "timjangnim"],
  ["이사님", "phrase", "giám đốc (chức danh + 님)", "이사님, 감사합니다", 3, "a", "isanim"],
  ["두고 봐", "banter", "để rồi xem", "두고 봐, 이번엔 이긴다😤", 1, "a", "dugo bwa"],
  ["꿈 깨", "banter", "mơ đi", "— 네가 쏠 거지? — 꿈 깨", 1, "y", "kkum kkae"],
  ["너나 잘해", "banter", "lo cho bản thân đi (chỉ đùa với bạn rất thân)", "너나 잘해ㅋㅋ", 1, "y", "neona jalhae"],
  ["선약이 있어서요", "decline", "vì em có hẹn trước rồi (lý do từ chối lịch sự, quen thuộc)", "죄송한데 선약이 있어서요", 3, "a", "seonyagi isseoseoyo"],
  ["이번엔 좀 어려울 것 같아요", "decline", "lần này chắc hơi khó ạ (từ chối mềm)", "이번엔 좀 어려울 것 같아요ㅠㅠ", 3, "a", "ibeonen jom eoryeoul geot gatayo"],
  ["마음만 받을게요", "decline", "xin nhận tấm lòng thôi ạ", "마음만 감사히 받을게요", 3, "a", "maeumman badeulgeyo"],
  ["다음에 꼭", "decline", "lần sau nhất định", "다음에 꼭 같이 가요!", 3, "a", "daeume kkok"],
  ["^^", "emoji", "mắt cười: thân thiện, lịch sự (người lớn tuổi dùng nhiều)", "감사합니다^^", 2, "a", ""],
];

const SCENARIOS = [
  {
    id: "plans", title: "Rủ đi gà rán bia", en: "Making plans: chimaek after work", chars: ["jiwoo"],
    desc: "Jiwoo rủ bạn tan làm đi Koreatown ăn gà rán uống bia.",
    turns: [
      {
        msgs: [
          { from: "jiwoo", t: "퇴근하고 뭐 해?", r: "toegeunhago mwo hae?", vi: "Tan làm xong bạn làm gì?", tone: "friendly", s: ["퇴근"] },
          { from: "jiwoo", t: "코리아타운 가서 치맥 ㄱㄱ? 🍗🍺", r: "koriataun gaseo chimaek go-go?", vi: "Đi Koreatown làm gà rán bia không? 🍗🍺", tone: "friendly", s: ["치맥", "ㄱㄱ"] },
        ],
        replies: [
          { en: "좋아! 몇 시에 갈까?", r: "joa! myeot si-e galkka?", vi: "Được! Mấy giờ đi?" },
          { en: "ㅇㅋ 콜! 나 오늘 치킨 완전 땡겼어", r: "o-keu kol! na oneul chikin wanjeon ttaenggyeosseo", vi: "Ok chốt! Hôm nay mình thèm gà rán cực", s: ["ㅇㅋ", "콜"] },
          { en: "치맥은 못 참지ㅋㅋ 가자!", r: "chimaegeun mot chamji kk gaja!", vi: "Gà bia thì sao mà nhịn được haha. Đi thôi!", s: ["치맥", "ㅋㅋ"] },
        ],
      },
      {
        msgs: [
          { from: "jiwoo", t: "대박 ㅋㅋㅋ 바로 콜이네", r: "daebak kkk baro kori-ne", vi: "Đỉnh haha, chốt liền luôn", tone: "friendly", s: ["대박", "ㅋㅋ", "콜"] },
          { from: "jiwoo", t: "거기 양념치킨 진짜 맛집이야", r: "geogi yangnyeom chikin jinjja matjibiya", vi: "Gà sốt cay ở đó đúng là quán ngon luôn", tone: "friendly", s: ["맛집"] },
        ],
        replies: [
          { en: "오 기대된다! 몇 시에 만날까?", r: "o gidaedoenda! myeot si-e mannalkka?", vi: "Ồ háo hức ghê! Mấy giờ gặp?" },
          { en: "진짜? 나 양념 완전 좋아해", r: "jinjja? na yangnyeom wanjeon joahae", vi: "Thật hả? Mình cực thích gà sốt", s: ["진짜?"] },
          { en: "맛집 아니면 네가 쏘는 거다ㅋㅋ", r: "matjip animyeon nega ssoneun geoda kk", vi: "Không ngon như lời thì bạn bao đó nha haha", s: ["맛집", "ㅋㅋ"] },
        ],
      },
      {
        msgs: [
          { from: "jiwoo", t: "ㅋㅋㅋ 오키 6시 반에 주차장에서 봐", r: "kkk oki yeoseot si ban-e juchajang-eseo bwa", vi: "Haha ok, 6 rưỡi gặp ở bãi đậu xe", tone: "friendly", s: ["ㅋㅋ"] },
          { from: "jiwoo", t: "오늘 칼퇴 각이다🔥", r: "oneul kaltoe gagida", vi: "Hôm nay chắc chắn tan làm đúng giờ rồi 🔥", tone: "friendly", s: ["칼퇴"] },
        ],
        replies: [
          { en: "응, 이따 봐!", r: "eung, itta bwa!", vi: "Ừ, lát gặp!" },
          { en: "ㅇㅇ 이따 봐~ 칼퇴 화이팅!", r: "eung-eung itta bwa~ kaltoe hwaiting!", vi: "Ừ lát gặp~ Cố lên tan làm đúng giờ!", s: ["ㅇㅇ", "칼퇴", "화이팅"] },
          { en: "오늘은 내가 쏠게ㅎㅎ", r: "oneureun naega ssolge hh", vi: "Hôm nay mình bao nha hihi", s: ["쏠게", "ㅎㅎ"] },
        ],
      },
    ],
  },
  {
    id: "smalltalk", title: "Nói chuyện với trưởng nhóm", en: "Small talk with the team lead", chars: ["minho"],
    desc: "Sáng thứ Hai, trưởng nhóm Minho hỏi thăm cuối tuần và nhờ việc.",
    turns: [
      {
        msgs: [
          { from: "minho", t: "좋은 아침이에요! 주말 잘 보내셨어요?", r: "joeun achimieyo! jumal jal bonaesyeosseoyo?", vi: "Chào buổi sáng! Cuối tuần vui không?", tone: "friendly" },
          { from: "minho", t: "저는 애들이랑 동물원 다녀왔어요^^", r: "jeoneun aedeul-irang dongmurwon danyeowasseoyo", vi: "Tôi dẫn bọn nhỏ đi sở thú về ^^", tone: "friendly", s: ["^^"] },
        ],
        replies: [
          { en: "좋은 아침이에요! 네, 집에서 푹 쉬었어요. 동물원 재밌으셨어요?", r: "joeun achimieyo! ne, jibeseo puk swieosseoyo. dongmurwon jaemisseusyeosseoyo?", vi: "Chào buổi sáng ạ! Dạ, em ở nhà nghỉ ngơi thoải mái. Đi sở thú vui không ạ?" },
          { en: "안녕하세요 팀장님! 저는 바닷가 다녀왔어요. 애들이 좋아했겠네요!", r: "annyeonghaseyo timjangnim! jeoneun badatga danyeowasseoyo. aedeuri joahaetgenneyo!", vi: "Chào trưởng nhóm! Em đi biển về. Chắc bọn nhỏ thích lắm ạ!", s: ["팀장님"] },
          { en: "와 주말에도 바쁘셨네요ㅎㅎ 고생 많으셨어요!", r: "wa jumaredo bappeusyeonneyo hh gosaeng maneusyeosseoyo!", vi: "Wow cuối tuần cũng bận ghê ạ hihi. Anh vất vả rồi!", s: ["ㅎㅎ", "고생 많으셨어요"] },
        ],
      },
      {
        msgs: [
          { from: "minho", t: "ㅎㅎ 네 재밌었어요", r: "hh ne jaemisseosseoyo", vi: "Hihi vâng, vui lắm", tone: "friendly", s: ["ㅎㅎ"] },
          { from: "minho", t: "아 그리고 목요일 회의 자료 수요일까지 보내줄 수 있어요?", r: "a geurigo mogyoil hoeui jaryo suyoilkkaji bonaejul su isseoyo?", vi: "À với lại, tài liệu họp thứ Năm gửi tôi trước thứ Tư được không?", tone: "serious" },
        ],
        replies: [
          { en: "네, 알겠습니다!", r: "ne, algetseumnida!", vi: "Vâng, em hiểu rồi ạ!", s: ["알겠습니다"] },
          { en: "넵! 수요일 오전까지 보내드릴게요.", r: "nep! suyoil ojeonkkaji bonaedeurilgeyo.", vi: "Dạ! Em gửi trước sáng thứ Tư ạ.", s: ["넵"] },
          { en: "넵 팀장님! 화요일에 초안 먼저 한번 봐주실 수 있으세요?", r: "nep timjangnim! hwayoire chouan meonjeo hanbeon bwajusil su isseuseyo?", vi: "Dạ trưởng nhóm! Thứ Ba anh xem giúp bản nháp trước được không ạ?", s: ["넵", "팀장님"] },
        ],
      },
      {
        msgs: [
          { from: "minho", t: "좋아요, 고마워요^^", r: "joayo, gomawoyo", vi: "Tốt quá, cảm ơn nhé ^^", tone: "friendly", s: ["^^"] },
          { from: "minho", t: "오늘도 화이팅해요!", r: "oneuldo hwaitinghaeyo!", vi: "Hôm nay cũng cố lên nhé!", tone: "friendly", s: ["화이팅"] },
        ],
        replies: [
          { en: "네, 팀장님도 화이팅하세요!", r: "ne, timjangnimdo hwaitinghaseyo!", vi: "Vâng, anh cũng cố lên ạ!", s: ["화이팅", "팀장님"] },
          { en: "감사합니다! 화이팅!", r: "gamsahamnida! hwaiting!", vi: "Cảm ơn anh! Cố lên!", s: ["화이팅"] },
          { en: "넵! 점심에 동물원 사진 보여주세요ㅎㅎ", r: "nep! jeomsime dongmurwon sajin boyeojuseyo hh", vi: "Dạ! Trưa nay cho em xem ảnh sở thú nha hihi", s: ["넵", "ㅎㅎ"] },
        ],
      },
    ],
  },
  {
    id: "decline", title: "Từ chối liên hoan công ty", en: "Declining the company dinner (hoesik)", chars: ["park"],
    desc: "Giám đốc Park mời cả team đi 회식 thứ Sáu. Tập từ chối lịch sự với cấp trên.",
    turns: [
      {
        msgs: [
          { from: "park", t: "이번 주 금요일 저녁에 팀 회식이 있습니다.", r: "ibeon ju geumyoil jeonyeoge tim hoesigi itseumnida.", vi: "Tối thứ Sáu tuần này có buổi liên hoan của team.", tone: "serious", s: ["회식"] },
          { from: "park", t: "다들 참석 가능하시죠?", r: "dadeul chamseok ganeunghasijyo?", vi: "Mọi người đều tham dự được chứ?", tone: "pushy" },
        ],
        replies: [
          { en: "이사님, 죄송한데 그날은 선약이 있어서 참석이 어려울 것 같습니다.", r: "isanim, joesonghande geunareun seonyagi isseoseo chamseogi eoryeoul geot gatseumnida.", vi: "Thưa giám đốc, em xin lỗi, hôm đó em có hẹn trước nên chắc khó tham dự ạ.", s: ["이사님", "선약이 있어서요"] },
          { en: "말씀 감사합니다! 다만 금요일은 가족 일정이 있어서요. 죄송합니다.", r: "malsseum gamsahamnida! daman geumyoireun gajok iljeongi isseoseoyo. joesonghamnida.", vi: "Cảm ơn anh đã báo! Có điều thứ Sáu em có việc gia đình. Em xin lỗi ạ." },
          { en: "꼭 가고 싶은데 금요일은 정말 어려울 것 같습니다ㅠㅠ 다음에는 꼭 참석하겠습니다!", r: "kkok gago sipeunde geumyoireun jeongmal eoryeoul geot gatseumnida yu-yu. daeumeneun kkok chamseokhagetseumnida!", vi: "Em rất muốn đi nhưng thứ Sáu thật sự khó ạ ㅠㅠ Lần sau em nhất định tham dự!", s: ["ㅠㅠ", "다음에 꼭"] },
        ],
      },
      {
        msgs: [
          { from: "park", t: "아쉽네요. 1차만이라도 잠깐 오는 건 어때요?", r: "aswipneyo. il-chaman-irado jamkkan oneun geon eottaeyo?", vi: "Tiếc quá. Chỉ ghé tăng 1 một chút thôi thì sao?", tone: "pushy", s: ["1차"] },
        ],
        replies: [
          { en: "정말 죄송합니다. 이번에는 어려울 것 같습니다.", r: "jeongmal joesonghamnida. ibeoneneun eoryeoul geot gatseumnida.", vi: "Em thật sự xin lỗi. Lần này chắc em không được ạ.", s: ["이번엔 좀 어려울 것 같아요"] },
          { en: "마음만 감사히 받겠습니다! 다음 회식 때 꼭 갈게요.", r: "maeumman gamsahi batgetseumnida! daeum hoesik ttae kkok galgeyo.", vi: "Em xin nhận tấm lòng ạ! Lần liên hoan sau em nhất định đi.", s: ["마음만 받을게요", "회식"] },
          { en: "시간이 되면 1차 끝날 때쯤 잠깐 들러볼게요!", r: "sigani doemyeon il-cha kkeunnal ttaejjeum jamkkan deulleobolgeyo!", vi: "Nếu có thời gian em sẽ ghé một chút lúc tăng 1 gần xong ạ!", s: ["1차"] },
        ],
      },
      {
        msgs: [
          { from: "park", t: "알겠어요. 무리하지 마세요.", r: "algesseoyo. murihaji maseyo.", vi: "Được rồi. Đừng cố quá nhé.", tone: "friendly" },
          { from: "park", t: "다음에 같이 해요^^", r: "daeume gachi haeyo", vi: "Lần sau cùng đi nhé ^^", tone: "friendly", s: ["^^"] },
        ],
        replies: [
          { en: "네, 감사합니다 이사님!", r: "ne, gamsahamnida isanim!", vi: "Vâng, cảm ơn giám đốc ạ!", s: ["이사님"] },
          { en: "이해해 주셔서 감사합니다. 즐거운 시간 보내세요!", r: "ihaehae jusyeoseo gamsahamnida. jeulgeoun sigan bonaeseyo!", vi: "Cảm ơn anh đã thông cảm. Chúc mọi người vui vẻ ạ!" },
          { en: "넵! 다음 회식은 제가 맛집 찾아볼게요ㅎㅎ", r: "nep! daeum hoesigeun jega matjip chajabolgeyo hh", vi: "Dạ! Lần liên hoan sau em sẽ tìm quán ngon ạ hihi", s: ["넵", "회식", "맛집", "ㅎㅎ"] },
        ],
      },
    ],
  },
  {
    id: "group", title: "Nhóm chat của team", en: "Team group chat: Saturday hike", chars: ["minho", "jiwoo", "junho"], group: "단톡방",
    desc: "Cả team rủ nhau leo núi ở công viên Griffith, Junho chọc Jiwoo.",
    turns: [
      {
        msgs: [
          { from: "minho", t: "토요일에 그리피스 공원 등산 갈 사람?", r: "toyoire geuripiseu gongwon deungsan gal saram?", vi: "Ai đi leo núi ở công viên Griffith thứ Bảy không?", tone: "friendly" },
          { from: "jiwoo", t: "저요저요🙋‍♀️", r: "jeoyo jeoyo", vi: "Em em 🙋‍♀️ (Jiwoo nói lịch sự vì có trưởng nhóm trong nhóm)", tone: "friendly" },
          { from: "junho", t: "지우 씨 지난번에 10분 만에 힘들다고 했잖아요ㅋㅋ", r: "Jiu ssi jinanbeone sip bun mane himdeuldago haetjanayo kk", vi: "Jiwoo lần trước mới 10 phút đã kêu mệt mà haha", tone: "teasing", s: ["ㅋㅋ"] },
        ],
        replies: [
          { en: "저도 갈게요! 몇 시에 만나요?", r: "jeodo galgeyo! myeot si-e mannayo?", vi: "Em cũng đi! Mấy giờ gặp ạ?" },
          { en: "저도 참여할게요! 준비물 있나요?", r: "jeodo chamyeohalgeyo! junbimul innayo?", vi: "Em cũng tham gia! Cần chuẩn bị gì không ạ?" },
          { en: "ㅋㅋㅋ 준호 씨는 정상까지 가실 수 있죠?😏", r: "kkk Junho ssineun jeongsangkkaji gasil su itjyo?", vi: "Haha anh Junho chắc lên được tới đỉnh chứ ạ? 😏", s: ["ㅋㅋ"] },
        ],
      },
      {
        msgs: [
          { from: "jiwoo", t: "아 그건 신발 때문이었다고요ㅠㅠ", r: "a geugeon sinbal ttaemunieotdagoyo yu-yu", vi: "Á lần đó là tại đôi giày mà ㅠㅠ", tone: "friendly", s: ["ㅠㅠ"] },
          { from: "junho", t: "네네 그렇다고 해요ㅋㅋ", r: "nene geureotago haeyo kk", vi: "Rồi rồi, cứ cho là vậy đi haha", tone: "sarcastic", s: ["네네", "ㅋㅋ"] },
          { from: "minho", t: "8시에 주차장에서 만나요! 물은 각자 챙겨오세요", r: "yeodeol si-e juchajang-eseo mannayo! mureun gakja chaenggyeooseyo", vi: "8 giờ gặp ở bãi đậu xe nhé! Nước thì mỗi người tự mang", tone: "friendly" },
        ],
        replies: [
          { en: "넵 알겠습니다!", r: "nep algetseumnida!", vi: "Dạ em biết rồi ạ!", s: ["넵", "알겠습니다"] },
          { en: "넵! 제가 간식 좀 챙겨갈게요", r: "nep! jega gansik jom chaenggyeogalgeyo", vi: "Dạ! Em mang chút đồ ăn vặt nha", s: ["넵"] },
          { en: "지우 씨 신발 새로 샀어요?ㅋㅋ", r: "Jiu ssi sinbal saero sasseoyo? kk", vi: "Jiwoo mua giày mới chưa vậy? haha", s: ["ㅋㅋ"] },
        ],
      },
      {
        msgs: [
          { from: "jiwoo", t: "다들 두고 보세요😤 이번엔 1등으로 올라갈 거예요", r: "dadeul dugo boseyo. ibeonen ildeungeuro ollagal geoyeyo", vi: "Mọi người cứ chờ mà xem 😤 Lần này em lên đầu tiên", tone: "teasing", s: ["두고 봐"] },
          { from: "junho", t: "오 기대할게요ㅋㅋㅋ", r: "o gidaehalgeyo kkk", vi: "Ồ mong chờ đó nha haha", tone: "sarcastic", s: ["ㅋㅋ"] },
          { from: "minho", t: "다들 토요일에 봐요^^", r: "dadeul toyoire bwayo", vi: "Hẹn mọi người thứ Bảy nhé ^^", tone: "friendly", s: ["^^"] },
        ],
        replies: [
          { en: "네, 토요일에 봬요!", r: "ne, toyoire bwaeyo!", vi: "Vâng, thứ Bảy gặp ạ!" },
          { en: "지우 씨 화이팅! 토요일에 봬요~", r: "Jiu ssi hwaiting! toyoire bwaeyo~", vi: "Jiwoo cố lên! Thứ Bảy gặp nha~", s: ["화이팅"] },
          { en: "1등 하면 제가 커피 쏠게요☕", r: "ildeung hamyeon jega keopi ssolgeyo", vi: "Ai lên đầu tiên em bao cà phê ☕", s: ["쏠게"] },
        ],
      },
    ],
  },
  {
    id: "followup", title: "Trả lời sau khi im lặng", en: "Following up after no reply", chars: ["jiwoo"],
    desc: "Bạn quên trả lời Jiwoo 2 ngày. Giờ cô ấy nhắn lại.",
    history: [
      { from: "jiwoo", t: "주말에 영화 볼래? 🍿", r: "jumare yeonghwa bollae?", vi: "Cuối tuần đi xem phim không? 🍿", tone: "friendly", stamp: "2 ngày trước · Đã đọc" },
    ],
    turns: [
      {
        msgs: [
          { from: "jiwoo", t: "야 읽씹이야?ㅋㅋㅋ", r: "ya ilkssibiya? kkk", vi: "Ê, đọc rồi lơ hả? haha", tone: "teasing", s: ["읽씹", "ㅋㅋ"] },
          { from: "jiwoo", t: "살아있냐ㅠㅠ", r: "saraitnya yu-yu", vi: "Còn sống không đó ㅠㅠ", tone: "teasing", s: ["ㅠㅠ"] },
        ],
        replies: [
          { en: "미안! 요즘 너무 바빠서 답장을 못 했어.", r: "mian! yojeum neomu bappaseo dapjangeul mot haesseo.", vi: "Xin lỗi! Dạo này bận quá nên chưa trả lời được." },
          { en: "헐 미안ㅠㅠ 보고 답장하는 걸 깜빡했어", r: "heol mian yu-yu bogo dapjanghaneun geol kkamppakhaesseo", vi: "Trời xin lỗi ㅠㅠ Đọc rồi mà quên trả lời mất", s: ["헐", "ㅠㅠ"] },
          { en: "살아있어ㅋㅋ 일에 깔려 있었어😵 ㅈㅅ!", r: "saraisseo kk ire kkallyeo isseosseo. joesong!", vi: "Còn sống haha, bị công việc đè bẹp 😵 Xin lỗi nha!", s: ["ㅋㅋ", "ㅈㅅ"] },
        ],
      },
      {
        msgs: [
          { from: "jiwoo", t: "ㅋㅋ 괜찮아", r: "kk gwaenchana", vi: "Haha không sao", tone: "friendly", s: ["ㅋㅋ"] },
          { from: "jiwoo", t: "그래서 영화 볼 거야 말 거야?😤", r: "geuraeseo yeonghwa bol geoya mal geoya?", vi: "Vậy có đi xem phim hay không đây? 😤", tone: "pushy" },
        ],
        replies: [
          { en: "볼래! 토요일 어때?", r: "bollae! toyoil eottae?", vi: "Đi! Thứ Bảy được không?" },
          { en: "당연히 보지! 몇 시?", r: "dangyeonhi boji! myeot si?", vi: "Đương nhiên đi! Mấy giờ?" },
          { en: "볼 거야ㅋㅋ 사과의 의미로 팝콘 쏠게🍿", r: "bol geoya kk sagwaui uimiro papkon ssolge", vi: "Đi chứ haha, để xin lỗi mình bao bắp rang 🍿", s: ["쏠게"] },
        ],
      },
      {
        msgs: [
          { from: "jiwoo", t: "오키 토요일 7시 CGV 앞에서 봐", r: "oki toyoil ilgop si CGV apeseo bwa", vi: "Ok, 7 giờ thứ Bảy gặp trước rạp CGV nha", tone: "friendly" },
          { from: "jiwoo", t: "이번에 또 읽씹하면 진짜 삐질 거야😒", r: "ibeone tto ilkssip-hamyeon jinjja ppijil geoya", vi: "Lần này mà còn đọc rồi lơ là mình dỗi thật đó 😒", tone: "teasing", s: ["읽씹"] },
        ],
        replies: [
          { en: "알았어! 토요일에 봐!", r: "arasseo! toyoire bwa!", vi: "Biết rồi! Thứ Bảy gặp!" },
          { en: "ㅇㅋ 이번엔 칼답할게ㅋㅋ", r: "o-keu ibeonen kaldaphalge kk", vi: "Ok, lần này mình trả lời liền haha", s: ["ㅇㅋ", "칼답", "ㅋㅋ"] },
          { en: "삐지면 팝콘 두 개 사줄게😏", r: "ppijimyeon papkon du gae sajulge", vi: "Dỗi thì mình mua cho hai bắp rang 😏" },
        ],
      },
    ],
  },
];

const UNNATURAL = [
  { en: "안녕하세요. 저는 잘 지내요. 감사합니다.", why: "Giống sách giáo khoa, không ai nhắn tin như vậy." },
  { en: "네.", why: "Quá cụt, làm câu chuyện dừng lại." },
  { en: "안 가요.", why: "Từ chối thẳng thừng, nghe gắt. Thử \"선약이 있어서요\" hoặc \"다음에 꼭!\"." },
  { en: "당신은 뭐 해요?", why: "\"당신\" nghe lạ, thậm chí thô. Người Hàn gọi tên + 씨 hoặc bỏ chủ ngữ." },
  { en: "나는 동의합니다.", why: "Trộn \"나\" (thân) với \"-ㅂ니다\" (trang trọng) nghe rất lạ, lại cứng như dịch máy." },
  { en: "그 음식은 매우 맛있습니다.", why: "Đúng ngữ pháp nhưng như văn viết. Người ta nói \"완전 맛있어요!\"." },
];

const LESSONS = [
  {
    id: "raa", title: "React → Add → Ask bằng tiếng Hàn",
    sections: [
      { h: "Ý chính", body: "<p>Phản ứng, thêm thông tin của mình, rồi hỏi lại. Người Hàn phản ứng rất nhiệt: <i>와, 헐, 대박, 진짜요?</i></p>" },
      { h: "Ví dụ", body: "<div class='ex'><div class='them'>주말에 샌디에이고 다녀왔어요!</div><div class='bad'>❌ 네.</div><div class='good'>✅ <b>와 좋았겠어요!</b> <span class='tag'>React</span> 저도 가보고 싶었는데요. <span class='tag'>Add</span> 어디가 제일 좋았어요? <span class='tag'>Ask</span></div></div>" },
      { h: "Mẹo", body: "<ul><li>Câu hỏi ngắn kiểu wbu: <i>〇〇 씨는요?</i> hoặc với bạn thân: <i>너는?</i></li><li>Thêm ㅎㅎ hoặc ㅋㅋ cuối câu cho mềm.</li></ul>" },
    ],
    check: { q: "Đồng nghiệp nhắn \"저 새 차 샀어요!\". Câu nào đủ React → Add → Ask?", opts: ["네.", "와 대박! 저도 차 보고 있었는데. 무슨 차예요?", "차는 비싸요."], a: 1, why: "Có React (와 대박!), Add (저도 차 보고 있었는데) và Ask (무슨 차예요?)." },
  },
  {
    id: "polite", title: "반말 và 존댓말, chức danh và từ chối",
    sections: [
      { h: "Khi nào nói lịch sự", body: "<ul><li>Cấp trên, người lớn tuổi, người mới quen: <b>존댓말</b> (đuôi <i>-요</i>, <i>-습니다</i>).</li><li>Bạn cùng tuổi đã thân, sau khi hỏi <i>말 놓을까요?</i> (mình nói trống không nhé?): <b>반말</b>.</li><li>Trong nhóm chat có cấp trên, cả nhóm thường nói lịch sự.</li></ul>" },
      { h: "Gọi tên", body: "<ul><li>Cấp trên: <b>chức danh + 님</b> (<i>팀장님, 이사님</i>), không gọi tên.</li><li>Đồng nghiệp ngang hàng: <b>tên + 씨</b> (<i>지우 씨</i>). Không dùng 씨 với cấp trên.</li><li>Tránh <b>당신</b>: nghe lạ, có khi thô.</li><li><b>넵</b>: \"dạ!\" tích cực ở công sở; <b>ㅇㅇ</b> chỉ với bạn thân.</li></ul>" },
      { h: "Từ chối 회식", body: "<p>회식 (liên hoan công ty) khá quan trọng ở công ty Hàn, nên từ chối cần lịch sự:</p><ul><li><b>선약이 있어서요</b>: vì có hẹn trước rồi.</li><li><b>이번엔 좀 어려울 것 같아요</b>: lần này chắc hơi khó ạ.</li><li><b>마음만 감사히 받을게요</b>: xin nhận tấm lòng.</li><li>Nếu bị nài, có thể đi <b>1차</b> (tăng đầu) rồi về sớm.</li></ul>" },
    ],
    check: { q: "Trưởng nhóm nhắn \"내일 회의 10시로 바뀌었어요\". Trả lời nào tốt nhất?", opts: ["ㅇㅇ", "넵 알겠습니다!", "ㅇㅋ"], a: 1, why: "넵 알겠습니다 lịch sự, tích cực. ㅇㅇ và ㅇㅋ chỉ dùng với bạn thân." },
  },
  {
    id: "emoji", title: "ㅋㅋ, ㅎㅎ, ㅠㅠ và 읽씹",
    sections: [
      { h: "Cười và khóc bằng phụ âm", body: "<table class='emo'><tr><td>ㅋㅋ</td><td>Cười. Càng nhiều ㅋ càng buồn cười. Chỉ một chữ <b>ㅋ</b> có thể nghe nhạt, như cười gượng.</td></tr><tr><td>ㅎㅎ</td><td>Cười nhẹ, mỉm cười. Hợp khi nhắn với người lớn hơn.</td></tr><tr><td>ㅠㅠ</td><td>Mắt khóc: buồn, tủi, xin lỗi kiểu dễ thương.</td></tr><tr><td>^^</td><td>Mắt cười: người lớn tuổi hay dùng để tỏ ra thân thiện.</td></tr></table><p>Người Hàn dùng ㅋㅋ ㅎㅎ ㅠㅠ nhiều hơn emoji.</p>" },
      { h: "읽씹 và số 1 trên KakaoTalk", body: "<p>Trên KakaoTalk, số <b>1</b> cạnh tin nhắn biến mất khi người kia đã đọc. Đọc mà không trả lời là <b>읽씹</b>, dễ làm người kia dỗi. Chưa trả lời được thì nhắn ngắn: <i>이따 답장할게!</i> (lát mình trả lời nhé).</p>" },
      { h: "Viết tắt bằng phụ âm", body: "<p><b>ㅇㅋ</b> (ok), <b>ㄱㄱ</b> (đi thôi), <b>ㄱㅅ</b> (cảm ơn), <b>ㅈㅅ</b> (xin lỗi): chỉ dùng với bạn thân. Với cấp trên phải viết đầy đủ.</p>" },
    ],
    check: { q: "Bạn đọc tin của đồng nghiệp nhưng chưa trả lời được ngay. Nên làm gì?", opts: ["Để đó, mai trả lời", "Nhắn ngắn: \"이따 답장할게요!\"", "Gửi \"ㅋ\""], a: 1, why: "Một câu ngắn báo sẽ trả lời sau giúp tránh bị coi là 읽씹." },
  },
  {
    id: "scam", title: "Nhận diện lừa đảo qua KakaoTalk",
    sections: [
      { h: "Dấu hiệu cờ đỏ 🚩", body: "<ul><li><b>Nhắn nhầm số</b> rồi tiếp tục làm quen.</li><li><b>리딩방</b>: \"phòng chat hướng dẫn đầu tư\", hứa chỉ mã cổ phiếu, crypto chắc thắng.</li><li>Khen, tán tỉnh nhanh nhưng né câu hỏi cụ thể.</li><li>Rủ chuyển sang Telegram.</li><li>Giả làm người quen, con cái: <i>엄마 나 폰 고장났어</i> (mẹ ơi điện thoại con hỏng) rồi xin tiền.</li></ul>" },
      { h: "Ví dụ", body: "<div class='ex'><div class='them'>안녕하세요, 김 대리님 맞으시죠?</div><div class='me'>아니요, 잘못 보내셨어요</div><div class='them'>앗 죄송해요ㅎㅎ 근데 이것도 인연인데 친구해요😊 🚩</div><div class='them'>저 주식 리딩방 하는데 수익 대박이에요 🚩</div></div>" },
      { h: "Cách phản hồi", body: "<ul><li><i>영상통화 가능하세요?</i> (Gọi video được không?)</li><li><i>돈 얘기는 안 해요.</i> (Tôi không nói chuyện tiền bạc.)</li><li>Không bấm link, không chuyển tiền. Chặn và báo cáo (차단, 신고).</li></ul>" },
    ],
    check: { q: "Người lạ mời bạn vào \"리딩방\" để được chỉ cổ phiếu chắc thắng. Đây là?", opts: ["Cơ hội tốt", "Dấu hiệu lừa đảo", "Dịch vụ của ngân hàng"], a: 1, why: "리딩방 hứa lợi nhuận chắc chắn là chiêu lừa đảo đầu tư rất phổ biến." },
  },
];

export default {
  id: "ko",
  name: "Tiếng Hàn",
  native: "한국어",
  htmlLang: "ko",
  aiLanguage: "Korean (KakaoTalk style)",
  reading: { label: "Romanization", system: "Revised Romanization of Korean" },
  typeMs: 100,
  lead: "Luyện nhắn tin tiếng Hàn (KakaoTalk) với đồng nghiệp người Hàn ở Irvine, California.",
  example: "tiếng Hàn",
  group: ["minho", "jiwoo", "junho"],
  chars: CHARACTERS,
  lex: LEX,
  scenarios: SCENARIOS,
  unnatural: UNNATURAL,
  lessons: LESSONS,
};
