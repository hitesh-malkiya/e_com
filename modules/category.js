// import mongoose from 'mongoose'

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Category name is required"],
//     unique: true,
//     trim: true,
//     minlength: [2, "Category name must be at least 2 characters long"],
//     maxlength: [50, "Category name cannot exceed 50 characters"]
//   },
//   slug: {
//     type: String,
//     required: [true, "Category slug is required"],
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"]
//   },
//   description: {
//     type: String,
//     trim: true,
//     maxlength: [500, "Description cannot exceed 500 characters"]
//   },
//   image: {
//     type: String,
//     trim: true,
//     default: ""
//   },
//   icon: {
//     type: String,
//     trim: true,
//     default: ""
//   },
//   parent: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     default: null
//   },
//   level: {
//     type: Number,
//     default: 0,
//     min: [0, "Level cannot be negative"]
//   },
//   path: {
//     type: String,
//     trim: true,
//     default: ""
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   sortOrder: {
//     type: Number,
//     default: 0
//   },
//   seo: {
//     title: {
//       type: String,
//       trim: true,
//       maxlength: [60, "SEO title cannot exceed 60 characters"]
//     },
//     description: {
//       type: String,
//       trim: true,
//       maxlength: [160, "SEO description cannot exceed 160 characters"]
//     },
//     keywords: [{
//       type: String,
//       trim: true,
//       lowercase: true
//     }]
//   },
//   customFields: [{
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     value: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     type: {
//       type: String,
//       enum: ["text", "number", "boolean", "date", "url"],
//       default: "text"
//     }
//   }],
//   productCount: {
//     type: Number,
//     default: 0,
//     min: [0, "Product count cannot be negative"]
//   },
//   admin: {
//     type: String,
//     required: [true, "Admin is required"],
//     trim: true
//   }
// }, {
//   timestamps: true
// })

// // Add indexes for better query performance
// categorySchema.index({ name: 1 })
// categorySchema.index({ slug: 1 })
// categorySchema.index({ parent: 1 })
// categorySchema.index({ level: 1 })
// categorySchema.index({ isActive: 1 })
// categorySchema.index({ isFeatured: 1 })
// categorySchema.index({ sortOrder: 1 })
// categorySchema.index({ admin: 1 })

// // Virtual for full path
// categorySchema.virtual('fullPath').get(function() {
//   return this.path || this.slug;
// });

// // Virtual for children count
// categorySchema.virtual('childrenCount', {
//   ref: 'Category',
//   localField: '_id',
//   foreignField: 'parent',
//   count: true
// });

// // Method to get all children categories
// categorySchema.methods.getChildren = async function() {
//   return await this.constructor.find({ parent: this._id, isActive: true }).sort({ sortOrder: 1, name: 1 });
// };

// // Method to get all parent categories
// categorySchema.methods.getParents = async function() {
//   const parents = [];
//   let current = this;
  
//   while (current.parent) {
//     current = await this.constructor.findById(current.parent);
//     if (current) {
//       parents.unshift(current);
//     } else {
//       break;
//     }
//   }
  
//   return parents;
// };

// // Method to update product count
// categorySchema.methods.updateProductCount = async function() {
//   const Product = mongoose.model('Product');
//   const count = await Product.countDocuments({ category: this.name, isActive: true });
//   this.productCount = count;
//   return this.save();
// };

// // Method to check if category has children
// categorySchema.methods.hasChildren = async function() {
//   const count = await this.constructor.countDocuments({ parent: this._id, isActive: true });
//   return count > 0;
// };

// // Pre-save middleware to generate slug and path
// categorySchema.pre('save', async function(next) {
//   if (this.isModified('name')) {
//     // Generate slug from name
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/[^a-z0-9\s-]/g, '')
//       .replace(/\s+/g, '-')
//       .replace(/-+/g, '-')
//       .trim('-');
//   }
  
//   if (this.isModified('parent') || this.isModified('slug')) {
//     // Update level and path
//     if (this.parent) {
//       const parent = await this.constructor.findById(this.parent);
//       if (parent) {
//         this.level = parent.level + 1;
//         this.path = parent.path ? `${parent.path}/${this.slug}` : this.slug;
//       }
//     } else {
//       this.level = 0;
//       this.path = this.slug;
//     }
//   }
  
//   next();
// });

// // Pre-remove middleware to handle children
// categorySchema.pre('remove', async function(next) {
//   // Move children to parent or root
//   const children = await this.constructor.find({ parent: this._id });
//   for (const child of children) {
//     child.parent = this.parent;
//     await child.save();
//   }
  
//   next();
// });

// const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
// export default Category;
