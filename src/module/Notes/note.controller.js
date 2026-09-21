import { Router } from "express";
import { createNote, deleteAllNotes, deleteNote, getNoteByContent, getNoteById, getNotesUser, replaceNote, updateNote } from "./note.service.js";

const noteRouter= Router();

noteRouter.post("/",createNote);
noteRouter.patch("/:noteId",updateNote);
noteRouter.put("/replace/:noteId",replaceNote);
noteRouter.delete("/:noteId",deleteNote);
noteRouter.get("/:id",getNoteById);
noteRouter.get("/note-by-content",getNoteByContent);
noteRouter.get("/note-with-user", getNotesUser);
noteRouter.delete("/",deleteAllNotes);


export default noteRouter;