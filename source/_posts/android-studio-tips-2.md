---
date: 2015/09/29 14:00:00
thumbnailImagePosition: left
thumbnailImage: architecture-3121009_640.jpg
coverImage: architecture-3121009_640.jpg
title: "【译】Android Studio 使用技巧系列(二)-快捷键"
categories: [android]
tags: [androidstuido]
---

`Android Studio`中快捷键使用技巧二
<!-- excerpt -->

> 原文:[http://www.developerphil.com/android-studio-tips-of-the-day-roundup-2/](http://www.developerphil.com/android-studio-tips-of-the-day-roundup-2/)

接上篇：
### 11.  复制行
```
Mac : cmd + d
Windows / Linux : ctrl + d
```
正如字面意思：它将会复制当前行并且粘贴在下一行，它并不会复制到剪贴板。当它被用于复制当前行时它将会是非常有用的。（ 译者注： 当然，该命令也可以复制选中的行）。
>**译者注：**Eclipse 中该操作的快捷键是 `ctrl + alt + up/down`

![Alt text](./11.gif)

### 12.  扩大/收缩 选中部分
```
Mac : alt + up/down 
Windows / Linux : ctrl + w / ctrl + shift + w
```
这个能扩大当前选中的区域。如它能选择当前的变量，然后是声明，然后是方法等等。
![Alt text](./12.gif)

### 13. 包裹代码块
```
Mac : cmd + alt + t
Windows / Linux : ctrl + alt + t
```
该快捷键被用来用一些结构包裹代码块。通常使用`if`、`while`、`try-catch`或`runnable`。
如果什么也没有选中，它将会包裹当前行。
![Alt text](./13.gif)

### 14. 最近打开的文件
```
Mac : cmd + e
Windows / Linux : ctrl + e
```
在第一篇文章中已经提到，使用这个可以得到一个最近打开的文件的可搜索的列表！
![Alt text](./14.gif)

### 15. 在线模版
```
Mac : cmd + j
Windows / Linux : ctrl + j
```
在线模板是一个快速插入代码片段的方式。使用在线模板有趣的是它能参数化，当你插入代码时它可以使用参数智能的引导你。
![Alt text](./15.gif)
**相关技巧**
> - 如果你知道它的缩写你就不需要调用快捷键。你可以直接输入它并用`Tab`键完成输入。

### 16. 移动方法
```
Mac : cmd + alt + up/down
Windows / Linux : ctrl + shift + up/down
```
这个和移动当前行类似，但它可以用于整个方法。它可以上下移动一个方法不用复制粘贴。 
这个`action`真正的名称是`Move Statement`。这意味着它可以移动`statement`中的任何一种。如：你可以重新排列字段和内部类的顺序。
![Alt text](./16.gif)

### 17.  语句补全
```
Mac : cmd + shift + enter
Windows / Linux : ctrl + shift + enter
```
它可以在编写语句时生成未完成的代码，通常用于下列情况：
- 在行尾添加一个分号，甚至可以在你的光标没在行尾时
- 在`if`、`while`或`for`添加括号和花括号
- 在方法的声明后添加一个花括号

![Alt text](./17.gif)

**相关技巧**
> - 如果`statement`已经完成，它会直接跳到下一行，即使光标没有在当前行的最后一个字符。

### 18.   上次编辑位置
```
Mac : cmd + shift + backspace
Windows / Linux : ctrl + shift + backspace
```
在第一篇文章中已经提到,它将会跳到你最后修改代码的位置。这个和工具栏上的后退是不同的，它会在你的编辑历史中跳转，而不是导航历史.
![Alt text](./17-navigate-previous-changes.gif)

### 19.  代码合并
```
Mac : ctrl + shift + j
Windows / Linux : ctrl + shift + j
```
这个比在行尾模拟删除键能做的更多！它会保存格式化规则，还有下面的特性：
- 合并两个注释行并且删除没有用的 `//`
- 合并多行字符串，移除加号和双引号
- 合并字段和赋值

**相关技巧**
> - 如果你选择一个多行的字符串，它将会合并成一行。

![Alt text](./18-joinlines.gif)

### 20.  选择于
```
Mac : alt + f1
Windows / Linux : alt + f1
```
询问你从哪选择当前的文件。恕我直言，这是最有用的快捷键对于在工程结构中或你的文件资源管理器中打开。每个`action`都有一个字母或数字的前缀，这是快速调用它的快捷键。 
通常，我会使用`Alt+F1`然后回车为了在工程视图中打开和`Alt+F1+8`在`Mac`的文件资源管理器中打开。 
你可以从工程视图中调用这个对于一个文件或文件夹。
![Alt text](./19.gif)


### 21.  移除包裹代码
```
Mac : cmd + shift + delete
Windows / Linux : ctrl + shift + delete
```
移除周围代码。它可以移除`if`、`while`、`try/catch`甚至一个`runnable`。这个正好和`Surround With`（包裹代码块）的快捷键功能相反。
![Alt text](./20.gif)

