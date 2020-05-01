${toc}

##### 类

如果你对ES6中的类不太了解，可以先参考：[ES6中的类](https://es6.ruanyifeng.com/#docs/class)

传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件，例如下面：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHi = function() {
  console.log("我的名字叫" + this.name + "我的年龄是" + this.age);
};

var p = new Person("小李", 30);
p.sayHi();
```

上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类，使用 `constructor` 定义构造函数，通过 `new` 生成新实例的时候，会自动调用构造函数。

基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的`class`改写，就是下面这样。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = name;
  }
  sayHi() {
    console.log("我的名字叫" + this.name + "我的年龄是" + this.age);
  }
}

let p = new Person("小李", 30);
p.sayHi();
```

上面代码定义了一个“类”，可以看到里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。

##### 类的继承

考虑以下代码：

```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  run(): void {
    console.log(this.name+"在运动");
  }
}

class Web extends Person {
  constructor(name: string) {
    super(name);
  }
  work(): void {
    console.log(this.name + "在工作");
  }
}

var w = new Web("土豆");
w.work()
w.run()
```

在上面的例子中，我们定义了一个Person类，并在Person类中定义了一个name属性和一个run方法，接下来又定义了一个Web类，代表前端开发者（滑稽脸），使用 `extends` 关键字实现继承Person类，使用 `super` 关键字来调用父类的构造函数和方法，这就实现了一个基本的继承。

注意：子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。

接下来让我们来看看更加复杂的例子：

```typescript
class Animal {
  name:string;
  constructor(name:string) {
    this.name = name;
  }
  run(distance:number=0) {
    console.log(`${this.name}走动了${distance}米`)
  }
}

class Cat extends Animal {
  constructor(name:string) {
    super(name)
  }
  run(distance:number=10) {
    super.run(distance)
  }
}

class Dog extends Animal {
  constructor(name:string) {
    super(name)
  }
  run(distance:number=20) {
    super.run(distance)
  }
}

var c = new Cat("小猫")
var d = new Dog("小狗")
c.run()
d.run()
```

在这个例子中，我们创建了一个Animal类，并创建了Cat和Dog俩个子类来继承Animal，在子类中我们可以`super.run(distance)`来重写父类的run方法，来满足我们不同的需求

##### 类的修饰符

ts里面定义属性的时候提供了四种修饰符，分别是public、protected、private、readonly

- `public `：公有，在类里面、子类、类外面都可以访问，默认修饰符为public

```typescript
class Animal {
  public name:string;  //public修饰
  public constructor(name:string) {
    this.name = name;
  }
  public eat() {
    console.log(`动物${this.name}在吃食物`) //类里面可以访问name属性
  }
}

class Dog extends Animal {
  public constructor(name:string) {
    super(name);
  }
  public run() {
    console.log(`狗${this.name}在跑`) //子类可以访问name属性
  }
}

let d = new Dog("大黄")
console.log(d.name) //类的外面可以访问name属性
```

上面的例子中，name属性以及constructor构造函数和eat方法都被设置为了 `public`，可以直接访问实例的 name 属性，也可以访问其他方法。它等价于

```typescript
class Animal {
  name:string;  
  constructor(name:string) {
    this.name = name;
  }
  eat() {
    console.log(`动物${this.name}在吃食物`) 
  }
}

class Dog extends Animal {
  constructor(name:string) {
    super(name);
  }
  run() {
    console.log(`狗${this.name}在跑`)
  }
}

let d = new Dog("大黄")
console.log(d.name) 
```

- `protected`：保护类型，在类里面、子类里面可以访问，在类外面无法访问

```typescript
class Animal {
  protected name:string;  // name属性被用protected修饰
  public constructor(name:string) {
    this.name = name;
  }
  public eat() {
    console.log(`动物${this.name}在吃食物`) //类里面可以访问name属性
  }
}

class Dog extends Animal {
  public constructor(name:string) {
    super(name);
  }
  public run() {
    console.log(`狗${this.name}在跑`) //子类可以访问name属性
  }
}

let d = new Dog("大黄")

//console.log(d.name) 类的外面无法访问name属性
```

- `private`：私有，在类里面可以访问，子类、类外部无法访问

```typescript
class Animal {
  private name:string;  // name属性被用private修饰
  public constructor(name:string) {
    this.name = name;
  }
  public eat() {
    console.log(`动物${this.name}在吃食物`) //类里面可以访问name属性
  }
}

class Dog extends Animal {
  public constructor(name:string) {
    super(name);
  }
  public run() {
    //console.log(`狗${this.name}在跑`) 子类无法访问name属性
  }
}

let d = new Dog("大黄")

//console.log(d.name) 类的外面无法访问name属性
```

- `readonly`：可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

```typescript
class Animal {
  readonly name:string;  
  readonly age:number = 20; //age在声明时初始化
  constructor(name:string) {
    this.name = name; //name在构造函数中初始化
  }
  eat() {
    console.log(`动物${this.name}在吃食物`) 
  }
}


let a = new Animal("大黄")
console.log(a.name) 
console.log(a.age)
// a.name = "小黄" 错误，实例化赋值后不可再次改变
//a.age = 22; //错误，声明时初始化后不可改变
```

##### 参数属性

考虑以下代码

```typescript
class Animal {
  name:string;  //声明name属性
  constructor(name:string) {
    this.name = name;  //在构造函数中初始化
  }
}

let a = new Animal("大黄")
console.log(a.name) 
```

可以看到，在通常情况下，我们定义一个类时，我们先声明一个name属性，然后在构造函数中初始化，但是一旦声明的属性很多，不免出现以下的情况：

```typescript
class People {
  name:string;  
  age:number;
  gender:boolean;
  grade:string;
  constructor(name:string,age:number,gender:boolean,grade:string) {
    this.name = name; 
    this.age = age;
    this.gender = gender;
    this.grade = grade
  }
}

let p = new People("张三",20,true,"1922")
console.log(p) 
```

这样会显得很麻烦，ts中提供了参数属性，它允许同时创建和初始化成员，可以把声明和赋值合并至一处，上面的例子改写：

```typescript
class People {
  constructor(public name:string,public age:number,public gender:boolean,public grade:string) {}
}

let p = new People("张三",20,true,"1922")
console.log(p) 
```

注意：参数的前面一定添加修饰符

##### 存取器

TypeScript支持通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

我们可以试着模拟以下的场景：你有一个自己的博客，你可以发布自己写的技术文章供别人参考。

```typescript
class Blog {
  article:string;
  constructor(article:string) {
    this.article = article;
  }
}

var b = new Blog("这是我的技术文章")
console.log(b.article)
```

上面的代码中，定义了一个`Blog`类，同时声明了`article`属性用来代表自己写的文章，之后实例化的时候传入自己写的文章内容，看上去没毛病，但是却有一个非常严重的问题，那就是其他人可以随意篡改我们写的文章，就像这样：

```typescript
class Blog {
  article:string;
  constructor(article:string) {
    this.article = article;
  }
}

var b = new Blog("这是我的技术文章")
b.article = "我是外人，我改了这篇文章" //其他人随意修改
console.log(b.article) //结果：我是外人，我改了这篇文章
```

所以现在的问题是我不想让他人随意修改，你可能会想到用`private`来修饰，但是一旦被修饰，也就意味着外界无法访问你的文章

```typescript
class Blog {
  private article:string;
  constructor(article:string) {
    this.article = article;
  }
}

var b = new Blog("这是我的技术文章")
console.log(b.article)
```

这时候你又想到了，我可以用`readonly`修饰，这样他人既不能随意修改，也能访问到我的文章

```typescript
class Blog {
  readonly article:string;
  constructor(article:string) {
    this.article = article;
  }
}

var b = new Blog("这是我的技术文章")
//b.article = "我是外人，我想修改" 不能修改
console.log(b.article) //可以访问
```

这样看上去没毛病，但是有一天你突然发现自己的文章写的有误，想去修改的时候，也是无法修改的。

解决办法很简单，我们可以设置一个验证机制，类似于后台管理系统，只有输入正确的管理员的账户，才能登陆进入修改文章。类似的，我们就可以使用存取器来实现类似的功能，当我们去读取文章的时候自动调用`get`方法返回文章内容，当我们去修改文章的时候自动调用`set`方法触发验证，验证通过则可以修改，否则不能修改

```typescript
let username = "admin" //管理员用户名
let password = "123"  //管理员密码

class Blog {
  private article:string;
  constructor(article:string) {
    this.article = article;
  }
  get Article():string {
    return this.article
  }
  set Article(content:string) {
    if(username==="admin"&&password==="123") { //验证通过可以修改
      this.article = content
    } else {
      console.log("修改失败")
    }
  }
}

var b = new Blog("这是我的技术文章")
b.Article = "123" 
console.log(b.Article)
```

> 注意：存取器要求你将编译器设置为输出ECMAScript5或更高。 不支持降级到ECMAScript3。 其次，只带有 get不带有 set的存取器自动被推断为readonly。 

##### 静态属性

可以使用`static`来定义类里的静态属性，静态属性属于类自身，而不属于实例，访问的时候要用类名访问，而不能用实例对象访问

```typescript
class Person {
  static PName: string = "小明";
  static PAge: number = 23;
  gender: boolean;
  constructor(gender: boolean) {
    this.gender = gender;
  }
  print() {
     //静态属性使用类名.属性名访问
    console.log(Person.PName, Person.PAge, this.gender ? "男" : "女");
  }
}

var p = new Person(true);
p.print();
```

另外，static不仅可以定义属性，也可以定义方法，定义的方法被称为静态方法

```typescript
class Person {
  static PName:string = "小明";
  static PAge:number = 23;
  gender:boolean;
  constructor(gender:boolean) {
    this.gender = gender
  }
  print(){
    console.log(Person.PName,Person.PAge,this.gender?"男":"女")
  }
  static sayHi() {
    // console.log(this.gender) 无法直接访问Person类上的非静态属性
    console.log(`Hello，我是${Person.PName}`)
  }
}

var p = new Person(true)
p.print()
// p.sayHi() 错误
Person.sayHi()

```

可以看到上面的代码有几个需要注意的地方：

- 在静态方法中没法直接访问Person类上的属性，若想调用，则必须把属性也声明为静态
- 在调用静态方法时，必须使用类名.方法的形式调用

##### 抽象类和抽象方法

抽象类和抽象方法都是比较难懂的概念，抽象类做为其它派生类的基类使用，且抽象类不能被实例化。 抽象方法只能放在抽象类里面，且抽象类中的抽象方法在子类中必须实现， 可以用`abstract`关键字定义抽象类和抽象方法

```typescript
abstract class DingDing { //定义一个抽象类
  name:string
  constructor(name:string) {
    this.name = name
  }
  chat() { //定义普通方法，包括具体实现，不必在子派生类中实现
    console.log(this.name+"在聊天")
  }
  abstract checkIn():any; //定义抽象方法，不包含具体实现，但必须子派生类中实现，且abstract抽象方法只能放在抽象类中
}

class Employee extends DingDing {
  constructor(name:string) {
    super(name)
  }
  checkIn() {  //抽象类的子类必须实现抽象方法
    console.log(this.name + '已打卡签到')
  }
}

var d = new Employee('小黑')
d.chat()
d.checkIn()
```

可以看到，在上面的例子中，我们定义了一个“钉钉”抽象类，在该类中定义了一个抽象方法“打卡”（checkIn），也就是说所有派生类的基类（员工）必须打卡，同时钉钉也有聊天的功能，但是聊天并不是强制的，可以不必在子派生类中实现。因此，抽象类和抽象方法用来定义标准，规定了子派生类的行为规范，这和接口有一定的类似性，但不同的是：

- 抽象类中除抽象函数之外，其他函数可以包含具体实现，但是接口中不能包含具体实现；
- 子类只能继承一个抽象类，而接口可以被多个实现；
- 抽象方法可以是public，protected，但是接口只能是public，默认的；
- 抽象类可以有构造器，而接口不能有构造器；

##### 多态

多态是指父类定义一个方法不去实现，让继承它的子类去实现（子类也可不实现），每一个子类有不同的表现。例如下面：

```typescript
class Aniaml {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {} //具体吃什么不知道，而是让它的子类去实现吃的方法，而每个子类吃的表现不一样，这就是多态
}

class Dog extends Aniaml {
  constructor(name: string) {
    super(name);
  }

  eat(): string {
    return this.name + "吃骨头";
  }
}

class Cat extends Aniaml {
  constructor(name: string) {
    super(name);
  }
  eat(): string {
    return this.name + "吃鱼";
  }
}
```
