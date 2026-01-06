'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
}

interface RestaurantData {
  name: string
  description?: string
  phone?: string
  address?: string
  website?: string
  logo?: string
  currency?: string
}

export default function ViewMenu() {
  const params = useParams()
  const slug = params.slug as string

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    loadMenuData()
  }, [slug])

  const loadMenuData = async () => {
    try {
      // Load restaurant data
      const restaurantResponse = await fetch(`/api/restaurants?slug=${slug}`)
      const restaurantData = await restaurantResponse.json()

      if (restaurantResponse.ok) {
        setRestaurant(restaurantData.restaurant)
      }

      // Load menu items
      const menuResponse = await fetch(`/api/menu-items?slug=${slug}`)
      const menuData = await menuResponse.json()

      if (menuResponse.ok) {
        setMenuItems(menuData.menuItems)
      }
    } catch (error) {
      console.error('Error loading menu data:', error)
    }
  }

  const getCurrencySymbol = (currency: string = 'USD') => {
    const symbols: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'CAD': '$',
      'AUD': '$',
      'EGP': 'E£',
      'SAR': '﷼',
      'AED': 'د.إ'
    }
    return symbols[currency] || '$'
  }

  const currencySymbol = getCurrencySymbol(restaurant?.currency)

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))]
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory)

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            {restaurant?.logo && (
              <div className="mb-4 flex justify-center">
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="h-20 w-20 object-contain rounded-lg"
                />
              </div>
            )}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {restaurant?.name || 'Restaurant Menu'}
            </h1>
            {restaurant?.description && (
              <p className="text-gray-600 mb-2">{restaurant.description}</p>
            )}
            <div className="flex flex-col items-center gap-1 text-sm text-gray-500">
              {restaurant?.phone && <p>📞 {restaurant.phone}</p>}
              {restaurant?.address && <p>📍 {restaurant.address}</p>}
              {restaurant?.website && (
                <a
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  🌐 Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {menuItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Menu Coming Soon</h3>
            <p className="text-gray-500">Our menu is being prepared. Please check back later!</p>
          </div>
        ) : selectedCategory === 'All' ? (
          // Grouped by category
          Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 pb-2">
                {category}
              </h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      {item.image && (
                        <div className="w-32 h-32 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                          <span className="text-lg font-bold text-indigo-600 ml-4">
                            {currencySymbol}{item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Filtered items
          <div className="space-y-4">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex">
                  {item.image && (
                    <div className="w-32 h-32 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <span className="text-lg font-bold text-indigo-600 ml-4">
                        {currencySymbol}{item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="https://DoneDL.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700 font-semibold text-base"
          >
            Powered By DoneDL
          </a>
        </div>
      </footer>
    </div>
  )
}
