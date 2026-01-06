import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, slug } = body

    // Check if email already exists
    const existingUser = await prisma.restaurant.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingSlug = await prisma.restaurant.findUnique({
      where: { slug }
    })

    if (existingSlug) {
      return NextResponse.json(
        { error: 'Restaurant slug already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create restaurant
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        email,
        password: hashedPassword,
        slug,
        isActive: true
      }
    })

    // Return restaurant without password
    const { password: _, ...restaurantData } = restaurant

    return NextResponse.json(
      {
        message: 'Restaurant registered successfully',
        restaurant: restaurantData
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register restaurant' },
      { status: 500 }
    )
  }
}
