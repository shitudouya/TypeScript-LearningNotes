${toc}

##### 接口

在之前的学习中，当我们需要对传入的参数进行限制的时候，你可以这么写

```typescript
function printInfo(name:string,age:number,sex:string):string {
    return `name:${name},age:${age},sex:${sex}`
}
console.log(printInfo("土豆",23,"男"))
```

这样确实可以对传入的参数进行校验，防止出现错误的调用，但是我们在定义函数的时候，参数的类型和函数的类型都是非常长的，一旦项目过大可能阅读非常困难，显得不那么直观，而且，如果有很多的地方也需要进行相同的约束条件，那么你需要写很多遍，这样代码就会出现冗余。

这时候，我们就需要将这些约束“抽取”出来，相当于统一的定义一种约束和规范，一旦有人“实现”了我们这样一种规范，就必须遵循这些约束条件。

而接口就是这样的一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用，接口定义了某一批类所需要遵守的规范，接口不需要关心这些类的内部状态数据，也不关心这些类里面方法的具体实现细节，它只规定这批类里面必须提供的某些方法，提供这些方法的类就可以满足实际需要，typescript中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。

和其他很多的语言类似，TypeScript中定义接口也是使用`interface`关键字来定义：

```typescript
//需求：必须传入对象，对象里面必须有name和age，name为string,age为number,sex为string
interface info {
  name:string;
  age:number;
  sex:string;
}

function printInfo(student:info) {
  return `name:${student.name},age:${student.age},sex:${student.sex}`
}

console.log(printInfo({name:'xtd',age:23,sex:"男"}))
//注意：传的参数必须和接口提供的参数一致，在这里，不能增加或修改或减少传入的参数
```

定义接口中不仅仅可以有属性，当然也可以有方法：

```typescript
interface Person {
  name: string;
  run(): void;
  eat(): void;
}
const p: Person = {
  name: "xtd",
  run() {
    console.log("running");
  },
  eat() {
    console.log("eating");
  },
};

```

##### 可选接口

默认情况下一个变量（对象）实现对应的接口时，那么这个变量（对象）必须实现接口中所有的属性和方法。

但是，开发中为了让接口更加的灵活，某些属性我们可能希望设计成可选的，也就是说接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 这时候可以在属性后面添加`?`表示可选，你也可以在代码中进行逻辑判断，当用户提供这些可选属性的时候做一些操作

```typescript
interface info {
  name: string;
  age: number;
  gender?: boolean;
}

function printInfo(student: info) {
  console.log(student.name + student.age + (student.gender ? student.gender : ""));
}

printInfo({
  name: "xtd",
  age: 23
});
```

##### 接口只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly`来指定只读属性

```ts
interface FullName {
  readonly firstName: string;
  readonly lastName: string;
}
```

你可以通过赋值一个对象字面量来构造一个`FullName`。 第一次赋值后， `firstName`和`lastName`再也不能被改变了。

```typescript
let dxx: FullName = {
  firstName: "豆",
  lastName: "欣欣"
};
// dxx.firstName = '嘿'  error 不能二次赋值
```

此外，TypeScript具有`ReadonlyArray<T>`类型，它与`Array<T>`相似，只是把所有可变方法去掉了，这样的话，可以确保一个数组在创建后再也不能被随意的修改，保证了安全性

```typescript
let arr: ReadonlyArray<number> = [1, 2, 3, 4, 5];
//arr[0] = 2

console.log(arr);
```

##### 额外的属性检查

考虑有下列代码

```typescript
interface Students {
  name: string;
  age: number;
}

function getInfo(student: Students):string{
  return `我是名字是${student.name},年龄是${student.age},`
}

let studentInfo = getInfo({
  name: "xtd",
  age:23,
});

console.log(studentInfo);
```

可以看到上述代码定义一个接口必须传入的属性`name`和`age`，并且`getInfo`方法使用了该接口，故调用`getInfo`方法必须传入`name`和`age`属性，但是有时候，我们可能想在`不额外定义接口属性`的情况下，传入其它的属性，例如这样

```typescript
let studentInfo = getInfo({
  name: "xtd",
  age:23,
  sex:'男', 
  grade:'1922'
});
```

但是上诉代码在该例子中会报错，因为前面定义的接口传入的属性只能是`name`和`age`，在这里却多传入了`sex`和`grade`属性，也就是说，如果一个对象字面量存在任何“目标类型”不包含的属性时，ts就会认为这是一个错误。

但是毕竟如果接口属性很多的话，我们一个一个去定义可能就会很麻烦，也许你想在不额外增加接口属性的条件下传入自己定义的属性，防止ts去检查到错误。绕开这些检查非常简单。 

第一种最简便的方法是使用类型断言

```typescript
let studentInfo = getInfo({
  name: "xtd",
  age:23,
  sex:'男',
  grade:'1922'
} as Students);
```

第二种最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性（也就是说你自己自定义添加的这个属性是有意义的，是有额外的用途的，而不是纯粹为了好玩）

```typescript
interface Students {
  name: string;
  age: number;
  [propsName:string]:any //添加一个字符串索引签名
}
```

`[propsName:string]:any`可以分两部分看，`[propsName:string]`相当于一个键，对象中的属性本身是一个`string`类型，而不是number，boolean或其他类型，`any`相当于一个值，这个值是`any`类型，也就是任意类型

##### 函数类型接口

函数类型接口可以对方法传入的参数，以及返回值进行约束

需求：比较个数字的大小，如果传入的第一个大，返回`true`，否则返回`false`

先看一个比较常规的用法：

```typescript
interface Compare {
  (first: number, last: number): boolean;
}

let MyCompare: Compare = function(first: number, last: number): boolean {
  return first > last;
};

console.log(MyCompare(2, 1));
```

在上面的例子中，定义了一个`Compare`函数类型的接口，`first`和`last`分别为传入的参数，并对它们进行了`number`类型的限制，并规定了函数的返回类型必须是`boolean`类型，接着使用匿名函数表达式的形式使用了该接口，可以看到，在这个匿名函数中也对传入的参数，以及返回值进行了和接口相同的约束，有同学可以会有疑问：

```typescript
let MyCompare = function(first: number, last: number): boolean {
  return first > last;
};

console.log(MyCompare(2, 1));
```

我这样不是也是可以，为什么还要用接口显得多此一举? 考虑以下代码

```typescript
interface Compare {
  (first: number, last: number): boolean;
}

let MyCompare: Compare = function(first: number, last: number,xxx:xxx): boolean {
  return first > last;                                      //报错，不存在xxx
};

```

可以看到，如果不小心多传入不必要的参数，ts就会报错，事实上，ts的这种设计，使得程序的安全性和健壮性会更好，接口时一种规范，是一种约束，一般用于团队的合作，接口的约束不仅仅是自己要遵循，其他人也要遵循，不能随意的增加和减少，在大型项目上，接口的这种约束是非常必要的

当然，常规的写法还可以`瘦身`

```typescript
interface Compare {
  (first: number, last: number): boolean;
}

let MyCompare = function(f: number, l: number): boolean {
  return f > l;
};

console.log(MyCompare(2, 1));
```

可以看到，函数的参数名不需要与接口里定义的名字相匹配，可以自己定义（实际项目中最好保证语义化），只要保证基本形式和接口约束的一致即可

接着我们还可以继续`瘦身`

```typescript
interface Compare {
  (first: number, last: number): boolean;
}

let MyCompare: Compare = function(a, b) {
  return a > b;
};

console.log(MyCompare(2, 1));
```

 可以看到，在函数中，我们也可以不需要指定参数类型和返回的类型，如果你不想指定类型，TypeScript的类型系统会推断出参数类型

##### 可索引类型接口

可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。主要使用来对数组/对象的约束（不常用，几乎不会用到）

例如我有一个对象：要求键和值都是string类型，就可以这么来定义

```typescript
interface userObj {
  [index: string]: string;
}

let newUser: userObj = {
  name: "xtd",
  age: "23", //注意只能是string
  sex: "男"
};
console.log(newUser);
```

`[index:string]:string`可以看成俩个部分：

- `[index:string]`对键的限制，限制类型为`string`，一般用于对象（不包含数组）时，`[index:string]`写法是固定的，用于数组时，一般是`[index:number]`，因为数组的索引就是number类型
- `string`是限制值的类型为string类型，当然也可以限制其他类型，如number，boolean等

##### 类类型接口

类类型接口主要是用于对类的约束，与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约，你也可以在接口中描述一个方法，然后在类中去实现它。

```typescript
interface Aniaml {
  name: string;
  eat(str: string): void;
}

class Dog implements Aniaml {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(this.name + "吃东西");
  }
}

let d = new Dog("小黑");
d.eat();
```

可以看到，在上述代码中，我们定义了一个`Aniaml`的接口，有`name`属性，和`eat`方法，并对它们做了一些约束，接着定义一个`Dog`类，这个类使用`implements`关键字实现了这个接口，最重要的是，在这个类中一定要实现接口的提供的属性和方法

学习ES6中的`class`类，请点击：[https://es6.ruanyifeng.com/#docs/class](https://es6.ruanyifeng.com/#docs/class)

##### 接口继承

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

考虑以下代码

```typescript
interface Aniaml {
  eat(): void;
}

interface Person {
  name: string;
  work(): void;
}

class Programmer implements Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  work() {
    console.log(this.name + "写代码");
  }
}

var p = new Programmer("小李");
p.work();
```

在上述代码中，首先定义一个接口`Aniaml`，它具有`eat()`方法，也就是动物都存在吃这个行为，接着再定义一个`Person`的接口，考虑一下，如果我们需要让实现Person接口的类中有eat()这种行为，有两种做法，一种是在Person接口的自己内部实现一个eat()方法，还有一种方法，既然Animal中有这个eat()方法，我们何不“借用”一下，这时候，除了定义自己本身的一些固有的属性和方法外，我们也可以用继承来实现Animal接口，实现“借用”的效果：

注意：继承使用extends关键字

```typescript
interface Aniaml {
  eat(): void;
}

interface Person extends Aniaml {
  name: string;
  work(): void;
}
```

接着，我们定义一个程序员类`Programmer`，在内部可以实现继承过来的这个`eat()`方法

```typescript
class Programmer implements Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  eat() {
    console.log(this.name + "喜欢吃馒头");
  }

  work() {
    console.log(this.name + "写代码");
  }
}
```
