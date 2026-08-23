<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

import normalCrystas from '@/assets/icons/crysta_normal.jpg';
import weaponCrystas from '@/assets/icons/crysta_senjata.jpg';
import armorCrystas from '@/assets/icons/crysta_zirah.jpg';
import additionalCrystas from '@/assets/icons/crysta_pelengkap.jpg';
import specialCrystas from '@/assets/icons/crysta_tambahan.jpg';
import favoriteCrystaIcon from '@/assets/icons/crysta_favorite.png';
import iconBag from '@/assets/iconfromhome/bag.png';
import iconMq from '@/assets/iconfromhome/mq.png';
import iconMqCalc from '@/assets/iconfromhome/mq_calc.png';
import iconBsCalc from '@/assets/iconfromhome/bs_calc.png';
import iconXtall from '@/assets/iconfromhome/xtall.png';
import iconEvent from '@/assets/iconfromhome/event.png';
import iconLeveling from '@/assets/iconfromhome/lvling.png';
import iconFavorite from '@/assets/iconfromhome/favorite.png';
import iconMats from '@/assets/iconfromhome/farmmats.png';
import iconsearchapi from '@/assets/iconfromhome/what chara39.jpg';
import { crystalData } from '../data/store.js';

const props = defineProps({ isDark: Boolean });
const router = useRouter();
const searchQuery = ref('');
const favoriteXtalls = ref([]);
const backgrounds = ['/images/logo.png', '/images/my77.png', '/images/hanami11.png'];
const currentBgIndex = ref(0);
let homeInterval = null;

const getCrystaTheme = (type) => {
  const lower = type?.toLowerCase() || '';
  if (lower.includes('upgrade')) {
    return {
      bg: 'bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-slate-100 hover:from-yellow-500/25 hover:via-yellow-500/15 hover:to-slate-200 dark:from-yellow-500/20 dark:via-yellow-500/5 dark:to-slate-900/60 dark:hover:from-yellow-500/40 dark:hover:via-yellow-500/20 dark:hover:to-slate-900/80',
      border: 'border-yellow-500/40 hover:border-yellow-500 dark:hover:border-yellow-300',
      glow: 'hover:shadow-lg hover:shadow-yellow-500/25',
      text: 'text-yellow-600 dark:text-yellow-300',
      badge: 'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-200 border-yellow-500/40',
      iconBg: 'bg-yellow-500/15 border-yellow-500/30',
      btn: 'bg-rose-600 hover:bg-rose-700 dark:bg-red-500 dark:hover:bg-red-400 text-white'
    };
  }
  if (lower.includes('normal')) {
    return {
      bg: 'bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-slate-100 hover:from-sky-500/25 hover:via-sky-500/15 hover:to-slate-200 dark:from-sky-500/20 dark:via-sky-500/5 dark:to-slate-900/60 dark:hover:from-sky-500/40 dark:hover:via-sky-500/20 dark:hover:to-slate-900/80',
      border: 'border-sky-500/40 hover:border-sky-500 dark:hover:border-sky-300',
      glow: 'hover:shadow-lg hover:shadow-sky-500/25',
      text: 'text-sky-600 dark:text-sky-300',
      badge: 'bg-sky-500/20 text-sky-700 dark:bg-sky-500/30 dark:text-sky-200 border-sky-500/40',
      iconBg: 'bg-sky-500/15 border-sky-500/30',
      btn: 'bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white'
    };
  }
  if (lower.includes('senjata') || lower.includes('weapon')) {
    return {
      bg: 'bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-slate-100 hover:from-rose-500/25 hover:via-rose-500/15 hover:to-slate-200 dark:from-rose-500/20 dark:via-rose-500/5 dark:to-slate-900/60 dark:hover:from-rose-500/40 dark:hover:via-rose-500/20 dark:hover:to-slate-900/80',
      border: 'border-rose-500/40 hover:border-rose-500 dark:hover:border-rose-300',
      glow: 'hover:shadow-lg hover:shadow-rose-500/25',
      text: 'text-rose-600 dark:text-rose-300',
      badge: 'bg-rose-500/20 text-rose-700 dark:bg-rose-500/30 dark:text-rose-200 border-rose-500/40',
      iconBg: 'bg-rose-500/15 border-rose-500/30',
      btn: 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400 text-white'
    };
  }
  if (lower.includes('zirah') || lower.includes('armor')) {
    return {
      bg: 'bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-slate-100 hover:from-emerald-500/25 hover:via-emerald-500/15 hover:to-slate-200 dark:from-emerald-500/20 dark:via-emerald-500/5 dark:to-slate-900/60 dark:hover:from-emerald-500/40 dark:hover:via-emerald-500/20 dark:hover:to-slate-900/80',
      border: 'border-emerald-500/40 hover:border-emerald-500 dark:hover:border-emerald-300',
      glow: 'hover:shadow-lg hover:shadow-emerald-500/25',
      text: 'text-emerald-600 dark:text-emerald-300',
      badge: 'bg-emerald-500/20 text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-200 border-emerald-500/40',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30',
      btn: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white'
    };
  }
  if (lower.includes('pelengkap') || lower.includes('additional')) {
    return {
      bg: 'bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-slate-100 hover:from-purple-500/25 hover:via-purple-500/15 hover:to-slate-200 dark:from-purple-500/20 dark:via-purple-500/5 dark:to-slate-900/60 dark:hover:from-purple-500/40 dark:hover:via-purple-500/20 dark:hover:to-slate-900/80',
      border: 'border-purple-500/40 hover:border-purple-500 dark:hover:border-purple-300',
      glow: 'hover:shadow-lg hover:shadow-purple-500/25',
      text: 'text-purple-600 dark:text-purple-300',
      badge: 'bg-purple-500/20 text-purple-700 dark:bg-purple-500/30 dark:text-purple-200 border-purple-500/40',
      iconBg: 'bg-purple-500/15 border-purple-500/30',
      btn: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white'
    };
  }
  if (lower.includes('tambahan') || lower.includes('special')) {
    return {
      bg: 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-100 hover:from-amber-500/25 hover:via-amber-500/15 hover:to-slate-200 dark:from-amber-500/20 dark:via-amber-500/5 dark:to-slate-900/60 dark:hover:from-amber-500/40 dark:hover:via-amber-500/20 dark:hover:to-slate-900/80',
      border: 'border-amber-500/40 hover:border-amber-500 dark:hover:border-amber-300',
      glow: 'hover:shadow-lg hover:shadow-amber-500/25',
      text: 'text-amber-600 dark:text-amber-300',
      badge: 'bg-amber-500/20 text-amber-700 dark:bg-amber-500/30 dark:text-amber-200 border-amber-500/40',
      iconBg: 'bg-amber-500/15 border-amber-500/30',
      btn: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white'
    };
  }
  return {
    bg: 'bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-slate-100 hover:from-indigo-500/25 hover:via-indigo-500/15 hover:to-slate-200 dark:from-indigo-500/20 dark:via-indigo-500/5 dark:to-slate-900/60 dark:hover:from-indigo-500/40 dark:hover:via-indigo-500/20 dark:hover:to-slate-900/80',
    border: 'border-indigo-500/40 hover:border-indigo-500 dark:hover:border-indigo-300',
    glow: 'hover:shadow-lg hover:shadow-indigo-500/25',
    text: 'text-indigo-600 dark:text-indigo-300',
    badge: 'bg-indigo-500/20 text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-200 border-indigo-500/40',
    iconBg: 'bg-indigo-500/15 border-indigo-500/30',
    btn: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white'
  };
};

const features = [
  { 
    name: 'BAG LIST', 
    path: '/bag-list', 
    icon: iconBag, 
    desc: 'Manage your item storage efficiently with extended bag details, slot breakdown, item categorization, and inventory management tips.', 
    bgClass: 'bg-gradient-to-b from-cyan-500/10 via-slate-50/50 to-white hover:from-cyan-500/20 hover:via-slate-100/80 hover:to-slate-100 dark:from-cyan-950/40 dark:via-slate-900/80 dark:to-slate-900/90 dark:hover:from-cyan-900/60 dark:hover:via-slate-800/90 dark:hover:to-slate-900',
    borderClass: 'border-cyan-500/30 hover:border-cyan-500 dark:hover:border-cyan-400',
    iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/30',
    btnClass: 'bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white'
  },
  { 
    name: 'MQ LIST', 
    path: '/mq-list', 
    icon: iconMq, 
    desc: 'Complete list of Toram Online Main Quests and chapter rewards. Track storyline progression and EXP rewards per chapter.', 
    bgClass: 'bg-gradient-to-b from-purple-500/10 via-slate-50/50 to-white hover:from-purple-500/20 hover:via-slate-100/80 hover:to-slate-100 dark:from-purple-950/40 dark:via-slate-900/80 dark:to-slate-900/90 dark:hover:from-purple-900/60 dark:hover:via-slate-800/90 dark:hover:to-slate-900',
    borderClass: 'border-purple-500/30 hover:border-purple-500 dark:hover:border-purple-400',
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/30',
    btnClass: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white'
  },
  { 
    name: 'MQ CALCULATOR', 
    path: '/mq-calc', 
    icon: iconMqCalc, 
    desc: 'Calculate exact EXP required from MQ to reach your target level. Plan your quest skipping or completion strategy efficiently.', 
    bgClass: 'bg-gradient-to-b from-fuchsia-500/10 via-slate-50/50 to-white hover:from-fuchsia-500/20 hover:via-slate-100/80 hover:to-slate-100 dark:from-fuchsia-950/40 dark:via-slate-900/80 dark:to-slate-900/90 dark:hover:from-fuchsia-900/60 dark:hover:via-slate-800/90 dark:hover:to-slate-900',
    borderClass: 'border-fuchsia-500/30 hover:border-fuchsia-500 dark:hover:border-fuchsia-400',
    iconBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/20 border-fuchsia-500/30',
    btnClass: 'bg-fuchsia-600 hover:bg-fuchsia-700 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-400 text-white'
  },
  { 
    name: 'BLACKSMITH CALCULATOR', 
    path: '/bs-calc', 
    icon: iconBsCalc, 
    desc: 'Advanced blacksmith simulator for potential & high-end crafting. Calculate success rate, statting formulas, and material requirements.', 
    bgClass: 'bg-gradient-to-b from-amber-500/10 via-slate-50/50 to-white hover:from-amber-500/20 hover:via-slate-100/80 hover:to-slate-100 dark:from-amber-950/40 dark:via-slate-900/80 dark:to-slate-900/90 dark:hover:from-amber-900/60 dark:hover:via-slate-800/90 dark:hover:to-slate-900',
    borderClass: 'border-amber-500/30 hover:border-amber-500 dark:hover:border-amber-400',
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30',
    btnClass: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white'
  },
  { 
    name: 'XTALL ID', 
    flag: 'https://flagcdn.com/w20/id.png', 
    path: '/xtall', 
    icon: iconXtall, 
    desc: 'Find the best crystals for your equipment with Indonesian Database Name! Filter by stats, weapon types, boss drops, and upgrade chains.', 
    bgClass: 'bg-gradient-to-b from-emerald-500/10 via-slate-50/50 to-white hover:from-emerald-500/20 hover:via-slate-100/80 hover:to-slate-100 dark:from-emerald-950/40 dark:via-slate-900/80 dark:to-slate-900/90 dark:hover:from-emerald-900/60 dark:hover:via-slate-800/90 dark:hover:to-slate-900',
    borderClass: 'border-emerald-500/30 hover:border-emerald-500 dark:hover:border-emerald-400',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white'
  }
];

const other = [
  { 
    name: 'Annual Event Calendar', 
    path: '/event', 
    icon: iconEvent, 
    desc: 'Annual events & calendar overview (Note: generally during those months, although that is not entirely accurate). Keep track of limited event bosses and rewards.', 
    bgClass: 'bg-gradient-to-b from-amber-500/10 via-slate-50/50 to-white hover:from-amber-500/20 hover:via-slate-100/80 hover:to-slate-100 dark:from-amber-950/40 dark:via-slate-900/80 dark:to-slate-900/90 dark:hover:from-amber-900/60 dark:hover:via-slate-800/90 dark:hover:to-slate-900',
    borderClass: 'border-amber-500/30 hover:border-amber-500 dark:hover:border-amber-400',
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30',
    btnClass: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white'
  },
  { 
    name: 'Leveling Spot', 
    path: '/lvling', 
    icon: iconLeveling, 
    desc: 'Fast leveling strategies, best EXP spots, and efficient progression tips. Find optimal grinding spots and boss routes from early game to cap.', 
    bgClass: 'bg-gradient-to-b from-sky-500/10 via-slate-50/50 to-white hover:from-sky-500/20 hover:via-slate-100/80 hover:to-slate-100 dark:from-sky-950/40 dark:via-slate-900/80 dark:to-slate-900/90 dark:hover:from-sky-900/60 dark:hover:via-slate-800/90 dark:hover:to-slate-900',
    borderClass: 'border-sky-500/30 hover:border-sky-500 dark:hover:border-sky-400',
    iconBg: 'bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/30',
    btnClass: 'bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white'
  },
  { 
    name: 'Favorite Xtall', 
    path: '/favorite', 
    icon: iconFavorite, 
    desc: 'Favorite xtall from xtall page. Access your saved favorite crystals directly without searching through the database again.', 
    bgClass: 'bg-gradient-to-b from-rose-500/10 via-slate-50/50 to-white hover:from-rose-500/20 hover:via-slate-100/80 hover:to-slate-100 dark:from-rose-950/40 dark:via-slate-900/80 dark:to-slate-900/90 dark:hover:from-rose-900/60 dark:hover:via-slate-800/90 dark:hover:to-slate-900',
    borderClass: 'border-rose-500/30 hover:border-rose-500 dark:hover:border-rose-400',
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/30',
    btnClass: 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400 text-white'
  },
  { 
    name: 'Material Farming Spot', 
    path: '/spotmats', 
    icon: iconMats, 
    desc: 'Best all spots farm in Toram Online for farmer mats. (Update 2026) High efficiency farming locations for Wood, Metal, Cloth, Medicine, Mana, and Beast.', 
    bgClass: 'bg-gradient-to-b from-purple-500/10 via-slate-50/50 to-white hover:from-purple-500/20 hover:via-slate-100/80 hover:to-slate-100 dark:from-purple-950/40 dark:via-slate-900/80 dark:to-slate-900/90 dark:hover:from-purple-900/60 dark:hover:via-slate-800/90 dark:hover:to-slate-900',
    borderClass: 'border-purple-500/30 hover:border-purple-500 dark:hover:border-purple-400',
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/30',
    btnClass: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white'
  },
  { 
    name: 'Search Item (API)', 
    path: '/item-search', 
    icon: iconsearchapi, 
    desc: 'Search for items in the game with API Coryn. Query real-time equipment stats, boss drops, and item crafting recipes.', 
    bgClass: 'bg-gradient-to-b from-emerald-500/10 via-slate-50/50 to-white hover:from-emerald-500/20 hover:via-slate-100/80 hover:to-slate-100 dark:from-emerald-950/40 dark:via-slate-900/80 dark:to-slate-900/90 dark:hover:from-emerald-900/60 dark:hover:via-slate-800/90 dark:hover:to-slate-900',
    borderClass: 'border-emerald-500/30 hover:border-emerald-500 dark:hover:border-emerald-400',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white'
  }
];

const getIconPath = (type) => {
  if (type && type.toLowerCase().includes('upgrade')) return favoriteCrystaIcon;
  const icons = { normal: normalCrystas, senjata: weaponCrystas, zirah: armorCrystas, pelengkap: additionalCrystas, tambahan: specialCrystas };
  return icons[type?.toLowerCase()] || favoriteCrystaIcon;
};

const updates = [
  { number: '01', title: 'Bag Expansion Guide v3.2026', meta: 'Feature information · Aug 18, 2026', path: '/bag-list' },
  { number: '02', title: 'Leveling Spots', meta: 'Guide information · Aug 12, 2026', path: '/lvling' }
];

const databaseActivity = [...crystalData]
  .sort((first, second) => first.code - second.code)
  .slice(-6)
  .map((crystal) => ({
    name: crystal.name,
    date: `Xtall ID #${crystal.code}`,
    type: crystal.type || 'Xtall',
    icon: getIconPath(crystal.type),
    path: `/xtall/${crystal.code}`,
    theme: getCrystaTheme(crystal.type)
  }));

const navigateTo = (path) => router.push(path);

const runSearch = () => {
  if (searchQuery.value.trim()) router.push({ path: '/item-search', query: { q: searchQuery.value.trim() } });
};

onMounted(() => {
  let favIds = [];
  try { favIds = JSON.parse(localStorage.getItem('xtall_favs') || '[]'); } catch { favIds = []; }
  favoriteXtalls.value = crystalData.filter((crystal) => favIds.includes(String(crystal.code))).slice(0, 5);
  homeInterval = setInterval(() => { currentBgIndex.value = (currentBgIndex.value + 1) % backgrounds.length; }, 8000);
});

onUnmounted(() => { if (homeInterval) clearInterval(homeInterval); });
</script>

<template>
  <div :class="{ dark: props.isDark }" class="w-full space-y-12">
    
    <!-- HERO SECTION -->
    <section class="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div class="flex flex-col items-center sm:items-start text-center sm:text-left">
        <span class="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 mb-4">
          The Most Comprehensive Toram Online Database
        </span>
        <h1 class="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
          Discover Your <br><span class="text-purple-600 dark:text-purple-400">True Power</span>
        </h1>
        <p class="mt-3 max-w-lg text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          Access thousands of items, mission guides, and advanced stat calculators to dominate the world of Toram Online.
        </p>
        
        <form class="w-full max-w-md mt-6 flex items-center gap-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus-within:border-purple-500" @submit.prevent="runSearch">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="w-9 h-9 ml-3 stroke-slate-400 fill-none stroke-[2.5]"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>
          <input v-model="searchQuery" type="search" placeholder="Search items, bosses with API Coryn..." aria-label="Search the database" class="w-full bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none placeholder-slate-400 px-2">
          <button type="submit" class="px-5 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors">Search</button>
        </form>
        <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">© 2026 TIMI DB㋡ Toram Online Digital Database Project</p>
      </div>

      <div class="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-2">
        <div class="relative h-40 overflow-hidden rounded-2xl">
          <img :src="backgrounds[currentBgIndex]" alt="Toram Online adventure" class="w-full h-full object-cover">
          <span class="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase bg-purple-600 text-white rounded-md">Album Gallery</span>
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Latest Updates</h2>
          </div>
          <div class="space-y-2">
            <button 
              v-for="update in updates" 
              :key="update.number" 
              class="w-full flex items-center gap-3 p-3 text-left rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/80 hover:from-purple-50 hover:to-purple-100/60 dark:from-slate-800/60 dark:to-slate-800/40 dark:hover:from-purple-950/40 dark:hover:to-slate-800/80 border border-slate-200/60 dark:border-slate-700/50 hover:border-purple-500 dark:hover:border-purple-400 transition-all" 
              @click="navigateTo(update.path)"
            >
              <span class="px-2.5 py-1 text-xs font-extrabold bg-purple-500/10 text-purple-600 dark:text-purple-300 rounded-lg">{{ update.number }}</span>
              <span class="flex-1 min-w-0">
                <b class="block text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{{ update.title }}</b>
                <small class="block text-[11px] text-slate-500 dark:text-slate-400">{{ update.meta }}</small>
              </span>
              <span class="text-xs font-bold text-purple-600 dark:text-purple-400">View →</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAVORITES -->
    <section class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-black text-slate-900 dark:text-white">Your Favorites</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">Quick access to the xtall you saved from the database.</p>
        </div>
        <button 
  class="px-3 py-1.5 text-xs font-bold text-rose-100 dark:text-rose-250 bg-red-600/80 hover:bg-rose-800/80 dark:bg-red-500 dark:hover:bg-red-300 border border-rose-500/30 hover:border-rose-500 rounded-xl transition-all shadow-sm" 
  @click="navigateTo('/favorite')"
>
  View All →
</button>
      </div>
      
      <div v-if="favoriteXtalls.length" class="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <button 
          v-for="favorite in favoriteXtalls" 
          :key="favorite.code" 
          :class="[
            'group flex items-center gap-3 p-3 text-left rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer',
            getCrystaTheme(favorite.type).bg,
            getCrystaTheme(favorite.type).border
          ]" 
          @click="navigateTo(`/xtall/${favorite.code}`)"
        >
          <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/80 group-hover:scale-110 transition-transform shadow-sm">
            <img :src="getIconPath(favorite.type)" :alt="favorite.name" class="w-6 h-6 object-contain">
          </div>
          <span class="flex-1 min-w-0">
            <b :class="['block text-xs font-bold truncate transition-colors', getCrystaTheme(favorite.type).text]">
              {{ favorite.name }}
            </b>
            <span :class="['inline-block px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded border tracking-wider mt-0.5', getCrystaTheme(favorite.type).badge]">
              {{ favorite.type }}
            </span>
            
          </span>
          <span :class="['font-bold text-xs transition-transform group-hover:translate-x-1', getCrystaTheme(favorite.type).text]">→</span>
        </button>
      </div>
      
      <div v-else class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <img src="/images/what chara.webp" alt="Timi DB character" class="w-20 h-20 object-contain">
          <div>
            <b class="text-sm font-bold text-slate-800 dark:text-slate-200">No favorite xtall yet</b>
            <p class="text-xs text-slate-500 dark:text-slate-400">Tidak ada xtall favorit yang disimpan.</p>
          </div>
        </div>
        <button class="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-sm transition-all hover:scale-105" @click="navigateTo('/xtall')">Lihat Xtall →</button>
      </div>
      
    </section>

    <!-- ABOUT PROJECT -->
    <section class="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">About the project</span>
        <h2 class="text-2xl font-black text-slate-900 dark:text-white mt-1 mb-2">Built for Toram Online Players</h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          TIMI DB brings item data, quest references, calculators, leveling routes, and farming notes into one clean workspace.
        </p>
      </div>
      <div class="border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Web developer</span>
        <b class="text-lg font-black text-slate-900 dark:text-white block mt-1">TIMI</b>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Designed, maintained, and updated as an independent community web project.</p>
        <a href="https://www.facebook.com/J7Timi" target="_blank" rel="noopener" class="inline-block mt-3 text-xs font-extrabold text-purple-600 dark:text-purple-400 hover:underline">View developer profile →</a>
      </div>
    </section>

    <!-- ADVENTURER TOOLS GRID -->
    <section>
      <div class="flex items-center justify-between gap-4 pb-3 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 class="text-xl font-black text-slate-900 dark:text-white">Adventurer Tools</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Utilize our calculators and database tools to accelerate your progress.</p>
        </div>
      </div>
      
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <button 
          v-for="item in features" 
          :key="item.path" 
          :class="[
            'group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[290px]',
            item.bgClass,
            item.borderClass
          ]"
          @click="navigateTo(item.path)"
        >
          <div class="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
            <div :class="['w-22 h-22 rounded-2xl flex items-center justify-center border mb-4 shadow-sm', item.iconBg]">
              <img :src="item.icon" :alt="item.name" class="w-full h-full object-contain group-hover:scale-110 transition-transform">
            </div>
            
            <strong class="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              {{ item.name }} 
              <img v-if="item.flag" :src="item.flag" alt="Indonesia" class="w-5 h-auto rounded">
            </strong>
            
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {{ item.desc }}
            </p>
          </div>
          
          <div class="relative z-10 mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between w-full">
            <span class="text-xs font-bold text-slate-400 dark:text-slate-500">OPEN TOOL</span>
            <span :class="['px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1 group-hover:translate-x-1', item.btnClass]">
              Open →
            </span>
          </div>
        </button>
      </div>
    </section>

    <!-- POPULAR GUIDES & RESOURCES -->
    <section>
      <div class="flex items-center justify-between gap-4 pb-3 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 class="text-xl font-black text-slate-900 dark:text-white">Popular Guides & Resources</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Quick references for event calendars, leveling routes, and farming locations.</p>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <button 
          v-for="item in other" 
          :key="item.path" 
          :class="[
            'group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[280px]',
            item.bgClass,
            item.borderClass
          ]"
          @click="navigateTo(item.path)"
        >
          <div class="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
            <div :class="['w-22 h-22 rounded-2xl flex items-center justify-center border mb-4 shadow-sm', item.iconBg]">
              <img :src="item.icon" :alt="item.name" class="w-full h-full object-contain group-hover:scale-110 transition-transform">
            </div>
            
            <strong class="text-base font-black text-slate-900 dark:text-white mb-2">
              {{ item.name }}
            </strong>
            
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {{ item.desc }}
            </p>
          </div>
          
          <div class="relative z-10 mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between w-full">
            <span class="text-xs font-bold text-slate-400 dark:text-slate-500">VIEW GUIDE</span>
            <span :class="['px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1 group-hover:translate-x-1', item.btnClass]">
              Open →
            </span>
          </div>
        </button>
      </div>
    </section>

    <!-- XTALL DATABASE ACTIVITY -->
    <section>
      <div class="flex items-center gap-3 pb-3 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div class="text-purple-600 dark:text-purple-400 text-xl font-bold">▰</div>
        <div>
          <h2 class="text-xl font-black text-slate-900 dark:text-white">Xtall Database Activity</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Recently added entries with unique theme indicators.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="activity in databaseActivity" 
          :key="activity.name"
          @click="navigateTo(activity.path)"
          :class="[
            'group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md',
            activity.theme.bg,
            activity.theme.border
          ]"
        >
          <div class="flex items-center gap-4 min-w-0">
            <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <img :src="activity.icon" :alt="activity.name" class="w-8 h-8 object-contain" />
            </div>
            <div class="min-w-0">
              <b :class="['block text-sm font-bold truncate transition-colors', activity.theme.text]">{{ activity.name }}</b>
              <small class="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ activity.date }}</small>
            </div>
          </div>

          <div class="flex flex-col items-end justify-between self-stretch flex-shrink-0 ml-3 gap-2">
            <span :class="['px-2.5 py-0.5 text-[10px] font-extrabold border rounded-md uppercase tracking-wider', activity.theme.badge]">
              {{ activity.type }}
            </span>
            <div :class="['px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm', activity.theme.btn]">
              OPEN <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>