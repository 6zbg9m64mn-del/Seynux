export type Dimension = "cognition" | "discipline" | "emotion" | "motivation";

export type AnswerValue = 0 | 1 | 2;

export type QuestionOption = {
  letter: "A" | "B" | "C";
  text: string;
  value: AnswerValue; // A=2, B=1, C=0
};

export type Question = {
  id: number;
  dimension: Dimension;
  part: number;
  text: string;
  options: QuestionOption[];
};

export type TestPart = {
  number: number;
  title: string;
  emoji: string;
  description: string;
  questionCount: number;
};

export type DimensionScores = {
  cognition: number;
  discipline: number;
  emotion: number;
  motivation: number;
};

export type ProfileKey =
  | "analytique"
  | "ambitieux"
  | "instable"
  | "discipline"
  | "perdu";

export type Profile = {
  key: ProfileKey;
  title: string;
  emoji: string;
  description: string;
  color: string;
};

// Max score per dimension in V2 (5 questions x 2 points each)
export const MAX_DIMENSION_SCORE = 10;

// Total max across all 4 dimensions
export const MAX_TOTAL_SCORE = MAX_DIMENSION_SCORE * 4; // 40

export const DIMENSION_LABELS: Record<Dimension, string> = {
  cognition: "Cognition",
  discipline: "Discipline",
  emotion: "Émotion",
  motivation: "Motivation",
};

export const DIMENSION_ICONS: Record<Dimension, string> = {
  cognition: "🧠",
  discipline: "📐",
  emotion: "💭",
  motivation: "🔥",
};

// ── 5 Test Parts ────────────────────────────────────────────────────

export const TEST_PARTS: TestPart[] = [
  {
    number: 1,
    title: "Comportement réel",
    emoji: "🧩",
    description: "Comment tu réagis vraiment face aux situations du quotidien scolaire.",
    questionCount: 5,
  },
  {
    number: 2,
    title: "Discipline & Structure",
    emoji: "⚡",
    description: "Ta capacité à t'organiser, planifier et maintenir un rythme de travail.",
    questionCount: 5,
  },
  {
    number: 3,
    title: "Intelligence & Créativité",
    emoji: "💡",
    description: "Ta façon de penser, d'apprendre et de résoudre les problèmes.",
    questionCount: 4,
  },
  {
    number: 4,
    title: "État mental & émotionnel",
    emoji: "❤️",
    description: "Comment tu te sens en ce moment et comment tu gères tes émotions.",
    questionCount: 3,
  },
  {
    number: 5,
    title: "Orientation & Vision",
    emoji: "🎯",
    description: "Tes préférences, tes choix et ta vision pour l'avenir.",
    questionCount: 3,
  },
];

// ── 20 Questions (A/B/C format) ──────────────────────────────────────

export const QUESTIONS: Question[] = [
  // ── PART 1: Comportement réel (Q1-5) ──
  {
    id: 1,
    dimension: "discipline",
    part: 1,
    text: "Quand tu dois travailler alors que tu n'en as pas envie :",
    options: [
      { letter: "A", text: "Je le fais quand même", value: 2 },
      { letter: "B", text: "Je repousse un peu", value: 1 },
      { letter: "C", text: "Je ne le fais pas", value: 0 },
    ],
  },
  {
    id: 2,
    dimension: "cognition",
    part: 1,
    text: "Quand tu ne comprends pas un cours :",
    options: [
      { letter: "A", text: "Je cherche jusqu'à comprendre", value: 2 },
      { letter: "B", text: "J'attends qu'on m'explique", value: 1 },
      { letter: "C", text: "Je laisse tomber", value: 0 },
    ],
  },
  {
    id: 3,
    dimension: "emotion",
    part: 1,
    text: "Après un échec (mauvaise note) :",
    options: [
      { letter: "A", text: "J'analyse et je corrige", value: 2 },
      { letter: "B", text: "Ça me décourage", value: 1 },
      { letter: "C", text: "J'abandonne", value: 0 },
    ],
  },
  {
    id: 4,
    dimension: "discipline",
    part: 1,
    text: "Ton travail scolaire est :",
    options: [
      { letter: "A", text: "Régulier", value: 2 },
      { letter: "B", text: "Irrégulier", value: 1 },
      { letter: "C", text: "Inexistant", value: 0 },
    ],
  },
  {
    id: 5,
    dimension: "discipline",
    part: 1,
    text: "Tu fais tes devoirs :",
    options: [
      { letter: "A", text: "Toujours", value: 2 },
      { letter: "B", text: "Parfois", value: 1 },
      { letter: "C", text: "Rarement", value: 0 },
    ],
  },

  // ── PART 2: Discipline & Structure (Q6-10) ──
  {
    id: 6,
    dimension: "discipline",
    part: 2,
    text: "Tu arrives à respecter un planning :",
    options: [
      { letter: "A", text: "Facilement", value: 2 },
      { letter: "B", text: "Parfois", value: 1 },
      { letter: "C", text: "Difficilement", value: 0 },
    ],
  },
  {
    id: 7,
    dimension: "motivation",
    part: 2,
    text: "Quand tu es motivé :",
    options: [
      { letter: "A", text: "Je reste constant", value: 2 },
      { letter: "B", text: "Ça dure peu", value: 1 },
      { letter: "C", text: "Ça disparaît vite", value: 0 },
    ],
  },
  {
    id: 8,
    dimension: "emotion",
    part: 2,
    text: "Ton plus gros problème aujourd'hui :",
    options: [
      { letter: "A", text: "Discipline", value: 2 },
      { letter: "B", text: "Motivation", value: 1 },
      { letter: "C", text: "Concentration", value: 0 },
    ],
  },
  {
    id: 9,
    dimension: "discipline",
    part: 2,
    text: "Tu gères ton temps :",
    options: [
      { letter: "A", text: "Bien", value: 2 },
      { letter: "B", text: "Mal", value: 1 },
      { letter: "C", text: "Pas du tout", value: 0 },
    ],
  },
  {
    id: 10,
    dimension: "motivation",
    part: 2,
    text: "Tu travailles mieux :",
    options: [
      { letter: "A", text: "Seul", value: 2 },
      { letter: "B", text: "Avec pression", value: 1 },
      { letter: "C", text: "Seulement quand j'ai envie", value: 0 },
    ],
  },

  // ── PART 3: Intelligence & Créativité (Q11-14) ──
  {
    id: 11,
    dimension: "cognition",
    part: 3,
    text: "Tu préfères :",
    options: [
      { letter: "A", text: "Résoudre des problèmes", value: 2 },
      { letter: "B", text: "Comprendre et analyser", value: 1 },
      { letter: "C", text: "Créer et imaginer", value: 0 },
    ],
  },
  {
    id: 12,
    dimension: "cognition",
    part: 3,
    text: "Tu apprends mieux quand :",
    options: [
      { letter: "A", text: "C'est logique", value: 2 },
      { letter: "B", text: "C'est expliqué", value: 1 },
      { letter: "C", text: "C'est visuel/pratique", value: 0 },
    ],
  },
  {
    id: 13,
    dimension: "motivation",
    part: 3,
    text: "Quand tu as une idée :",
    options: [
      { letter: "A", text: "Je la développe", value: 2 },
      { letter: "B", text: "J'y pense puis j'oublie", value: 1 },
      { letter: "C", text: "Je ne fais rien", value: 0 },
    ],
  },
  {
    id: 14,
    dimension: "cognition",
    part: 3,
    text: "Tu es plutôt :",
    options: [
      { letter: "A", text: "Logique", value: 2 },
      { letter: "B", text: "Équilibré", value: 1 },
      { letter: "C", text: "Créatif", value: 0 },
    ],
  },

  // ── PART 4: État Mental & Émotionnel (Q15-17) ──
  {
    id: 15,
    dimension: "emotion",
    part: 4,
    text: "En ce moment tu te sens :",
    options: [
      { letter: "A", text: "Stable", value: 2 },
      { letter: "B", text: "Stressé", value: 1 },
      { letter: "C", text: "Perdu", value: 0 },
    ],
  },
  {
    id: 16,
    dimension: "emotion",
    part: 4,
    text: "Tu doutes de toi :",
    options: [
      { letter: "A", text: "Rarement", value: 2 },
      { letter: "B", text: "Parfois", value: 1 },
      { letter: "C", text: "Souvent", value: 0 },
    ],
  },
  {
    id: 17,
    dimension: "emotion",
    part: 4,
    text: "Ta plus grande peur :",
    options: [
      { letter: "A", text: "Échouer", value: 2 },
      { letter: "B", text: "Décevoir", value: 1 },
      { letter: "C", text: "Ne rien devenir", value: 0 },
    ],
  },

  // ── PART 5: Orientation & Vision (Q18-20) ──
  {
    id: 18,
    dimension: "cognition",
    part: 5,
    text: "Tu préfères :",
    options: [
      { letter: "A", text: "Sciences", value: 2 },
      { letter: "B", text: "Lettres", value: 1 },
      { letter: "C", text: "Technique / Professionnel", value: 0 },
    ],
  },
  {
    id: 19,
    dimension: "motivation",
    part: 5,
    text: "Tu fais tes choix :",
    options: [
      { letter: "A", text: "Pour toi", value: 2 },
      { letter: "B", text: "Avec influence", value: 1 },
      { letter: "C", text: "Par pression", value: 0 },
    ],
  },
  {
    id: 20,
    dimension: "motivation",
    part: 5,
    text: "Es-tu prêt à changer pour réussir ?",
    options: [
      { letter: "A", text: "Oui totalement", value: 2 },
      { letter: "B", text: "Un peu", value: 1 },
      { letter: "C", text: "Non", value: 0 },
    ],
  },
];

// ── Scoring (V2: max 10 per dimension, 40 total) ────────────────────

export function calculateScores(answers: number[]): DimensionScores {
  const scores: DimensionScores = {
    cognition: 0,
    discipline: 0,
    emotion: 0,
    motivation: 0,
  };

  QUESTIONS.forEach((q, idx) => {
    const raw = answers[idx] ?? 0;
    scores[q.dimension] += raw;
  });

  return scores;
}

// Confidence = total score as a percentage of maximum (40)
export function calculateConfidence(scores: DimensionScores): number {
  const total =
    scores.cognition + scores.discipline + scores.emotion + scores.motivation;
  return Math.round((total / MAX_TOTAL_SCORE) * 100);
}

// ── Profile Detection (V2 thresholds: max 10/dimension) ────────────

export function determineProfile(scores: DimensionScores): ProfileKey {
  const { cognition, discipline, emotion, motivation } = scores;
  const total = cognition + discipline + emotion + motivation;

  // Perdu: overall very low (less than 40% = 16/40)
  if (total < 16) return "perdu";

  // Instable: emotion is notably low while other areas may be decent
  if (emotion < 4 && Math.max(cognition, discipline, motivation) >= 5) {
    return "instable";
  }

  // Find the dominant dimension (excluding emotion for main profiles)
  const max = Math.max(cognition, discipline, motivation);

  if (cognition === max && cognition >= 6) return "analytique";
  if (discipline === max && discipline >= 6) return "discipline";
  if (motivation === max && motivation >= 6) return "ambitieux";

  // No strong dominant — use highest score as tiebreaker
  if (cognition >= discipline && cognition >= motivation) return "analytique";
  if (discipline >= cognition && discipline >= motivation) return "discipline";
  return "ambitieux";
}

// ── Profile Definitions ─────────────────────────────────────────────

export const PROFILES: Record<ProfileKey, Profile> = {
  analytique: {
    key: "analytique",
    title: "Analytique",
    emoji: "🧠",
    description:
      "Tu as une forte capacité d'analyse et de compréhension. Tu excelles dans la réflexion logique et la résolution de problèmes.",
    color: "text-primary",
  },
  ambitieux: {
    key: "ambitieux",
    title: "Ambitieux",
    emoji: "🚀",
    description:
      "Tu as de grandes ambitions et une forte motivation. Tu es prêt(e) à travailler dur pour atteindre tes objectifs.",
    color: "text-accent",
  },
  instable: {
    key: "instable",
    title: "Instable",
    emoji: "🌊",
    description:
      "Tu sembles traverser une période de stress ou d'instabilité émotionnelle. Cela ne définit pas qui tu es — c'est temporaire et ça se travaille.",
    color: "text-orange-400",
  },
  discipline: {
    key: "discipline",
    title: "Discipliné",
    emoji: "📐",
    description:
      "Ta rigueur et ton organisation sont tes armes principales. Tu sais rester concentré(e) et constant(e) dans tes efforts.",
    color: "text-yellow-400",
  },
  perdu: {
    key: "perdu",
    title: "Perdu",
    emoji: "🧭",
    description:
      "Tu manques de direction et de clarté. Ce n'est pas une faiblesse — c'est un point de départ. Psyché peut t'aider à trouver ta voie.",
    color: "text-destructive",
  },
};

// ── Levels ────────────────────────────────────────────────────────────

export type StudentLevel = "college" | "lycee" | "universite";

export const LEVEL_LABELS: Record<StudentLevel, string> = {
  college: "Collège",
  lycee: "Lycée",
  universite: "Université",
};

// ── Helper: get max score for an assessment version ──────────────────
// V1 (old format with reversed questions, max 15) vs V2 (A/B/C, max 10)
export function getMaxScore(version?: number): number {
  return (version ?? 1) >= 2 ? MAX_DIMENSION_SCORE : 15;
}

export function getMaxTotal(version?: number): number {
  return (version ?? 1) >= 2 ? MAX_TOTAL_SCORE : 60;
}

// Get the first question index for a given part
export function getPartStartIndex(partNumber: number): number {
  return QUESTIONS.findIndex((q) => q.part === partNumber);
}

// Get all questions for a given part
export function getPartQuestions(partNumber: number): Question[] {
  return QUESTIONS.filter((q) => q.part === partNumber);
}
