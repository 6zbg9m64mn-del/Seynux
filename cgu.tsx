import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Brain, ArrowLeft, FileText } from "lucide-react";
import Seo from "@/components/Seo.tsx";

export default function CguPage() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const sections = [
    {
      title: "1. Objet",
      content: [
        "Les présentes Conditions Générales d'Utilisation (CGU) définissent les modalités d'accès et d'utilisation du service Psyché, outil numérique d'aide à l'orientation scolaire accessible à l'adresse psyche.onhercules.app.",
        "En utilisant le service, vous acceptez sans réserve les présentes CGU.",
      ],
    },
    {
      title: "2. Description du service",
      content: [
        "Psyché propose un questionnaire d'auto-évaluation de 20 questions analysant 4 dimensions (cognition, discipline, émotion, motivation). Sur la base des réponses, le service génère :",
      ],
      list: [
        "Un profil d'orientation scolaire indicatif",
        "Des scores par dimension",
        "Des suggestions de séries et de filières",
        "Un plan d'étude personnalisé (offre payante)",
      ],
      footer:
        "Important : Psyché est un outil d'aide à la réflexion. Il ne constitue pas un diagnostic psychologique, médical ou professionnel. Les résultats sont purement indicatifs.",
    },
    {
      title: "3. Accès au service",
      content: [
        "Le test est accessible gratuitement et sans inscription. Les résultats partiels (scores et profil) sont affichés gratuitement.",
        "L'accès aux résultats complets est soumis au paiement d'un des forfaits proposés :",
      ],
      list: [
        "Analyse complète : 1 000 FCFA",
        "Analyse + Plan d'étude : 2 000 FCFA",
      ],
    },
    {
      title: "4. Paiement",
      content: [
        "Les paiements s'effectuent par Wave ou Orange Money. L'utilisateur envoie le montant au numéro indiqué, puis saisit son numéro de téléphone pour vérification.",
        "L'accès aux résultats est débloqué automatiquement dans un délai maximum de 5 minutes après le paiement, sauf en cas de vérification manuelle par l'administrateur.",
        "Aucun remboursement n'est possible une fois le service délivré (résultats débloqués).",
      ],
    },
    {
      title: "5. Utilisation par les mineurs",
      content: [
        "Le service est destiné aux élèves et étudiants, y compris les mineurs de moins de 18 ans.",
        "L'utilisation du service par un mineur est placée sous la responsabilité de son représentant légal. En utilisant Psyché, le mineur déclare avoir obtenu l'accord de son parent ou tuteur.",
        "Psyché s'engage à ne pas collecter de données sensibles supplémentaires concernant les mineurs au-delà de ce qui est strictement nécessaire au fonctionnement du service.",
      ],
    },
    {
      title: "6. Obligations de l'utilisateur",
      content: ["En utilisant Psyché, l'utilisateur s'engage à :"],
      list: [
        "Fournir des réponses honnêtes au questionnaire",
        "Ne pas tenter de contourner les mécanismes de paiement",
        "Ne pas utiliser le service à des fins frauduleuses",
        "Ne pas reproduire ou distribuer les résultats à des fins commerciales",
        "Respecter les présentes CGU",
      ],
    },
    {
      title: "7. Propriété intellectuelle",
      content: [
        "L'ensemble des éléments constituant le service Psyché (algorithmes, questionnaire, textes, design, logos) sont protégés par le droit de la propriété intellectuelle.",
        "Toute reproduction, modification ou exploitation non autorisée est strictement interdite.",
      ],
    },
    {
      title: "8. Limitation de responsabilité",
      content: [
        "Psyché fournit des suggestions d'orientation à titre purement indicatif. L'éditeur ne peut être tenu responsable :",
      ],
      list: [
        "Des décisions scolaires ou professionnelles prises sur la base des résultats",
        "De l'inexactitude ou de l'incomplétude des résultats",
        "Des interruptions temporaires du service",
        "De tout dommage indirect résultant de l'utilisation du service",
      ],
    },
    {
      title: "9. Données personnelles",
      content: [
        "Le traitement des données personnelles est régi par notre Politique de Confidentialité. En utilisant le service, vous consentez au traitement de vos données conformément à cette politique et à la Loi n°2008-12 sur la protection des données personnelles au Sénégal.",
      ],
    },
    {
      title: "10. Modification des CGU",
      content: [
        "Psyché se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent effet dès leur publication sur le site. L'utilisation continue du service après modification vaut acceptation des nouvelles CGU.",
      ],
    },
    {
      title: "11. Résiliation",
      content: [
        "Psyché se réserve le droit de suspendre ou de résilier l'accès de tout utilisateur en cas de non-respect des présentes CGU, sans préavis ni indemnité.",
      ],
    },
    {
      title: "12. Loi applicable et juridiction",
      content: [
        "Les présentes CGU sont régies par le droit sénégalais. Tout litige relatif à l'interprétation ou à l'exécution des présentes sera soumis aux tribunaux compétents de Dakar, Sénégal.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Conditions générales d'utilisation – Psyché"
        description="Conditions générales d'utilisation du service Psyché : accès, paiement, obligations de l'utilisateur et propriété intellectuelle."
        path="/cgu"
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

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">
                Conditions Générales d{"'"}Utilisation
              </h1>
              <p className="text-sm text-muted-foreground">
                Dernière mise à jour : {year}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, i) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.02 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-3"
            >
              <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
              {section.content.map((p, j) => (
                <p key={j} className="text-sm text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="space-y-1.5 pl-1">
                  {section.list.map((item, k) => (
                    <li key={k} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mt-2">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {section.footer}
                  </p>
                </div>
              )}
            </motion.section>
          ))}
        </div>

        <footer className="text-center pt-4 pb-8">
          <p className="text-xs text-muted-foreground/40">
            {year} Psyché · Tous droits réservés
          </p>
        </footer>
      </div>
    </div>
  );
}
