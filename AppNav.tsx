import { Link, useLocation } from "react-router-dom";
import {
  Brain,
  LayoutDashboard,
  FlaskConical,
  CalendarCheck,
  History,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { useAuth } from "@/hooks/use-auth.ts";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { useAccess } from "@/hooks/use-access.ts";

const NAV_LINKS = [
  { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/test", label: "Passer le test", icon: FlaskConical },
  { to: "/history", label: "Historique", icon: History },
  { to: "/track", label: "Suivi quotidien", icon: CalendarCheck },
];

const DEFAULT_COLOR = "#6d28d9";

function getInitials(name?: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function NavAvatar() {
  const location = useLocation();
  const { user: authUser } = useAuth();
  const user = useQuery(api.users.getCurrentUser, {});
  const { hasPremium, hasPro, isLoading } = useAccess();

  const color = user?.avatarColor ?? DEFAULT_COLOR;
  const name = user?.displayName ?? user?.name ?? authUser?.profile?.name;
  const initials = getInitials(name);
  const active = location.pathname.startsWith("/profile");
  const showUpgrade = !isLoading && !hasPremium && !hasPro;

  return (
    <div className="flex items-center gap-2">
      {showUpgrade && (
        <Link
          to="/pricing"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary/20 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          Premium
        </Link>
      )}
      <Link
        to="/profile"
        title="Mon profil"
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-xl font-black text-xs text-white transition-all",
          active ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : "opacity-90 hover:opacity-100 hover:scale-105",
        )}
        style={{ backgroundColor: color }}
      >
        {initials}
      </Link>
    </div>
  );
}

export default function AppNav() {
  const location = useLocation();

  return (
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/20">
            <Brain className="w-4 h-4 text-background" strokeWidth={2} />
          </div>
          <span className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
            Psyché
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Avatar / auth */}
        <div className="flex items-center gap-2">
          <Authenticated>
            <NavAvatar />
          </Authenticated>
          <Unauthenticated>
            <SignInButton className="h-8 px-4 text-sm rounded-xl" />
          </Unauthenticated>
        </div>
      </div>
    </nav>
  );
}

