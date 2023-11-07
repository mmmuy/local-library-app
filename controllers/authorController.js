const Author = require("../models/author");
const Book = require("../models/book");

// 显示完整的作者列表
exports.author_list = (req, res, next) => {
  Author.find()
    .sort({ family_name: 1 })
    .exec()
    .then(allAuthors => {
      res.render("author_list", {
        title: "Author List",
        author_list: allAuthors
      });
    });
};

// 为每位作者显示详细信息的页面
exports.author_detail = (req, res) => {
  Promise.all([Author.findById(req.params.id).exec(), Book.find({ author: req.params.id }, "title summary").exec()]).then(
    result => {
      let [author, allBooksByAuthor] = result;
      if (author === null) {
        // No results.
        const err = new Error("Author not found");
        err.status = 404;
        return next(err);
      }
      res.render("author_detail", {
        title: "Author Detail",
        author: author,
        author_books: allBooksByAuthor
      });
    }
  );
};

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res, next) => {
  res.render("author_form", { title: "Create Author" });
};

// 由 POST 处理作者创建操作
exports.author_create_post = (req, res) => {
  const author = new Author({
    first_name: req.body.first_name,
    family_name: req.body.family_name,
    date_of_birth: req.body.date_of_birth,
    date_of_death: req.body.date_of_death
  });

  author.save().then(() => {
    res.redirect(author.url);
  });
};

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res) => {
  res.send("未实现：作者删除表单的 GET");
};

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res) => {
  res.send("未实现：删除作者的 POST");
};

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => {
  res.send("未实现：作者更新表单的 GET");
};

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => {
  res.send("未实现：更新作者的 POST");
};
