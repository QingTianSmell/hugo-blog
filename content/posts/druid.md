---
title: "唯二好用的连接池之 Druid 的使用"
date: 2021-05-23T14:16:00+08:00
tags: ["框架"]
---

## 简介

Druid 是一个数据库连接池。在功能、性能、扩展性方面，都超过其他数据库连接池，包括 DBCP、C3P0、BoneCP、Proxool、JBoss DataSource。除了在速度上稍慢于 HikariCP 外其他方面都比较全能。Druid 是阿里巴巴开发的号称为监控而生的数据库连接池！如果对监控、功能、扩展性有要求推荐使用 Druid，如果没有太多的额外需求或是单纯需要更好的性能和效率可以选择使用 HikariCP。

## 基础
### Spring Boot 使用 Druid 连接池

参考 [如何在Spring Boot中集成Druid连接池和监控？](https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter)

### Druid Monitor

访问 [http://localhost:8080/druid/index.html](http://localhost:8080/druid/index.html) 查看相关监控信息。

### 配置

```yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: 123456
    druid:
      initial-size: 5 # 初始化时建立物理连接的个数。初始化发生在显示调用init方法，或者第一次getConnection时
      min-idle: 5 # 最小连接池数量
      max-active: 30 # 最大连接池数量
      max-wait: 60000 # 获取连接时最大等待时间，单位毫秒。配置了maxWait之后，缺省启用公平锁，并发效率会有所下降，如果需要可以通过配置
      time-between-eviction-runs-millis: 60000 # 关闭空闲连接的检测时间间隔.Destroy线程会检测连接的间隔时间，如果连接空闲时间大于等于minEvictableIdleTimeMillis则关闭物理连接。
      min-evictable-idle-time-millis: 300000 # 连接的最小生存时间.连接保持空闲而不被驱逐的最小时间
      validation-query: SELECT 1 # 验证数据库服务可用性的sql.用来检测连接是否有效的sql 因数据库方言而差, 例如 oracle 应该写成 SELECT 1 FROM DUAL
      test-while-idle: true # 申请连接时检测空闲时间，根据空闲时间再检测连接是否有效.建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRun
      test-on-borrow: false # 申请连接时直接检测连接是否有效.申请连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能。
      test-on-return: false # 归还连接时检测连接是否有效.归还连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能。
      pool-prepared-statements: true # 开启PSCache
      max-pool-prepared-statement-per-connection-size=: 20 #设置PSCache值
      connection-error-retry-attempts: 3 # 连接出错后再尝试连接三次
      break-after-acquire-failure: true # 数据库服务宕机自动重连机制
      time-between-connect-error-millis: 300000 # 连接出错后重试时间间隔
      async-init: true # 异步初始化策略
      remove-abandoned: true # 是否自动回收超时连接
      remove-abandoned-timeout: 1800 # 超时时间(以秒数为单位)
      transaction-query-timeout: 6000 # 事务超时时间
      filters: stat,wall,slf4j
      filter:
        stat:
          enabled: true
          log-slow-sql: true
          slow-sql-millis: 3000
        wall:
          enabled: true
          config:
            delete-allow: false # 不允许执行 DELETE
            drop-table-allow: false # 不允许执行 DROP TABLE
        slf4j:
          enabled: true
          statement-log-enabled: false # 关闭大量无用 SQL LOG 输出
          statement-executable-sql-log-enable: true # 可执行 SQL 输出
      web-stat-filter:
        enabled: true
        url-pattern: "/*"
        exclusions: "*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico,/druid/*"
      stat-view-servlet:
        url-pattern: "/druid/*"
        allow:
        deny:
        reset-enable: false
        login-username: admin
        login-password: admin

logging:
  level:
    druid:
      sql:
        Statement: DEBUG
```


## 扩展
### 应用场景

[Druid Wiki](https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98) 非常清晰，Druid 的应用场景可以参考其解决。包含监控、SQL 注入、数据库迁移、慢 SQL 记录、数据库密码加密、测试连接池是否有效等。


## 参考

> [Druid Wiki](https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
