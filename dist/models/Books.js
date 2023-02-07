"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Book = (0, mongoose_1.model)("Book", BookSchema);
exports.default = Book;
