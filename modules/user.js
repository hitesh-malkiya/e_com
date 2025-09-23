import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
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
  },
  adtocard: {
    type: Array,
    default: [],
  },
  oder: {
    type: Array,
    default: [],
  },
  password: {
    type: String,
    required: false,
    select: false,
  },
  firstLogin: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  }
})

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
