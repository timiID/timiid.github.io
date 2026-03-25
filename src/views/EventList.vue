<template>
  <div class="max-w-6xl mx-auto space-y-10">
    <div class="text-center space-y-2">
      <h1 class="text-3xl md:text-5xl font-black italic tracking-tighter">
        ANNUAL <span class="text-rose-500">EVENTS</span>
      </h1>
      <p class="text-slate-500 dark:text-slate-400 font-bold text-xs tracking-[0.2em] uppercase">
        Toram Online Yearly Event Calendar & Guides
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(event, index) in eventList" :key="index"
        class="group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
        :class="isDark ? 'bg-slate-900/40 border-white/10 hover:border-rose-500/50' : 'bg-white/80 border-slate-200 hover:border-rose-400/50'">
        
        <div class="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity grayscale group-hover:grayscale-0">
          {{ event.icon }}
        </div>

        <div class="p-6 space-y-4 relative z-10">
          <div class="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-rose-500/10 text-rose-500 border border-rose-500/20">
            {{ event.period }}
          </div>

          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ event.icon }}</span>
            <h3 class="text-lg font-black leading-tight uppercase tracking-tight">
              {{ event.title }}
            </h3>
          </div>

          <p class="text-xs font-medium opacity-60 leading-relaxed">
            {{ event.desc }}
          </p>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['isDark']);

const eventList = [
  { title: 'New Year Event', icon: '🎍', period: 'January', desc: 'Perayaan tahun baru di Avano Clere, tanding bareng monster spesial.' },
  { title: 'Valentine\'s Day', icon: '💝', period: 'February', desc: 'Quest cokelat dan pengumpulan resep masakan manis.' },
  { title: 'Snowball Fight', icon: '☃️', period: 'Feb - April', desc: 'Mini-game lempar salju untuk dapetin koin dan item langka.' },
  { title: 'White Day', icon: '🤍', period: 'March', desc: 'Lanjutan Valentine, event tukar kado dan boss spesial.' },
  { title: 'Spring Hanami', icon: '🌸', period: 'April - May', desc: 'Menikmati bunga sakura dengan boss bertema musim semi.' },
  { title: 'Golden Week', icon: '🎏', period: 'May', desc: 'Event libur panjang dengan monster emas dan bonus EXP/Drop.' },
  { title: 'June Bride', icon: '💒', period: 'June', desc: 'Kumpulkan "Marriage Ring" dan hadiah bertema pernikahan.' },
  { title: 'Rainy Season', icon: '🐸', period: 'June - July', desc: 'Berburu monster katak di cuaca hujan untuk item unik.' },
  { title: 'Anniversary Guide', icon: '🏅', period: 'July - August', desc: 'Perayaan ulang tahun Toram! Boss arena paling menantang.' },
  { title: 'Summer Event', icon: '🏖️', period: 'August - Sept', desc: 'Liburan ke pantai, kumpulkan kerang dan tanding sama boss air.' },
  { title: 'Tsukimi Event', icon: '🌾', period: 'September', desc: 'Festival melihat bulan, berburu kelinci bulan yang lincah.' },
  { title: 'Autumn Event', icon: '🍁', period: 'Oct - Nov', desc: 'Menikmati musim gugur dan berburu bahan makanan musim dingin.' },
  { title: 'Halloween Event', icon: '🎃', period: 'Oct - Nov', desc: 'Trik or Treat! Chapter panjang dengan mekanik puzzle unik.' },
  { title: 'Xmas Guide', icon: '🎄', period: 'December', desc: 'Berbagi kado dan melawan boss salju di tengah salju kota Sofya.' },
  { title: 'Road of Megiston', icon: '⚔️', period: 'Special', desc: 'Turnamen tempur paling brutal dari Megiston sang pahlawan.' }
];
</script>