---
date: 2015/09/29 18:00:00
thumbnailImagePosition: left
thumbnailImage: tree-3097419_640.jpg
coverImage: tree-3097419_640.jpg
title: "【译】Android Studio 使用技巧系列(六)"
categories: [android]
tags: [androidstuido]
---

`Android Studio`中快捷键使用技巧六
<!-- excerpt -->


> 原文:[http://www.developerphil.com/android-studio-tips-of-the-day-roundup-6/](http://www.developerphil.com/android-studio-tips-of-the-day-roundup-6/)

### 50.  重构
```
Mac ： ctrl + t
Windows / Linux: ctrl + shift + alt + t
```
这是一个针对当前选择的代码显示上下文所有可用的重构的快捷键。这个列表可以通过键盘进行检索并且你也可以使用左侧的数字进行快速访问。

![Alt text](./50.png)

### 51.  最近修改文件
```
Mac ： cmd + shift + e
Windows / Linux: ctrl + shift + e
```
这个和`Recents`弹出框有所不同，这个列出是在本地最近被修改的文件。它是按修改的顺序进行存储（最上面是最近被编辑的）。更方便的是你可以输入字符进行过滤列表。
![Alt text](./51.gif)

### 52.  相关文件
```
Mac ： cmd + ctrl + up
Windows / Linux: ctrl + alt + home
```
它可以帮助你很轻松地在布局和`Activity/fragment`之间进行切换。还有一个快捷方式是在类名的旁边和布局文件的顶部。。
![Alt text](./52.gif)

### 53.  提取变量
```
Mac ： cmd + alt + v
Windows / Linux: ctrl + alt + v
```
它是一个可以不通过重构菜单就自动提取变量的快捷键。
当你动态生成代码时你可以不用输入变量的声明就可以直接生成变量名称。IDE将会生成声明并且还会给出一些建议的变量名称。

**相关技巧：**
> 如果你想修改声明类型为一些更通用的（如：`List`而不是`ArrayList`）,你可以使用`Shift+Tab`它会给出一个可用类型的列表。

![Alt text](./53.gif)

### 54.  提取参数
```
Mac ： cmd + alt + p
Windows / Linux: ctrl + alt + p
```
它是一个可以不通过重构菜单就自动提取参数的快捷键。
当你意识到一个方法可能是通用的时候，可以通过提取一部分做为一个参数。它会使用当前值作为一个参数然后复制原先的值作为调用者的参数。
![Alt text](./54.gif)

### 55.  提取方法
```
Mac ： cmd + alt + m
Windows / Linux: ctrl + alt + m
```
跟着我提取的思路进行重构，这个操作可以提取一个代码块做为一个新的方法。
这个功能是相当有用的。无论什么时候，当你遇到一个变得有点复杂的方法的时候，你可以使用这个操作安全地抽取一部分代码生成一个单独的方法。我所说的安全是因为IDE不会像我们可能会犯一个愚蠢的复制粘贴错误。

> **译者注：** Eclipse中该操作的快捷键是 ` alt + shift + m`

![Alt text](./55.gif)

### 56.  Inline
```
Mac ： cmd + alt + n
Windows / Linux: ctrl + alt + n
```
你使用提取有一点疯狂并且现在有太多的东西？你可以使用反向操作，它叫做`inline`。 
它可以作用于方法，`Fields`，参数和变量。
![Alt text](./56.gif)

### 57.  重命名
```
Mac ： shift + f6
Windows / Linux: shift + f6
```
使用这个，你可以将一个变量，field，方法，类和甚至是包重命名。
当然了，它会确保重命名在你整个应用的上下文中是有意义的，它不会简单地做一个查找然后替换所有文件！
![Alt text](./57.gif)

> **译者注：** Eclipse中该操作的快捷键是 ` alt + shift + r`

### 58. Pull Up / Push Down
```
Mac ： ctrl + t 然后选择成员 
Windows / Linux: ctrl + alt + shift + t 然后选择成员 
```
这里指的上拉成员的意思是我们将当前类的一些成员（通常是方法或属性）发送它到父类或接口。
如果继承于一个类，内容会被移动。如果是实现的一个接口，它将会声明方法作为接口的一部分，在你的类中保持原有的方法并且添加`@Override`注解。
这里指的下推成员，这正好是反向操作，我们会从父类或接口发送一些成员到子类。