import { useNavigate } from "react-router-dom";
import { Lock, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";

type PaywallTier = "premium" | "pro";

type PaywallCardProps = {
  tier?: PaywallTier;
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
};

const TIER_CONFIG = {
  premium: {
    icon: Sparkles,
    label: "Premium",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    gradient: "from-primary/10 to-primary/5",
    price: "$1.99/mois",
  },
  pro: {
    icon: Zap,
    label: "Pro",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    gradient: "from-yellow-400/10 to-yellow-400/5",
    price: "$4.99/mois",
  },
} as const;

export function PaywallCard({
  tier = "premium",
  title,
  description,
  className,
  compact = false,
}: PaywallCardProps) {
  const navigate = useNavigate();
  const config = TIER_CONFIG[tier];
  const Icon = config.icon;

  if (compact) {
    return (
      <div
        className={cn(
          "border rounded-2xl p-4 flex items-center gap-3 bg-gradient-to-br",
          config.border,
          config.gradient,
          className,
        )}
      >
        <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", config.bg)}>
          <Lock className={cn("w-4 h-4", config.color)} />
        </div>
        <div className="min-w-0 flex-1">
          <p className={cn("text-xs font-bold", config.color)}>
            {config.label} requis
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {description ?? "Passe à l'offre supérieure pour débloquer"}
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => navigate("/pricing")}
          className={cn(
            "rounded-xl text-xs shrink-0 h-7 px-3 font-bold",
            tier === "premium"
              ? "bg-gradient-to-r from-primary to-accent text-background"
              : "bg-yellow-400 text-background hover:bg-yellow-300",
          )}
        >
          Voir les offres
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border rounded-2xl p-6 flex flex-col items-center text-center gap-4 bg-gradient-to-br",
        config.border,
        config.gradient,
        className,
      )}
    >
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", config.bg)}>
        <Icon className={cn("w-7 h-7", config.color)} strokeWidth={1.5} />
      </div>

      <div className="space-y-1">
        <p className={cn("text-sm font-black", config.color)}>
          {config.label} · {config.price}
        </p>
        <h3 className="font-bold text-foreground text-base">
          {title ?? `Fonctionnalité ${config.label}`}
        </h3>
        <p className="text-sm text-muted-foreground text-balance max-w-xs mx-auto">
          {description ?? `Abonne-toi au plan ${config.label} pour accéder à cette fonctionnalité.`}
        </p>
      </div>

      <Button
        onClick={() => navigate("/pricing")}
        className={cn(
          "rounded-xl font-bold px-6",
          tier === "premium"
            ? "bg-gradient-to-r from-primary to-accent text-background shadow-lg shadow-primary/20 hover:opacity-90"
            : "bg-yellow-400 text-background hover:bg-yellow-300 shadow-lg shadow-yellow-400/20",
        )}
      >
        Voir les offres
      </Button>
    </div>
  );
}

export function PaywallSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("w-full rounded-2xl", className)} />;
}
