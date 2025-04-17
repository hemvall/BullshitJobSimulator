"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSpreadsheet, Mail, Copy } from "lucide-react"
import { generateTask } from "@/lib/task-generator"
import { TaskDisplay } from "@/components/task-display"

const DEPARTMENTS = [
  { id: "marketing", name: "Marketing" },
  { id: "sales", name: "Sales" },
  { id: "it", name: "IT" },
  { id: "ops", name: "Operations" },
  { id: "hr", name: "HR" },
]

export function TaskGenerator() {
  const [currentTask, setCurrentTask] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("marketing")
  const [copySuccess, setCopySuccess] = useState(false)
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)

  const handleGenerateTask = () => {
    setIsGenerating(true)

    // Simulate loading
    setTimeout(() => {
      const task = generateTask(selectedDepartment)
      setCurrentTask(task)
      setIsGenerating(false)
    }, 600)
  }

  const handleCopyTask = () => {
    navigator.clipboard.writeText(currentTask)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const handleGenerateFile = () => {
    setActionSuccess("file")
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const handleSendEmail = () => {
    setActionSuccess("email")
    setTimeout(() => setActionSuccess(null), 2000)
  }

  return (
    <Card className="border-0">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle>Générateur de Tâches Bullshit</CardTitle>
        <CardDescription>Générez des tâches inutiles mais crédibles pour faire semblant de travailler</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="marketing" value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <TabsList className="grid grid-cols-5 mb-6">
            {DEPARTMENTS.map((dept) => (
              <TabsTrigger key={dept.id} value={dept.id}>
                {dept.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {DEPARTMENTS.map((dept) => (
            <TabsContent key={dept.id} value={dept.id} className="mt-0">
              <div className="space-y-4">
                <Button onClick={handleGenerateTask} className="w-full" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Génération en cours...
                    </>
                  ) : (
                    "Générer une tâche bullshit"
                  )}
                </Button>

                {currentTask && <TaskDisplay task={currentTask} department={selectedDepartment} />}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      {currentTask && (
        <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-4">
          <Button variant="outline" size="sm" onClick={handleCopyTask}>
            <Copy className="mr-2 h-4 w-4" />
            {copySuccess ? "Copié!" : "Copier"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleGenerateFile}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            {actionSuccess === "file" ? "Fichier généré!" : "Générer un fichier"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleSendEmail}>
            <Mail className="mr-2 h-4 w-4" />
            {actionSuccess === "email" ? "Email programmé!" : "Envoyer par email"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
