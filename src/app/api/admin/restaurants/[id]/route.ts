import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH - Toggle restaurant active status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Get current restaurant
    const restaurant = await prisma.restaurant.findUnique({
      where: { id }
    })

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }

    // Toggle isActive
    const updated = await prisma.restaurant.update({
      where: { id },
      data: { isActive: !restaurant.isActive }
    })

    const { password, ...restaurantData } = updated

    return NextResponse.json({
      message: `Restaurant ${restaurantData.isActive ? 'activated' : 'deactivated'} successfully`,
      restaurant: restaurantData
    })
  } catch (error) {
    console.error('Error toggling restaurant status:', error)
    return NextResponse.json(
      { error: 'Failed to update restaurant status' },
      { status: 500 }
    )
  }
}
