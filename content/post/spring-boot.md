---
title: "Spring Boot"
date: 2019-11-22T08:35:06+08:00
tgs: ["后端", "学习笔记", "Spring Boot"]
---

## What

## Why

## Where

## How

### 如何创建一个 Spring Boot 项目。
访问 [Spring Initializr](https://start.spring.io/)，配置项目的基础设置，并选择项目依赖，点击生成按钮，就可以获取到一个用来初始化项目的压缩包。解压后使用 IDEA 打开即可。

### Hello World
1. 如果项目创建时选择了 Spring Web 依赖，直接创建一个 HelloWorldController 即可，没有的话需要在 pom.xml 里添加 Spring Web 的依赖。
2. 使用 IDEA 启动项目，访问 `http://localhost:8080/hello` 进行测试。
3. 使用 `mvn clean package -Dmaven.test.skip` 命令打包并跳过测试，使用 `java -jar target\bagevent-planning-0.0.1-SNAPSHOT.jar` 运行 jar 包进行测试。

```
@RestController
public class HelloWorldController {

    @GetMapping("/hello")
    public String hello(){
        return "Hello World!";
    }

}
```

```
// 引入Spring Web 依赖
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### 依赖及其使用
#### Spring Web
相关常用注解:
- @RestController : 相当于 @Controller + @ResponseBody 两个注解的结合，返回json数据不需要在方法前面加 @ResponseBody 注解了，但使用 @RestController 这个注解，就不能返回 jsp,html 页面，视图解析器无法解析 jsp,html 页面
- @RequestMapping
- @GetMapping : 是一个组合注解是 @RequestMapping(method = RequestMethod.GET) 的缩写
- @PostMapping
- @PutMapping
- @DeleteMapping
- @PatchMapping

#### Spring Boot Actuator
Spring Boot 自带监控功能的 Actuator，可以帮助实现对程序内部运行情况监控，比如监控状况、Bean加载情况、环境变量、日志信息、线程信息等

##### 使用
- pom.xml 文件引入依赖
- 浏览器打开链接 [http://localhost:8080/actuator/](http://localhost:8080/actuator/) 测试
- 默认支持的只有 `info` 和 `health`，需要添加其他 endpoint 配置 `management.endpoints.web.exposure.include=*`

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

##### Endpoints
ID             | 描述
-              | -
auditevents    | 显示当前应用程序的审计事件信息
beans          | 显示一个应用中所有Spring Beans的完整列表
conditions     | 显示配置类和自动配置类(configuration and auto-configuration classes)的状态及它们被应用或未被应用的原因
configprops    | 显示一个所有@ConfigurationProperties的集合列表
env            | 显示来自Spring的 ConfigurableEnvironment的属性
flyway         | 显示数据库迁移路径，如果有的话
health         | 显示应用的健康信息（当使用一个未认证连接访问时显示一个简单的’status’，使用认证连接访问则显示全部信息详情）
info           | 显示任意的应用信息
liquibase      | 展示任何Liquibase数据库迁移路径，如果有的话
metrics        | 展示当前应用的metrics信息
mappings       | 显示一个所有@RequestMapping路径的集合列表
scheduledtasks | 显示应用程序中的计划任务
sessions       | 允许从Spring会话支持的会话存储中检索和删除(retrieval and deletion)用户会话。使用Spring Session对反应性Web应用程序的支持时不可用。
shutdown       | 允许应用以优雅的方式关闭（默认情况下不启用）
threaddump     | 执行一个线程dump
heapdump       | 返回一个GZip压缩的hprof堆dump文件
jolokia        | 通过HTTP暴露JMX beans（当Jolokia在类路径上时，WebFlux不可用）
logfile        | 返回日志文件内容（如果设置了logging.file或logging.path属性的话），支持使用HTTP Range头接收日志文件内容的部分信息
prometheus     | 以可以被Prometheus服务器抓取的格式显示metrics信息
