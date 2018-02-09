---
date: 2017/08/08
thumbnailImagePosition: left
thumbnailImage: grey-seal-1969506_640.jpg
coverImage: grey-seal-1969506_640.jpg
title: "使用动态代理实现Wifi网络下模拟3g/4g"
categories: [android]
tags: [android,动态代理,hook]
---

本文将介绍如果让手机在wifi网络下(不插sim卡)模拟3g/4g网络，以方便调试应用。
<!-- excerpt -->

### 1. 背景

最近做的需求需要频繁使用3G/4G网络，可惜公司给的测试卡流量只有几百M，播几个视频流量就耗光了，测试起来非常不方便。于是就想没有什么工具或者软件可以在wifi环境下模拟3G/4G网络，在网上找半天，结果无功而返。

既然没有软件能做到，那只能从代码层面下手了。代码中判断当前手机网络类型的代码比较简单：
```java
public static boolean isMobileNetwork(Context context) {
    ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
    if (cm == null) {
        return false;
    }
    NetworkInfo info = cm.getActiveNetworkInfo();
	if (info == null || !info.isAvailable()) {
        return false;
    }
    return ConnectivityManager.TYPE_MOBILE == info.getType();
}
```
如果能让wifi环境下也返回是3G/4G网络就可以达到目的了，但是直接修改上述代码是不行的，因为判断当前是否是3G/4G网络的地方很多，一一修改比较耗时间，关键是项目中导入的很多SDK中也有网络类型的判断，SDK中的代码我们没法修改。

既然不能直接修改网络判断的代码，那能不能通过修改`ConnectivityManager`类（以下简称`CM`）的`getActiveNetworkInfo`方法的返回值，让wifi环境下`getActiveNetworkInfo`方法也返回3G/4G网络的`NetworkInfo`呢？

听起来有些似乎有点困难。让我们先看看源代码，一步一步分析。


### 2. 分析源码，寻找切入点

从源码看起来`CM`类使用了单例模式，其`getActiveNetworkInfo`方法实现如下：
```java
public NetworkInfo getActiveNetworkInfo() {
    try {
        return mService.getActiveNetworkInfo();
    } catch (RemoteException e) {
        throw e.rethrowFromSystemServer();
    }
}
```
其中`mService`对象是`IConnectivityManager`接口（以下简称`ICM`）的一个实例，这个接口是一个aidl接口，不属于Android SDK的一部分，[源码](http://androidxref.com/5.0.0_r2/xref/frameworks/base/core/java/android/net/IConnectivityManager.aidl)在framework中。如果能自己创建一个`ICM`对象替换调`CM`类中原本的`mService`属性，就可以实现修改`getActiveNetworkInfo`方法返回值的效果了。

### 3. 使用动态代理替换原有的`mService`对象

`ICM`对AndroidSDK不可见，我们不能直接创建一个类并实现了`ICM`接口。另外这个接口声明了50个左右的方法，即使能创建实现了`ICM`接口的实例，要重写这50个左右的方法也不那么容易。那有没有其他简便的方法创建`ICM`实例呢？有，使用动态代理。

关于什么是动态代理，动态代理可以做什么，可以参考[这篇文章](http://weishu.me/2016/01/28/understand-plugin-framework-proxy-hook/)，这里不再介绍（其实是技术太菜，说不清楚）。下面是使用动态代理替换`CM`中原有的`mService`属性的过程：

1. 使用反射获取原有的`mService`对象：
```java
// 先获取ConnectivityManager对象
ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
// 获取ConnectivityManager的mService对象
Field[] fs = ConnectivityManager.class.getDeclaredFields();
Object mService = null;
if (fs != null) {
    for (Field f : fs) {
        if ("mService".equals(f.getName())) {
            f.setAccessible(true);
            mService = f.get(cm);
        }
    }
}
```
2.  使用动态代理创建`ICM`对象，并修改 `getActiveNetworkInfo` 的返回值为自己准备好的`networkInfo`，其他方法仍然调用`mService`的相应方法。
```java
final Object mFinalService = mService;
// 使用动态代理创建 IConnectivityManager 的实例
Object mProxyService = Proxy.newProxyInstance(ConnectivityManager.class.getClassLoader(),
    // 需要实现的接口
    new Class[]{Class.forName("android.net.IConnectivityManager")},
    // 方法调用处理器
    new InvocationHandler() {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            // 拦截 getActiveNetworkInfo, 返回自己准备好的networkInfo
            if ("getActiveNetworkInfo".equals(method.getName())) {
                if (SettingsPreferences.getHookNetwork(context)) {
                    // 该networkInfo是自己手动创建的3g模式的NetworkInfo。
                    return networkInfo;
                }
            }
            // 不拦截其他方法，
            return method.invoke(mFinalService, args);
        }
    });
```

3.  将原来的`mService`对象替换为上一步中创建的`mProxyService`对象：
```java
// 将自己创建的代理对象`mProxyService`替换调原来的`mService`对象。
if (fs != null) {
    for (Field f : fs) {
        if ("mService".equals(f.getName())) {
            f.setAccessible(true);
            f.set(cm, mProxyService);
        }
    }
}
```

这样就完成了修改`getActiveNetworkInfo`方法的返回值的目标，同时还能控制什么情况下返回自己定义的`NetworkInfo` (上述代码中只有当`SettingsPreferences.getHookNetwork(context)`为true的情况下才返回自己创建的networkInfo，否则仍然返回系统原本的networkInfo)。

> 通过上述方式是不是能做到让代码中所有调用`getActiveNetworkInfo`方法的地方都返回自己创建的`NetworkInfo`呢？

实践中发现：`CM`类看起来使用了单例模式，但事实上，在Api level 19 及以上的系统使用不同的`context`调用`getSystemService`方法返回的是不同的`CM`对象。

也就是说在代码中调用 `getSystemService`方法时用的`context`和上述代码中`context`不一样，那么获取到的`NetworkInfo`对象仍然可能是系统本身的`NetworkInfo`而不是我们自己创建的`NetworkInfo`。


### 4. 替换`IConnectivityManager`对象的创建过程

既然直接替换`mService`属性不完全可行，那能不能尝试找到`mService`被创建的地方，然后替换掉`mService`的创建过程，让所有给`mService`赋值的地方都返回我们自己创建的`ICM`对象呢？

> 这个过程就好比现在小区内有好几家超市都在卖矿泉水，你想让这些超市都卖你自己生产的矿泉水，现在通过动态代理的方式你可以做到让其中一家超市卖你生产的矿泉水了。接下来你想让所有超市都卖你生产的矿泉水，如果能找到这些超市在哪家供应商进的货，然后通过某种方式，把供应商的货都替换为你生产的矿泉水那就ok了。

来看看`mService`是何时以及怎么被创建的。

首先，`CM`是通过`Context`对象的`getSystemService`方法获取的。我们看看`getSystemService`方法是怎么实现的(`Context`的实现在`ContextImpl`里面)：
```java
public Object getSystemService(String name) {
    ServiceFetcher<?> fetcher = SYSTEM_SERVICE_FETCHERS.get(name);
    return fetcher != null ? fetcher.getService(ctx) : null;
}
```
从上面的代码可以看出来，所有的service对象都保存在一张map(`SYSTEM_SERVICE_FETCHERS`)中，该map的初始化过程如下：
```java
registerService(Context.CONNECTIVITY_SERVICE, ConnectivityManager.class,
    new StaticApplicationContextServiceFetcher<ConnectivityManager>() {
        @Override
        public ConnectivityManager createService(Context context) {
            IBinder b = ServiceManager.getService(Context.CONNECTIVITY_SERVICE);
            IConnectivityManager service = IConnectivityManager.Stub.asInterface(b);
            return new ConnectivityManager(context, service);
        }});
```
从上述代码看来，`ICM`的创建依赖于`ServiceManager.getService`方法返回的`IBinder`对象，使用这个`IBinder`对象再调用`IConnectivityManager.Stub`类的静态方法`asInterface`就可以将其转为本地接口`ICM`对象（这也使用`Binder`进行跨进程方法调用的基本流程）:
```java
public static android.net.IConnectivityManager asInterface(android.os.IBinder obj) {
    if ((obj == null)) {
        return null; 
    }
    android.os.IInterface iin = obj.queryLocalInterface(DESCRIPTOR);
    if (((iin != null) && (iin instanceof android.net.IConnectivityManager))) {
        return ((android.net.IConnectivityManager) iin);
    }
    return new android.net.IConnectivityManager.Stub.Proxy(obj);
}
```

> 总结一下： `CM`的`getActiveNetworkInfo`方法直接调用了其成员变量`mService`的`getActiveNetworkInfo`方法，而`mService`是一个`ICM`的实例，它是在`CM`对象创建时被赋值的(构造函数中)。`CM`对象的创建位于`ContextImpl`类中，其创建时会首先调用`ServiceManager.getService`方法获取到一个`IBinder`对象，并通过`IConnectivityManager.Stub`的静态方法`asInterface`将这个`IBinder`对象转为`ICM`对象，最终以这个`ICM`对象作为参数创建了`CM`对象。

找到`CM`以及`ICM`创建的地方后，目标就很明确了：只要自己创建一个`IBinder`对象替换掉`ServiceManager.getService`方法返回的`IBinder`对象，然后修改这个`IBinder`的`queryLocalInterface`方法让它始终返回同一个`ICM`对象就可以了。

要想替换掉`ServiceManager.getService`的返回值，我们先看看这个方法的代码：
```java 
public static IBinder getService(String name) {
    try {
        IBinder service = sCache.get(name);
        if (service != null) {
            return service;
        } else {
            return getIServiceManager().getService(name);
        }
    } catch (RemoteException e) {
        Log.e(TAG, "error in getService", e);
    }
    return null;
}
```
上述代码中， `sCache`是`ServiceManager`的一个静态成员变量（`Map`类型），我们可以自己创建一个`IBinder`对象（跟之前一样，使用动态代理创建），然后通过`Map`的`put`方法将`sCache`里面的内容替换，从而达到瞒天过海的目的:
```java
// 首先获取ServiceManager class
Class<?> serviceManager = Class.forName("android.os.ServiceManager");
Method getService = serviceManager.getDeclaredMethod("getService", String.class);
// 调用ServiceManag的"getService"方法获取原始的 IBinder 对象
final IBinder rawBinder = (IBinder) getService.invoke(null, Context.CONNECTIVITY_SERVICE);
// 使用动态代理伪造一个新的 IBinder对象
IBinder hookedBinder = (IBinder) newProxyInstance(serviceManager.getClassLoader(),
        new Class<?>[] {IBinder.class}, new InvocationHandler()
        {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable
            {
                // ....
            }
        });
// 把伪造的 IBinder 对象放进ServiceManager的cache里面
Field cacheField = serviceManager.getDeclaredField("sCache");
cacheField.setAccessible(true);
@SuppressWarnings("unchecked")
Map<String, IBinder> cache = (Map<String, IBinder>) cacheField.get(null);
cache.put(Context.CONNECTIVITY_SERVICE, hookedBinder);
```

替换掉`ServiceManager.getService`的返回值以后，接着我们需要修改我们刚刚创建的`IBinder`对象的`queryLocalInterface`方法，让它始终返回同一个`ICM`对象：
```java
new InvocationHandler() {
    private Object mIConnectivityManager = null;
    /**
     * 获取原本的IConnectivityManager对象
     */
    private Object getBaseManager(@NonNull IBinder binder, Class<?> stubCls) {
        try {
            Method asInterfaceMethod = stubCls.getDeclaredMethod("asInterface", IBinder.class);
            return asInterfaceMethod.invoke(null, binder);
        } catch (Exception e) {
            LogUtils.error("wentaoli hook => createIConnectivityManager error: " + e, e);
        }
        return null;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if (!"queryLocalInterface".equals(method.getName())) {
            return method.invoke(baseBinder, args);
        }
        if (mIConnectivityManager != null) {
            return mIConnectivityManager;
        }

        // 替换掉 queryLocalInterface 方法的返回值
        Object base = getBaseManager(baseBinder, Class.forName("android.net.IConnectivityManager$Stub"));
        mIConnectivityManager = Proxy.newProxyInstance(proxy.getClass().getClassLoader(),
                // asInterface 的时候会检测是否是特定类型的接口然后进行强制转换, 因此这里的动态代理生成的类型信息的类型必须是正确的
                new Class[]{IInterface.class, Class.forName("android.net.IConnectivityManager")},
                new BinderHookHandler(context, base));
        return mIConnectivityManager;
    }
}
```

```java
private static class BinderHookHandler implements InvocationHandler {
    Context context;
    // 原始的IConnectivityManager对象 (也是IInterface)
    Object base;
    BinderHookHandler(Context context, Object base) {
        this.context = context.getApplicationContext();
        this.base = base;
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if ("getActiveNetworkInfo".equals(method.getName())) {
            if (SettingsPreferences.getHookNetwork(context)) {
                return networkInfo;
            }
        }
        return method.invoke(base, args);
    }
}
```

大功告成。

### 5. 模拟发送网络变化广播

经过上面操作，已经可以做到在wifi环境下模拟移动网络了，但还有一些可以完善的地方，比如说网络的切换。

考虑如下情况：当在应用中通过手动点击某个按钮将上述`SettingsPreferences.getHookNetwork(context)`的值从`false`变为`true`，这时候`getActiveNetworkInfo`方法返回的`NetworkInfo`就从原来的wifi变成了自定义的3g/4g网络，这事实上就相当于发生了一次网络状态的变化。按照正常的流程，如果手机发生网络状态变化系统会发送相应的广播，同时app中动态或者静态注册的广播接收器会收到相应的广播。但是现在我们只是模拟网络变化，系统自然不会帮忙发送网络状态变化广播，那怎么去模拟这个过程呢？

网络状态变化广播是一个敏感的广播，需要系统级权限才能发送，普通应用是不允许发送的。既然不能直接发送这个广播，那能不能通过获取到当前应用中所注册的广播接收器，然后直接调用这些广播接收器的`onReceive`方法来模拟广播接收过程呢？让我们来分析下。

首先来看静态注册的广播接收器。

#### 5.1.  静态注册的广播接收器

要获取当前app中的注册了哪些静态广播接收器是比较简单的，就跟获取app中声明了哪些`Activity`是一样的逻辑：
```java
Intent i = new Intent(ConnectivityManager.CONNECTIVITY_ACTION);
i.setPackage(context.getPackageName());
List<ResolveInfo> list = context.getPackageManager().queryBroadcastReceivers(i, PackageManager.MATCH_ALL);     
```
通过上述代码拿到能接收网络状态变化的静态广播接收器后（当然并不是`BroadcastReceiver`实例对象，仅仅是一些`BroadcastReceiver`描述信息），只需遍历这些接收器信息，然后通过`Class.newInstance`方法创建相应的`BroadcastReceiver`实例，再调用其`onReceive`方法就行了，代码如下：
```java
for (ResolveInfo resolveInfo : list) {
    try {
        Class<?> clazz = Class.forName(resolveInfo.activityInfo.name);
        BroadcastReceiver receiver = (BroadcastReceiver) clazz.newInstance();
        receiver.onReceive(context, intent);
    } catch (Exception e) {
        LogUtils.error("wentaoli hook static receiver error " + e, e);
    }
}
```
这样就完成了模拟静态注册的广播接收器收到广播的场景。

下面再看动态注册的广播接收器

#### 5.2.  动态注册的广播接收器

要获得应用中所有动态注册的广播接收器并不容易。通过对广播注册与接收的源代码的分析得知(关于广播的注册接收过程可以参考[这篇博客](http://weishu.me/2016/04/12/understand-plugin-framework-receiver/))，广播的接收过程最终会走到`LoadedApk`的一个内部类 `ReceiverDispatcher`的`performReceive`方法中，而`LoadedApk`的一个成员变量`mReceivers`则保存了当前app中所有动态注册的广播接收器：
```java
private final HashMap<Context, HashMap<BroadcastReceiver, LoadedApk.ReceiverDispatcher>> mReceivers = new HashMap<Context, HashMap<BroadcastReceiver, LoadedApk.ReceiverDispatcher>>();
```
只要能拿到`LoadedApk`实例的`mReceviers`属性值，则可以获取到所有动态注册的广播。要获取`LoadedApk`的`mReceivers`属性值，首先得拿到`LoadedApk`的实例。事实上，`ActivityThread` 的`mPackages`属性就持有`LoadedApk`的实例(看过四大组件启动流程源代码的同学应该对`ActivityThread`类很熟悉)，接着获取`LoadedApk`以及`LoadedApk`的`mReceivers`属性就都不是问题了：
```java
// 先获取到当前应用的ActivityThread对象
Class<?> activityThreadClass = Class.forName("android.app.ActivityThread");
Method currentActivityThreadMethod = activityThreadClass.getDeclaredMethod("currentActivityThread");
currentActivityThreadMethod.setAccessible(true);
Object currentActivityThread = currentActivityThreadMethod.invoke(null);
// 获取mPackages属性
Field f = activityThreadClass.getDeclaredField("mPackages");
f.setAccessible(true);
Map map = (Map) f.get(currentActivityThread);
// 获取LoadedApk实例
Object loadedApkRef = map.get(context.getPackageName());
if (loadedApkRef instanceof WeakReference) {
     Object loadedApk = ((WeakReference) loadedApkRef).get();
     // 获取LoadedApk实例的mReceivers属性值
     field = loadedApk.getClass().getDeclaredField("mReceivers");
     field.setAccessible(true);
     Map mReceiversMap = (Map) field.get(loadedApk);
     // 通过mReceivers属性获取所有动态注册的广播
     ....
 }
```
在获取到所有动态注册的广播接收器后，只要知道哪些广播接收器可以接收网络状态变化广播，然后再直接调用这些广播接收器的`onReceive`方法就好了。但事实上这并不容易，具体怎么判断哪些广播接收器可以接收网络状态变化广播，就不再说明了（其实是懒），有兴趣的可以到[这里](https://gist.github.com/likebamboo/83b51fa9446c9ac04131c5798094973e)查看代码。

到此为止就完成了对发送网络状态变化广播的模拟，也就完成了Wifi下模拟3g/4g网络的整个流程的模拟。


### 6. 其他

1. 关于动态代理：
动态代理是`AOP`的基础。像 [DroidPlugin](https://github.com/DroidPluginTeam/DroidPlugin) 之类插件框架以动态代理作为基础的。

2. 关于兼容性：
文中的代码中使用了较多的反射调用以及系统隐藏的api，由于公司没有那么多手机，没有测试代码的兼容性。



###  参考文章：
> http://weishu.me/2016/04/12/understand-plugin-framework-receiver/
> http://weishu.me/2016/01/28/understand-plugin-framework-proxy-hook/
> http://blog.csdn.net/u013263323/article/details/76014494
> http://blog.csdn.net/Luoshengyang/article/details/6744448