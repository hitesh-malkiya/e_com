// import mongoose from 'mongoose'

// const reviewSchema = new mongoose.Schema({
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
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: [true, "Product is required"]
//   },
//   order: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Order',
//     required: [true, "Order is required"]
//   },
//   rating: {
//     type: Number,
//     required: [true, "Rating is required"],
//     min: [1, "Rating must be at least 1"],
//     max: [5, "Rating cannot exceed 5"]
//   },
//   title: {
//     type: String,
//     required: [true, "Review title is required"],
//     trim: true,
//     minlength: [5, "Title must be at least 5 characters long"],
//     maxlength: [100, "Title cannot exceed 100 characters"]
//   },
//   comment: {
//     type: String,
//     required: [true, "Review comment is required"],
//     trim: true,
//     minlength: [10, "Comment must be at least 10 characters long"],
//     maxlength: [1000, "Comment cannot exceed 1000 characters"]
//   },
//   images: [{
//     type: String,
//     trim: true
//   }],
//   helpful: {
//     count: {
//       type: Number,
//       default: 0,
//       min: [0, "Helpful count cannot be negative"]
//     },
//     users: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     }]
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   isApproved: {
//     type: Boolean,
//     default: true
//   },
//   admin: {
//     type: String,
//     required: [true, "Admin is required"],
//     trim: true
//   },
//   response: {
//     comment: {
//       type: String,
//       trim: true,
//       maxlength: [500, "Response cannot exceed 500 characters"]
//     },
//     respondedBy: {
//       type: String,
//       trim: true
//     },
//     respondedAt: {
//       type: Date
//     }
//   }
// }, {
//   timestamps: true
// })

// // Add indexes for better query performance
// reviewSchema.index({ product: 1, createdAt: -1 })
// reviewSchema.index({ user: 1 })
// reviewSchema.index({ rating: 1 })
// reviewSchema.index({ isApproved: 1 })
// reviewSchema.index({ isVerified: 1 })
// reviewSchema.index({ admin: 1 })

// // Compound index for unique user-product review
// reviewSchema.index({ user: 1, product: 1 }, { unique: true })

// // Virtual for helpful percentage
// reviewSchema.virtual('helpfulPercentage').get(function() {
//   if (this.helpful.count === 0) return 0;
//   return Math.round((this.helpful.count / (this.helpful.count + this.helpful.users.length)) * 100);
// });

// // Method to mark review as helpful
// reviewSchema.methods.markHelpful = async function(userId) {
//   if (!this.helpful.users.includes(userId)) {
//     this.helpful.users.push(userId);
//     this.helpful.count += 1;
//     return this.save();
//   }
//   return this;
// };

// // Method to unmark review as helpful
// reviewSchema.methods.unmarkHelpful = async function(userId) {
//   const index = this.helpful.users.indexOf(userId);
//   if (index > -1) {
//     this.helpful.users.splice(index, 1);
//     this.helpful.count = Math.max(0, this.helpful.count - 1);
//     return this.save();
//   }
//   return this;
// };

// // Method to check if user has marked as helpful
// reviewSchema.methods.isMarkedHelpful = function(userId) {
//   return this.helpful.users.includes(userId);
// };

// // Method to add admin response
// reviewSchema.methods.addResponse = function(comment, respondedBy) {
//   this.response = {
//     comment,
//     respondedBy,
//     respondedAt: new Date()
//   };
//   return this.save();
// };

// // Static method to get average rating for a product
// reviewSchema.statics.getAverageRating = async function(productId) {
//   const result = await this.aggregate([
//     { $match: { product: productId, isApproved: true } },
//     { $group: { _id: null, average: { $avg: '$rating' }, count: { $sum: 1 } } }
//   ]);
  
//   return result.length > 0 ? result[0] : { average: 0, count: 0 };
// };

// // Static method to get rating distribution for a product
// reviewSchema.statics.getRatingDistribution = async function(productId) {
//   const result = await this.aggregate([
//     { $match: { product: productId, isApproved: true } },
//     { $group: { _id: '$rating', count: { $sum: 1 } } },
//     { $sort: { _id: 1 } }
//   ]);
  
//   const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//   result.forEach(item => {
//     distribution[item._id] = item.count;
//   });
  
//   return distribution;
// };

// // Pre-save middleware to update product rating
// reviewSchema.post('save', async function() {
//   if (this.isApproved) {
//     const Product = mongoose.model('Product');
//     const product = await Product.findById(this.product);
//     if (product) {
//       const ratingData = await this.constructor.getAverageRating(this.product);
//       product.rating.average = Math.round(ratingData.average * 10) / 10;
//       product.rating.count = ratingData.count;
//       await product.save();
//     }
//   }
// });

// // Pre-remove middleware to update product rating
// reviewSchema.post('remove', async function() {
//   const Product = mongoose.model('Product');
//   const product = await Product.findById(this.product);
//   if (product) {
//     const ratingData = await this.constructor.getAverageRating(this.product);
//     product.rating.average = Math.round(ratingData.average * 10) / 10;
//     product.rating.count = ratingData.count;
//     await product.save();
//   }
// });

// const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
// export default Review;
