import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Brain, ArrowLeft, ShieldCheck } from "lucide-react";
import Seo from "@/components/Seo.tsx";

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const sections = [
    {
      title: "1. Données collectées",
      content: [
        "Lors de l'utilisation de Psyché, nous pouvons collecter les données suivantes :",
      ],
      list: [
        "Données d'identification : nom, adresse e-mail (lors de la création de compte)",
        "Données démographiques : âge, niveau scolaire",
        "Données d'évaluation : réponses au questionnaire, scores, profil déterminé",
        "Données de paiement : numéro de téléphone du payeur (Wave/Orange Money)",
        "Données techniques : adresse IP, type de navigateur, date et heure de connexion",
      ],
    },
    {
      title: "2. Finalité du traitement",
      content: ["Les données collectées sont utilisées exclusivement pour :"],
      list: [
        "Fournir les résultats personnalisés du questionnaire d'orientation",
        "Améliorer la qualité et la pertinence du service",
        "Gérer les paiements et l'accès aux fonctionnalités payantes",
        "Communiquer avec l'utilisateur concernant son compte",
      ],
    },
    {
      title: "3. Base légale",
      content: [
        "Le traitement des données est fondé sur le consentement explicite de l'utilisateur, conformément à la Loi n°2008-12 du 25 janvier 2008 sur la protection des données à caractère personnel au Sénégal.",
        "Vous pouvez retirer votre consentement à tout moment en nous contactant.",
      ],
    },
    {
      title: "4. Durée de conservation",
      content: [
        "Les données d'évaluation sont conservées pendant une durée maximale de 12 mois à compter de la dernière utilisation du service.",
        "Les données de compte sont conservées tant que le compte est actif. Elles sont supprimées dans un délai de 30 jours après la demande de suppression.",
      ],
    },
    {
      title: "5. Partage des données",
      content: [
        "Psyché ne vend, ne loue et ne partage vos données personnelles avec aucun tiers à des fins commerciales.",
        "Les données peuvent être partagées uniquement avec :",
      ],
      list: [
        "Notre hébergeur (Hercules Cloud) pour le fonctionnement technique du service",
        "Les autorités compétentes si la loi l'exige",
      ],
    },
    {
      title: "6. Sécurité",
      content: [
        "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.",
        "Les données sont stockées sur des serveurs sécurisés avec chiffrement en transit (HTTPS/TLS).",
      ],
    },
    {
      title: "7. Protection des mineurs",
      content: [
        "Psyché est destiné aux élèves et étudiants, y compris les mineurs. L'utilisation du service par un mineur implique que celui-ci a obtenu l'autorisation de son représentant légal (parent ou tuteur).",
        "Nous encourageons les parents et tuteurs à superviser l'utilisation du service par les mineurs.",
      ],
    },
    {
      title: "8. Vos droits",
      content: [
        "Conformément à la loi sénégalaise sur la protection des données, vous disposez des droits suivants :",
      ],
      list: [
        "Droit d'accès : obtenir une copie de vos données personnelles",
        "Droit de rectification : corriger des données inexactes",
        "Droit de suppression : demander la suppression de vos données",
        "Droit d'opposition : vous opposer au traitement de vos données",
        "Droit de portabilité : recevoir vos données dans un format structuré",
      ],
      footer:
        "Pour exercer ces droits, contactez-nous à : psyche.orientation@gmail.com",
    },
    {
      title: "9. Commission des Données Personnelles (CDP)",
      content: [
        "Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la Commission des Données Personnelles du Sénégal (CDP) :",
        "Site web : www.cdp.sn",
      ],
    },
    {
      title: "10. Cookies",
      content: [
        "Psyché utilise des cookies strictement nécessaires au fonctionnement du service (authentification, session). Aucun cookie de suivi publicitaire n'est utilisé.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Politique de confidentialité – Psyché"
        description="Découvre comment Psyché collecte, utilise et protège tes données personnelles conformément à la loi sénégalaise sur la protection des données."
        path="/confidentialite"
      />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full" />
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
            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">
                Politique de Confidentialité
              </h1>
              <p className="text-sm text-muted-foreground">
                Dernière mise à jour : {year}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-primary/5 border border-primary/15 rounded-2xl p-5"
        >
          <p className="text-sm text-foreground/80 leading-relaxed">
            Psyché accorde une importance particulière à la protection de vos données personnelles.
            La présente politique vous informe de la manière dont vos données sont collectées,
            utilisées et protégées conformément à la <strong>Loi n°2008-12 du 25 janvier 2008</strong> relative
            à la protection des données à caractère personnel au Sénégal.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, i) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.03 }}
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
                <p className="text-sm text-primary font-semibold mt-2">{section.footer}</p>
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
