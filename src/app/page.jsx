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
import { FileSpreadsheet, Sun, Moon, Upload } from "lucide-react"
import * as XLSX from "xlsx"

export default function Home() {
  const [file, setFile] = useState(null)
  const [csvFileName, setCsvFileName] = useState("")
  const [theme, setTheme] = useState("light")
  const [dragActive, setDragActive] = useState(false)

  // Set theme based on system preference
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
    convertToCSV(uploadedFile)
  }

  // Drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload({ target: { files: e.dataTransfer.files } })
    }
  }

  // Convert Excel → CSV (only name shown)
  const convertToCSV = (uploadedFile) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: "array" })

      // take the first sheet
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      XLSX.utils.sheet_to_csv(worksheet) // we just convert, not saving

      // just set CSV filename
      const csvName = uploadedFile.name.replace(/\.[^/.]+$/, "") + ".csv"
      setCsvFileName(csvName)
    }
    reader.readAsArrayBuffer(uploadedFile)
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative text-center space-y-4">
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

          <CardContent className="flex flex-col items-center w-full">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              id="file-upload"
              onChange={handleFileUpload}
              className="hidden"
            />

            <label
              htmlFor="file-upload"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center w-full max-w-xl px-6 py-12 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                dragActive
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-900/30"
                  : "border-muted-foreground/40 hover:border-amber-500"
              }`}
            >
              <Upload className="h-10 w-10 text-amber-500 mb-3" />
              <p className="text-lg font-medium text-foreground">
                Drag & drop your file here
              </p>
              <p className="text-sm text-muted-foreground">
                or{" "}
                <span className="text-amber-600 font-semibold">
                  click to upload
                </span>
              </p>
            </label>

            {/* Show original + converted file name */}
            {file && (
              <div className="mt-4 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <p>
                  <strong>Uploaded:</strong> {file.name}
                </p>
                {csvFileName && (
                  <p>
                    <strong>Converted CSV:</strong> {csvFileName}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
