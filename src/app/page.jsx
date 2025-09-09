"use client"

import { useState } from "react"
import {
Card,
CardHeader,
CardTitle,
CardDescription,
CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileSpreadsheet, CheckCircle } from "lucide-react"

export default function Home() {
const [file, setFile] = useState(null)
const [comments, setComments] = useState([])
const [loading, setLoading] = useState(false)
const [results, setResults] = useState(null)

const handleFileUpload = (e) => {
const uploadedFile = e.target.files[0]
if (!uploadedFile) return
setFile(uploadedFile)
}

const handleAnalyze = async () => {
setLoading(true)
// TODO: connect to /api/analyze
setTimeout(() => {
setResults({
overall:
"Most comments are positive, but clarity is needed on compliance sections.",
data: [
{
text: comments[0],
sentiment: "Positive",
summary: "Supportive of simplification",
},
{
text: comments[1],
sentiment: "Neutral",
summary: "Requests clarification",
},
{
text: comments[2],
sentiment: "Negative",
summary: "Implementation concerns",
},
],
keywords: { compliance: 5, clarity: 3, draft: 2, amendment: 4 },
})
setLoading(false)
}, 2000)
}

return (
<main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
<div className="max-w-5xl mx-auto space-y-8">
{/* Header */}
<div className="text-center space-y-4">
<h1 className="text-5xl font-bold text-indigo-700">
eConsultation AI Feedback Analyzer
</h1>
<p className="text-slate-600 text-lg">
Upload stakeholder feedback files and let AI handle sentiment
analysis, summaries, and keyword insights.
</p>
</div>

    {/* Upload Card */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-indigo-600" />
          Upload Feedback File
        </CardTitle>
        <CardDescription>
          Accepts Excel or CSV with stakeholder comments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
          className="mb-4 bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded cursor-pointer"
        />
        {file && (
          <div className="text-sm text-slate-700">
            <strong>File:</strong> {file.name}
          </div>
        )}
      </CardContent>
    </Card>

  
  </div>
</main>


)
}