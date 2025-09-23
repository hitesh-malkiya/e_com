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

  category: {
    type: String,
    required: [true, "Product category is required"],
    enum: {
      values:["mobiles","laptops","computers","electronics","fashion","men","women","kids","shoes","bags","accessories","home","furniture","kitchen","appliances","decor","sports","fitness","outdoor","books","stationery","toys","games","music","beauty","personal care","health","grocery","beverages","pet supplies","automobile","tools","garden","office","baby","jewelry","watches","other"],
      message: "{VALUE} is not a valid category",
    },
  }
 


})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
