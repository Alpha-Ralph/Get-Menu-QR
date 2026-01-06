'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Toast from '@/components/Toast'

interface Restaurant {
  id: string
  name: string
  email: string
  slug: string
  joinedAt: string
  isActive: boolean
  phone?: string
  address?: string
  description?: string
  logo?: string
  menuItemCount: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  // Statistics
  const [totalRestaurants, setTotalRestaurants] = useState(0)
  const [activeRestaurants, setActiveRestaurants] = useState(0)
  const [totalMenuItems, setTotalMenuItems] = useState(0)
  const [totalScans, setTotalScans] = useState(0)

  useEffect(() => {
    // Check admin authentication
    const isAdmin = localStorage.getItem('adminAuth')
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    loadData()
  }, [router])

  const loadData = async () => {
    try {
      // Fetch all restaurants from API
      const response = await fetch('/api/admin/restaurants')
      const data = await response.json()

      if (response.ok) {
        setRestaurants(data.restaurants)

        // Calculate statistics
        setTotalRestaurants(data.restaurants.length)
        setActiveRestaurants(data.restaurants.filter((r: any) => r.isActive).length)

        // Calculate total menu items
        const totalItems = data.restaurants.reduce((sum: number, r: any) => sum + r.menuItemCount, 0)
        setTotalMenuItems(totalItems)

        // Total scans (placeholder - you can implement actual tracking)
        setTotalScans(0)
      }
    } catch (error) {
      console.error('Error loading restaurants:', error)
    }
  }

  const handleToggleActive = async (restaurantId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/restaurants/${restaurantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isActive: !currentStatus
        })
      })

      if (response.ok) {
        await loadData()
        setToast({
          message: `Restaurant ${!currentStatus ? 'activated' : 'deactivated'} successfully!`,
          type: 'success'
        })
      } else {
        setToast({
          message: 'Failed to update restaurant status',
          type: 'error'
        })
      }
    } catch (error) {
      console.error('Error toggling restaurant status:', error)
      setToast({
        message: 'Error updating restaurant status',
        type: 'error'
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' ||
                          (filterStatus === 'active' && restaurant.isActive) ||
                          (filterStatus === 'inactive' && !restaurant.isActive)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-100">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👑</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Get Menu QR System Administration</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Restaurants</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalRestaurants}</p>
              </div>
              <div className="text-4xl text-indigo-600">🏪</div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Registered clients</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Restaurants</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{activeRestaurants}</p>
              </div>
              <div className="text-4xl text-green-600">✅</div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Currently active</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Menu Items</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalMenuItems}</p>
              </div>
              <div className="text-4xl text-blue-600">📋</div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Across all restaurants</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Scans</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalScans}</p>
              </div>
              <div className="text-4xl text-purple-600">📱</div>
            </div>
            <p className="text-sm text-gray-500 mt-2">QR code scans</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterStatus === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterStatus === 'inactive'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {/* Restaurants Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">All Restaurants</h2>
            <p className="text-sm text-gray-500">Manage all registered restaurants</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Menu Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((restaurant) => (
                    <tr key={restaurant.slug} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {restaurant.logo ? (
                            <img
                              src={restaurant.logo}
                              alt={restaurant.name}
                              className="h-10 w-10 object-contain rounded-lg mr-3"
                              onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                          ) : (
                            <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-xl">🍽️</span>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                            <div className="text-sm text-gray-500">{restaurant.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{restaurant.email}</div>
                        {restaurant.phone && (
                          <div className="text-sm text-gray-500">{restaurant.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {restaurant.menuItemCount} items
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(restaurant.joinedAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {restaurant.isActive ? (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleActive(restaurant.id, restaurant.isActive)}
                            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                              restaurant.isActive
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {restaurant.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <Link
                            href={`/view-menu/${restaurant.slug}`}
                            target="_blank"
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-200 transition-colors"
                          >
                            View Menu
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="text-5xl mb-3">🔍</div>
                      <p>No restaurants found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
