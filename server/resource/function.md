${toc}

##### 函数

和JavaScript一样，TypeScript函数可以创建有名字的函数和匿名函数。

##### 指定函数需要返回的类型

```typescript
//命名函数
function run():string {
    return 'run'
}
//匿名函数
let run1 = function():number {
    return 123
}
//箭头函数
let run2 = ():number =>  {
	return 123
}
```

##### 无返回类型

使用void来指定无返回类型的函数

```typescript
function run(): void {
  console.log("run");
}

let run1 = function(): void {
  console.log("run");
};
```

##### 完整参数的形式

完整的参数包括参数类型和返回值类型。 

```typescript
function getInfo(name:string,age:number):string {
    return `${name}—${age}`
}

let getInfo2 = function(name:string,age:number):string {
	return `${name}—${age}`
}
let getInfo3 = (name: string, age: number): string => {
  return `${name}-${age}`;
};
```

##### 方法可选参数

JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 在TypeScript里我们可以在参数名旁使用 `?`实现可选参数的功能

> 注意：可选参数必须配置到参数的最后面

```typescript
function getInfo(name: string, age?: number): string {
  if (age) {
    return `${name}—${age}`;
  } else {
    return `${name}—年龄保密`;
  }
}
console.log(getInfo("xtd"));
console.log(getInfo("xtd", 23));
```

##### 默认参数 

在TypeScript里，我们也可以为参数提供一个默认值，当用户没有传递这个参数或传递的值是`undefined`时，ts就会选取为默认给的这个值。比如下面这个例子，当用户传入age参数时，则会选取用户传入的age值`12`，如果没有传入，则会选取默认的值`20`

```typescript
function getInfo(name:string,age:number=20):string {
  return `${name}--${age}`
}
console.log(getInfo("土豆",12))
console.log(getInfo("土豆"))
```

另外，与可选参数不同，带默认值的参数不需要放在必须参数的后面，你也可以放在前面，但是，如果你第一个参数不想传入参数，就必须使用`undefined`进行占位处理以便获得默认值

```typescript
function getInfo(age:number=20,name:string):string {
  return `${name}--${age}`
}
console.log(getInfo(12,"土豆")) 
console.log(getInfo(undefined,"土豆")) //第一个参数使用undefined进行占位处理
```

##### 剩余参数

有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 `arguments`来访问所有传入的参数。

例如下面，我想实现一个需求，无论外面传入多少参数进来，我都可以对它们实现相加求和操作

```javascript
function add() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

console.log(add(1, 2));
console.log(add(1, 2, 3));
console.log(add(1, 2, 3, 4));
console.log(add(1, 2, 3, 4, 5));
//...
```

而在TypeScript里，你可以把所有参数收集到一个变量里：

```typescript
function sum(...scores: number[]): number {
  var sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum;
}
console.log(sum(1, 2, 3, 4));
```

当前你也可以这样写

```typescript
function sum2(name: string, age: number, ...scores: number[]): string {
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return `我叫${name},我今年${age}，我的分数是${sum}`;
}
console.log(sum2("xtd", 23, 1, 2, 3, 4));
```

##### 函数重载

函数重载就是同一个函数，根据传递的参数不同，会有不同的表现形式。在JS中本身不支持重载的，而在TS中使用可以"变通"的支持重载：

1.先申明所有方法重载的定义，不包含方法的实现；

2.再声明一个参数为any类型的重载方法，内部进行很多的逻辑判断

也就是说有时候你会有这样一个需求：

我可以定义一个函数，根据用户给我传入的参数不相同，我能做不同的事，例如在下面的例子中，我定义一个add方法，当用户给我传入俩个number类型的数据时，我可以把它们进行相加操作，当传入俩个字符串类型的数据时，我可以把它们中间用`-`拼接起来。

```typescript
//1.先申明所有方法重载的定义，不包含方法的实现；
function add(a: number, b: number): number;
function add(a: string, b: string): string;
//2.再声明一个参数为any类型的重载方法，内部进行很多的逻辑判断
function add(a: any, b: any): any {
  if (typeof a === "string" && typeof b === "string") {
    return a + "-" + b;
  } else if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
}
console.log(add(1, 2));
```