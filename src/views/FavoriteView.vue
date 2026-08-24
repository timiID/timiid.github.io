<template>
  <div class="min-h-screen pt-24 pb-20 px-4">
    <!-- Tombol Back -->
    <div class="max-w-4xl mx-auto mb-6 animate-fade-in">
      <button @click="$router.push('/')" class="group inline-flex items-center gap-3 transition-all hover:-translate-x-2">
        <div class="w-10 h-10 rounded-full border-2 border-cyan-500/50 flex items-center justify-center group-hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <svg class="w-5 h-5 text-cyan-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="3"/></svg>
        </div>
        <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 group-hover:text-cyan-500">Back</span>
      </button>
    </div>

    <!-- Filter Pencarian & Dropdown Kategori -->
    <div v-if="favoriteXtalls.length > 0" class="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      <div class="relative group">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-cyan-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search in Favorite Xtall..." 
          class="w-full pl-12 pr-6 py-4 rounded-2xl border-2 outline-none font-bold text-sm transition-all shadow-lg backdrop-blur-sm bg-white/80 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-500 dark:bg-slate-900/40 dark:border-white/5 dark:text-white dark:placeholder-slate-600 dark:focus:border-cyan-500/30"
        >
      </div>

      <div class="relative">
        <select 
          v-model="selectedType" 
          class="w-full px-6 py-4 rounded-2xl border-2 outline-none font-bold text-sm cursor-pointer appearance-none transition-all shadow-lg backdrop-blur-sm bg-white/80 border-slate-200 text-slate-700 focus:border-purple-500 dark:bg-slate-900/40 dark:border-white/5 dark:text-slate-300 dark:focus:border-purple-500/30"
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
        <span class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors text-purple-400 dark:text-purple-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" /></svg>
        </span>
      </div>
    </div>

    <!-- List Item Card -->
    <div class="max-w-4xl mx-auto">
      <div v-if="paginatedXtalls.length > 0" class="flex flex-col gap-8 animate-slide-up">
        <div v-for="(xtall, index) in paginatedXtalls" :key="xtall.code" class="relative group">
          <XtallCard 
            :xtall="xtall"
            :idx="index"
            :isDark="isDark"
            :isFavorite="true"
            :hideFavorite="true"
            @toggle-favorite="confirmRemove(xtall)"
            :iconPath="getIconPath(xtall)" 
            :badgeColorClass="getBadgeColor(xtall.type)"
            :baseXtall="findBase(xtall)"
            :evoXtalls="findEvos(xtall.code)"
          >
            <!-- PERBAIKAN: Fungsi klik diubah memicu modal konfirmasi -->
            <button 
              @click.stop="confirmRemove(xtall)" 
              class="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-3 rounded-2xl bg-red-500 border border-red-500/50 text-white hover:bg-red-600 transition-all shadow-2xl active:scale-90"
              title="Hapus dari Favorit"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
              </svg>
            </button>
          </XtallCard>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 md:gap-3 py-10 flex-wrap">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1"
            :class="['w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border-2 transition-all disabled:opacity-20 shadow-lg', isDark ? 'border-white/10 bg-slate-900/50 text-indigo-400' : 'border-slate-100 bg-white text-indigo-500']"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div class="flex items-center gap-1.5 md:gap-2">
            <template v-for="(page, index) in displayedPages" :key="index">
              <button
                v-if="page !== '...'"
                @click="currentPage = page"
                :class="['w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 font-black text-sm md:text-lg relative', currentPage === page ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_25px_rgba(79,70,229,0.6)] scale-110 z-10' : (isDark ? 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-indigo-500/50' : 'bg-white border-slate-100 text-slate-600 shadow-sm hover:border-indigo-400')]"
              >
                {{ page }}
                <div v-if="currentPage === page" class="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full"></div>
              </button>
              <span v-else :class="['w-6 md:w-8 text-center font-black tracking-widest opacity-40', isDark ? 'text-slate-500' : 'text-slate-400']">...</span>
            </template>
          </div>

          <button 
            @click="currentPage++" 
            :disabled="currentPage === totalPages"
            :class="['w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border-2 transition-all disabled:opacity-20 shadow-lg', isDark ? 'border-white/10 bg-slate-900/50 text-indigo-400' : 'border-slate-100 bg-white text-indigo-500']"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <!-- Kondisi Data Kosong -->
      <div v-else class="py-32 flex flex-col items-center justify-center text-center animate-fade-in">
        <div v-if="favoriteXtalls.length > 0" class="flex flex-col items-center">
           <h3 class="text-2xl font-black text-white/20 italic uppercase tracking-tighter mb-4">Xtall Not Found 🕵🏻</h3>
           <button @click="resetFilters" class="px-8 py-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 font-bold rounded-xl hover:bg-cyan-500 hover:text-white transition-all shadow-lg">Reset Filter</button>
        </div>
        <div v-else class="flex flex-col items-center">
          <h3 :class="['text-2xl font-black italic uppercase tracking-tighter mb-4 transition-colors duration-500', isDark ? 'text-white/20' : 'text-slate-900/30']">No Crysta Saved</h3>
          <button @click="$router.push('/xtall')" :class="['px-10 py-4 font-[1000] italic uppercase text-xs rounded-full transition-all duration-300 shadow-xl active:scale-95', isDark ? 'bg-white text-black hover:bg-rose-500 hover:text-white' : 'bg-slate-900 text-white hover:bg-rose-500 shadow-rose-500/20']">Browse Database</button>
        </div>
      </div>
      </div>

    <!-- MODAL POP-UP DI TENGAH LAYAR (VIEWPORT) -->
    <Teleport to="body">
      <div v-if="xtallToRemove" class="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        <!-- Backdrop Gelap Mengunci Seluruh Layar (Fixed & Full) -->
        <div class="fixed inset-0 bg-black/70 backdrop-blur-md" @click="xtallToRemove = null"></div>
        
        <!-- Konten Box Dialog -->
<div :class="[
  'relative w-full max-w-sm rounded-3xl border-2 p-6 shadow-2xl transform transition-all scale-100 animate-fade-in z-10 overflow-hidden',
  isDark ? 'bg-slate-950 text-white shadow-black/80' : 'bg-white text-slate-900'
]">
  
  <!-- LAYER KHUSUS BACKGROUND (Hanya gambar ini yang opacity-nya berubah) -->
  <div class="absolute inset-0 pointer-events-none z-0"
    :style="{
      backgroundImage: 'url(/images/logo.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      opacity: isDark ? '0.25' : '0.15'
    }">
  </div>

  <!-- BUNGKUSAN KONTEN UTAMA (Diberi z-10 agar berada di atas gambar background) -->
  <div class="relative z-10 flex flex-col h-full justify-between">
    <div class="text-center">
      <div class="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
      <h4 class="text-lg font-black uppercase tracking-tight mb-1">Remove Favorite?</h4>
      <p :class="['text-xs font-medium px-2 mb-6 leading-relaxed', isDark ? 'text-slate-400' : 'text-slate-500']">
        Are you sure you want to remove <span class="font-extrabold text-red-500">{{ xtallToRemove?.name }}</span> from your favorites list?
      </p>
    </div>

    <!-- Tombol Pilihan -->
    <div class="grid grid-cols-2 gap-3">
      <button 
        @click="xtallToRemove = null"
        :class="[
          'py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 border',
          isDark ? 'bg-slate-900 border-white/5 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
        ]"
      >
        Cancel
      </button>
      <button 
        @click="executeRemove"
        class="py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-red-500/20"
      >
        Yes, Remove
      </button>
    </div>
  </div>

</div>
      </div>
    </Teleport>
    <Teleport to="body">
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-if="notification.show"
      :class="[
        'fixed top-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md z-[9999] px-6 py-3 rounded-2xl shadow-2xl border flex items-center gap-3',
        notification.type === 'add'
          ? (isDark ? 'bg-green-700 border-green-500/50 text-slate-200' : 'bg-green-100 border-green-400 text-slate-900')
          : (isDark ? 'bg-red-700/80 border-red-500/50 text-slate-200' : 'bg-red-100 border-red-400 text-slate-900')
      ]">

      <!-- Ikon gambar: sukses = my c20.png, gagal/hapus = my34.png -->
      <img
        :src="notification.type === 'add' ? '/images/my c20.png' : '/images/my34.png'"
        :alt="notification.type === 'add' ? 'sukses' : 'hapus'"
        class="w-8 h-8 object-contain flex-shrink-0"
      />

      <p class="font-bold text-sm tracking-wide">{{ notification.message }}</p>
    </div>
  </transition>
</Teleport>

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
const isMobile = ref(false);
const xtallToRemove = ref(null); 
const notification = ref({ show: false, message: '', type: 'remove' });

// --- UTILS FUNCTION ---
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

  if (!isUpgrade) {
    if (type.includes('SENJATA') || type.includes('WEAPON')) return iconMap.WEAPON;
    if (type.includes('ZIRAH') || type.includes('ARMOR')) return iconMap.ARMOR;
    if (type.includes('PELENGKAP') || type.includes('ADDITIONAL')) return iconMap.ADDITIONAL;
    if (type.includes('TAMBAHAN') || type.includes('SPECIAL')) return iconMap.SPECIAL;
    return iconMap.NORMAL;
  }

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
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    res = res.filter(c => c.name.toLowerCase().includes(q));
  }
  if (selectedType.value) {
    res = res.filter(c => {
      const type = c.type?.toUpperCase() || '';
      const filter = selectedType.value;
      const isItemUpgrade = type.includes('UPGRADE') || type.includes('ENHANCER') || type.includes(' UP');
      const isFilterUpgrade = filter.endsWith('_UP');
      if (isItemUpgrade !== isFilterUpgrade) return false;
      const itemCategory = findRootType(c);
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

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  range.push(1);
  for (let i = current - delta; i <= current + delta; i++) {
    if (i > 1 && i < total) range.push(i);
  }
  if (total > 1) range.push(total);

  for (let i of range) {
    if (l) {
      if (i - l === 2) rangeWithDots.push(l + 1);
      else if (i - l !== 1) rangeWithDots.push('...');
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
});

// --- ACTIONS ---
const loadFavs = () => {
  const favIds = JSON.parse(localStorage.getItem('xtall_favs') || '[]');
  favoriteXtalls.value = crystalData.filter(c => favIds.includes(String(c.code)));
};

const showNotification = (msg, type = 'remove') => {
  notification.value = { show: true, message: msg, type };
  setTimeout(() => { notification.value.show = false; }, 4000);
};

const confirmRemove = (xtall) => {
  xtallToRemove.value = xtall;
};

const executeRemove = () => {
  if (!xtallToRemove.value) return;
  
  const removedName = xtallToRemove.value.name;
  let favs = JSON.parse(localStorage.getItem('xtall_favs') || '[]');
  favs = favs.filter(id => id !== String(xtallToRemove.value.code));
  localStorage.setItem('xtall_favs', JSON.stringify(favs));
  
  loadFavs();
  
  // Panggil toast di sini dengan nama item asli
  showNotification(`${removedName} has been removed from favorites!`, 'remove');
  
  xtallToRemove.value = null; 
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