<template>
  <div class="max-w-7xl mx-auto space-y-12 pb-20">
    <div class="text-center space-y-4">
    <button @click="$router.push('/')" class="group flex items-center gap-3 mb-10 transition-all hover:-translate-x-2">
        <div class="w-10 h-10 rounded-full border-2 border-cyan-500/50 flex items-center justify-center group-hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <svg class="w-5 h-5 text-cyan-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="3"/></svg>
        </div>
        <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 group-hover:text-cyan-500">Back</span>
      </button>
      <div class="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black tracking-[0.3em] uppercase">
        ✌︎㋡TIMI DB-LEVELING LIST✌︎㋡
      </div>
      <h1 class="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
        Leveling 
  <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-450 via-cyan-500 to-orange-700" 
        style="background-image: linear-gradient(to right, #ffe100, #8260ff, #f87171, #fb923c, #ea580c)">
    SPOT
  </span>
  1-310
      </h1>
      <div class="flex items-center justify-center gap-4 text-xs font-bold opacity-50 uppercase tracking-widest">
        <span>By Timi DB✌︎㋡</span>
        <span>•</span>
        <span>Updated April 2026</span>
      </div>
    </div>

    <div class="sticky top-4 z-30 p-4 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 shadow-2xl"
         :class="isDark ? 'bg-slate-900/80 border-white/10 shadow-indigo-500/5' : 'bg-white/80 border-slate-200 shadow-slate-200/50'">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div class="relative group">
          <input v-model="searchQuery" type="text" placeholder="Search Boss or Map..." 
                 class="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-indigo-500 transition-all outline-none text-xs font-bold uppercase tracking-wider">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
        </div>
        
        <div class="relative group">
          <input v-model.number="userLevel" type="number" placeholder="Enter Your Current LV..." 
                 class="w-full pl-20 pr-4 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-indigo-500 transition-all outline-none text-xs font-bold uppercase tracking-wider">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[12px] font-black text-indigo-500">MY LEVEL :</span>
        </div>

        <div class="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl">
          <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
                  :class="activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'opacity-40 hover:opacity-100'"
                  class="flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all duration-300">
            {{ tab }}
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      <div class="p-4 rounded-[2.5rem] border bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white shadow-2xl shadow-indigo-500/20 flex flex-col justify-center">
        <h2 class="text-2xl font-black italic mb-4 uppercase tracking-tighter">Mastering the EXP System</h2>
        <p class="text-sm leading-relaxed opacity-90 font-medium italic">
          Toram Online currently has a maximum level cap of 320. While you can level up anywhere, specific "Popular Spots" provide optimal EXP efficiency. The core mechanic relies on the +/- 9 Level Difference Rule: to gain maximum experience, your character's level should not differ by more than 9 levels from the target Mob or Boss. 
        </p> 
        <p class="text-lg text leading-relaxed opacity-100 font-medium italic">
          ⚠️
        </p> 
        <p class="text-m text bg-gradient-to-l from-cyan-450 via-cyan-500 to-indigo-900 leading-relaxed opacity-100 font-medium italic">
        [Note] Also you can shout lfp (meaning “looking for a party”) in intern channel if you did'nt have party.
        </p> 
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="(tip, i) in tips" :key="i" 
          class="p-2 rounded-[2rem] border transition-transform hover:-translate-y-1"
          :class="isDark ? 'bg-slate-900/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'">
          <div class="text-2xl mb-2">{{ tip.icon }}</div>
          <h4 class="font-black text-xs uppercase tracking-wider mb-1">{{ tip.title }}</h4>
          <p class="text-[11px] opacity-60 leading-relaxed font-medium">{{ tip.content }}</p>
        </div>
      </div>
    </div>
<p class="text-lg leading-relaxed opacity-90 font-bold italic">
      ➡️ Result
    </p>

    <div v-if="filteredSpots.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
        <div v-for="(spot, index) in paginatedSpots" :key="index" 
          class="group relative flex flex-col rounded-[2.5rem] border transition-all duration-500"
          :class="isDark ? 'bg-slate-900/60 border-white/10 hover:border-indigo-500/40' : 'bg-white border-slate-200 hover:border-indigo-400/40 hover:shadow-xl'">
          
          <div class="absolute -top-3 left-8 px-5 py-1.5 rounded-2xl bg-slate-800 text-white dark:bg-indigo-600 font-black italic text-xs shadow-lg z-10 transition-transform group-hover:scale-110">
            LV {{ spot.range }}
          </div>

          <div class="p-8 pt-10 flex-1 flex flex-col space-y-6">
            <div class="space-y-3">
              <div class="flex justify-between items-start">
                <div class="space-y-1">
                  <h3 class="text-lg font-black uppercase leading-tight tracking-tight group-hover:text-indigo-500 transition-colors">
                    {{ spot.main.name }}
                  </h3>
                  <span v-if="spot.main.difficulty"
                    :class="['text-[11px] font-black px-2 py-0.5 rounded-lg', diffClass(spot.main.difficulty)]">
                    {{ spot.main.difficulty }}
                  </span>
                  <p v-if="spot.main.type" class="text-[11px] font-bold opacity-40 uppercase italic">{{ spot.main.type }}</p>
                </div>
                <span v-if="spot.main.lv" class="text-[10px] font-black px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-500">LV {{ spot.main.lv }}</span>
              </div>
              <div class="flex items-start gap-2 text-[11px] font-bold opacity-70">
                <span class="mt-0.5">📍</span>
                <span>{{ spot.main.loc }}</span>
              </div>
            </div>

            <div v-if="spot.alts && spot.alts.length > 0" class="space-y-3 pt-5 border-t border-black/5 dark:border-white/5">
              <span class="text-[9px] font-black opacity-40 uppercase tracking-widest block">Alternative Options</span>
              <div v-for="(alt, ai) in spot.alts" :key="ai" 
                class="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-indigo-500/20 transition-all space-y-2">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-[12px] font-black uppercase leading-tight">{{ alt.name }}</p>
                    <span v-if="alt.difficulty"
                      :class="['text-[10px] font-black px-2 py-0.5 rounded-lg', diffClass(alt.difficulty)]">
                      {{ alt.difficulty }}
                    </span>
                    <p class="text-[11px] font-bold opacity-40 uppercase">{{ alt.type || 'Mini Boss' }}</p>
                  </div>
                  <span v-if="alt.lv" class="text-[10px] font-black px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-500">LV {{ alt.lv }}</span>
                </div>
                <p class="text-[10px] opacity-60 font-medium leading-snug">📍 {{ alt.loc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-10 flex-wrap">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 font-black text-xl shadow-lg disabled:opacity-20"
          :class="isDark ? 'border-indigo-500/20 text-indigo-400 bg-slate-900/50' : 'border-indigo-100 text-indigo-300 bg-white'"
        >
          <
        </button>

        <template v-for="page in displayedPages" :key="page">
          <button
            v-if="page !== '...'"
            @click="currentPage = page"
            class="w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 font-black text-lg shadow-lg"
            :class="currentPage === page 
              ? 'bg-indigo-600 border-indigo-600 text-white scale-110 z-10 shadow-indigo-500/50' 
              : (isDark 
                  ? 'border-indigo-500/20 text-indigo-400 bg-slate-900/50 hover:border-indigo-500/50' 
                  : 'border-indigo-100 text-indigo-500 bg-white hover:border-indigo-300')"
          >
            {{ page }}
          </button>
          <span 
            v-else 
            class="w-10 h-12 flex items-end justify-center font-black text-indigo-500 opacity-50 pb-2 text-xl"
          >
            {{ page }}
          </span>
        </template>

        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 font-black text-xl shadow-lg disabled:opacity-20"
          :class="isDark ? 'border-indigo-600 text-indigo-500 bg-slate-900/50' : 'border-indigo-600 text-indigo-600 bg-white'"
        >
          >
        </button>
      </div>
    </div>

    <div v-else class="py-20 text-center space-y-6 animate-fade-in">
      <div class="text-6xl animate-bounce">🔍</div>
      <div class="space-y-2">
        <p class="font-black uppercase tracking-[0.2em] italic text-2xl">No Spot Matches Found</p>
        <p class="text-sm opacity-50 font-medium">Try adjusting your filters or level range.</p>
      </div>
      <button @click="resetFilters" class="px-8 py-3 rounded-full bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all">
        Reset All Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

import { levelingList } from '../data/levelingSpots.js';

defineProps(['isDark']);

// 1. State Variables
const searchQuery = ref('');
const userLevel = ref(null);
const activeTab = ref('All');
const tabs = ['All', 'Boss', 'Mini Boss', 'Mob'];
const currentPage = ref(1);
const itemsPerPage = 9;

const filteredSpots = computed(() => {
  return levelingList.filter(spot => {
    // Filter Search
    const matchesSearch =
      spot.main.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      spot.main.loc.toLowerCase().includes(searchQuery.value.toLowerCase());

    // Filter Tab
    const matchesTab =
      activeTab.value === 'All' || spot.main.type === activeTab.value;

    // Filter Level
    let matchesLevel = true;
    if (userLevel.value !== null && userLevel.value !== '') {
      const [minRange, maxRange] = spot.range.split('-').map(Number);
      matchesLevel = userLevel.value >= minRange && userLevel.value <= maxRange;
    }

    return matchesSearch && matchesTab && matchesLevel;
  });
});

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;

  // Jika total halaman sedikit (misal <= 5), tampilkan semua saja
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Jika di halaman awal-awal (1, 2, atau 3)
  if (current <= 3) {
    return [1, 2, 3, '...', total];
  }

  // Jika di halaman akhir-akhir
  if (current >= total - 2) {
    return [1, '...', total - 2, total - 1, total];
  }

  // Jika di tengah-tengah
  // Format: [1, '...', current, '...', total]
  return [1, '...', current, '...', total];
});
const totalPages = computed(() => Math.ceil(filteredSpots.value.length / itemsPerPage));

const paginatedSpots = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredSpots.value.slice(start, start + itemsPerPage);
});

// 4. Watchers & Helpers
watch([searchQuery, userLevel, activeTab], () => { 
  currentPage.value = 1; 
});

const tips = [
  { icon: '☀️', title: 'Daily Buffs', content: 'Always complete daily emblems that reward EXP Gain before starting.' },
  { icon: '📚', title: 'EXP Books', content: 'Use EXP Books from rewards or Shop to significantly boost your leveling speed.' },
  { icon: '⚔️', title: 'Main Quest', content: 'Only proceed with Main Quest (MQ) to unlock locked maps or specific boss access.' },
  { icon: '🌐', title: 'Multiplayer', content: 'Group up! Toram is a Multiplayer game; partying makes leveling much faster.' }
];

const diffClass = (diff) => {
  switch (diff) {
    case 'Normal':
      return 'bg-gray-200 text-gray-700 dark:bg-gray-700/40 dark:text-gray-300'

    case 'Hard':
      return 'bg-blue-200 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300'

    case 'Nightmare':
      return 'bg-purple-200 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300'

    case 'Ultimate':
      return 'bg-red-200 text-red-700 dark:bg-red-500/20 dark:text-red-300'

    case 'High Difficulty Boss':
      return 'bg-yellow-200 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300'

    default:
      return 'bg-indigo-200 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
  }
}

const resetFilters = () => {
  searchQuery.value = '';
  userLevel.value = null;
  activeTab.value = 'All';
};
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>