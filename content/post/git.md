---
title: "Git 学习笔记"
date: 2019-08-29T20:03:23+08:00
tags: ["学习笔记", "Git"]
---

## 简单使用

### 应用场景

#### 初始化配置

```
//最小配置信息
git config --global user.name 'your_name'
git config --global user.email 'your_email'

//config的三个作用域
//当前仓库有效
git config --local
//当前用户所有仓库有效
git config --global
//当前系统所有用户的所有仓库有效
git config --system

//显示config配置
git config --list [作用域]
```

#### 本地仓库管理

```
//已有项目加入Git管理
cd <项目目录>
git init

//新增项目并使用Git管理
git init <your_project>

//检查修改内容
git status

//将文件加入Git版本控制(工作目录 -> 暂存区)
git add [文件名] [-u : 管理全部修改]

//提交暂存区更新内容(暂存区 -> 版本库)
git commit -m '提交原因'
```

#### 远程仓库管理

```
// 密钥位置 C:\Users\ibm\.ssh\*
// 默认公钥文件名称 id_rsa.pub (需在github添加公钥)
// 创建ssh-keygen(公私钥对)
ssh-keygen -C 'your_email'

// 将本地仓库和远程仓库关联
git remote add origin <*.git>

// 使用本地引用更新远程引用，同时发送完成给定引用所需的对象
git push [远程主机名: 通常origin] [-u : 指定默认主机(以后origin可省)]

// 将远程存储库中的更改合并到当前分支中
git pull [远程主机名] [远程分支名]

// 建立追踪关系(如果当前分支与远程分支存在追踪关系，git pull就可以省略远程分支名)
// 如果当前分支只有一个追踪分支，连远程主机名都可以省略。
git branch --set-upstream [本地分支名] origin/[远程分支名]
```

#### 分支管理

```
// 创建分支
git branch <branchName>

// 切换分支
git switch <branchName>

// 创建并切换分支
git switch -c <branchName>

// 查看分支
git branch

// 合并指定分支到当前分支
git merge <branchName>

// 删除分支
git branch -d <branchName>
```

#### 查看 commit 历史

```
git log [--oneline : 单行简洁] [--all : 查看所有分支] [-n<number> : 查看最近number次提交] [--graph : 分支演化]

//打开可视化 git log 查看器
gitk

//常用git log 命令 设置别名
//查看自己的提交(简洁描述)
git config --global alias.lm  "log --no-merges --color --date=format:'%Y-%m-%d %H:%M:%S' --author='your_name' --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Cblue %s %Cgreen(%cd) %C(bold blue)<%an>%Creset' --abbrev-commit"

//查看自己的提交(展示修改的文件概览)
git config --global alias.lms  "log --no-merges --color --stat --date=format:'%Y-%m-%d %H:%M:%S' --author='your_name' --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Cblue %s %Cgreen(%cd) %C(bold blue)<%an>%Creset' --abbrev-commit"

//查看提交(简洁描述)
//git config --global alias.ls "log --no-merges --color --graph --date=format:'%Y-%m-%d %H:%M:%S' --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Cblue %s %Cgreen(%cd) %C(bold blue)<%an>%Creset' --abbrev-commit"

//查看提交(展示修改的文件概览)
git config --global alias.lss "log --no-merges --color --stat --graph --date=format:'%Y-%m-%d %H:%M:%S' --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Cblue %s %Cgreen(%cd) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

#### 比较文件差异

```
// 工作区和暂存区
git diff [branch : 指定比较分支] [filename : 指定文件]

// 暂存区和GIT仓库
git diff --cached [commit : 指定GIT仓库的提交版本] [filename : 指定文件]

// 工作目录和GIT仓库
git diff [commit : 指定GIT仓库的提交版本] [filename : 指定文件]

// 以上命令可以不指定 <filename>，则对全部文件操作。commit 可以设置为HEAD指针。
```

#### 丢弃暂存区修改

```
git reset HEAD
```

#### 丢弃工作区修改

```
// 省略commit，则会用暂存区的文件覆盖工作区中的文件
git checkout [commit : 指定提交版本覆盖暂存区和工作区的内容] [-- files : 指定需要覆盖的文件]
```

#### 暂存工作区修改去干其它重要的事情

```
// 该命令保存本地修改，并恢复工作目录以匹配HEAD提交
git stash

// 查看已有存储
git stash list

// 查看存储stash的文件变化
git stash show

// 取回存储
git stash pop [stash_name]
```

#### 忽略已被 git 管理的文件

```
// 从git管理中删除指定文件
git rm --cached <文件>
// 更新 .gitignore 后提交
```

#### 配置相关

##### 修改 HTTP 传输请求数据时最大的缓存字节数

```
git config --global http.postBuffer 524288000
```

##### 远程 HTTPS 验证时记住密码

```
git config --global credential.helper store
```

##### 配置全局 git 编码

```
// 解决中文乱码情况
git config --global gui.encoding utf-8
```

##### 使用代理提高 git 速度

```
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080
```

#### 其它命令(基本没有应用场景)

```
//git对象查看
git cat-file [-t : 查看类型] [-p : 查看内容] <git对象hash>
```

### Git 的三种对象

#### commit

提交对象是用来保存提交的作者、时间、说明这些信息的

#### tree

树对象是文件目录树，记录了文件获取目录的名称、类型、模式信息。

#### blob

数据对象是文件的内容，不包括文件名、权限等信息。Git 会根据文件内容计算出一个 hash 值，以 hash 值作为文件索引存储在 Git 文件系统中。由于相同的文件内容的 hash 值是一样的，因此 Git 将同样内容的文件只会存储一次。

### 工作区、暂存区、版本库

![img1](https://image-static.segmentfault.com/171/646/1716463609-5bf0fbfc7c3aa_articlex)

- 工作区：用来编辑保存项目文件的地方，也是用户能直接操作到的地方。
- 暂存区：保存了下次将提交的文件列表信息，一般在 Git 仓库目录中，是一个叫 index 的文件，通常多数说法还是叫暂存区域。
- 版本库：也叫本地版本库，之所以说 git 快，是因为它是分布式版本控制系统，大部分提交都是对本地仓库而言的，不依赖网络，最后一次会推送的到远程仓库。

总结 git 基本的工作流程如下：

1. 在工作目录中修改(此处修改包含了创建和删除)文件；
2. 暂存文件，将文件 add 放入暂存区域；
3. 提交更新，找到暂存区域的文件，将暂存区的文件 commit 到版本库；
4. 如果工作区的文件改乱了（包括了误删、误改），想回到上一版本，就可以使用 git checkout 命令将版本库中的文件检出到工作区将本次更改 discard(覆盖)掉。

### 多人协作工作流程

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

- 查看远程库信息，使用 `git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 如果 git pull 提示 no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`；

## 值得一提

### 多个 SSH Key 管理

1. 生成 SSH Key 时，对文件进行命名。
2. 检查是否有已配置的代理 `ssh-add -l`
3. 运行私钥管理器 `exec ssh-agent bash`
4. 添加私钥 `ssh-add ~/.ssh/id_rsa_XXX`
5. 在 github 添加公钥
6. 创建配置文件 `touch ~/.ssh/config`

   ```
   # 默认的github用户 OrionPax19970905
   Host github.com
   HostName github.com
   PreferredAuthentications publickey
   IdentityFile ~/.ssh/id_rsa_OrionPax19970905
   user OrionPax19970905

   # ZQianlvT
   Host github.zqt.com
   HostName github.com
   PreferredAuthentications publickey
   IdentityFile ~/.ssh/id_rsa
   user ZQianlvT

   #Host                          #配置别名
   #HostName                      #这个是真实的域名地址
   #IdentityFile                  #这里是id_rsa的地址
   #PreferredAuthentications      #配置登录时用什么权限认证--可设置publickey,password publickey,keyboard-interactive等
   #User                          #配置使用用户名
   ```

7. 测试
   ```
   ssh -T git@github.com          #测试OrionPax19970905
   ssh -T git@github.zqt.com      #测试ZQianlvT
   ```

## 参考

> [SSH Key 管理](https://www.jianshu.com/p/a3b4f61d4747)  
> [廖雪峰的 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600)  
> [图解 Git 工作区、暂存区、版本库之间的关系](https://segmentfault.com/a/1190000017053187)
