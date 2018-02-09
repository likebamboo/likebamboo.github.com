---
date: 2015/09/29 15:00:00
thumbnailImagePosition: left
thumbnailImage: sea-3121435_960_720.jpg
coverImage: sea-3121435_960_720.jpg
title: "【译】Android Studio 使用技巧系列(三)-调试"
categories: [android]
tags: [androidstuido]
---

`Android Studio`中快捷键使用技巧三--调试时可能会使用到的快捷键
<!-- excerpt -->

> 原文:[http://www.developerphil.com/android-studio-tips-of-the-day-roundup-3/](http://www.developerphil.com/android-studio-tips-of-the-day-roundup-3/)

下面几个技巧是关于调试的。
### 22.  设置与取消断点
```
Mac : cmd + f8
Windows / Linux : ctrl + f8
```
我们从最简单的一个开始学习：添加一个断点。相信你已经调试过应用并且知道在左边框上通过鼠标左键单击设置或取消断点。如果不使用鼠标，你可用通过该快捷键设置断点。
> **译者注：** Eclipse 中该操作快捷键是 `ctrl + shift + b` .

![Alt text](/22.gif)

### 23.   条件断点
```
Mouse : 在断点上右击，然后输入一个条件。 
Mac : cmd + shift + f8 (光标在断点行) 
Windows / Linux : ctrl + shift + f8 (光标在断点行)
```
简而言之，只有在某些条件下才打开断点。你可以输入任何基于当前范围返回一个`boolean`类型的`java`表达式。而且可喜的是是条件文本框支持代码自动补全。
![Alt text](./23.gif)

### 24.  日志断点
```
Mouse : 在断点上右击，取消选中`Suspend`(暂停)，在`Log evaluated Expression`输入你的消息。
```
这是一个输出日志信息但不会中断运行的断点。当你想打印一些东西但又不能或不想添加打印日志的代码时该断点就非常有用了。
![Alt text](./24.gif)

### 25.  临时断点
```
Mouse : 在左侧框上`alt + 单击`
Mac : cmd + alt + shift + f8 
Windows / Linux : ctrl + alt + shift + f8
```
添加一个断点， 第一次运行触发到它后自动移除该断点。
![Alt text](./25.gif)

### 26.  禁用断点
```
Mouse : 在左侧框上的已存在的断点上 `alt + 单击` 
这个没有键盘快捷键，如果你经常用到它的话可以自己创建一个
```
这将禁用该断点。当你有一些复杂的条件或日志断点，你现在不需要但你不想下次重新创建的时候可以禁用断点。
> **译者注：** Eclipse 中该操作快捷键是 在左侧框上 `shift + 双击` .

![Alt text](./26.gif)

### 27.  附加到调试器
```
Mouse: 点击这个图标或从菜单选择`Build->Attach to Android Process`（译者注：不知道此菜单是否为MAC上的功能，Windows下的为`Run->Attach debugger to Android Process`） 
这个没有键盘快捷键，但你应该创建一个。
```
当你没有以调试模式启动应用时可以通过该方法调试应用。这个是非常有用的， 因为你不用重新以调试模式部署应用。当有人在测试应用时，测出一个bug, 给你他的设备时，这个操作就相当有用。
![Alt text](./27.gif)

### 28.  表达式求值
```
Mouse: 点击这个图标或从菜单选择`Build->Attach to Android Process`（译者注：不知道此菜单是否为MAC上的功能，Windows下的为`Run->Attach debugger to Android Process`） 
这个没有键盘快捷键，但你应该创建一个。
```
它被用来检查一个变量的内容以及对任何有效的java表达式求值。需要知道的是如果你的状态改变了，当你恢复程序的执行时候它还会保持那种结果。
> **译者注：** Eclipse 中在断点处选中变量、表达式然后 `右键 -> watch`查看表达式的值

![Alt text](./28.gif)

### 29.  查看值
```
Mouse: 在表达式上` alt + 单击`
```
查看一个表达式的值不会打开`Evaluate`表达式对话框。
> **译者注：** Eclipse 中该操作的快捷键是`ctrl + shift + i`, 或者使用鼠标`右键 -> Inspect`

![Alt text](./29.gif)

### 30.  标记对象
在`variables`或`watch`面板上
```
Mouse: `右击`选择 `Mark Object`
Mac : 选中对象后 + `f3`
Windows / Linux : 选中对象后 + `f11`
```
在调试会话中，这个可以在一个指定的对象上添加一个标签，因此稍后你可以识别它。在你有一些相似的对象并且你想知道它和之前的是同一个对象时这样的调试会话中是非常有用的。
![Alt text](./30.gif)

### 31.  异常栈分析
```
菜单: `Analyze -> Analyze Stacktrace`
查找action: `analyze stacktrace`
```
该操作可以抓取已经显示在`logcat`中的异常栈并使之可以点击跳转到相关代码。当从`bug`日志或终端复制异常堆栈时非常有用。
![Alt text](./31.gif)

