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
  image: {
    type: String,
    default: "",
   
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
  brand: {
    type: String,
    trim: true,
    maxlength: [50, "Brand name cannot exceed 50 characters"],
    default: "",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
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
  },
  planValidUntil: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || v > new Date();
      },
      message: 'Plan validity date must be in the future'
    }
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})



const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export default Admin;
