const { findById } = require('../../models/Category')
const categoryModel = require("../../models/Category")
const cloudinary=require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dnroacutk', 
    api_key: '956193383899983', 
    api_secret: 'fiAOrevYJW_D-HW7sWgAcNIwMNs',
    // secure: true
  });

class CategoryController{
    static category=async(req,res)=>{
        const data=await categoryModel.find()
        // console.log(data)
        res.render('admin/category/category',{c:data})
    }
    static categoryinsert=async(req,res)=>{
        const file=req.files.image
        const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
            folder:'category_image'
        })
        try{
            const result=new categoryModel({
                title:req.body.title,
                image:{
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }
            })
            await result.save(
                 res.redirect('/admin/category')
            )
        }catch(err){
            console.log(err)
        }
    }
    static categoryview=async(req,res)=>{
        try{
            //   console.log(req.params.id)
            const result=await categoryModel.findById(req.params.id)
            res.render('admin/category/categoryview',{b:result})
        }catch(err){
            console.log(err)
        }
    }
    static categoryedit=async(req,res)=>{
        try{
            const result=await categoryModel.findById(req.params.id)
            res.render('admin/category/categoryedit',{categoryedit:result})
        }catch(err){
            console.log(err)
        }
    }
    static categoryupdate=async(req,res)=>{
        try{
            //image delete
              const categorydata=await categoryModel.findById(req.params.id)
              const imageid=categorydata.image.public_id
              await cloudinary.uploader.destroy(imageid)
              //image update
              const file=req.files.image
              const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
              folder:'category_image'
        })
              const result=await categoryModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                image:{
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }
              })
              await result.save()
              res.redirect('/admin/category')
        }catch(err){
            console.log(err)
        }
    }
    static categorydelete=async(req,res)=>{
        try{
            const categorydata=await categoryModel.findById(req.params.id)
            const imageid=categorydata.image.public_id
            await cloudinary.uploader.destroy(imageid)
             const result=await categoryModel.findByIdAndDelete(req.params.id)
             res.redirect('/admin/category')
        }catch(err){
            console.log(err)
        }
    }
}
module.exports=CategoryController