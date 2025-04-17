"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

// Sound URLs
const KEYBOARD_SOUND_URL = "/sounds/keyboard.mp3"
const PAPERS_SOUND_URL = "/sounds/papers.mp3"
const COUGH_SOUND_URL = "/sounds/cough.mp3"
const NOTIFICATION_SOUND_URL = "/sounds/notification.mp3"

export function MeetingSounds() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [enabledSounds, setEnabledSounds] = useState({
    keyboard: true,
    papers: true,
    cough: true,
    notification: true,
  })

  const keyboardInterval = useRef<NodeJS.Timeout | null>(null)
  const papersInterval = useRef<NodeJS.Timeout | null>(null)
  const coughInterval = useRef<NodeJS.Timeout | null>(null)
  const notificationInterval = useRef<NodeJS.Timeout | null>(null)

  const keyboardAudio = useRef<HTMLAudioElement | null>(null)
  const papersAudio = useRef<HTMLAudioElement | null>(null)
  const coughAudio = useRef<HTMLAudioElement | null>(null)
  const notificationAudio = useRef<HTMLAudioElement | null>(null)

  // Initialize audio elements
  useEffect(() => {
    if (typeof window !== "undefined") {
      keyboardAudio.current = new Audio()
      keyboardAudio.current.src = KEYBOARD_SOUND_URL

      papersAudio.current = new Audio()
      papersAudio.current.src = PAPERS_SOUND_URL

      coughAudio.current = new Audio()
      coughAudio.current.src = COUGH_SOUND_URL

      notificationAudio.current = new Audio()
      notificationAudio.current.src = NOTIFICATION_SOUND_URL

      return () => {
        // Cleanup
        if (keyboardAudio.current) keyboardAudio.current = null
        if (papersAudio.current) papersAudio.current = null
        if (coughAudio.current) coughAudio.current = null
        if (notificationAudio.current) notificationAudio.current = null
      }
    }
  }, [])

  // Update volume when it changes
  useEffect(() => {
    const vol = volume / 100
    if (keyboardAudio.current) keyboardAudio.current.volume = vol
    if (papersAudio.current) papersAudio.current.volume = vol
    if (coughAudio.current) coughAudio.current.volume = vol
    if (notificationAudio.current) notificationAudio.current.volume = vol
  }, [volume])

  const playKeyboardSound = () => {
    if (keyboardAudio.current) {
      keyboardAudio.current.currentTime = 0
      keyboardAudio.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const playPapersSound = () => {
    if (papersAudio.current) {
      papersAudio.current.currentTime = 0
      papersAudio.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const playCoughSound = () => {
    if (coughAudio.current) {
      coughAudio.current.currentTime = 0
      coughAudio.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const playNotificationSound = () => {
    if (notificationAudio.current) {
      notificationAudio.current.currentTime = 0
      notificationAudio.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const startSounds = () => {
    setIsPlaying(true)

    if (enabledSounds.keyboard) {
      keyboardInterval.current = setInterval(
        () => {
          playKeyboardSound()
        },
        Math.random() * 5000 + 2000,
      ) // Random interval between 2-7 seconds
    }

    if (enabledSounds.papers) {
      papersInterval.current = setInterval(
        () => {
          playPapersSound()
        },
        Math.random() * 15000 + 10000,
      ) // Random interval between 10-25 seconds
    }

    if (enabledSounds.cough) {
      coughInterval.current = setInterval(
        () => {
          playCoughSound()
        },
        Math.random() * 30000 + 20000,
      ) // Random interval between 20-50 seconds
    }

    if (enabledSounds.notification) {
      notificationInterval.current = setInterval(
        () => {
          playNotificationSound()
        },
        Math.random() * 20000 + 15000,
      ) // Random interval between 15-35 seconds
    }
  }

  const stopSounds = () => {
    setIsPlaying(false)

    if (keyboardInterval.current) clearInterval(keyboardInterval.current)
    if (papersInterval.current) clearInterval(papersInterval.current)
    if (coughInterval.current) clearInterval(coughInterval.current)
    if (notificationInterval.current) clearInterval(notificationInterval.current)
  }

  const toggleSound = (sound: keyof typeof enabledSounds) => {
    setEnabledSounds((prev) => ({
      ...prev,
      [sound]: !prev[sound],
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulateur d'Ambiance de Réunion</CardTitle>
        <CardDescription>
          Simulez les bruits d'une réunion en cours pour plus de crédibilité en télétravail
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button onClick={isPlaying ? stopSounds : startSounds} variant={isPlaying ? "destructive" : "default"}>
            {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isPlaying ? "Arrêter" : "Démarrer"}
          </Button>

          <div className="flex items-center space-x-2 flex-1">
            {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={(vals) => setVolume(vals[0])}
              className="flex-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="keyboard" checked={enabledSounds.keyboard} onCheckedChange={() => toggleSound("keyboard")} />
            <Label htmlFor="keyboard">Bruits de clavier</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="papers" checked={enabledSounds.papers} onCheckedChange={() => toggleSound("papers")} />
            <Label htmlFor="papers">Papiers qui se tournent</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="cough" checked={enabledSounds.cough} onCheckedChange={() => toggleSound("cough")} />
            <Label htmlFor="cough">Toux occasionnelle</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="notification"
              checked={enabledSounds.notification}
              onCheckedChange={() => toggleSound("notification")}
            />
            <Label htmlFor="notification">Notifications</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Parfait pour simuler une présence en réunion pendant que vous faites autre chose.
      </CardFooter>
    </Card>
  )
}
