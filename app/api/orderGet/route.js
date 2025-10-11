import connectDB from "@/lib/mongoose";

import Product from "@/modules/product";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // Get query parameters from URL
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ message: "id not found" }, { status: 200 });
        }
        console.log(id);
        
        await connectDB();
       const order = await Product.findById(id)
 console.log(order);
 
         return NextResponse.json({ message: " true" , data : order}, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: " no hale bhai" })
    }   
}