// import mongoose from 'mongoose'

// const wishlistSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, "User is required"]
//   },
//   userName: {
//     type: String,
//     required: [true, "Username is required"],
//     trim: true
//   },
//   products: [{
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true
//     },
//     addedAt: {
//       type: Date,
//       default: Date.now
//     },
//     notes: {
//       type: String,
//       trim: true,
//       maxlength: [200, "Notes cannot exceed 200 characters"]
//     }
//   }],
//   isPublic: {
//     type: Boolean,
//     default: false
//   },
//   name: {
//     type: String,
//     trim: true,
//     maxlength: [50, "Wishlist name cannot exceed 50 characters"],
//     default: "My Wishlist"
//   },
//   description: {
//     type: String,
//     trim: true,
//     maxlength: [200, "Description cannot exceed 200 characters"]
//   }
// }, {
//   timestamps: true
// })

// // Add indexes for better query performance
// wishlistSchema.index({ user: 1 })
// wishlistSchema.index({ userName: 1 })
// wishlistSchema.index({ isPublic: 1 })
// wishlistSchema.index({ 'products.product': 1 })

// // Compound index for unique user wishlist
// wishlistSchema.index({ user: 1 }, { unique: true })

// // Virtual for products count
// wishlistSchema.virtual('productsCount').get(function() {
//   return this.products.length;
// });

// // Method to add product to wishlist
// wishlistSchema.methods.addProduct = async function(productId, notes = '') {
//   // Check if product already exists
//   const existingProduct = this.products.find(p => p.product.toString() === productId.toString());
//   if (existingProduct) {
//     return { success: false, message: 'Product already in wishlist' };
//   }
  
//   this.products.push({
//     product: productId,
//     addedAt: new Date(),
//     notes: notes
//   });
  
//   await this.save();
//   return { success: true, message: 'Product added to wishlist' };
// };

// // Method to remove product from wishlist
// wishlistSchema.methods.removeProduct = async function(productId) {
//   const initialLength = this.products.length;
//   this.products = this.products.filter(p => p.product.toString() !== productId.toString());
  
//   if (this.products.length < initialLength) {
//     await this.save();
//     return { success: true, message: 'Product removed from wishlist' };
//   }
  
//   return { success: false, message: 'Product not found in wishlist' };
// };

// // Method to check if product is in wishlist
// wishlistSchema.methods.hasProduct = function(productId) {
//   return this.products.some(p => p.product.toString() === productId.toString());
// };

// // Method to clear wishlist
// wishlistSchema.methods.clear = async function() {
//   this.products = [];
//   await this.save();
//   return { success: true, message: 'Wishlist cleared' };
// };

// // Method to move product to cart (remove from wishlist)
// wishlistSchema.methods.moveToCart = async function(productId) {
//   const productIndex = this.products.findIndex(p => p.product.toString() === productId.toString());
//   if (productIndex === -1) {
//     return { success: false, message: 'Product not found in wishlist' };
//   }
  
//   // Remove from wishlist
//   this.products.splice(productIndex, 1);
//   await this.save();
  
//   return { success: true, message: 'Product moved to cart' };
// };

// // Static method to get or create wishlist for user
// wishlistSchema.statics.getOrCreate = async function(userId, userName) {
//   let wishlist = await this.findOne({ user: userId });
  
//   if (!wishlist) {
//     wishlist = new this({
//       user: userId,
//       userName: userName
//     });
//     await wishlist.save();
//   }
  
//   return wishlist;
// };

// // Static method to get wishlist with populated products
// wishlistSchema.statics.getWithProducts = async function(userId) {
//   return await this.findOne({ user: userId })
//     .populate({
//       path: 'products.product',
//       select: 'name price image category brand isActive stock'
//     });
// };

// const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
// export default Wishlist;
