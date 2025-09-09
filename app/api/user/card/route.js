
import User from '@/modules/user'
import connectDB from '@/lib/mongoose'
import { NextResponse } from 'next/server'

export async function PUT(req) {
    try {
        await connectDB()
        const {userName, id} = await req.json()
        
        const user = await User.findOne({ userName })
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        }
        
        // Ensure cart exists
        if (!Array.isArray(user.adtocard)) {
            user.adtocard = []
        }

        // Duplicate check
        if (user.adtocard.includes(id)) {
            return NextResponse.json(
                { message: "Item already in cart" },
                { status: 200 }
            )
        }

        user.adtocard.push(id)
        await user.save()
        
        return NextResponse.json({
            message: "Item added to cart successfully",
            cart: user.adtocard
        })
        
    } catch (error) {
        console.error("Add to cart error:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}