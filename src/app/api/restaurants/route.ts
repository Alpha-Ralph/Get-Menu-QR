import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

// GET restaurant by slug
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Restaurant slug is required' },
        { status: 400 }
      )
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { slug }
    })

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }

    const { password, ...restaurantData } = restaurant

    return NextResponse.json({ restaurant: restaurantData })
  } catch (error) {
    console.error('Error fetching restaurant:', error)
    return NextResponse.json(
      { error: 'Failed to fetch restaurant' },
      { status: 500 }
    )
  }
}

// PATCH update restaurant
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { slug, name, email, phone, address, description, website, logo, currency, categories, currentPassword, newPassword } = body

    const restaurant = await prisma.restaurant.findUnique({
      where: { slug }
    })

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }

    let hashedPassword = restaurant.password

    // If changing password, verify current password
    if (currentPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(currentPassword, restaurant.password)

      if (!passwordMatch) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 401 }
        )
      }

      hashedPassword = await bcrypt.hash(newPassword, 10)
    }

    // Update restaurant
    const updated = await prisma.restaurant.update({
      where: { slug },
      data: {
        name,
        email,
        phone,
        address,
        description,
        website,
        logo,
        currency,
        categories,
        password: hashedPassword
      }
    })

    const { password: _, ...restaurantData } = updated

    return NextResponse.json({
      message: 'Restaurant updated successfully',
      restaurant: restaurantData
    })
  } catch (error) {
    console.error('Error updating restaurant:', error)
    return NextResponse.json(
      { error: 'Failed to update restaurant' },
      { status: 500 }
    )
  }
}
