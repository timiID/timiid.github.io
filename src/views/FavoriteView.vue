<template>

  <div class="min-h-screen pt-24 pb-20 px-4">
  <button @click="$router.push('/xtall')" class="group flex items-center gap-3 mb-10 transition-all hover:-translate-x-2">
        <div class="w-10 h-10 rounded-full border-2 border-cyan-500/50 flex items-center justify-center group-hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <svg class="w-5 h-5 text-cyan-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="3"/></svg>
        </div>
        <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 group-hover:text-cyan-500">Back</span>
      </button>
    
    <div class="max-w-4xl mx-auto mb-12 animate-fade-in">
      <h1 class="text-4xl md:text-6xl font-[1000] italic uppercase tracking-tighter text-yellow">
        MY <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">FAVORITES</span>
      </h1>
      <p class="text-xs font-black uppercase tracking-[0.4em] opacity-40 mt-2">Saved Xtall Collection</p>
    </div>
    

    <div class="max-w-4xl mx-auto">
      <div v-if="favoriteXtalls.length > 0" class="flex flex-col gap-8 animate-slide-up">
        
        <div v-for="(xtall, index) in favoriteXtalls" :key="xtall.code" class="relative group">
          <XtallCard 
            :xtall="xtall"
            :idx="index"
            :isDark="isDark"
            :iconPath="getIconPath(xtall.type)" 
            :badgeColorClass="getBadgeColor(xtall.type)"
            :baseXtall="findBase(xtall.code_base)"
            :evoXtalls="findEvos(xtall.code)"
          />

          <button @click.stop="removeFav(xtall.code)" 
                  class="absolute -top-0 -right-0 z-50 p-3 rounded-2xl  bg-red-500 border border-red-500/50 text-white-500 hover:bg-red-300 hover:text-white transition-all shadow-2xl active:scale-90">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

      </div>

      <div v-else class="py-40 text-center animate-fade-in">
        <h3 class="text-2xl font-black text-white/20 italic uppercase tracking-tighter">No Crystals Saved</h3>
        <button @click="$router.push('/xtall')" class="mt-6 px-10 py-4 bg-white text-black font-[1000] italic uppercase text-xs rounded-full hover:bg-red-500 hover:text-white transition-all">
          Browse Database
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { crystalData } from '@/data/store.js';
import XtallCard from '@/components/XtallCard.vue';

// Import Icons
import normalCrystas from "@/assets/icons/crysta_normal.jpg";
import weaponCrystas from "@/assets/icons/crysta_senjata.jpg";
import armorCrystas from "@/assets/icons/crysta_zirah.jpg";
import additionalCrystas from "@/assets/icons/crysta_pelengkap.jpg";
import specialCrystas from "@/assets/icons/crysta_tambahan.jpg";
import favoriteCrystaIcon from "@/assets/icons/crysta_favorite.png";

const favoriteXtalls = ref([]);

const loadFavs = () => {
  const favIds = JSON.parse(localStorage.getItem('xtall_favs') || '[]');
  // Pastiin data yang difilter beneran ada di store
  favoriteXtalls.value = crystalData.filter(c => favIds.includes(String(c.code)));
};

const removeFav = (code) => {
  let favs = JSON.parse(localStorage.getItem('xtall_favs') || '[]');
  favs = favs.filter(id => id !== String(code));
  localStorage.setItem('xtall_favs', JSON.stringify(favs));
  loadFavs();
};

// Logika mapping buat props XtallCard
const getIconPath = (type) => {
  if (type && type.includes('Upgrade')) return favoriteCrystaIcon;
  
  const icons = {
    'Normal': normalCrystas,
    'Senjata': weaponCrystas,
    'Zirah': armorCrystas,
    'Pelengkap': additionalCrystas,
    'Tambahan': specialCrystas
  };
  return icons[type] || normalCrystas;
};

const getBadgeColor = (type) => {
  if (type && type.includes('Upgrade')) return 'bg-orange-500/20 ring-orange-500/50 text-orange-400';
  return 'bg-cyan-500/10 ring-cyan-500/30 text-cyan-400';
};

// Fungsi pembantu buat Previous/Next upgrade
const findBase = (codeBase) => crystalData.find(c => c.code === codeBase);
const findEvos = (currentCode) => crystalData.filter(c => c.code_base === currentCode);

onMounted(() => {
  loadFavs();
});
</script>