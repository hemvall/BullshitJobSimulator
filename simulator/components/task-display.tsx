import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TaskDisplayProps {
  task: string
  department: string
}

export function TaskDisplay({ task, department }: TaskDisplayProps) {
  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case "marketing":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "sales":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "it":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "ops":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hr":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDepartmentName = (dept: string) => {
    const deptMap: Record<string, string> = {
      marketing: "Marketing",
      sales: "Ventes",
      it: "IT",
      ops: "Opérations",
      hr: "RH",
    }
    return deptMap[dept] || dept
  }

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <Badge className={`${getDepartmentColor(department)} mb-2`}>{getDepartmentName(department)}</Badge>
          <Badge variant="outline" className="text-xs">
            Priorité: Haute
          </Badge>
        </div>
        <p className="text-lg font-medium mt-2">{task}</p>
        <div className="mt-4 text-sm text-gray-500">
          <p>Deadline: {new Date().toLocaleDateString("fr-FR", { weekday: "long", month: "long", day: "numeric" })}</p>
          <p>Stakeholders: Direction, Équipe {getDepartmentName(department)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
