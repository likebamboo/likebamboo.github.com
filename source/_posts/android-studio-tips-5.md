---
date: 2015/09/29 17:00:00
thumbnailImagePosition: left
thumbnailImage: gallery-3114279_640.jpg
coverImage: gallery-3114279_640.jpg
title: "【译】Android Studio 使用技巧系列(五)"
categories: [android]
tags: [androidstuido]
---

`Android Studio`中快捷键使用技巧五
<!-- excerpt -->

> 原文:[http://www.developerphil.com/android-studio-tips-of-the-day-roundup-5/](http://www.developerphil.com/android-studio-tips-of-the-day-roundup-5/)

### 41.  代码自动补全 Enter  与 Tab 比较
```
enter or tab
```
你可以用`Enter`或`Tab`来实现代码自动补全并且它们之间有一个有趣的差异。
使用`Enter`将会自动完成你想要的语句。使用`Tab`将会自动完成语句并且向前删除所有代码直到下一个点号，括号，分号或空格。(译者注：看下图就明白了)
![Alt text](./41.gif)

### 42.  导航到父类
```
Mac ： cmd + u
Windows / Linux: ctrl + u
```
如果你的光标在重写父类的一个方法内（如：`Activity#onCreate()`），这个将会跳到父类的实现上。 
如果你的光标在类名上，它将会跳到父类。

![Alt text](./42.gif)


### 43.  返回到编辑器
有很多快捷键使光标离开编辑器（`type hierarchy`,`find usages`等）
如果你想退回到编辑器，你可以选择如下操作：
> `Escape` :  简单地返回到编辑器。
> `Shift+Escape` :  关闭当前面板然后使光标返回到编辑器。

![Alt text](./43.gif)

###  44.  跳到最近使用的工具窗口
```
Mac ： f12 
Windows / Linux: f12 
可能和操作系统的快捷键有冲突
```
有时候，你从面板返回到编辑器，但是你发现不得不再返回到这个面板。例如：浏览`find usages`。使用这个快捷键，你可以不用鼠标返回到这个面板。
![Alt text](./44.gif)

###  45.  隐藏所有面板
```
Mac ： cmd + shift + f12 
Windows / Linux: ctrl + shift + f12 
```
让编辑器进入某种形式上的全屏模式。再次调用这个快捷键可以返回所有面板到它们之前的状态。
![Alt text](./45.gif)

###  46.  通过编号打开面板
```
Mac ： cmd + number
Windows / Linux: alt + number
```
你可能注意到一些面板名字左边有一个数字。这是打开它们的快捷键。 
如果你看不到面板的名字，可以点击IDE的左下角的盒子似的东西。
![Alt text](./46.gif)

###  47.  显示参数信息
```
Mac ： cmd + p
Windows / Linux: ctrl + p
```
当你正调用一个方法时会显示一个方法参数的列表。这在你想看已存在的方法参数时是挺有用的。
你光标所在位置的参数会用黄色显示。如果没有参数用黄色，这意味着方法调用是无效的，可能有参数不能被正确地强转（如：将一个`float`值传给一个`int`类型的参数）
当你正在写一个方法调用参数信息意外地消失了，就像我经常做的，你也可以输入一个逗号（`,`
）用来触发参数信息的显示。
![Alt text](./47.gif)

###  48.  切换器
```
Mac ： ctrl + tab
Windows / Linux: ctrl + tab
```
这个功能和`IDE`的`alt + tab` / `cmd + tab`差不多。它允许你导航到一个`tab`或一个`panel`。
一旦它被打开，只要你按住`ctrl`键，你可以使用数字或字母快捷键快速导航。你也可以通过按下`backspace`键关闭一个已选择的`tab`或`panel`。
![Alt text](./48.gif)

###  49.  上下文信息
```
Mac ： ctrl + shift + q
Windows / Linux: ctrl + shift + q
```
这个将会显示你当前位置，当你的定义范围超出滚动的区域时。通常，这将会是类或内部类的名称，但它也可能是当前方法名。
在我看来，它最好的作用是快速查看当前类继承或实现关系。 
它也可以在xml文件中使用。
![Alt text](./49.gif)
