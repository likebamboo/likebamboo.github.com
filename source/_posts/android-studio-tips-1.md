---
date: 2015/09/29 13:00:00
thumbnailImagePosition: left
thumbnailImage: abstract-2845763_640.jpg
coverImage: abstract-2845763_640.jpg
title: "【译】Android Studio 使用技巧系列(一)-快捷键"
categories: [android]
tags: [androidstuido]
---

`Android Studio`中快捷键使用技巧
<!-- excerpt -->

> 原文:[http://www.developerphil.com/android-studio-tips-of-the-day-roundup-1/](http://www.developerphil.com/android-studio-tips-of-the-day-roundup-1/)

### 1. 高亮所有相同变量
```
Mac : cmd + shift + f7
Windows / Linux : ctrl + shift + f7
```
这个快捷键将会高亮当前选中字符所有的出现之处。当然这个快捷键不仅仅只是一些简单地模式匹配，它还会理解当前的变量所处范围，只高亮相关的字符。
高亮之后你就可以使用`Edit → Find → Find Next/Previous`处定义的快捷方式来选择你要操作的高亮字符。

> **译者注：** Eclipse 中高亮显示成员变量的快捷键是 `alt + shift + o` .

**相关技巧：**
> - 高亮代码方法中的`return` 或者 `throw`, 同时也会高亮这个方法的所有出口。
> - 高亮`Java`类的`extends` 或者`implements` 的定义部分也会高亮对应的重写或者实现的方法。
> - 高亮`import`语句也会高亮它被使用的地方。
> - `Esc`键可以取消高亮。

![Alt text](/1.gif)

### 2. 在方法和内部类之间跳转
```
Mac : ctrl + up/down
Windows / Linux : alt + up/down
```
这个快捷键可以让你很方便的在当前文件的方法或者类上面跳转。
如果你当前处于一个方法中，此快捷键（向上）可以让你的光标跳至方法名处。这对你重构代码或者找到这个代码的使用之处很有帮助。
> **译者注：** Eclipse 中该快捷键是 `ctrl + shift + up/down` .

![Alt text](/2.gif)

### 3. 类文件结构弹窗
```
Mac : cmd + f12
Windows / Linux : ctrl + f12
```
这个快捷键可以帮助你展示当前类文件的方法结构。你可以使用这个快捷键弹出弹窗，查找你想要的方法名。
> **译者注：** Eclipse 中该快捷键是 `ctrl + o` .

**相关技巧：**
> - 你可以使用驼峰字符来过滤候选方法列表。例如:输入`oCr` 就可以找到`onCreate`方法。
> - 你可以选择是否展示匿名类。如果你勾选了`是`就可以很方便的查找`OnClickListener`里面的`onClick`方法了。

![Alt text](/3.gif)


### 4. 方法调用层级弹窗
```
Mac : ctrl + alt + h
Windows / Linux : ctrl + alt + h
```
这个快捷键会显示一个方法的声明和它的调用之间的可能的路径。
![Alt text](/4.gif)


### 5. 快速查找定义
```
Mac : alt + space 
Windows / Linux : ctrl + shift + i
```
你是否曾经想在当前页面查看一个方法或类的定义？使用这个快捷键在当前页面查找它。
![Alt text](/05-quickdefinition.gif)

### 6.  折叠或展开代码块
```
Mac : alt + plus/minus 
Windows / Linux : ctrl + shift + plus/minus
```
这个特性的目的是隐藏在某一时刻你不关心的代码。在这个简单的形式中，它将会隐藏整个代码块（如：当你打开一个新文件时忽略导入列表）。更有趣的是它可以隐藏匿名内部类周围的模板代码让它看起来像是一个`lambda`表达式。
![Alt text](/6.gif)

**相关技巧：**
> - 你可以在`Setting->Editor->Code Folding`中设置默认的折叠范围

### 7.   书签
#### 7.1 设置或取消书签
```
Mac : f3
Windows / Linux : f11
```
#### 7.2  带助记符的书签
```
Mac : alt + f3
Windows / Linux : alt + f11
```
如你给书签分配了一个数字，你可以使用下面的快捷键返回到对应书签： 
```
ctrl+number
```
#### 7.3  显示书签列表
```
Mac : cmd + f3
Windows / Linux : shift + f11
```
![Alt text](/7.gif)

> **译者注：** Eclipse  中貌似并没有书签的快捷键，但是同样也可以设置书签，只要在编辑窗口左边的边框上右键就可以看到添加书签的菜单。 同时可以通过`window -> show view -> Bookmarks`来查看所有书签。


### 8. 查找菜单项
```
Mac : cmd + shift + a
Windows / Linux :  ctrl + shift + a
```
你可以通过名称在Android Studio中调用任何你知道的菜单或`action`！对于你之前使用过但没有快捷键的命令来说这是非常有用的。
![Alt text](/8.gif)

**相关技巧：**
> - 如果这个Action有快捷键，它将会显示在旁边。

### 9.  移动行
```
Mac : alt + shift + up/down
Windows / Linux :  alt + shift + up/down
```
对，这个是用来上下移动当前或选择行代码。没有什么更多要说的，享受它吧。
> **译者注：** Eclipse  中的快捷键是: `alt + up/down`

![Alt text](/9.gif)


### 10.  删除行
```
Mac : cmd + backspace
Windows / Linux :  ctrl + y
```
这个是用来删除当前或选中的行代码
> **译者注：** Eclipse  中的快捷键是: `ctrl + d`

![Alt text](/10.gif)

