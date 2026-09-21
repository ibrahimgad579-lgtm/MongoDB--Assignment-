import express from "express";
import connectionDb from "./DB/connectionDB.js";
import userRouter from "./module/Users/user.controller.js";
import noteRouter from "./module/Notes/note.controller.js";

const app = express();
const port = 3000;

const bootstrap = async()=>{
    app.use(express.json())
    app.get("/",(req,res,next)=>{res.status(200).json({massage : "Hallo on my app.................."})});

    await connectionDb();
    app.use("/users",userRouter);
    app.use("/notes",noteRouter);


    
    app.use("{/*demoo}",(req,res,next)=>{
        res.status(404).json({massage:`Url:${req.originalUrl} with method ${req.method}`})
    })
    app.listen(port,()=>console.log(`app run on port ${port}`))

}
export default bootstrap