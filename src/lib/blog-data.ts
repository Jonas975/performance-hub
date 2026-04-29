/* ── Multi-Language Blog Data ── */

export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  content: string;
  readTime: string; // e.g., "6 min read"
}

export interface BlogPost {
  slug: string;
  image: string;
  date: string; // ISO format
  translations: Record<'en' | 'de' | 'fr' | 'es', BlogPostTranslation>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "top-5-supplements-2026",
    image: "/blog/supplements.jpg",
    date: "2026-03-10",
    translations: {
      en: {
        title: "Top 5 Supplements You Actually Need in 2026",
        excerpt: "Cut through the noise — these are the only supplements backed by real science and worth your money.",
        readTime: "6 min read",
        content: `The supplement industry is worth billions, but most products are underdosed or unnecessary. After reviewing hundreds of studies and testing dozens of products, here are the five supplements that actually deliver results.

1. Creatine Monohydrate — The single most researched and proven supplement for strength and muscle gain. 5g daily is all you need.

2. Whey Protein Isolate — Convenient, fast-absorbing, and effective for hitting your daily protein target. Look for brands with third-party testing.

3. Vitamin D3 — Most people are deficient, especially in northern climates. 2000-5000 IU daily supports bone health, immune function, and mood.

4. Omega-3 Fish Oil — EPA and DHA support heart health, reduce inflammation, and may improve recovery. Aim for 1-2g combined EPA/DHA daily.

5. Magnesium Glycinate — Supports sleep quality, muscle relaxation, and over 300 enzymatic reactions. Most diets fall short of the RDA.

Skip the fat burners, BCAAs, and testosterone boosters. Put your money into these five and a solid training program.`,
      },
      de: {
        title: "Top 5 Supplements, die du 2026 wirklich brauchst",
        excerpt: "Durchschaue den Hype — das sind die einzigen Ergänzungsmittel, die wissenschaftlich belegt und dein Geld wert sind.",
        readTime: "6 Min Lesezeit",
        content: `Die Supplement-Industrie ist Milliarden wert, aber die meisten Produkte sind unterdosiert oder überflüssig. Nach der Überprüfung von Hunderten von Studien und dem Testen von Dutzenden von Produkten sind hier die fünf Ergänzungsmittel, die wirklich Ergebnisse liefern.

1. Kreatinmonohydrat — Das am meisten erforschte und bewährte Ergänzungsmittel für Kraft und Muskelaufbau. 5g täglich reicht aus.

2. Whey Protein Isolat — Praktisch, schnell resorbierbar und effektiv für dein tägliches Proteinziel. Achte auf Marken mit Dritttestung.

3. Vitamin D3 — Die meisten Menschen haben einen Mangel, besonders in nördlichen Klimazonen. 2000-5000 IE täglich unterstützen Knochengesundheit, Immunfunktion und Stimmung.

4. Omega-3 Fischöl — EPA und DHA unterstützen die Herzgesundheit, reduzieren Entzündungen und können die Regeneration verbessern. Ziel: 1-2g kombiniert EPA/DHA täglich.

5. Magnesium Glycinat — Unterstützt Schlafqualität, Muskelentspannung und über 300 enzymatische Reaktionen. Die meisten Diäten liegen unter der RDA.

Überspringe Fat Burner, BCAAs und Testosterone Booster. Investiere dein Geld in diese fünf und ein solides Trainingsprogramm.`,
      },
      fr: {
        title: "Top 5 Suppléments dont vous avez réellement besoin en 2026",
        excerpt: "Coupez à travers le bruit — ce sont les seuls suppléments soutenus par la vraie science et qui valent votre argent.",
        readTime: "6 min de lecture",
        content: `L'industrie des suppléments vaut des milliards, mais la plupart des produits sont sous-dosés ou inutiles. Après avoir examiné des centaines d'études et testé des dizaines de produits, voici les cinq suppléments qui livrent vraiment des résultats.

1. Créatine Monohydrate — Le supplément le plus étudié et le plus éprouvé pour la force et la prise de muscle. 5g par jour, c'est tout ce dont vous avez besoin.

2. Isolat de Whey Protéine — Pratique, à absorption rapide et efficace pour atteindre votre objectif de protéines quotidien. Recherchez les marques avec tests tiers.

3. Vitamine D3 — La plupart des gens sont déficients, en particulier dans les climats du nord. 2000-5000 UI par jour soutient la santé osseuse, la fonction immunitaire et l'humeur.

4. Huile de Poisson Omega-3 — L'EPA et le DHA soutiennent la santé cardiaque, réduisent l'inflammation et peuvent améliorer la récupération. Visez 1-2g combiné EPA/DHA par jour.

5. Magnésium Glycinaté — Soutient la qualité du sommeil, la relaxation musculaire et plus de 300 réactions enzymatiques. La plupart des régimes alimentaires sont insuffisants par rapport à l'AJR.

Évitez les brûleurs de graisse, les BCAA et les stimulants de testostérone. Investissez votre argent dans ces cinq et un programme d'entraînement solide.`,
      },
      es: {
        title: "Top 5 Suplementos que Realmente Necesitas en 2026",
        excerpt: "Corta el ruido — estos son los únicos suplementos respaldados por ciencia real y que valen tu dinero.",
        readTime: "6 min de lectura",
        content: `La industria de suplementos vale miles de millones, pero la mayoría de los productos están subdosificados o innecesarios. Después de revisar cientos de estudios y probar docenas de productos, aquí hay cinco suplementos que realmente entregan resultados.

1. Monohidrato de Creatina — El suplemento más investigado y comprobado para la fuerza y ganancia muscular. 5g diarios es todo lo que necesitas.

2. Aislado de Whey Protein — Conveniente, de absorción rápida y efectivo para alcanzar tu objetivo diario de proteína. Busca marcas con pruebas de terceros.

3. Vitamina D3 — La mayoría de las personas tienen deficiencia, especialmente en climas del norte. 2000-5000 UI diarios apoyan la salud ósea, la función inmunológica y el estado de ánimo.

4. Aceite de Pescado Omega-3 — EPA y DHA apoyan la salud cardíaca, reducen la inflamación y pueden mejorar la recuperación. Apunta a 1-2g de EPA/DHA combinado diariamente.

5. Glicinato de Magnesio — Apoya la calidad del sueño, la relajación muscular y más de 300 reacciones enzimáticas. La mayoría de las dietas no alcanzan la IDR.

Salta los quemadores de grasa, BCAAs y potenciadores de testosterona. Invierte tu dinero en estos cinco y un programa de entrenamiento sólido.`,
      },
    },
  },
  {
    slug: "home-gym-setup-guide",
    image: "/blog/homegym.jpg",
    date: "2026-03-05",
    translations: {
      en: {
        title: "The Ultimate Home Gym Setup Under $1,000",
        excerpt: "Build a complete home gym without breaking the bank. Here's exactly what to buy and what to skip.",
        readTime: "8 min read",
        content: `You don't need a commercial gym to build serious strength. With smart purchases, you can outfit a home gym for under $1,000 that covers 90% of exercises.

The Essentials:
- Adjustable Dumbbells ($300-400) — Replace an entire rack. Look for sets that go up to at least 50 lbs per hand.
- Flat/Incline Bench ($150-200) — Adjustable is better than flat-only. Check the weight capacity.
- Pull-Up Bar ($30-50) — Doorframe-mounted or wall-mounted. Non-negotiable for back development.
- Resistance Bands ($30-40) — Fill gaps that dumbbells can't cover. Great for warm-ups and rehab.
- Flooring ($50-100) — Horse stall mats from a farm supply store are the best value.

Nice to Have (if budget allows):
- Kettlebell (35-50 lb) for swings and Turkish get-ups
- Ab wheel for core work
- Lever lifting belt for heavy compounds

What to Skip:
- All-in-one cable machines under $500 (poor build quality)
- Smith machines (limited range of motion)
- Anything "As Seen on TV"

Focus on compound movements: presses, rows, squats, deadlifts, and pull-ups. You'll be surprised how far dumbbells and bands can take you.`,
        readTime: "8 min read",
      },
      de: {
        title: "Das ultimative Home-Gym Setup unter €1.000",
        excerpt: "Baue ein komplettes Home-Gym, ohne dein Budget zu sprengen. Hier ist genau, was du kaufen solltest und was du überspringst.",
        readTime: "8 Min Lesezeit",
        content: `Du brauchst kein kommerzielles Fitnessstudio, um echte Kraft aufzubauen. Mit intelligenten Käufen kannst du ein Home-Gym für unter €1.000 ausstatten, das 90% der Übungen abdeckt.

Das Wesentliche:
- Verstellbare Hanteln (€300-400) — Ersetzen ein ganzes Regal. Achte auf Sets, die bis mindestens 23 kg pro Hand reichen.
- Flache/Neigungsbank (€150-200) — Verstellbar ist besser als nur flach. Überprüfe die Gewichtskapazität.
- Klimmzugstange (€30-50) — Türrahmen- oder wandmontiert. Unverzichtbar für Rückenentwicklung.
- Widerstandsbänder (€30-40) — Füllen Lücken, die Hanteln nicht abdecken können. Großartig für Aufwärmen und Rehabilitation.
- Bodenbelag (€50-100) — Pferdeboxmatten aus einem Agrargeschäft sind das beste Preis-Leistungs-Verhältnis.

Schön zu haben (wenn das Budget erlaubt):
- Kettlebell (16-23 kg) für Schwünge und Turkish Get-Ups
- Ab-Wheel für Kernarbeit
- Hebel-Gewichtsheber-Gürtel für schwere Verbindungen

Was du überspringst:
- All-in-One Kabelmaschinen unter €500 (schlechte Qualität)
- Smith-Maschinen (eingeschränkter Bewegungsumfang)
- Alles "wie im Fernsehen gesehen"

Konzentriere dich auf Verbindungsübungen: Pressen, Rudern, Kniebeugen, Deadlifts und Klimmzüge. Du wirst überrascht sein, wie weit Hanteln und Bänder dich bringen können.`,
      },
      fr: {
        title: "L'installation ultime de Home Gym pour moins de 1 000 €",
        excerpt: "Créez une salle de sport complète à domicile sans vous ruiner. Voici exactement quoi acheter et quoi sauter.",
        readTime: "8 min de lecture",
        content: `Vous n'avez pas besoin d'une salle de sport commerciale pour développer une force sérieuse. Avec des achats intelligents, vous pouvez équiper un home gym pour moins de 1 000 € qui couvre 90% des exercices.

Les essentiels :
- Haltères ajustables (300-400 €) — Remplacez un rack entier. Cherchez des ensembles qui vont jusqu'à au moins 23 kg par main.
- Banc plat/incliné (150-200 €) — Ajustable c'est mieux que plat uniquement. Vérifiez la capacité de poids.
- Barre de traction (30-50 €) — Montée sur cadre de porte ou murale. Indispensable pour le développement du dos.
- Bandes de résistance (30-40 €) — Remplissent les lacunes que les haltères ne peuvent pas couvrir. Parfait pour l'échauffement et la réhabilitation.
- Revêtement de sol (50-100 €) — Les nattes de stalles pour chevaux d'une quincaillerie agricole offrent le meilleur rapport qualité-prix.

Utile d'avoir (si le budget le permet) :
- Kettlebell (16-23 kg) pour les oscillations et les Turkish Get-Ups
- Roue abdominale pour le travail des abdominaux
- Ceinture de levage à levier pour les composés lourds

Quoi éviter :
- Machines à câble tout-en-un sous 500 € (mauvaise qualité)
- Machines Smith (amplitude de mouvement limitée)
- N'importe quoi "Comme vu à la télévision"

Concentrez-vous sur les mouvements composés : presses, rameurs, squats, deadlifts et tractions. Vous serez surpris de voir jusqu'où les haltères et les bandes peuvent vous mener.`,
      },
      es: {
        title: "La Configuración Definitiva del Gimnasio en Casa por Menos de $1,000",
        excerpt: "Construye un gimnasio en casa completo sin arruinarte. Aquí hay exactamente qué comprar y qué evitar.",
        readTime: "8 min de lectura",
        content: `No necesitas un gimnasio comercial para desarrollar una fuerza seria. Con compras inteligentes, puedes equipar un gimnasio en casa por menos de $1,000 que cubra el 90% de los ejercicios.

Lo esencial:
- Mancuernas ajustables ($300-400) — Reemplaza un rack completo. Busca sets que lleguen hasta al menos 23 kg por mano.
- Banco plano/inclinado ($150-200) — Ajustable es mejor que solo plano. Verifica la capacidad de peso.
- Barra de dominadas ($30-50) — Montada en marco de puerta o en pared. Indispensable para el desarrollo de la espalda.
- Bandas de resistencia ($30-40) — Llenan los vacíos que las mancuernas no pueden cubrir. Excelente para calentamiento y rehabilitación.
- Pisos ($50-100) — Las colchonetas de establo para caballos de una tienda agrícola ofrecen la mejor relación calidad-precio.

Bueno de tener (si el presupuesto lo permite):
- Pesa rusa (16-23 kg) para columpios y Turkish Get-Ups
- Rueda abdominal para trabajo abdominal
- Cinturón de levantamiento con palanca para compuestos pesados

Qué evitar:
- Máquinas de cable todo en uno menores de $500 (mala calidad)
- Máquinas Smith (rango de movimiento limitado)
- Cualquier cosa "Como se ve en la televisión"

Enfócate en movimientos compuestos: presses, filas, sentadillas, deadlifts y dominadas. Te sorprenderá lo lejos que pueden llevarte las mancuernas y las bandas.`,
      },
    },
  },
  // Add more blog posts in the same format...
  {
    slug: "science-of-recovery",
    image: "/blog/recovery.jpg",
    date: "2026-02-28",
    translations: {
      en: {
        title: "The Science of Recovery: What Actually Works",
        excerpt: "Ice baths, foam rolling, compression — we break down which recovery methods are backed by evidence.",
        readTime: "7 min read",
        content: `Recovery is where gains are made, but the recovery industry is full of expensive gimmicks. Here's what the research actually says.

Proven Methods:
- Sleep (7-9 hours) — The single most powerful recovery tool. Growth hormone peaks during deep sleep. No supplement or gadget can replace it.
- Nutrition — Adequate protein (1.6-2.2g/kg), carbohydrates to replenish glycogen, and overall caloric sufficiency.
- Progressive Overload Management — The best recovery strategy is smart programming that avoids unnecessary junk volume.

Probably Helpful:
- Foam Rolling — Modest evidence for reducing perceived soreness. Won't speed tissue repair, but feels good.
- Light Active Recovery — Easy walks, swimming, or cycling increase blood flow without adding training stress.
- Cold Water Immersion — May reduce soreness after very intense sessions, but could blunt hypertrophy adaptations if used chronically.

Likely Overhyped:
- Cryotherapy chambers — Expensive, and research doesn't show meaningful advantages over simple cold water.
- Compression boots — Feel great, but evidence for actual recovery benefits is thin.
- Most "recovery" supplements — Save your money.

The bottom line: sleep more, eat enough, and train smart. Everything else is marginal at best.`,
      },
      de: {
        title: "Die Wissenschaft der Regeneration: Was wirklich funktioniert",
        excerpt: "Eisbäder, Faszienrollen, Kompressionsstiefel — wir zeigen dir, welche Regenerationsmethoden wissenschaftlich belegt sind.",
        readTime: "7 Min Lesezeit",
        content: `Regeneration ist dort, wo Gewinne entstehen, aber die Regenerationsindustrie ist voller teurer Gimmicks. Hier ist, was die Forschung wirklich sagt.

Bewährte Methoden:
- Schlaf (7-9 Stunden) — Das einzige wirksamste Regenerationswerkzeug. Wachstumshormone erreichen ihren Höhepunkt während des Tiefschlafs. Kein Ergänzungsmittel oder Gadget kann es ersetzen.
- Ernährung — Ausreichendes Protein (1,6-2,2g/kg), Kohlenhydrate zur Auffüllung von Glykogen und allgemeine kalorische Suffizienz.
- Progressive Überlastungsverwaltung — Die beste Regenerationsstrategie ist intelligentes Programmieren, das unnötige minderwertige Volumen vermeidet.

Wahrscheinlich hilfreich:
- Faszienrolle — Bescheidene Evidenz zur Verringerung von wahrgenommener Muskelkater. Wird die Gewebereparatur nicht beschleunigen, fühlt sich aber gut an.
- Leichte aktive Regeneration — Einfache Spaziergänge, Schwimmen oder Radfahren erhöhen die Durchblutung ohne zusätzlichen Trainingsstress.
- Kaltimmersion — Kann Muskelkater nach sehr intensiven Sitzungen verringern, könnte aber Hypertrophie-Anpassungen blockieren, wenn es chronisch verwendet wird.

Wahrscheinlich überbewertet:
- Kryotherapie-Kammern — Teuer, und die Forschung zeigt keine sinnvollen Vorteile gegenüber einfachem kaltem Wasser.
- Kompressionsstiefel — Fühlen sich toll an, aber die Evidenz für tatsächliche Regenerationsbenefi ist dünn.
- Die meisten "Regenerations"-Ergänzungsmittel — Sparen Sie sich Ihr Geld.

Das Fazit: Schlaf mehr, iss genug und trainiere intelligent. Alles andere ist bestenfalls marginal.`,
      },
      fr: {
        title: "La Science de la Récupération : Ce Qui Fonctionne Réellement",
        excerpt: "Bains glacés, rouleau de massage, compression — nous décomposons quelles méthodes de récupération sont soutenues par la preuve.",
        readTime: "7 min de lecture",
        content: `La récupération est là où les gains se font, mais l'industrie de la récupération est pleine de gadgets coûteux. Voici ce que la recherche dit réellement.

Méthodes Éprouvées :
- Sommeil (7-9 heures) — L'outil de récupération le plus puissant. L'hormone de croissance atteint son pic pendant le sommeil profond. Aucun supplément ou gadget ne peut le remplacer.
- Nutrition — Protéine adéquate (1,6-2,2g/kg), glucides pour reconstituer le glycogène et suffisance calorique globale.
- Gestion de la Surcharge Progressive — La meilleure stratégie de récupération est une programmation intelligente qui évite le volume inutile.

Probablement Utile :
- Rouleau de Massage — Preuves modestes de réduction des courbatures perçues. N'accélèrera pas la réparation des tissus, mais se sentir bien.
- Récupération Active Légère — Les promenades faciles, la natation ou le cyclisme augmentent la circulation sanguine sans ajouter de stress d'entraînement.
- Immersion en Eau Froide — Peut réduire les courbatures après des séances très intenses, mais pourrait réduire les adaptations d'hypertrophie si utilisé chroniquement.

Probablement Survalorié :
- Chambres de cryothérapie — Chères, et la recherche ne montre pas d'avantages significatifs par rapport à l'eau froide simple.
- Bottes de compression — Se sentent bien, mais la preuve des avantages réels de récupération est mince.
- La plupart des suppléments "récupération" — Économisez votre argent.

Le résultat : Dormez plus, mangez suffisamment et entraînez-vous intelligemment. Tout le reste est marginal au mieux.`,
      },
      es: {
        title: "La Ciencia de la Recuperación: Lo Que Realmente Funciona",
        excerpt: "Baños de hielo, rodillos de masaje, compresión — desglosamos qué métodos de recuperación están respaldados por evidencia.",
        readTime: "7 min de lectura",
        content: `La recuperación es donde se hacen las ganancias, pero la industria de recuperación está llena de gadgets costosos. Aquí está lo que la investigación realmente dice.

Métodos Comprobados:
- Sueño (7-9 horas) — La herramienta de recuperación más poderosa. La hormona del crecimiento alcanza su pico durante el sueño profundo. Ningún suplemento o gadget puede reemplazarlo.
- Nutrición — Proteína adecuada (1,6-2,2g/kg), carbohidratos para reponer glucógeno, y suficiencia calórica general.
- Manejo de Sobrecarga Progresiva — La mejor estrategia de recuperación es la programación inteligente que evita el volumen innecesario.

Probablemente Útil:
- Rodillo de Masaje — Evidencia modesta para reducir el dolor percibido. No acelerará la reparación de tejidos, pero se siente bien.
- Recuperación Activa Ligera — Los paseos fáciles, la natación o el ciclismo aumentan el flujo sanguíneo sin agregar estrés de entrenamiento.
- Inmersión en Agua Fría — Puede reducir el dolor después de sesiones muy intensas, pero podría frenar adaptaciones de hipertrofia si se usa crónicamente.

Probablemente Exagerado:
- Cámaras de crioterapia — Caras, y la investigación no muestra ventajas significativas sobre agua fría simple.
- Botas de compresión — Se sienten bien, pero la evidencia de beneficios reales de recuperación es escasa.
- La mayoría de los suplementos "recuperación" — Ahorra tu dinero.

El resultado: Duerme más, come suficiente y entrena inteligentemente. Todo lo demás es marginal en el mejor de los casos.`,
      },
    },
  },
  {
    slug: "beginner-strength-program",
    image: "/blog/strength.jpg",
    date: "2026-02-20",
    translations: {
      en: {
        title: "The Only Beginner Strength Program You Need",
        excerpt: "Stop program hopping. This simple 3-day full-body routine builds a foundation that lasts.",
        readTime: "5 min read",
        content: `Beginners overthink programming. You don't need periodization, drop sets, or supersets. You need progressive overload on basic compound movements, done consistently.

The Program (3 days/week, e.g. Mon/Wed/Fri):

Day A:
- Squat 3x5
- Bench Press 3x5
- Barbell Row 3x5

Day B:
- Deadlift 3x5
- Overhead Press 3x5
- Pull-Ups 3x max reps

Alternate between Day A and Day B. Add 5 lbs to upper body lifts and 10 lbs to lower body lifts each week.

Key Principles:
1. Start lighter than you think. Leave ego at the door.
2. Focus on form before weight. Film your sets and compare to reference videos.
3. Eat in a slight caloric surplus with at least 1.6g protein per kg of bodyweight.
4. Sleep 7-9 hours. This is when muscle repair happens.
5. Run this program for 3-6 months before switching. Consistency beats complexity.

This is boring. It's also extremely effective. The best program is the one you actually follow.`,
      },
      de: {
        title: "Das einzige Anfänger-Kraftprogramm, das du brauchst",
        excerpt: "Höre auf, Programme zu wechseln. Diese einfache 3er-Ganzkörperrutine schafft eine Grundlage, die anhält.",
        readTime: "5 Min Lesezeit",
        content: `Anfänger denken zu viel über Programmierung nach. Du brauchst nicht Periodisierung, Drop Sets oder Supersätze. Du brauchst progressive Überlastung bei grundlegenden Verbindungsbewegungen, konsequent durchgeführt.

Das Programm (3 Tage/Woche, z.B. Mo/Mi/Fr):

Tag A:
- Kniebeuge 3x5
- Bankdrücken 3x5
- Langhantel Rudern 3x5

Tag B:
- Kreuzheben 3x5
- Schulterpresse 3x5
- Klimmzüge 3x max Wiederholungen

Wechsele zwischen Tag A und Tag B. Addiere 2,5 kg zu Oberkörperlifts und 5 kg zu Unterkörperlifts jede Woche.

Wichtige Grundsätze:
1. Starten Sie leichter als Sie denken. Lass das Ego an der Tür.
2. Konzentriere dich auf Form vor Gewicht. Filme deine Sätze und vergleiche sie mit Referenzvideos.
3. Essen Sie in einem leichten Kalorienüberschuss mit mindestens 1,6g Protein pro kg Körpergewicht.
4. Schlafe 7-9 Stunden. Das ist, wenn Muskelreparatur passiert.
5. Führe dieses Programm 3-6 Monate aus, bevor du wechselst. Konsistenz schlägt Komplexität.

Das ist langweilig. Es ist auch äußerst wirksam. Das beste Programm ist dasjenige, das du tatsächlich befolgst.`,
      },
      fr: {
        title: "Le Seul Programme de Force pour Débutant Dont Vous Avez Besoin",
        excerpt: "Arrêtez de changer de programme. Cette simple routine de corps complet 3 jours construit une base qui dure.",
        readTime: "5 min de lecture",
        content: `Les débutants trop réfléchissent sur la programmation. Vous n'avez pas besoin de périodisation, de séries de goutte ou de supersets. Vous avez besoin d'une surcharge progressive sur les mouvements composés de base, faite systématiquement.

Le Programme (3 jours/semaine, par exemple lun/mer/ven):

Jour A:
- Squat 3x5
- Développé couché 3x5
- Tiré couché 3x5

Jour B:
- Soulevé de terre 3x5
- Développé épaules 3x5
- Tractions 3x max reps

Alternez entre le jour A et le jour B. Ajoutez 2,5 kg aux levées de haut du corps et 5 kg aux levées du bas du corps chaque semaine.

Principes Clés:
1. Commencez plus léger que vous le pensez. Laissez l'ego à la porte.
2. Concentrez-vous sur la forme avant le poids. Filmez vos séries et comparez-les aux vidéos de référence.
3. Mangez dans un léger surplus calorique avec au moins 1,6g de protéine par kg de poids corporel.
4. Dormez 7-9 heures. C'est quand la réparation musculaire se fait.
5. Exécutez ce programme pendant 3-6 mois avant de changer. La cohérence surpasse la complexité.

C'est ennuyeux. C'est aussi extrêmement efficace. Le meilleur programme est celui que vous suivez réellement.`,
      },
      es: {
        title: "El Único Programa de Fuerza para Principiantes que Necesitas",
        excerpt: "Deja de cambiar de programa. Esta simple rutina de cuerpo completo de 3 días construye una base que dura.",
        readTime: "5 min de lectura",
        content: `Los principiantes piensan demasiado en la programación. No necesitas periodización, series de goteo o superconjuntos. Necesitas sobrecarga progresiva en movimientos compuestos básicos, hechos consistentemente.

El Programa (3 días/semana, por ejemplo, lun/mié/vie):

Día A:
- Sentadilla 3x5
- Press de Banca 3x5
- Remo de Barra 3x5

Día B:
- Peso Muerto 3x5
- Press de Hombros 3x5
- Dominadas 3x max reps

Alterna entre el Día A y el Día B. Agrega 2,5 kg a los levantamientos de la parte superior del cuerpo y 5 kg a los levantamientos de la parte inferior del cuerpo cada semana.

Principios Clave:
1. Comienza más ligero de lo que piensas. Deja el ego en la puerta.
2. Enfócate en la forma antes del peso. Filma tus series y compáralas con videos de referencia.
3. Come en un ligero superávit calórico con al menos 1,6g de proteína por kg de peso corporal.
4. Duerme 7-9 horas. Es cuando ocurre la reparación muscular.
5. Ejecuta este programa durante 3-6 meses antes de cambiar. La consistencia vence la complejidad.

Esto es aburrido. También es muy efectivo. El mejor programa es el que realmente sigues.`,
      },
    },
  },
];

/* ── Helper Functions ── */

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getLocalizedBlogPost(
  slug: string,
  locale: 'en' | 'de' | 'fr' | 'es'
) {
  const post = getBlogPostBySlug(slug);
  if (!post) return undefined;

  const translation = post.translations[locale] || post.translations.en;
  return {
    slug: post.slug,
    image: post.image,
    date: post.date,
    ...translation,
  };
}

export function getLocalizedBlogPosts(locale: 'en' | 'de' | 'fr' | 'es') {
  return blogPosts.map((post) => {
    const translation = post.translations[locale] || post.translations.en;
    return {
      slug: post.slug,
      image: post.image,
      date: post.date,
      ...translation,
    };
  });
}
