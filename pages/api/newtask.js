import { checkAuth, connectDB } from "@/utils/features";
import {Task} from "../../models/Task";
import { asyncError, errorHandler } from "@/middleware/error";


const handler = asyncError(async(req, res) => {

    await connectDB();

    const {title, description} = req.body;
    if(!title || !description) 
    return errorHandler(res, 404, "Please Enter all Fields.");

    if(req.method!=="POST")
    return errorHandler(res, 400, "POST method is not allowed.");

    const user = await checkAuth(req);
    if(!user) return errorHandler(res, 401, "Login First.");

    await Task.create({
        title,
        description,
        user:user._id
    })

    res.json({
        success:true,
        message:"Task Created"
    })

});

export default handler;