import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import User from '@/modules/user'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const body = await request.json()
    const { userName, password } = body

    if (!userName || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)

    // Find user by username
    const user = await User.findOne({ userName }).select('+password')
    if (!user) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      )
    }

    // Update last login time
    user.lastLogin = new Date()
    await user.save()

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userName: user.userName,
        image: user.image,
  
        firstLogin: user.firstLogin
      }
    })

  } catch (error) {
  
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
