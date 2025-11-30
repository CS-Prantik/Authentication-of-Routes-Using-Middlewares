const express=require('express')
const router=express.Router()
const User=require("../Models/Models")
const authMiddleware=require("../OAUTH/auth")
const CheckAccess=require("../OAUTH/checkaccess")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.post("/register",async(req,res)=>{
  try 
  {
      const {name,email,password,role}=req.body
      const hashpassword=await bcrypt.hash(password,10)
      const user=new User({name,email,password:hashpassword,role})
      await user.save()
      res.status(201).json({message:"User Registered Succesfully"})

   } 
   catch (error) 
   {
       console.log(error)
       return res.status(500).json({message:"Invalid Details"})
   }
}
)
router.post("/login",async(req,res)=>{

       const {email,password}=req.body
       const data=await User.findOne({email})
       if(!data)
       return res.status(401).json({message:"Invalid Details"})
       
       const validpassword=await bcrypt.compare(password,data.password)
       
       if(!validpassword)
        return res.status(401).json({message:"Invalid Password"})

       const token=jwt.sign({_id:data._id,role:data.role},process.env.Private_key,{expiresIn:"1hr"})
       return res.status(201).json({message:"Login Succesfull",token:token})
})

router.get("/confirm",authMiddleware,CheckAccess("admin"),(req,res)=>{
    res.status(201).json({message:"heelo",user:req.user})
})


router.put("/update",authMiddleware,CheckAccess("admin"),async(req,res)=>{
        try
        {
       const {_id}=req.user
       const {newrole}=req.body //body has given by postman i.e {"newrole":"user"}
       const result=await User.findByIdAndUpdate(_id,{$set:{role:newrole}},{new:true})
       if(!result)
       res.status(401).json({message:"Error in Updating Details"})
       else
       {
       res.status(200).json({message:"User Data Updated Succesfully",data:result})
       }
        }
        catch(err)
        {
            console.log(err)
            res.status(500).json({message:"Invalid Credentials"})
        }
})
router.delete("/delete",authMiddleware,CheckAccess("admin"),async(req,res)=>{
    try
    {
    const {_id}=req.user
    const result=await User.findByIdAndDelete(_id)
    if(!result)
    {
        res.status(401).json({message:"Invalid Id"})

    }
    else
    {
        res.status(201).json({message:"User Id Deleted Succesfuuly",data:result})
    }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Id Doesn't Exist"})
    }
})





module.exports=router