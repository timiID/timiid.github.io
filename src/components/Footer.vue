<script setup>
defineProps({
  isDark: Boolean
});
</script>

<template>
  <footer 
    class="relative mt-20 w-full transition-colors duration-500 overflow-hidden" 
    :class="isDark ? 'bg-slate-900/95 text-slate-400' : 'bg-slate-800 text-slate-400'"
  >
    <!-- GIF BG -->
    <div class="absolute inset-0 z-0 pointer-events-none footer-gif"></div>
    <!-- Overlay gradient -->
    <div class="absolute inset-0 z-[1] pointer-events-none"
      :class="isDark 
        ? 'bg-gradient-to-b from-slate-900/60 to-slate-900/90' 
        : 'bg-gradient-to-b from-slate-800/60 to-slate-800/90'"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-14">
      
      <!-- TOP ROW -->
      <div class="flex flex-col md:flex-row gap-10 md:gap-16">

        <!-- Brand -->
        <div class="md:w-64 shrink-0 space-y-5">
          <router-link to="/" class="flex items-center gap-3 group outline-none w-fit">
            <div class="relative">
              <div class="absolute inset-0 bg-indigo-500/50 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img src="/images/logo.png" class="relative w-10 h-10 transition-all duration-500 group-hover:brightness-110" alt="Logo" />
            </div>
            <span class="text-2xl font-black italic tracking-tighter" :class="isDark ? 'text-white' : 'text-white'">
              TIMI <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">DB</span>
            </span>
          </router-link>
          <p class="text-xs leading-loose font-medium opacity-60 italic">
            The most advanced digital database project for Toram Online. Built for adventurers, by adventurers.
          </p>
          <p class="text-xs leading-loose font-medium opacity-60 italic">
          Your all in one Toram Online companion featuring Bag List, Main Quest Guide & Calculator, Blacksmith Simulator, Xtall Database, Leveling Guide, Event Calendar, Material Farming Spots, and more. Crafted with love, for every adventurer.
</p>
        </div>

        <!-- Links: 2 kolom -->
        <div class="flex-1 grid grid-cols-2 gap-x-8 gap-y-10">

          <!-- Kolom 1: Main Resources + Project -->
          <div class="space-y-8">
            <div>
              <h4 class="font-black text-xs uppercase tracking-[0.2em] mb-3"  :class="isDark ? 'text-white bg-violet-950/40' : 'text-violet-200 bg-violet-200/10'">
                Main Resources
              </h4>
              <ul class="space-y-2 text-[11px] font-bold uppercase tracking-wider">
                <li><router-link to="/" class="hover:text-indigo-400 transition-colors">Home</router-link></li>
                <li><router-link to="/bag-list" class="hover:text-indigo-400 transition-colors">Bag Expansion List</router-link></li>
                <li><router-link to="/mq-list" class="hover:text-indigo-400 transition-colors">Main Quest List</router-link></li>
                <li><router-link to="/mq-calc" class="hover:text-indigo-400 transition-colors">Main Quest Calculator</router-link></li>
                <li><router-link to="/bs-calc" class="hover:text-indigo-400 transition-colors">Blacksmith Calculator</router-link></li>
                <li><router-link to="/xtall" class="hover:text-indigo-400 transition-colors">Xtall Database</router-link></li>
              </ul>
            </div>

            <div>
              <h4 class="font-black text-xs uppercase tracking-[0.2em] mb-3" :class="isDark ? 'text-white bg-red-950/40' : 'text-red-200 bg-red-200/10'">
                Project
              </h4>
              <ul class="space-y-2 text-[11px] font-bold uppercase tracking-wider">
                <li><router-link to="/" class="hover:text-indigo-400 transition-colors">About Timi DB</router-link></li>
                <li><a href="https://www.facebook.com/J7Timi" target="_blank" class="hover:text-indigo-400 transition-colors">Contribution</a></li>
                <li><a href="https://en.toram.jp/" target="_blank" class="hover:text-indigo-400 transition-colors">Reference</a></li>
              </ul>
            </div>
          </div>

          <!-- Kolom 2: Others -->
          <div>
            <h4 class="font-black text-xs uppercase tracking-[0.2em] mb-3" :class="isDark ? 'text-white bg-yellow-950/40' : 'text-yellow-200 bg-yellow-400/10'">
              Others
            </h4>
            <ul class="space-y-2 text-[11px] font-bold uppercase tracking-wider">
              <li><router-link to="/event" class="hover:text-indigo-400 transition-colors">Event Guide</router-link></li>
              <li><router-link to="/lvling" class="hover:text-indigo-400 transition-colors">Leveling Guide</router-link></li>
              <li><router-link to="/spotmats" class="hover:text-indigo-400 transition-colors">Material Farming Spot</router-link></li>
              <li><router-link to="/favorite" class="hover:text-indigo-400 transition-colors">Favorite Xtall</router-link></li>
            </ul>
          </div>

        </div>
      </div>

      <!-- BOTTOM ROW -->
      <div class="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
        :class="isDark ? 'border-t border-white/5' : 'border-t border-slate-300/60'"
      >
        <p class="text-[9px] font-black tracking-[0.3em] uppercase opacity-40">
          © 2026 TIMI DB • Toram Online Digital Database Project
        </p>
        <div class="flex gap-6">
          <span class="text-[10px] font-black italic tracking-widest text-indigo-400 opacity-70">STAY VIGILANT</span>
          <span class="text-[10px] font-black italic tracking-widest text-rose-500 opacity-70">KEEP GRINDING</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer-gif {
  background-image: url('/images/what chara.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  opacity: 0.4;
}
</style>