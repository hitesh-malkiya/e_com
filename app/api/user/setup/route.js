import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import User from '@/modules/user'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
  
    
    const body = await request.json()
    
    const { email, userName, password } = body

    if (!email || !userName || !password) {
      return NextResponse.json(
        { message: "Email, username, and password are required" },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    // Check if username is already taken
    const existingUser = await User.findOne({ userName })
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 400 }
      )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user with username and password
    user.userName = userName
    user.password = hashedPassword
    user.firstLogin = false
    await user.save()

    return NextResponse.json({
      message: "Username and password set successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userName: user.userName,
       
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
