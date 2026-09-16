import { db } from "../connectionDB.js";

export const bookModel = db.collection('books');
export const authorsModel = db.collection('authors');



