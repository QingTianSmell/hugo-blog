---
title: "Nest 的使用"
date: 2019-09-28T20:31:02+08:00
tags: ["程序开发","后端","框架"]
---

## 基础

### 简介

Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 TypeScript（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。

### Hello World

```
// 安装 Nest
yarn global add @nestjs/cli

// 初始化项目
nest new <project-name>
```

### 控制器

[控制器](https://docs.nestjs.cn/6/controllers)层负责处理传入的请求, 并返回对客户端的响应。使用 @Controller 进行装饰。

#### HTTP 请求装饰器

@Get()、 @Post、 @Put() 、 @Delete()、 @Patch()、 @Options()、 @Head()和 @All()。

#### Request 对象

「Request」对象表示 HTTP 请求，并具有「Request」查询字符串，参数，HTTP 标头 和 正文的属性（在这里阅读更多），但在大多数情况下, 不必手动获取它们。 我们可以使用专用的装饰器，比如开箱即用的 @Body() 或 @Query() 。 下面是装饰器和 普通表达对象的比较。

| 装饰器                  | 对象                            |
| ----------------------- | ------------------------------- |
| @Request()              | req                             |
| @Response()             | res                             |
| @Next()                 | next                            |
| @Session()              | req.session                     |
| @Param(key?: string)    | req.params / req.params[key]    |
| @Body(key?: string)     | req.body / req.body[key]        |
| @Query(key?: string)    | req.query / req.query[key]      |
| @Headers(name?: string) | req.headers / req.headers[name] |

#### 路由注册顺序

请注意，路由注册顺序（每个路由的函数在类中出现的顺序）很重要。假设您有一个通过 identifier（cats/:id）返回 cat 的路由。如果在类定义中注册另一个端点，它会立即返回所有 cat（cats），则 GET /cats 请求不会命中第二个处理程序，因为所有路由参数都是可选的。简而言之就是把精确路由放在模糊路由下面。请参阅以下示例：

```
@Controller('cats')
export class CatsController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Get()
  findAll() {
    // This endpoint will never get called
    // because the "/cats" request is going
    // to be captured by the "/cats/:id" route handler
  }
}
```

### 提供者

几乎所有的东西都可以被认为是[提供者](https://docs.nestjs.cn/6/providers) - service, repository, factory, helper 等等。他们都可以通过 constructor 注入依赖关系，也就是说，他们可以创建各种关系。但事实上，提供者不过是一个用@Injectable() 装饰器注解的类。

```
// 创建提供者
@Injectable()
export class CatsService {...}

// 注册提供者
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})

// 使用提供者
@Controller('cats')
export class CatsController {
  // CatsService 通过类构造函数注入。不要害怕 private readonly 缩短的语法。这意味着我们已经在同一位置创建并初始化了 catsService 成员。
  constructor(private readonly catsService: CatsService) {}
  ...
}
```

### 模块

[模块](https://docs.nestjs.cn/6/modules)是具有 @Module() 装饰器的类。 @Module() 装饰器提供了元数据，Nest 用它来组织应用程序结构。 @module() 装饰器接受一个描述模块属性的对象：

| key         | 作用                                                       |
| ----------- | ---------------------------------------------------------- |
| providers   | 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享 |
| controllers | 必须创建的一组控制器                                       |
| imports     | 导入模块的列表，这些模块导出了此模块中所需提供者           |
| exports     | 由本模块提供并应在其他模块中可用的提供者的子集。           |

默认情况下, 模块封装提供者。这意味着如果提供者如果不是当前模块的一部分, 也不是从另外已导入的模块导出的，那么它就是无法注入的。

### 中间件

[中间件](https://docs.nestjs.cn/6/middlewares)是一个在路由处理器之前被调用的函数。 中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 next() 中间件函数。 next() 中间件函数通常由名为 next 的变量表示。Nest 中间件实际上等价于 express 中间件。 下面是 Express 官方文档中所述的中间件功能：

> 中间件函数可以执行以下任务:
>
> - 执行任何代码。
> - 对请求和响应对象进行更改。
> - 结束请求-响应周期。
> - 调用堆栈中的下一个中间件函数。
> - 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起。

#### 创建中间件

Nest 中间件可以是一个函数，也可以是一个带有 @Injectable() 装饰器的类。 这个类应该实现 NestMiddleware 接口, 而函数没有任何特殊的要求。

```
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}
```

#### 应用中间件

中间件不能在 @Module() 装饰器中列出。我们必须使用模块类的 configure() 方法来设置它们。包含中间件的模块必须实现 NestModule 接口。我们将 LoggerMiddleware 设置在 ApplicationModule 层上。

```
@Module({
  imports: [CatsModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

#### 中间件消费者

MiddlewareConsumer 是一个帮助类。它提供了几种内置方法来管理中间件。他们都可以被简单地链接起来。在 forRoutes() 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类。在大多数情况下，您可能只会传递一个由逗号分隔的控制器列表。

#### 函数式中间件

```
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
```

#### 多个中间件

```
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

#### 全局中间件

```
const app = await NestFactory.create(ApplicationModule);
// 为了一次将中间件绑定到每个注册路由，我们可以利用实例 INestApplication 提供的方法 use()
app.use(logger);
await app.listen(3000);
```

### 异常过滤器

内置的[异常层](https://docs.nestjs.cn/6/exceptionfilters)负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。

### 管道

[管道](https://docs.nestjs.cn/6/pipes)是具有 @Injectable() 装饰器的类。管道应实现 PipeTransform 接口。管道将输入数据转换为所需的输出。另外，它可以处理验证，因为当数据不正确时可能会抛出异常。

#### 内置管道

Nest 自带两个开箱即用的管道，即 ValidationPipe 和 ParseIntPipe。他们从 @nestjs/common 包中导出。

#### 类验证器（Class validator）

Nest 与 class-validator 配合得很好。这个优秀的库允许您使用基于装饰器的验证。基于装饰器的验证对于管道功能非常强大，因为我们可以访问已处理属性的 metatype。在我们开始之前，我们需要安装所需的软件包。

```
yarn add class-validator class-transformer
```

安装完成后，我们就可以向 CreateCatDto 类添加一些装饰器。

```
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
```

最后一步是设置 ValidationPipe 。管道，与异常过滤器相同，它们可以是方法范围的、控制器范围的和全局范围的。另外，管道可以是参数范围的。我们可以直接将管道实例绑定到路由参数装饰器，例如@Body()。让我们来看看下面的例子：

```
@Post()
async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

当验证逻辑仅涉及一个指定的参数时，参数范围的管道非常有用。要在方法级别设置管道，您需要使用 UsePipes() 装饰器。

```
@Post()
@UsePipes(ValidationPipe)
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

由于 ValidationPipe 被创建为尽可能通用，所以我们将把它设置为一个全局作用域的管道，用于整个应用程序中的每个路由处理器。

```
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

### 守卫

[守卫](https://docs.nestjs.cn/6/guards)是一个使用 @Injectable() 装饰器的类。 守卫应该实现 CanActivate 接口。守卫有一个单独的责任。它们确定请求是否应该由路由处理程序处理。到目前为止，访问限制逻辑大多在中间件内。这样很好，因为诸如 token 验证或将 request 对象附加属性与特定路由没有强关联。但中间件是非常笨的。它不知道调用 next() 函数后会执行哪个处理程序。另一方面，守卫可以访问 ExecutionContext 对象，所以我们确切知道将要执行什么。守卫在每个中间件之后执行的，但在拦截器和管道之前。

#### 授权看守卫

```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

不管 validateRequest() 函数背后的逻辑是什么，重点是展示使用守卫是多么简单。每个守卫都提供一个 canActivate() 方法。守卫可能通过 (Promise 或 Observable) 同步地或异步地返回它的布尔答复。如果返回 true, 将处理用户调用。如果返回 false, 则 Nest 将忽略当前处理的请求。

#### Execution context

ExecutionContext 提供了更多功能，它扩展了 ArgumentsHost，但是也提供了有关当前执行过程的更多详细信息。getHandler() 方法返回对当前处理的处理程序的引用,而 getClass() 返回此特定处理程序所属的 Controller 类的类型。用另外的话来说,如果用户指向在 CatsController 中定义和注册的 create() 方法, getHandler() 将返回对 create() 方法的引用，在这种情况下, getClass() 将只返回一个 CatsController 的类型（不是实例）。

#### 基于角色的认证

##### 创建自定义角色装饰器

```
import { SetMetadata } from '@nestjs/common';

// SetMetadata() 附加自定义元数据的功能
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

##### 使用角色装饰器

```
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

##### 创建角色认证守卫

```
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // getHandler() 将返回对 create() 方法的引用
    // 使用反射器获取方法元数据
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some((role) => roles.includes(role));
    return user && user.roles && hasRole();
  }
}
```

#### 绑定守卫

守卫可以是控制器范围的，方法范围的和全局范围的。为了建立守卫，我们使用 @UseGuards() 装饰器。这个装饰器可以有无数的参数，也就是说，你可以传递几个守卫并用逗号分隔它们。

```
// 绑定到 Controller
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
```

```
// 绑定到全局
const app = await NestFactory.create(ApplicationModule);
app.useGlobalGuards(new RolesGuard());
```

### 拦截器

[拦截器](https://docs.nestjs.cn/6/interceptors)是使用 @Injectable() 装饰器注解的类。拦截器应该实现 NestInterceptor 接口。

### 自定义装饰器

Nest 是基于[装饰器](https://docs.nestjs.cn/6/customdecorators)这种语言特性而创建的。ES2016 的装饰器是一个可以将目标对象，名称和属性描述符作为参数的返回函数的表达式。你可以通过装饰器前缀 @ 来使用它，并且把它放在你试图装饰的顶部。装饰器可以被定义为一个类或是属性。

#### 参数装饰器

在 node.js 的世界中，把属性值附加到 request 对象中是一种很常见的做法。然后你可以在任何时候在路由处理程器（route handlers）中手动取到它们，例如，使用下面这个构造：

```
const user = req.user;
```

为了使其更具可读性和透明性，我们可以创建 @User() 装饰器并且在所有控制器中重复利用它。

```
import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  return req.user;
});
```

```
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}
```
