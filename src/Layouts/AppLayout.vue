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
  '/images/my38.png',
  '/images/my34.png',
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
    <!-- Tambah class 'hidden md:block' supaya hanya tampil di PC -->
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
        opacity: '0.7',
        maskImage: 'linear-gradient(to bottom, black 65%, transparent 98%)',
        webkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 98%)'
      }"
    ></div>

    <!-- Pattern overlay hanya di home -->
    <div 
      v-if="isHome"
      class="absolute inset-0 pointer-events-none z-0"
      :style="{ 
        backgroundImage: `url('/images/linearperfect.png')`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'right top',
        backgroundAttachment: 'scroll', 
        backgroundSize: 'auto',
        opacity: '0.04'
      }"
    ></div>

    <!-- Bubbles tampil di semua halaman -->
    <div class="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      <div v-for="bubble in bubbles" :key="'bubble-'+bubble.id" 
        class="absolute rounded-full border border-white/20 backdrop-blur-[1px] animate-float opacity-30 bubble-glow" 
        :style="{ 
          width: bubble.size, 
          height: bubble.size, 
          top: bubble.top, 
          left: bubble.left, 
          animationDuration: bubble.duration, 
          animationDelay: bubble.delay,
          background: isDark 
            ? 'radial-gradient(circle at 30% 30%, rgb(83, 112, 142), transparent)' 
            : 'radial-gradient(circle at 30% 30%, rgba(201, 177, 241, 0.6), rgb(81, 139, 232))'
        }">
        <div class="absolute top-1/4 left-1/4 right-1/4 w-1/4 h-1/4 bg-white/40 rounded-full blur-[1px]"></div>
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
  background-color: #020617;
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