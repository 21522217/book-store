import express from "express";
import { Book } from "../models/bookModel.js";

import mongoose from "mongoose";

const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      quantity: books.length,
      data: books,
    });
  } catch (error) {
    console.log("Book route error: ", error);
    res.status(500).send({ message: error.message });
  }
});
// Get one book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).send({ message: "Book not found!" });
    }

    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log("Book route error: ", error);
    res.status(500).send({ message: error.message });
  }
});
// Create one book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishedYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send({ book });
  } catch (error) {
    console.log("Book route error: ", error);
    res.status(500).send({ message: error.message });
  }
});
// Update one book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishedYear",
      });
    }

    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).send({ message: "Book not found!" });
    }

    await Book.findByIdAndUpdate(id, req.body);

    return res.status(200).send({ message: "Book updated succesfully!" });
  } catch (error) {
    console.log("Book fail to find by Id!");
    return res.status(500).send({ message: error.message });
  }
});
// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).send({ message: "Book not found!" });
    }

    await Book.findByIdAndDelete(id);

    return res.status(200).send({ message: "Book deleted succesfully!" });
  } catch (error) {
    console.log("Delete error: ", error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
