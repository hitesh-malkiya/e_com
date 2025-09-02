import Product from '../../../modules/product'
import connectDB from '../../../lib/mongoose'
import { NextResponse } from 'next/server'

export async function POST(request){
    try{
        await connectDB();
        const {name, price, image, category} = await request.json();
        const product = await Product.create({name, price, image, category});
        return NextResponse.json(product);
    }catch(error){
  
        
        return NextResponse.json({message: error.message}, {status: 500});
    }
}



export async function DELET(params) {
    try{
await connectDB()

    }catch{

    }
    
}

export async function GET(request) {
    try {
        await connectDB();
        // If a 'name' query parameter is provided, filter products by exact name match
     
       
    
        // Get query parameters from URL
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const name = searchParams.get('name');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const search = searchParams.get('search');
        const limit = parseInt(searchParams.get('limit')) || 10;
        const page = parseInt(searchParams.get('page')) || 1;
        const sortBy = searchParams.get('sortBy') || 'name';
        const sortOrder = searchParams.get('sortOrder') || 'asc';
        
        // Build query object
        let query = {};
        
        // Category filter
        if (category) {
            query.category = category;
        }
        
        // Price range filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        
        // Search by name
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
     
     
        
        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        // Calculate skip for pagination
        const skip = (page - 1) * limit;
        
        // Execute query with pagination and sorting
        console.log(query);
        
        const products = await Product.find(query)
            .sort(sort)
            .limit(limit)
            .skip(skip);
        
        // Get total count for pagination
        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);
        
        return NextResponse.json({
            products,
            pagination: {
                currentPage: page,
                totalPages,
                totalProducts,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
        
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}