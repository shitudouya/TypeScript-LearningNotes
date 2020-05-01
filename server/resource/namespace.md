${toc}

##### 命名空间

命名空间一个最明确的目的就是解决重名问题。假设这样一种情况，当一个班上有两个名叫小明的学生时，为了明确区分它们，我们在使用名字之外，不得不使用一些额外的信息，比如他们的姓（王小明，李小明），或者他们父母的名字等等。在之前的JavaScript学习中，我们为了防止多个相同的变量造成全局污染，曾采用过这种代码组织形式：

```javascript
var myMethods = (function(){
 var myName = 'xtd';
 function Hello() {
   console.log(myName)
 }
 return {
   Hello
 }
})();
var myName = 'dxx' //不会污染变量
myMethods.Hello()
console.log(myName)
```

此种方式，适合用于合理的函数逻辑分组中，在 TypeScript 中，为了避免各种变量命名相冲突，可将相似功能的函数、类、接口等放置到命名空间内。如果想在命名空间外访问，则用export导出。用关键字namespace来声明命名空间。

##### 命名空间的声明

TypeScript 的命名空间只对外暴露需要在外部访问的对象，命名空间内的对象通过 `export`关键字对外暴露，比如我们在一个名叫 `test.ts` 的文件里声明一个命名空间：

```typescript
//test.ts
namespace Tools {
  const isLetterReg = /^[A-Za-z]+$/;
  export const checkLetter = (text:any) => {
    return isLetterReg.test(text)
  }
  export interface Person {
      name: string;
      age: number;
      sex:boolean;
      study():void;
  }
}
```

##### 命名空间的使用

通过 namespace 关键字声明命名空间，在命名空间外部需要通过可以使用`Tools.Person`的形式使用

```typescript
//test.ts
namespace Tools {
  export interface Person {
      name: string;
      age: number;
      sex:boolean;
      study():void;
  }
}

const m:Tools.Person = {
  name:'xtd',
  age:23,
  sex:true,
  study:function() {
    console.log(this.name+this.sex+this.age)
  }
}
m.study()
```

但是，通常情况下，声明的命名空间代码和调用的代码可能不在同一个文件里，如果在其他文件中使用，则应使用三斜杠 /// 引用它，语法格式如下

```typescript
/// <reference path = "test.ts" />
```

注意引入的路径要写正确，此处我们在同级目录中任意一个 ts 文件中使用我们刚定义的命名空间：

```typescript
//main.ts

/// <reference path = "test.ts" />

const me:Tools.Person = {
  name:'xtd',
  age:23,
  sex:true,
  study:function() {
    console.log(this.name+this.sex+this.age)
  }
}
me.study()
```

##### 多文件的命名空间

就像普通的 JS 模块文件可以相互引用一样，包含 namespace 的命名空间文件也可以相互引入，还可以组合成一个更大的命名空间，下面是一个简单的示例，所有文件都在同一目录下，你也可参考官方示例：

```typescript
//test.ts
namespace Utils {
  export interface IAnimal {
      name: string;
      say(): void;
  }
}
    
//test02.ts
/// <reference path="test.ts" />
namespace Animal {
  export class Dog implements Utils.IAnimal{
      name: string;
      constructor(theName: string) {
          this.name = theName;
      }
      say() {
          console.log(`${this.name}: 汪汪汪`)
      }
  }
}
    
//main.ts
/// <reference path="test02.ts" />
var dog = new Animal.Dog('jack')
dog.say()
```

当涉及到多文件时，我们必须确保所有编译后的代码都被加载了。 把所有的输入文件编译为一个输出文件，需要使用`--outFile`标记：

在控制台运行命令

```Shell
tsc --outFile index.js test.ts test02.ts main.ts
```

##### 别名

别名的作用主要是简化操作。可以解决一些深层次的嵌套的取值问题，可以使用`import q = x.y.z`的形式给常用的对象起一个短的名字

```typescript
//test.ts
namespace People {
  export namespace Teachers {
    export class Students {}
    export class Others {}
  }
}

//main.ts
/// <reference path = "test.ts" />
import teachers = People.Teachers;
let students = new teachers.Students()
console.log(students)
```
