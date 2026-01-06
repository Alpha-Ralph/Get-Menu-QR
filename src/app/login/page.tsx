'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"
import Toast from "@/components/Toast"

export default function Login() {
  const router = useRouter()
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      // Call login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setToast({ message: data.error || 'Login failed', type: 'error' })
        setIsLoading(false)
        return
      }

      // Store restaurant data in localStorage for session
      localStorage.setItem('user', JSON.stringify(data.restaurant))

      setToast({ message: 'Login successful!', type: 'success' })

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (error) {
      console.error('Login error:', error)
      setToast({ message: 'Login failed. Please try again.', type: 'error' })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Sign In
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
