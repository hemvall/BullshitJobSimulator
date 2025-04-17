"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ProfessionalScreen } from "@/components/professional-screen"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PanicModeProps {
  children: React.ReactNode
}

export function PanicMode({ children }: PanicModeProps) {
  const [isPanicMode, setIsPanicMode] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key triggers panic mode
      if (event.key === "Escape") {
        setIsPanicMode((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleAlertClose = () => {
    setShowAlert(false)
  }

  return (
    <div className="relative">
      {showAlert && (
        <Alert className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          <AlertTitle className="flex items-center gap-2">
            Mode Panique
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="8" cy="15" r="4"></circle>
              <path d="M10.85 12.15a4 4 0 0 1 5.65 5.65"></path>
              <path d="M18.5 8.5a6 6 0 0 0-8.5 0"></path>
              <path d="M23 4a9.44 9.44 0 0 0-13.36 0"></path>
            </svg>
            <kbd className="px-2 py-1 bg-gray-100 rounded">Esc</kbd>
          </AlertTitle>
          <AlertDescription>
            Appuyez sur la touche <kbd className="px-1 py-0.5 bg-gray-100 rounded">Esc</kbd> pour basculer rapidement
            vers un écran professionnel si quelqu'un approche. Appuyez à nouveau sur{" "}
            <kbd className="px-1 py-0.5 bg-gray-100 rounded">Esc</kbd> pour revenir.
            <button onClick={handleAlertClose} className="ml-2 text-xs text-gray-500 hover:text-gray-700 underline">
              Ne plus afficher
            </button>
          </AlertDescription>
        </Alert>
      )}

      <div className={`transition-opacity duration-150 ${isPanicMode ? "hidden" : "block"}`}>{children}</div>

      {isPanicMode && (
        <div className="fixed inset-0 bg-white z-50 transition-all duration-150 ease-in-out">
          <ProfessionalScreen />
        </div>
      )}
    </div>
  )
}
