const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");

exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate("book")
    .exec()
    .then(list_bookinstances => {
      // Successful, so render
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: list_bookinstances
      });
    });
};

exports.bookinstance_detail = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec()
    .then(bookInstance => {
      if (bookInstance === null) {
        // No results.
        const err = new Error("Book copy not found");
        err.status = 404;
        return next(err);
      }

      res.render("bookinstance_detail", {
        title: "Book:",
        bookinstance: bookInstance
      });
    });
};

exports.bookinstance_create_get = (req, res, next) => {
  Book.find({}, "title")
    .exec()
    .then(allBooks => {
      res.render("bookinstance_form", {
        title: "Create BookInstance",
        book_list: allBooks
      });
    });
};

exports.bookinstance_create_post = (req, res, next) => {
  const bookInstance = new BookInstance({
    book: req.body.book,
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due_back
  });

  bookInstance.save().then(() => {
    res.redirect(bookInstance.url);
  });
};
