import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Find restaurant by email
    const restaurant = await prisma.restaurant.findUnique({
      where: { email }
    })

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if account is active
    if (!restaurant.isActive) {
      return NextResponse.json(
        { error: 'Your account has been deactivated. Please contact administrator.' },
        { status: 403 }
      )
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, restaurant.password)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Return restaurant without password
    const { password: _, ...restaurantData } = restaurant

    return NextResponse.json({
      message: 'Login successful',
      restaurant: restaurantData
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    )
  }
}
