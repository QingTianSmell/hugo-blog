---
title: "Mybatis 学习笔记"
date: 2020-04-04T11:29:00+08:00
draft: ["学习笔记", "后端"]
---

<!-- vim-markdown-toc GitLab -->

* [What](#what)
* [How](#how)
  * [Spring Boot 如何整合 Mybatis?](#spring-boot-如何整合-mybatis)
  * [通过 xml 文件使用 Mybatis 框架。](#通过-xml-文件使用-mybatis-框架)
    * [简单的增删改查](#简单的增删改查)
    * [集联查询](#集联查询)
  * [如何使用逆向工程？](#如何使用逆向工程)

<!-- vim-markdown-toc -->

## What

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

## How

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

### 通过 xml 文件使用 Mybatis 框架。

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
