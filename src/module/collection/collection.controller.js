import { Router } from "express";
import { InsertBook, createAuthorsCollection, createBooksCollection, createBooksIndex, createLogsCollection } from "./collection.service.js";

const collectionRouter = Router();

collectionRouter.post("/books",createBooksCollection );
collectionRouter.post("/authors",createAuthorsCollection);
collectionRouter.post("/logs/capped",createLogsCollection);
collectionRouter.post("/books/index",createBooksIndex);


export default collectionRouter;