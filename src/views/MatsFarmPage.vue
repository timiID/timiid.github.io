<script setup>
import { ref, computed, watch } from 'vue';
import { matsData } from '@/data/matsStore.js';

const props = defineProps({
  isDark: Boolean
});

// --- Filter State ---
const searchQuery = ref('');
const selectedCategory = ref('all');
const selectedElement = ref('all');
const selectedEvent = ref('all');

// --- Pagination State ---
const currentPage = ref(1);
const itemsPerPage = 6;

const categories = [
  { id: 'fauna', name: 'Beast', icon: 'fauna.png' },
  { id: 'kain', name: 'Cloth', icon: 'kain.png' },
  { id: 'logam', name: 'Metal', icon: 'logam.png' },
  { id: 'kayu', name: 'Wood', icon: 'kayu.png' },
  { id: 'obat', name: 'Medicine', icon: 'obat.png' },
  { id: 'mana', name: 'Mana', icon: 'mana.png' },
];

const elements = ['Earth', 'Fire', 'Water', 'Wind', 'Light', 'Dark'];

watch([searchQuery, selectedCategory, selectedElement, selectedEvent], () => {
  currentPage.value = 1;
});

const getElementStyle = (element) => {
  const el = element?.toLowerCase();
  if (el === 'earth') return props.isDark ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' : 'text-amber-800 border-amber-200 bg-amber-50';
  if (el === 'fire') return props.isDark ? 'text-red-400 border-red-400/30 bg-red-400/10' : 'text-red-800 border-red-200 bg-red-50';
  if (el === 'water') return props.isDark ? 'text-sky-400 border-sky-400/30 bg-sky-400/10' : 'text-sky-800 border-sky-200 bg-sky-50';
  if (el === 'wind') return props.isDark ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' : 'text-emerald-800 border-emerald-200 bg-emerald-50';
  if (el === 'light') return props.isDark ? 'text-white border-white/40 bg-white/10' : 'text-slate-900 border-slate-300 bg-white shadow-sm';
  if (el === 'dark') return props.isDark ? 'text-slate-900 border-white/20 bg-white' : 'text-white border-slate-900 bg-slate-900';
  return props.isDark ? 'text-slate-400 border-white/10 bg-white/5' : 'text-slate-600 border-slate-200 bg-slate-50';
};

const filteredResults = computed(() => {
  let data = matsData;
  if (selectedCategory.value !== 'all') data = data.filter(item => item.materialName.toLowerCase() === selectedCategory.value);
  if (selectedElement.value !== 'all') data = data.filter(item => item.element === selectedElement.value);
  if (selectedEvent.value === 'event') data = data.filter(item => item.isSummerShellEvent === true);
  else if (selectedEvent.value === 'regular') data = data.filter(item => !item.isSummerShellEvent);
  
  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase();
    data = data.filter(item => 
      item.mob.toLowerCase().includes(q) || 
      item.location.toLowerCase().includes(q) ||
      item.drops.some(d => d.name.toLowerCase().includes(q))
    );
  }
  return data;
});

const totalPages = computed(() => Math.ceil(filteredResults.value.length / itemsPerPage));
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredResults.value.slice(start, start + itemsPerPage);
});

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
      if (i - l === 2) rangeWithDots.push(l + 1);
      else if (i - l !== 1) rangeWithDots.push('...');
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
});

const groupedResults = computed(() => {
  const groups = {};
  paginatedData.value.forEach(item => {
    const key = item.materialName.toLowerCase();
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  const order = ['fauna', 'kain', 'logam', 'kayu', 'obat', 'mana'];
  return order.filter(k => groups[k]).map(k => ({ 
    id: k, 
    displayName: categories.find(c => c.id === k)?.name || k,
    spots: groups[k] 
  }));
});

const getIcon = (name) => new URL(`../assets/jenis-bahan-toram/${name}`, import.meta.url).href;
</script>

<template>
  <div class="w-full py-6 font-sans">
  <button @click="$router.push('/')" class="group flex items-center gap-3 mb-10 transition-all hover:-translate-x-2">
      <div class="w-10 h-10 rounded-full border-2 border-cyan-500/50 flex items-center justify-center group-hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        <svg class="w-5 h-5 text-cyan-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="3"/></svg>
      </div>
      <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 group-hover:text-cyan-500">Back</span>
    </button>
    <div class="mb-12 space-y-8">
      <div class="flex items-center gap-4">
        <div class="w-2 h-8 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full"></div>
        <h2 :class="['text-2xl font-black uppercase tracking-tighter', isDark ? 'text-white' : 'text-slate-900']">
          Material Farming Spot
        </h2>
      </div>

      <div class="flex overflow-x-auto pb-4 gap-3 no-scrollbar mask-fade-right">
        <button @click="selectedCategory = 'all'"
          :class="['flex-none flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 w-24',
            selectedCategory === 'all' ? 'border-indigo-500 bg-indigo-500/10 ring-4 ring-indigo-500/5' : (isDark ? 'border-white/5 bg-white/5 opacity-40 hover:opacity-100' : 'border-slate-200 bg-white opacity-60 hover:opacity-100')]">
          <div class="text-xs font-black h-8 flex items-center" :class="isDark ? 'text-indigo-400' : 'text-indigo-600'">ALL</div>
          <span class="text-[10px] font-bold mt-1 uppercase tracking-widest" :class="isDark ? 'text-white' : 'text-slate-700'">View All</span>
        </button>

        <button v-for="cat in categories" :key="cat.id" @click="selectedCategory = cat.id"
          :class="['flex-none flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 w-24',
            selectedCategory === cat.id ? 'border-indigo-500 bg-indigo-500/10 ring-4 ring-indigo-500/5' : (isDark ? 'border-white/5 bg-white/5 opacity-40 hover:opacity-100' : 'border-slate-200 bg-white opacity-60 hover:opacity-100')]">
          <img :src="getIcon(cat.icon)" class="w-8 h-8 object-contain mb-1" />
          <span class="text-[10px] font-bold uppercase tracking-widest" :class="isDark ? 'text-white' : 'text-slate-700'">{{ cat.name }}</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div class="md:col-span-5 relative group">
          <div class="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="isDark ? 'text-white' : 'text-indigo-600'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Search mobs, maps, or drops..."
            :class="['w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all font-bold text-sm',
              isDark ? 'bg-white/5 border-white/5 text-white focus:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-400 shadow-sm']" />
        </div>

        <div class="md:col-span-4 relative group">
  <select v-model="selectedElement"
    :class="['w-full px-5 py-4 rounded-2xl border-2 outline-none font-black text-xs uppercase tracking-widest appearance-none cursor-pointer transition-all',
      isDark 
        ? 'bg-[#0f172a] border-white/5 text-white focus:border-indigo-500' 
        : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-400 shadow-sm']"
  >
    <option value="all" :class="isDark ? 'bg-[#1e293b] text-white' : 'bg-white text-slate-900'">Elements: All</option>
    <option v-for="el in elements" :key="el" :value="el" 
      :class="isDark ? 'bg-[#1e293b] text-white' : 'bg-white text-slate-900'">
      {{ el }}
    </option>
  </select>
  
  <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :class="isDark ? 'text-white' : 'text-slate-900'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

        <div class="md:col-span-3 flex p-1 rounded-2xl border-2" :class="isDark ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-slate-100'">
          <button v-for="opt in [{id:'all', n:'All'}, {id:'event', n:'Event SS'}, {id:'regular', n:'Non Event SS'}]" :key="opt.id"
            @click="selectedEvent = opt.id"
            :class="['flex-1 rounded-xl text-[10px] font-black uppercase transition-all py-3',
              selectedEvent === opt.id ? 'bg-indigo-600 text-white shadow-lg' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')]">
            {{ opt.n }}
          </button>
        </div>
      </div>
    </div>

    <div class="min-h-[600px] relative">
      <div v-for="group in groupedResults" :key="group.id" class="mb-16 animate-fade-in">
        <div class="flex items-center gap-3 mb-8 border-b-2 pb-3" :class="isDark ? 'border-white/5' : 'border-slate-100'">
          <img :src="getIcon(`${group.id}.png`)" class="w-7 h-7" />
          <h3 class="font-black uppercase tracking-tighter text-xl" :class="isDark ? 'text-indigo-300' : 'text-indigo-600'">
            {{ group.displayName }} Area
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="spot in group.spots" :key="spot.mob + spot.location"
            :class="['group p-6 rounded-3xl border-2 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden',
              isDark ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]' : 'bg-white border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-xl hover:shadow-indigo-500/10']">
            
            <div v-if="spot.isSummerShellEvent" class="absolute -top-1 -right-10 bg-sky-500 text-white text-[9px] font-black px-10 py-2 rotate-45 shadow-lg z-10">EVENT SS</div>

            <div class="flex justify-between items-start mb-4">
              <span class="text-[10px] font-black px-3 py-1 rounded-full bg-indigo-600 text-white uppercase tracking-tighter">LV.{{ spot.level }}</span>
              <span :class="['text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border transition-all group-hover:scale-110', getElementStyle(spot.element)]">
                {{ spot.element }}
              </span>
            </div>

            <h4 class="font-black text-lg leading-tight mb-1" :class="isDark ? 'text-white' : 'text-slate-900'">{{ spot.mob }}</h4>
            <div class="flex items-center gap-1.5 opacity-60 mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               <p class="text-[11px] font-bold italic truncate">{{ spot.location }}</p>
            </div>

            <div class="space-y-3 border-t-2 pt-4" :class="isDark ? 'border-white/5' : 'border-slate-50'">
              <div v-for="drop in spot.drops" :key="drop.name" class="flex justify-between items-center group/item">
                <span class="text-[12px] font-bold transition-colors" :class="isDark ? 'text-slate-300 group-hover/item:text-white' : 'text-slate-600 group-hover/item:text-indigo-600'">{{ drop.name }}</span>
                <span class="text-[10px] font-black text-indigo-500 bg-indigo-500/5 px-2 py-1 rounded-lg border border-indigo-500/10">{{ drop.ptsstk }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredResults.length === 0" class="flex flex-col items-center justify-center py-32 opacity-20 text-center">
        <div class="p-6 rounded-full border-4 border-dashed border-current mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <p class="font-black uppercase tracking-[0.2em] text-sm" :class="isDark ? 'text-white' : 'text-slate-900'">No Data Found</p>
      </div>
    </div>

    <div v-if="totalPages > 1" class="flex justify-center items-center gap-3 py-16">
      <button @click="currentPage--" :disabled="currentPage === 1"
        :class="['w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all disabled:opacity-10 shadow-lg active:scale-90',
          isDark ? 'border-white/5 bg-white/5 text-indigo-400 hover:border-indigo-500' : 'border-slate-100 bg-white text-indigo-600 shadow-slate-200/50 hover:border-indigo-400']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M15 19l-7-7 7-7" /></svg>
      </button>

      <div class="flex items-center gap-2">
        <template v-for="(page, index) in displayedPages" :key="index">
          <button v-if="page !== '...'" @click="currentPage = page"
            :class="['w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 font-black text-sm md:text-lg',
              currentPage === page 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_10px_30px_rgba(79,70,229,0.4)] scale-110 z-10' 
                : (isDark ? 'bg-white/5 border-white/5 text-slate-400 hover:border-indigo-500/50' : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-400 shadow-sm')]">
            {{ page }}
          </button>
          <span v-else class="px-2 font-black tracking-widest opacity-30">...</span>
        </template>
      </div>

      <button @click="currentPage++" :disabled="currentPage === totalPages"
        :class="['w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all disabled:opacity-10 shadow-lg active:scale-90',
          isDark ? 'border-white/5 bg-white/5 text-indigo-400 hover:border-indigo-500' : 'border-slate-100 bg-white text-indigo-600 shadow-slate-200/50 hover:border-indigo-400']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.mask-fade-right {
  mask-image: linear-gradient(to right, black 85%, transparent 100%);
}
</style>