import mongoose from "mongoose";


//defining schema

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: ['customer', 'employee'], required: true }, // Add role field
    tc: { type: Boolean, required: true }
});


//Model
const UserModel = mongoose.model("user", userSchema)

export default UserModel 