## 从头详细学一遍Express

1.  安装脚手架express-generator
```
// 全局安装
npm install -g express-generator
```

2.  用脚手架创建express应用
```
// express --veiw=模板引擎 项目名称
express --view=pug myapp
```

3.  安装依赖
```
cd myapp
npm install
```

4.  启动服务器
直接通过npm start启动不会看到调试信息，指定DEBUG变量可启用控制台日志记录
```
SET DEBUG=local-library-app:* & npm start
```
启动成功，访问http://localhost:3000/

5.  每次修改都需要重新启动服务器，使用nodemon可以自动重启
```
// 全局安装nodemon
npm install -g nodemon
```
在package.json的script添加新的启动命令devStart
```
"scripts": {
    "start": "node ./bin/www",
    "devStart": "nodemon ./bin/www"
  }
```
使用devStart启动服务器
```
npm run devStart
// 内容修改，服务器自动重启
// [nodemon] restarting due to changes...
// [nodemon] starting `node ./bin/www`
```
<br>
<br>

参考：https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website