import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { Copy, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api.js";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";

export default function ReportPrivacy({ id, access, accessKey }: { id: Id<"assessments">; access: "owner" | "admin" | "guest"; accessKey?: string }) {
  const location = useLocation();
  const claim = useMutation(api.assessments.claim);
  const [busy, setBusy] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const privateLink = `${window.location.origin}${location.pathname}#key=${accessKey ?? ""}`;
  async function copyLink() {
    try { await navigator.clipboard.writeText(privateLink); toast.success("Lien privé copié. Conserve-le en lieu sûr."); }
    catch { setShowLink(true); toast.info("Copie et conserve ce lien privé."); }
  }
  async function attach() {
    if (!accessKey) return;
    setBusy(true);
    try { await claim({ id, accessKey }); toast.success("Bilan rattaché à ton compte. L’ancien lien privé est désactivé."); }
    catch { toast.error("Impossible de rattacher ce bilan. Réessaie."); }
    finally { setBusy(false); }
  }
  return <section className="rounded-2xl border border-primary/25 bg-primary/5 p-4 space-y-3">
    <p className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="size-4 text-primary" />{access === "admin" ? "Consultation administrative" : "Ton bilan est privé"}</p>
    {access === "guest" && accessKey ? <>
      <p className="text-sm text-muted-foreground">Conserve ton lien privé : toute personne qui le possède peut consulter ce bilan. Ne le partage pas. Sans ce lien ni la clé enregistrée sur cet appareil, le bilan ne pourra pas être retrouvé.</p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={copyLink} className="cursor-pointer"><Copy className="size-4" />Copier mon lien privé</Button>
        <Authenticated><Button size="sm" onClick={attach} disabled={busy} className="cursor-pointer">{busy ? "Rattachement…" : "Rattacher à mon compte"}</Button></Authenticated>
      </div>
      {showLink && <Input aria-label="Lien privé à conserver" readOnly value={privateLink} onFocus={(event) => event.target.select()} />}
      <Unauthenticated><p className="text-xs text-muted-foreground">Pour rattacher ce bilan à un compte, copie d’abord le lien, connecte-toi, puis rouvre-le.</p><SignInButton signInText="Me connecter" size="sm" className="cursor-pointer" /></Unauthenticated>
    </> : <p className="text-sm text-muted-foreground">{access === "owner" ? "Ce bilan est lié à ton compte. Tu peux le retrouver dans Mes bilans ; son adresse seule ne donne pas accès à tes résultats." : "Les réponses brutes et les clés privées ne sont pas transmises sur cette page."}</p>}
  </section>;
}
