/* str.js
  Provides a function to get a localized version of a specific String, and all hardcoded information.
    -str.get(type,id) - get a String from the [type] property, at index [id]. Uses the user's language setting by default. Example:
      str.get("label",1) will return "Body" if the user's language is English, or "Châssis" if the user's language is French
  */

var str = {
  get:function(type,id){
    return str[type][id][settings.locale];
  },

  buildHeader: [["Build #1","Build #1","Ensemble #1","Ensemble #1"],
          ["Build #2","Build #2","Ensemble #2","Ensemble #2"]],

  partSelectHeader: [["Build #1 Part Select","Build #1 Part Select","Pièces d'ensemble #1","Pièces d'ensemble #1"],
                     ["Build #2 Part Select","Build #2 Part Select","Pièces d'ensemble #2","Pièces d'ensemble #2"]],

  label: [["Character","Character","Personnage","Personnage"],
          ["Body","Body","Châssis","Châssis"],
          ["Tires","Tyres","Roues","Roues"],
          ["Glider","Glider","Parachute","Parachute"]],

  stat: [["Speed","Speed","Vitesse","Vitesse"],
         ["Speed (Air)","Speed (Air)","Vitesse (Air)","Vitesse (Air)"],
         ["Acceleration","Acceleration","Accélération","Accélération"],
         ["Speed (Water)","Speed (Water)","Vitesse (Eau)","Vitesse (Eau)"],
         ["Weight","Weight","Poids","Poids"],
         ["Speed (Grav)","Speed (Grav)","Vitesse (AG)","Vitesse (AG)"],
         ["Handling","Handling","Maniabilité","Maniabilité"],
         ["Handling (Air)","Handling (Air)","Maniabilité (Air)","Maniabilité (Air)"],
         ["Traction","Grip","Adhérence","Adhérence"],
         ["Handling (Water)","Handling (Water)","Maniabilité (Eau)","Maniabilité (Eau)"],
         ["Miniturbo","Miniturbo","Miniturbo","Miniturbo"],
         ["Handling (Grav)","Handling (Grav)","Maniabilité (AG)","Maniabilité (AG)"]],

  optionsHeaders: [["Part Selection","Part Selection","Sélection de pièces","Sélection de pièces"],
                   ["Sort By","Sort By","Trier par","Trier par"],
                   ["Display Mode","Display Mode","Mode d'affichage","Mode d'affichage"]],
  partOptions: [["All Parts","All Parts","Toutes les pièces","Toutes les pièces"],
                ["Unique Groups","Unique Groups","Groupes uniques","Groupes uniques"]],
  sortOptions: [["Default","Default","Défaut","Défaut"],
                ["Name","Name","Prénom","Prénom"]],
  sortOrder: [["Ascending Order","Ascending Order","Ordre croissant","Ordre croissant"],
              ["Descending Order","Descending Order","Ordre décroissant","Ordre décroissant"]],
  displayMode: [["Individual Stats","Individual Stats","Individuellement","Individuellement"],
                ["Search (Simple)","Search (Simple)","Rechercher (simple)","Rechercher (simple)"],
                ["Search (Custom)","Search (Custom)","Rechercher (personnalisée)","Rechercher (personnalisée)"]],

  chara: [["Mario","Mario","Mario","Mario"],
          ["Luigi","Luigi","Luigi","Luigi"],
          ["Peach","Peach","Peach","Peach"],
          ["Daisy","Daisy","Daisy","Daisy"],
          ["Rosalina","Rosalina","Rosalina","Rosalina"],
          ["Tanooki Mario","Tanooki Mario","Mario tanooki","Mario tanooki"],
          ["Cat Peach","Cat Peach","Peach chat","Peach chat"],
          ["Yoshi","Yoshi","Yoshi","Yoshi"],
          ["Toad","Toad","Toad","Toad","Toad"],
          ["Koopa","Koopa","Koopa","Koopa"],
          ["Shy Guy","Shy Guy","Maskache","Maskass"],
          ["Lakitu","Lakitu","Lakitou","Lakitu"],
          ["Toadette","Toadette","Toadette","Toadette"],
          ["King Boo","King Boo","Roi Boo","Roi Boo"],
          ["Baby Mario","Baby Mario","Bébé Mario","Bébé Mario"],
          ["Baby Luigi","Baby Luigi","Bébé Luigi","Bébé Luigi"],
          ["Baby Peach","Baby Peach","Bébé Peach","Bébé Peach"],
          ["Baby Daisy","Baby Daisy","Bébé Daisy","Bébé Daisy"],
          ["Baby Rosalina","Baby Rosalina","Bébé Rosalina","Bébé Rosalina"],
          ["Metal Mario","Metal Mario","Mario de métal","Mario de métal"],
          ["Pink Gold Peach","Pink Gold Peach","Peach d'or rose","Peach d'or rose"],
          ["Wario","Wario","Wario","Wario"],
          ["Waluigi","Waluigi","Waluigi","Waluigi"],
          ["Donkey Kong","Donkey Kong","Donkey Kong","Donkey Kong"],
          ["Bowser","Bowser","Bowser","Bowser"],
          ["Dry Bones","Dry Bones","Skelex","Skelerex"],
          ["Bowser Jr.","Bowser Jr.","Bowser Jr.","Bowser Jr."],
          ["Dry Bowser","Dry Bowser","Bowser Skelet","Bowser Skelet"],
          ["Lemmy","Lemmy","Lemmy","Lemmy"],
          ["Larry","Larry","Larry","Larry"],
          ["Wendy","Wendy","Wendy","Wendy"],
          ["Ludwig","Ludwig","Ludwig","Ludwig"],
          ["Iggy","Iggy","Iggy","Iggy"],
          ["Roy","Roy","Roy","Roy"],
          ["Morton","Morton","Morton","Morton"],
          ["Inkling Girl","Inkling Girl","Fille inkling","Fille inkling"],
          ["Inkling Boy","Inkling Boy","Garçon inkling","Garçon inkling"],
          ["Link","Link","Link","Link"],
          ["Villager (M)","Villager (M)","Habitant","Villageois"],
          ["Villager (F)","Villager (F)","Habitante","Villageoise"],
          ["Isabelle","Isabelle","Marie","Marie"],
          ["Mii (Light)","Mii (Light)","Mii (léger)","Mii (léger)"],
          ["Mii (Medium)","Mii (Medium)","Mii (moyen)","Mii (moyen)"],
          ["Mii (Heavy)","Mii (Heavy)","Mii (lourd)","Mii (lourd)"]],

  kart: [["Standard Kart","Standard Kart","Kart standard","Kart standard"],
         ["Pipe Frame","Pipe Frame","Rétro","Rétro"],
         ["Mach 8","Mach 8","Mach 8","Proto 8"],
         ["Steel Driver","Steel Driver","Nauticomobile","Nautomobile"],
         ["Cat Cruiser","Cat Cruiser","Chabriolet","Chabriolet"],
         ["Circuit Special","Circuit Special","Rapido","Mach-célère"],
         ["Tri-Speeder","Tri-Speeder","Tubul R3","Tubul R3"],
         ["Badwagon","Badwagon","Stéréo-bolide","Beat-bolide"],
         ["Prancer","Prancer","Deux-chevaux","Cavalkart"],
         ["Biddybuggy","Buggybud","Paracoccinelly(?)","Paracoccinelly"], //Check: [2]
         ["Landship","Landship","Batea roulant","Caravéloce"],
         ["Sneeker","Bounder","Espakart","Sneakart"],
         ["Sports Coupe","Sports Coupé","Coupé sport","Propulsar"],
         ["Gold Standard","Gold Kart","Or","Or"],
         ["GLA","GLA","GLA","GLA"],
         ["W 25 Silver Arrow","W 25 Silver Arrow","W25 Flèche d'argent","W25 Flèche d'argent"],
         ["300 SL Roadster","300 SL Roadster","300 SL Roadster","300 SL Roadster"],
         ["Blue Falcon","Blue Falcon","Blue Falcon","Blue Falcon"],
         ["Tanooki Kart","Tanooki Kart","Buggy tanuki","Buggy tanuki"], //Check: [2]
         ["B Dasher","B Dasher","Intrépide","Intrépide"],
         ["Streetle","Streetle","Autorhino","Autorhino"],
         ["P-Wing","P-Wing","Magikart","Magikart"],
         ["Koopa Clown","Koopa Clown","Clown Koopa","Clown Koopa"], //Check: [3]
         ["Standard Bike","Standard Bike","Moto standard","Moto standard"], //Check: [3]
         ["Comet","Comet","Turboto","Météore"],
         ["Sport Bike","Sport Bike","Sport GP","Sport GP"], //Check: [2]
         ["The Duke","The Duke","Cybertrombe","Cybertrombe"], //Check: [2]
         ["Flame Rider","Flame Rider","Flamboyante","Flamboyante"],
         ["Varmint","Varmint","Mécabécane","Mécabécane"], //Check: [2]
         ["Mr. Scooty","Mr Scooty","Scootinette","Scootinette"],
         ["Jet Bike","Jet Bike","Épervier","Épervier"], //Check: [2]
         ["Yoshi Bike","Yoshi Bike","Yoshimoto","Yoshimoto"], //Check: [3]
         ["Master Cycle","Master Cycle","Destrier de légende","Destrier de légende"], //Check [3]
         ["City Tripper","City Tripper","Scooter AC","Scooter AC"],
         ["Standard ATV","Standard Quad","VTT standard","Quad standard"],
         ["Wild Wiggler","Wild Wiggler","VTT Wiggler","Quad Wiggler"],
         ["Teddy Buggy","Teddy Buggy","VTT nounourse","Quad nounours"],
         ["Bone Rattler","Bone Rattler","Malécycle","Malécycle"], //Check [2]
         ["Inkstriker","Inkstriker","Missile tornade","Missile tornade"], //Check [2]
         ["Splat Buggy","Splat Buggy","Kartoon"]], //Check [3]

  tire: [["Standard","Normal"],
         ["Monster","Monster"],
         ["Roller","Roller"],
         ["Slim","Slim"],
         ["Slick","Slick"],
         ["Metal","Metal"],
         ["Button","Button"],
         ["Off-Road","Off-Road"],
         ["Sponge","Sponge"],
         ["Wood","Wooden"],
         ["Cushion","Cushion"],
         ["Blue Standard","Normal Blue"],
         ["Hot Monster","Funky Monster"],
         ["Azure Roller","Azure Roller"],
         ["Crimson Slim","Crimson Slim"],
         ["Cyber Slick","Cyber Slick"],
         ["Retro Off-Road","Retro Off-Road"],
         ["Gold Tires","Gold Wheels"],
         ["GLA Tires","GLA Wheels"],
         ["Triforce Tires","Triforce Tyres"],
         ["Leaf Tires","Leaf Tyres"]],

  glider: [["Super Glider","Super Glider"],
           ["Cloud Glider","Cloud Glider"],
           ["Wario Wing","Wario Wing"],
           ["Waddle Wing","Waddle Wing"],
           ["Peach Parasol","Peach Parasol"],
           ["Parachute","Parachute"],
           ["Parafoil","Parafoil"],
           ["Flower Glider","Flower Glider"],
           ["Bowser Kite","Bowser Kite"],
           ["Plane Glider","Plane Glider"],
           ["MKTV Parafoil","MKTV Parafoil"],
           ["Gold Glider","Gold Glider"],
           ["Hylian Kite","Hylian Kite"],
           ["Paper Glider","Paper Glider"]],

  group: [["Light","Light","Léger","Léger"],
          ["Medium","Medium","Moyen","Moyen"],
          ["Heavy","Heavy","Lourd","Lourd"],
          ["Body Group","Body Group","Châssis"],
          ["Tire Group","Tyre Group"],
          ["Glider Group","Glider Group"]],

  init: function(){
    //Copy repeat strings to new arrays
    var statOrder = [0,2,4,6,8,10,1,3,5,7,9,11];
    for(var i=0;i<statOrder.length;i++)
      str.sortOptions[i+2] = str.stat[statOrder[i]];
  }
};
