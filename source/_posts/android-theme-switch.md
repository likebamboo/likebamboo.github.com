---
date: 2016/05/22
thumbnailImagePosition: left
thumbnailImage: nature-3106213_640.jpg
coverImage: nature-3106213_640.jpg
title: "Android 主题切换实现方案探索"
categories: [android]
tags: [android,主题切换]
---

本文将探索Android APP主题切换功能的各种实现方案，并通过实例总结出各个方案的优缺点以及适应场景。
<!-- excerpt -->

### 0x00 背景
很多应用都有更换主题的需求：新闻、阅读类应用通常需要支持白天、夜间模式切换，以便在不同时间都能提供良好的阅读体验；电商类应用需要在节假日、促销活动期间提供相应的主题以烘托活动气氛；社交娱乐类应用需要支持用户自行设置主题以满足用户个性化需要。本文将探索Android APP主题切换功能的各种实现方案，并结合聚力视频APP主题切换功能的实现过程，总结各个方案的优缺点以及适应场景。

### 0x01 使用App内置style实现主题更换
Android 原生支持通过`setTheme`方法为任一界面单独设置主题样式。要通过这种方式实现多主题，首先需要为那些支持主题切换的元素（控件）定义相应的属性。然后在不同的主题`style`中为这些属性赋不同的值。接下来在布局文件中通过`?attr/**`的形式设置控件的属性值。最终在`Activity`中通过`setTheme`方法（该方法需要在`setContentView`方法之前调用）为当前界面设置主题。

当更换主题时可以`finish`当前界面，然后改变主题使用的`style`的值，并重新启动当前界面，这时候就可以完成主题替换。

改变主题时重启当前界面对用户来说不是一个好的体验，可以通过记录当前界面需要支持主题切换的控件，在切换主题时直接为这些控件设置新的属性值来规避这个问题。

图1-1是一个示例程序的运行效果：

![图1-1](http://120.24.93.248/images/pptv/theme-switch-style.gif)


> 示例程序源码： [https://github.com/likebamboo/ThemeSwitch/tree/style](https://github.com/likebamboo/ThemeSwitch/tree/style)

通过App内置的多个style实现主题切换小结：

| 优点 | 简单，容易实现；Android 原生支持 |
|:----- |:------ |
| 缺点   | 主题资源只能内置，不能动态增删主题，增加了安装包的大小；必须由用户主动切换主题 |
| 适用场景 | 白天模式、夜间模式切换 |
| 典型APP | 网易新闻、QQ浏览器、哔哩哔哩动画 |

### 0x02 通过普通zip主题包实现主题切换
通过加载不同的zip主题包实现主题切换，首先需要将配置文件、资源文件打包压缩为zip主题包。然后在APP中内置或在适当的时候下载该主题包。在切换主题的时候通过解析配置文件加载zip包中的资源，实时为相应控件设置新的属性值。这样便可以实现主题切换。

需要注意的是，如果主题包比较大，解析、加载其中的资源文件将会是一个耗时的过程，有必要放在一个独立的线程中。另外，可能需要为不同分辨率的设备提供不同尺寸的主题包，防止低分辨率的手机在加载主题资源时出现内存溢出（`OOM`）的问题。

图2-1是一个示例程序的运行效果：

![图2-1](http://120.24.93.248/images/pptv/theme-switch-zip.gif)


> 示例程序源码： [https://github.com/likebamboo/ThemeSwitch/tree/zip](https://github.com/likebamboo/ThemeSwitch/tree/zip)

通过普通zip主题包实现主题切换小结：

| 优点  | 可扩展行高，支持主题包动态下载并由后端控制主题切换时机 |
|:----- |:------- |
| 缺点   | 需要自己解析zip包中的资源文件；针对不同手机分辨率可能需要多个zip主题包 |
| 适用场景 | 少量控件的颜色或图标切换 |
| 典型APP | 暂时未发现 |

### 0x03 动态加载apk主题包实现主题切换
方案2虽然可以实现动态的主题切换，也方便制作多套主题。但是，需要在程序中自己实现查找、解析资源的过程，切换主题耗时比较长。

如果可以像使用APP内部资源一样直接通过资源id或描述符使用主题包资源，就省去了查找、解析资源的过程。调研发现，Android的资源查找、管理离不开`AssetManager`和`Resources`这两个类，APP资源的管理实际是由这两个类实现的。其中`Resources`类可以根据id来查找资源，`AssetManager`类根据文件名来查找资源。如图3-1

![图3-1 来源于：http://blog.csdn.net/beyond702/article/details/49228115](http://120.24.93.248/images/pptv/theme-switch-resources.png)


而`AssetManager`恰巧可以通过`addAssetPath`方法实现对非APP内部的其他资源的管理。
因此，为了实现使用id或资源描述符来查找主题包中的资源，我们需要将主题资源编译打包成一个apk文件。然后，创建一个独立的`AssetManager`和`Resources`对象用于管理主题包中的资源。代码如图3-2

![图3-2](http://120.24.93.248/images/pptv/theme-switch-get-resources.png)


需要注意的是，`addAssetPath`方法是Android隐藏的API，所以需要通过反射的方式调用。另外主题包中的资源id和APP内部的资源id不可能完全一样，所以使用APP内部的资源id去主题apk包中查找资源会出现找不到或找不准的情况，这时候可以通过APP内部的资源名去主题包中查找对应的资源。

有了管理主题资源的`Resources`对象，在切换主题时，只要通过`Resources`对象从apk主题包中获取主题资源，并为对应的支持主题切换的控件设置相应的属性值即可。

图3-3是一个示例程序的运行效果：

![图3-3](http://120.24.93.248/images/pptv/theme-switch-apk.gif)


> 示例程序源码： [https://github.com/likebamboo/ThemeSwitch/tree/apk](https://github.com/likebamboo/ThemeSwitch/tree/apk)

通过apk主题包实现主题切换小结：

| 优点 | 针对不同手机分辨率可以加载最合适的皮肤资源，无需多个主题包；支持主题包动态下载并由后端控制主题切换时机 |
|:----- | :------- |
| 缺点   | 实现起来相对困难，容易出错；主题包太大时会对程序性能有一定影响 |
| 适用场景 | 少量控件的颜色或图标切换 |
| 典型APP | 聚力视频、爱奇艺 |

### 0x04 总结
以上就是主题切换功能常见的几种实现方案，聚力视频APP目前采用最后一种。也许还有其他的实现方案。但这些实现方案中很难说哪种最好，毕竟就技术而言，常常只有最适合的方案，而没有最好的方案。

> 参考文章 :
> [https://blog.stylingandroid.com/prism-fundamentals-part-1/](https://blog.stylingandroid.com/prism-fundamentals-part-1/)
