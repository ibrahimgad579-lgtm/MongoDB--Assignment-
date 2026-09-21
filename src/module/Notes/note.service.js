import noteModel from "../../DB/models/note.model.js";
import userModel from "../../DB/models/user.model.js";

export const createNote = async (req,res,next)=>{
    try {
        const { userId } = req.query;
    const { title, content } = req.body;
    
    const user = await userModel.findById(userId);
    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    };
    const note = await noteModel.create({
        title,
        content,
        userId
    });
    res.status(201).json({
        message: "Note created successfully",
        note
    });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
        }
};
export const updateNote = async (req, res, next) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.query;
        const { title, content } = req.body;

        const note = await noteModel.findById(noteId);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        if (note.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not the owner of this note"
            });
        }

        const updatedNote = await noteModel.findByIdAndUpdate(
            noteId,
            {
                title,
                content
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};
export const replaceNote = async (req, res, next) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.query;

        const note = await noteModel.findById(noteId);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        if (note.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not the owner of this note"
            });
        }

        const { title, content } = req.body;

        const updatedNote = await noteModel.findOneAndReplace(
            { _id: noteId },
            {
                title,
                content,
                userId
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Note replaced successfully",
            note: updatedNote
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};
export const deleteNote = async (req, res, next) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.query;

        const note = await noteModel.findById(noteId);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        if (note.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not the owner of this note"
            });
        }

        const deletedNote = await noteModel.findByIdAndDelete(noteId);

        res.status(200).json({
            message: "Note deleted successfully",
            note: deletedNote
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};
export const getNoteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        const note = await noteModel.findById(id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        if (note.userId.toString() !== userId) {
            return res.status(404).json({
                message: "You are not the owner of this note"
            });
        }

        res.status(200).json({
            message: "Note found successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};
export const getNoteByContent = async (req, res, next) => {
    try {
        const { content, userId } = req.query;

        const note = await noteModel.findOne({
            content,
            userId
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note found successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};
export const getNotesUser = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const notes = await noteModel
            .find({ userId })
            .select("title userId createdAt")
            .populate("userId", "email");

        res.status(200).json({
            message: "Notes retrieved successfully",
            notes
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};
export const deleteAllNotes = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const result = await noteModel.deleteMany({
            userId
        });

        res.status(200).json({
            message: "All notes deleted successfully",
            result
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};