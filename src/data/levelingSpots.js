// src/data/levelingSpots.js

export const levelingList = [
  // ===== MOB =====
   { range: '1-40', main: { name: 'Pova', type: 'Mob', lv: 32, loc: 'Lonogo Canyon' } },
  { range: '40-55', main: { name: 'Bone Dragonewt', type: 'Mob', lv: 46, loc: 'Ancient Empress Tomb: Area 1' } },
  { range: '85-90', main: { name: 'Finpen', type: 'Mob', lv: 85, loc: 'Spring of Rebirth' } },
  { range: '90-104', main: { name: 'Corroded Dark Fighter/ Knight', type: 'Mob', lv: 97, loc: 'Dark Castle' } },
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
    range: '55-62',
    main: { name: 'Flare Volg', type: 'Boss', difficulty: 'Hard', lv: 57, loc: 'Fiery Volcano: Lava Trail' },
    alts: [{ name: 'Masked Warrior', type: 'Boss', difficulty: 'Normal', lv: 67, loc: 'Land Under Cultivation: Hill' }]
  },
  {
    range: '62-70',
    main: { name: 'Flare Volg', type: 'Boss', difficulty: 'Nightmare', lv: 67, loc: 'Fiery Volcano: Lava Trail' },
    alts: [{ name: 'Masked Warrior', type: 'Boss', difficulty: 'Normal', lv: 67, loc: 'Land Under Cultivation: Hill' }]
  },
  {
    range: '70-79',
    main: { name: 'Masked Warrior', type: 'Boss', difficulty: 'Hard', lv: 77, loc: 'Land Under Cultivation: Hill' },
  alts: [{ name: 'Metal Stinger', type: 'Mini Boss', lv: 82, loc: 'Akaku Desert: Area 2' }]
  },
  {
    range: '79-95',
    main: { name: 'Masked Warrior', type: 'Boss', difficulty: 'Nightmare', lv: 87, loc: 'Land Under Cultivation: Hill' },
    alts: [{ name: 'Metal Stinger', type: 'Mini Boss', lv: 82, loc: 'Akaku Desert: Area 2' }]
  },
  {
    range: '95-112',
    main: { name: 'Masked Warrior', type: 'Boss', difficulty: 'Ultimate', lv: 97, loc: 'Land Under Cultivation: Hill' },
    alts: [{ name: 'Don Yeti', type: 'Mini Boss', lv: 103, range: '95-112', loc: 'Polde Ice Valley' }]
  },
  {
    range: '112-125',
    main: { name: 'Cerberus', type: 'Boss', difficulty: 'Nightmare', lv: 117, loc: 'Spring of Rebirth: Top' },
  },
  {
    range: '125-129',
    main: { name: 'Lapin The Necromancer', type: 'Mini Boss', lv: 124, loc: 'Trace of Dark River' },
  },
  {
    range: '129-146',
    main: { name: 'Cerberus', type: 'Boss', difficulty: 'Ultimate', lv: 137, loc: 'Spring of Rebirth: Top' },
    alts: [
      { name: 'Builder Golem', type: 'Mini Boss', lv: 138, range: '132-143', loc: 'Huge Crysta Factory: 3rd Floor' }
    ]
  },
  {
    range: '146-162',
    main: { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Hard', lv: 150, loc: 'Ultimea Palace: Throne' },
    alts: [
      { name: 'Super Death Mushroom', type: 'Mini Boss', lv: 150, range: '143-158', loc: "Monster's Forest: Animal Trail" },
      { name: 'Commander Golem', type: 'Mini Boss', lv: 154, range: '146-162', loc: 'Lufenas Mansion: Entrance' }
    ]
  },
  {
    range: '162-179',
    main: { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Nightmare', lv: 170, loc: 'Ultimea Palace: Throne' },
    alts: [
      { name: 'Altoblepas', type: 'Mini Boss', lv: 180, range: '166-182', loc: 'Rokoko Plains' }
    ]
  },
  {
    range: '179-182',
    main: { name: 'Altoblepas', type: 'Mini Boss', lv: 180, loc: 'Rokoko Plains' },
  },
  {
    range: '182-199',
    main: { name: 'Venena Coenubia', type: 'Boss', difficulty: 'Ultimate', lv: 190, loc: 'Ultimea Palace: Throne' }
  },
  {
    range: '199-215',
    main: { name: 'Finstern the Dark Dragon', type: 'Boss', difficulty: 'Ultimate', lv: 206, loc: 'Dark Dragon Shrine: Near the Top' }
  },
  {
    range: '215-227',
    main: { name: 'Kuzto', type: 'Boss', difficulty: 'Ultimate', lv: 218, loc: 'Labilans Sector: Square' },
    alts: [
      { name: 'Espectro', type: 'Mini Boss', lv: 221, range: '213-229', loc: 'Arche Valley: Area 1' }
    ]
  },
  {
    range: '227-244',
    main: { name: 'Arachnidemon', type: 'Boss', difficulty: 'Ultimate', lv: 236, loc: 'Arche Valley: Depths' },
    alts: [
      { name: 'Rhinosaur', type: 'Mini Boss', lv: 233, range: '227-234', loc: 'Fugitive Lake Swamp: Area 3' },
      { name: 'Bullamius', type: 'Mini Boss', lv: 239, range: '234-246', loc: 'Storage Yard: Area 2' }
    ]
  },
  {
    range: '244-253',
    main: { name: 'Ferzen the Rock Dragon', type: 'Boss', difficulty: 'Ultimate', lv: 251, loc: 'Guardian Forest: Giant Tree' },
    alts: [
      { name: 'Gemma', type: 'Boss', difficulty: 'Ultimate', lv: 250, range: '244-253', loc: 'Fugitive Lake Swamp: Depths' },
      { name: 'Ignitrus', type: 'Mini Boss', lv: 248, range: '246-254', loc: 'Vulcani Crater Base' }
    ]
  },
  {
    range: '253-266',
    main: { name: 'Trickster Dragon Mimyugon', type: 'Boss', difficulty: 'Nightmare', lv: 258, loc: 'Operation Zone: Cockpit Area' },
    alts: [
      { name: 'Brassozard', type: 'Mini Boss', lv: 259, range: '256-262', loc: 'Operation Zone: Climate Control Area' },
      { name: 'Trus', type: 'Mini Boss', lv: 269, range: '262-277', loc: 'Propulsion System Zone: Power Tank' }
    ]
  },
  {
    range: '266-272',
    main: { name: 'Red Ash Dragon Rudis', type: 'Boss', difficulty: 'Hard', lv: 270, loc: 'Espuma Dome: Entrance' },
    alts: [
      { name: 'Walican', type: 'Boss', difficulty: 'Nightmare', lv: 270, range: '266-272', loc: 'Jabali Kubwa: Summit' },
      { name: 'Trus', type: 'Mini Boss', lv: 269, range: '262-277', loc: 'Propulsion System Zone: Power Tank' }
    ]
  },
  {
    range: '272-287',
    main: { name: 'Trickster Dragon Mimyugon', type: 'Boss', difficulty: 'Ultimate', lv: 278, loc: 'Operation Zone: Cockpit Area' },
    alts: [
      { name: 'Red Ash Dragon Rudis', type: 'Boss', difficulty: 'Nightmare', lv: 280, range: '272-285', loc: 'Espuma Dome: Entrance' },
      { name: 'Walican', type: 'Boss', difficulty: 'Ultimate', lv: 287, range: '278-296', loc: 'Jabali Kubwa: Summit' },
      { name: 'Capo Profundo', type: 'Mini Boss', lv: 287, range: '278-296', loc: 'Abandoned District: Area 3' }
    ]
  },
  {
    range: '285-303',
    main: { name: 'Mulgoon', type: 'Boss', difficulty: 'Nightmare', lv: 291, loc: 'Menabra Plains' },
    alts: [
      { name: 'Red Ash Dragon Rudis', type: 'Boss', difficulty: 'Ultimate', lv: 299, range: '290-308', loc: 'Espuma Dome: Entrance' },
      { name: 'Meteora', type: 'Mini Boss', lv: 302, range: '293-311', loc: 'Menabra Plains' },
      { name: 'Wiltileaf', type: 'Mini Boss', lv: 305, range: '296-314', loc: 'Eumano Village Ruins: Area 2' }
    ]
  },
  {
    range: '305-324',
    main: { name: 'Mulgoon', type: 'Boss', difficulty: 'Ultimate', lv: 311, loc: 'Menabra Plains' },
    alts: [
      { name: 'Meteora', type: 'Mini Boss', lv: 302, range: '293-311', loc: 'Menabra Plains' },
      { name: 'Wiltileaf', type: 'Mini Boss', lv: 305, range: '296-314', loc: 'Eumano Village Ruins: Area 2' },
      { name: 'Wild Beast Lixi', type: 'Mini Boss', lv: 310, range: '308-326', loc: 'Lixaro Ghost Town: Area 3' }
    ]
  },
  {
    range: '310-325',
    main: { name: 'Merzehal', type: 'High Difficulty Boss', lv: 325, loc: 'El Scaro : High Difficulty Hunting Event' },
  },
];
