const mongoose=require('mongoose')


//define schema
const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    }
},{timestamps:true})

//create collection             
const categoryModel=mongoose.model('category',categorySchema)
module.exports=categoryModel