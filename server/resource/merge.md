${toc}

##### 声明合并

“声明合并”是指编译器将针对同一个名字的两个独立声明合并为单一声明。 合并后的声明同时拥有原先两个声明的特性。 任何数量的声明都可被合并，不局限于两个声明。

##### 合并接口

最简单也最常见的声明合并类型是接口合并。 从根本上说，合并的机制是把双方的成员放到一个同名的接口里。

```typescript
interface Person {
  name:string,
  age:number
}
interface Person {
  sex: string
}

let students:Person = {
  name:'xtd',
  age:23,
  sex:"男"
}

console.log(students)
```

可以看到，声明了两个相同名称的接口，双方的成员也就放到一个同名的接口里。一旦其它地方实现了这个接口，也必须实现接口的所有成员。此外，接口的非函数的成员应该是唯一的。如果它们不是唯一的，那么它们必须是相同的类型。如果两个接口中同时声明了同名的非函数成员且它们的类型不同，则编译器会报错。

```typescript
interface Person {
  name:string,
  age:number
}
interface Person {
  name:string //正确,虽然不是唯一的，但是和上一个接口的成员name是相同的类型
  //name:number error，不是相同的类型，会报错
  sex:string
}

let students:Person = {
  name:'xtd',
  age:23,
  sex:"男"
}

console.log(students)
```

对于函数成员，每个同名函数声明都会被当成这个函数的一个重载。 当接口 `A`与后来的接口 `A`合并时，后面的接口具有更高的优先级。

```typescript
interface Person {
  getName(name:string):string
}
interface Person {
  getName(age:number):number
}

//合并后
interface Person {
  getName(name:string):string,
  getName(age:number):number
}

```

##### 合并命名空间

与接口相似，同名的命名空间也会合并其成员

```typescript
namespace Validations {
  export const checkNumer = () => {};
}

namespace Validations {
  export const checkLetter = () => {};
}

//等同于
namespace Validations {
  export const checkNumer = () => {};
  export const checkLetter = () => {};
}

```

此外，如果在命名空间中，有些成员没有使用`export`导出声明，那么从其它命名空间合并进来的成员无法访问非导出成员

```typescript
namespace Validations {
  const numberReg = /^[0-9]+$/  //不使用export导出
  export const checkNumer = () => {};
}

namespace Validations {
  //console.log(numberReg) 无法访问
  export const checkLetter = () => {};
}
    
    
namespace Validations {
  export const numberReg = /^[0-9]+$/  //使用export导出
  export const checkNumer = () => {};
}

namespace Validations {
  console.log(numberReg) //可以访问
  export const checkLetter = () => {};
}
```

##### 合并函数

函数的合并和之前学的函数重载相同

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: any): any {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
