---
title: "MySQL 的使用"
date: 2020-03-15T11:50:21+08:00
tags: ["工具"]
---

## 简介

MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。

## 基础
### 基础命令

```bash
# 启动命令和启动服务命令根据操作系统不同有所差别
# 连接 mysql 服务
mysql [-h 地址] [-P 端口] [-u 用户名] [-p 密码]
# 备份数据库
# mysqldump -uroot -p > ~/db/dump1.sql
mysqldump -u <user> -p <database> > <path>
# copy 数据库或者恢复数据库
mysql -u <user> -p <database> < <path>
```

### 基础 SQL 语句
#### 库相关

```sql
-- 添加数据库
create database <database>
-- 删除数据库
drop database <database>
-- 修改数据库的默认字符集
alert database <database> default character set <character>;
-- 查看所有数据库
show databases;
```

#### 表相关

```sql
-- 选择数据库
use <database>;
-- 创建表
create table <table>(<column> <type>,...);
-- 删除表
drop table <table>;
-- 修改表名
alter table <old_name> rename to <new_name>;
-- 添加字段
alter table <table> add column <column> <type>;
-- 删除字段
alter table <table> drop column <column>;
-- 修改字段类型
alter table <table> modify column <column> <type>;
-- 修改字段名称
alter table <table> change column <old_name> <new_name> <type>;
-- 查看所有表
show tables;
-- 查看表结构
desc <table>;
```

#### 数据相关

```sql
-- 插入一行数据，指定所有字段的值，不能多或少
insert into <table> values(<value1>,<value2>, ...);
-- 插入一行数据，指定字段和值
insert into <table>(<column1>, <column2>) values(<value1>, <value2>);
-- 删除所有行，直接释放数据页，效率高不可恢复，清空主键标识，不激发触发器
truncate table <table>;
-- 删除行，不加 where 清空数据表时，也是一行一行删，有记录可恢复，不清空主键标识，会激发触发器
delete from <table> [where 条件列表];
-- 修改行字段值
update <table> set <column>=<value>,... [where 条件列表];
-- 查询
select [distinct] <字段列表> from <表名列表>
 [where 条件列表]
 [union [all] where...]
 [inner join <表名> on <连接条件>]
 [left [outer] join <表名> on <连接条件>]
 [group by <列名列表> [having 条件列表][with rollup]]
 [order by <排序字段> [asc/desc]]
 [limit [起始行下标],<查询行数>];
```

### 列类型

```sql
-- 整型
类型         字节     范围（有符号位）
tinyint     1字节    -128 ~ 127      无符号位：0 ~ 255
smallint    2字节    -32768 ~ 32767
mediumint   3字节    -8388608 ~ 8388607
int         4字节

-- 浮点型
类型              字节
float(单精度)     4字节
double(双精度)    8字节

-- 字符串
char    定长字符串，速度快，但浪费空间
varchar 变长字符串，速度慢，但节省空间

-- 时间日期类型
datetime    8字节    日期及时间    1000-01-01 00:00:00 到 9999-12-31 23:59:59
date        3字节    日期         1000-01-01 到 9999-12-31
timestamp   4字节    时间戳       19700101000000 到 2038-01-19 03:14:07
time        3字节    时间         -838:59:59 到 838:59:59
year        1字节    年份         1901 - 2155
```

### 列约束

```
default
not null
unique
primary key
auto_increment
zerofill
foreign key
```

### 内置函数

```sql
-- 数值函数
abs(x)          -- 绝对值 abs(-10.9) = 10
format(x, d)    -- 格式化千分位数值 format(1234567.456, 2) = 1,234,567.46
ceil(x)         -- 向上取整 ceil(10.1) = 11
floor(x)        -- 向下取整 floor (10.1) = 10
round(x)        -- 四舍五入去整
mod(m, n)       -- m%n m mod n 求余 10%3=1
pi()            -- 获得圆周率
pow(m, n)       -- m^n
sqrt(x)         -- 算术平方根
rand()          -- 随机数
truncate(x, d)  -- 截取d位小数
-- 时间日期函数
now(), current_timestamp();     -- 当前日期时间
current_date();                 -- 当前日期
current_time();                 -- 当前时间
date('yyyy-mm-dd hh:ii:ss');    -- 获取日期部分
time('yyyy-mm-dd hh:ii:ss');    -- 获取时间部分
date_format('yyyy-mm-dd hh:ii:ss', '%d %y %a %d %m %b %j'); -- 格式化时间
unix_timestamp();               -- 获得unix时间戳
from_unixtime();                -- 从时间戳获得时间
-- 字符串函数
length(string)          -- string长度，字节
char_length(string)     -- string的字符个数
substring(str, position [,length])      -- 从str的position开始,取length个字符
replace(str ,search_str ,replace_str)   -- 在str中用replace_str替换search_str
instr(string ,substring)    -- 返回substring首次在string中出现的位置
concat(string [,...])   -- 连接字串
charset(str)            -- 返回字串字符集
lcase(string)           -- 转换成小写
left(string, length)    -- 从string2中的左边起取length个字符
load_file(file_name)    -- 从文件读取内容
locate(substring, string [,start_position]) -- 同instr,但可指定开始位置
lpad(string, length, pad)   -- 重复用pad加在string开头,直到字串长度为length
ltrim(string)           -- 去除前端空格
repeat(string, count)   -- 重复count次
rpad(string, length, pad)   --在str后用pad补充,直到长度为length
rtrim(string)           -- 去除后端空格
strcmp(string1 ,string2)    -- 逐字符比较两字串大小
-- 流程函数
case when [condition] then result [when [condition] then result ...] [else result] end   多分支
if(expr1,expr2,expr3)  双分支。
-- 聚合函数
count()
sum();
max();
min();
avg();
group_concat()
-- 其他常用函数
md5();
default();
```

## 扩展
### 如何进行 SQL 优化？

其实需要优化的主要是慢 sql 和热点 sql 两部分，其他的只要不是写的太难看，基本根据常用的条件字段加个索引就足以解决问题了。

慢 sql 的话，可以开启 MySQL 的慢查询日志，就可以找到对应的 sql 进行相应的调整了。而热点 sql，其实和业务相关，比如说某个查询就是会调用的比较频繁，这个 MySQL 就帮不了我们了，可以自己在 DAO 层打印日志，再通过 sed 根据日志统计热点 sql，当然也可以有其他方案。我记得 Spring Boot 好像就有类似的支持。

找到需要进行优化的 sql 后可以通过 explain 对其执行计划进行分析，找到低效原因，针对性的进行优化。

> [优化 sql 语句的一般步骤](https://segmentfault.com/a/1190000010941790)  
> [一张图彻底搞懂 MySQL 的 explain](https://segmentfault.com/a/1190000021458117?utm_source=tag-newest)

## 应用场景
### 分页查询

```sql
-- 使用 limit 子句进行分页查询, limit <(page-1)*pageSize>,<pageSize>
-- 只写一个参数的情况下，是查询前多少条，也就是 limit n; 等于 limit 0,n;
select <columns> from <table> limit 0,15;
```

### 多表查询

```sql
-- 内连接查询
select <columns> from <table1>,<table2> where <table1_id>=<table2_id>;
select <columns> from <table1> inner join <table2> on <table1_id>=<table2_id>;
-- 左外连接查询
-- 使用左边表的数据去匹配右边表的数据，如果符合连接条件的结果就显示，如果不符合连接条件的则显示 null
select <columns> from <table1> left outer join <table2> on <table1_id>=<table2_id>;
-- 自连接查询
-- 就是虚拟出一张表，通过别名的方式，进行内连接或者外连接查询
select <columns> from <table> as a inner join <table> as b on <a_id>=<b_xxx>;
```

### 子查询

```sql
-- 查询条件未知的问题时，可以分解成多个条件已知的问题
-- 在使用索引的情况下，多表查询要比子查询效率高，因此能用多表查询的就不要用子查询
-- 子查询只会返回一个结果的，父查询用=、!=、>=、<=、>、<，这些符号来比较
select * from <table1> where <column1> = (select <column1> from <table2> where ...);
-- 子查询会返回多个结果的，父查询用in、any、all，这些符号来比较
select * from <table1> where <column1> in (select <column1> from <table2> where ...);
```

### 分组统计查询

```sql
-- 分组查询 column 列并统计数目
select <column>,count(*) from <table> group by <column>;
-- 分组查询后筛选符合条件的行
select <column>,count(*) from <table> group by <column> having count(*) > 100;
```

### MySQL UPDATE 误操作后恢复数据

使用 sed 命令恢复。参考 [mysqlbinlog 结合 sed 命令恢复 update 时未加 where 条件之前的数据](https://blog.51cto.com/wujianwei/2294284)
