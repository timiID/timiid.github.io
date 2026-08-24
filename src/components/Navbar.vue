<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps(["isDark"]);
defineEmits(["toggleDark"]);

const route = useRoute();
const router = useRouter();
const itemRefs = ref({});
const isSidebarOpen = ref(false);

const indicatorStyle = ref({
  left: "0px",
  width: "0px",
  opacity: 0,
  transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
});

const navLinks = {
  "/": "HOME",
  "/bag-list": "BAG LIST",
  "/mq-list": "MQ LIST",
  "/bs-calc": "BS CALC",
  "/mq-calc": "MQ CALC",
  "/xtall": "XTALL ID",
};

const sidebarLinks = [
  { path: "/",         name: "HOME",               icon: null, emoji: "🏠" },
  { path: "/bag-list", name: "BAG EXPANSION LIST",  icon: new URL("@/assets/iconfromhome/Bag.png", import.meta.url).href },
  { path: "/mq-list",  name: "MATERIAL MQ LIST",    icon: new URL("@/assets/iconfromhome/mq.png", import.meta.url).href },
  { path: "/mq-calc",  name: "MQ CALCULATOR",       icon: new URL("@/assets/iconfromhome/mq_calc.png", import.meta.url).href },
  { path: "/bs-calc",  name: "BS CALCULATOR",       icon: new URL("@/assets/iconfromhome/bs_calc.png", import.meta.url).href },
  { path: "/xtall",    name: "XTALL ID",            icon: new URL("@/assets/iconfromhome/xtall.png", import.meta.url).href },
  { path: "/favorite", name: "MY FAVORITES",        icon: new URL("@/assets/iconfromhome/favorite.png", import.meta.url).href },
];

const gradients = {
  "/":         "linear-gradient(to right, #3b82f6, #2dd4bf)",
  "/bag-list": "linear-gradient(to right, #f59e0b, #f97316)",
  "/mq-list":  "linear-gradient(to right, #ff002b, #ff8a8a)",
  "/mq-calc":  "linear-gradient(to right, #8b5cf6, #ec4899)",
  "/bs-calc":  "linear-gradient(to right, #f59e0b, #ef4444)",
  "/xtall":    "linear-gradient(to right, #06b6d4, #8b5cf6)",
};

const setItemRef = (el, path) => {
  if (el) itemRefs.value[path] = el.$el || el;
};

const updateIndicator = async () => {
  await nextTick();
  const activeLink = itemRefs.value[route.path];
  if (activeLink) {
    const grad = gradients[route.path] || "linear-gradient(to right, #ef4444, #a855f7)";
    indicatorStyle.value = {
      ...indicatorStyle.value,
      left: `${activeLink.offsetLeft}px`,
      width: `${activeLink.offsetWidth}px`,
      opacity: 1,
      background: grad,
    };
  } else {
    indicatorStyle.value = {
      ...indicatorStyle.value,
      opacity: 0,
    };
  }
};

onMounted(() => {
  setTimeout(updateIndicator, 400);
  window.addEventListener("resize", updateIndicator);
});

watch(
  () => route.path,
  () => {
    updateIndicator();
    isSidebarOpen.value = false;
  }
);
</script>

<template>
  <div class="w-full">
    
    <!-- ═══ OVERLAY ═══ -->
    <Transition name="fade">
      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[150] lg:hidden"
      ></div>
    </Transition>

    <!-- ═══ ULTRA MODERN FLOATING SIDEBAR ═══ -->
    <aside :class="[
      'fixed top-3 left-3 bottom-3 z-[200] lg:hidden flex flex-col rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
      'w-72 max-w-[80vw]',
      isSidebarOpen ? 'translate-x-0 opacity-100 scale-100 shadow-indigo-500/20' : '-translate-x-[115%] opacity-0 scale-95 pointer-events-none',
      isDark 
        ? 'bg-slate-950/85 border-white/10 text-white' 
        : 'bg-white/85 border-slate-200/80 text-slate-800',
    ]">

      <!-- Sidebar Header Compact -->
      <div class="flex items-center justify-between px-5 py-4 border-b shrink-0" :class="isDark ? 'border-white/5' : 'border-slate-100'">
        <div class="flex items-center gap-2.5">
          <div class="relative group">
            <div class="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 blur-xs group-hover:opacity-100 transition"></div>
            <img src="/images/logo.png" width="34" height="34" class="relative w-8 h-8 rounded-full object-cover border" :class="isDark ? 'border-white/20' : 'border-white'" alt="Logo" />
          </div>
          <div class="flex flex-col">
            <span class="font-black italic text-lg uppercase tracking-tighter leading-none">
              TIMI
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">DB</span>
            </span>
            <span class="text-[8px] font-bold tracking-widest opacity-40 uppercase">Database & Tools</span>
          </div>
        </div>

        <button
          @click="isSidebarOpen = false"
          class="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90"
          :class="isDark ? 'hover:bg-white/10 text-slate-400 bg-white/5' : 'hover:bg-slate-100 text-slate-500 bg-slate-100/60'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Sidebar Links dengan Stagger Effect & Hover Spring -->
      <div class="flex-1 overflow-y-auto px-3 py-3 space-y-1.5">
        <router-link
          v-for="(item, idx) in sidebarLinks"
          :key="item.path"
          :to="item.path"
          :style="{
            transitionDelay: isSidebarOpen ? `${idx * 40 + 80}ms` : '0ms'
          }"
          class="group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-black italic tracking-wider text-[11px] uppercase transition-all duration-300 ease-out hover:translate-x-1"
          :class="[
            isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0',
            route.path === item.path
              ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
              : isDark
                ? 'text-slate-400 hover:bg-white/5 hover:text-white'
                : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
          ]"
        >
          <div class="w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
            <span v-if="item.emoji" class="text-base">{{ item.emoji }}</span>
            <img v-else :src="item.icon" class="w-full h-full object-contain" />
          </div>
          <span class="truncate">{{ item.name }}</span>

          <span v-if="route.path === item.path" class="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse"></span>
        </router-link>
      </div>

      <!-- Sidebar Footer Compact -->
      <div class="p-3 border-t space-y-2.5 shrink-0" :class="isDark ? 'border-white/5 bg-white/[0.01]' : 'border-slate-100 bg-slate-50/50'">
        <div class="flex items-center justify-between p-2.5 rounded-xl border" :class="isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200/60'">
          <span class="text-[10px] font-black italic tracking-wider" :class="isDark ? 'text-indigo-400' : 'text-slate-600'">
            {{ isDark ? "DARK MODE" : "LIGHT MODE" }}
          </span>
          <div
            @click="$emit('toggleDark')"
            :class="[
              'relative h-6 w-11 rounded-full cursor-pointer transition-all duration-500 border p-0.5 shadow-inner',
              isDark ? 'bg-indigo-950 border-white/20' : 'bg-blue-100 border-slate-300',
            ]"
          >
            <div :class="[
              'absolute top-0.5 w-4 h-4 rounded-full flex items-center justify-center z-10 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] active:scale-90',
              isDark
                ? 'translate-x-5 bg-gradient-to-br from-blue-300 to-cyan-800 shadow-[0_0_10px_2px_rgba(139,92,246,0.6)]'
                : 'translate-x-0 bg-gradient-to-br from-yellow-100 to-orange-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.4)]',
            ]">
              <span class="text-[8px]">{{ isDark ? "🌙" : "☀️" }}</span>
            </div>
          </div>
        </div>
        <p class="text-[8px] font-bold text-center opacity-30 uppercase tracking-widest">© 2026 TIMI DB</p>
      </div>
    </aside>

    <!-- ═══ NAVBAR UTAMA ═══ -->
    <nav class="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[100] w-[96%] max-w-[1400px]">
      <div :class="[
        'backdrop-blur-3xl border flex items-center justify-between rounded-full shadow-2xl px-3 py-2.5 transition-all duration-500',
        isDark ? 'bg-black/60 border-white/10 shadow-indigo-500/10' : 'bg-white/80 border-white/50 shadow-blue-500/5',
      ]">

        <!-- Left: Hamburger (Mobile) + Logo -->
        <div class="flex items-center gap-2 pl-1 shrink-0">
          <button
            @click="isSidebarOpen = true"
            class="lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
            :class="isDark ? 'hover:bg-white/10 text-slate-200 bg-white/5' : 'hover:bg-black/10 text-slate-700 bg-black/5'"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div @click="router.push('/')" class="flex items-center gap-2.5 cursor-pointer group active:scale-95 transition-transform">
            <div :class="['w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-full border shadow-md', isDark ? 'border-white/20' : 'border-slate-200']">
              <img src="/images/logo.png" width="40" height="40" class="w-full h-full object-cover group-hover:rotate-[360deg] transition-transform duration-[1.5s]" />
            </div>
            <span class="font-black italic text-base md:text-lg tracking-tighter uppercase">
              TIMI
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">DB</span>
            </span>
          </div>
        </div>

        <!-- Center: Desktop Nav Links Pill (PC ONLY) -->
        <div class="hidden lg:flex flex-none px-1">
          <div class="relative flex bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5 shadow-inner backdrop-blur-md">
            <div
              class="absolute h-[calc(100%-8px)] top-1 rounded-full z-0 shadow-lg pointer-events-none"
              :style="indicatorStyle"
            ></div>

            <router-link
              v-for="(name, path) in navLinks"
              :key="path"
              :ref="(el) => setItemRef(el, path)"
              :to="path"
              class="relative z-10 px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-colors rounded-full"
              :class="route.path === path
                ? 'text-white'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'"
            >
              {{ name }}
            </router-link>
          </div>
        </div>

        <!-- Right: Favorite + Dark mode toggle -->
        <div class="flex items-center gap-2 pr-1 shrink-0">

          <!-- Favorite button -->
          <router-link
            to="/favorite"
            :class="[
              'relative w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-300 group active:scale-95',
              route.path === '/favorite'
                ? 'bg-red-500 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : 'bg-black/5 border-slate-200 hover:bg-black/10',
            ]"
          >
            <span 
              class="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-[10px] font-black italic tracking-widest uppercase opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-xl whitespace-nowrap z-[210] border"
              :class="isDark 
                ? 'bg-red-500/90 text-slate-300 border-slate-200' 
                : 'bg-red-600 text-white border-yellow-800'"
            >
              Favorite
            </span>

            <img
              src="@/assets/iconfromhome/favorite.png"
              :class="['w-5 h-5 object-contain transition-transform group-hover:scale-110', route.path === '/favorite' ? 'brightness-0 invert' : '']"
              alt="Favorite"
            />
          </router-link>

          <!-- Dark mode toggle -->
          <div class="flex items-center gap-2 ml-1">
            <span class="hidden md:inline text-[10px] font-black italic tracking-wider" :class="isDark ? 'text-indigo-400' : 'text-slate-500'">
              {{ isDark ? "DARK" : "LIGHT" }}
            </span>
            <div
              @click="$emit('toggleDark')"
              :class="[
                'relative h-7 w-12 md:h-8 md:w-14 rounded-full cursor-pointer transition-all duration-500 border p-1 shadow-inner',
                isDark ? 'bg-indigo-950 border-white/20' : 'bg-blue-100 border-slate-300',
              ]"
            >
              <div :class="[
                'absolute top-0.5 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center z-10 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] active:scale-90',
                isDark
                  ? 'translate-x-5 md:translate-x-6 bg-gradient-to-br from-blue-300 to-cyan-800 shadow-[0_0_15px_3px_rgba(139,92,246,0.6)]'
                  : 'translate-x-0 bg-gradient-to-br from-yellow-100 to-orange-400 shadow-[0_0_10px_2px_rgba(251,191,36,0.4)]',
              ]">
                <span class="text-[10px] md:text-xs">{{ isDark ? "🌙" : "☀️" }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>