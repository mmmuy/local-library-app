const Genre = require("../models/genre");
const Book = require("../models/book");

exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort({ name: 1 })
    .exec()
    .then(allGenres => {
      res.render("genre_list", {
        title: "Genre List",
        list_genres: allGenres
      });
    });
};

exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
};

exports.genre_detail = (req, res, next) => {
  // Get details of genre and all associated books (in parallel)
  Promise.all([Genre.findById(req.params.id).exec(), Book.find({ genre: req.params.id }, "title summary").exec()]).then(
    result => {
      let [genre, booksInGenre] = result;
      if (genre === null) {
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }

      res.render("genre_detail", {
        title: "Genre Detail",
        genre: genre,
        genre_books: booksInGenre
      });
    }
  );
};

exports.genre_create_post = (req, res, next) => {
  const genre = new Genre({ name: req.body.name });
  Genre.findOne({ name: req.body.name })
    .collation({ locale: "en", strength: 2 })
    .exec()
    .then(genreExists => {
      if (genreExists) {
        res.redirect(genreExists.url);
      } else {
        genre.save().then(() => {
          res.redirect(genre.url);
        });
      }
    });
};
