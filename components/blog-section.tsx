import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "The Rise of Brat Culture: How Gen Z is Redefining Cool",
      summary:
        "Brat culture is taking over Gen Z, blending bold self-expression, internet meme aesthetics, and viral trends. Discover how this movement is shaping music, fashion, and social media, and why brands are eager to tap into the brat energy for authentic youth engagement.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      link: "/blog-the-rise-of-brat-culture"
    },
    {
      id: 2,
      title: "Meme Psychology: Why Bratty Content Goes Viral",
      summary:
        "What makes brat-style memes so irresistible? This article explores the psychology behind viral content, the power of relatability, and how brat memes leverage humor, attitude, and visual style to dominate social feeds and drive massive engagement.",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      date: "Dec 12, 2024",
      readTime: "7 min read",
      link: "/blog-meme-psychology"
    },
    {
      id: 3,
      title: "Creating the Perfect Brat Aesthetic: Design Tips & Tricks",
      summary:
        "Want to make your content pop with brat energy? Learn essential design tips for brat-style graphics, from bold color palettes and playful fonts to layering effects and meme-ready layouts. Perfect for creators, marketers, and meme enthusiasts.",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      date: "Dec 10, 2024",
      readTime: "4 min read",
      link: "/blog-perfect-brat-aesthetic"
    },
  ]

  return (
    <section id="blog" className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-pink-500 to-green-500 bg-clip-text text-transparent">
            BRAT BLOG
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Stay updated with the latest in meme culture and brat aesthetics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="border-2 border-gray-200 hover:border-purple-300 transition-colors shadow-lg hover:shadow-xl group"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
                <Link href={post.link} passHref legacyBehavior>
                  <Button
                    asChild
                    variant="outline"
                    className="group/btn border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 bg-transparent"
                  >
                    <span>
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  )
}
