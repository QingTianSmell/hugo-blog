---
title: "Answer"
date: 2020-03-16T11:54:40+08:00
---

- [SpringBoot 异常的设计的原理?](#springboot-异常的设计的原理)
- [前后端分离开发，日志应该如何进行记录，在出现问题的时候，方便定位问题？](#前后端分离开发日志应该如何进行记录在出现问题的时候方便定位问题)
- [跨域的含义？](#跨域的含义)
- [Springboot 项目，客户端传输一个文件 id，后端服务器将该 id 所对应的硬盘中的 docx 文件，传到客户端。客户端进行另存为 docx。](https://github.com/OrionPax19970905/answer)
- [算法设计题目](#算法设计题目)

## SpringBoot 异常的设计的原理?

关于 Spring Boot 的异常处理，使用的话就是给对应的类添加 ControllerAdvice 注解，然后在方法上添加 ExceptionHandler 注解，就可以在方法里进行异常处理了。如下：

```java
@ControllerAdvice
@Slf4j
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(value = Exception.class)
    public Object handler(Exception e) {
        log.error("Error happened", e);
        HttpUtil.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        return null;
    }

}
```

异常处理的原理是在 ExceptionHandlerExceptionResolver 类中将带有 ControllerAdvice 注解的类中的所有带有 ExceptionHandler 注解的方法，根据异常的类型存到一个 Map 里，在 DispatcherServlet 处理时如果发生异常，将会根据异常的类型找到对应的处理方法。

## 前后端分离开发，日志应该如何进行记录，在出现问题的时候，方便定位问题？

日志信息的记录，通常在排除掉敏感信息后，记录访问接口，参数，User-Agent，ip 等，如果相关系统有别的可定位唯一信息也可记录。

## 跨域的含义？

跨域是浏览器安全限制，当前的域名、端口下不能执行别的域名、端口下的脚本或数据。可以在被调用的域名后台放开当前受限来源的访问以解决跨域问题。

## Springboot 项目，客户端传输一个文件 id，后端服务器将该 id 所对应的硬盘中的 docx 文件，传到客户端。客户端进行另存为 docx。

[项目地址](https://github.com/OrionPax19970905/answer)

```bash
# clone 项目 idea 运行 or
# 打包
mvn clean package -Dmaven.test
# 运行
java -jar target/answer-0.0.1-SNAPSHOT.jar
# 运行项目后访问 http://localhost:8080/file/1 下载文件
```

## 算法设计题目

让 java 开发做 acm 不好吧 😊
