import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDBsadfghjklsdfghisdfy');

    } catch (error) {
        console.log('MongoDB connection eeeeeeeeeeeeeeeeeeeeeeeerror:', error);
    }
}

export default connectDB;