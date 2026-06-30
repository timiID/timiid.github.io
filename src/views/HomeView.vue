<script setup>
import { useRouter } from 'vue-router';

import normalCrystas from "@/assets/icons/crysta_normal.jpg";
import weaponCrystas from "@/assets/icons/crysta_senjata.jpg";
import armorCrystas from "@/assets/icons/crysta_zirah.jpg";
import additionalCrystas from "@/assets/icons/crysta_pelengkap.jpg";
import specialCrystas from "@/assets/icons/crysta_tambahan.jpg";
import favoriteCrystaIcon from "@/assets/icons/crysta_favorite.png";

import iconBag from '@/assets/iconfromhome/bag.png'
import iconMq from '@/assets/iconfromhome/mq.png'
import iconMqCalc from '@/assets/iconfromhome/mq_calc.png'
import iconBsCalc from '@/assets/iconfromhome/bs_calc.png'
import iconXtall from '@/assets/iconfromhome/xtall.png'
import iconEvent from '@/assets/iconfromhome/event.png'
import iconLeveling from '@/assets/iconfromhome/lvling.png'
import iconFavorite from '@/assets/iconfromhome/favorite.png'
import iconMats from '@/assets/iconfromhome/farmmats.png'
import iconsearchapi from '@/assets/iconfromhome/what chara39.jpg'

import { ref, onMounted, onUnmounted } from 'vue';
import { crystalData } from '../data/store.js'; // Pastikan path store lo bener

const favoriteXtalls = ref([]);
const backgrounds = [
  '/images/peluluchan.png',
  '/images/hanami11.png',
];
const currentBgIndex = ref(0);
let homeInterval = null;

const props = defineProps({
  isDark: Boolean
});

const getIconPath = (type) => {
  if (type && type.includes('Upgrade')) return favoriteCrystaIcon;
  const icons = {
    'Normal': normalCrystas,
    'Senjata': weaponCrystas,
    'Zirah': armorCrystas,
    'Pelengkap': additionalCrystas,
    'Tambahan': specialCrystas
  };
  return icons[type] || favoriteCrystaIcon;
};

const router = useRouter();

 const features = [
  { 
    name: 'BAG LIST', 
    path: '/bag-list', 
    icon: iconBag, // Gunakan variabel import
    desc: 'Manage your item storage efficiently.',
    color: 'from-blue-600 to-cyan-800'
  },
  { 
    name: 'MQ LIST', 
    path: '/mq-list', 
    icon: iconMq, 
    desc: 'Complete list of Toram Online Main Quests.',
    color: 'from-purple-500 to-indigo-500'
  },
  { 
    name: 'MQ CALC', 
    path: '/mq-calc', 
    icon: iconMqCalc, 
    desc: 'Calculate the EXP you need to level up.',
    color: 'from-pink-500 to-rose-500'
  },
  { 
    name: 'BS CALC', 
    path: '/bs-calc', 
    icon: iconBsCalc, 
    desc: 'Blacksmith simulator for perfect crafting.',
    color: 'from-orange-500 to-red-500'
  },
  { 
    name: 'XTALL ID', 
    path: '/xtall', 
    icon: iconXtall, 
    desc: 'Find the best crystals for your equipment. Xtall with Indonesia Language!',
    color: 'from-emerald-500 to-teal-500'
  }
];

const other = [
  { 
    name: 'Event Guide', 
    path: '/event', 
    icon: iconEvent, 
    desc: 'Annual events & calendar overview (Note: generally during those months, although that is not entirely accurate).',
    color: 'from-yellow-500 to-orange-400'
  },
  { 
    name: 'Leveling Spot', 
    path: '/lvling', 
    icon: iconLeveling, 
    desc: 'Fast leveling strategies, best EXP spots, and efficient progression tips.',
    color: 'from-blue-500 to-cyan-400'
  },
  { 
    name: 'Favorite Xtall', 
    path: '/favorite', 
    icon: iconFavorite, 
    desc: 'Favorite xtall from xtall page.',
    color: 'from-red-500 to-orange-500'
  },
  { 
    name: 'Material Farming Spot', 
    path: '/spotmats', 
    icon: iconMats, 
    desc: 'Best all spots farm in Toram Online for farmer mats.',
    color: 'from-purple-500 to-indigo-500'
  },
  { 
    name: 'Search Item (API)', 
    path: '/item-search', 
    icon: iconsearchapi, 
    desc: 'Search for items in the game with API Coryn.',
    color: 'from-green-500 to-indigo-500'
  }
  ];

onMounted(() => {
  const favIds = JSON.parse(localStorage.getItem('xtall_favs') || '[]');
  favoriteXtalls.value = crystalData
    .filter(c => favIds.includes(String(c.code)))
    .slice(0, 5);

  homeInterval = setInterval(() => {
    currentBgIndex.value = (currentBgIndex.value + 1) % backgrounds.length;
  }, 8000);
});

onUnmounted(() => {
  if (homeInterval) {
    clearInterval(homeInterval);
    homeInterval = null;
  }
});

const navigateTo = (path) => router.push(path);
</script>

<template>
  <div class="w-full flex flex-col items-center">

    <!-- Slideshow mobile only -->
    <div 
      class="fixed inset-0 pointer-events-none z-0 transition-all duration-[1500ms] ease-in-out block md:hidden"
      :style="{ 
        backgroundImage: `url(${backgrounds[currentBgIndex]})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        height: '1100px',
        opacity: '0.7',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 95%)',
        webkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 95%)'
      }"
    ></div>
    
    <div class="relative w-full flex flex-col items-center justify-center min-h-[650px] py-16 text-center px-4 overflow-hidden">
      
     

      <div class="relative z-10 flex flex-col items-center animate-fade-in">
        <div class="absolute inset-0 bg-indigo-500/10 blur-[120px] rounded-full"></div>
        
        <img src="/images/logo.png" width="176" height="176" class="relative w-32 md:w-44 mb-6 drop-shadow-2xl animate-float-slow" /> 
        
        <h1 class="relative text-4xl md:text-6xl font-[800] italic uppercase tracking-tighter leading-none transition-all">
  <span :class="isDark ? 'text-white' : 'text-slate-900'">TIMI </span>
  <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">DB㋡</span>
</h1>

<p v-if="false" class="relative max-w-xl text-1xl md:text-2xl font-bold uppercase tracking-widest mt-4
          text-slate-300 dark:text-slate-900
          [-webkit-text-stroke:_2px_black]
          dark:[-webkit-text-stroke:_2px_white]">
  "Your ultimate companion for Toram Online adventures."
</p>

<p class="font-mono-code relative max-w-xl text-sm font-bold leading-relaxed uppercase tracking-widest mt-2
          text-slate-900 dark:text-white
          filter drop-shadow-[0_1px_5px_rgba(180,83,9,0.4)] dark:drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
  © 2026
  
  <!-- Nama Brand (Link Aktif) -->
  <a href="https://timiid.github.io/" target="_blank"
     class="font-extrabold text-cyan-600 dark:text-cyan-400 hover:text-cyan-300
            [-webkit-text-stroke:_0.2px_white]
            underline decoration-blue-500/30 hover:decoration-cyan-400 transition-all
            drop-shadow-[0_1px_4px_rgba(146,64,14,0.5)] dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.85)]">
    TIMI DB㋡
  </a>

  <!-- Deskripsi Project -->
  <span class="[-webkit-text-stroke:_0.0px_white] dark:[-webkit-text-stroke:_0.3px_black]
               drop-shadow-[0_1px_4px_rgba(146,64,14,0.45)] dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.75)]">
    Toram Online Digital Database Project
  </span>
</p>

        <div class="relative space-y-1 mt-11 font-archivo">
  <div class="flex flex-col items-center text-center space-y-8 mt-1 pb-2">
    
    <!-- SECTION CONTRIBUTION -->
<div class="space-y-1.5 group/item">
  <span :class="[
    'inline-block px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] rounded-full transition-all duration-300',
    isDark 
      ? 'bg-gradient-to-r from-pink-600/25 via-purple-600/25 to-indigo-600/25 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)] border border-purple-500/30' 
      : 'bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-cyan-500/50 text-black shadow-[0_0_10px_rgba(168,85,247,0.1)] border border-purple-400/25'
  ]">
    Contribution
  </span>
  <a href="https://www.facebook.com/J7Timi" target="_blank" 
     :class="[
       'group relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5',
       isDark 
         ? 'border-white/20 bg-gradient-to-br from-purple-900/20 to-black/40 hover:from-purple-700/40 hover:to-white/10' 
         : 'border-purple-300/50 bg-gradient-to-br from-white/60 to-purple-50/30 hover:from-white hover:to-purple-100/60 shadow-sm hover:shadow-md'
     ]">
    <span :class="[
      'font-black uppercase text-base tracking-tight text-transparent bg-clip-text',
      isDark 
        ? 'bg-gradient-to-r from-cyan-300 to-blue-400 group-hover:from-cyan-200 group-hover:to-purple-400' 
        : 'bg-gradient-to-r from-blue-700 to-indigo-700 group-hover:from-blue-500 group-hover:to-purple-600'
    ]">
      TIMI
    </span>
  </a>
</div>

<!-- SECTION REFERENCE -->
<div class="space-y-1.5 group/item">
  <span :class="[
    'inline-block px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] rounded-full transition-all duration-300',
    isDark 
      ? 'bg-gradient-to-r from-amber-400/50 via-orange-500/50 to-rose-500/50 text-white shadow-[0_0_15px_rgba(249,115,22,0.2)] border border-orange-500/30' 
      : 'bg-gradient-to-r from-amber-500/25 via-orange-600/25 to-rose-600/25 text-black shadow-[0_0_10px_rgba(249,115,22,0.1)] border border-orange-400/25'
  ]">
    Reference
  </span>
  <a href="https://en.toram.jp/information/?type_code=update" target="_blank" 
     :class="[
       'group relative flex flex-col items-center gap-1 px-5 py-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5',
       isDark 
         ? 'border-white/20 bg-gradient-to-br from-orange-900/20 to-black/40 hover:from-orange-700/40 hover:to-white/10' 
         : 'border-orange-300/50 bg-gradient-to-br from-white/60 to-orange-50/30 hover:from-white hover:to-orange-100/60 shadow-sm hover:shadow-md'
     ]">
    <span :class="[
      'font-black uppercase text-sm tracking-wide text-transparent bg-clip-text',
      isDark 
        ? 'bg-gradient-to-r from-amber-300 to-orange-400 group-hover:from-yellow-200 group-hover:to-rose-400' 
        : 'bg-gradient-to-r from-orange-600 to-rose-700 group-hover:from-amber-500 group-hover:to-rose-500'
    ]">
      Toram Online Official Website
    </span>
    <span :class="[
      'text-[9px] font-black uppercase tracking-[0.4em]',
      isDark ? 'text-slate-300 opacity-70' : 'text-slate-700 opacity-60'
    ]">
      and Other Database Websites
    </span>
  </a>
</div>

          </div>
        </div>
      </div>
    </div>

    <div class="w-full max-w-6xl px-4 flex flex-col items-center relative z-10">
      
      <div v-if="favoriteXtalls && favoriteXtalls.length > 0" class="w-full mb-12 animate-slide-up">
  <div class="flex flex-wrap items-center justify-between gap-4 mb-8 px-2">

    <div class="flex items-center gap-3 px-4 py-2.5 rounded-xl border-b-4 border-rose-500/50 
              bg-gradient-to-r from-white/90 to-white/5
              dark:from-slate-800/30 dark:to-slate-950/5 
              [box-shadow:0_4px_15px_-4px_rgba(244,63,94,0.5)]">
      <h2 
        :class="[
          'font-black italic text-xl tracking-tighter uppercase transition-all duration-300',
          isDark 
            ? 'text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-pink-300 to-pink-600 [text-shadow:0_0_15px_rgba(244,63,94,0.4)]' 
            : 'text-transparent bg-clip-text bg-gradient-to-l from-pink-900 to-pink-600 to-yellow-500 [text-shadow:0_0_10px_rgba(244,63,94,0.2)]'
        ]"
      >
        Your Favorites
      </h2>

      <span 
        :class="[
          'font-black italic text-xl tracking-tighter uppercase transition-all duration-300',
          isDark ? 'text-yellow-400/90' : 'text-orange-900/90'
        ]"
      >
        >>
      </span>
    </div>

    <button @click="navigateTo('/favorite')" 
            :class="[
              'group flex items-center gap-2 px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-lg active:scale-95',
              isDark ? 'bg-rose-600 border-b-4 border-rose-800 text-white hover:bg-rose-500' : 'bg-rose-500 border-b-4 border-rose-700 text-white hover:bg-rose-400'
            ]">
      <span>View All</span>
      <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </button>

  </div>

  <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
    <div v-for="fav in favoriteXtalls" :key="fav.code"
     @click="navigateTo(`/xtall/${fav.code}`)"
     :class="[
       'group relative overflow-hidden rounded-2xl border backdrop-blur-md p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1',
       isDark 
         ? 'border-zinc-800 bg-gradient-to-br from-zinc-900/20 via-zinc-900/40 to-amber-950/40 hover:from-zinc-800 hover:to-amber-900/60 shadow-inner'
         : 'border-amber-100 bg-gradient-to-br from-orange-50 via-amber-50/50 to-amber-100/70 hover:from-orange-100/80 hover:to-amber-200/60 shadow-sm hover:shadow-md'
     ]"
>
     <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <img :src="getIconPath(fav.type)" class="w-7 h-7 object-contain drop-shadow-md" />
        </div>
        <div class="text-left overflow-hidden">
          <h4 class="text-[11px] font-black uppercase tracking-tight truncate">{{ fav.name }}</h4>
          <p class="text-[8px] opacity-40 font-bold uppercase tracking-widest">{{ fav.type }}</p>
        </div>
      </div>
    </div>
  </div>
</div>

      <div class="w-full flex items-center gap-6 my-16 opacity-50">
        <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500"></div>
        <h2 class="font-archivo italic text-2xl tracking-tighter uppercase shrink-0">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">MAIN GUIDES</span>
        </h2>
        <div class="h-[1px] flex-1 bg-gradient-to-r from-purple-500 via-red-500 to-transparent"></div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-7 w-full animate-slide-up">
        <div v-for="item in features" :key="item.path" @click="navigateTo(item.path)"
             class="group relative overflow-hidden rounded-[2rem] border border-black/80 bg-white/25 dark:bg-white/5 backdrop-blur-xl p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
          <div :class="['absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br', item.color]"></div>
          <div class="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div class="mb-4 h-16 flex items-center justify-center">
              <img :src="item.icon" :alt="item.name" class="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg" />
            </div>
            <h3 class="text-xl font-black mb-2 tracking-tight">{{ item.name }}</h3>
            <p class="text-xs opacity-60 leading-loose">{{ item.desc }}</p>
            <div class="mt-6 flex items-center gap-2 text-[10px] font-black tracking-widest text-purple-400 uppercase">
              Open <span>→</span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex items-center gap-6 my-16 opacity-50">
        <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent via-yellow-500 to-orange-500"></div>
        <h2 class="font-archivo italic text-2xl tracking-tighter uppercase shrink-0">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">OTHER GUIDES</span>
        </h2>
        <div class="h-[1px] flex-1 bg-gradient-to-r from-orange-500 via-red-500 to-transparent"></div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-7 w-full animate-slide-up pb-20">
        <div v-for="item in other" :key="item.path" @click="navigateTo(item.path)"
             class="group relative overflow-hidden rounded-[2rem] border border-black/80 bg-white/25 dark:bg-white/5 backdrop-blur-xl p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
          <div :class="['absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br', item.color]"></div>
          <div class="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div class="mb-4 h-16 flex items-center justify-center">
              <img :src="item.icon" :alt="item.name" class="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg" />
            </div>
            <h3 class="text-xl font-black mb-2 tracking-tight">{{ item.name }}</h3>
            <p class="text-xs opacity-60 leading-loose">{{ item.desc }}</p>
            <div class="mt-6 flex items-center gap-2 text-[10px] font-black tracking-widest text-orange-400 group-hover:text-orange-300 transition-colors uppercase">
              Open <span>→</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');

.font-mono-code {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
}

@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

.font-archivo {
  font-family: 'Archivo Black', sans-serif;
}

.animate-gradient-xy {
  background-size: 200% 200%;
  animation: gradientXY 4s ease infinite;
}

@keyframes gradientXY {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-float-slow {
  animation: floatSlow 6s ease-in-out infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
</style>
