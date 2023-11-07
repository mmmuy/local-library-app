// 导入模型
const Author = require("../models/author");
const Book = require("../models/book");
const BookInstance = require("../models/bookinstance");
const Genre = require("../models/genre");

const async = require("async");

// GET 获取藏书编目主页
exports.index = function (req, res) {
  // 多任务并行，获取各模型实例数量
  async.parallel(
    {
      book_count: function (callback) {
        Book.countDocuments({}).then(function (res) {
          callback(null, res);
        });
      },
      book_instance_count: function (callback) {
        BookInstance.countDocuments({}).then(res => {
          callback(null, res);
        });
      },
      book_instance_available_count: function (callback) {
        BookInstance.countDocuments({ status: "Available" }).then(res => {
          callback(null, res);
        });
      },
      author_count: function (callback) {
        Author.countDocuments({}).then(res => {
          callback(null, res);
        });
      },
      genre_count: function (callback) {
        Genre.countDocuments({}).then(res => {
          callback(null, res);
        });
      }
    },
    function (err, results) {
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results
      });
    }
  );
};

// GET 请求添加新的藏书
exports.book_create_get = (req, res, next) => {
  Promise.all([Author.find().exec(), Genre.find().exec()]).then(result => {
    res.render("book_form", {
      title: "Create Book",
      authors: result[0],
      genres: result[1]
    });
  });
};

// POST 请求添加新的藏书
exports.book_create_post = (req, res) => {
  res.send("未实现：添加新的藏书");
};

// GET 请求删除藏书
exports.book_delete_get = (req, res) => {
  res.send("未实现：删除藏书");
};

// POST 请求删除藏书
exports.book_delete_post = (req, res) => {
  res.send("未实现：删除藏书");
};

// GET 请求更新藏书
exports.book_update_get = (req, res) => {
  res.send("未实现：更新藏书");
};

// POST 请求更新藏书
exports.book_update_post = (req, res) => {
  res.send("未实现：更新藏书");
};

// GET 请求藏书
exports.book_detail = (req, res) => {
  Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({ book: req.params.id }).exec()
  ]).then(result => {
    let [book, bookInstances] = result;
    if (book === null) {
      // No results.
      const err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }

    res.render("book_detail", {
      title: book.title,
      book: book,
      book_instances: bookInstances
    });
  });
};

// GET 请求完整藏书列表
exports.book_list = (req, res, next) => {
  Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec()
    .then(list_books => {
      res.render("book_list", { title: "Book List", book_list: list_books });
    });
};
