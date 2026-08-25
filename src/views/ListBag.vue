<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { bags } from '@/data/bags'; 
import idFlag from '@/assets/id.png';
import enFlag from '@/assets/en.png';

const props = defineProps(['isDark']);

const isSlotOpen = ref(false);
const slotDropdownRef = ref(null);

const closeSlotOnOutside = (e) => {
  if (slotDropdownRef.value && !slotDropdownRef.value.contains(e.target)) {
    isSlotOpen.value = false;
  }
};

onMounted(() => { document.addEventListener('click', closeSlotOnOutside); });
onUnmounted(() => { document.removeEventListener('click', closeSlotOnOutside); });

const getMaterialIcon = (bahan) => {
  const map = {
    'Wood': 'kayu.png', 'Cloth': 'kain.png', 'Metal': 'logam.png',
    'Mana': 'mana.png', 'Beast': 'fauna.png', 'Medic': 'obat.png',
    'Stone': 'logam.png', 'Spina': 'spina.png', 'S': 'spina.png'
  };
  const fileName = map[bahan] || 'fauna.png';
  return new URL(`/src/assets/jenis-bahan-toram/${fileName}`, import.meta.url).href;
};

const lang = ref('en');

const translations = {
  id: {
    title: "DAFTAR TAS", subtitle: "EKSPANSI",
    searchLabel: "Cari Item", searchPlaceholders: ["Cari nama item...", "Cari monster...", "Cari lokasi map..."],
    catLabel: "Kategori", slotLabel: "Lompat ke Slot",
    allClass: "Semua Kelas", allSlot: "Semua Slot",
    exploreBtn: "Lihat Semua", collapseBtn: "Sembunyikan Data",
    stats: { all: 'SEMUA ITEM', res: 'HASIL', boss: 'BOSS', slot: 'SLOTS' },
    table: { slot: 'Slot', name: 'Nama Item', need: 'Total Butuh', cost: 'Biaya Spina', src: 'Sumber', type: 'Tipe', loc: 'Lokasi' },
    mobile: { need: 'Butuh', cost: 'Biaya', drop: 'Drop Dari:', map: 'Peta:' }
  },
  en: {
    title: "BAG LIST", subtitle: "EXPANSION",
    searchLabel: "Search Item", searchPlaceholders: ["Find items...", "Find monsters...", "Find maps..."],
    catLabel: "Category", slotLabel: "Jump to Slot",
    allClass: "All Class", allSlot: "All Slot",
    exploreBtn: "Show All", collapseBtn: "Collapse to 10 Rows",
    stats: { all: 'ALL ITEM', res: 'RESULTS', boss: 'BOSS', slot: 'SLOTS' },
    table: { slot: 'Slot', name: 'Item Name', need: 'Total Need', cost: 'Spina Cost', src: 'Source', type: 'Type', loc: 'Location' },
    mobile: { need: 'Need', cost: 'Cost', drop: 'Drop From:', map: 'Map:' }
  }
};

const t = computed(() => translations[lang.value]);

// --- ANIMASI KETIKAN PLACEHOLDER ---
const currentPlaceholderIndex = ref(0);
const displayedPlaceholder = ref('');
let typingInterval = null;

const startTypingEffect = () => {
  const currentPhrases = t.value.searchPlaceholders;
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  if (typingInterval) clearInterval(typingInterval);

  typingInterval = setInterval(() => {
    const fullText = currentPhrases[phraseIndex];
    if (!isDeleting) {
      displayedPlaceholder.value = fullText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === fullText.length) {
        setTimeout(() => { isDeleting = true; }, 1500);
      }
    } else {
      displayedPlaceholder.value = fullText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % currentPhrases.length;
      }
    }
  }, 100);
};

onMounted(() => { startTypingEffect(); });
watch(lang, () => { startTypingEffect(); });

const search = ref('');
const selectedKelas = ref('All Class');
const selectedSlot = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const toggleShowAll = () => {
  if (itemsPerPage.value === 10) {
    itemsPerPage.value = filteredItems.value.length || 10;
  } else {
    itemsPerPage.value = 10;
  }
  currentPage.value = 1;
};

const formatQty = (qty) => {
  if (!qty || qty === '-') return '-';
  let clean = qty.toString().replace(/x/gi, '').trim();
  return (clean === '0' || clean === '') ? '-' : clean;
};

const filteredItems = computed(() => {
  let results = bags.filter(item => {
    const s = search.value.toLowerCase();
    const itemKelas = item.kelas_mob || '';

    const nameInLang = lang.value === 'id' ? (item.nama_item_id || item.nama_item_en) : (item.nama_item_en || item.nama_item_id);
    const locInLang = lang.value === 'id' ? (item.lokasi_id || item.lokasi_en) : (item.lokasi_en || item.lokasi_id);
    const monsterInLang = lang.value === 'id' ? (item.monster_id || item.monster_en) : (item.monster_en || item.monster_id);

    const matchesSearch = !search.value || (
      nameInLang?.toLowerCase().includes(s) ||
      monsterInLang?.toLowerCase().includes(s) ||
      locInLang?.toLowerCase().includes(s)
    );

    let matchesKelas = true;
    if (selectedKelas.value !== 'All Class') {
      if (selectedKelas.value === 'Mob') matchesKelas = (itemKelas === 'Mob' || itemKelas === 'Miniboss/Mob');
      else if (selectedKelas.value === 'Miniboss') matchesKelas = (itemKelas === 'Miniboss' || itemKelas === 'Miniboss/Mob');
      else matchesKelas = itemKelas === selectedKelas.value;
    }

    const matchesSlot = selectedSlot.value.length === 0 || selectedSlot.value.includes(String(item.slot));
    return matchesSearch && matchesKelas && matchesSlot;
  });

  return results.sort((a, b) => {
    const valA = parseInt(String(a.slot).match(/\d+/)) || 0;
    const valB = parseInt(String(b.slot).match(/\d+/)) || 0;
    return valA - valB;
  });
});

watch([search, selectedKelas, selectedSlot, lang], () => { currentPage.value = 1; });

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage.value) || 1);

const displayedPages = computed(() => {
  const total = totalPages.value; const current = currentPage.value;
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, '...', total];
  if (current >= total - 2) return [1, '...', total - 2, total - 1, total];
  return [1, '...', current, '...', total];
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredItems.value.slice(start, start + itemsPerPage.value);
});

const uniqueSlots = computed(() => {
  const slots = [...new Set(bags.map(i => i.slot))];
  return slots.sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0));
});

const stats = computed(() => [
  { label: t.value.stats.all, val: bags.length, grad: 'from-blue-700 to-blue-500', icon: '📦' },
  { label: t.value.stats.res, val: filteredItems.value.length, grad: 'from-fuchsia-600 to-purple-600', icon: '🔍' },
  { label: t.value.stats.boss, val: bags.filter(i => i.kelas_mob === 'Boss').length, grad: 'from-orange-600 to-red-600', icon: '💀' },
  { label: t.value.stats.slot, val: uniqueSlots.value.length, grad: 'from-lime-500 to-emerald-600', icon: '🎒' }
]);

const getBadgeClass = (kelas) => {
  const base = "px-3 py-1 rounded-lg text-[10px] font-black uppercase border-2 inline-flex items-center justify-center min-w-[85px] ";
  if (kelas === 'Mob') return base + "bg-green-500/10 text-green-500 border-green-500/50";
  if (kelas === 'Miniboss/Mob') return base + "bg-indigo-500/10 text-indigo-500 border-indigo-500/50";
  if (kelas === 'Miniboss') return base + "bg-purple-500/10 text-purple-500 border-purple-500/50";
  if (kelas === 'Boss') return base + "bg-red-500/10 text-red-500 border-red-500/50";
  if (kelas === 'Spina') return base + "bg-amber-500/10 text-amber-500 border-amber-500/50";
  return base + "bg-emerald-500/10 text-emerald-500 border-emerald-500/50";
};
</script>

<template>
  <div :class="['bg-transparent py-0 px-2 md:px-4 font-sans relative z-10 transition-all duration-500', isDark ? 'text-white' : 'text-slate-900']">

    <!-- LANGUAGE SELECTOR -->
    <div class="max-w-7xl mx-auto flex justify-end mb-2 sticky top-0 z-50">
      <div class="flex flex-col items-end gap-1 pt-2">
        <span class="text-[10px] font-[1000] tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 uppercase text-right w-full opacity-90 pr-1">
          SELECT LANGUAGE
        </span>
        <div class="inline-flex p-1 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
          <button v-for="l in ['id', 'en']" :key="l" @click="lang = l"
            :class="['px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all duration-300 flex items-center gap-2',
            lang === l ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-blue-500 hover:bg-white/5']">
            <img :src="l === 'id' ? idFlag : enFlag" class="w-4 h-3 object-cover rounded-sm shadow-sm" alt="flag" />
            <span>{{ l === 'id' ? 'INDO' : 'ENG' }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto space-y-3 md:space-y-6">

      <!-- HERO BANNER -->
      <div :class="['relative p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border-[3px] overflow-hidden backdrop-blur-2xl transition-all duration-700 shadow-xl flex flex-row items-center justify-between gap-4',
        isDark ? 'border-blue-500 bg-black/40' : 'border-blue-600 bg-white/60 shadow-blue-200']">
        <div class="relative z-10 text-left flex-1">
          <h2 :class="['text-2xl md:text-6xl font-black italic uppercase leading-none tracking-tighter', isDark ? 'text-white' : 'text-slate-900']">
            {{ t.title }}<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">{{ t.subtitle }}</span>
          </h2>
          <div class="flex items-center justify-start gap-2 mt-4">
            <div class="h-1 w-10 bg-blue-600 rounded-full"></div>
            <img src="/images/logo.png" width="40" height="40" class="h-5 md:h-10 w-auto object-contain" />
            <span class="font-[1000] italic uppercase text-lg md:text-3xl">TIMI <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">DB</span></span>
          </div>
        </div>
        <img src="/images/Bag-Toram.png" class="block h-20 w-20 sm:h-28 sm:w-28 md:h-40 md:w-40 object-contain z-10 flex-shrink-0" alt="Bag Toram" />
      </div>

      <!-- STATS -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        <div v-for="(s, i) in stats" :key="i"
          :class="['relative p-3 md:p-5 rounded-[1.2rem] border-[2px] shadow-lg transition-all bg-gradient-to-br text-white overflow-hidden', s.grad]">
          <div class="absolute -right-2 -bottom-2 text-4xl opacity-20 transform -rotate-12">{{ s.icon }}</div>
          <div class="text-[7px] md:text-[9px] font-black opacity-80 uppercase tracking-tighter">{{ s.label }}</div>
          <div class="text-lg md:text-4xl font-black italic">{{ s.val }}</div>
        </div>
      </div>

      <!-- FILTER -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">

        <!-- SEARCH DENGAN ANIMASI KETIKAN -->
        <div class="relative">
          <label class="text-[8px] font-black uppercase ml-3 mb-0.5 block text-indigo-500 tracking-widest">{{ t.searchLabel }}</label>
          <div class="relative">
            <input v-model="search" type="text" :placeholder="displayedPlaceholder + '|'"
              :class="['w-full h-10 pl-10 pr-4 rounded-xl border-[2px] font-bold text-xs outline-none transition-all',
              isDark ? 'bg-white/5 border-white/10 text-white focus:border-indigo-500 placeholder:text-indigo-300/40' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600 placeholder:text-slate-400']" />
            <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none scale-75">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
        </div>

        <!-- KATEGORI -->
        <div class="relative">
          <label class="text-[8px] font-black uppercase ml-3 mb-0.5 block text-indigo-500 tracking-widest">{{ t.catLabel }}</label>
          <div class="relative">
            <select v-model="selectedKelas"
              :class="['w-full h-10 pl-10 pr-10 rounded-xl border-[2px] font-bold text-xs outline-none appearance-none cursor-pointer transition-all',
              isDark ? 'bg-slate-900 border-white/10 text-white focus:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-600']">
              <option value="All Class">{{ t.allClass }}</option>
              <option v-for="opt in ['Mob', 'Miniboss', 'Boss', 'Spina']" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none scale-75">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            </div>
            <div class="absolute right-3.5 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <!-- JUMP TO SLOT -->
        <div class="relative">
          <label class="text-[8px] font-black uppercase ml-3 mb-0.5 block text-indigo-500 tracking-widest">{{ t.slotLabel }}</label>
          <div class="relative" ref="slotDropdownRef">
            <button type="button" @click="isSlotOpen = !isSlotOpen"
              :class="['w-full h-10 px-4 rounded-xl border-[2px] font-bold text-xs text-left flex items-center gap-2 transition-all',
                isDark ? 'bg-slate-900 border-white/10 text-white hover:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 hover:border-indigo-600']">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-500 flex-shrink-0">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span class="flex-1 truncate" :class="selectedSlot.length === 0 ? 'opacity-40' : ''">
                {{ selectedSlot.length === 0 ? t.allSlot : selectedSlot.map(s => 'Slot ' + s).join(', ') }}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                class="text-indigo-500 opacity-60 flex-shrink-0 transition-transform duration-200"
                :class="isSlotOpen ? 'rotate-180' : ''">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            <div v-if="isSlotOpen"
              :class="['absolute top-full left-0 mt-1 w-full rounded-xl border-[2px] shadow-2xl z-50 p-2 grid grid-cols-3 gap-2 max-h-48 overflow-y-auto',
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200']">
              <button v-if="selectedSlot.length > 0" @click="selectedSlot = []"
                class="col-span-full w-full mt-1 py-1 rounded-lg text-[9px] font-black uppercase border bg-red-500 text-white hover:bg-red-700 transition-colors">
                ✕ Reset
              </button>
              <label v-for="s in uniqueSlots" :key="s" class="cursor-pointer">
                <input type="checkbox" :value="String(s)" v-model="selectedSlot" class="hidden" />
                <span :class="[
                  'px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border transition-all select-none block text-center',
                  selectedSlot.includes(String(s))
                    ? 'bg-indigo-600 border-indigo-400 text-white'
                    : (isDark
                        ? 'bg-white/5 border-white/10 text-slate-400 hover:border-indigo-500 hover:text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-500 hover:border-indigo-400 hover:text-slate-900')
                ]">
                  {{ s }}
                </span>
              </label>
            </div>
          </div>
        </div>

      </div>

      <!-- TABLE -->
      <div :class="['border-[2px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-xl transition-all', isDark ? 'border-lime-400 bg-black/60' : 'border-lime-500 bg-white/80']">

        <!-- DESKTOP -->
        <div class="hidden lg:block overflow-x-auto no-scrollbar">
          <table class="w-full border-collapse">
            <thead>
              <tr :class="['uppercase text-[9px] font-[1000] tracking-wider border-b-[2px]', isDark ? 'bg-white/5 text-lime-400 border-lime-500/30' : 'bg-slate-50 text-lime-700 border-lime-200']">
                <th :class="['p-4 w-[5%] text-center border-r', isDark ? 'border-white/10' : 'border-slate-200']">{{ t.table.slot }}</th>
                <th :class="['p-4 w-[20%] text-left border-r', isDark ? 'border-white/10' : 'border-slate-200']">{{ t.table.name }}</th>
                <th :class="['p-4 w-[10%] text-center border-r', isDark ? 'border-white/10' : 'border-slate-200']">{{ t.table.need }}</th>
                <th :class="['p-4 w-[15%] text-center border-r', isDark ? 'border-white/10' : 'border-slate-200']">{{ t.table.cost }}</th>
                <th :class="['p-4 w-[15%] text-left border-r', isDark ? 'border-white/10' : 'border-slate-200']">{{ t.table.src }}</th>
                <th :class="['p-4 w-[10%] text-center border-r', isDark ? 'border-white/10' : 'border-slate-200']">{{ t.table.type }}</th>
                <th class="p-4 w-[25%] text-left">{{ t.table.loc }}</th>
              </tr>
            </thead>
            <tbody :class="['divide-y-[1px]', isDark ? 'divide-white/10' : 'divide-slate-200']">
              <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-indigo-500/5 transition-all group">
                <td :class="['p-4 text-center font-black text-blue-500 italic text-2xl border-r', isDark ? 'border-white/10' : 'border-slate-200']">{{ item.slot }}</td>
                <td :class="['p-4 border-r', isDark ? 'border-white/10' : 'border-slate-200']">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden shadow-inner">
                      <img :src="getMaterialIcon(item.kelas_bahan)" class="w-7 h-7 object-contain transform group-hover:scale-110 transition-transform" :alt="item.kelas_bahan" />
                    </div>
                    <span class="font-black uppercase text-sm">{{ lang === 'id' ? (item.nama_item_id || item.nama_item_en) : (item.nama_item_en || item.nama_item_id) }}</span>
                  </div>
                </td>
                <td :class="['p-4 text-center bg-black/5 border-r font-black italic text-lime-600 text-3xl', isDark ? 'border-white/10' : 'border-slate-200']">{{ formatQty(item.jumlah) }}</td>
                <td :class="['p-4 text-center font-black text-lg text-amber-600 border-r', isDark ? 'border-white/10' : 'border-slate-200']">
                  {{ item.spina > 0 ? Number(item.spina).toLocaleString() : '-' }}
                </td>
                <td :class="['p-4 border-r', isDark ? 'border-white/10' : 'border-slate-200']">
                  <span class="text-[10px] font-bold uppercase opacity-80">{{ lang === 'id' ? (item.monster_id || item.monster_en || '-') : (item.monster_en || item.monster_id || '-') }}</span>
                </td>
                <td :class="['p-4 text-center border-r', isDark ? 'border-white/10' : 'border-slate-200']">
                  <span :class="getBadgeClass(item.kelas_mob)">{{ item.kelas_mob }}</span>
                </td>
                <td class="p-4">
                  <span class="font-black text-xs italic text-blue-600 uppercase tracking-tight">{{ lang === 'id' ? (item.lokasi_id || item.lokasi_en) : (item.lokasi_en || item.lokasi_id) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- MOBILE -->
        <div class="lg:hidden divide-y-[2px] divide-slate-200/10">
          <div v-for="item in paginatedItems" :key="item.id" class="p-4 space-y-3">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-black px-2 py-0.5 bg-blue-500 text-white rounded-md">
                  {{ t.table.slot.toUpperCase() }} {{ item.slot }}
                </span>
                <span :class="getBadgeClass(item.kelas_mob)" class="!min-w-fit !px-2 !py-0.5 !text-[8px]">{{ item.kelas_mob }}</span>
              </div>
              <div class="text-amber-600 font-black text-[10px] uppercase">
                {{ t.mobile.cost }}: {{ item.spina > 0 ? Number(item.spina).toLocaleString() : '-' }}
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-lg">
                <img :src="getMaterialIcon(item.kelas_bahan)" class="w-8 h-8 object-contain" :alt="item.kelas_bahan" />
              </div>
              <div>
                <h3 class="font-black uppercase text-base leading-tight tracking-tight">
                  {{ lang === 'id' ? (item.nama_item_id || item.nama_item_en) : (item.nama_item_en || item.nama_item_id) }}
                </h3>
                <p class="text-[10px] font-bold text-blue-500 mt-1 uppercase">
                  {{ lang === 'id' ? (item.lokasi_id || item.lokasi_en) : (item.lokasi_en || item.lokasi_id) }}
                </p>
              </div>
            </div>
            <div :class="['grid grid-cols-2 gap-2 border-[2px] p-3 rounded-2xl', isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50']">
              <div class="flex flex-col justify-center border-r border-dashed border-slate-400/20 pr-2">
                <span class="text-[9px] font-black text-lime-600 uppercase">{{ t.mobile.need }}</span>
                <span class="text-3xl font-black italic text-lime-600">{{ formatQty(item.jumlah) }}</span>
              </div>
              <div class="pl-2 flex flex-col justify-center">
                <span class="text-[8px] font-black opacity-50 uppercase block mb-0.5">{{ t.mobile.drop }}</span>
                <span class="text-[10px] font-bold uppercase leading-tight line-clamp-2">
                  {{ lang === 'id' ? (item.monster_id || item.monster_en || '-') : (item.monster_en || item.monster_id || '-') }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- PAGINATION -->
      <div class="flex flex-col gap-4 justify-center items-center pb-10">
        <div v-if="totalPages > 1" class="flex flex-wrap justify-center items-center gap-1">
          <button @click="currentPage--" :disabled="currentPage === 1"
            class="h-9 w-9 rounded-lg border-2 font-black border-blue-600 text-xs disabled:opacity-20 hover:bg-blue-600 hover:text-white transition-all">&lt;</button>
          <button v-for="p in displayedPages" :key="p" @click="typeof p === 'number' ? currentPage = p : null"
            :class="['h-9 w-9 rounded-lg border-2 font-black transition-all text-xs', p === currentPage ? 'bg-blue-600 text-white shadow-md' : 'text-blue-600 border-blue-100 hover:border-blue-600']">
            {{ p }}
          </button>
          <button @click="currentPage++" :disabled="currentPage === totalPages"
            class="h-9 w-9 rounded-lg border-2 font-black border-blue-600 text-xs disabled:opacity-20 hover:bg-blue-600 hover:text-white transition-all">&gt;</button>
        </div>
        <button @click="toggleShowAll" class="group relative h-12 px-12 rounded-2xl border-b-4 border-indigo-800 bg-indigo-600 text-white font-black uppercase italic text-[11px] tracking-widest hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all shadow-xl">
          <span class="relative z-10">{{ itemsPerPage === 10 ? t.exploreBtn : t.collapseBtn }}</span>
          <div class="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-xl"></div>
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
select option { background-color: inherit; color: inherit; }
.group:hover .w-10 { box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
</style>