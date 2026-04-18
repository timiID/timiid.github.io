// src/data/levelingSpots.js

export const levelingList = [
  // ===== MOB =====
  { range: '1-35', main: { name: 'Shell Mask', type: 'Mob', lv: 23, loc: 'Nisel Mountain' } },
  { range: '30-45', main: { name: 'Pova', type: 'Mob', lv: 32, loc: 'Lonogo Canyon' } },
  { range: '45-55', main: { name: 'Dragonewt', type: 'Mob', lv: 46, loc: 'Ancient Empress Tomb' } },
  { range: '55-62', main: { name: 'Parasitized Dog', type: 'Mob', lv: 57, loc: 'Lost Town' } },
  { range: '62-70', main: { name: 'Mewte', type: 'Mob', lv: 63, loc: 'Gravel Terrace' } },
  { range: '70-85', main: { name: 'Frosti', type: 'Mob', lv: 79, loc: 'Fort Solfini' } },
  { range: '85-90', main: { name: 'Finpen', type: 'Mob', lv: 85, loc: 'Spring of Rebirth' } },
  { range: '90-104', main: { name: 'Corroded Dark Fighter/ Knight', type: 'Mob', loc: 'Dark Castle' } },
  { range: '104-119', main: { name: 'Grape Jelly', type: 'Mob', lv: 110, loc: 'Ultimea Sewer: Southeast' } },
  { range: '119-124', main: { name: 'Venomsch', type: 'Mob', lv: 112, loc: 'Ultimea Sewer: South' } },
  { range: '124-142', main: { name: 'Berrylfree', type: 'Mob', lv: 133, loc: 'Barbaros Corridor' } },
  { range: '142-150', main: { name: 'Bubble Angel', type: 'Mob', lv: 143, loc: 'Shrine of the God' } },
  { range: '150-160', main: { name: 'Ivy', type: 'Mob', lv: 151, loc: 'Dark Dragon Shrine' } },
  { range: '160-178', main: { name: 'Weltacle', type: 'Mob', lv: 168, loc: 'Recetacula Sector' } },
  { range: '178-197', main: { name: 'Juvestida', type: 'Mob', lv: 186, loc: 'Nov Diela' } },
  { range: '198-206', main: { name: 'Bitum', type: 'Mob', lv: 208, loc: 'Mt. Vulcani' } },
  { range: '206-223', main: { name: 'Laduro', type: 'Mob', lv: 214, loc: 'Tunnel of Trials' } },
  { range: '224-234', main: { name: 'Breppa', type: 'Mob', lv: 226, loc: 'Algid Passage' } },
  { range: '235-249', main: { name: 'Anglerfish', type: 'Mob', lv: 240, loc: 'Abandoned District' } },
  { range: '250-267', main: { name: 'Corroded Lixi', type: 'Mob', lv: 258, loc: 'Lixaro Ghost Town' } },
  { range: '250-267', main: { name: 'Alpoca', type: 'Mob', lv: 257, loc: 'Vicus Mutans: Area 3' } },
  { range: '268-285', main: { name: 'Umang', type: 'Mob', lv: 277, loc: 'Raden Tower: Air Vent' } },
  { range: '286-290', main: { name: 'Zamlun', type: 'Mob', lv: 284, loc: 'Izolara Underground Passage' } },

  // ===== BOSS =====
  {
    range: '0-14',
    main: { name: 'Boss Colon', type: 'Boss', difficulty: 'Normal', lv: 4, loc: 'Land Under Development' },
  },
  {
    range: '15-22',
    main: { name: 'Boss Colon', type: 'Boss', difficulty: 'Hard', lv: 14, loc: 'Land Under Development' },
    alts: [{ name: 'Lavarca', type: 'Mini Boss', lv: 21, loc: 'Rakau Plains' }]
  },
  {
    range: '22-33',
    main: { name: 'Boss Colon', type: 'Boss', difficulty: 'Nightmare', lv: 24, loc: 'Land Under Development' },
    alts: [{ name: 'Lavarca', type: 'Mini Boss', lv: 21, loc: 'Rakau Plains' }]
  },
  {
    range: '55-64',
    main: { name: 'Flare Volg', type: 'Boss', difficulty: 'Hard', lv: 57, loc: 'Fiery Volcano: Lava Trail' },
    alts: [{ name: 'Masked Warrior', type: 'Boss', difficulty: 'Normal', lv: 67, loc: 'Land Under Cultivation: Hill' }]
  },
  {
    range: '64-75',
    main: { name: 'Flare Volg', type: 'Boss', difficulty: 'Nightmare', lv: 67, loc: 'Fiery Volcano: Lava Trail' },
    alts: [{ name: 'Masked Warrior', type: 'Boss', difficulty: 'Normal', lv: 67, loc: 'Land Under Cultivation: Hill' }]
  },
  {
    range: '75-85',
    main: { name: 'Masked Warrior', type: 'Boss', difficulty: 'Hard', lv: 77, loc: 'Land Under Cultivation: Hill' },
    alts: [{ name: 'Metal Stinger', type: 'Mini Boss', lv: 82, loc: 'Akaku Desert: Area 2' }]
  },
  {
    range: '86-94',
    main: { name: 'Masked Warrior', type: 'Boss', difficulty: 'Nightmare', lv: 87, loc: 'Land Under Cultivation: Hill' },
    alts: [{ name: 'Metal Stinger', type: 'Mini Boss', lv: 82, loc: 'Akaku Desert: Area 2' }]
  },
  {
    range: '94-105',
    main: { name: 'Masked Warrior', type: 'Boss', difficulty: 'Ultimate', lv: 97, loc: 'Land Under Cultivation: Hill' },
    alts: [{ name: 'Don Yeti', type: 'Mini Boss', lv: 103, loc: 'Polde Ice Valley' }]
  },
  {
    range: '102-111',
    main: { name: 'Don Yeti', type: 'Mini Boss', lv: 103, loc: 'Polde Ice Valley' }
  },
  {
    range: '112-125',
    main: { name: 'Cerberus', type: 'Boss', difficulty: 'Nightmare', lv: 117, loc: 'Spring of Rebirth: Top' },
    alts: [{ name: 'Cerberus', type: 'Boss', difficulty: 'Hard', lv: 107, loc: 'Spring of Rebirth: Top' }]
  },
  {
    range: '125-129',
    main: { name: 'Lapin The Necromancer', type: 'Mini Boss', lv: 124, loc: 'Trace of Dark River' },
  },
  {
    range: '129-146',
    main: { name: 'Cerberus', type: 'Boss', difficulty: 'Ultimate', lv: 137, loc: 'Spring of Rebirth: Top' },
    alts: [
      { name: 'Builder Golem', type: 'Mini Boss', lv: 138, loc: 'Huge Crysta Factory: 3rd Floor' },
      { name: 'York', type: 'Boss', difficulty: 'Nightmare', lv: 138, loc: 'Huge Crysta Factory: Storage' },
      { name: 'Ancient Empress Mezzaluna', type: 'Boss', difficulty: 'High Difficulty Boss', lv: 135, loc: 'Harde Hill' }
    ]
  },
  {
    range: '146-162',
    main: { name: 'Commander Golem', type: 'Mini Boss', lv: 154, loc: 'Lufenas Mansion: Entrance' },
    alts: [
      { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Normal', lv: 150, loc: 'Ultimea Palace: Throne' },
      { name: 'Ifrid', type: 'Boss', difficulty: 'Ultimate', lv: 152, loc: 'Blazing Graben: Deepest Part' },
      { name: 'Super Death Mushroom', type: 'Mini Boss', lv: 150, loc: "Monster's Forest: Animal Trail" },
      { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Hard', lv: 160, loc: 'Ultimea Palace: Throne' },
    ]
  },
  {
    range: '162-177',
    main: { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Nightmare', lv: 170, loc: 'Ultimea Palace: Throne' },
    alts: [
      { name: 'Altoblepas', type: 'Mini Boss', lv: 180, loc: 'Rokoko Plains' },
      { name: 'Mozto Machina', type: 'Boss', difficulty: 'Ultimate', lv: 174, loc: 'Large Demi Machina Factory: Area 4' }
    ]
  },
  {
    range: '177-182',
    main: { name: 'Altoblepas', type: 'Mini Boss', lv: 180, loc: 'Rokoko Plains' },
    alts: [
      { name: 'Mithurna Lynx', type: 'Mini Boss', lv: 177, loc: 'Ruins of Mt. Mithurna: Stylobate' },
      { name: 'Carbuncle', type: 'Mini Boss', lv: 183, loc: 'Hall of Construction Gods' },
      { name: 'Seele Zauga', type: 'Boss', difficulty: 'Nightmare', lv: 180, loc: 'Shrine of the Goddess of Species' }
    ]
  },
  {
    range: '182-199',
    main: { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Ultimate', lv: 190, loc: 'Ultimea Palace: Throne' }
  },
  {
    range: '199-215',
    main: { name: 'Finstern the Dark Dragon', type: 'Boss', difficulty: 'Ultimate', lv: 206, loc: 'Dark Dragon Shrine: Near the Top' },
    alts: [
      { name: 'Kuzto', type: 'Boss', difficulty: 'Nightmare', lv: 198, loc: 'Labilans Sector: Square' },
      { name: 'Seele Zauga', type: 'Boss', difficulty: 'Ultimate', lv: 200, loc: 'Shrine of the Goddess of Species' },
      { name: 'Frenzy Viola', type: 'Mini Boss', lv: 198, loc: 'Morthell Swell: Area 3' }
    ]
  },
  {
    range: '215-226',
    main: { name: 'Kuzto', type: 'Boss', difficulty: 'Ultimate', lv: 218, loc: 'Labilans Sector: Square' },
    alts: [
      { name: 'Ageladanios', type: 'Mini Boss', lv: 218, loc: 'Ducia Coast: Area 1' },
      { name: 'Espectro', type: 'Mini Boss', lv: 221, loc: 'Arche Valley: Area 1' }
    ]
  },
  {
    range: '226-232',
    main: { name: 'Espectro', type: 'Mini Boss', lv: 221, loc: 'Arche Valley: Area 1' },
    alts: [{ name: 'Rhinosaur', type: 'Mini Boss', lv: 233, loc: 'Fugitive Lake Swamp: Area 3' }]
  },
  {
    range: '233-245',
    main: { name: 'Arachnidemon', type: 'Boss', difficulty: 'Ultimate', lv: 236, loc: 'Arche Valley: Depths' },
    alts: [
      { name: 'Bullamius', type: 'Mini Boss', lv: 239, loc: 'Storage Yard: Area 2' },
      { name: 'Black Shadow', type: 'Boss', difficulty: 'Ultimate', lv: 239, loc: 'Rokoko City Ruins' },
    ]
  },
  {
    range: '245-255',
    main: { name: 'Ferzen the Rock Dragon', type: 'Boss', difficulty: 'Ultimate', lv: 251, loc: 'Guardian Forest: Giant Tree' },
    alts: [
      { name: 'Reliza', type: 'Boss', difficulty: 'Ultimate', lv: 250, loc: 'Manna Waterfront' },
      { name: 'Hexter', type: 'Boss', difficulty: 'Ultimate', lv: 242, loc: "Witch's Woods Depths" }
    ]
  },
  {
    range: '255-266',
    main: { name: 'Trickster Dragon Mimyugon', type: 'Boss', difficulty: 'Nightmare', lv: 258, loc: 'Operation Zone: Cockpit Area' }
  },
  {
    range: '267-276',
    main: { name: 'Trus', type: 'Mini Boss', lv: 269, loc: 'Propulsion System Zone: Power Tank' }
  },
  {
    range: '272-287',
    main: { name: 'Trickster Dragon Mimyugon', type: 'Boss', difficulty: 'Ultimate', lv: 278, loc: 'Operation Zone: Cockpit Area' },
    alts: [{ name: 'Burning Dragon Igneus', type: 'Boss', difficulty: 'Ultimate', lv: 275, loc: 'Boma Moja: Village Center' }]
  },
  {
    range: '285-297',
    main: { name: 'Capo Profundo', type: 'Mini Boss', lv: 287, loc: 'Abandoned District: Area 3' },
    alts: [
      { name: 'Walican', type: 'Boss', difficulty: 'Ultimate', lv: 287, loc: 'Jabali Kubwa: Summit' },
      { name: 'Mulgoon', type: 'Boss', difficulty: 'Nightmare', lv: 291, loc: 'Menabra Plains' }
    ]
  },
  {
    range: '297-305',
    main: { name: 'Red Ash Dragon Rudis', type: 'Boss', difficulty: 'Ultimate', lv: 299, loc: 'Espuma Dome: Entrance' },
    alts: [
      { name: 'Meteora', type: 'Mini Boss', lv: 302, loc: 'Menabra Plains' },
      { name: 'Wiltileaf', type: 'Mini Boss', lv: 305, loc: 'Eumano Village Ruins: Area 2' }
    ]
  },
  {
    range: '306-314',
    main: { name: 'Wiltileaf', type: 'Mini Boss', lv: 305, loc: 'Eumano Village Ruins: Area 2' },
    alts: [
      { name: 'Mulgoon', type: 'Boss', difficulty: 'Ultimate', lv: 311, loc: 'Menabra Plains' },
      { name: 'Castilia', type: 'Boss', difficulty: 'High Difficulty Boss', lv: 310, loc: 'High Difficulty Event (HDB from El Scaro)' }
    ]
  },
  {
    range: '314-320',
    main: { name: 'Mulgoon', type: 'Boss', difficulty: 'Ultimate', lv: 311, loc: 'Menabra Plains' },
    alts: [{ name: 'Castilia', type: 'Boss', difficulty: 'High Difficulty Boss', lv: 310, loc: 'High Difficulty Event (HDB from El Scaro)' }]
  },
  {
    range: '321-332',
    main: { name: '(Lv Cap 330)Biskyva', type: 'Boss', difficulty: 'Ultimate', lv: 323, loc: 'Aquastida Central' },
    alts: [{ name: 'Merzehal', type: 'Boss', difficulty: 'High Difficulty Boss', lv: 325, loc: 'High Difficulty Event (HDB from El Scaro)' }]
  },
];