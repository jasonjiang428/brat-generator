import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Zap } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-500 to-pink-500 bg-clip-text text-transparent">
            ABOUT BRAT GENERATOR
          </h2>
          <p className="text-lg text-gray-600 font-medium max-w-3xl mx-auto">
            We're here to help you express your inner brat with style. Our platform makes it easy to create viral-worthy
            content that captures the bold, unapologetic energy of brat culture.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 border-pink-200 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Generate your brat content in seconds with our optimized tools</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Community Driven</h3>
              <p className="text-gray-600">Join thousands of creators sharing their brat masterpieces</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-pink-500 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your privacy matters. We don't store your uploaded content</p>
            </CardContent>
          </Card>
        </div>

        {/* Legal Section */}
        <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Legal & Guidelines</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Privacy Policy</h4>
              <p className="text-gray-600">
                We respect your privacy and don't store your personal data or uploaded images.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Terms of Service</h4>
              <p className="text-gray-600">
                By using our service, you agree to our terms and conditions for content creation.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Content Disclaimer</h4>
              <p className="text-gray-600">
                All generated content is for entertainment only. Don't upload copyrighted material.
              </p>
            </div>
          </div>
          <div className="text-center mt-6 space-x-4">
            <a href="#" className="text-pink-500 hover:text-pink-600 font-medium underline">
              Full Privacy Policy
            </a>
            <a href="#" className="text-purple-500 hover:text-purple-600 font-medium underline">
              Terms of Service
            </a>
            <a href="#" className="text-green-500 hover:text-green-600 font-medium underline">
              Content Guidelines
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
