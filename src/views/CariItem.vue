<template>
  <div class="timidb-search-container max-w-[1200px] mx-auto p-2.5 font-sans">

    <!-- Attribution -->
    <div :class="['text-[13px] leading-relaxed p-3 px-4 rounded-lg mb-6 border',
      isDark ? 'bg-[#3498db]/[0.08] border-[#3498db]/20 text-slate-400' : 'bg-blue-50 border-blue-200 text-slate-600']">
      💡 <strong>Database Information:</strong> Data fetched real-time via
      <a href="https://coryn.club/api/" target="_blank" rel="noopener"
        class="text-[#3498db] font-semibold no-underline hover:underline">Coryn Club Developer API v1</a>.
    </div>

    <!-- Search Bar + Type Filter -->
    <div class="space-y-3 mb-6">
      <label :class="['text-[10px] font-black uppercase tracking-[0.2em] ml-1 flex items-center gap-2',
        isDark ? 'text-cyan-500' : 'text-blue-600']">
        <span :class="['w-2 h-2 rounded-full', isDark ? 'bg-cyan-500/40' : 'bg-blue-400/40']"></span>
        SEARCH ITEM
      </label>
      <div class="flex flex-wrap gap-3 max-w-[700px]">
        <!-- Search Input -->
        <div ref="searchRef" class="relative group flex-1 min-w-[200px] flex gap-3">
          <div class="relative flex-1">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3498db] transition-colors">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </span>
            <input
              v-model="namaItem"
              @keyup.enter="cariItemDanDrop"
              @focus="isHistoryOpen = true"
              type="text"
              :placeholder="currentPlaceholder"
              :class="['w-full pl-10 pr-4 py-3 rounded-lg border text-sm font-medium outline-none transition-all',
                isDark
                  ? 'bg-white/[0.05] border-white/10 focus:border-[#3498db]/60 text-white placeholder-slate-600'
                  : 'bg-white border-slate-300 focus:border-[#3498db] text-slate-800 placeholder-slate-400']"
            />
            <!-- History Dropdown -->
            <div
              v-if="displayedSearchLogs.length > 0 && isHistoryOpen"
              :class="['absolute left-0 right-0 z-20 mt-1.5 rounded-xl border shadow-xl overflow-hidden',
                isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800']"
            >
              <div :class="['flex items-center justify-between px-4 py-2.5 border-b',
                isDark ? 'border-white/5' : 'border-slate-100']">
                <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Recent searches</span>
                <button @click.stop="clearSearchLogs" class="text-[10px] font-bold text-red-400 hover:text-red-300">Clear</button>
              </div>
              <ul class="m-0 p-0 list-none">
                <li
                  v-for="(log, idx) in displayedSearchLogs" :key="idx"
                  @click="pilihHistory(log)"
                  :class="['px-4 py-2 text-xs font-medium cursor-pointer transition-colors flex items-center gap-2',
                    isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50']"
                >
                  <svg class="w-3 h-3 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ log }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Type Filter Dropdown -->
        <div class="relative">
          <select
            v-model="filterType"
            :class="['appearance-none pl-3 pr-8 py-3 rounded-lg border text-sm font-semibold outline-none transition-all cursor-pointer',
              isDark
                ? 'bg-white/[0.05] border-white/10 focus:border-[#3498db]/60 text-white'
                : 'bg-white border-slate-300 focus:border-[#3498db] text-slate-700']"
          >
            <option value="">All Types</option>
            <option v-for="t in availableTypes" :key="t" :value="t">{{ t }}</option>
          </select>
          <span class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
            </svg>
          </span>
        </div>

        <!-- Search Button -->
        <button
          @click="cariItemDanDrop"
          :disabled="sedangLoading"
          class="px-5 py-3 bg-[#3498db] hover:bg-[#2980b9] disabled:opacity-60 text-white font-bold text-sm rounded-lg border-none cursor-pointer transition-colors shrink-0"
        >
          {{ sedangLoading ? 'Searching...' : 'Search' }}
        </button>
      </div>

      <!-- Active filter badge -->
      <div v-if="filterType" class="flex items-center gap-2 ml-1">
        <span :class="['text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5',
          isDark ? 'bg-[#3498db]/15 text-[#3498db]' : 'bg-blue-100 text-blue-700']">
          Filtering: {{ filterType }}
          <button @click="filterType = ''" class="opacity-70 hover:opacity-100 ml-0.5">✕</button>
        </span>
      </div>
    </div>

    <!-- State -->
    <div class="mb-4">
      <p v-if="sedangLoading" :class="['text-sm flex items-center gap-2', isDark ? 'text-slate-400' : 'text-slate-500']">
        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        Fetching item data, stats, and drop sources...
      </p>
      <p v-if="pesanError" class="text-red-500 text-sm font-semibold">⚠️ {{ pesanError }}</p>
    </div>

    <!-- Results -->
    <div v-if="listHasilFiltered.length > 0">
      <p :class="['text-sm mb-4', isDark ? 'text-slate-400' : 'text-slate-500']">
        Found <strong>{{ listHasilFiltered.length }}</strong> item{{ listHasilFiltered.length > 1 ? 's' : '' }}
        <span v-if="filterType" class="opacity-60"> (filtered from {{ listHasilItem.length }})</span>
      </p>

      <!-- Item Cards -->
      <div
        v-for="item in itemsDiHalamanIni"
        :key="item.id"
        :class="['rounded-xl border mb-6 overflow-hidden transition-all',
          isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm']"
      >
        <!-- ── Card Header ── -->
        <div :class="['px-5 py-4 border-b flex items-start justify-between gap-3 flex-wrap',
          isDark ? 'border-white/8 bg-white/[0.02]' : 'border-slate-200 bg-slate-50']">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h3 :class="['text-base font-bold m-0 leading-tight', isDark ? 'text-white' : 'text-slate-900']">
                {{ item.name }}
              </h3>
              <span :class="['text-[11px] font-medium px-1.5 py-0.5 rounded font-mono',
                isDark ? 'text-slate-500 bg-white/5' : 'text-slate-400 bg-slate-200']">#{{ item.id }}</span>
            </div>
            <span :class="['inline-block mt-1.5 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded',
              isDark ? 'bg-[#3498db]/15 text-[#3498db]' : 'bg-blue-100 text-blue-700']">
              {{ item.type_label ? item.type_label.replace('[','').replace(']','') : 'Unknown' }}
            </span>
          </div>
          <span
            v-if="item.meta && item.meta.badge"
            :class="['text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-wide',
              isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200']"
          >
            ★ {{ item.meta.badge }}
          </span>
        </div>

        <!-- ── Stat / Effect Table ── -->
        <div v-if="item.statsNormal && item.statsNormal.length > 0" class="px-0">
          <div :class="['grid grid-cols-[1fr_auto] px-5 py-2 text-[11px] font-black uppercase tracking-wider border-b',
            isDark ? 'text-[#3498db] border-white/8 bg-[#3498db]/5' : 'text-[#3498db] border-slate-200 bg-blue-50/60']">
            <span>Stat / Effect</span>
            <span class="text-right">Amount</span>
          </div>

          <!-- Upgrade for rows — clickable, opens modal -->
          <template v-if="item.upgradeForStats && item.upgradeForStats.length > 0">
            <div
              v-for="(uf, ufi) in item.upgradeForStats" :key="'uf-'+ufi"
              :class="['grid grid-cols-[1fr_auto] px-5 py-2.5 items-center border-b text-sm',
                isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-100 hover:bg-slate-50']"
            >
              <span :class="['font-medium', isDark ? 'text-slate-300' : 'text-slate-700']">Upgrade for</span>
              <span class="text-right font-semibold">
                <button
                  v-if="item.upgradeForNames && item.upgradeForNames[uf.amount]"
                  @click="bukaModalUpgrade(uf.amount, item.upgradeForNames[uf.amount])"
                  :class="['inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-bold text-xs transition-all',
                    isDark
                      ? 'bg-violet-500/10 border-violet-500/25 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400/40'
                      : 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100']"
                >
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3l14 9-14 9V3z"/>
                  </svg>
                  {{ item.upgradeForNames[uf.amount] }}
                  <span :class="['text-[9px] font-black uppercase tracking-widest opacity-60']">XTAL</span>
                </button>
                <span v-else class="text-slate-400 italic text-xs">Loading #{{ uf.amount }}…</span>
              </span>
            </div>
          </template>

          <!-- Stats normal -->
          <div
            v-for="(stat, si) in item.statsNormal" :key="'sn-'+si"
            :class="['grid grid-cols-[1fr_auto] px-5 py-2.5 items-center border-b text-sm',
              isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-100 hover:bg-slate-50']"
          >
            <span :class="['font-medium', isDark ? 'text-slate-300' : 'text-slate-700']">{{ stat.effect_name }}</span>
            <span :class="['text-right font-bold tabular-nums text-[13px]',
              stat.amount < 0
                ? (isDark ? 'text-red-400' : 'text-red-600')
                : (isDark ? 'text-emerald-400' : 'text-emerald-700')]">
              {{ stat.amount > 0 ? '+' : '' }}{{ stat.amount }}
            </span>
          </div>

          <!-- Conditional stats -->
          <template v-if="item.statsConditional && item.statsConditional.length > 0">
            <template v-for="(group, gi) in item.statsConditional" :key="'cg-'+gi">
              <div :class="['px-5 pt-3 pb-1 text-[11px] font-black uppercase tracking-wider',
                isDark ? 'text-[#3498db]' : 'text-[#2980b9]']">
                {{ group.label }}
              </div>
              <div
                v-for="(stat, csi) in group.stats" :key="'cs-'+csi"
                :class="['grid grid-cols-[1fr_auto] pl-8 pr-5 py-2.5 items-center border-b text-sm',
                  isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-100 hover:bg-slate-50']"
              >
                <span :class="['font-medium', isDark ? 'text-slate-300' : 'text-slate-700']">{{ stat.effect_name }}</span>
                <span :class="['text-right font-bold tabular-nums text-[13px]',
                  stat.amount < 0
                    ? (isDark ? 'text-red-400' : 'text-red-600')
                    : (isDark ? 'text-emerald-400' : 'text-emerald-700')]">
                  {{ stat.amount > 0 ? '+' : '' }}{{ stat.amount }}
                </span>
              </div>
            </template>
          </template>
        </div>

        <!-- No stats fallback -->
        <div v-else class="px-5 py-4">
          <p :class="['text-sm italic', isDark ? 'text-slate-500' : 'text-slate-400']">No stat data available.</p>
        </div>

        <!-- ── Used For ── -->
        <div
          v-if="item.usedFor && item.usedFor.length > 0"
          :class="['mx-0 border-t', isDark ? 'border-white/8' : 'border-slate-200']"
        >
          <div :class="['px-5 py-2 text-[11px] font-black uppercase tracking-wider border-b',
            isDark ? 'text-purple-400 border-white/8 bg-purple-500/5' : 'text-purple-700 border-slate-200 bg-purple-50/60']">
            Used for (Upgrade into)
          </div>
          <div
            v-for="(used, ui) in item.usedFor" :key="'used-'+ui"
            :class="['grid grid-cols-[1fr_auto] px-5 py-2.5 items-center border-b text-sm',
              isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-100 hover:bg-slate-50']"
          >
            <span :class="['font-medium', isDark ? 'text-slate-300' : 'text-slate-700']">Upgrade into</span>
            <button
              @click="bukaModalUpgrade(used.id, used.name)"
              :class="['inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-bold text-xs transition-all',
                isDark
                  ? 'bg-violet-500/10 border-violet-500/25 text-violet-300 hover:bg-violet-500/20'
                  : 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100']"
            >
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3l14 9-14 9V3z"/>
              </svg>
              {{ used.name }}
              <span class="text-[9px] font-black uppercase tracking-widest opacity-60">XTAL</span>
            </button>
          </div>
        </div>

        <!-- ── Finance Row ── -->
        <div :class="['grid border-t text-sm', 'grid-cols-2 sm:grid-cols-3',
          isDark ? 'border-white/8 bg-white/[0.015]' : 'border-slate-200 bg-slate-50/50']"
          style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))">
          <div :class="['px-5 py-3 border-r', isDark ? 'border-white/8' : 'border-slate-200']">
            <div :class="['text-[10px] font-black uppercase tracking-wider mb-1', isDark ? 'text-slate-500' : 'text-slate-400']">Sell</div>
            <div :class="['font-semibold', isDark ? 'text-slate-200' : 'text-slate-700']">
              {{ item.sell === -1 ? 'Untradable' : item.sell.toLocaleString() + ' Spina' }}
            </div>
          </div>
          <div :class="['px-5 py-3 border-r', isDark ? 'border-white/8' : 'border-slate-200']">
            <div :class="['text-[10px] font-black uppercase tracking-wider mb-1', isDark ? 'text-slate-500' : 'text-slate-400']">Process</div>
            <div :class="['font-semibold', isDark ? 'text-slate-200' : 'text-slate-700']">
              {{ item.process_amount === -1 ? 'Unprocessable' : item.process_amount.toLocaleString() + ' ' + dapatkanNamaMaterial(item.process) }}
            </div>
          </div>
          <div class="px-5 py-3">
            <div :class="['text-[10px] font-black uppercase tracking-wider mb-1', isDark ? 'text-slate-500' : 'text-slate-400']">Material</div>
            <div class="font-semibold text-amber-500">{{ dapatkanNamaMaterial(item.process) }}</div>
          </div>
        </div>

        <!-- ── Obtained From / Drop Source ── -->
        <div :class="['border-t', isDark ? 'border-white/8' : 'border-slate-200']">
          <div :class="['px-5 py-2 text-[11px] font-black uppercase tracking-wider border-b flex items-center justify-between',
            isDark ? 'text-[#3498db] border-white/8 bg-[#3498db]/5' : 'text-[#3498db] border-slate-200 bg-blue-50/60']">
            <span>Obtained from</span>
            <!-- Toggle Map View -->
            <button
              v-if="item.drop_from && item.drop_from.length > 0"
              @click="toggleMapView(item.id)"
              :class="['text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border transition-all',
                mapViewActive === item.id
                  ? (isDark ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-emerald-100 border-emerald-300 text-emerald-700')
                  : (isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50')]"
            >
              🗺 {{ mapViewActive === item.id ? 'List View' : 'Map View' }}
            </button>
          </div>

          <!-- MAP VIEW -->
          <div v-if="mapViewActive === item.id && item.drop_from && item.drop_from.length > 0">
            <!-- Group by map -->
            <template v-for="(mapGroup, mgKey) in groupByMap(item.drop_from)" :key="'mg-'+mgKey">
              <div :class="['px-5 pt-3 pb-1 flex items-center gap-2',
                isDark ? 'bg-white/[0.015]' : 'bg-slate-50/80']">
                <svg class="w-3.5 h-3.5 text-[#3498db] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                <span :class="['text-[11px] font-black uppercase tracking-wider', isDark ? 'text-[#3498db]' : 'text-[#2980b9]']">
                  {{ mgKey }}
                </span>
              </div>
              <div
                v-for="(monster, mmi) in mapGroup" :key="'mm-'+mmi"
                :class="['grid grid-cols-[auto_1fr_auto] pl-9 pr-5 py-2 items-center border-b gap-3 text-sm',
                  isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-100 hover:bg-slate-50']"
              >
                <span :class="['text-[10px] font-bold px-1.5 py-0.5 rounded uppercase',
                  monster.type === 'Boss'
                    ? (isDark ? 'bg-red-500/15 text-red-400' : 'bg-red-100 text-red-700')
                    : (isDark ? 'bg-white/8 text-slate-400' : 'bg-slate-200 text-slate-600')]">
                  {{ monster.type }}
                </span>
                <span :class="['font-semibold', isDark ? 'text-slate-200' : 'text-slate-800']">{{ monster.name }}</span>
                <span v-if="monster.level !== '?'" :class="['text-xs tabular-nums', isDark ? 'text-slate-500' : 'text-slate-400']">
                  Lv.{{ monster.level }}
                </span>
              </div>
            </template>
          </div>

          <!-- LIST VIEW (default) -->
          <div v-else-if="item.drop_from && item.drop_from.length > 0">
            <div
              v-for="(monster, mi) in item.drop_from" :key="'m-'+mi"
              :class="['grid grid-cols-[1fr_auto] px-5 py-2.5 items-start border-b text-sm',
                isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-100 hover:bg-slate-50']"
            >
              <div>
                <span :class="['font-semibold', isDark ? 'text-slate-200' : 'text-slate-800']">{{ monster.name }}</span>
                <span :class="['ml-2 text-[11px] font-bold uppercase px-1.5 py-0.5 rounded',
                  monster.type === 'Boss'
                    ? (isDark ? 'bg-red-500/15 text-red-400' : 'bg-red-100 text-red-700')
                    : (isDark ? 'bg-white/8 text-slate-400' : 'bg-slate-200 text-slate-600')]">
                  {{ monster.type }}
                </span>
                <span v-if="monster.level !== '?'" :class="['ml-1 text-xs', isDark ? 'text-slate-500' : 'text-slate-400']">
                  Lv. {{ monster.level }}
                </span>
              </div>
              <span :class="['text-right text-xs', isDark ? 'text-slate-500' : 'text-slate-400']">{{ monster.map }}</span>
            </div>
          </div>

          <div v-else-if="item.meta && item.meta.note" class="px-5 py-3">
            <p :class="['text-sm m-0 leading-relaxed', isDark ? 'text-slate-400' : 'text-slate-600']">{{ item.meta.note }}</p>
          </div>
          <div v-else class="px-5 py-3">
            <p :class="['text-sm italic m-0', isDark ? 'text-slate-600' : 'text-slate-400']">No drop data available.</p>
          </div>
        </div>

      </div><!-- end item card -->

      <!-- ── Pagination ── -->
      <div v-if="totalHalaman > 1" class="flex items-center justify-center gap-1.5 mt-4 mb-8 flex-wrap">
        <button @click="halamanSekarang = 1" :disabled="halamanSekarang === 1" :class="paginasiClass">«</button>
        <button @click="halamanSekarang--" :disabled="halamanSekarang === 1" :class="paginasiClass">‹</button>

        <template v-for="p in halamanDitampilkan" :key="p">
          <span v-if="p === '...'" :class="['px-1 text-sm', isDark ? 'text-slate-500' : 'text-slate-400']">…</span>
          <button
            v-else
            @click="halamanSekarang = p"
            :class="['min-w-[36px] h-9 px-2 rounded-lg border text-xs font-bold cursor-pointer transition-colors',
              halamanSekarang === p
                ? 'bg-[#3498db] border-[#3498db] text-white'
                : (isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50')]"
          >{{ p }}</button>
        </template>

        <button @click="halamanSekarang++" :disabled="halamanSekarang === totalHalaman" :class="paginasiClass">›</button>
        <button @click="halamanSekarang = totalHalaman" :disabled="halamanSekarang === totalHalaman" :class="paginasiClass">»</button>

        <span :class="['text-[11px] ml-2', isDark ? 'text-slate-500' : 'text-slate-400']">
          Page {{ halamanSekarang }}/{{ totalHalaman }} · {{ listHasilFiltered.length }} items
        </span>
      </div>
    </div><!-- end results -->

    <!-- ══════════════════════════════════════════════════════════
         UPGRADE / XTAL MODAL
    ══════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="upgradeModal.open"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="tutupModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

          <!-- Modal Panel -->
          <div :class="['relative w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden',
            isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200']">

            <!-- Modal Header -->
            <div :class="['px-6 py-4 border-b flex items-center justify-between gap-3',
              isDark ? 'border-white/8 bg-white/[0.02]' : 'border-slate-200 bg-slate-50']">
              <div class="flex items-center gap-3">
                <!-- Crystal icon -->
                <div :class="['w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0',
                  isDark ? 'bg-violet-500/15' : 'bg-violet-100']">
                  💎
                </div>
                <div>
                  <p :class="['text-[10px] font-black uppercase tracking-widest mb-0.5', isDark ? 'text-violet-400' : 'text-violet-600']">
                    XTAL Upgrade Info
                  </p>
                  <h3 :class="['text-base font-bold m-0 leading-tight', isDark ? 'text-white' : 'text-slate-900']">
                    {{ upgradeModal.name }}
                  </h3>
                </div>
              </div>
              <button
                @click="tutupModal"
                :class="['w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0',
                  isDark ? 'text-slate-400 hover:bg-white/8 hover:text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700']"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Modal Content -->
            <div class="px-6 py-5 max-h-[65vh] overflow-y-auto">

              <!-- Loading -->
              <div v-if="upgradeModal.loading" class="flex flex-col items-center py-10 gap-3">
                <svg class="w-7 h-7 animate-spin text-violet-400" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                <p :class="['text-sm', isDark ? 'text-slate-400' : 'text-slate-500']">Loading upgrade data…</p>
              </div>

              <!-- Error -->
              <div v-else-if="upgradeModal.error" class="py-6 text-center">
                <p class="text-red-400 text-sm">⚠️ {{ upgradeModal.error }}</p>
              </div>

              <!-- Stats Table -->
              <div v-else-if="upgradeModal.stats && upgradeModal.stats.length > 0">
                <!-- Type badge -->
                <div class="mb-4 flex items-center gap-2 flex-wrap">
                  <span v-if="upgradeModal.typeLabel" :class="['text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg',
                    isDark ? 'bg-[#3498db]/15 text-[#3498db]' : 'bg-blue-100 text-blue-700']">
                    {{ upgradeModal.typeLabel }}
                  </span>
                  <span v-if="upgradeModal.sell !== undefined" :class="['text-[11px] font-medium px-2.5 py-1 rounded-lg',
                    isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500']">
                    Sell: {{ upgradeModal.sell === -1 ? 'Untradable' : upgradeModal.sell.toLocaleString() + ' Spina' }}
                  </span>
                </div>

                <!-- Stat table header -->
                <div :class="['grid grid-cols-[1fr_auto] px-4 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg mb-1',
                  isDark ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-50 text-violet-700']">
                  <span>Stat / Effect</span>
                  <span class="text-right">Amount</span>
                </div>

                <!-- Upgrade for rows inside modal (no button, just text) -->
                <template v-if="upgradeModal.upgradeForRows && upgradeModal.upgradeForRows.length > 0">
                  <div
                    v-for="(uf2, uf2i) in upgradeModal.upgradeForRows" :key="'muf-'+uf2i"
                    :class="['grid grid-cols-[1fr_auto] px-4 py-2.5 items-center rounded-lg mb-0.5 text-sm',
                      isDark ? 'bg-white/[0.02] hover:bg-white/[0.04]' : 'bg-slate-50 hover:bg-slate-100']"
                  >
                    <span :class="['font-medium', isDark ? 'text-slate-300' : 'text-slate-700']">Upgrade for</span>
                    <span :class="['text-right font-bold text-violet-400 text-xs']">
                      {{ upgradeModal.upgradeForResolvedNames[uf2.amount] || '#' + uf2.amount }}
                    </span>
                  </div>
                </template>

                <!-- Normal stats -->
                <div
                  v-for="(stat, si) in upgradeModal.statsNormal" :key="'ms-'+si"
                  :class="['grid grid-cols-[1fr_auto] px-4 py-2.5 items-center rounded-lg mb-0.5 text-sm',
                    isDark ? 'bg-white/[0.02] hover:bg-white/[0.04]' : 'bg-slate-50 hover:bg-slate-100']"
                >
                  <span :class="['font-medium', isDark ? 'text-slate-300' : 'text-slate-700']">{{ stat.effect_name }}</span>
                  <span :class="['text-right font-bold tabular-nums text-[13px]',
                    stat.amount < 0
                      ? (isDark ? 'text-red-400' : 'text-red-600')
                      : (isDark ? 'text-emerald-400' : 'text-emerald-700')]">
                    {{ stat.amount > 0 ? '+' : '' }}{{ stat.amount }}
                  </span>
                </div>

                <!-- Conditional stats in modal -->
                <template v-if="upgradeModal.statsConditional && upgradeModal.statsConditional.length > 0">
                  <template v-for="(group, gi) in upgradeModal.statsConditional" :key="'mcg-'+gi">
                    <div :class="['px-4 pt-3 pb-1 text-[11px] font-black uppercase tracking-wider',
                      isDark ? 'text-violet-400' : 'text-violet-600']">
                      {{ group.label }}
                    </div>
                    <div
                      v-for="(stat, csi) in group.stats" :key="'mcs-'+csi"
                      :class="['grid grid-cols-[1fr_auto] pl-7 pr-4 py-2.5 items-center rounded-lg mb-0.5 text-sm',
                        isDark ? 'bg-white/[0.02] hover:bg-white/[0.04]' : 'bg-slate-50 hover:bg-slate-100']"
                    >
                      <span :class="['font-medium', isDark ? 'text-slate-300' : 'text-slate-700']">{{ stat.effect_name }}</span>
                      <span :class="['text-right font-bold tabular-nums text-[13px]',
                        stat.amount < 0
                          ? (isDark ? 'text-red-400' : 'text-red-600')
                          : (isDark ? 'text-emerald-400' : 'text-emerald-700')]">
                        {{ stat.amount > 0 ? '+' : '' }}{{ stat.amount }}
                      </span>
                    </div>
                  </template>
                </template>

              </div>

              <!-- No stats fallback in modal -->
              <div v-else class="py-8 text-center">
                <p :class="['text-sm italic', isDark ? 'text-slate-500' : 'text-slate-400']">No stat data available for this item.</p>
              </div>

              <!-- Drop sources in modal -->
              <div v-if="upgradeModal.dropFrom && upgradeModal.dropFrom.length > 0" class="mt-5">
                <div :class="['text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-2',
                  isDark ? 'text-[#3498db]' : 'text-[#2980b9]']">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Drop Locations
                </div>
                <div
                  v-for="(m, mi) in upgradeModal.dropFrom" :key="'md-'+mi"
                  :class="['grid grid-cols-[1fr_auto] px-4 py-2.5 rounded-lg mb-0.5 items-start text-sm',
                    isDark ? 'bg-white/[0.02]' : 'bg-slate-50']"
                >
                  <div>
                    <span :class="['font-semibold', isDark ? 'text-slate-200' : 'text-slate-800']">{{ m.name }}</span>
                    <span :class="['ml-2 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded',
                      m.type === 'Boss'
                        ? (isDark ? 'bg-red-500/15 text-red-400' : 'bg-red-100 text-red-700')
                        : (isDark ? 'bg-white/8 text-slate-400' : 'bg-slate-200 text-slate-600')]">
                      {{ m.type }}
                    </span>
                    <span v-if="m.level !== '?'" :class="['ml-1 text-xs', isDark ? 'text-slate-500' : 'text-slate-400']">
                      Lv.{{ m.level }}
                    </span>
                  </div>
                  <span :class="['text-xs text-right', isDark ? 'text-slate-500' : 'text-slate-400']">{{ m.map }}</span>
                </div>
              </div>

            </div><!-- end modal body -->

            <!-- Modal Footer -->
            <div :class="['px-6 py-3 border-t flex justify-end',
              isDark ? 'border-white/8 bg-white/[0.01]' : 'border-slate-200 bg-slate-50']">
              <button
                @click="tutupModal"
                :class="['px-5 py-2 rounded-lg text-sm font-bold transition-colors',
                  isDark ? 'bg-white/8 hover:bg-white/12 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700']"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

defineProps({
  isDark: { type: Boolean, default: true }
})

const namaItem = ref('')
const listHasilItem = ref([])
const sedangLoading = ref(false)
const pesanError = ref('')
const isHistoryOpen = ref(false)
const searchRef = ref(null)
const displayedSearchLogs = ref([])
const halamanSekarang = ref(1)
const itemPerHalaman = 10
const filterType = ref('')
const mapViewActive = ref(null)

// ── Upgrade Modal State ──
const upgradeModal = ref({
  open: false,
  loading: false,
  error: '',
  id: null,
  name: '',
  typeLabel: '',
  sell: undefined,
  stats: [],
  statsNormal: [],
  statsConditional: [],
  upgradeForRows: [],
  upgradeForResolvedNames: {},
  dropFrom: []
})

const placeholders = [
  'Search boss: kuzto', 'Search item: boss colon',
  'Search crystal: mimyugon', 'Search material: ghostfire', 'Search event boss: myco'
]
const currentPlaceholder = ref(placeholders[0])
let placeholderInterval = null

// ── Available types for dropdown (populated after search) ──
const availableTypes = computed(() => {
  const set = new Set()
  listHasilItem.value.forEach(item => {
    if (item.type_label) {
      const clean = item.type_label.replace('[','').replace(']','').trim()
      if (clean) set.add(clean)
    }
  })
  return Array.from(set).sort()
})

// ── Filtered results ──
const listHasilFiltered = computed(() => {
  if (!filterType.value) return listHasilItem.value
  return listHasilItem.value.filter(item => {
    const clean = item.type_label ? item.type_label.replace('[','').replace(']','').trim() : ''
    return clean === filterType.value
  })
})

// ── Pagination computed ──
const itemsDiHalamanIni = computed(() => {
  const a = (halamanSekarang.value - 1) * itemPerHalaman
  return listHasilFiltered.value.slice(a, a + itemPerHalaman)
})
const totalHalaman = computed(() => Math.ceil(listHasilFiltered.value.length / itemPerHalaman))
const halamanDitampilkan = computed(() => {
  const total = totalHalaman.value
  const cur = halamanSekarang.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (cur <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (cur >= total - 3) return [1, '...', total-4, total-3, total-2, total-1, total]
  return [1, '...', cur-1, cur, cur+1, '...', total]
})
const paginasiClass = computed(() => [
  'min-w-[36px] h-9 px-2 rounded-lg border text-xs font-bold cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed',
  'bg-transparent border-white/10 text-slate-400 hover:bg-white/5'
])

// ── Helpers ──
const dapatkanNamaMaterial = (id) => {
  if (id === -1) return 'None'
  return { 1:'Beast', 2:'Wood', 3:'Metal', 4:'Cloth', 5:'Medicine', 6:'Mana' }[id] || `Type ${id}`
}

// Fungsi kamus untuk menerjemahkan angka applies_to 

const dapatkanLabelApplies = (appliesId) => { 
const daftarApplies = { 
1: '(Shield Only: )', 
2: '(Knuckle Only: )', 4: '(Magic Device Only: )', 8: '(Staff Only: )', 16: '(Bowgun Only: )', 32: '(Bow Only: )', 48: '(Bowgun, Bow Only: )', 64: '(2-Handed Sword only:)', 128: '(1-Handed Sword only:)', 256: '(Other)', 512: '(Other)', 1024: '(Other)', 2048: '(Halberd Only: )', 65536: '(Dagger Only: )', 4096: '(Other)', 8192: '(Katana Only: )', 16384: '(Heavy Armor Only: )', 32768: '(Light Armor Only: )', 131072: '(Dual Swords only: )', 262144: '(Arrow only: )', 524288: '(Ninjutsu Scroll Only: )' } 

return daftarApplies[appliesId] || '' }
// Group drop_from by map name
const groupByMap = (dropFrom) => {
  const groups = {}
  dropFrom.forEach(m => {
    const key = m.map || 'Unknown Map'
    if (!groups[key]) groups[key] = []
    groups[key].push(m)
  })
  return groups
}

// Toggle map view per item card
const toggleMapView = (itemId) => {
  mapViewActive.value = mapViewActive.value === itemId ? null : itemId
}

// Cache nama item
const cacheNama = {}
const ambilNamaItem = async (id) => {
  if (!id || id <= 0) return null
  if (cacheNama[id]) return cacheNama[id]
  try {
    const r = await fetch(`https://coryn.club/api/v1/items.php?id=${id}`)
    if (!r.ok) return null
    const j = await r.json()
    if (j.success && j.data?.name) { cacheNama[id] = j.data.name; return j.data.name }
  } catch { return null }
  return null
}

// Parse stats helper (reusable)
const parseStats = (rawStats) => {
  const upgradeForRows = rawStats.filter(s => s.effect_name === 'Upgrade for')
  const statsNormal = rawStats.filter(s => s.effect_name !== 'Upgrade for' && (!s.applies_to || s.applies_to === 0))
  const statsCond = rawStats.filter(s => s.effect_name !== 'Upgrade for' && s.applies_to && s.applies_to !== 0)
  const groupMap = {}
  statsCond.forEach(s => {
    const label = dapatkanLabelApplies(s.applies_to) || `Type ${s.applies_to}`
    if (!groupMap[label]) groupMap[label] = []
    groupMap[label].push(s)
  })
  const statsConditional = Object.entries(groupMap).map(([label, stats]) => ({ label: label + ':', stats }))
  return { upgradeForRows, statsNormal, statsConditional }
}

// ── Open Upgrade Modal ──
const bukaModalUpgrade = async (itemId, itemName) => {
  upgradeModal.value = {
    open: true,
    loading: true,
    error: '',
    id: itemId,
    name: itemName,
    typeLabel: '',
    sell: undefined,
    stats: [],
    statsNormal: [],
    statsConditional: [],
    upgradeForRows: [],
    upgradeForResolvedNames: {},
    dropFrom: []
  }

  try {
    // Fetch item detail
    const r = await fetch(`https://coryn.club/api/v1/items.php?id=${itemId}`)
    if (!r.ok) throw new Error('Failed to fetch item data')
    const j = await r.json()
    if (!j.success) throw new Error('Item not found')

    const data = j.data
    const rawStats = data.stats || []
    const { upgradeForRows, statsNormal, statsConditional } = parseStats(rawStats)

    // Resolve upgrade for names
    const upgradeForResolvedNames = {}
    await Promise.all(upgradeForRows.map(async (s) => {
      const nama = await ambilNamaItem(s.amount)
      if (nama) upgradeForResolvedNames[s.amount] = nama
    }))

    // Fetch monster drop data for this item name
    let dropFrom = []
    try {
      const rm = await fetch(`https://coryn.club/api/v1/monsters.php?name=${encodeURIComponent(itemName)}`)
      if (rm.ok) {
        const jm = await rm.json()
        if (jm.success && Array.isArray(jm.data)) {
          const mapUnik = new Map()
          jm.data.forEach(m => {
            if (
              itemName.toLowerCase().includes(m.name.toLowerCase()) ||
              m.name.toLowerCase().includes(
                itemName.toLowerCase()
                  .replace('mask','').replace('splinter','').replace('fists','')
                  .replace('cane','').replace('sword','').replace('bow','').trim()
              )
            ) {
              const k = `${m.name}-${m.map_name}-${m.level}`
              if (!mapUnik.has(k)) mapUnik.set(k, {
                name: m.name, level: m.level || '?',
                type: m.type_label || 'Normal', map: m.map_name || 'Unknown Map'
              })
            }
          })
          dropFrom = Array.from(mapUnik.values())
        }
      }
    } catch { /* ignore */ }

    upgradeModal.value = {
      ...upgradeModal.value,
      loading: false,
      typeLabel: data.type_label ? data.type_label.replace('[','').replace(']','') : '',
      sell: data.sell,
      stats: rawStats,
      statsNormal,
      statsConditional,
      upgradeForRows,
      upgradeForResolvedNames,
      dropFrom
    }
  } catch (err) {
    upgradeModal.value.loading = false
    upgradeModal.value.error = err.message
  }
}

const tutupModal = () => {
  upgradeModal.value.open = false
}

// Close modal on Escape
const handleKeydown = (e) => {
  if (e.key === 'Escape' && upgradeModal.value.open) tutupModal()
}

// ── Lifecycle ──
onMounted(() => {
  const logs = localStorage.getItem('timidb_search_logs')
  if (logs) displayedSearchLogs.value = JSON.parse(logs)
  let i = 0
  placeholderInterval = setInterval(() => {
    i = (i + 1) % placeholders.length
    currentPlaceholder.value = placeholders[i]
  }, 3000)
  document.addEventListener('click', klikLuar)
  document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  clearInterval(placeholderInterval)
  document.removeEventListener('click', klikLuar)
  document.removeEventListener('keydown', handleKeydown)
})
const klikLuar = (e) => {
  if (searchRef.value && !searchRef.value.contains(e.target)) isHistoryOpen.value = false
}
const clearSearchLogs = () => {
  displayedSearchLogs.value = []
  localStorage.removeItem('timidb_search_logs')
}
const pilihHistory = (k) => { namaItem.value = k; isHistoryOpen.value = false; cariItemDanDrop() }

// ── Main Search ──
const cariItemDanDrop = async () => {
  if (!namaItem.value.trim()) { pesanError.value = 'Please type an item name first!'; return }
  isHistoryOpen.value = false
  sedangLoading.value = true
  pesanError.value = ''
  listHasilItem.value = []
  halamanSekarang.value = 1
  filterType.value = ''
  mapViewActive.value = null

  const q = namaItem.value.trim()
  if (!displayedSearchLogs.value.includes(q)) {
    displayedSearchLogs.value.unshift(q)
    if (displayedSearchLogs.value.length > 5) displayedSearchLogs.value.pop()
    localStorage.setItem('timidb_search_logs', JSON.stringify(displayedSearchLogs.value))
  }

  try {
    const resItem = await fetch(`https://coryn.club/api/v1/items.php?name=${encodeURIComponent(q)}`)
    if (!resItem.ok) throw new Error('Failed to connect to Item API')
    const jsonItem = await resItem.json()

    if (!jsonItem.success || !jsonItem.data?.length) {
      pesanError.value = 'Item not found in Toram Database.'
      return
    }

    let listMonster = []
    try {
      const rm = await fetch(`https://coryn.club/api/v1/monsters.php?name=${encodeURIComponent(q)}`)
      if (rm.ok) {
        const jm = await rm.json()
        if (jm.success && Array.isArray(jm.data)) listMonster = jm.data
      }
    } catch { /* ignore */ }

    const detailPromises = jsonItem.data.map(async (itemBiasa) => {
      let rawStats = []
      try {
        const rd = await fetch(`https://coryn.club/api/v1/items.php?id=${itemBiasa.id}`)
        if (rd.ok) {
          const jd = await rd.json()
          if (jd.success && jd.data?.stats) rawStats = jd.data.stats
        }
      } catch { /* ignore */ }

      const { upgradeForRows, statsNormal, statsConditional } = parseStats(rawStats)

      const upgradeForNames = {}
      await Promise.all(upgradeForRows.map(async (s) => {
        const nama = await ambilNamaItem(s.amount)
        if (nama) upgradeForNames[s.amount] = nama
      }))

      let usedFor = []
      try {
        const ru = await fetch(`https://coryn.club/api/v1/items.php?name=${encodeURIComponent(itemBiasa.name)}`)
        if (ru.ok) {
          const ju = await ru.json()
          if (ju.success && Array.isArray(ju.data)) {
            const checks = await Promise.all(
              ju.data.filter(r => r.id !== itemBiasa.id).map(async (r) => {
                try {
                  const rr = await fetch(`https://coryn.club/api/v1/items.php?id=${r.id}`)
                  if (!rr.ok) return null
                  const jr = await rr.json()
                  if (jr.success && jr.data?.stats?.some(s => s.effect_name === 'Upgrade for' && s.amount === itemBiasa.id))
                    return { id: r.id, name: r.name }
                } catch { return null }
                return null
              })
            )
            usedFor = checks.filter(Boolean)
          }
        }
      } catch { /* ignore */ }

      const monsterCocok = listMonster.filter(m =>
        itemBiasa.name.toLowerCase().includes(m.name.toLowerCase()) ||
        m.name.toLowerCase().includes(
          itemBiasa.name.toLowerCase()
            .replace('mask','').replace('splinter','').replace('fists','')
            .replace('cane','').replace('sword','').replace('bow','').trim()
        )
      )
      const mapUnik = new Map()
      monsterCocok.forEach(m => {
        const k = `${m.name}-${m.map_name}-${m.level}`
        if (!mapUnik.has(k)) mapUnik.set(k, {
          name: m.name, level: m.level || '?',
          type: m.type_label || 'Normal', map: m.map_name || 'Unknown Map'
        })
      })

      return {
        ...itemBiasa,
        statsNormal,
        statsConditional,
        upgradeForStats: upgradeForRows,
        upgradeForNames,
        usedFor,
        drop_from: Array.from(mapUnik.values())
      }
    })

    listHasilItem.value = await Promise.all(detailPromises)
  } catch (err) {
    pesanError.value = 'Database Connection Error: ' + err.message
  } finally {
    sedangLoading.value = false
  }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-fade-enter-from .relative {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}
.modal-fade-leave-to .relative {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}
</style>