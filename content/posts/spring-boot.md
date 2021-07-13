---
title: "Spring Boot 的使用"
date: 2019-11-22T08:35:06+08:00
tags: ["框架"]
---

## 简介

Spring Boot是在Spring框架基础上创建的全新框架。相比于以往的一些开发框架，Spring Boot使用更加简单，而且功能更加丰富，性能更加稳定而健壮。Spring Boot的设计目的就是简化开发，让开发者能把更多的精力投入到实际业务中。Spring Boot核心理念是 Convention Over Configuration （约定优于配置）。

## Spring Boot特点

- 开箱即用，根据项目依赖自动配置。
- 功能强大的服务体系，如：嵌入式服务、安全、性能指标、健康检查
- 绝无代码生成，可以不需要任何xml配置（使用Java配置和注解来代替）
- 对第三方技术几乎完美整合

## 基础
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

## 应用场景
### 配置数据源
```
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<scope>runtime</scope>
</dependency>
```

```
spring.datasource.url=jdbc:mysql://localhost:3306/bagevent?zeroDateTimeBehavior=convertToNull&useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
spring.datasource.username=root
spring.datasource.password=root
```

### Spring 中使用事务
#### Spring 中的事务传播特性
所谓事务的传播特性是指，如果在开始当前事务之前，一个事务上下文已经存在，此时有若干选项可以指定一个事务性方法的执行行为。在TransactionDefinition定义中包括了如下几个表示传播行为的常量：

- TransactionDefinition.PROPAGATION_REQUIRED：如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。这是默认值。
- TransactionDefinition.PROPAGATION_REQUIRES_NEW：创建一个新的事务，如果当前存在事务，则把当前事务挂起。
- TransactionDefinition.PROPAGATION_SUPPORTS：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。
- TransactionDefinition.PROPAGATION_NOT_SUPPORTED：以非事务方式运行，如果当前存在事务，则把当前事务挂起。
- TransactionDefinition.PROPAGATION_NEVER：以非事务方式运行，如果当前存在事务，则抛出异常。
- TransactionDefinition.PROPAGATION_MANDATORY：如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。
- TransactionDefinition.PROPAGATION_NESTED：如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于TransactionDefinition.PROPAGATION_REQUIRED。

#### Spring 中的事务隔离级别
- TransactionDefinition.ISOLATION_DEFAULT：这是默认值，表示使用底层数据库的默认隔离级别。对大部分数据库而言，通常这值就是TransactionDefinition.ISOLATION_READ_COMMITTED。
- TransactionDefinition.ISOLATION_READ_UNCOMMITTED：该隔离级别表示一个事务可以读取另一个事务修改但还没有提交的数据。该级别不能防止脏读，不可重复读和幻读，因此很少使用该隔离级别。比如PostgreSQL实际上并没有此级别。
- TransactionDefinition.ISOLATION_READ_COMMITTED：该隔离级别表示一个事务只能读取另一个事务已经提交的数据。该级别可以防止脏读，这也是大多数情况下的推荐值。
- TransactionDefinition.ISOLATION_REPEATABLE_READ：该隔离级别表示一个事务在整个过程中可以多次重复执行某个查询，并且每次返回的记录都相同。该级别可以防止脏读和不可重复读。
- TransactionDefinition.ISOLATION_SERIALIZABLE：所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，该级别可以防止脏读、不可重复读以及幻读。但是这将严重影响程序的性能。通常情况下也不会用到该级别。

#### Spring 中使用编程式事务
Spring提供的最原始的事务管理方式是基于 TransactionDefinition、PlatformTransactionManager、TransactionStatus 编程式事务。而TransactionTemplate的编程式事务管理是使用模板方法设计模式对原始事务管理方式的封装。参考 [深入理解TransactionTemplate编程式事务](https://blog.csdn.net/qq_33404395/article/details/83377382)

```
// Show You Code
// 有返回值的使用 TransactionCallback 即可
transactionTemplate.execute(new TransactionCallbackWithoutResult() {
    @Override
    protected void doInTransactionWithoutResult(TransactionStatus transactionStatus) {
        try {
            // ....  业务代码
        } catch (Exception e){
            //回滚
            transactionStatus.setRollbackOnly();
        }

    }
});
```

#### Spring 中使用声明式事务
使用 @EnableTransactionManagement 开启事务注解支持。在方法或者类上添加 @Transactional ，在方法内部遇到运行时异常就会回滚了。注意：因为 Spring 声明式事务的实现方式是通过 AOP ，因此只有来自外部的方法调用才会被AOP代理捕获，类内部方法调用本类内部的其他方法并不会引起事务行为。

| 属性                   | 类型                               | 描述                                   |
|------------------------|------------------------------------|----------------------------------------|
| value                  | String                             | 可选的限定描述符，指定使用的事务管理器 |
| propagation            | enum: Propagation                  | 可选的事务传播行为设置                 |
| isolation              | enum: Isolation                    | 可选的事务隔离级别设置                 |
| readOnly               | boolean                            | 读写或只读事务，默认读写               |
| timeout                | int (in seconds granularity)       | 事务超时时间设置                       |
| rollbackFor            | Class对象数组，必须继承自Throwable | 导致事务回滚的异常类数组               |
| rollbackForClassName   | 类名数组，必须继承自Throwable      | 导致事务回滚的异常类名字数组           |
| noRollbackFor          | Class对象数组，必须继承自Throwable | 不会导致事务回滚的异常类数组           |
| noRollbackForClassName | 类名数组，必须继承自Throwable      | 不会导致事务回滚的异常类名字数组       |

#### Spring 中使用 AOP
##### 相关常用注解
- @EnableAspectJAutoProxy : 开启 AOP 注解扫描
- @Aspect : 声明切面
- @Pointcut : 指定拦截方法
- @Before : 方法执行前执行
- @After / @AfterReturning / @AfterThrowing : 方法执行后执行
- @Around : 方法执行前后都可以执行
- @Order : 切面执行顺序

##### 参考
[Spring AOP 开发文档](https://docs.spring.io/spring/docs/5.2.1.RELEASE/spring-framework-reference/core.html#aop)   
[Pointcut 定义文档](https://docs.spring.io/spring/docs/5.2.1.RELEASE/spring-framework-reference/core.html#aop-pointcuts)

## 扩展
### Spring Web
#### 相关常用注解
- @RestController : 相当于 @Controller + @ResponseBody 两个注解的结合，返回json数据不需要在方法前面加 @ResponseBody 注解了，但使用 @RestController 这个注解，就不能返回 jsp,html 页面，视图解析器无法解析 jsp,html 页面
- @RequestMapping
- @GetMapping : 是一个组合注解是 @RequestMapping(method = RequestMethod.GET) 的缩写
- @PostMapping
- @PutMapping
- @DeleteMapping
- @PatchMapping
- @RequestBody
- @ResponseBody
- @ResponseStatus
- @PathVariable
- @RequestParam
- @RequestHeader

#### 参考
[相关注解](https://docs.spring.io/spring/docs/5.2.1.RELEASE/spring-framework-reference/web.html#mvc-ann-return-types)

### Spring Data JDBC
```
// Show You Code
@Slf4j
@Repository
public class JdbcFooRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 简单插入
     */
    public void insertData() {
        Arrays.asList("b", "c").forEach(bar -> {
            // 插入一条
            // 删除、修改操作同样使用 update 方法即可。
            jdbcTemplate.update("INSERT INTO JdbcFoo (bar) VALUES (?)", bar);
        });

    }

    /**
     * 插入后返回 Id
     */
    public void insertDataReturnId(){
        // 插入后返回 id
        SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(jdbcTemplate).withTableName("JdbcFoo").usingGeneratedKeyColumns("foo_id");
        HashMap<String, String> row = new HashMap<>();
        row.put("bar", "d");
        Number id = simpleJdbcInsert.executeAndReturnKey(row);
        log.info("foo_id of d: {}", id.longValue());
    }

    /**
     * 批量插入
     */
    public void batchInsert() {
        NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);
        List<JdbcFoo> list = new ArrayList<>();
        list.add(JdbcFoo.builder().bar("f").build());
        list.add(JdbcFoo.builder().bar("g").build());
        namedParameterJdbcTemplate
                .batchUpdate("INSERT INTO JdbcFoo (bar) VALUES (:bar)",
                        SqlParameterSourceUtils.createBatch(list));
    }

    /**
     * 简单查询
     */
    public List<JdbcFoo> listData() {
        log.info("Count: {}", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM JdbcFoo", Long.class));

        List<String> list = jdbcTemplate.queryForList("SELECT bar FROM JdbcFoo", String.class);
        list.forEach(s -> log.info("bar: {}", s));

        List<JdbcFoo> fooList = jdbcTemplate.query("SELECT * FROM JdbcFoo", (rs, rowNum) -> JdbcFoo.builder()
                .fooId(rs.getLong(1))
                .bar(rs.getString(2))
                .build());
        fooList.forEach(f -> log.info("JdbcFoo: {}", f));
        return fooList;
    }
}
```

### Spring Data JPA
#### 常用 JPA 注解
- 实体
  - @Entity、@MappedSuperclass
  - @Table(name)
- 主键
  - @Id
  - @GeneratedValue(strategy, generator)
  - @SequenceGenerator(name, sequenceName)
- 映射
  - @Column(name, nullable, length, insertable, updatable)
  - @JoinTable(name)、@JoinColumn(name)
- 关系
  - @OneToOne、@OneToMany、@ManyToOne、@ManyToMany
  - @OrderBy

### Spring Boot Actuator
Spring Boot 自带监控功能的 Actuator，可以帮助实现对程序内部运行情况监控，比如监控状况、Bean加载情况、环境变量、日志信息、线程信息等

#### 使用
- pom.xml 文件引入依赖
- 浏览器打开链接 [http://localhost:8080/actuator/](http://localhost:8080/actuator/) 测试
- 默认支持的只有 `info` 和 `health`，需要添加其他 endpoint 配置 `management.endpoints.web.exposure.include=*`

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### Endpoints
| ID             | 描述                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| auditevents    | 显示当前应用程序的审计事件信息                                                                                                    |
| beans          | 显示一个应用中所有Spring Beans的完整列表                                                                                          |
| conditions     | 显示配置类和自动配置类(configuration and auto-configuration classes)的状态及它们被应用或未被应用的原因                            |
| configprops    | 显示一个所有@ConfigurationProperties的集合列表                                                                                    |
| env            | 显示来自Spring的 ConfigurableEnvironment的属性                                                                                    |
| flyway         | 显示数据库迁移路径，如果有的话                                                                                                    |
| health         | 显示应用的健康信息（当使用一个未认证连接访问时显示一个简单的’status’，使用认证连接访问则显示全部信息详情）                        |
| info           | 显示任意的应用信息                                                                                                                |
| liquibase      | 展示任何Liquibase数据库迁移路径，如果有的话                                                                                       |
| metrics        | 展示当前应用的metrics信息                                                                                                         |
| mappings       | 显示一个所有@RequestMapping路径的集合列表                                                                                         |
| scheduledtasks | 显示应用程序中的计划任务                                                                                                          |
| sessions       | 允许从Spring会话支持的会话存储中检索和删除(retrieval and deletion)用户会话。使用Spring Session对反应性Web应用程序的支持时不可用。 |
| shutdown       | 允许应用以优雅的方式关闭（默认情况下不启用）                                                                                      |
| threaddump     | 执行一个线程dump                                                                                                                  |
| heapdump       | 返回一个GZip压缩的hprof堆dump文件                                                                                                 |
| jolokia        | 通过HTTP暴露JMX beans（当Jolokia在类路径上时，WebFlux不可用）                                                                     |
| logfile        | 返回日志文件内容（如果设置了logging.file或logging.path属性的话），支持使用HTTP Range头接收日志文件内容的部分信息                  |
| prometheus     | 以可以被Prometheus服务器抓取的格式显示metrics信息                                                                                 |

### Lombok
我们在开发过程中，通常都会定义大量的JavaBean，然后通过IDE去生成其属性的构造器、getter、setter、equals、hashcode、toString方法，当要增加属性或者对某个属性进行改变时，比如命名、类型等，都需要重新去生成上面提到的这些方法。这样重复的劳动没有任何意义，Lombok里面的注解可以轻松解决这些问题。以下是常用相关注解：

- @Data：注解在类上，将类提供的所有属性都添加get、set方法，并添加、equals、canEquals、hashCode、toString方法
- @Setter：注解在类上，为所有属性添加set方法、注解在属性上为该属性提供set方法
- @Getter：注解在类上，为所有的属性添加get方法、注解在属性上为该属性提供get方法
- @Builder：使用builder模式创建对象
- @NotNull：在参数中使用时，如果调用时传了null值，就会抛出空指针异常
- @NoArgsConstructor：创建一个无参构造函数
- @AllArgsConstructor：创建一个全参构造函数
- @RequiredArgsConstructor：会生成一个包含常量，和标识了NotNull的变量的构造方法
- @ToString：创建一个toString方法
- @Slf4j / @CommonsLog / @Log4j2
- @Accessors(chain = true)使用链式设置属性，set方法返回的是this对象

### Spring cache abstraction
#### 基本注解
- @EnableCaching : 开启 Spring Cache 注解 `@EnableCaching(proxyTargetClass = true)`
- @Cacheable : 缓存方法返回结果
- @CacheEvict : 缓存清理
- @CachePut : 保证方法被调用，又希望结果被缓存。与@Cacheable区别在于是否每次都调用方法，常用于更新。
- @CacheConfig : 统一配置本类的缓存注解的属性

#### 参考
[史上最全的Spring Boot Cache使用与整合](https://www.cnblogs.com/yueshutong/p/9381540.html)

### Spring Data Redis
#### Redis Template
```
// Show You Code
public Optional<RedisFoo> findOneCacheFooByRedisTemplate(String bar) {
    String CACHE = RedisFoo.class.getSimpleName();
    // 有缓存的话从缓存里取出返回
    HashOperations<String, String, RedisFoo> hashOperations = redisFooRedisTemplate.opsForHash();
    if (redisFooRedisTemplate.hasKey(CACHE) && hashOperations.hasKey(CACHE, bar)) {
        log.info("Get CacheFoo {} from Redis.", bar);
        return Optional.ofNullable(hashOperations.get(CACHE, bar));
    }

    Optional<RedisFoo> redisFoo = findOneByBar(bar);

    // 不为空的话，存到缓存里
    if (redisFoo.isPresent()) {
        log.info("Put CacheFoo {} to Redis.", bar);
        hashOperations.put(CACHE, bar, redisFoo.get());
        redisFooRedisTemplate.expire(CACHE, 1, TimeUnit.MINUTES);
    }
    return redisFoo;
}
```

#### Redis Repository
```
// Show You Code
// RedisFooCache.java
@RedisHash(value = "RedisFooCache", timeToLive = 60)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RedisFooCache {
    @Id
    private Long fooId;
    @Indexed
    private String bar;
    private Date createTime;
}

// RedisFooCacheRepository.java
public interface RedisFooCacheRepository extends CrudRepository<RedisFooCache, Long>, QueryByExampleExecutor<RedisFooCache> {
}

// RedisFooService.java
public Optional<RedisFoo> findOneCacheFooByRedisRepository(String bar) {
    Optional<RedisFooCache> redisFooCache = findOneCacheByBar(bar);
    if (redisFooCache.isPresent()) {
        return Optional.of(convertToRedisFoo(redisFooCache.get()));
    } else {
        Optional<RedisFoo> redisFoo = findOneByBar(bar);
        redisFoo.ifPresent(r -> {
            redisFooCacheRepository.save(convertToRedisFooCache(r));
            log.info("Save RedisFoo {} to cache.", r);
        });
        return redisFoo;
    }
}
```

### Spring Boot Admin
#### 简介
Spring Boot Admin是一个开源社区项目，用于管理和监控SpringBoot应用程序。 应用程序作为Spring Boot Admin Client向为Spring Boot Admin Server注册（通过HTTP）或使用SpringCloud注册中心（例如Eureka，Consul）发现。 UI是的AngularJs应用程序，展示Spring Boot Admin Client的Actuator端点上的一些监控。

#### 常用的功能
- 显示健康状况
- 显示 JVM 和内存指标
- 显示数据源指标
- 显示缓存指标
- 显示构建信息编号
- 关注并下载日志文件
- 查看 JVM 系统和环境属性
- 查看 Spring Boot 配置属性
- 轻松的日志级管理
- 与 JMX-beans 交互
- 查看线程转储
- 查看 http 跟踪
- 查看 auditevents
- 查看 http-endpoints
- 查看计划任务
- 查看和删除活动会话（使用spring-session）
- 下载heapdump
- 状态变更通知，可以通过自定义的方式发送WeChat通知（通过电子邮件，Slack，Hipchat，......）
- 状态更改的事件日志（非持久性）

#### 参考
[Spring Boot Admin Reference Guide](https://codecentric.github.io/spring-boot-admin/2.1.0/)

### Slf4j + Log4j2
引入依赖时，需要注意的是，需要排除掉 Spring Boot 默认对 Logback 的依赖
pom.xml
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>
```

log4j2-spring.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Properties>
        <Property name="LOG_EXCEPTION_CONVERSION_WORD">%xwEx</Property>
        <Property name="LOG_LEVEL_PATTERN">%5p</Property>
        <Property name="LOG_DATEFORMAT_PATTERN">yyyy-MM-dd HH:mm:ss.SSS</Property>
        <Property name="CONSOLE_LOG_PATTERN">%clr{%d{${LOG_DATEFORMAT_PATTERN}}}{faint} %clr{${LOG_LEVEL_PATTERN}} %clr{%pid}{magenta} %clr{---}{faint} %clr{[%15.15t]}{faint} %clr{%-40.40c{1.}}{cyan} %clr{:}{faint} %m%n${sys:LOG_EXCEPTION_CONVERSION_WORD}</Property>
        <Property name="FILE_LOG_PATTERN">%d{${LOG_DATEFORMAT_PATTERN}} ${LOG_LEVEL_PATTERN} %pid --- [%t] %-40.40c{1.} : %m%n${sys:LOG_EXCEPTION_CONVERSION_WORD}</Property>
        <Property name="FILE_LOG_PATH">/var/log</Property>
    </Properties>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT" follow="true">
            <PatternLayout pattern="${sys:CONSOLE_LOG_PATTERN}"/>
        </Console>
        <RollingFile name="RollingFileInfo" fileName="${sys:FILE_LOG_PATH}/info/info.log"
                     filePattern="${sys:FILE_LOG_PATH}/info/$${date:yyyy-MM}/info-%d{yyyy-MM-dd}-%i.log">
            <ThresholdFilter level="info" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="${sys:FILE_LOG_PATTERN}"/>
            <Policies>
                <TimeBasedTriggeringPolicy modulate="true" interval="24"/>
                <SizeBasedTriggeringPolicy size="100 MB"/>
            </Policies>
        </RollingFile>
        <RollingFile name="RollingFileWarn" fileName="${sys:FILE_LOG_PATH}/warn/warn.log"
                     filePattern="${sys:FILE_LOG_PATH}/warn/$${date:yyyy-MM}/warn-%d{yyyy-MM-dd}-%i.log">
            <ThresholdFilter level="warn" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="${sys:FILE_LOG_PATTERN}"/>
            <Policies>
                <TimeBasedTriggeringPolicy modulate="true" interval="24"/>
                <SizeBasedTriggeringPolicy size="100 MB"/>
            </Policies>
        </RollingFile>
        <RollingFile name="RollingFileError" fileName="${sys:FILE_LOG_PATH}/error/error.log"
                     filePattern="${sys:FILE_LOG_PATH}/error/$${date:yyyy-MM}/warn-%d{yyyy-MM-dd}-%i.log">
            <ThresholdFilter level="error" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="${sys:FILE_LOG_PATTERN}"/>
            <Policies>
                <TimeBasedTriggeringPolicy modulate="true" interval="24"/>
                <SizeBasedTriggeringPolicy size="100 MB"/>
            </Policies>
        </RollingFile>
    </Appenders>
    <Loggers>
        <Logger name="org.apache.catalina.startup.DigesterFactory" level="error" />
        <Logger name="org.apache.catalina.util.LifecycleBase" level="error" />
        <Logger name="org.apache.coyote.http11.Http11NioProtocol" level="warn" />
        <logger name="org.apache.sshd.common.util.SecurityUtils" level="warn"/>
        <Logger name="org.apache.tomcat.util.net.NioSelectorPool" level="warn" />
        <Logger name="org.eclipse.jetty.util.component.AbstractLifeCycle" level="error" />
        <Logger name="org.hibernate.validator.internal.util.Version" level="warn" />
        <logger name="org.springframework.boot.actuate.endpoint.jmx" level="warn"/>
        <Root level="info">
            <AppenderRef ref="Console" />
            <AppenderRef ref="RollingFileInfo"/>
            <AppenderRef ref="RollingFileWarn"/>
            <AppenderRef ref="RollingFileError"/>
        </Root>
    </Loggers>
</Configuration>
```

#### 参考
[聊一聊log4j2配置文件log4j2.xml](https://www.cnblogs.com/hafiz/p/6170702.html)

### Swagger
```
@Api：用在请求的类上，表示对类的说明
    tags="说明该类的作用，可以在UI界面上看到的注解"
    value="该参数没什么意义，在UI界面上也看到，所以不需要配置"

@ApiOperation：用在请求的方法上，说明方法的用途、作用
    value="说明方法的用途、作用"
    notes="方法的备注说明"

@ApiImplicitParams：用在请求的方法上，表示一组参数说明
    @ApiImplicitParam：用在@ApiImplicitParams注解中，指定一个请求参数的各个方面
        name：参数名
        value：参数的汉字说明、解释
        required：参数是否必须传
        paramType：参数放在哪个地方
            · header --> 请求参数的获取：@RequestHeader
            · query --> 请求参数的获取：@RequestParam
            · path（用于restful接口）--> 请求参数的获取：@PathVariable
            · body（不常用）
            · form（不常用）    
        dataType：参数类型，默认string
            · string
            · number
            · integer
            · boolean
            · array
            · object
        defaultValue：参数的默认值

@ApiResponses：用在请求的方法上，表示一组响应
    @ApiResponse：用在@ApiResponses中，一般用于表达一个错误的响应信息
        code：数字，例如400
        message：信息，例如"请求参数没填好"
        response：抛出异常的类

@ApiModel：用于响应类上，表示一个返回响应数据的信息
            （这种一般用在post创建的时候，使用@RequestBody这样的场景，
            请求参数无法使用@ApiImplicitParam注解进行描述的时候）
    @ApiModelProperty：用在属性上，描述响应类的属性
```
