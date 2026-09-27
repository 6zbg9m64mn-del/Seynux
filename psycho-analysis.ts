/**
 * Analyse psychologique intelligente — Psyché V2
 *
 * Génère une analyse profonde et personnalisée basée sur les scores,
 * les réponses libres, le profil et le niveau de l'étudiant.
 */

import type { ProfileKey, DimensionScores, StudentLevel } from "./assessment.ts";

// ── Types ──────────────────────────────────────────────────────────────────

export type DimensionAnalysis = {
  dimension: string;
  icon: string;
  score: number;
  maxScore: number;
  pct: number;
  level: "excellent" | "bon" | "moyen" | "faible";
  title: string;
  description: string;
  tip: string;
  color: string;
};

export type ContradictionInsight = {
  title: string;
  description: string;
  advice: string;
};

export type PsychologicalPattern = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  isPositive: boolean;
};

export type DeepAnalysis = {
  headline: string;
  summary: string;
  dimensions: DimensionAnalysis[];
  patterns: PsychologicalPattern[];
  contradictions: ContradictionInsight[];
  riskScore: number;           // 0-100, higher = more risk
  potentialScore: number;      // 0-100, higher = more potential
  riskLabel: string;
  potentialLabel: string;
  riskAdvice: string;
  potentialAdvice: string;
  coherenceScore: number;      // 0-100, how coherent the profile is
  coherenceNote: string;
  socialFactors: string[];
  culturalContext: string;
  motivationalDriver: string;
  // New enriched fields
  radarData: RadarPoint[];
  strengthCards: StrengthCard[];
  weeklyPlanV2: WeeklyTaskBlock[];
  freeTextInsights: string[];
};

export type RadarPoint = {
  dimension: string;
  value: number; // 0-100
  fullMark: 100;
};

export type StrengthCard = {
  label: string;
  description: string;
  type: "force" | "axe";
  icon: string;
};

export type WeeklyTaskBlock = {
  week: string;
  theme: string;
  tasks: string[];
  focus: string; // dimension being targeted
};

// ── Dimension Analysis ─────────────────────────────────────────────────────

const DIMENSION_DETAIL: Record<
  string,
  {
    icon: string;
    levels: Record<"excellent" | "bon" | "moyen" | "faible", { title: string; description: string; tip: string }>;
    color: Record<"excellent" | "bon" | "moyen" | "faible", string>;
  }
> = {
  cognition: {
    icon: "🧠",
    levels: {
      excellent: {
        title: "Penseur analytique",
        description: "Tu comprends vite et en profondeur. Ton cerveau cherche naturellement à structurer les problèmes complexes.",
        tip: "Exploite ta rapidité en attaquant les exercices difficiles en premier.",
      },
      bon: {
        title: "Bon niveau de compréhension",
        description: "Tu assimiles bien les concepts. Quelques efforts supplémentaires sur les sujets abstraits peuvent tout changer.",
        tip: "Entraîne-toi à expliquer les cours à voix haute — ça renforce la compréhension.",
      },
      moyen: {
        title: "Compréhension en développement",
        description: "Tu comprends l'essentiel mais les nuances te glissent parfois entre les doigts.",
        tip: "Lis chaque cours au moins deux fois : une fois pour la vue d'ensemble, une fois pour les détails.",
      },
      faible: {
        title: "Lacunes cognitives importantes",
        description: "Les concepts s'accumulent sans être vraiment assimilés. Ce n'est pas un manque d'intelligence — c'est un manque de méthode.",
        tip: "Commence par réviser les bases depuis le début. Un professeur de soutien peut changer la donne.",
      },
    },
    color: { excellent: "text-emerald-400", bon: "text-cyan-400", moyen: "text-amber-400", faible: "text-red-400" },
  },
  discipline: {
    icon: "📐",
    levels: {
      excellent: {
        title: "Exécutant rigoureux",
        description: "Tu travailles de façon régulière et organisée. Ta constance est une arme redoutable dans le long terme.",
        tip: "Optimise maintenant : assure-toi que tes heures d'étude sont réellement efficaces.",
      },
      bon: {
        title: "Bonne organisation",
        description: "Tu respectes généralement tes engagements mais des écarts existent. La régularité est presque là.",
        tip: "Réduis les distractions 30 min par session. La qualité vaut plus que la quantité.",
      },
      moyen: {
        title: "Discipline irrégulière",
        description: "Ta discipline dépend de ton humeur. Quand tu travailles, ça marche — mais ce n'est pas constant.",
        tip: "Crée une routine : même heure, même lieu, même durée. Après 21 jours, ça devient automatique.",
      },
      faible: {
        title: "Désorganisation critique",
        description: "Le travail se fait rarement et sans structure. Les résultats en souffrent directement.",
        tip: "Un seul objectif : travailler 20 minutes sans interruption tous les jours pendant 2 semaines.",
      },
    },
    color: { excellent: "text-emerald-400", bon: "text-cyan-400", moyen: "text-amber-400", faible: "text-red-400" },
  },
  emotion: {
    icon: "💭",
    levels: {
      excellent: {
        title: "Stabilité émotionnelle",
        description: "Tu gères bien tes émotions face aux défis scolaires. Cette stabilité est un avantage immense.",
        tip: "Aide les autres à gérer leur stress — enseigner renforce tes propres capacités.",
      },
      bon: {
        title: "Bonne résilience",
        description: "Tu te remets des échecs et continues. Quelques moments difficiles, mais tu tiens.",
        tip: "Note tes succès, même les petits. Ça construit la confiance sur le long terme.",
      },
      moyen: {
        title: "Fragilité émotionnelle",
        description: "Les obstacles te déstabilisent plus qu'ils ne devraient. Le stress influence tes performances.",
        tip: "Pratique 5 min de cohérence cardiaque avant chaque session d'étude.",
      },
      faible: {
        title: "Détresse émotionnelle",
        description: "Tu traverses une période difficile. Les émotions envahissent le travail et le quotidien.",
        tip: "Parle à quelqu'un — un ami, un parent, un professeur. Tu n'as pas à traverser ça seul(e).",
      },
    },
    color: { excellent: "text-emerald-400", bon: "text-cyan-400", moyen: "text-amber-400", faible: "text-red-400" },
  },
  motivation: {
    icon: "🔥",
    levels: {
      excellent: {
        title: "Moteur interne puissant",
        description: "Tu travailles pour toi, pas pour plaire. Cette motivation intrinsèque est durable et résistante.",
        tip: "Connecte chaque matière à ton projet de vie — ça rend tout plus significatif.",
      },
      bon: {
        title: "Bonne motivation",
        description: "Tu as des objectifs et tu les gardes en vue. Des moments de doute existent mais ne durent pas.",
        tip: "Rappelle-toi ton 'pourquoi' quand la motivation baisse. Écris-le quelque part de visible.",
      },
      moyen: {
        title: "Motivation fluctuante",
        description: "Tu démarres fort mais tu perds de l'élan. La motivation vient par vagues.",
        tip: "Fixe-toi des micro-objectifs (hebdomadaires) plutôt que des grands objectifs lointains.",
      },
      faible: {
        title: "Motivation absente",
        description: "Tu ne vois pas clairement pourquoi tu fais tout ça. Cette absence de sens est épuisante.",
        tip: "Pose-toi cette question : 'Qu'est-ce que je veux éviter dans 5 ans ?' La réponse peut être motivante.",
      },
    },
    color: { excellent: "text-emerald-400", bon: "text-cyan-400", moyen: "text-amber-400", faible: "text-red-400" },
  },
};

function getLevel(pct: number): "excellent" | "bon" | "moyen" | "faible" {
  if (pct >= 75) return "excellent";
  if (pct >= 50) return "bon";
  if (pct >= 33) return "moyen";
  return "faible";
}

// ── Psychological Patterns ─────────────────────────────────────────────────

function detectPatterns(scores: DimensionScores, maxScore: number): PsychologicalPattern[] {
  const { cognition, discipline, emotion, motivation } = scores;
  const cogPct = (cognition / maxScore) * 100;
  const disPct = (discipline / maxScore) * 100;
  const emoPct = (emotion / maxScore) * 100;
  const motPct = (motivation / maxScore) * 100;
  const avg = (cogPct + disPct + emoPct + motPct) / 4;

  const patterns: PsychologicalPattern[] = [];

  // Impostor syndrome signal
  if (cogPct >= 65 && (emoPct < 45 || motPct < 45)) {
    patterns.push({
      id: "impostor",
      label: "Syndrome de l'imposteur potentiel",
      emoji: "🎭",
      description: "Tu as les capacités intellectuelles mais tu doutes de toi. Tu es plus capable que tu ne le crois.",
      isPositive: false,
    });
  }

  // Perfectionist
  if (disPct >= 70 && cogPct >= 60 && emoPct < 55) {
    patterns.push({
      id: "perfectionist",
      label: "Tendance perfectionniste",
      emoji: "🔬",
      description: "Tu vises l'excellence et ça te met sous pression. Le perfectionnisme peut devenir un frein si mal géré.",
      isPositive: false,
    });
  }

  // Dormant potential
  if (avg < 55 && cogPct >= 55) {
    patterns.push({
      id: "dormant",
      label: "Potentiel sous-exploité",
      emoji: "💎",
      description: "Ton intelligence est présente mais les conditions (discipline, émotion) l'empêchent de s'exprimer pleinement.",
      isPositive: false,
    });
  }

  // Resilient learner
  if (emoPct >= 65 && avg >= 55) {
    patterns.push({
      id: "resilient",
      label: "Apprenant résilient",
      emoji: "💪",
      description: "Tu rebondis face aux difficultés. Cette qualité te donnera un avantage durable dans les études et la vie.",
      isPositive: true,
    });
  }

  // Self-directed learner
  if (motPct >= 70 && disPct >= 60) {
    patterns.push({
      id: "self_directed",
      label: "Apprenant autonome",
      emoji: "🎯",
      description: "Tu n'as pas besoin d'être poussé — tu avances par toi-même. C'est une compétence rare et précieuse.",
      isPositive: true,
    });
  }

  // External motivation dependency
  if (motPct < 45 && disPct >= 55) {
    patterns.push({
      id: "ext_motivation",
      label: "Dépendance à la motivation externe",
      emoji: "🔋",
      description: "Tu travailles bien sous pression (examens, profs) mais peineras sans échéances. Apprends à te motiver seul(e).",
      isPositive: false,
    });
  }

  // Balanced profile
  const values = [cogPct, disPct, emoPct, motPct];
  const maxDiff = Math.max(...values) - Math.min(...values);
  if (maxDiff <= 30 && avg >= 50) {
    patterns.push({
      id: "balanced",
      label: "Profil équilibré",
      emoji: "⚖️",
      description: "Tes forces sont réparties de façon homogène. Tu es polyvalent(e) et adaptable dans différents contextes.",
      isPositive: true,
    });
  }

  return patterns.slice(0, 4); // Max 4 patterns
}

// ── Contradictions Detection ──────────────────────────────────────────────

function detectContradictions(scores: DimensionScores, maxScore: number): ContradictionInsight[] {
  const { cognition, discipline, emotion, motivation } = scores;
  const cogPct = (cognition / maxScore) * 100;
  const disPct = (discipline / maxScore) * 100;
  const emoPct = (emotion / maxScore) * 100;
  const motPct = (motivation / maxScore) * 100;

  const contradictions: ContradictionInsight[] = [];

  // High motivation + low discipline
  if (motPct >= 65 && disPct <= 45) {
    contradictions.push({
      title: "Grande ambition, peu de structure",
      description: "Tu veux réussir (motivation élevée) mais tu ne crées pas les conditions pour y arriver (discipline faible).",
      advice: "Commence par instaurer UNE habitude simple : 30 min de travail quotidien à heure fixe.",
    });
  }

  // High discipline + low motivation
  if (disPct >= 65 && motPct <= 45) {
    contradictions.push({
      title: "Tu travailles mais tu ne sais pas pourquoi",
      description: "Tu es discipliné(e) mais tu manques de sens. Le travail sans direction peut mener à l'épuisement.",
      advice: "Prends le temps d'écrire ton 'pourquoi' — quel avenir veux-tu pour toi ?",
    });
  }

  // High cognition + low emotion
  if (cogPct >= 65 && emoPct <= 40) {
    contradictions.push({
      title: "L'intellect contre les émotions",
      description: "Tu penses vite mais tu t'épuises émotionnellement. Ton cerveau avance quand ton cœur est bloqué.",
      advice: "Accorde autant d'attention à ton bien-être qu'à tes révisions.",
    });
  }

  // High emotion + low motivation
  if (emoPct >= 65 && motPct <= 45) {
    contradictions.push({
      title: "Stabilité émotionnelle sans élan",
      description: "Tu gères bien tes émotions mais tu ne trouves pas de raison forte d'avancer.",
      advice: "Explore des domaines qui t'intéressent vraiment — la curiosité précède souvent la motivation.",
    });
  }

  return contradictions;
}

// ── Risk & Potential ──────────────────────────────────────────────────────

function computeRiskAndPotential(
  scores: DimensionScores,
  maxScore: number,
): { riskScore: number; potentialScore: number; riskLabel: string; potentialLabel: string; riskAdvice: string; potentialAdvice: string } {
  const { cognition, discipline, emotion, motivation } = scores;
  const emoPct = (emotion / maxScore) * 100;
  const disPct = (discipline / maxScore) * 100;
  const cogPct = (cognition / maxScore) * 100;
  const motPct = (motivation / maxScore) * 100;
  const avg = (cogPct + disPct + emoPct + motPct) / 4;

  // Risk = weighted by emotion and discipline (critical for academic success)
  const riskScore = Math.round(
    100 - (emoPct * 0.35 + disPct * 0.35 + motPct * 0.2 + cogPct * 0.1)
  );

  // Potential = weighted by cognition and motivation
  const potentialScore = Math.round(
    cogPct * 0.35 + motPct * 0.35 + disPct * 0.2 + emoPct * 0.1
  );

  const riskLabel =
    riskScore >= 70 ? "Élevé" :
    riskScore >= 50 ? "Modéré" :
    riskScore >= 30 ? "Faible" : "Très faible";

  const potentialLabel =
    potentialScore >= 80 ? "Exceptionnel" :
    potentialScore >= 65 ? "Fort" :
    potentialScore >= 50 ? "Prometteur" : "À développer";

  const riskAdvice =
    riskScore >= 70
      ? "Ta situation est préoccupante. Une aide extérieure (prof, famille) est recommandée urgemment."
      : riskScore >= 50
      ? "Des signaux d'alerte existent. Agis maintenant avant que les problèmes s'accumulent."
      : "Tu es dans une bonne dynamique. Maintiens tes efforts et surveille les points faibles.";

  const potentialAdvice =
    potentialScore >= 80
      ? "Tu as tout pour réussir brillamment. Ce qui te manque, c'est peut-être juste un plan clair."
      : potentialScore >= 65
      ? "Ton potentiel est réel et visible. Exploite-le avec méthode et persévérance."
      : potentialScore >= 50
      ? "Ton potentiel est présent mais encore endormi. Le bon environnement peut tout changer."
      : "Commence par de petits succès — chaque réussite, même minime, renforce ton potentiel.";

  return { riskScore, potentialScore, riskLabel, potentialLabel, riskAdvice, potentialAdvice };
}

// ── Coherence Score ───────────────────────────────────────────────────────

function computeCoherence(scores: DimensionScores, maxScore: number): { coherenceScore: number; coherenceNote: string } {
  const values = [
    (scores.cognition / maxScore) * 100,
    (scores.discipline / maxScore) * 100,
    (scores.emotion / maxScore) * 100,
    (scores.motivation / maxScore) * 100,
  ];
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  // High std deviation = low coherence
  const coherenceScore = Math.round(Math.max(0, 100 - stdDev * 1.5));

  const coherenceNote =
    coherenceScore >= 80
      ? "Ton profil est très cohérent — tes forces et faiblesses sont bien réparties."
      : coherenceScore >= 60
      ? "Quelques déséquilibres existent mais ton profil reste lisible et orientable."
      : coherenceScore >= 40
      ? "Ton profil est contrasté : des forces marquées et des faiblesses tout aussi marquées."
      : "Ton profil présente de fortes contradictions internes. Comprendre ces tensions est la première étape.";

  return { coherenceScore, coherenceNote };
}

// ── Social & Cultural Factors ─────────────────────────────────────────────

function getSocialFactors(profileKey: ProfileKey, level: StudentLevel | undefined): string[] {
  const factors: string[] = [];

  if (level === "college") {
    factors.push("La pression familiale est souvent forte à ce stade — essaie de la transformer en soutien plutôt qu'en peur.");
  }
  if (level === "lycee") {
    factors.push("Le choix de série est important mais pas irréversible. Choisis ce qui te motive, pas ce qu'on attend de toi.");
    factors.push("La comparaison avec les pairs peut être toxique. Concentre-toi sur ta propre trajectoire.");
  }
  if (level === "universite") {
    factors.push("L'environnement universitaire exige plus d'autonomie. Construis ton réseau dès maintenant.");
  }

  if (profileKey === "perdu" || profileKey === "instable") {
    factors.push("Le contexte socio-économique peut peser lourd. Cherche des ressources (bourses, soutien scolaire) dans ton environnement.");
  }

  factors.push("L'accès aux ressources pédagogiques en ligne peut considérablement renforcer ton apprentissage.");

  return factors.slice(0, 3);
}

function getCulturalContext(level: StudentLevel | undefined): string {
  if (level === "lycee" || level === "college") {
    return "Dans le contexte scolaire ouest-africain, la réussite au bac détermine de nombreuses opportunités. Mais rappelle-toi : la série idéale n'est pas forcément la plus prestigieuse — c'est celle qui te correspond vraiment.";
  }
  if (level === "universite") {
    return "L'université offre des possibilités de spécialisation et d'évolution internationale. Les compétences pluridisciplinaires sont de plus en plus valorisées.";
  }
  return "Quel que soit ton niveau, chaque étape compte. Ta trajectoire est unique et mérite une orientation personnalisée.";
}

function getMotivationalDriver(profileKey: ProfileKey, scores: DimensionScores, maxScore: number): string {
  const { motivation } = scores;
  const motPct = (motivation / maxScore) * 100;

  if (profileKey === "analytique") return "Tu es mu(e) par le besoin de comprendre et de résoudre. Nourris cette curiosité intellectuelle.";
  if (profileKey === "ambitieux") return "Tu es poussé(e) par la vision d'un avenir meilleur. Garde cette flamme, c'est ton carburant.";
  if (profileKey === "instable") return "Sous la turbulence, il y a quelque chose qui veut réussir. Trouve ce quelque chose et accroche-toi y.";
  if (profileKey === "discipline") return "La régularité est ta force. Tu réussis par accumulation, pas par flash d'inspiration.";
  if (profileKey === "perdu") return "La clarté viendra avec l'action. Commencer — même imparfaitement — est ton premier moteur.";
  return "Chaque personne a une raison profonde d'avancer. La tienne est là, en toi.";
}

// ── Headline & Summary ────────────────────────────────────────────────────

const HEADLINES: Record<ProfileKey, string[]> = {
  analytique: [
    "Un cerveau affûté qui cherche encore sa voie",
    "Intelligence forte — il faut maintenant l'orienter",
    "Le penseur qui doit passer à l'action",
  ],
  ambitieux: [
    "L'ambition est là — la méthode suit",
    "Haut potentiel en quête de structure",
    "Tu vois loin, maintenant avance",
  ],
  instable: [
    "Une tempête que tu peux apprendre à traverser",
    "Sensible et fort(e) à la fois",
    "L'instabilité d'aujourd'hui prépare la solidité de demain",
  ],
  discipline: [
    "La discipline comme fondation",
    "La régularité comme super-pouvoir",
    "Constant(e) et solide — il faut optimiser",
  ],
  perdu: [
    "La clarté est à portée de main",
    "Le départ d'un long voyage qui commence ici",
    "Chercher sa voie est déjà avancer",
  ],
};

const SUMMARIES: Record<ProfileKey, (level: StudentLevel | undefined) => string> = {
  analytique: (level) =>
    `Ton profil révèle une capacité de compréhension au-dessus de la moyenne. ${level === "lycee" ? "Au lycée, c'est un atout pour les séries scientifiques." : "Cette force intellectuelle est une base précieuse."} Cependant, ton analyse montre que des dimensions comme la gestion émotionnelle ou la discipline pourraient limiter tes performances si elles ne sont pas renforcées.`,
  ambitieux: (level) =>
    `Tu débordates d'énergie et d'aspirations. ${level === "universite" ? "À l'université, cette énergie doit être canalisée avec méthode." : "Cette ambition est une ressource extraordinaire."} Le défi sera de transformer cette envie en actions concrètes et régulières, sans te disperser.`,
  instable: (level) =>
    `Ton profil indique une période de vulnérabilité émotionnelle. ${level === "lycee" ? "La pression du lycée peut amplifier ce stress." : "Cet état est temporaire."} Mais tes scores révèlent aussi des compétences réelles — il s'agit de créer les conditions pour qu'elles s'expriment.`,
  discipline: (level) =>
    `Ta régularité est ta plus grande force. ${level === "college" ? "Au collège, cette rigueur te donne déjà une longueur d'avance." : "Cette discipline est rare et précieuse."} L'enjeu maintenant est d'associer cette organisation à une méthode plus efficace et à un projet clair.`,
  perdu: (level) =>
    `Ton profil montre un manque de clarté dans tes objectifs et ta direction. ${level === "lycee" ? "Au lycée, ce flou peut peser sur les choix d'orientation." : "Cette incertitude est normale."} Ce n'est pas une faiblesse définitive — c'est une invitation à explorer et à mieux te connaître.`,
};

// ── Radar Data ─────────────────────────────────────────────────────────────

function buildRadarData(scores: DimensionScores, maxScore: number): RadarPoint[] {
  return [
    { dimension: "Cognition", value: Math.round((scores.cognition / maxScore) * 100), fullMark: 100 },
    { dimension: "Discipline", value: Math.round((scores.discipline / maxScore) * 100), fullMark: 100 },
    { dimension: "Émotion", value: Math.round((scores.emotion / maxScore) * 100), fullMark: 100 },
    { dimension: "Motivation", value: Math.round((scores.motivation / maxScore) * 100), fullMark: 100 },
  ];
}

// ── Strength Cards ─────────────────────────────────────────────────────────

function buildStrengthCards(scores: DimensionScores, maxScore: number, profileKey: ProfileKey): StrengthCard[] {
  const cogPct = (scores.cognition / maxScore) * 100;
  const disPct = (scores.discipline / maxScore) * 100;
  const emoPct = (scores.emotion / maxScore) * 100;
  const motPct = (scores.motivation / maxScore) * 100;

  const cards: StrengthCard[] = [];

  // Forces
  if (cogPct >= 60) {
    cards.push({
      label: "Esprit analytique",
      description: "Tu comprends rapidement les concepts et structures les problèmes avec aisance.",
      type: "force",
      icon: "🧠",
    });
  }
  if (disPct >= 60) {
    cards.push({
      label: "Discipline solide",
      description: "Tu travailles de façon régulière et organisée. Cette constance est ta fondation.",
      type: "force",
      icon: "📐",
    });
  }
  if (emoPct >= 60) {
    cards.push({
      label: "Résilience émotionnelle",
      description: "Tu fais face aux épreuves sans te laisser submerger. C'est une force rare.",
      type: "force",
      icon: "💪",
    });
  }
  if (motPct >= 60) {
    cards.push({
      label: "Motivation intrinsèque",
      description: "Tu avances parce que tu le veux, pas parce qu'on te l'impose. C'est durable.",
      type: "force",
      icon: "🔥",
    });
  }
  if (profileKey === "ambitieux") {
    cards.push({
      label: "Vision à long terme",
      description: "Tu projettes ton avenir avec ambition. Cette vision est un moteur puissant.",
      type: "force",
      icon: "🚀",
    });
  }

  // Axes d'amélioration
  if (cogPct < 50) {
    cards.push({
      label: "Renforcer la compréhension",
      description: "Revois les fondamentaux avec des exercices pratiques et des explications à voix haute.",
      type: "axe",
      icon: "📚",
    });
  }
  if (disPct < 50) {
    cards.push({
      label: "Construire une routine",
      description: "20 min de travail quotidien à heure fixe pendant 3 semaines crée une habitude.",
      type: "axe",
      icon: "⏰",
    });
  }
  if (emoPct < 50) {
    cards.push({
      label: "Gérer le stress",
      description: "Apprends des techniques de régulation : respiration, journaling, exercice physique.",
      type: "axe",
      icon: "🧘",
    });
  }
  if (motPct < 50) {
    cards.push({
      label: "Clarifier son projet",
      description: "Définis un objectif à 6 mois. La motivation suit quand le cap est clair.",
      type: "axe",
      icon: "🎯",
    });
  }

  return cards.slice(0, 6);
}

// ── 4-Week Plan ────────────────────────────────────────────────────────────

const WEEKLY_TASKS: Record<string, string[][]> = {
  cognition: [
    ["Lis chaque cours deux fois : une fois pour la vue d'ensemble, une fois pour les détails.", "Essaie d'expliquer une notion à voix haute sans regarder le cours."],
    ["Fais des fiches de synthèse pour chaque chapitre.", "Résous 3 exercices d'application par jour."],
    ["Associe chaque concept à un exemple concret de ta vie.", "Pose une question à ton professeur sur un point flou."],
    ["Révise les fiches de la semaine 2. Refais les exercices ratés.", "Évalue ta progression sur une note /10."],
  ],
  discipline: [
    ["Crée un planning hebdomadaire fixe. Mets-le dans un endroit visible.", "Travaille 20 min sans téléphone, puis fais une pause de 5 min."],
    ["Augmente à 30 min de travail concentré. Note chaque session complétée.", "Prépare tes affaires la veille pour le lendemain."],
    ["Évalue ce qui perturbe ta concentration. Écris-le. Élimine une distraction.", "Commence toujours par la matière la plus difficile."],
    ["Regarde tes 3 semaines de planning. Qu'est-ce qui a fonctionné ?", "Établis ta routine idéale pour le mois suivant."],
  ],
  emotion: [
    ["Chaque soir, écris 3 choses que tu as bien faites dans ta journée.", "Fais 5 min de cohérence cardiaque avant les révisions."],
    ["Identifie ce qui te stresse le plus à l'école. Écris-le sans filtre.", "Parle à quelqu'un de confiance (ami, parent) d'une difficulté."],
    ["Avant un contrôle, dis-toi : 'J'ai préparé ce que je pouvais.'", "Fais 20 min d'activité physique par jour."],
    ["Revois ta liste de succès des semaines précédentes.", "Identifie UN déclencheur de stress et prépare une réponse concrète."],
  ],
  motivation: [
    ["Écris en une phrase ce que tu veux faire dans 5 ans.", "Lis une biographie inspirante (15 min par jour)."],
    ["Connecte chaque matière à ton projet futur. Ex: maths → ingénieur.", "Rejoins ou crée un groupe de travail avec des pairs motivés."],
    ["Fixe-toi un micro-objectif pour la semaine. Célèbre-le si atteint.", "Visualise ta réussite 5 min le matin."],
    ["Revois ton 'pourquoi'. Est-il toujours valable ? Ajuste-le si besoin.", "Partage ton objectif avec quelqu'un — l'engagement social renforce la motivation."],
  ],
};

function buildWeeklyPlanV2(scores: DimensionScores, maxScore: number): WeeklyTaskBlock[] {
  const dims: Array<[string, number]> = [
    ["cognition", scores.cognition],
    ["discipline", scores.discipline],
    ["emotion", scores.emotion],
    ["motivation", scores.motivation],
  ];
  // Focus on the weakest dimension
  const weakest = dims.reduce((a, b) => (a[1] < b[1] ? a : b))[0] as keyof typeof WEEKLY_TASKS;
  const themeTitles: Record<string, string> = {
    cognition: "Renforcement cognitif",
    discipline: "Construction d'habitudes",
    emotion: "Stabilité émotionnelle",
    motivation: "Clarté & élan",
  };
  const tasks = WEEKLY_TASKS[weakest];
  return tasks.map((weekTasks, i) => ({
    week: `Semaine ${i + 1}`,
    theme: themeTitles[weakest],
    tasks: weekTasks,
    focus: weakest,
  }));
}

// ── Free-text Insights ────────────────────────────────────────────────────

function buildFreeTextInsights(
  profileKey: ProfileKey,
  scores: DimensionScores,
  maxScore: number,
): string[] {
  const insights: string[] = [];
  const cogPct = (scores.cognition / maxScore) * 100;
  const motPct = (scores.motivation / maxScore) * 100;
  const emoPct = (scores.emotion / maxScore) * 100;
  const disPct = (scores.discipline / maxScore) * 100;

  if (profileKey === "analytique" && cogPct >= 70) {
    insights.push("Ton score cognitif élevé indique une capacité de raisonnement abstraite au-dessus de la moyenne. Les filières scientifiques ou techniques seront probablement un terrain fertile.");
  }
  if (profileKey === "ambitieux" && motPct >= 65) {
    insights.push("Ta forte motivation couplée à une ambition visible te donnera un avantage dans les environnements compétitifs — à condition de ne pas brûler les étapes.");
  }
  if (emoPct < 45) {
    insights.push("Ton score émotionnel révèle une vulnérabilité face au stress. Investir dans la gestion des émotions maintenant produira des dividendes sur tout ton parcours scolaire et personnel.");
  }
  if (disPct >= 70 && motPct < 50) {
    insights.push("Tu combines discipline solide et motivation faible — un profil rare. Tu travailles par obligation plus que par désir. Trouver ton 'pourquoi' transformera cette machine bien huilée en force inarrêtable.");
  }
  if (cogPct >= 65 && disPct < 45) {
    insights.push("L'écart entre ta cognition et ta discipline est significatif. Tu as l'intelligence mais pas encore l'organisation pour l'exploiter pleinement. Combler cet écart est ta priorité numéro 1.");
  }

  // Generic insight based on profile
  if (profileKey === "instable") {
    insights.push("Les périodes d'instabilité sont souvent précurseurs de croissance. Beaucoup des personnalités les plus accomplies ont traversé des phases similaires à la tienne — l'important est ce que tu en fais.");
  }
  if (profileKey === "perdu") {
    insights.push("Ne pas savoir où tu vas est un point de départ honnête. L'exploration active — essayer des activités, lire, rencontrer des professionnels — est la stratégie la plus efficace pour trouver ta direction.");
  }

  return insights.slice(0, 3);
}

// ── Main Export ───────────────────────────────────────────────────────────

export function generateDeepAnalysis(
  scores: DimensionScores,
  profileKey: ProfileKey,
  maxScore: number,
  level: StudentLevel | undefined,
): DeepAnalysis {
  const dimensions: DimensionAnalysis[] = (["cognition", "discipline", "emotion", "motivation"] as const).map((dim) => {
    const score = scores[dim];
    const pct = Math.round((score / maxScore) * 100);
    const level_ = getLevel(pct);
    const detail = DIMENSION_DETAIL[dim];
    const levelData = detail.levels[level_];
    return {
      dimension: dim,
      icon: detail.icon,
      score,
      maxScore,
      pct,
      level: level_,
      title: levelData.title,
      description: levelData.description,
      tip: levelData.tip,
      color: detail.color[level_],
    };
  });

  const patterns = detectPatterns(scores, maxScore);
  const contradictions = detectContradictions(scores, maxScore);
  const { riskScore, potentialScore, riskLabel, potentialLabel, riskAdvice, potentialAdvice } = computeRiskAndPotential(scores, maxScore);
  const { coherenceScore, coherenceNote } = computeCoherence(scores, maxScore);

  const headlines = HEADLINES[profileKey as keyof typeof HEADLINES] ?? HEADLINES["perdu"];
  const headline = headlines[Math.floor(Math.random() * headlines.length)];
  const summary = (SUMMARIES[profileKey as keyof typeof SUMMARIES] ?? SUMMARIES["perdu"])(level);

  const socialFactors = getSocialFactors(profileKey, level);
  const culturalContext = getCulturalContext(level);
  const motivationalDriver = getMotivationalDriver(profileKey, scores, maxScore);

  const radarData = buildRadarData(scores, maxScore);
  const strengthCards = buildStrengthCards(scores, maxScore, profileKey);
  const weeklyPlanV2 = buildWeeklyPlanV2(scores, maxScore);
  const freeTextInsights = buildFreeTextInsights(profileKey, scores, maxScore);

  return {
    headline,
    summary,
    dimensions,
    patterns,
    contradictions,
    riskScore,
    potentialScore,
    riskLabel,
    potentialLabel,
    riskAdvice,
    potentialAdvice,
    coherenceScore,
    coherenceNote,
    socialFactors,
    culturalContext,
    motivationalDriver,
    radarData,
    strengthCards,
    weeklyPlanV2,
    freeTextInsights,
  };
}
