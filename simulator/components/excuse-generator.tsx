"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"

const excuseSubjects = [
  "Le rapport",
  "La présentation",
  "Le livrable",
  "Le document",
  "L'analyse",
  "Le projet",
  "Le plan d'action",
  "Le dashboard",
  "La mise à jour",
  "Le déploiement",
]

const excuseReasons = [
  "est retardé à cause d'un problème technique inattendu",
  "nécessite une validation supplémentaire de la direction",
  "a rencontré des complications dues à des dépendances externes",
  "est en attente de retours des parties prenantes",
  "est en cours de révision suite à de nouvelles exigences",
  "a été impacté par des changements de priorité",
  "est en attente de ressources supplémentaires",
  "nécessite une analyse plus approfondie",
  "est bloqué par un problème de compatibilité",
  "est en cours de refonte pour améliorer la qualité",
]

const excuseTimelines = [
  "Je vous enverrai une mise à jour d'ici la fin de la journée.",
  "Nous devrions pouvoir finaliser cela d'ici demain.",
  "Je vous propose de faire un point en fin de semaine.",
  "Nous sommes en train de redéfinir le planning.",
  "Je vous tiendrai informé de l'avancement.",
  "Nous travaillons activement à résoudre ce problème.",
  "Je vais organiser une réunion pour discuter des prochaines étapes.",
  "Nous avons déjà mis en place un plan de contingence.",
  "Je vous enverrai une version préliminaire dès que possible.",
  "Nous sommes en train de mobiliser des ressources supplémentaires.",
]

export function ExcuseGenerator() {
  const [excuse, setExcuse] = useState("")
  const [copied, setCopied] = useState(false)

  const generateExcuse = () => {
    const subject = excuseSubjects[Math.floor(Math.random() * excuseSubjects.length)]
    const reason = excuseReasons[Math.floor(Math.random() * excuseReasons.length)]
    const timeline = excuseTimelines[Math.floor(Math.random() * excuseTimelines.length)]

    setExcuse(`${subject} ${reason}. ${timeline}`)
    setCopied(false)
  }

  const copyExcuse = () => {
    navigator.clipboard.writeText(excuse)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Générateur d'Excuses Corporate</CardTitle>
        <CardDescription>
          Besoin d'une excuse pour un retard ou un livrable non terminé? Nous avons ce qu'il vous faut!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={generateExcuse} className="w-full">
          <svg
            className="mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
          </svg>
          Générer une excuse
        </Button>

        {excuse && (
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm">{excuse}</p>
          </div>
        )}
      </CardContent>
      {excuse && (
        <CardFooter>
          <Button variant="outline" size="sm" onClick={copyExcuse} className="ml-auto">
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Copié!" : "Copier"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
