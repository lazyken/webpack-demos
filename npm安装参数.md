## 1、npm install moduleName

安装模块到目录下

## 2、npm install moduleName -g

-g 的意思是将模块安装到全局，具体安装到磁盘到那个位置，要看 npm config prefix 的位置

## 3、 --save/--save-dev

```
npm install module-name --save
```

自动把模块和版本号添加到 dependencies 部分

```
npm install module-name --save-d
```

自动把模块和版本号添加到 `devDependencies`部分

## 4、 -S

即 `--save` （保存）
包名会被注册在 `package.json` 的 `dependencies` 里面，在生产环境下这个包的依赖依然存在
`npm install -S`就是`npm install -save`安装到生产环境，如`vue`，`react`包等

## 5、 -D

即 `--save-dev`(生产)
包名会被注册在 `package.json` 到 `devDependencies` 里面，仅在开发环境下存在到包用`-D`，如 `babel`，`sass-loader` 这些解析器
`npm install -D` 就是 `npm install --save-dev` 安装到开发环境。例如 `gulp`，`babel`，`webpack` 一般都是辅助工具

## 6、啥也不写

包名不会进入 `package.json` 里面，因此别人不知道你安装了这个包

## npm i 与 npm install -S/-D 的区别

`npm i module_name -S` => `npm install module_name --save` 写入到 `dependencies` 对象
`npm i module_name -D` => `npm install module_name --save-dev` 写入到 `devDependencies` 对象
`npm i module_name -g` 全局安装

`i` 是`install`的缩写
`-S` 是 `--save` 的缩写
`-D` 是 `--save-dev` 的缩写

`devDependencies` 里面的插件只用于开发环境，不用于生产环境，而 `dependencies`是需要发布到生产环境到。
