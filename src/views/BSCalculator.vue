<template>
  <div class="relative z-10 w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
    
    <!-- Title Header (Animated) -->
    <div class="text-center py-2 animate-bounce-slow">
      <h1 class="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-orange-400 to-slate-500 dark:from-white dark:via-orange-500 dark:to-slate-600 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
        Blacksmith Calculator
      </h1>
      <p class="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mt-1 animate-pulse">
        Timi DB
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      
      <!-- 1. BASE STATS -->
      <div :class="cardClass" class="animate-fade-in hover:border-orange-500/30 transition-all">
        <h2 class="text-xs font-black uppercase tracking-wider text-orange-500 mb-4 pb-2 border-b border-orange-500/20">
          Base Stats
        </h2>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="(val, stat) in form.stats" :key="stat" class="transition-transform hover:scale-[1.02]">
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">{{ stat }}</label>
            <input 
              type="number" 
              v-model.number="form.stats[stat]" 
              placeholder="0"
              class="w-full bg-slate-500/10 border border-slate-300 dark:border-white/10 rounded-lg p-2.5 text-center font-bold dark:text-white text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            >
          </div>
        </div>
      </div>

      <!-- 2. EQUIPMENT STATS -->
      <div :class="cardClass" class="animate-fade-in hover:border-orange-500/30 transition-all" style="animation-delay: 100ms;">
        <h2 class="text-xs font-black uppercase tracking-wider text-orange-500 mb-4 pb-2 border-b border-orange-500/20">
          Equipment Stats
        </h2>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">STR +</label>
            <input type="number" v-model.number="form.eStr" placeholder="0" class="input-stat">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">STR %</label>
            <input type="number" v-model.number="form.eStrP" placeholder="0" class="input-stat">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">DEX +</label>
            <input type="number" v-model.number="form.eDex" placeholder="0" class="input-stat">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">DEX %</label>
            <input type="number" v-model.number="form.eDexP" placeholder="0" class="input-stat">
          </div>
        </div>
      </div>

      <!-- 3. CRAFT CONFIGURATION -->
      <div :class="cardClass" class="animate-fade-in hover:border-cyan-500/30 transition-all" style="animation-delay: 200ms;">
        <h2 class="text-xs font-black uppercase tracking-wider text-cyan-500 mb-4 pb-2 border-b border-cyan-500/20">
          Craft Type
        </h2>
        
        <div class="space-y-3">
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Type</label>
            <select 
              v-model="form.craftType" 
              @change="handleTypeChange" 
              class="w-full bg-slate-500/10 border border-slate-300 dark:border-white/10 rounded-lg p-2.5 font-bold dark:text-cyan-300 text-slate-900 outline-none cursor-pointer focus:border-cyan-500 transition-all"
            >
              <option v-for="type in craftTypes" :key="type" :value="type" class="bg-slate-900 text-white">
                {{ type }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Proficiency</label>
              <input type="number" v-model.number="form.prof" class="input-stat focus:border-cyan-500">
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Base Potential</label>
              <input type="number" v-model.number="form.basePot" class="input-stat focus:border-cyan-500">
            </div>
          </div>
        </div>
      </div>

      <!-- 4. SKILL LEVEL -->
      <div :class="cardClass" class="animate-fade-in hover:border-cyan-500/30 transition-all" style="animation-delay: 300ms;">
        <h2 class="text-xs font-black uppercase tracking-wider text-cyan-500 mb-4 pb-2 border-b border-cyan-500/20">
          Skill Level
        </h2>
        <div class="space-y-2 text-[11px] font-bold">
          <div class="flex justify-between items-center bg-slate-500/5 hover:bg-cyan-500/5 p-2 rounded-lg transition-all group">
            <span class="text-slate-500 group-hover:text-cyan-400">Create Equipment</span>
            <input type="number" v-model.number="form.createSkill" class="w-12 text-right bg-transparent font-black text-cyan-500 outline-none group-hover:scale-110 transition-transform">
          </div>
          <div class="flex justify-between items-center bg-slate-500/5 hover:bg-cyan-500/5 p-2 rounded-lg transition-all group">
            <span class="text-slate-500 group-hover:text-cyan-400">Careful Creation</span>
            <input type="number" v-model.number="form.careful" class="w-12 text-right bg-transparent font-black text-cyan-500 outline-none group-hover:scale-110 transition-transform">
          </div>
          <div class="flex justify-between items-center bg-slate-500/5 hover:bg-cyan-500/5 p-2 rounded-lg transition-all group">
            <span class="text-slate-500 group-hover:text-cyan-400">Expert's Creation</span>
            <input type="number" v-model.number="form.expert" class="w-12 text-right bg-transparent font-black text-cyan-500 outline-none group-hover:scale-110 transition-transform">
          </div>
        </div>
      </div>

      <!-- 5. CRAFTING STATS RESULTS -->
      <div :class="[cardClass, 'col-span-1 md:col-span-2 lg:col-span-2']" class="animate-fade-in hover:border-emerald-500/30 transition-all" style="animation-delay: 400ms;">
        <h2 class="text-xs font-black uppercase tracking-wider text-emerald-500 mb-4 pb-2 border-b border-emerald-500/20">
          Crafting Stats
        </h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          
          <!-- Difficulty (Item Difficulty BISA DIINPUT BEBAS) -->
          <div class="bg-slate-500/5 p-3 rounded-xl hover:bg-slate-500/10 transition-all group">
            <p class="text-[9px] font-bold text-slate-500 uppercase">Difficulty</p>
            <p class="text-lg font-black mt-1">
              <span class="text-cyan-500">{{ charDiff }}</span> 
              <span class="text-slate-400 text-xs"> / </span>
              <input 
                type="number" 
                v-model.number="form.itemDiff" 
                class="w-14 bg-transparent text-center font-black outline-none border-b-2 border-cyan-500/50 focus:border-cyan-400 text-slate-900 dark:text-white transition-all group-hover:scale-105"
              >
            </p>
          </div>

          <!-- Total Potential -->
          <div class="bg-slate-500/5 p-3 rounded-xl hover:bg-slate-500/10 transition-all">
            <p class="text-[9px] font-bold text-slate-500 uppercase">Total Potential</p>
            <p class="text-2xl font-black text-amber-500 mt-1 animate-pulse-slow">{{ totalPot }}</p>
          </div>

          <!-- Success Rate -->
          <div class="bg-slate-500/5 p-3 rounded-xl hover:bg-slate-500/10 transition-all">
            <p class="text-[9px] font-bold text-slate-500 uppercase">Success Rate</p>
            <p class="text-2xl font-black text-emerald-500 mt-1">{{ successRate }}%</p>
          </div>

          <!-- Status Indicator -->
          <div 
            class="flex items-center justify-center p-3 rounded-xl transition-all duration-300" 
            :class="charDiff < form.itemDiff ? 'bg-rose-500/10 text-rose-500 animate-shake' : 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]'"
          >
            <span class="text-xs font-black uppercase tracking-wide">
              {{ charDiff < form.itemDiff ? 'Low Difficulty' : 'Ready to Craft' }}
            </span>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue';
import * as BS from '../data/bs-logic.js'; 

const props = defineProps(['isDark']);

const cardClass = computed(() => [
  'p-5 rounded-2xl border backdrop-blur-xl transition-all duration-300',
  props.isDark 
    ? 'bg-slate-950/70 border-white/10 shadow-lg' 
    : 'bg-white/90 border-slate-200 shadow-md'
]);

const craftTypes = [
  "Armor", "1H Sword", "2H Sword", "Bow", "Bowgun", 
  "Staff", "Magic Device", "Knuckle", "Halberd", "Katana"
];

const form = reactive({
  stats: { STR: 0, INT: 0, VIT: BS.PRIMARY_STAT, DEX: 0, AGI: 0, TEC: BS.SECONDARY_STAT },
  eStr: 0, eStrP: 0, eDex: 0, eDexP: 0,
  craftType: "Armor",
  prof: BS.HIGHEST_PROF,
  itemDiff: BS.ARMOR_DIFFICULTY,
  basePot: BS.HIGHEST_ARM_POT,
  createSkill: 10,
  careful: 10,
  expert: 10
});

const handleTypeChange = () => {
  // 1. Reset semua nilai base stats ke 0
  Object.keys(form.stats).forEach(k => form.stats[k] = 0);

  if (form.craftType === "Armor") {
    form.stats.VIT = BS.PRIMARY_STAT;   // 510
    form.stats.TEC = BS.SECONDARY_STAT; // 327
    form.itemDiff = BS.ARMOR_DIFFICULTY;
    form.basePot = BS.HIGHEST_ARM_POT;
  } else {
    form.itemDiff = BS.WEAPON_DIFFICULTY;
    form.basePot = BS.HIGHEST_WPN_POT;

    // Pasangkan Primary (510) & Secondary (327) SANGAT PRESISI sesuai Toram Tools
    switch (form.craftType) {
      case "1H Sword":
      case "Bow":
        form.stats.DEX = BS.PRIMARY_STAT;
        form.stats.STR = BS.SECONDARY_STAT;
        break;
      case "2H Sword":
        form.stats.STR = BS.PRIMARY_STAT;   // STR = 510
        form.stats.DEX = BS.SECONDARY_STAT; // DEX = 327
        break;
      case "Bowgun":
        form.stats.DEX = BS.PRIMARY_STAT;   // STR tetep 0
        break;
      case "Staff":
        form.stats.INT = BS.PRIMARY_STAT;
        form.stats.TEC = BS.SECONDARY_STAT;
        break;
      case "Magic Device":
        form.stats.INT = BS.PRIMARY_STAT;
        form.stats.AGI = BS.SECONDARY_STAT;
        break;
      case "Knuckle":
        form.stats.AGI = BS.PRIMARY_STAT;
        form.stats.DEX = BS.SECONDARY_STAT;
        break;
      case "Halberd":
        form.stats.STR = BS.PRIMARY_STAT;
        form.stats.AGI = BS.SECONDARY_STAT;
        break;
      case "Katana":
        form.stats.DEX = BS.PRIMARY_STAT;
        form.stats.AGI = BS.SECONDARY_STAT;
        break;
    }
  }
};

onMounted(() => handleTypeChange());

const charDiff = computed(() => 
  BS.calculateCharacterDiff(
    form.prof, 
    form.stats.TEC, 
    form.stats.DEX, 
    form.eDex, 
    form.eDexP
  )
);

const successRate = computed(() => 
  BS.calculateSuccessRate(
    form.createSkill, 
    charDiff.value, 
    form.itemDiff, 
    form.stats.STR, 
    form.eStr, 
    form.eStrP
  )
);

const totalPot = computed(() => 
  BS.calculatePotential(form.basePot, form.careful, form.expert, form.craftType, form.stats)
);
</script>

<style scoped>
.input-stat {
  width: 100%;
  background-color: rgba(100, 116, 139, 0.1);
  border-width: 1px;
  border-color: #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.625rem;
  text-align: center;
  font-weight: 700;
  outline: 2px solid transparent;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .input-stat {
  border-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.input-stat:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
}

/* KEYFRAMES ANIMATION */
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-6px) scale(1.02); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}

.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-shake {
  animation: shake 0.6s ease-in-out infinite;
}

/* Hide Spin Buttons */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>