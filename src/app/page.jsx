"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button.jsx"
import { FileSpreadsheet, Sun, Moon } from "lucide-react"

export default function Home() {
  const [file, setFile] = useState(null)
  const [theme, setTheme] = useState("light")

  // Set theme based on system preference when component mounts
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }
  }

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0]
    if (!uploadedFile) return
    setFile(uploadedFile)
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative text-center space-y-4">
          {/* Theme Switch Button */}
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="absolute top-0 right-0"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <h1 className="text-5xl font-bold text-primary transition-colors">
            eConsultation AI Feedback Analyzer
          </h1>
          <p className="text-muted-foreground text-lg flex justify-center">
            Upload stakeholder feedback files and let AI handle sentiment
            analysis, summaries, and keyword insights.
          </p>
        </div>

        {/* Upload Card */}
        <Card className="transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              Upload Feedback File
            </CardTitle>
            <CardDescription className="flex justify-center">
              Accepts Excel or CSV with stakeholder comments
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="my-5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 hover:my-4 hover:py-3 cursor-pointer transition-all duration-300 ease-in-out rounded-md"
            />
            {file && (
              <div className="text-sm text-muted-foreground">
                <strong>File:</strong> {file.name}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
