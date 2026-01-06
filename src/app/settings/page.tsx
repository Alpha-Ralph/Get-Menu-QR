'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Toast from '@/components/Toast'

interface UserData {
  name: string
  email: string
  password: string
  slug: string
  phone?: string
  address?: string
  description?: string
  website?: string
  logo?: string
  currency?: string
  categories?: string[]
}

export default function Settings() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [activeTab, setActiveTab] = useState<'profile' | 'restaurant' | 'menu' | 'password'>('profile')

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: ''
  })

  // Restaurant form
  const [restaurantForm, setRestaurantForm] = useState({
    phone: '',
    address: '',
    description: '',
    website: '',
    logo: ''
  })

  // Menu settings form
  const [menuForm, setMenuForm] = useState({
    currency: 'USD',
    categories: [] as string[]
  })
  const [newCategory, setNewCategory] = useState('')

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    // Check authentication
    const storedUserData = localStorage.getItem('user')
    if (!storedUserData) {
      router.push('/login')
      return
    }
    const userData = JSON.parse(storedUserData)

    // Load restaurant data from API
    loadRestaurantData(userData.slug)
  }, [router])

  const loadRestaurantData = async (slug: string) => {
    try {
      const response = await fetch(`/api/restaurants?slug=${slug}`)
      const data = await response.json()

      if (response.ok) {
        const restaurantData = data.restaurant
        setUser(restaurantData)

        // Initialize forms
        setProfileForm({
          name: restaurantData.name || '',
          email: restaurantData.email || ''
        })

        setRestaurantForm({
          phone: restaurantData.phone || '',
          address: restaurantData.address || '',
          description: restaurantData.description || '',
          website: restaurantData.website || '',
          logo: restaurantData.logo || ''
        })

        setMenuForm({
          currency: restaurantData.currency || 'USD',
          categories: restaurantData.categories || ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Specials']
        })

        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(restaurantData))
      }
    } catch (error) {
      console.error('Error loading restaurant data:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    try {
      const response = await fetch('/api/restaurants', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slug: user.slug,
          name: profileForm.name,
          email: profileForm.email,
          phone: user.phone,
          address: user.address,
          description: user.description,
          website: user.website,
          logo: user.logo
        })
      })

      if (response.ok) {
        await loadRestaurantData(user.slug)
        setToast({ message: 'Profile updated successfully!', type: 'success' })
      } else {
        setToast({ message: 'Failed to update profile', type: 'error' })
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setToast({ message: 'Error updating profile', type: 'error' })
    }
  }

  const handleRestaurantSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    try {
      const response = await fetch('/api/restaurants', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slug: user.slug,
          name: user.name,
          email: user.email,
          phone: restaurantForm.phone,
          address: restaurantForm.address,
          description: restaurantForm.description,
          website: restaurantForm.website,
          logo: restaurantForm.logo
        })
      })

      if (response.ok) {
        await loadRestaurantData(user.slug)
        setToast({ message: 'Restaurant settings updated successfully!', type: 'success' })
      } else {
        setToast({ message: 'Failed to update restaurant settings', type: 'error' })
      }
    } catch (error) {
      console.error('Error updating restaurant settings:', error)
      setToast({ message: 'Error updating restaurant settings', type: 'error' })
    }
  }

  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    try {
      const response = await fetch('/api/restaurants', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slug: user.slug,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          description: user.description,
          website: user.website,
          logo: user.logo,
          currency: menuForm.currency,
          categories: menuForm.categories
        })
      })

      if (response.ok) {
        await loadRestaurantData(user.slug)
        setToast({ message: 'Menu settings updated successfully!', type: 'success' })
      } else {
        setToast({ message: 'Failed to update menu settings', type: 'error' })
      }
    } catch (error) {
      console.error('Error updating menu settings:', error)
      setToast({ message: 'Error updating menu settings', type: 'error' })
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !menuForm.categories.includes(newCategory.trim())) {
      setMenuForm({
        ...menuForm,
        categories: [...menuForm.categories, newCategory.trim()]
      })
      setNewCategory('')
    }
  }

  const handleRemoveCategory = (categoryToRemove: string) => {
    setMenuForm({
      ...menuForm,
      categories: menuForm.categories.filter(cat => cat !== categoryToRemove)
    })
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    // Validate new password
    if (passwordForm.newPassword.length < 6) {
      setToast({ message: 'New password must be at least 6 characters!', type: 'error' })
      return
    }

    // Validate password match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setToast({ message: 'New passwords do not match!', type: 'error' })
      return
    }

    try {
      const response = await fetch('/api/restaurants', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slug: user.slug,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          description: user.description,
          website: user.website,
          logo: user.logo,
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        setToast({ message: 'Password changed successfully!', type: 'success' })
      } else {
        setToast({ message: data.error || 'Failed to change password', type: 'error' })
      }
    } catch (error) {
      console.error('Error changing password:', error)
      setToast({ message: 'Error changing password', type: 'error' })
    }
  }

  const handleDeleteAccount = () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return
    }

    if (!confirm('This will permanently delete all your data including menu items. Are you absolutely sure?')) {
      return
    }

    // Delete all data
    localStorage.removeItem('user')
    localStorage.removeItem('menuItems')

    setToast({ message: 'Account deleted successfully', type: 'success' })

    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-700">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Restaurant Profile Header */}
          {user && (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                {user.logo ? (
                  <div className="flex-shrink-0">
                    <img
                      src={user.logo}
                      alt={user.name}
                      className="h-16 w-16 object-contain rounded-lg border-2 border-white shadow-md bg-white p-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 h-16 w-16 bg-indigo-100 rounded-lg flex items-center justify-center border-2 border-white shadow-md">
                    <span className="text-2xl">🍽️</span>
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  {user.description && (
                    <p className="text-sm text-gray-500 mt-1">{user.description}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab('restaurant')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'restaurant'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Restaurant Info
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'menu'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Menu Settings
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'password'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Change Password
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Restaurant Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="Your Restaurant Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Restaurant Info Tab */}
            {activeTab === 'restaurant' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Restaurant Information</h2>
                <form onSubmit={handleRestaurantSubmit} className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={restaurantForm.phone}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={restaurantForm.address}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      rows={3}
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={restaurantForm.description}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      rows={4}
                      placeholder="Tell customers about your restaurant..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={restaurantForm.website}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, website: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="https://yourrestaurant.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={restaurantForm.logo}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, logo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="https://example.com/logo.png"
                    />
                    <p className="text-sm text-gray-500 mt-1">This logo will appear on your menu page</p>
                    {restaurantForm.logo && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                        <img
                          src={restaurantForm.logo}
                          alt="Logo preview"
                          className="h-16 w-16 object-contain border border-gray-300 rounded-lg p-2"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Save Restaurant Info
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Menu Settings Tab */}
            {activeTab === 'menu' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu Settings</h2>
                <form onSubmit={handleMenuSubmit} className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency *
                    </label>
                    <select
                      required
                      value={menuForm.currency}
                      onChange={(e) => setMenuForm({ ...menuForm, currency: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="CAD">CAD ($)</option>
                      <option value="AUD">AUD ($)</option>
                      <option value="EGP">EGP (E£)</option>
                      <option value="SAR">SAR (﷼)</option>
                      <option value="AED">AED (د.إ)</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">This currency will be displayed on your menu</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Menu Categories *
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddCategory()
                          }
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        placeholder="Add new category..."
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        + Add
                      </button>
                    </div>

                    <div className="space-y-2">
                      {menuForm.categories.map((category, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-200"
                        >
                          <span className="font-medium text-gray-900">{category}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(category)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      These categories will be available when adding menu items
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Save Menu Settings
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <p className="text-sm text-gray-500 mt-1">Must be at least 6 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </form>

                {/* Danger Zone */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Delete Account</h4>
                    <p className="text-gray-600 mb-4">
                      Once you delete your account, there is no going back. This will permanently delete all your data including menu items and QR codes.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
