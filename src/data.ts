import { Question, PeerReview } from './types';

export const questionsData: Question[] = [
  {
    id: 1,
    question: "1. Akil tidak sengaja menyentuh cerek air yang sangat panas dan secara spontan tangannya ditarik dalam sekelip mata. Bahagian manakah dalam sistem saraf yang mengawal tindakan refleks pantas ini?",
    options: [
      { text: "Otak, kerana dia perlu sedar dan memikirkan bahaya cerek yang panas.", correct: false },
      { text: "Saraf Tunjang, bagi memendekkan laluan isyarat untuk melindungi diri.", correct: true },
      { text: "Saraf Periferi sahaja, kerana otot bertindak balas secara langsung tanpa pusat kawalan.", correct: false },
      { text: "Saraf Kranium, kerana cerek panas dikesan terus oleh neuron di kepala.", correct: false }
    ],
    feedback: {
      correct: "Tepat sekali! Saraf tunjang mengawal tindakan refleks tanpa perlu menunggu arahan daripada otak. Ini adalah fungsi kritikal sistem saraf untuk mengelakkan kecederaan lebih parah (tindakan pantas demi keselamatan).",
      wrong: "Kurang tepat. Otak ialah organ berfikir, tetapi untuk tindakan kecemasan (refleks), laluan isyarat dipintas terus ke saraf tunjang bagi menjimatkan masa demi keselamatan badan!"
    },
    graphicType: 'reflex'
  },
  {
    id: 2,
    question: "2. Seorang penunggang motosikal mengalami kecederaan parah pada tulang belakangnya akibat kemalangan. Mengapakah doktor menyatakan beliau mungkin lumpuh di bahagian bawah badan?",
    options: [
      { text: "Otot kaki penunggang tersebut rosak sepenuhnya semasa kemalangan berlaku.", correct: false },
      { text: "Saraf tunjang yang membawa mesej dari otak ke bahagian kaki telah terputus atau terjejas.", correct: true },
      { text: "Darah tidak lagi dapat mengalir dari jantung ke bahagian kaki.", correct: false },
      { text: "Otak terlupa cara untuk memberikan isyarat gerak balas kepada kaki.", correct: false }
    ],
    feedback: {
      correct: "Bijak sekali! Saraf tunjang di dalam tulang belakang berfungsi sebagai lebuh raya isyarat utama. Apabila ia cedera parah, isyarat elektrik dari otak terputus dan tidak dapat sampai ke otot kaki, menyebabkan kelumpuhan.",
      wrong: "Cuba fikirkan fungsi saraf tunjang sebagai laluan utama. Jika lebuh raya itu terputus, isyarat koordinasi dari otak tidak dapat sampai ke kaki walaupun otot kaki itu dalam keadaan baik."
    },
    graphicType: 'spinal'
  },
  {
    id: 3,
    question: "3. Mengapakah seseorang yang mengambil minuman beralkohol secara berlebihan dilarang keras untuk memandu kenderaan di jalan raya?",
    options: [
      { text: "Alkohol mempercepatkan tindak balas refleks sehingga pemandu memandu terlalu laju.", correct: false },
      { text: "Alkohol melambatkan penghantaran maklumat dan isyarat di dalam sistem saraf pemandu.", correct: true },
      { text: "Alkohol meningkatkan kebolehan mata untuk melihat dalam keadaan gelap.", correct: false },
      { text: "Alkohol merosakkan saraf tunjang secara kekal dalam masa satu jam.", correct: false }
    ],
    feedback: {
      correct: "Hebat! Alkohol merupakan bahan perencat yang mengganggu dan melambatkan penghantaran impuls dalam sistem saraf pusat. Pemandu lambat menekan brek apabila melihat halangan, meningkatkan risiko kemalangan.",
      wrong: "Salah tu. Alkohol mengganggu fungsi otak dengan melambatkan pemprosesan isyarat dan refleks otot pemandu. Ini menyebabkan kadar tindak balas fizikal menjadi sangat lambat!"
    },
    graphicType: 'alcohol'
  },
  {
    id: 4,
    question: "4. Semasa perlawanan bola tampar, Mei Ling melihat bola datang laju ke arah mukanya lalu dia sempat mengelak. Antara berikut, manakah laluan isyarat sistem saraf yang betul dalam situasi ini?",
    options: [
      { text: "Mata ➡️ Saraf Periferi ➡️ Otak ➡️ Saraf Periferi ➡️ Otot Muka & Leher", correct: true },
      { text: "Otot ➡️ Otak ➡️ Saraf Periferi ➡️ Mata untuk melihat semula", correct: false },
      { text: "Otak ➡️ Saraf Tunjang ➡️ Saraf Periferi ➡️ Bola Tampar", correct: false },
      { text: "Mata ➡️ Saraf Tunjang ➡️ Otot tanpa melibatkan otak sama sekali", correct: false }
    ],
    feedback: {
      correct: "Tepat! Mata bertindak sebagai organ deria yang menghantar isyarat melalui saraf periferi ke otak. Otak mentafsir bahaya bola, lalu menghantar arahan balas melalui saraf periferi ke otot untuk mengelak.",
      wrong: "Ingat urutan asas tindakan terkawal: Organ deria (mata) mengesan rangsangan ➔ Saraf menghantar ke Otak (pusat analisis) ➔ Saraf menghantar arahan ke Otot untuk bertindak!"
    },
    graphicType: 'pathway'
  },
  {
    id: 5,
    question: "5. Mengapakah murid dinasihatkan supaya tidur sekurang-kurangnya 8 jam sehari sebelum menduduki peperiksaan penting di sekolah?",
    options: [
      { text: "Saraf periferi bertukar menjadi lebih tebal dan kuat semasa tidur lama.", correct: false },
      { text: "Tidur yang cukup memberi peluang kepada otak untuk berehat, mengoptimumkan memori dan pemikiran.", correct: true },
      { text: "Tidur lama mengelakkan tindakan refleks berlaku semasa menulis jawapan.", correct: false },
      { text: "Supaya otot tangan tidak mengantuk ketika memegang pensel.", correct: false }
    ],
    feedback: {
      correct: "Luar biasa! Semasa tidur, otak menyusun maklumat yang dipelajari (konsolidasi memori) dan memulihkan sel-sel saraf. Kurang tidur melemahkan kognitif dan melambatkan keupayaan berfikir secara logik.",
      wrong: "Jawapan anda kurang tepat. Otak kita memerlukan rehat yang cukup untuk menyusun semula maklumat lama dan membina sel-sel memori yang kuat sebelum kita boleh menjawab soalan peperiksaan dengan tenang."
    },
    graphicType: 'sleep'
  },
  {
    id: 6,
    question: "6. Pak Cik Samad diserang penyakit strok (angin ahmar) yang menyebabkan kerosakan sebahagian tisu otak kiri beliau. Apakah kesan yang biasanya berlaku pada bahagian fizikal badan beliau?",
    options: [
      { text: "Anggota badan sebelah kanan beliau akan mengalami kelemahan atau kelumpuhan.", correct: true },
      { text: "Anggota badan sebelah kiri beliau akan terjejas manakala bahagian kanan normal.", correct: false },
      { text: "Beliau tidak boleh bernafas sama sekali secara serta merta.", correct: false },
      { text: "Beliau akan kehilangan daya pendengaran kedua-dua belah telinga sahaja.", correct: false }
    ],
    feedback: {
      correct: "Tepat! Koordinasi sistem saraf pusat kita bersilang: Hemisfera otak sebelah kiri mengawal otot dan pergerakan badan di sebelah kanan, manakala otak sebelah kanan mengawal badan sebelah kiri. Oleh itu, kerosakan otak kiri melemahkan fizikal kanan.",
      wrong: "Kurang tepat. Otak kita mempunyai struktur kawalan silang. Otak kiri mengawal bahagian kanan badan, manakala otak kanan mengawal bahagian kiri badan!"
    },
    graphicType: 'stroke'
  }
];

export const initialPeerReviews: PeerReview[] = [
  {
    id: 'rev-1',
    reviewerName: 'Cikgu Sarah binti Ahmad',
    reviewerRole: 'Guru Sains Tahun 6 / Guru Cemerlang',
    ratingEngagement: 5,
    ratingEnhancement: 5,
    ratingExtension: 4,
    comments: 'Tahniah! Reka bentuk visual yang sangat menarik dan mesra kanak-kanak. Elemen 8-bit sound menambahkan keterlibatan (Engagement) murid secara aktif. Sangat bagus untuk kegunaan set induksi dan pentaksiran formatif!',
    timestamp: '2026-07-01 10:15 AM'
  },
  {
    id: 'rev-2',
    reviewerName: 'Dr. Hazim bin Rosli',
    reviewerRole: 'Pensyarah Pendidikan Sains IPG',
    ratingEngagement: 4,
    ratingEnhancement: 5,
    ratingExtension: 5,
    comments: 'Justifikasi pedagogi yang kukuh. Penggunaan visualisasi grafik interaktif dalam setiap soalan membantu memperjelaskan konsep laluan isyarat sistem saraf (Enhancement). Ini memenuhi tuntutan Pembelajaran Bermakna KPPB.',
    timestamp: '2026-07-02 02:40 PM'
  }
];
