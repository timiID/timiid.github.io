<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-12 animate-fade-in">
    
    <div class="relative group">
      <div class="text-[10rem] md:text-[14rem] font-black opacity-5 italic select-none tracking-tighter leading-none">
        404
      </div>
      
      <div class="absolute inset-0 flex items-center justify-center">
        <img 
          src="/images/what chara.gif" 
          alt="Timi DB Logo" 
          class="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_30px_rgba(99,102,241,0.6)] animate-float-elegant"
        />
      </div>
    </div>

    <div class="space-y-4">
      <h1 class="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight">
        Error <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">404</span>
      </h1>
      <p class="text-xs md:text-sm font-black uppercase tracking-[0.4em] opacity-40 italic">
        Page Not Found
      </p>
    </div>

    <button 
      @click="$router.push('/')"
      class="group relative px-10 py-4 rounded-[2rem] bg-indigo-600 overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/40"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <span class="relative flex items-center gap-4 text-white font-black uppercase tracking-[0.3em] text-[10px]">
        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to Home
      </span>
    </button>
  </div>
</template>

<style scoped>
/* 1. Animasi Masuk Halaman (Sekali Jalan) */
.animate-fade-in {
  animation: elegantAppear 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* 2. Animasi Logo Bergoyang (Terus Menerus) */
.animate-float-elegant {
  animation: floatEffect 4s ease-in-out infinite;
}

@keyframes elegantAppear {
  0% {
    opacity: 0;
    filter: blur(15px);
    transform: translateY(40px) scale(0.95);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }
}

@keyframes floatEffect {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(2deg);
  }
  66% {
    transform: translateY(5px) rotate(-2deg);
  }
}

/* Penyesuaian Responsif untuk 404 */
@media (max-width: 640px) {
  .text-\[10rem\] {
    font-size: 8rem;
  }
}
</style>