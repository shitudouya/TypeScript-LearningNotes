## TypeScript-LearningNotes

TypeScript学习笔记（基于React + Ant Design + markdown-it）

中文文档地址：[https://ts.tudoublog.com/preface](https://ts.tudoublog.com/preface)

当前版本：`0.0.1`

最新更新：`2020/5/1`

### 1.安装并启动

**后台**

`cd server`

`npm i`

`node app.js` 或 `nodemon app.js`

**客户端**

`npm i`

`npm start`

### 2.代码高亮

由于React配置问题，部分代码不高亮显示，你需要手动修改配置高亮

依次定位到客户端`node_modules`→`react-scripts`→`config`→`webpack.config.js`

找到`babel`字样，大概391行，修改babelrc: true，重新启动项目即可。
