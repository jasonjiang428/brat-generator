import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Instagram, MessageCircle, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-900 via-purple-900 to-green-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-3xl font-black mb-4 bg-gradient-to-r from-pink-300 to-green-300 bg-clip-text text-transparent">
              BRAT GENERATOR
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              The ultimate platform for creating brat-style memes and content. Express your bold, unapologetic energy
              with our easy-to-use tools.
            </p>
            <div className="flex space-x-4">
              <Button
                size="icon"
                variant="outline"
                className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white bg-transparent"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white bg-transparent"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-pink-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#generator" className="text-gray-300 hover:text-white transition-colors">
                  Generator
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-300">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <a href="mailto:hello@bratgenerator.com" className="text-gray-300 hover:text-white transition-colors">
                  hello@bratgenerator.com
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Subscribe for updates:</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Brat Generator. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
