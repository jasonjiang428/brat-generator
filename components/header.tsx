"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-gradient-to-r from-pink-500 via-purple-500 to-green-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
              BRAT GENERATOR
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#generator" className="font-bold text-gray-700 hover:text-pink-500 transition-colors">
              Generator
            </a>
            <a href="#how-it-works" className="font-bold text-gray-700 hover:text-purple-500 transition-colors">
              How It Works
            </a>
            <a href="#gallery" className="font-bold text-gray-700 hover:text-green-500 transition-colors">
              Gallery
            </a>
            <a href="#blog" className="font-bold text-gray-700 hover:text-pink-500 transition-colors">
              Blog
            </a>
            <a href="#about" className="font-bold text-gray-700 hover:text-purple-500 transition-colors">
              About
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <a href="#generator" className="block font-bold text-gray-700 hover:text-pink-500 py-2">
              Generator
            </a>
            <a href="#how-it-works" className="block font-bold text-gray-700 hover:text-purple-500 py-2">
              How It Works
            </a>
            <a href="#gallery" className="block font-bold text-gray-700 hover:text-green-500 py-2">
              Gallery
            </a>
            <a href="#blog" className="block font-bold text-gray-700 hover:text-pink-500 py-2">
              Blog
            </a>
            <a href="#about" className="block font-bold text-gray-700 hover:text-purple-500 py-2">
              About
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
