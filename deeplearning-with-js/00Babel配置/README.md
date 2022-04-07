# 安装使用 babel

## 安装依赖

```
npm install --save-dev @babel/core @babel/cli
```

## 添加配置文档

```
npm install @babel/preset-env --save-dev
```

修改文件（`babel.config.json`）内容

```
{
"presets": ["@babel/preset-env"]
}
```

## 使用

这里要求先用 babel 将代码转移为 node 下代码，为了使用 ES+，需要安装 `babel-node`

```
npm install -D @babel/node
```

修改 `package.json`

```diff
  {
    "name": "my-project",
    "version": "1.0.0",
+   "scripts": {
+     "start": "babel-node"
+   },
    "devDependencies": {
      "@babel/cli": "^7.0.0"
    }
  }
```

启动项目，path 为需要执行的文件路径

```
npm run start -- <path>
```
