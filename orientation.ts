import type { ProfileKey, DimensionScores, StudentLevel } from "./assessment.ts";

export type SeriesEntry = {
  code: string;
  name: string;
  difficulty: 1 | 2 | 3;
  careers: string[];
  subjects: string[];
  status: "recommended" | "possible" | "avoid";
  reason: string;
  condition?: string;
};

export type WeekDay = {
  day: string;
  focus: string;
  tasks: string[];
};

export type ProfileGuidance = {
  motivation: string;
  strengths: string[];
  warnings: string[];
  weeklyPlan: WeekDay[];
};

export type NextStep = {
  icon: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
};

// Full series catalog for West African / French baccalauréat
const SERIES_CATALOG: Record<
  string,
  { name: string; difficulty: 1 | 2 | 3; careers: string[]; subjects: string[] }
> = {
  S: {
    name: "Scientifique",
    difficulty: 3,
    careers: ["Ingénieur", "Médecin", "Chercheur", "Architecte", "Pilote"],
    subjects: ["Mathématiques", "Physique-Chimie", "SVT", "Français", "Anglais"],
  },
  L: {
    name: "Littéraire",
    difficulty: 1,
    careers: ["Journaliste", "Avocat", "Enseignant", "Écrivain", "Diplomate"],
    subjects: ["Français", "Philosophie", "Histoire-Géo", "Langues vivantes", "Littérature"],
  },
  G: {
    name: "Commerce/Économie",
    difficulty: 2,
    careers: ["Comptable", "Manager", "Entrepreneur", "Banquier", "Économiste"],
    subjects: ["Économie", "Comptabilité", "Mathématiques", "Droit", "Informatique"],
  },
  T: {
    name: "Technique",
    difficulty: 2,
    careers: ["Technicien", "Informaticien", "Électricien", "Mécanicien", "Technicien de lab"],
    subjects: ["Technologie", "Maths appliquées", "Physique", "Dessin technique", "Informatique"],
  },
};

function buildSeries(
  code: string,
  status: "recommended" | "possible" | "avoid",
  reason: string,
  condition?: string,
): SeriesEntry {
  const base = SERIES_CATALOG[code];
  return {
    code,
    name: base.name,
    difficulty: base.difficulty,
    careers: base.careers,
    subjects: base.subjects,
    status,
    reason,
    condition,
  };
}

// ── Level-Specific Advice ────────────────────────────────────────

export type LevelAdvice = {
  title: string;
  message: string;
  action: string;
  tips: string[];
};

export function getLevelAdvice(
  level: StudentLevel | undefined,
  profileKey: ProfileKey,
): LevelAdvice {
  if (level === "college") {
    return {
      title: "Orientation collège",
      message:
        "Tu es encore en phase de découverte. Tes résultats montrent des tendances, pas des certitudes. Explore différentes matières et activités.",
      action:
        "Nous te recommandons d'explorer les matières qui t'attirent et de ne pas te limiter.",
      tips: [
        "Participe aux journées portes ouvertes des lycées",
        "Parle de tes intérêts avec ton professeur principal",
        "Essaie des activités extrascolaires variées",
        "N'aie pas peur de tester de nouvelles matières",
      ],
    };
  }
  if (level === "lycee") {
    return {
      title: "Confirmation ou ajustement",
      message:
        "Tu es au lycée, un moment clé pour confirmer ou ajuster ton parcours. Tes résultats peuvent t'aider à faire un choix éclairé.",
      action:
        profileKey === "perdu"
          ? "Nous te recommandons de parler à un conseiller d'orientation pour clarifier tes objectifs."
          : "Nous te recommandons de renforcer tes points forts et de travailler sur tes faiblesses identifiées.",
      tips: [
        "Consulte un conseiller d'orientation au lycée",
        "Renseigne-toi sur les concours et examens d'entrée",
        "Participe à des salons d'orientation si possible",
        "Prépare ton dossier scolaire dès maintenant",
      ],
    };
  }
  if (level === "universite") {
    return {
      title: "Analyse de satisfaction",
      message:
        "Tu es à l'université. Tes résultats peuvent t'aider à évaluer si ta filière actuelle correspond à tes aptitudes.",
      action:
        profileKey === "perdu" || profileKey === "instable"
          ? "Si tu ne te sens pas à ta place, une réorientation peut être la meilleure décision. Consulte le service d'orientation de ton université."
          : "Tes aptitudes semblent correspondre à un parcours ambitieux. Continue à développer tes compétences.",
      tips: [
        "Visite le service d'orientation de ton campus",
        "Recherche des stages dans ton domaine d'intérêt",
        "Rejoins des associations étudiantes liées à tes objectifs",
        "Développe des compétences complémentaires (langues, informatique)",
      ],
    };
  }
  // Default
  return {
    title: "Ton orientation",
    message: "Ton choix ne définit pas toute ta vie. Tu peux évoluer.",
    action: "Nous te recommandons de suivre tes intérêts et de rester ouvert(e) aux opportunités.",
    tips: [
      "Explore les matières qui t'intéressent",
      "N'hésite pas à demander conseil",
      "Tes résultats sont indicatifs, pas définitifs",
      "Concentre-toi sur ce qui te motive",
    ],
  };
}

// ── Personalized Next Steps ──────────────────────────────────────

export function getNextSteps(
  scores: DimensionScores,
  profileKey: ProfileKey,
  level: StudentLevel | undefined,
): NextStep[] {
  const steps: NextStep[] = [];
  const { cognition, discipline, emotion, motivation } = scores;

  // Weakest dimension — always high priority
  const dims: { key: string; score: number; label: string }[] = [
    { key: "cognition", score: cognition, label: "Cognition" },
    { key: "discipline", score: discipline, label: "Discipline" },
    { key: "emotion", score: emotion, label: "Émotion" },
    { key: "motivation", score: motivation, label: "Motivation" },
  ];
  const weakest = dims.reduce((a, b) => (a.score < b.score ? a : b));
  const strongest = dims.reduce((a, b) => (a.score > b.score ? a : b));

  // Always: address the weakest dimension
  const weakSteps: Record<string, NextStep> = {
    cognition: {
      icon: "🧠",
      title: "Renforce ta compréhension",
      description: "Consacre 20 min/jour à des exercices de logique et de réflexion. Utilise des méthodes comme les schémas et les mind maps.",
      priority: "high",
    },
    discipline: {
      icon: "📐",
      title: "Installe une routine d'étude",
      description: "Planifie 2 à 3 créneaux d'étude fixes par semaine. Commence par 30 min et augmente progressivement.",
      priority: "high",
    },
    emotion: {
      icon: "💭",
      title: "Apprends à gérer ton stress",
      description: "Pratique 5 min de respiration profonde avant chaque session. Écris tes émotions pour mieux les comprendre.",
      priority: "high",
    },
    motivation: {
      icon: "🔥",
      title: "Retrouve ta flamme",
      description: "Fixe-toi un objectif précis pour les 30 prochains jours. Écris pourquoi tu veux réussir et relis-le chaque matin.",
      priority: "high",
    },
  };
  steps.push(weakSteps[weakest.key]);

  // Capitalize on strength
  steps.push({
    icon: "⭐",
    title: `Capitalise sur ta ${strongest.label.toLowerCase()}`,
    description: `Ta ${strongest.label.toLowerCase()} est ton meilleur atout. Utilise-la comme levier pour progresser dans les autres domaines.`,
    priority: "medium",
  });

  // Profile-specific advice
  if (profileKey === "perdu") {
    steps.push({
      icon: "🧭",
      title: "Parle à un adulte de confiance",
      description: "Un professeur, un parent ou un conseiller peut t'aider à y voir plus clair. Tu n'as pas à tout résoudre seul(e).",
      priority: "high",
    });
  } else if (profileKey === "instable") {
    steps.push({
      icon: "🌊",
      title: "Prends soin de ton bien-être",
      description: "L'exercice physique, le sommeil régulier et les pauses sont aussi importants que le travail. Ne t'oublie pas.",
      priority: "high",
    });
  } else if (profileKey === "ambitieux") {
    steps.push({
      icon: "🎯",
      title: "Transforme l'ambition en plan concret",
      description: "Découpe tes grands objectifs en étapes hebdomadaires. Un petit progrès chaque jour vaut mieux qu'un sprint suivi d'abandon.",
      priority: "medium",
    });
  }

  // Level-specific step
  if (level === "college") {
    steps.push({
      icon: "🔍",
      title: "Explore avant de choisir",
      description: "Tu as le temps ! Essaie différentes matières et activités pour mieux te connaître avant de t'orienter.",
      priority: "medium",
    });
  } else if (level === "lycee") {
    steps.push({
      icon: "📋",
      title: "Prépare ton dossier d'orientation",
      description: "Tes résultats de cette année comptent. Identifie les matières clés pour la série qui t'intéresse et travaille-les en priorité.",
      priority: "high",
    });
  } else if (level === "universite") {
    steps.push({
      icon: "🚀",
      title: "Passe à l'action professionnelle",
      description: "Recherche un stage, rejoins un club ou lance un projet personnel en lien avec ta future carrière.",
      priority: "medium",
    });
  }

  // Always add the tracking recommendation
  steps.push({
    icon: "📈",
    title: "Suis ta progression",
    description: "Utilise le suivi quotidien de Psyché pour mesurer tes efforts et repasse le test dans 2 à 4 semaines pour voir ton évolution.",
    priority: "low",
  });

  return steps;
}

// ── Subject Recommendations ──────────────────────────────────────

export type SubjectRecommendation = {
  name: string;
  priority: "essentiel" | "important" | "utile";
  reason: string;
};

export function getSubjectRecommendations(
  scores: DimensionScores,
  profileKey: ProfileKey,
  orientations: SeriesEntry[],
): SubjectRecommendation[] {
  const recommended = orientations.filter((o) => o.status === "recommended");
  if (recommended.length === 0) return [];

  // Collect all subjects from recommended series
  const subjectSet = new Map<string, SubjectRecommendation>();

  for (const series of recommended) {
    series.subjects.forEach((subj, idx) => {
      if (!subjectSet.has(subj)) {
        subjectSet.set(subj, {
          name: subj,
          priority: idx < 2 ? "essentiel" : idx < 4 ? "important" : "utile",
          reason: `Clé pour la série ${series.code} — ${series.name}`,
        });
      }
    });
  }

  // Sort: essentiel > important > utile
  const order = { essentiel: 0, important: 1, utile: 2 };
  return [...subjectSet.values()].sort(
    (a, b) => order[a.priority] - order[b.priority],
  );
}

// ── Series Orientation ───────────────────────────────────────────────

export function getOrientations(
  scores: DimensionScores,
  profileKey: ProfileKey,
  version?: number,
): SeriesEntry[] {
  // Normalize scores to percentages so logic works for both V1 (/15) and V2 (/10)
  const maxScore = (version ?? 1) >= 2 ? 10 : 15;
  const cogPct = (scores.cognition / maxScore) * 100;
  const disPct = (scores.discipline / maxScore) * 100;
  const motPct = (scores.motivation / maxScore) * 100;

  const result: SeriesEntry[] = [];

  // Série S
  if (cogPct >= 73 && disPct >= 67) {
    result.push(buildSeries("S", "recommended", "Ton niveau cognitif et ta rigueur correspondent parfaitement à cette filière d'excellence."));
  } else if (cogPct >= 60 && disPct >= 47) {
    result.push(buildSeries("S", "possible", "Tu as le potentiel intellectuel, mais il faudra renforcer ta régularité.", "En améliorant ta discipline"));
  } else if (cogPct < 47) {
    result.push(buildSeries("S", "avoid", "Cette filière exige une très forte base scientifique que tu dois d'abord consolider."));
  }

  // Série L
  if (profileKey === "perdu" || motPct >= 67) {
    result.push(buildSeries("L", "recommended", "Excellente filière si tu aimes lire, écrire et argumenter."));
  } else if (cogPct < 53) {
    result.push(buildSeries("L", "possible", "Bonne alternative si tu préfères les matières littéraires."));
  }

  // Série G
  if (motPct >= 60 || profileKey === "discipline") {
    result.push(buildSeries("G", "recommended", "Parfaite si tu as le sens des affaires et aimes les chiffres appliqués."));
  } else {
    result.push(buildSeries("G", "possible", "Option solide offrant de nombreux débouchés professionnels."));
  }

  // Série T
  if (profileKey === "discipline" || (cogPct < 53 && disPct >= 53)) {
    result.push(buildSeries("T", "recommended", "Filière technique pratique avec d'excellents débouchés."));
  } else if (cogPct >= 53) {
    result.push(buildSeries("T", "possible", "Tu as les capacités pour cette filière technique."));
  }

  // Ensure at least one recommended
  if (!result.some((r) => r.status === "recommended")) {
    result.push(buildSeries("G", "recommended", "Filière accessible avec de bons débouchés, adaptée à ton profil actuel."));
  }

  return result.sort((a, b) => {
    const order = { recommended: 0, possible: 1, avoid: 2 };
    return order[a.status] - order[b.status];
  });
}

// ── Profile Guidance ─────────────────────────────────────────────────

const GUIDANCE: Record<ProfileKey, ProfileGuidance> = {
  analytique: {
    motivation: '"L\'intelligence sans action n\'est qu\'une promesse. Passe à l\'acte."',
    strengths: ["Capacité d'analyse rapide", "Compréhension intuitive", "Esprit logique"],
    warnings: ["Évite de négliger les matières non scientifiques", "L'excès de réflexion peut freiner l'action"],
    weeklyPlan: [
      { day: "Lundi", focus: "Mathématiques", tasks: ["2h d'exercices avancés", "Révision du cours"] },
      { day: "Mardi", focus: "Sciences", tasks: ["TP ou exercices pratiques", "Lecture approfondie"] },
      { day: "Mercredi", focus: "Langues", tasks: ["Expression écrite", "Exercices de grammaire"] },
      { day: "Jeudi", focus: "Matières secondaires", tasks: ["Révisions croisées", "Fiches de synthèse"] },
      { day: "Vendredi", focus: "Bilan & projets", tasks: ["Test blanc", "Projet d'orientation"] },
    ],
  },
  ambitieux: {
    motivation: '"L\'ambition est le carburant. La discipline est le moteur."',
    strengths: ["Ambitions élevées", "Énergie et enthousiasme", "Vision claire de l'avenir"],
    warnings: ["L'ambition sans méthode épuise", "Apprends à prioriser"],
    weeklyPlan: [
      { day: "Lundi", focus: "Objectif de la semaine", tasks: ["Fixer 3 objectifs réalistes", "Planifier les actions"] },
      { day: "Mardi", focus: "Matière principale", tasks: ["Travail intensif 2h", "Exercices de progression"] },
      { day: "Mercredi", focus: "Compétences nouvelles", tasks: ["Découvrir un domaine lié à ton projet", "Lecture 30 min"] },
      { day: "Jeudi", focus: "Révisions", tasks: ["Revoir les cours de la semaine", "Préparer les évaluations"] },
      { day: "Vendredi", focus: "Bilan positif", tasks: ["Évaluer les 3 objectifs", "Célébrer chaque progrès"] },
    ],
  },
  instable: {
    motivation: '"Tu n\'es pas faible. Tu traverses une tempête. Et les tempêtes passent."',
    strengths: ["Sensibilité qui peut devenir une force", "Capacité d'empathie"],
    warnings: ["Le stress non géré affecte tes résultats", "Apprends à demander de l'aide"],
    weeklyPlan: [
      { day: "Lundi", focus: "Ancrage", tasks: ["5 min de respiration profonde", "Écrire 3 choses positives"] },
      { day: "Mardi", focus: "Travail progressif", tasks: ["30 min de travail sans pression", "Pause après chaque session"] },
      { day: "Mercredi", focus: "Gestion du stress", tasks: ["Exercice physique 20 min", "Journaling : écrire tes réussites"] },
      { day: "Jeudi", focus: "Révision douce", tasks: ["Relire les notes sans se juger", "Se tester calmement"] },
      { day: "Vendredi", focus: "Bilan bienveillant", tasks: ["Lister 3 choses réussies", "Planifier la semaine suivante sereinement"] },
    ],
  },
  discipline: {
    motivation: '"La discipline bat le talent quand le talent n\'est pas discipliné."',
    strengths: ["Régularité exemplaire", "Persévérance", "Organisation solide"],
    warnings: ["Optimise ta méthode, pas seulement le volume", "N'oublie pas de prendre du recul"],
    weeklyPlan: [
      { day: "Lundi", focus: "Méthode de travail", tasks: ["Identifier les erreurs récurrentes", "Tester une nouvelle technique"] },
      { day: "Mardi", focus: "Exercices ciblés", tasks: ["Se concentrer sur les lacunes", "1h30 de travail intense"] },
      { day: "Mercredi", focus: "Compréhension", tasks: ["Lire et comprendre avant de mémoriser", "Expliquer le cours à voix haute"] },
      { day: "Jeudi", focus: "Révision", tasks: ["Fiches de synthèse", "Exercices chronométrés"] },
      { day: "Vendredi", focus: "Repos actif", tasks: ["Lecture légère liée aux études", "Planifier la semaine suivante"] },
    ],
  },
  perdu: {
    motivation: '"Tu n\'es pas perdu. Tu manques juste de clarté. Et ça se travaille."',
    strengths: ["Courage de faire le test", "Prise de conscience"],
    warnings: ["Ne t'attaque pas à tout en même temps", "Commence par une seule habitude positive"],
    weeklyPlan: [
      { day: "Lundi", focus: "Un petit pas", tasks: ["Travailler 20 min sans distraction", "Célèbre cet effort !"] },
      { day: "Mardi", focus: "Bases essentielles", tasks: ["Identifier la matière la plus urgente", "Revoir le cours de base 30 min"] },
      { day: "Mercredi", focus: "Aide", tasks: ["Parler à un professeur ou tuteur", "Demander une explication sur un point difficile"] },
      { day: "Jeudi", focus: "Motivation", tasks: ["Regarder une vidéo inspirante 10 min", "Écrire pourquoi tu veux réussir"] },
      { day: "Vendredi", focus: "Célébration", tasks: ["Valoriser chaque effort", "Fixer un objectif simple pour la semaine suivante"] },
    ],
  },
};

export function getProfileGuidance(profileKey: ProfileKey): ProfileGuidance {
  return GUIDANCE[profileKey] ?? GUIDANCE.analytique;
}
