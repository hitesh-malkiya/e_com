import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    
        name: {
          type: String,
          required: [true, "Product name is required"],
          trim: true,
          minlength: [3, "Product name must be at least 3 characters long"],
          maxlength: [100, "Product name cannot exceed 100 characters"],
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
        category: {
          type: String,
          required: [true, "Product category is required"],
          enum: {
            values: ["electronics", "fashion", "home", "sports", "other"],
            message: "{VALUE} is not a valid category",
          },
        },
      
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
