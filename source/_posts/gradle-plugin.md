---
date: 2018/03/01
thumbnailImagePosition: left
thumbnailImage: cyprus-3184019_640.jpg
coverImage: cyprus-3184019_640.jpg
title: "Gradle插件开发基础"
categories: [gradle]
tags: [gradle,插件]
---

Gradle插件将可重复使用的构建逻辑封装起来，可用于许多不同的项目和构建。 Gradle插件就相当于jar包，里面封装了一些共有的方法以及一些自定义的task等。
<!-- excerpt -->

### Gradle插件是什么

Gradle插件将可重复使用的构建逻辑封装起来，可用于许多不同的项目和构建。 Gradle插件就相当于jar包，里面封装了一些共有的方法以及一些自定义的`task`等。

### 如何开发Gradle插件

可以使用任何语言开发Gradle插件，只要最终生成字节码就行。一般常用的语言是`Groovy`、`Java`、`Kotlin`。

下面以`Groovy`语言为例(IDE使用`Intellij Idea`)，介绍Gradle插件开发的流程：

1, 首先需要创建一个工程，然后新建一个名为`my-plugin`的模块，模块类型选`Gradle`，语言选择`Groovy`（如果使用的是`Android studio`可以新建一个`Java`模块，然后将`main/java/`文件夹改名为`main/groovy`）
![Alt text](./1519961761561.png)

2, 修改`build.gradle`，增加对`gradle sdk` 和`groovy sdk`的依赖：
```gradle
// 导入groovy插件，用于编译groovy等
apply plugin: 'groovy'

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.12'
    // 依赖Gradle sdk，插件开发中需要用到gradle的api
    compile gradleApi()
    // 依赖groovy sdk
    compile localGroovy()
}
```

3, 准备工作做好后就可以开始编写插件了。在`groovy`目录下新建名为`MyPlugin`的类(**注意：`groovy`类文件的后缀是`groovy`**)
```groovy
package com.pptv.plugin

class MyPlugin implements Plugin<Project> {
    @Override
    void apply(Project project) {
        project.tasks.create("my-task")
    }
}
```
自定义插件必须实现`Plugin`接口，覆盖其`apply`方法，并在`apply`方法中完成该自定义插件的功能。上述代码中创建了一个名为`my-task`的`task`，但该`task`什么也不做。

4, 插件写好后，要想在其他项目或模块中使用该插件，需要先发布插件。

### 发布插件
1, 首先需要在插件模块的`resources`目录下新建`META-INF/gradle-plugins`目录，然后再在`gradle-plugins`目录下新建一个`properties`属性文件，文件名称可以任意，但最好与项目功能相关，因为之后会用到这个文件名。然后在该文件中输入：
```
implementation-class=com.pptv.plugin.MyPlugin
```
其中`implementation-class`属性的值就是刚才新建的`MyPlugin`类的类名(带包名)。

2, 在插件模块的`build.gradle`中新增`uploadArchives`节点，用于配置**发布插件**所需的信息：
```gradle
uploadArchives {
    repositories {
        // 以下用于将插件发布到本地
        flatDir {
            name "localRepository"
            dir "${getRootDir()}${File.separator}build"
        }
        // 以下可用于将插件发布到私有maven仓库
        maven {
            url "http://maven.pptv.com/repositories/"
            credentials {
                username "${props['MAVEN_REPO_USERNAME']}"
                password "${props['MAVEN_REPO_PASSWORD']}"
            }
        }

        // 以下也可用于将插件发布到私有maven仓库, 且可以配置的内容更多些
        // apply plugin: 'maven'
        // mavenDeployer {
        //     repository (url:"http://maven.pptv.com/repositories/"){
        //         authentication (userName:"${props['MAVEN_REPO_USERNAME']}", password:"${props['MAVEN_REPO_PASSWORD']}")
        //         pom.groupId =  "${GROUP_ID}"
        //         pom.artifactId = project.getName()
        //         pom.version =  "${VERSION_NAME}"
        //     }
        // }
    }
}
```
(完整的`build.gradle`见文章最后)
其中: 
- `flatDir`节点用于配置将插件发布到本地时，插件存放的目录(`dir`) 信息；
- `maven` 节点用于配置将插件发布到远端maven仓库，需配置远端仓库的`url`和账号信息(`credentials`)；
- 注释掉的`mavenDeployer`节点也可以用于将插件发布到maven仓库，但这个配置需要依赖maven插件(`apply plugin: 'maven'`)。 其中注释掉的代码中`${GROUP_ID}`和`${VERSION_NAME}`的定义如下：
```
        // group id
        def GROUP_ID = "com.pptv.plugin"
        // 版本
        def VERSION_NAME = "1.0.0"
        
        group "${GROUP_ID}"
        version "${VERSION_NAME}"
```
- 具体要将插件发布到本地还是远端，可以自己选择。

### 使用插件
插件开发完成后，要在其他项目或模块中使用，需要在其他项目的根`build.gradle`中加入如下配置：
```gradle
buildscript {
    repositories {
        // 本地库配置
        flatDir {
            name "localRepository"
            // 本地插件存放的路径
            dir "${getRootDir()}${File.separator}build"
        }
        // 远端库配置
        maven {
            url "http://maven.pptv.com/repositories/"
            credentials {
                username "${props['MAVEN_REPO_USERNAME']}"
                password "${props['MAVEN_REPO_PASSWORD']}"
            }
        }
    }
    dependencies {
        // 导入插件库， 格式为 -> group:module:version
        classpath "com.pptv.plugin:my-plugin:1.0.0"
    }
}

```
上述配置中：
- `flatDir`节点的配置同**发布插件**的配置，指明了插件在本地存放的位置信息；
- `maven`节点的配置同**发布插件**的配置，指明了远端仓库的`url`等信息；
- `dependencies`节点的`classpath`属性的取值格式是`group:插件module名称:插件版本号version`。

然后需要在使用插件的模块的`build.gradle`中添加:
```
apply plugin: 'my-plugin'
```
其中`my-plugin`为插件模块`resources/META-INF/gradle-plugins`下`properties`文件的文件名(该名称可以和插件模块的名称不相同)。

刷新下项目，在Gradle视图窗口中就可以看到自定义插件创建的 `my-task`了：
![Alt text](./1519962964535.png)

至此，一个简单的Gradle插件就开发完成了。

**插件模块完整 [build.gradle](./build.gradle)**

> 参考 ： [https://docs.gradle.org/current/userguide/userguide_single.html#custom_plugins](https://docs.gradle.org/current/userguide/userguide_single.html#custom_plugins)