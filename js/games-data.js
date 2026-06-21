/* =============================================================
   games-data.js — GameCodex
   ---------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD GAMES.

   HOW TO ADD A GAME:
   - Copy one object below, paste it at the BOTTOM of the array.
   - The bottom of the array = your most recently played games.
   - Fill in all fields. Leave image: "" if you have no image yet.

   GAME OBJECT STRUCTURE:
   {
     name:          "Full Game Title",
     image:         "images/filename.jpg",  ← or "" for no image
     month:         "March",                ← exact month name
     year:          2024,                   ← number, not string
     rating:        9,                      ← 1–10, number
     note:          "Your thoughts.",       ← or "" for none
     franchiseId:   "unique-slug",          ← used for franchise count
     franchiseName: "Franchise Name"        ← display name
   }

   FRANCHISE COUNT:
   - franchiseId is just a slug — e.g. "witcher", "souls"
   - Games sharing the same franchiseId = one franchise in stats
   - franchiseName is just for display

   IMAGES:
   - Drop files into /images/ folder
   - Use path: "images/filename.jpg"
   - Leave "" for emoji placeholder
   ============================================================= */

const GAME_DATA = [
  

    {
    name:          "Resident Evil 9: Requiem",
    image:         "images/GamePics/re9.jpg",
    month:         "June",
    year:          2026,
    rating:        0,
    note:          "Leon and Claire’s final battle against the Umbrella Corporation",
    franchiseId:   "Resident Evil",
    franchiseName: "Resident Evil"
  },


  {
    name:          "The Witcher 3: Wild Hunt",
    image:         "images/GamePics/w3.png",
    month:         "December",
    year:          2025,
    rating:        8,
    note:          "Geralt fought fate for Ciri’s future",
    franchiseId:   "witcher",
    franchiseName: "The Witcher"
  },


  {
    name:          "Elden Ring",
    image:         "images/GamePics/eldenring.jpg",
    month:         "September",
    year:          2025,
    rating:        8.5,
    note:          "Broken world, endless pursuit of power",
    franchiseId:   "eldenring",
    franchiseName: "Elden Ring"
  },


  {
    name:          "Sekiro: Shadows Die Twice",
    image:         "images/GamePics/sekiro.jpg",
    month:         "Auigust",
    year:          2025,
    rating:        7,
    note:          "A shinobi bound to loyalty and blade",
    franchiseId:   "sekiro",
    franchiseName: "Sekiro"
  },

  {
    name:          "God of War: Ragnarok",
    image:         "images/GamePics/gow-rag.jpg",
    month:         "June",
    year:          2025,
    rating:        8,
    note:          "Kratos fought destiny to protect Atreus",
    franchiseId:   "gow",
    franchiseName: "God of War"
  },

  {
    name:          "God of War",
    image:         "images/GamePics/gow.jpg",
    month:         "April",
    year:          2025,
    rating:        8,
    note:          "Kratos escaped his violent past to find peace",
    franchiseId:   "gow",
    franchiseName: "God of War"
  },

  {
    name:          "Detroit: Become Human",
    image:         "images/GamePics/detroit.jpg",
    month:         "February",
    year:          2025,
    rating:        9.5,
    note:          "Machines learned what it means to be human",
    franchiseId:   "detroit",
    franchiseName: "Detroit"
  },


  {
    name:          "Read Dead Redemption",
    image:         "images/GamePics/rdr.jpg",
    month:         "April",
    year:          2024,
    rating:        6.5,
    note:          "Marston hunted his past sins",
    franchiseId:   "rdr",
    franchiseName: "Red Dead Redemption"
  },


  {
    name:          "Call of Duty: Black Ops 6",
    image:         "images/GamePics/cod-bo6.jpg",
    month:         "February",
    year:          2024,
    rating:        7,
    note:          "Truth buried deeper than ever before",
    franchiseId:   "cod",
    franchiseName: "Call of Duty"
  },


  {
    name:          "Call of Duty: Modern Warfare III",
    image:         "images/GamePics/cod-mw3.png",
    month:         "January",
    year:          2024,
    rating:        7.5,
    note:          "Captain Price ended a global war",
    franchiseId:   "cod",
    franchiseName: "Call of Duty"
  },


  {
    name:          "Call of Duty: Black Ops Cold War",
    image:         "images/GamePics/cod-bocw.jpg",
    month:         "January",
    year:          2024,
    rating:        7,
    note:          "Memory rewritten, truth constantly shifting",
    franchiseId:   "cod",
    franchiseName: "Call of Duty"
  },

  {
    name:          "Call of Duty: World War II",
    image:         "images/GamePics/cod-ww2.jpg",
    month:         "November",
    year:          2023,
    rating:        6,
    note:          "War forged loyalty under fire",
    franchiseId:   "cod",
    franchiseName: "Call of Duty"
  },

  {
    name:          "Call of Duty: Advanced Warfare",
    image:         "images/GamePics/cod-aw.jpg",
    month:         "November",
    year:          2023,
    rating:        7,
    note:          "Mitchell rebuilt as a super soldier",
    franchiseId:   "cod",
    franchiseName: "Call of Duty"
  },

  {
    name:          "Call of Duty: Black Ops",
    image:         "images/GamePics/cod7.png",
    month:         "July",
    year:          2023,
    rating:        6,
    note:          "Truth buried inside shattered memories",
    franchiseId:   "cod",
    franchiseName: "Call of Duty"
  },

  {
    name:          "Ghost of Tsushima",
    image:         "images/GamePics/ghostoftsusima.jpg",
    month:         "June",
    year:          2023,
    rating:        9,
    note:          "Honor broken, legacy reborn in shadow",
    franchiseId:   "Ghost of Tsushima",
    franchiseName: "Ghost of Tsushima"
  },

  {
    name:          "Call of Duty: Mordern Warfare 2",
    image:         "images/GamePics/cod6.jpg",
    month:         "May",
    year:          2023,
    rating:        6,
    note:          "Ghost’s legend died but echoed forever",
    franchiseId:   "cod",
    franchiseName: "Call of Duty"
  },


  {
    name:          "Call of Duty: World at War",
    image:         "images/GamePics/cod5.jpg",
    month:         "May",
    year:          2023,
    rating:        6,
    note:          "Dimitri survived hell’s eastern front",
    franchiseId:   "cod",
    franchiseName: "Call of Duty"
  },

  {
    name:          "Call of Duty: Modern Warfare",
    image:         "images/GamePics/cod4.jpeg",
    month:         "April",
    year:          2023,
    rating:        6,
    note:          "Soap’s baptism into modern warfare",
    franchiseId:   "cod",
    franchiseName: "Call of Duty"
  },

  {
    name:          "Far Cry 3",
    image:         "images/GamePics/farcry3.jpg",
    month:         "April",
    year:          2023,
    rating:        6,
    note:          "From tourist to a ruthless survivor",
    franchiseId:   "farcry",
    franchiseName: "Far Cry"
  },

  {
    name:          "Read Dead Redemption 2",
    image:         "images/GamePics/rdr2.jpg",
    month:         "March",
    year:          2023,
    rating:        10,
    note:          "Arthur Morgan, a dying outlaw’s final honor",
    franchiseId:   "rdr",
    franchiseName: "Red Dead Redemption"
  },

  {
    name:          "GTA V",
    image:         "images/GamePics/gtav.png",
    month:         "March",
    year:          2023,
    rating:        6,
    note:          "Frankline-Micheal-Trevor, three men, one chaotic fate",
    franchiseId:   "gta",
    franchiseName: "Grand Theft Auto"
  },

  {
    name:          "Cyberpunk 2077",
    image:         "images/GamePics/cyberpunk.jpg",
    month:         "February",
    year:          2023,
    rating:        8.5,
    note:          "Carved my name into Night City",
    franchiseId:   "Cyberpunk",
    franchiseName: "Cyberpunk"
  },

  {
    name:          "Cricket 07",
    image:         "images/GamePics/Cricket07.png",
    month:         "January",
    year:          2018,
    rating:        7,
    note:          "Bond-level precision in every shot",
    franchiseId:   "EA Sports Cricket",
    franchiseName: "EA Sports Cricket"
  },

  {
    name:          "Project I.G.I: I'm Going In",
    image:         "images/GamePics/igi.jpg",
    month:         "March",
    year:          2018,
    rating:        7,
    note:          "Silent operative against impossible odds",
    franchiseId:   "igi",
    franchiseName: "Project I.G.I."
  },

  {
    name:          "The House of the Dead 2",
    image:         "images/GamePics/hod2.jpg",
    month:         "January",
    year:          2017,
    rating:        7,
    note:          "Undead outbreak, second wave survival",
    franchiseId:   "hod",
    franchiseName: "The House of the Dead"
  },

  {
    name:          "GTA: San Andreas",
    image:         "images/GamePics/sa.jpg",
    month:         "March",
    year:          2016,
    rating:        5,
    note:          "CJ rebuilt his broken legacy",
    franchiseId:   "gta",
    franchiseName: "Grand Theft Auto"
  },

  {
    name:          "GTA: Vice City",
    image:         "images/GamePics/vicecity.jpg",
    month:         "February",
    year:          2015,
    rating:        6,
    note:          "From ex-con to crime boss",
    franchiseId:   "gta",
    franchiseName: "Grand Theft Auto"
  },

  {
    name:          "Road Rash",
    image:         "images/GamePics/roadrash.jpg",
    month:         "January",
    year:          2015,
    rating:        5,
    note:          "Fought, crashed, still crossed finish",
    franchiseId:   "roadrash",
    franchiseName: "Road Rash"
  },

  

  {
    name:          "Virtua Cop 2",
    image:         "images/GamePics/vcop2.jpg",
    month:         "February",
    year:          2014,
    rating:        6,
    note:          "One shot, instant street justice",
    franchiseId:   "vcop",
    franchiseName: "Virtua Cop"
  },

  {
    name:          "The House of the Dead",
    image:         "images/GamePics/hod.jpg",
    month:         "January",
    year:          2014,
    rating:        6,
    note:          "Survived the undead arcade nightmare",
    franchiseId:   "hod",
    franchiseName: "The House of the Dead"
  }

  

];
