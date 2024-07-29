# PPERMS

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

## ❌ TODO ✔️
- ✔️ Made Player class and implemented movement
- ✔️ Added Camera class and it follows the player
- ✔️ Added HoverHint class
    - ✔️ Multi-line support
- ✔️ Create an item class
- ✔️ Create an entity class (for all entities)
    - ✔️ Entity options added
    - ✔️ Entity health added
    - ✔️ Entity damage added  
    - ✔️ Create a monster class
    - ✔️ Create an animal class
    - ✔️ Create an NPC class
- ✔️ Add array for all entities and render them
- ✔️ No more level editor, now using Tiled
    - ✔️ Made Zones for main grass and water
    
- ✔️ Added a weapon class   
    - ✔️ Added a Gun class
        - ✔️ Gun Shoots with GunOptions as options
        - ✔️ GunOptions have a firerate, velocity, range, accuracy, etc.
        - ✔️ Added Gun Recoil   
        - ✔️ Added Gun Reload
        - ✔️ Added Gun Ammo
        - ✔️ Added Gun Ammo UI
        - ❌ Added Gun Ammo Pickup

- ❌ Add a map
- ❌ Add a player inventory
- ❌ Add a player health bar



## What Is PPERMS?

PPERMS is a 2d, top-down, shooter where the player's main goal is to become rich and powerful. The game is set in a present day fictional world where the player is weak and poor. The player must scavenge, harvest, and fight to move up in the ecosystem. In this game, there will always be a tougher boss.

## How To Play

The player will use WASD to move around, use the cursor to make actions such as clicking on a promt or aiming a weapon.



# IDEAS:

### Player Vs Player
- If the player comes across another player, they can choose to fight or team up but there will be no prompts. (Either the meetup becomes a shootout or the players can communicate and team up.)
    - If a player is killed by another, the killer will be given a partial amount of the victim's money (~10%).

- Kill/Death ratio ?

- Alliances can be made within players but it can only happen when they are close to each other. (A prompt will appear for both players to create an alliance. Each player clicks "Create Alliance/Team with {other player's name}" and after a countdown, the alliance is created.)
    - The alliance will be displayed on the screen and the players will be able to see each other's health, location(Point of Interest, not xyz), etc.
    - The alliance can be broken by either player at any time and it will not alert the other members of the party.
    - Even if a player is in an alliance, they can still kill each other

- Players may trade with eachother for items, money, etc.
    - Players walk up to each other
        - If both players are in an alliance, they can trade faster (lower cooldown, observe each other's inventory, etc.)
        - If one player is in an alliance and the other is not, each player is treated as a random player (default cooldown, no inventory observation, etc.)

### Player Vs Environment / Gameplay
- The player must scavenge, harvest, and fight to move up in the ecosystem.
    - The player can harvest resources from the environment
        - Trees (Oak, Birch, etc.)
        - Bushes (berry bushes, etc.)
        - Rocks (Iron, Stone, etc.)
        - Animals (Cow, Pig, etc.)
        - Monsters (Wolves, Bears, etc.)
    - The player will use these items to craft weapons, armor, meals (health, stamina, etc.), and other items.


- While the player roams the world, they will inevitably come across monsters. The player can choose to fight or flee.
    - If the player chooses to fight, they will be rewarded with money, experience, and items based on chance.
    - If the player chooses to flee, the monster may follow the player until a certain point (far away from territory, etc.)

### Sandbox

- The player can build using resources gathered and crafted
    - House foundation, walls, roofing, etc.
    - Fences and gates
    - Furniture (tables, chairs, etc.)
    - Chests, barrels, etc.

    - If the player built any structres nearby a monster's location (or a monster spawned nearby), the monster may attack/break the player-built structure. (If the player claimed land, the player will be notified of the attack)
    - If a enemy were to enter claimed territory, the player will only be notified if the enemy destroys a structure or kills a resident

### Other Ideas

Monster Catalogue
- A list of all the monsters the player has encountered/defeated (not killed. The playern has to be able to observe the enemy in order to figure out its structure, weaknesses, etc.)
- This catalogue will display information
    - Name
    - Description
    - Weaknesses
    - Strengths
    - Drops
    - Location
    - Level
    - Health
    - Attack
    - Defense
    - Speed
    - Special Abilities
    - Etc.
- The player will always have access to this catalogue and can use it during battles for an advantage
- The player can use the catalogue in order to make a pathway to the monster's location. (Arrow trail, particle trail, etc.)

Weapons
- The player can craft weapons using resources harvested from the environment
- Melee
    - Swords: Short Sword, Sword, Dagger, Katana, Rapier, Schimitar, Claymore
    - Axes: Hatchet, Tomahawk, Throwing Axe, Pickaxe, Battle Axe, Viking Axe
    - Maces: Skull Mace, Baton, Morning Star, Spiked Mace
    - Spears: Spear, Javelin, Harpoon, Trident
- Ranged
    - Flamethrower
    - Grenade Launcher
    - Molotov Cocktail
    - Throwing Knives
    - Bows: Box, Crossbow, Compound Bow, Longbow
    - Guns
        - Short Range Weapons: Handguns (Semi-automatic pistols, Break-action pistols, Bolt-action pistols, Lever-action pistols, Braced pistols), Revolvers (.357 Magnum, .44 Magnum), Shotguns (Pump-action shotgun, Semi-automatic shotgun, Sawed-off shotgun)
        - Medium Range Weapons: Submachine Guns (Uzi, MP5, MAC-10, AK-47 variants), Assault Rifles (Standard Assault Rifles, AK-47, M4/M16, AR-15), Designated Marksman Rifles (FAL, FAMAS, G3), Carbines (AK-74, Colt Commando, Steyr AUG)
        - Long Range Weapons: Missile Launchers, Stinger, FIM-92 Stinger, Javelin, Anti-Tank Missiles (AT-4 Spigot, Javelin, TOW)
        - Tactical Missiles: Hellfire, Stinger, Maverick
- Magic
    - Wand
    - Staff
    - Book
    - Charm
    - Casting
    

### Lore

Long ago, there once once a prosperous, futuristic civilization known as (something). This civilization was kitted with high technological weapons, devices, armor, and magic.

One night on a peaceful saturday afternoon, there was an earthquake that rattled everyone. This warthquake so so violent it caused mass destruction in the most advanced city on Earth. Skycrapers crumbled to the ground. Building were reduced to rubble. And only a lucky percent of those in (city name) werent killed. These people all has one thing in common. The civilans had a genetic mutation which allowed for an increased natural strength and healing ability.