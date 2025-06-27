"use client"

import type React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, Sparkles, ImageIcon, ArrowRight } from "lucide-react"
import { useState } from "react"
import { AdBanner } from "./ad-banner"

export function GeneratorTool() {
  const [text, setText] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [font, setFont] = useState("Arial")
  const [fontSize, setFontSize] = useState(40)
  const [fontColor, setFontColor] = useState("#ffffff")
  const [textX, setTextX] = useState(0.5)
  const [textY, setTextY] = useState(0.9)
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      if (uploadedImage) {
        const img = new window.Image()
        img.src = uploadedImage
        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, 0, 0)
            // 设置文字样式
            ctx.font = `bold ${fontSize}px ${font}`;
            ctx.fillStyle = fontColor;
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.textAlign = "center";

            // 计算文字位置
            const textPosX = canvas.width * textX;
            const textPosY = canvas.height * textY;

            ctx.strokeText(text, textPosX, textPosY);
            ctx.fillText(text, textPosX, textPosY);
            // 导出合成图片
            const dataUrl = canvas.toDataURL("image/png")
            setGeneratedImage(dataUrl)
            setGalleryImages(prev => [dataUrl, ...prev])
          }
          setIsGenerating(false)
        }
      } else {
        setGeneratedImage("/placeholder.svg?height=400&width=600")
        setIsGenerating(false)
      }
    }, 2000)
  }

  return (
    <section id="generator" className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-500 to-pink-500 bg-clip-text text-transparent">
            BRAT GENERATOR TOOL
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Upload an image or enter text to create your brat-style masterpiece
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generator Controls */}
          <div className="lg:col-span-2">
            <Card className="border-4 border-pink-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
                <CardTitle className="text-2xl font-black text-gray-800 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-pink-500" />
                  Create Your Brat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Text Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Enter Your Text</label>
                  <Textarea
                    placeholder="Type your brat message here... (e.g., 'I'm that girl', 'Main character energy')"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[100px] text-lg font-medium border-2 border-purple-200 focus:border-pink-400"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Or Upload an Image</label>
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                    </label>
                  </div>
                  {uploadedImage && (
                    <div className="mt-4">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded"
                        className="max-w-full h-32 object-cover rounded-lg border-2 border-purple-200"
                      />
                    </div>
                  )}
                </div>

                {/* Font Settings */}
                <div>
                  <label>Font:</label>
                  <select value={font} onChange={e => setFont(e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Impact">Impact</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Times New Roman">Times New Roman</option>
                    {/* Add more if needed */}
                  </select>
                </div>
                <div>
                  <label>Font Size:</label>
                  <input type="number" value={fontSize} min={10} max={100} onChange={e => setFontSize(Number(e.target.value))} />
                </div>
                <div>
                  <label>Color:</label>
                  <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} />
                </div>
                <div>
                  <label>Horizontal Position:</label>
                  <input type="range" min={0} max={1} step={0.01} value={textX} onChange={e => setTextX(Number(e.target.value))} />
                </div>
                <div>
                  <label>Vertical Position:</label>
                  <input type="range" min={0} max={1} step={0.01} value={textY} onChange={e => setTextY(Number(e.target.value))} />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={(!text && !uploadedImage) || isGenerating}
                  className="w-full h-14 text-xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-green-500 hover:from-pink-600 hover:via-purple-600 hover:to-green-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-6 w-6 mr-2 animate-spin" />
                      GENERATING...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-6 w-6 mr-2" />
                      GENERATE BRAT
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Ad */}
          <div className="lg:col-span-1">
            <AdBanner position="sidebar" />
          </div>
        </div>

        {/* Generated Image Preview */}
        {generatedImage && (
          <div className="mt-12">
            <Card className="border-4 border-green-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-100 to-pink-100">
                <CardTitle className="text-2xl font-black text-gray-800 flex items-center gap-2">
                  <ImageIcon className="h-6 w-6 text-green-500" />
                  Your Brat Creation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center">
                  <img
                    src={generatedImage || "/placeholder.svg"}
                    alt="Generated brat meme"
                    className="max-w-full h-auto rounded-lg shadow-lg mx-auto mb-6"
                  />
                  <a
                    href={generatedImage || "/placeholder.svg"}
                    download="brat-creation.png"
                    className="inline-block bg-gradient-to-r from-green-500 to-pink-500 hover:from-green-600 hover:to-pink-600 text-white font-black px-8 py-3 text-lg rounded-lg shadow-lg transition-all duration-200"
                  >
                    <Download className="h-5 w-5 mr-2" style={{ display: "inline" }} />
                    DOWNLOAD YOUR BRAT
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gallery */}
        <div className="mt-12">
          <h3 className="text-2xl font-black mb-4">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`brat creation ${index + 1}`}
                  className="max-w-full h-auto rounded-lg shadow-lg mx-auto mb-4"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href={img}
                    download="brat-creation.png"
                    className="inline-block bg-gradient-to-r from-green-500 to-pink-500 hover:from-green-600 hover:to-pink-600 text-white font-black px-8 py-3 text-lg rounded-lg shadow-lg transition-all duration-200"
                  >
                    <Download className="h-5 w-5 mr-2" style={{ display: "inline" }} />
                    DOWNLOAD
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
