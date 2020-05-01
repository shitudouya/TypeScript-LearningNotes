${toc}

##### 模块

从ECMAScript 2015开始，JavaScript引入了模块的概念，TypeScript也沿用这个概念。

我们先来了解一下ES6和Nodejs中的模块。（ES6模块用法请移步[module](https://es6.ruanyifeng.com/#docs/module)，在这里不再赘述）

在node中，每个模块都有一个module 对象，在该module 对象中，有一个成员叫作exports。当需要向外导出成员时，只需要将成员挂载到module.exports上。

```javascript
//a.js
module.exports.a = 123;
module.exports.b = 'abc';
module.exports.c = {};

//或者
module.exports = {
    a: 123,
    b: 'abc',
    c: {}
}
```

 module.exports 提供了一个别名 exports，exports是module.exports的一个引用，它们共同指向一个地址。也就是说也可以用exports导出成员

```javascript
//a.js
exports.a = 123;
exports.b = 'abc';
exports.c = {};
```

你可以在其它地方使用`require`来加载模块

```javascript
const {a,b,c} = require('./a')
console.log(a,b,c)
```

接下来我们来说说ts中的模块，TypeScript与ECMAScript 2015一样，任何包含顶级`import`或者`export`的文件都被当成一个模块。相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的（因此对模块也是可见的）

##### 导出声明

任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加`export`关键字来导出。

```typescript
export interface People { //导出接口
  info(name:string,age:number):string;
}

export class Person { //导出类
  constructor() {

  }
}

export const sex = "男" //导出常量


export function Hello(name:string,age:number):string { //导出函数
  return `${name}${sex}`
}
```

如果需要对导出的部分重命名，你也可以这样写：

```typescript
function Hello(name:string):string {
  return `${name}`
} 
export {Hello as hello}
```

##### 导入

模块的导入操作与导出一样简单。 可以使用以下 `import`形式之一来导入其它模块中的导出内容。

- 导入一个模块中的某个导出内容

```typescript
//test.ts
export const age = 20;
export const sex = "男"
export const grade = "1922"
```

```typescript
//main.ts
import { age } from "./test";
```

也可以对导入内容重命名

```typescript
import { age as myAge } from "./test";
```

- 将整个模块导入到一个变量，并通过它来访问模块的导出部分

```typescript
import * as info from './test'
console.log(info.age)
console.log(info.sex)
console.log(info.grade)
```

##### 默认导出

每个模块都可以有一个`default`导出。 默认导出使用 `default`关键字标记，并且一个模块只能够有一个`default`导出。

```typescript
//test.ts
export default function Add(num1:number,num2:number):number {
  return num1+num2
}

//main.ts
import myAdd from './test'
console.log(myAdd(2,1))
```

`default`导出也可以是一个值

```typescript
//test.ts
export default "123";

//main.ts
import num from "./test";
console.log(num); // "123"
```

##### 新增特性

CommonJS和AMD的环境里都有一个`exports`变量，这个变量包含了一个模块的所有导出内容。

CommonJS和AMD的`exports`都可以被赋值为一个`对象`, 这种情况下其作用就类似于 es6 语法里的默认导出，即 `export default`语法了。虽然作用相似，但是 `export default` 语法并不能兼容CommonJS和AMD的`exports`。

```typescript
//这里使用ES6的export default语法
export default function Add(num1:number,num2:number):number {
  return num1+num2
}

//这里使用CommonJS和AMD的require语法 错误，不兼容，应该使用和export defalut配套的import语法
//const myAdd = require('./test')
//console.log(myAdd(2,1))
```

为了支持CommonJS和AMD的`exports`, TypeScript提供了`export =`语法。

`export =`语法定义一个模块的导出`对象`。 这里的`对象`一词指的是类，接口，命名空间，函数或枚举。

若使用`export =`导出一个模块，则必须使用TypeScript的特定语法`import module = require("module")`来导入此模块。

```typescript
//test.ts
export = function Add(num1:number,num2:number):number {
  return num1+num2
}

//main.ts
import myAdd = require('./test')
console.log(myAdd(2,1))
```
