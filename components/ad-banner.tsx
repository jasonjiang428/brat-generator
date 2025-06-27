import { Card, CardContent } from "@/components/ui/card"

interface AdBannerProps {
  position: "top" | "sidebar"
}

export function AdBanner({ position }: AdBannerProps) {
  const isTop = position === "top"

  return (
    <div className={`${isTop ? "container mx-auto px-4 py-4" : ""}`}>
      <Card className={`border-2 border-dashed border-gray-300 bg-gray-50 ${isTop ? "max-w-4xl mx-auto" : ""}`}>
        <CardContent className={`${isTop ? "p-4" : "p-6"} text-center`}>
          <div className={`${isTop ? "h-20" : "h-64"} flex items-center justify-center`}>
            <div className="text-gray-500">
              <div className="text-sm font-medium mb-1">Advertisement</div>
              <div className="text-xs text-gray-400">{isTop ? "728 x 90 Banner" : "300 x 250 Rectangle"}</div>
              <div className="text-xs text-gray-400 mt-2">Google AdSense Placeholder</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
