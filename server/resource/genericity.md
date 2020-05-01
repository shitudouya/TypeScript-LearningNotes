${toc}

##### 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。我们可以使用`泛型`来创建可重用的组件，一个组件可以支持多种类型的数据，这样用户就可以以自己的数据类型来使用组件，能够提高代码的重用性和代码的通用性。

##### 基本使用

比如现在有这么一个需求：获取数组中最小值

```typescript
function  getMinNumber(arr:number[]):number{
  var min=arr[0];
  arr.forEach((value)=>{
      if(value<min){
          min=value;
      }
  });
  return min;
}
console.log(getMinNumber([5,3,6,1,2]))
```

但是如果传入的是字符类型就不适用上述情况（字符可以根据ASCII码比较大小），则需要手动再添加一种情况

```typescript
function getMinStr(arr:string[]):string{
  var min=arr[0];
  arr.forEach((value)=>{
      if(value<min){
          min=value;
      }
  });
  return min;
}
console.log(getMinStr(['b','h','d','c','e']))
```

但这样太费事了，代码冗余，也许你会想到用any类型:

```typescript
function getMin(arr:any[]):any{
  var min=arr[0];
  arr.forEach((value)=>{
      if(value<min){
          min=value;
      }
  });
  return min;
}
console.log(getMin(['b','h','d','c','e']))
console.log(getMin([2,4,1,6,3]))
```

这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：`getMin(arr:any[]):any` 允许数组的每一项都为任意类型，返回的也是任意类型。但是我们预期的是，数组中每一项都应该是输入的 `value` 的类型，返回的也是`value`类型。

换句话说， 我们需要约束输出的类型与输入的类型保持一致。

这时候，我们就需要用到泛型来解决这个问题：

```typescript
function getMin<T>(arr:T[]):T{
  var min=arr[0];
  arr.forEach((value)=>{
      if(value<min){
          min=value;
      }
  });
  return min;
}
```

上例中，我们在函数名后添加了 `<T>`，它是给函数声明了一个类型变量`T` ，用来指代任意输入的类型，后面要求输入的`arr`是一个`T`类型的数组，返回的也是一个`T`类型的变量，也就是说输入和输出的类型是是一致的。

在我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：

```typescript
console.log(getMin<string>(['b','h','d','c','e']))
console.log(getMin<number>([2,4,1,6,3]))
```

第二种方法更普遍。编译器会根据传入的参数自动地帮助我们确定T的类型：

```typescript
console.log(getMin(['b','h','d','c','e']))
console.log(getMin([2,4,1,6,3]))
```

> 注意：T只是相当于一个占位符，也可以用其它符号代替T，如U、S等

##### 多个类型参数

泛型也可以传入多个不同类型参数

```typescript
function Swap<T, U>(value1:T,value2:U): [U,T] {
  return [value2,value1];
}

console.log(Swap(2,'哈哈哈'))
```

上例中，我们定义了一个 `Swap` 函数，用来交换输入的2个不同类型的参数，并返回交换后的数组。这里要注意，value2和value1的顺序要和返回的数组中的类型顺序要一致

##### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```typescript
function Log<T>(arg: T): T {
  // console.log(arg.age); 由于不知道arg是哪种类型，无法使用age属性
  return arg;
}
```

上例中，泛型 `T` 不一定包含属性 `age`，所以编译的时候报错了。这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `age`属性的变量。这就是泛型约束：

```typescript
interface Length {
  age: number;
}
function Log<T extends Length>(arg: T): T {
  console.log(arg.age);
  return arg;
}

console.log(Log({age:20}))
```

> 注意：如果调用Log的时候不传入age属性，则会报错

除此之外，你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 `obj`上，因此我们需要在这两个类型之间使用约束。其中`keyof`是索引类型查询操作符

```typescript
function getProperty<T,K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // okay
//getProperty(x,'e') error x对象上不存在e这个属性
```

##### 泛型接口

在之前学习中，我们知道可以使用接口的方式来定义一个函数需要符合的规范，我们也可以使用含有泛型的接口来定义函数的规范：

```typescript
interface Test {
  <T>(value:T): T;
}

let MyTest: Test = function<T>(value: T): T {
  return value
};

console.log(MyTest(2));
```

进一步，我们可以把泛型参数提前到接口名上：

```typescript
interface Test<T> {
  (value: T): T;
}

let MyTest: Test<any> = function <T>(value: T): T {
  return value;
};

console.log(MyTest(2));
```

注意，此时在使用泛型接口的时候，需要定义泛型的类型。

##### 泛型类

泛型类看上去与泛型接口差不多。 泛型类使用（ `<>`）括起泛型类型，跟在类名后面。

```typescript
class Add<T> {
  value!: T;
  add!: (x: T, y: T) => T;
}

let MyAdd = new Add<number>();
MyAdd.value = 20;
MyAdd.add = function (x, y) {
  return x + y;
};

console.log(MyAdd.add(2,1))
```
