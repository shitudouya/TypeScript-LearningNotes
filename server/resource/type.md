${toc}

在TypeScript中定义变量需要指定 `标识符`的类型。所以完整的声明格式如下：

```typescript
var/let/const 标识符: 数据类型 = 赋值;
```

数据类型主要用途是对变量赋予的值进行范围限定，在TypeScript中给我们提供了以下的数据类型：

##### 布尔类型(boolean)

```typescript
let isBoy: boolean = false;
//isBoy = "123";  错误，只能赋值为布尔类型的值
```

##### 数字类型(number)

```typescript
let Num1: number = 1;
let Num2: number = 1.2;
let Num3: number = 0x10;
console.log(Num1, Num2, Num3);
```

##### 字符串类型(string)

JavaScript一样，可以使用双引号（ `"`）或单引号（`'`）表示字符串

```typescript
var str:string = 'this is string';
str = "123"
//str = 123 错误，只能是字符串
```

你还可以使用模版字符串，它可以定义多行文本和内嵌表达式

```typescript
let myname: string = "xtd";
let myage: number = 23;
let sentence: string = `Hello, my name is ${myname},age is ${myage}`;
console.log(sentence);
```

##### 数组类型(array)

TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组：

```ts
let list: number[] = [1, 2, 3];
let list2: string[] = ["a", "b", "c", "d"];
let list3: boolean[] = [true, false];
console.log(list, list2, list3);
console.log(list[0])
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```ts
let list: Array<number> = [1, 2, 3];
let list2: Array<string> = ["a", "b", "c", "d"];
let list3: Array<boolean> = [true, false];
console.log(list, list2, list3);
```

在使用数组类型的时候，数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：

```typescript
let num:number[] = [1,2,3,4];
//num.push('1') 错误，只能添加number类型的值
```

##### 元组类型(tuple)

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同

```typescript
let arr1: [number, string] = [123, "this is text"];
let arr2: [string, number] = ["this is text", 123];
let arr3: [string, boolean] = ["this is text", false];
console.log(arr1, arr2, arr3);
```

此外，元组类型还有一个强大的特性是：当访问一个已知索引的元素，会得到正确的类型，然后该类型的所有方法都有提示且可以被使用

```typescript
let arr1: [number, string, boolean] = [123.123, "this is text", false];
console.log(arr1[0].toFixed(2), arr1[1].length);
```

##### 枚举类型(enum)

`enum`类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。(枚举首字母大写)

```ts
enum StatusCode {
  Red,
  Green,
  Blue,
  Yellow
}
let c: Color = Color.Green;
console.log(c);
```

默认情况下，从`0`开始为元素编号。 你也可以手动的指定成员的数值。 比如从 `1`开始编号：

```ts
enum Color {
  Red = 1,
  Green,
  Blue
}
let c: Color = Color.Green;
console.log(c);
```

或者，全部都采用手动赋值：

```ts
enum StatusCode {
  OK = 200,
  Created = 201,
  Wrong = 400,
  NotFound = 404
}
let c: StatusCode = StatusCode.OK;
console.log(c);
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

```ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```

##### 任意类型(any)

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 `any`类型来标记这些变量：

```typescript
let anynum: any = 123;
anynum = "123";
anynum = true;
anynum = [1, 2, 3];

//数组
let arr: any[] = ["张三", 13, "李四", true, false];
//声明any数组后，数组中的成员都可以被任意赋值，没有限制
arr[0] = 14;
console.log(anynum,arr);
```

##### void类型

void它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`

```typescript
function sayName(): void {
  console.log("哈哈");
}
sayName();
```

你也声明一个`void`类型的变量，但是声明一个`void`类型的变量没有什么大用，因为你只能为它赋予`undefined`和`null`(注：null在严格模型下会有警告)，所以几乎不用在变量上，而用在函数上

```typescript
let value: void = undefined;
let value2: void = null;
console.log(value, value2);
```

##### null和undefined

TypeScript里，`undefined`和`null`两者各自有自己的类型分别叫做`undefined`和`null`。默认情况下，`null` 和`undefined`是所有类型的子类型，也就意味着我们可以把`null` 和`undefined`赋值给任意类型的变量，但是其实它们的本身的类型用处不是很大

```typescript
let str1:null = null;
let str2:undefined = undefined;
let str3:undefined =null;
let str4:null = undefined
```

实际开发中的主要场景，声明一个变量的时候，我们不知道它是一个具体的什么数值，就可以赋值为null

```typescript
let num = null;
if (true) {
  num = 20;
} else {
  num = 10;
}
console.log(num);
```

##### never类型

`never`类型表示的是那些永不存在的值的类型，`never`类型是任何类型的子类型，也可以赋值给任何类型。  例如， `never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。

```typescript
//1.封装一个抛出异常的方法
function error(msg: string): never {
  throw new Error(msg);
}
error("发送未知错误");
```

##### object类型

`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`之外的类型。

```typescript
let obj1: object = {
  name: "小土豆",
  age: "哈哈"
};
console.log(obj1);
```

##### 类型断言

比如说，现在有这样一段代码（尝试敲下以下代码）

```typescript
let something:any = "this is a text";
console.log(something.substr(0,1))
console.log(something.length)
```

上述代码定义了一个any类型的一个变量something，我给他赋值为一个字符串，当我们想要调用字符串的各种方法和属性时，例如substr,length等，虽然运行能够得到结果，但是发现调用方法和属性时，没有任何提示，因为你设置的any任意类型，typescript自然推断不出你需要的方法提示。

但是有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。就像上面一样，即使我限定的是any类型，但是我知道我赋予的值是string类型， 我需要string类型的方法提示用来防止写错方法名或属性名，这时候通过`类型断言`这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：

```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

另一个为`as`语法：

```ts
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 `as`语法断言是被允许的。

##### 联合类型

 偶尔你会遇到这种情况，你希望传入多种类型的参数，而不是只限定于一种类型。这时候你可以用联合类型（Union Types）来解决。联合类型表示取值可以为多种类型中的一种，它使用 `|` 分隔每个类型。

```typescript
let number:string|number;
number = 2;
number = 'two'
```

这里的 `let number:string|number` 的含义是，允许 `number:string`的类型是 `string` 或者 `number`，但是不能是其他类型。

 另外，TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

```typescript
function getLength(something: string | number): number {
  //return something.length; error
}
```

上例中，`length` 不是 `string` 和 `number` 的共有属性，所以会报错。但是访问 `string` 和 `number` 的共有属性是没问题的：

```typescript
function getString(something: string | number): string {
  return something.toString();
}
```

除此之外，我们也可以将数组声明为联合类型：

```typescript
let arr: number[] | string[];

arr = [1, 2, 4];
for (let i: number = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

arr = ["x", "t", "d"];
for (let i: number = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```
