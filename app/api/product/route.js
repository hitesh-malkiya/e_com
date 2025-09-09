import Product from '../../../modules/product'
import connectDB from '../../../lib/mongoose'
import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'



export async function POST(request){

    console.log('reeeeeeeeeeeeeeeee' , request);
    
    try{
        await connectDB();
        
        // Parse form data
        const formData = await request.formData();
        

        const stock = formData.get('stock');
        const mainDes = formData.get('mainDes');
        const brand = formData.get('brand');
        const name = formData.get('name');
        const price = formData.get('price');
        const category = formData.get('category');
        const imageFile = formData.get('image');
        const userName = formData.get('userName')
        const admin = formData.get('admin')
        const mrp = formData.get('mrp')
        const moreString = formData.get('more')
        const more = moreString ? JSON.parse(moreString) : []
        if (!imageFile) {
            return NextResponse.json({message: 'No image file provided'}, {status: 400});
        }


        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), 'public', 'uploads', userName || 'default');
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
            // Directory already exists
        }

        // Generate unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}-${imageFile.name}`;
        const filepath = join(uploadsDir, filename);

        // Save file
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Create image URL
        const imageUrl = `/uploads/${userName || 'default'}/${filename}`;

        const product = await Product.create({
            name, 
            price: parseFloat(price), 
            mrp,
            image: imageUrl, 
            category,
            stock,
            admin,
            more,
            mainDes,
            brand
        });
        
        return NextResponse.json(product);
    }catch(error){
        console.error('Error creating product:', error);
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
       
    
       
    
        // Get query parameters from URL
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
       const admin =searchParams.get('admin')
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const search = searchParams.get('search');
        const limit = parseInt(searchParams.get('limit'));
        const page = parseInt(searchParams.get('page'));
        const sortBy = searchParams.get('sortBy') || 'name';
        const sortOrder = searchParams.get('sortOrder') || 'asc';
        const id =searchParams.get('id');
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
        if (id) {
            query._id = id;
        }
     if(admin){
        query.admin= admin
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
      
        
        return NextResponse.json('not found , ' , error);
    }
}