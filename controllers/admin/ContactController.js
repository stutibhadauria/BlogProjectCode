const contactModel = require("../../models/contact")

class ContactController{
    static display =async(req,res)=>{
        const data=await contactModel.find()
        res.render('contact',{c:data})
    }
    static contactinsert=async(req,res)=>{
        try{
             const result=new contactModel({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                message:req.body.message
             })
              await result.save()
              res.redirect('/contact')
        }
        catch(err){
            console.log(err)
        }
    }
    static contactview=async(req,res)=>{
        try{
             const result=await contactModel.find()
             res.render('admin/contact/contact',{c:result})
        }
        catch(err){
            console.log(err)
        }
    }
}
module.exports=ContactController