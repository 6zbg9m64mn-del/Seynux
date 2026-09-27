import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import {
  Brain,
  ChevronRight,
  Target,
  MessageCircle,
  BarChart3,
  Sparkles,
  ArrowRight,
  LayoutDashboard,
  GraduationCap,
  Shield,
  School,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import Seo from "@/components/Seo.tsx";

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne le test Psyché ?",
    answer:
      "Tu réponds à 20 questions rapides qui explorent 4 dimensions de ta personnalité scolaire : cognition, discipline, émotion et motivation. En 2 minutes, Psyché calcule tes scores et détermine ton profil dominant.",
  },
  {
    question: "Quels profils Psyché peut-il révéler ?",
    answer:
      "Cinq profils sont possibles : Analytique, Ambitieux, Discipliné, Instable et Perdu. Chaque profil est accompagné d'une analyse de tes points forts, de tes points de vigilance et de recommandations concrètes pour progresser.",
  },
  {
    question: "Psyché propose-t-il une orientation scolaire complète ?",
    answer:
      "Oui. Au-delà du test rapide, l'orientation complète prend en compte tes centres d'intérêt, tes valeurs, ton contexte familial et financier pour suggérer des séries (S, L, G, T) et des filières adaptées à ton profil.",
  },
  {
    question: "Le test est-il gratuit ?",
    answer:
      "Le test de base et ton profil sont accessibles gratuitement. Des forfaits payants permettent de débloquer l'analyse complète, le plan d'étude personnalisé et le suivi d'évolution dans le temps.",
  },
  {
    question: "Psyché remplace-t-il un conseiller d'orientation ?",
    answer:
      "Non. Psyché est un outil d'aide à la réflexion scolaire. Il ne remplace pas l'avis d'un psychologue, d'un professeur ou d'un conseiller d'orientation professionnel. Les résultats sont purement indicatifs.",
  },
];

const features = [
  {
    icon: Brain,
    label: "Test intelligent",
    desc: "20 questions en 2 minutes",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: Target,
    label: "5 profils uniques",
    desc: "Analyse multidimensionnelle",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
  {
    icon: GraduationCap,
    label: "Orientation scolaire",
    desc: "Séries S, L, G, T recommandées",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
  },
  {
    icon: MessageCircle,
    label: "Accompagnement",
    desc: "Motivation & suivi quotidien",
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
  },
];

const steps = [
  {
    num: "01",
    title: "Réponds à 20 questions",
    desc: "Un test rapide et interactif qui analyse 4 dimensions de ta personnalité scolaire.",
  },
  {
    num: "02",
    title: "Découvre ton profil",
    desc: "Analytique, Ambitieux, Discipliné, Instable ou Perdu — comprends qui tu es vraiment.",
  },
  {
    num: "03",
    title: "Reçois ton orientation",
    desc: "Séries recommandées, métiers suggérés et plan d'action personnalisé pour réussir.",
  },
];

const PATHS = [
  {
    key: "college",
    icon: School,
    title: "Collège",
    subtitle: "3e et avant",
    desc: "Découvre ta personnalité et explore les grandes voies possibles pour le lycée.",
    path: "/orientation",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/25 hover:border-blue-500/50",
    iconBg: "bg-blue-500/15",
  },
  {
    key: "lycee",
    icon: BookOpen,
    title: "Lycée",
    subtitle: "2nde, 1ère, Terminale",
    desc: "Test complet + notes scolaires pour trouver ta série idéale (S, L, G, T).",
    path: "/test",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/25 hover:border-primary/50",
    iconBg: "bg-primary/15",
  },
  {
    key: "etudiant",
    icon: Briefcase,
    title: "Étudiant",
    subtitle: "Après le bac",
    desc: "Explore les métiers, filières supérieures et débouchés qui te correspondent.",
    path: "/orientation",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/25 hover:border-accent/50",
    iconBg: "bg-accent/15",
  },
];

/** Discrete admin link — only visible to admins */
function AdminLink() {
  const isAdmin = useQuery(api.users.isCurrentUserAdmin, {});
  const navigate = useNavigate();

  if (!isAdmin) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate("/admin")}
      className="rounded-xl text-muted-foreground/50 hover:text-primary gap-1.5 text-xs"
    >
      <Shield className="w-3.5 h-3.5" />
      Admin
    </Button>
  );
}

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Seo
        title="Psyché – Test d'orientation scolaire gratuit"
        description="Découvre ton profil scolaire en 20 questions et 2 minutes. Psyché analyse ta personnalité et te propose une orientation adaptée : séries, filières et plan d'action."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full bg-yellow-400/5 blur-[80px]" />
      </div>

      <div className="relative z-10">
        {/* ── Hero Section ── */}
        <section className="flex flex-col items-center text-center px-6 pt-16 pb-12 max-w-2xl mx-auto gap-7">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30">
              <Brain className="w-12 h-12 text-background" strokeWidth={1.5} />
            </div>
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-xl -z-10" />
          </motion.div>

          {/* Brand */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-3"
          >
            <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-foreground">
              Psyché
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground text-balance leading-relaxed">
              Comprends-toi.{" "}
              <span className="text-primary font-bold">Décide mieux.</span>
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center gap-3 w-full"
          >
            <p className="text-sm text-muted-foreground/70">
              Choisis ton parcours pour commencer
            </p>
          </motion.div>
        </section>

        {/* ── Path Chooser ── */}
        <section className="px-6 pb-14 max-w-2xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid sm:grid-cols-3 gap-3"
          >
            {PATHS.map((p, i) => (
              <motion.button
                key={p.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                onClick={() => navigate(p.path + (p.key !== "lycee" ? `?level=${p.key}` : ""))}
                className={`text-left p-5 rounded-3xl border-2 transition-all cursor-pointer active:scale-[0.98] ${p.bg}`}
              >
                <div className={`w-11 h-11 rounded-2xl ${p.iconBg} flex items-center justify-center mb-3`}>
                  <p.icon className={`w-5 h-5 ${p.color}`} />
                </div>
                <p className={`font-black text-lg ${p.color}`}>{p.title}</p>
                <p className="text-xs text-muted-foreground/70 font-semibold mb-2">{p.subtitle}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className={`flex items-center gap-1 mt-3 text-xs font-bold ${p.color}`}>
                  Commencer
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.button>
            ))}
          </motion.div>

          <div className="mt-5 flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground/70">
              20 questions · 2 minutes · Gratuit
            </p>

            <Authenticated>
              <div className="flex flex-col items-center gap-1.5 mt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                  className="rounded-xl text-muted-foreground hover:text-primary gap-1.5"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Mon tableau de bord
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/grades")}
                  className="rounded-xl text-muted-foreground hover:text-primary gap-1.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  Mes notes
                </Button>
                <AdminLink />
              </div>
            </Authenticated>

            <Unauthenticated>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-muted-foreground/40">|</span>
                <SignInButton className="h-7 px-3 text-xs rounded-xl" />
              </div>
            </Unauthenticated>
          </div>
        </section>

        {/* ── Features Grid ── */}
        <section className="px-6 pb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="grid grid-cols-2 gap-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 text-left"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${f.bg} border flex items-center justify-center shrink-0`}
                >
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {f.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── How it works ── */}
        <section className="px-6 pb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Comment ça marche
              </span>
              <h2 className="text-2xl font-black text-foreground mt-2">
                3 étapes simples
              </h2>
            </div>

            <div className="space-y-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-primary">
                      {s.num}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {s.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Profiles preview ── */}
        <section className="px-6 pb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                5 profils possibles
              </span>
              <h2 className="text-2xl font-black text-foreground mt-2">
                Lequel es-tu ?
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {[
                { emoji: "🧠", name: "Analytique", color: "border-primary/30 bg-primary/10 text-primary" },
                { emoji: "🚀", name: "Ambitieux", color: "border-accent/30 bg-accent/10 text-accent" },
                { emoji: "📐", name: "Discipliné", color: "border-yellow-400/30 bg-yellow-400/10 text-yellow-400" },
                { emoji: "🌊", name: "Instable", color: "border-orange-400/30 bg-orange-400/10 text-orange-400" },
                { emoji: "🧭", name: "Perdu", color: "border-destructive/30 bg-destructive/10 text-destructive" },
              ].map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`px-4 py-2 rounded-2xl border font-bold text-sm flex items-center gap-2 ${p.color}`}
                >
                  <span>{p.emoji}</span>
                  {p.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Stats / Social proof ── */}
        <section className="px-6 pb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-6 grid grid-cols-3 gap-4 text-center"
          >
            {[
              { value: "20", label: "Questions", icon: Sparkles },
              { value: "4", label: "Dimensions", icon: BarChart3 },
              { value: "2 min", label: "Durée", icon: ArrowRight },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <stat.icon className="w-4 h-4 text-primary mx-auto" />
                <p className="text-xl font-black text-foreground">
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Final CTA ── */}
        <section className="px-6 pb-12 max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <Button
              size="lg"
              onClick={() => navigate("/test")}
              className="w-full text-base font-black py-6 rounded-2xl shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-accent text-background hover:opacity-90 transition-opacity"
            >
              Commencer mon analyse
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-6 pb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Questions fréquentes
              </span>
              <h2 className="text-2xl font-black text-foreground mt-2">
                Tout savoir sur Psyché
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl p-5 text-left"
                >
                  <h3 className="text-sm font-bold text-foreground">
                    {item.question}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Disclaimer ── */}
        <footer className="px-6 pb-10 max-w-lg mx-auto">
          <div className="border-t border-border pt-6 space-y-4 text-center">
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              Psyché est un outil d{"'"}aide à la réflexion scolaire. Il ne remplace pas un
              psychologue, un professeur ou un conseiller d{"'"}orientation. Les résultats sont purement indicatifs.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => navigate("/mentions-legales")}
                className="text-xs text-muted-foreground/50 hover:text-primary transition-colors underline"
              >
                Mentions légales
              </button>
              <span className="text-muted-foreground/30">·</span>
              <button
                onClick={() => navigate("/confidentialite")}
                className="text-xs text-muted-foreground/50 hover:text-primary transition-colors underline"
              >
                Confidentialité
              </button>
              <span className="text-muted-foreground/30">·</span>
              <button
                onClick={() => navigate("/cgu")}
                className="text-xs text-muted-foreground/50 hover:text-primary transition-colors underline"
              >
                CGU
              </button>
            </div>
            <p className="text-xs text-muted-foreground/40">
              {new Date().getFullYear()} Psyché · Tous droits réservés
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
