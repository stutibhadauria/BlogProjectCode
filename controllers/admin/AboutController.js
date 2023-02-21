const AboutModel = require("../../models/about")

class AboutController{
    static aboutdisplay=async(req,res)=>{
        const data=await AboutModel.find()
        res.render('admin/about/aboutdisplay',{a:data})
    }
    static aboutedit=async(req,res)=>{
        try{
             const result =await AboutModel.findById(req.params.id)
             res.render('admin/about/aboutedit',{aboutedit:result})
        }catch(err){
            console.log(err)
        }
    }
    static aboutupdate=async(req,res)=>{
        try{
            const result=await AboutModel.findByIdAndUpdate(req.params.id,{
                description:req.body.description
            })
            await result.save()
            res.redirect('/admin/about')
        }catch(err)
        {
            console.log(err)
        }
    }
}
module.exports=AboutController