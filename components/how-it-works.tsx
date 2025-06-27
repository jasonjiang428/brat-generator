import { Card, CardContent } from "@/components/ui/card"
import { Upload, Sparkles, Download } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload or Type",
      description: "Upload your image or enter your brat text message",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: Sparkles,
      title: "Generate",
      description: "Click the generate button and watch the magic happen",
      color: "from-purple-500 to-green-500",
    },
    {
      icon: Download,
      title: "Download & Share",
      description: "Save your brat creation and share it with the world",
      color: "from-green-500 to-pink-500",
    },
  ]

  return (
    <section id="how-it-works" className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-500 to-green-500 bg-clip-text text-transparent">
            HOW IT WORKS
          </h2>
          <p className="text-lg text-gray-600 font-medium">Creating brat content has never been easier</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="border-4 border-gray-200 hover:border-pink-300 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-black text-gray-800 mb-2">
                  {index + 1}. {step.title}
                </div>
                <p className="text-gray-600 font-medium">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
