import { ExamProblem, RevisionSheet, MinisterStats } from "../types";

export const EXAM_PROBLEMS: ExamProblem[] = [
  {
    id: "bac-math-s-2025",
    title: "Épreuve Officielle de Mathématiques – Étude de fonction exponentielle & Suites",
    subject: "Mathématiques",
    level: "Terminale S (Scientifique)",
    year: 2025,
    durationMinutes: 60,
    totalPoints: 20,
    instructions: "Calculatrice autorisée. La clarté des raisonnements et la précision de la rédaction entreront pour une part importante dans l'appréciation des copies.",
    questionText: `Soit la fonction f définie sur [0 ; +∞[ par f(x) = (2x + 1) e^(-x).

1. Déterminer la limite de f en +∞ (justifier soigneusement la forme indéterminée avec les croissances comparées).
2. Démontrer que pour tout x ≥ 0, f'(x) = (1 - 2x) e^(-x).
3. Dresser le tableau de variations complet de f sur [0 ; +∞[.
4. Démontrer que l'équation f(x) = 0.5 admet une unique solution α sur l'intervalle [0 ; 1/2].`,
    officialCriteria: "Justification rigoureuse des limites (0.5 pt), calcul de dérivée méthodique avec la formule (uv)' = u'v + uv' (1 pt), signe de la dérivée et tableau de variations complet (1 pt), application rigoureuse du Théorème des Valeurs Intermédiaires avec continuité et stricte monotonie (1.5 pt).",
    officialSolution: `1. f(x) = 2x e^(-x) + e^(-x) = 2(x/e^x) + e^(-x). Par croissances comparées, lim_{x->+∞} x/e^x = 0 et lim_{x->+∞} e^(-x) = 0. Donc lim_{x->+∞} f(x) = 0.
2. Posons u(x) = 2x + 1 => u'(x) = 2. v(x) = e^(-x) => v'(x) = -e^(-x). f'(x) = 2e^(-x) + (2x + 1)(-e^(-x)) = e^(-x)[2 - 2x - 1] = (1 - 2x)e^(-x).
3. Comme pour tout x réel e^(-x) > 0, le signe de f'(x) est celui de 1 - 2x. f'(x) s'annule en x = 1/2. f est strictement croissante sur [0 ; 1/2] et strictement décroissante sur [1/2 ; +∞[. Maximum : f(1/2) = 2e^(-0.5) ≈ 1.213.
4. Sur [0 ; 1/2], f est continue (produit de fonctions usuelles continues) et strictement croissante. f(0) = 1 et f(1/2) = 2/sqrt(e) ≈ 1.21. Comme 0.5 n'est pas dans [1 ; 1.21], la solution se situe sur [1/2 ; +∞[ où f décroît de 1.21 vers 0. D'après le corollaire du TVI (bijection), il existe une unique solution.`,
    hints: [
      "Pense à factoriser par e^(-x) pour dériver sous la forme u'v + uv'.",
      "Rappelle-toi que la fonction exponentielle e^X est strictement positive pour tout réel X.",
      "Pour le TVI, n'oublie jamais de mentionner la continuité et la stricte monotonie !",
    ],
  },
  {
    id: "brevet-math-pythagore-2025",
    title: "Épreuve Officielle du Brevet / BFEM – Géométrie & Théorème de Pythagore",
    subject: "Mathématiques",
    level: "Troisième (Brevet / BFEM / DEF)",
    year: 2025,
    durationMinutes: 45,
    totalPoints: 20,
    instructions: "Règle graduée, équerre et calculatrice autorisées. Justifiez chaque étape de calcul.",
    questionText: `Dans un triangle ABC rectangle en A :
On donne AB = 4.8 cm et AC = 6.4 cm.

1. Énoncer le théorème de Pythagore appliqué au triangle ABC.
2. Calculer la longueur exacte de l'hypoténuse [BC].
3. Un élève affirme que si on double la longueur des deux côtés de l'angle droit, la longueur de l'hypoténuse est également doublée. Justifier si cette affirmation est vraie ou fausse.`,
    officialCriteria: "Énoncé exact du théorème et identification de l'hypoténuse (1.5 pt). Calcul étape par étape avec BC² = AB² + AC² = 23.04 + 40.96 = 64, donc BC = 8 cm (2 pts). Justification rigoureuse de la proportionnalité (1.5 pt).",
    officialSolution: `1. Le triangle ABC étant rectangle en A, d'après le théorème de Pythagore : le carré de la longueur de l'hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés. Soit : BC² = AB² + AC².
2. Calcul : BC² = (4.8)² + (6.4)² = 23.04 + 40.96 = 64. D'où BC = √64 = 8 cm.
3. Si on double les côtés : AB' = 2*4.8 = 9.6 cm et AC' = 2*6.4 = 12.8 cm. BC'² = 9.6² + 12.8² = 92.16 + 163.84 = 256. BC' = √256 = 16 cm = 2 * 8 cm. L'affirmation est donc VRAIE (homothétie de rapport 2).`,
    hints: [
      "Dans un triangle rectangle, l'hypoténuse est toujours le côté opposé à l'angle droit (le plus grand côté).",
      "Écris toujours l'égalité théorique avant de remplacer par les valeurs numériques.",
    ],
  },
  {
    id: "bac-philo-l-2025",
    title: "Dissertation Philosophique – L'État et la Liberté",
    subject: "Philosophie",
    level: "Terminale L (Littéraire)",
    year: 2025,
    durationMinutes: 90,
    totalPoints: 20,
    instructions: "Il est demandé au candidat de définir les termes clés, d'énoncer le problème philosophique central, de construire un plan problématisé (Thèse / Antithèse / Dépassement) et d'illustrer par des références philosophiques précises.",
    questionText: `Sujet de dissertation : « L'autorité de l'État constitue-t-elle nécessairement un obstacle à la liberté des citoyens ? »`,
    officialCriteria: "Introduction complète avec accroche, définition de l'État et de la liberté, paradoxe énoncé, problématique claire et annonce du plan (4 pts). Première partie montrant la contrainte et l'aliénation (Hobbes, anarchisme ou Marx) (5 pts). Deuxième partie montrant la loi comme condition de la liberté civile (Rousseau, Spinoza) (5 pts). Troisième partie synthétique sur l'État de droit démocratique et la vigilance citoyenne (4 pts). Style, syntaxe et transitions (2 pts).",
    officialSolution: `Problématique centrale : L'État semble s'imposer par des lois et un monopole de la force qui limitent ma liberté naturelle d'agir à ma guise. Cependant, sans État et sans lois, règne la loi du plus fort où personne n'est véritablement libre. Dès lors, l'État est-il le tombeau de la liberté ou sa seule garantie réelle ?
Plan type :
I. L'État perçu comme instrument de privation de liberté (l'oppression légale, le Léviathan de Hobbes où l'on cède sa liberté pour la sécurité).
II. L'État et la loi comme fondement même de la liberté civile (Rousseau : « L'obéissance à la loi qu'on s'est prescrite est liberté » ; Spinoza : la fin de l'État est en réalité la liberté).
III. Dépassement : La liberté réside dans l'État de droit démocratique, sous réserve du contrôle permanent et de l'esprit critique des citoyens.`,
    hints: [
      "Distingue bien la 'libert naturelle' (faire tout ce qui me plaît) et la 'liberté civile' (agir dans le cadre de lois équitables).",
      "Pense à la célèbre citation de Rousseau dans Du Contrat Social.",
      "Évite l'écueil de simplement donner ton avis : confronte les doctrines philosophiques.",
    ],
  },
  {
    id: "bac-physique-s-2025",
    title: "Physique-Chimie – Cinétique chimique & Énergie cinétique d'un satellite",
    subject: "Physique-Chimie",
    level: "Terminale S (Scientifique)",
    year: 2025,
    durationMinutes: 60,
    totalPoints: 20,
    instructions: "Données : Constante de gravitation G = 6.67 × 10^(-11) N kg^(-2). Masse de la Terre M_T = 5.97 × 10^24 kg. Rayon de la Terre R_T = 6370 km.",
    questionText: `Un satellite météorologique national de masse m = 850 kg évolue sur une orbite circulaire à une altitude h = 720 km au-dessus de la Terre.

1. Exprimer le vecteur accélération du satellite dans le repère de Frenet en supposant le mouvement circulaire uniforme.
2. En appliquant la 2ème loi de Newton, établir l'expression de la vitesse orbitale v en fonction de G, M_T, R_T et h.
3. Calculer la valeur numérique de la vitesse v en km/h.
4. Calculer la période de révolution T du satellite en minutes.`,
    officialCriteria: "Repère de Frenet bien défini avec vecteurs unitaire t et normal n (1 pt). Bilan des forces rigoureux (force gravitationnelle terrestre) (1 pt). 2ème loi de Newton avec projection correcte a_n = v²/(R_T + h) (2 pts). Calcul numérique soigné avec conversion des unités en mètres (1 pt). Période T = 2πr/v (1 pt).",
    officialSolution: `1. Dans le repère de Frenet (M, u_t, u_n) : a = dv/dt * u_t + (v²/r) * u_n. Pour un mouvement circulaire uniforme, dv/dt = 0, donc a = [v² / (R_T + h)] u_n.
2. Système : satellite de masse m. Référentiel géocentrique supposé galiléen. Force exercée : F = G * (m * M_T) / (R_T + h)² u_n. D'après la 2ème loi de Newton : F = m * a => G * (m * M_T) / (R_T + h)² = m * [v² / (R_T + h)]. En simplifiant par m et (R_T + h) : v = sqrt( G * M_T / (R_T + h) ).
3. Application numérique : r = (6370 + 720) * 10³ m = 7.09 × 10^6 m. v = sqrt( 6.67e-11 * 5.97e24 / 7.09e6 ) ≈ 7500 m/s = 27 000 km/h.
4. T = 2 * π * r / v = 2 * 3.14159 * 7.09e6 / 7500 ≈ 5940 secondes ≈ 99 minutes.`,
    hints: [
      "Attention aux unités : convertis toujours les kilomètres (km) en mètres (m) dans les calculs avec G !",
      "Le rayon de l'orbite est r = R_T + h (rayon de la Terre + altitude).",
    ],
  },
  {
    id: "brevet-francais-2025",
    title: "Épreuve du Brevet / BFEM – Analyse de texte & Réécriture",
    subject: "Français",
    level: "Troisième (Brevet / BFEM / DEF)",
    year: 2025,
    durationMinutes: 45,
    totalPoints: 20,
    instructions: "Lisez attentivement l'extrait puis répondez aux questions de grammaire et d'interprétation.",
    questionText: `Texte : « L'enfant marchait seul le long de la piste rouge. La chaleur pesait sur ses épaules, mais dans son sac de toile, le cahier de cours était soigneusement enveloppé d'un plastique pour le protéger de la poussière. Il savait que ce cahier représentait l'avenir de toute sa famille. »

1. Relevez dans le texte deux figures de style ou expressions imagées et expliquez leur valeur expressive.
2. Identifiez la proposition subordonnée dans la dernière phrase et précisez sa nature et sa fonction.
3. Réécriture : Réécrivez le passage « L'enfant marchait seul... le cahier était soigneusement enveloppé... Il savait » en remplaçant « L'enfant » par « Les enfants ». Faites tous les accords nécessaires.`,
    officialCriteria: "Repérage de la métaphore de la chaleur qui 'pesait' ou métonymie (2 pts). Analyse grammaticale précise de la proposition subordonnée conjonctive complétive, COD de 'savait' (2 pts). Réécriture sans faute d'accord sujet-verbe ni d'adjectif (3 pts).",
    officialSolution: `1. Figures de style : « La chaleur pesait sur ses épaules » : métaphore et personnification montrant la lourdeur physique et symbolique des épreuves. « ce cahier représentait l'avenir » : métonymie désignant l'éducation et la transmission du savoir à travers l'objet concret du cahier.
2. « que ce cahier représentait l'avenir de toute sa famille » : proposition subordonnée conjonctive introduite par 'que', ayant pour fonction Complément d'Objet Direct (COD) du verbe principal 'savait'.
3. Réécriture : « Les enfants marchaient seuls le long de la piste rouge. La chaleur pesait sur leurs épaules, mais dans leurs sacs de toile, les cahiers de cours étaient soigneusement enveloppés d'un plastique pour les protéger de la poussière. Ils savaient que ces cahiers représentaient l'avenir de toutes leurs familles. »`,
    hints: [
      "Pour la fonction de la subordonnée, pose la question : Il savait QUOI ?",
      "En réécrivant au pluriel, veille à accorder les adjectifs 'seuls' et les participes passés 'enveloppés' !",
    ],
  },
];

export const REVISION_SHEETS: RevisionSheet[] = [
  {
    id: "math-fiches-pythagore",
    title: "Théorème de Pythagore & Réciproque (Brevet / 3e)",
    subject: "Mathématiques",
    level: "Troisième (Brevet / BFEM / DEF)",
    summary: "Fiche essentielle pour calculer une longueur dans un triangle rectangle et démontrer qu'un triangle est rectangle.",
    keyFormulasOrConcepts: [
      "Dans un triangle ABC rectangle en A : BC² = AB² + AC² (BC est l'hypoténuse)",
      "Pour trouver un côté de l'angle droit : AB² = BC² - AC²",
      "Réciproque : Si dans un triangle le carré du plus grand côté est égal à la somme des carrés des deux autres, alors il est rectangle.",
      "Contraposée : Si l'égalité n'est pas vérifiée, alors le triangle n'est pas rectangle.",
    ],
    commonMistakesToAvoid: [
      "Additionner au lieu de soustraire pour calculer un côté de l'angle droit !",
      "Oublier d'écrire la racine carrée à la fin (ex: écrire BC = 64 au lieu de BC = √64 = 8)",
      "Oublier de nommer l'hypoténuse dans la rédaction officielle.",
    ],
    bacTip: "Sur ta copie du Brevet, écris TOUJOURS : 'Le triangle ABC est rectangle en A, d'après le théorème de Pythagore...'. Ne saute jamais cette phrase modèle qui garantit 0.5 pt direct !",
  },
  {
    id: "math-fiches-derivees",
    title: "Dérivation & Convexité : Les Formules Essentielles du BAC",
    subject: "Mathématiques",
    level: "Terminale S (Scientifique)",
    summary: "Fiche synthétique officielle regroupant les règles de dérivation des composées, l'exponentielle, le logarithme népérien et les points d'inflexion.",
    keyFormulasOrConcepts: [
      "(u × v)' = u'v + uv'",
      "(u / v)' = (u'v - uv') / v²",
      "(e^u)' = u' × e^u",
      "(ln(u))' = u' / u  (avec u > 0)",
      "Convexité : f est convexe sur I <=> f''(x) ≥ 0 sur I",
      "Point d'inflexion : là où la dérivée seconde f'' s'annule en changeant de signe.",
    ],
    commonMistakesToAvoid: [
      "Oublier de multiplier par u' pour les fonctions composées (écrire (e^(2x))' = e^(2x) au lieu de 2e^(2x))",
      "Confondre dérivée nulle et extremum sans vérifier le changement de signe",
      "Oublier le domaine de définition avant de dériver",
    ],
    bacTip: "Sur la copie du BAC, écris toujours : 'f est dérivable sur [a;b] comme somme/produit de fonctions dérivables'. Les correcteurs accordent souvent 0.25 à 0.5 point sur cette seule phrase d'introduction !",
  },
  {
    id: "philo-methode-dissert",
    title: "Méthode de la Dissertation Philosophique : De la Problématique à la Conclusion",
    subject: "Philosophie",
    level: "Terminale L (Littéraire)",
    summary: "Guide pas à pas pour réussir l'introduction, la dialectique des parties et la conclusion sans jamais tomber dans le simple avis personnel.",
    keyFormulasOrConcepts: [
      "Définition des concepts clés du sujet dans leur acception philosophique",
      "Mise en évidence du paradoxe (L'Aporie initiale)",
      "Problématique : la question fondamentale sous la question apparente",
      "Plan dialectique : Thèse (Oui, parce que...) -> Antithèse (Cependant, les limites...) -> Synthèse/Dépassement (Sous quelle condition nouvelle...)",
    ],
    commonMistakesToAvoid: [
      "Faire un catalogue d'auteurs sans lien avec le sujet précis",
      "Dire 'Je pense que' au lieu d'argumenter universellement",
      "Donner une réponse brutale dès l'introduction",
    ],
    bacTip: "Une bonne problématique ne commence jamais par 'Pourquoi'. Elle formule une tension : 'En quoi... sans pour autant...' ou 'Comment concevoir que... alors même que...' !",
  },
  {
    id: "physique-ondes-mecaniques",
    title: "Ondes Mécaniques & Électromagnétiques : Fréquence, Célérité et Diffraction",
    subject: "Physique-Chimie",
    level: "Terminale S (Scientifique)",
    summary: "Tout le chapitre sur la propagation des signaux périodiques, l'effet Doppler et la diffraction.",
    keyFormulasOrConcepts: [
      "Célérité : v = d / Δt = λ / T = λ × f",
      "Période temporelle T = 1 / f",
      "Diffraction par une fente de largeur a : θ ≈ λ / a  (avec θ en radians)",
      "Tache centrale de diffraction : L = 2λ D / a",
      "Effet Doppler : f_reçue > f_émise si la source s'approche de l'observateur.",
    ],
    commonMistakesToAvoid: [
      "Confondre longueur d'onde spatiale (λ en mètres) et période temporelle (T en secondes)",
      "Oublier de convertir les nanomètres (nm) en mètres (× 10^-9 m)",
      "Exprimer l'angle θ en degrés au lieu de radians",
    ],
    bacTip: "Repère bien les grandeurs sur les graphiques : si l'axe horizontal est en millisecondes, c'est la période T. S'il est en centimètres, c'est la longueur d'onde λ !",
  },
  {
    id: "svt-genetique-brassage",
    title: "Brassages Chromosomiques & Diversité Génétique des Gamètes",
    subject: "Sciences de la Vie et de la Terre (SVT)",
    level: "Terminale S (Scientifique)",
    summary: "Mécanismes fondamentaux de la méiose : crossing-over (brassage intra) et séparation aléatoire des bivalents (brassage inter).",
    keyFormulasOrConcepts: [
      "Brassage intrachromosomique : en Prophase I de méiose, crossing-over entre chromatides non-sœurs",
      "Brassage interchromosomique : en Anaphase I, séparation aléatoire des chromosomes homologues (2^n combinaisons)",
      "Fécondation : amplification aléatoire de la diversité génétique",
      "Test-cross (croisement test) : permet d'analyser le génotype des gamètes produits par un individu F1",
    ],
    commonMistakesToAvoid: [
      "Inverser l'ordre des brassages : le brassage intrachromosomique précède TOUJOURS le brassage interchromosomique",
      "Oublier de représenter les allèles sur les deux chromatides de chaque chromosome dupliqué",
    ],
    bacTip: "Dans l'épreuve de SVT, un schéma bilan soigné, titré et légendé vaut souvent plus que 2 pages de texte ! Utilise deux couleurs distinctes pour le père et la mère.",
  },
];

export const INITIAL_MINISTER_STATS: MinisterStats = {
  isProjectionModel: true,
  localPrototypeSessions: {
    totalRequests: 14,
    activeSessions: 1,
    evaluatedCopies: 1,
    nodeInstance: "brev-edu-l4-gpu-01",
  },
  nationalIndex: {
    registeredStudents: 412850,
    activeToday: 68420,
    ruralCoveragePercentage: 88.4,
    offlineSessionsCompleted: 154300,
    bacPassingRateProjection: "+14.6%",
    genderParityIndex: 1.02,
  },
  criticalTopicsAttention: [
    {
      subject: "Mathématiques (Troisième / Brevet)",
      topic: "Théorème de Pythagore & Démontrer un triangle rectangle",
      struggleRate: 49,
      recommendedAction: "Capsules socratiques interactives NVIDIA NIM + fiches mémo visuelles",
    },
    {
      subject: "Mathématiques (Terminale S)",
      topic: "Probabilités conditionnelles & Variables aléatoires",
      struggleRate: 64,
      recommendedAction: "Renfort national par capsules audio + fiches mémo imprimées",
    },
    {
      subject: "Physique-Chimie (Terminale S)",
      topic: "Cinétique chimique & Électromagnétisme",
      struggleRate: 58,
      recommendedAction: "Simulateurs d'expériences interactifs déployés",
    },
    {
      subject: "Philosophie (Terminale L & S)",
      topic: "La méthode de la dissertation (Problématisation & Plan dialectique)",
      struggleRate: 52,
      recommendedAction: "Ateliers d'argumentation socratique en direct",
    },
    {
      subject: "Français (BFEM / Brevet)",
      topic: "Accord du participe passé & Analyse logique",
      struggleRate: 46,
      recommendedAction: "Quiz d'auto-remédiation ludique quotidien",
    },
  ],
  regionalObservatory: [
    { region: "Dakar & Banlieue", students: 142000, completion: 92, status: "Optimal" },
    { region: "Thiès & Diourbel", students: 86400, completion: 87, status: "Très bon" },
    { region: "Saint-Louis & Fleuve", students: 51200, completion: 84, status: "En hausse" },
    { region: "Kaolack & Centre", students: 48900, completion: 81, status: "Prioritaire" },
    { region: "Ziguinchor & Casamance", students: 44200, completion: 86, status: "Très bon" },
    { region: "Tambacounda & Kédougou", students: 23800, completion: 79, status: "Priorité Équité" },
    { region: "Matam & Ferlo", students: 16350, completion: 76, status: "Priorité Équité" },
  ],
};

export const ORIENTATION_CAREERS = [
  {
    sector: "Ingénierie & Intelligence Artificielle Souveraine (NVIDIA / Brev)",
    badge: "Priorité Nationale",
    description: "Conception de solutions numériques adaptées aux besoins de l'Afrique et du monde : santé, logistique, fintech, calcul haute performance sur GPU et gestion des ressources naturelles.",
    filiereBac: "Bac S1, S2, S3 ou Sciences Technologies",
    debouches: ["Ingénieur Machine Learning & NIM", "Architecte Cloud & GPU Brev", "Data Analyste National", "Chef de projet cybersécurité"],
    statutBourse: "Bourse d'Excellence de l'État accessible dès la Mention Bien",
  },
  {
    sector: "Agro-Écologie Moderne & Souveraineté Alimentaire",
    badge: "Secteur Stratégique",
    description: "Transformation des systèmes agricoles par l'irrigation connectée, la valorisation des filières locales (mil, maïs, niébé, fruits) et la protection des sols.",
    filiereBac: "Bac S2, SVT, S4 ou Sciences Agronomiques",
    debouches: ["Ingénieur agronome", "Responsable de ferme moderne", "Biotechnologiste végétal", "Expert en gestion de l'eau"],
    statutBourse: "Allocation prioritaire du Ministère de l'Agriculture & Éducation",
  },
  {
    sector: "Énergies Renouvelables & Climat",
    badge: "Transition Verte",
    description: "Déploiement massif de l'énergie solaire, éolienne et micro-réseaux pour électrifier durablement tous les villages et zones industrielles.",
    filiereBac: "Bac S1, S2, Technique ou Physique-Chimie",
    debouches: ["Ingénieur solaire", "Chef de réseau énergétique", "Technicien supérieur haute tension", "Auditeur carbone"],
    statutBourse: "Bourses partenaires et partenariats universités africaines",
  },
  {
    sector: "Santé Publique & Télémédecine Rurale",
    badge: "Impact Humain",
    description: "Médecine préventive, recherche biomédicale sur les maladies tropicales et centres hospitaliers de référence décentralisés.",
    filiereBac: "Bac S2, SVT, S1",
    debouches: ["Médecin généraliste / spécialiste", "Pharmacien biologiste", "Épidémiologiste", "Gestionnaire de santé publique"],
    statutBourse: "Contrat d'engagement républicain avec internat subventionné",
  },
  {
    sector: "Droit Économique, Enseignement & Gouvernance Publique",
    badge: "Piliers de l'État",
    description: "Former les futurs juristes d'affaires, inspecteurs de l'éducation, diplomates et professeurs émérites qui bâtissent les institutions de demain.",
    filiereBac: "Bac L1, L2, G ou Économie",
    debouches: ["Professeur agrégé / certifié", "Magistrat", "Juriste d'entreprise", "Administrateur civil"],
    statutBourse: "Concours des Grandes Écoles Nationales d'Administration",
  },
];
