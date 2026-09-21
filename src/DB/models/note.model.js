import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: [
            function (value) {
                return /[a-z]/.test(value);
            },
        ]
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    
},{
    timestamps: true
}
);
const noteModel = mongoose.model("Note",noteSchema);

export default noteModel;