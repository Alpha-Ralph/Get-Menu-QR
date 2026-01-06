'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
}

interface UserData {
  name: string
  email: string
  slug: string
  logo?: string
  description?: string
  phone?: string
  address?: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [menuItemCount, setMenuItemCount] = useState(0)
  const [categoryCount, setCategoryCount] = useState(0)
  const [menuUrl, setMenuUrl] = useState('')

  useEffect(() => {
    // Check if user is logged in
    const storedUserData = localStorage.getItem('user')

    if (!storedUserData) {
      // Redirect to login if not authenticated
      router.push('/login')
      return
    }

    const userData = JSON.parse(storedUserData)

    // Load data from API
    loadDashboardData(userData.slug)
  }, [router])

  const loadDashboardData = async (slug: string) => {
    try {
      // Load restaurant data
      const restaurantResponse = await fetch(`/api/restaurants?slug=${slug}`)
      const restaurantData = await restaurantResponse.json()

      if (restaurantResponse.ok) {
        setUser(restaurantData.restaurant)
        setMenuUrl(`${window.location.origin}/view-menu/${slug}`)

        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(restaurantData.restaurant))
      }

      // Load menu items
      const menuResponse = await fetch(`/api/menu-items?slug=${slug}`)
      const menuData = await menuResponse.json()

      if (menuResponse.ok) {
        const items = menuData.menuItems
        setMenuItems(items)
        setMenuItemCount(items.length)

        // Calculate unique categories
        const categories = new Set(items.map((item: MenuItem) => item.category))
        setCategoryCount(categories.size)
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const copyMenuUrl = () => {
    navigator.clipboard.writeText(menuUrl)
  }

  const recentItems = menuItems.slice(-5).reverse()

  const getCategoryBreakdown = () => {
    const breakdown: Record<string, number> = {}
    menuItems.forEach(item => {
      breakdown[item.category] = (breakdown[item.category] || 0) + 1
    })
    return Object.entries(breakdown).sort((a, b) => b[1] - a[1])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user?.logo ? (
                <img src={user.logo} alt={user.name} className="h-12 w-12 object-contain rounded-lg" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              ) : (
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-sm text-gray-500">Restaurant Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/settings" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-indigo-100 mb-4">
            {user?.description || 'Manage your digital menu and QR codes from here'}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/menu" className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              + Add Menu Items
            </Link>
            <Link href="/qr-code" className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-400 transition-colors">
              Generate QR Code
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Items</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{menuItemCount}</p>
              </div>
              <div className="text-4xl text-indigo-600">📋</div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Menu items</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{categoryCount}</p>
              </div>
              <div className="text-4xl text-green-600">🏷️</div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Active categories</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">QR Generated</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">1</p>
              </div>
              <div className="text-4xl text-blue-600">📱</div>
            </div>
            <p className="text-sm text-gray-500 mt-2">QR code ready</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Menu Views</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">-</p>
              </div>
              <div className="text-4xl text-purple-600">👁️</div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Coming soon</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/menu" className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📋</div>
                  <h4 className="font-semibold text-gray-900">Manage Menu</h4>
                  <p className="text-sm text-gray-500">Edit items</p>
                </Link>

                <Link href="/qr-code" className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📱</div>
                  <h4 className="font-semibold text-gray-900">QR Code</h4>
                  <p className="text-sm text-gray-500">Generate & download</p>
                </Link>

                <Link href={menuUrl} target="_blank" className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🍽️</div>
                  <h4 className="font-semibold text-gray-900">View Menu</h4>
                  <p className="text-sm text-gray-500">Customer view</p>
                </Link>
              </div>
            </div>

            {/* Recent Menu Items */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Recent Menu Items</h3>
                <Link href="/menu" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                  View All →
                </Link>
              </div>
              {recentItems.length > 0 ? (
                <div className="space-y-3">
                  {recentItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xl">
                          🍽️
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="text-lg font-bold text-indigo-600">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-5xl mb-3">📋</div>
                  <p>No menu items yet</p>
                  <Link href="/menu" className="text-indigo-600 hover:text-indigo-700 font-semibold mt-2 inline-block">
                    Add your first item
                  </Link>
                </div>
              )}
            </div>

            {/* Category Breakdown */}
            {categoryCount > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h3>
                <div className="space-y-3">
                  {getCategoryBreakdown().map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">🏷️</span>
                        </div>
                        <span className="font-medium text-gray-900">{category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${(count / menuItemCount) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-600 w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Menu URL Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Menu URL</h3>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3">
                <p className="text-sm text-gray-600 break-all">{menuUrl}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyMenuUrl}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm"
                >
                  Copy URL
                </button>
                <Link
                  href={menuUrl}
                  target="_blank"
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm text-center"
                >
                  Visit
                </Link>
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Restaurant Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
                {user?.phone && (
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                )}
                {user?.address && (
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{user.address}</p>
                  </div>
                )}
              </div>
              <Link
                href="/settings"
                className="block mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm text-center"
              >
                Edit Info
              </Link>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-lg p-6 border border-yellow-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Tips</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Add high-quality images to menu items</li>
                    <li>• Update prices regularly</li>
                    <li>• Print QR codes for tables</li>
                    <li>• Share your menu URL on social media</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
