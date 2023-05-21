
export const errorHandler = (res, StatusCode=500, message="Internal Server Error.") => {
    return res.status(StatusCode).json({
        success:false,
        message
    })
};


export const asyncError = (passedFunc) => (req, res) => {
    return Promise.resolve(passedFunc(req,res)).catch((err)=>{
        return errorHandler(res, 500, err.message);
    });
}