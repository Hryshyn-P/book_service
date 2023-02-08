import joi from "joi";
import { Types } from "mongoose";
import { joiOptions } from "../init/app.js";
import BookModel from "../models/book.js";

// Get all books with pagination
export const getAllBooks = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  BookModel.find()
    .skip(startIndex)
    .limit(limit)
    .then((books) => res.send(books))
    .catch(next);
};

// Get a single book by ID
export const getBookById = (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Invalid ID");
  BookModel.findById(req.params.id)
    .then((book) => {
      if (!book) return res.status(404).send("Book not found");
      res.send(book);
    })
    .catch(next);
};

// Add a new book
export const addBook = (req, res, next) => {
  const schema = joi.object().keys({
    title: joi.string().required(),
    author: joi.string().required(),
  });
  const result = schema.validate(req.body, joiOptions);
  if (result.error) return res.status(400).send(result.error.details[0].message);

  const book = new BookModel({
    title: req.body.title,
    author: req.body.author,
  });
  book
    .save()
    .then((book) => res.send(book))
    .catch(next);
};

// Update a book by ID
export const updateBook = (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Invalid ID");

  const schema = joi.object().keys({
    title: joi.string().required(),
    author: joi.string().required(),
  });

  const result = schema.validate(req.body, joiOptions);
  if (result.error) return res.status(400).send(result.error.details[0].message);

  BookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((book) => {
      if (!book) return res.status(404).send("Book not found");
      res.send(book);
    })
    .catch(next);
};

// Delete a book by ID
export const deleteBook = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Invalid ID");
  try {
    const book = await BookModel.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send("Book not found.");
    res.send(book);
  } catch (err) {
    next(err);
  }
};
