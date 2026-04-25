// Data yang diambil dari Seeder PHP sebelumnya
export const mqData = [
    { id: 1, chapter: 'Chapter 1', name_en: 'Colon Leaf', name_id: 'Daun Colon', jumlah: 'x5' },
    { id: 2, chapter: 'Chapter 1', name_en: 'Hard Dragon Skin', name_id: 'Sisik Naga Keras', jumlah: 'x2' },
    { id: 3, chapter: 'Chapter 1', name_en: 'Lamb Meat', name_id: 'Daging Domba', jumlah: 'x1' },
    { id: 4, chapter: 'Chapter 1', name_en: 'Fairy Feather', name_id: 'Sayap Peri', jumlah: 'x3' },
    { id: 5, chapter: 'Chapter 1', name_en: 'Thick Beak', name_id: 'Paruh Tebal', jumlah: 'x3' },
    { id: 6, chapter: 'Chapter 1', name_en: 'Vine', name_id: 'Sulur', jumlah: 'x3' },
    { id: 7, chapter: 'Chapter 2', name_en: 'Swordsman Stone Coin', name_id: 'Koin Batu Ksatria', jumlah: 'x20' },
    { id: 8, chapter: 'Chapter 3', name_en: 'Sand Mole Meat', name_id: 'Daging Tikus Pasir', jumlah: 'x1' },
    { id: 9, chapter: 'Chapter 3', name_en: 'Beast Claw', name_id: 'Cakar Binatang Buas', jumlah: 'x5' },
    { id: 10, chapter: 'Chapter 3', name_en: 'Sand Frog Skin', name_id: 'Kulit Kodok Pasir', jumlah: 'x5' },
    { id: 11, chapter: 'Chapter 3', name_en: 'Jagged Fang', name_id: 'Taring Bergerigi', jumlah: 'x10' },
    { id: 12, chapter: 'Chapter 3', name_en: 'Saham Crystal', name_id: 'Kristal Saham', jumlah: 'x5' },
    { id: 13, chapter: 'Chapter 3', name_en: 'Spiritual Gemstone', name_id: 'Permata Jiwa', jumlah: 'x1' },
    { id: 14, chapter: 'Chapter 8', name_en: 'Rokoko Grape', name_id: 'Anggur Rokoko', jumlah: 'x5' },
    { id: 15, chapter: 'Chapter 9', name_en: 'Labilans Wood', name_id: 'Kayu Labilans', jumlah: 'x10' },
    { id: 16, chapter: 'Chapter 11', name_en: 'Broken Horn', name_id: 'Tanduk Patah', jumlah: 'x20' },
    { id: 17, chapter: 'Chapter 12', name_en: 'Jabali Stone', name_id: 'Batu Jabali', jumlah: 'x5' },
    { id: 18, chapter: 'Chapter 12', name_en: 'Growing Ore', name_id: 'Biji Berkembang', jumlah: 'x5' },
    { id: 19, chapter: 'Chapter 14', name_en: 'Slimy Thick Skin', name_id: 'Kulit Tebal Berlendir', jumlah: 'x20' },
    { id: 20, chapter: 'Chapter 14', name_en: 'Tangled Roots', name_id: 'Akar Melilit', jumlah: 'x10' },
    { id: 21, chapter: 'Chapter 14', name_en: 'Menabra Wood', name_id: 'Kayu Menabra', jumlah: 'x10' },
    { id: 22, chapter: 'Chapter 15', name_en: 'Stagnant Fertilizer', name_id: 'Pupuk Keruh', jumlah: 'x10' },
];

// --- HELPER FUNCTIONS ---

export const TOTAL_ITEMS = mqData.length;

// Mengambil daftar chapter unik untuk dropdown filter
export const getAllChapters = () => {
    return [...new Set(mqData.map(m => m.chapter))].sort((a, b) => {
        // Sortir berdasarkan nomor chapter (Chapter 1, Chapter 2, dst)
        return parseInt(a.replace('Chapter ', '')) - parseInt(b.replace('Chapter ', ''));
    });
}

// Fungsi Pencarian berdasarkan Nama Item (EN/ID) atau Chapter
export function searchMQ(keyword) {
    const key = keyword.toLowerCase();
    return mqData.filter(m =>
        (m.name_id && m.name_id.toLowerCase().includes(key)) ||
        (m.name_en && m.name_en.toLowerCase().includes(key)) ||
        (m.chapter && m.chapter.toLowerCase().includes(key))
    );
}

// Fungsi Filter berdasarkan Chapter
export function filterByChapter(chapterName) {
    if (!chapterName || chapterName === 'Semua Chapter') return mqData;
    return mqData.filter(m => m.chapter === chapterName);
}

// Fungsi Paginasi (disesuaikan agar format return sama dengan template Laravel/Inertia Anda)
export function paginateMQ(dataList = mqData, page = 1, perPage = 10) {
    const total = dataList.length;
    const limit = perPage === 'all' ? total : parseInt(perPage);
    const start = (page - 1) * limit;
    const paginatedData = dataList.slice(start, start + limit);

    return {
        data: paginatedData,
        total: total,
        current_page: page,
        per_page: limit,
        last_page: Math.ceil(total / limit),
        from: start + 1
    };
}

export const mqMaterials = {
    "1.5 - The Dragon's Den": [
        { name: "Colon Leaf", amount: 5, source: "Colon — Land under development" },
        { name: "Hard Dragon Skin", amount: 2, source: "Piedra — Reug salt plains wanderers camp" },
        { name: "Lamb Meat", amount: 1, source: "Wooly — Reug salt plains wanderers camp" }
    ],
    "1.8 - Purification Incense": [
        { name: "Fairy Feather", amount: 3, source: "Roar — Ruined temple area 2/3" },
        { name: "Thick Beak", amount: 3, source: "Beak — Ruined temple area 1" },
        { name: "Vine", amount: 3, source: "Pain Leaf — Isthmus Of Kaus" }
    ],
    "2.13 - Trials in the Palace": [
        { name: "Swordsman Stone Coin", amount: 20, source: "Sword marionette - New moon place" }
    ],
    "3.18 - The Invincible... Enemy??": [
        { name: "Sand Mole Meat", amount: 1, source: "Sand mole - Centerio highlands" },
        { name: "Beast Claw", amount: 3, source: "Foxiger - Centerio highlands" },
        { name: "Sand Frog Skin", amount: 5, source: "Sand frosch - Centerio highlands" }
    ],
    "3.21 - Fate of the Fortress": [
        { name: "Jagged Fang", amount: 10, source: "Gob roga - Saham underground cave area 2" },
        { name: "Saham Crystal", amount: 5, source: "Rotta nemico - Saham underground cave area 1" },
        { name: "Spiritual Gemstone", amount: 1, source: "Cassy - Ancient empress's tomb area 2/3" }
    ],
    "8.62 - The Ruins of the Gods": [
        { name: "Rokoko Grape", amount: 5, source: "Kijimu - Rokoko plains" }
    ],
    "9.73 - Front Line Base Operation": [
        { name: "Labilans Wood", amount: 10, source: "Toretta - Labilans Sector area 1/2" }
    ],
    "11.89 - The Strolling Forest": [
        { name: "Broken Horn", amount: 20, source: "Rhinoceros - Fugitive Lake Swamp area 1/2/3" }
    ],
    "12.102 - Ark Repair": [
        { name: "Growing Ore", amount: 5, source: "Petraceras - Kabla jabali | Orictoceras - Kabla jabali" },
        { name: "Jabali Stone", amount: 5, source: "Gemare - Kabla jabali" }
    ],
    "14.119 - Fierce Battle with Mutant Lixis": [
        { name: "Slimy Thick Skin", amount: 20, source: "Romyzon - Lahan Basah Latum" },
        { name: "Tangled Roots", amount: 10, source: "Lileaf - Perdida Wasteland | Wiltileaf - Eumano Village Ruins area 2" },
        { name: "Menabra Wood", amount: 10, source: "Delphi - Menabra Plains" }
    ],
    "15.124 - The Young Man and the Old Tree": [
        { name: "Stagnant Fertilizer", amount: 10, source: "Solvay - Rode Zaag Range" }
    ]
};

export const getAllMaterials = () => {
    return Object.keys(mqMaterials).sort((a, b) => {
        const chapterA = parseFloat(a.split(' ')[0]);
        const chapterB = parseFloat(b.split(' ')[0]);
        return chapterA - chapterB;
    });
};