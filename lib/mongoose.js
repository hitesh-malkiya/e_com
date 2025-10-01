import mongoose from 'mongoose'

const connectDB = async (user) => {
    try {
      await mongoose.connect(process.env.MONGODB_URI 
      )
      
    } catch (error) {
       
    }
}

export default connectDB;