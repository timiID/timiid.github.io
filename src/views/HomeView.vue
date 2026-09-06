<script setup>
import { useRouter } from 'vue-router';
import { ref, computed, onMounted, onUnmounted } from 'vue';

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
      btn: 'bg-rose-600 hover:bg-rose-700 dark:bg-red-500 dark:hover:bg-red-400 text-white',
      dot: 'bg-yellow-400'
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
      btn: 'bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white',
      dot: 'bg-sky-400'
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
      btn: 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400 text-white',
      dot: 'bg-rose-400'
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
      btn: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white',
      dot: 'bg-emerald-400'
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
      btn: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white',
      dot: 'bg-purple-400'
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
      btn: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white',
      dot: 'bg-amber-400'
    };
  }
  return {
    bg: 'bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-slate-100 hover:from-indigo-500/25 hover:via-indigo-500/15 hover:to-slate-200 dark:from-indigo-500/20 dark:via-indigo-500/5 dark:to-slate-900/60 dark:hover:from-indigo-500/40 dark:hover:via-indigo-500/20 dark:hover:to-slate-900/80',
    border: 'border-indigo-500/40 hover:border-indigo-500 dark:hover:border-indigo-300',
    glow: 'hover:shadow-lg hover:shadow-indigo-500/25',
    text: 'text-indigo-600 dark:text-indigo-300',
    badge: 'bg-indigo-500/20 text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-200 border-indigo-500/40',
    iconBg: 'bg-indigo-500/15 border-indigo-500/30',
    btn: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white',
    dot: 'bg-indigo-400'
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

const featuredTool = features[4];
const supportTools = [features[0], features[1], features[2], features[3]];

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

const stats = computed(() => [
  { value: crystalData.length, label: 'Xtall entries tracked' },
  { value: features.length + other.length, label: 'Tools & guides' },
  { value: favoriteXtalls.value.length, label: 'Your favorites' }
]);

const navigateTo = (path) => router.push(path);

const runSearch = () => {
  if (searchQuery.value.trim()) router.push({ path: '/item-search', query: { q: searchQuery.value.trim() } });
};

const heroCrystalsEl = ref(null);
const heroFloaters = [
  { src: normalCrystas, cls: 'gs1', color: '#38bdf8' },
  { src: weaponCrystas, cls: 'gs2', color: '#fb7185' },
  { src: armorCrystas, cls: 'gs3', color: '#34d399' },
  { src: additionalCrystas, cls: 'gs4', color: '#a78bfa' },
  { src: specialCrystas, cls: 'gs5', color: '#fbbf24' },
  { src: favoriteCrystaIcon, cls: 'gs6', color: '#f472b6' }
];

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let parallaxRaf = null;

const onGlobalMouseMove = (e) => {
  mouseX = (e.clientX / window.innerWidth) - 0.5;
  mouseY = (e.clientY / window.innerHeight) - 0.5;
};

const runParallax = () => {
  currentX += (mouseX - currentX) * 0.07;
  currentY += (mouseY - currentY) * 0.07;
  if (heroCrystalsEl.value) {
    heroCrystalsEl.value.style.transform = `translate(${currentX * 55}px, ${currentY * 40}px)`;
  }
  parallaxRaf = requestAnimationFrame(runParallax);
};

const handleTiltMove = (e, maxTilt = 9) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const relX = (e.clientX - rect.left) / rect.width - 0.5;
  const relY = (e.clientY - rect.top) / rect.height - 0.5;
  el.style.setProperty('--tilt-x', `${(relY * -maxTilt).toFixed(2)}deg`);
  el.style.setProperty('--tilt-y', `${(relX * maxTilt).toFixed(2)}deg`);
  el.style.setProperty('--glow-x', `${(relX * 100 + 50).toFixed(1)}%`);
  el.style.setProperty('--glow-y', `${(relY * 100 + 50).toFixed(1)}%`);
};

const handleTiltLeave = (e) => {
  const el = e.currentTarget;
  el.style.setProperty('--tilt-x', '0deg');
  el.style.setProperty('--tilt-y', '0deg');
};

onMounted(() => {
  typeEffect();
  let favIds = [];
  try { favIds = JSON.parse(localStorage.getItem('xtall_favs') || '[]'); } catch { favIds = []; }
  favoriteXtalls.value = crystalData.filter((crystal) => favIds.includes(String(crystal.code))).slice(0, 5);
  homeInterval = setInterval(() => { currentBgIndex.value = (currentBgIndex.value + 1) % backgrounds.length; }, 8000);

  window.addEventListener('mousemove', onGlobalMouseMove);
  parallaxRaf = requestAnimationFrame(runParallax);
});

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout);
  if (homeInterval) clearInterval(homeInterval);
  window.removeEventListener('mousemove', onGlobalMouseMove);
  if (parallaxRaf) cancelAnimationFrame(parallaxRaf);
});
</script>

<template>
  <div :class="{ dark: props.isDark }" class="w-full space-y-16 animate-fade-in transition-colors duration-300">

    <!-- ============================= HERO / VAULT ============================= -->
    <section class="hero-vault">
      <div class="hero-vault-glow" aria-hidden="true"></div>
      <div class="hero-gem-field" ref="heroCrystalsEl" aria-hidden="true">
        <div v-for="floater in heroFloaters" :key="floater.cls" :class="['gem-shard', floater.cls]" :style="{ '--gem-color': floater.color }">
          <img :src="floater.src" alt="">
        </div>
      </div>

      <div class="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
        <div class="flex flex-col gap-6">
          <span class="hero-badge">✨ The Most Comprehensive Toram Online Database</span>

          <h1 class="hero-title">
            Discover Your<br>
            <span class="hero-title-accent">True Power</span>
          </h1>

          <p class="hero-sub">
            Access thousands of items, mission guides, and advanced stat calculators to dominate the world of Toram Online.
          </p>

          <form class="hero-search" @submit.prevent="runSearch">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5 stroke-current fill-none stroke-[2.5] shrink-0">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m20 20-4-4" stroke-linecap="round"></path>
            </svg>
            <input 
              v-model="searchQuery" 
              type="search" 
              :placeholder="placeholderText" 
              aria-label="Search the database" 
              class="hero-search-input"
            >
            <button type="submit" class="hero-search-btn">
              Search <span>→</span>
            </button>
          </form>

          <div class="hero-stats">
            <div class="stat-chip" v-for="s in stats" :key="s.label">
              <b>{{ s.value }}</b>
              <span>{{ s.label }}</span>
            </div>
          </div>

          <p class="hero-copyright">© 2026 TIMI DB㋡ Toram Online Digital Database Project</p>
        </div>

        <!-- Updates panel: gem-cut, tilts toward the cursor -->
        <div 
          class="updates-panel gem-cut bg-white/90 dark:bg-[#150f24] border border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300" 
          @mousemove="(e) => handleTiltMove(e, 6)" 
          @mouseleave="handleTiltLeave"
        >
          <div class="relative h-56 overflow-hidden">
            <img :src="backgrounds[currentBgIndex]" alt="Toram Online adventure" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent dark:from-[#0b0a14] dark:via-transparent dark:to-transparent transition-colors duration-300"></div>
            <span class="absolute top-3 left-3 px-3 py-1 text-[10px] font-extrabold uppercase bg-fuchsia-600/90 backdrop-blur-md text-white rounded-lg shadow-md">Album Gallery</span>
          </div>
          <div class="p-4">
            <h2 class="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-white/70 mb-3">Latest Updates</h2>
            <div class="space-y-2">
              <button 
                v-for="(update, idx) in updates" 
                :key="update.number" 
                class="update-row stagger-item w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                :style="{ animationDelay: `${idx * 0.08}s` }"
                @click="navigateTo(update.path)"
              >
                <span class="update-number">{{ update.number }}</span>
                <span class="flex-1 min-w-0 text-left">
                  <b class="block text-xs font-bold text-slate-800 dark:text-white truncate">{{ update.title }}</b>
                  <small class="block text-[11px] text-slate-500 dark:text-white/50">{{ update.meta }}</small>
                </span>
                <span class="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================= FAVORITES SHELF ============================= -->
    <section>
      <div class="section-head">
        <div>
          <h2 class="section-title text-red-600 dark:text-rose-300">Your Favorites ♡</h2>
          <p class="section-sub">Quick access to the xtall you saved from the database.</p>
        </div>
        <button class="section-cta bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500" @click="navigateTo('/favorite')">
          View All →
        </button>
      </div>

      <div v-if="favoriteXtalls.length" class="favorites-shelf">
        <button 
          v-for="(favorite, idx) in favoriteXtalls" 
          :key="favorite.code" 
          :class="['favorite-card', 'stagger-item', getCrystaTheme(favorite.type).bg, getCrystaTheme(favorite.type).border]"
          :style="{ animationDelay: `${idx * 0.08}s` }"
          @click="navigateTo(`/xtall/${favorite.code}`)"
          @mousemove="(e) => handleTiltMove(e, 6)"
          @mouseleave="handleTiltLeave"
        >
          <div class="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <img :src="getIconPath(favorite.type)" :alt="favorite.name" class="w-6 h-6 object-contain">
          </div>
          <span class="flex-1 min-w-0 text-left">
            <b :class="['block text-xs font-extrabold truncate', getCrystaTheme(favorite.type).text]">{{ favorite.name }}</b>
            <span :class="['inline-block px-2 py-0.5 text-[9px] font-extrabold uppercase rounded border tracking-wider mt-1', getCrystaTheme(favorite.type).badge]">{{ favorite.type }}</span>
          </span>
          <span :class="['font-bold text-xs', getCrystaTheme(favorite.type).text]">→</span>
        </button>
      </div>

      <div v-else class="empty-state">
        <div class="flex items-center gap-4">
          <img src="/images/what chara.webp" alt="Timi DB character" class="w-20 h-20 object-contain drop-shadow-md animate-float">
          <div>
            <b class="text-sm font-bold text-slate-800 dark:text-slate-200">No favorite xtall yet</b>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tidak ada xtall favorit yang disimpan.</p>
          </div>
        </div>
        <button class="section-cta bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500" @click="navigateTo('/xtall')">See Xtall →</button>
      </div>
    </section>

    <!-- ============================= ABOUT ============================= -->
    <section class="about-vault bg-slate-50 dark:bg-[#0b0a14] border border-slate-200 dark:border-none shadow-sm dark:shadow-none transition-colors duration-300">
      <div class="about-vault-pattern" aria-hidden="true"></div>
      <div class="about-vault-glow" aria-hidden="true"></div>
      <div class="relative z-10 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8">
        <div>
          <span class="about-eyebrow">About the project</span>
          <h2 class="about-title text-slate-900 dark:text-white">Built for Toram Online Players</h2>
          <p class="about-copy text-slate-600 dark:text-white/70">
            TIMI DB brings item data, quest references, calculators, leveling routes, and farming notes into one clean workspace.
          </p>
        </div>
        <div class="about-dev border-slate-300 dark:border-white/10">
          <span class="about-dev-label text-slate-500 dark:text-white/40">Web developer</span>
          <div class="flex items-center gap-2 mt-1">
            <b class="text-lg font-black text-slate-900 dark:text-white">TIMI</b>
            <span class="px-2 py-0.5 text-[9px] font-extrabold bg-red-500/15 text-red-600 dark:text-red-300 border border-red-400/30 rounded-full">Creator</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-white/50 mt-1 leading-normal">
            Designed, maintained, and updated as an independent community web project.
          </p>
          <a href="https://www.facebook.com/J7Timi" target="_blank" rel="noopener" class="about-dev-link">
            View developer profile <span>→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ============================= ADVENTURER TOOLS (BENTO) ============================= -->
    <section>
      <div class="section-head">
        <div class="flex items-center gap-3.5">
          <span class="section-bar bg-gradient-to-b from-purple-600 via-pink-500 to-rose-500"></span>
          <div>
            <h2 class="section-title bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 dark:from-purple-300 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">Adventurer Tools</h2>
            <p class="section-sub">Utilize our calculators and database tools to accelerate your progress.</p>
          </div>
        </div>
      </div>

      <div class="tools-bento">
        <button 
          class="tool-featured gem-cut stagger-item" 
          @click="navigateTo(featuredTool.path)"
          @mousemove="(e) => handleTiltMove(e, 7)"
          @mouseleave="handleTiltLeave"
        >
          <span class="tilt-shine"></span>
          <div class="relative z-10 flex flex-col h-full justify-between">
            <div>
              <span class="tool-featured-tag">Flagship tool</span>
              <div class="flex items-center gap-3 mt-4">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center bg-purple-500/10 dark:bg-white/10 border border-purple-500/20 dark:border-white/15">
                  <img :src="featuredTool.icon" :alt="featuredTool.name" class="w-10 h-10 object-contain">
                </div>
                <strong class="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  {{ featuredTool.name }}
                  <img v-if="featuredTool.flag" :src="featuredTool.flag" alt="Indonesia" class="w-5 h-auto rounded shadow-sm">
                </strong>
              </div>
              <p class="mt-4 text-sm text-slate-700 dark:text-white/70 leading-relaxed max-w-md">{{ featuredTool.desc }}</p>
            </div>
            <div class="flex items-center justify-between mt-6 pt-4 border-t border-purple-500/15 dark:border-white/10">
              <span class="text-xs font-bold text-slate-500 dark:text-white/40 tracking-wider">OPEN TOOL</span>
              <span class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white">Open →</span>
            </div>
          </div>
        </button>

        <button 
          v-for="(item, idx) in supportTools" 
          :key="item.path" 
          :class="['tool-tile', 'stagger-item', item.bgClass, item.borderClass]"
          :style="{ animationDelay: `${(idx + 1) * 0.08}s` }"
          @click="navigateTo(item.path)"
          @mousemove="(e) => handleTiltMove(e, 8)"
          @mouseleave="handleTiltLeave"
        >
          <span class="tilt-shine"></span>
          <div :class="['w-10 h-10 rounded-xl flex items-center justify-center border mb-2', item.iconBg]">
            <img :src="item.icon" :alt="item.name" class="w-6 h-6 object-contain">
          </div>
          <strong class="text-xs font-black text-slate-900 dark:text-white leading-tight">{{ item.name }}</strong>
          <p class="tool-tile-desc mt-1.5 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{{ item.desc }}</p>
          <span :class="['tool-tile-cta mt-auto', item.btnClass]">Open →</span>
        </button>
      </div>
    </section>

    <!-- ============================= OTHER GUIDES (ROWS) ============================= -->
    <section>
      <div class="section-head">
        <div class="flex items-center gap-3.5">
          <span class="section-bar bg-gradient-to-b from-cyan-500 via-sky-500 to-blue-600"></span>
          <div>
            <h2 class="section-title bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-cyan-300 dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent">Other Guides & Resources</h2>
            <p class="section-sub">Quick references for event calendars, leveling routes, and farming locations.</p>
          </div>
        </div>
      </div>

      <div class="guide-rows">
        <button 
          v-for="(item, idx) in other" 
          :key="item.path" 
          :class="['guide-row', 'stagger-item', item.borderClass]"
          :style="{ animationDelay: `${idx * 0.07}s` }"
          @click="navigateTo(item.path)"
        >
          <div :class="['guide-icon', item.iconBg]">
            <img :src="item.icon" :alt="item.name" class="w-7 h-7 object-contain">
          </div>
          <div class="guide-text">
            <strong class="text-sm font-black text-slate-900 dark:text-white">{{ item.name }}</strong>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{{ item.desc }}</p>
          </div>
          <span :class="['guide-cta', item.btnClass]">Open →</span>
        </button>
      </div>
    </section>

    <!-- ============================= XTALL DATABASE TIMELINE ============================= -->
    <section>
      <div class="section-head">
        <div class="flex items-center gap-3.5">
          <span class="section-bar bg-gradient-to-b from-emerald-500 via-teal-500 to-green-600"></span>
          <div>
            <h2 class="section-title bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">Latest Xtall Database</h2>
            <p class="section-sub">Recently added entries with unique theme indicators.</p>
          </div>
        </div>
      </div>

      <div class="db-timeline">
        <div 
          v-for="(activity, idx) in databaseActivity" 
          :key="activity.name"
          class="db-node stagger-item"
          :style="{ animationDelay: `${idx * 0.07}s` }"
          @click="navigateTo(activity.path)"
        >
          <span :class="['db-dot', activity.theme.dot]"></span>
          <div :class="['db-card', activity.theme.bg, activity.theme.border]">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
                <img :src="activity.icon" :alt="activity.name" class="w-6 h-6 object-contain" />
              </div>
              <div class="min-w-0">
                <b :class="['block text-sm font-bold truncate', activity.theme.text]">{{ activity.name }}</b>
                <small class="block text-xs text-slate-500 dark:text-slate-400">{{ activity.date }}</small>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span :class="['px-2 py-0.5 text-[10px] font-extrabold border rounded-md uppercase tracking-wider', activity.theme.badge]">{{ activity.type }}</span>
              <span :class="['px-2.5 py-1 rounded-lg text-xs font-bold', activity.theme.btn]">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* =========================================================================
 * Tokens
 * ========================================================================= */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes floatAnim {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-float { animation: floatAnim 4s ease-in-out infinite; }

/* Per-item stagger fade-in, reused across favorites, tools, guides and timeline */
.stagger-item {
  opacity: 0;
  animation: fadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* =========================================================================
 * Hero vault
 * ========================================================================= */
.hero-vault {
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  isolation: isolate;
  background: radial-gradient(circle at 20% 10%, rgba(139, 92, 246, 0.08) 0%, rgba(255, 255, 255, 0) 55%);
}

.dark .hero-vault {
  background: radial-gradient(circle at 20% 10%, #4c1d95 0%, #1e1b4b 45%, #0b0a14 100%);
  box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.4);
}

.hero-vault-glow {
  position: absolute;
  inset: -20%;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(circle at 80% 20%, rgba(217, 70, 239, 0.12), transparent 45%);
}

.hero-gem-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transition: transform 0.1s ease-out;
}

.gem-shard {
  position: absolute;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  overflow: hidden;
  opacity: 0.22;
  filter: drop-shadow(0 0 14px var(--gem-color));
  animation: floatAnim ease-in-out infinite;
}

.dark .gem-shard { opacity: 0.4; }

.gem-shard img { width: 100%; height: 100%; object-fit: cover; }

.gs1 { top: 6%;  left: 4%;  width: 62px; height: 62px; animation-duration: 7s; }
.gs2 { top: 66%; left: 10%; width: 44px; height: 44px; animation-duration: 5.5s; }
.gs3 { top: 14%; left: 90%; width: 54px; height: 54px; animation-duration: 6.5s; }
.gs4 { top: 80%; left: 84%; width: 48px; height: 48px; animation-duration: 8s; }
.gs5 { top: 42%; left: 52%; width: 38px; height: 38px; animation-duration: 6s; }
.gs6 { top: 4%;  left: 46%; width: 34px; height: 34px; animation-duration: 9s; }

@media (max-width: 900px) {
  .gem-shard { display: none; }
}

.hero-badge {
  display: inline-block;
  width: fit-content;
  padding: 0.4rem 0.9rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.75rem;
  background: rgba(147, 51, 234, 0.1);
  color: #7e22ce;
  border: 1px solid rgba(147, 51, 234, 0.25);
}

.dark .hero-badge { color: #e9d5ff; background: rgba(233, 213, 255, 0.12); border-color: rgba(233, 213, 255, 0.3); }

.hero-title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: #0f172a;
}

.dark .hero-title { color: #fff; }

.hero-title-accent {
  background: linear-gradient(180deg, #9333ea, #db2777, #4f46e5);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradientShift 6s ease infinite;
}

.hero-sub {
  max-width: 32rem;
  font-size: 0.95rem;
  color: #334155;
  line-height: 1.6;
}

.dark .hero-sub { color: #cbd5e1; }

.hero-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 34rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 20px 30px -15px rgba(139, 92, 246, 0.2);
  color: #7e22ce;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.hero-search:focus-within { transform: translateY(-2px); box-shadow: 0 24px 34px -14px rgba(139, 92, 246, 0.3); }

.dark .hero-search { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.14); color: #d8b4fe; }

.hero-search-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e293b;
}

.dark .hero-search-input { color: #f1f5f9; }
.hero-search-input::placeholder { color: #64748b; }
.dark .hero-search-input::placeholder { color: #94a3b8; }

.hero-search-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.7rem 1.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  border-radius: 0.75rem;
  background: linear-gradient(90deg, #9333ea, #4f46e5);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero-search-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 20px -8px rgba(139, 92, 246, 0.5); }

.hero-stats { display: flex; flex-wrap: wrap; gap: 0.75rem; }

.stat-chip {
  display: flex;
  flex-direction: column;
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.25);
  min-width: 108px;
}

.dark .stat-chip { background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.12); }

.stat-chip b { font-size: 1.25rem; font-weight: 900; color: #6d28d9; font-variant-numeric: tabular-nums; }
.dark .stat-chip b { color: #d8b4fe; }
.stat-chip span { font-size: 0.65rem; color: #475569; font-weight: 600; }
.dark .stat-chip span { color: #94a3b8; }

.hero-copyright { font-size: 0.7rem; color: #64748b; }
.dark .hero-copyright { color: #94a3b8; }

/* Updates panel */
.updates-panel {
  position: relative;
  overflow: hidden;
}

.update-row {
  width: 100%;
}

.update-number {
  padding: 0.3rem 0.55rem;
  font-size: 0.7rem;
  font-weight: 800;
  color: #a21caf;
  background: rgba(217, 70, 239, 0.14);
  border-radius: 0.5rem;
}

.dark .update-number { color: #f0abfc; background: rgba(217, 70, 239, 0.22); }

/* =========================================================================
 * Shared section chrome
 * ========================================================================= */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-bar {
  width: 0.5rem;
  height: 2.5rem;
  border-radius: 999px;
  flex-shrink: 0;
}

.section-title { font-size: 1.25rem; font-weight: 900; line-height: 1.2; }
.section-sub { font-size: 0.75rem; font-weight: 600; color: #475569; margin-top: 0.15rem; }
.dark .section-sub { color: #94a3b8; }

.section-cta {
  padding: 0.6rem 1.1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  border-radius: 0.75rem;
  transition: transform 0.2s ease;
}

.section-cta:hover { transform: translateY(-1px); }

/* =========================================================================
 * Gem-cut / tilt primitives
 * ========================================================================= */
.gem-cut { clip-path: polygon(26px 0, 100% 0, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0 100%, 0 26px); }

.tilt-panel, .tilt-card, .updates-panel, .tool-featured, .tool-tile, .favorite-card {
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --glow-x: 50%;
  --glow-y: 50%;
  transform: perspective(1200px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
  transition: transform 0.15s ease-out, box-shadow 0.2s ease;
}

.updates-panel:hover, .tool-featured:hover, .tool-tile:hover, .favorite-card:hover {
  transform: perspective(1200px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) translateY(-6px);
}

.tilt-shine {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
  background: radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255, 255, 255, 0.35), transparent 45%);
  mix-blend-mode: overlay;
}

.tool-featured:hover .tilt-shine, .tool-tile:hover .tilt-shine { opacity: 1; }

/* =========================================================================
 * Favorites shelf
 * ========================================================================= */
.favorites-shelf {
  display: flex;
  gap: 0.9rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x proximity;
}

.favorite-card {
  scroll-snap-align: start;
  flex: 0 0 220px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem;
  border-radius: 1.25rem;
  border-width: 1px;
  cursor: pointer;
  text-align: left;
}

.empty-state {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

/* =========================================================================
 * About vault
 * ========================================================================= */
.about-vault {
  position: relative;
  overflow: hidden;
  border-radius: 1.75rem;
  padding: 2rem;
}

.about-vault-pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: url('/images/batik.png');
  background-repeat: repeat;
  background-size: 220px;
  opacity: 0.84;
}

.dark .about-vault-pattern {
  opacity: 0.22;
  mix-blend-mode: screen;
}

.about-vault-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.25), transparent 55%);
  pointer-events: none;
}

.about-eyebrow {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #7e22ce;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.25);
  padding: 0.3rem 0.7rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.dark .about-eyebrow { color: #d8b4fe; background: rgba(139, 92, 246, 0.15); border-color: rgba(139, 92, 246, 0.3); }

.about-title { font-size: 1.6rem; font-weight: 900; margin-bottom: 0.6rem; }
.about-copy { font-size: 0.9rem; line-height: 1.6; max-width: 34rem; }

.about-dev {
  border-left-width: 1px;
  border-left-style: solid;
  padding-left: 1.5rem;
}

.about-dev-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }

.about-dev-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.9rem;
  padding: 0.55rem 1rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(90deg, #9333ea, #4f46e5);
  border-radius: 0.75rem;
  transition: transform 0.8s ease;
}

.about-dev-link:hover { transform: translateX(60px); }

@media (max-width: 767px) {
  .about-dev { 
    border-left: none; 
    border-top-width: 1px; 
    border-top-style: solid;
    padding-left: 0; 
    padding-top: 1.25rem; 
  }
}

/* =========================================================================
 * Tools bento
 * ========================================================================= */
.tools-bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(150px, auto);
  gap: 1.1rem;
}

.tool-featured {
  position: relative;
  overflow: hidden;
  grid-column: span 2;
  grid-row: span 2;
  padding: 1.75rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(109, 40, 217, 0.18);
  cursor: pointer;
  text-align: left;
  /* Light mode gradient: soft lavender, matches the rest of the light theme */
  background: linear-gradient(150deg, #f5f3ff 0%, #ede9fe 55%, #ddd6fe 100%);
}

/* Menyesuaikan otomatis jika kelas dark aktif di elemen root/body */
.dark .tool-featured {
  /* Dark mode gradient yang lebih gelap */
  border-color: rgba(255, 255, 255, 0.1);
  background: linear-gradient(150deg, #4f46e5, #0b0a14 70%);
}

.tool-featured-tag {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #047857;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 0.25rem 0.6rem;
  border-radius: 0.5rem;
}

.dark .tool-featured-tag { color: #6ee7b7; }

.tool-tile {
  position: relative;
  overflow: hidden;
  grid-column: span 1;
  grid-row: span 1;
  display: flex;
  flex-direction: column;
  padding: 1.1rem;
  border-radius: 1.25rem;
  border-width: 1px;
  cursor: pointer;
  text-align: left;
}

.tool-tile-desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-tile-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  width: fit-content;
  padding: 0.4rem 0.8rem;
  margin-top: 0.9rem;
  border-radius: 0.65rem;
  font-size: 0.65rem;
  font-weight: 800;
}

@media (max-width: 900px) {
  .tools-bento { grid-template-columns: repeat(2, 1fr); }
  .tool-featured { grid-column: span 2; grid-row: span 1; }
}

@media (max-width: 560px) {
  .tools-bento { grid-template-columns: 1fr; }
  .tool-featured { grid-column: span 1; }
}

/* =========================================================================
 * Guide rows
 * ========================================================================= */
.guide-rows {
  display: flex;
  flex-direction: column;
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.guide-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  border-left-width: 4px;
  border-left-style: solid;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  background: rgba(255, 255, 255, 0.6);
  text-align: left;
  transition: background 0.2s ease, padding-left 0.2s ease;
}

.dark .guide-row { background: rgba(15, 23, 42, 0.4); border-bottom-color: rgba(255, 255, 255, 0.06); }

.guide-row:last-child { border-bottom: none; }
.guide-row:hover { padding-left: 1.6rem; background: rgba(255, 255, 255, 0.9); }
.dark .guide-row:hover { background: rgba(30, 41, 59, 0.7); }

.guide-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 1px;
}

.guide-text { flex: 1; min-width: 0; }

.guide-cta {
  flex-shrink: 0;
  padding: 0.5rem 0.9rem;
  border-radius: 0.65rem;
  font-size: 0.7rem;
  font-weight: 800;
}

/* =========================================================================
 * Database timeline
 * ========================================================================= */
.db-timeline {
  position: relative;
  padding-left: 1.75rem;
}

.db-timeline::before {
  content: '';
  position: absolute;
  left: 0.6rem;
  top: 0.4rem;
  bottom: 0.4rem;
  width: 2px;
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.6), rgba(148, 163, 184, 0.1));
}

.db-node {
  position: relative;
  margin-bottom: 0.85rem;
  cursor: pointer;
}

.db-node:last-child { margin-bottom: 0; }

.db-dot {
  position: absolute;
  left: -1.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 999px;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.6);
}

.dark .db-dot { box-shadow: 0 0 0 3px #0b0a14; }

.db-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: 1rem;
  border-width: 1px;
  transition: transform 0.2s ease;
}

.db-node:hover .db-card { transform: translateX(4px); }
</style>