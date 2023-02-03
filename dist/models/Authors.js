import { Schema, model } from "mongoose";
const AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Author = model("Author", AuthorSchema);
export default Author;
