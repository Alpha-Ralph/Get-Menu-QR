'use client'

import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              {/* Logo */}
              <div className="mb-8 inline-block">
                <div className="relative">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent animate-gradient">
                        Get Menu
                      </span>
                      <span className="absolute -top-2 -right-8 text-2xl md:text-3xl animate-bounce-slow">📱</span>
                    </span>
                    <br />
                    <span className="relative inline-flex items-center gap-2">
                      <span className="bg-white text-indigo-600 px-6 py-2 rounded-2xl shadow-2xl transform -rotate-2 inline-block">
                        QR
                      </span>
                      <span className="text-3xl md:text-4xl">✨</span>
                    </span>
                  </h1>
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

            {/* Animated Mockup */}
            <div className="relative animate-float">
              <div className="relative bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="aspect-[9/16] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-3xl">
                        🍽️
                      </div>
                      <div>
                        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-lg p-3 shadow-sm animate-pulse-slow" style={{animationDelay: `${i * 200}ms`}}>
                          <div className="flex gap-3">
                            <div className="w-16 h-16 bg-gray-200 rounded"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                              <div className="h-2 bg-gray-200 rounded w-full"></div>
                              <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating QR Code */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-4 animate-bounce-slow">
                <div className="w-24 h-24 bg-gray-900 rounded-lg flex items-center justify-center text-4xl">
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'} rounded-sm`}></div>
                    ))}
                  </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
          <div className="mt-12">
            <Link
              href="/admin/login"
              className="text-sm text-indigo-200 hover:text-white underline"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">Get Menu QR</h3>
              <p className="text-gray-400">
                The modern way to share your restaurant menu with customers. Fast, easy, and beautiful.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <a
              href="https://DoneDL.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
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

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
