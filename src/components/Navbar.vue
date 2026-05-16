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
  { path: "/bag-list", name: "BAG EXPANSION LIST",  icon: "/src/assets/iconfromhome/Bag.png" },
  { path: "/mq-list",  name: "MATERIAL MQ LIST",    icon: "/src/assets/iconfromhome/mq.png" },
  { path: "/mq-calc",  name: "MQ CALCULATOR",       icon: "/src/assets/iconfromhome/mq_calc.png" },
  { path: "/bs-calc",  name: "BS CALCULATOR",       icon: "/src/assets/iconfromhome/bs_calc.png" },
  { path: "/xtall",    name: "XTALL ID",            icon: "/src/assets/iconfromhome/xtall.png" },
  { path: "/favorite", name: "MY FAVORITES",        icon: "/src/assets/iconfromhome/favorite.png" },
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
    // Path tidak ada di navLinks (misal /favorite) → sembunyikan indicator
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
  <!-- ═══ SIDEBAR OVERLAY ═══ -->
  <div
    v-if="isSidebarOpen"
    @click="isSidebarOpen = false"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden"
  ></div>

  <!-- ═══ SIDEBAR MOBILE ═══ -->
  <aside :class="[
    'fixed top-0 left-0 h-screen z-[200] transition-transform duration-500 flex flex-col',
    'w-72 lg:hidden border-r shadow-2xl',
    isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
    isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800',
  ]">

    <!-- Sidebar Header -->
    <div class="flex items-center justify-between px-5 py-3 border-b" :class="isDark ? 'border-white/5' : 'border-slate-100'">
      <div class="flex items-center gap-3">
        <img src="/images/logo.png" class="w-9 h-9 rounded-full shadow-md" alt="Logo" />
        <span class="font-black italic text-lg uppercase tracking-tighter">
          TIMI
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">DB</span>
        </span>
      </div>
      <button
        @click="isSidebarOpen = false"
        class="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
        :class="isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Sidebar Nav Links -->
    <div class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
      <router-link
        v-for="item in sidebarLinks"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-2xl font-black italic tracking-widest text-[11px] uppercase transition-all duration-200"
        :class="route.path === item.path
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
          : isDark
            ? 'text-slate-400 hover:bg-white/5 hover:text-white'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'"
      >
        <div class="w-7 h-7 flex items-center justify-center shrink-0">
          <span v-if="item.emoji" class="text-base">{{ item.emoji }}</span>
          <img v-else :src="item.icon" class="w-full h-full object-contain" />
        </div>
        {{ item.name }}
      </router-link>
    </div>

    <!-- Sidebar Footer -->
    <div class="px-5 py-4 border-t" :class="isDark ? 'border-white/5' : 'border-slate-100'">
      <div class="flex items-center justify-between">
        <span class="text-[11px] font-black italic tracking-wider" :class="isDark ? 'text-indigo-400' : 'text-slate-500'">
          {{ isDark ? "DARK MODE" : "LIGHT MODE" }}
        </span>
        <div
          @click="$emit('toggleDark')"
          :class="[
            'relative h-7 w-12 rounded-full cursor-pointer transition-all duration-500 border p-1 shadow-inner',
            isDark ? 'bg-indigo-950 border-white/20' : 'bg-blue-100 border-slate-300',
          ]"
        >
          <div :class="[
            'absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center z-10 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]',
            isDark
              ? 'translate-x-5 bg-gradient-to-br from-blue-300 to-cyan-800 shadow-[0_0_15px_3px_rgba(139,92,246,0.6)]'
              : 'translate-x-0 bg-gradient-to-br from-yellow-100 to-orange-400 shadow-[0_0_10px_2px_rgba(251,191,36,0.4)]',
          ]">
            <span class="text-[10px]">{{ isDark ? "🌙" : "☀️" }}</span>
          </div>
        </div>
      </div>
      <p class="text-[9px] opacity-30 uppercase tracking-widest mt-3">© 2026 TIMI DB</p>
    </div>
  </aside>

  <!-- ═══ NAVBAR DESKTOP ═══ -->
  <nav class="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-[100] w-[96%] max-w-[1400px]">
    <div :class="[
      'backdrop-blur-3xl border flex items-center justify-between rounded-full shadow-2xl px-3 py-3 transition-all duration-700',
      isDark ? 'bg-black/50 border-white/10 shadow-indigo-500/10' : 'bg-white/80 border-white/50 shadow-blue-500/5',
    ]">

      <!-- Left: Hamburger + Logo -->
      <div class="flex items-center gap-2 pl-1">
        <button
          @click="isSidebarOpen = true"
          class="lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          :class="isDark ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-black/5 text-slate-600'"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div @click="router.push('/')" class="flex items-center gap-2.5 cursor-pointer group active:scale-95 transition-transform">
          <div :class="['w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-full border shadow-md', isDark ? 'border-white/20' : 'border-slate-200']">
            <img src="/images/logo.png" class="w-full h-full object-cover group-hover:rotate-[360deg] transition-transform duration-[1.5s]" />
          </div>
          <span class="font-black italic text-base md:text-lg tracking-tighter uppercase">
            TIMI
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">DB</span>
          </span>
        </div>
      </div>

      <!-- Center: Nav links (desktop) -->
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

      <!-- Right: Favorite + Dark toggle -->
      <div class="flex items-center pr-1">

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
          <span class="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-black italic tracking-widest uppercase opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-xl whitespace-nowrap z-[210] bg-slate-800 text-white">
            Favorite
          </span>
          <img
            src="@/assets/iconfromhome/favorite.png"
            :class="['w-5 h-5 object-contain transition-transform group-hover:scale-110', route.path === '/favorite' ? 'brightness-0 invert' : '']"
            alt="Favorite"
          />
        </router-link>

        <!-- Spacer lebih lebar -->
        <div class="w-10"></div>

        <!-- Dark mode toggle -->
        <div class="flex items-center gap-2">
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
</template>