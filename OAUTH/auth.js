const jwt=require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{

     const authHeader=req.headers.authorization;
     console.log("Auth Header",authHeader)
     if(!authHeader)
     return res.status(401).json({message:"Invalid Header"})
     
     const token=authHeader.split(" ")[1]
     if(!token)
     return res.status(401).json({message:"Invalid Token"})

     const decoded=jwt.verify(token,process.env.Private_key)
     req.user=decoded;

     next();
}
module.exports=authMiddleware