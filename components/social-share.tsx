"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import {
  Share2,
  Link,
  Twitter,
  Facebook,
  MessageCircle,
  Send,
  Linkedin,
  Hash,
  Smartphone,
  ImageIcon,
  ExternalLink,
} from "lucide-react"
import { translations, type TranslationKey } from "@/lib/languages"

interface SocialShareProps {
  language: string
  imageDataUrl: string
  text: string
}

export function SocialShare({ language, imageDataUrl, text }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isGeneratingSocialCard, setIsGeneratingSocialCard] = useState(false)

  const t = (key: TranslationKey) => {
    return translations[language as keyof typeof translations]?.[key] || translations.en[key]
  }

  const siteUrl = "https://brat-generator.com"
  const shareText = t("shareText")
  const shareUrl = `${siteUrl}?text=${encodeURIComponent(text)}`

  // Social media share URLs
  const socialPlatforms = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-600",
      translation: "shareTwitter" as TranslationKey,
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-700",
      translation: "shareFacebook" as TranslationKey,
    },
    {
      name: "Telegram",
      icon: Send,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: "hover:bg-blue-50 hover:text-blue-500",
      translation: "shareTelegram" as TranslationKey,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      color: "hover:bg-green-50 hover:text-green-600",
      translation: "shareWhatsApp" as TranslationKey,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-800",
      translation: "shareLinkedIn" as TranslationKey,
    },
    {
      name: "Reddit",
      icon: Hash,
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
      color: "hover:bg-orange-50 hover:text-orange-600",
      translation: "shareReddit" as TranslationKey,
    },
  ]

  const copyImageToClipboard = async () => {
    try {
      // Convert data URL to blob
      const response = await fetch(imageDataUrl)
      const blob = await response.blob()

      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])

      toast({
        title: t("imageCopied"),
        description: "You can now paste it anywhere!",
      })
    } catch (error) {
      console.error("Failed to copy image:", error)
      toast({
        title: "Copy failed",
        description: "Unable to copy image to clipboard",
        variant: "destructive",
      })
    }
  }

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: t("linkCopied"),
        description: "Share link copied to clipboard!",
      })
    } catch (error) {
      console.error("Failed to copy link:", error)
      toast({
        title: "Copy failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive",
      })
    }
  }

  const generateSocialCard = async () => {
    setIsGeneratingSocialCard(true)

    try {
      // Create a social media optimized version (1200x630 for Open Graph)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const cardWidth = 1200
      const cardHeight = 630
      canvas.width = cardWidth
      canvas.height = cardHeight

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, cardWidth, cardHeight)
      gradient.addColorStop(0, "#8ACE00")
      gradient.addColorStop(1, "#7AB800")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, cardWidth, cardHeight)

      // Main text
      ctx.fillStyle = "#000000"
      ctx.font = "bold 120px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(text.toLowerCase(), cardWidth / 2, cardHeight / 2 - 50)

      // Subtitle
      ctx.fillStyle = "#333333"
      ctx.font = "32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
      ctx.fillText("Created with Brat Generator", cardWidth / 2, cardHeight / 2 + 80)

      // Website URL
      ctx.fillStyle = "#666666"
      ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
      ctx.fillText("brat-generator.com", cardWidth / 2, cardHeight / 2 + 120)

      // Download the social card
      const link = document.createElement("a")
      link.download = `brat-social-card-${text.toLowerCase()}.png`
      link.href = canvas.toDataURL("image/png", 1.0)
      link.click()

      toast({
        title: t("socialCardGenerated"),
        description: "Social media card downloaded successfully!",
      })
    } catch (error) {
      console.error("Failed to generate social card:", error)
      toast({
        title: "Generation failed",
        description: "Unable to generate social card",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingSocialCard(false)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        // Convert data URL to blob for native sharing
        const response = await fetch(imageDataUrl)
        const blob = await response.blob()
        const file = new File([blob], `brat-${text.toLowerCase()}.png`, { type: "image/png" })

        await navigator.share({
          title: shareText,
          text: shareText,
          url: shareUrl,
          files: [file],
        })
      } catch (error) {
        console.error("Native share failed:", error)
        // Fallback to opening the dialog
        setIsOpen(true)
      }
    } else {
      setIsOpen(true)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleNativeShare} variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Share2 className="w-4 h-4" />
          <span>{t("share")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>{t("shareTitle")}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-gray-600">{t("shareDesc")}</p>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={copyImageToClipboard}
              variant="outline"
              className="flex items-center space-x-2 bg-transparent"
            >
              <ImageIcon className="w-4 h-4" />
              <span>{t("copyImage")}</span>
            </Button>
            <Button
              onClick={copyLinkToClipboard}
              variant="outline"
              className="flex items-center space-x-2 bg-transparent"
            >
              <Link className="w-4 h-4" />
              <span>{t("copyLink")}</span>
            </Button>
          </div>

          {/* Social Media Platforms */}
          <div>
            <h4 className="text-sm font-medium mb-3">{t("shareToSocial")}</h4>
            <div className="grid grid-cols-2 gap-2">
              {socialPlatforms.map((platform) => (
                <Button
                  key={platform.name}
                  variant="ghost"
                  className={`flex items-center justify-start space-x-3 h-12 ${platform.color}`}
                  onClick={() => window.open(platform.url, "_blank", "noopener,noreferrer")}
                >
                  <platform.icon className="w-5 h-5" />
                  <span className="text-sm">{t(platform.translation)}</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </Button>
              ))}
            </div>
          </div>

          {/* WeChat and QQ (Special handling for Chinese platforms) */}
          {(language === "zh-CN" || language === "zh-TW") && (
            <div>
              <h4 className="text-sm font-medium mb-3">中国社交平台</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="ghost"
                  className="flex items-center justify-start space-x-3 h-12 hover:bg-green-50 hover:text-green-600"
                  onClick={copyLinkToClipboard}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{t("shareWeChat")}</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start space-x-3 h-12 hover:bg-blue-50 hover:text-blue-600"
                  onClick={copyLinkToClipboard}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="text-sm">{t("shareQQ")}</span>
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">链接已复制，请在微信或QQ中粘贴分享</p>
            </div>
          )}

          {/* Generate Social Card */}
          <div className="border-t pt-4">
            <Button
              onClick={generateSocialCard}
              disabled={isGeneratingSocialCard}
              className="w-full flex items-center space-x-2 bg-[#8ACE00] hover:bg-[#7AB800] text-black"
            >
              <ImageIcon className="w-4 h-4" />
              <span>{isGeneratingSocialCard ? "Generating..." : t("generateSocialCard")}</span>
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Generate a 1200x630 image optimized for social media sharing
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
