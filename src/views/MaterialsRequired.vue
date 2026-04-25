<script setup>
import { ref, computed } from 'vue';
import { mqMaterials, getAllMaterials } from '@/data/mq.js';

const props = defineProps(['isDark']);
const emit = defineEmits(['toggleDark']);

const allMaterials = getAllMaterials();
const selectedQuest = ref(allMaterials[0]);
const search = ref('');

const currentMaterials = computed(() => {
    return mqMaterials[selectedQuest.value] || [];
});

const filteredMaterials = computed(() => {
    if (!search.value) return currentMaterials.value;
    const s = search.value.toLowerCase();
    return currentMaterials.value.filter(item =>
        item.name.toLowerCase().includes(s) || 
        item.source.toLowerCase().includes(s)
    );
});
</script>

<template>
    <div class="bg-transparent py-0 px-2 md:px-4 font-sans">
        <div class="max-w-6xl mx-auto space-y-6 md:space-y-10 pb-20">
            
            <!-- HEADER -->
            <div :class="['relative p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-[4px] overflow-hidden backdrop-blur-2xl transition-all duration-700 shadow-2xl',
              isDark ? 'border-amber-500 bg-black/40' : 'border-amber-600 bg-white/60 shadow-amber-200']">
                
                <div class="absolute top-0 right-0 h-full w-1/3 hidden lg:block pointer-events-none">
                    <div class="text-9xl opacity-20">📦</div>
                </div>

                <div class="relative z-10 text-center md:text-left">
                    <h2 :class="['text-3xl md:text-6xl font-black italic uppercase leading-none tracking-tighter', props.isDark ? 'text-white' : 'text-slate-900']">
                        MATERIALS<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">REQUIRED</span>
                    </h2>

                    <div class="mt-8 flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
                        <div class="h-1.5 w-16 bg-amber-600 rounded-full"></div>
                        <span :class="['font-[1000] tracking-tighter italic uppercase leading-none transition-all duration-700 text-2xl md:text-3xl', isDark ? 'text-white' : 'text-slate-900']">
                            Quest Items & Sources
                        </span>
                    </div>
                </div>
            </div>

            <!-- CONTROLS -->
            <div :class="['grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 border-[4px] rounded-[2rem] md:rounded-[3.5rem] shadow-2xl backdrop-blur-md',
                props.isDark ? 'border-amber-500 bg-black/40' : 'border-amber-600 bg-white/80']">
                
                <!-- SELECT QUEST -->
                <div class="flex flex-col gap-2">
                    <label class="text-[10px] font-black uppercase tracking-widest ml-4 text-amber-500">Select Quest</label>
                    <div class="relative group">
                        <select v-model="selectedQuest" 
                            :class="['w-full border-[3px] rounded-xl md:rounded-2xl py-4 md:py-5 px-4 text-sm font-bold outline-none transition-all focus:border-amber-500 appearance-none', 
                            props.isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900']">
                            <option v-for="quest in allMaterials" :key="quest" :value="quest">
                                {{ quest }}
                            </option>
                        </select>
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-500 opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                </div>

                <!-- SEARCH -->
                <div class="flex flex-col gap-2">
                    <label class="text-[10px] font-black uppercase tracking-widest ml-4 text-amber-500">Search Material</label>
                    <div class="relative group">
                        <input v-model="search" type="text" placeholder="Find material..." 
                            :class="['w-full border-[3px] rounded-xl md:rounded-2xl py-4 md:py-5 pr-4 pl-14 text-sm font-bold outline-none transition-all focus:border-amber-500', 
                            props.isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20' : 'bg-slate-50 border-slate-200 text-slate-900']"/>
                        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none group-focus-within:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MATERIALS TABLE/CARDS -->
            <div :class="['border-[4px] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl backdrop-blur-xl',
                props.isDark ? 'border-amber-400 bg-black/60' : 'border-amber-600 bg-white/90']">
                
                <!-- DESKTOP TABLE -->
                <div class="hidden lg:block overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr :class="['uppercase text-[10px] font-black tracking-widest border-b-[4px]', 
                                props.isDark ? 'bg-white/5 text-amber-400 border-amber-500/30' : 'bg-slate-50 text-amber-700 border-amber-200']">
                                <th :class="['p-8 w-[5%] text-center border-r-[2px]', props.isDark ? 'border-white/10' : 'border-slate-200']">#</th>
                                <th :class="['p-8 w-[30%] text-left border-r-[2px]', props.isDark ? 'border-white/10' : 'border-slate-200']">Material Name</th>
                                <th :class="['p-8 w-[15%] text-center border-r-[2px]', props.isDark ? 'border-white/10' : 'border-slate-200']">Amount</th>
                                <th class="p-8 w-[50%] text-left">Source Location</th>
                            </tr>
                        </thead>
                        <tbody :class="['divide-y-[2px]', props.isDark ? 'divide-white/10 text-white/80' : 'divide-slate-200 text-slate-700']">
                            <tr v-for="(item, index) in filteredMaterials" :key="index" class="hover:bg-amber-500/5 transition-all">
                                <td :class="['p-8 text-center font-black italic text-xl opacity-40 border-r-[2px]', props.isDark ? 'border-white/10' : 'border-slate-200']">
                                    {{ index + 1 }}
                                </td>
                                <td :class="['p-8 border-r-[2px] font-black uppercase text-sm tracking-tight', 
                                    props.isDark ? 'text-white border-white/10' : 'text-slate-800 border-slate-200']">
                                    {{ item.name }}
                                </td>
                                <td :class="['p-8 text-center border-r-[2px]', props.isDark ? 'border-white/10' : 'border-slate-200']">
                                    <span class="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-500 border-2 border-amber-500 text-[11px] font-black uppercase">
                                        x{{ item.amount }}
                                    </span>
                                </td>
                                <td class="p-8 text-sm font-bold opacity-70">
                                    {{ item.source }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- MOBILE CARDS -->
                <div :class="['lg:hidden divide-y-[3px]', props.isDark ? 'divide-white/10' : 'divide-slate-200']">
                    <div v-if="filteredMaterials.length === 0" class="p-8 text-center">
                        <div class="text-5xl mb-4">🔍</div>
                        <p :class="['font-black uppercase tracking-widest', props.isDark ? 'text-white/40' : 'text-slate-400']">
                            No materials found
                        </p>
                    </div>
                    <div v-for="(item, index) in filteredMaterials" :key="index" class="p-6 space-y-4">
                        <div class="flex justify-between items-start">
                            <span class="text-xl font-black italic text-amber-500/30">#{{ index + 1 }}</span>
                            <span class="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-500 border-2 border-amber-500 text-[9px] font-black uppercase">
                                x{{ item.amount }}
                            </span>
                        </div>
                        <div :class="['p-5 rounded-2xl border-[3px] space-y-3', 
                            props.isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200']">
                            <div>
                                <span :class="['block text-[10px] font-black uppercase opacity-50 mb-1', props.isDark ? 'text-white/60' : 'text-slate-500']">
                                    Material
                                </span>
                                <span :class="['block font-black uppercase text-sm', props.isDark ? 'text-white' : 'text-slate-900']">
                                    {{ item.name }}
                                </span>
                            </div>
                            <div>
                                <span :class="['block text-[10px] font-black uppercase opacity-50 mb-1', props.isDark ? 'text-white/60' : 'text-slate-500']">
                                    Source
                                </span>
                                <span :class="['block text-sm font-bold', props.isDark ? 'text-white/70' : 'text-slate-700']">
                                    {{ item.source }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- STATS -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="stat in [
                    { label: 'Total Items', val: filteredMaterials.length, grad: 'from-blue-700 to-blue-500' },
                    { label: 'Total Needed', val: filteredMaterials.reduce((acc, m) => acc + m.amount, 0), grad: 'from-amber-700 to-amber-500' },
                    { label: 'Unique Quest', val: allMaterials.length, grad: 'from-purple-700 to-purple-500' }
                ]" :key="stat.label"
                    :class="['p-6 rounded-2xl border-2 text-center', props.isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200']">
                    <p class="text-[10px] font-black uppercase tracking-wider opacity-50 mb-2">{{ stat.label }}</p>
                    <p :class="['text-3xl font-black italic', `bg-gradient-to-r ${stat.grad} bg-clip-text text-transparent`]">
                        {{ stat.val }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
select option {
    background-color: #1a1a1a;
    color: white;
}
</style>