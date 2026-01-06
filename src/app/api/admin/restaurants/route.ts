import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all restaurants with menu item counts
export async function GET(request: Request) {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        _count: {
          select: { menuItems: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Remove passwords from response
    const restaurantsData = restaurants.map(({ password, ...rest }) => ({
      ...rest,
      menuItemCount: rest._count.menuItems
    }))

    return NextResponse.json({ restaurants: restaurantsData })
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    )
  }
}
