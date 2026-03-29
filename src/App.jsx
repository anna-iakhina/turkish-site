import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Bookmark,
  Languages,
  CheckCircle2,
  XCircle,
  Heart,
  HeartOff,
  Filter,
  Upload,
  FileText,
} from "lucide-react";

const storageKey = "turkish-study-saved-words";
const importedCardsKey = "turkish-study-imported-cards";
const levels = ["All", "A1", "A2", "B1"];

const levelVocabulary = {
  A1: [
    ["merhaba", "hello"], ["güle güle", "goodbye"], ["evet", "yes"], ["hayır", "no"], ["lütfen", "please"],
    ["teşekkür ederim", "thank you"], ["özür dilerim", "sorry"], ["tamam", "okay"], ["su", "water"], ["ekmek", "bread"],
    ["kahve", "coffee"], ["çay", "tea"], ["süt", "milk"], ["şeker", "sugar"], ["tuz", "salt"],
    ["peynir", "cheese"], ["yumurta", "egg"], ["domates", "tomato"], ["salata", "salad"], ["çorba", "soup"],
    ["pilav", "rice"], ["makarna", "pasta"], ["balık", "fish"], ["et", "meat"], ["tavuk", "chicken"],
    ["meyve", "fruit"], ["elma", "apple"], ["limon", "lemon"], ["meyve suyu", "juice"], ["restoran", "restaurant"],
    ["lokanta", "eatery"], ["market", "supermarket"], ["pazar", "market"], ["otel", "hotel"], ["ev", "house"],
    ["oda", "room"], ["mutfak", "kitchen"], ["banyo", "bathroom"], ["tuvalet", "toilet"], ["kapı", "door"],
    ["pencere", "window"], ["masa", "table"], ["sandalye", "chair"], ["yatak", "bed"], ["balkon", "balcony"],
    ["salon", "living room"], ["ışık", "light"], ["dolap", "cupboard"], ["buzdolabı", "fridge"], ["araba", "car"],
    ["taksi", "taxi"], ["otobüs", "bus"], ["vapur", "ferry"], ["uçak", "plane"], ["yol", "road"],
    ["sokak", "street"], ["cadde", "avenue"], ["şehir", "city"], ["köy", "village"], ["ülke", "country"],
    ["deniz", "sea"], ["ada", "island"], ["göl", "lake"], ["harita", "map"], ["anne", "mother"],
    ["baba", "father"], ["arkadaş", "friend"], ["kadın", "woman"], ["erkek", "man"], ["çocuk", "child"],
    ["abla", "older sister"], ["abi", "older brother"], ["komşu", "neighbor"], ["doktor", "doctor"], ["hemşire", "nurse"],
    ["öğrenci", "student"], ["öğretmen", "teacher"], ["polis", "police"], ["müdür", "manager"], ["kitap", "book"],
    ["kalem", "pen"], ["defter", "notebook"], ["kelime", "word"], ["cümle", "sentence"], ["soru", "question"],
    ["cevap", "answer"], ["zaman", "time"], ["gün", "day"], ["bugün", "today"], ["yarın", "tomorrow"],
    ["sabah", "morning"], ["akşam", "evening"], ["gece", "night"], ["şimdi", "now"], ["para", "money"],
    ["fiyat", "price"], ["hesap", "bill"], ["fiş", "receipt"], ["indirim", "discount"]
  ],
  A2: [
    ["randevu", "appointment"], ["ikamet", "residence permit"], ["başvuru", "application"], ["belge", "document"], ["evrak", "paperwork"],
    ["pasaport", "passport"], ["vize", "visa"], ["sigorta", "insurance"], ["kira", "rent"], ["sözleşme", "contract"],
    ["müşteri", "customer"], ["görevli", "official"], ["yardım", "help"], ["sorun", "problem"], ["cevap", "answer"],
    ["ağrı", "pain"], ["ilaç", "medicine"], ["eczane", "pharmacy"], ["ateş", "fever"], ["sancı", "sharp pain"],
    ["yara", "wound"], ["stres", "stress"], ["vitamin", "vitamin"], ["rapor", "report"], ["telefon", "telephone"],
    ["şarj", "charge"], ["priz", "socket"], ["kablo", "cable"], ["kablosuz", "wireless"], ["bilgisayar", "computer"],
    ["dosya", "file"], ["ekran", "screen"], ["program", "program"], ["kurs", "course"], ["egzersiz", "exercise"],
    ["sağlık", "health"], ["uyku", "sleep"], ["yorgunluk", "tiredness"], ["keyif", "good mood"], ["yağmur", "rain"],
    ["fırtına", "storm"], ["sis", "fog"], ["rüzgar", "wind"], ["kar", "snow"], ["şemsiye", "umbrella"],
    ["yağmurluk", "raincoat"], ["soğuk", "cold"], ["sıcak", "hot"], ["kalabalık", "crowded"], ["tatil", "holiday"],
    ["yolculuk", "journey"], ["gezi", "trip"], ["bilet", "ticket"], ["aktarma", "transfer"], ["rötar", "delay"],
    ["yolcu", "passenger"], ["sürücü", "driver"], ["ehliyet", "driver's license"], ["araç", "vehicle"], ["minibüs", "minibus"],
    ["motosiklet", "motorcycle"], ["kamyon", "truck"], ["gar", "train station"], ["bekleme salonu", "waiting room"], ["gidiş dönüş bileti", "round-trip ticket"],
    ["havaalanı", "airport"], ["bagaj", "luggage"], ["fazla bagaj", "excess luggage"], ["kemer", "seatbelt"], ["kalkış", "takeoff"],
    ["iniş", "landing"], ["hostes", "flight attendant"], ["trafik ışığı", "traffic light"], ["ücret", "fee"], ["maaş", "salary"],
    ["gelir", "income"], ["gider", "expense"], ["borç", "debt"], ["bütçe", "budget"], ["alışveriş", "shopping"],
    ["alışveriş merkezi", "shopping mall"], ["beden", "size"], ["pantolon", "trousers"], ["ayakkabı", "shoes"], ["çizme", "boots"],
    ["ceket", "jacket"], ["gömlek", "shirt"], ["şampuan", "shampoo"], ["havlu", "towel"], ["çarşaf", "sheet"],
    ["yastık", "pillow"], ["yorgan", "quilt"], ["temiz", "clean"], ["kir", "dirt"], ["gürültü", "noise"],
    ["sessiz", "quiet"], ["tehlike", "danger"], ["acele", "hurry"], ["hazır", "ready"]
  ],
  B1: [
    ["özgürlük", "freedom"], ["sorumluluk", "responsibility"], ["medeniyet", "civilization"], ["ideoloji", "ideology"], ["politika", "politics"],
    ["ekonomi", "economy"], ["istikrar", "stability"], ["toplum", "society"], ["çevre", "environment"], ["kültür", "culture"],
    ["ahlak", "ethics"], ["vicdan", "conscience"], ["tehdit", "threat"], ["şiddet", "violence"], ["savaş", "war"],
    ["barış", "peace"], ["hukuk", "law"], ["hükümet", "government"], ["bakanlık", "ministry"], ["demokrasi", "democracy"],
    ["demokratik", "democratic"], ["seçim", "election"], ["yönetim", "administration"], ["devlet", "state"], ["kurum", "institution"],
    ["üretim", "production"], ["ürün", "product"], ["kaynak", "source"], ["faktör", "factor"], ["oran", "ratio"],
    ["süreç", "process"], ["sonuç", "result"], ["etki", "effect"], ["örnek", "example"], ["özellik", "feature"],
    ["yorum", "comment"], ["ifade", "expression"], ["anlam", "meaning"], ["fikir", "idea"], ["düşünce", "thought"],
    ["karar", "decision"], ["amaç", "goal"], ["durum", "situation"], ["ilişki", "relationship"], ["görüş", "opinion"],
    ["duygu", "emotion"], ["sevgi", "love"], ["aşk", "passionate love"], ["hayat", "life"], ["ölüm", "death"],
    ["gelecek", "future"], ["dönem", "period"], ["nesil", "generation"], ["bilim", "science"], ["teknoloji", "technology"],
    ["enstitü", "institute"], ["üniversite", "university"], ["fakülte", "faculty"], ["tez", "thesis"], ["rapor", "report"],
    ["meslek", "profession"], ["sahip", "owner"], ["alıcı", "recipient"], ["üye", "member"], ["başkan", "president"],
    ["komutan", "commander"], ["asker", "soldier"], ["ordu", "army"], ["sınır", "border"], ["uluslararası", "international"],
    ["yurtdışı", "abroad"], ["yurtiçi", "domestic"], ["ziyaret", "visit"], ["dostluk", "friendship"], ["misafir", "guest"],
    ["beklenti", "expectation"], ["boykot", "boycott"], ["anlaşma", "agreement"], ["miktar", "amount"], ["süre", "duration"],
    ["düzey", "level"], ["seviye", "level"], ["boyut", "dimension"], ["ihtiyaç", "need"], ["çiftlik", "farm"],
    ["istiklal", "independence"], ["sağduyu", "common sense"], ["korkunç", "scary"], ["karanlık", "darkness"], ["rüya", "dream"]
  ]
};

const texts = [
  {
    id: "taxi",
    title: "Conversation in a Taxi",
    category: "Taxi",
    level: "A1",
    words: [
      { tr: "Merhaba", en: "hello" }, { tr: "havaalanına", en: "to the airport" }, { tr: "gitmek", en: "to go" },
      { tr: "istiyorum", en: "I want" }, { tr: "bagajımı", en: "my luggage" }, { tr: "arkaya", en: "to the back" },
      { tr: "koyabilir", en: "can put" }, { tr: "misiniz", en: "can you" }, { tr: "trafik", en: "traffic" },
      { tr: "yoğun", en: "heavy" }, { tr: "ne kadar", en: "how much" }, { tr: "sürer", en: "takes" },
      { tr: "sağa", en: "to the right" }, { tr: "dönün", en: "turn" }, { tr: "düz", en: "straight" },
      { tr: "gidin", en: "go" }, { tr: "burada", en: "here" }, { tr: "durabilir", en: "can stop" },
      { tr: "fiş", en: "receipt" }, { tr: "verebilir", en: "can give" }, { tr: "acelem", en: "I am in a hurry" }
    ],
    sentences: [
      ["Merhaba", ",", "havaalanına", "gitmek", "istiyorum", "."],
      ["Lütfen", "bagajımı", "arkaya", "koyabilir", "misiniz", "?"],
      ["Bugün", "trafik", "yoğun", "mu", "?", "Ne kadar", "sürer", "?"],
      ["Benim", "biraz", "acelem", "var", "."],
      ["Burada", "durabilir", "misiniz", "?", "Bana", "fiş", "verebilir", "misiniz", "?"],
      ["Çok", "teşekkür", "ederim", "."]
    ]
  },
  {
    id: "cafe",
    title: "Conversation in a Cafe",
    category: "Cafe",
    level: "A1",
    words: [
      { tr: "menü", en: "menu" }, { tr: "kahvaltı", en: "breakfast" }, { tr: "kahve", en: "coffee" },
      { tr: "çay", en: "tea" }, { tr: "su", en: "water" }, { tr: "tatlı", en: "dessert" },
      { tr: "öneri", en: "recommendation" }, { tr: "şekersiz", en: "without sugar" }, { tr: "hesap", en: "bill" },
      { tr: "kartla", en: "by card" }, { tr: "ödeyebilir", en: "can pay" }, { tr: "sessiz", en: "quiet" }
    ],
    sentences: [
      ["Merhaba", ",", "menüyü", "alabilir", "miyim", "?"],
      ["Bugün", "kahvaltı", "var", "mı", "?", "Ben", "kahve", "ve", "su", "istiyorum", "."],
      ["Kahve", "şekersiz", "olsun", ",", "lütfen", "."],
      ["Tatlı", "olarak", "neyi", "önerirsiniz", "?"],
      ["Sessiz", "bir", "masa", "var", "mı", "?"],
      ["Hesap", "lütfen", ".", "Kartla", "ödeyebilir", "miyim", "?"],
      ["Teşekkür", "ederim", "."]
    ]
  },
  {
    id: "hospital",
    title: "Conversation in a Hospital",
    category: "Hospital",
    level: "A2",
    words: [
      { tr: "randevum", en: "I have an appointment" }, { tr: "başım", en: "my head" }, { tr: "ağrıyor", en: "hurts" },
      { tr: "midem", en: "my stomach" }, { tr: "bulanıyor", en: "feels nauseous" }, { tr: "ateşim", en: "my fever" },
      { tr: "ilaç", en: "medicine" }, { tr: "eczane", en: "pharmacy" }, { tr: "beklemem", en: "should I wait" },
      { tr: "gerekiyor", en: "is necessary" }, { tr: "sigorta", en: "insurance" }, { tr: "rapor", en: "report" }
    ],
    sentences: [
      ["Merhaba", ",", "randevum", "var", "."],
      ["Doktor", "nerede", "?", "Burada", "beklemem", "gerekiyor", "mu", "?"],
      ["Başım", "ağrıyor", "ve", "midem", "bulanıyor", "."],
      ["Ateşim", "yok", ",", "ama", "kendimi", "iyi", "hissetmiyorum", "."],
      ["Doktor", "bana", "ilaç", "yazabilir", "mi", "?"],
      ["Yakında", "bir", "eczane", "var", "mı", "?"],
      ["Gerekirse", "bir", "rapor", "almak", "istiyorum", "."]
    ]
  },
  {
    id: "migration",
    title: "Conversation in a Migration Center",
    category: "Migration Center",
    level: "B1",
    words: [
      { tr: "ikamet", en: "residence permit" }, { tr: "başvurusu", en: "application" }, { tr: "belgelerimi", en: "my documents" },
      { tr: "hazırladım", en: "I prepared" }, { tr: "eksik", en: "missing" }, { tr: "evrak", en: "paperwork" },
      { tr: "kontrol", en: "check" }, { tr: "sigorta", en: "insurance" }, { tr: "kira", en: "rent" },
      { tr: "sözleşmem", en: "my contract" }, { tr: "numaram", en: "my number" }, { tr: "masaya", en: "to the desk" },
      { tr: "gitmeliyim", en: "I should go" }, { tr: "sonucunu", en: "the result" }, { tr: "takip", en: "track" }
    ],
    sentences: [
      ["Merhaba", ",", "ikamet", "başvurusu", "için", "randevum", "var", "."],
      ["Belgelerimi", "hazırladım", ".", "Eksik", "evrak", "olup", "olmadığını", "kontrol", "edebilir", "misiniz", "?"],
      ["Sigorta", "poliçem", "ve", "kira", "sözleşmem", "burada", "."],
      ["Numaram", "yanarsa", "hangi", "masaya", "gitmeliyim", "?"],
      ["Başvurumun", "sonucunu", "nasıl", "takip", "edebilirim", "?"],
      ["Teşekkür", "ederim", "."]
    ]
  },
  // ==== B1 LONG TEXTS ====

{
  id: "b1_1",
  title: "Starting a New Life Abroad",
  category: "Life",
  level: "B1",
  words: [],
  sentences: [
    ["İki", "yıldan", "beri", "yurtdışında", "yaşıyorum", "."],
    ["İlk", "geldiğimde", "çok", "zorlanmıştım", "çünkü", "hiç", "kimseyi", "tanımıyordum", "."],
    ["Dil", "bilmediğim", "için", "en", "basit", "şeyler", "bile", "çok", "zor", "geliyordu", "."],
    ["Yalnızlık", "yüzünden", "bazen", "geri", "dönmeyi", "düşündüm", "."],
    ["Ama", "zamanla", "alıştım", "ve", "şimdi", "burada", "yaşamaktan", "memnunum", "."]
  ]
},

{
  id: "b1_2",
  title: "Working Remotely",
  category: "Work",
  level: "B1",
  words: [],
  sentences: [
    ["Pandemiden", "beri", "evden", "çalışıyorum", "."],
    ["Başta", "çok", "rahat", "olduğunu", "düşünüyordum", "ama", "sonra", "zor", "olduğunu", "fark", "ettim", "."],
    ["Sürekli", "evde", "olduğum", "için", "sosyal", "hayatım", "azaldı", "."],
    ["Toplantılar", "yüzünden", "bütün", "gün", "bilgisayar", "başında", "oturuyorum", "."],
    ["Yine", "de", "trafik", "olmadığı", "için", "bu", "sistemi", "seviyorum", "."]
  ]
},

{
  id: "b1_3",
  title: "Learning a New Language",
  category: "Education",
  level: "B1",
  words: [],
  sentences: [
    ["Altı", "aydan", "beri", "Türkçe", "öğreniyorum", "."],
    ["Başta", "çok", "zor", "geliyordu", "çünkü", "gramer", "çok", "farklı", "."],
    ["Her", "gün", "çalıştığım", "için", "yavaş", "yavaş", "gelişiyorum", "."],
    ["Hata", "yapmaktan", "korkmama", "rağmen", "konuşmaya", "çalışıyorum", "."],
    ["Bu", "süreç", "zor", "olsa", "da", "çok", "keyifli", "."]
  ]
},

{
  id: "b1_4",
  title: "City Life vs Nature",
  category: "Lifestyle",
  level: "B1",
  words: [],
  sentences: [
    ["Uzun", "zamandır", "şehirde", "yaşıyorum", "."],
    ["Gürültü", "yüzünden", "bazen", "çok", "yoruluyorum", "."],
    ["Ama", "işim", "burada", "olduğu", "için", "taşınamıyorum", "."],
    ["Doğada", "yaşamak", "istememe", "rağmen", "şu", "an", "mümkün", "değil", "."],
    ["Yine", "de", "hafta", "sonları", "kaçmaya", "çalışıyorum", "."]
  ]
},

{
  id: "b1_5",
  title: "Daily Routine",
  category: "Life",
  level: "B1",
  words: [],
  sentences: [
    ["Sabahları", "erken", "kalkmaya", "alıştım", "."],
    ["İşe", "gitmeden", "önce", "spor", "yapıyorum", "."],
    ["Yorgun", "olduğum", "için", "bazen", "zor", "oluyor", "."],
    ["Ama", "bu", "alışkanlığı", "kazandığımdan", "beri", "kendimi", "daha", "iyi", "hissediyorum", "."],
    ["Düzenli", "yaşamak", "hayatımı", "çok", "değiştirdi", "."]
  ]
},

// дальше продолжаю в том же формате...

{
  id: "b1_6",
  title: "Technology and Life",
  category: "Technology",
  level: "B1",
  words: [],
  sentences: [
    ["Teknoloji", "hayatımızı", "çok", "değiştirdi", "."],
    ["Telefonlar", "yüzünden", "insanlar", "daha", "az", "iletişim", "kuruyor", "."],
    ["Ama", "internet", "olduğu", "için", "her", "şeye", "kolayca", "ulaşabiliyoruz", "."],
    ["Bu", "durum", "iyi", "olmasına", "rağmen", "bazen", "tehlikeli", "olabiliyor", "."],
    ["Dengeyi", "kurmak", "çok", "önemli", "."]
  ]
},

{
  id: "b1_7",
  title: "Friendship",
  category: "Relationships",
  level: "B1",
  words: [],
  sentences: [
    ["Uzun", "zamandır", "aynı", "arkadaşlarımla", "görüşüyorum", "."],
    ["Yoğunluk", "yüzünden", "çok", "sık", "buluşamıyoruz", "."],
    ["Ama", "tanıştığımızdan", "beri", "bağımız", "çok", "güçlü", "."],
    ["Farklı", "şehirlerde", "yaşamamıza", "rağmen", "iletişimimizi", "kaybetmedik", "."],
    ["Gerçek", "arkadaşlık", "bence", "böyle", "olur", "."]
  ]
},

{
  id: "b1_8",
  title: "Health Problems",
  category: "Health",
  level: "B1",
  words: [],
  sentences: [
    ["Son", "zamanlarda", "çok", "yorgunum", "."],
    ["Stres", "yüzünden", "uyuyamıyorum", "."],
    ["Doktora", "gittiğim", "için", "durumumu", "anladım", "."],
    ["İlaç", "kullanmama", "rağmen", "hemen", "iyileşmedim", "."],
    ["Ama", "daha", "iyi", "olacağıma", "inanıyorum", "."]
  ]
},

{
  id: "b1_9",
  title: "Travel Experience",
  category: "Travel",
  level: "B1",
  words: [],
  sentences: [
    ["Geçen", "yaz", "tek", "başına", "seyahat", "ettim", "."],
    ["Başta", "korktuğum", "için", "çok", "heyecanlıydım", "."],
    ["Ama", "yola", "çıktığımdan", "beri", "çok", "şey", "öğrendim", "."],
    ["Zor", "olmasına", "rağmen", "çok", "güzel", "bir", "deneyimdi", "."],
    ["Tekrar", "yapmak", "istiyorum", "."]
  ]
},

{
  id: "b1_10",
  title: "Work-Life Balance",
  category: "Work",
  level: "B1",
  words: [],
  sentences: [
    ["İş", "ve", "özel", "hayat", "dengesini", "kurmak", "zor", "."],
    ["Çok", "çalıştığım", "için", "kendime", "zaman", "ayıramıyorum", "."],
    ["Bu", "durum", "yüzünden", "bazen", "mutsuz", "oluyorum", "."],
    ["Ama", "değiştirmek", "istiyorum", "."],
    ["Son", "zamanlarda", "daha", "dikkatli", "davranıyorum", "."]
  ]
}
];

const appStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Inter, Arial, sans-serif; color: #334155; }
  .app-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #fff1f2 0%, #f0f9ff 50%, #f5f3ff 100%);
    padding: 24px;
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .hero-grid, .cards-grid, .texts-grid {
    display: grid;
    gap: 16px;
  }
  .hero-grid { grid-template-columns: 1.2fr 0.8fr; }
  .cards-grid { grid-template-columns: 1fr 360px; }
  .texts-grid { grid-template-columns: 320px 1fr; }
  .panel {
    background: rgba(255,255,255,0.82);
    border: 1px solid rgba(255,255,255,0.75);
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 24px;
  }
  .panel-content { padding: 24px; }
  .hero-title { font-size: 40px; line-height: 1.1; margin: 0; color: #1e293b; }
  .hero-text, .muted { color: #64748b; }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(255,255,255,0.82);
    border: 1px solid #ffe4e6;
    color: #475569;
    font-size: 14px;
    margin-bottom: 12px;
  }
  .stats-number { font-size: 40px; font-weight: 700; color: #1e293b; }
  .badge-row, .tab-row, .topic-list, .answers-list, .vocab-list, .saved-grid { display: flex; gap: 10px; flex-wrap: wrap; }
  .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid;
  }
  .badge-rose { background: #fff1f2; border-color: #ffe4e6; }
  .badge-sky { background: #f0f9ff; border-color: #e0f2fe; }
  .badge-violet { background: #f5f3ff; border-color: #ede9fe; }
  .badge-amber { background: #fffbeb; border-color: #fde68a; }
  .tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    background: rgba(255,255,255,0.82);
    border: 1px solid #ede9fe;
    border-radius: 18px;
    padding: 6px;
  }
  .tab-btn {
    border: none;
    background: transparent;
    border-radius: 14px;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: #64748b;
  }
  .tab-btn.active.rose { background: #ffe4e6; color: #1e293b; }
  .tab-btn.active.sky { background: #e0f2fe; color: #1e293b; }
  .tab-btn.active.violet { background: #ede9fe; color: #1e293b; }
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .section-title { display: flex; align-items: center; gap: 8px; font-size: 24px; font-weight: 700; color: #1e293b; }
  .select, .input {
    width: 100%;
    border: 1px solid #ddd6fe;
    background: rgba(255,255,255,0.92);
    border-radius: 16px;
    padding: 12px 14px;
    font-size: 14px;
    color: #334155;
    outline: none;
  }
  .input-wrap { width: 220px; }
  .card-practice-grid { display: grid; grid-template-columns: 1fr 0.9fr; gap: 24px; }
  .highlight-box {
    border-radius: 24px;
    padding: 24px;
    background: linear-gradient(135deg, #ffffff 0%, #fff1f2 100%);
    border: 1px solid #ffe4e6;
  }
  .text-box {
    border-radius: 24px;
    padding: 24px;
    background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
    border: 1px solid #e0f2fe;
    font-size: 18px;
    line-height: 1.8;
  }
  .word-large { font-size: 42px; font-weight: 700; color: #1e293b; margin: 16px 0 24px; word-break: break-word; }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 16px;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid transparent;
    cursor: pointer;
    transition: 0.2s ease;
  }
  .btn-outline { border-color: #fecdd3; background: rgba(255,255,255,0.82); color: #334155; }
  .btn-outline:hover { background: #fff1f2; }
  .btn-dark { background: #1e293b; color: white; }
  .btn-dark:hover { background: #334155; }
  .answer-btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-radius: 16px;
    padding: 16px;
    border: 1px solid #ffe4e6;
    background: rgba(255,255,255,0.92);
    cursor: pointer;
    font-size: 15px;
    text-align: left;
  }
  .answer-btn:hover { background: #fff1f2; }
  .answer-btn.correct { background: #ecfdf5; border-color: #a7f3d0; }
  .answer-btn.wrong { background: #fffbeb; border-color: #fde68a; }
  .upload-box {
    border: 1px dashed #c4b5fd;
    background: linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%);
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    cursor: pointer;
  }
  .upload-box:hover { background: linear-gradient(135deg, #ffffff 0%, #ede9fe 100%); }
  .status-box, .counter-box, .empty-box {
    border-radius: 16px;
    padding: 14px 16px;
    font-size: 14px;
  }
  .status-box { background: linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%); }
  .counter-box { background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%); }
  .empty-box { background: linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%); text-align: center; color: #64748b; padding: 40px; }
  .topic-btn {
    width: 100%;
    border-radius: 16px;
    padding: 16px;
    border: 1px solid #e0f2fe;
    background: rgba(255,255,255,0.92);
    text-align: left;
    cursor: pointer;
  }
  .topic-btn.active { background: #e0f2fe; }
  .topic-list-column { display: flex; flex-direction: column; gap: 12px; }
  .tooltip-word { position: relative; display: inline-flex; align-items: center; margin-right: 4px; margin-bottom: 8px; }
  .tooltip-trigger {
    border: none;
    background: transparent;
    border-radius: 8px;
    padding: 2px 6px;
    cursor: pointer;
    font-size: inherit;
    color: inherit;
  }
  .tooltip-trigger:hover { background: rgba(251, 207, 232, 0.5); }
  .tooltip-box {
    position: absolute;
    left: 50%; top: 100%; transform: translateX(-50%);
    margin-top: 8px; z-index: 20;
    max-width: 220px;
    background: rgba(30,41,59,0.95);
    color: white;
    border-radius: 12px;
    padding: 8px 10px;
    font-size: 12px;
    opacity: 0; pointer-events: none;
    transition: 0.15s ease;
    white-space: normal;
    text-align: center;
  }
  .tooltip-word:hover .tooltip-box { opacity: 1; }
  .saved-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .saved-card {
    border: 1px solid #ddd6fe;
    background: rgba(255,255,255,0.9);
    border-radius: 24px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(15,23,42,0.04);
  }
  .saved-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .saved-word { font-size: 22px; font-weight: 700; color: #1e293b; }
  .small-text { font-size: 14px; color: #64748b; }
  .mt-16 { margin-top: 16px; }
  .mt-8 { margin-top: 8px; }
  .mb-16 { margin-bottom: 16px; }
  .w-full { width: 100%; }
  @media (max-width: 1024px) {
    .hero-grid, .cards-grid, .texts-grid, .card-practice-grid, .saved-grid { grid-template-columns: 1fr; }
    .input-wrap { width: 100%; }
    .hero-title { font-size: 32px; }
  }
`;

function uniqueByTurkish(items) {
  const map = new Map();
  items.forEach((item) => {
    const key = item.turkish.trim().toLowerCase();
    if (!map.has(key)) map.set(key, item);
  });
  return Array.from(map.values());
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildCardsFromVocabulary(vocabulary, level) {
  return vocabulary.map(([turkish, english], index, arr) => {
    const distractors = arr
      .filter((item) => item[1] !== english)
      .slice(index + 1)
      .concat(arr.filter((item) => item[1] !== english).slice(0, index + 1))
      .slice(0, 3)
      .map((item) => item[1]);

    return {
      id: `${level}-${index}-${turkish}`,
      turkish,
      english,
      options: shuffle([english, ...distractors]),
      topic: level === "A1" ? "Everyday Basics" : level === "A2" ? "Daily Life" : "Extended Vocabulary",
      level,
      source: "Core",
    };
  });
}

const baseCards = [
  ...buildCardsFromVocabulary(levelVocabulary.A1, "A1"),
  ...buildCardsFromVocabulary(levelVocabulary.A2, "A2"),
  ...buildCardsFromVocabulary(levelVocabulary.B1, "B1"),
];

function TooltipWord({ word, translation, onSave, isSaved, source }) {
  return (
    <span className="tooltip-word">
      <button
        type="button"
        className="tooltip-trigger"
        onClick={() => onSave({ turkish: word, english: translation, source })}
      >
        {word}
      </button>
      <span className="tooltip-box">{translation}</span>
      {isSaved && <Heart size={14} color="#fb7185" style={{ marginLeft: 4 }} />}
    </span>
  );
}

function parseImportedVocabulary(text, selectedLevel) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const rows = [];

  lines.forEach((line, index) => {
    if (/^\d+$/.test(line)) return;
    if (line.toUpperCase() === "COMPOUND N" || line.toUpperCase() === "PRO") return;
    if (line.includes("-->") || line.includes("flip") || line.includes("DON'T USE")) return;

    const parts = line.includes("\t")
      ? line.split("\t").map((item) => item.trim()).filter(Boolean)
      : line.split(/\s{2,}|;(?=\s*[A-Za-z])|,(?=\s*[A-Za-z])/).map((item) => item.trim()).filter(Boolean);

    if (parts.length < 2) return;

    const turkish = parts[0].replace(/^"|"$/g, "").replace(/\s*=\s*/g, " ").trim();
    let english = parts.slice(1).join(", ").replace(/\([^)]*\)/g, "").replace(/\/+[^\s,;]+/g, "").replace(/\s{2,}/g, " ").trim();
    english = english.split(/\s{2,}/)[0].split(";")[0].trim();
    if (!turkish || !english) return;

    rows.push({
      id: `Imported-${selectedLevel}-${index}-${turkish}`,
      turkish,
      english,
      topic: "Imported Words",
      level: selectedLevel,
      source: "Imported",
    });
  });

  const deduped = uniqueByTurkish(rows).slice(0, 300);
  return deduped.map((item, index, arr) => {
    const distractors = arr
      .filter((entry) => entry.english !== item.english)
      .slice(index + 1)
      .concat(arr.filter((entry) => entry.english !== item.english).slice(0, index + 1))
      .slice(0, 3)
      .map((entry) => entry.english);

    return { ...item, options: shuffle([item.english, ...distractors]) };
  });
}

function badgeClass(levelOrType) {
  if (levelOrType === "A1") return "badge badge-rose";
  if (levelOrType === "A2") return "badge badge-sky";
  if (levelOrType === "B1") return "badge badge-violet";
  if (levelOrType === "Imported") return "badge badge-violet";
  return "badge badge-amber";
}

export default function TurkishStudySite() {
  const [savedWords, setSavedWords] = useState([]);
  const [importedCards, setImportedCards] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [selectedTextId, setSelectedTextId] = useState(texts[0].id);
  const [searchSaved, setSearchSaved] = useState("");
  const [cardLevel, setCardLevel] = useState("All");
  const [textLevel, setTextLevel] = useState("All");
  const [importLevel, setImportLevel] = useState("A1");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [importStatus, setImportStatus] = useState("");
  const [activeTab, setActiveTab] = useState("cards");

  useEffect(() => {
    const rawSaved = localStorage.getItem(storageKey);
    const rawImported = localStorage.getItem(importedCardsKey);
    if (rawSaved) {
      try { setSavedWords(JSON.parse(rawSaved)); } catch { setSavedWords([]); }
    }
    if (rawImported) {
      try { setImportedCards(JSON.parse(rawImported)); } catch { setImportedCards([]); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(savedWords));
  }, [savedWords]);

  useEffect(() => {
    localStorage.setItem(importedCardsKey, JSON.stringify(importedCards));
  }, [importedCards]);

  const allCards = useMemo(() => uniqueByTurkish([...baseCards, ...importedCards]), [importedCards]);
  const filteredCards = useMemo(() => cardLevel === "All" ? allCards : allCards.filter((card) => card.level === cardLevel), [cardLevel, allCards]);
  const filteredTexts = useMemo(() => textLevel === "All" ? texts : texts.filter((text) => text.level === textLevel), [textLevel]);

  useEffect(() => {
    setCurrentCardIndex(0);
    setSelectedAnswer(null);
    setAnswerStatus(null);
  }, [cardLevel, importedCards]);

  useEffect(() => {
    if (!filteredTexts.some((text) => text.id === selectedTextId)) {
      setSelectedTextId(filteredTexts[0]?.id ?? texts[0].id);
    }
  }, [filteredTexts, selectedTextId]);

  const currentCard = filteredCards[currentCardIndex] ?? filteredCards[0];
  const selectedText = filteredTexts.find((text) => text.id === selectedTextId) ?? filteredTexts[0] ?? texts[0];
  const savedMap = useMemo(() => new Set(savedWords.map((item) => item.turkish.toLowerCase())), [savedWords]);

  const filteredSavedWords = useMemo(() => {
    const q = searchSaved.trim().toLowerCase();
    if (!q) return savedWords;
    return savedWords.filter((item) => item.turkish.toLowerCase().includes(q) || item.english.toLowerCase().includes(q) || item.source.toLowerCase().includes(q));
  }, [savedWords, searchSaved]);

  const cardCounts = useMemo(() => ({
    A1: allCards.filter((card) => card.level === "A1").length,
    A2: allCards.filter((card) => card.level === "A2").length,
    B1: allCards.filter((card) => card.level === "B1").length,
  }), [allCards]);

  const saveWord = (word) => {
    setSavedWords((prev) => prev.some((item) => item.turkish.toLowerCase() === word.turkish.toLowerCase()) ? prev : [...prev, word]);
  };

  const removeWord = (turkish) => setSavedWords((prev) => prev.filter((item) => item.turkish !== turkish));

  const checkAnswer = (option) => {
    if (!currentCard) return;
    setSelectedAnswer(option);
    setAnswerStatus(option === currentCard.english ? "correct" : "wrong");
  };

  const nextCard = () => {
    if (filteredCards.length === 0) return;
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
    setSelectedAnswer(null);
    setAnswerStatus(null);
  };

  const handleImportFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsed = parseImportedVocabulary(text, importLevel);
    setImportedCards((prev) => uniqueByTurkish([...prev, ...parsed]));
    setImportStatus(`Imported ${parsed.length} words into ${importLevel}.`);
    event.target.value = "";
  };

  return (
    <>
      <style>{appStyles}</style>
      <div className="app-root">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="hero-grid">
            <div className="panel">
              <div className="panel-content">
                <div className="pill"><Languages size={16} color="#fb7185" /> Turkish Practice Hub</div>
                <h1 className="hero-title">Learn Turkish with 100+ words per level, long texts, and imported vocabulary</h1>
                <p className="hero-text mt-8">This version uses plain React and built-in CSS, so it is much easier to deploy quickly without Tailwind.</p>
              </div>
            </div>

            <div className="panel">
              <div className="panel-content" style={{ display: "grid", placeItems: "center", textAlign: "center", minHeight: "100%" }}>
                <div>
                  <div className="stats-number">{savedWords.length}</div>
                  <div className="small-text mt-8">saved words</div>
                  <div className="badge-row mt-16" style={{ justifyContent: "center" }}>
                    <span className="badge badge-rose">A1: {cardCounts.A1}</span>
                    <span className="badge badge-sky">A2: {cardCounts.A2}</span>
                    <span className="badge badge-violet">B1: {cardCounts.B1}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="tabs">
            <button className={`tab-btn rose ${activeTab === "cards" ? "active" : ""}`} onClick={() => setActiveTab("cards")}>Flashcards</button>
            <button className={`tab-btn sky ${activeTab === "texts" ? "active" : ""}`} onClick={() => setActiveTab("texts")}>Texts</button>
            <button className={`tab-btn violet ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>Saved Words</button>
          </div>

          {activeTab === "cards" && (
            <div className="cards-grid">
              <div className="panel">
                <div className="panel-content">
                  <div className="section-header">
                    <div className="section-title"><BookOpen size={20} color="#fb7185" /> Flashcards</div>
                    <div className="input-wrap">
                      <select value={cardLevel} onChange={(e) => setCardLevel(e.target.value)} className="select">
                        {levels.map((level) => <option key={level} value={level}>{level}</option>)}
                      </select>
                    </div>
                  </div>

                  {!currentCard ? (
                    <div className="empty-box">No cards available for this level yet.</div>
                  ) : (
                    <div className="card-practice-grid">
                      <div className="highlight-box">
                        <div className="section-header" style={{ marginBottom: 12 }}>
                          <div className="badge-row">
                            <span className={badgeClass(currentCard.level === "A1" ? "A1" : currentCard.level === "A2" ? "A2" : "B1")}>{currentCard.topic}</span>
                            <span className={badgeClass(currentCard.level)}>{currentCard.level}</span>
                            {currentCard.source === "Imported" && <span className={badgeClass("Imported")}>Imported</span>}
                          </div>
                          <span className="small-text">{currentCardIndex + 1} / {filteredCards.length}</span>
                        </div>
                        <div className="small-text">Choose the correct English translation:</div>
                        <div className="word-large">{currentCard.turkish}</div>
                        <button type="button" className="btn btn-outline" onClick={() => saveWord({ turkish: currentCard.turkish, english: currentCard.english, source: `Flashcards (${currentCard.level})` })}>
                          {savedMap.has(currentCard.turkish.toLowerCase()) ? <Heart size={16} color="#fb7185" /> : <Bookmark size={16} color="#fb7185" />}
                          {savedMap.has(currentCard.turkish.toLowerCase()) ? "Saved" : "Save word"}
                        </button>
                      </div>

                      <div className="answers-list" style={{ flexDirection: "column" }}>
                        {currentCard.options.map((option) => {
                          const isSelected = selectedAnswer === option;
                          const isCorrect = option === currentCard.english;
                          const showCorrect = answerStatus && isCorrect;
                          const showWrong = answerStatus === "wrong" && isSelected && !isCorrect;
                          return (
                            <button key={option} onClick={() => checkAnswer(option)} disabled={!!answerStatus} className={`answer-btn ${showCorrect ? "correct" : ""} ${showWrong ? "wrong" : ""}`}>
                              <span>{option}</span>
                              {showCorrect && <CheckCircle2 size={18} color="#10b981" />}
                              {showWrong && <XCircle size={18} color="#f59e0b" />}
                            </button>
                          );
                        })}
                        <div className="mt-16">
                          {answerStatus === "correct" && <p className="small-text">Correct. Great job!</p>}
                          {answerStatus === "wrong" && <p className="small-text">Not quite. The correct answer is <strong style={{ color: "#1e293b" }}>{currentCard.english}</strong>.</p>}
                          <button type="button" className="btn btn-dark mt-8" onClick={nextCard}>Next card</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="panel">
                <div className="panel-content">
                  <div className="section-title" style={{ marginBottom: 16 }}><Upload size={20} color="#8b5cf6" /> Import words</div>
                  <p className="small-text">Upload a .txt, .csv, or .tsv file. Lines like <strong style={{ color: "#334155" }}>turkish[TAB]english</strong> will turn into flashcards automatically.</p>
                  <div className="mt-16">
                    <select value={importLevel} onChange={(e) => setImportLevel(e.target.value)} className="select">
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                    </select>
                  </div>
                  <label className="upload-box mt-16">
                    <FileText size={24} color="#8b5cf6" style={{ marginBottom: 8 }} />
                    <div style={{ fontWeight: 600, color: "#334155" }}>Choose file</div>
                    <div className="small-text mt-8">txt, csv, tsv</div>
                    <input type="file" accept=".txt,.csv,.tsv" style={{ display: "none" }} onChange={handleImportFile} />
                  </label>
                  {importStatus && <div className="status-box mt-16">{importStatus}</div>}
                  <div className="counter-box mt-16">Imported cards: <strong style={{ color: "#1e293b" }}>{importedCards.length}</strong></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "texts" && (
            <div className="texts-grid">
              <div className="panel">
                <div className="panel-content">
                  <div className="section-title" style={{ marginBottom: 16 }}><Filter size={20} color="#8b5cf6" /> Topics</div>
                  <select value={textLevel} onChange={(e) => setTextLevel(e.target.value)} className="select mb-16">
                    {levels.map((level) => <option key={level} value={level}>{level}</option>)}
                  </select>
                  <div className="topic-list-column">
                    {filteredTexts.map((text) => (
                      <button key={text.id} onClick={() => setSelectedTextId(text.id)} className={`topic-btn ${selectedTextId === text.id ? "active" : ""}`}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                          <div style={{ fontWeight: 600 }}>{text.title}</div>
                          <span className={badgeClass(text.level)}>{text.level}</span>
                        </div>
                        <div className="small-text mt-8">{text.category}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-content">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div className="section-title" style={{ fontSize: 22 }}>{selectedText.title}</div>
                    <span className={badgeClass(selectedText.level)}>{selectedText.level}</span>
                  </div>
                  <p className="small-text">Hover over a word to see the English translation. Click a word to save it.</p>

                  <div className="text-box mt-16">
                    {selectedText.sentences.map((sentence, index) => (
                      <p key={index} style={{ marginBottom: 16 }}>
                        {sentence.map((token, tokenIndex) => {
                          if ([".", ",", "?", "!"].includes(token)) return <span key={`${token}-${tokenIndex}`}>{token} </span>;
                          const entry = selectedText.words.find((w) => w.tr === token || w.tr.toLowerCase() === token.toLowerCase());
                          return entry ? <TooltipWord key={`${token}-${tokenIndex}`} word={token} translation={entry.en} onSave={saveWord} isSaved={savedMap.has(token.toLowerCase())} source={selectedText.title} /> : <span key={`${token}-${tokenIndex}`}>{token} </span>;
                        })}
                      </p>
                    ))}
                  </div>

                  <div className="mt-16">
                    <h3 className="small-text" style={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 12 }}>Key vocabulary</h3>
                    <div className="vocab-list">
                      {selectedText.words.map((word) => (
                        <button key={word.tr} onClick={() => saveWord({ turkish: word.tr, english: word.en, source: selectedText.title })} className="btn btn-outline" style={{ borderRadius: 999 }}>
                          {word.tr} — {word.en}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="panel">
              <div className="panel-content">
                <div className="section-header">
                  <div>
                    <div className="section-title"><Bookmark size={20} color="#8b5cf6" /> Saved Words</div>
                    <p className="small-text mt-8">Build your own vocabulary list from flashcards and reading practice.</p>
                  </div>
                  <div className="input-wrap">
                    <input value={searchSaved} onChange={(e) => setSearchSaved(e.target.value)} placeholder="Search saved words..." className="input" />
                  </div>
                </div>

                {filteredSavedWords.length === 0 ? (
                  <div className="empty-box">No saved words yet.</div>
                ) : (
                  <div className="saved-grid">
                    {filteredSavedWords.map((word) => (
                      <div key={`${word.turkish}-${word.source}`} className="saved-card">
                        <div className="saved-card-head">
                          <div>
                            <div className="saved-word">{word.turkish}</div>
                            <div className="small-text mt-8">{word.english}</div>
                          </div>
                          <span className={badgeClass("source")}>{word.source}</span>
                        </div>
                        <div className="mt-16">
                          <button type="button" className="btn btn-outline" onClick={() => removeWord(word.turkish)}>
                            <HeartOff size={16} color="#fb7185" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
