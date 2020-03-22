---
title: "Flutter 学习笔记"
date: 2020-03-21T21:04:37+08:00
tags: ["学习笔记", "前端"]
---

<!-- vim-markdown-toc GitLab -->

* [What](#what)
  * [Dart](#dart)
    * [什么是 Dart ?](#什么是-dart-)
    * [变量类型定义](#变量类型定义)
      * [num、bool 与 String](#numbool-与-string)
      * [List 与 Map](#list-与-map)
      * [常量定义](#常量定义)
    * [函数](#函数)
    * [类](#类)
      * [类的定义及初始化](#类的定义及初始化)
      * [复用](#复用)
    * [运算符](#运算符)
  * [State 的生命周期](#state-的生命周期)
  * [APP 的事件监听](#app-的事件监听)
  * [基础控件](#基础控件)
* [Why](#why)
* [How](#how)
  * [如何进行开发环境搭建](#如何进行开发环境搭建)
    * [安装 Flutter](#安装-flutter)
    * [安装 Android Studio](#安装-android-studio)
    * [安装 XCode](#安装-xcode)
    * [通过 Flutter 运行模拟器](#通过-flutter-运行模拟器)
* [参考](#参考)

<!-- vim-markdown-toc -->

## What

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

```dart
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

```dart
bool isZero(int number) { //判断整数是否为0
  return number == 0;
}
bool isZero(int number) => number == 0;
```

有时，一个函数中可能需要传递多个参数。那么，如何让这类函数的参数声明变得更加优雅、可维护，同时降低调用者的使用成本呢？C++ 与 Java 的做法是，提供函数的重载，即提供同名但参数不同的函数。但 **Dart 认为重载会导致混乱，因此从设计之初就不支持重载，而是提供了可选命名参数和可选参数**。在使用这两种方式定义函数时，我们还可以在参数未传递时设置默认值。具体方式是，在声明函数时：

```dart
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

```dart
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

```dart
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

```dart
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

```dart
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

### State 的生命周期

- initState : 在 State 被插入视图树时被调用，用来进行渲染相关的初始化工作
- didChangeDependencies : initState 后及 State 对象依赖关系变化时被调用，用来处理 State 对象的依赖关系变化
- build : State 准备好数据需要进行渲染时被调用，用来进行视图的构建
- didUpdateWidget : 父 Widget setState 触发子 Widget 重建时被调用
- deactivate : 组件不可视时被调用
- dispose : 组件被销毁时调用

### APP 的事件监听

在原生 Android、iOS 开发中，有时我们需要在对应的 App 生命周期事件中做相应处理，比如 App 从后台进入前台、从前台退到后台，或是在 UI 绘制完成后做一些处理。

这样的需求，在原生开发中，我们可以通过重写 Activity、ViewController 生命周期回调方法，或是注册应用程序的相关通知，来监听 App 的生命周期并做相应的处理。而在 Flutter 中，我们可以利用 WidgetsBindingObserver 类，来实现同样的需求。

```dart
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

```dart
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

### 基础控件

- [Text](https://api.flutter.dev/flutter/widgets/Text-class.html)

  ```dart
  Text(
    'Hello, $_name! How are you?',
    textAlign: TextAlign.center,
    overflow: TextOverflow.ellipsis,
    style: TextStyle(fontWeight: FontWeight.bold),
  )
  ```

  ```dart
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

- [Image](https://api.flutter.dev/flutter/widgets/Image-class.html)

  - 加载本地资源图片，如 `Image.asset(‘images/logo.png’);`
  - 加载本地（File 文件）图片，如 `Image.file(new File(’/storage/xxx/xxx/test.jpg’));`
  - 加载网络图片，如 `Image.network('http://xxx/xxx/test.gif');`

* [FadeInImage](https://api.flutter.dev/flutter/widgets/FadeInImage-class.html)

  ```dart
  //在加载网络图片的时候，为了提升用户的等待体验，我们往往会加入占位图、加载动画等元素，但是默认的 Image.network 构造方法并不支持这些高级功能，这时候 FadeInImage 控件就派上用场了。
  FadeInImage.assetNetwork(
    placeholder: 'assets/loading.gif', //gif占位
    image: 'https://xxx/xxx/xxx.jpg',
    fit: BoxFit.cover, //图片拉伸模式
    width: 200,
    height: 200,
  )
  ```

- [FloatingActionButton](https://api.flutter.dev/flutter/material/FloatingActionButton-class.html) : 一个圆形的按钮，一般出现在屏幕内容的前面，用来处理界面中最常用、最基础的用户动作。
- [RaisedButton](https://api.flutter.dev/flutter/material/RaisedButton-class.html) : 凸起的按钮，默认带有灰色背景，被点击后灰色背景会加深。
- [FlatButton](https://api.flutter.dev/flutter/material/FlatButton-class.html) : 扁平化的按钮，默认透明背景，被点击后会呈现灰色背景。

## Why

## How

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

## 参考

> [Flutter 核心技术与实战](https://time.geekbang.org/column/intro/200)  
> [Dart API docs](https://api.dart.dev/stable/2.2.0/index.html)  
> [Repl.it](https://repl.it/languages/dart)  
> [在 macOS 上搭建 Flutter 开发环境](https://flutterchina.club/setup-macos/)  
> [通过 Android studio 下载的 sdk 中没有 tools 文件夹的解决办法](https://blog.csdn.net/General_Ma/article/details/104707265/)
