import { TaskGenerator } from "@/components/task-generator"
import { PanicMode } from "@/components/panic-mode"
import { BuzzwordBingo } from "@/components/buzzword-bingo"
import { ExcuseGenerator } from "@/components/excuse-generator"
import { JargonTranslator } from "@/components/jargon-translator"
import { MeetingSounds } from "@/components/meeting-sounds"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Bullshit Job Simulator</h1>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700">MVP</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <PanicMode>
          <Tabs defaultValue="tasks" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full max-w-4xl mx-auto">
              <TabsTrigger value="tasks">Tâches</TabsTrigger>
              <TabsTrigger value="bingo">Bingo</TabsTrigger>
              <TabsTrigger value="excuses">Excuses</TabsTrigger>
              <TabsTrigger value="translator">Traducteur</TabsTrigger>
              <TabsTrigger value="sounds">Sons</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <TaskGenerator />
              </div>
            </TabsContent>

            <TabsContent value="bingo">
              <BuzzwordBingo />
            </TabsContent>

            <TabsContent value="excuses">
              <ExcuseGenerator />
            </TabsContent>

            <TabsContent value="translator">
              <JargonTranslator />
            </TabsContent>

            <TabsContent value="sounds">
              <MeetingSounds />
            </TabsContent>
          </Tabs>
        </PanicMode>
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
        <p>Faites semblant de travailler avec style 🥸</p>
      </footer>
    </div>
  )
}
