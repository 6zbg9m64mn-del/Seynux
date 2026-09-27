import { Link } from "react-router-dom";
import { Unauthenticated } from "convex/react";
import { LockKeyhole } from "lucide-react";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty.tsx";

export default function ReportUnavailable() {
  return <main className="min-h-screen flex items-center justify-center bg-background p-5">
    <Empty className="max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-10">
      <EmptyHeader>
        <EmptyMedia variant="icon"><LockKeyhole /></EmptyMedia>
        <EmptyTitle>Ce bilan est privé</EmptyTitle>
        <EmptyDescription>Connecte-toi au compte propriétaire ou ouvre le lien privé complet reçu à la fin du test. Ce message apparaît aussi si le bilan n’existe plus.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p className="text-sm text-muted-foreground">Les anciens bilans anonymes sans clé privée ne sont plus accessibles par simple lien. Aucune donnée n’a été supprimée.</p>
        <Unauthenticated><SignInButton signInText="Me connecter" className="cursor-pointer" /></Unauthenticated>
        <Button asChild variant="secondary" className="cursor-pointer"><Link to="/history">Mes bilans</Link></Button>
        <Button asChild variant="ghost" className="cursor-pointer"><Link to="/">Revenir à l’accueil</Link></Button>
      </EmptyContent>
    </Empty>
  </main>;
}
