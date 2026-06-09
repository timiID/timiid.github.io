<template>
  <div
    ref="containerRef"
    class="flex flex-col lg:grid lg:grid-cols-12 gap-2 items-stretch animate-entry relative"
    :style="animationStyle"
  >
    <!-- ===== SIDEBAR KIRI: Previous (Desktop only) ===== -->
    <div class="hidden lg:flex lg:col-span-3 flex-col gap-3 relative">
      <div
        v-if="baseXtall"
        ref="prevCardRef"
        @click="goToDetail(baseXtall.code)"
        :class="[
          'flex-shrink-0 w-full p-5 rounded-[1.5rem] cursor-pointer transition-all backdrop-blur-sm shadow-xl ring-1',
          isDark
            ? 'bg-white/[0.04] ring-white/10 hover:ring-cyan-400 shadow-black/30'
            : 'bg-white/70 ring-slate-200 hover:ring-cyan-500 shadow-slate-300/40'
        ]"
      >
        <span class="text-[9px] font-black uppercase tracking-widest text-cyan-500 block mb-1">Previous</span>
        <p :class="['text-xs font-[1000] truncate', isDark ? 'text-slate-100' : 'text-slate-900']">
          {{ baseXtall.name }}
        </p>
      </div>
    </div>

    <!-- ===== KARTU UTAMA ===== -->
    <div class="lg:col-span-6 relative">
      <div
        ref="mainCardRef"
        @click="goToDetail(xtall.code)"
        :class="[
          'h-full relative rounded-[2.5rem] overflow-hidden transition-all duration-500',
          'ring-1 backdrop-blur-md shadow-2xl',
          isDark
            ? 'bg-purple-900/10 ring-white/10 shadow-black/50'
            : 'bg-white/40 ring-slate-200 shadow-slate-300/50'
        ]"
      >
        <div class="p-6 md:p-10 flex flex-col md:flex-row gap-8 items-start relative">
          <slot></slot>
          <div class="shrink-0 mx-auto md:mx-0">
            <div
              :class="[
                'w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] flex items-center justify-center ring-1',
                isDark ? 'bg-white/[0.04] ring-white/10' : 'bg-white/80 ring-slate-200'
              ]"
            >
              <img :src="iconPath" :alt="xtall.type" class="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl" />
            </div>
          </div>
          <div class="flex-1 space-y-5 w-full min-w-0">
            <h3
              :class="[
                'text-2xl md:text-4xl font-[1000] uppercase italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r',
                'break-words leading-none pb-2',
                isDark ? 'from-white via-cyan-200 to-blue-300' : 'from-indigo-900 via-purple-800 to-blue-900'
              ]"
            >
              {{ xtall.name }}
            </h3>
            <div :class="['p-6 rounded-3xl ring-1', isDark ? 'bg-white/[0.03] ring-white/10' : 'bg-white/70 ring-slate-200']">
              <div class="space-y-3">
                <div v-for="(stat, sIdx) in parsedStats" :key="sIdx" class="flex gap-3 items-start">
                  <span
                    v-if="!stat.includes('Dengan')"
                    :class="['w-1.5 h-1.5 rounded-full mt-1.5', isDark ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'bg-indigo-600']"
                  />
                  <p
                    :class="[
                      'text-xs md:text-sm font-[1000] leading-relaxed',
                      stat.includes('Dengan')
                        ? 'text-emerald-500 italic font-bold'
                        : stat.includes('-')
                          ? 'text-rose-600'
                          : isDark
                            ? 'bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-slate-400'
                            : 'bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-indigo-800'
                    ]"
                  >{{ stat }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div :class="['px-8 py-5 flex justify-between items-center border-t', isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/60 border-slate-200']">
  <span :class="['text-[9px] font-[1000] px-4 py-1.5 rounded-full ring-1 uppercase tracking-tighter', badgeColorClass, isDark ? 'text-white' : 'text-slate-900']">
    {{ xtall.type }}
  </span>
  
  <div class="flex items-center gap-3">
  <div v-if="!props.hideFavorite" class="relative group">
  <div 
    class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl ring-1 z-50"
    :class="isDark 
      ? 'bg-white text-slate-900 ring-white/20' 
      : 'bg-slate-900 text-white ring-slate-800'"
  >
    {{ isFavorite ? 'Hapus dari Favorite' : 'Tambah ke Favorite' }}
  </div>
  <button
    @click.stop="$emit('toggle-favorite', xtall.code)"
    :class="[
      'w-9 h-9 rounded-xl flex items-center justify-center ring-1 transition-all hover:scale-110 active:scale-95 shadow-sm',
      isFavorite
        ? (isDark 
            ? 'bg-gradient-to-br from-yellow-400 to-orange-600 ring-yellow-400 border-0' 
            : 'bg-gradient-to-br from-yellow-300 to-yellow-500 ring-yellow-400 border-0')
        : (isDark 
            ? 'bg-slate-800 ring-slate-600 hover:ring-yellow-400 hover:bg-slate-700' 
            : 'bg-white ring-slate-200 hover:ring-yellow-500 hover:bg-yellow-50')
    ]"
  >
    <img
      src="/src/assets/iconfromhome/favorite.png"
      :class="['w-4 h-4 object-contain transition-all', isFavorite ? 'scale-110' : 'opacity-70']"
      alt="Favorite"
    />
  </button>
</div>

  <router-link
    :to="'/xtall/' + xtall.code"
    @click.stop
    class="px-7 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-[1000] uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
  >
    Details
  </router-link>
</div>
        </div>
</div>
      <!-- Garis vertikal mobile -->
      <div v-if="baseXtall || evoXtalls.length > 0" class="lg:hidden flex justify-center">
        <div
          class="w-[6px] h-10 rounded-full"
          :style="{
            background: isDark
              ? 'linear-gradient(to bottom, rgba(34,211,238,0.9), rgba(168,85,247,0.9))'
              : 'linear-gradient(to bottom, rgba(99,102,241,0.9), rgba(168,85,247,0.9))'
          }"
        ></div>
      </div>
    </div>

    <!-- ===== SIDEBAR KANAN: Next Upgrade (Desktop only) ===== -->
    <div class="hidden lg:flex lg:col-span-3 flex-col gap-3 relative">
      <div
        v-for="(evo, i) in evoXtalls"
        :key="evo.code"
        :ref="el => { if (i === 0) nextCardRef = el }"
        @click="goToDetail(evo.code)"
        :class="[
          'flex-shrink-0 w-full p-5 rounded-[1.5rem] cursor-pointer transition-all backdrop-blur-sm shadow-xl ring-1',
          isDark
            ? 'bg-white/[0.04] ring-white/10 hover:ring-purple-400 shadow-black/30'
            : 'bg-white/70 ring-slate-200 hover:ring-purple-500 shadow-slate-300/40'
        ]"
      >
        <span class="text-[9px] font-black uppercase tracking-widest text-purple-500 block mb-1 text-right">Next Upgrade</span>
        <p :class="['text-xs font-[1000] truncate text-right', isDark ? 'text-slate-100' : 'text-slate-900']">{{ evo.name }}</p>
      </div>
    </div>

    <!-- ===== KONTAINER MOBILE: Previous & Next bersebelahan ===== -->
    <div v-if="baseXtall || evoXtalls.length > 0" class="lg:hidden grid grid-cols-2 gap-3">
      <div
        v-if="baseXtall"
        @click="goToDetail(baseXtall.code)"
        :class="[
          'flex-shrink-0 w-full p-5 rounded-[1.5rem] cursor-pointer transition-all backdrop-blur-sm shadow-xl ring-1',
          isDark
            ? 'bg-white/[0.04] ring-white/10 hover:ring-cyan-400 shadow-black/30'
            : 'bg-white/70 ring-slate-200 hover:ring-cyan-500 shadow-slate-300/40'
        ]"
      >
        <span class="text-[9px] font-black uppercase tracking-widest text-cyan-500 block mb-1">Previous</span>
        <p :class="['text-xs font-[1000] truncate', isDark ? 'text-slate-100' : 'text-slate-900']">{{ baseXtall.name }}</p>
      </div>
      <div v-else></div>

      <div
        v-if="evoXtalls.length > 0"
        @click="goToDetail(evoXtalls[0].code)"
        :class="[
          'flex-shrink-0 w-full p-5 rounded-[1.5rem] cursor-pointer transition-all backdrop-blur-sm shadow-xl ring-1',
          isDark
            ? 'bg-white/[0.04] ring-white/10 hover:ring-purple-400 shadow-black/30'
            : 'bg-white/70 ring-slate-200 hover:ring-purple-500 shadow-slate-300/40'
        ]"
      >
        <span class="text-[9px] font-black uppercase tracking-widest text-purple-500 block mb-1 text-right">Next Upgrade</span>
        <p :class="['text-xs font-[1000] truncate text-right', isDark ? 'text-slate-100' : 'text-slate-900']">{{ evoXtalls[0].name }}</p>
      </div>
    </div>

    <!-- SVG OVERLAY: dirender TERAKHIR agar tidak menghalangi elemen di atas -->
    <svg
      v-if="isDesktop && (baseXtall || evoXtalls.length > 0)"
      class="hidden lg:block absolute inset-0 overflow-visible"
      :width="svgW"
      :height="svgH"
      style="pointer-events: none !important; z-index: 0;"
    >
      <!-- GARIS KIRI: Previous → Kartu Utama -->
      <template v-if="baseXtall && prevRect.cx && mainRect.left">
        <path
          :d="`M ${prevRect.cx} ${prevRect.cy} L ${prevRect.cx} ${mainRect.cy} L ${mainRect.left} ${mainRect.cy}`"
          fill="none"
          :stroke="isDark ? 'rgba(34,211,238,0.8)' : 'rgba(53,141,255,0.93)'"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle :cx="prevRect.cx" :cy="prevRect.cy" r="5"
          :fill="isDark ? 'rgb(192,250,226)' : 'rgb(20,22,151)'" />
        <circle :cx="mainRect.left" :cy="mainRect.cy" r="5"
          :fill="isDark ? 'rgb(192,250,226)' : 'rgb(20,22,151)'" />
      </template>

      <!-- GARIS KANAN: Kartu Utama → Next Upgrade -->
      <template v-if="evoXtalls.length > 0 && nextRect.cx && mainRect.right">
        <path
          :d="`M ${mainRect.right} ${mainRect.cy} L ${nextRect.cx} ${mainRect.cy} L ${nextRect.cx} ${nextRect.cy}`"
          fill="none"
          :stroke="isDark ? 'rgba(234,128,255,0.91)' : 'rgba(168,85,247,0.8)'"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle :cx="mainRect.right" :cy="mainRect.cy" r="5"
          :fill="isDark ? 'rgb(255,193,220)' : 'rgb(67,8,44)'" />
        <circle :cx="nextRect.cx" :cy="nextRect.cy" r="5"
          :fill="isDark ? 'rgb(255,193,220)' : 'rgb(67,8,44)'" />
      </template>
    </svg>

  </div>
</template>

<script setup>
import { computed, ref, reactive, onMounted, onUpdated, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function goToDetail(code) { 
  router.push('/xtall/' + code)
}

defineEmits(['set-search', 'delete-favorite', 'toggle-favorite'])

const props = defineProps({
  xtall: Object,
  idx: Number,
  isDark: Boolean,
  isFavorite: Boolean,
  hideFavorite: Boolean,
  baseXtall: Object,
  evoXtalls: Array,
  iconPath: String,
  labelColor: String,
  badgeColorClass: String
})

const containerRef = ref(null)
const prevCardRef  = ref(null)
const mainCardRef  = ref(null)
const nextCardRef  = ref(null)

const svgW = ref(0)
const svgH = ref(0)
const isDesktop = ref(false)

const prevRect = reactive({ cx: 0, cy: 0 })
const mainRect = reactive({ left: 0, right: 0, cy: 0 })
const nextRect = reactive({ cx: 0, cy: 0 })

function measure() {
  if (!containerRef.value) return
  isDesktop.value = window.innerWidth >= 1024

  const cb = containerRef.value.getBoundingClientRect()
  svgW.value = cb.width
  svgH.value = cb.height

  if (prevCardRef.value) {
    const r = prevCardRef.value.getBoundingClientRect()
    prevRect.cx = r.right - cb.left
    prevRect.cy = r.top + r.height / 2 - cb.top
  }

  if (mainCardRef.value) {
    const r = mainCardRef.value.getBoundingClientRect()
    mainRect.left  = r.left  - cb.left
    mainRect.right = r.right - cb.left
    mainRect.cy    = r.top + r.height / 2 - cb.top
  }

  if (nextCardRef.value) {
    const r = nextCardRef.value.getBoundingClientRect()
    nextRect.cx = r.left - cb.left
    nextRect.cy = r.top + r.height / 2 - cb.top
  }
}

onMounted(async () => {
  await nextTick()
  measure()
  window.addEventListener('resize', measure)
})

onUpdated(async () => {
  await nextTick()
  measure()
})

onUnmounted(() => window.removeEventListener('resize', measure))

const animationStyle = computed(() => ({
  animationDelay: props.idx * 70 + 'ms'
}))

const parsedStats = computed(() => {
  if (!props.xtall?.view) return []
  return Array.isArray(props.xtall.view)
    ? props.xtall.view
    : props.xtall.view.split(/,|\n/).map(s => s.trim()).filter(Boolean)
})
</script>

<style scoped>
/* Animasi TANPA filter:blur — ini penyebab stacking context yang memblokir klik */
.animate-entry {
  opacity: 0;
  animation: slide-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
    /* filter: blur dihapus total — ini biang keladinya */
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>