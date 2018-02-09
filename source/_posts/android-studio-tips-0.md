---
date: 2015/09/29 12:00:00
thumbnailImagePosition: left
thumbnailImage: nature-3126513_640.jpg
coverImage: nature-3126513_640.jpg
title: "【译】Android Studio 使用技巧系列-快捷键跳转"
categories: [android]
tags: [androidstuido]
---

在这个系列教程中，我们将学习到每个开发者都应该知道的最基本的开发技巧以及`Android Studio`中更多高级的技能。
<!-- excerpt -->
> 原文: [http://www.developerphil.com/android-studio-tips-tricks-moving-around/](http://www.developerphil.com/android-studio-tips-tricks-moving-around/)

你应该知道的关于我的两件事： 
1. 我是一个 IDE 狂热者 
2. 我是一个高效极客 

两年前，当我转向`Intellij IDEA`，`Android Studio`基于它，为了更高效的开发，我花费了大量的时间去寻找快捷键以及使用技巧。当你看到这篇文章，我相信你也做了很多同样的事情，所以我努力让它更容易而且更方便一些。

在这个系列教程中，我们将学习到每个开发者都应该知道的最基本的开发技巧以及`Android Studio`中更多高级的技能。

### 关于键位映射 
`Android Studio` 提供了不同的键位映射（即快捷键和它对应的操作之间的映射），你可以在 `Settings->Keymap` 菜单里面查看当前所使用的键位映射。 
单纯列出每个键位映射是不切实际的，因此将会使用下面的：
> Windows: 默认 
> Linux: 默认 
> OSX: Mac OSX 10.5+(不是默认的一个，强烈建议使用Jetbrains)

### 来回跳转
我们花费了大量的时间在代码跳转上，让我们尝试提高它的效率。

### 1. 打开类/ 文件/ 标记
#### 1.1 打开类 
```
Mac :  cmd + o
Windows / Linux : ctrl + n
```
假设你要切换到名为`MainActivity.java`的类，就可以使用该快捷键然后输入`Main`就可以了。
>  **译者注：**  Eclipse 中打开类的快捷键是 `ctrl + shift + t`

#### 1.2 打开文件
```
Mac :  cmd + shift + o
Windows / Linux : ctrl + shift + n
```
和打开类相似，但是该快捷键可以打开工程目录下的任意文件。这可以快速帮你打开如`AndroidManifest.xml`或`res`和`assets`目录下的文件
>  **译者注：**  Eclipse 中打开任意文件的快捷键是 `ctrl + shift + r`

#### 1.3 打开标记
```
Mac :  cmd + alt + o
Windows / Linux : alt + shift + n
```
功能强大但没有前面的两个快捷键出名：你可以通过搜索方法或变量名称直接跳转。 
例如，你知道工程中的某个地方有个名为`getFormattedDate()`的方法，你可以使用这个快捷键直接找到它。

**技巧：**
> **部分匹配：** 如果你有一个类叫`ItemDetailFragment`，你可以在搜索的时候直接输入`IDF`就可以查找到的
> **行号：** 假设你有一个同事刚刚告诉你`XXX`在`ExcitingClass`的第`23`行，可以在打开类快捷键上中加上`ExcitingClass:23`或者`EC:23`可以快速跳转到指定行号


### 2. 最近使用文件
####  2.1 最近打开文件
```
Mac :  cmd + e
Windows / Linux : ctrl + e
```
该快捷键将弹出一个最近打开文件的对话框

####  2.2 最近打开文件
```
Mac :  cmd + shift + e 
Windows / Linux : ctrl + shift + e 
```
和上面功能类似，但列出的仅仅是被修改过的文件。
>  **译者注：**  Eclipse 中貌似没有列出最近使用的文件的功能， `ctrl + e` 快捷键用于列表当前编辑窗口中打开的文件。

**技巧：**
>  输入字符可以进行列表过滤

### 3.  前进或后退
```
Mac :  cmd + alt + left/right
Windows / Linux : ctrl + alt + left/right
```
想要更好地理解这个快捷键，你应该想想`web`浏览器上前进和后退是怎样工作的。现在不是在`web`页面上，而是源代码中！因此当你跳转到一行代码或打开一个新的文件时，IDE将会记住你之前的位置，并且可以快速返回。
>  **译者注：**  Eclipse 中前进或后退的快捷键是  `alt + left/right` .


### 4.   最近编辑位置
```
Mac :  cmd + shift + backspace 
Windows / Linux : ctrl + shift + backspace
```
这个是上面的快捷键一个衍生，它可以在上次修改代码位置之间进行跳转。 
想像你正在修改一个让人讨厌的bug。你觉得你可以解决它并且开始修复它，但当你意识到在你的工程中你不得不去看`android`源代码和其它类的时候，你进入其它类的一个功能，然后又跳到其它文件中20步以后，你终于完成了你的修复，但你刚才正在编辑的是哪一行？只要使用这个快捷键你就可以正确地返回。

### 5. 显示引用
####  5.1 在固定面板上(Android Studio  左下方，译者注)显示引用
```
Mac :  alt + f7
Windows / Linux : alt + f7
```
该快捷键可以显示被引用地方。对于一个类变量来说，会显示变量使用和赋值的地方。对于一个类方法来说，会显示方法被调用的地方。对于一个类来说，会显示创建实例的地方。
你可以使用箭头键和返回键在显示结果中查看。然后可以使用`Esc`返回到编辑窗口。
>  **译者注：**  Eclipse 中显示引用的快捷键是  `ctrl + shift + g` .

####  5.2 在弹窗上显示引用
```
Mac :  cmd + alt + f7
Windows / Linux : ctrl + alt + f7
```
和上面作用一样，显示在弹出框中。

### 6. 跳转到声明/实现(快速滚动)
这里有三个关于符号的快捷键

####  6.1 跳转到声明
```
Mac : cmd + b  或者 cmd + click
Windows / Linux : ctrl + b  或者 ctrl + click
```
跳到类、方法或变量声明的地方。跳到类和方法的实现上是很有用的.
>  **译者注：**  Eclipse 中跳转到声明的快捷键是  `f3` 或者 `ctrl + click` .

####  6.2 跳转到实现
```
Mac : cmd + alt + b
Windows / Linux : ctrl + alt + b
```
显示所有类/接口的实现类/接口。对于方法也适用，会显示重写的方法。对于变量，会跳转到声明

####  6.3 跳转到类型声明
```
Mac : cmd + shift + b
Windows / Linux : ctrl + shift + b
```
当光标在一个变量上，它会跳到变量类型的声明处。例如，下面一行代码： 
```
Developer phil = new Developer("Phil"); 
```
如果光标在`phil`变量上，按下快捷键会跳到`Developer`类的声明处。


### 7.  跳转到父类
```
Mac : cmd + u
Windows / Linux : ctrl + u
```
这个快捷键会打开当前选中的父类，和跳转到实现的功能想相反。如果光标在一个重写的方法是，将会直接跳转的父类的方法。如果光标在一个类中但在方法之外或光标在类名上，那么它会打开父类。
快速跳转到类、变量或者方法的声明。主要用在类和方法