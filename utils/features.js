import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "@/models/User";


export const connectDB = async()=>{
    
   const {connection} = await mongoose.connect(process.env.MONGO_URI, {
    dbName:"todos"
   });
   console.log(`Successfully connected - ${connection.host}`);
};

export const cookieSetter = (res, token, set) => {
   res.setHeader("Set-Cookie", serialize("token", set?token:"", {
      path:"/",
      httpOnly:true,
      maxAge: set?15*24*60*60*1000:0,
   }))
}

export const generateToken = (_id) => {
   return jwt.sign({_id}, process.env.JWT_SECRET);
};

export const checkAuth = async(req)=>{
   const cookie = req.headers.cookie;
   if(!cookie) return null;

   const token = cookie.split("=")[1];

   const docoded = jwt.verify(token, process.env.JWT_SECRET);

   return await User.findById(docoded._id);

}