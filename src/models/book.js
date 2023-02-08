import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: String,
    author: String,
});

const BookModel = model("Book", bookSchema);

export default BookModel;