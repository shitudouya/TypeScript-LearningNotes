${toc}

##### 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。  装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。通俗的理解可以认为就是在原有代码外层包装了一层处理逻辑。

装饰器在身边的例子随处可见，一个简单的例子

```text
水龙头上边的起泡器就是一个装饰器，在装上以后就会把空气混入水流中，掺杂很多泡泡在水里。但是起泡器安装与否对水龙头本身并没有什么影响，即使拆掉起泡器，也会照样工作，水龙头的作用在于阀门的控制，至于水中掺不掺杂气泡则不是水龙头需要关心的。
```

##### 为什么要用装饰器

可能有些时候，我们会对传入参数的类型判断、对返回值的排序、过滤，对函数添加节流、防抖或其他的功能性代码，基于多个类的继承，各种各样的与函数逻辑本身无关的、重复性的代码。所以，对于装饰器，可以简单地理解为是非侵入式的行为修改。

##### 装饰器的种类

- 根据装饰器的位置：类装饰器、访问器装饰器、属性装饰器、方法装饰器、参数装饰器
- 根据装饰器是否有参数：无参装饰器(一般装饰器)，有参装饰器(装饰器工厂)

##### 基本用法

装饰器在类声明之前被声明（紧靠着类声明），多个装饰器可以同时应用到一个声明上，就像下面的示例：

书写在同一行上：

```typescript
@f @g x
```

书写在多行上：

```typescript
@f
@g
x
```

当多个装饰器应用在一个声明上时会进行如下步骤的操作：

1.由上至下依次对装饰器表达式求值。

2.求值的结果会被当作函数，由下至上依次调用。

```typescript
function test01(target:any) {
  console.log('test01')
}
function test02(target:any) {
  console.log('test02')
}

function test03(target:any) {
  console.log('test03')
}

@test01
@test02
@test03
class People {}

//test03
//test02
//test01
```

##### 类装饰器

类装饰器应用于类构造函数，它可以用来监视，修改或替换类定义。 其传入的参数`target`是表示当前装饰的类的构造函数。

```typescript
function desc(target: any) {
  console.log(target); 
}

@desc //使用装饰器
class Person {
  name:string;
  age:number;
  constructor(name:string,age:number) {
    this.name = name;
    this.age = age;
  }
}
let p = new Person('哈哈',12)

/*
打印结果
Person(name, age) {
   this.name = name;
   this.age = age;
}
*/
```

上述是类修饰符的简单的使用，可以看到打印的`target`表示当前装饰的类，基于此，我们可以对修饰的类进行改造，以满足我们的需求

```typescript
function desc(target: any) {
  target.prototype.sex = "男" //装饰器添加的属性
  target.prototype.sayHi = function () {
    console.log('我是装饰器添加的方法')
  }
}

@desc //使用装饰器
class Person {
  name:string;
  age:number;
  constructor(name:string,age:number) {
    this.name = name;
    this.age = age;
  }
}
let p = new Person('哈哈',12)
console.log(p)
```

继续改造，我们可以看到这种装饰器无法传参，但是实际场景中，有时希望向装饰器传入一些参数，此时上面装饰器方法就不满足了，这时候我们需要借助**装饰器工厂**

装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。

我们可以通过下面的方式来写一个装饰器工厂函数：

```typescript
function desc(传递的参数) {
  return function(target:any) {
    //do something
  }
}
```

所以上面的例子可以改造成

```typescript
function desc(sex: string) {
  return function(target:any) {
    target.prototype.sex = sex
    target.prototype.sayHi = function () {
      console.log('我是装饰器添加的方法')
    }
  }
}

@desc("男") //使用装饰器
class Person {
  name:string;
  age:number;
  constructor(name:string,age:number) {
    this.name = name;
    this.age = age;
  }
}
let p = new Person('哈哈',12)
console.log(p)
```

如果玩过“吃鸡”的朋友可以考虑以下代码：

```typescript
class Game {
  speed:number = 100; //默认移动速度
  damage:number = 20; //默认拳头击打一次造成的伤害
  name:string; //玩家姓名
  constructor(name:string) {
    this.name = name;
  }
  hit() {
    console.log(`${this.name}的速度是${this.speed},拳头击打一次造成的伤害为：${this.damage}`)
  }
}

var simple = new Game("小强");
simple.hit();
```

上面是一位正常玩家的配置信息，然而某些玩家会很无耻地给他的角色加上作弊器加成，使用修饰器即可达到效果

```typescript
function SuperPlay(target: any) {
  target.prototype.hit = function () {
    const speed: number = 200; //修改后的移动速度
    const damage: number = 100; //修改后的拳头击打一次造成的伤害
    console.log(`${this.name}的速度是${speed},拳头击打一次造成的伤害为：${damage}`);
  }
}

@SuperPlay
class Game {
  name: string; //玩家姓名
  constructor(name: string) {
    this.name = name;
  }
  hit() {
    const speed: number = 100; //默认移动速度
    const damage: number = 20; //默认拳头击打一次造成的伤害
    console.log(`${this.name}的速度是${speed},拳头击打一次造成的伤害为：${damage}`);
  }
}

var simple = new Game("小强");
simple.hit();
```

##### 方法装饰器

它应用到方法上，可以用来监视、修改、替换该方法。方法装饰会在运行时传入下列3个参数：

1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。

2.成员的名字。

3.成员的属性描述符。


> 注意： 如果代码输出目标版本小于ES5，属性描述符将会是undefined。

```typescript
function desc(target:any, key:any, descriptor:any) {
  console.log('target', target); // 这里say方法没有被staic修饰，所以表示类的原型对象
  console.log('key', key); // 被装饰的函数名 say
  console.log('descriptor', descriptor); // 被装饰的函数的对象属性
}

class Person {
  name: string;
  age: number;
  constructor(name:string, age:number) {
    this.name = name;
    this.age = age;
  }
  @desc
  say() {
    console.log('I can say Hi!')
  }
}
```

例如，我有一个需求，需要在做一个操作前后都打印一句话，就可以用修饰器来操作

```typescript
function desc(target:any, key:any, descriptor:any) {
  const olodValue = descriptor.value;
  descriptor.value = function(...rest:any[]) {
    console.log(`start ${key}`) //操作之前记录
    olodValue.apply(this,rest) //执行原操作
    console.log(`end ${key}`)//操作之后记录
  }
  return descriptor
}

class Person {
  name: string;
  constructor(name:string) {
    this.name = name;
  }
  @desc
  todo() {
    console.log(`${this.name}正在做一件事`)
  }
}

let p = new Person("小强")
p.todo()
```

同样的，我有一个需求是一个函数只执行一次，多次执行，只有第一个生效

```typescript
function once() {
  var result:any;
  return (target: any, key: any, descriptor: any) => {
    let func = descriptor.value;
    descriptor.value = function (...rest: any[]) {
       result = func.apply(this,rest) 
       func = function(){};
    };
    return result
  }
}

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @once()
  todo(something: string) {
    console.log(`${this.name}正在${something}`);
  }
}

let p = new Person("小强");
p.todo("打游戏");
//p.todo("打游戏"); 不会输出
//p.todo("打游戏"); 不会输出
```

接着还可以写一个计算方法执行时间的修饰器

```typescript
function speedTime(target:any, key:any, descriptor:any){
  let oldValue = descriptor.value;
  descriptor.value = function(){
      let beginTime = new Date();
      let result = oldValue.apply(this, arguments);
      let endTime = new Date();
      let wasteTime = endTime.getTime() - beginTime.getTime();
      console.log(`执行方法'${key}'花了${wasteTime} ms`);
  }
  return descriptor
}

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @speedTime
  todo(count: number) {
    let sum = 0
    let i:number;
    for(i= 0;i<count;i++) {
      sum+=i
    }
    console.log(sum)
  }
}

let p = new Person("小强");
p.todo(1000000);
```

##### 方法参数装饰器

参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。

2.参数的名字。

3.参数在函数参数列表中的索引。


一般很少用到

```typescript
function desc(target: any, key: any, descriptor: any) {
  console.log(target);
  console.log(key);
  console.log(descriptor);
}

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  todo(@desc something: string) {
    console.log(`${this.name}正在${something}`);
  }
}

let p = new Person("小强");
p.todo("打游戏");

```

##### 属性装饰器

属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：

1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2、成员的名字。

```typescript
function logProperty(params:any){
  return function(target:any,attr:any){
      console.log(target);
      console.log(attr);
      target[attr]=params;
  }
}

class HttpClient{
  @logProperty('https://tudoublog.com')
  public url:any |undefined;
  constructor(){
  }
  getData(){
      console.log(this.url);
  }
}
var http=new HttpClient();
http.getData();
```

更多实用的装饰器，你可以查看

[lodash-decorators](https://github.com/steelsojka/lodash-decorators)

[core-decorators](https://github.com/jayphelps/core-decorators)