<template>
  <div :class="['relative font-sans transition-all duration-700 bg-transparent', isDark ? 'text-slate-200' : 'text-slate-900']">
    
    <div class="fixed inset-0 pointer-events-none z-0">
      <div :class="['absolute inset-0 bg-[url(\'/images/logo.png\')] bg-center bg-no-repeat bg-[length:60%_auto] opacity-[0.03] transition-opacity duration-1000', isDark ? 'brightness-200' : 'invert opacity-[0.02]']"></div>
      <div v-if="isDark" class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
      <div v-if="isDark" class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <div class="relative z-10 max-w-[1700px] mx-auto p-4 md:p-10 space-y-0 overflow-visible">
      
      <header :class="['relative group flex flex-col md:flex-row justify-between items-center md:items-end gap-8 pb-10 border-b-2 transition-all duration-500', isDark ? 'border-white/5' : 'border-black/5']">
        <div class="flex items-center gap-1">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <img src="/images/logo.png" width="64" height="64" class="relative h-16 w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110" alt="Logo" />
          </div>
          <div class="text-center md:text-left space-y-1">
            <div class="flex items-center gap-3">
              <h1 class="text-4xl md:text-6xl font-[800] italic uppercase tracking-tighter leading-none transition-all">
                <span :class="isDark ? 'text-white' : 'text-slate-900'">TIMI </span>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">DB</span>
              </h1>
              <div class="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[8px] font-black text-blue-500 tracking-widest uppercase">Bahasa Indonesia</div>
            </div>
            <p :class="['text-xs font-black uppercase tracking-[0.5em] opacity-60', isDark ? 'text-slate-400' : 'text-slate-500']">Toram Online Database</p>
          </div>
        </div>
        <div class="flex flex-col items-center md:items-end gap-3">
          <div :class="['group relative px-8 py-3 rounded-2xl border-2 overflow-hidden transition-all duration-500', isDark ? 'bg-slate-900/40 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50']">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span :class="['relative text-xs font-black uppercase tracking-[0.2em]', isDark ? 'text-cyan-400' : 'text-blue-600']">Hasil : {{ filteredResults.length }} Xtall</span>
          </div>
        </div>
      </header>

      <section class="py-8">
        <div :class="['p-6 md:p-8 rounded-[2rem] border-2 backdrop-blur-xl transition-all duration-500', isDark ? 'bg-slate-900/40 border-white/5 shadow-2xl' : 'bg-white/60 border-slate-200 shadow-lg']">
          <h2 class="text-xl md:text-2xl font-black uppercase tracking-tight italic">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Crysta (Xtall) Bahasa Indonesia</span>
          </h2>
          <p :class="['mt-2 text-sm md:text-base leading-relaxed font-medium', isDark ? 'text-slate-400' : 'text-slate-600']">
            Selamat datang di halaman Xtall Timi DB. Gunakan fitur pencarian di bawah untuk menemukan xtall yang cocok.
          </p>
        </div>
      </section>

      <RouterLink :to="{ name: 'xtall-advanced', query: { filter: route.query.filter } }" class="my-6 block w-full rounded-2xl border-2 border-indigo-500 bg-gradient-to-t from-indigo-400 to-purple-500 px-6 py-5 text-center text-lg font-black text-white shadow-xl hover:scale-[1.02] transition">
        🔎 Advanced Search
      </RouterLink>

      <section :class="['grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 rounded-[3rem] border-2 backdrop-blur-3xl relative z-[100] transition-all duration-500 shadow-2xl mb-12', 
  isDark ? 'bg-slate-950/60 border-white/10 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-300/50']">
  
  <!-- BARIS 1 KIRI: CARI NAMA -->
  <div class="space-y-3">
    <label class="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-4 flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-cyan-500/40"></span> CARI NAMA
    </label>
    <div ref="searchRef" class="relative group">
      <span class="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-cyan-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input 
  v-model="searchQuery" 
  @keyup.enter="handleEnterSearch" 
  @focus="isHistoryOpen = true" 
  @input="isHistoryOpen = true" 
  type="text" 
  placeholder="Ketik nama xtall..." 
        :class="['w-full pl-14 pr-6 py-4 rounded-2xl border-2 outline-none font-bold text-sm transition-all', 
        isDark ? 'bg-[#0f172a] border-white/5 focus:border-cyan-500 text-white placeholder-slate-600' : 'bg-white border-slate-200 focus:border-cyan-500']">

    

    <div 
      v-if="displayedSearchLogs.length > 0 && isHistoryOpen && !isMobile" 
        class="absolute left-0 right-0 z-20 mt-2 rounded-3xl border-2 shadow-2xl backdrop-blur-xl overflow-hidden"
       :class="isDark ? 'bg-slate-900 border-white/10 shadow-black' : 'bg-white border-slate-200 shadow-slate-200'"
    >

  <div class="px-4 py-3 border-b border-slate-200/20" :class="isDark ? 'border-white/5' : ''">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Riwayat Pencarian</p>
        <p class="text-[11px] text-slate-400 mt-1">
          {{ historyLabel }}
        </p>
      </div>
      <button @click.stop="clearSearchLogs" type="button"
        class="text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
        :class="isDark ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'">
        Hapus semua
      </button>
    </div>
  </div>
  
  <div class="divide-y divide-slate-200/20" :class="isDark ? 'divide-white/5' : 'divide-slate-100'">
    <div v-for="log in displayedSearchLogs" :key="log" 
      class="flex items-center justify-between gap-3 px-4 py-3 transition-colors cursor-pointer"
      :class="isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'" 
      @click="applySearchLog(log)">
      
      <span class="truncate text-sm font-medium" :class="isDark ? 'text-slate-300' : 'text-slate-600'">{{ log }}</span>
      
      <button @click.stop="removeSearchLog(log)" type="button"
        class="text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
        :class="isDark ? 'text-slate-500 hover:text-red-400' : 'text-slate-400 hover:text-red-500'">
        X
      </button>
    </div>
  </div>
</div>
    </div>
  </div>

 <!-- BARIS 1 KANAN: SKALA -->
<div class="space-y-3">
  <label class="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 ml-4">SKALA</label>
  <div class="relative flex items-center">
    <select v-model="itemsPerPage" :class="['w-full px-5 py-4 rounded-2xl border-2 outline-none font-bold text-sm cursor-pointer appearance-none transition-all',
      isDark ? 'bg-[#0f172a] border-white/5 focus:border-purple-500 text-slate-200' : 'bg-white border-slate-200 focus:border-purple-500']">
      <option :value="10">10 Unit</option>
      <option :value="25">25 Unit</option>
      <option :value="50">50 Unit</option>
    </select>
    <!-- Ikon Chevron -->
    <svg xmlns="http://www.w3.org/2000/svg" 
         class="absolute right-5 h-4 w-4 opacity-50 pointer-events-none transition-transform" 
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

  <!-- BARIS 2 KIRI: KATEGORI XTALL -->
  <div class="space-y-3 relative md:col-span-2" ref="typeRef">
    <label class="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 ml-4 flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-green-500/40"></span> KATEGORI XTALL
    </label>
    <button @click="toggleTypeDropdown" :class="['w-full px-5 py-4 rounded-2xl border-2 outline-none font-bold text-sm cursor-pointer transition-all text-left flex items-center justify-between',
      isDark ? 'bg-[#0f172a] border-white/5 focus:border-green-500 text-slate-200' : 'bg-white border-slate-200 focus:border-green-500']">
      
      <span class="truncate">
        <!-- Jika belum ada pilihan -->
        <template v-if="selectedTypes.length === 0">
          <span :class="isDark ? 'text-slate-200' : 'text-slate-900'">Pilih Kategori... </span>
          <span :class="isDark ? 'text-red-200' : 'text-red-400'">(Multi-Select)</span>
        </template>
        
        <!-- Jika sudah ada pilihan -->
        <template v-else>
          {{ selectedTypes.length }} Kategori dipilih
        </template>
      </span>

      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
      </svg>
</button>
    <!-- Dropdown Kategori -->
    <div v-if="isTypeOpen" 
     :class="['absolute top-full left-0 mt-0 w-full rounded-3xl border-2 backdrop-blur-2xl z-[999] shadow-2xl p-4 grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto',
      isDark ? 'bg-slate-900/95 border-white/10' : 'bg-slate-300 border-black-200']">
      
  <button 
    v-for="type in displayTypes" 
    :key="type.value" 
    @click="toggleType(type.value)" 
    :class="[
      'px-3 py-2 text-left rounded-xl border-2 text-xs font-bold transition-all', 
      
      // LOGIKA WARNA BARU
      // 1. KONDISI SAAT DIPILIH (CHECKLIST)
    selectedTypes.includes(type.value) || (type.value === 'ALL' && selectedTypes.length === displayTypes.length - 1)
      ? (type.value === 'ALL' 
          ? 'border-red-600 bg-red-400/55 text-rose-150' 
          : 'border-lime-600 bg-lime-300/50 text-white-400')
      
      // 2. KONDISI SAAT TIDAK DIPILIH (IDLE)
      : (type.value === 'ALL'
          ? (isDark ? 'border-transparent bg-slate-700 text-pink-300' : 'border-transparent bg-slate-100 text-red-700')
          : (isDark ? 'border-transparent bg-slate-800 text-slate-400 hover:bg-slate-700' : 'border-transparent bg-slate-100 text-slate-500 hover:bg-slate-200'))
  ]">
    {{ type.label }}
  </button>
</div>
  </div>

  <!-- BARIS 3 KANAN: URUTAN, APPLY, & RESET -->
<div class="space-y-3 md:col-span-2">
  <label class="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 ml-4 flex items-center gap-2">
    <span class="w-1 h-3 bg-red-600 rounded-full"></span> URUTAN & AKSI
  </label>
  
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
    <div class="col-span-2 md:col-span-2">
      <select v-model="sortOrder" :class="['w-full px-5 py-4 rounded-2xl border-2 font-bold text-sm cursor-pointer transition-all',
        isDark ? 'bg-[#0f172a] border-white/5 focus:border-red-500 text-slate-200' : 'bg-white border-slate-200 focus:border-red-500']">
        <option value="asc">A ke Z</option>
        <option value="desc">Z ke A</option>
      </select>
    </div>

    <button @click="handleResetAll" 
      class="col-span-1 h-[56px] rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black uppercase text-xs tracking-widest active:scale-95 transition-all">
      RESET
    </button>

    <button @click="applyFilters" 
      class="col-span-1 h-[56px] rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-widest active:scale-95 transition-all">
      APPLY
    </button>
  </div>
</div>
</section>

      <main class="space-y-6 relative z-10 pb-20 overflow-visible">
  <XtallCard 
    v-for="(xtall, idx) in paginatedResults" 
    :key="xtall.code"
    :xtall="xtall"
    :idx="idx"
    :isDark="isDark"
    :baseXtall="getBaseFor(xtall)"
    :evoXtalls="getEvoFor(xtall)"
    :iconPath="getIconPath(xtall)"
    :isFavorite="favorites.includes(String(xtall.code))"
    :labelColor="getLabelColor(xtall)"
    :badgeColorClass="getBadgeColor(xtall.type)"
    @set-search="setSearch"
    @toggle-favorite="handleToggleFavorite"
  />
</main>

      <div v-if="paginatedResults.length === 0" class="min-h-[40vh] flex flex-col items-center justify-center p-6 text-center space-y-8 animate-entry">
        <div class="relative group">
          <div class="text-[6rem] md:text-[10rem] font-black opacity-5 italic select-none tracking-tighter leading-none">404</div>
          <div class="absolute inset-0 flex items-center justify-center">
            <img src="/images/what chara.webp" alt="Timi DB Logo" loading="lazy" decoding="async" width="160" height="160" class="w-28 h-28 md:w-40 md:h-40 object-contain drop-shadow-[0_0_30px_rgba(99,102,241,0.6)] animate-float-elegant" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-tight">Hasil Pencarian <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">Tidak Ditemukan</span></h3>
          <p class="text-xs md:text-sm font-black uppercase tracking-[0.4em] opacity-40 italic">Coba ubah kata kunci atau reset filter untuk melihat semua xtall.</p>
        </div>

        <div class="flex gap-3">
          <button @click="handleResetAll" class="px-6 py-3 rounded-full bg-red-600 text-white font-black uppercase text-xs">Reset</button>
          <button @click="$router.push('/')" class="px-6 py-3 rounded-full bg-indigo-600 text-white font-black uppercase text-xs">Kembali</button>
        </div>
      </div>

      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 md:gap-3 py-10 flex-wrap">
  <button 
    @click="currentPage--" 
    :disabled="currentPage === 1"
    :class="['w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border-2 transition-all disabled:opacity-20 shadow-lg',
      isDark ? 'border-white/10 bg-slate-900/50 text-indigo-400' : 'border-slate-100 bg-white text-indigo-500']"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M15 19l-7-7 7-7" /></svg>
  </button>

  <div class="flex items-center gap-1.5 md:gap-2">
    <template v-for="(page, index) in displayedPages" :key="index">
      
      <button
        v-if="page !== '...'"
        @click="currentPage = page"
        :class="['w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 font-black text-sm md:text-lg relative',
          currentPage === page 
            ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_25px_rgba(79,70,229,0.6)] scale-110 z-10' 
            : (isDark 
                ? 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-indigo-500/50' 
                : 'bg-white border-slate-100 text-slate-600 shadow-sm hover:border-indigo-400')]"
      >
        {{ page }}
        <div v-if="currentPage === page" class="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full"></div>
      </button>

      <span 
        v-else 
        :class="['w-6 md:w-8 text-center font-black tracking-widest opacity-40', isDark ? 'text-slate-500' : 'text-slate-400']"
      >
        ...
      </span>
    </template>
  </div>

  <button 
    @click="currentPage++" 
    :disabled="currentPage === totalPages"
    :class="['w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border-2 transition-all disabled:opacity-20 shadow-lg',
      isDark ? 'border-white/10 bg-slate-900/50 text-indigo-400' : 'border-slate-100 bg-white text-indigo-500']"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M9 5l7 7-7 7" /></svg>
  </button>
</div>

    </div>
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
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { crystalData } from '../data/store.js';

// Crysta Biasa
import normalCrystas from "@/assets/icons/crysta_normal.jpg";
import weaponCrystas from "@/assets/icons/crysta_senjata.jpg";
import armorCrystas from "@/assets/icons/crysta_zirah.jpg";
import additionalCrystas from "@/assets/icons/crysta_pelengkap.jpg";
import specialCrystas from "@/assets/icons/crysta_tambahan.jpg";

import XtallCard from '@/components/XtallCard.vue'

// Enhancer (Crysta Upgrade/Up)
import normalEnhancerCrystas from "@/assets/icons/crysta_up.jpg"; 
import weaponEnhancerCrystas from "@/assets/icons/enhance_weapon_crysta.png";
import armorEnhancerCrystas from "@/assets/icons/enhance_armor_crysta.png";
import additionalEnhancerCrystas from "@/assets/icons/enhance_additional_crysta.png";
import specialEnhancerCrystas from "@/assets/icons/enhace_special_crysta.png";
import { parseXtallStats } from '@/utils/parseXtallStats'

const route = useRoute();
const router = useRouter();

/**
 * RECTIVE STATE
 */
const searchQuery = ref('');
const appliedSearchQuery = ref('');
const selectedTypes = ref([]);
const appliedSelectedTypes = ref([]);
const selectedStats = ref([]);

const searchLogs = ref([]);
const searchRef = ref(null);
const isHistoryOpen = ref(false);
const maxStoredLogs = 20;
const maxVisibleLogs = 3;

const isMobile = ref(false);
const isStatusOpen = ref(false);
const isTypeOpen = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const sortOrder = ref('asc');
const statusRef = ref(null);
const typeRef = ref(null);

const notification = ref({ show: false, message: '', type: 'add' });
const favorites = ref(JSON.parse(localStorage.getItem('xtall_favs') || '[]'));

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const showNotification = (msg, type = 'add') => {
  notification.value = { show: true, message: msg, type };
  setTimeout(() => { notification.value.show = false; }, 5000);
};

function handleToggleFavorite(code) {
  const idStr = String(code);
  const idx = favorites.value.indexOf(idStr);
  const xtall = crystalData.find(c => String(c.code) === idStr);
  const name = xtall?.name || 'Xtall';

  if (idx >= 0) {
    favorites.value.splice(idx, 1);
    showNotification('Berhasil dihapus dari favorit!', 'remove');
  } else {
    favorites.value.push(idStr);
    showNotification(`Selamat! ${name} telah disimpan ke favorit.`, 'add');
  }
  localStorage.setItem('xtall_favs', JSON.stringify(favorites.value));
}

// ----------------------------------------------------
// LOGIKA SINKRONISASI URL QUERY PARAMS (FIX UTAMA)
// ----------------------------------------------------
const applyQueryParams = (params) => {
  let nameParam = params?.name ?? '';
  if (Array.isArray(nameParam)) {
    nameParam = nameParam[0] ?? '';
  }
  nameParam = String(nameParam || '');

  if (nameParam) {
    try { 
      nameParam = decodeURIComponent(nameParam.replace(/\+/g, ' ')); 
    } catch (e) {}
    nameParam = nameParam.trim();
  }

  // Setel state tampilan & state filter sekaligus
  searchQuery.value = nameParam;
  appliedSearchQuery.value = nameParam;

  if (params?.types) {
    try {
      const parsedTypes = JSON.parse(String(params.types));
      const validTypes = Array.isArray(parsedTypes) ? parsedTypes : [];
      selectedTypes.value = validTypes;
      appliedSelectedTypes.value = [...validTypes];
    } catch (e) {
      selectedTypes.value = [];
      appliedSelectedTypes.value = [];
    }
  } else {
    selectedTypes.value = [];
    appliedSelectedTypes.value = [];
  }

  currentPage.value = 1;
};

// Waspadai perubahan URL dan jalankan langsung saat komponen di-load
watch(
  () => route.query,
  (newQuery) => {
    applyQueryParams(newQuery);
  },
  { immediate: true, deep: true }
);

const applyFilters = () => {
  appliedSearchQuery.value = searchQuery.value;
  appliedSelectedTypes.value = [...selectedTypes.value];
  currentPage.value = 1;

  const query = {};
  if (appliedSearchQuery.value) query.name = appliedSearchQuery.value;
  if (appliedSelectedTypes.value && appliedSelectedTypes.value.length > 0) {
    query.types = JSON.stringify(appliedSelectedTypes.value);
  }

  router.push({ query }).catch(() => {});
};

const handleEnterSearch = () => {
  const value = searchQuery.value?.trim();
  saveSearchLog(value);
  applyFilters();
  if (document.activeElement) document.activeElement.blur();
  isHistoryOpen.value = false;
};

function handleResetAll() {
  searchQuery.value = '';
  selectedTypes.value = [];
  appliedSearchQuery.value = '';
  appliedSelectedTypes.value = [];
  sortOrder.value = 'asc';
  itemsPerPage.value = 10;
  router.push({ query: {} });
}

// --- LOGIKA RIWAYAT PENCARIAN ---
const historyLabel = computed(() => {
  return searchQuery.value.trim() 
    ? 'Hasil kecocokan' 
    : '3 terbaru dari pencarian Anda.';
});

const loadSearchLogs = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('xtallSearchLogs') || '[]');
    if (Array.isArray(stored)) {
      searchLogs.value = stored.filter(item => typeof item === 'string' && item.trim()).slice(0, maxStoredLogs);
    }
  } catch {
    searchLogs.value = [];
  }
};

const displayedSearchLogs = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return searchLogs.value.slice(0, maxVisibleLogs);
  return searchLogs.value
    .filter(log => log.toLowerCase().includes(q))
    .slice(0, maxVisibleLogs);
});

const saveSearchLog = (query) => {
  const trimmed = query?.trim();
  if (!trimmed) return;
  const filtered = searchLogs.value.filter(log => log.toLowerCase() !== trimmed.toLowerCase());
  filtered.unshift(trimmed);
  searchLogs.value = filtered.slice(0, maxStoredLogs);
  localStorage.setItem('xtallSearchLogs', JSON.stringify(searchLogs.value));
};

const applySearchLog = (value) => {
  searchQuery.value = value;
  saveSearchLog(value);
  applyFilters();
};

const removeSearchLog = (query) => {
  searchLogs.value = searchLogs.value.filter(log => log.toLowerCase() !== query.toLowerCase());
  localStorage.setItem('xtallSearchLogs', JSON.stringify(searchLogs.value));
  if (searchLogs.value.length === 0) isHistoryOpen.value = false;
};

const clearSearchLogs = () => {
  searchLogs.value = [];
  localStorage.removeItem('xtallSearchLogs');
  isHistoryOpen.value = false;
};

// --- STATS & FILTER ENGINE ---
const parsedCache = new Map();
function getParsedStats(xtall) {
  if (!parsedCache.has(xtall.code)) {
    parsedCache.set(xtall.code, parseXtallStats(xtall.view));
  }
  return parsedCache.get(xtall.code);
}

const props = defineProps({
  isDark: { type: Boolean, default: true }
});

const toggleTypeDropdown = () => {
  isTypeOpen.value = !isTypeOpen.value;
  if (isTypeOpen.value) isStatusOpen.value = false;
};

const toggleType = (type) => {
  if (type === 'ALL') {
    if (selectedTypes.value.length === displayTypes.length - 1) {
      selectedTypes.value = [];
    } else {
      selectedTypes.value = displayTypes
        .filter(t => t.value !== 'ALL')
        .map(t => t.value);
    }
  } else {
    const index = selectedTypes.value.indexOf(type);
    if (index === -1) {
      selectedTypes.value.push(type);
    } else {
      selectedTypes.value.splice(index, 1);
    }
  }
};

const displayTypes = [
  { label: 'Semua Kategori', value: 'ALL' },
  { label: 'Weapon Crystas', value: 'WEAPON' },
  { label: 'Weapon Enhancer Crystas', value: 'WEAPON_UPGRADE' },
  { label: 'Armor Crystas', value: 'ARMOR' },
  { label: 'Armor Enhancer Crystas', value: 'ARMOR_UPGRADE' },
  { label: 'Additional Crystas', value: 'ADDITIONAL' },
  { label: 'Additional Enhancer Crystas', value: 'ADDITIONAL_UPGRADE' },
  { label: 'Normal Crystas', value: 'NORMAL' },
  { label: 'Normal Enhancer Crystas', value: 'NORMAL_UPGRADE' },
  { label: 'Special Crystas', value: 'SPECIAL' },
  { label: 'Special Enhancer Crystas', value: 'SPECIAL_UPGRADE' }
];

const iconMap = {
  NORMAL: normalCrystas,
  UPGRADE: normalEnhancerCrystas,
  ADDITIONAL: additionalCrystas,
  ADDITIONAL_UPGRADE: additionalEnhancerCrystas,
  ARMOR: armorCrystas,
  ARMOR_UPGRADE: armorEnhancerCrystas,
  WEAPON: weaponCrystas,
  WEAPON_UPGRADE: weaponEnhancerCrystas,
  SPECIAL: specialCrystas,
  SPECIAL_UPGRADE: specialEnhancerCrystas,
};

const findRootItem = (item) => {
  if (!item) return null;
  let current = item;
  let safety = 0;
  while (current.link && safety < 10) {
    const parent = crystalData.find(c => String(c.code) === String(current.link));
    if (!parent) break;
    current = parent;
    safety++;
  }
  return current;
};

const findRootType = (item) => {
  const root = findRootItem(item);
  return root?.type?.toUpperCase() || 'NORMAL';
};

const getIconPath = (xtall) => {
  const type = xtall.type?.toUpperCase();
  if (type !== 'UPGRADE') {
    return iconMap[type] || normalCrystas;
  }
  const rootType = findRootType(xtall);
  return iconMap[`${rootType}_UPGRADE`] || normalEnhancerCrystas;
};

const getBadgeColor = (type) => {
  const map = { 
    'NORMAL': 'bg-blue-300/50 text-blue-500 border-blue-500/40', 
    'UPGRADE': 'bg-gray-700/50 text-gray-500 border-gray-500/40', 
    'ADDITIONAL': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/40', 
    'WEAPON': 'bg-red-500/20 text-red-500 border-red-500/40', 
    'ARMOR': 'bg-green-500/20 text-green-500 border-green-500/40', 
    'SPECIAL': 'bg-purple-500/20 text-purple-500 border-purple-500/40' 
  };
  return map[type?.toUpperCase()] || 'bg-slate-500/10 text-slate-500 border-slate-500/40';
};

const getBaseFor = (xtall) => {
  if (!xtall.link) return null;
  return crystalData.find(c => String(c.code) === String(xtall.link));
};

const getEvoFor = (xtall) => {
  return crystalData.filter(c => String(c.link) === String(xtall.code));
};

const getLabelColor = (xtall) => {
  if (!xtall) return 'text-cyan-500';
  const type = xtall.type?.toUpperCase();
  if (type === 'UPGRADE' || type === 'ENHANCER') {
    return 'text-gray-400';
  }
  const rootType = findRootType(xtall);
  const map = { 
    WEAPON: 'text-red-500',
    ARMOR: 'text-green-500',
    NORMAL: 'text-sky-500',
    ADDITIONAL: 'text-yellow-500',
    SPECIAL: 'text-purple-500'
  };
  return map[rootType] || 'text-cyan-500';
};

const setSearch = (name) => { 
  searchQuery.value = name; 
  applyFilters();
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
};

const advancedFilter = computed(() => {
  try {
    const f = route.query.filter
    if (!f) return null
    if (typeof f === 'string' && /^[A-Za-z0-9_-]+$/.test(f)) {
      // base64url -> JSON
      try {
        const decoded = fromBase64Url(f)
        return JSON.parse(decoded)
      } catch (e) {
        return null
      }
    }
    return JSON.parse(f)
  } catch {
    return null;
  }
});

function fromBase64Url(str) {
  try {
    let s = str.replace(/-/g, '+').replace(/_/g, '/')
    while (s.length % 4) s += '='
    return decodeURIComponent(escape(atob(s)))
  } catch (e) { return null }
}

/**
 * COMPUTED ENGINE FILTERING
 */
const filteredResults = computed(() => {
  let res = crystalData.filter(c => c.name?.trim());

  // Filter berdasarkan Nama dari Query/Applied Search
  if (appliedSearchQuery.value) {
    const q = appliedSearchQuery.value.toLowerCase();
    res = res.filter(c => c.name.toLowerCase().includes(q));
  }
  
  // Filter berdasarkan Kategori yang di-apply
  if (appliedSelectedTypes.value.length > 0) {
    res = res.filter(c => {
      const rootType = findRootType(c);
      const isUpgrade = c.type === 'UPGRADE';
      return appliedSelectedTypes.value.some(sel => {
        if (!sel.includes('_')) return !isUpgrade && rootType === sel;
        const [base, kind] = sel.split('_');
        return kind === 'UPGRADE' && isUpgrade && rootType === base;
      });
    });
  }

  // Filter tambahan jika datang dari Advanced Search
  if (advancedFilter.value) {
    const { stats, types } = advancedFilter.value;
    if (stats && Object.keys(stats).length > 0) {
      res = res.filter(c => {
        const parsed = getParsedStats(c);
        return Object.entries(stats).every(([statName, rule]) => {
          const stat = parsed[statName.toUpperCase()];
          if (!stat) return false;
          if (stat.sign !== rule.sign) return false;
          if (rule.value !== null) {
            if (rule.op === '>=' && stat.value < rule.value) return false;
            if (rule.op === '<=' && stat.value > rule.value) return false;
          }
          return true;
        });
      });
    }

    if (types && types.length > 0) {
      res = res.filter(c => {
        const rootType = findRootType(c);
        const isUpgrade = c.type === 'UPGRADE';
        return types.some(sel => {
          if (!sel.includes('_')) return !isUpgrade && rootType === sel;
          const [base, kind] = sel.split('_');
          return kind === 'UPGRADE' && isUpgrade && rootType === base;
        });
      });
    }
  }
  
  return res.sort((a, b) => 
    sortOrder.value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
});

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredResults.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() => Math.ceil(filteredResults.value.length / itemsPerPage.value) || 1);

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
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
});

/**
 * LIFECYCLE & UTILITIES
 */
const closeOnOutside = (e) => {
  if (statusRef.value && !statusRef.value.contains(e.target)) isStatusOpen.value = false;
  if (typeRef.value && !typeRef.value.contains(e.target)) isTypeOpen.value = false;
  if (searchRef.value && !searchRef.value.contains(e.target)) isHistoryOpen.value = false;
};

onMounted(() => {
  loadSearchLogs();
  window.addEventListener('click', closeOnOutside);
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('click', closeOnOutside);
  window.removeEventListener('resize', checkMobile);
});

// Watcher skala & urutan saja yang mereset page (selectedTypes tidak lagi mereset page secara sepihak)
watch([itemsPerPage, sortOrder], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
/* PERBAIKAN TOTAL DOUBLE SCROLLBAR */

/* Sembunyikan scrollbar tapi tetap bisa di-scroll */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 2. Pastikan elemen pembungkus TIDAK MEMILIKI overflow yang memicu scrollbar */
div, section, main {
  height: auto !important;
}

/* 3. Pengecualian: Biarkan area 'Next/Previous Upgrade' tetap bisa di-swipe horizontal di Mobile */
/* Tapi kita tetap sembunyikan batang scrollbar-nya agar bersih */
.scroll-hide {
  overflow-x: auto !important;
  display: flex !important;
  -webkit-overflow-scrolling: touch;
}

/* Animasi Entry */
.animate-entry { 
  animation: slide-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
  opacity: 0; 
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); filter: blur(5px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

/* float effect used for error sprite */
.animate-float-elegant {
  animation: floatEffect 4s ease-in-out infinite;
}

@keyframes floatEffect {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(2deg);
  }
  66% {
    transform: translateY(5px) rotate(-2deg);
  }
}

@media (max-width: 640px) {
  .text-\[6rem\] {
    font-size: 5rem;
  }
}
</style>