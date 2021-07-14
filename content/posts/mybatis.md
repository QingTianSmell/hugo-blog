---
title: "Mybatis 的使用"
date: 2020-04-04T11:29:00+08:00
draft: ["框架"]
---

## 简介

Mybatis 是一个数据持久层(ORM)框架。但是只完成了结果集到对象的映射，而 Hibernate 是数据表到对象的映射。

优点：

- 简单易学：本身就很小且简单。没有任何第三方依赖，最简单安装只要两个 jar 文件+配置几个 sql 映射文件易于学习，易于使用，通过文档和源代码，可以比较完全的掌握它的设计思路和实现。
- 灵活：mybatis 不会对应用程序或者数据库的现有设计强加任何影响。 sql 写在 xml 里，便于统一管理和优化。通过 sql 基本上可以实现我们不使用数据访问框架可以实现的所有功能，或许更多。
- 解除 sql 与程序代码的耦合：通过提供 DAL 层，将业务逻辑和数据访问逻辑分离，使系统的设计更清晰，更易维护，更易单元测试。sql 和代码的分离，提高了可维护性。
- 提供映射标签，支持对象与数据库的 orm 字段关系映射
- 提供对象关系映射标签，支持对象关系组建维护
- 提供 xml 标签，支持编写动态 sql。

缺点：

- 编写 SQL 语句时工作量很大，尤其是字段多、关联表多时，更是如此。
- SQL 语句依赖于数据库，导致数据库移植性差，不能更换数据库。
- 框架还是比较简陋，功能尚有缺失，虽然简化了数据绑定代码，但是整个底层数据库查询实际还是要自己写的，工作量也比较大，而且不太容易适应快速数据库修改。
- 二级缓存机制不佳

## 问题
### Spring 整合 Mybatis 时，Mybatis 的一级缓存为何“失效”?

Spring 整合 Mybatis 时，只有在事务内部 Mybatis 的一级缓存才会生效这是为什么呢？首先我们要知道 Mybatis 的一级缓存生效的范围是 SqlSession。那么从结果来看应该是只有在事务的内部，查询方法才会使用同一 SqlSession，而没有事务的时候应该是创建了新的 SqlSssion，让我们看源码确认下。

```java
// Spring 在使用 SqlSession 对其进行了动态代理，其方法调用的拦截器就是 SqlSessionTemplate 的内部类 SqlSessionInterceptor
private class SqlSessionInterceptor implements InvocationHandler {
    private SqlSessionInterceptor() {
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 在执行方法时获取到 SqlSession
        SqlSession sqlSession = SqlSessionUtils.getSqlSession(SqlSessionTemplate.this.sqlSessionFactory, SqlSessionTemplate.this.executorType, SqlSessionTemplate.this.exceptionTranslator);

        Object unwrapped;
        try {
            Object result = method.invoke(sqlSession, args);
            if (!SqlSessionUtils.isSqlSessionTransactional(sqlSession, SqlSessionTemplate.this.sqlSessionFactory)) {
                sqlSession.commit(true);
            }

            unwrapped = result;
        } catch (Throwable var11) {
            unwrapped = ExceptionUtil.unwrapThrowable(var11);
            if (SqlSessionTemplate.this.exceptionTranslator != null && unwrapped instanceof PersistenceException) {
                SqlSessionUtils.closeSqlSession(sqlSession, SqlSessionTemplate.this.sqlSessionFactory);
                sqlSession = null;
                Throwable translated = SqlSessionTemplate.this.exceptionTranslator.translateExceptionIfPossible((PersistenceException)unwrapped);
                if (translated != null) {
                    unwrapped = translated;
                }
            }

            throw (Throwable)unwrapped;
        } finally {
            if (sqlSession != null) {
                SqlSessionUtils.closeSqlSession(sqlSession, SqlSessionTemplate.this.sqlSessionFactory);
            }

        }

        return unwrapped;
    }
}
```

```java
// 让我们再来看下 getSqlSession 方法
public static SqlSession getSqlSession(SqlSessionFactory sessionFactory, ExecutorType executorType, PersistenceExceptionTranslator exceptionTranslator) {
    Assert.notNull(sessionFactory, "No SqlSessionFactory specified");
    Assert.notNull(executorType, "No ExecutorType specified");
    // 维护了一个 SqlSessionHolder 用来关联事务和 SqlSession
    SqlSessionHolder holder = (SqlSessionHolder)TransactionSynchronizationManager.getResource(sessionFactory);
    // 首先从 SqlSessionHolder 里取 SqlSession
    SqlSession session = sessionHolder(executorType, holder);
    if (session != null) {
        return session;
    } else {
        // 没有当前事务关联的 SqlSession 就直接创建一个新的返回
        LOGGER.debug(() -> {
            return "Creating a new SqlSession";
        });
        session = sessionFactory.openSession(executorType);
        registerSessionHolder(sessionFactory, executorType, exceptionTranslator, session);
        return session;
    }
}
```

## 应用场景
### Spring Boot 如何整合 Mybatis?

```
# application.yml
# 配置数据源
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql://localhost:3306/learn_mybatis?characterEncoding=utf-8
    driver-class-name: com.mysql.jdbc.Driver

# 配置Mybatis
mybatis:
  # 配置实体包的位置
  type-aliases-package: com.orionpax.learn.mybatis.entity
  # Mapper 接口和 Mapper.xml 不在同一包下时，配置 Mapper.xml 的位置
  mybatis.mapper-locations=classpath:mapper/*Mapper.xml
  configuration:
    # 配置开启懒加载
    lazy-loading-enabled: true
```

```
<!-- Mapper 接口和 Mapper.xml 在同一包下时配置 -->
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```

```java
@SpringBootApplication
// 配置 Mapper 包的位置，如果不设置的话需要在每个 Mapper 接口上配置 @Mapper 注解。
@MapperScan("com.orionpax.learn.mybatis.mapper")
public class MybatisApplication {
    public static void main(String[] args) {
        SpringApplication.run(MybatisApplication.class, args);
    }
}
```

### 通过 xml 文件使用 Mybatis 框架

#### 简单的增删改查

```java
package com.orionpax.learn.entity;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bar {
    private Long id;

    private String name;

    private Date createTime;

    private List<Far> fars;
}
```

```java
package com.orionpax.learn.entity;

import lombok.Data;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Far {
    private Long id;

    private String name;

    private Date createTime;

    private Bar bar;
}
```

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.orionpax.learn.mybatis.mapper.BarMapper">
    # 定义一个代码片段，可以在其他地方使用 include 标签引用
    <sql id="Bar_Column_List">
        id, name, create_time
    </sql>
    # 插入
    # id 为 sql 语句取个名称，需要和对应的 Mapper接口里的方法名保持一致
    # parameterType 指定参数类型，如果是类就写全类名，并使用 #{} 来取值，如果是简单对象的话，#{中间的参数名可以随便写}
    <insert id="insert" parameterType="com.orionpax.learn.mybatis.entity.Bar">
        insert into bar (name, create_time)
        values (#{name}, #{createTime})
    </insert>
    # 删除
    <delete id="deleteById" parameterType="java.lang.Long">
        delete
        from bar
        where id = #{id}
    </delete>
    # 修改
    <update id="updateById" parameterType="com.orionpax.learn.mybatis.entity.Bar">
        update bar
        set name        = #{name},
            create_time = #{createTime}
        where id = #{id}
    </update>
    # 查询
    # resultType 指定返回类型，如果是类同样是全类名
    <select id="selectById" resultType="com.orionpax.learn.mybatis.entity.Bar" parameterType="java.lang.Long">
        select
        <include refid="Bar_Column_List"/>
        from bar
        where id = #{id}
    </select>
    # 查询列表，当查询返回多行时，返回类型是 List<T> 中的 T
    <select id="selectAll" resultType="com.orionpax.learn.mybatis.entity.Bar">
        select
        <include refid="Bar_Column_List"/>
        from bar
    </select>
</mapper>
```

#### 集联查询

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.orionpax.learn.mybatis.mapper.BarMapper">
    # 使用resultMap 映射返回结果
    <resultMap id="BaseResultMap" type="com.orionpax.learn.mybatis.entity.Bar">
        # 主键映射
        # column 指定返回字段名
        # property 执行实体属性名
        <id column="id" property="id"/>
        # 其他参数映射
        <result column="name" property="name"/>
        <result column="create_time" property="createTime"/>
    </resultMap>
    # 可以使用 extends 继承其他 resultMap 配置的映射
    <resultMap id="BarResultMap" type="com.orionpax.learn.mybatis.entity.Bar" extends="BaseResultMap">
        # collection 将结果映射为集合
        # property 指定要映射到的实体属性名
        # ofType 指定 List<T> 的 T
        <collection property="fars" ofType="com.orionpax.learn.mybatis.entity.Far">
            <id column="far_id" property="id"/>
            <result column="far_name" property="name"/>
            <result column="far_create_time" property="createTime"/>
        </collection>
    </resultMap>
    # 复杂的返回值使用 resultMap 代替 resultType
    <select id="selectById" parameterType="java.lang.Long" resultMap="BarResultMap">
        select b.id,
               b.name,
               b.create_time,
               f.id          as far_id,
               f.name        as far_name,
               f.create_time as far_create_time
        from bar b,
             far f
        where b.id = f.bar_id
          and b.id = #{id}
    </select>
    <select id="selectAll" resultMap="BarResultMap">
        select b.id,
               b.name,
               b.create_time,
               f.id          as far_id,
               f.name        as far_name,
               f.create_time as far_create_time
        from bar b
                 left join far f on b.id = f.bar_id
    </select>
</mapper>
```

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.orionpax.learn.mybatis.mapper.FarMapper">
    <resultMap id="BaseResultMap" type="com.orionpax.learn.mybatis.entity.Far">
        <id column="id" property="id"/>
        <result column="name" property="name"/>
        <result column="create_time" property="createTime"/>
    </resultMap>
    <resultMap id="FarResultMap" type="com.orionpax.learn.mybatis.entity.Far" extends="BaseResultMap">
        # 使用 association 映射非集合的复杂属性
        # javaType 指定属性类型，可以省略
        <association property="bar" javaType="com.orionpax.learn.mybatis.entity.Bar">
            <id column="bar_id" property="id"/>
            <result column="bar_name" property="name"/>
            <result column="bar_create_time" property="createTime"/>
        </association>
    </resultMap>
    <select id="selectById" parameterType="java.lang.Long" resultMap="FarResultMap">
       select f.id,
               f.name,
               f.create_time,
               b.id          as bar_id,
               b.name        as bar_name,
               b.create_time as bar_create_time
        from far f,
             bar b
        where f.bar_id = b.id
          and f.id = #{id}
    </select>
    <select id="selectByBarId" parameterType="java.lang.Long" resultMap="FarResultMap">
        select f.id,
               f.name,
               f.create_time,
               b.id          as bar_id,
               b.name        as bar_name,
               b.create_time as bar_create_time
        from far f,
             bar b
        where f.bar_id = b.id
          and b.id = #{id}
    </select>
</mapper>
```

#### 懒加载

首先确保在配置文件里开启了懒加载 `mybatis.configuration.lazy-loading-enabled: true`。

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.orionpax.learn.mybatis.mapper.FarMapper">
    <resultMap id="BaseResultMap" type="com.orionpax.learn.mybatis.entity.Far">
        <id column="id" property="id"/>
        <result column="name" property="name"/>
        <result column="create_time" property="createTime"/>
    </resultMap>
    <resultMap id="FarResultMap" type="com.orionpax.learn.mybatis.entity.Far" extends="BaseResultMap">
        # 把结果字段映射为另一个查询的结果集
        # select 指定目标查询
        # column 指定当前查询的某个结果字段为目标查询的参数
        <association property="bar" javaType="com.orionpax.learn.mybatis.entity.Bar"
                     select="com.orionpax.learn.mybatis.mapper.BarMapper.selectById" column="bar_id"/>
    </resultMap>
    # 懒加载查询，当前 sql 片段只是一个简单查询，当 resultMap 的懒加载字段被调用时，会根据配置调用另一查询
    <select id="selectByIdLazy" parameterType="java.lang.Long" resultMap="FarResultMap">
        select id, name, create_time, bar_id
        from far
        where id = #{id}
    </select>
    # 被另一个 Mapper 的懒加载查询调用
    <select id="selectByBarId" parameterType="java.lang.Long" resultType="com.orionpax.learn.mybatis.entity.Far">
        select id, name, create_time
        from far
        where bar_id = #{id}
    </select>
</mapper>
```

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.orionpax.learn.mybatis.mapper.BarMapper">
    <resultMap id="BaseResultMap" type="com.orionpax.learn.mybatis.entity.Bar">
        <id column="id" property="id"/>
        <result column="name" property="name"/>
        <result column="create_time" property="createTime"/>
    </resultMap>
    <resultMap id="BarResultMap" type="com.orionpax.learn.mybatis.entity.Bar" extends="BaseResultMap">
        # 把结果字段映射为另一个查询的结果集
        # select 指定目标查询
        # column 指定当前查询的某个结果字段为目标查询的参数
        <collection property="fars" ofType="com.orionpax.learn.mybatis.entity.Far"
                    select="com.orionpax.learn.mybatis.mapper.FarMapper.selectByBarId" column="id"/>
    </resultMap>
    # 懒加载查询，当前 sql 片段只是一个简单查询，当 resultMap 的懒加载字段被调用时，会根据配置调用另一查询
    <select id="selectByIdLazy" parameterType="java.lang.Long" resultMap="BarResultMap">
        select id, name, create_time
        from bar
        where id = #{id}
    </select>
    # 被另一个 Mapper 的懒加载查询调用
    <select id="selectById" parameterType="java.lang.Long" resultType="com.orionpax.learn.mybatis.entity.Bar">
        select id, name, create_time
        from bar
        where id = #{id}
    </select>
</mapper>
```

#### 缓存

##### 一级缓存

SqlSession 级别，默认开启，并且不能关闭。

操作数据库时需要创建 SqlSession 对象，在对象中有⼀个 HashMap ⽤于存储缓存数据，不同的
SqlSession 之间缓存数据区域是互不影响的。

需要注意的是，如果 SqlSession 执⾏了 DML 操作（insert、update、delete），MyBatis 必须将缓存
清空以保证数据的准确性。

##### 二级缓存

⼆级缓存是多个 SqlSession 共享的，其作⽤域是 Mapper 的同⼀个 namespace，不同的 SqlSession
两次执⾏相同的 namespace 下的 SQL 语句，参数也相等，则第⼀次执⾏成功之后会将数据保存到⼆级
缓存中，第⼆次可直接从⼆级缓存中取出数据。

Mybatis 的二级缓存开启也非常简单，在 application.yml 中配置 `mybatis.configuration.cache-enabled: true` 开启二级缓存。在需要进行二级缓存的 Mapper.xml 中添加 `<cache />` 标签，最后让缓存的对象实现序列化接口即可。

ehcache ⼆级缓存，因为 Mybatis 的原声的二级缓存已经简单到简陋的程度了。 ehcache 提供了 Mybatis 二级缓存更好的支持。

1. pom 文件添加相关依赖

```
<dependency>
 <groupId>org.mybatis</groupId>
 <artifactId>mybatis-ehcache</artifactId>
 <version>1.0.0</version>
</dependency>
<dependency>
 <groupId>net.sf.ehcache</groupId>
 <artifactId>ehcache-core</artifactId>
 <version>2.4.3</version>
</dependency>
```

2. 添加 ehcache.xml 配置文件

```
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:noNamespaceSchemaLocation="../config/ehcache.xsd">
 <diskStore/>
 <defaultCache
 maxElementsInMemory="1000"
 maxElementsOnDisk="10000000"
 eternal="false"
 overflowToDisk="false"
 timeToIdleSeconds="120"
 timeToLiveSeconds="120"
 diskExpiryThreadIntervalSeconds="120"
 memoryStoreEvictionPolicy="LRU">
 </defaultCache>
</ehcache>
```

3. Mapper.xml 中开启二级缓存

```
<cache type="org.mybatis.caches.ehcache.EhcacheCache">
 <!-- 缓存创建之后，最后⼀次访问缓存的时间⾄缓存失效的时间间隔 -->
 <property name="timeToIdleSeconds" value="3600"/>
 <!-- 缓存⾃创建时间起⾄失效的时间间隔 -->
 <property name="timeToLiveSeconds" value="3600"/>
 <!-- 缓存回收策略，LRU表示移除近期使⽤最少的对象 -->
 <property name="memoryStoreEvictionPolicy" value="LRU"/>
</cache>
```

4. 同样需要配置 `mybatis.configuration.cache-enabled: true` 开启二级缓存，但是缓存对象并不需要实现序列化接口

#### 动态 Sql

- if 标签，if 标签可以⾃动根据表达式的结果来决定是否将对应的语句添加到 SQL 中，如果条件不成⽴则不添加，
  如果条件成⽴则添加

```
<select id="findByAccount" parameterType="com.southwind.entity.Account"
resultType="com.southwind.entity.Account">
 select * from t_account where
 <if test="id!=0">
 id = #{id}
 </if>
 <if test="username!=null">
 and username = #{username}
 </if>
 <if test="password!=null">
 and password = #{password}
 </if>
 <if test="age!=0">
 and age = #{age}
 </if>
</select>
```

- where 标签，where 标签可以⾃动判断是否要删除语句块中的 and 关键字，如果检测到 where 直接跟 and 拼接，则
  ⾃动删除 and，通常情况下 if 和 where 结合起来使⽤

```
<select id="findByAccount" parameterType="com.southwind.entity.Account"
resultType="com.southwind.entity.Account">
 select * from t_account
 <where>
 <if test="id!=0">
 id = #{id}
 </if>
 <if test="username!=null">
 and username = #{username}
 </if>
 <if test="password!=null">
 and password = #{password}
 </if>
 <if test="age!=0">
 and age = #{age}
 </if>
 </where>
</select>
```

- set 标签，set 标签⽤于 update 操作，会⾃动根据参数选择⽣成 SQL 语句。

```
<update id="update" parameterType="com.southwind.entity.Account">
 update t_account
 <set>
 <if test="username!=null">
 username = #{username},
 </if>
 <if test="password!=null">
 password = #{password},
 </if>
 <if test="age!=0">
 age = #{age}
 </if>
 </set>
 where id = #{id}
</update>
```

- foreach 标签，foreach 标签可以迭代⽣成⼀系列值，这个标签主要⽤于 SQL 的 in 语句。

```
<select id="findByIds" parameterType="com.southwind.entity.Account"
resultType="com.southwind.entity.Account">
 select * from t_account
 <where>
 <foreach collection="ids" open="id in (" close=")" item="id"
separator=",">
 #{id}
 </foreach>
 </where>
</select>
```

- choose 、when 标签

```
<select id="findByAccount" parameterType="com.southwind.entity.Account"
resultType="com.southwind.entity.Account">
 select * from t_account
 <where>
 <choose>
 <when test="id!=0">
 id = #{id}
 </when>
 <when test="username!=null">
 username = #{username}
 </when>
 <when test="password!=null">
 password = #{password}
 </when>
 <when test="age!=0">
 age = #{age}
 </when>
 </choose>
 </where>
</select>
```

- trim 标签，trim 标签中的 prefix 和 suffix 属性会被⽤于⽣成实际的 SQL 语句，会和标签内部的语句进⾏拼接，如
  果语句前后出现了 prefixOverrides 或者 suffixOverrides 属性中指定的值，MyBatis 框架会⾃动将其删
  除。

```
<select id="findByAccount" parameterType="com.southwind.entity.Account"
resultType="com.southwind.entity.Account">
 select * from t_account
 <trim prefix="where" prefixOverrides="and">
 <if test="id!=0">
 id = #{id}
 </if>
 <if test="username!=null">
 and username = #{username}
 </if>
 <if test="password!=null">
 and password = #{password}
 </if>
 <if test="age!=0">
 and age = #{age}
 </if>
 </trim>
</select>
```

### 如何使用逆向工程？

使用 Mybatis Generator 配置如下，实际更复杂的逆向工程的需求可以自己实现。

1. `pom.xml` 添加插件

```
<plugin>
  <groupId>org.mybatis.generator</groupId>
  <artifactId>mybatis-generator-maven-plugin</artifactId>
  <version>1.3.2</version>
  <configuration>
    <!--允许移动生成的文件 -->
    <verbose>true</verbose>
    <!-- 是否覆盖 -->
    <overwrite>true</overwrite>
    <configurationFile>${project.basedir}/generatorConfig.xml</configurationFile>
  </configuration>
  <dependencies>
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
                  <version>8.0.19</version>
    </dependency>
    <dependency>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-core</artifactId>
      <version>1.3.2</version>
    </dependency>
  </dependencies>
</plugin>
```

2. 设置插件配置文件 `generatorConfig.xml`

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <context id="testTables" targetRuntime="MyBatis3">
        <commentGenerator>
            <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>
        <!--数据库连接的信息：驱动类、连接地址、用户名、密码 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/learn_mybatis?characterEncoding=utf-8"
                        userId="root"
                        password="root">
        </jdbcConnection>

        <!-- 默认false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer，为 true时把JDBC DECIMAL 和
           NUMERIC 类型解析为java.math.BigDecimal -->
        <javaTypeResolver>
            <property name="forceBigDecimals" value="false"/>
        </javaTypeResolver>

        <!-- targetProject:生成POJO类的位置 -->
        <javaModelGenerator targetPackage="com.orionpax.learn.entity"
                            targetProject="src/main/java">
            <!-- enableSubPackages:是否让schema作为包的后缀 -->
            <property name="enableSubPackages" value="false"/>
            <!-- 从数据库返回的值被清理前后的空格 -->
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>

        <!-- targetProject:mapper映射文件生成的位置
           如果maven工程只是单独的一个工程，targetProject="src/main/java"
           若果maven工程是分模块的工程，targetProject="所属模块的名称"，例如：
           targetProject="ecps-manager-mapper"，下同-->
        <sqlMapGenerator targetPackage="com.orionpax.learn.mapper"
                         targetProject="src/main/java">
            <!-- enableSubPackages:是否让schema作为包的后缀 -->
            <property name="enableSubPackages" value="false"/>
        </sqlMapGenerator>

        <!-- targetPackage：mapper接口生成的位置 -->
        <javaClientGenerator type="XMLMAPPER"
                             targetPackage="com.orionpax.learn.mapper"
                             targetProject="src/main/java">
            <!-- enableSubPackages:是否让schema作为包的后缀 -->
            <property name="enableSubPackages" value="false"/>
        </javaClientGenerator>

        <!-- 指定数据库表  多个表示,可用多个table标签-->
        <table tableName="far"
               enableCountByExample="false"
               enableUpdateByExample="false"
               enableDeleteByExample="false"
               enableSelectByExample="false"
               selectByExampleQueryId="false">
        </table>
        <table tableName="bar"
               enableCountByExample="false"
               enableUpdateByExample="false"
               enableDeleteByExample="false"
               enableSelectByExample="false"
               selectByExampleQueryId="false">
        </table>
    </context>
</generatorConfiguration>
```

3. 运行插件
