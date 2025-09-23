
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



export async function DELETE(req) {
	try {
		await connectDB()

		let userName = null
		let id = null
		
			const body = await req.json()
			userName = body?.userName ?? null
			id = body?.id ?? null
		
console.log(userName , id);


		if (!userName || !id) {
			return NextResponse.json(
				{ message: "Missing userName or id" },
				{ status: 400 }
			)
		}

		const user = await User.findOne({ userName })
		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			)
		}

		if (!Array.isArray(user.adtocard) || user.adtocard.length === 0) {
			return NextResponse.json({
				message: "Cart is already empty",
				cart: []
			})
		}

		const beforeLength = user.adtocard.length
		user.adtocard = user.adtocard.filter(itemId => String(itemId) !== String(id))
		const removed = user.adtocard.length < beforeLength
		await user.save()

		return NextResponse.json({
			message: removed ? "Item removed from cart" : "Item not found in cart",
			cart: user.adtocard
		})
	} catch (error) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		)
	}
}

