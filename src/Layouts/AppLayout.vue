<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'; 
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

const route = useRoute();
const isHome = computed(() => route.path === '/');

const props = defineProps(['isDark']);
const emit = defineEmits(['toggleDark']);

// 1. DATA SLIDESHOW BACKGROUND
const backgrounds = [
  '/images/peluluchan.png',
  '/images/hanami11.png',
  '/images/pelulu.png',
];
const currentBgIndex = ref(0);

// 2. LOGIKA TIMING SLIDESHOW
let bgInterval = null;
onMounted(() => {
  bgInterval = setInterval(() => {
    currentBgIndex.value = (currentBgIndex.value + 1) % backgrounds.length;
  }, 5000);
});

onUnmounted(() => {
  if (bgInterval) {
    clearInterval(bgInterval);
    bgInterval = null;
  }
});

// 3. DATA BUNGA (Flowers)
const flowerColors = ['#f472b6', '#fb923c', '#a78bfa', '#60a5fa', '#fbbf24', '#f87171'];
const flowers = Array.from({ length: 30 }, (_, i) => ({ 
  id: i, 
  size: Math.random() * 40 + 20 + 'px', 
  top: Math.random() * 100 + '%',
  left: Math.random() * 100 + '%', 
  duration: Math.random() * 20 + 15 + 's', 
  delay: Math.random() * -20 + 's',
  rotate: Math.random() * 360 + 'deg',
  color: flowerColors[i % flowerColors.length]
}))

// 3. DATA GELEMBUNG (Bubbles)
const bubbles = Array.from({ length: 30 }, (_, i) => ({ 
  id: i, 
  size: Math.random() * 60 + 20 + 'px', 
  top: Math.random() * 100 + '%',
  left: Math.random() * 100 + '%', 
  duration: Math.random() * 20 + 15 + 's', 
  delay: Math.random() * -20 + 's' 
}))
</script>

<template>
  <div :class="['min-h-screen flex flex-col transition-all duration-[1000ms] relative overflow-x-hidden', isDark ? 'bg-mesh-dark text-white' : 'bg-mesh-light text-slate-900']">
    
    <!-- Slideshow hanya tampil di halaman home -->
    <!-- Tambah class 'hidden md:block' -->
<div 
  v-if="isHome"
  class="absolute inset-0 pointer-events-none z-0 transition-all duration-[1500ms] ease-in-out hidden md:block"
  :style="{
        backgroundImage: `url(${backgrounds[currentBgIndex]})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top', 
        backgroundAttachment: 'scroll', 
        backgroundSize: 'cover',
        height: '1100px', 
        opacity: '0.55',
        /* Gradasi: transparan atas (0%-15%), jelas di tengah (20%-60%), transparan di bawah (60%-100%) */
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 95%)',
        webkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 95%)'
      }"
    ></div>

    <div 
      class="absolute inset-0 pointer-events-none z-0"
      :style="{ 
        backgroundImage: `url('/images/linearperfect.png')`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'right top',
        backgroundAttachment: 'scroll', 
        backgroundSize: 'auto',
        opacity: '0.05'
      }"
    ></div>

    <div class="absolute inset-0 pointer-events-none z-[1] overflow-hidden hidden md:block">
  <div v-for="flower in flowers" :key="'flower-'+flower.id" 
    class="absolute animate-float opacity-40"
    :style="{ 
      width: flower.size, 
      height: flower.size, 
      top: flower.top, 
      left: flower.left, 
      animationDuration: flower.duration, 
      animationDelay: flower.delay,
      transform: `rotate(${flower.rotate})`
    }">
    <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
      <g :fill="flower.color" :opacity="isDark ? 0.5 : 0.65">
        <ellipse cx="50" cy="25" rx="14" ry="22" />
        <ellipse cx="50" cy="75" rx="14" ry="22" />
        <ellipse cx="25" cy="50" rx="22" ry="14" />
        <ellipse cx="75" cy="50" rx="22" ry="14" />
        <ellipse cx="32" cy="32" rx="14" ry="22" transform="rotate(45 32 32)" />
        <ellipse cx="68" cy="68" rx="14" ry="22" transform="rotate(45 68 68)" />
        <ellipse cx="68" cy="32" rx="14" ry="22" transform="rotate(-45 68 32)" />
        <ellipse cx="32" cy="68" rx="14" ry="22" transform="rotate(-45 32 68)" />
      </g>
      <circle cx="50" cy="50" r="12" fill="#fde68a" :opacity="isDark ? 0.6 : 0.8" />
    </svg>
  </div>
</div>

    <!-- NAVBAR -->
    <Navbar :isDark="isDark" @toggleDark="$emit('toggleDark')" />

    <!-- MAIN CONTENT -->
    <main class="flex-1 max-w-[1400px] mx-auto pt-24 md:pt-32 px-4 md:px-8 pb-20 relative z-10 animate-fade-in w-full">
      <slot />
    </main>

    <!-- FOOTER -->
    <Footer :isDark="isDark" class="w-full relative z-20" />
  </div>
</template>

<style scoped>
.min-h-screen {
  position: relative;
}

@keyframes float {
  0% { transform: translateY(0) translateX(0) rotate(0deg); }
  33% { transform: translateY(-80px) translateX(25px) rotate(15deg); }
  66% { transform: translateY(-40px) translateX(-25px) rotate(-10deg); }
  100% { transform: translateY(0) translateX(0) rotate(0deg); }
}

.animate-float {
  animation: float linear infinite;
}

.bubble-glow {
  box-shadow: 
    inset -5px -5px 12px rgba(255, 255, 255, 0.1),
    inset 3px 3px 8px rgba(0, 0, 0, 0.05),
    0 5px 15px rgba(0, 0, 0, 0.05);
}

.bg-mesh-dark {
  background-color: #303c72;
  background-image: radial-gradient(at 0% 0%, #1e1b4b 0, transparent 50%), 
                    radial-gradient(at 100% 0%, #450a0a 0, transparent 50%), 
                    radial-gradient(at 100% 100%, #3b0764 0, transparent 50%);
  background-attachment: fixed;
}

.bg-mesh-light {
  background-color: #ffffff;
  background-image: radial-gradient(at 0% 0%, #e0f2fe 0, transparent 50%), 
                    radial-gradient(at 100% 0%, #fee2e2 0, transparent 50%), 
                    radial-gradient(at 100% 100%, #f3e8ff 0, transparent 50%);
  background-attachment: fixed;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>