import { User } from "@/models/User";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import { errorHandler, asyncError } from "@/middleware/error";
import bcrypt from "bcrypt";

const handler = asyncError(async(req, res)=>{

    if(req.method!=="POST")
        return errorHandler(res, 400, "POST method is not allowed.");

    const { name, email, password } = req.body;
    if(!name || !email|| !password) return errorHandler(res, 400, "Enter All Details.");
    await connectDB();
    let user = await User.findOne({email});

    if(user) 
        return errorHandler(res, 400, "User Already Exist With Email Id.");

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name, email, password:hashedPassword
    })

    const token = generateToken(user._id);

    cookieSetter(res, token, true);

    res.status(201).json({
        success:true,
        message:"User Registered Successfully.",
        user
    })
    
});

export default handler