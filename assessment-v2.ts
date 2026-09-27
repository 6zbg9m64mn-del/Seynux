// ── V2 Extended Orientation Assessment ─────────────────────────────────

export type V2ExtendedData = {
  // Onboarding
  age?: number;
  level?: string;

  // Section 1 – Centres d'intérêt
  freeTimeInterests: string[];
  problemTypeInterest: string;
  frequentThoughts: string;

  // Section 2 – Valeurs
  coreValues: string[];
  valuesJustification: string;

  // Section 3 – Personnalité
  groupRole: string;
  workStyle: string;

  // Section 4 – Modèles et sources d'inspiration
  inspiringPeople: string[];
  inspiringExplanation: string;

  // Section 5 – Histoire personnelle
  proudMoment: string;
  subjectExcited: string;
  discouragingSubject: string;
  influentialEvent: string;

  // Section 6 – Projet de vie
  dreamJob: string;
  adultLifeAttraction: string;
  conferenceChoice: string;
  idealLife: string;

  // Section 7 – Environnement familial
  parentInfluence: string;
  familyProfession: string;
  familySupport: string;

  // Section 8 – Environnement culturel
  valuedProfessions: string;
  culturalInfluence: string;
  socialExpectations: string;

  // Section 9 – Réalités économiques
  financialInfluence: string;
  studyDuration: string;

  // Section 10 – Bien-être scolaire
  wellbeingIssues: string[];
};

export type SectionId =
  | "interests"
  | "values"
  | "personality"
  | "models"
  | "history"
  | "lifeproject"
  | "family"
  | "culture"
  | "economy"
  | "wellbeing";

export const SECTIONS: Array<{
  id: SectionId;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  gradient: string;
}> = [
  {
    id: "interests",
    title: "Centres d'intérêt",
    subtitle: "Ce qui attire naturellement ton attention",
    emoji: "🔍",
    color: "text-blue-400",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "values",
    title: "Tes valeurs",
    subtitle: "Ce qui compte le plus pour toi",
    emoji: "⚖️",
    color: "text-violet-400",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    id: "personality",
    title: "Ta personnalité",
    subtitle: "Comment tu fonctionnes naturellement",
    emoji: "🧬",
    color: "text-amber-400",
    gradient: "from-amber-500 to-yellow-400",
  },
  {
    id: "models",
    title: "Tes modèles",
    subtitle: "Les personnes qui t'inspirent",
    emoji: "⭐",
    color: "text-rose-400",
    gradient: "from-rose-500 to-pink-400",
  },
  {
    id: "history",
    title: "Ton histoire",
    subtitle: "Ton parcours et tes expériences",
    emoji: "📖",
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    id: "lifeproject",
    title: "Ton projet de vie",
    subtitle: "La vie que tu veux construire",
    emoji: "🚀",
    color: "text-sky-400",
    gradient: "from-sky-500 to-blue-400",
  },
  {
    id: "family",
    title: "Ta famille",
    subtitle: "L'influence de ton environnement familial",
    emoji: "🏠",
    color: "text-orange-400",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    id: "culture",
    title: "Ton environnement culturel",
    subtitle: "Le contexte social qui t'entoure",
    emoji: "🌍",
    color: "text-teal-400",
    gradient: "from-teal-500 to-cyan-400",
  },
  {
    id: "economy",
    title: "Réalités économiques",
    subtitle: "Tes contraintes et possibilités",
    emoji: "💡",
    color: "text-lime-400",
    gradient: "from-lime-500 to-green-400",
  },
  {
    id: "wellbeing",
    title: "Ton bien-être",
    subtitle: "Comment tu te sens dans ta scolarité",
    emoji: "💙",
    color: "text-indigo-400",
    gradient: "from-indigo-500 to-violet-400",
  },
];

// ── Options data ─────────────────────────────────────────────────────────

export const FREE_TIME_INTERESTS = [
  "Sciences", "Mathématiques", "Physique", "Informatique",
  "Intelligence artificielle", "Psychologie", "Philosophie",
  "Religion et spiritualité", "Histoire", "Politique", "Société",
  "Entrepreneuriat", "Économie", "Commerce", "Art", "Musique",
  "Cinéma", "Écriture", "Sport", "Autre",
];

export const PROBLEM_TYPES = [
  "Résoudre un problème scientifique",
  "Comprendre les comportements humains",
  "Comprendre le fonctionnement d'une société",
  "Créer une entreprise",
  "Imaginer quelque chose de nouveau",
  "Résoudre un problème technique",
  "Défendre une cause",
  "Autre",
];

export const CORE_VALUES = [
  "Justice", "Liberté", "Sécurité", "Vérité",
  "Réussite financière", "Utilité sociale", "Créativité",
  "Spiritualité", "Influence", "Prestige", "Famille",
];

export const GROUP_ROLES = [
  "Celui qui dirige",
  "Celui qui explique",
  "Celui qui analyse",
  "Celui qui crée",
  "Celui qui exécute",
  "Celui qui rassemble les autres",
];

export const WORK_STYLES = [
  "Travailler seul",
  "Travailler en équipe",
  "Les deux selon les situations",
];

export const INSPIRING_PEOPLE = [
  "Scientifiques", "Entrepreneurs", "Philosophes", "Juges",
  "Psychologues", "Enseignants", "Écrivains", "Artistes",
  "Sportifs", "Chercheurs", "Leaders politiques",
];

export const ADULT_LIFE_ATTRACTIONS = [
  "Découvrir les lois de la nature",
  "Construire des technologies",
  "Comprendre les êtres humains",
  "Rendre la société plus juste",
  "Créer une entreprise",
  "Créer des œuvres ou des idées",
];

export const CONFERENCE_CHOICES = [
  "Intelligence artificielle",
  "Psychologie et émotions humaines",
  "Justice et droit",
  "Entrepreneuriat",
  "Philosophie",
  "Univers et sciences",
];

export const PARENT_INFLUENCE_OPTIONS = [
  "Fortement",
  "Modérément",
  "Faiblement",
  "Pas du tout",
];

export const FAMILY_SUPPORT_OPTIONS = [
  "Oui, pleinement",
  "Partiellement",
  "Non",
];

export const FINANCIAL_INFLUENCE_OPTIONS = [
  "Beaucoup",
  "Un peu",
  "Très peu",
  "Pas du tout",
];

export const STUDY_DURATION_OPTIONS = [
  "2 à 3 ans",
  "5 ans",
  "8 ans ou plus",
];

export const WELLBEING_ISSUES = [
  "Stressé(e)",
  "Découragé(e)",
  "Anxieux/Anxieuse",
  "Démotivé(e)",
  "Fatigué(e)",
];

// Threshold above which a wellbeing warning is shown
export const WELLBEING_WARNING_THRESHOLD = 3;

// ── Default empty V2 data ────────────────────────────────────────────────

export function createEmptyV2Data(): V2ExtendedData {
  return {
    freeTimeInterests: [],
    problemTypeInterest: "",
    frequentThoughts: "",
    coreValues: [],
    valuesJustification: "",
    groupRole: "",
    workStyle: "",
    inspiringPeople: [],
    inspiringExplanation: "",
    proudMoment: "",
    subjectExcited: "",
    discouragingSubject: "",
    influentialEvent: "",
    dreamJob: "",
    adultLifeAttraction: "",
    conferenceChoice: "",
    idealLife: "",
    parentInfluence: "",
    familyProfession: "",
    familySupport: "",
    valuedProfessions: "",
    culturalInfluence: "",
    socialExpectations: "",
    financialInfluence: "",
    studyDuration: "",
    wellbeingIssues: [],
  };
}

// ── Enriched V2 Orientation Result ───────────────────────────────────────

export type CareerMatch = {
  title: string;
  domain: string;
  alignment: "fort" | "moyen" | "possible";
  reason: string;
};

export type RiskFactor = {
  title: string;
  description: string;
  level: "elevé" | "modéré" | "faible";
};

export type Strength = {
  title: string;
  description: string;
  icon: string;
};

export type ImprovementAxis = {
  title: string;
  description: string;
  action: string;
};

export type MonthlyGoal = {
  month: string;
  goal: string;
  type: "exploration" | "renforcement" | "social" | "bien-etre" | "orientation";
};

export type FamilyCulturalFactor = {
  type: "famille" | "culture" | "economie";
  label: string;
  impact: "positif" | "neutre" | "attention";
  description: string;
};

export type V2OrientationResult = {
  // Core
  primarySeries: string[];
  alternativeSeries: string[];
  economicSeries: string[];
  dominantValues: string[];
  dominantInterests: string[];
  personalityType: string;
  personalityDescription: string;
  lifeProjectAlignment: string;
  wellbeingAlert: boolean;
  coherenceScore: number; // 0-100
  summary: string;

  // Enriched 15-point report
  strengths: Strength[];
  improvementAxes: ImprovementAxis[];
  careerMatches: CareerMatch[];
  riskFactors: RiskFactor[];
  monthlyPlan: MonthlyGoal[];
  familyCulturalFactors: FamilyCulturalFactor[];
  psychologicalProfile: {
    dominantTrait: string;
    cognitiveStyle: string;
    motivationDriver: string;
    socialStyle: string;
    resilienceNote: string;
  };
  interestClusters: {
    cluster: string;
    interests: string[];
    relatedCareers: string[];
    color: string;
  }[];
  lifeProjectNote: string;
  coherenceInsights: string[];
};

// ── V2 → Dimension Scores mapping ────────────────────────────────────────
// Maps V2ExtendedData responses to approximate cognition/discipline/emotion/motivation
// scores on a 0-15 scale (compatible with V1 schema).

export function computeV2DimensionScores(data: V2ExtendedData): {
  cognitionScore: number;
  disciplineScore: number;
  emotionScore: number;
  motivationScore: number;
} {
  // Cognition: interest in analytical/scientific domains + reflective thought
  let cog = 5;
  const cogInterests = ["Sciences", "Mathématiques", "Physique", "Informatique", "Intelligence artificielle", "Philosophie"];
  cog += data.freeTimeInterests.filter((i) => cogInterests.includes(i)).length * 1.5;
  if (data.problemTypeInterest === "Résoudre un problème scientifique" || data.problemTypeInterest === "Résoudre un problème technique") cog += 2;
  if (data.conferenceChoice === "Univers et sciences") cog += 1;
  cog = Math.min(15, Math.round(cog));

  // Discipline: work style, self-structure signals
  let dis = 5;
  if (data.workStyle === "Travailler seul") dis += 2;
  if (data.workStyle === "Les deux selon les situations") dis += 1;
  if (data.groupRole === "Celui qui exécute") dis += 2;
  if (data.groupRole === "Celui qui analyse") dis += 1;
  if (data.financialInfluence === "Très peu" || data.financialInfluence === "Pas du tout") dis += 1;
  dis = Math.min(15, Math.round(dis));

  // Emotion: wellbeing issues (reverse scored) + family support
  let emo = 12;
  emo -= data.wellbeingIssues.length * 2;
  if (data.familySupport === "Oui, pleinement") emo += 1;
  if (data.familySupport === "Non") emo -= 2;
  if (data.parentInfluence === "Pas du tout") emo += 1;
  emo = Math.max(1, Math.min(15, Math.round(emo)));

  // Motivation: values, life project clarity, inspiring people
  let mot = 5;
  if (data.dreamJob && data.dreamJob.length > 3) mot += 2;
  if (data.idealLife && data.idealLife.length > 10) mot += 1;
  mot += Math.min(3, data.coreValues.length * 0.5);
  mot += Math.min(2, data.inspiringPeople.length * 0.5);
  if (data.adultLifeAttraction && data.adultLifeAttraction !== "") mot += 1;
  mot = Math.min(15, Math.round(mot));

  return { cognitionScore: cog, disciplineScore: dis, emotionScore: emo, motivationScore: mot };
}

// ── Main compute function ─────────────────────────────────────────────────

export function computeV2Orientation(data: V2ExtendedData): V2OrientationResult {
  const wellbeingAlert = data.wellbeingIssues.length >= WELLBEING_WARNING_THRESHOLD;
  const personalityType = determinePersonalityType(data.groupRole, data.workStyle);
  const personalityDescription = buildPersonalityDescription(data);
  const dominantInterests = data.freeTimeInterests.slice(0, 3);
  const dominantValues = data.coreValues.slice(0, 3);
  const { primary, alternative, economic } = recommendSeries(data);
  const lifeProjectAlignment = computeLifeProjectAlignment(data);
  const coherenceScore = computeCoherence(data);
  const summary = buildSummary(data, personalityType, primary);

  // Enriched
  const strengths = buildStrengths(data, personalityType);
  const improvementAxes = buildImprovementAxes(data);
  const careerMatches = buildCareerMatches(data);
  const riskFactors = buildRiskFactors(data);
  const monthlyPlan = buildMonthlyPlan(data, primary);
  const familyCulturalFactors = buildFamilyCulturalFactors(data);
  const psychologicalProfile = buildPsychologicalProfile(data, personalityType);
  const interestClusters = buildInterestClusters(data);
  const lifeProjectNote = buildLifeProjectNote(data);
  const coherenceInsights = buildCoherenceInsights(data, coherenceScore);

  return {
    primarySeries: primary,
    alternativeSeries: alternative,
    economicSeries: economic,
    dominantValues,
    dominantInterests,
    personalityType,
    personalityDescription,
    lifeProjectAlignment,
    wellbeingAlert,
    coherenceScore,
    summary,
    strengths,
    improvementAxes,
    careerMatches,
    riskFactors,
    monthlyPlan,
    familyCulturalFactors,
    psychologicalProfile,
    interestClusters,
    lifeProjectNote,
    coherenceInsights,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────

function determinePersonalityType(groupRole: string, workStyle: string): string {
  if (groupRole === "Celui qui dirige" || groupRole === "Celui qui rassemble les autres") {
    return "Leader";
  }
  if (groupRole === "Celui qui crée") return "Créatif";
  if (groupRole === "Celui qui analyse") return "Analytique";
  if (groupRole === "Celui qui explique") return "Pedagogue";
  if (groupRole === "Celui qui exécute") {
    return workStyle === "Travailler seul" ? "Autonome" : "Operationnel";
  }
  return "Polyvalent";
}

function buildPersonalityDescription(data: V2ExtendedData): string {
  const role = data.groupRole;
  const style = data.workStyle;

  const roleDescriptions: Record<string, string> = {
    "Celui qui dirige": "Tu as un naturel pour prendre des décisions et emmener les autres vers un objectif commun.",
    "Celui qui rassemble les autres": "Tu as le don de créer des liens et de fédérer autour d'une cause ou d'un projet.",
    "Celui qui crée": "Tu penses en dehors des cadres établis — la créativité est ton mode d'expression naturel.",
    "Celui qui analyse": "Tu trouves la satisfaction dans la compréhension profonde des choses avant d'agir.",
    "Celui qui explique": "Tu as une capacité naturelle à simplifier le complexe et à transmettre tes connaissances.",
    "Celui qui exécute": "Tu valorises l'action concrète et la réalisation tangible des projets.",
  };

  const styleNote = style === "Travailler seul"
    ? " Tu fonctionnes mieux dans la concentration individuelle."
    : style === "Travailler en équipe"
      ? " La collaboration booste ton efficacité."
      : " Tu sais alterner entre travail solo et équipe selon les besoins.";

  return (roleDescriptions[role] ?? "Tu combines plusieurs traits de personnalité.") + styleNote;
}

function recommendSeries(data: V2ExtendedData): {
  primary: string[];
  alternative: string[];
  economic: string[];
} {
  const interests = new Set(data.freeTimeInterests);
  const values = new Set(data.coreValues);
  const attraction = data.adultLifeAttraction;
  const conference = data.conferenceChoice;
  const duration = data.studyDuration;

  if (data.level === "etudiant") {
    return { primary: [], alternative: [], economic: [] };
  }

  const scientificInterests = interests.has("Sciences") || interests.has("Mathématiques") ||
    interests.has("Physique") || interests.has("Informatique") ||
    interests.has("Intelligence artificielle");

  const humanInterests = interests.has("Psychologie") || interests.has("Philosophie") ||
    interests.has("Histoire") || interests.has("Politique") || interests.has("Société");

  const economicInterests = interests.has("Entrepreneuriat") || interests.has("Économie") ||
    interests.has("Commerce");

  const artInterests = interests.has("Art") || interests.has("Musique") ||
    interests.has("Cinéma") || interests.has("Écriture");

  const wantsScience = attraction === "Découvrir les lois de la nature" ||
    attraction === "Construire des technologies" ||
    conference === "Intelligence artificielle" ||
    conference === "Univers et sciences";

  const wantsHuman = attraction === "Comprendre les êtres humains" ||
    attraction === "Rendre la société plus juste" ||
    conference === "Psychologie et émotions humaines" ||
    conference === "Justice et droit";

  const wantsBusiness = attraction === "Créer une entreprise" ||
    conference === "Entrepreneuriat";

  const wantsCreative = attraction === "Créer des œuvres ou des idées";

  const shortStudy = duration === "2 à 3 ans";
  const longStudy = duration === "8 ans ou plus";

  let primary: string[] = [];
  let alternative: string[] = [];
  let economic: string[] = [];

  if (scientificInterests && wantsScience) {
    primary = ["S2", "S1"];
    alternative = ["S3", "S4"];
    economic = shortStudy ? ["T2", "T1"] : ["S2A"];
  } else if (scientificInterests) {
    primary = ["S1", "S2"];
    alternative = ["S3", "S1A"];
    economic = shortStudy ? ["T1", "T2"] : ["S2"];
  } else if (humanInterests && wantsHuman) {
    primary = ["L2", "L1a"];
    alternative = ["L1b", "L'1"];
    economic = shortStudy ? ["LA", "G"] : ["L2"];
  } else if (humanInterests) {
    primary = ["L2", "L1b"];
    alternative = ["LA", "L'1"];
    economic = ["LA"];
  } else if (economicInterests && wantsBusiness) {
    primary = ["G", "STEG"];
    alternative = ["L2", "S2"];
    economic = shortStudy ? ["G"] : ["STEG"];
  } else if (economicInterests) {
    primary = ["G", "STEG"];
    alternative = ["L2", "S3"];
    economic = ["G"];
  } else if (artInterests && wantsCreative) {
    primary = ["L2", "LA"];
    alternative = ["L1a", "L1b"];
    economic = ["LA"];
  } else if (values.has("Justice") && wantsHuman) {
    primary = ["L2", "S5"];
    alternative = ["L1b", "G"];
    economic = ["L2"];
  } else {
    primary = ["S2", "L2"];
    alternative = ["G", "L1a"];
    economic = longStudy ? ["S2", "L2"] : ["G", "T1"];
  }

  if (longStudy && !primary.includes("S2") && !primary.includes("L2")) {
    alternative = [...alternative, "S2"];
  }

  return { primary, alternative, economic };
}

function computeLifeProjectAlignment(data: V2ExtendedData): string {
  const attraction = data.adultLifeAttraction;
  const map: Record<string, string> = {
    "Découvrir les lois de la nature": "Chercheur / Scientifique",
    "Construire des technologies": "Ingénieur / Développeur",
    "Comprendre les êtres humains": "Psychologue / Sociologue",
    "Rendre la société plus juste": "Juriste / Avocat / Diplomate",
    "Créer une entreprise": "Entrepreneur / Manager",
    "Créer des œuvres ou des idées": "Artiste / Écrivain / Designer",
  };
  return map[attraction] ?? "Profil polyvalent";
}

function computeCoherence(data: V2ExtendedData): number {
  let score = 50;

  const interests = new Set(data.freeTimeInterests);
  const attraction = data.adultLifeAttraction;
  const values = new Set(data.coreValues);

  if (attraction === "Découvrir les lois de la nature" &&
    (interests.has("Sciences") || interests.has("Physique"))) score += 10;
  if (attraction === "Construire des technologies" &&
    (interests.has("Informatique") || interests.has("Intelligence artificielle"))) score += 10;
  if (attraction === "Comprendre les êtres humains" &&
    (interests.has("Psychologie") || interests.has("Philosophie"))) score += 10;
  if (attraction === "Rendre la société plus juste" &&
    (interests.has("Politique") || interests.has("Histoire"))) score += 10;
  if (attraction === "Créer une entreprise" &&
    (interests.has("Entrepreneuriat") || interests.has("Économie"))) score += 10;
  if (attraction === "Créer des œuvres ou des idées" &&
    (interests.has("Art") || interests.has("Musique") || interests.has("Écriture"))) score += 10;

  if (data.conferenceChoice === "Justice et droit" && values.has("Justice")) score += 8;
  if (data.conferenceChoice === "Entrepreneuriat" && values.has("Réussite financière")) score += 8;

  const socialRoles = ["Celui qui dirige", "Celui qui rassemble les autres", "Celui qui explique"];
  if (socialRoles.includes(data.groupRole) && data.workStyle !== "Travailler seul") score += 5;

  if (data.dreamJob.trim().length > 10) score += 5;
  if (data.coreValues.length >= 3) score += 3;
  if (data.freeTimeInterests.length >= 3) score += 3;
  if (data.inspiringPeople.length >= 2) score += 2;

  if (data.studyDuration === "8 ans ou plus" && data.financialInfluence === "Beaucoup") score -= 15;
  if (data.wellbeingIssues.length >= 4) score -= 8;

  return Math.min(100, Math.max(0, score));
}

function buildSummary(data: V2ExtendedData, personalityType: string, primarySeries: string[]): string {
  const interest = data.freeTimeInterests[0] ?? "non précisé";
  const value = data.coreValues[0] ?? "non précisée";

  if (data.level === "etudiant") {
    return `Profil ${personalityType.toLowerCase()} avec un fort attrait pour ${interest.toLowerCase()} ` +
      `et une valeur centrale : ${value.toLowerCase()}. ` +
      "Explore les formations universitaires qui correspondent à tes aspirations et consolide tes méthodes académiques.";
  }

  const series = primarySeries[0] ?? "à déterminer";
  return `Profil ${personalityType.toLowerCase()} avec un fort attrait pour ${interest.toLowerCase()} ` +
    `et une valeur centrale : ${value.toLowerCase()}. ` +
    `La série ${series} semble la plus adaptée à ton profil et tes aspirations.`;
}

// ── Enriched builders ─────────────────────────────────────────────────────

function buildStrengths(data: V2ExtendedData, personalityType: string): Strength[] {
  const strengths: Strength[] = [];

  // Based on personality type
  if (personalityType === "Leader") {
    strengths.push({
      title: "Sens du leadership",
      description: "Tu as naturellement tendance à prendre les initiatives et guider les autres vers un objectif.",
      icon: "crown",
    });
  }
  if (personalityType === "Analytique") {
    strengths.push({
      title: "Pensée analytique",
      description: "Tu décomposes les problèmes complexes et cherches à comprendre avant d'agir.",
      icon: "brain",
    });
  }
  if (personalityType === "Pedagogue") {
    strengths.push({
      title: "Capacité de transmission",
      description: "Tu sais expliquer et partager tes connaissances avec clarté et patience.",
      icon: "book-open",
    });
  }
  if (personalityType === "Créatif") {
    strengths.push({
      title: "Créativité et originalité",
      description: "Tu vois les choses différemment et proposes des solutions originales.",
      icon: "sparkles",
    });
  }

  // Based on values
  if (data.coreValues.includes("Utilité sociale")) {
    strengths.push({
      title: "Sens du service",
      description: "Tu es motivé(e) par l'impact positif sur les autres, ce qui est un moteur puissant.",
      icon: "heart",
    });
  }
  if (data.coreValues.includes("Vérité") || data.coreValues.includes("Justice")) {
    strengths.push({
      title: "Intégrité et éthique",
      description: "Tes valeurs morales fortes guident tes choix et inspirent la confiance.",
      icon: "shield",
    });
  }
  if (data.coreValues.includes("Créativité")) {
    strengths.push({
      title: "Pensée innovante",
      description: "Tu remets en question l'existant et imagines des approches nouvelles.",
      icon: "lightbulb",
    });
  }

  // Based on inspiring people
  if (data.inspiringPeople.includes("Chercheurs") || data.inspiringPeople.includes("Scientifiques")) {
    strengths.push({
      title: "Curiosité intellectuelle",
      description: "Tu es attiré(e) par la compréhension profonde des phénomènes — un atout majeur pour les études longues.",
      icon: "microscope",
    });
  }

  // Based on interests
  if (data.freeTimeInterests.length >= 4) {
    strengths.push({
      title: "Ouverture d'esprit",
      description: "Tes nombreux centres d'intérêt témoignent d'une curiosité large et d'une capacité d'adaptation.",
      icon: "globe",
    });
  }

  // Dream job defined
  if (data.dreamJob.length > 5) {
    strengths.push({
      title: "Vision claire de l'avenir",
      description: `Avoir un objectif concret (${data.dreamJob.slice(0, 30)}…) est un avantage considérable pour rester motivé(e).`,
      icon: "target",
    });
  }

  return strengths.slice(0, 5);
}

function buildImprovementAxes(data: V2ExtendedData): ImprovementAxis[] {
  const axes: ImprovementAxis[] = [];

  // Wellbeing issues
  if (data.wellbeingIssues.length >= 2) {
    axes.push({
      title: "Gestion du stress scolaire",
      description: "Tu as signalé plusieurs indicateurs de mal-être. Travailler cet axe est prioritaire.",
      action: "Essaie des techniques de respiration, le sport régulier, ou parle à un adulte de confiance.",
    });
  }

  // Discouraging subject
  if (data.discouragingSubject) {
    axes.push({
      title: `Renforcer en ${data.discouragingSubject}`,
      description: "Cette matière a semé le découragement — mais elle peut devenir un point fort.",
      action: "Consacre 20 min/jour à cette matière. Cherche un tuteur ou des ressources en ligne.",
    });
  }

  // Financial vs long study
  if (data.studyDuration === "8 ans ou plus" && data.financialInfluence === "Beaucoup") {
    axes.push({
      title: "Planification financière",
      description: "Tes ambitions d'études longues sont en tension avec tes contraintes financières.",
      action: "Renseigne-toi sur les bourses du MFPAA, les prêts étudiants et les formations en alternance.",
    });
  }

  // Weak family support
  if (data.familySupport === "Non") {
    axes.push({
      title: "Construire ton propre soutien",
      description: "L'absence de soutien familial peut peser lourd. Tu dois trouver d'autres ancrages.",
      action: "Crée ton réseau : mentors, associations, groupes d'élèves motivés, professeurs bienveillants.",
    });
  }

  // Low interest diversity
  if (data.freeTimeInterests.length <= 1) {
    axes.push({
      title: "Élargir tes centres d'intérêt",
      description: "Peu de centres d'intérêt déclarés — il y a peut-être des talents à découvrir.",
      action: "Explore au moins une nouvelle activité (club, lecture, podcast) chaque mois.",
    });
  }

  // No inspiring models
  if (data.inspiringPeople.length === 0) {
    axes.push({
      title: "Trouver des modèles inspirants",
      description: "Les modèles positifs accelerent le développement personnel et professionnel.",
      action: "Lis des biographies ou suis des personnalités qui t'attirent sur les réseaux.",
    });
  }

  // Work alone + leadership role = contradiction
  if (data.groupRole === "Celui qui dirige" && data.workStyle === "Travailler seul") {
    axes.push({
      title: "Développer tes compétences collaboratives",
      description: "Tu as un profil de leader mais préfères le travail solo — apprendre à déléguer est clé.",
      action: "Rejoins un club ou participe à des projets collectifs pour pratiquer la gestion d'équipe.",
    });
  }

  return axes.slice(0, 4);
}

function buildCareerMatches(data: V2ExtendedData): CareerMatch[] {
  const careers: CareerMatch[] = [];
  const interests = new Set(data.freeTimeInterests);
  const values = new Set(data.coreValues);
  const attraction = data.adultLifeAttraction;

  const push = (
    title: string,
    domain: string,
    alignment: CareerMatch["alignment"],
    reason: string,
  ) => careers.push({ title, domain, alignment, reason });

  // Science / tech
  if (interests.has("Mathématiques") || interests.has("Physique")) {
    push("Ingénieur civil / BTP", "Sciences appliquées", "fort",
      "Tes intérêts pour les sciences exactes s'alignent parfaitement avec l'ingénierie.");
  }
  if (interests.has("Informatique") || interests.has("Intelligence artificielle")) {
    push("Développeur / Ingénieur logiciel", "Technologies", "fort",
      "L'informatique et l'IA sont parmi tes centres d'intérêt principaux.");
  }
  if (interests.has("Sciences") && attraction === "Découvrir les lois de la nature") {
    push("Chercheur scientifique", "Recherche", "fort",
      "Curiosité scientifique + attrait pour la découverte = profil chercheur.");
  }

  // Human / social
  if (interests.has("Psychologie")) {
    push("Psychologue / Conseiller", "Sciences humaines", "fort",
      "Ton intérêt pour la psychologie indique une vocation naturelle vers l'humain.");
  }
  if (interests.has("Politique") || interests.has("Société")) {
    push("Politologue / Diplomate", "Sciences sociales", "fort",
      "Tes intérêts pour la politique et la société s'alignent avec les carrières diplomatiques.");
  }
  if (values.has("Justice") || interests.has("Philosophie")) {
    push("Juriste / Avocat", "Droit", "fort",
      "Ta valeur de justice et ta pensée critique sont des atouts majeurs en droit.");
  }

  // Business
  if (interests.has("Entrepreneuriat") || values.has("Réussite financière")) {
    push("Entrepreneur / Directeur d'entreprise", "Business", "fort",
      "L'esprit entrepreneurial combiné à tes ambitions est un profil idéal pour les affaires.");
  }
  if (interests.has("Économie") || interests.has("Commerce")) {
    push("Économiste / Analyste financier", "Finance", "fort",
      "Tes intérêts économiques s'orientent naturellement vers la finance ou la gestion.");
  }

  // Teaching / communication
  if (data.groupRole === "Celui qui explique" || interests.has("Écriture")) {
    push("Enseignant / Formateur", "Education", "fort",
      "Ta capacité à expliquer et transmettre est un don précieux pour l'éducation.");
  }
  if (interests.has("Écriture") || interests.has("Cinéma")) {
    push("Journaliste / Écrivain", "Médias et communication", "moyen",
      "Ton attrait pour l'expression écrite ou visuelle peut mener vers les médias.");
  }

  // Art / culture
  if (interests.has("Art") || interests.has("Musique")) {
    push("Artiste / Designer", "Culture et arts", "moyen",
      "Ta sensibilité créative peut s'épanouir dans le design, les arts ou la communication visuelle.");
  }

  // Healthcare
  if (interests.has("Sciences") && values.has("Utilité sociale")) {
    push("Médecin / Pharmacien", "Santé", "moyen",
      "Combiner sciences et utilité sociale pointe vers les métiers de la santé.");
  }

  // Dream job
  if (data.dreamJob && careers.length < 3) {
    push(data.dreamJob.slice(0, 40), "Ambition personnelle", "fort",
      "C'est l'objectif que tu as toi-même défini — le point de départ de tout.");
  }

  return careers.slice(0, 6);
}

function buildRiskFactors(data: V2ExtendedData): RiskFactor[] {
  const risks: RiskFactor[] = [];

  // Wellbeing
  const wellbeingCount = data.wellbeingIssues.length;
  if (wellbeingCount >= 4) {
    risks.push({
      title: "Épuisement scolaire",
      description: `Tu as signalé ${wellbeingCount} indicateurs de détresse. Sans prise en charge, cela peut impacter durablement tes études.`,
      level: "elevé",
    });
  } else if (wellbeingCount >= 2) {
    risks.push({
      title: "Stress scolaire",
      description: "Le stress et l'anxiété peuvent affecter tes performances et ta motivation si tu ne les gères pas.",
      level: "modéré",
    });
  }

  // Financial tension
  if (data.studyDuration === "8 ans ou plus" && data.financialInfluence === "Beaucoup") {
    risks.push({
      title: "Risque de décrochage financier",
      description: "Des études très longues coûtent cher. Sans plan de financement, le risque d'arrêt prématuré est réel.",
      level: "elevé",
    });
  }

  // No family support
  if (data.familySupport === "Non") {
    risks.push({
      title: "Manque de soutien familial",
      description: "L'absence d'appui à la maison peut créer une solitude difficile à gérer pendant les études.",
      level: "modéré",
    });
  }

  // Discouraging subject in key domain
  const keyScience = ["Mathématiques", "Physique", "Sciences"];
  if (keyScience.includes(data.discouragingSubject) &&
    (data.adultLifeAttraction === "Découvrir les lois de la nature" ||
      data.adultLifeAttraction === "Construire des technologies")) {
    risks.push({
      title: "Friction entre ambitions et matières clés",
      description: `Tu vises des filières scientifiques mais ${data.discouragingSubject} te décourage — c'est un point à travailler en priorité.`,
      level: "elevé",
    });
  }

  // Strong parental influence
  if (data.parentInfluence === "Fortement") {
    risks.push({
      title: "Pression parentale",
      description: "Une forte influence parentale peut mener à des choix d'orientation qui ne correspondent pas à tes aspirations profondes.",
      level: "modéré",
    });
  }

  // Vague life project
  if (!data.dreamJob && !data.adultLifeAttraction) {
    risks.push({
      title: "Manque de cap",
      description: "Sans direction claire, il est difficile de se motiver sur la durée.",
      level: "faible",
    });
  }

  return risks.slice(0, 4);
}

function buildMonthlyPlan(data: V2ExtendedData, primarySeries: string[]): MonthlyGoal[] {
  const plan: MonthlyGoal[] = [];
  const isStudent = data.level === "etudiant";
  const serie = primarySeries[0] ?? "ta série";

  plan.push({
    month: "Mois 1–2",
    goal: isStudent
      ? "Explore les formations universitaires liées à tes aspirations et échange avec des étudiants ou des responsables de formation."
      : `Renseigne-toi sur la série ${serie} : parle à des élèves qui la suivent, visite des lycées.`,
    type: "exploration",
  });

  if (data.discouragingSubject) {
    plan.push({
      month: "Mois 1–3",
      goal: `Renforce en ${data.discouragingSubject} : 20 min/jour, exercices réguliers, cherche un soutien si nécessaire.`,
      type: "renforcement",
    });
  }

  if (data.wellbeingIssues.length >= 2) {
    plan.push({
      month: "Mois 2",
      goal: "Prends soin de ton bien-être : sport régulier, sommeil suffisant, parle à quelqu'un si tu te sens dépassé(e).",
      type: "bien-etre",
    });
  }

  if (data.dreamJob) {
    plan.push({
      month: "Mois 3–4",
      goal: `Explore le métier de ${data.dreamJob.slice(0, 30)} : recherche les formations requises et rencontre un professionnel.`,
      type: "orientation",
    });
  }

  plan.push({
    month: "Mois 4–6",
    goal: "Rejoins un club, une association ou un groupe d'élèves qui partagent tes intérêts — le réseau se construit tôt.",
    type: "social",
  });

  if (data.financialInfluence === "Beaucoup") {
    plan.push({
      month: "Mois 5–6",
      goal: "Recherche les bourses disponibles : MFPAA, bourses universitaires, fondations privées, programmes d'excellence.",
      type: "orientation",
    });
  }

  plan.push({
    month: "Mois 7–9",
    goal: isStudent
      ? "Renforce tes méthodes académiques : organisation, prise de notes, lecture critique et préparation des évaluations."
      : `Approfondis les matières clés de la série ${serie} — commence à avoir de l'avance sur le programme.`,
    type: "renforcement",
  });

  plan.push({
    month: "Mois 10–12",
    goal: "Fais le bilan de l'année : qu'as-tu appris sur toi ? Tes objectifs ont-ils évolué ? Ajuste ton plan pour l'année suivante.",
    type: "orientation",
  });

  return plan;
}

function buildFamilyCulturalFactors(data: V2ExtendedData): FamilyCulturalFactor[] {
  const factors: FamilyCulturalFactor[] = [];

  // Family support
  if (data.familySupport === "Oui, pleinement") {
    factors.push({
      type: "famille",
      label: "Soutien familial",
      impact: "positif",
      description: "Ta famille te soutient pleinement — c'est une ressource précieuse pour traverser les moments difficiles.",
    });
  } else if (data.familySupport === "Partiellement") {
    factors.push({
      type: "famille",
      label: "Soutien partiel",
      impact: "neutre",
      description: "Ta famille te soutient en partie. Travaille à mieux communiquer tes aspirations.",
    });
  } else if (data.familySupport === "Non") {
    factors.push({
      type: "famille",
      label: "Absence de soutien",
      impact: "attention",
      description: "Le manque de soutien familial est un défi réel. Construis un réseau de soutien alternatif.",
    });
  }

  // Parental influence
  if (data.parentInfluence === "Fortement") {
    factors.push({
      type: "famille",
      label: "Forte influence parentale",
      impact: "attention",
      description: `Tes parents influencent beaucoup tes choix${data.familyProfession ? ` (${data.familyProfession})` : ""}. Assure-toi que c'est ton choix et pas le leur.`,
    });
  } else if (data.parentInfluence === "Modérément") {
    factors.push({
      type: "famille",
      label: "Influence parentale modérée",
      impact: "neutre",
      description: "L'influence de tes parents est présente mais équilibrée — tu gardes ta liberté de choix.",
    });
  }

  // Cultural / social
  if (data.socialExpectations) {
    factors.push({
      type: "culture",
      label: "Pressions sociales",
      impact: "attention",
      description: `"${data.socialExpectations.slice(0, 80)}" — ces attentes existent. Il ne faut ni les ignorer, ni les laisser dicter ta vie.`,
    });
  }
  if (data.valuedProfessions) {
    factors.push({
      type: "culture",
      label: "Métiers valorisés par ton milieu",
      impact: "neutre",
      description: `Dans ton environnement, on valorise : ${data.valuedProfessions.slice(0, 60)}. C'est une information utile, pas une obligation.`,
    });
  }

  // Economic
  if (data.financialInfluence === "Beaucoup") {
    factors.push({
      type: "economie",
      label: "Contraintes financières fortes",
      impact: "attention",
      description: "Les finances sont une contrainte réelle dans tes choix. Explorer les bourses et formations courtes est une priorité.",
    });
  } else if (data.financialInfluence === "Un peu") {
    factors.push({
      type: "economie",
      label: "Contraintes financières modérées",
      impact: "neutre",
      description: "Les finances jouent un peu sur tes choix. Avec une bonne planification, tu peux viser haut.",
    });
  }

  return factors;
}

function buildPsychologicalProfile(data: V2ExtendedData, personalityType: string): V2OrientationResult["psychologicalProfile"] {
  const cognitiveStyles: Record<string, string> = {
    "Leader": "Pensée orientée action et résultats",
    "Analytique": "Pensée systémique et déductive",
    "Pedagogue": "Pensée conceptuelle et communicative",
    "Créatif": "Pensée divergente et associative",
    "Autonome": "Pensée indépendante et méthodique",
    "Operationnel": "Pensée concrète et pragmatique",
    "Polyvalent": "Pensée adaptative et flexible",
  };

  const motivationDrivers: Record<string, string> = {
    "Découvrir les lois de la nature": "Motivé(e) par la compréhension profonde du monde",
    "Construire des technologies": "Motivé(e) par la création et l'innovation",
    "Comprendre les êtres humains": "Motivé(e) par la connexion humaine et l'empathie",
    "Rendre la société plus juste": "Motivé(e) par l'impact social et la justice",
    "Créer une entreprise": "Motivé(e) par l'autonomie et la réussite matérielle",
    "Créer des œuvres ou des idées": "Motivé(e) par l'expression créative",
  };

  const socialStyles: Record<string, string> = {
    "Travailler seul": "Introverti(e) — ressource ton énergie dans la solitude",
    "Travailler en équipe": "Extraverti(e) — tu t'épanouis dans l'échange",
    "Les deux selon les situations": "Ambivert(e) — tu alternes selon le contexte",
  };

  const wellbeingCount = data.wellbeingIssues.length;
  const resilienceNote = wellbeingCount === 0
    ? "Tu sembles en bonne forme psychologique — continue de prendre soin de toi."
    : wellbeingCount <= 2
      ? "Quelques tensions émotionnelles détectées — reste attentif(ve) à tes besoins."
      : "Niveau de stress élevé signalé — prendre soin de ta santé mentale est prioritaire.";

  return {
    dominantTrait: personalityType,
    cognitiveStyle: cognitiveStyles[personalityType] ?? "Pensée flexible et adaptative",
    motivationDriver: motivationDrivers[data.adultLifeAttraction] ?? "Motivé(e) par tes propres aspirations",
    socialStyle: socialStyles[data.workStyle] ?? "Style social équilibré",
    resilienceNote,
  };
}

function buildInterestClusters(data: V2ExtendedData): V2OrientationResult["interestClusters"] {
  const clusters: V2OrientationResult["interestClusters"] = [];

  const scienceInterests = data.freeTimeInterests.filter((i) =>
    ["Sciences", "Mathématiques", "Physique", "Informatique", "Intelligence artificielle"].includes(i)
  );
  if (scienceInterests.length > 0) {
    clusters.push({
      cluster: "Sciences & Technologies",
      interests: scienceInterests,
      relatedCareers: ["Ingénieur", "Chercheur", "Développeur", "Médecin"],
      color: "blue",
    });
  }

  const humanInterests = data.freeTimeInterests.filter((i) =>
    ["Psychologie", "Philosophie", "Histoire", "Politique", "Société", "Religion et spiritualité"].includes(i)
  );
  if (humanInterests.length > 0) {
    clusters.push({
      cluster: "Humanités & Sciences sociales",
      interests: humanInterests,
      relatedCareers: ["Juriste", "Diplomate", "Psychologue", "Enseignant"],
      color: "violet",
    });
  }

  const businessInterests = data.freeTimeInterests.filter((i) =>
    ["Entrepreneuriat", "Économie", "Commerce"].includes(i)
  );
  if (businessInterests.length > 0) {
    clusters.push({
      cluster: "Business & Économie",
      interests: businessInterests,
      relatedCareers: ["Entrepreneur", "Économiste", "Manager", "Comptable"],
      color: "lime",
    });
  }

  const artInterests = data.freeTimeInterests.filter((i) =>
    ["Art", "Musique", "Cinéma", "Écriture"].includes(i)
  );
  if (artInterests.length > 0) {
    clusters.push({
      cluster: "Arts & Expression",
      interests: artInterests,
      relatedCareers: ["Artiste", "Journaliste", "Designer", "Réalisateur"],
      color: "rose",
    });
  }

  return clusters;
}

function buildLifeProjectNote(data: V2ExtendedData): string {
  const parts: string[] = [];

  if (data.dreamJob) {
    parts.push(`Tu rêves de devenir ${data.dreamJob}.`);
  }
  if (data.idealLife) {
    parts.push(`Ta vie idéale : "${data.idealLife.slice(0, 80)}${data.idealLife.length > 80 ? "…" : ""}"`);
  }
  if (data.adultLifeAttraction) {
    parts.push(`Ce qui t'attire dans la vie adulte : ${data.adultLifeAttraction.toLowerCase()}.`);
  }
  if (data.conferenceChoice) {
    parts.push(`Si tu devais choisir une conférence, ce serait sur "${data.conferenceChoice}".`);
  }
  if (data.studyDuration) {
    parts.push(`Tu envisages des études de ${data.studyDuration}.`);
  }

  if (parts.length === 0) {
    return "Ton projet de vie reste à construire — et c'est normal à ton stade. L'exploration est la première étape.";
  }

  return parts.join(" ");
}

function buildCoherenceInsights(data: V2ExtendedData, score: number): string[] {
  const insights: string[] = [];

  if (score >= 75) {
    insights.push("Tes intérêts, tes valeurs et ton projet de vie sont bien alignés — c'est un signe de clarté intérieure forte.");
  } else if (score >= 50) {
    insights.push("Ton profil est globalement cohérent, mais quelques zones méritent d'être approfondies.");
  } else {
    insights.push("Plusieurs éléments de ton profil semblent en tension — c'est normal, tu es en pleine phase de construction.");
  }

  // Specific coherence tensions
  if (data.adultLifeAttraction === "Construire des technologies" &&
    data.freeTimeInterests.some((i) => ["Art", "Écriture", "Musique"].includes(i))) {
    insights.push("Tu combines des attirances techno et créatives — un profil rare qui peut mener vers le design technologique ou la communication numérique.");
  }

  if (data.coreValues.includes("Liberté") && data.parentInfluence === "Fortement") {
    insights.push("Ta valeur de liberté est en tension avec une forte influence parentale — clarifier tes priorités te permettra de mieux te positionner.");
  }

  if (data.coreValues.includes("Réussite financière") && data.studyDuration === "2 à 3 ans") {
    insights.push("Vouloir une réussite financière avec des études courtes est possible mais demande une stratégie claire dès le départ.");
  }

  if (data.wellbeingIssues.includes("Démotivé(e)") && data.dreamJob) {
    insights.push(`Tu te sens démotivé(e), pourtant tu as un objectif clair : ${data.dreamJob}. Reconnecte-toi régulièrement à cette vision pour retrouver de l'élan.`);
  }

  return insights.slice(0, 3);
}
