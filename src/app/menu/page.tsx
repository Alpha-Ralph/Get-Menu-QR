'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Toast from '@/components/Toast'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
}

export default function MenuManagement() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string; slug: string } | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  })

  useEffect(() => {
    // Check authentication
    const storedUserData = localStorage.getItem('user')
    if (!storedUserData) {
      router.push('/login')
      return
    }
    const userData = JSON.parse(storedUserData)
    setUser(userData)

    // Load menu items from API
    loadMenuItems(userData.slug)
  }, [router])

  const loadMenuItems = async (slug: string) => {
    try {
      const response = await fetch(`/api/menu-items?slug=${slug}`)
      const data = await response.json()

      if (response.ok) {
        setMenuItems(data.menuItems)
      }
    } catch (error) {
      console.error('Error loading menu items:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: ''
    })
  }

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.slug) return

    try {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slug: user.slug,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          image: formData.image || undefined
        })
      })

      if (response.ok) {
        await loadMenuItems(user.slug)
        setToast({ message: 'Menu item added successfully!', type: 'success' })
        setShowAddModal(false)
        resetForm()
      } else {
        setToast({ message: 'Failed to add menu item', type: 'error' })
      }
    } catch (error) {
      console.error('Error adding menu item:', error)
      setToast({ message: 'Error adding menu item', type: 'error' })
    }
  }

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingItem || !user?.slug) return

    try {
      const response = await fetch(`/api/menu-items/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          image: formData.image || undefined
        })
      })

      if (response.ok) {
        await loadMenuItems(user.slug)
        setToast({ message: 'Menu item updated successfully!', type: 'success' })
        setEditingItem(null)
        resetForm()
      } else {
        setToast({ message: 'Failed to update menu item', type: 'error' })
      }
    } catch (error) {
      console.error('Error updating menu item:', error)
      setToast({ message: 'Error updating menu item', type: 'error' })
    }
  }

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?') || !user?.slug) return

    try {
      const response = await fetch(`/api/menu-items/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await loadMenuItems(user.slug)
        setToast({ message: 'Menu item deleted successfully!', type: 'success' })
      } else {
        setToast({ message: 'Failed to delete menu item', type: 'error' })
      }
    } catch (error) {
      console.error('Error deleting menu item:', error)
      setToast({ message: 'Error deleting menu item', type: 'error' })
    }
  }

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image || ''
    })
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingItem(null)
    resetForm()
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Specials']

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
              <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Menu Items ({menuItems.length})
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            + Add New Item
          </button>
        </div>

        {/* Menu Items Grid */}
        {menuItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No menu items yet</h3>
            <p className="text-gray-500 mb-6">Start building your menu by adding your first item</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Add Your First Item
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {item.image && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-lg font-bold text-indigo-600">${item.price.toFixed(2)}</span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full mb-3">
                    {item.category}
                  </span>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={editingItem ? handleEditItem : handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="e.g., Caesar Salad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    rows={3}
                    placeholder="Describe your dish..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
