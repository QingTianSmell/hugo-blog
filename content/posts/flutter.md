---
title: "Flutter 的使用"
date: 2020-03-21T21:04:37+08:00
tags: ["框架"]
---

## 基础
### Dart
#### 什么是 Dart ?

因为 JavaScript 的种种问题，Dart 最初是 Google 设计用来代替 JavaScript 的语言。但是 JavaScript 因为 Node.js 成为了前后端同吃的全栈语言，前端的开发模式也因此改变，Dart 取代 JavaScript 也成为了泡影。出现转机的地方是 Google 内部孵化了跨平台移动端开发框架 Flutter，Dart 成为了其开发语言，与其进行了捆绑。目前来看 Dart 语言的生命力主要依靠于 Flutter 的生命力。而因为 React Native 的种种问题，Flutter 有了后来居上的趋势，如果你是一名移动端开发者，Dart 语言和 Flutter 框架确实值得一学。

#### 变量类型定义

在 Dart 中，我们可以用 var 或者具体的类型来声明一个变量。当使用 var 定义变量时，表示类型是交由编译器推断决定的，当然你也可以用静态类型去定义变量，更清楚地跟编译器表达你的意图，这样编辑器和编译器就能使用这些静态类型，向你提供代码补全或编译警告的提示了。

在默认情况下，未初始化的变量的值都是 null，因此我们不用担心无法判定一个传递过来的、未定义变量到底是 undefined，还是烫烫烫而写一堆冗长的判断语句了。

Dart 是类型安全的语言，并且所有类型都是对象类型，都继承自顶层类型 Object，因此一切变量的值都是类的实例（即对象），甚至数字、布尔值、函数和 null 也都是继承自 Object 的对象。

Dart 内置了一些基本类型，如 num、bool、String、List 和 Map，在不引入其他库的情况下可以使用它们去声明变量。

##### num、bool 与 String

Dart 的数值类型 num，只有两种子类：即 64 位 int 和符合 IEEE 754 标准的 64 位 double。除了常见的基本运算符，比如 +、-、\*、/，以及位运算符外，你还能使用继承自 num 的 abs()、round() 等方法，来实现求绝对值、取整的功能。

为了表示布尔值，Dart 使用了一种名为 bool 的类型。在 Dart 里，只有两个对象具有 bool 类型：true 和 false，它们都是编译时常量。Dart 是类型安全的，因此我们不能使用 if(nonbooleanValue) 或 assert(nonbooleanValue) 之类的在 JavaScript 可以正常工作的代码，而应该显式地检查值。

Dart 的 String 由 UTF-16 的字符串组成。和 JavaScript 一样，构造字符串字面量时既能使用单引号也能使用双引号，还能在字符串中嵌入变量或表达式：你可以使用 \${express} 把一个表达式的值放进字符串。而如果是一个标识符，你可以省略{}。对于多行字符串的构建，你可以通过三个单引号或三个双引号的方式声明。

##### List 与 Map

其他编程语言中常见的数组和字典类型，在 Dart 中的对应实现是 List 和 Map，统称为集合类型。和 Java 语言类似，在初始化集合实例对象时，你可以为它的类型添加约束，也可以用于后续判断集合类型。

```
List arr1 = <String>['Tom', 'Andy', 'Jack'];
List arr2 = new List<int>.of([1,2,3]);
arr2.add(499);
arr2.forEach((v) => print('${v}'));
print(arr2 is List<int>); // true

Map map1 = <String, String>{'name': 'Tom','sex': 'male',};
Map map2 = new Map<String, String>();
map2['name'] = 'Tom';
map2['sex'] = 'male';
map2.forEach((k,v) => print('${k}: ${v}'));
print(map2 is Map<String, String>); // true
```

##### 常量定义

如果你想定义不可变的变量，则需要在定义变量前加上 final 或 const 关键字。

- const，表示变量在编译期间即能确定的值。
- final 定义的变量可以在运行时确定值，而一旦确定后就不可再变。

#### 函数

在 Dart 中，所有类型都是对象类型，函数也是对象，它的类型叫作 Function。这意味着函数也可以被定义为变量，甚至可以被定义为参数传递给另一个函数。

如果函数体只有一行表达式，我们还可以像 JavaScript 语言那样用箭头函数来简化这个函数。

```
bool isZero(int number) { //判断整数是否为0
  return number == 0;
}
bool isZero(int number) => number == 0;
```

有时，一个函数中可能需要传递多个参数。那么，如何让这类函数的参数声明变得更加优雅、可维护，同时降低调用者的使用成本呢？C++ 与 Java 的做法是，提供函数的重载，即提供同名但参数不同的函数。但 **Dart 认为重载会导致混乱，因此从设计之初就不支持重载，而是提供了可选命名参数和可选参数**。在使用这两种方式定义函数时，我们还可以在参数未传递时设置默认值。具体方式是，在声明函数时：

```
//要达到可选命名参数的用法，那就在定义函数的时候给参数加上 {}
void enable1Flags({bool bold, bool hidden}) => print("$bold , $hidden");

//定义可选命名参数时增加默认值
void enable2Flags({bool bold = true, bool hidden = false}) => print("$bold ,$hidden");

//可忽略的参数在函数定义时用[]符号指定
void enable3Flags(bool bold, [bool hidden]) => print("$bold ,$hidden");

//定义可忽略参数时增加默认值
void enable4Flags(bool bold, [bool hidden = false]) => print("$bold ,$hidden");

//可选命名参数函数调用
enable1Flags(bold: true, hidden: false); //true, false
enable1Flags(bold: true); //true, null
enable2Flags(bold: false); //false, false

//可忽略参数函数调用
enable3Flags(true, false); //true, false
enable3Flags(true); //true, null
enable4Flags(true); //true, false
enable4Flags(true,true); // true, true
```

#### 类

##### 类的定义及初始化

Dart 是面向对象的语言，每个对象都是一个类的实例，都继承自顶层类型 Object。在 Dart 中，实例变量与实例方法、类变量与类方法的声明与 Java 类似。

值得一提的是，Dart 中并没有 public、protected、private 这些关键字，我们只要在声明变量与方法时，在前面加上`_`即可作为 private 方法使用。如果不加`_`，则默认为 public。不过，**的限制范围并不是类访问级别的，而是库访问级别**。

有时候类的实例化需要根据参数提供多种初始化方式。除了可选命名参数和可选参数之外，Dart 还提供了命名构造函数的方式，使得类的实例化过程语义更清晰。

此外，与 C++ 类似，Dart 支持初始化列表。在构造函数的函数体真正执行之前，你还有机会给实例变量赋值，甚至重定向至另一个构造函数。

```
class Point {
  num x, y, z;
  //语法糖，等同于在函数体内：this.x = x;this.y = y;
  Point(this.x, this.y) : z = 0; // 初始化变量z
  Point.bottom(num x) : this(x, 0); // 重定向构造函数
  void printInfo() => print('($x,$y,$z)');
}

var p = Point.bottom(100);
p.printInfo(); // 输出(100,0,0)
```

##### 复用

在面向对象的编程语言中，将其他类的变量与方法纳入本类中进行复用的方式一般有两种：继承父类和接口实现。在 Dart 中：

- 继承父类意味着，子类由父类派生，会自动获取父类的成员变量和方法实现，子类可以根据需要覆写构造函数及父类方法。
- 接口实现则意味着，子类获取到的仅仅是接口的成员变量符号和方法符号，需要重新实现成员变量，以及方法的声明和初始化，否则编译器会报错。

```
class Point {
  num x = 0, y = 0;
  void printInfo() => print('($x,$y)');
}

//Vector继承自Point
class Vector extends Point{
  num z = 0;
  @override
  void printInfo() => print('($x,$y,$z)'); //覆写了printInfo实现
}

//Coordinate是对Point的接口实现
class Coordinate implements Point {
  num x = 0, y = 0; //成员变量需要重新声明
  void printInfo() => print('($x,$y)'); //成员函数需要重新声明实现
}

var xxx = Vector();
xxx
  ..x = 1
  ..y = 2
  ..z = 3; //级联运算符，等同于xxx.x=1; xxx.y=2;xxx.z=3;
xxx.printInfo(); //输出(1,2,3)

var yyy = Coordinate();
yyy
  ..x = 1
  ..y = 2; //级联运算符，等同于yyy.x=1; yyy.y=2;
yyy.printInfo(); //输出(1,2)
print (yyy is Point); //true
print(yyy is Coordinate); //true
```

除了继承和接口实现之外，Dart 还提供了另一种机制来实现类的复用，即“混入”（Mixin）。混入鼓励代码重用，可以被视为具有实现方法的接口。这样一来，不仅可以解决 Dart 缺少对多重继承的支持问题，还能够避免由于多重继承可能导致的歧义。

```
class Coordinate with Point {
}

var yyy = Coordinate();
print (yyy is Point); //true
print(yyy is Coordinate); //true
```

#### 运算符

Dart 和绝大部分编程语言的运算符一样，所以你可以用熟悉的方式去执行程序代码运算。不过，Dart 多了几个额外的运算符，用于简化处理变量实例缺失（即 null）的情况。

- `?.` 运算符：假设 Point 类有 `printInfo()` 方法，p 是 Point 的一个可能为 `null` 的实例。那么，p 调用成员方法的安全代码，可以简化为 `p?.printInfo()` ，表示 p 为 `null` 的时候跳过，避免抛出异常。
- `??=` 运算符：如果 a 为 `null`，则给 a 赋值 value，否则跳过。这种用默认值兜底的赋值语句在 Dart 中我们可以用 `a ??= value` 表示。
- `??` 运算符：如果 a 不为 `null`，返回 a 的值，否则返回 b。在 Java 或者 C++ 中，我们需要通过三元表达式 `(a != null)? a : b` 来实现这种情况。而在 Dart 中，这类代码可以简化为 `a ?? b`。

Dart 提供了类似 C++ 的运算符覆写机制，使得我们不仅可以覆写方法，还可以覆写或者自定义运算符。operator 是 Dart 的关键字，与运算符一起使用，表示一个类成员运算符函数。在理解时，我们应该把 operator 和运算符作为整体，看作是一个成员函数名。

```
class Vector {
  num x, y;
  Vector(this.x, this.y);
  // 自定义相加运算符，实现向量相加
  Vector operator + (Vector v) =>  Vector(x + v.x, y + v.y);
  // 覆写相等运算符，判断向量相等
  bool operator == (dynamic v) => x == v.x && y == v.y;
}

final x = Vector(3, 3);
final y = Vector(2, 2);
final z = Vector(1, 1);
print(x == (y + z)); //  输出true
```

#### Event Loop 机制

首先，我们需要建立这样一个概念，那就是 **Dart 是单线程的**。那单线程意味着什么呢？这意味着 Dart 代码是有序的，按照在 main 函数出现的次序一个接一个地执行，不会被其他代码中断。另外，作为支持 Flutter 这个 UI 框架的关键技术，Dart 当然也支持异步。需要注意的是，单线程和异步并不冲突。

这里有一个大前提，那就是我们的 App 绝大多数时间都在等待。比如，等用户点击、等网络请求返回、等文件 IO 结果，等等。而这些等待行为并不是阻塞的。比如说，网络请求，Socket 本身提供了 select 模型可以异步查询；而文件 IO，操作系统也提供了基于事件的回调机制。

所以，基于这些特点，单线程模型可以在等待的过程中做别的事情，等真正需要响应结果了，再去做对应的处理。因为等待过程并不是阻塞的，所以给我们的感觉就像是同时在做多件事情一样。但其实始终只有一个线程在处理你的事情。

等待这个行为是通过 Event Loop 驱动的。事件队列 Event Queue 会把其他平行世界（比如 Socket）完成的，需要主线程响应的事件放入其中。像其他语言一样，Dart 也有一个巨大的事件循环，在不断的轮询事件队列，取出事件（比如，键盘事件、I\O 事件、网络事件等），在主线程同步执行其回调函数，如下图所示：

![Microtask Queue 与 Event Queue](https://static001.geekbang.org/resource/image/70/bc/70dc4e1c222ddfaee8aa06df85c22bbc.png)

Dart 通过 `scheduleMicrotask` 和 `Future` 来创建 Microtask 和 Event。

正常情况下，一个 Future 异步任务的执行是相对简单的：在我们声明一个 Future 时，Dart 会将异步任务的函数执行体放入事件队列，然后立即返回，后续的代码继续同步执行。而当同步执行的代码执行完毕后，事件队列会按照加入事件队列的顺序（即声明顺序），依次取出事件，最后同步执行 Future 的函数体及后续的 then。

这意味着，then 与 Future 函数体共用一个事件循环。而如果 Future 有多个 then，它们也会按照链式调用的先后顺序同步执行，同样也会共用一个事件循环。

如果 Future 执行体已经执行完毕了，但你又拿着这个 Future 的引用，往里面加了一个 then 方法体，这时 Dart 会如何处理呢？面对这种情况，Dart 会将后续加入的 then 方法体放入微任务队列，尽快执行。

下面的代码演示了 Future 的执行规则，即，先加入事件队列，或者先声明的任务先执行；then 在 Future 结束后立即执行。

```
Future(() => print('f1'));//声明一个匿名Future
Future fx = Future(() =>  null);//声明Future fx，其执行体为null

//声明一个匿名Future，并注册了两个then。在第一个then回调里启动了一个微任务
Future(() => print('f2')).then((_) {
  print('f3');
  scheduleMicrotask(() => print('f4'));
}).then((_) => print('f5'));

//声明了一个匿名Future，并注册了两个then。第一个then是一个Future
Future(() => print('f6'))
  .then((_) => Future(() => print('f7')))
  .then((_) => print('f8'));

//声明了一个匿名Future
Future(() => print('f9'));

//往执行体为null的fx注册了了一个then
fx.then((_) => print('f10'));

//启动一个微任务
scheduleMicrotask(() => print('f11'));
print('f12');
```

![执行示例](https://static001.geekbang.org/resource/image/8a/8b/8a1106a01613fa999a35911fc5922e8b.gif)

#### 异步函数

对于一个异步函数来说，其返回时内部执行动作并未结束，因此需要返回一个 Future 对象，供调用者使用。调用者根据 Future 对象，来决定：是在这个 Future 对象上注册一个 then，等 Future 的执行体结束了以后再进行异步处理；还是一直同步等待 Future 执行体结束。

对于异步函数返回的 Future 对象，如果调用者决定同步等待，则需要在调用处使用 await 关键字，并且在调用处的函数体使用 async 关键字。

Dart 中的 await 并不是阻塞等待，而是异步等待。Dart 会将调用体的函数也视作异步函数，将等待语句的上下文放入 Event Queue 中，一旦有了结果，Event Loop 就会把它从 Event Queue 中取出，等待代码继续执行。

```
//声明了一个延迟2秒返回Hello的Future，并注册了一个then返回拼接后的Hello 2019
Future<String> fetchContent() =>
  Future<String>.delayed(Duration(seconds:2), () => "Hello")
    .then((x) => "$x 2019");
//异步函数会同步等待Hello 2019的返回，并打印
func() async => print(await fetchContent());

main() {
  print("func before");
  func();
  print("func after");
}
//运行这段代码，我们发现最终输出的顺序其实是“func before”“func after”“Hello 2019”。
```

#### 多线程

尽管 Dart 是基于单线程模型的，但为了进一步利用多核 CPU，将 CPU 密集型运算进行隔离，Dart 也提供了多线程机制，即 Isolate。在 Isolate 中，资源隔离做得非常好，每个 Isolate 都有自己的 Event Loop 与 Queue，**Isolate 之间不共享任何资源，只能依靠消息机制通信，因此也就没有资源抢占问题**。

和其他语言一样，Isolate 的创建非常简单，我们只要给定一个函数入口，创建时再传入一个参数，就可以启动 Isolate 了。

```
doSth(msg) => print(msg);

main() {
  Isolate.spawn(doSth, "Hi");
  ...
}
```

#### HTTP 网络编程

##### HttpClient

HttpClient 是 dart:io 库中提供的网络请求类，实现了基本的网络编程功能。

```
get() async {
  //创建网络调用示例，设置通用请求行为(超时时间)
  var httpClient = HttpClient();
  httpClient.idleTimeout = Duration(seconds: 5);

  //构造URI，设置user-agent为"Custom-UA"
  var uri = Uri.parse("https://flutter.dev");
  var request = await httpClient.getUrl(uri);
  request.headers.add("user-agent", "Custom-UA");

  //发起请求，等待响应
  var response = await request.close();

  //收到响应，打印结果
  if (response.statusCode == HttpStatus.ok) {
    print(await response.transform(utf8.decoder).join());
  } else {
    print('Error: \nHttp status ${response.statusCode}');
  }
}
```

这里需要注意的是，由于网络请求是异步行为，因此在 Flutter 中，所有网络编程框架都是以 Future 作为异步请求的包装，所以我们需要使用 await 与 async 进行非阻塞的等待。当然，你也可以注册 then，以回调的方式进行相应的事件处理。

##### http

HttpClient 使用方式虽然简单，但其接口却暴露了不少内部实现细节。比如，异步调用拆分得过细，链接需要调用方主动关闭，请求结果是字符串但却需要手动解码等。

http 是 Dart 官方提供的另一个网络请求类，相比于 HttpClient，易用性提升了不少。

```
// 添加依赖
dependencies:
  http: '>=0.11.3+12'
```

```
httpGet() async {
  //创建网络调用示例
  var client = http.Client();

  //构造URI
  var uri = Uri.parse("https://flutter.dev");

  //设置user-agent为"Custom-UA"，随后立即发出请求
  http.Response response = await client.get(uri, headers : {"user-agent" : "Custom-UA"});

  //打印请求结果
  if(response.statusCode == HttpStatus.ok) {
    print(response.body);
  } else {
    print("Error: ${response.statusCode}");
  }
}
```

##### dio

HttpClient 和 http 使用方式虽然简单，但其暴露的定制化能力都相对较弱，很多常用的功能都不支持（或者实现异常繁琐），比如取消请求、定制拦截器、Cookie 管理等。因此对于复杂的网络请求行为，我推荐使用目前在 Dart 社区人气较高的第三方 [dio](https://github.com/flutterchina/dio/blob/master/README-ZH.md) 来发起网络请求。

```
// 添加依赖
dependencies:
  dio: '>2.1.3'
```

```
void getRequest() async {
  //创建网络调用示例
  Dio dio = new Dio();

  //设置URI及请求user-agent后发起请求
  var response = await dio.get("https://flutter.dev", options:Options(headers: {"user-agent" : "Custom-UA"}));

 //打印请求结果
  if(response.statusCode == HttpStatus.ok) {
    print(response.data.toString());
  } else {
    print("Error: ${response.statusCode}");
  }
}
```

对于常见的上传及下载文件需求，dio 也提供了良好的支持：文件上传可以通过构建表单 FormData 实现，而文件下载则可以使用 download 方法搞定。

```
//使用FormData表单构建待上传文件
FormData formData = FormData.from({
  "file1": UploadFileInfo(File("./file1.txt"), "file1.txt"),
  "file2": UploadFileInfo(File("./file2.txt"), "file1.txt"),

});
//通过post方法发送至服务端
var responseY = await dio.post("https://xxx.com/upload", data: formData);
print(responseY.toString());

//使用download方法下载文件
dio.download("https://xxx.com/file1", "xx1.zip");

//增加下载进度回调函数
dio.download("https://xxx.com/file1", "xx2.zip", onReceiveProgress: (count, total) {
  //do something
});
```

此外，与 Android 的 okHttp 一样，dio 还提供了请求拦截器，通过拦截器，我们可以在请求之前，或响应之后做一些特殊的操作。比如可以为请求 option 统一增加一个 header，或是返回缓存数据，或是增加本地校验处理等等。

```
//增加拦截器
dio.interceptors.add(InterceptorsWrapper(
    onRequest: (RequestOptions options){
      //为每个请求头都增加user-agent
      options.headers["user-agent"] = "Custom-UA";
      //检查是否有token，没有则直接报错
      if(options.headers['token'] == null) {
        return dio.reject("Error:请先登录");
      }
      //检查缓存是否有数据
      if(options.uri == Uri.parse('http://xxx.com/file1')) {
        return dio.resolve("返回缓存数据");
      }
      //放行请求
      return options;
    }
));

//增加try catch，防止请求报错
try {
  var response = await dio.get("https://xxx.com/xxx.zip");
  print(response.data.toString());
}catch(e) {
  print(e);
}
```

#### JSON 解析

需要注意的是，由于 Flutter 不支持运行时反射，因此并没有提供像 Gson、Mantle 这样自动解析 JSON 的库来降低解析成本。在 Flutter 中，JSON 解析完全是手动的，开发者要做的事情多了一些，但使用起来倒也相对灵活。

所谓手动解析，是指使用 dart:convert 库中内置的 JSON 解码器，将 JSON 字符串解析成自定义对象的过程。使用这种方式，我们需要先将 JSON 字符串传递给 JSON.decode 方法解析成一个 Map，然后把这个 Map 传给自定义的类，进行相关属性的赋值。

```
String jsonString = '''
{
  "id":"123",
  "name":"张三",
  "score" : 95
}
''';
```

```
class Student{
  //属性id，名字与成绩
  String id;
  String name;
  int score;
  //构造方法
  Student({
    this.id,
    this.name,
    this.score
  });
  //JSON解析工厂类，使用字典数据为对象初始化赋值
  factory Student.fromJson(Map<String, dynamic> parsedJson){
    return Student(
        id: parsedJson['id'],
        name : parsedJson['name'],
        score : parsedJson ['score']
    );
  }
}
```

```
loadStudent() {
  //jsonString为JSON文本
  final jsonResponse = json.decode(jsonString);
  Student student = Student.fromJson(jsonResponse);
  print(student.name);
}
```

```
//用compute函数将json解析放到新Isolate
compute(parseStudent,jsonString).then((student)=>print(student.teacher.name));
```

#### 数据库

我们通常会使用 SQLite 数据库，除了基础的数据库读写操作之外，sqlite 还提供了更新、删除以及事务等高级特性，这与原生 Android、iOS 上的 SQLite 或是 MySQL 并无不同，因此这里就不再赘述了。你可以参考 sqflite 插件的[API 文档](https://pub.dev/documentation/sqflite/latest/)，或是查阅[SQLite 教程](http://www.sqlitetutorial.net/)了解具体的使用方法。

### State 的生命周期

- initState : 在 State 被插入视图树时被调用，用来进行渲染相关的初始化工作
- didChangeDependencies : initState 后及 State 对象依赖关系变化时被调用，用来处理 State 对象的依赖关系变化
- build : State 准备好数据需要进行渲染时被调用，用来进行视图的构建
- didUpdateWidget : 父 Widget setState 触发子 Widget 重建时被调用
- deactivate : 组件不可视时被调用
- dispose : 组件被销毁时调用

### 常用基础控件

#### [Text](https://api.flutter.dev/flutter/widgets/Text-class.html)

Text 支持两种类型的文本展示，一个是默认的展示单一样式的文本 Text，另一个是支持多种混合样式的富文本 Text.rich。

```
Text(
  'Hello, $_name! How are you?',
  textAlign: TextAlign.center,
  overflow: TextOverflow.ellipsis,
  style: TextStyle(fontWeight: FontWeight.bold),
)
```

```
const Text.rich(
  TextSpan(
    text: 'Hello', // default text style
    children: <TextSpan>[
      TextSpan(text: ' beautiful ', style: TextStyle(fontStyle: FontStyle.italic)),
      TextSpan(text: 'world', style: TextStyle(fontWeight: FontWeight.bold)),
    ],
  ),
)
```

#### [Image](https://api.flutter.dev/flutter/widgets/Image-class.html)

- 加载本地资源图片，如 `Image.asset(‘images/logo.png’);`
- 加载本地（File 文件）图片，如 `Image.file(new File(’/storage/xxx/xxx/test.jpg’));`
- 加载网络图片，如 `Image.network('http://xxx/xxx/test.gif');`

#### [FadeInImage](https://api.flutter.dev/flutter/widgets/FadeInImage-class.html)

在加载网络图片的时候，为了提升用户的等待体验，我们往往会加入占位图、加载动画等元素，但是默认的 Image.network 构造方法并不支持这些高级功能，这时候 FadeInImage 控件就派上用场了。

```
FadeInImage.assetNetwork(
  placeholder: 'assets/loading.gif', //gif占位
  image: 'https://xxx/xxx/xxx.jpg',
  fit: BoxFit.cover, //图片拉伸模式
  width: 200,
  height: 200,
)
```

#### [FloatingActionButton](https://api.flutter.dev/flutter/material/FloatingActionButton-class.html)

一个圆形的按钮，一般出现在屏幕内容的前面，用来处理界面中最常用、最基础的用户动作。

#### [RaisedButton](https://api.flutter.dev/flutter/material/RaisedButton-class.html)

凸起的按钮，默认带有灰色背景，被点击后灰色背景会加深。

#### [FlatButton](https://api.flutter.dev/flutter/material/FlatButton-class.html)

扁平化的按钮，默认透明背景，被点击后会呈现灰色背景。

#### [ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html)

ListView 可以沿一个方向（垂直或水平方向）来排列其所有子 Widget，因此常被用于需要展示一组连续视图元素的场景，比如通信录、优惠券、商家列表等。

```
// 默认构造函数，适用于列表中含有少量不变元素时使用
ListView(
  children: <Widget>[
    //设置ListTile组件的标题与图标
    ListTile(leading: Icon(Icons.map),  title: Text('Map')),
    ListTile(leading: Icon(Icons.mail), title: Text('Mail')),
    ListTile(leading: Icon(Icons.message), title: Text('Message')),
  ]);

// 构造函数 ListView.builder，则适用于子 Widget 比较多的场景
// itemBuilder，是列表项的创建方法。当列表滚动到相应位置时，ListView 会调用该方法创建对应的子 Widget。
// itemCount，表示列表项的数量，如果为空，则表示 ListView 为无限列表。
// itemExtent 并不是一个必填参数。但，对于定高的列表项元素，我强烈建议你提前设置好这个参数的值。但如果提前设置好 itemExtent，ListView 则可以提前计算好每一个列表项元素的相对位置，以及自身的视图高度，省去了无谓的计算。
ListView.builder(
    itemCount: 100, //元素个数
    itemExtent: 50.0, //列表项高度
    itemBuilder: (BuildContext context, int index) => ListTile(title: Text("title $index"), subtitle: Text("body $index"))
);

// ListView.separated 抽离出了分割线的创建方法 separatorBuilder，以便根据 index 设置不同样式的分割线。
ListView.separated(
    itemCount: 100,
    //index为偶数，创建绿色分割线；index为奇数，则创建红色分割线
    separatorBuilder: (BuildContext context, int index) => index %2 ==0? Divider(color: Colors.green) : Divider(color: Colors.red),
    //创建子Widget
    itemBuilder: (BuildContext context, int index) => ListTile(title: Text("title $index"), subtitle: Text("body $index"))
)
```

### 布局

Flutter 提供了 [31 种布局 Widget](https://flutter.dev/docs/development/ui/widgets/layout)，对布局控件的划分非常详细，一些相同（或相似）的视觉效果可以通过多种布局控件实现，因此布局类型相比原生 Android、iOS 平台多了不少。

#### 单子 Widget 布局：Container、Padding 与 Center

Container 内部提供了间距、背景样式等基础属性，为子 Widget 的摆放方式，及展现样式都提供了定制能力。而 Padding 与 Center 提供的功能，则正如其名一样简洁，就是对齐与居中。

```
Container(
  child: Text('Container（容器）在UI框架中是一个很常见的概念，Flutter也不例外。'),
  padding: EdgeInsets.all(18.0), // 内边距
  margin: EdgeInsets.all(44.0), // 外边距
  width: 180.0,
  height:240,
  alignment: Alignment.center, // 子Widget居中对齐
  decoration: BoxDecoration( //Container样式
    color: Colors.red, // 背景色
    borderRadius: BorderRadius.circular(10.0), // 圆角边框
  ),
)
```

![Container 示例](https://static001.geekbang.org/resource/image/fa/f7/fad72eb6917be0062df5a46a104f3ff7.png)

```
Padding(
  padding: EdgeInsets.all(44.0),
  child: Text('Container（容器）在UI框架中是一个很常见的概念，Flutter也不例外。'),
);
```

```
Scaffold(
  body: Center(child: Text("Hello")) // This trailing comma makes auto-formatting nicer for build methods.
);
```

#### 多子 Widget 布局：Row、Column 与 Expanded

Row 和 Column，提供了各子 Widget 间对齐的规则，以及容器自身扩充的规则，Expanded 控件可以使用容器内部的剩余空间。

```
//Row的用法示范
Row(
  children: <Widget>[
    Container(color: Colors.yellow, width: 60, height: 80,),
    Container(color: Colors.red, width: 100, height: 180,),
    Container(color: Colors.black, width: 60, height: 80,),
    Container(color: Colors.green, width: 60, height: 80,),
  ],
);
```

![Row 示例](https://static001.geekbang.org/resource/image/90/72/909ad17a65cad573bca0c84c09b7fc72.png)

```
//Column的用法示范
Column(
  children: <Widget>[
    Container(color: Colors.yellow, width: 60, height: 80,),
    Container(color: Colors.red, width: 100, height: 180,),
    Container(color: Colors.black, width: 60, height: 80,),
    Container(color: Colors.green, width: 60, height: 80,),
  ],
);

```

![Column 示例](https://static001.geekbang.org/resource/image/9a/86/9a1bd0067d1bbb03d5ab74f411afae86.png)

```
// 使用 Expanded 填充剩余空间
Row(
  children: <Widget>[
    Expanded(flex: 1, child: Container(color: Colors.yellow, height: 60)), //设置了flex=1，因此宽度由Expanded来分配
    Container(color: Colors.red, width: 100, height: 180,),
    Container(color: Colors.black, width: 60, height: 80,),
    Expanded(flex: 1, child: Container(color: Colors.green,height: 60),)/设置了flex=1，因此宽度由Expanded来分配
  ],
);
```

![Expanded 示例](https://static001.geekbang.org/resource/image/0e/04/0ed3fba81215150607edddaafbe9b304.png)

我们可以根据主轴与纵轴，设置子 Widget 在这两个方向上的对齐规则 mainAxisAlignment 与 crossAxisAlignment。比如，主轴方向 start 表示靠左对齐、center 表示横向居中对齐、end 表示靠右对齐、spaceEvenly 表示按固定间距对齐；而纵轴方向 start 则表示靠上对齐、center 表示纵向居中对齐、end 表示靠下对齐。

下图展示了在 Row 中设置不同方向的对齐规则后的呈现效果：

![Row 主轴](https://static001.geekbang.org/resource/image/9f/87/9f3a8a9e197b350f6c0aad6f5195fc87.png)

![Row 纵轴](https://static001.geekbang.org/resource/image/d8/9b/d8fc6d0aa98be8a6b1867b24a833b89b.png)

#### 层叠 Widget 布局：Stack 与 Positioned

Stack 提供了层叠布局的容器，而 Positioned 则提供了设置子 Widget 位置的能力。

```
Stack(
  children: <Widget>[
    Container(color: Colors.yellow, width: 300, height: 300),//黄色容器
    Positioned(
      left: 18.0,
      top: 18.0,
      child: Container(color: Colors.green, width: 50, height: 50),//叠加在黄色容器之上的绿色控件
    ),
    Positioned(
      left: 18.0,
      top:70.0,
      child: Text("Stack提供了层叠布局的容器"),//叠加在黄色容器之上的文本
    )
  ],
)
```

![Stack 示例](https://static001.geekbang.org/resource/image/bb/36/bb046cc53ea595a02a564a4387a99c36.png)

### 资源引用

在移动开发中，常见的资源类型包括 JSON 文件、配置文件、图标、图片以及字体文件等。它们都会被打包到 App 安装包中，而 App 中的代码可以在运行时访问这些资源。

关于资源的存放位置，Flutter 并没有像 Android 那样预先定义资源的目录结构，所以我们可以把资源存放在项目中的任意目录下，只需要使用根目录下的 pubspec.yaml 文件，对这些资源的所在位置进行显式声明就可以了，以帮助 Flutter 识别出这些资源。

而在指定路径名的过程中，我们既可以对每一个文件进行挨个指定，也可以采用子目录批量指定的方式。需要注意的是，目录批量指定并不递归，只有在该目录下的文件才可以被包括，如果下面还有子目录的话，需要单独声明子目录下的文件。

```
assets
├── background.jpg
├── icons
│   └── food_icon.jpg
├── loading.gif
└── result.json
```

```
# pubspec.yaml
flutter:
  assets:
    - assets/background.jpg   #挨个指定资源路径
    - assets/loading.gif  #挨个指定资源路径
    - assets/result.json  #挨个指定资源路径
    - assets/icons/    #子目录批量指定
    - assets/ #根目录也是可以批量指定的
```

对于图片类资源的访问，我们可以使用 Image.asset 构造方法完成图片资源的加载及显示。

```
Image.asset('assets/background.jpg');
```

而对于其他资源文件的加载，我们可以通过 Flutter 应用的主资源 Bundle 对象 rootBundle，来直接访问。对于字符串文件资源，我们使用 loadString 方法；而对于二进制文件资源，则通过 load 方法。

```
rootBundle.loadString('assets/result.json').then((msg)=>print(msg));
```

### 第三方包依赖

引用第三方包，需要在其 Pub 上进行公开发布，我们可以访问 [https://pub.dev/](https://pub.dev/) 来获取可用的第三方包。Pub 就类似于 Node.js 的 NPM。

### 用户交互事件

#### 指针事件

指针事件表示用户交互的原始触摸数据，如手指接触屏幕 PointerDownEvent、手指在屏幕上移动 PointerMoveEvent、手指抬起 PointerUpEvent，以及触摸取消 PointerCancelEvent，这与原生系统的底层触摸事件抽象是一致的。

关于组件层面的原始指针事件的监听，Flutter 提供了 Listener Widget，可以监听其子 Widget 的原始指针事件。

```
Listener(
  child: Container(
    color: Colors.red,//背景色红色
    width: 300,
    height: 300,
  ),
  onPointerDown: (event) => print("down $event"),//手势按下回调
  onPointerMove:  (event) => print("move $event"),//手势移动回调
  onPointerUp:  (event) => print("up $event"),//手势抬起回调
);
```

#### 手势识别

使用 Listener 可以直接监听指针事件。不过指针事件毕竟太原始了，如果我们想要获取更多的触摸事件细节，比如判断用户是否正在拖拽控件，直接使用指针事件的话就会非常复杂。

通常情况下，响应用户交互行为的话，我们会使用封装了手势语义操作的 Gesture，如点击 onTap、双击 onDoubleTap、长按 onLongPress、拖拽 onPanUpdate、缩放 onScaleUpdate 等。另外，Gesture 可以支持同时分发多个手势交互行为，意味着我们可以通过 Gesture 同时监听多个事件。

Gesture 是手势语义的抽象，而如果我们想从组件层监听手势，则需要使用 GestureDetector。GestureDetector 是一个处理各种高级用户触摸行为的 Widget，与 Listener 一样，也是一个功能性组件。

```
//红色container坐标
double _top = 0.0;
double _left = 0.0;
Stack(//使用Stack组件去叠加视图，便于直接控制视图坐标
  children: <Widget>[
    Positioned(
      top: _top,
      left: _left,
      child: GestureDetector(//手势识别
        child: Container(color: Colors.red,width: 50,height: 50),//红色子视图
        onTap: ()=>print("Tap"),//点击回调
        onDoubleTap: ()=>print("Double Tap"),//双击回调
        onLongPress: ()=>print("Long Press"),//长按回调
        onPanUpdate: (e) {//拖动回调
          setState(() {
            //更新位置
            _left += e.delta.dx;
            _top += e.delta.dy;
          });
        },
      ),
    )
  ],
);
```

### 组件间数据传递

在 Flutter 中实现跨组件数据传递的标准方式是通过属性传值。但是，对于稍微复杂一点的、尤其视图层级比较深的 UI 样式，一个属性可能需要跨越很多层才能传递给子组件，这种传递方式就会导致中间很多并不需要这个属性的组件也需要接收其子 Widget 的数据，不仅繁琐而且冗余。

所以，对于数据的跨层传递，Flutter 还提供了三种方案：InheritedWidget、Notification 和 EventBus。

#### InheritedWidget

InheritedWidget 是 Flutter 中的一个功能型 Widget，适用于在 Widget 树中共享数据的场景。通过它，我们可以高效地将数据在 Widget 树中进行跨层传递。

```
class CountContainer extends InheritedWidget {
  //方便其子Widget在Widget树中找到它
  static CountContainer of(BuildContext context) => context.inheritFromWidgetOfExactType(CountContainer) as CountContainer;

  final _MyHomePageState model;//直接使用MyHomePage中的State获取数据
  final Function() increment;

  CountContainer({
    Key key,
    @required this.model,
    @required this.increment,
    @required Widget child,
  }): super(key: key, child: child);
}


class _MyHomePageState extends State<MyHomePage> {
  int count = 0;
  void _incrementCounter() => setState(() {count++;});//修改计数器

  @override
  Widget build(BuildContext context) {
    return CountContainer(
      model: this,//将自身作为model交给CountContainer
      increment: _incrementCounter,//提供修改数据的方法
      child:Counter()
    );
  }
}

class Counter extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //获取InheritedWidget节点
    CountContainer state = CountContainer.of(context);
    return Scaffold(
      ...
      body: Text(
        'You have pushed the button this many times: ${state.model.count}', //关联数据读方法
      ),
      floatingActionButton: FloatingActionButton(onPressed: state.increment), //关联数据修改方法
    );
  }
}
```

#### Notification

Notification 是 Flutter 中进行跨层数据共享的另一个重要的机制。如果说 InheritedWidget 的数据流动方式是从父 Widget 到子 Widget 逐层传递，那 Notificaiton 则恰恰相反，数据流动方式是从子 Widget 向上传递至父 Widget。这样的数据传递机制适用于子 Widget 状态变更，发送通知上报的场景。

自定义通知的监听与 ScrollNotification 并无不同，而如果想要实现自定义通知，我们首先需要继承 Notification 类。Notification 类提供了 dispatch 方法，可以让我们沿着 context 对应的 Element 节点树向上逐层发送通知。

```
class CustomNotification extends Notification {
  CustomNotification(this.msg);
  final String msg;
}

//抽离出一个子Widget用来发通知
class CustomChild extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      //按钮点击时分发通知
      onPressed: () => CustomNotification("Hi").dispatch(context),
      child: Text("Fire Notification"),
    );
  }
}
```

```
class _MyHomePageState extends State<MyHomePage> {
  String _msg = "通知：";
  @override
  Widget build(BuildContext context) {
    //监听通知
    return NotificationListener<CustomNotification>(
        onNotification: (notification) {
          setState(() {_msg += notification.msg+"  ";});//收到子Widget通知，更新msg
        },
        child:Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[Text(_msg),CustomChild()],//将子Widget加入到视图树中
        )
    );
  }
}
```

#### EventBus

无论是 InheritedWidget 还是 Notificaiton，它们的使用场景都需要依靠 Widget 树，也就意味着只能在有父子关系的 Widget 之间进行数据共享。但是，组件间数据传递还有一种常见场景：这些组件间不存在父子关系。这时，EventBus 就登场了。

事件总线是在 Flutter 中实现跨组件通信的机制。它遵循发布 / 订阅模式，允许订阅者订阅事件，当发布者触发事件时，订阅者和发布者之间可以通过事件进行交互。发布者和订阅者之间无需有父子关系，甚至非 Widget 对象也可以发布 / 订阅。这些特点与其他平台的事件总线机制是类似的。

需要注意的是，EventBus 是一个第三方插件，因此我们需要在 pubspec.yaml 文件中声明它：

```
dependencies:
  event_bus: 1.1.0
```

```
// EventBus 的使用方式灵活，可以支持任意对象的传递。定义一个有字符串属性的自定义事件类 CustomEvent
class CustomEvent {
  String msg;
  CustomEvent(this.msg);
}
```

```
//建立公共的event bus
EventBus eventBus = new EventBus();
//第一个页面
class _FirstScreenState extends  State<FirstScreen>  {

  String msg = "通知：";
  StreamSubscription subscription;
  @override
  initState() {
   //监听CustomEvent事件，刷新UI
    subscription = eventBus.on<CustomEvent>().listen((event) {
      setState(() {msg+= event.msg;});//更新msg
    });
    super.initState();
  }
  dispose() {
    subscription.cancel();//State销毁时，清理注册
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body:Text(msg),
      ...
    );
  }
}
```

```
class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      ...
      body: RaisedButton(
          child: Text('Fire Event'),
          // 触发CustomEvent事件
          onPressed: ()=> eventBus.fire(CustomEvent("hello"))
      ),
    );
  }
}
```

### 路由

在 Flutter 中，页面之间的跳转是通过 Route 和 Navigator 来管理的：

- Route 是页面的抽象，主要负责创建对应的界面，接收参数，响应 Navigator 打开和关闭
- 而 Navigator 则会维护一个路由栈管理 Route，Route 打开即入栈，Route 关闭即出栈，还可以直接替换栈内的某一个 Route

而根据是否需要提前注册页面标识符，Flutter 中的路由管理可以分为两种方式：

- 基本路由。无需提前注册，在页面切换时需要自己构造页面实例
- 命名路由。需要提前注册页面标识符，在页面切换时通过标识符直接打开新的路由

#### 基本路由

在 Flutter 中，基本路由的使用方法和 Android/iOS 打开新页面的方式非常相似。要导航到一个新的页面，我们需要创建一个 MaterialPageRoute 的实例，调用 Navigator.push 方法将新页面压到堆栈的顶部。

其中，MaterialPageRoute 是一种路由模板，定义了路由创建及切换过渡动画的相关配置，可以针对不同平台，实现与平台页面切换动画风格一致的路由切换动画。

而如果我们想返回上一个页面，则需要调用 Navigator.pop 方法从堆栈中删除这个页面。

```
class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      //打开页面
      onPressed: ()=> Navigator.push(context, MaterialPageRoute(builder: (context) => SecondScreen()));
    );
  }
}

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      // 回退页面
      onPressed: ()=> Navigator.pop(context)
    );
  }
}
```

#### 命名路由

要想通过名字来指定页面切换，我们必须先给应用程序 MaterialApp 提供一个页面名称映射规则，即路由表 routes，这样 Flutter 才知道名字与页面 Widget 的对应关系。

路由表实际上是一个 Map，其中 key 值对应页面名字，而 value 值则是一个 WidgetBuilder 回调函数，我们需要在这个函数中创建对应的页面。而一旦在路由表中定义好了页面名字，我们就可以使用 Navigator.pushNamed 来打开页面了。

```
MaterialApp(
    ...
    //注册路由
    routes:{
      "second_page":(context)=>SecondPage(),
    },
);
//使用名字打开页面
Navigator.pushNamed(context,"second_page");
```

不过由于路由的注册和使用都采用字符串来标识，这就会带来一个隐患：如果我们打开了一个不存在的路由会怎么办？在注册路由表时，Flutter 提供了 UnknownRoute 属性，我们可以对未知的路由标识符进行统一的页面跳转处理。

```
MaterialApp(
    ...
    //注册路由
    routes:{
      "second_page":(context)=>SecondPage(),
    },
    //错误路由处理，统一返回UnknownPage
    onUnknownRoute: (RouteSettings setting) => MaterialPageRoute(builder: (context) => UnknownPage()),
);

//使用错误名字打开页面
Navigator.pushNamed(context,"unknown_page");
```

#### 页面参数

与基本路由能够精确地控制目标页面初始化方式不同，命名路由只能通过字符串名字来初始化固定目标页面。为了解决不同场景下目标页面的初始化需求，Flutter 提供了路由参数的机制，可以在打开路由时传递相关参数，在目标页面通过 RouteSettings 来获取页面参数。

```
//打开页面时传递字符串参数
Navigator.of(context).pushNamed("second_page", arguments: "Hey");

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //取出路由参数
    String msg = ModalRoute.of(context).settings.arguments as String;
    return Text(msg);
  }
}
```

与 Android 提供的 startActivityForResult 方法可以监听目标页面的处理结果类似，Flutter 也提供了返回参数的机制。在 push 目标页面时，可以设置目标页面关闭时监听函数，以获取返回参数；而目标页面可以在关闭路由时传递相关参数。

```
class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          Text('Message from first screen: $msg'),
          RaisedButton(
            child: Text('back'),
            //页面关闭时传递参数
            onPressed: ()=> Navigator.pop(context,"Hi")
          )
        ]
      ));
  }
}

class _FirstPageState extends State<FirstPage> {
  String _msg='';
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: Column(children: <Widget>[
        RaisedButton(
            child: Text('命名路由（参数&回调）'),
            //打开页面，并监听页面关闭时传递的参数
            onPressed: ()=> Navigator.pushNamed(context, "third_page",arguments: "Hey").then((msg)=>setState(()=>_msg=msg)),
        ),
        Text('Message from Second screen: $_msg'),

      ],),
    );
  }
}
```

### APP 的事件监听

在原生 Android、iOS 开发中，有时我们需要在对应的 App 生命周期事件中做相应处理，比如 App 从后台进入前台、从前台退到后台，或是在 UI 绘制完成后做一些处理。

这样的需求，在原生开发中，我们可以通过重写 Activity、ViewController 生命周期回调方法，或是注册应用程序的相关通知，来监听 App 的生命周期并做相应的处理。而在 Flutter 中，我们可以利用 WidgetsBindingObserver 类，来实现同样的需求。

```
abstract class WidgetsBindingObserver {
  //页面pop
  Future<bool> didPopRoute() => Future<bool>.value(false);
  //页面push
  Future<bool> didPushRoute(String route) => Future<bool>.value(false);
  //系统窗口相关改变回调，如旋转
  void didChangeMetrics() { }
  //文本缩放系数变化
  void didChangeTextScaleFactor() { }
  //系统亮度变化
  void didChangePlatformBrightness() { }
  //本地化语言变化
  void didChangeLocales(List<Locale> locale) { }
  //App生命周期变化
  //resumed: 可见并能相应用户的输入
  //inactive: 处在并不活动状态，无法处理用户相应
  //paused: 不可见并不能相应用户的输入，但是在后台继续活动中
  void didChangeAppLifecycleState(AppLifecycleState state) { }
  //内存警告回调
  void didHaveMemoryPressure() { }
  //Accessibility相关特性回调
  void didChangeAccessibilityFeatures() {}
}
```

可以看到，WidgetsBindingObserver 这个类提供的回调函数非常丰富，常见的屏幕旋转、屏幕亮度、语言变化、内存警告都可以通过这个实现进行回调。我们通过给 WidgetsBinding 的单例对象设置监听器，就可以监听对应的回调方法。

```
class AppLifecycleReactor extends StatefulWidget {
  const AppLifecycleReactor({ Key key }) : super(key: key);

  @override
  _AppLifecycleReactorState createState() => _AppLifecycleReactorState();
}

class _AppLifecycleReactorState extends State<AppLifecycleReactor> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  AppLifecycleState _notification;

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    setState(() { _notification = state; });
  }

  @override
  Widget build(BuildContext context) {
    return Text('Last notification: $_notification');
  }
}
```

### 本地存储

数据持久化的应用场景有很多。比如，用户的账号登录信息需要保存，用于每次与 Web 服务验证身份；又比如，下载后的图片需要缓存，避免每次都要重新加载，浪费用户流量。

#### 文件

文件是存储在某种介质（比如磁盘）上指定路径的、具有文件名的一组有序信息的集合。从其定义看，要想以文件的方式实现数据持久化，我们首先需要确定一件事儿：数据放在哪儿？这，就意味着要定义文件的存储路径。

Flutter 提供了两种文件存储的目录，即临时（Temporary）目录与文档（Documents）目录：

- 临时目录是操作系统可以随时清除的目录，通常被用来存放一些不重要的临时缓存数据。这个目录在 iOS 上对应着 NSTemporaryDirectory 返回的值，而在 Android 上则对应着 getCacheDir 返回的值。
- 文档目录则是只有在删除应用程序时才会被清除的目录，通常被用来存放应用产生的重要数据文件。在 iOS 上，这个目录对应着 NSDocumentDirectory，而在 Android 上则对应着 AppData 目录。

```
//创建文件目录
Future<File> get _localFile async {
  final directory = await getApplicationDocumentsDirectory();
  final path = directory.path;
  return File('$path/content.txt');
}
//将字符串写入文件
Future<File> writeContent(String content) async {
  final file = await _localFile;
  return file.writeAsString(content);
}
//从文件读出字符串
Future<String> readContent() async {
  try {
    final file = await _localFile;
    String contents = await file.readAsString();
    return contents;
  } catch (e) {
    return "";
  }
}
```

有了文件读写函数，我们就可以在代码中对 content.txt 这个文件进行读写操作了。

#### SharedPreferences

文件比较适合大量的、有序的数据持久化，如果我们只是需要缓存少量的键值对信息（比如记录用户是否阅读了公告，或是简单的计数），则可以使用 SharedPreferences。

SharedPreferences 会以原生平台相关的机制，为简单的键值对数据提供持久化存储，即在 iOS 上使用 NSUserDefaults，在 Android 使用 SharedPreferences。

```
//读取SharedPreferences中key为counter的值
Future<int>_loadCounter() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  int  counter = (prefs.getInt('counter') ?? 0);
  return counter;
}

//递增写入SharedPreferences中key为counter的值
Future<void>_incrementCounter() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
    int counter = (prefs.getInt('counter') ?? 0) + 1;
    prefs.setInt('counter', counter);
}
```

在完成了计数器存取方法的封装后，我们就可以在代码中随时更新并持久化计数器数据了。可以看到，SharedPreferences 的使用方式非常简单方便。不过需要注意的是，以键值对的方式只能存储基本类型的数据，比如 int、double、bool 和 string。

## 扩展
### 为什么需要做状态管理，怎么做？

如果我们的应用足够简单，数据流动的方向和顺序是清晰的，我们只需要将数据映射成视图就可以了。作为声明式的框架，Flutter 可以自动处理数据到渲染的全过程，通常并不需要状态管理。

但，随着产品需求迭代节奏加快，项目逐渐变得庞大时，我们往往就需要管理不同组件、不同页面之间共享的数据关系。当需要共享的数据关系达到几十上百个的时候，我们就很难保持清晰的数据流动方向和顺序了，导致应用内各种数据传递嵌套和回调满天飞。在这个时候，我们迫切需要一个解决方案，来帮助我们理清楚这些共享数据的关系，于是状态管理框架便应运而生。

Flutter 在设计声明式 UI 上借鉴了不少 React 的设计思想，因此涌现了诸如 flutter_redux、flutter_mobx 、fish_redux 等基于前端设计理念的状态管理框架。但这些框架大都比较复杂，且需要对框架设计概念有一定理解，学习门槛相对较高。

而源自 Flutter 官方的状态管理框架 Provider 则相对简单得多，不仅容易理解，而且框架的入侵性小，还可以方便地组合和控制 UI 刷新粒度。因此，在 Google I/O 2019 大会一经面世，Provider 就成为了官方推荐的状态管理方式之一。

从名字就可以看出，Provider 是一个用来提供数据的框架。它是 InheritedWidget 的语法糖，提供了依赖注入的功能，允许在 Widget 树中更加灵活地处理和传递数据。

那么，什么是依赖注入呢？通俗地说，依赖注入是一种可以让我们在需要时提取到所需资源的机制，即：预先将某种“资源”放到程序中某个我们都可以访问的位置，当需要使用这种“资源”时，直接去这个位置拿即可，而无需关心“资源”是谁放进去的。

为了使用 Provider，我们需要解决以下 3 个问题：

- 资源（即数据状态）如何封装？
- 资源放在哪儿，才都能访问得到？
- 具体使用时，如何取出资源？

首先需要在 pubspec.yaml 文件中添加 Provider 的依赖

```
dependencies:
  provider: 3.0.0+1  #provider依赖
```

```
//定义需要共享的数据模型，通过混入ChangeNotifier管理听众
class CounterModel with ChangeNotifier {
  int _count = 0;
  //读方法
  int get counter => _count;
  //写方法
  void increment() {
    _count++;
    notifyListeners();//通知听众刷新
  }
}
```

资源已经封装完毕，接下来我们就需要考虑把它放到哪儿了。

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
     //通过Provider组件封装数据资源
    return ChangeNotifierProvider.value(
        value: CounterModel(),//需要共享的数据资源
        child: MaterialApp(
          home: FirstPage(),
        )
    );
  }
}
```

最后，在注入数据资源完成之后，我们就可以在 FirstPage 和 SecondPage 这两个子 Widget 完成数据的读写操作了。

关于读数据，与 InheritedWidget 一样，我们可以通过 Provider.of 方法来获取资源数据。而如果我们想写数据，则需要通过获取到的资源数据，调用其暴露的更新数据方法

```
//第一个页面，负责读数据
class FirstPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //取出资源
    final _counter = Provider.of<CounterModel>(context);
    return Scaffold(
      //展示资源中的数据
      body: Text('Counter: ${_counter.counter}'),
      //跳转到SecondPage
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (context) => SecondPage()))
      ));
  }
}

//第二个页面，负责读写数据
class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //取出资源
    final _counter = Provider.of<CounterModel>(context);
    return Scaffold(
      //展示资源中的数据
      body: Text('Counter: ${_counter.counter}'),
      //用资源更新方法来设置按钮点击回调
      floatingActionButton:FloatingActionButton(
          onPressed: _counter.increment,
          child: Icon(Icons.add),
     ));
  }
}
```

#### Consumer

通过上面的示例可以看到，使用 Provider.of 获取资源，可以得到资源暴露的数据的读写接口，在实现数据的共享和同步上还是比较简单的。但是，滥用 Provider.of 方法也有副作用，那就是当数据更新时，页面中其他的子 Widget 也会跟着一起刷新。

那么，有没有办法能够在数据资源发生变化时，只刷新对资源存在依赖关系的 Widget，而其他 Widget 保持不变呢？

Consumer 使用了 Builder 模式创建 UI，收到更新通知就会通过 builder 重新构建 Widget。

```
class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //使用Consumer来封装counter的读取
      body: Consumer<CounterModel>(
        //builder函数可以直接获取到counter参数
        builder: (context, CounterModel counter, _) => Text('Value: ${counter.counter}')),
      //使用Consumer来封装increment的读取
      floatingActionButton: Consumer<CounterModel>(
        //builder函数可以直接获取到increment参数
        builder: (context, CounterModel counter, child) => FloatingActionButton(
          onPressed: counter.increment,
          child: child,
        ),
        child: TestIcon(),
      ),
    );
  }
}
```

可以看到，Consumer 中的 builder 实际上就是真正刷新 UI 的函数，它接收 3 个参数，即 context、model 和 child。其中：context 是 Widget 的 build 方法传进来的 BuildContext，model 是我们需要的数据资源，而 child 则用来构建那些与数据资源无关的部分。在数据资源发生变更时，builder 会多次执行，但 child 不会重建。

#### 多状态的资源封装

多个数据状态与单个数据的封装并无不同，如果需要支持数据的读写，我们需要一个接一个地为每一个数据状态都封装一个单独的资源封装类；而如果数据是只读的，则可以直接传入原始的数据对象，从而省去资源封装的过程。

在单状态的案例中，我们通过 Provider 的升级版 ChangeNotifierProvider 实现了可读写资源的注入，而如果我们想注入多个资源，则可以使用 Provider 的另一个升级版 MultiProvider，来实现多个 Provider 的组合注入。

在下面的例子中，我们通过 MultiProvider 往 App 实例内注入了 double 和 CounterModel 这两个资源 Provider：

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(providers: [
      Provider.value(value: 30.0),//注入字体大小
      ChangeNotifierProvider.value(value: CounterModel())//注入计数器实例
    ],
    child: MaterialApp(
      home: FirstPage(),
    ));
  }
}
```

使用 Provider.of 方式来获取资源。相较于单状态资源的获取来说，获取多个资源时，我们只需要依次读取每一个资源即可：

```
final _counter = Provider.of<CounterModel>(context);//获取计时器实例
final textSize = Provider.of<double>(context);//获取字体大小
```

而如果以 Consumer 的方式来获取资源的话，我们只要使用 Consumer2 对象（这个对象提供了读取两个数据资源的能力），就可以一次性地获取字体大小与计数器实例这两个数据资源：

```
//使用Consumer2获取两个数据资源
Consumer2<CounterModel,double>(
  //builder函数以参数的形式提供了数据资源
  builder: (context, CounterModel counter, double textSize, _) => Text(
      'Value: ${counter.counter}',
      style: TextStyle(fontSize: textSize))
)
```

可以看到，Consumer2 与 Consumer 的使用方式基本一致，只不过是在 builder 方法中多了一个数据资源参数。事实上，如果你希望在子 Widget 中共享更多的数据，我们最多可以使用到 Consumer6，即共享 6 个数据资源。

## 应用场景
### 如何进行开发环境搭建
#### 安装 Flutter

1. 去 Flutter 官网下载其最新可用的安装包，[转到下载页](https://flutter.io/sdk-archive/#macos)。
2. 进入到想安装的目录，执行解压命令。
3. 根据你的 shell 设置添加 Flutter 相关工具到 path 中。
4. 运行 `flutter doctor` 检查并解决问题。

#### 安装 Android Studio

1. 执行 `brew cask install android-studio` 进行安装。
2. 没有 android-sdk 有个提示，可以取消让 Android Studio 自己去下载 sdk。
3. 打开 **AVD Manager** ，点击 **Create Virtual Device** 按钮选择并创建一个 Android 模拟器。
4. 打开 **Plugins** 搜索安装 Flutter 插件。
5. 打开 **SDK Manager** ，点击 **SDK Tools** ，取消勾选 **Hide Obsolete Packages** ，选中 **Android SDK Tools (Obsolete)**，点击 **Apply**。这样就下载了等下要用到的 sdkmanager 。
6. 执行 `flutter doctor --android-licenses` 添加 Android license 。
7. 执行 `flutter doctor` 检查 Android 工具链。

#### 安装 XCode

1. 访问 App Store 安装 Xcode。
2. 命令行执行 `open -a Simulator` 打开 IOS 模拟器，通过 **Hardware** 里的 **Device** 来设置不同的模拟器。
3. 执行 `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer` 和 `sudo xcodebuild -runFirstLaunch` 将 Xcode 安装完整。
4. 执行 `brew install cocoapods` 安装 cocoapods。
5. 执行 `flutter doctor` 检查 IOS 工具链。

#### 通过 Flutter 运行模拟器

```bash
# 查看当前可用的模拟器
flutter emulators
# 关联并启动一个模拟器
flutter emulators --launch <emulator id>
# 运行一个 flutter 项目，可以到安装的 flutter 的 hello_world 目录去执行下。
flutter run
```

### 如何实现视差滚动

通过 [CustomScrollView](https://api.flutter.dev/flutter/widgets/CustomScrollView-class.html) 可以实现方便的实现视差滚动。

```
CustomScrollView(
  slivers: <Widget>[
    const SliverAppBar(
      pinned: true,
      expandedHeight: 250.0,
      flexibleSpace: FlexibleSpaceBar(
        title: Text('Demo'),
      ),
    ),
    SliverGrid(
      gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 200.0,
        mainAxisSpacing: 10.0,
        crossAxisSpacing: 10.0,
        childAspectRatio: 4.0,
      ),
      delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          return Container(
            alignment: Alignment.center,
            color: Colors.teal[100 * (index % 9)],
            child: Text('Grid Item $index'),
          );
        },
        childCount: 20,
      ),
    ),
    SliverFixedExtentList(
      itemExtent: 50.0,
      delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          return Container(
            alignment: Alignment.center,
            color: Colors.lightBlue[100 * (index % 9)],
            child: Text('List Item $index'),
          );
        },
      ),
    ),
  ],
)
```

### 如何实现下拉刷新、触底刷新、回到顶部等功能

我们可以通过 [ScrollControler](https://api.flutter.dev/flutter/widgets/ScrollController-class.html) 对 ListView 的滚动信息进行监听以实现相应功能。如果需要获取更复杂的滚动信息可以通过 [ScrollNotification](https://api.flutter.dev/flutter/widgets/ScrollNotification-class.html) 和 [NotificationListener](https://api.flutter.dev/flutter/widgets/NotificationListener-class.html) 来进行实现。

以下是关键代码：

```
ScrollController _controller;

// 创建控制器并注册滚动监听
@override
void initState() {
  _controller = ScrollController();
  _controller.addListener(() {
    print(_controller.offset);
    if(_controller.offset == _controller.position.maxScrollExtent){
      print("滚动到底部");
    }else if(_controller.offset == _controller.position.minScrollExtent){
      print("滚动到顶部");
    }
  });
}

// 将控制器绑定到相应的 ListView
ListView.builder(
 controller: _controller,//初始化传入控制器
 itemCount: 100,//列表元素总数
 itemBuilder: (context, index) => ListTile(title: Text("Index : $index")),//列表项构造方法
)

// 回到顶部
_controller.animateTo(.0,
  duration: Duration(milliseconds: 200),
  curve: Curves.ease
);
```

### 如何实现视图的自绘

Flutter 提供了非常丰富的控件和布局方式，使得我们可以通过组合去构建一个新的视图。但对于一些不规则的视图，用 SDK 提供的现有 Widget 组合可能无法实现，比如饼图，k 线图等，这个时候我们就需要自己用画笔去绘制了。

在原生 iOS 和 Android 开发中，我们可以继承 UIView/View，在 drawRect/onDraw 方法里进行绘制操作。其实，在 Flutter 中也有类似的方案，那就是 [CustomPaint](https://api.flutter.dev/flutter/widgets/CustomPaint-class.html)。

CustomPaint 是用以承接自绘控件的容器，并不负责真正的绘制。既然是绘制，那就需要用到画布与画笔。在 Flutter 中，画布是 Canvas，画笔则是 Paint，而画成什么样子，则由定义了绘制逻辑的 CustomPainter 来控制。将 CustomPainter 设置给容器 CustomPaint 的 painter 属性，我们就完成了一个自绘控件的封装。

对于画笔 Paint，我们可以配置它的各种属性，比如颜色、样式、粗细等；而画布 Canvas，则提供了各种常见的绘制方法，比如画线 drawLine、画矩形 drawRect、画点 DrawPoint、画路径 drawPath、画圆 drawCircle、画圆弧 drawArc 等。

这样，我们就可以在 CustomPainter 的 paint 方法里，通过 Canvas 与 Paint 的配合，实现定制化的绘制逻辑。

```
class WheelPainter extends CustomPainter {
 // 设置画笔颜色
  Paint getColoredPaint(Color color) {//根据颜色返回不同的画笔
    Paint paint = Paint();//生成画笔
    paint.color = color;//设置画笔颜色
    return paint;
  }

  @override
  void paint(Canvas canvas, Size size) {//绘制逻辑
    double wheelSize = min(size.width,size.height)/2;//饼图的尺寸
    double nbElem = 6;//分成6份
    double radius = (2 * pi) / nbElem;//1/6圆
    //包裹饼图这个圆形的矩形框
    Rect boundingRect = Rect.fromCircle(center: Offset(wheelSize, wheelSize), radius: wheelSize);
    // 每次画1/6个圆弧
    canvas.drawArc(boundingRect, 0, radius, true, getColoredPaint(Colors.orange));
    canvas.drawArc(boundingRect, radius, radius, true, getColoredPaint(Colors.black38));
    canvas.drawArc(boundingRect, radius * 2, radius, true, getColoredPaint(Colors.green));
    canvas.drawArc(boundingRect, radius * 3, radius, true, getColoredPaint(Colors.red));
    canvas.drawArc(boundingRect, radius * 4, radius, true, getColoredPaint(Colors.blue));
    canvas.drawArc(boundingRect, radius * 5, radius, true, getColoredPaint(Colors.pink));
  }
  // 判断是否需要重绘，这里我们简单的做下比较即可
  @override
  bool shouldRepaint(CustomPainter oldDelegate) => oldDelegate != this;
}

//将饼图包装成一个新的控件
class Cake extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomPaint(
        size: Size(200, 200),
        painter: WheelPainter(),
      );
  }
}
```

![CustomPainter](https://static001.geekbang.org/resource/image/fb/84/fb03c4222e150a29a41d53a773b94984.png)

### 如何定制不同风格的 App 主题

主题，又叫皮肤、配色，一般由颜色、图片、字号、字体等组成，我们可以把它看做是视觉效果在不同场景下的可视资源，以及相应的配置集合。比如，App 的按钮，无论在什么场景下都需要背景图片资源、字体颜色、字号大小等，而所谓的主题切换只是在不同主题之间更新这些资源及配置集合而已。

Flutter 也提供了类似的能力，由 [ThemeData](https://api.flutter.dev/flutter/material/ThemeData-class.html) 来统一管理主题的配置信息。ThemeData 涵盖了 Material Design 规范的可自定义部分样式，比如应用明暗模式 brightness、应用主色调 primaryColor、应用次级色调 accentColor、文本字体 fontFamily、输入框光标颜色 cursorColor 等。

```
MaterialApp(
  title: 'Flutter Demo',//标题
  theme: ThemeData(//设置主题
      brightness: Brightness.dark,//设置明暗模式为暗色
      accentColor: Colors.black,//(按钮）Widget前景色为黑色
      primaryColor: Colors.cyan,//主色调为青色
      iconTheme:IconThemeData(color: Colors.yellow),//设置icon主题色为黄色
      textTheme: TextTheme(body1: TextStyle(color: Colors.red))//设置文本颜色为红色
  ),
  home: MyHomePage(title: 'Flutter Demo Home Page'),
);
```

除了定义 Material Design 规范中那些可自定义部分样式外，主题的另一个重要用途是样式复用。

```
Container(
  color: Theme.of(context).primaryColor,//容器背景色复用应用主题色
  child: Text(
    'Text with a background color',
    style: Theme.of(context).textTheme.title,//Text组件文本样式复用应用文本样式)
);
```

### 如何作出动画效果

动画就是提升用户体验的一个重要方式，一个恰当的组件动画或者页面切换动画，不仅能够缓解用户因为等待而带来的情绪问题，还会增加好感。Flutter 既然完全接管了渲染层，除了静态的页面布局之外，对组件动画的支持自然也不在话下。

#### Animation、AnimationController 与 Listener

动画就是动起来的画面，是静态的画面根据事先定义好的规律，在一定时间内不断微调，产生变化效果。而动画实现由静止到动态，主要是靠人眼的视觉残留效应。所以，对动画系统而言，为了实现动画，它需要做三件事儿：

1. 确定画面变化的规律
2. 根据这个规律，设定动画周期，启动动画
3. 定期获取当前动画的值，不断地微调、重绘画面

这三件事情对应到 Flutter 中，就是 Animation、AnimationController 与 Listener：

1. Animation 是 Flutter 动画库中的核心类，会根据预定规则，在单位时间内持续输出动画的当前状态。Animation 知道当前动画的状态（比如，动画是否开始、停止、前进或者后退，以及动画的当前值），但却不知道这些状态究竟应用在哪个组件对象上。换句话说，Animation 仅仅是用来提供动画数据，而不负责动画的渲染。
2. AnimationController 用于管理 Animation，可以用来设置动画的时长、启动动画、暂停动画、反转动画等。
3. Listener 是 Animation 的回调函数，用来监听动画的进度变化，我们需要在这个回调函数中，根据动画的当前值重新渲染组件，实现动画的渲染。

```
class _NormalAnimateState extends State<NormalAnimateWidget>
    with SingleTickerProviderStateMixin {
  AnimationController controller;
  Animation<double> animation;

  void initState() {
    super.initState();
    // 创建动画周期为1秒的AnimationController对象
    controller = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 1000));

    final CurvedAnimation curve =
        CurvedAnimation(parent: controller, curve: Curves.elasticOut);

    // 创建从50到200线性变化的Animation对象
    // 普通动画需要手动监听动画状态，刷新UI
    animation = Tween(begin: 50.0, end: 200.0).animate(curve)
      ..addListener(() => setState(() {}));

    // 启动动画
    controller.repeat(reverse: true);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            body: Center(
                child: Container(
      width: animation.value,
      height: animation.value,
      child: FlutterLogo(),
    ))));
  }

  @override
  void dispose() {
    // 释放资源
    controller.dispose();
    super.dispose();
  }
}
```

![gif1](https://static001.geekbang.org/resource/image/c7/db/c73f5a245ecea87be428a83634ec12db.gif)

我们在上面用到的 [Tween](https://api.flutter.dev/flutter/animation/Tween-class.html) 默认是线性变化的，但可以创建 [CurvedAnimation](https://api.flutter.dev/flutter/animation/CurvedAnimation-class.html) 来实现非线性曲线动画。CurvedAnimation 提供了很多常用的曲线，比如震荡曲线 elasticOut。

```
//创建动画周期为1秒的AnimationController对象
controller = AnimationController(
    vsync: this, duration: const Duration(milliseconds: 1000));

//创建一条震荡曲线
final CurvedAnimation curve = CurvedAnimation(
    parent: controller, curve: Curves.elasticOut);
// 创建从50到200跟随振荡曲线变化的Animation对象
animation = Tween(begin: 50.0, end: 200.0).animate(curve)
```

![gif2](https://static001.geekbang.org/resource/image/ce/05/ce0f1ce6380329e3d9194518e2be2d05.gif)

#### AnimatedWidget 与 AnimatedBuilder

在为 Widget 添加动画效果的过程中我们不难发现，Animation 仅提供动画的数据，因此我们还需要监听动画执行进度，并在回调中使用 setState 强制刷新界面才能看到动画效果。考虑到这些步骤都是固定的，Flutter 提供了两个类来帮我们简化这一步骤，即 AnimatedWidget 与 AnimatedBuilder。

在构建 Widget 时，AnimatedWidget 会将 Animation 的状态与其子 Widget 的视觉样式绑定。要使用 AnimatedWidget，我们需要一个继承自它的新类，并接收 Animation 对象作为其初始化参数。然后，在 build 方法中，读取出 Animation 对象的当前值，用作初始化 Widget 的样式。

```
class AnimatedLogo extends AnimatedWidget {
  //AnimatedWidget需要在初始化时传入animation对象
  AnimatedLogo({Key key, Animation<double> animation})
      : super(key: key, listenable: animation);

  Widget build(BuildContext context) {
    //取出动画对象
    final Animation<double> animation = listenable;
    return Center(
      child: Container(
        height: animation.value,//根据动画对象的当前状态更新宽高
        width: animation.value,
        child: FlutterLogo(),
    ));
  }
}
```

在使用时，我们只需把 Animation 对象传入 AnimatedLogo 即可，再也不用使用 `addListener(() => setState(() {}))` 监听动画的执行进度刷新 UI 了：

```
MaterialApp(
  home: Scaffold(
    body: AnimatedLogo(animation: animation)//初始化AnimatedWidget时传入animation对象
));
```

在 AnimatedLogo 的 build 方法中，我们使用 Animation 的 value 作为 logo 的宽和高。这样做对于简单组件的动画没有任何问题，但如果动画的组件比较复杂，一个更好的解决方案是，将动画和渲染职责分离：logo 作为外部参数传入，只做显示；而尺寸的变化动画则由另一个类去管理。这个分离工作，我们可以借助 AnimatedBuilder 来完成。

与 AnimatedWidget 类似，AnimatedBuilder 也会自动监听 Animation 对象的变化，并根据需要将该控件树标记为 dirty 以自动刷新 UI。事实上，如果你翻看源码，就会发现 AnimatedBuilder 其实也是继承自 AnimatedWidget。

```
MaterialApp(
  home: Scaffold(
    body: Center(
      child: AnimatedBuilder(
        animation: animation,//传入动画对象
        child:FlutterLogo(),
        //动画构建回调
        builder: (context, child) => Container(
          width: animation.value,//使用动画的当前状态更新UI
          height: animation.value,
          child: child, //child参数即FlutterLogo()
        )
      )
    )
));
```

可以看到，通过使用 AnimatedWidget 和 AnimatedBuilder，动画的生成和最终的渲染被分离开了，构建动画的工作也被大大简化了。

#### hero 动画

现在我们已经知道了如何在一个页面上实现动画效果，那么如何实现在两个页面之间切换的过渡动画呢？比如在社交类 App，在 Feed 流中点击小图进入查看大图页面的场景中，我们希望能够实现小图到大图页面逐步放大的动画切换效果，而当用户关闭大图时，也实现原路返回的动画。

Flutter 也有类似的概念，即 Hero 控件。通过 Hero，我们可以在两个页面的共享元素之间，做出流畅的页面切换效果。

```
class Page1 extends StatelessWidget {
  Widget build(BuildContext context) {
    return  Scaffold(
      body: GestureDetector(//手势监听点击
        child: Hero(
          tag: 'hero',//设置共享tag
          child: Container(
            width: 100, height: 100,
            child: FlutterLogo())),
        onTap: () {
          Navigator.of(context).push(MaterialPageRoute(builder: (_)=>Page2()));//点击后打开第二个页面
        },
      )
    );
  }
}

class Page2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: Hero(
        tag: 'hero',//设置共享tag
        child: Container(
          width: 300, height: 300,
          child: FlutterLogo()
        ))
    );
  }
}
```

![gif4](https://static001.geekbang.org/resource/image/c5/d6/c5fe68b6e627d8285ed6aadf932abcd6.gif)

## 参考

> [Dart API docs](https://api.dart.dev/stable/2.2.0/index.html)  
> [Flutter API docs](https://api.flutter.dev/index.html)  
> [Flutter 核心技术与实战](https://time.geekbang.org/column/intro/200)  
> [Repl.it](https://repl.it/languages/dart)  
> [在 macOS 上搭建 Flutter 开发环境](https://flutterchina.club/setup-macos/)  
> [通过 Android studio 下载的 sdk 中没有 tools 文件夹的解决办法](https://blog.csdn.net/General_Ma/article/details/104707265/)
