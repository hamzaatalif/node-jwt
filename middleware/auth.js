const CustomAPIError = require("../errors/custom-error")
const jwt = require("jsonwebtoken")

const authMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new CustomAPIError("Please provide token.", 401)
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)     
        const {id,username}    = decoded
        req.user = {id,username}
    } catch (error) {
        throw new CustomAPIError("You are not authorized to access this route!.", 401)
    }
    next();
}


module.exports = authMiddleware;