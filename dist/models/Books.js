import { Schema, model } from "mongoose";
const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Book = model("Book", BookSchema);
export default Book;
