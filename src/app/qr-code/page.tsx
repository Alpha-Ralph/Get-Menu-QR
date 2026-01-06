'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import QRCode from 'qrcode'
import Toast from '@/components/Toast'

export default function QRCodeGeneration() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [user, setUser] = useState<{ name: string; email: string; slug: string } | null>(null)
  const [menuUrl, setMenuUrl] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [qrOptions, setQrOptions] = useState({
    size: 300,
    color: '#000000',
    backgroundColor: '#ffffff'
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

    // Set the unique menu URL for this restaurant
    if (userData.slug) {
      const url = `${window.location.origin}/view-menu/${userData.slug}`
      setMenuUrl(url)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const generateQRCode = async () => {
    if (!canvasRef.current || !menuUrl) return

    try {
      await QRCode.toCanvas(canvasRef.current, menuUrl, {
        width: qrOptions.size,
        color: {
          dark: qrOptions.color,
          light: qrOptions.backgroundColor
        },
        margin: 2
      })

      setQrGenerated(true)
      setToast({ message: 'QR Code generated successfully!', type: 'success' })
    } catch (error) {
      console.error('Error generating QR code:', error)
      setToast({ message: 'Failed to generate QR code', type: 'error' })
    }
  }

  const downloadQRCode = () => {
    if (!canvasRef.current || !qrGenerated) return

    try {
      const url = canvasRef.current.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `${user?.name.replace(/\s+/g, '-')}-menu-qr-code.png`
      link.href = url
      link.click()

      setToast({ message: 'QR Code downloaded successfully!', type: 'success' })
    } catch (error) {
      console.error('Error downloading QR code:', error)
      setToast({ message: 'Failed to download QR code', type: 'error' })
    }
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(menuUrl)
    setToast({ message: 'Menu URL copied to clipboard!', type: 'success' })
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
              <h1 className="text-2xl font-bold text-gray-900">QR Code Generator</h1>
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - QR Code Preview */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">QR Code Preview</h2>

            <div className="flex flex-col items-center justify-center mb-6">
              <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
                <canvas ref={canvasRef} className="max-w-full" />
              </div>
            </div>

            {!qrGenerated && (
              <p className="text-center text-gray-500 mb-6">
                Click "Generate QR Code" to create your menu QR code
              </p>
            )}

            <div className="space-y-3">
              <button
                onClick={generateQRCode}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                {qrGenerated ? 'Regenerate QR Code' : 'Generate QR Code'}
              </button>

              {qrGenerated && (
                <button
                  onClick={downloadQRCode}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Download QR Code
                </button>
              )}

              <Link
                href={user?.slug ? `/view-menu/${user.slug}` : '#'}
                target="_blank"
                className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Preview Menu
              </Link>
            </div>
          </div>

          {/* Right Column - Customization & Info */}
          <div className="space-y-6">
            {/* Menu URL */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu URL</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={menuUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
                <button
                  onClick={copyUrl}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                This is the URL your QR code will point to
              </p>
            </div>

            {/* Customization Options */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customization</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size: {qrOptions.size}px
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="500"
                    step="50"
                    value={qrOptions.size}
                    onChange={(e) => setQrOptions({ ...qrOptions, size: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    QR Code Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={qrOptions.color}
                      onChange={(e) => setQrOptions({ ...qrOptions, color: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={qrOptions.color}
                      onChange={(e) => setQrOptions({ ...qrOptions, color: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={qrOptions.backgroundColor}
                      onChange={(e) => setQrOptions({ ...qrOptions, backgroundColor: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={qrOptions.backgroundColor}
                      onChange={(e) => setQrOptions({ ...qrOptions, backgroundColor: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
              <ol className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">1.</span>
                  <span>Customize your QR code appearance if desired</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">2.</span>
                  <span>Click "Generate QR Code" to create your QR code</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">3.</span>
                  <span>Download the QR code image</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">4.</span>
                  <span>Print it and place it on your tables or anywhere customers can scan it</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-indigo-600 mr-2">5.</span>
                  <span>Customers scan the code to view your digital menu!</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
