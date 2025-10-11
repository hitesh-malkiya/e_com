// import { encrypt } from "@/lib/crypto";
import connectDB from "@/lib/mongoose";
import Admin from "@/modules/admin";
import User from "@/modules/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB()
        const data = await req.json();
        const { 
            fullName, 
            userName, 
            email, 
            password, 
            logoImg, 
            shiprocketEmail,
            shiprocketPassword,
            shiprocketApiToken,
            
            isAdmin, 
            brand, 
            
            // razorpayId,
            // razorpaySecret,
            contactId,
            fundAccountId,
            address,
            isActive, 
            firstLogin 
        } = data;
        



        // Validate required fields
        if (!fullName || !email || !password) {
            return NextResponse.json({ 
                error: "Full name, email, and password are required" 
            }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ 
                error: "Please enter a valid email address" 
            }, { status: 400 });
        }

        // Validate password strength
        if (password.length < 6) {
            return NextResponse.json({ 
                error: "Password must be at least 6 characters long" 
            }, { status: 400 });
        }

        // Validate full name
        if (fullName.length < 2 || fullName.length > 50) {
            return NextResponse.json({ 
                error: "Full name must be between 2 and 50 characters" 
            }, { status: 400 });
        }

        // Validate username if provided
        if (userName) {
            if (userName.length < 2 || userName.length > 30) {
                return NextResponse.json({ 
                    error: "Username must be between 2 and 30 characters" 
                }, { status: 400 });
            }
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!usernameRegex.test(userName)) {
                return NextResponse.json({ 
                    error: "Username can only contain letters, numbers, and underscores" 
                }, { status: 400 });
            }
        }

        // Validate address if provided
        if (address) {
            const { address: addr, city, state, postalCode } = address;
            if (!addr || !city || !state || !postalCode) {
                return NextResponse.json({ 
                    error: "Complete address information is required (address, city, state, postal code)" 
                }, { status: 400 });
            }
        }
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ 
            $or: [
                { email: email.toLowerCase() },
                ...(userName ? [{ userName: userName }] : [])
            ]
        });
        
        if (existingAdmin) {
            return NextResponse.json({ 
                error: "Admin with this email or username already exists" 
            }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create admin with proper field mapping
        const adminData = {
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            shiprocketEmail: shiprocketEmail ? shiprocketEmail.trim() : "",
            shiprocketPassword: shiprocketPassword ? shiprocketPassword.trim() : "",
            shiprocketApiToken: shiprocketApiToken ? shiprocketApiToken.trim() : "",    
            isAdmin: isAdmin !== undefined ? isAdmin : true,
            brand: brand ? brand.trim() : "",
            logoImg: logoImg || "",
            // razorpayId: razorpayId ? encrypt(razorpayId) : "",
            // razorpaySecret: razorpaySecret ? encrypt(razorpaySecret) :  " ",
            contactId: contactId || "",
            fundAccountId: fundAccountId || "",
            address: address || {
                address: "",
                city: "",
                state: "",
                postalCode: ""
            },
            isActive: isActive !== undefined ? isActive : true,
            firstLogin: firstLogin !== undefined ? firstLogin : true,
            lastLogin: new Date()
        };

        // Add userName only if provided
        if (userName) {
            adminData.userName = userName.trim();
        }

        const admin = await Admin.create(adminData);

        return NextResponse.json({ 
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                userName: admin.userName,
                email: admin.email,
                brand: admin.brand,
                isAdmin: admin.isAdmin,
                isActive: admin.isActive,
                firstLogin: admin.firstLogin,
                lastLogin: admin.lastLogin
            }
        });
    } catch (err) {
        console.error('Admin creation error:', err);
        
        // Handle specific MongoDB errors
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return NextResponse.json({ 
                error: `Admin with this ${field} already exists` 
            }, { status: 400 });
        }
        
        // Handle validation errors
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return NextResponse.json({ 
                error: "Validation failed",
                details: errors
            }, { status: 400 });
        }
        
        return NextResponse.json({ 
            error: err?.message || "Server error" 
        }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const userName = searchParams.get('userName');
        if (!userName) {
            return NextResponse.json({
                success: false,
                error: "userName query parameter is required"
            }, { status: 400 });
        }
        const admin = await Admin.findOne({ userName });
        if (!admin) {
            return NextResponse.json({
                success: false,
                error: "Admin not found"
            }, { status: 404 });
        }
        return NextResponse.json({
            success: true,
            admin,
            data: {
                admin: {
                    id: admin._id,
                    fullName: admin.fullName,
                    userName: admin.userName,
                    email: admin.email,
                    password: admin.password, // Include password
                    brand: admin.brand,
                    logoImg: admin.logoImg,
                    // razorpayId: admin.razorpayId,
                    // razorpaySecret: admin.razorpaySecret, // Include secret
                 
                    contactId: admin.contactId,
                    fundAccountId: admin.fundAccountId,
                    address: admin.address,
                    orderIds: admin.orderIds,
                    isAdmin: admin.isAdmin,
                    isActive: admin.isActive,
                    firstLogin: admin.firstLogin,
                    lastLogin: admin.lastLogin,
                    createdAt: admin.createdAt,
                    updatedAt: admin.updatedAt
                }
            }
        });
    } catch (err) {
        console.error('Admin fetch error:', err);
        return NextResponse.json({
            success: false,
            error: err?.message || "Server error"
        }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const data = await req.json();
        const { id, fullName, userName, email, brand, logoImg, razorpayId, razorpaySecret, address, isActive, isAdmin } = data;
        
        if (!id) {
            return NextResponse.json({ 
                error: "Admin ID is required" 
            }, { status: 400 });
        }

        // Validate email format if provided
        if (email) {
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json({ 
                    error: "Please enter a valid email address" 
                }, { status: 400 });
            }
        }

        // Validate full name if provided
        if (fullName && (fullName.length < 2 || fullName.length > 50)) {
            return NextResponse.json({ 
                error: "Full name must be between 2 and 50 characters" 
            }, { status: 400 });
        }

        // Validate username if provided
        if (userName) {
            if (userName.length < 2 || userName.length > 30) {
                return NextResponse.json({ 
                    error: "Username must be between 2 and 30 characters" 
                }, { status: 400 });
            }
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!usernameRegex.test(userName)) {
                return NextResponse.json({ 
                    error: "Username can only contain letters, numbers, and underscores" 
                }, { status: 400 });
            }
        }

        // Check if admin exists
        const existingAdmin = await Admin.findById(id);
        if (!existingAdmin) {
            return NextResponse.json({ 
                error: "Admin not found" 
            }, { status: 404 });
        }

        // Check for duplicate email/username if they're being updated
        if (email || userName) {
            const duplicateFilter = { _id: { $ne: id } };
            if (email) duplicateFilter.email = email.toLowerCase();
            if (userName) duplicateFilter.userName = userName;
            
            const duplicate = await Admin.findOne(duplicateFilter);
            if (duplicate) {
                return NextResponse.json({ 
                    error: "Admin with this email or username already exists" 
                }, { status: 400 });
            }
        }

        // Prepare update data
        const updateData = {};
        if (fullName) updateData.fullName = fullName.trim();
        if (userName) updateData.userName = userName.trim();
        if (email) updateData.email = email.toLowerCase().trim();
        if (brand !== undefined) updateData.brand = brand ? brand.trim() : "";
        if (logoImg !== undefined) updateData.logoImg = logoImg || "";
        if (razorpayId !== undefined) updateData.razorpayId = razorpayId || "";
        if (razorpaySecret !== undefined) updateData.razorpaySecret = razorpaySecret || "";
        if (address) updateData.address = address;
        if (isActive !== undefined) updateData.isActive = isActive;
        if (isAdmin !== undefined) updateData.isAdmin = isAdmin;

        const updatedAdmin = await Admin.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        ).select('-password -razorpaySecret');

        return NextResponse.json({ 
            success: true,
            message: "Admin updated successfully",
            admin: updatedAdmin
        });
    } catch (err) {
        console.error('Admin update error:', err);
        
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return NextResponse.json({ 
                error: `Admin with this ${field} already exists` 
            }, { status: 400 });
        }
        
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return NextResponse.json({ 
                error: "Validation failed",
                details: errors
            }, { status: 400 });
        }
        
        return NextResponse.json({ 
            error: err?.message || "Server error" 
        }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ 
                error: "Admin ID is required" 
            }, { status: 400 });
        }

        const admin = await Admin.findById(id);
        if (!admin) {
            return NextResponse.json({ 
                error: "Admin not found" 
            }, { status: 404 });
        }

        await Admin.findByIdAndDelete(id);

        return NextResponse.json({ 
            success: true,
            message: "Admin deleted successfully"
        });
    } catch (err) {
        console.error('Admin deletion error:', err);
        return NextResponse.json({ 
            error: err?.message || "Server error" 
        }, { status: 500 });
    }
}