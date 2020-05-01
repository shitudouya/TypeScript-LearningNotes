${toc}

##### 声明方式

typescript中可以使用`var`，`let`，`const`进行变量的声明

##### 三者区别

- var：只有全局作用域和函数作用域概念，没有块级作用域的概念，而let和const声明形成块作用域

```javascript
if(1){
    var a = 100;
    let b = 10;
}

console.log(a); // 100
console.log(b)  // 报错：b is not defined  ===> 找不到b这个变量
```

- var声明的变量会挂载在window上，let，const不会

```javascript
var a = 100;
console.log(a,window.a);    // 100 100

let b = 10;
console.log(b,window.b);    // 10 undefined

const c = 1;

console.log(c,window.c);    // 1 undefined
```

- var声明变量存在变量提升，let和const不存在变量提升

```javascript
console.log(a); // undefined  ===>  a已声明还没赋值，默认得到undefined值
var a = 100;

console.log(b); // 报错：b is not defined  ===> 找不到b这个变量
let b = 10;

console.log(c); // 报错：c is not defined  ===> 找不到c这个变量
const c = 10;
```

- let和const不能声明同名变量，而var可以

```javascript
var a = 100;
console.log(a); // 100

var a = 10;
console.log(a); // 10
let a = 100;
let a = 10;
//  控制台报错：Identifier 'a' has already been declared  ===> 标识符a已经被声明了。
```

##### const一些细节

1、一旦声明必须赋值

```typescript
const a; //错误，一旦声明必须赋值
const a = 20; //正确
```

2、声明后不能再修改

```typescript
const a = 20;
a = 20  //错误，声明后不允许改变
```

3、如果声明的是复合类型数据，可以修改其属性：因为const只是限制栈空间的地址不可更改，并没有限制堆空间的属性不可修改。

```typescript
const obj = {
  name:'xtd',
  age:23,
  sex:"男"
}

obj.name = "哈哈" //可以修改
obj = {} //错误,不允许修改
console.log(obj)
```

##### 更多

更多关于let和const的说明，请看这里 [https://es6.ruanyifeng.com/#docs/let](https://es6.ruanyifeng.com/#docs/let)