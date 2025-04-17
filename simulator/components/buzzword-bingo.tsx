"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Confetti } from "@/components/confetti"

const CORPORATE_BUZZWORDS = [
  "Synergy",
  "Leverage",
  "Paradigm shift",
  "Circle back",
  "Deep dive",
  "Low-hanging fruit",
  "Move the needle",
  "Bandwidth",
  "Touch base",
  "Thought leadership",
  "Value-add",
  "Actionable insights",
  "Drill down",
  "Ecosystem",
  "Holistic approach",
  "Agile",
  "Scalable",
  "Disruptive",
  "Best practice",
  "Streamline",
  "Pain point",
  "Deliverable",
  "ROI",
  "KPI",
  "Alignment",
]

export function BuzzwordBingo() {
  const [bingoCard, setBingoCard] = useState<string[]>([])
  const [selectedWords, setSelectedWords] = useState<Set<number>>(new Set())
  const [hasWon, setHasWon] = useState(false)

  const generateBingoCard = () => {
    // Reset state
    setSelectedWords(new Set())
    setHasWon(false)

    // Generate a new card with 25 random buzzwords
    const shuffled = [...CORPORATE_BUZZWORDS].sort(() => 0.5 - Math.random())
    setBingoCard(shuffled.slice(0, 25))
  }

  const toggleWord = (index: number) => {
    const newSelected = new Set(selectedWords)

    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }

    setSelectedWords(newSelected)

    // Check for bingo
    checkForBingo(newSelected)
  }

  const checkForBingo = (selected: Set<number>) => {
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (
        selected.has(i * 5 + 0) &&
        selected.has(i * 5 + 1) &&
        selected.has(i * 5 + 2) &&
        selected.has(i * 5 + 3) &&
        selected.has(i * 5 + 4)
      ) {
        setHasWon(true)
        return
      }
    }

    // Check columns
    for (let i = 0; i < 5; i++) {
      if (
        selected.has(i) &&
        selected.has(i + 5) &&
        selected.has(i + 10) &&
        selected.has(i + 15) &&
        selected.has(i + 20)
      ) {
        setHasWon(true)
        return
      }
    }

    // Check diagonals
    if (selected.has(0) && selected.has(6) && selected.has(12) && selected.has(18) && selected.has(24)) {
      setHasWon(true)
      return
    }

    if (selected.has(4) && selected.has(8) && selected.has(12) && selected.has(16) && selected.has(20)) {
      setHasWon(true)
      return
    }
  }

  return (
    <Card>
      {hasWon && <Confetti />}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Bingo des Buzzwords Corporate
          {hasWon && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-500"
            >
              <path d="M14.5 2H9.5L7 6H2L5 10L3.5 16H10L12 22L14.5 16H21L19.5 10L22 6H17L14.5 2Z"></path>
            </svg>
          )}
        </CardTitle>
        <CardDescription>Cochez les buzzwords que vous entendez en réunion. Alignez-en 5 pour gagner!</CardDescription>
      </CardHeader>
      <CardContent>
        {bingoCard.length > 0 ? (
          <div className="grid grid-cols-5 gap-2">
            {bingoCard.map((word, index) => (
              <Button
                key={index}
                variant={selectedWords.has(index) ? "default" : "outline"}
                className={`h-auto min-h-[60px] p-2 text-xs sm:text-sm text-center ${
                  selectedWords.has(index) ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => toggleWord(index)}
              >
                {word}
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex justify-center p-8">
            <Button onClick={generateBingoCard}>Générer une carte de Bingo</Button>
          </div>
        )}
      </CardContent>
      {bingoCard.length > 0 && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={generateBingoCard}>
            Nouvelle carte
          </Button>
          {hasWon && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              BINGO! Vous avez gagné!
            </Badge>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
