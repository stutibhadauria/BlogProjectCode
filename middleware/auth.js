const jwt=require('jsonwebtoken')
const adminModel=require('../models/admin')
const admin_auth=async(req,res,next)=>{
    // console.log('hello admin')
    try{
    const{token}=req.cookies
    // console.log(token)
    const verify_token=jwt.verify(token,'stuti_software_engineer')
    // console.log(verify_token)
    const admin_data=await adminModel.findOne({_id:verify_token.id})
    // console.log(admin_data)
    req.admin=admin_data
    next()
    }catch(err){
        res.redirect('/login')
    }
}

module.exports=admin_auth