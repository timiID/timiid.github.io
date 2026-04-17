<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps(['isDark']);
defineEmits(['toggleDark']);

const route = useRoute();
const router = useRouter();
const itemRefs = ref({});
const isSidebarOpen = ref(false);

const indicatorStyle = ref({ 
  left: '0px', 
  width: '0px', 
  opacity: 0,
  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)' 
});

const navLinks = {
  '/': 'HOME',
  '/bag-list': 'BAG LIST',
  '/mq-list': 'MQ LIST',
  '/bs-calc': 'BS CALC',
  '/mq-calc': 'MQ CALC',
  '/xtall': 'XTALL ID',
};

const navLinks2 = {
  '/': 'HOME',
  '/bag-list': 'BAG EXPANSION LIST',
  '/mq-list': 'MATERIAL MQ LIST',
  '/bs-calc': 'BS CALCULATOR',
  '/mq-calc': 'MQ CALCULATOR',
  '/xtall': 'XTALL ID',
  '/favorite': 'MY FAVORITES',
};

const setItemRef = (el, path) => {
  if (el) itemRefs.value[path] = el.$el || el;
};

const updateIndicator = async () => {
  await nextTick();
  const activeLink = itemRefs.value[route.path];
  
  if (activeLink) {
    // Definisi warna gradasi berdasarkan rute
    const gradients = {
      '/': 'linear-gradient(to bottom, #3b82f6, #2dd4bf)',        // Home: Blue to Cyan
      '/bag-list': 'linear-gradient(to bottom, #5b2e03ef, #f6bb3bf4)', // Bag: Emerald to Blue
      '/mq-list': 'linear-gradient(to bottom, #ff002b, #ffb9b9)',  // MQ List: Rose to Orange
      '/mq-calc': 'linear-gradient(to right, #8b5cf6, #ec4899)',  // MQ Calc: Violet to Pink
      '/bs-calc': 'linear-gradient(to right, #f59e0b, #ef4444)',  // BS Calc: Amber to Red
      '/xtall': 'linear-gradient(to right, #06b6d4, #8b5cf6)',    // Xtall: Cyan to Violet
    };

    // Ambil gradasi berdasarkan path saat ini, gunakan default jika tidak ada di list
    const selectedGradient = gradients[route.path] || 'linear-gradient(to right, #ef4444, #a855f7)';

    indicatorStyle.value = {
      ...indicatorStyle.value,
      left: `${activeLink.offsetLeft}px`,
      width: `${activeLink.offsetWidth}px`,
      opacity: 1,
      background: selectedGradient,
    };
  }
};

onMounted(() => {
  setTimeout(updateIndicator, 400);
  window.addEventListener('resize', updateIndicator);
});

watch(() => route.path, () => {
  updateIndicator();
  isSidebarOpen.value = false;
});
</script>

<template>
  <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden"></div>
  
  <aside :class="[
    'fixed top-0 left-0 h-screen z-[200] transition-transform duration-500 transform border-r shadow-2xl flex flex-col overflow-hidden',
    'w-[70vw] md:w-[40vw] lg:hidden', 
    isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
    isDark ? 'bg-[#0f172a] border-white/10' : 'bg-white border-slate-200'
  ]">
    <div class="flex-none flex flex-col">
      <div class="flex justify-end p-4">
        <button @click="isSidebarOpen = false" class="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="isDark ? 'text-indigo-400' : 'text-slate-600'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="px-8 pb-6 flex items-center gap-3">
        <img src="/images/logo.png" class="w-10 h-10 rounded-full border border-white/10 shadow-lg" alt="Logo" />
        <span class="font-black italic text-xl uppercase tracking-tighter">
          TIMI <span class="text-indigo-500">DB</span>
        </span>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-5 custom-scrollbar">
      <div class="space-y-2 pb-4"> 
        <router-link v-for="(name, path) in navLinks2" :key="path" :to="path"
          class="py-4 px-6 rounded-2xl font-black italic tracking-widest text-[12px] transition-all flex items-center gap-4"
          :class="route.path === path 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
            : 'text-slate-500 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'">
          
          <div class="w-6 h-6 flex-none flex items-center justify-center">
            <template v-if="path === '/'">
               <span class="text-lg">🏠︎</span> </template>
            <img v-else-if="path === '/bag-list'" src="/src/assets/iconfromhome/Bag.png" class="w-full h-full object-contain" />
            <img v-else-if="path === '/mq-list'" src="/src/assets/iconfromhome/mq.png" class="w-full h-full object-contain" />
            <img v-else-if="path === '/mq-calc'" src="/src/assets/iconfromhome/mq_calc.png" class="w-full h-full object-contain" />
            <img v-else-if="path === '/bs-calc'" src="/src/assets/iconfromhome/bs_calc.png" class="w-full h-full object-contain" />
            <img v-else-if="path === '/xtall'" src="/src/assets/iconfromhome/xtall.png" class="w-full h-full object-contain" />
            <img v-else-if="path === '/favorite'" src="/src/assets/iconfromhome/favorite.png" class="w-full h-full object-contain" />
          </div>
          {{ name }}
        </router-link>
      </div>
    </div>

    <div class="flex-none p-6 bg-inherit border-t border-black/5 dark:border-white/5">
      <div class="flex flex-col gap-3">
      </div>
    </div>
  </aside>

  <nav class="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[100] w-[96%] max-w-[1400px]">
    <div :class="['backdrop-blur-3xl border flex items-center justify-between rounded-full shadow-2xl p-1.5 md:p-2 transition-all duration-700',
      isDark ? 'bg-black/50 border-white/10 shadow-indigo-500/10' : 'bg-white/80 border-white/50 shadow-blue-500/5']">
      
      <div class="flex-none flex items-center pl-4 mr-4">
        <button @click="isSidebarOpen = true" class="lg:hidden p-2 mr-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
          <span class="text-xl">☰</span>
        </button>
        
        <div @click="router.push('/')" class="flex items-center cursor-pointer group gap-2 md:gap-3 active:scale-95 transition-transform">
          <div :class="['w-9 h-9 md:w-11 md:h-11 overflow-hidden rounded-full border border-white/10 shadow-lg', isDark ? 'border-white/20' : 'border-slate-300']">
            <img src="/images/logo.png" class="w-full h-full object-cover group-hover:rotate-[360deg] transition-transform duration-[1.5s]" />
          </div>
          <span class="hidden sm:inline text-md md:text-xl font-black italic tracking-tighter uppercase">
            TIMI <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">DB</span>
          </span>
        </div>
      </div>

      <div class="hidden lg:flex flex-none px-1">
        <div class="relative flex bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5 shadow-inner backdrop-blur-md">
          <div class="absolute h-[calc(100%-8px)] top-1 rounded-full z-0 shadow-lg pointer-events-none" :style="indicatorStyle"></div>
          
          <router-link v-for="(name, path) in navLinks" :key="path" :ref="el => setItemRef(el, path)" :to="path"
            class="relative z-10 px-5 py-4.5 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-colors"
            active-class="!text-white">
            {{ name }}
          </router-link>
        </div>
      </div>

      <div class="flex-none flex items-center pr-2 md:pr-6 gap-2 md:gap-4">
        <div class="hidden lg:flex items-center gap-2 mr-2">
</div>
<router-link to="/favorite" 
  :class="['relative p-2 md:p-2.5 rounded-full transition-all duration-300 border flex items-center justify-center group active:scale-95',
    route.path === '/favorite' 
      ? 'bg-red-500 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
      : (isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-slate-200 hover:bg-black/10')]">
  
  <span class="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 text-[10px] font-black italic tracking-widest uppercase opacity-0 group-hover:opacity-100 group-active:scale-110 pointer-events-none transition-all duration-300 shadow-xl whitespace-nowrap z-[210]">
    Favorite
    <span class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-inherit rotate-45"></span>
  </span>

  <img src="@/assets/iconfromhome/favorite.png" 
    :class="['w-5 h-5 md:w-6 md:h-6 object-contain transition-transform group-hover:scale-110', 
      route.path === '/favorite' ? 'brightness-0 invert' : '']" 
    alt="Favorite" />
</router-link>

        <div class="flex items-center gap-3">
  <div class="flex flex-col items-end leading-none select-none">
    <span :class="['text-[11px] font-black italic tracking-tighter', isDark ? 'text-indigo-400' : 'text-slate-500']">
      {{ isDark ? 'DARK MODE' : 'LIGHT MODE' }}
    </span>
  </div>

          <div @click="$emit('toggleDark')" :class="['relative h-7 w-12 md:h-9 md:w-16 rounded-full cursor-pointer transition-all duration-500 border p-1 shadow-inner',
            isDark ? 'bg-indigo-950 border-white/20' : 'bg-blue-100 border-slate-300']">
            <div :class="[
              'absolute top-0.5 w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center z-10 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] transform active:scale-90',
              isDark 
                ? 'translate-x-5 md:translate-x-7 bg-gradient-to-br from-blue-300 to-cyan-800 shadow-[0_0_15px_3px_rgba(139,92,246,0.6)]' 
                : 'translate-x-0 bg-gradient-to-br from-yellow-100 to-orange-400 shadow-[0_0_10px_2px_rgba(251,191,36,0.4)]'
            ]">
              <span class="text-[10px] md:text-sm">{{ isDark ? '🌙' : '☀️' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>