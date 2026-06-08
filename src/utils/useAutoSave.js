// src/utils/useAutoSave.js
import { watch } from 'vue';

export function useAutoSave(key, refValues) {
  // 1. Load data saat inisialisasi
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Update ref yang diberikan dengan data dari localStorage
      Object.keys(parsed).forEach(k => {
        if (refValues[k]) refValues[k].value = parsed[k];
      });
    } catch (e) { console.error("AutoSave Load Error:", e); }
  }

  // 2. Watch perubahan dan simpan otomatis
  watch(
    Object.values(refValues),
    () => {
      const dataToSave = {};
      Object.keys(refValues).forEach(k => dataToSave[k] = refValues[k].value);
      localStorage.setItem(key, JSON.stringify(dataToSave));
    },
    { deep: true }
  );
}