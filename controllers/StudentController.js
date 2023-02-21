class StudentController{
    static display=async(req,res)=>{
     try{
       res.send('Hello display')
     } 
     catch(err){
        console.log(err)
     }
    }
    static create=async(req,res)=>{
        try{
          res.send('Hello Create!')
        } 
        catch(err){
           console.log(err)
        }
       }
       static view=async(req,res)=>{
        try{
          res.send('Hello View')
        } 
        catch(err){
           console.log(err)
        }
       }
       static edit=async(req,res)=>{
        try{
          res.send('Hello Edit')
        } 
        catch(err){
           console.log(err)
        }
       }
       static delete=async(req,res)=>{
        try{
          res.send('Hello delete')
        } 
        catch(err){
           console.log(err)
        }
       }
}
module.exports=StudentController