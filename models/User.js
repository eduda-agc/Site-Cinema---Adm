import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model('User', userSchema);


// Primeiro adm:

//  name: 'Admin User',
//  username: 'admin',
//  password: 'admin123',
//  role: 'admin',
