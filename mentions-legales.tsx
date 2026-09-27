import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Brain, ArrowLeft } from "lucide-react";
import Seo from "@/components/Seo.tsx";

export default function MentionsLegalesPage() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Mentions légales – Psyché"
        description="Mentions légales du service Psyché : éditeur, hébergement, propriété intellectuelle et responsabilité de l'outil d'orientation scolaire."
        path="/mentions-legales"
      />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-bold text-sm tracking-wide">Psyché</span>
          </button>

          <h1 className="text-3xl font-black text-foreground">
            Mentions Légales
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Dernière mise à jour : {year}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-sm prose-invert max-w-none space-y-6"
        >
          <section className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-foreground">1. Éditeur du site</h2>
            <div className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
              <p><strong className="text-foreground">Nom du service :</strong> Psyché</p>
              <p><strong className="text-foreground">Nature :</strong> Outil numérique d{"'"}aide à l{"'"}orientation scolaire</p>
              <p><strong className="text-foreground">Pays :</strong> Sénégal</p>
              <p><strong className="text-foreground">Contact :</strong> psyche.orientation@gmail.com</p>
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-foreground">2. Hébergement</h2>
            <div className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
              <p>Le site est hébergé par <strong className="text-foreground">Hercules Cloud</strong>.</p>
              <p>Adresse : Hercules Technologies Inc.</p>
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-foreground">3. Nature du service</h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                Psyché est un <strong className="text-foreground">outil numérique d{"'"}aide à la réflexion et à l{"'"}orientation scolaire</strong>.
                Il propose un questionnaire d{"'"}auto-évaluation et génère des suggestions personnalisées basées sur les réponses fournies.
              </p>
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mt-3">
                <p className="text-destructive font-bold text-xs uppercase tracking-wide mb-1">Avertissement important</p>
                <p className="text-sm text-foreground/80">
                  Psyché <strong>n{"'"}est pas un service de psychologie</strong>, de diagnostic médical, ni de conseil professionnel.
                  Les résultats sont purement indicatifs et ne remplacent en aucun cas l{"'"}avis d{"'"}un psychologue, d{"'"}un conseiller d{"'"}orientation
                  ou d{"'"}un professionnel de l{"'"}éducation qualifié.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-foreground">4. Propriété intellectuelle</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              L{"'"}ensemble du contenu du site (textes, questionnaires, algorithmes, design, logos) est la propriété
              exclusive de Psyché. Toute reproduction, distribution ou utilisation sans autorisation
              préalable est interdite conformément à la législation sénégalaise et internationale en
              matière de propriété intellectuelle.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-foreground">5. Responsabilité</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Psyché s{"'"}efforce de fournir des informations fiables et pertinentes.
              Cependant, l{"'"}éditeur ne peut garantir l{"'"}exactitude, la complétude ou l{"'"}actualité
              des informations fournies. L{"'"}utilisation du service se fait sous la seule
              responsabilité de l{"'"}utilisateur. Psyché ne saurait être tenu responsable des
              décisions prises sur la base des résultats fournis.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-foreground">6. Loi applicable</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Les présentes mentions légales sont régies par le droit sénégalais.
              En cas de litige, les tribunaux compétents de Dakar seront seuls compétents.
            </p>
          </section>
        </motion.div>

        <footer className="text-center pt-4 pb-8">
          <p className="text-xs text-muted-foreground/40">
            {year} Psyché · Tous droits réservés
          </p>
        </footer>
      </div>
    </div>
  );
}
