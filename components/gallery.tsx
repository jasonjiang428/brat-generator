import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Download } from "lucide-react"

export function Gallery() {
  const galleryItems = [
    { id: 1, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", likes: 234, title: "Main Character Energy" },
    { id: 2, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", likes: 189, title: "That Girl Vibes" },
    { id: 3, image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", likes: 156, title: "Brat Summer" },
    { id: 4, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", likes: 298, title: "Iconic Moment" },
    { id: 5, image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80", likes: 167, title: "Bratty Attitude" },
    { id: 6, image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80", likes: 203, title: "Green Energy" },
  ]

  return (
    <section id="gallery" className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-500 to-purple-500 bg-clip-text text-transparent">
            BRAT GALLERY
          </h2>
          <p className="text-lg text-gray-600 font-medium mb-6">
            Check out the latest brat creations from our community
          </p>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold">
            Submit Your Creation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card
              key={item.id}
              className="border-2 border-gray-200 hover:border-pink-300 transition-colors shadow-lg hover:shadow-xl group"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-pink-500">
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="font-medium">{item.likes}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
