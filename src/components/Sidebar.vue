<template>
  <!-- Tombol hamburger di app bar (selalu visible) -->
  <button class="hamburger-btn" @click="isOpen = true" aria-label="Buka menu">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </button>

  <!-- Overlay backdrop -->
  <Teleport to="body">
    <div
      class="sidebar-overlay"
      :class="{ open: isOpen }"
      @click="isOpen = false"
    />

    <aside class="sidebar" :class="{ open: isOpen }" role="dialog" aria-modal="true">
      <div class="sidebar-head">
        <div class="logo">
          <img src="/icon.png" alt="" width="36" />
          <span>TIMI <b>DB</b></span>
        </div>
        <button class="close-btn" @click="isOpen = false" aria-label="Tutup menu">✕</button>
      </div>

      <nav class="nav-items">
        <router-link to="/" class="menu" @click="isOpen = false">🎒 Bag Expansion List</router-link>
        <router-link to="/mq" class="menu" @click="isOpen = false">📜 Material MQ List</router-link>
        <router-link to="/calc" class="menu" @click="isOpen = false">🧮 MQ Calculator</router-link>
        <router-link to="/bs" class="menu" @click="isOpen = false">⚔️ BS Calculator</router-link>
      </nav>

      <div class="sidebar-footer">
        <span>Light Mode</span>
        <button class="toggle" @click="toggleMode">☀️</button>
      </div>
    </aside>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
function toggleMode() { /* logika theme */ }
</script>

<style scoped>
.hamburger-btn {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
}
.bar {
  display: block;
  width: 22px;
  height: 2px;
  background: white;
  border-radius: 2px;
}

/* OVERLAY */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s;
}
.sidebar-overlay.open {
  opacity: 1;
  pointer-events: all;
}

/* SIDEBAR */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  /* ✅ Kunci utama: pakai dvh bukan vh */
  height: 100dvh;
  width: 260px;
  background: #111827;
  color: white;
  z-index: 50;
  display: flex;
  flex-direction: column;

  /* ✅ Safe area untuk notch & navigation bar */
  padding-bottom: env(safe-area-inset-bottom, 0px);

  transform: translateX(-100%);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar.open {
  transform: translateX(0);
}

.sidebar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.close-btn {
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.nav-items {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.menu {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 13px;
}
.menu:hover {
  background: rgba(255, 255, 255, 0.08);
}
.router-link-active {
  background: rgba(37, 99, 235, 0.3);
  color: #93c5fd;
}

/* ✅ Footer tidak terpotong */
.sidebar-footer {
  padding: 14px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}
.toggle {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>