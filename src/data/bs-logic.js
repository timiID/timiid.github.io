// bs-logic.js
"use strict";

export const LV_CAP = 325;
export const HIGHEST_PROF = 305;
export const HIGHEST_ARM_POT = 54;
export const HIGHEST_WPN_POT = 55;
export const ARMOR_DIFFICULTY = 265;
export const WEAPON_DIFFICULTY = 300;
export const PRIMARY_STAT = 510;
export const SECONDARY_STAT = 327;

const max = Math.max;
const min = Math.min;
const floor = Math.floor;

/**
 * Helper parsing input agar jika kosong/undefined/null tidak menghasilkan NaN
 */
const parseVal = (val, std = 0) => {
  if (val === "" || val === null || val === undefined || isNaN(val)) return std;
  return Number(val);
};

/**
 * Hitung Effective Stat (Base + Flat + %)
 * Formula: floor( Base * (100 + %)/100 + Flat )
 */
export function getEffectiveStat(base = 0, flat = 0, percent = 0) {
  const b = parseVal(base);
  const f = parseVal(flat);
  const p = parseVal(percent);
  return floor((b * (100 + p)) / 100 + f);
}

/**
 * 1. Hitung Your Difficulty
 * Formula: Proficiency + floor(TEC/2) + floor(DEX_Effective / 6)
 */
export function calculateCharacterDiff(prof = 0, tec = 0, dex = 0, eDex = 0, eDexP = 0) {
  const profVal = parseVal(prof);
  const tecVal = parseVal(tec);
  const totalDex = getEffectiveStat(dex, eDex, eDexP);
  
  return profVal + floor(tecVal / 2) + floor(totalDex / 6);
}

/**
 * 2. Hitung Success Rate (%)
 * Formula: floor((50 + 5 * CreateEq)/100 * (10 + CharDiff - ItemDiff + floor(STR_Effective/10)))
 */
export function calculateSuccessRate(createEquipment = 10, difficulty = 0, itemDifficulty = 0, str = 0, eStr = 0, eStrP = 0) {
  const createEq = parseVal(createEquipment, 0);
  const diff = parseVal(difficulty, 0);
  const itemDiff = parseVal(itemDifficulty, 0);
  const totalStr = getEffectiveStat(str, eStr, eStrP);

  const rate = floor(((50 + 5 * createEq) / 100) * (10 + diff - itemDiff + floor(totalStr / 10)));
  
  // Dibatasi rentang 0% - 100%
  return min(100, max(0, rate));
}

/**
 * 3. Hitung Potential Tambahan berdasarkan Tipe Crafting & Stat
 */
export function getStatPotentialBonus(craftType, stats = {}) {
  const STR = parseVal(stats.STR);
  const INT = parseVal(stats.INT);
  const VIT = parseVal(stats.VIT);
  const DEX = parseVal(stats.DEX);
  const AGI = parseVal(stats.AGI);

  switch (craftType) {
    case "Armor":
      return floor(VIT / 10);
    case "1H Sword":
    case "Bow":
      return floor((DEX + STR) / 20);
    case "2H Sword":
      return floor(STR / 10);
    case "Bowgun":
      return floor(DEX / 10);
    case "Staff":
      return floor(INT / 10);
    case "Magic Device":
      return floor((INT + AGI) / 20);
    case "Knuckle":
      return floor(AGI / 10);
    case "Halberd":
      return floor((STR + AGI) / 20);
    case "Katana":
      return floor((DEX + AGI) / 20);
    default:
      return 0;
  }
}

/**
 * 4. Hitung Total Potential
 * Formula: floor(BasePot * (1 + Careful*0.01 + Expert*0.02)) + BonusStatPot
 */
export function calculatePotential(basePotential = 54, careful = 10, expert = 10, craftType = "Armor", stats = {}) {
  const basePot = parseVal(basePotential, 0);
  const carefulSkill = parseVal(careful, 0);
  const expertSkill = parseVal(expert, 0);

  const potFromSkills = floor(basePot * (1 + carefulSkill * 0.01 + expertSkill * 0.02));
  const bonusFromStats = getStatPotentialBonus(craftType, stats);

  return potFromSkills + bonusFromStats;
}