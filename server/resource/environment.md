${toc}

##### 环境配置

为了我们之后的学习和使用方便，我们需要配置一个webpack的环境

> 注意：webpack和typescript的环境安装依赖node，所以需要先保证电脑上有node和npm环境

**1. 全局安装**

```text
npm i typescript -g
```

**2. 检测是否安装成功（查看版本号）**

```text
tsc -V
```

**3. 新建一个新的目录：LearnTypeScript，并且创建如下的目录结构**

```text
│ index.html
│ webpack.config.js
└─src
    main.ts
```

- index.html是跑在浏览器上的模块文件
- webpack.config.js是webpack的配置信息
- src用于存放我们之后编写的所有TypeScript代码

**4.我们要使用npm来初始化package.json文件：**

```text
npm init -y
```

**5.本地依赖TypeScript**

即便全局安装过TypeScript，也需要本地安装，因为我们之后是通过webpack进行编译我们的TypeScript代码的，并不是通过tsc来完成的，webpack会在本地去查找TypeScript的依赖，所以我们是需要本地依赖TypeScript的。

```text
npm install typescript
```

**6.初始化tsconfig.json文件**

在进行TypeScript开发时，我们会针对TypeScript进行相关的配置，比如指定ts编译的一些参数信息，修改ts编译的输出位置或者增强TypeScript的一些编译功能等等，而这些配置信息是存放在一个tsconfig.json文件中的，我们可以使用以下命令来初始化这个配置文件：

```text
tsc --init
```

运行完命令后，会在项目的根目录下自动生成tsconfig.json文件

我们可以手动修改tsconfig.json中的一些配置项：

```javascript
// 编译过程中需要引入的库文件的列表
"lib": ["ES5","ES2015","ES2016","ES2017","ES2018","ES2019","DOM"] 
//启用实验性的metadata API
"emitDecoratorMetadata": true,
//启用实验性的装饰器，后面学习要用到
"experimentalDecorators": true,
```

**7. 安装webpack相关的依赖**

使用webpack开发和打开，需要依赖webpack、webpack-cli、webpack-dev-server

```text
npm install webpack webpack-cli webpack-dev-server -D
```

8.**添加webpack的其他相关依赖**

依赖一：`ts-loader`

因为我们需要解析.ts文件，所以需要依赖对应的loader：ts-loader

```text
npm install ts-loader -D
```

依赖二：`html-webpack-plugin`

编译后的代码需要对应的html模块作为它的运行环境，所以我们需要使用html-webpack-plugin来将它插入到对应的模板中：

```text
npm install html-webpack-plugin -D
```

依赖三：`clean-webpack-plugin`

每次生成前，先清除目标文件夹下的原有的文件

```text
npm i clean-webpack-plugin -D
```

**9.配置webpack.config.js文件**

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "build.js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    stats: "errors-only", //只在控制台打印错误信息
    compress: false,  //不启用压缩
    host: "localhost",
    port: 8080,
    open:true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
```

同时为了方便启动webpack，我们在package.json中添加如下启动命令

```javascript
"scripts": {
  "serve": "webpack-dev-server --mode=development --config build/webpack.config.js",
  "build":"webpack --mode=production --config webpack.config.js"  
},
```

**10.运行和打包**

在src下的`main.ts`写入测试代码

```typescript
let num:number = 20;
console.log(num)
```

运行`npm start`即可看到效果，如果想打包，则运行`npm run build`即可

