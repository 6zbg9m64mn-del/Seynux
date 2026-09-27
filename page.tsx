import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useQuery, useMutation } from "convex/react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import { cn } from "@/lib/utils.ts";
import AppNav from "@/components/AppNav.tsx";
import {
  Brain,
  Flame,
  BookOpen,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ─── Hours selector ──────────────────────────────────────────────────────────

const HOUR_OPTIONS = [0.5, 1, 1.5, 2, 2.5, 3, 4];

function HoursSelector({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Combien d'heures ?
      </p>
      <div className="flex flex-wrap gap-2">
        {HOUR_OPTIONS.map((h) => (
          <button
            key={h}
            onClick={() => onChange(h)}
            className={cn(
              "px-3 py-1.5 rounded-xl text-sm font-bold border transition-all",
              value === h
                ? "bg-accent text-background border-accent"
                : "bg-muted/40 text-muted-foreground border-border hover:border-accent/50",
            )}
          >
            {h}h
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Today Check-in Card ─────────────────────────────────────────────────────

function TodayCard() {
  const todayCheckin = useQuery(api.checkins.getTodayCheckin, {});
  const logCheckin = useMutation(api.checkins.logCheckin);

  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const [isLogging, setIsLogging] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleLog = async (worked: boolean) => {
    setIsLogging(true);
    try {
      await logCheckin({
        worked,
        hoursWorked: worked ? (selectedHours ?? undefined) : undefined,
      });
      toast.success(
        worked ? "Super ! Continue comme ça 🔥" : "Demain, tu peux reprendre !",
      );
      setEditing(false);
    } catch {
      toast.error("Erreur lors de l'enregistrement.");
    } finally {
      setIsLogging(false);
    }
  };

  const todayLabel = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Already checked in and not editing
  if (todayCheckin && !editing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-3xl border overflow-hidden",
          todayCheckin.worked
            ? "border-accent/30 bg-accent/10"
            : "border-destructive/30 bg-destructive/10",
        )}
      >
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-11 h-11 rounded-2xl flex items-center justify-center",
                  todayCheckin.worked ? "bg-accent/20" : "bg-destructive/20",
                )}
              >
                {todayCheckin.worked ? (
                  <CheckCircle className="w-6 h-6 text-accent" />
                ) : (
                  <XCircle className="w-6 h-6 text-destructive" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground capitalize">
                  {todayLabel}
                </p>
                <p
                  className={cn(
                    "text-sm font-black",
                    todayCheckin.worked ? "text-accent" : "text-destructive",
                  )}
                >
                  {todayCheckin.worked ? "J'ai travaillé" : "Pas travaillé"}
                  {todayCheckin.hoursWorked
                    ? ` · ${todayCheckin.hoursWorked}h`
                    : ""}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Modifier
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Check-in form
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-3xl overflow-hidden"
    >
      {/* Top band */}
      <div className="h-1 bg-gradient-to-r from-primary to-accent" />
      <div className="p-5 space-y-4">
        <div>
          <p className="text-xs text-muted-foreground capitalize">{todayLabel}</p>
          <h2 className="text-lg font-black text-foreground mt-0.5">
            As-tu travaillé aujourd'hui ?
          </h2>
        </div>

        <HoursSelector value={selectedHours} onChange={setSelectedHours} />

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleLog(false)}
            disabled={isLogging}
            className="p-4 rounded-2xl border border-destructive/30 bg-destructive/10 hover:bg-destructive/20 transition-all active:scale-95 flex flex-col items-center gap-1.5"
          >
            <XCircle className="w-6 h-6 text-destructive" />
            <span className="text-sm font-bold text-destructive">Non</span>
          </button>
          <button
            onClick={() => handleLog(true)}
            disabled={isLogging}
            className="p-4 rounded-2xl border border-accent/30 bg-accent/10 hover:bg-accent/20 transition-all active:scale-95 flex flex-col items-center gap-1.5"
          >
            <CheckCircle className="w-6 h-6 text-accent" />
            <span className="text-sm font-bold text-accent">Oui !</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stats Row ───────────────────────────────────────────────────────────────

function StatsRow() {
  const stats = useQuery(api.checkins.getStats, {});

  if (!stats) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    );
  }

  const items = [
    {
      icon: Flame,
      value: stats.streak,
      label: "Série",
      unit: stats.streak === 1 ? "jour" : "jours",
      color: "text-orange-400",
      bg: "bg-orange-400/10 border-orange-400/20",
    },
    {
      icon: BookOpen,
      value: stats.totalWorked,
      label: "Total",
      unit: stats.totalWorked === 1 ? "jour" : "jours",
      color: "text-primary",
      bg: "bg-primary/10 border-primary/20",
    },
    {
      icon: Trophy,
      value: stats.thisWeekCount,
      label: "Cette semaine",
      unit: `/ 7`,
      color: "text-accent",
      bg: "bg-accent/10 border-accent/20",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "rounded-2xl border p-3 flex flex-col items-center gap-1 text-center",
            item.bg,
          )}
        >
          <item.icon className={cn("w-4 h-4", item.color)} />
          <p className={cn("text-xl font-black", item.color)}>
            {item.value}
          </p>
          <p className="text-[10px] text-muted-foreground leading-tight">
            {item.label}
            <br />
            <span className="font-semibold">{item.unit}</span>
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Calendar Heatmap ────────────────────────────────────────────────────────

function CalendarHeatmap() {
  const checkins = useQuery(api.checkins.getRecentCheckins, { days: 35 });

  if (!checkins) {
    return <Skeleton className="h-40 w-full rounded-3xl" />;
  }

  const checkinMap = new Map(checkins.map((c) => [c.date, c.worked]));
  const today = new Date();

  // Build 35 cells (5 weeks), most recent last
  const cells: { date: string; status: "worked" | "missed" | "future" | "today" }[] = [];
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const todayStr = today.toISOString().split("T")[0];

    let status: "worked" | "missed" | "future" | "today";
    if (dateStr > todayStr) {
      status = "future";
    } else if (dateStr === todayStr) {
      status = checkinMap.has(dateStr)
        ? checkinMap.get(dateStr)
          ? "worked"
          : "missed"
        : "today";
    } else {
      if (!checkinMap.has(dateStr)) {
        status = "missed";
      } else {
        status = checkinMap.get(dateStr) ? "worked" : "missed";
      }
    }
    cells.push({ date: dateStr, status });
  }

  const DAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

  // Group into weeks (7 columns)
  const weeks: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-3xl p-5 space-y-3"
    >
      <h2 className="font-bold text-foreground flex items-center gap-2 text-sm">
        <span>📅</span> Dernières 5 semaines
      </h2>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1.5">
        {DAY_LABELS.map((l, i) => (
          <div
            key={i}
            className="text-center text-[10px] font-bold text-muted-foreground"
          >
            {l}
          </div>
        ))}
      </div>

      {/* Week rows */}
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-1.5">
          {week.map((cell, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (wi * 7 + ci) * 0.012 }}
              title={cell.date}
              className={cn(
                "aspect-square rounded-lg border",
                cell.status === "worked"
                  ? "bg-accent border-accent/60"
                  : cell.status === "missed"
                    ? "bg-destructive/25 border-destructive/20"
                    : cell.status === "today"
                      ? "bg-primary/20 border-primary/40 ring-1 ring-primary/40"
                      : "bg-muted/20 border-border/30",
              )}
            />
          ))}
        </div>
      ))}

      {/* Legend */}
      <div className="flex items-center gap-4 pt-1">
        {[
          { color: "bg-accent border-accent/60", label: "Travaillé" },
          { color: "bg-destructive/25 border-destructive/20", label: "Manqué" },
          { color: "bg-primary/20 border-primary/40", label: "Aujourd'hui" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div
              className={cn("w-3 h-3 rounded border", l.color)}
            />
            <span className="text-[10px] text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Discipline Chart ─────────────────────────────────────────────────────────

type ChartPoint = { day: string; travail: number; heures: number };

function DisciplineChart() {
  const checkins = useQuery(api.checkins.getRecentCheckins, { days: 14 });

  if (!checkins) {
    return <Skeleton className="h-52 w-full rounded-3xl" />;
  }

  const today = new Date();
  const data: ChartPoint[] = [];

  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayLabel = d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" });

    const checkin = checkins.find((c) => c.date === dateStr);
    data.push({
      day: dayLabel,
      travail: checkin?.worked ? 100 : 0,
      heures: checkin?.hoursWorked ?? 0,
    });
  }

  const hasAnyData = data.some((d) => d.travail > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-3xl p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-foreground flex items-center gap-2 text-sm">
          <BarChart3 className="w-4 h-4 text-primary" />
          Progression — 14 derniers jours
        </h2>
        {checkins.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>
              {Math.round(
                (checkins.filter((c) => c.worked).length / 14) * 100,
              )}
              % de régularité
            </span>
          </div>
        )}
      </div>

      {!hasAnyData ? (
        <div className="h-36 flex items-center justify-center">
          <p className="text-sm text-muted-foreground text-center">
            Commence à enregistrer tes journées<br />pour voir ta progression ici
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id="travailGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="day"
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 9 }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 9 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(0.22 0.055 275)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                fontSize: 11,
              }}
              labelStyle={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}
              formatter={(value: number) => [
                value === 100 ? "Travaillé ✓" : "Pas travaillé",
                "",
              ]}
            />
            <Area
              type="monotone"
              dataKey="travail"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#travailGrad)"
              dot={(props) => {
                const { cx, cy, payload } = props as { cx: number; cy: number; payload: ChartPoint };
                if (payload.travail === 0) return <circle key={`dot-${cx}`} cx={cx} cy={cy} r={3} fill="rgba(255,255,255,0.15)" stroke="none" />;
                return <circle key={`dot-${cx}`} cx={cx} cy={cy} r={4} fill="#22d3ee" stroke="#22d3ee" strokeWidth={1} />;
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}

// ─── Motivation Banner ────────────────────────────────────────────────────────

function MotivationBanner({ streak }: { streak: number }) {
  const message =
    streak === 0
      ? { text: "Commence aujourd'hui. Un seul jour peut tout changer.", emoji: "🌱" }
      : streak < 3
        ? { text: `${streak} jour${streak > 1 ? "s" : ""} d'affilée ! La régularité se construit pas à pas.`, emoji: "✨" }
        : streak < 7
          ? { text: `${streak} jours ! Tu es sur une belle lancée. Continue !`, emoji: "🔥" }
          : streak < 14
            ? { text: `${streak} jours d'affilée ! Tu dépasses déjà la majorité des élèves.`, emoji: "🚀" }
            : { text: `${streak} jours — performance d'excellence ! Tu es dans le top des élèves Psyché.`, emoji: "⭐" };

  return (
    <div className="bg-card border border-border rounded-3xl p-4 flex items-start gap-3">
      <span className="text-2xl">{message.emoji}</span>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {message.text}
      </p>
    </div>
  );
}

// ─── Dashboard (authenticated) ────────────────────────────────────────────────

function TrackDashboard() {
  const stats = useQuery(api.checkins.getStats, {});
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto px-5 py-8 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-bold text-sm tracking-wide">Psyché</span>
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          Suivi quotidien
        </span>
      </div>

      {/* Page title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-black text-foreground">
          Ta progression
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Chaque jour compté renforce ta discipline
        </p>
      </motion.div>

      {/* Today card */}
      <TodayCard />

      {/* Stats */}
      <StatsRow />

      {/* Motivation */}
      <MotivationBanner streak={stats?.streak ?? 0} />

      {/* Discipline chart */}
      <DisciplineChart />

      {/* Calendar heatmap */}
      <CalendarHeatmap />

      {/* CTA — go back to test */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="pb-6"
      >
        <Button
          variant="ghost"
          className="w-full rounded-2xl py-4 text-muted-foreground font-medium"
          onClick={() => navigate("/test")}
        >
          <ChevronRight className="w-4 h-4 mr-2" />
          Refaire le test d'orientation
        </Button>
      </motion.div>
    </div>
  );
}

// ─── Sign-In Gate ─────────────────────────────────────────────────────────────

function SignInGate() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/6 blur-[100px] rounded-full" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-sm mx-auto text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto shadow-xl shadow-primary/10">
          <Flame className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-foreground">
            Suivi quotidien
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Connecte-toi pour enregistrer tes journées de travail, voir ton évolution et maintenir ta série.
          </p>
        </div>
        <div className="space-y-3">
          <SignInButton
            signInText="Se connecter"
            signOutText="Se déconnecter"
            loadingText="Connexion..."
            className="w-full rounded-2xl font-bold bg-gradient-to-r from-primary to-accent text-background hover:opacity-90 shadow-lg shadow-primary/20 py-5"
          />
          <p className="text-xs text-muted-foreground">
            Gratuit · Tes données sont privées
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-2">
          {[
            { icon: Flame, label: "Série de jours", color: "text-orange-400" },
            { icon: BarChart3, label: "Graphe d'évolution", color: "text-primary" },
            { icon: Trophy, label: "Statistiques", color: "text-accent" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-card border border-border rounded-2xl p-3 flex flex-col items-center gap-1.5"
            >
              <item.icon className={cn("w-5 h-5", item.color)} />
              <p className="text-[10px] text-muted-foreground text-center leading-tight">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-accent/5 blur-[80px] rounded-full" />
      </div>

      <AppNav />

      <div className="flex-1 relative z-10">
        <AuthLoading>
          <div className="max-w-lg mx-auto px-5 py-8 space-y-5">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-40 w-full rounded-3xl" />
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-20 rounded-2xl" />
              ))}
            </div>
            <Skeleton className="h-52 w-full rounded-3xl" />
            <Skeleton className="h-48 w-full rounded-3xl" />
          </div>
        </AuthLoading>

        <Unauthenticated>
          <SignInGate />
        </Unauthenticated>

        <Authenticated>
          <TrackDashboard />
        </Authenticated>
      </div>
    </div>
  );
}
