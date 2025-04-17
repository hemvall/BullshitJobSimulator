// Composants de base pour générer des tâches bullshit
const prefixes = {
  marketing: ["Analyser", "Optimiser", "Développer", "Créer", "Implémenter", "Concevoir"],
  sales: ["Prospecter", "Négocier", "Élaborer", "Présenter", "Finaliser", "Structurer"],
  it: ["Déployer", "Configurer", "Migrer", "Sécuriser", "Intégrer", "Automatiser"],
  ops: ["Coordonner", "Planifier", "Superviser", "Restructurer", "Auditer", "Standardiser"],
  hr: ["Recruter", "Former", "Évaluer", "Accompagner", "Développer", "Mettre en place"],
}

const objects = {
  marketing: [
    "la stratégie digitale",
    "le plan de communication",
    "les KPIs marketing",
    "le funnel d'acquisition",
    "le branding",
    "le content marketing",
  ],
  sales: [
    "le pipeline commercial",
    "les propositions commerciales",
    "le forecast Q3",
    "le plan d'action commercial",
    "les objectifs de vente",
    "la stratégie de pricing",
  ],
  it: [
    "l'infrastructure cloud",
    "la migration des serveurs",
    "le système de monitoring",
    "la politique de sécurité",
    "l'architecture technique",
    "le déploiement CI/CD",
  ],
  ops: [
    "le workflow opérationnel",
    "les processus internes",
    "la chaîne logistique",
    "le plan de continuité",
    "les KPIs opérationnels",
    "le système qualité",
  ],
  hr: [
    "le plan de formation",
    "le processus d'onboarding",
    "la GPEC",
    "le référentiel de compétences",
    "la politique de rémunération",
    "le climat social",
  ],
}

const targets = {
  marketing: [
    "pour améliorer le ROI",
    "pour le lancement produit",
    "pour le Q3",
    "en vue du comité de direction",
    "pour la refonte du site",
    "pour le nouveau segment client",
  ],
  sales: [
    "pour le comité commercial",
    "pour les grands comptes",
    "en vue du kick-off annuel",
    "pour la nouvelle offre",
    "pour le marché international",
    "pour la restructuration des territoires",
  ],
  it: [
    "pour la transformation digitale",
    "pour réduire la dette technique",
    "en vue de l'audit de sécurité",
    "pour optimiser les performances",
    "pour la mise en conformité RGPD",
    "pour le nouveau datacenter",
  ],
  ops: [
    "pour optimiser les coûts",
    "pour la certification ISO",
    "en vue de l'audit qualité",
    "pour le déménagement",
    "pour la nouvelle organisation",
    "pour le comité de pilotage",
  ],
  hr: [
    "pour le bilan social",
    "pour le plan de développement RH",
    "en vue des entretiens annuels",
    "pour la nouvelle convention collective",
    "pour le CSE",
    "pour le plan de mobilité interne",
  ],
}

const buzzwords = {
  marketing: ["omnicanal", "growth hacking", "inbound marketing", "customer journey", "brand equity", "data-driven"],
  sales: [
    "upselling",
    "closing rate",
    "customer success",
    "sales enablement",
    "account-based selling",
    "pipeline velocity",
  ],
  it: ["DevOps", "microservices", "blockchain", "machine learning", "zero-trust", "edge computing"],
  ops: [
    "lean management",
    "agilité opérationnelle",
    "excellence opérationnelle",
    "continuous improvement",
    "supply chain optimization",
    "business continuity",
  ],
  hr: ["marque employeur", "employee experience", "talent management", "upskilling", "flex office", "QVT"],
}

const formats = {
  marketing: ["PowerPoint", "Canva", "Google Analytics", "HubSpot", "Tableau de bord", "Benchmark"],
  sales: ["CRM", "Excel", "Salesforce", "Pipedrive", "Dashboard commercial", "Business Case"],
  it: ["Jira", "Confluence", "GitHub", "AWS", "Architecture diagram", "Runbook"],
  ops: ["Process map", "Gantt", "KPI dashboard", "Procédure", "Checklist", "Matrice RACI"],
  hr: ["Référentiel", "Tableau de bord social", "Plan d'action", "Guide", "Assessment", "Workday"],
}

export function generateTask(department: string): string {
  const prefix = getRandomElement(prefixes[department as keyof typeof prefixes] || prefixes.marketing)
  const object = getRandomElement(objects[department as keyof typeof objects] || objects.marketing)
  const target = getRandomElement(targets[department as keyof typeof targets] || targets.marketing)
  const buzzword = getRandomElement(buzzwords[department as keyof typeof buzzwords] || buzzwords.marketing)
  const format = getRandomElement(formats[department as keyof typeof formats] || formats.marketing)

  return `${prefix} ${object} ${target} en utilisant l'approche ${buzzword} (format ${format})`
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}
