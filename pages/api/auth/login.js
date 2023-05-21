import { User } from "@/models/User";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import { errorHandler, asyncError } from "@/middleware/error";
import bcrypt from "bcrypt";

const handler = asyncError(async(req, res)=>{

    if(req.method!=="POST")
        return errorHandler(res, 400, "POST method is not allowed.");

    const { email, password } = req.body;
    if(!email|| !password) return errorHandler(res, 400, "Enter All Details.");
    await connectDB();
    const user = await User.findOne({email}).select("+password");

    if(!user) 
        return errorHandler(res, 400, "Invalid Email or Password.");

    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched) 
        return errorHandler(res, 400, "Invalid Email or Password.");

    const token = generateToken(user._id);

    cookieSetter(res, token, true);

    res.status(200).json({
        success:true,
        message:`Welcome back, ${user.name}`,
        user
    })
    
});

export default handler