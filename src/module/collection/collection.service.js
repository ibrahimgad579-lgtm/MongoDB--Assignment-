import { db } from "../../DB/connectionDB.js";
import { authorsModel, bookModel } from "../../DB/models/collection.model.js";

export const createBooksCollection = async (req, res, next) => {
    try {
        await bookModel.createCollection("books", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["title"],
                    properties: {
                        title: {
                            bsonType: "string",
                            minLength: 1
                        }
                    }
                }
            },
            validationLevel: "strict",
            validationAction: "error"
        });

        res.status(201).json({
            message: "Books collection created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
};
export const createAuthorsCollection  = async(req,res,next)=>{
    try {
       const author = await authorsModel.insertOne(req.body);
        res.status(202).json({massage:"Author added successfully", author})
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
};
export const createLogsCollection = async (req, res, next) => {
    try {
        await db.createCollection("logs", {
            capped: true,
            size: 1024 * 1024
        });

        res.status(201).json({
            message: "Logs capped collection created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const createBooksIndex = async(req,res ,next)=>{
    try {
        const booksIndex = await db.collection("books").createIndex({title : 1});
        res.status(201).json({
            message: "Index created successfully",
            indexName: booksIndex
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const InsertBook  = async(req,res ,next)=>{
    try {
        const insertBook = await db.collection("books").insertOne(req.body)
        res.status(201).json({
            message: "Book added successfully",
            indexName: insertBook 
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const InsertBooksBatch = async (req, res, next) => {
    try {
        const insertBooksBatch = await db.collection("books").insertMany(req.body);

        res.status(201).json({
            message: "Books added successfully",
            insertBooksBatch
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const InsertLog = async (req, res, next) => {
    try {
        const insertLog = await db.collection("logs").insertOne(req.body);

        res.status(201).json({
            message: "Log added successfully",
            insertLog
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const updateBook = async (req, res, next) => {
    try {
        const update = await db.collection("books").updateOne(
            { title:  req.params.title },
            { $set: { year: 2022 } }
        );

        res.status(200).json({
            message: "Book updated successfully",
            update
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const findBookByTitle = async (req,res,next)=>{
    try {
        const findBook = await db.collection("books").findOne({
            title: req.query.title
        })
        res.status(202).json({
            message: "Book found successfully",
            findBook
        })

        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message  });
    }
};
export const findBooksByYear = async (req, res, next) => {
    try {
        const { from, to } = req.query;

        const findBooks = await db.collection("books").find({
            year: {      $gte: Number(from),
                        $lte: Number(to)
            }
        }).toArray();

        res.status(200).json({
            message: "Books found successfully",
            findBooks
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const skipLimitBooks = async (req, res, next) => {
    try {
        const skipLimit = await db.collection("books")
            .find()
            .sort({ year: -1 })
            .skip(1)
            .limit(2)
            .toArray();

        res.status(200).json({
            message: "Books found successfully",
            skipLimit
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const findBooksWithIntegerYear = async (req, res, next) => {
    try {
        const result = await db.collection("books").find({
            year: {
                $type: "int"
            }
        }).toArray();

        res.status(200).json({
            message: "Books found successfully",
            result
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const deleteBooksBeforeYear = async (req, res, next) => {
    try {
        const { year } = req.query;

        const Delete = await db.collection("books").deleteMany({
            year: {
                $lt: Number(year)
            }
        });

        res.status(200).json({
            message: "Books deleted successfully",
            Delete
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const aggregateBooks = async (req, res, next) => {
    try {
        const Aggregate = await db.collection("books").aggregate([
            {
                $match: {
                    year: {
                        $gt: 2006
                    }
                }
            },
            {
                $sort: {
                    year: -1
                }
            }
        ]).toArray();

        res.status(200).json({
            message: "Books found successfully",
            Aggregate
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const aggregateBooks2 = async (req, res, next) => {
    try {
        const aggregate2 = await db.collection("books").aggregate([
            {
                $match: {
                    year: {
                        $gt: 2006
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    author: 1,
                    year: 1
                }
            }
        ]).toArray();

        res.status(200).json({
            message: "Books found successfully",
            aggregate2
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const aggregateBooks4 = async (req, res, next) => {
    try {
        const aggregate4 = await db.collection("books").aggregate([
            {
                $lookup: {
                    from: "logs",
                    localField: "_id",
                    foreignField: "bookId",
                    as: "logs"
                }
            }
        ]).toArray();

        res.status(200).json({
            message: "Books joined with logs successfully",
            aggregate4
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};