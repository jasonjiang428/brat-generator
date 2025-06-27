"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, RotateCcw, Moon, Sun, ImageIcon, Images } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { BatchGenerator } from "@/components/batch-generator"
import { translations, type TranslationKey } from "@/lib/languages"
import { SocialShare } from "@/components/social-share"

export default function BratGenerator() {
  const [language, setLanguage] = useState("en")
  const [text, setText] = useState("")
  const [textColor, setTextColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#8ACE00")
  const [fontSize, setFontSize] = useState([48])
  const [blurEffect, setBlurEffect] = useState([2.1])
  const [width, setWidth] = useState([594])
  const [height, setHeight] = useState([594])
  const [borderRadius, setBorderRadius] = useState([0])
  const [isDark, setIsDark] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Get translation function
  const t = (key: TranslationKey) => {
    return translations[language as keyof typeof translations]?.[key] || translations.en[key]
  }

  // Initialize text with default for current language
  useEffect(() => {
    if (!text) {
      setText(t("defaultText"))
    }
  }, [language])

  // Update preview in real-time
  useEffect(() => {
    updatePreview()
  }, [text, textColor, backgroundColor, fontSize, blurEffect, width, height, borderRadius])

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem("bratgen-language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem("bratgen-language", newLanguage)
  }

  const updatePreview = () => {
    if (previewRef.current) {
      const preview = previewRef.current
      preview.style.width = `${Math.min(width[0], 400)}px`
      preview.style.height = `${Math.min(height[0], 400)}px`
      preview.style.backgroundColor = backgroundColor
      preview.style.borderRadius = `${borderRadius[0]}px`
      preview.style.color = textColor
      preview.style.fontSize = `${Math.min(fontSize[0], (fontSize[0] * 400) / width[0])}px`
      preview.style.filter = `blur(${blurEffect[0]}px)`
      preview.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
      preview.style.fontWeight = "bold"
      preview.style.textRendering = "optimizeLegibility"
      preview.style.webkitFontSmoothing = "antialiased"
      preview.style.mozOsxFontSmoothing = "grayscale"
    }
  }

  const resetSettings = () => {
    setText(t("defaultText"))
    setTextColor("#000000")
    setBackgroundColor("#8ACE00")
    setFontSize([48])
    setBlurEffect([2.1])
    setWidth([594])
    setHeight([594])
    setBorderRadius([0])
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get device pixel ratio for high quality rendering
    const pixelRatio = window.devicePixelRatio || 1
    const canvasWidth = width[0] * pixelRatio
    const canvasHeight = height[0] * pixelRatio

    // Set canvas actual size
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // Set canvas display size
    canvas.style.width = width[0] + "px"
    canvas.style.height = height[0] + "px"

    // Scale context to match device pixel ratio
    ctx.scale(pixelRatio, pixelRatio)

    // Enable text antialiasing and high quality rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    // Fill background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width[0], height[0])

    // Set text properties - use clearer font settings
    ctx.fillStyle = textColor
    ctx.font = `bold ${fontSize[0]}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Handle blur effect separately if needed
    if (blurEffect[0] > 0) {
      // Create temporary canvas for blur effect
      const tempCanvas = document.createElement("canvas")
      const tempCtx = tempCanvas.getContext("2d")
      if (tempCtx) {
        tempCanvas.width = canvasWidth
        tempCanvas.height = canvasHeight
        tempCtx.scale(pixelRatio, pixelRatio)

        // Draw clear text on temporary canvas
        tempCtx.fillStyle = backgroundColor
        tempCtx.fillRect(0, 0, width[0], height[0])
        tempCtx.fillStyle = textColor
        tempCtx.font = `bold ${fontSize[0]}px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif`
        tempCtx.textAlign = "center"
        tempCtx.textBaseline = "middle"
        tempCtx.fillText(text.toLowerCase(), width[0] / 2, height[0] / 2)

        // Apply blur effect to main canvas
        ctx.filter = `blur(${blurEffect[0]}px)`
        ctx.drawImage(tempCanvas, 0, 0, width[0], height[0])
      }
    } else {
      // Draw clear text directly
      ctx.fillText(text.toLowerCase(), width[0] / 2, height[0] / 2)
    }

    // Reset filter
    ctx.filter = "none"

    // Download image
    const link = document.createElement("a")
    link.download = `brat-${text.toLowerCase()}.png`
    link.href = canvas.toDataURL("image/png", 1.0)
    link.click()
  }

  // Check if current language is RTL
  const isRTL = language === "ar"

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} ${isRTL ? "rtl" : "ltr"}`}
    >
      {/* Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 py-2 text-sm">
        <ol className="flex space-x-2 text-gray-500">
          <li>
            <a href="/" className="hover:text-gray-700">
              Home
            </a>
          </li>
          <li>/</li>
          <li className="text-gray-900">Brat Generator</li>
        </ol>
      </nav>
      <nav className="border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="w-10 h-10 bg-[#8ACE00] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">B</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#how-to-use" className="text-gray-600 hover:text-gray-900">
                {t("howToUse")}
              </a>
              <a href="#user-experience" className="text-gray-600 hover:text-gray-900">
                {t("userExperience")}
              </a>
              <a href="#faqs" className="text-gray-600 hover:text-gray-900">
                {t("faqs")}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg hover:bg-gray-100">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t("description")}</p>
          <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-500">
            <span>✨ Free Forever</span>
            <span>🚀 No Registration</span>
            <span>🌍 10 Languages</span>
            <span>📱 Mobile Friendly</span>
          </div>
        </header>

        {/* Generator Interface */}
        <main>
          <section aria-labelledby="generator-title" className="mb-16">
            <h2 id="generator-title" className="sr-only">
              Brat Image Generator Tool
            </h2>

            <Tabs defaultValue="single" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="single" className="flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Single Image</span>
                </TabsTrigger>
                <TabsTrigger value="batch" className="flex items-center space-x-2">
                  <Images className="w-4 h-4" />
                  <span>{t("batchGenerate")}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="single">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Controls */}
                  <div className="space-y-6" role="form" aria-label="Image customization controls">
                    {/* Text Input */}
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("enterText")}</label>
                      <Input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full"
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>

                    {/* Color Pickers */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">{t("textColor")}</label>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                            style={{ backgroundColor: textColor }}
                            onClick={() => document.getElementById("textColorPicker")?.click()}
                          />
                          <input
                            id="textColorPicker"
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="sr-only"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t("backgroundColor")}</label>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                            style={{ backgroundColor: backgroundColor }}
                            onClick={() => document.getElementById("bgColorPicker")?.click()}
                          />
                          <input
                            id="bgColorPicker"
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="sr-only"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sliders */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("fontSize")}: {fontSize[0]}px
                        </label>
                        <Slider
                          value={fontSize}
                          onValueChange={setFontSize}
                          max={200}
                          min={12}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 mt-1">{fontSize[0]}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("blurEffect")}: {blurEffect[0]}px
                        </label>
                        <Slider
                          value={blurEffect}
                          onValueChange={setBlurEffect}
                          max={10}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 mt-1">{blurEffect[0]}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("width")}: {width[0]}px
                        </label>
                        <Slider
                          value={width}
                          onValueChange={setWidth}
                          max={1200}
                          min={200}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 mt-1">{width[0]}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("height")}: {height[0]}px
                        </label>
                        <Slider
                          value={height}
                          onValueChange={setHeight}
                          max={1200}
                          min={200}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 mt-1">{height[0]}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t("borderRadius")}: {borderRadius[0]}px
                        </label>
                        <Slider
                          value={borderRadius}
                          onValueChange={setBorderRadius}
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 mt-1">{borderRadius[0]}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <Button
                        onClick={resetSettings}
                        variant="outline"
                        className="flex items-center space-x-2 bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>{t("reset")}</span>
                      </Button>
                      <Button
                        onClick={downloadImage}
                        className="flex items-center space-x-2 bg-[#8ACE00] hover:bg-[#7AB800] text-black"
                      >
                        <Download className="w-4 h-4" />
                        <span>{t("download")}</span>
                      </Button>
                      <SocialShare
                        language={language}
                        imageDataUrl={canvasRef.current?.toDataURL("image/png", 1.0) || ""}
                        text={text}
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  <div
                    className="flex items-center justify-center"
                    role="img"
                    aria-label="Live preview of your Brat-style image"
                  >
                    <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg">
                      <div
                        ref={previewRef}
                        className="flex items-center justify-center font-bold transition-all duration-200"
                        style={{
                          width: `${width[0]}px`,
                          height: `${height[0]}px`,
                          backgroundColor: backgroundColor,
                          color: textColor,
                          fontSize: `${fontSize[0]}px`,
                          borderRadius: `${borderRadius[0]}px`,
                          filter: `blur(${blurEffect[0]}px)`,
                          maxWidth: "400px",
                          maxHeight: "400px",
                        }}
                      >
                        {text.toLowerCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="batch">
                <BatchGenerator language={language} />
              </TabsContent>
            </Tabs>
          </section>
        </main>

        {/* Charli XCX & Brat Introduction Section */}
        <section id="about-brat" className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t("charliXcxTitle")}</h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-[#8ACE00]">Charli XCX</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{t("charliXcxIntro")}</p>

                <h3 className="text-2xl font-semibold mb-4 text-[#8ACE00]">{t("bratAlbumTitle")}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{t("bratAlbumDesc")}</p>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-[#8ACE00] flex items-center justify-center rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <span className="text-black font-bold text-6xl lowercase">brat</span>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-lg shadow-lg">
                    <span className="text-xs text-gray-500">Original Brat Cover Style</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#8ACE00]/10 to-[#8ACE00]/5 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-center">{t("bratImpactTitle")}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-center max-w-3xl mx-auto">{t("bratImpactDesc")}</p>

              <div className="border-l-4 border-[#8ACE00] pl-6 mt-8">
                <p className="text-gray-800 italic text-lg leading-relaxed">{t("bratGeneratorPurpose")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t("howToUseTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#8ACE00] rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">{t("step1Title")}</h3>
              <p className="text-gray-600 text-sm">{t("step1Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#8ACE00] rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">{t("step2Title")}</h3>
              <p className="text-gray-600 text-sm">{t("step2Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#8ACE00] rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">{t("step3Title")}</h3>
              <p className="text-gray-600 text-sm">{t("step3Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#8ACE00] rounded-full flex items-center justify-center text-black font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">{t("step4Title")}</h3>
              <p className="text-gray-600 text-sm">{t("step4Desc")}</p>
            </div>
          </div>
        </section>

        {/* User Experience Section */}
        <section id="user-experience" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t("userExperienceTitle")}</h2>

          {/* Statistics */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">{t("userStatsTitle")}</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#8ACE00] mb-2">{t("userStat1")}</div>
                <div className="text-gray-600">{t("userStat1Desc")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#8ACE00] mb-2">{t("userStat2")}</div>
                <div className="text-gray-600">{t("userStat2Desc")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#8ACE00] mb-2">{t("userStat3")}</div>
                <div className="text-gray-600">{t("userStat3Desc")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#8ACE00] mb-2">{t("userStat4")}</div>
                <div className="text-gray-600">{t("userStat4Desc")}</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">{t("userFeaturesTitle")}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-[#8ACE00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold mb-2">{t("feature1Title")}</h4>
                <p className="text-gray-600 text-sm">{t("feature1Desc")}</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-[#8ACE00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">✨</span>
                </div>
                <h4 className="font-semibold mb-2">{t("feature2Title")}</h4>
                <p className="text-gray-600 text-sm">{t("feature2Desc")}</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-[#8ACE00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">🌍</span>
                </div>
                <h4 className="font-semibold mb-2">{t("feature3Title")}</h4>
                <p className="text-gray-600 text-sm">{t("feature3Desc")}</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-[#8ACE00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">🚀</span>
                </div>
                <h4 className="font-semibold mb-2">{t("feature4Title")}</h4>
                <p className="text-gray-600 text-sm">{t("feature4Desc")}</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-[#8ACE00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">📱</span>
                </div>
                <h4 className="font-semibold mb-2">{t("feature5Title")}</h4>
                <p className="text-gray-600 text-sm">{t("feature5Desc")}</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-[#8ACE00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">💝</span>
                </div>
                <h4 className="font-semibold mb-2">{t("feature6Title")}</h4>
                <p className="text-gray-600 text-sm">{t("feature6Desc")}</p>
              </div>
            </div>
          </div>

          {/* User Reviews */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8">{t("userReviewsTitle")}</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t("review1Text")}"</p>
                <div>
                  <div className="font-semibold">{t("review1Author")}</div>
                  <div className="text-sm text-gray-500">{t("review1Role")}</div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t("review2Text")}"</p>
                <div>
                  <div className="font-semibold">{t("review2Author")}</div>
                  <div className="text-sm text-gray-500">{t("review2Role")}</div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t("review3Text")}"</p>
                <div>
                  <div className="font-semibold">{t("review3Author")}</div>
                  <div className="text-sm text-gray-500">{t("review3Role")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t("faqTitle")}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">{t("faq1Q")}</h3>
              <p className="text-gray-600">{t("faq1A")}</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">{t("faq2Q")}</h3>
              <p className="text-gray-600">{t("faq2A")}</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">{t("faq3Q")}</h3>
              <p className="text-gray-600">{t("faq3A")}</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">{t("faq4Q")}</h3>
              <p className="text-gray-600">{t("faq4A")}</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">{t("faq5Q")}</h3>
              <p className="text-gray-600">{t("faq5A")}</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">{t("faq6Q")}</h3>
              <p className="text-gray-600">{t("faq6A")}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="w-10 h-10 bg-[#8ACE00] rounded-lg flex items-center justify-center mb-4">
                <span className="text-black font-bold text-xl">B</span>
              </div>
              <p className="text-gray-600 text-sm">
                Create stunning Brat-style images inspired by Charli XCX's iconic album cover.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#generator" className="hover:text-gray-900">
                    Image Generator
                  </a>
                </li>
                <li>
                  <a href="#how-to-use" className="hover:text-gray-900">
                    How to Use
                  </a>
                </li>
                <li>
                  <a href="#user-experience" className="hover:text-gray-900">
                    User Experience
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#about-brat" className="hover:text-gray-900">
                    About Brat Album
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="hover:text-gray-900">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-gray-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#privacy" className="hover:text-gray-900">
                    {t("privacyPolicy")}
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-gray-900">
                    {t("termsOfService")}
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="hover:text-gray-900">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600 mb-4">© 2025 Brat Generator. All rights reserved.</p>
            <p className="text-sm text-gray-500">
              Inspired by Charli XCX's "Brat" album. This is a fan-made tribute tool and is not officially affiliated
              with Charli XCX or her record label.
            </p>
          </div>
        </div>
      </footer>

      {/* Hidden canvas for download */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
