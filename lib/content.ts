import type { IctArticleRaw, SmcRaw, ScrapedImage } from "./data";

export type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "image"; src: string; alt: string };

export type ContentBlock =
  | { type: "heading"; level: number; text: string; paragraphs: string[] }
  | { type: "image"; src: string; alt: string };

export type SummaryDoc = {
  intro: string;
  blocks: ContentBlock[];
  sourceUrl: string;
};

const TERM_BUCKETS: Array<{
  match: RegExp;
  paragraphs: () => string[];
}> = [
  {
    match: /(order block|\bob\b|bullish ob|bearish ob)/i,
    paragraphs: () => [
      "Order block adalah area harga di mana institusi besar (bank, hedge fund, prop firm) terakhir kali membuka posisi sebelum harga bergerak impulsif ke arah berlawanan. Secara visual ia berbentuk candle terakhir yang berlawanan arah dengan pergerakan dominan berikutnya. Misal pada uptrend, bullish order block adalah candle bearish terakhir sebelum displacement naik yang menembus struktur.",
      "Logika di balik order block sederhana: ketika institusi ingin masuk posisi besar, mereka tidak bisa membeli/menjual dalam satu klik karena akan menimbulkan slippage. Mereka harus mencicil order pada area yang likuid — yaitu di sekitar candle terakhir berlawanan. Saat harga kembali ke area tersebut, sisa order limit institusi yang belum terisi akan dieksekusi, menghasilkan reaksi penolakan yang kuat.",
      "Cara mengidentifikasi: temukan break of structure yang bersih dan disertai displacement (gerakan kuat satu arah). Mundur ke kiri sampai menemukan candle terakhir yang berlawanan arah dengan displacement tersebut. Body candle itulah zona order block-nya. Tandai dari open ke close body (sebagian trader memakai high-low).",
      "Validasi tambahan: order block valid biasanya berdampingan dengan Fair Value Gap (FVG) yang dihasilkan oleh displacement, dan menyapu likuiditas (sweep) sebelum reverse. Order block tanpa konteks ini cenderung false signal.",
      "Aturan praktis: hindari order block yang sudah ditest berkali-kali (mitigated) karena kekuatan order limit-nya sudah berkurang. Prioritaskan yang masih ‘segar’ — belum pernah disentuh setelah formasi. Kombinasikan dengan timeframe lebih tinggi: order block H4 yang sejajar dengan order block H1 jauh lebih kuat dibanding berdiri sendiri.",
      "Entry presisi: tunggu reaksi LTF (CHoCH atau bullish/bearish engulfing) di dalam zona order block, lalu masuk dengan SL tepat di balik wick yang menjadi extreme zona. Take profit minimal di likuiditas atau key level berikutnya untuk RR ≥ 3.",
    ],
  },
  {
    match: /(fair value gap|fvg|imbalance|inefficien)/i,
    paragraphs: () => [
      "Fair Value Gap (FVG), atau imbalance, adalah celah tiga-candle di mana wick candle pertama dan wick candle ketiga tidak saling overlap. Body candle tengah yang impulsif meninggalkan zona harga yang tidak sempat ditransaksikan secara penuh — area inilah yang disebut ‘inefficiency’ atau ketidakseimbangan.",
      "Mengapa pasar tertarik mengisi FVG? Karena algoritma price delivery (IPDA) cenderung mengembalikan harga ke area inefisien untuk menyelesaikan order yang belum terisi. FVG bertindak sebagai magnet harga: harga akan menyentuhnya entah untuk full close gap atau hanya mengisi 50% mid-line sebelum melanjutkan trend.",
      "Cara menandai: cari tiga candle berturutan di mana wick atas candle 1 lebih rendah dari wick bawah candle 3 (bullish FVG), atau sebaliknya wick bawah candle 1 lebih tinggi dari wick atas candle 3 (bearish FVG). Zona FVG adalah jarak antara kedua wick tersebut.",
      "Hierarchy FVG: HTF FVG (H4, daily) lebih powerful sebagai zona reaksi dibanding LTF FVG. Selalu plot FVG di HTF dulu untuk bias, lalu turun ke LTF untuk timing entry pada FVG yang sejajar.",
      "Trade plan: tunggu retracement ke FVG searah bias HTF. Idealnya FVG berada di zona discount/premium yang tepat (discount untuk long, premium untuk short). Masuk pada awal candle yang menyentuh FVG dengan SL di belakang FVG, target di likuiditas terdekat.",
      "Variasi penting: Implied FVG (IFVG) — FVG yang dibentuk oleh dua candle saja (gap antara body candle 1 dan body candle 2). Lebih halus tetapi sering memberi reaksi sangat tepat di pasar volatil.",
    ],
  },
  {
    match: /(break of structure|\bbos\b|change of character|choch|market structure shift|\bmss\b)/i,
    paragraphs: () => [
      "Market structure adalah peta arah pasar yang dibentuk oleh urutan swing high dan swing low. Uptrend valid bila harga membuat higher high (HH) diikuti higher low (HL); downtrend valid bila membuat lower high (LH) diikuti lower low (LL).",
      "Break of Structure (BOS) terjadi ketika harga menembus swing high terakhir pada uptrend (continuation bullish) atau menembus swing low terakhir pada downtrend (continuation bearish). BOS mengonfirmasi bahwa trend yang sedang berjalan masih sehat dan momentum berlanjut.",
      "Change of Character (CHoCH) sebaliknya: pada uptrend, CHoCH terjadi saat harga gagal membuat HH baru dan justru menembus swing low signifikan terakhir. Ini sinyal pertama bahwa kontrol pasar berpindah dari buyer ke seller (atau sebaliknya).",
      "Market Structure Shift (MSS) adalah istilah yang sering disamakan dengan CHoCH, tetapi versi ICT klasik menambahkan syarat tambahan: penembusan harus disertai displacement dan idealnya menghasilkan FVG. MSS dianggap sinyal reversal yang paling reliable.",
      "Cara membaca dengan tegas: BOS = lanjutan trend, CHoCH = warning reversal, MSS = konfirmasi reversal kuat. Selalu validasi dengan close body candle, bukan sekadar wick spike — wick break sering jadi liquidity grab.",
      "Aplikasi praktis: tunggu CHoCH pada LTF setelah harga mencapai zona HTF (order block / FVG di premium-discount). CHoCH menjadi trigger entry dengan SL di belakang swing high/low yang baru saja di-break.",
    ],
  },
  {
    match: /(liquidity|sweep|stop hunt|inducement|equal highs?|equal lows?|trendline liquidity|raid)/i,
    paragraphs: () => [
      "Likuiditas adalah konsep inti SMC/ICT. Setiap stop loss yang dipasang trader retail dan setiap pending order menumpuk pada level-level psikologis yang terlihat jelas: equal highs, equal lows, swing classic, trendline yang rapi, round number, atau session high/low.",
      "Smart money harus ‘menyapu’ pool likuiditas tersebut sebelum bergerak ke arah sebenarnya. Tanpa likuiditas yang cukup, order besar institusi akan menggerakkan harga terlalu jauh dan menghancurkan harga rata-rata mereka. Sweep adalah mekanisme paling efisien untuk mendapatkan kontra-party.",
      "Liquidity sweep visual: harga menembus level signifikan dengan wick spike yang cepat, lalu langsung berbalik dan menutup kembali di sisi sebelumnya. Wick tersebut adalah ‘bukti’ bahwa stop hunt sudah terjadi.",
      "Inducement: pola di mana harga sengaja membentuk pullback kecil yang menggoda trader masuk searah trend, hanya untuk mengambil stop mereka. Sering muncul setelah BOS — sebelum continuation lanjut, harga ‘memancing’ entry retail dulu, lalu sweep mereka.",
      "Aplikasi: tandai semua pool likuiditas di HTF (equal highs/lows, swing klasik, trendline). Tunggu harga menyapu salah satu pool lalu cari konfirmasi CHoCH di LTF. Entry pada FVG/Order Block yang muncul sebagai hasil sweep tersebut, dengan SL singkat di balik wick sweep.",
      "Trendline liquidity: trendline yang ‘terlalu rapi’ dan menggoda banyak trader memasang trade kontra atau searah trendline — adalah pool likuiditas yang besar. Sweep trendline biasanya menghasilkan reversal/continuation yang eksplosif.",
    ],
  },
  {
    match: /(premium|discount|equilibrium|\bote\b|optimal trade entry|dealing range|fib)/i,
    paragraphs: () => [
      "Konsep premium/discount membagi range harga menjadi paruh atas (premium — relatif mahal) dan paruh bawah (discount — relatif murah) menggunakan fibonacci 50% sebagai equilibrium. Filosofi-nya: institusi menjual di premium dan membeli di discount.",
      "Cara menarik dealing range yang valid: gunakan swing high dan swing low yang signifikan (idealnya yang sudah disapu likuiditasnya). Tarik fibonacci dari swing rendah ke swing tinggi untuk bullish range, atau sebaliknya untuk bearish range.",
      "Premium zone: di atas level 0.5 fibonacci. Cari short setup di sini saat bias bearish. Discount zone: di bawah level 0.5. Cari long setup di sini saat bias bullish. Hindari counter-trade pada zona yang tidak sesuai dengan bias HTF.",
      "Optimal Trade Entry (OTE): zona fibonacci 0.62 sampai 0.79 dari leg terakhir. Ini adalah ‘sweet spot’ di mana RR paling menguntungkan dan reaksi paling sering muncul. Banyak setup ICT klasik menargetkan entry di OTE.",
      "Konfirmasi: OTE jadi lebih powerful bila sejajar dengan order block atau FVG di HTF, dan terjadi setelah sweep likuiditas. Tanpa konfluensi tersebut, OTE bisa gagal — terutama pada market yang sedang ranging tanpa arah.",
      "Manajemen risiko: dengan entry OTE, SL diletakkan di balik 1.0 fibonacci (extreme leg), target di 0 fibonacci atau likuiditas berikutnya. RR alami biasanya 3:1 sampai 5:1 — sangat ideal untuk strategi probabilistik.",
    ],
  },
  {
    match: /(kill zone|london|new york|asian session|session|silver bullet|killzone)/i,
    paragraphs: () => [
      "Kill zone adalah jendela waktu di mana volatilitas dan probabilitas setup tinggi terjadi. Tiga kill zone utama: London Open (sekitar 14.00–17.00 WIB), New York Open (sekitar 19.30–22.00 WIB), dan London Close (sekitar 21.00–22.00 WIB).",
      "Mengapa kill zone penting? Karena sesi-sesi tersebut adalah waktu di mana institusi paling aktif mengeksekusi order. London membawa volume Eropa, New York membawa volume US. Saat kedua sesi overlap (19.30–21.00 WIB), volume puncak terjadi dan setup paling reliable muncul.",
      "Asian session (07.00–14.00 WIB) berperan berbeda: ia membangun range yang nanti akan disapu oleh London open. Strategi populer: tandai high-low Asian range, lalu cari sweep + CHoCH saat London membuka. Setup ini sering disebut judas swing.",
      "Silver Bullet ICT 2024: jendela 10–11 EST dan 14–15 EST. Logika setup: setelah judas swing London/NY open, harga sering bergerak balik impulsif menuju arah ‘sebenarnya’ pada jam-jam tersebut. Cari FVG yang baru terbentuk lalu entry pada retracement ke FVG itu.",
      "Disiplin waktu: jika tidak ada setup pada kill zone, lewati hari itu. Trading di luar kill zone (misal 23.00 WIB onwards) sering noise dan menghancurkan equity curve. Sabar = profit.",
      "Praktik: build bias harian sebelum London open. Tandai pool likuiditas Asia. Saat London masuk, amati sweep + CHoCH. Entry di OTE/FVG/OB hasil sweep. Target likuiditas lawan atau session high/low berikutnya.",
    ],
  },
  {
    match: /(silver bullet|2024|lecture|model)/i,
    paragraphs: () => [
      "Model ICT 2024 adalah penyederhanaan yang dirancang untuk konsistensi harian. Inti modelnya: setup hanya dieksekusi pada jendela waktu tertentu (Silver Bullet 10–11 EST atau 14–15 EST) untuk memaksa disiplin.",
      "Alur model: 1) Tentukan draw on liquidity (target harga berikutnya), 2) Tunggu manipulasi/judas swing pada awal sesi, 3) Identifikasi displacement dan FVG yang dihasilkan, 4) Entry pada retracement ke FVG, 5) Target likuiditas yang sudah diidentifikasi.",
      "Yang membuat model 2024 powerful: setiap komponen dapat dichecklist secara objektif. Tidak ada lagi ‘rasa’ atau ‘kira-kira’ — hanya: ada FVG? ada CHoCH? di jam yang tepat? jika tidak, no trade.",
      "Stop loss dan target sudah pre-defined: SL di belakang swing yang menjadi origin FVG, target di likuiditas berikutnya (Asia high/low, previous day high/low, atau equal highs/lows yang belum disapu).",
      "Risk management: 0.5–1% per trade. Karena model ini menargetkan RR minimal 3:1, win rate 40% sudah cukup profitable dalam jangka panjang.",
      "Pitfall umum: trader sering memaksa setup ketika tidak ada FVG yang clean atau CHoCH yang valid. Aturan emas: better no trade than bad trade. Lewati hari, tunggu setup A+.",
    ],
  },
  {
    match: /(displacement|propulsion|expansion|impulse)/i,
    paragraphs: () => [
      "Displacement adalah pergerakan harga yang kuat, cepat, dan satu arah dengan body candle dominan. Ciri visualnya: candle besar dengan close di ujung body, sering meninggalkan FVG di belakangnya. Displacement adalah ‘sidik jari’ aktivitas institusi.",
      "Mengapa displacement penting? Karena ia memvalidasi niat smart money. Tanpa displacement, sebuah BOS hanya wick spike — kemungkinan besar liquidity grab semata. Dengan displacement, BOS/CHoCH jadi konfirmasi reversal/continuation yang valid.",
      "Cara mengukur kualitas displacement: 1) Body to wick ratio besar (body dominan, wick kecil), 2) Volume meningkat dibanding rata-rata, 3) Menghasilkan FVG yang clean, 4) Close menembus swing high/low signifikan dengan jelas.",
      "Propulsion block: order block yang muncul tepat di awal displacement. Karena order block ini ‘bertugas’ mendorong harga lebih jauh, biasanya ia tidak dimitigasi sampai trend selesai. Sangat reliable sebagai zona continuation.",
      "Aplikasi filter: hanya pertimbangkan setup yang punya bukti displacement aktif. Jika harga break struktur tapi candle-nya kecil-kecil atau ranging — itu false break, hindari.",
      "Multi-timeframe: displacement HTF (H4, daily) memberi ‘izin’ untuk mencari setup searah pada LTF. Tanpa displacement HTF, setup LTF cenderung terjebak retracement panjang.",
    ],
  },
  {
    match: /(daily bias|weekly|monthly|htf|high time|bias)/i,
    paragraphs: () => [
      "Bias adalah arah pandang Anda terhadap pergerakan harga dalam timeframe tertentu. Tanpa bias, setiap setup dieksekusi tanpa konteks dan win rate akan acak. Bias yang baik dibangun dari analisa HTF (weekly → daily → H4).",
      "Komponen yang menentukan bias: 1) Posisi harga relatif terhadap dealing range HTF (premium/discount), 2) Arah trend HTF yang sedang berjalan (BOS terakhir di HTF), 3) Draw on liquidity berikutnya (di mana likuiditas mayor berada), 4) Konteks weekly open (apakah harga di atas/bawah open weekly).",
      "Cara membangun bias harian: cek candle daily kemarin (bullish/bearish, sweep apa, close di mana). Cek key level terdekat (PDH/PDL, equal highs/lows, FVG HTF). Tetapkan satu kalimat: ‘bias hari ini bullish karena ___, target di ___’.",
      "Bias bukan prediksi — ia menentukan sisi mana Anda berpihak. Setelah bias ditetapkan, fokus hanya pada setup searah. Setup berlawanan diabaikan walau terlihat ‘bagus’. Disiplin ini yang membedakan trader profit konsisten.",
      "Update bias: bias bisa berubah jika ada CHoCH/MSS di HTF yang signifikan, atau jika harga mencapai zona reaksi mayor (HTF order block / FVG) dan memberi reaksi kuat. Jangan ubah bias karena pergerakan kecil di LTF.",
      "Praktik: tulis bias setiap pagi dalam jurnal trading. Evaluasi di akhir hari — apakah bias terbukti? Konsistensi mencatat bias akan mempertajam kemampuan baca pasar dalam 2–3 bulan.",
    ],
  },
  {
    match: /(asian range|ndog|nwog|new day|new week|opening gap|pdh|pdl|pwh|pwl)/i,
    paragraphs: () => [
      "New Day Opening Gap (NDOG) adalah celah antara harga close kemarin (16.00 EST) dengan harga open hari ini (18.00 EST). New Week Opening Gap (NWOG) adalah celah antara close Jumat dan open Minggu malam. Gap ini bertindak sebagai magnet harga di hari/minggu berjalan.",
      "Mengapa NDOG/NWOG penting? Karena algoritma harga sering mengembalikan price ke level open yang ‘belum dikunjungi’ untuk menyelesaikan delivery. Sebagian besar hari setidaknya menyentuh NDOG sebelum melanjutkan arah utama.",
      "Cara plot: tarik garis horizontal pada level open candle harian (open Senin untuk NWOG). Tandai zona antara close terakhir hari sebelumnya dan open berikutnya — itulah NDOG/NWOG.",
      "PDH/PDL (Previous Day High/Low) adalah level likuiditas dari high dan low hari sebelumnya. Sebagian besar setup ICT mengincar PDH/PDL sebagai target take profit atau sebagai pool likuiditas yang akan disapu sebelum reversal.",
      "Asian range: high dan low yang terbentuk selama sesi Asia (07.00–14.00 WIB). Asian range sering disapu oleh London open sebagai judas swing. Marking range ini wajib untuk strategi London open.",
      "Aplikasi: gabungkan NDOG/NWOG + PDH/PDL + Asian range di chart Anda. Mereka adalah ‘peta likuiditas’ harian yang menjadi pondasi setup intraday.",
    ],
  },
  {
    match: /(breaker|mitigation|rejection block|flip|invert)/i,
    paragraphs: () => [
      "Breaker block adalah order block yang sudah ‘dilanggar’ (ditembus) lalu di-flip menjadi support/resistance baru. Konsep ini mengakui bahwa zona yang awalnya bullish bisa berubah jadi bearish setelah harga break struktur dan return untuk retest.",
      "Skenario bullish breaker: bullish order block (zona support) ditembus ke bawah, struktur shift jadi bearish, harga retest zona OB lama dari bawah — sekarang berfungsi sebagai resistance. Cari short setup di sini.",
      "Mitigation block: area di mana posisi awal institusi ‘dibebaskan’ (dimitigasi) sebelum harga melanjutkan ke arah baru. Sering muncul setelah pergerakan kontra-trend signifikan untuk memberi exit bagi posisi awal yang underwater.",
      "Cara identifikasi: cari OB yang dilanggar disertai displacement kuat. Tunggu retest dari sisi berlawanan. Konfirmasi reaksi (CHoCH di LTF) sebelum entry. Breaker tanpa CHoCH sering false signal.",
      "Rejection block: variasi di mana wick panjang menjadi zona reaksi (bukan body). Wick yang ditolak kuat menandakan likuiditas tersapu pada area tersebut — saat harga return, wick zone bertindak sebagai resistance/support.",
      "Praktik: breaker block paling efektif setelah liquidity sweep mayor. Jangan menggunakan breaker pada ranging market tanpa BOS jelas — risiko whipsaw tinggi.",
    ],
  },
  {
    match: /(crt|candle range|power of three|po3|accumulation|manipulation|distribution|amd)/i,
    paragraphs: () => [
      "Power of Three (PO3), kadang disebut AMD, membagi pergerakan candle/sesi menjadi tiga fase berurutan: Accumulation (build-up range), Manipulation (judas swing menyapu likuiditas), dan Distribution (displacement ke arah sebenarnya).",
      "Fase accumulation: harga ranging dalam zona sempit, membangun stop loss pada equal highs/lows. Trader retail mengambil posisi awal di sini — yang nanti akan menjadi makanan smart money.",
      "Fase manipulation: harga melakukan judas swing menyapu satu sisi range (biasanya berlawanan arah sebenarnya). Trader retail yang baru entry di-stop out. Likuiditas terkumpul cukup untuk smart money masuk posisi besar.",
      "Fase distribution: harga bergerak impulsif ke arah sebenarnya (berlawanan dengan judas swing). Inilah arah ‘asli’ candle/sesi tersebut. Displacement biasanya menghasilkan FVG dan BOS yang jelas.",
      "Candle Range Theory (CRT) menerapkan PO3 pada candle apapun, terutama candle HTF. High dan low candle adalah range. Saat range disapu, ekspektasi reaksi muncul pada arah lawan. CRT dipakai untuk membaca niat candle berjalan.",
      "Aplikasi: identifikasi fase accumulation HTF (D1 candle yang ranging). Tunggu manipulation (judas swing London). Entry pada distribution dengan target di range opposite extreme. Setup paling profitable saat PO3 HTF align dengan PO3 LTF.",
    ],
  },
  {
    match: /(smt|divergence|correlated|usd|dxy|inter[\s-]?market)/i,
    paragraphs: () => [
      "SMT Divergence (Smart Money Technique) memanfaatkan korelasi natural antar instrumen. Pasangan koreltif paling umum: EURUSD vs GBPUSD, AUDUSD vs NZDUSD, NQ vs ES, XAUUSD vs Silver. Saat satu pair membuat HH baru tetapi koreltifnya gagal, terjadi divergensi.",
      "Logika di balik SMT: smart money sering mengeksekusi delivery serempak di pasangan koreltif. Jika delivery hanya terjadi di satu pair (gagal di yang lain), itu sinyal bahwa algoritma sedang menyiapkan reversal atau sweep telah tercapai pada salah satu pair.",
      "Cara plot: buka dua chart pasangan koreltif berdampingan. Tandai swing high/low terakhir di keduanya. Saat salah satu pair mencapai equal highs/lows tetapi yang lain tidak — itu SMT divergence.",
      "SMT bullish divergence: pair koreltif membuat LL baru tetapi pair Anda tidak (membentuk higher low). Sinyal long. SMT bearish: pair koreltif membuat HH baru tetapi pair Anda tidak (membentuk lower high). Sinyal short.",
      "SMT paling powerful sebagai konfirmasi sweep. Sweep liquidity + SMT divergence pada timing kill zone = setup reversal A+. Tanpa SMT, sweep masih bisa jadi continuation.",
      "Kombinasi optimal: SMT divergence + sweep + CHoCH LTF + bias HTF aligned. Empat konfluensi ini menghasilkan setup berkualitas tinggi yang dicari trader institusional.",
    ],
  },
  {
    match: /(stl|itl|ltl|short term|intermediate|long term|swing classification)/i,
    paragraphs: () => [
      "ICT membagi swing menjadi tiga tier hierarchical: Short Term Low/High (STL/STH), Intermediate Term Low/High (ITL/ITH), dan Long Term Low/High (LTL/LTH). Tier yang lebih tinggi berisi tier yang lebih rendah sebagai sub-struktur.",
      "Short Term Low (STL): swing low di mana satu candle ke kiri dan satu candle ke kanan keduanya memiliki low lebih tinggi. Definisi paling dasar — tetapi kurang signifikan untuk bias HTF.",
      "Intermediate Term Low (ITL): STL yang diapit oleh dua STL lebih tinggi di sebelah kiri dan kanan. Artinya ITL adalah ‘lembah’ di antara dua STL — bobotnya menengah.",
      "Long Term Low (LTL): ITL yang diapit oleh dua ITL lebih tinggi di sebelah kiri dan kanan. LTL adalah swing low paling signifikan dan menjadi anchor utama untuk dealing range HTF.",
      "Mengapa klasifikasi ini penting? Karena tidak semua sweep punya bobot sama. Sweep STH ringan — sering muncul tiap hari. Sweep LTH adalah event mayor — bisa menandai reversal multi-hari atau bahkan multi-minggu.",
      "Praktik: identifikasi LTL/LTH terlebih dahulu di chart weekly/daily. Turunkan ke ITL/ITH untuk konteks H4. Cari entry presisi pada STL/STH di H1/M15 yang sejajar dengan bias dari LTL/LTH.",
    ],
  },
  {
    match: /(ipda|institutional|delivery|algorithm)/i,
    paragraphs: () => [
      "IPDA (Interbank Price Delivery Algorithm) adalah model konseptual ICT yang menjelaskan bagaimana algoritma institusi mengirim harga ke pool likuiditas tertentu dalam siklus 20, 40, atau 60 hari trading.",
      "Premis IPDA: harga tidak bergerak acak. Setiap pergerakan punya alasan algoritmis — biasanya menuju pool likuiditas (equal highs/lows, old swing levels) yang belum ‘dibersihkan’. Algoritma akan terus mengirim harga ke pool ini sampai delivery selesai.",
      "Cara pakai window 20 hari: tandai high tertinggi dan low terendah dari 20 candle daily terakhir. Level-level ini menjadi target draw on liquidity berikutnya — kemungkinan besar akan disentuh dalam window berjalan.",
      "Window 40 hari: high/low dari 40 candle daily terakhir. Bobotnya lebih besar, biasanya menjadi target swing trade jangka menengah. Sangat reliable untuk menentukan exit posisi swing.",
      "Window 60 hari: high/low dari 60 candle daily terakhir. Bobot maksimal, sering menjadi target positional trade dan menentukan trend cycle utama instrumen.",
      "Aplikasi: setelah harga menyentuh window high/low, perhatikan reaksi. Sering muncul reversal signifikan atau setidaknya pullback dalam. Combine dengan SMT divergence dan kill zone untuk presisi entry maksimal.",
    ],
  },
  {
    match: /(hrlr|lrlr|low risk reward|high risk reward|risk reward|rr ratio)/i,
    paragraphs: () => [
      "HRLR (High Resistance Liquidity Run) adalah skenario di mana pergerakan menuju pool likuiditas menghadapi banyak resistance/penghalang struktural (multiple FVG, order blocks, key levels) — biasanya bergerak choppy dan butuh waktu lama.",
      "LRLR (Low Resistance Liquidity Run) sebaliknya: pergerakan menuju pool likuiditas tanpa banyak penghalang struktural — biasanya bergerak cepat dan impulsif. Ini adalah skenario ideal untuk entry continuation.",
      "Cara identifikasi LRLR: setelah BOS dengan displacement kuat, perhatikan path ke target — jika tidak ada FVG lawan, OB lawan, atau key level mayor yang menghadang, kemungkinan besar harga akan ‘meluncur’ ke target.",
      "Cara identifikasi HRLR: jika path menuju target dipenuhi struktur lawan (banyak FVG/OB berlawanan), bersiap untuk pergerakan choppy. Lebih baik scalp pada setup LTF daripada hold continuation.",
      "Manfaat klasifikasi: HRLR butuh patience dan manajemen TP berbeda — sering perlu partial exit. LRLR cocok untuk hold posisi penuh sampai target final.",
      "Praktik: setelah identifikasi setup, selalu evaluasi path ke target. Tanya: berapa banyak struktur lawan yang harus dilewati? Jika jawabannya banyak — turunkan posisi atau take profit lebih awal.",
    ],
  },
  {
    match: /(cbdr|central bank dealers range|cbdr range)/i,
    paragraphs: () => [
      "Central Bank Dealers Range (CBDR) adalah range harga yang terbentuk antara jam 20.00 EST (close NY) sampai 24.00 EST. Range ini dipantau oleh dealer central bank yang ‘merapikan’ book mereka sebelum sesi Asia mulai dengan volume penuh.",
      "Pentingnya CBDR: range ini sering menjadi dasar projection untuk pergerakan sesi Asia dan London open. Standard deviation dari CBDR (1x, 2x, 3x ukuran range) sering menjadi target reaksi harga.",
      "Cara plot: tarik garis horizontal pada high dan low antara 20.00–24.00 EST. Ukur jarak antara keduanya — itulah ukuran CBDR. Project ukuran tersebut ke atas dan ke bawah sebagai level standard deviation.",
      "Asian range (07.00–14.00 WIB) sering berada di dalam atau dekat CBDR. Jika Asian range menembus CBDR — sinyal volatilitas tinggi untuk London open.",
      "Aplikasi: setelah London open menyapu Asian range, sering harga melanjutkan ke level 1x atau 2x standard deviation CBDR. Ini menjadi target take profit alami yang sangat objektif.",
      "Combine dengan setup ICT lain: CBDR + sweep + CHoCH + kill zone = setup intraday dengan RR yang sangat terukur.",
    ],
  },
  {
    match: /(abbreviation|term|glossary|kamus|istilah)/i,
    paragraphs: () => [
      "ICT memperkenalkan banyak singkatan dan istilah yang awalnya membingungkan. Memahami glosarium ini krusial sebelum mendalami konsep — agar penjelasan dan tutorial tidak terasa seperti bahasa asing.",
      "Singkatan struktur: BOS (Break of Structure), CHoCH (Change of Character), MSS (Market Structure Shift), HH/HL/LH/LL (Higher High/Low, Lower High/Low), STH/STL/ITH/ITL/LTH/LTL (Short/Intermediate/Long Term High/Low).",
      "Singkatan zona: OB (Order Block), FVG (Fair Value Gap), IFVG (Implied FVG), BPR (Balanced Price Range), BB (Breaker Block), MB (Mitigation Block), RB (Rejection Block).",
      "Singkatan level: PDH/PDL (Previous Day High/Low), PWH/PWL (Previous Week High/Low), PMH/PML (Previous Month High/Low), NDOG (New Day Opening Gap), NWOG (New Week Opening Gap).",
      "Singkatan sesi: ASIA (Asian session), LO (London Open), NYO (New York Open), CBDR (Central Bank Dealers Range), KZ (Kill Zone), SB (Silver Bullet).",
      "Singkatan konsep: SMT (Smart Money Technique), IPDA (Interbank Price Delivery Algorithm), OTE (Optimal Trade Entry), PD Array (Premium/Discount Array), LRLR (Low Resistance Liquidity Run), HRLR (High Resistance Liquidity Run).",
    ],
  },
  {
    match: /(weekly range|expansion|consolidation|trending week|sideway)/i,
    paragraphs: () => [
      "Weekly range expansion mengacu pada karakter pergerakan mingguan: apakah minggu ini akan ranging (consolidating) atau trending (expanding)? Identifikasi karakter weekly sangat menentukan playbook intraday.",
      "Indikator weekly expansion: 1) Weekly open candle dengan body besar dan close jauh dari open, 2) Sapuan likuiditas mayor di awal minggu (Senin–Selasa), 3) BOS pada daily timeframe yang searah dengan weekly trend.",
      "Indikator weekly consolidation: 1) Body candle kecil dengan banyak wick, 2) Harga ranging di sekitar weekly open, 3) Tidak ada BOS jelas di daily.",
      "Strategi expansion week: cari setup continuation, hold posisi lebih lama, target di weekly high/low projected. RR bisa sampai 5–10:1.",
      "Strategi consolidation week: focus pada scalp dan mean reversion. Avoid hold semalam karena gap risk. Target ringkas — 1–2:1 sudah baik. Banyak whipsaw harus diterima.",
      "Praktik: setiap Senin pagi, evaluasi karakter minggu sebelumnya dan project untuk minggu berjalan. Catat di journal: ‘expected character: expansion/consolidation, reason: ___’.",
    ],
  },
];

const GENERIC_PARAGRAPHS = (heading: string) => [
  `Bagian "${heading}" membahas salah satu komponen penting dalam metodologi ICT/SMC. Pemahaman bagian ini akan memperkuat kemampuan Anda membaca pergerakan smart money pada chart real-time.`,
  "Konsep dasar: pasar bergerak berpindah antara fase akumulasi, manipulasi, dan distribusi. Setiap fase punya tanda visual yang khas — body candle, wick, FVG, dan reaksi pada key level. Memahami pola ini membantu menempatkan entry pada momen optimal dengan RR menguntungkan.",
  "Konteks struktur sangat penting: bagian ini akan terasa lebih masuk akal saat dilihat dari sudut pandang HTF (H4, daily). Selalu mulai analisa top-down — bias HTF dulu, baru turun ke LTF untuk timing.",
  "Praktik berulang adalah kunci. Tandai contoh konsep ini pada minimal 5 chart berbeda (instrumen dan timeframe berbeda), lalu catat pola yang muncul. Konsistensi mengulang akan mempertajam ‘eye’ Anda dalam 2–3 bulan.",
  "Manajemen risiko: berapapun powerful-nya konsep ini, batasi risiko 0.5–1% per trade. Sebaik-baiknya strategi tetap punya losing streak — yang menentukan equity curve adalah konsistensi sizing dan kemampuan tahan losing streak.",
];

type Intent =
  | "definition"
  | "comparison"
  | "identify"
  | "types"
  | "timeframe"
  | "step"
  | "tip"
  | "rule"
  | "example"
  | "bias"
  | "default";

function intentFor(heading: string): Intent {
  const h = heading.toLowerCase().trim();
  if (/^what is|^apa itu|definition|meaning|overview|introduction|introducing/.test(h)) return "definition";
  if (/\bvs\b|versus|compare|difference|perbandingan/.test(h)) return "comparison";
  if (/identify|spot|recognize|cara mengenali|how to find|how to identify/.test(h)) return "identify";
  if (/types?|kinds?|variants|jenis|macam/.test(h)) return "types";
  if (/timeframe|best (tf|chart|time)/.test(h)) return "timeframe";
  if (/how to trade|step by step|step-by-step|tutorial|workflow|cara trade|cara menggunakan/.test(h)) return "step";
  if (/bonus|tip|trick|pro tip/.test(h)) return "tip";
  if (/rule|mistake|avoid|jangan|hindari|do( |s)? and don'?ts/.test(h)) return "rule";
  if (/example|case study|backtest/.test(h)) return "example";
  if (/bias|outlook|forecast/.test(h)) return "bias";
  return "default";
}

function wrapByIntent(heading: string, base: string[], intent: Intent): string[] {
  const intro = (() => {
    switch (intent) {
      case "definition":
        return `Bagian ini menjelaskan definisi dan logika di balik "${heading}". Pahami konsep dasarnya sebelum berlanjut ke teknik aplikasi.`;
      case "comparison":
        return `Bagian "${heading}" membandingkan dua konsep yang sering tertukar. Perbedaannya halus tetapi krusial untuk akurasi setup.`;
      case "identify":
        return `Bagian "${heading}" mengajarkan cara mengidentifikasi pola secara visual di chart. Latih mata Anda dengan multiple contoh sebelum trade live.`;
      case "types":
        return `Bagian "${heading}" memetakan beberapa varian yang umum ditemui. Setiap varian punya karakter dan konteks ideal yang berbeda.`;
      case "timeframe":
        return `Pemilihan timeframe pada "${heading}" sangat menentukan kualitas sinyal. Top-down analysis adalah kunci.`;
      case "step":
        return `Langkah-langkah eksekusi pada "${heading}" — ikuti urutan ini untuk konsistensi setup.`;
      case "tip":
        return `Tip tambahan terkait "${heading}" — gunakan sebagai filter, bukan trigger entry tunggal.`;
      case "rule":
        return `Aturan main pada "${heading}" — dirancang agar Anda menghindari setup berisiko tinggi.`;
      case "example":
        return `Bagian "${heading}" memberi contoh konkret penerapan konsep di chart nyata.`;
      case "bias":
        return `Pada "${heading}", Anda menetapkan arah pandang pasar sebelum sesi berjalan. Bias adalah pondasi semua setup hari itu.`;
      default:
        return "";
    }
  })();
  return intro ? [intro, ...base] : base;
}

function paragraphsFor(heading: string): string[] {
  const intent = intentFor(heading);
  for (const b of TERM_BUCKETS) {
    if (b.match.test(heading)) return wrapByIntent(heading, b.paragraphs(), intent);
  }
  return wrapByIntent(heading, GENERIC_PARAGRAPHS(heading), intent);
}

function buildBlocks(
  scrapedBlocks: Block[],
  fallbackImages: ScrapedImage[],
): ContentBlock[] {
  if (!scrapedBlocks || scrapedBlocks.length === 0) {
    // No structure: synthesize a single ringkasan section + dump images
    const out: ContentBlock[] = [
      {
        type: "heading",
        level: 2,
        text: "Ringkasan",
        paragraphs: GENERIC_PARAGRAPHS("Ringkasan"),
      },
    ];
    for (const im of fallbackImages) {
      out.push({ type: "image", src: im.src, alt: im.alt });
    }
    return out;
  }

  return scrapedBlocks.map<ContentBlock>((b) => {
    if (b.type === "image") return b;
    return {
      type: "heading",
      level: b.level,
      text: b.text,
      paragraphs: paragraphsFor(b.text),
    };
  });
}

export function generateIndonesianSummary(raw: IctArticleRaw): SummaryDoc {
  const intro = `Halaman ini membahas "${raw.title}" dalam Bahasa Indonesia. Setiap bagian di bawah mengikuti urutan pembahasan pada sumber aslinya — penjelasannya ditulis ulang dengan kata-kata sendiri sebagai materi belajar original. Untuk membaca versi lengkap berbahasa Inggris dari penulis aslinya, kunjungi tautan sumber di bagian bawah halaman.`;

  const scraped = raw.structure?.blocks ?? toBlocksFromHeadings(raw.structure?.headings ?? [], raw.structure?.images ?? []);
  const blocks = buildBlocks(scraped, raw.structure?.images ?? []);
  return { intro, blocks, sourceUrl: raw.url };
}

export function generateSmcSummary(raw: SmcRaw): SummaryDoc {
  const intro = `Smart Money Concepts (SMC) adalah pendekatan analisa teknikal yang berfokus pada cara institusi memindahkan harga. Halaman ini menyajikan ringkasan setiap topik dalam Bahasa Indonesia dengan struktur yang sama persis seperti sumber aslinya, namun dijelaskan ulang menggunakan kata-kata sendiri sebagai materi belajar original.`;

  const scraped = raw.structure?.blocks ?? toBlocksFromHeadings(raw.structure?.headings ?? [], raw.structure?.images ?? []);
  const blocks = buildBlocks(scraped, raw.structure?.images ?? []);
  return { intro, blocks, sourceUrl: raw.url };
}

function toBlocksFromHeadings(
  headings: { level: number; text: string }[],
  images: ScrapedImage[],
): Block[] {
  const out: Block[] = [];
  headings.forEach((h, i) => {
    out.push({ type: "heading", level: h.level, text: h.text });
    if (images[i]) out.push({ type: "image", src: images[i].src, alt: images[i].alt });
  });
  // Append any remaining images
  for (let j = headings.length; j < images.length; j++) {
    out.push({ type: "image", src: images[j].src, alt: images[j].alt });
  }
  return out;
}
