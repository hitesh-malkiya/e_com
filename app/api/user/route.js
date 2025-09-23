import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import User from '@/modules/user'
import connectDB from '@/lib/mongoose';

export async function POST(request) {
 

  try {
    const body = await request.json()
  

    const { email, name, image } = body

    if (!email || !name) {
      return NextResponse.json(
        { message: "Email and name are required" },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)

    // Check if user already exists
    let user = await User.findOne({ email })

    if (user) {
      // Update last login time
      user.lastLogin = new Date()
      user.firstLogin = false
      await user.save()

      return NextResponse.json({
        message: "User login updated",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
          userName: user.userName,
          isAdmin: user.isAdmin,
          firstLogin: user.firstLogin
        }
      })
    } else {
      // Create new user
      const newUser = new User({
        email,
        name,
        image: image || "",
        firstLogin: true,
        lastLogin: new Date()
      })

      await newUser.save()

      return NextResponse.json({
        message: "New user created successfully",
        user: {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          image: newUser.image,
          firstLogin: newUser.firstLogin
        }
      }, { status: 201 })
    }

  } catch (error) {

    return NextResponse.json(
      { message: "Internal servereeeeeeeeeeeeeeeeee error" },
      { status: 500 }
    )
  }
}


export async function GET(request) {
  try {
    const userName = request.headers.get('x-username') || request.headers.get('username')

    if (!userName) {
      return NextResponse.json(
        { message: 'userName is required in headers (x-username or username)' },
        { status: 400 }
      )
    }

    await connectDB();
    const user = await User.findOne({ userName })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ products: user.adtocard })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}