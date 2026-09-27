// ── Database of Senegalese secondary school series ─────────────────────

export type SerieInfo = {
  key: string;
  name: string;
  category: "litteraire" | "scientifique" | "technique" | "economique";
  shortDesc: string;
  description: string;
  mainSubjects: string[];
  coefficients: Record<string, number>;
  difficulty: string;
  recommendedQualities: string[];
  higherStudies: string[];
  careers: string[];
  studyDuration: string;
  employmentProspects: string;
  marketTrends: string;
  advantages: string[];
  constraints: string[];
};

export const SERIES_DATABASE: Record<string, SerieInfo> = {
  // ── LITTÉRAIRES ──────────────────────────────────────────────────────

  L1a: {
    key: "L1a",
    name: "L1a – Lettres et Philosophie",
    category: "litteraire",
    shortDesc: "Littérature, langues et pensée critique",
    description:
      "La série L1a est axée sur la maîtrise du français, les lettres classiques et la philosophie. Elle développe la rigueur intellectuelle, la capacité d'analyse et d'expression. Idéale pour les élèves passionnés par la langue, la littérature et la réflexion philosophique.",
    mainSubjects: ["Français", "Philosophie", "Latin", "Histoire-Géographie", "Mathématiques"],
    coefficients: {
      Français: 5,
      Philosophie: 4,
      Latin: 3,
      "Histoire-Géographie": 3,
      Mathématiques: 2,
    },
    difficulty: "Moyen — nécessite une forte aisance en expression écrite",
    recommendedQualities: [
      "Goût pour la lecture et l'écriture",
      "Esprit d'analyse",
      "Curiosité intellectuelle",
      "Rigueur dans l'argumentation",
    ],
    higherStudies: [
      "Licence Lettres modernes",
      "Droit",
      "Journalisme",
      "Sciences politiques",
      "Philosophie",
    ],
    careers: [
      "Avocat",
      "Journaliste",
      "Enseignant",
      "Diplomate",
      "Écrivain",
      "Magistrat",
      "Conseiller en communication",
    ],
    studyDuration: "3 à 8 ans après le Bac",
    employmentProspects: "Bonnes dans le droit, l'enseignement et la communication",
    marketTrends:
      "Le secteur juridique et la communication sont en forte croissance au Sénégal",
    advantages: [
      "Développe l'expression et la pensée critique",
      "Large spectre de débouchés (droit, enseignement, diplomatie)",
      "Solide culture générale",
    ],
    constraints: [
      "Moins valorisée dans le secteur privé technique",
      "Nécessite une bonne maîtrise du français",
    ],
  },

  L1b: {
    key: "L1b",
    name: "L1b – Lettres et Langues vivantes",
    category: "litteraire",
    shortDesc: "Langues étrangères, culture et communication internationale",
    description:
      "La série L1b met l'accent sur les langues vivantes (anglais, arabe, espagnol) et la culture générale. Elle prépare à des carrières internationales et de communication. Idéale pour les élèves multilingues et ouverts sur le monde.",
    mainSubjects: ["Français", "Anglais", "Arabe ou Espagnol", "Histoire-Géographie", "Philosophie"],
    coefficients: {
      Français: 4,
      Anglais: 5,
      "Arabe/Espagnol": 4,
      "Histoire-Géographie": 3,
      Philosophie: 2,
    },
    difficulty: "Moyen — nécessite une forte capacité en langues",
    recommendedQualities: [
      "Passion pour les langues",
      "Ouverture culturelle",
      "Facilité de communication",
      "Curiosité pour le monde",
    ],
    higherStudies: [
      "Traduction-Interprétation",
      "Relations internationales",
      "Commerce international",
      "Tourisme",
      "Journalisme international",
    ],
    careers: [
      "Traducteur",
      "Interprète",
      "Diplomate",
      "Responsable commercial export",
      "Guide touristique",
      "Agent consulaire",
    ],
    studyDuration: "3 à 5 ans après le Bac",
    employmentProspects: "Bonnes dans le tourisme, la diplomatie et le commerce international",
    marketTrends: "Le secteur touristique et les organisations internationales recrutent activement",
    advantages: [
      "Ouverture internationale",
      "Compétences linguistiques très demandées",
      "Adaptabilité dans de nombreux secteurs",
    ],
    constraints: [
      "Exige une maîtrise réelle de plusieurs langues",
      "Débouchés locaux parfois limités",
    ],
  },

  "L'1": {
    key: "L'1",
    name: "L'1 – Lettres et Langue arabe",
    category: "litteraire",
    shortDesc: "Langue arabe, culture islamique et lettres",
    description:
      "La série L'1 est axée sur la langue arabe, la culture islamique et la littérature. Elle prépare à des carrières dans l'enseignement religieux, la diplomatie avec les pays arabes et les études islamiques. Profondément ancrée dans les réalités sénégalaises.",
    mainSubjects: ["Arabe", "Français", "Histoire-Géographie", "Philosophie islamique", "Mathématiques"],
    coefficients: {
      Arabe: 6,
      Français: 4,
      "Histoire-Géographie": 3,
      "Philosophie islamique": 3,
    },
    difficulty: "Moyen — exige une solide base en arabe",
    recommendedQualities: [
      "Maîtrise de la langue arabe",
      "Intérêt pour la culture islamique",
      "Rigueur académique",
    ],
    higherStudies: [
      "Institut islamique",
      "Études arabes",
      "Relations internationales",
      "Enseignement de l'arabe",
    ],
    careers: [
      "Enseignant d'arabe",
      "Imam",
      "Diplomate avec les pays arabes",
      "Traducteur arabe-français",
      "Conseiller en affaires islamiques",
    ],
    studyDuration: "3 à 5 ans après le Bac",
    employmentProspects: "Bonnes dans l'enseignement et les organisations islamiques",
    marketTrends: "Forte demande dans les daara modernisés et l'enseignement bilingue",
    advantages: [
      "Très valorisée dans le contexte sénégalais",
      "Ouverture sur le monde arabe",
      "Débouchés dans l'enseignement public",
    ],
    constraints: [
      "Nécessite une maîtrise de l'arabe classique",
      "Moins reconnue dans le secteur privé moderne",
    ],
  },

  L2: {
    key: "L2",
    name: "L2 – Sciences humaines",
    category: "litteraire",
    shortDesc: "Histoire, géographie, philosophie et sciences sociales",
    description:
      "La série L2 est orientée vers les sciences humaines : histoire, géographie, sociologie et philosophie. Elle développe la pensée critique, la compréhension des sociétés et des enjeux contemporains. Idéale pour les profils curieux et engagés.",
    mainSubjects: ["Histoire-Géographie", "Philosophie", "Français", "Sciences sociales", "Mathématiques"],
    coefficients: {
      "Histoire-Géographie": 5,
      Philosophie: 4,
      Français: 4,
      "Sciences sociales": 3,
    },
    difficulty: "Moyen — nécessite curiosité intellectuelle et sens de l'analyse",
    recommendedQualities: [
      "Curiosité pour les sociétés humaines",
      "Sens de l'analyse",
      "Engagement citoyen",
      "Bonne expression écrite",
    ],
    higherStudies: [
      "Sciences politiques",
      "Sociologie",
      "Histoire",
      "Droit",
      "Journalisme",
      "Relations internationales",
    ],
    careers: [
      "Sociologue",
      "Politologue",
      "Journaliste",
      "Enseignant",
      "Diplomate",
      "Chercheur en sciences sociales",
      "ONG / Humanitaire",
    ],
    studyDuration: "3 à 8 ans après le Bac",
    employmentProspects: "Bonnes dans le secteur public, les ONG et les médias",
    marketTrends: "Les organisations internationales et les médias numériques recrutent",
    advantages: [
      "Large culture générale",
      "Développe l'esprit critique",
      "Débouchés dans les ONG et la diplomatie",
    ],
    constraints: [
      "Débouchés privés moins directs",
      "Nécessite souvent une spécialisation complémentaire",
    ],
  },

  LA: {
    key: "LA",
    name: "LA – Lettres et Arts",
    category: "litteraire",
    shortDesc: "Expression artistique, lettres et créativité",
    description:
      "La série LA combine les lettres et les arts plastiques. Elle prépare aux métiers de la créativité, de la culture et du design. Idéale pour les élèves avec un fort potentiel créatif.",
    mainSubjects: ["Arts plastiques", "Français", "Histoire de l'art", "Philosophie"],
    coefficients: {
      "Arts plastiques": 6,
      Français: 4,
      "Histoire de l'art": 3,
      Philosophie: 2,
    },
    difficulty: "Accessible — nécessite surtout talent créatif",
    recommendedQualities: [
      "Talent artistique",
      "Sensibilité esthétique",
      "Créativité",
      "Expression personnelle",
    ],
    higherStudies: [
      "École des Beaux-Arts",
      "Design graphique",
      "Architecture",
      "Arts du spectacle",
    ],
    careers: [
      "Graphiste",
      "Designer",
      "Artiste plasticien",
      "Architecte d'intérieur",
      "Illustrateur",
      "Professeur d'arts",
    ],
    studyDuration: "3 à 5 ans après le Bac",
    employmentProspects: "En croissance avec le développement du secteur créatif africain",
    marketTrends: "Économie créative et industries culturelles en plein essor en Afrique de l'Ouest",
    advantages: [
      "Expression du talent créatif",
      "Secteur créatif en croissance",
      "Possibilités d'entrepreneuriat",
    ],
    constraints: [
      "Revenus irréguliers au début",
      "Nécessite un portfolio solide",
    ],
  },

  // ── SCIENTIFIQUES ────────────────────────────────────────────────────

  S1: {
    key: "S1",
    name: "S1 – Sciences de la Vie et de la Terre",
    category: "scientifique",
    shortDesc: "Biologie, géologie et sciences du vivant",
    description:
      "La série S1 est axée sur les sciences du vivant : biologie, géologie, écologie. Elle prépare aux métiers de la santé, de l'agriculture, de l'environnement et de la recherche en sciences naturelles.",
    mainSubjects: ["SVT", "Mathématiques", "Physique-Chimie", "Français", "Philosophie"],
    coefficients: {
      SVT: 7,
      Mathématiques: 5,
      "Physique-Chimie": 4,
      Français: 2,
    },
    difficulty: "Difficile — exige rigueur et mémoire",
    recommendedQualities: [
      "Rigueur scientifique",
      "Curiosité pour la nature",
      "Bonne mémoire",
      "Méthode de travail",
    ],
    higherStudies: [
      "Médecine",
      "Pharmacie",
      "Sciences naturelles",
      "Agriculture",
      "Environnement",
      "Biologie",
    ],
    careers: [
      "Médecin",
      "Pharmacien",
      "Biologiste",
      "Agronome",
      "Vétérinaire",
      "Chercheur en sciences",
    ],
    studyDuration: "5 à 10 ans après le Bac (médecine)",
    employmentProspects: "Excellentes dans le secteur médical et paramédical",
    marketTrends: "Forte demande en santé et en agro-alimentaire au Sénégal",
    advantages: [
      "Débouchés solides dans la santé",
      "Recherche valorisée",
      "Bonne reconnaissance sociale",
    ],
    constraints: [
      "Études longues et exigeantes",
      "Concours d'entrée très sélectifs en médecine",
    ],
  },

  S2: {
    key: "S2",
    name: "S2 – Sciences expérimentales",
    category: "scientifique",
    shortDesc: "Physique, chimie, mathématiques et sciences",
    description:
      "La série S2 est la référence scientifique au Sénégal. Elle combine physique, chimie et mathématiques de haut niveau. Elle ouvre les portes aux grandes écoles d'ingénieurs, à l'informatique, à la médecine et à la recherche.",
    mainSubjects: ["Mathématiques", "Physique-Chimie", "SVT", "Français", "Philosophie"],
    coefficients: {
      Mathématiques: 6,
      "Physique-Chimie": 6,
      SVT: 3,
      Français: 2,
      Philosophie: 2,
    },
    difficulty: "Très difficile — exige excellentes bases en maths et physique",
    recommendedQualities: [
      "Excellentes bases en mathématiques",
      "Rigueur et méthode",
      "Curiosité scientifique",
      "Persévérance",
    ],
    higherStudies: [
      "Classe préparatoire (CPGE)",
      "École d'ingénieurs",
      "Médecine",
      "Informatique",
      "Physique appliquée",
    ],
    careers: [
      "Ingénieur",
      "Médecin",
      "Informaticien",
      "Chercheur",
      "Architecte",
      "Data scientist",
    ],
    studyDuration: "5 à 8 ans après le Bac",
    employmentProspects: "Excellentes dans tous les secteurs techniques",
    marketTrends: "Ingénieurs et informaticiens très demandés au Sénégal et à l'international",
    advantages: [
      "Ouvre toutes les portes scientifiques",
      "Très valorisée en entreprise",
      "Mobilité internationale",
    ],
    constraints: [
      "Niveau très exigeant",
      "Nécessite un travail intense et régulier",
    ],
  },

  S3: {
    key: "S3",
    name: "S3 – Mathématiques et Sciences physiques",
    category: "scientifique",
    shortDesc: "Mathématiques pures et physique théorique",
    description:
      "La série S3 est orientée vers les mathématiques et la physique théorique. Idéale pour les profils analytiques qui souhaitent poursuivre en mathématiques appliquées, informatique ou recherche fondamentale.",
    mainSubjects: ["Mathématiques", "Physique", "Informatique", "Philosophie"],
    coefficients: {
      Mathématiques: 8,
      Physique: 5,
      Informatique: 3,
    },
    difficulty: "Très difficile — profil très analytique requis",
    recommendedQualities: [
      "Passion pour les mathématiques",
      "Pensée abstraite",
      "Logique",
      "Patience",
    ],
    higherStudies: [
      "Mathématiques pures",
      "Informatique",
      "Économétrie",
      "Finance quantitative",
    ],
    careers: [
      "Mathématicien",
      "Data scientist",
      "Économiste",
      "Chercheur",
      "Ingénieur en intelligence artificielle",
    ],
    studyDuration: "5 à 8 ans après le Bac",
    employmentProspects: "Excellentes en IA, finance et recherche",
    marketTrends: "L'IA et la data science créent une forte demande pour les profils mathématiques",
    advantages: [
      "Très forte valorisation en IA et tech",
      "Excellentes perspectives à l'international",
    ],
    constraints: [
      "Très exigeant intellectuellement",
      "Peu d'étudiants y accèdent",
    ],
  },

  S4: {
    key: "S4",
    name: "S4 – Sciences mathématiques et sociales",
    category: "scientifique",
    shortDesc: "Mathématiques appliquées et sciences sociales",
    description:
      "La série S4 combine mathématiques et sciences sociales. Elle prépare aux études en économie, gestion, statistiques et sciences sociales quantitatives.",
    mainSubjects: ["Mathématiques", "Sciences sociales", "Économie", "Histoire-Géo"],
    coefficients: {
      Mathématiques: 5,
      "Sciences sociales": 4,
      Économie: 4,
    },
    difficulty: "Moyen à difficile",
    recommendedQualities: [
      "Logique mathématique",
      "Intérêt pour les sociétés",
      "Sens des données",
    ],
    higherStudies: ["Statistiques", "Économie", "Sociologie quantitative", "Démographie"],
    careers: ["Statisticien", "Économiste", "Démographe", "Analyste de données sociales"],
    studyDuration: "3 à 5 ans après le Bac",
    employmentProspects: "Bonnes dans les institutions publiques et les ONG",
    marketTrends: "Les études quantitatives sont de plus en plus demandées",
    advantages: ["Combinaison originale maths/social", "Débouchés variés"],
    constraints: ["Moins connue que S1/S2", "Filières parfois moins visibles"],
  },

  S5: {
    key: "S5",
    name: "S5 – Sciences et Technologies",
    category: "scientifique",
    shortDesc: "Technologie, sciences appliquées et ingénierie",
    description:
      "La série S5 est orientée sciences appliquées et technologie. Elle prépare aux BTS et licences technologiques.",
    mainSubjects: ["Technologie", "Mathématiques", "Physique", "Sciences industrielles"],
    coefficients: {
      Technologie: 6,
      Mathématiques: 4,
      Physique: 4,
    },
    difficulty: "Moyen — plus pratique que théorique",
    recommendedQualities: ["Esprit pratique", "Goût pour les machines", "Méthode"],
    higherStudies: ["BTS Génie industriel", "Licence technologique", "IUT"],
    careers: ["Technicien supérieur", "Contremaître", "Chef de chantier"],
    studyDuration: "2 à 3 ans après le Bac",
    employmentProspects: "Bonnes dans l'industrie et le BTP",
    marketTrends: "Le BTP et l'industrie recrutent au Sénégal",
    advantages: ["Insertion rapide", "Débouchés concrets"],
    constraints: ["Moins valorisée pour les études longues"],
  },

  S1A: {
    key: "S1A",
    name: "S1A – Sciences Agronomiques",
    category: "scientifique",
    shortDesc: "Agriculture, élevage et développement rural",
    description:
      "La série S1A prépare aux métiers agricoles et de développement rural. Très pertinente dans le contexte sénégalais où l'agriculture est un pilier économique.",
    mainSubjects: ["Agronomie", "Biologie", "Mathématiques", "Économie agricole"],
    coefficients: {
      Agronomie: 7,
      Biologie: 4,
      Mathématiques: 3,
    },
    difficulty: "Moyen — nécessite terrain et pratique",
    recommendedQualities: ["Amour de la nature", "Sens pratique", "Intérêt pour le développement"],
    higherStudies: ["École nationale d'agriculture (ENA)", "Agronomie", "Vétérinaire"],
    careers: ["Agronome", "Vétérinaire", "Chargé de développement rural", "Ingénieur agroalimentaire"],
    studyDuration: "3 à 5 ans après le Bac",
    employmentProspects: "Bonnes avec le boom agro-alimentaire sénégalais",
    marketTrends: "L'agriculture de précision et l'agro-business sont en pleine croissance",
    advantages: ["Secteur porteur au Sénégal", "Impact direct sur la sécurité alimentaire"],
    constraints: ["Travail de terrain parfois physique", "Salaires du public souvent bas"],
  },

  S2A: {
    key: "S2A",
    name: "S2A – Sciences et Mathématiques appliquées",
    category: "scientifique",
    shortDesc: "Sciences appliquées et mathématiques pour l'industrie",
    description:
      "La série S2A est une déclinaison appliquée de S2, orientée vers l'industrie et l'ingénierie. Elle prépare aux BTS techniques et aux licences professionnelles.",
    mainSubjects: ["Mathématiques appliquées", "Physique industrielle", "Technologie"],
    coefficients: {
      "Mathématiques appliquées": 6,
      "Physique industrielle": 5,
    },
    difficulty: "Difficile — solides bases en maths requises",
    recommendedQualities: ["Rigueur", "Esprit technique", "Méthode"],
    higherStudies: ["BTS industriel", "Licence pro", "Écoles d'ingénieurs"],
    careers: ["Ingénieur de production", "Technicien supérieur", "Chef de projet technique"],
    studyDuration: "2 à 5 ans après le Bac",
    employmentProspects: "Bonnes dans l'industrie",
    marketTrends: "Industrialisation croissante du Sénégal",
    advantages: ["Insertion professionnelle rapide", "Formation technique solide"],
    constraints: ["Moins connue que S2", "Peu d'établissements la proposent"],
  },

  // ── TECHNIQUES ──────────────────────────────────────────────────────

  T1: {
    key: "T1",
    name: "T1 – Électrotechnique",
    category: "technique",
    shortDesc: "Électricité, électronique et systèmes automatisés",
    description:
      "La série T1 forme des techniciens en électrotechnique et électronique. Très demandée dans l'industrie, le bâtiment et les télécommunications.",
    mainSubjects: ["Électrotechnique", "Mathématiques", "Physique", "Sciences industrielles"],
    coefficients: {
      Électrotechnique: 8,
      Mathématiques: 4,
      Physique: 4,
    },
    difficulty: "Difficile — nécessite rigueur technique",
    recommendedQualities: ["Esprit technique", "Logique", "Dextérité manuelle"],
    higherStudies: ["BTS Électrotechnique", "Licence pro", "École d'ingénieurs"],
    careers: ["Électrotechnicien", "Technicien en automatisme", "Ingénieur électrique"],
    studyDuration: "2 à 5 ans après le Bac",
    employmentProspects: "Excellentes dans l'énergie et les télécoms",
    marketTrends: "Transition énergétique et électrification rurale très actives au Sénégal",
    advantages: ["Forte demande sur le marché", "Salaires attractifs"],
    constraints: ["Travail parfois en milieu industriel contraignant"],
  },

  T2: {
    key: "T2",
    name: "T2 – Sciences et Technologies industrielles",
    category: "technique",
    shortDesc: "Génie mécanique, construction et industrie",
    description:
      "La série T2 forme des techniciens en génie mécanique et construction. Elle prépare au BTS et aux métiers du BTP et de la maintenance industrielle.",
    mainSubjects: ["Génie mécanique", "Mathématiques", "Physique", "Dessin industriel"],
    coefficients: {
      "Génie mécanique": 7,
      Mathématiques: 4,
      Physique: 3,
    },
    difficulty: "Difficile — profil technique et pratique",
    recommendedQualities: ["Esprit mécanique", "Précision", "Résistance physique"],
    higherStudies: ["BTS Génie mécanique", "BTP", "Licence maintenance"],
    careers: ["Mécanicien industriel", "Ingénieur BTP", "Technicien de maintenance"],
    studyDuration: "2 à 5 ans après le Bac",
    employmentProspects: "Très bonnes dans le BTP et l'industrie",
    marketTrends: "Boom de la construction au Sénégal (Plan Sénégal Émergent)",
    advantages: ["Insertion rapide", "Forte demande dans le BTP"],
    constraints: ["Travail physique", "Peu de télétravail possible"],
  },

  F6: {
    key: "F6",
    name: "F6 – Arts et Technologies de Communication",
    category: "technique",
    shortDesc: "Arts graphiques, communication visuelle et design",
    description:
      "La série F6 combine arts, communication et technologies numériques. Elle prépare aux métiers du graphisme, du design et de la communication visuelle.",
    mainSubjects: ["Arts graphiques", "Informatique", "Communication", "Français"],
    coefficients: {
      "Arts graphiques": 7,
      Informatique: 4,
      Communication: 3,
    },
    difficulty: "Accessible — nécessite talent créatif et sens du numérique",
    recommendedQualities: ["Créativité", "Maîtrise des outils numériques", "Sens esthétique"],
    higherStudies: ["BTS Communication visuelle", "Design graphique", "Marketing digital"],
    careers: ["Graphiste", "Web designer", "Community manager", "Directeur artistique"],
    studyDuration: "2 à 3 ans après le Bac",
    employmentProspects: "Bonnes avec le développement du numérique",
    marketTrends: "L'économie numérique sénégalaise crée une forte demande",
    advantages: ["Créativité valorisée", "Débouchés dans le numérique"],
    constraints: ["Concurrence élevée dans le secteur créatif"],
  },

  // ── ÉCONOMIE ET GESTION ──────────────────────────────────────────────

  G: {
    key: "G",
    name: "G – Gestion et Commerce",
    category: "economique",
    shortDesc: "Commerce, comptabilité et gestion d'entreprise",
    description:
      "La série G est axée sur le commerce, la comptabilité et la gestion d'entreprise. Elle prépare aux métiers de la finance, de la gestion et de l'entrepreneuriat. Très populaire et accessible.",
    mainSubjects: ["Gestion", "Comptabilité", "Mathématiques", "Droit commercial", "Économie"],
    coefficients: {
      Gestion: 5,
      Comptabilité: 5,
      Mathématiques: 4,
      "Droit commercial": 3,
      Économie: 3,
    },
    difficulty: "Accessible à moyen",
    recommendedQualities: [
      "Sens des affaires",
      "Rigueur dans les chiffres",
      "Organisation",
      "Esprit pratique",
    ],
    higherStudies: [
      "BTS Comptabilité-Gestion",
      "Licence Gestion",
      "École de Commerce (CESAG, ISM)",
      "Master Finance",
    ],
    careers: [
      "Comptable",
      "Gestionnaire",
      "Commercial",
      "Entrepreneur",
      "Responsable RH",
      "Contrôleur de gestion",
    ],
    studyDuration: "2 à 5 ans après le Bac",
    employmentProspects: "Très bonnes — profil très demandé dans le secteur privé",
    marketTrends: "L'essor des PME sénégalaises crée une forte demande en gestionnaires",
    advantages: [
      "Large accès au marché du travail",
      "Entrepreneuriat facilité",
      "Courte durée d'études possible",
    ],
    constraints: [
      "Concurrence élevée sur le marché",
      "Salaires d'entrée parfois modestes",
    ],
  },

  STEG: {
    key: "STEG",
    name: "STEG – Sciences et Technologies de l'Économie et de la Gestion",
    category: "economique",
    shortDesc: "Économie, gestion et technologies de l'information",
    description:
      "La série STEG est une version modernisée de la série G qui intègre les technologies numériques. Elle prépare aux métiers de la gestion numérique, du marketing digital et de la finance moderne.",
    mainSubjects: ["Économie-gestion", "Informatique", "Mathématiques", "Marketing", "Droit"],
    coefficients: {
      "Économie-gestion": 5,
      Informatique: 4,
      Mathématiques: 4,
      Marketing: 3,
      Droit: 2,
    },
    difficulty: "Moyen",
    recommendedQualities: [
      "Sens du numérique",
      "Esprit commercial",
      "Organisation",
      "Curiosité technologique",
    ],
    higherStudies: [
      "Licence Gestion",
      "BTS Manager commercial",
      "École de Commerce",
      "Master Marketing digital",
    ],
    careers: [
      "Manager",
      "Marketing digital",
      "E-commerce",
      "Consultant en SI",
      "Entrepreneur numérique",
    ],
    studyDuration: "2 à 5 ans après le Bac",
    employmentProspects: "Excellentes dans le secteur privé et le numérique",
    marketTrends: "La transformation digitale des entreprises sénégalaises crée une forte demande",
    advantages: [
      "Alliance gestion + numérique",
      "Très recherchée par les entreprises modernes",
      "Entrepreneuriat digital accessible",
    ],
    constraints: [
      "Exige une mise à jour permanente des compétences numériques",
    ],
  },
};
