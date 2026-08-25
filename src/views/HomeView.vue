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

const placeholders = [
  'Search items, bosses with API Coryn...',
  'Try typing: "Katana", "Kipina", "Megiston"...',
  'Find armor, weapons, and xtall...',
  'Search materials with API Coryn...'
];

const placeholderText = ref('');
let placeholderIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;

const typeEffect = () => {
  const currentFullText = placeholders[placeholderIndex];

  if (isDeleting) {
    placeholderText.value = currentFullText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    placeholderText.value = currentFullText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentFullText.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    typingSpeed = 300;
  }

  typingTimeout = setTimeout(typeEffect, typingSpeed);
};

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
  { number: '03', title: 'Bag Expansion Guide v3.2026', meta: 'Feature information · Aug 24, 2026', path: '/bag-list' },
  { number: '02', title: 'Home Page', meta: 'Change UI/UX · Aug 24, 2026', path: '/' },
  { number: '01', title: 'Xtall ID Guide', meta: 'Feature information · Aug 24, 2026', path: '/xtall' }
];

const databaseActivity = [...crystalData]
  .sort((first, second) => second.code - first.code)
  .slice(0, 6)
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
  typeEffect();
  let favIds = [];
  try { favIds = JSON.parse(localStorage.getItem('xtall_favs') || '[]'); } catch { favIds = []; }
  favoriteXtalls.value = crystalData.filter((crystal) => favIds.includes(String(crystal.code))).slice(0, 5);
  homeInterval = setInterval(() => { currentBgIndex.value = (currentBgIndex.value + 1) % backgrounds.length; }, 8000);
});

onUnmounted(() => { if (typingTimeout) clearTimeout(typingTimeout); if (homeInterval) clearInterval(homeInterval); });
</script>

<template>
  <div :class="{ dark: props.isDark }" class="w-full space-y-12 animate-fade-in transition-colors duration-300">
    
    <!-- HERO SECTION -->
    <section class="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] hero-animate-wrapper">
      <div class="flex flex-col items-center sm:items-start text-center sm:text-left hero-text-area">
        <span class="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 mb-4 shadow-sm animate-pulse badge-float">
          ✨ The Most Comprehensive Toram Online Database
        </span>
        <h1 class="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white title-glow">
          Discover Your <br><span class="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">True Power</span>
        </h1>
        <p class="mt-4 max-w-lg text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed subtitle-fade">
          Access thousands of items, mission guides, and advanced stat calculators to dominate the world of Toram Online.
        </p>
        
        <form 
          class="w-full max-w-xl mt-6 flex items-center gap-2 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl shadow-purple-500/5 focus-within:border-purple-500 dark:focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-500/15 transition-all duration-300 search-box-pop" 
          @submit.prevent="runSearch"
        >
          <div class="flex items-center justify-center pl-3 text-purple-500 dark:text-purple-400 animate-bounce-short">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 stroke-current fill-none stroke-[2.5]">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m20 20-4-4" stroke-linecap="round"></path>
            </svg>
          </div>

          <input 
            v-model="searchQuery" 
            type="search" 
            :placeholder="placeholderText" 
            aria-label="Search the database" 
            class="w-full bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 px-2"
          >

          <button 
            type="submit" 
            class="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 rounded-xl transition-all duration-300 shadow-md shadow-purple-500/30 shrink-0 flex items-center gap-1.5 btn-pulse-hover"
          >
            <span>Search</span>
            <span class="text-xs transition-transform group-hover:translate-x-1">→</span>
          </button>
        </form>
        <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">© 2026 TIMI DB㋡ Toram Online Digital Database Project</p>
      </div>

      <div class="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-300/80 dark:border-slate-800 shadow-2xl p-2.5 transition-all duration-500 card-slide-in">
        <div class="relative h-72 overflow-hidden rounded-2xl group">
          <img 
            :src="backgrounds[currentBgIndex]" 
            alt="Toram Online adventure" 
            class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
          <span class="absolute top-3 left-3 px-3 py-1 text-[10px] font-extrabold uppercase bg-purple-600/90 backdrop-blur-md text-white rounded-lg shadow-md animate-pulse">Album Gallery</span>
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Latest Updates</h2>
          </div>
          <div class="space-y-2">
            <button 
              v-for="(update, idx) in updates" 
              :key="update.number" 
              class="w-full flex items-center gap-3 p-3 text-left rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/80 hover:from-purple-50 hover:to-purple-100/60 dark:from-slate-800/60 dark:to-slate-800/40 dark:hover:from-purple-950/40 dark:hover:to-slate-800/80 border border-slate-300/60 dark:border-slate-700/50 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 group update-item-stagger" 
              :style="{ animationDelay: `${idx * 0.1}s` }"
              @click="navigateTo(update.path)"
            >
              <span class="px-2.5 py-1 text-xs font-extrabold bg-purple-500/10 text-purple-600 dark:text-purple-300 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">{{ update.number }}</span>
              <span class="flex-1 min-w-0">
                <b class="block text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">{{ update.title }}</b>
                <small class="block text-[11px] text-slate-500 dark:text-slate-400">{{ update.meta }}</small>
              </span>
              <span class="text-xs font-bold text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:translate-x-1.5">View →</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAVORITES -->
<section class="p-6 md:p-8 rounded-3xl bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border border-red-500/20 dark:border-red-500/30 shadow-2xl section-fade-up relative overflow-hidden bg-white bg-repeat bg-blend-overlay">
  <!-- Soft Glow Ambient Light -->
  <div class="absolute -top-24 -right-24 w-72 h-72 bg-red-500/10 dark:bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

  <!-- Header Section -->
  <div class="flex items-center justify-between mb-6 relative z-10">
    <div>
      <h2 class="text-xl font-extrabold bg-gradient-to-r from-red-600 via-rose-500 to-yellow-400 bg-clip-text text-transparent dark:from-red-400 dark:via-rose-200 dark:to-red-500 animate-shimmer drop-shadow-sm">
        Your Favorites♡
      </h2>
      <p class="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">Quick access to the xtall you saved from the database.</p>
    </div>
    <button 
      class="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 border border-red-400/30 rounded-xl transition-all duration-300 shadow-md shadow-red-500/20 active:scale-95 hover:scale-105 hover:shadow-lg" 
      @click="navigateTo('/favorite')"
    >
      View All →
    </button>
  </div>
  
  <!-- Content Grid -->
  <div v-if="favoriteXtalls.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 relative z-10">
    <button 
      v-for="(favorite, idx) in favoriteXtalls" 
      :key="favorite.code" 
      :class="[
        'group relative flex items-center gap-3 p-3.5 text-left rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl cursor-pointer fav-card-anim overflow-hidden backdrop-blur-md',
        // Menggunakan tema warna background & border yang sama persis dengan fungsi getCrystaTheme
        getCrystaTheme(favorite.type).bg,
        getCrystaTheme(favorite.type).border,
        'hover:shadow-2xl hover:brightness-105 dark:hover:brightness-110'
      ]"
      :style="{ animationDelay: `${idx * 0.08}s` }"
      @click="navigateTo(`/xtall/${favorite.code}`)"
    >
      <!-- Efek Kilau Shimmer saat Disentuh -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>

      <!-- Icon Box -->
      <div class="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 group-hover:scale-110 transition-all duration-300 shadow-sm relative z-10">
        <img :src="getIconPath(favorite.type)" :alt="favorite.name" class="w-6 h-6 object-contain group-hover:rotate-6 transition-transform">
      </div>

      <!-- Text Details -->
      <span class="flex-1 min-w-0 relative z-10">
        <b :class="['block text-xs font-extrabold truncate transition-colors', getCrystaTheme(favorite.type).text]">
          {{ favorite.name }}
        </b>
        <span :class="['inline-block px-2 py-0.5 text-[9px] font-extrabold uppercase rounded border tracking-wider mt-1 shadow-2xs', getCrystaTheme(favorite.type).badge]">
          {{ favorite.type }}
        </span>
      </span>

      <!-- Arrow Indicator -->
      <span :class="['font-bold text-xs transition-transform duration-300 group-hover:translate-x-1 relative z-10', getCrystaTheme(favorite.type).text]">→</span>
    </button>
  </div>
  
  <!-- Empty State -->
  <div v-else class="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 relative z-10 shadow-sm">
    <div class="flex items-center gap-4">
      <img src="/images/what chara.webp" alt="Timi DB character" class="w-20 h-20 object-contain drop-shadow-md animate-float">
      <div>
        <b class="text-sm font-bold text-slate-800 dark:text-slate-200">No favorite xtall yet</b>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tidak ada xtall favorit yang disimpan.</p>
      </div>
    </div>
    <button class="px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl shadow-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-purple-500/20" @click="navigateTo('/xtall')">See Xtall →</button>
  </div>
</section>

    <!-- ABOUT PROJECT -->
<section class="p-6 md:p-8 rounded-3xl bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border border-purple-500/20 dark:border-purple-500/30 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center section-fade-up relative overflow-hidden bg-[url('/images/batik.png')] bg-repeat bg-blend-overlay">
  <!-- Soft Ambient Glow -->
  <div class="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

  <!-- Left Content -->
  <div class="relative z-10">
    <span class="inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-300 bg-purple-100/80 dark:bg-purple-950/60 border border-purple-300/50 dark:border-purple-800/60 rounded-lg shadow-2xs mb-2">
      About the project
    </span>
    <h2 class="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-700 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-300 dark:to-indigo-400 animate-shimmer drop-shadow-sm mt-1 mb-2">
      Built for Toram Online Players
    </h2>
    <p class="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
      TIMI DB brings item data, quest references, calculators, leveling routes, and farming notes into one clean workspace.
    </p>
  </div>

  <!-- Right Content (Web Developer Info) -->
  <div class="border-t md:border-t-0 md:border-l border-slate-300/70 dark:border-slate-800/80 pt-4 md:pt-0 md:pl-6 relative z-10">
    <span class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-400">
      Web developer
    </span>
    <div class="flex items-center gap-2 mt-1">
      <b class="text-lg font-black text-slate-900 dark:text-white">TIMI</b>
      <span class="px-2 py-0.5 text-[9px] font-extrabold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 rounded-full">Creator</span>
    </div>
    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
      Designed, maintained, and updated as an independent community web project.
    </p>
    <a 
      href="https://www.facebook.com/J7Timi" 
      target="_blank" 
      rel="noopener" 
      class="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 text-xs font-extrabold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/30 rounded-xl shadow-md shadow-purple-500/20 transition-all duration-300 hover:translate-x-1 hover:shadow-lg"
    >
      <span>View developer profile</span>
      <span>→</span>
    </a>
  </div>
</section>

    <!-- ADVENTURER TOOLS GRID -->
    <section>
      <div class="flex items-center justify-between gap-4 pb-4 mb-6 relative">
        <div class="flex items-center gap-3.5">
          <span class="w-2 h-10 rounded-full bg-gradient-to-b from-purple-600 via-pink-500 to-rose-500 shrink-0 shadow-md animate-pulse"></span>
          <div>
            <h2 class="text-xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 dark:from-purple-300 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Adventurer Tools
            </h2>
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400/90 mt-0.5 tracking-wide">
              Utilize our calculators and database tools to accelerate your progress.
            </p>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-purple-500 via-50% to-transparent opacity-90 dark:via-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]"></div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <button 
          v-for="(item, idx) in features" 
          :key="item.path" 
          :class="[
            'group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 border border-slate-300/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between min-h-[300px] tool-card-hover',
            item.bgClass,
            item.borderClass
          ]"
          :style="{ animationDelay: `${idx * 0.1}s` }"
          @click="navigateTo(item.path)"
        >
          <div class="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
            <div :class="['w-20 h-20 rounded-2xl flex items-center justify-center border mb-4 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3', item.iconBg]">
              <img :src="item.icon" :alt="item.name" class="w-12 h-12 object-contain drop-shadow-md">
            </div>
            
            <strong class="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
              {{ item.name }} 
              <img v-if="item.flag" :src="item.flag" alt="Indonesia" class="w-5 h-auto rounded shadow-sm">
            </strong>
            
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {{ item.desc }}
            </p>
          </div>
          
          <div class="relative z-10 mt-6 pt-3 border-t border-slate-300/60 dark:border-slate-800/80 flex items-center justify-between w-full">
            <span class="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider">OPEN TOOL</span>
            <span :class="['px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all duration-300 flex items-center gap-1 group-hover:translate-x-1.5', item.btnClass]">
              Open →
            </span>
          </div>
        </button>
      </div>
    </section>

    <!-- POPULAR GUIDES & RESOURCES -->
    <section>
      <div class="flex items-center justify-between gap-4 pb-4 mb-6 relative">
        <div class="flex items-center gap-3.5">
          <span class="w-2 h-10 rounded-full bg-gradient-to-b from-cyan-500 via-sky-500 to-blue-600 shrink-0 shadow-md animate-pulse"></span>
          <div>
            <h2 class="text-xl font-black bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-cyan-300 dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Popular Guides & Resources
            </h2>
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400/90 mt-0.5 tracking-wide">
              Quick references for event calendars, leveling routes, and farming locations.
            </p>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-cyan-500 via-50% to-transparent opacity-90 dark:via-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.7)]"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <button 
          v-for="(item, idx) in other" 
          :key="item.path" 
          :class="[
            'group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 border border-slate-300/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between min-h-[300px] tool-card-hover',
            item.bgClass,
            item.borderClass
          ]"
          :style="{ animationDelay: `${idx * 0.1}s` }"
          @click="navigateTo(item.path)"
        >
          <div class="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
            <div :class="['w-20 h-20 rounded-2xl flex items-center justify-center border mb-4 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3', item.iconBg]">
              <img :src="item.icon" :alt="item.name" class="w-12 h-12 object-contain drop-shadow-md">
            </div>
            
            <strong class="text-base font-black text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
              {{ item.name }}
            </strong>
            
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {{ item.desc }}
            </p>
          </div>
          
          <div class="relative z-10 mt-6 pt-3 border-t border-slate-300/60 dark:border-slate-800/80 flex items-center justify-between w-full">
            <span class="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider">VIEW GUIDE</span>
            <span :class="['px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all duration-300 flex items-center gap-1 group-hover:translate-x-1.5', item.btnClass]">
              Open →
            </span>
          </div>
        </button>
      </div>
    </section>

    <!-- XTALL DATABASE ACTIVITY -->
    <section>
      <div class="flex items-center justify-between gap-4 pb-4 mb-6 relative">
        <div class="flex items-center gap-3.5">
          <span class="w-2 h-10 rounded-full bg-gradient-to-b from-emerald-500 via-teal-500 to-green-600 shrink-0 shadow-md animate-pulse"></span>
          <div>
            <h2 class="text-xl font-black bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Latest Xtall Database
            </h2>
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400/90 mt-0.5 tracking-wide">
              Recently added entries with unique theme indicators.
            </p>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-emerald-500 via-50% to-transparent opacity-90 dark:via-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="(activity, idx) in databaseActivity" 
          :key="activity.name"
          @click="navigateTo(activity.path)"
          :class="[
            'group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 activity-card-anim',
            activity.theme.bg,
            activity.theme.border
          ]"
          :style="{ animationDelay: `${idx * 0.08}s` }"
        >
          <div class="flex items-center gap-4 min-w-0">
            <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <img :src="activity.icon" :alt="activity.name" class="w-8 h-8 object-contain" />
            </div>
            <div class="min-w-0">
              <b :class="['block text-sm font-bold truncate transition-colors', activity.theme.text]">{{ activity.name }}</b>
              <small class="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ activity.date }}</small>
            </div>
          </div>

          <div class="flex flex-col items-end justify-between self-stretch flex-shrink-0 ml-3 gap-2">
            <span :class="['px-2.5 py-0.5 text-[10px] font-extrabold border rounded-md uppercase tracking-wider shadow-sm', activity.theme.badge]">
              {{ activity.type }}
            </span>
            <div :class="['px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1 shadow-md group-hover:translate-x-1.5', activity.theme.btn]">
              OPEN <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Keyframe Animations for Full Animated CSS UI */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatAnim {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes pulseGlow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.03); opacity: 0.9; }
}

/* Base Component Entry Animation */
.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Floating mascot/image effect */
.animate-float {
  animation: floatAnim 4s ease-in-out infinite;
}

/* Badge Float */
.badge-float {
  display: inline-block;
  animation: floatAnim 3s ease-in-out infinite;
}

/* Shimmer Gradient Text */
.animate-gradient {
  background-size: 200% auto;
  animation: gradientShift 6s ease infinite;
}

/* Card Entry & Hover Micro-interactions */
.card-slide-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
  opacity: 0;
}

.section-fade-up {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.update-item-stagger {
  opacity: 0;
  animation: fadeIn 0.4s ease forwards;
}

.fav-card-anim {
  opacity: 0;
  animation: fadeIn 0.4s ease forwards;
}

.tool-card-hover {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  will-change: transform;
}

.activity-card-anim {
  opacity: 0;
  animation: fadeIn 0.4s ease forwards;
}

/* Search Box Interactive Ring Glow */
.search-box-pop {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.search-box-pop:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 20px 30px -10px rgba(168, 85, 247, 0.25);
}

/* Button Hover Pulses */
.btn-pulse-hover {
  transition: all 0.3s ease;
}

.btn-pulse-hover:hover {
  box-shadow: 0 8px 20px -4px rgba(168, 85, 247, 0.5);
  transform: translateY(-1px);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.animate-shimmer {
  background-size: 200% auto;
  animation: shimmer 4s linear infinite;
}

</style>