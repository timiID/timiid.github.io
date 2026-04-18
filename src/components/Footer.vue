<script setup>
defineProps({
  isDark: Boolean
});

</script>

<template>
  <footer 
    class="relative mt-32 w-full transition-colors duration-500 overflow-hidden" 
    :class="isDark ? 'bg-slate-900/90 text-slate-400' : 'bg-black text-slate-400'"
  >
    <div class="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-12">
        
        <div class="md:col-span-2 space-y-6">
          <router-link to="/" class="flex items-center gap-3 group outline-none">
            <div class="relative">
              <div class="absolute inset-0 bg-indigo-500/50 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img src="/images/logo.png" class="relative w-10 h-10 grayscale brightness-200 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100" alt="Logo" />
            </div>
            <span class="text-2xl font-black italic tracking-tighter text-white">
              TIMI <span class="text-indigo-500">DB</span>
            </span>
          </router-link>
          <p class="text-xs leading-loose max-w-sm font-medium opacity-70 italic">
            The most advanced digital database project for Toram Online. Built for adventurers, by adventurers.
          </p>
        </div>

        <div class="space-y-4">
          <h4 class="text-white font-black text-xs uppercase tracking-[0.2em]">Main Resources</h4>
          <ul class="space-y-2 text-[11px] font-bold uppercase tracking-wider">
            <li><router-link to="/" class="hover:text-indigo-400 transition-colors">Home</router-link></li>
            <li><router-link to="/bag-list" class="hover:text-indigo-400 transition-colors">Bag Expansion List</router-link></li>
            <li><router-link to="/mq-list" class="hover:text-indigo-400 transition-colors">Main Quest List</router-link></li>
            <li><router-link to="/mq-calc" class="hover:text-indigo-400 transition-colors">Main Quest Calculator</router-link></li>
            <li><router-link to="/bs-calc" class="hover:text-indigo-400 transition-colors">Blacksmith Calculator</router-link></li>
            <li><router-link to="/xtall" class="hover:text-indigo-400 transition-colors">Xtall Database</router-link></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-white font-black text-xs uppercase tracking-[0.2em]">Others</h4>
          <ul class="space-y-2 text-[11px] font-bold uppercase tracking-wider">
          <li><router-link to="/event" class="hover:text-indigo-400 transition-colors">Event Guide</router-link></li>  
            <li><router-link to="/lvling" class="hover:text-indigo-400 transition-colors">Leveling Guide</router-link></li>                    
            <li><router-link to="/spotmats" class="hover:text-indigo-400 transition-colors">Material Farming Spot</router-link></li>                    
            <li><router-link to="/favorite" class="hover:text-indigo-400 transition-colors">Favorite Xtall</router-link></li>                    
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-white font-black text-xs uppercase tracking-[0.2em]">Project</h4>
          <ul class="space-y-2 text-[11px] font-bold uppercase tracking-wider">
            <li>
              <router-link to="/" class="hover:text-indigo-400 transition-colors">About Timi DB</router-link>
            </li>
            <li>
              <a href="https://www.facebook.com/J7Timi" target="_blank" class="hover:text-indigo-400 transition-colors">Contribution</a>
            </li>
            <li>
              <a href="https://en.toram.jp/" target="_blank" class="hover:text-indigo-400 transition-colors">Reference</a>
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-[9px] font-black tracking-[0.3em] uppercase opacity-50">
          © 2026 TIMI DB • Toram Online Digital Database Project
        </p>
        <div class="flex gap-6 opacity-50">
          <span class="text-[10px] font-black italic tracking-widest text-indigo-400">STAY VIGILANT</span>
          <span class="text-[10px] font-black italic tracking-widest text-rose-500">KEEP GRINDING</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: relative;
}

footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/what chara.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: scroll;
  background-size: auto 100%;      
  opacity: 0.12;        
  z-index: 1;
  pointer-events: none;
}

footer::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));
  z-index: 2;
  pointer-events: none;
}
</style>
