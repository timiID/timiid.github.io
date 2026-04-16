<template>
  <div class="min-h-screen pt-24 pb-20 px-4">
    <button @click="$router.push('/')" class="group flex items-center gap-3 mb-10 transition-all hover:-translate-x-2">
      <div class="w-10 h-10 rounded-full border-2 border-cyan-500/50 flex items-center justify-center group-hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        <svg class="w-5 h-5 text-cyan-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="3"/></svg>
      </div>
      <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 group-hover:text-cyan-500">Back</span>
    </button>

    <div class="max-w-4xl mx-auto mb-12 animate-fade-in">
      <h1 class="text-4xl md:text-6xl font-[1000] italic uppercase tracking-tighter text-yellow">
        MY <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">FAVORITES</span>
      </h1>
      <p class="text-xs font-black uppercase tracking-[0.4em] opacity-40 mt-2">Saved Xtall Collection</p>
    </div>

    <div v-if="favoriteXtalls.length > 0" class="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      <div class="relative group">
  <span class="absolute left-4 top-1/2 -translate-y-1/2 
               text-cyan-500/50 group-focus-within:text-cyan-500 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </span>

  <input 
    v-model="searchQuery" 
    type="text" 
    placeholder="Search in Favorite Xtall..." 
    class="w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none font-bold text-sm transition-all shadow-lg backdrop-blur-sm
           /* Light Mode (Default) */
           bg-white/80 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-500
           /* Dark Mode */
           dark:bg-slate-900/40 dark:border-white/5 dark:text-white dark:placeholder-slate-600 dark:focus:border-cyan-500/30"
  >
</div>

      <div class="relative">
  <select 
    v-model="selectedType" 
    class="w-full px-6 py-4 rounded-2xl border-2 outline-none font-bold text-sm cursor-pointer appearance-none transition-all shadow-lg backdrop-blur-sm
           /* Light Mode */
           bg-white/80 border-slate-200 text-slate-700 focus:border-purple-500
           /* Dark Mode */
           dark:bg-slate-900/40 dark:border-white/5 dark:text-slate-300 dark:focus:border-purple-500/30"
  >
    <option value="" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">All Crystas</option>
    <option value="ADDITIONAL" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">Additional Crystas</option>
    <option value="ADDITIONAL_UP" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">Additional Enhancer Crystas</option>
    <option value="ARMOR" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">Armor Crystas</option>
    <option value="ARMOR_UP" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">Armor Enhancer Crystas</option>
    <option value="NORMAL" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">Normal Crystas</option>
    <option value="NORMAL_UP" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">Normal Enhancer Crystas</option>
    <option value="SPECIAL" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">Special Crystas</option>
    <option value="SPECIAL_UP" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">Special Enhancer Crystas</option>
    <option value="WEAPON" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">Weapon Crystas</option>
    <option value="WEAPON_UP" class="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">Weapon Enhancer Crystas</option>
  </select>

        <span class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors
               text-purple-400 dark:text-purple-500">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" /></svg>
        </span>
      </div>
    </div>

    <div class="max-w-4xl mx-auto">
      <div v-if="paginatedXtalls.length > 0" class="flex flex-col gap-8 animate-slide-up">
        
        <div v-for="(xtall, index) in paginatedXtalls" :key="xtall.code" class="relative group">
          <XtallCard 
            :xtall="xtall"
            :idx="index"
            :isDark="isDark"
            :iconPath="getIconPath(xtall)" 
            :badgeColorClass="getBadgeColor(xtall.type)"
            :baseXtall="findBase(xtall)"
            :evoXtalls="findEvos(xtall.code)"
          />

          <button @click.stop="removeFav(xtall.code)" 
        class="absolute -top-1 -right-7 z-50 p-3 rounded-2xl bg-red-500 border border-red-500/50 text-white hover:bg-red-600 transition-all shadow-2xl active:scale-90">
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
    <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
  </svg>
</button>
</div>
      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 md:gap-3 mt-12 mb-10">
    
    <button 
      @click="setPage(currentPage - 1)" 
      :disabled="currentPage === 1"
      class="w-12 h-12 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center disabled:opacity-10 disabled:cursor-not-allowed group shadow-sm"
      :class="isDark 
        ? 'border-white/10 bg-slate-900/40 hover:border-blue-500/50' 
        : 'border-slate-200 bg-white hover:border-blue-400 hover:shadow-md'"
    >
      <span 
        class="text-xl font-black transition-colors"
        :class="isDark ? 'text-slate-500 group-hover:text-blue-400' : 'text-slate-400 group-hover:text-blue-600'"
      >
        &lt;
      </span>
    </button>

    <div class="flex gap-2">
      <button 
        v-for="page in visiblePages" 
        :key="page"
        @click="setPage(page)"
        class="w-12 h-12 rounded-2xl font-black transition-all duration-300 flex items-center justify-center border-2 text-lg shadow-sm"
        :class="[
          currentPage === page 
            ? (isDark 
                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-110 z-10' 
                : 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110 z-10')
            : (isDark 
                ? 'bg-slate-900/60 border-white/5 text-blue-400/60 hover:border-white/20 hover:text-blue-400' 
                : 'bg-white border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600')
        ]"
      >
        {{ page }}
      </button>
    </div>

    <button 
      @click="setPage(currentPage + 1)" 
      :disabled="currentPage === totalPages"
      class="w-12 h-12 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center disabled:opacity-10 disabled:cursor-not-allowed group shadow-sm"
      :class="isDark 
        ? 'border-white/10 bg-slate-900/40 hover:border-blue-500/50' 
        : 'border-slate-200 bg-white hover:border-blue-400 hover:shadow-md'"
    >
      <span 
        class="text-xl font-black transition-colors"
        :class="isDark ? 'text-blue-400 group-hover:text-white' : 'text-blue-600 group-hover:text-blue-800'"
      >
        &gt;
      </span>
    </button>
    
  </div>
      </div>

      <div v-else class="py-40 text-center animate-fade-in">
        <div v-if="favoriteXtalls.length > 0">
           <h3 class="text-2xl font-black text-white/20 italic uppercase tracking-tighter">Xtall Not Found🕵🏻</h3>
           <button @click="resetFilters" class="mt-6 px-8 py-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 font-bold rounded-xl hover:bg-cyan-500 hover:text-white transition-all">
            Reset Filter
          </button>
        </div>
        <div v-else class="py-40 text-center animate-fade-in">
  <h3 :class="[
    'text-2xl font-black italic uppercase tracking-tighter transition-colors duration-500',
    isDark ? 'text-white/20' : 'text-slate-900/30'
  ]">
    No Crysta Saved
  </h3>

  <button @click="$router.push('/xtall')" 
          :class="[
            'mt-6 px-10 py-4 font-[1000] italic uppercase text-xs rounded-full transition-all duration-300 shadow-xl active:scale-95',
            isDark 
              ? 'bg-white text-black hover:bg-rose-500 hover:text-white' 
              : 'bg-slate-900 text-white hover:bg-rose-500 shadow-rose-500/20'
          ]">
    Browse Database
  </button>
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { crystalData } from '@/data/store.js';
import XtallCard from '@/components/XtallCard.vue';

// --- ASSETS ---
import normalCrystas from "@/assets/icons/crysta_normal.jpg";
import weaponCrystas from "@/assets/icons/crysta_senjata.jpg";
import armorCrystas from "@/assets/icons/crysta_zirah.jpg";
import additionalCrystas from "@/assets/icons/crysta_pelengkap.jpg";
import specialCrystas from "@/assets/icons/crysta_tambahan.jpg";
import normalEnhancerCrystas from "@/assets/icons/crysta_up.jpg"; 
import weaponEnhancerCrystas from "@/assets/icons/enhance_weapon_crysta.png";
import armorEnhancerCrystas from "@/assets/icons/enhance_armor_crysta.png";
import additionalEnhancerCrystas from "@/assets/icons/enhance_additional_crysta.png";
import specialEnhancerCrystas from "@/assets/icons/enhace_special_crysta.png";

const iconMap = {
  NORMAL: normalCrystas, NORMAL_UPGRADE: normalEnhancerCrystas,
  ADDITIONAL: additionalCrystas, ADDITIONAL_UPGRADE: additionalEnhancerCrystas,
  ARMOR: armorCrystas, ARMOR_UPGRADE: armorEnhancerCrystas,
  WEAPON: weaponCrystas, WEAPON_UPGRADE: weaponEnhancerCrystas,
  SPECIAL: specialCrystas, SPECIAL_UPGRADE: specialEnhancerCrystas,
};

// --- STATE ---
const isDark = ref(true);
const currentPage = ref(1);
const itemsPerPage = 6;
const favoriteXtalls = ref([]);
const searchQuery = ref('');
const selectedType = ref('');

// --- LOGIC: ICON & CATEGORY ---
const findRootItem = (item) => {
  if (!item) return null;
  let current = item;
  let safety = 0;
  while ((current.link || current.code_base) && safety < 10) {
    const parentCode = current.link || current.code_base;
    const parent = crystalData.find(c => String(c.code) === String(parentCode));
    if (!parent) break;
    current = parent;
    safety++;
  }
  return current;
};

const findRootType = (item) => {
  const root = findRootItem(item);
  const type = root?.type?.toUpperCase() || 'NORMAL';
  if (type.includes('SENJATA') || type.includes('WEAPON')) return 'WEAPON';
  if (type.includes('ZIRAH') || type.includes('ARMOR')) return 'ARMOR';
  if (type.includes('PELENGKAP') || type.includes('ADDITIONAL')) return 'ADDITIONAL';
  if (type.includes('TAMBAHAN') || type.includes('SPECIAL')) return 'SPECIAL';
  return 'NORMAL';
};

const getIconPath = (xtall) => {
  if (!xtall) return iconMap.NORMAL;
  
  const type = xtall.type?.toUpperCase() || '';
  const isUpgrade = type.includes('UPGRADE') || type.includes('ENHANCER') || type.includes(' UP');

  // --- LOGIK UNTUK KRISTAL BIASA (BUKAN UPGRADE) ---
  if (!isUpgrade) {
    // Cek Senjata
    if (type.includes('SENJATA') || type.includes('WEAPON')) return iconMap.WEAPON;
    // Cek Zirah/Armor
    if (type.includes('ZIRAH') || type.includes('ARMOR')) return iconMap.ARMOR;
    // Cek Pelengkap/Additional
    if (type.includes('PELENGKAP') || type.includes('ADDITIONAL')) return iconMap.ADDITIONAL;
    // Cek Tambahan/Special
    if (type.includes('TAMBAHAN') || type.includes('SPECIAL')) return iconMap.SPECIAL;
    
    // Default jika tidak cocok ke kategori di atas
    return iconMap.NORMAL;
  }

  // --- LOGIK UNTUK KRISTAL UPGRADE ---
  const rootType = findRootType(xtall);
  return iconMap[`${rootType}_UPGRADE`] || iconMap.NORMAL_UPGRADE;
};

const getBadgeColor = (typeStr) => {
  if (!typeStr) return 'bg-gray-500/10 text-gray-400';
  const type = typeStr.toUpperCase();
  const isUpgrade = type.includes('UPGRADE') || type.includes('ENHANCER') || type.includes(' UP');
  return isDark.value
    ? (isUpgrade ? 'bg-orange-500/20 ring-orange-500/50 text-orange-400' : 'bg-cyan-500/10 ring-cyan-500/30 text-cyan-400')
    : (isUpgrade ? 'bg-orange-100 ring-orange-400 text-orange-700' : 'bg-cyan-100 ring-cyan-400 text-cyan-700');
};

// --- LOGIC: FILTERING & PAGINATION ---
const filteredFavs = computed(() => {
  let res = favoriteXtalls.value;
  
  // 1. Filter Search
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    res = res.filter(c => c.name.toLowerCase().includes(q));
  }

  // 2. Filter Dropdown
  if (selectedType.value) {
    res = res.filter(c => {
      const type = c.type?.toUpperCase() || '';
      const filter = selectedType.value; // Contoh: 'WEAPON_UP' atau 'WEAPON'
      
      const isItemUpgrade = type.includes('UPGRADE') || type.includes('ENHANCER') || type.includes(' UP');
      const isFilterUpgrade = filter.endsWith('_UP');
      
      if (isItemUpgrade !== isFilterUpgrade) return false;

      const itemCategory = findRootType(c); // Mengembalikan 'WEAPON', 'ARMOR', dll.
      const filterCategory = filter.replace('_UP', '');

      return itemCategory === filterCategory;
    });
  }
  
  return res;
});

const totalPages = computed(() => Math.ceil(filteredFavs.value.length / itemsPerPage) || 1);

const paginatedXtalls = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredFavs.value.slice(start, start + itemsPerPage);
});

const visiblePages = computed(() => {
  const range = [];
  const delta = 2;
  for (let i = Math.max(1, currentPage.value - delta); i <= Math.min(totalPages.value, currentPage.value + delta); i++) {
    range.push(i);
  }
  return range;
});

// --- ACTIONS ---
const loadFavs = () => {
  const favIds = JSON.parse(localStorage.getItem('xtall_favs') || '[]');
  favoriteXtalls.value = crystalData.filter(c => favIds.includes(String(c.code)));
};

const removeFav = (code) => {
  let favs = JSON.parse(localStorage.getItem('xtall_favs') || '[]');
  favs = favs.filter(id => id !== String(code));
  localStorage.setItem('xtall_favs', JSON.stringify(favs));
  loadFavs();
};

const setPage = (p) => { 
  if (p >= 1 && p <= totalPages.value) {
    currentPage.value = p; 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const resetFilters = () => { searchQuery.value = ''; selectedType.value = ''; currentPage.value = 1; };

const findBase = (xtall) => {
  const parentCode = xtall.link || xtall.code_base;
  return parentCode ? crystalData.find(c => String(c.code) === String(parentCode)) : null;
};

const findEvos = (currentCode) => crystalData.filter(c => String(c.link) === String(currentCode) || String(c.code_base) === String(currentCode));

const checkTheme = () => { isDark.value = document.documentElement.classList.contains('dark'); };

// --- WATCHERS ---
watch([searchQuery, selectedType], () => { currentPage.value = 1; });
watch(favoriteXtalls, () => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) currentPage.value = totalPages.value;
});

onMounted(() => {
  loadFavs();
  checkTheme();
  const observer = new MutationObserver(checkTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});
</script>