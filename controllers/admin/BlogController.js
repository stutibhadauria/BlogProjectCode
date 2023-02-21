const { findById } = require('../../models/Blog')
const BlogModel=require('../../models/Blog')
const cloudinary=require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dnroacutk', 
    api_key: '956193383899983', 
    api_secret: 'fiAOrevYJW_D-HW7sWgAcNIwMNs',
    // secure: true
  });

class BlogController{
    static blogdisplay=async(req,res)=>{
        const data=await BlogModel.find()
        //console.log(data)
        res.render('admin/blog/blogdisplay',{d:data})
    }
    static bloginsert=async(req,res)=>{
        const file=req.files.image
        const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
            folder:'blogs_image'
        })
        try{
           const result=new BlogModel({
            title:req.body.title,
            description:req.body.description,
            image: {
                     public_id: myimage.public_id,
                     url: myimage.secure_url                     
                 }
           })
           await result.save(
            res.redirect('/admin/blogdisplay')//url of route
           )
        }catch(err){
             console.log(err)
        }
        // console.log(myimage)
    }
    static blogview=async(req,res)=>{
        // console.log(req.params.id)
        try{
            const result=await BlogModel.findById(req.params.id)
            // console.log(result)
            res.render('admin/blog/blogview',{b:result})
        }catch(err){
            console.log(err)
        }
    }
    static blogedit=async(req,res)=>{
       // console.log(req.params.id)
       try{
            const result=await BlogModel.findById(req.params.id)
            res.render('admin/blog/blogedit',{blogedit:result})
       }catch(err)
       {
        console.log(err)
       }
    }
    static blogupdate=async(req,res)=>{
        try{
            // console.log(req.params.id)
            // console.log(req.body)
            //image delete
            const blogdata=await BlogModel.findById(req.params.id)
            const imageid=blogdata.image.public_id
            // console.log(imageiid)
            await cloudinary.uploader.destroy(imageid)
            //image update
            const file=req.files.image
            const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
            folder:'blogs_image'
            })

            const result=await BlogModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url                     
                }
            })
            await result.save()
             res.redirect('/admin/blogdisplay')
        }catch(err){
            console.log(err)
        }
    }
    static blogdelete=async(req,res)=>{
        try{
            const blogdata=await BlogModel.findById(req.params.id)
            const imageid=blogdata.image.public_id
            await cloudinary.uploader.destroy(imageid)
            
            const result=await BlogModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/blogdisplay')
        }catch(err){
            console.log(err)
        }
    }
    
}module.exports=BlogController