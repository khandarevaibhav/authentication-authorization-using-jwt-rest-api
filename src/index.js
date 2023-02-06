const express = require("express")
const app = express()
const mongoose=require("mongoose")
const menusRouter = require("../routes/menusRoutes")
const userRouter = require("../routes/userRoutes")

//const cors = require("cors")
//dotenv.config();

app.use(express.json())
app.use('/users', userRouter)
app.use('/menu', menusRouter)
//app.use(cors( ))

//middleware like a security if u have id then u can access otherwise no
app.use((req, resp, next)=>{
    console.log("HTTP  Method - " + req.method +", URL -" + req.url);
    next();
});

app.get("/",(req,resp)=>{
    resp.send("Menus API From Vaibhav")
})
//const PORT = process.env.PORT || 5000;

//mongoose.set('strictQuery', false);
mongoose.set("strictQuery", true);

mongoose.connect('mongodb+srv://@cluster0.ydcvsiy.mongodb.net/test?retryWrites=true&w=majority')
    .then((resp)=>app.listen(5000,()=>console.log('listening on port 5000 ')))
    .catch((err)=>console.log(err))


