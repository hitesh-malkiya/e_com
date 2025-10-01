import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
  },
  fullName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'],
  },
  userName: {
    type: String,
    trim: true,
    minlength: [2, "Username must be at least 2 characters long"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    unique: true,
    sparse: true,
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    minlength: [6, "Password must be at least 6 characters long"],
  }, 
  brand: {
    type: String,
    trim: true,
    maxlength: [50, "Brand name cannot exceed 50 characters"],
    default: "",
  },
  logoImg: {
    type: String,
    trim: true,
    default: "",
  },
  razorpayId: {
    type: String,
    trim: true,
    default: "",
  },
  razorpaySecret: {
    type: String,
    trim: true,
    select: false,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
address: {
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
      trim: true
    }
  },
  orderIds: {
    type: Array,
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  firstLogin: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})



const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export default Admin;
