import connectDB from "@/lib/mongoose";
import Admin from "@/modules/admin";
import User from "@/modules/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB()
        const data = await req.json();
        const { fullName, userName, email, password, image, isAdmin, brand, isActive, firstLogin, planValidUntil } = data;
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ 
            $or: [
                { email: email },
                { userName: userName }
            ]
        });
        
        if (existingAdmin) {
            return NextResponse.json({ 
                error: "Admin with this email or username already exists" 
            }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create admin
        const admin = await Admin.create({
            fullName,
            userName,
            email,
            password: hashedPassword,
            image: image || "",
            isAdmin: isAdmin || true,
            brand: brand || "",
            isActive: isActive !== undefined ? isActive : true,
            firstLogin: firstLogin !== undefined ? firstLogin : true,
            lastLogin: new Date(),
            planValidUntil: planValidUntil || null
        });

        return NextResponse.json({ 
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                userName: admin.userName,
                email: admin.email,
                brand: admin.brand,
                isAdmin: admin.isAdmin,
                isActive: admin.isActive
            }
        });
    } catch (err) {
        console.error('Admin creation error:', err);
        return NextResponse.json({ 
            error: err?.message || "Server error" 
        }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectDB();
        const admins = await Admin.find({}).select('-password');
        const users = await User.find({ isAdmin: true }).select('-password');
        
        return NextResponse.json({ 
            admins,
            adminUsers: users,
            totalAdmins: admins.length,
            totalAdminUsers: users.length
        });
    } catch (err) {
        console.error('Admin fetch error:', err);
        return NextResponse.json({ 
            error: err?.message || "Server error" 
        }, { status: 500 });
    }
}