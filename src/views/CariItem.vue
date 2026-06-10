<template>
  <div class="timidb-search-container max-w-[1200px] mx-auto p-2.5 font-sans">
    
    <div class="api-attribution-note bg-[#3498db]/[0.08] border border-[#3498db]/20 p-3 px-4 rounded-lg mb-6 text-[13.5px] leading-relaxed">
      💡 <strong>Database Information:</strong> Item, monster, and map location data on this search module are fetched in real-time through public integration with <a href="https://coryn.club/api/" target="_blank" rel="noopener" class="text-[#3498db] font-semibold no-underline hover:underline">Coryn Club Developer API v1</a>.
    </div>

    <div class="space-y-3 mb-6">
      <label class="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-4 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-cyan-500/40"></span> SEARCH NAME
      </label>
      
      <div ref="searchRef" class="relative group max-w-[460px] flex gap-3">
        <div class="relative flex-1">
          <span class="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-cyan-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            v-model="namaItem" 
            @keyup.enter="cariItemDanDrop" 
            @focus="isHistoryOpen = true" 
            type="text" 
            :placeholder="currentPlaceholder" 
            :class="['w-full pl-14 pr-6 py-3.5 rounded-2xl border-2 outline-none font-bold text-sm transition-all', 
            isDark ? 'bg-[#0f172a] border-white/5 focus:border-cyan-500 text-white placeholder-slate-600' : 'bg-white border-slate-200 focus:border-cyan-500 text-slate-800']"
          />

          <div 
            v-if="displayedSearchLogs.length > 0 && isHistoryOpen" 
            class="absolute left-0 right-0 z-20 mt-2 rounded-3xl border-2 shadow-2xl backdrop-blur-xl overflow-hidden"
            :class="isDark ? 'bg-slate-900 border-white/10 shadow-black text-white' : 'bg-white border-slate-200 shadow-slate-200 text-slate-800'"
          >
            <div class="px-4 py-3 border-b border-slate-200/20" :class="isDark ? 'border-white/5' : ''">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Search History</p>
                  <p class="text-[11px] text-slate-400 mt-1">Your recently searched items</p>
                </div>
                <button @click.stop="clearSearchLogs" type="button" class="text-[10px] font-black uppercase tracking-[0.2em] transition-colors text-red-400 hover:text-red-300">
                  Clear all
                </button>
              </div>
            </div>
            
            <ul class="margin-0 padding-0 list-none max-h-[200px] overflow-y-auto">
              <li 
                v-for="(log, idx) in displayedSearchLogs" 
                :key="idx" 
                @click="pilihHistory(log)"
                class="px-5 py-2.5 text-xs font-bold cursor-pointer transition-colors"
                :class="isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'"
              >
                🔍 {{ log }}
              </li>
            </ul>
          </div>
        </div>

        <button 
          @click="cariItemDanDrop" 
          class="px-6 py-3.5 bg-[#3498db] hover:bg-[#2980b9] text-white font-bold text-sm rounded-2xl border-none cursor-pointer transition-colors shrink-0"
        >
          <span v-if="sedangLoading">Searching...</span>
          <span v-else>Search Item</span>
        </button>
      </div>
    </div>

    <div class="state-indicators mb-5">
      <p v-if="sedangLoading" class="text-slate-400 italic text-sm flex items-center gap-2">
        Searching item and drop sources from Coryn Club...
      </p>
      <p v-if="pesanError" class="text-red-500 font-bold text-sm">
        ⚠️ {{ pesanError }}
      </p>
    </div>

    <div v-if="listHasilItem.length > 0" class="search-results-wrapper">
      <p class="text-slate-400 mb-4 text-sm">
        Found <strong>{{ listHasilItem.length }}</strong> items matching your criteria:
      </p>
      
      <div 
        v-for="item in itemsDiHalamanIni" 
        :key="item.id" 
        class="database-item-card border border-slate-400/25 p-[22px] rounded-xl mb-[25px] shadow-sm transition-all duration-300 relative hover:-translate-y-0.5 hover:shadow-md"
        :class="isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-slate-200'"
      >
        <div class="flex justify-between items-start gap-3 flex-wrap border-b border-slate-400/15 pb-3 mb-3.5">
          <h3 class="m-0 text-xl font-bold tracking-tight">
            <span class="text-slate-400 text-sm font-medium mr-1.5 font-mono">#{{ item.id }}</span>
            {{ item.name }}
          </h3>
          <span 
            v-if="item.meta && item.meta.badge" 
            class="bg-[#1abc9c]/15 text-[#1abc9c] p-1 px-3.5 rounded-full text-[11px] font-bold border border-[#1abc9c]/30 uppercase tracking-wider"
          >
            🌟 {{ item.meta.badge }}
          </span>
        </div>

        <div class="mb-4">
          <span class="text-[11px] font-black uppercase tracking-wider p-[3px] px-2 bg-[#3498db]/15 text-[#3498db] rounded">
            {{ item.type_label ? item.type_label.replace('[', '').replace(']', '') : 'UNKNOWN CATEGORY' }}
          </span>
        </div>

        <div class="item-finance-grid grid grid-columns-3 gap-4 mb-5 bg-slate-400/5 p-3.5 px-4 rounded-lg border border-slate-400/10" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));">
          <div class="border-r border-slate-400/15 pr-2">
            <span class="block text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Selling Price</span>
            <span class="font-bold text-[15px] block mt-1">
              {{ item.sell === -1 ? 'Untradable' : item.sell.toLocaleString() + ' Spina' }}
            </span>
          </div>
          <div class="border-r border-slate-400/15 pr-2">
            <span class="block text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Process Points</span>
            <span class="font-bold text-[15px] block mt-1">
              {{ item.process_amount === -1 ? 'Unprocessable' : '+' + item.process_amount.toLocaleString() + ' Pts' }}
            </span>
          </div>
          <div>
            <span class="block text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Material Type</span>
            <span class="font-bold text-[15px] text-amber-500 block mt-1">
              {{ dapatkanNamaMaterial(item.process) }}
            </span>
          </div>
        </div>

        <div class="drop-source-section bg-[#3498db]/5 border-l-4 border-[#3498db] p-[15px] px-[18px] rounded-r-lg mt-3 border-y border-r border-[#3498db]/10">
          <strong class="block text-xs text-[#3498db] uppercase mb-2 font-bold tracking-wider">
            Drop Source / How to Get:
          </strong>
          
          <div v-if="item.drop_from && item.drop_from.length > 0">
            <ul class="m-0 pl-[18px] text-[13.5px] leading-relaxed list-disc">
              <li v-for="(monster, idx) in item.drop_from" :key="idx" class="mb-1.5">
                Dropped by <strong class="text-red-500 font-semibold">[{{ monster.type }}]</strong> 
                <strong class="font-bold">{{ monster.name }}</strong> (Lv. {{ monster.level }})
                <span class="text-slate-400 text-xs"> — Map: {{ monster.map }}</span>
              </li>
            </ul>
          </div>
          
          <p v-else-if="item.meta && item.meta.note" class="m-0 text-[13.5px] whitespace-pre-line leading-relaxed opacity-85">
            {{ item.meta.note }}
          </p>
          
          <p v-else class="m-0 text-[13.5px] text-slate-400 italic">
            No drop data available for this specific item.
          </p>
        </div>
      </div>

      <div v-if="totalHalaman > 1" class="flex items-center justify-center gap-2 mt-6 mb-8">
        <button 
          @click="halamanSekarang--" 
          :disabled="halamanSekarang === 1"
          class="px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :class="isDark ? 'bg-slate-800 border-white/10 text-white hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'"
        >
          Previous
        </button>
        
        <span class="text-xs font-bold px-3">
          Page {{ halamanSekarang }} of {{ totalHalaman }}
        </span>

        <button 
          @click="halamanSekarang++" 
          :disabled="halamanSekarang === totalHalaman"
          class="px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          :class="isDark ? 'bg-slate-800 border-white/10 text-white hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'"
        >
          Next
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Props deteksi tema website induk (menyesuaikan isDark dari web Timi DB kamu)
defineProps({
  isDark: { type: Boolean, default: true }
})

const namaItem = ref('')
const listHasilItem = ref([])
const sedangLoading = ref(false)
const pesanError = ref('')

// State Kontrol History & Dropdown
const isHistoryOpen = ref(false)
const searchRef = ref(null)
const displayedSearchLogs = ref([])

// State Kontrol Pagination
const halamanSekarang = ref(1)
const itemPerHalaman = 10

// Carousel Placeholder Animasi 3 Detik
const placeholders = [
  'Search boss: kuzto',
  'Search item: boss colon',
  'Search crystal: mimyugon',
  'Search material: ghostfire',
  'Search event boss: myco'
]
const currentPlaceholder = ref(placeholders[0])
let placeholderInterval = null

// Menghitung data item yang tampil sesuai halaman pagination aktif
const itemsDiHalamanIni = computed(() => {
  const awal = (halamanSekarang.value - 1) * itemPerHalaman
  const akhir = awal + itemPerHalaman
  return listHasilItem.value.slice(awal, akhir)
})

const totalHalaman = computed(() => {
  return Math.ceil(listHasilItem.value.length / itemPerHalaman)
})

onMounted(() => {
  // Muat riwayat pencarian dari LocalStorage lokal
  const logs = localStorage.getItem('timidb_search_logs')
  if (logs) displayedSearchLogs.value = JSON.parse(logs)

  let index = 0
  placeholderInterval = setInterval(() => {
    index = (index + 1) % placeholders.length
    currentPlaceholder.value = placeholders[index]
  }, 3000)

  document.addEventListener('click', tanganiKlikLuar)
})

onUnmounted(() => {
  if (placeholderInterval) clearInterval(placeholderInterval)
  document.removeEventListener('click', tanganiKlikLuar)
})

const tanganiKlikLuar = (e) => {
  if (searchRef.value && !searchRef.value.contains(e.target)) {
    isHistoryOpen.value = false
  }
}

const clearSearchLogs = () => {
  displayedSearchLogs.value = []
  localStorage.removeItem('timidb_search_logs')
}

const pilihHistory = (kataKunci) => {
  namaItem.value = kataKunci
  isHistoryOpen.value = false
  cariItemDanDrop()
}

const dapatkanNamaMaterial = (idProses) => {
  if (idProses === -1) return 'None'
  const daftarMaterial = { 1: 'Beast', 2: 'Wood', 3: 'Metal', 4: 'Cloth', 5: 'Medicine', 6: 'Mana' }
  return daftarMaterial[idProses] || `Type ${idProses}`
}

const cariItemDanDrop = async () => {
  if (!namaItem.value.trim()) {
    pesanError.value = 'Please type an item name first!'
    return
  }

  isHistoryOpen.value = false
  sedangLoading.value = true
  pesanError.value = ''
  listHasilItem.value = []
  halamanSekarang.value = 1 // Reset halaman ke 1 tiap pencarian baru

  // Simpan kata kunci ke riwayat (anti-duplikat)
  if (!displayedSearchLogs.value.includes(namaItem.value.trim())) {
    displayedSearchLogs.value.unshift(namaItem.value.trim())
    if (displayedSearchLogs.value.length > 5) displayedSearchLogs.value.pop() // Batasi 5 riwayat saja
    localStorage.setItem('timidb_search_logs', JSON.stringify(displayedSearchLogs.value))
  }

  try {
    const resItem = await fetch(`https://coryn.club/api/v1/items.php?name=${encodeURIComponent(namaItem.value)}`)
    if (!resItem.ok) throw new Error('Failed to connect to Item API')
    const jsonItem = await resItem.json()

    if (jsonItem.success && Array.isArray(jsonItem.data) && jsonItem.data.length > 0) {
      const listMentahItem = jsonItem.data

      let listMonster = []
      try {
        const resMonster = await fetch(`https://coryn.club/api/v1/monsters.php?name=${encodeURIComponent(namaItem.value)}`)
        if (resMonster.ok) {
          const jsonMonster = await resMonster.json()
          if (jsonMonster.success && Array.isArray(jsonMonster.data)) {
            listMonster = jsonMonster.data
          }
        }
      } catch (monsterErr) {
        console.warn("Monster data fallback triggers.")
      }

      listHasilItem.value = listMentahItem.map((itemBiasa) => {
        const monsterCocok = listMonster.filter(m => 
          itemBiasa.name.toLowerCase().includes(m.name.toLowerCase()) || 
          m.name.toLowerCase().includes(
            itemBiasa.name.toLowerCase()
              .replace('mask', '').replace('splinter', '').replace('fists', '')
              .replace('cane', '').replace('sword', '').replace('bow', '').trim()
          )
        )

        const mapUnik = new Map()
        monsterCocok.forEach(m => {
          const kunciKeunikan = `${m.name}-${m.map_name}-${m.level}`
          if (!mapUnik.has(kunciKeunikan)) {
            mapUnik.set(kunciKeunikan, {
              name: m.name,
              level: m.level || '?',
              type: m.type_label || 'Normal',
              map: m.map_name || 'Unknown Map'
            })
          }
        })

        return {
          ...itemBiasa,
          drop_from: Array.from(mapUnik.values())
        }
      })
    } else {
      pesanError.value = 'Item not found in Toram Database.'
    }
  } catch (error) {
    pesanError.value = 'Database Connection Error: ' + error.message
  } finally {
    sedangLoading.value = false
  }
}
</script>