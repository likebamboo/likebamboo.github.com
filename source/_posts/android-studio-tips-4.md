---
date: 2015/09/29 16:00:00
thumbnailImagePosition: left
thumbnailImage: nature-3113318_960_720.jpg
coverImage: nature-3113318_960_720.jpg
title: "【译】Android Studio 使用技巧系列(四)"
categories: [android]
tags: [androidstuido]
---

`Android Studio`中快捷键使用技巧四
<!-- excerpt -->

> 原文:[http://www.developerphil.com/android-studio-tips-of-the-day-roundup-4/](http://www.developerphil.com/android-studio-tips-of-the-day-roundup-4/)

### 32.  分析数据流
```
菜单 : `Analyze -> Analyze Data Flow to Here`
Action 查找: `Analyze Data Flow to Here`
```
这个可以查看当前变量、参数或`field`调用的路径！当你进入到一个你不熟悉的代码而又想理解这个参数是怎样传到那里的时候，这个操作就非常又有用了。
该操作也有一个反向操作`Analyze Data Flow `**`from`**` Here`，它将会显示变量、`field`或返回类型的被调用的路径。

![Alt text](./32.gif)

### 33.  文本多选
```
Mac : ctrl + g
Windows / Linux : alt + j
```
这是一个格外棒的功能！
当选中当前选择部分后，它会同时选中下一个出现代码的地方并且添加一个光标。这就意味着你可以在同一个文件中拥有有多个光标！你编辑的任何内容会在每个光标处都相同地执行一遍。
![Alt text](./33.gif)

### 34.  按列选择
```
Mouse: alt + 拖动鼠标
Mac : cmd + shift + 8
Windows / Linux : shift + alt + insert
```
列选择，也被称为块选择。基本上，如果你向下移动光标，它将直接向下选择而不会很烦人地选择到行尾。
该操作同样会在块选择的每行后面放置一个光标。
> **译者注：**  在Eclipse 中一直没找到该功能，不知道是不是我孤陋寡闻，平时只要涉及到按列选择，都是使用 notepad++ 完成的。

![Alt text](./34.gif)

### 35.  后缀补全
这个不是特别的直观但功能依然很强大。该操作简化了用其它的东西包裹当前代码的操作，而不必大量的敲击键盘。 
例如：为了实现对一个列表的迭代，你可以使用`myList.for`, 然后按下`Tab`键，它将会给你生成一个`for`循环。
一些我个人非常喜欢的：
> `.for` (用于生成 `for` 循环)
> `.format` (用`String.format()` 包裹一个 字符串)
> `.cast` (用一个强制类型转换包裹一个语句)

![Alt text](./35.gif)

### 36.  与剪贴板的内容对比
```
Mouse: 右击选中的部分 -> 选择 `Compare With Clipboard`
查找Action : `Compare With Clipboard`
```
它可以让当前选择的部分和剪贴板的内容做一个`diff`。
![Alt text](./36.gif)

### 37.  终止任务
```
Mac : cmd + f2
Windows / Linux : ctrl + f2
```
该操作会终止当前正在运行的任务或者显示一个可以终止的任务列表(当不止一个任务正在运行时)。 
对于终止调试或终止构建非常有用.
![Alt text](./37.gif)

### 38.  显示执行点
```
Mac : alt + f10
Windows / Linux : alt + f10
```
当正在调试时，该操作会让光标返回到当前正在调试的地方。
通常用于如下情况：
- 调试时程序在某个地方中断了
- 你开始在这个文件查看然后跳到了其它一些文件
- 调用这个快捷键可以返回到你正在一步一步地调试的地方

![Alt text](./38.gif)


### 39. 弹出版本控制操作项
```
Mac : ctrl + v
Windows / Linux : alt + `
```
该操作可以显示版本控制最频繁的操作选项。如果你的工程没在`git`或其他版本控制系统管理下，它至少给你一个`Android Studio`维护的本地历史。
![Alt text](./39.gif)

### 40. 分支比较（Git）
```
菜单 (for git): `VCS -> Git -> Compare With Branch`
查找 Action: `Compare With Branch`
```
假设你的工程在Git下，你可以将当前的文件或文件夹和别的分支比较。对于查看和你的主分支有多少不同时相当有用。
![Alt text](/40.gif)
