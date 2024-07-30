const GunLores = {
    "Beretta M9": {
        name: "Beretta M9",
        type: "pistol",
        lore: "The M9 is a lightweight, semi-automatic pistol manufactured by Beretta and designed to replace the M1911A1 .45 caliber pistol and .38 caliber revolvers. The Beretta M9 has redundant automatic safety features to help prevent unintentional discharges. The newer M9A1 features a Picatinny rail forward of the trigger guard to allow the attachment of lights and lasers.",
        history:
            "Adopted by the United States Armed Forces in 1985, the M9 won a competition against other contenders to become the standard sidearm. Its adoption marked a departure from the traditional .45 ACP round to the NATO-standard 9mm Parabellum.",
        notableUsers: [
            "United States Armed Forces",
            "Various law enforcement agencies",
        ],
        variations: [
            {
                model: "M9A1",
                description:
                    "Features a Picatinny rail for attachments and improved ergonomics.",
            },
            {
                model: "M9A3",
                description:
                    "Introduced in 2015, the M9A3 includes a thinner grip, removable front sight, and a universal slide design capable of mounting a red dot optic.",
            },
        ],
        caliber: "9mm",
        action: "Single/Double",
        magazine: "15",
        barrelLength: "4.9 inches",
        weight: "33.3 oz",
        effectiveRange: "50m",
        maxRange: "1800m",
    },
    "Beretta M9A1": {
        name: "Beretta M9A1",
        type: "pistol",
        lore: "The Beretta M9A1 tactical pistol evolved from the base design of the battle-tested and proven M9, with input from military and law enforcement agencies around the world. Developed to meet the demanding requirements of the US Marine Corps, the M9A1 incorporates the established reliability and performance of the M9, with added features needed for the ever-changing missions of peacekeeping forces.",
        caliber: "9mm",
        action: "Single/Double",
        magazine: "10",
    },
    "Glock 17": {
        name: "Glock 17",
        type: "pistol",
        lore: "The Glock 17, often referred to as the original Glock pistol, was designed for military use and has been adopted by numerous law enforcement agencies around the world. It is known for its reliability, simplicity, and ease of maintenance.",
        history:
            "Introduced in 1982, the Glock 17 revolutionized the firearm industry with its innovative design featuring a polymer frame and a unique Safe Action trigger system. It quickly gained popularity among both military and law enforcement units worldwide.",
        notableUsers: [
            "Austrian Armed Forces",
            "Various police forces globally",
        ],
        variations: [
            {
                model: "Glock 17 Gen5",
                description:
                    "Features an improved grip texture, ambidextrous slide stop levers, and a flared magazine well for faster reloads.",
            },
        ],
        caliber: "9mm",
        action: "Safe Action",
        magazine: "17",
        barrelLength: "4.49 inches",
        weight: "25 oz",
        effectiveRange: "50m",
        maxRange: "1500m",
    },
    "SIG Sauer P226": {
        name: "SIG Sauer P226",
        type: "pistol",
        lore: "The SIG Sauer P226 is a full-sized service-type pistol made by SIG Sauer. It is widely used by police and military organizations worldwide. The P226 is available in several variants including the P226R which features a Picatinny rail.",
        history:
            "First produced in 1983, the P226 was developed for the U.S. Army's XM9 Service Pistol Trials. Although it did not win the competition, it gained significant popularity among law enforcement and military units for its accuracy and reliability.",
        notableUsers: ["U.S. Navy SEALs", "Federal Bureau of Investigation"],
        variations: [
            {
                model: "P226 MK25",
                description:
                    "Adopted by the U.S. Navy SEALs, featuring a corrosion-resistant coating and engraved anchor.",
            },
        ],
        caliber: "9mm",
        action: "Double Action / Single Action",
        magazine: "15",
        barrelLength: "4.4 inches",
        weight: "34 oz",
        effectiveRange: "50m",
        maxRange: "1800m",
    },
    "Heckler & Koch USP": {
        name: "Heckler & Koch USP",
        type: "pistol",
        lore: 'The Heckler & Koch USP (Universale Selbstladepistole, or "universal self-loading pistol") is a semi-automatic pistol developed in Germany by Heckler & Koch GmbH (H&K) of Oberndorf am Neckar as a replacement for the P7 series of handguns.',
        history:
            "Introduced in 1993, the USP was designed with the goal of combining the advantages of targeted modifications in form and function to meet various user requirements. Its modular design allows for customization according to user preference.",
        notableUsers: [
            "German Armed Forces",
            "Various law enforcement agencies",
        ],
        variations: [
            {
                model: "USP Compact",
                description:
                    "A smaller version of the USP, designed for concealed carry and featuring a shorter barrel and grip.",
            },
        ],
        caliber: ".40 S&W",
        action: "Double Action / Single Action",
        magazine: "13",
        barrelLength: "4.41 inches",
        weight: "27.2 oz",
        effectiveRange: "50m",
        maxRange: "1650m",
    },
    "Colt M1911": {
        name: "Colt M1911",
        type: "pistol",
        lore: "Designed by John Browning, the M1911 is a single-action, semi-automatic, magazine-fed, recoil-operated pistol chambered for the .45 ACP cartridge. It served as the standard-issue sidearm for the United States Armed Forces from 1911 to 1986.",
        history:
            "Adopted by the U.S. Army in 1911, the M1911 saw service in numerous conflicts including World Wars I and II, the Korean War, and the Vietnam War. Its longevity and reliability have made it a favorite among civilians and military personnel alike.",
        notableUsers: [
            "United States Armed Forces",
            "Various law enforcement agencies",
        ],
        variations: [
            {
                model: "M1911A1",
                description:
                    "Introduced in 1924, the M1911A1 featured minor modifications to improve ergonomics and safety.",
            },
        ],
        caliber: ".45 ACP",
        action: "Single Action",
        magazine: "7+1",
        barrelLength: "5 inches",
        weight: "39 oz",
        effectiveRange: "50m",
        maxRange: "1640m",
    },
    "Smith & Wesson M&P": {
        name: "Smith & Wesson M&P",
        type: "pistol",
        lore: "The Smith & Wesson M&P (Military and Police) is a polymer-framed, short recoil operated, semi-automatic pistol introduced in the summer of 2005. It uses a Browning-type locking system.",
        history:
            "Developed as a modern successor to the Sigma series of pistols, the M&P was designed to be adaptable to various shooting styles and environments, catering to both civilian and professional markets.",
        notableUsers: ["Various law enforcement agencies", "Civilian shooters"],
        variations: [
            {
                model: "M&P Shield",
                description:
                    "A compact version of the M&P, designed for concealed carry with a slimmer profile and reduced dimensions.",
            },
        ],
        caliber: "9mm",
        action: "Striker-Fired",
        magazine: "17",
        barrelLength: "4.25 inches",
        weight: "24 oz",
        effectiveRange: "50m",
        maxRange: "1500m",
    },
    "Walther P99": {
        name: "Walther P99",
        type: "pistol",
        lore: "The Walther P99 is a semi-automatic pistol developed by the German company Carl Walther GmbH Sportwaffen. It features a glassfiber-reinforced polymer frame and steel slide.",
        history:
            "Introduced in 1996 for law enforcement and military use, the P99 was innovative for its time with features like interchangeable grip backstraps and a decocking button. It gained popularity after being featured in James Bond films.",
        notableUsers: ["German Police", "Finnish Police", "James Bond films"],
        variations: [
            {
                model: "P99 AS",
                description:
                    "Anti-Stress mode allows for a consistent trigger pull on every shot.",
            },
        ],
        caliber: "9mm",
        action: "Double Action / Single Action",
        magazine: "15",
        barrelLength: "4 inches",
        weight: "23 oz",
        effectiveRange: "50m",
        maxRange: "1500m",
    },
    "CZ 75": {
        name: "CZ 75",
        type: "pistol",
        lore: "The CZ 75 is a semi-automatic pistol made by Česká zbrojovka Uherský Brod (CZUB) in the Czech Republic. Known for its reliability and accuracy, it has been widely adopted by police and military organizations worldwide.",
        history:
            "Introduced in 1975, the CZ 75 was designed by Josef Koucký. Its distinctive features include a double-action/single-action trigger mechanism and a slide that rides inside the frame rails, enhancing accuracy and reducing recoil.",
        notableUsers: ["Various law enforcement agencies", "Military units"],
        variations: [
            {
                model: "CZ 75 SP-01 Shadow",
                description:
                    "Designed for competition shooting, featuring an extended beavertail, undercut trigger guard, and improved ergonomics.",
            },
        ],
        caliber: "9mm",
        action: "Double Action / Single Action",
        magazine: "15",
        barrelLength: "4.7 inches",
        weight: "32 oz",
        effectiveRange: "50m",
        maxRange: "1500m",
    },
    "FN Five-seveN": {
        name: "FN Five-seveN",
        type: "pistol",
        lore: "The FN Five-seveN is a semi-automatic pistol developed by Fabrique Nationale d'Armes de Guerre-Herstal (FN Herstal) in Belgium. It is chambered for the 5.7x28mm cartridge.",
        history:
            "Introduced in 1998 alongside the FN P90 personal defense weapon, the Five-seveN was designed to complement the 5.7x28mm cartridge, offering high velocity and flat trajectory.",
        notableUsers: [
            "United States Secret Service",
            "Various law enforcement agencies",
        ],
        variations: [
            {
                model: "Five-seveN MK2",
                description:
                    "Features updated ergonomics, including a redesigned slide catch lever and improved grip texture.",
            },
        ],
        caliber: "5.7x28mm",
        action: "Single Action Only",
        magazine: "20",
        barrelLength: "4.8 inches",
        weight: "21 oz",
        effectiveRange: "50m",
        maxRange: "1500m",
    },
    "Glock 19": {
        name: "Glock 19",
        type: "pistol",
        lore: "The Glock 19 is a compact semi-automatic pistol developed by Glock Ges.m.b.H. in Austria. It combines the balance of a full-size firearm with the compactness of a smaller model.",
        history:
            "Introduced in 1988, the Glock 19 was designed for military and police use, offering a reduced size suitable for concealed carry while maintaining the reliability of the Glock series.",
        notableUsers: ["Various law enforcement agencies", "Civilian shooters"],
        variations: [
            {
                model: "Glock 19 Gen5",
                description:
                    "Features an ambidextrous slide stop lever, nDLC finish for increased durability, and no finger grooves for better grip adaptability.",
            },
        ],
        caliber: "9mm",
        action: "Safe Action",
        magazine: "15",
        barrelLength: "4 inches",
        weight: "23.65 oz",
        effectiveRange: "50m",
        maxRange: "1500m",
    },
    "AK-47": {
        name: "AK-47",
        type: "assault rifle",
        lore: "The AK-47, officially known as Avtomat Kalashnikova, is a gas-operated, 7.62x39mm assault rifle developed in the Soviet Union by Mikhail Kalashnikov in the aftermath of World War II.",
        history:
            "Introduced into service with the Soviet Army in 1949, it is the originating firearm of the Kalashnikov rifle family. Over 100 million AK-47 type rifles have been produced worldwide.",
        notableUsers: [
            "Soviet Armed Forces",
            "Numerous military and militant groups globally",
        ],
        variations: [
            {
                model: "AKM",
                description:
                    "Improved version with a stamped receiver, reducing production costs.",
            },
            {
                model: "AK-74",
                description:
                    "Chambered in 5.45x39mm, featuring a smaller caliber and lighter bullet.",
            },
        ],
        caliber: "7.62x39mm",
        action: "Gas-operated, rotating bolt",
        magazine: "30 rounds",
        barrelLength: "16.34 inches",
        weight: "10.58 lb",
        effectiveRange: "400m",
        maxRange: "800m",
    },
    M16: {
        name: "M16",
        type: "assault rifle",
        lore: "The M16 rifle series is the United States military designation of rifle variants within the ArmaLite AR-15 family of firearms.",
        history:
            "Adopted by the U.S. military in the 1960s, it became the standard service rifle.",
        notableUsers: ["United States Armed Forces", "Various NATO countries"],
        variations: [
            {
                model: "M16A2",
                description:
                    "Improved version with three-round burst capability.",
            },
        ],
        caliber: "5.56x45mm NATO",
        action: "Gas-operated, rotating bolt",
        magazine: "30 rounds",
        barrelLength: "20 inches",
        weight: "8.79 lb",
        effectiveRange: "550m",
    },
    "AR-15": {
        name: "AR-15",
        type: "semi-automatic rifle",
        lore: "Civilian semi-automatic version of the M16.",
        history: "Popular among civilians for sport shooting and home defense.",
        notableUsers: ["Civilian market"],
        variations: [
            {
                model: "AR-15",
                description: "Semi-automatic civilian variant.",
            },
        ],
        caliber: "5.56x45mm NATO",
        action: "Direct impingement",
        magazine: "30 rounds",
        barrelLength: "20 inches",
        weight: "7.18 lb",
        effectiveRange: "550m",
    },
    "AK-101": {
        name: "AK-101",
        type: "assault rifle",
        lore: "The AK-101 is a modernized version of the AK-47 assault rifle designed for export markets. It is chambered in NATO-standard 5.56x45mm ammunition.",
        history:
            "Introduced in the mid-1990s, the AK-101 was developed alongside other Kalashnikov variants like the AK-102, AK-103, and AK-104 to meet the demands of foreign militaries seeking weapons compatible with NATO ammunition standards.",
        notableUsers: [
            "Various military and law enforcement agencies worldwide",
        ],
        variations: [
            {
                model: "AK-102",
                description: "Short-barreled carbine variant of the AK-101.",
            },
        ],
        caliber: "5.56x45mm NATO",
        action: "Gas-operated, rotating bolt",
        magazine: "30 rounds",
        barrelLength: "16.33 inches",
        weight: "7.62 lb",
        effectiveRange: "500m",
        maxRange: "1100m",
    },
};
