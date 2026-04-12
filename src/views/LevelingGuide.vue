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
        
    <div v-if="filteredSpots.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      <div v-for="(spot, index) in filteredSpots" :key="index" 
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
              <!-- DIFF BADGE -->
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
                  <!-- DIFF ALT -->
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

const levelingList = [
  // ===== MOB =====
  { range: '1-35', main: { name: 'Shell Mask', type: 'Mob', lv: 23, loc: 'Nisel Mountain' } },
  { range: '30-45', main: { name: 'Pova', type: 'Mob', lv: 32, loc: 'Lonogo Canyon' } },
  { range: '45-55', main: { name: 'Dragonewt', type: 'Mob', lv: 46, loc: 'Ancient Empress Tomb' } },
  { range: '55-62', main: { name: 'Parasitized Dog', type: 'Mob', lv: 57, loc: 'Lost Town' } },
  { range: '62-70', main: { name: 'Mewte', type: 'Mob', lv: 63, loc: 'Gravel Terrace' } },
  { range: '70-85', main: { name: 'Frosti', type: 'Mob', lv: 79, loc: 'Fort Solfini' } },
  { range: '85-90', main: { name: 'Finpen', type: 'Mob', lv: 85, loc: 'Spring of Rebirth' } },
  { range: '90-104', main: { name: 'Corroded Dark Fighter/ Knight', type: 'Mob', loc: 'Dark Castle' } },
  { range: '104-119', main: { name: 'Grape Jelly', type: 'Mob', lv: 110, loc: 'Ultimea Sewer: Southeast' } },
  { range: '119-124', main: { name: 'Venomsch', type: 'Mob', lv: 112, loc: 'Ultimea Sewer: South' } },
  { range: '124-142', main: { name: 'Berrylfree', type: 'Mob', lv: 133, loc: 'Barbaros Corridor' } },
  { range: '142-150', main: { name: 'Bubble Angel', type: 'Mob', lv: 143, loc: 'Shrine of the God' } },
  { range: '150-160', main: { name: 'Ivy', type: 'Mob', lv: 151, loc: 'Dark Dragon Shrine' } },
  { range: '160-178', main: { name: 'Weltacle', type: 'Mob', lv: 168, loc: 'Recetacula Sector' } },
  { range: '178-197', main: { name: 'Juvestida', type: 'Mob', lv: 186, loc: 'Nov Diela' } },
  { range: '198-206', main: { name: 'Bitum', type: 'Mob', lv: 208, loc: 'Mt. Vulcani' } },
  { range: '206-223', main: { name: 'Laduro', type: 'Mob', lv: 214, loc: 'Tunnel of Trials' } },
  { range: '224-234', main: { name: 'Breppa', type: 'Mob', lv: 226, loc: 'Algid Passage' } },
  { range: '235-249', main: { name: 'Anglerfish', type: 'Mob', lv: 240, loc: 'Abandoned District' } },
  { range: '250-267', main: { name: 'Corroded Lixi', type: 'Mob', lv: 258, loc: 'Lixaro Ghost Town' } },
  { range: '250-267', main: { name: 'Alpoca', type: 'Mob', lv: 257, loc: 'Vicus Mutans: Area 3' } },
  { range: '268-285', main: { name: 'Umang', type: 'Mob', lv: 277, loc: 'Raden Tower: Air Vent' } },
  { range: '286-290', main: { name: 'Zamlun', type: 'Mob', lv: 284, loc: 'Izolara Underground Passage' } },

  // ===== BOSS =====
  {
    range: '0-14', 
    main: { name: 'Boss Colon', type: 'Boss', difficulty: 'Normal', lv: 4, loc: 'Land Under Development' },
  },
  {
    range: '15-22', 
    main: { name: 'Boss Colon', type: 'Boss', difficulty: 'Hard', lv: 14, loc: 'Land Under Development' },
    alts: [
       { name: 'Lavarca', type: 'Mini Boss', lv: 21, loc: 'Rakau Plains' },
    ]
  },
  {
    range: '22-33', 
    main: { name: 'Boss Colon', type: 'Boss', difficulty: 'Nightmare', lv: 24, loc: 'Land Under Development' },
    alts: [
       { name: 'Lavarca', type: 'Mini Boss', lv: 21, loc: 'Rakau Plains' },
    ]
  },
  {
    range: '55-64', 
    main: { name: 'Flare Volg', type: 'Boss', difficulty: 'Hard', lv: 57, loc: 'Fiery Volcano: Lava Trail' },
    alts: [
      { name: 'Masked Warrior', type: 'Boss', difficulty: 'Normal', lv: 67, loc: 'Land Under Cultivation: Hill' },
    ]
  },

  {
    range: '64-75',
    main: { name: 'Flare Volg', type: 'Boss', difficulty: 'Nightmare', lv: 67, loc: 'Fiery Volcano: Lava Trail' },
    alts: [
      { name: 'Masked Warrior', type: 'Boss', difficulty: 'Normal', lv: 67, loc: 'Land Under Cultivation: Hill' },
    ] 
  },

  {
    range: '75 - 85',
    main: { name: 'Masked Warrior', type: 'Boss', difficulty: 'Hard', lv: 77, loc: 'Land Under Cultivation: Hill' },
    alts: [
      { name: 'Metal Stinger', type: 'Mini Boss', lv: 82, loc: 'Akaku Desert: Area 2' },
    ]   
  },

  {
    range: '86 - 94',
    main: { name: 'Masked Warrior', type: 'Boss', difficulty: 'Nightmare', lv: 87, loc: 'Land Under Cultivation: Hill' },
    alts: [
      { name: 'Metal Stinger', type: 'Mini Boss', lv: 82, loc: 'Akaku Desert: Area 2' },
    ]
  },

  {
    range: '94-105',
    main: { name: 'Masked Warrior', type: 'Boss', difficulty: 'Ultimate', lv: 97, loc: 'Land Under Cultivation: Hill' },
    alts: [
      { name: 'Don Yeti', type: 'Mini Boss', lv: 103, loc: 'Polde Ice Valley' }
    ]
  },

  {
    range: '102-111',
    main: { name: 'Don Yeti', type: 'Mini Boss', lv: 103, loc: 'Polde Ice Valley' }
  },

  {
    range: '112-125',
    main: { name: 'Cerberus', type: 'Boss', difficulty: 'Nightmare', lv: 117, loc: 'Spring of Rebirth: Top' },
    alts: [
      { name: 'Cerberus', type: 'Boss', difficulty: 'Hard', lv: 107, loc: 'Spring of Rebirth: Top' }
    ]
  },

  {
    range: '125-129',
    main: { name: 'Lapin The Necromancer', type: 'Mini Boss', lv: 124, loc: 'Trace of Dark River' },
  },

  {
    range: '129-146',
    main: { name: 'Cerberus', type: 'Boss', difficulty: 'Ultimate', lv: 137, loc: 'Spring of Rebirth: Top' },
    alts: [
      { name: 'Builder Golem', type: 'Mini Boss', lv: 138, loc: 'Huge Crysta Factory: 3rd Floor' },
      { name: 'York', type: 'Boss', difficulty: 'Nightmare', lv: 138, loc: 'Huge Crysta Factory: Storage' },
      { name: 'Ancient Empress Mezzaluna', type: 'Boss', difficulty: 'High Difficulty Boss', lv: 135, loc: 'Harde Hill' }
    ]
  },

  {
    range: '146-162',
    main: { name: 'Commander Golem', type: 'Mini Boss', lv: 154, loc: 'Lufenas Mansion: Entrance' }, 
    alts: [
      { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Normal', lv: 150, loc: 'Ultimea Palace: Throne' },
      { name: 'Ifrid', type: 'Boss', difficulty: 'Ultimate', lv: 152, loc: 'Blazing Graben: Deepest Part' },
      { name: 'Super Death Mushroom', type: 'Mini Boss', lv: 150, loc: "Monster's Forest: Animal Trail" },
      { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Hard', lv: 160, loc: 'Ultimea Palace: Throne' },
    ]
  },

  {
    range: '162-177',
    main: { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Nightmare', lv: 170, loc: 'Ultimea Palace: Throne' },
    alts: [
      { name: 'Altoblepas', type: 'Mini Boss', lv: 180, loc: 'Rokoko Plains' },
      { name: 'Mozto Machina', type: 'Boss', difficulty: 'Ultimate', lv: 174, loc: 'Large Demi Machina Factory: Area 4' }
    ]
  },

  {
    range: '177-182',
    main: { name: 'Altoblepas', type: 'Mini Boss', lv: 180, loc: 'Rokoko Plains' },
    alts: [
      { name: 'Mithurna Lynx', type: 'Mini Boss', lv: 177, loc: 'Ruins of Mt. Mithurna: Stylobate' },
      { name: 'Carbuncle', type: 'Mini Boss', lv: 183, loc: 'Hall of Construction Gods' },
      { name: 'Seele Zauga', type: 'Boss', difficulty: 'Nightmare', lv: 180, loc: 'Shrine of the Goddess of Species' }
    ]
  },

  {
    range: '182-199',
    main: { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Ultimate', lv: 190, loc: 'Ultimea Palace: Throne' }
  },

  {
    range: '199-215',
    main: { name: 'Finstern the Dark Dragon', type: 'Boss', difficulty: 'Ultimate', lv: 206, loc: 'Dark Dragon Shrine: Near the Top' },
    alts: [
      { name: 'Kuzto', type: 'Boss', difficulty: 'Nightmare', lv: 198, loc: 'Labilans Sector: Square' },
      { name: 'Seele Zauga', type: 'Boss', difficulty: 'Ultimate', lv: 200, loc: 'Shrine of the Goddess of Species' },
      { name: 'Frenzy Viola', type: 'Mini Boss', lv: 198, loc: 'Morthell Swell: Area 3' }
    ]
  },

  {
    range: '215-226',
    main: { name: 'Kuzto', type: 'Boss', difficulty: 'Ultimate', lv: 218, loc: 'Labilans Sector: Square' },
    alts: [
      { name: 'Ageladanios', type: 'Mini Boss', lv: 218, loc: 'Ducia Coast: Area 1' },
      { name: 'Espectro', type: 'Mini Boss', lv: 221, loc: 'Arche Valley: Area 1' }
    ]
  },

  {
    range: '226-232',
    main: { name: 'Espectro', type: 'Mini Boss', lv: 221, loc: 'Arche Valley: Area 1' },
    alts: [
      { name: 'Rhinosaur', type: 'Mini Boss', lv: 233, loc: 'Fugitive Lake Swamp: Area 3' }
    ]
  },

  {
    range: '233-245',
    main: { name: 'Arachnidemon', type: 'Boss', difficulty: 'Ultimate', lv: 236, loc: 'Arche Valley: Depths' },
    alts: [
      { name: 'Bullamius', type: 'Mini Boss', lv: 239, loc: 'Storage Yard: Area 2' },
      { name: 'Black Shadow', type: 'Boss', difficulty: 'Ultimate', lv: 239, loc: 'Rokoko City Ruins' },
    ]
  },

  {
    range: '245-255',
    main: { name: 'Ferzen the Rock Dragon', type: 'Boss', difficulty: 'Ultimate', lv: 251, loc: 'Guardian Forest: Giant Tree' },
    alts: [
      { name: 'Reliza', type: 'Boss', difficulty: 'Ultimate', lv: 250, loc: 'Manna Waterfront' },
      { name: 'Hexter', type: 'Boss', difficulty: 'Ultimate', lv: 242, loc: "Witch's Woods Depths" }
    ]
  },

  {
    range: '255-266',
    main: { name: 'Trickster Dragon Mimyugon', type: 'Boss', difficulty: 'Nightmare', lv: 258, loc: 'Operation Zone: Cockpit Area' }
  },

  {
    range: '267 - 276',
    main: { name: 'Trus', type: 'Mini Boss', lv: 269, loc: 'Propulsion System Zone: Power Tank' }
  },

  {
    range: '272-287',
    main: { name: 'Trickster Dragon Mimyugon', type: 'Boss', difficulty: 'Ultimate', lv: 278, loc: 'Operation Zone: Cockpit Area' },
    alts: [
      { name: 'Burning Dragon Igneus', type: 'Boss', difficulty: 'Ultimate', lv: 275, loc: 'Boma Moja: Village Center' }
    ]
  },

  {
    range: '285-297',
    main: { name: 'Capo Profundo', type: 'Mini Boss', lv: 287, loc: 'Abandoned District: Area 3' },
    alts: [
      { name: 'Walican', type: 'Boss', difficulty: 'Ultimate', lv: 287, loc: 'Jabali Kubwa: Summit' },
      { name: 'Mulgoon', type: 'Boss', difficulty: 'Nightmare', lv: 291, loc: 'Menabra Plains' }
    ]
  },

  {
    range: '297 - 305',
    main: { name: 'Red Ash Dragon Rudis', type: 'Boss', difficulty: 'Ultimate', lv: 299, loc: 'Espuma Dome: Entrance' },
    alts: [
      { name: 'Meteora', type: 'Mini Boss', difficulty: 'Ultimate', lv: 302, loc: 'Menabra Plains' },
      { name: 'Wiltileaf', type: 'Mini Boss', lv: 305, loc: 'Eumano Village Ruins: Area 2' }
    ]
  },
  {
    range: '306-314',
    main: { name: 'Wiltileaf', type: 'Mini Boss', lv: 305, loc: 'Eumano Village Ruins: Area 2' },
    alts: [
      { name: 'Mulgoon', type: 'Boss', difficulty: 'Ultimate', lv: 311, loc: 'Menabra Plains' },
      { name: 'Castilia', type: 'Boss', difficulty: 'High Difficulty Boss', lv: 310, loc: 'High Difficulty Event (HDB from El Scaro)' }
    ]
  },
  {
    range: '314-320',
    main: { name: 'Mulgoon', type: 'Boss', difficulty: 'Ultimate', lv: 311, loc: 'Menabra Plains' },
    alts: [
      { name: 'Castilia', type: 'Boss', difficulty: 'High Difficulty Boss', lv: 310, loc: 'High Difficulty Event (HDB from El Scaro)' }
    ]
  },
  
  {
    range: '321-332',
    main: { name: '(Lv Cap 330)Biskyva', type: 'Boss', difficulty: 'Ultimate', lv: 323, loc: 'Aquastida Central' },
    alts: [
      { name: 'Merzehal', type: 'Boss', difficulty: 'High Difficulty Boss', lv: 325, loc: 'High Difficulty Event (HDB from El Scaro)' }
    ]
  },
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
      matchesLevel = userLevel.value >= (minRange - 0) && userLevel.value <= (maxRange + 0);
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