import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [3, "Product name must be at least 3 characters long"],
    maxlength: [70, "Product name cannot exceed 100 characters"],
  },
  mrp: {
    type: Number,
    required: [true, "MRP is required"],
    min: [0, "MRP must be a positive number"],
  },
  more: {
    type:Array,
    default: [],
  },
  mainDes: {
    type: String,
    required: [true, "Main description is required"],
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
    default: "other",
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    min: [0, "Stock must be a non-negative number"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be a positive number"],
  },

  image: {
    type: String,
    required: [true, "Product image is required"],
  },
  
  admin: {
    type: String,
    required: true,
    trim: true,
  },
  abrand: {
    type: String,
    trim: true,
    default: "",
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    enum: {
      values:[
    "T-Shirts",
    "Formal Shirts",
    "Casual Shirts",
    "Jeans",
    "Casual pants",
    "Formal pants",
    "Track Pants",
    "Cargos ",
    "Jackets",
    "Blazers",
    "Kurtis",
    "Chaniya Choli",
    "Party Dresses",
    "Dresses",
    "Tops",
    "Night Dresses",
    "Sweaters",
    "Jeans",
  ],
      message: "{VALUE} is not a valid category",
    },
  }
 


})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
