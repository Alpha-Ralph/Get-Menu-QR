import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT update menu item
export async function PUT(
  request: Request,
  context: any
) {
  try {
    const id = context.params.id
    const body = await request.json()
    const { name, description, price, category, image } = body

    // Update menu item
    const menuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        image
      }
    })

    return NextResponse.json({
      message: 'Menu item updated successfully',
      menuItem
    })
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json(
      { error: 'Failed to update menu item' },
      { status: 500 }
    )
  }
}

// DELETE menu item
export async function DELETE(
  request: Request,
  context: any
) {
  try {
    const id = context.params.id

    await prisma.menuItem.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Menu item deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    )
  }
}
