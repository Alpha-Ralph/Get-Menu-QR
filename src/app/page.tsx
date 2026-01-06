'use client'

import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white min-h-screen flex items-center">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/95 via-purple-900/90 to-blue-900/95 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="Restaurant ambiance"
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>

        {/* Floating Food Elements */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 opacity-20 animate-float-slow">
            <div className="text-8xl">🍕</div>
          </div>
          <div className="absolute top-40 right-20 opacity-20 animate-float" style={{animationDelay: '1s'}}>
            <div className="text-7xl">🍔</div>
          </div>
          <div className="absolute bottom-40 left-1/4 opacity-20 animate-float-slow" style={{animationDelay: '2s'}}>
            <div className="text-6xl">🍣</div>
          </div>
          <div className="absolute bottom-20 right-1/3 opacity-20 animate-float" style={{animationDelay: '1.5s'}}>
            <div className="text-7xl">🍝</div>
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              {/* Logo */}
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-5xl md:text-6xl animate-bounce-slow">🍽️</div>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none">
                        <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent" style={{backgroundSize: '200% auto', animation: 'gradient 3s linear infinite'}}>
                          Get Menu
                        </span>
                      </h1>
                    </div>
                    <div className="flex items-center gap-3 -mt-2">
                      <div className="bg-white text-indigo-600 px-8 py-3 rounded-2xl shadow-2xl transform rotate-1 inline-block border-4 border-indigo-400">
                        <span className="text-4xl md:text-5xl lg:text-6xl font-black tracking-wider">QR</span>
                      </div>
                      <div className="text-4xl md:text-5xl animate-spin-slow">⚡</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xl md:text-2xl mb-4 text-indigo-100">
                Transform Your Restaurant Menu Into a Digital Experience
              </p>
              <p className="text-lg mb-8 text-indigo-200">
                Create stunning digital menus with QR codes. Easy to manage, instant updates, and a seamless customer experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-transparent text-white rounded-lg font-bold border-2 border-white hover:bg-white hover:text-indigo-600 transition-all"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Animated Mockup with Restaurant Menus */}
            <div className="relative animate-float">
              {/* Main Phone Mockup */}
              <div className="relative bg-gray-900 rounded-3xl shadow-2xl p-3 transform hover:scale-105 transition-transform">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>

                <div className="aspect-[9/16] bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 rounded-2xl overflow-hidden border-4 border-gray-800">
                  <div className="p-6 space-y-4">
                    {/* Restaurant Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                          🍕
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-black text-gray-900 mb-1">Bella Italia</h3>
                          <p className="text-xs text-orange-600 font-semibold flex items-center gap-1">
                            <span>⭐</span>
                            <span>Italian Cuisine</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {['All', 'Pasta', 'Pizza', 'Desserts'].map((cat, i) => (
                        <button
                          key={i}
                          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${
                            i === 0
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                              : 'bg-white text-gray-600 shadow'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-3">
                      {[
                        { emoji: '🍝', name: 'Spaghetti Carbonara', desc: 'Creamy pasta with bacon', price: '$18.99', badge: 'Popular' },
                        { emoji: '🍕', name: 'Margherita Pizza', desc: 'Fresh mozzarella & basil', price: '$15.99', badge: null },
                        { emoji: '🥗', name: 'Caesar Salad', desc: 'Crispy romaine lettuce', price: '$12.99', badge: null },
                        { emoji: '🍰', name: 'Tiramisu', desc: 'Classic Italian dessert', price: '$8.99', badge: 'Chef Special' }
                      ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-3 shadow-lg animate-pulse-slow hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-200" style={{animationDelay: `${i * 200}ms`}}>
                          <div className="flex gap-3">
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-3xl shadow-md">
                                {item.emoji}
                              </div>
                              {item.badge && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                                  {item.badge}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-gray-900 text-sm mb-0.5 truncate">{item.name}</div>
                              <div className="text-xs text-gray-500 mb-2 truncate">{item.desc}</div>
                              <div className="flex items-center justify-between">
                                <div className="text-orange-600 font-black text-base">{item.price}</div>
                                <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md hover:shadow-lg transition-shadow">
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating QR Code with Animation */}
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-5 animate-bounce-slow border-4 border-orange-400">
                <div className="relative">
                  <div className="w-28 h-28 bg-gray-900 rounded-xl p-2 shadow-inner">
                    <div className="grid grid-cols-6 gap-0.5 w-full h-full">
                      {[...Array(36)].map((_, i) => (
                        <div key={i} className={`${
                          [0,1,2,3,4,5,6,7,12,13,18,19,24,25,30,31,32,33,34,35,8,16,20,28,9,11,17,21,27,29].includes(i)
                          ? 'bg-white'
                          : 'bg-transparent'
                        } rounded-sm`}></div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-black animate-pulse shadow-lg">
                    👆 SCAN ME
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-[10px] font-bold text-gray-700">Quick Access</p>
                  </div>
                </div>
              </div>

              {/* Floating Menu Categories */}
              <div className="absolute -top-8 -left-8 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl shadow-2xl p-4 animate-float border-4 border-white" style={{animationDelay: '1s'}}>
                <div className="flex gap-2 items-center text-white">
                  <div className="text-3xl animate-bounce-slow">🔥</div>
                  <div>
                    <div className="text-sm font-black">Popular</div>
                    <div className="text-xs opacity-90 font-semibold">24 Items</div>
                  </div>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-1/4 -left-6 bg-white rounded-xl shadow-xl p-3 animate-float" style={{animationDelay: '0.5s'}}>
                <div className="text-center">
                  <div className="text-2xl mb-1">⭐</div>
                  <div className="text-xs font-black text-gray-900">4.9</div>
                  <div className="text-[10px] text-gray-500">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need for Digital Menus
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you create, manage, and share your restaurant menu with ease
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📱",
                title: "QR Code Generation",
                description: "Generate beautiful, customizable QR codes for your menu. Download and print them for tables, windows, or anywhere you need.",
              },
              {
                icon: "✏️",
                title: "Easy Menu Management",
                description: "Add, edit, and organize your menu items with our intuitive interface. Update prices and descriptions in seconds.",
              },
              {
                icon: "🎨",
                title: "Beautiful Design",
                description: "Your menu looks amazing on any device. Responsive design ensures a perfect experience for your customers.",
              },
              {
                icon: "⚡",
                title: "Instant Updates",
                description: "Make changes to your menu and they go live immediately. No need to reprint menus or QR codes.",
              },
              {
                icon: "🖼️",
                title: "Menu Images",
                description: "Showcase your dishes with high-quality images that make your menu irresistible.",
              },
              {
                icon: "📊",
                title: "Analytics Dashboard",
                description: "Track your menu performance and see what your customers love the most.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Menu Showcase */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Beautiful Menus for Every Cuisine
            </h2>
            <p className="text-xl text-gray-600">
              From fine dining to fast casual - make every menu shine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: '🍣 Sushi Palace',
                cuisine: 'Japanese',
                image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
                items: ['Dragon Roll', 'Salmon Sashimi', 'Miso Soup'],
                icon: '🍱'
              },
              {
                name: '🍔 The Burger Joint',
                cuisine: 'American',
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
                items: ['Classic Burger', 'Cheese Fries', 'Milkshake'],
                icon: '🍟'
              },
              {
                name: '🌮 Taco Fiesta',
                cuisine: 'Mexican',
                image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
                items: ['Beef Tacos', 'Guacamole', 'Margarita'],
                icon: '🥑'
              }
            ].map((restaurant, index) => (
              <div key={index} className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"></div>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-lg p-2 shadow-lg z-20 group-hover:scale-110 transition-transform">
                    <div className="w-12 h-12 bg-gray-900 rounded flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-0.5">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className={`w-1 h-1 ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'} rounded-sm`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 text-6xl z-20 animate-bounce-slow">{restaurant.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-4">{restaurant.cuisine} Cuisine</p>
                  <div className="space-y-2">
                    {restaurant.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-600">
                        <span className="text-indigo-500">✓</span>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Menu Items</span>
                      <span className="font-bold text-indigo-600">{15 + index * 5}+</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-6 py-3 rounded-full font-semibold">
              <span>✨</span>
              <span>And hundreds more restaurant styles</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to transform your menu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Account",
                description: "Sign up for free and set up your restaurant profile in seconds.",
              },
              {
                step: "2",
                title: "Add Your Menu Items",
                description: "Upload your dishes with descriptions, prices, and mouth-watering photos.",
              },
              {
                step: "3",
                title: "Generate & Share QR Code",
                description: "Download your QR code and start sharing your digital menu instantly.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-indigo-300 to-transparent -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Showcase Your Delicious Dishes
            </h2>
            <p className="text-xl text-gray-600">
              High-quality images that make your menu irresistible
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
              'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
              'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80',
              'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
              'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
              'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80',
              'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&q=80',
              'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&q=80'
            ].map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 aspect-square"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <img
                  src={image}
                  alt={`Delicious food ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl mb-1">✨</div>
                    <div className="text-sm font-semibold">Showcase Quality</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 rounded-2xl">
              <div className="flex items-center gap-2 text-indigo-700">
                <span className="text-3xl">📸</span>
                <span className="font-bold text-lg">Professional Food Photography Tips Included</span>
              </div>
              <p className="text-gray-600 text-sm">Make your dishes look as good as they taste</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Go Digital?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join hundreds of restaurants already using Get Menu QR to provide better service to their customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-10 py-4 bg-white text-indigo-600 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="px-10 py-4 bg-transparent text-white rounded-lg font-bold border-2 border-white hover:bg-white hover:text-indigo-600 transition-all text-lg"
            >
              Sign In
            </Link>
          </div>
          <p className="mt-6 text-indigo-200 text-sm">
            No credit card required • Set up in minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">Get Menu QR</h3>
              <p className="text-gray-400">
                The modern way to share your restaurant menu with customers. Fast, easy, and beautiful.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <a
              href="https://DoneDL.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 font-semibold text-lg"
            >
              Powered By DoneDL
            </a>
            <p className="mt-2">&copy; 2026 Get Menu QR. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-30px) translateX(20px);
          }
          66% {
            transform: translateY(-15px) translateX(-20px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ken-burns {
          0% {
            transform: scale(1) translateX(0) translateY(0);
          }
          50% {
            transform: scale(1.1) translateX(-5%) translateY(-3%);
          }
          100% {
            transform: scale(1) translateX(0) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-gradient {
          animation: gradient 3s linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-ken-burns {
          animation: ken-burns 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
