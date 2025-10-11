import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  admin: {
    type: String,
    required: [true, "Admin is required"],
    trim: true
  },
  user: {
    type: String,
    required: [true, "User is required"]
  },
  id: {
    type: String,
    required: [true, "Order ID is required"],
    trim: true
  },
  productID: {
    type: String,
    required: [true, "Order ID is required"],
    trim: true
  },
shipment_id: {
  type: Number,
  trim: true,
  default: null
},
shipmenOorder_id: {
  type: Number,
  trim: true,
  default: null
},
  receipt: {
    type: String,
    required: [true, "Receipt is required"],
    trim: true,
   
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
    default: 1
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
  },
  payAmount: {
    type: Number,
    required: [true, "Total amount is required"],
    min: [0, "Total amount must be positive"]
  },
 amount: {
    type: Number,
    required: [true, "Total amount is required"],
    min: [0, "Total amount must be positive"]
  },
  shippingAddress: {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true
    },
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
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true
    }
  },
  paymentMethod: {
    type: String,
  },
  paymentStatus: {
    type: String,
    required: [true, "Payment status is required"], 
    default: "pending"
  },
  orderStatus: {
    type: String,
    required: [true, "Order status is required"],
    default: "pending"
  }
}, {
  timestamps: true
})

// Add indexes for better query performance
orderSchema.index({ user: 1, createdAt: -1 })
orderSchema.index({ userName: 1, createdAt: -1 })
orderSchema.index({ orderStatus: 1 })
orderSchema.index({ paymentStatus: 1 })

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
