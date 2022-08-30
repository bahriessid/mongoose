const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")

dotenv.config()
const app=express()
app.use(express.json())
const PORT=process.env.PORT
mongoose.connect(process.env.MONGO_URI,err=>err? console.log(err):console.log("database connected"))

const userSchema=mongoose.Schema({
    name:String,
    email:{type:String,required:true,
        unique:true},
    age:Number,
    favouriteFood:{type : [String],
        required:true
    }
})
const User=mongoose.model('User',userSchema)

app.get('/api/users',async (req,res)=>{
    const newUser= await User.find()
    res.json(await newUser)
})
app.post('/api/users',async (req,res)=>{
    const addUser= await new User(req.body)
    res.json(await addUser.save())
})
app.put('/api/users/:id',async (req,res)=>{
    const updateUser= await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(await updateUser.save())
})
app.delete('/api/users/:id',async (req,res)=>{
    const deleteUser=await User.findByIdAndDelete(req.params.id)
    res.json(await deleteUser)
})

app.listen(PORT,err=>err? console.log(err):console.log(`server is connected ${PORT}`))