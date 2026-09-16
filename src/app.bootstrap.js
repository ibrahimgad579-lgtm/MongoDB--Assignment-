import express from "express";
import { connectionDb } from "./DB/connectionDB.js";
import collectionRouter from "./module/collection/collection.controller.js";
import { InsertBook, InsertBooksBatch, InsertLog, aggregateBooks, aggregateBooks2, aggregateBooks4, deleteBooksBeforeYear, findBookByTitle, findBooksByYear, findBooksWithIntegerYear, skipLimitBooks, updateBook } from "./module/collection/collection.service.js";

const app = express();
const port = 3000;

const bootstrap = async()=>{
    app.use(express.json())
    app.get("/",(req,res,next)=>{res.status(200).json({massage : "Hallo on my app.................."})});


    await connectionDb()
    app.use("/collection", collectionRouter);
    app.post("/books",InsertBook)
    app.post("/books/batch", InsertBooksBatch);
    app.post("/logs", InsertLog);
    app.patch("/books/:title",updateBook);
    app.get("/books/title",findBookByTitle);
    app.get("/books/year",findBooksByYear);
    app.get("/books/skip-limit",skipLimitBooks);
    app.get("/books/year-integer",findBooksWithIntegerYear);
    app.get("/books/before-year",deleteBooksBeforeYear);
    app.get("/books/aggregate1",aggregateBooks);
    app.get("/books/aggregate2",aggregateBooks2);
    app.get("/books/aggregate4",aggregateBooks4)




    app.use("{/*demoo}",(req,res,next)=>{
        res.status(404).json({massage:`Url:${req.originalUrl} with method ${req.method}`})
    })
    app.listen(port,()=>console.log(`app run on port ${port}`))

}
export default bootstrap