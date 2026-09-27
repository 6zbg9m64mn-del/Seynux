import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useState, useCallback } from "react";
import { useReport } from "@/hooks/use-report.ts";
import ReportUnavailable from "@/components/report-unavailable.tsx";
import ReportPrivacy from "@/components/report-privacy.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Authenticated } from "convex/react";
import { toast } from "sonner";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import {
  Brain,
  Star,
  TrendingUp,
  Heart,
  AlertTriangle,
  BookOpen,
  Target,
  Users,
  Coins,
  Globe,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Lock,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import {
  SECTIONS,
  type V2ExtendedData,
  type V2OrientationResult,
} from "@/lib/assessment-v2.ts";
import { SERIES_DATABASE } from "@/lib/series-database.ts";

// ── Score bar ─────────────────────────────────────────────────────────────

function ScoreBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="font-bold text-foreground">{pct}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
}

// ── Serie card ───────────────────────────────────────────────────────────

function SerieCard({
  serieKey,
  rank,
  isPrimary,
}: {
  serieKey: string;
  rank: number;
  isPrimary: boolean;
}) {
  const [open, setOpen] = useState(false);
  const serie = SERIES_DATABASE[serieKey];

  if (!serie) {
    return (
      <div className="p-4 rounded-2xl border border-border/60 bg-card/60">
        <p className="text-sm font-bold">{serieKey}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200",
        isPrimary
          ? "border-primary/40 bg-primary/5"
          : "border-border/60 bg-card/60",
      )}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full p-4 text-left flex items-center gap-3 cursor-pointer"
      >
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black shrink-0",
            isPrimary ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
          )}
        >
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-foreground">{serie.name}</p>
            {isPrimary && (
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">
                Recommandé
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">{serie.shortDesc}</p>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden px-4 pb-4 space-y-3"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">{serie.description}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-background/60 border border-border/40">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">
                Matières principales
              </p>
              <p className="text-xs font-medium">{serie.mainSubjects.join(", ")}</p>
            </div>
            <div className="p-3 rounded-xl bg-background/60 border border-border/40">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">
                Niveau
              </p>
              <p className="text-xs font-medium">{serie.difficulty}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-background/60 border border-border/40">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">
              Métiers accessibles
            </p>
            <p className="text-xs">{serie.careers.slice(0, 5).join(" · ")}</p>
          </div>

          <div className="p-3 rounded-xl bg-background/60 border border-border/40">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">
              Études supérieures
            </p>
            <p className="text-xs">{serie.higherStudies.slice(0, 4).join(" · ")}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-[10px] uppercase tracking-wider text-emerald-400/80 mb-1">
                Avantages
              </p>
              <ul className="space-y-1">
                {serie.advantages.slice(0, 3).map((a) => (
                  <li key={a} className="text-xs text-muted-foreground flex gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-[10px] uppercase tracking-wider text-amber-400/80 mb-1">
                Contraintes
              </p>
              <ul className="space-y-1">
                {serie.constraints.slice(0, 3).map((c) => (
                  <li key={c} className="text-xs text-muted-foreground flex gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function OrientationResultsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"analyse" | "plan">("analyse");
  const [payerPhone, setPayerPhone] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  const unlockAssessment = useMutation(api.assessments.unlockAssessment);

  const { report: assessment, accessKey } = useReport(id);
  const isPaid = !!assessment?.fullOrientation;
  const isPending = assessment?.paymentStatus === "pending";
  const stored = assessment?.preview;

  const handleUnlock = useCallback(async () => {
    if (!id || !payerPhone.trim()) {
      toast.error("Entrez votre numéro de téléphone pour continuer.");
      return;
    }
    setIsUnlocking(true);
    try {
      await unlockAssessment({
        id: id as Id<"assessments">,
        accessKey,
        tier: selectedTier,
        payerPhone: payerPhone.trim(),
      });
      setShowPaywall(false);
      toast.success("Paiement enregistré ! Votre analyse sera débloquée automatiquement dans 5 minutes.");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Erreur lors de l'enregistrement du paiement.");
      }
    } finally {
      setIsUnlocking(false);
    }
  }, [id, accessKey, selectedTier, payerPhone, unlockAssessment]);

  // Still loading
  if (assessment === undefined) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <p className="pt-4 text-muted-foreground text-sm">Chargement de votre orientation…</p>
      </div>
    );
  }

  if (!assessment) return <ReportUnavailable />;

  if (!stored) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <Brain className="w-12 h-12 text-primary mb-4" />
        <p className="text-muted-foreground text-sm">Résultats introuvables.</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate("/orientation")}>
          Refaire le questionnaire
        </Button>
      </div>
    );
  }

  const { data, orientation } = stored;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border/30 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-bold text-sm">Psyché</span>
          </button>
          <span className="text-xs text-muted-foreground/60">
            {data.level === "college"
              ? "Orientation · Collège"
              : data.level === "etudiant"
                ? "Orientation · Étudiant"
                : "Résultats d'orientation"}
          </span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-8">
        <ReportPrivacy id={assessment._id} access={assessment.access} accessKey={accessKey} />
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center text-4xl shadow-lg shadow-primary/20">
            🧭
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground mb-1">
              Profil {orientation.personalityType}
            </h1>
            <p className="text-sm text-muted-foreground text-balance leading-relaxed px-4">
              {orientation.summary}
            </p>
          </div>

          {/* Coherence score */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">
              {orientation.coherenceScore}% de cohérence de profil
            </span>
          </div>
        </motion.div>

        {/* ── FREE section ─────────────────────────────────────────────── */}

        {/* Wellbeing alert */}
        {orientation.wellbeingAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30"
          >
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-300 mb-1">
                  Prends soin de toi
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tu as signalé plusieurs indicateurs de stress. Psyché n'est pas un outil
                  médical. Nous te recommandons de consulter un psychologue, un conseiller
                  d'orientation ou un adulte de confiance.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Dominant interests */}
        {orientation.dominantInterests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold text-foreground">Tes centres d'intérêt majeurs</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {orientation.dominantInterests.map((i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-300"
                >
                  {i}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Dominant values */}
        {orientation.dominantValues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-bold text-foreground">Tes valeurs dominantes</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {orientation.dominantValues.map((v) => (
                <span
                  key={v}
                  className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-300"
                >
                  {v}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Life project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-sky-400" />
            <p className="text-sm font-semibold text-sky-300">Projet de vie aligné</p>
          </div>
          <p className="text-sm text-foreground font-bold">{orientation.lifeProjectAlignment}</p>
          {data.dreamJob && (
            <p className="text-xs text-muted-foreground mt-1">
              Métier de rêve : {data.dreamJob}
            </p>
          )}
        </motion.div>

        {/* ── PAYWALL ───────────────────────────────────────────────────── */}

        {!isPaid ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Teaser blurred content */}
            <div className="relative">
              <div className="p-4 rounded-2xl border border-border/60 bg-card/40 blur-sm pointer-events-none select-none">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <p className="text-sm font-bold">{data.level === "etudiant" ? "Pistes professionnelles à explorer" : "Séries sénégalaises compatibles"}</p>
                </div>
                <div className="space-y-2">
                  {(data.level === "etudiant"
                    ? ["Tes forces", "Tes pistes professionnelles", "Tes prochaines actions"]
                    : ["Tes séries possibles", "Les matières à renforcer", "Tes prochaines actions"]).map(
                    (s) => (
                      <div
                        key={s}
                        className="h-12 rounded-xl bg-muted/60 flex items-center px-3 text-sm"
                      >
                        {s}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <Lock className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm font-semibold text-foreground text-center px-4">
                  Débloquez votre analyse complète
                </p>
              </div>
            </div>

            {/* Offers */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-primary/40 bg-primary/5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-foreground">Analyse complète</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {data.level === "etudiant"
                        ? "Pistes professionnelles, facteurs familiaux et culturels, plan indicatif sur 12 mois"
                        : "Séries compatibles détaillées, facteurs familiaux et culturels, plan 12 mois"}
                    </p>
                  </div>
                  <span className="text-lg font-black text-primary">1 000 F</span>
                </div>
                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-accent text-background font-bold"
                  onClick={() => { setSelectedTier("analyse"); setShowPaywall(true); }}
                >
                  Débloquer mon analyse
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="p-4 rounded-2xl border border-violet-500/40 bg-violet-500/5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-foreground">Analyse + Plan d{"'"}études</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Tout inclus + plan d{"'"}études personnalisé semaine par semaine
                    </p>
                  </div>
                  <span className="text-lg font-black text-violet-400">2 000 F</span>
                </div>
                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-background font-bold"
                  onClick={() => { setSelectedTier("plan"); setShowPaywall(true); }}
                >
                  Passer au niveau supérieur
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Pending notice */}
            {isPending && (
              <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-center space-y-1">
                <p className="text-sm font-bold text-amber-400">Vérification en cours…</p>
                <p className="text-xs text-muted-foreground">Votre paiement sera automatiquement validé dans quelques minutes.</p>
              </div>
            )}

            {/* Payment Dialog */}
            {showPaywall && (
              <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-sm space-y-4">
                  <h3 className="font-bold text-lg text-foreground">Débloquer l{"'"}analyse</h3>
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 space-y-1">
                    <p className="text-xs text-muted-foreground text-center">Envoyez <strong>{selectedTier === "plan" ? "2 000 FCFA" : "1 000 FCFA"}</strong> via Wave ou Orange Money au :</p>
                    <p className="text-xl font-black text-primary text-center tracking-wider">78 598 56 15</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Votre numéro de téléphone (expéditeur)</label>
                    <input
                      type="tel"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="77 XXX XX XX"
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <p className="text-[10px] text-muted-foreground">Ce numéro permet de vérifier votre paiement.</p>
                  </div>
                  <Button
                    className="w-full rounded-xl bg-gradient-to-r from-primary to-accent text-background font-bold"
                    onClick={handleUnlock}
                    disabled={isUnlocking || !payerPhone.trim()}
                  >
                    {isUnlocking ? "Enregistrement…" : "J'ai effectué le paiement"}
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setShowPaywall(false)}>
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          /* ── PAID RESULTS ─────────────────────────────────────────── */
          assessment.fullOrientation && <FullResults data={assessment.fullOrientation.data} orientation={assessment.fullOrientation.orientation} isOwner={assessment.access === "owner"} />
        )}

        {/* Retake */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigate(data.level ? `/orientation?level=${encodeURIComponent(data.level)}` : "/orientation")}
            className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors flex items-center gap-1 mx-auto cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            Refaire le questionnaire d'orientation
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-muted-foreground/40 text-center leading-relaxed pb-8">
          Psyché est un outil d'aide à l'orientation, non un diagnostic psychologique ou médical.
          Les recommandations sont indicatives et basées sur vos réponses.
        </p>
      </div>
    </div>
  );
}

// ── Icon mapper for strengths ────────────────────────────────────────────

function StrengthIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    crown: <Star className="w-4 h-4" />,
    brain: <Brain className="w-4 h-4" />,
    "book-open": <BookOpen className="w-4 h-4" />,
    sparkles: <Lightbulb className="w-4 h-4" />,
    heart: <Heart className="w-4 h-4" />,
    shield: <CheckCircle2 className="w-4 h-4" />,
    lightbulb: <Lightbulb className="w-4 h-4" />,
    microscope: <TrendingUp className="w-4 h-4" />,
    globe: <Globe className="w-4 h-4" />,
    target: <Target className="w-4 h-4" />,
  };
  return <>{map[icon] ?? <Star className="w-4 h-4" />}</>;
}

// ── Section header ───────────────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-3">
      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ── Full paid results ─────────────────────────────────────────────────────

function FullResults({
  data,
  orientation,
  isOwner,
}: {
  data: Pick<V2ExtendedData, "level" | "dreamJob" | "idealLife">;
  orientation: V2OrientationResult;
  isOwner: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >

      {/* ── 1. Profil psychologique ──────────────────────────────────────── */}
      <div className="p-4 rounded-2xl border border-border/60 bg-card/60 space-y-3">
        <SectionHeader
          icon={<Brain className="w-4 h-4" />}
          title="Ton profil psychologique"
          subtitle="Comment tu penses, tu agis et tu te motives"
        />
        <div className="grid grid-cols-1 gap-2">
          {[
            { label: "Type dominant", value: orientation.psychologicalProfile.dominantTrait },
            { label: "Style cognitif", value: orientation.psychologicalProfile.cognitiveStyle },
            { label: "Moteur de motivation", value: orientation.psychologicalProfile.motivationDriver },
            { label: "Style social", value: orientation.psychologicalProfile.socialStyle },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5 p-2.5 rounded-xl bg-background/40 border border-border/40">
              <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">{label}</p>
              <p className="text-sm text-foreground">{value}</p>
            </div>
          ))}
        </div>
        <div className={cn(
          "p-3 rounded-xl border text-xs text-muted-foreground leading-relaxed",
          orientation.wellbeingAlert
            ? "bg-amber-500/10 border-amber-500/20"
            : "bg-emerald-500/10 border-emerald-500/20",
        )}>
          {orientation.psychologicalProfile.resilienceNote}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          {orientation.personalityDescription}
        </p>
      </div>

      {/* ── 2. Forces ───────────────────────────────────────────────────── */}
      {orientation.strengths.length > 0 && (
        <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
          <SectionHeader
            icon={<Star className="w-4 h-4 text-emerald-400" />}
            title="Tes forces"
            subtitle="Ce sur quoi tu peux t'appuyer"
          />
          <div className="space-y-2">
            {orientation.strengths.map((s) => (
              <div key={s.title} className="flex items-start gap-3 p-3 rounded-xl bg-background/40 border border-emerald-500/10">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <StrengthIcon icon={s.icon} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. Axes d'amélioration ──────────────────────────────────────── */}
      {orientation.improvementAxes.length > 0 && (
        <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-3">
          <SectionHeader
            icon={<TrendingUp className="w-4 h-4 text-amber-400" />}
            title="Axes d'amélioration"
            subtitle="Les domaines sur lesquels concentrer tes efforts"
          />
          <div className="space-y-3">
            {orientation.improvementAxes.map((ax) => (
              <div key={ax.title} className="p-3 rounded-xl bg-background/40 border border-amber-500/10">
                <p className="text-sm font-semibold text-foreground mb-1">{ax.title}</p>
                <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{ax.description}</p>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-300 leading-relaxed">{ax.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. Centres d'intérêt (clusters) ─────────────────────────────── */}
      {orientation.interestClusters.length > 0 && (
        <div className="p-4 rounded-2xl border border-border/60 bg-card/60 space-y-3">
          <SectionHeader
            icon={<BookOpen className="w-4 h-4 text-blue-400" />}
            title="Tes clusters d'intérêt"
            subtitle="Tes domaines d'intérêt et les métiers associés"
          />
          <div className="space-y-3">
            {orientation.interestClusters.map((cl) => {
              const colors: Record<string, string> = {
                blue: "bg-blue-500/10 border-blue-500/20 text-blue-300",
                violet: "bg-violet-500/10 border-violet-500/20 text-violet-300",
                lime: "bg-lime-500/10 border-lime-500/20 text-lime-300",
                rose: "bg-rose-500/10 border-rose-500/20 text-rose-300",
              };
              return (
                <div key={cl.cluster} className={cn("p-3 rounded-xl border", colors[cl.color] ?? colors.blue)}>
                  <p className="text-sm font-bold mb-2">{cl.cluster}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cl.interests.map((i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-background/30 text-[10px] font-medium">
                        {i}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] opacity-70 font-medium uppercase tracking-wider mb-1">Métiers liés</p>
                  <p className="text-xs opacity-90">{cl.relatedCareers.join(" · ")}</p>
                </div>
              );
            })}
          </div>
          {orientation.dominantValues.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2">
                Tes valeurs dominantes
              </p>
              <div className="flex flex-wrap gap-2">
                {orientation.dominantValues.map((v) => (
                  <span key={v} className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-300">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 5. Séries recommandées ──────────────────────────────────────── */}
      {data.level !== "etudiant" && (
        <div className="space-y-3">
          <SectionHeader
            icon={<BookOpen className="w-4 h-4 text-primary" />}
            title="Séries recommandées"
            subtitle="Classées par compatibilité avec ton profil"
          />

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Parcours principal
            </p>
            {orientation.primarySeries.map((s, i) => (
              <SerieCard key={s} serieKey={s} rank={i + 1} isPrimary />
            ))}
          </div>

          {orientation.alternativeSeries.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                Alternatives
              </p>
              {orientation.alternativeSeries.map((s, i) => (
                <SerieCard key={s} serieKey={s} rank={i + 1} isPrimary={false} />
              ))}
            </div>
          )}

          {orientation.economicSeries.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-lime-400" />
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  Parcours économiquement accessible
                </p>
              </div>
              {orientation.economicSeries.map((s, i) => (
                <SerieCard key={s} serieKey={s} rank={i + 1} isPrimary={false} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 6. Métiers compatibles ──────────────────────────────────────── */}
      {orientation.careerMatches.length > 0 && (
        <div className="p-4 rounded-2xl border border-border/60 bg-card/60 space-y-3">
          <SectionHeader
            icon={<Target className="w-4 h-4 text-sky-400" />}
            title={data.level === "etudiant" ? "Pistes professionnelles à explorer" : "Métiers compatibles"}
            subtitle="Basés sur ton profil, tes intérêts et tes valeurs"
          />
          <div className="space-y-2">
            {orientation.careerMatches.map((c) => (
              <div
                key={c.title}
                className={cn(
                  "p-3 rounded-xl border",
                  c.alignment === "fort"
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : c.alignment === "moyen"
                      ? "bg-blue-500/10 border-blue-500/20"
                      : "bg-muted/30 border-border/40",
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-semibold",
                    c.alignment === "fort"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : c.alignment === "moyen"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-muted/50 text-muted-foreground",
                  )}>
                    {c.alignment === "fort" ? "Très compatible" : c.alignment === "moyen" ? "Compatible" : "Possible"}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1">{c.domain}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 7. Facteurs familiaux & culturels ───────────────────────────── */}
      {orientation.familyCulturalFactors.length > 0 && (
        <div className="p-4 rounded-2xl border border-orange-500/20 bg-orange-500/5 space-y-3">
          <SectionHeader
            icon={<Users className="w-4 h-4 text-orange-400" />}
            title="Facteurs familiaux & culturels"
            subtitle="Comment ton environnement influence ton orientation"
          />
          <div className="space-y-2">
            {orientation.familyCulturalFactors.map((f) => (
              <div
                key={f.label}
                className={cn(
                  "p-3 rounded-xl border",
                  f.impact === "positif"
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : f.impact === "attention"
                      ? "bg-amber-500/10 border-amber-500/20"
                      : "bg-card/40 border-border/40",
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider",
                    f.type === "famille" ? "bg-orange-500/20 text-orange-400"
                      : f.type === "culture" ? "bg-teal-500/20 text-teal-400"
                        : "bg-lime-500/20 text-lime-400",
                  )}>
                    {f.type}
                  </span>
                  <p className="text-sm font-semibold text-foreground">{f.label}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 8. Risques identifiés ────────────────────────────────────────── */}
      {orientation.riskFactors.length > 0 && (
        <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3">
          <SectionHeader
            icon={<AlertTriangle className="w-4 h-4 text-rose-400" />}
            title="Points de vigilance"
            subtitle="Des éléments à surveiller dans ton parcours"
          />
          <div className="space-y-2">
            {orientation.riskFactors.map((r) => (
              <div
                key={r.title}
                className={cn(
                  "p-3 rounded-xl border",
                  r.level === "elevé"
                    ? "bg-rose-500/10 border-rose-500/20"
                    : r.level === "modéré"
                      ? "bg-amber-500/10 border-amber-500/20"
                      : "bg-card/40 border-border/40",
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground">{r.title}</p>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-semibold",
                    r.level === "elevé"
                      ? "bg-rose-500/20 text-rose-400"
                      : r.level === "modéré"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-muted/50 text-muted-foreground",
                  )}>
                    {r.level === "elevé" ? "Élevé" : r.level === "modéré" ? "Modéré" : "Faible"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 9. Projet de vie ─────────────────────────────────────────────── */}
      {orientation.lifeProjectNote && (
        <div className="p-4 rounded-2xl border border-sky-500/20 bg-sky-500/5 space-y-3">
          <SectionHeader
            icon={<Target className="w-4 h-4 text-sky-400" />}
            title="Ton projet de vie"
            subtitle="Ce que Psyché voit comme ton fil conducteur"
          />
          <p className="text-sm text-foreground/90 leading-relaxed">{orientation.lifeProjectNote}</p>
          {data.dreamJob && (
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <p className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider mb-1">Métier de rêve</p>
              <p className="text-sm font-bold text-foreground">{data.dreamJob}</p>
            </div>
          )}
          {data.idealLife && (
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1">Vie idéale</p>
              <p className="text-xs text-muted-foreground italic leading-relaxed">"{data.idealLife}"</p>
            </div>
          )}
        </div>
      )}

      {/* ── 10. Plan 12 mois ─────────────────────────────────────────────── */}
      {orientation.monthlyPlan.length > 0 && (
        <div className="p-4 rounded-2xl border border-violet-500/20 bg-violet-500/5 space-y-3">
          <SectionHeader
            icon={<BarChart3 className="w-4 h-4 text-violet-400" />}
            title="Plan des 12 prochains mois"
            subtitle="Objectifs concrets pour avancer vers ton projet"
          />
          <div className="space-y-2">
            {orientation.monthlyPlan.map((m, i) => {
              const typeColors: Record<string, string> = {
                exploration: "bg-blue-500/20 text-blue-400",
                renforcement: "bg-emerald-500/20 text-emerald-400",
                social: "bg-orange-500/20 text-orange-400",
                "bien-etre": "bg-indigo-500/20 text-indigo-400",
                orientation: "bg-violet-500/20 text-violet-400",
              };
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background/40 border border-violet-500/10">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-violet-400">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase">{m.month}</span>
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", typeColors[m.type] ?? "bg-muted/50 text-muted-foreground")}>
                        {m.type}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{m.goal}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 11. Insights de cohérence ────────────────────────────────────── */}
      {orientation.coherenceInsights.length > 0 && (
        <div className="p-4 rounded-2xl border border-border/60 bg-card/60 space-y-3">
          <SectionHeader
            icon={<Lightbulb className="w-4 h-4 text-yellow-400" />}
            title="Insights de cohérence"
            subtitle="Ce que ton profil révèle sur toi-même"
          />
          <div className="space-y-2">
            {orientation.coherenceInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                <Lightbulb className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Never combine a guest/admin-viewed report with the viewer's grades. */}
      {isOwner && data.level !== "etudiant" && (
        <Authenticated>
          <GradeCoherenceSection orientation={orientation} />
        </Authenticated>
      )}

      {/* Coherence detail */}
      <div className="p-4 rounded-2xl border border-border/60 bg-card/60 space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-foreground">Cohérence de ton profil</h2>
        </div>
        <ScoreBar
          label="Alignement intérêts / projet de vie"
          value={orientation.coherenceScore}
          max={100}
          color="bg-gradient-to-r from-emerald-500 to-green-400"
        />
        <p className="text-xs text-muted-foreground leading-relaxed">
          {orientation.coherenceScore >= 75
            ? "Ton profil est très cohérent. Tes intérêts, tes valeurs et ton projet de vie sont bien alignés."
            : orientation.coherenceScore >= 50
              ? "Ton profil est globalement cohérent avec quelques zones à clarifier."
              : "Plusieurs éléments de ton profil semblent en tension. C'est normal à ton âge — l'exploration fait partie du processus."}
        </p>
      </div>

      {/* Cultural context note */}
      <div className="p-4 rounded-2xl border border-border/60 bg-card/60">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-teal-400" />
          <p className="text-sm font-semibold text-teal-300">Contexte sénégalais</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {data.level === "etudiant"
            ? "Ces pistes reposent sur tes réponses, pas sur une vérification des admissions. Vérifie les programmes, prérequis et reconnaissances auprès des établissements et des sources officielles avant de candidater."
            : "Ces pistes concernent les séries du système scolaire sénégalais (BFEM → Lycée → Baccalauréat). Confirme les conditions avec ton établissement ou un conseiller d’orientation."}
        </p>
      </div>

      {/* Section completion */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
          Sections complétées
        </p>
        <div className="grid grid-cols-2 gap-2">
          {SECTIONS.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-border/40 bg-card/40"
            >
              <span className="text-base">{s.emoji}</span>
              <span className="text-xs text-muted-foreground">{s.title}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Grade Coherence Section ───────────────────────────────────────────────

type GradeReport = {
  _id: string;
  schoolYear: string;
  trimester: number;
  level?: string;
  targetSerie?: string;
  subjects: Array<{ name: string; grade: number; coefficient: number; appreciation?: string; isMainSubject?: boolean }>;
  attendancePercent?: number;
  selfDisciplineLevel?: number;
  contradictions?: string[];
};

function getWeightedAvg(subjects: GradeReport["subjects"]): number {
  const totalW = subjects.reduce((s, sub) => s + sub.coefficient, 0);
  if (totalW === 0) return 0;
  return subjects.reduce((s, sub) => s + sub.grade * sub.coefficient, 0) / totalW;
}

function getMentionLabel(avg: number): string {
  if (avg >= 16) return "Très Bien";
  if (avg >= 14) return "Bien";
  if (avg >= 12) return "Assez Bien";
  if (avg >= 10) return "Passable";
  return "Insuffisant";
}

function getMentionColor(avg: number): string {
  if (avg >= 16) return "text-emerald-400";
  if (avg >= 14) return "text-blue-400";
  if (avg >= 12) return "text-sky-400";
  if (avg >= 10) return "text-amber-400";
  return "text-rose-400";
}

function computeSerieAcademicCoherence(
  reports: GradeReport[],
  primarySeries: string[],
): { serieKey: string; comment: string; supportLevel: "fort" | "moyen" | "faible" }[] {
  if (reports.length === 0 || primarySeries.length === 0) return [];

  // Aggregate all subjects
  const subjectMap: Record<string, { total: number; count: number }> = {};
  for (const r of reports) {
    for (const s of r.subjects) {
      const key = s.name.toLowerCase();
      if (!subjectMap[key]) subjectMap[key] = { total: 0, count: 0 };
      subjectMap[key].total += s.grade;
      subjectMap[key].count += 1;
    }
  }
  const avgBySubject: Record<string, number> = {};
  for (const [key, val] of Object.entries(subjectMap)) {
    avgBySubject[key] = val.total / val.count;
  }

  const isScienceStrong = ["mathématiques", "physique", "physique-chimie", "svt", "sciences"].some(
    (k) => (avgBySubject[k] ?? 0) >= 12,
  );
  const isLitStrong = ["français", "philosophie", "histoire", "histoire-géographie"].some(
    (k) => (avgBySubject[k] ?? 0) >= 12,
  );
  const isMathStrong = (avgBySubject["mathématiques"] ?? 0) >= 12;

  return primarySeries.slice(0, 3).map((serieKey) => {
    const key = serieKey.toUpperCase();
    let supportLevel: "fort" | "moyen" | "faible" = "moyen";
    let comment = "";

    if (key.startsWith("S")) {
      if (isMathStrong && isScienceStrong) {
        supportLevel = "fort";
        comment = "Tes notes en sciences et mathématiques soutiennent bien ce parcours.";
      } else if (isMathStrong || isScienceStrong) {
        supportLevel = "moyen";
        comment = "Certaines matières scientifiques sont solides, mais des efforts restent à faire.";
      } else {
        supportLevel = "faible";
        comment = "Les matières scientifiques demandent du renforcement pour ce parcours.";
      }
    } else if (key.startsWith("L")) {
      if (isLitStrong) {
        supportLevel = "fort";
        comment = "Tes résultats en lettres et sciences humaines appuient cette orientation.";
      } else if (isScienceStrong) {
        supportLevel = "moyen";
        comment = "Tu es plus fort(e) en sciences qu'en lettres — nuance à considérer.";
      } else {
        supportLevel = "moyen";
        comment = "Renforcer le français et la philosophie aidera dans ce parcours.";
      }
    } else if (key === "G" || key === "STEG" || key.startsWith("T")) {
      const globalAvg = Object.values(avgBySubject).reduce((s, v) => s + v, 0) / (Object.values(avgBySubject).length || 1);
      if (globalAvg >= 12) {
        supportLevel = "fort";
        comment = "Ta moyenne générale est compatible avec ce parcours.";
      } else {
        supportLevel = "moyen";
        comment = "Ce parcours est accessible — continue à consolider tes acquis.";
      }
    } else {
      comment = "Analyse basée sur ta moyenne générale.";
    }

    return { serieKey, comment, supportLevel };
  });
}

function GradeCoherenceSection({
  orientation,
}: {
  orientation: V2OrientationResult;
}) {
  const reports = useQuery(api.grades.getMyReports);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  if (reports === undefined) {
    return (
      <div className="p-4 rounded-2xl border border-border/60 bg-card/60 animate-pulse h-24" />
    );
  }

  if (reports.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-2xl border border-dashed border-primary/30 bg-primary/5"
      >
        <div className="flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">
              Ajoute tes notes pour une analyse plus précise
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              En saisissant tes relevés de notes, Psyché peut vérifier si les séries recommandées
              sont bien compatibles avec tes résultats académiques réels.
            </p>
            <Button
              size="sm"
              onClick={() => navigate("/grades")}
              className="rounded-xl bg-gradient-to-r from-primary to-accent text-background font-bold text-xs"
            >
              <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
              Saisir mes notes
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Compute stats
  const allSubjects = reports.flatMap((r) => r.subjects);
  const globalAvg = getWeightedAvg(allSubjects);
  const totalContradictions = reports.reduce((s, r) => s + (r.contradictions?.length ?? 0), 0);
  const coherenceData = computeSerieAcademicCoherence(
    reports as GradeReport[],
    orientation.primarySeries,
  );
  const latestReport = reports[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/60 bg-card/60 overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((o) => !o)}
        className="w-full p-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">Cohérence académique</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn("text-base font-black", getMentionColor(globalAvg))}>
            {globalAvg.toFixed(1)}/20
          </span>
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {/* Summary chips */}
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
          {reports.length} relevé{reports.length > 1 ? "s" : ""} scolaire{reports.length > 1 ? "s" : ""}
        </span>
        <span className={cn(
          "px-2.5 py-1 rounded-full border text-xs font-medium",
          getMentionColor(globalAvg).replace("text-", "bg-").replace("400", "500/10") + " border-" + getMentionColor(globalAvg).replace("text-", "").replace("400", "500/20") + " " + getMentionColor(globalAvg),
        )}>
          {getMentionLabel(globalAvg)}
        </span>
        {totalContradictions > 0 && (
          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400">
            {totalContradictions} incohérence{totalContradictions > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {expanded && (
        <div className="border-t border-border/40 p-4 space-y-4">
          {/* Series compatibility */}
          {coherenceData.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
                Compatibilité académique par série
              </p>
              {coherenceData.map(({ serieKey, comment, supportLevel }) => (
                <div
                  key={serieKey}
                  className={cn(
                    "p-3 rounded-xl border",
                    supportLevel === "fort"
                      ? "bg-emerald-500/10 border-emerald-500/20"
                      : supportLevel === "moyen"
                        ? "bg-amber-500/10 border-amber-500/20"
                        : "bg-rose-500/10 border-rose-500/20",
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-foreground">{serieKey}</span>
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-semibold",
                        supportLevel === "fort"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : supportLevel === "moyen"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-rose-500/20 text-rose-400",
                      )}
                    >
                      Soutien {supportLevel}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* Latest report highlights */}
          {latestReport && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
                Dernier relevé — {latestReport.schoolYear} T{latestReport.trimester}
              </p>
              <div className="space-y-1.5">
                {latestReport.subjects.slice(0, 5).map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground truncate max-w-[60%]">{sub.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            sub.grade >= 14 ? "bg-emerald-400" : sub.grade >= 10 ? "bg-blue-400" : "bg-rose-400",
                          )}
                          style={{ width: `${(sub.grade / 20) * 100}%` }}
                        />
                      </div>
                      <span className={cn(
                        "font-bold tabular-nums",
                        sub.grade >= 14 ? "text-emerald-400" : sub.grade >= 10 ? "text-foreground" : "text-rose-400",
                      )}>
                        {sub.grade}/20
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contradictions */}
          {totalContradictions > 0 && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <p className="text-xs font-semibold text-amber-300">
                  {totalContradictions} incohérence{totalContradictions > 1 ? "s" : ""} détectée{totalContradictions > 1 ? "s" : ""}
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Psyché a détecté des écarts entre tes déclarations et tes résultats.
                Consulte la page <button onClick={() => navigate("/grades")} className="text-primary underline cursor-pointer">Mes notes</button> pour les détails.
              </p>
            </div>
          )}

          {/* Tip */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <Lightbulb className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ajoute plusieurs trimestres pour affiner l'analyse de cohérence au fil du temps.
            </p>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate("/grades")}
            className="w-full text-xs text-primary"
          >
            <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
            Gérer mes notes scolaires
          </Button>
        </div>
      )}
    </motion.div>
  );
}
