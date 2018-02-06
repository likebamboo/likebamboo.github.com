
1. 签出`git@github.com:likebamboo/likebamboo.github.com.git`项目

```
clone git@github.com:likebamboo/likebamboo.github.com.git
```

2. 切换到 `dev` 分支

```
git checkout -b dev origin/dev
```

3. 初始化项目

```
npm install --save
```

清理工程：

```
hexo clean
```

构建工程
```
hexo generate
```

启动工程
```
hexo server
```
