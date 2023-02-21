const mongoose=require('mongoose')


const url1="mongodb+srv://stutibhadauria12345:123456789stuti@cluster0.ngymumh.mongodb.net/blogproject?retryWrites=true&w=majority"
//const uri ="mongodb+srv://admission123:12345678V@cluster0.b0ibf.mongodb.net/blog123?retryWrites=true&w=majority"
const connectdb=()=>{
    // return mongoose.connect('mongodb://0.0.0.0:27017/blogWebsite')
    return mongoose.connect(url1)
    .then(()=>{
       console.log('connection succcessfully!!')
    })
    .catch((err)=>{
        console.log(err)
    })
}
mongoose.set('strictQuery', false);
module.exports=connectdb