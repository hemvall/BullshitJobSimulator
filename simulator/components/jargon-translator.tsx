"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check } from "lucide-react"

const jargonDictionary: Record<string, string[]> = {
  talk: ["sync", "touch base", "align", "interface", "connect"],
  meeting: ["huddle", "stand-up", "alignment session", "sync", "collaborative session"],
  problem: ["challenge", "opportunity", "pain point", "friction point", "area of improvement"],
  idea: ["value proposition", "strategic initiative", "innovative concept", "disruptive solution", "paradigm shift"],
  use: ["leverage", "utilize", "operationalize", "implement", "deploy"],
  improve: ["optimize", "enhance", "streamline", "elevate", "transform"],
  start: ["initiate", "kickoff", "launch", "greenlight", "activate"],
  think: ["ideate", "conceptualize", "strategize", "envision", "brainstorm"],
  goal: ["objective", "key result", "deliverable", "milestone", "target metric"],
  plan: ["roadmap", "strategic framework", "action plan", "execution strategy", "blueprint"],
  important: ["mission-critical", "high-priority", "key", "essential", "strategic"],
  change: ["pivot", "transition", "transform", "evolve", "recalibrate"],
  result: ["outcome", "deliverable", "ROI", "value-add", "impact"],
  good: ["best-in-class", "industry-leading", "top-tier", "premium", "high-performance"],
  bad: ["suboptimal", "challenging", "below expectations", "requiring optimization", "opportunity area"],
  money: ["capital", "resources", "budget allocation", "financial investment", "funding"],
  customer: ["stakeholder", "end user", "client partner", "key account", "target demographic"],
  work: ["execute", "deliver", "implement", "operationalize", "action"],
  fast: ["agile", "rapid", "accelerated", "expedited", "time-efficient"],
  team: ["cross-functional unit", "tiger team", "pod", "squad", "task force"],
}

export function JargonTranslator() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [copied, setCopied] = useState(false)

  const translateToJargon = () => {
    if (!inputText.trim()) return

    let result = inputText

    // Replace words with jargon
    Object.entries(jargonDictionary).forEach(([word, replacements]) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi")
      result = result.replace(regex, () => {
        const replacement = replacements[Math.floor(Math.random() * replacements.length)]
        return replacement
      })
    })

    // Add random corporate phrases
    const corporatePhrases = [
      " to move the needle",
      " at the end of the day",
      " going forward",
      " in this space",
      " with a holistic approach",
      " to drive growth",
      " for maximum impact",
      " with key stakeholders",
      " to achieve synergy",
      " in the current landscape",
    ]

    // Add phrases to some sentences
    const sentences = result.split(". ")
    const enhancedSentences = sentences.map((sentence, index) => {
      if (index % 3 === 0 && sentence.length > 10) {
        const randomPhrase = corporatePhrases[Math.floor(Math.random() * corporatePhrases.length)]
        return sentence + randomPhrase
      }
      return sentence
    })

    result = enhancedSentences.join(". ")

    setOutputText(result)
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traducteur de Jargon Corporate</CardTitle>
        <CardDescription>Transformez votre langage ordinaire en jargon corporate impressionnant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Entrez votre texte normal ici..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[100px]"
        />

        <div className="flex justify-center">
          <Button onClick={translateToJargon} disabled={!inputText.trim()}>
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
              <path d="m17 3 5 5-5 5"></path>
              <path d="M3 16a5 5 0 0 0 5 5h8"></path>
              <path d="M3 8a5 5 0 0 1 5-5h4"></path>
            </svg>
            Traduire en Corporate
          </Button>
        </div>

        {outputText && (
          <div className="relative">
            <Textarea value={outputText} readOnly className="min-h-[100px] bg-muted" />
            <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copyOutput}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
