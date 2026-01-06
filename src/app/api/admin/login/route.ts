import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Find admin by username
    const admin = await prisma.admin.findUnique({
      where: { username }
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, admin.password)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Return success
    return NextResponse.json({
      message: 'Admin login successful',
      admin: {
        id: admin.id,
        username: admin.username
      }
    })
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    )
  }
}
