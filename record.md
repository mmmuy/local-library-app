1.  报错1
```
MongooseError: Model.count() no longer accepts a callback
```
Mongoose在2月做了一个新的更新，Mongoose现在已经不能这样回调了
现在只能使用.then()和.catch()来处理了

```
// book_count: function (callback) {
//    Book.count({}, callback);
// }
// ——>
book_count: function (callback) {
    Book.count({}).then(callback);
}
```

2.  报错2

```
MongooseError: Operation `books.count()` buffering timed out after 10000ms
```

3.  使用Model.countDocuments()获取不到数量，以为是api使用有问题，最后发现是连接到了mongodb但没有连接到数据库
```
// const mongoDB = "mongodb+srv://test0:123654@cluster0.m7bwkmk.mongodb.net";
// ——>
const mongoDB = "mongodb+srv://test0:123654@cluster0.m7bwkmk.mongodb.net/local_library";
```
(Model.count()被废弃)

4.  报错3

访问 /catalog/book/create 时报错
```
UnhandledPromiseRejectionWarning: CastError: Cast to ObjectId failed for value "create" (type string) at path "_id" for model "Author"
```
问题在于路由的顺序
```
router.get("/author/:id", author_controller.author_detail);

router.get("/author/create", author_controller.author_create_get);
```
以上这样的路由顺序，当访问 /author/create 时会先匹配 /author/:id，应把路由 /author/:id 放最后


