"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Upload, Download, FileText, Loader2, RotateCcw } from "lucide-react"
import { translations, type TranslationKey } from "@/lib/languages"

interface BatchGeneratorProps {
  language: string
}

export function BatchGenerator({ language }: BatchGeneratorProps) {
  // Batch-specific settings (independent from single image generator)
  const [batchTextColor, setBatchTextColor] = useState("#000000")
  const [batchBackgroundColor, setBatchBackgroundColor] = useState("#8ACE00")
  const [batchFontSize, setBatchFontSize] = useState([48])
  const [batchBlurEffect, setBatchBlurEffect] = useState([2.1])
  const [batchWidth, setBatchWidth] = useState([594])
  const [batchHeight, setBatchHeight] = useState([594])
  const [batchBorderRadius, setBatchBorderRadius] = useState([0])

  const [batchText, setBatchText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedImages, setGeneratedImages] = useState<{ text: string; dataUrl: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const t = (key: TranslationKey) => {
    return translations[language as keyof typeof translations]?.[key] || translations.en[key]
  }

  // Check if current language is RTL
  const isRTL = language === "ar"

  // Update preview in real-time
  useEffect(() => {
    updatePreview()
  }, [batchTextColor, batchBackgroundColor, batchFontSize, batchBlurEffect, batchWidth, batchHeight, batchBorderRadius])

  const updatePreview = () => {
    if (previewRef.current) {
      const preview = previewRef.current
      preview.style.width = `${Math.min(batchWidth[0], 200)}px`
      preview.style.height = `${Math.min(batchHeight[0], 200)}px`
      preview.style.backgroundColor = batchBackgroundColor
      preview.style.borderRadius = `${batchBorderRadius[0]}px`
      preview.style.color = batchTextColor
      preview.style.fontSize = `${Math.min(batchFontSize[0], (batchFontSize[0] * 200) / batchWidth[0])}px`
      preview.style.filter = `blur(${batchBlurEffect[0]}px)`
      preview.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
      preview.style.fontWeight = "bold"
      preview.style.textRendering = "optimizeLegibility"
      preview.style.webkitFontSmoothing = "antialiased"
      preview.style.mozOsxFontSmoothing = "grayscale"
    }
  }

  const resetBatchSettings = () => {
    setBatchTextColor("#000000")
    setBatchBackgroundColor("#8ACE00")
    setBatchFontSize([48])
    setBatchBlurEffect([2.1])
    setBatchWidth([594])
    setBatchHeight([594])
    setBatchBorderRadius([0])
  }

  const generateImageDataUrl = async (text: string): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        resolve("")
        return
      }

      // Get device pixel ratio for high quality rendering
      const pixelRatio = window.devicePixelRatio || 1
      const canvasWidth = batchWidth[0] * pixelRatio
      const canvasHeight = batchHeight[0] * pixelRatio

      // Set canvas actual size
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      // Scale context to match device pixel ratio
      ctx.scale(pixelRatio, pixelRatio)

      // Enable text antialiasing and high quality rendering
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      // Fill background
      ctx.fillStyle = batchBackgroundColor
      ctx.fillRect(0, 0, batchWidth[0], batchHeight[0])

      // Set text properties
      ctx.fillStyle = batchTextColor
      ctx.font = `bold ${batchFontSize[0]}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Handle blur effect separately if needed
      if (batchBlurEffect[0] > 0) {
        // Create temporary canvas for blur effect
        const tempCanvas = document.createElement("canvas")
        const tempCtx = tempCanvas.getContext("2d")
        if (tempCtx) {
          tempCanvas.width = canvasWidth
          tempCanvas.height = canvasHeight
          tempCtx.scale(pixelRatio, pixelRatio)

          // Draw clear text on temporary canvas
          tempCtx.fillStyle = batchBackgroundColor
          tempCtx.fillRect(0, 0, batchWidth[0], batchHeight[0])
          tempCtx.fillStyle = batchTextColor
          tempCtx.font = `bold ${batchFontSize[0]}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`
          tempCtx.textAlign = "center"
          tempCtx.textBaseline = "middle"
          tempCtx.fillText(text.toLowerCase(), batchWidth[0] / 2, batchHeight[0] / 2)

          // Apply blur effect to main canvas
          ctx.filter = `blur(${batchBlurEffect[0]}px)`
          ctx.drawImage(tempCanvas, 0, 0, batchWidth[0], batchHeight[0])
        }
      } else {
        // Draw clear text directly
        ctx.fillText(text.toLowerCase(), batchWidth[0] / 2, batchHeight[0] / 2)
      }

      // Reset filter
      ctx.filter = "none"

      resolve(canvas.toDataURL("image/png", 1.0))
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileExtension = file.name.split(".").pop()?.toLowerCase()

    try {
      if (fileExtension === "txt") {
        const text = await file.text()
        setBatchText(text)
      } else if (fileExtension === "csv") {
        const text = await file.text()
        const lines = text.split("\n").map((line) => line.replace(/[",]/g, "").trim())
        setBatchText(lines.join("\n"))
      } else if (fileExtension === "xlsx") {
        // For Excel files, we'll use a simple approach
        // In a real implementation, you'd use a library like xlsx
        const reader = new FileReader()
        reader.onload = (e) => {
          // This is a simplified approach - in production you'd use xlsx library
          setBatchText("Excel file uploaded - please copy and paste the content manually for now")
        }
        reader.readAsArrayBuffer(file)
      }
    } catch (error) {
      console.error("Error reading file:", error)
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const generateBatchImages = async () => {
    const lines = batchText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    if (lines.length === 0) return

    setIsGenerating(true)
    setProgress(0)
    setGeneratedImages([])

    const images: { text: string; dataUrl: string }[] = []

    for (let i = 0; i < lines.length; i++) {
      const text = lines[i]
      const dataUrl = await generateImageDataUrl(text)
      images.push({ text, dataUrl })

      setProgress(((i + 1) / lines.length) * 100)

      // Add a small delay to prevent browser freezing
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setGeneratedImages(images)
    setIsGenerating(false)
  }

  const downloadAllAsZip = async () => {
    if (generatedImages.length === 0) return

    // Dynamic import of JSZip
    const JSZip = (await import("jszip")).default

    const zip = new JSZip()

    generatedImages.forEach((image, index) => {
      // Convert data URL to blob
      const base64Data = image.dataUrl.split(",")[1]
      const binaryString = atob(base64Data)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      const fileName = `brat-${image.text.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${index + 1}.png`
      zip.file(fileName, bytes)
    })

    const content = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(content)
    const link = document.createElement("a")
    link.href = url
    link.download = "brat-images.zip"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Controls */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">{t("batchGenerateTitle")}</h3>
          <p className="text-gray-600 text-sm mb-4">{t("batchGenerateDesc")}</p>
        </div>

        {/* Multi-line Text Input */}
        <div>
          <label className="block text-sm font-medium mb-2">{t("multiLineText")}</label>
          <Textarea
            value={batchText}
            onChange={(e) => setBatchText(e.target.value)}
            placeholder={t("multiLineTextPlaceholder")}
            className="min-h-32 w-full"
            rows={6}
            dir={isRTL ? "rtl" : "ltr"}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">{t("uploadFile")}</label>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>{t("uploadFile")}</span>
            </Button>
            <span className="text-sm text-gray-500">{t("supportedFormats")}</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.csv,.xlsx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t("textColor")}</label>
            <div className="flex items-center space-x-2">
              <div
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                style={{ backgroundColor: batchTextColor }}
                onClick={() => document.getElementById("batchTextColorPicker")?.click()}
              />
              <input
                id="batchTextColorPicker"
                type="color"
                value={batchTextColor}
                onChange={(e) => setBatchTextColor(e.target.value)}
                className="sr-only"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t("backgroundColor")}</label>
            <div className="flex items-center space-x-2">
              <div
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                style={{ backgroundColor: batchBackgroundColor }}
                onClick={() => document.getElementById("batchBgColorPicker")?.click()}
              />
              <input
                id="batchBgColorPicker"
                type="color"
                value={batchBackgroundColor}
                onChange={(e) => setBatchBackgroundColor(e.target.value)}
                className="sr-only"
              />
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("fontSize")}: {batchFontSize[0]}px
            </label>
            <Slider
              value={batchFontSize}
              onValueChange={setBatchFontSize}
              max={200}
              min={12}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">{batchFontSize[0]}</div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t("blurEffect")}: {batchBlurEffect[0]}px
            </label>
            <Slider
              value={batchBlurEffect}
              onValueChange={setBatchBlurEffect}
              max={10}
              min={0}
              step={0.1}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">{batchBlurEffect[0]}</div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t("width")}: {batchWidth[0]}px
            </label>
            <Slider value={batchWidth} onValueChange={setBatchWidth} max={1200} min={200} step={1} className="w-full" />
            <div className="text-sm text-gray-500 mt-1">{batchWidth[0]}</div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t("height")}: {batchHeight[0]}px
            </label>
            <Slider
              value={batchHeight}
              onValueChange={setBatchHeight}
              max={1200}
              min={200}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">{batchHeight[0]}</div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t("borderRadius")}: {batchBorderRadius[0]}px
            </label>
            <Slider
              value={batchBorderRadius}
              onValueChange={setBatchBorderRadius}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">{batchBorderRadius[0]}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button onClick={resetBatchSettings} variant="outline" className="flex items-center space-x-2 bg-transparent">
            <RotateCcw className="w-4 h-4" />
            <span>{t("reset")}</span>
          </Button>

          <Button
            onClick={generateBatchImages}
            disabled={!batchText.trim() || isGenerating}
            className="flex items-center space-x-2 bg-[#8ACE00] hover:bg-[#7AB800] text-black"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            <span>{t("generateAll")}</span>
          </Button>

          {generatedImages.length > 0 && (
            <Button onClick={downloadAllAsZip} variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Download className="w-4 h-4" />
              <span>{t("downloadAll")}</span>
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t("generatingImages")}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
      </div>

      {/* Preview and Generated Images */}
      <div className="space-y-6">
        {/* Live Preview */}
        <div>
          <h4 className="text-sm font-medium mb-2">Live Preview</h4>
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <div
              ref={previewRef}
              className="flex items-center justify-center font-bold transition-all duration-200"
              style={{
                width: `${Math.min(batchWidth[0], 200)}px`,
                height: `${Math.min(batchHeight[0], 200)}px`,
                backgroundColor: batchBackgroundColor,
                color: batchTextColor,
                fontSize: `${Math.min(batchFontSize[0], (batchFontSize[0] * 200) / batchWidth[0])}px`,
                borderRadius: `${batchBorderRadius[0]}px`,
                filter: `blur(${batchBlurEffect[0]}px)`,
              }}
            >
              preview
            </div>
          </div>
        </div>

        {/* Generated Images Preview */}
        {generatedImages.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold">
              {t("batchComplete")} ({generatedImages.length} images)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {generatedImages.map((image, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-2 bg-white">
                  <img
                    src={image.dataUrl || "/placeholder.svg"}
                    alt={`Generated image: ${image.text}`}
                    className="w-full h-auto rounded"
                    style={{ maxHeight: "80px", objectFit: "contain" }}
                  />
                  <p className="text-xs text-gray-500 mt-1 truncate text-center">{image.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
