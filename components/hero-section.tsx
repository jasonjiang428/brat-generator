export function HeroSection() {
  return (
    <section className="text-center py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-green-500 bg-clip-text text-transparent leading-tight">
          BRAT GENERATOR
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-700 mb-8 max-w-2xl mx-auto">
          Create your own brat-style memes and images!
          <br />
          <span className="text-pink-500">Bold. Bratty. Iconic.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-1 rounded-full">
            <a
              href="#generator"
              className="bg-white px-8 py-3 rounded-full font-black text-lg hover:bg-gray-50 transition-colors block"
            >
              START CREATING →
            </a>
          </div>
          <div className="text-sm text-gray-600 font-medium">✨ Free • No signup required • Instant download</div>
        </div>
      </div>
    </section>
  )
}
