<template>
  <div class="max-w-7xl mx-auto space-y-12 pb-20">
    <div class="text-center space-y-4">
      <div class="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black tracking-[0.3em] uppercase">
        TIMI DB-LEVELING LIST
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
        <span>By Timi DB</span>
        <span>•</span>
        <span>Updated March 2026</span>
      </div>
    </div>

    <div class="sticky top-4 z-30 p-4 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 shadow-2xl"
         :class="isDark ? 'bg-slate-900/80 border-white/10 shadow-indigo-500/5' : 'bg-white/80 border-slate-200 shadow-slate-200/50'">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <div class="p-8 rounded-[2.5rem] border bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white shadow-2xl shadow-indigo-500/20 flex flex-col justify-center">
        <h2 class="text-2xl font-black italic mb-4 uppercase tracking-tighter">Mastering the EXP System</h2>
        <p class="text-sm leading-relaxed opacity-90 font-medium italic">
          Toram Online currently has a maximum level cap of 315. While you can level up anywhere, specific "Popular Spots" provide optimal EXP efficiency. The core mechanic relies on the +/- 9 Level Difference Rule: to gain maximum experience, your character's level should not differ by more than 9 levels from the target Mob or Boss.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="(tip, i) in tips" :key="i" 
          class="p-6 rounded-[2rem] border transition-transform hover:-translate-y-1"
          :class="isDark ? 'bg-slate-900/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'">
          <div class="text-2xl mb-2">{{ tip.icon }}</div>
          <h4 class="font-black text-xs uppercase tracking-wider mb-1">{{ tip.title }}</h4>
          <p class="text-[11px] opacity-60 leading-relaxed font-medium">{{ tip.content }}</p>
        </div>
      </div>
    </div>

    <div v-if="filteredSpots.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      <div v-for="(spot, index) in filteredSpots" :key="index" 
        class="group relative flex flex-col rounded-[2.5rem] border transition-all duration-500"
        :class="isDark ? 'bg-slate-900/60 border-white/10 hover:border-indigo-500/40' : 'bg-white border-slate-200 hover:border-indigo-400/40 hover:shadow-xl'">
        
        <div class="absolute -top-3 left-8 px-5 py-1.5 rounded-2xl bg-slate-800 text-white dark:bg-indigo-600 font-black italic text-xs shadow-lg z-10 transition-transform group-hover:scale-110">
          LV {{ spot.range }}
        </div>

        <div class="p-8 pt-10 flex-1 flex flex-col space-y-6">
          <div class="space-y-3">
            <span class="text-[9px] font-black text-indigo-500 uppercase tracking-widest block">Primary Target</span>
            <div class="space-y-1">
              <h3 class="text-lg font-black uppercase leading-tight tracking-tight group-hover:text-indigo-500 transition-colors">
                {{ spot.main.name }}
              </h3>
              <p v-if="spot.main.type" class="text-[10px] font-bold opacity-40 uppercase italic">{{ spot.main.type }}</p>
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
                  <p class="text-[11px] font-black uppercase leading-tight">{{ alt.name }}</p>
                  <p class="text-[9px] font-bold opacity-40 uppercase">{{ alt.type || 'Mini Boss' }}</p>
                </div>
                <span v-if="alt.lv" class="text-[9px] font-black px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-500">LV {{ alt.lv }}</span>
              </div>
              <p class="text-[10px] opacity-60 font-medium leading-snug">📍 {{ alt.loc }}</p>
            </div>
          </div>
        </div>
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
import { ref, computed } from 'vue';

defineProps(['isDark']);

// Reactive States untuk Fitur Baru
const searchQuery = ref('');
const userLevel = ref(null);
const activeTab = ref('All');
const tabs = ['All', 'Boss', 'Mini Boss', 'Mob'];

const tips = [
  { icon: '☀️', title: 'Daily Buffs', content: 'Always complete daily emblems that reward EXP Gain before starting.' },
  { icon: '📚', title: 'EXP Books', content: 'Use EXP Books from rewards or Shop to significantly boost your leveling speed.' },
  { icon: '⚔️', title: 'Main Quest', content: 'Only proceed with Main Quest (MQ) to unlock locked maps or specific boss access.' },
  { icon: '🌐', title: 'Multiplayer', content: 'Group up! Toram is a Massive Multiplayer game; partying makes leveling much faster.' }
];

const levelingList = [
  { range: '1-40', main: { name: 'Pova', type: 'Mob', loc: 'Lonogo Canyon' } },
  { range: '40-55', main: { name: 'Bone Dragonewt', type: 'Mob', loc: 'Ancient Empress Tomb: Area 1' } },
  { range: '55-70', main: { name: 'Flare Volg (Hard/NM)', type: 'Boss', loc: 'Fiery Volcano: Lava Trail' } },
  { range: '70-95', main: { name: 'Masked Warrior (Hard/NM)', type: 'Boss', loc: 'Land Under Cultivation: Hill' } },
  { range: '95-112', main: { name: 'Masked Warrior (Ultimate)', type: 'Boss', loc: 'Land Under Cultivation: Hill' }, 
    alts: [{ name: 'Don Yeti', lv: '103', loc: 'Polde Ice Valley (Lembah Es Polde)' }] 
  },
  { range: '112-125', main: { name: 'Cerberus (Nightmare)', type: 'Boss', loc: 'Spring of Rebirth: Top' } },
  { range: '125-129', main: { name: 'Lapin The Necromancer', type: 'Mini Boss', loc: 'Trace of Dark River' } },
  { range: '129-146', main: { name: 'Cerberus (Ultimate)', type: 'Boss', loc: 'Spring of Rebirth: Top' }, 
    alts: [{ name: 'Builder Golem', lv: '132-143', loc: 'Huge Crysta Factory: 3rd Floor' }] 
  },
  { range: '146-162', main: { name: 'Venena Coenubia (Hard)', type: 'Boss', loc: 'Ultimea Palace: Throne' }, 
    alts: [
      { name: 'Super Death Mushroom', lv: '143-158', loc: 'Monster\'s Forest: Animal Trail' },
      { name: 'Commander Golem', lv: '146-162', loc: 'Lufenas Mansion: Entrance' }
    ] 
  },
  { range: '162-179', main: { name: 'Venena Coenubia (Nightmare)', type: 'Boss', loc: 'Ultimea Palace: Throne' }, 
    alts: [{ name: 'Altoblepas', lv: '166-182', loc: 'Rokoko Plains' }] 
  },
  { range: '179-182', main: { name: 'Altoblepas', type: 'Mini Boss', loc: 'Rokoko Plains' } },
  { range: '182-199', main: { name: 'Venena Coenubia (Ultimate)', type: 'Boss', loc: 'Ultimea Palace: Throne' } },
  { range: '199-215', main: { name: 'Finstern the Dark Dragon (Ultimate)', type: 'Boss', loc: 'Dark Dragon Shrine: Near the Top' } },
  { range: '215-227', main: { name: 'Kuzto (Ultimate)', type: 'Boss', loc: 'Labilans Sector: Square' }, 
    alts: [{ name: 'Espectro', lv: '213-229', loc: 'Arche Valley: Area 1' }] 
  },
  { range: '227-244', main: { name: 'Arachnidemon (Ultimate)', type: 'Boss', loc: 'Arche Valley: Depths' }, 
    alts: [
      { name: 'Rhinosaur', lv: '227-234', loc: 'Fugitive Lake Swamp: Area 3' },
      { name: 'Bullamius', lv: '234-246', loc: 'Storage Yard: Area 2' }
    ] 
  },
  { range: '244-253', main: { name: 'Ferzen the Rock Dragon (Ultimate)', type: 'Boss', loc: 'Guardian Forest: Giant Tree' }, 
    alts: [
      { name: 'Gemma (Ultimate)', lv: '244-253', loc: 'Furgitive Lake Swamp: Depths' },
      { name: 'Ignitrus', lv: '246-254', loc: 'Vulcani Crater Base' }
    ] 
  },
  { range: '253-266', main: { name: 'Trickster Dragon Mimyugon (Nightmare)', type: 'Boss', loc: 'Operation Zone: Cockpit Area' }, 
    alts: [
      { name: 'Brassozard', lv: '256-262', loc: 'Operation Zone: Climate Control Area' },
      { name: 'Trus', lv: '262-277', loc: 'Propulsion System Zone: Power Tank' }
    ] 
  },
  { range: '266-272', main: { name: 'Red Ash Dragon Rudis (Hard)', type: 'Boss', loc: 'Espuma Dome: Entrance' }, 
    alts: [
      { name: 'Walican (Nightmare)', lv: '266-272', loc: 'Jabali Kubwa: Summit' },
      { name: 'Trus', lv: '262-277', loc: 'Propulsion System Zone: Power Tank' }
    ] 
  },
  { range: '272-287', main: { name: 'Trickster Dragon Mimyugon (Ultimate)', type: 'Boss', loc: 'Operation Zone: Cockpit Area' }, 
    alts: [
      { name: 'Red Ash Dragon Rudis (Nightmare)', lv: '272-285', loc: 'Espuma Dome: Entrance' },
      { name: 'Walican (Ultimate)', lv: '278-296', loc: 'Jabali Kubwa: Summit' },
      { name: 'Capo Profundo', lv: '278-296', loc: 'Abandoned District: Area 3' }
    ] 
  },
  { range: '285-303', main: { name: 'Mulgoon (Nightmare)', type: 'Boss', loc: 'Menabra Plains' }, 
    alts: [{ name: 'Red Ash Dragon Rudis (Ultimate)', lv: '290-308', loc: 'Espuma Dome: Entrance' }] 
  },
  { range: '303-310', main: { name: 'Bakuzan (Hard)', type: 'Boss', loc: 'Afval Uplands' }, 
    alts: [
      { name: 'Biskyva (Nightmare)', lv: '294-312', loc: 'Aquastida Central' },
      { name: 'Meteora', lv: '293-311', loc: 'Menabra Plains' },
      { name: 'Wiltileaf', lv: '296-314', loc: 'Eumano Village Ruins: Area 2' }
    ] 
  }
];

// Computed Logic untuk Filtering
const filteredSpots = computed(() => {
  return levelingList.filter(spot => {
    // 1. Logic Filter Nama & Lokasi
    const matchesSearch = spot.main.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          spot.main.loc.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // 2. Logic Filter Kategori (Tabs)
    const matchesTab = activeTab.value === 'All' || spot.main.type === activeTab.value;

    // 3. Logic Filter Level (+/- 9 Level Rule)
    let matchesLevel = true;
    if (userLevel.value) {
      const [minRange, maxRange] = spot.range.split('-').map(Number);
      // Jika level user masuk dalam range spot +/- 9 level margin
      matchesLevel = userLevel.value >= (minRange - 9) && userLevel.value <= (maxRange + 9);
    }

    return matchesSearch && matchesTab && matchesLevel;
  });
});

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