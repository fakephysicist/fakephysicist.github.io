# Hugo + DoIt 创建个人主页

在 wsl 环境下安装 Hugo 并且配置主题 DoIt.
<!--more-->

## Hugo

### 安装 {#Hugo-installation}

[Install Hugo](https://gohugo.io/installation/)

### 常用命令

- `hugo` 编译项目生成静态网站，默认位置在项目的 public 目录下
- `hugo server --disableFastRender -D` 预览网站内容
- `hugo new {folder}/{name}.md` 创建新文章，使用 markdown 进行排版，一般默认放在 posts 文件夹下；

基本没了，一般情况下用这三个命令就够了. 但是要注意, 需要在项目的根目录下执行这些命令.

## DoIt

### 安装 {#DoIt-installation}

项目主页 [DoIt](https://github.com/HEIGE-PCloud/DoIt)

文档说明 [DoIt Documentation](https://hugodoit.pages.dev/zh-cn/theme-documentation-basics/)

1. 创建你的项目, Hugo 提供了一个 `new` 命令来创建一个新的网站:

    ```bash
    hugo new site my_website
    cd my_website
    ```

2. 初始化你的项目目录为 git 仓库, 并且把主题仓库作为你的网站目录的子模块:

    ```bash
    git init
    git submodule add https://github.com/HEIGE-PCloud/DoIt.git themes/DoIt
    ```

3. 初始化项目：`git submodule update --init --recursive`，完成安装

4. 自动更新 submodule：`git submodule update --remote --merge`;

### 项目文件树结构

```bash
.
├── archetypes # markdown文章的模版
├── config.toml # 配置文件
├── content # 网站内容，主要保存文章
├── data # 生成网站可用的数据文件，可用在模版中
├── layouts # 生成网站时可用的模版
├── public # 通过hugo命令生成的静态文件，主要发布这个
├── resources # 通过hugo命令一起生成的资源文件，暂时不知道什么用
├── static # 静态文件，比如文章中的图片/视频文件、缩略图等
└── themes # 保存可用的hugo主题
```

通常，我们只会用到以下几个文件夹的东西

- `config.toml` ：保存 hugo 的配置，包括主题的配置等.详细设置见[这里](https://hugodoit.pages.dev/zh-cn/theme-documentation-basics/#site-configuration).
- `content` ：保存网站的各种内容，比如文章.
- `archetypes` ： 保存文章的 markdown 模版，通常包括文章的前缀注释，是一些在创建新文章时会被用到.
- `static` ：保存文章中用到的静态文件，比如图片、网站缩略图等.
- `public` ：通过 `hugo` 命令生成的静态 HTML, CSS, JS 等.在服务器上发布时主要发布这个文件夹.

## 开始写第一篇文章

### 生成新文章

生成新文章`hello-world`的命令：

```bash
hugo new posts/hello-world/index.md
```

执行完成后，在`./content/posts`目录下应该可以看到新文件，同时里面已经有 markdown 模版中的文章前缀参数.

也可以手动复制旧文章来生成新文章，不通过命令.

也可以在`content`文件夹下建新的文件夹，方便管理.这种情况下生成的静态 HTML 文件路由效果如下：

```bash
.
└── content
    └── about
    |   └── index.md  // <- https://example.com/about/
    ├── posts
    |   ├── firstpost.md   // <- https://example.com/posts/firstpost/
    |   ├── happy
    |   |   └── ness.md  // <- https://example.com/posts/happy/ness/
    |   └── secondpost.md  // <- https://example.com/posts/secondpost/
    └── quote
        ├── first.md       // <- https://example.com/quote/first/
        └── second.md      // <- https://example.com/quote/second/
```

### 本地调试

```bash
hugo server --disableFastRender
```

## GitHub Repository

两个 Repositories

- Repository 1: 一个用于托管博客项目源文件, 设置权限为 Private

- Repository 2: 一个用于托管博客编译后生成的静态文件, 设置权限为 Public

### Repository 1

设置为 `private` 权限等级，用于托管博客项目源文件. 别人看不到你的源代码.

#### 链接本地仓库与远端仓库

```bash
## 位于博客源代码根目录

## 初始化本地Git仓库
git init

## 添加名为 Origin 的远端Git仓库
git remote add origin {{这里替换成你的仓库在Github `git clone`用的地址}}

## 选择所有文件
git add -A

## Push到github
git push -u origin master
```

或者直接用 VSCode 链接本地仓库与远端 GitHub 仓库.

#### 创建.gitignore

在源代码项目中创建 `.gitignore` 文件，来防止把生成的静态文件上传

参考 [gitignore.io](https://gitignore.io/)

```bash
# Created by https://www.toptal.com/developers/gitignore/api/hugo
# Edit at https://www.toptal.com/developers/gitignore?templates=hugo

### Hugo ###
# Generated files by hugo
/public/
/resources/_gen/

# Executable may be added to repository
hugo.exe
hugo.darwin
hugo.linux

# End of https://www.toptal.com/developers/gitignore/api/hugo
```

### Repository 2

#### 创建仓库，注意名称

第二个仓库名字比较重要，必须是 `{{你的github用户名}}.github.io`. 比如我的 GitHub 名字为 `FakePhysicist`, 那么我需要创建的仓库名称为 `fakephysicist.github.io`. 同时注意要设置为 Public 权限等级.

#### 在仓库设置里设置启用 GitHub Pages

设置 `Branch` 为 `main`, 静态文件位置为`/(root)`, 原因是我们在下个步骤中会直接将生成的 `public` 文件夹中的内容 `push` 到 `main` 分支的 `/` 目录下.

## 手工发布

(更好, 不会有网页渲染问题. GitHub Actions 会有网页渲染问题)

**将**`hugo`**命令生成的**`public`**文件夹上传到 GitHub pages 项目下。**

1. 在 `my_website` 目录下执行 `git submodule update --init --recursive` 将子模块更新到最新状态.
2. 在 `config.toml` 中, 设置 `baseurl = https://<USERNAME>.github.io/`.
3. **确保 `public` 文件夹被删除.** 将 `<USERNAME>.github.io` repository 设置为一个 submodule, 并设置其在文件夹 `public` 中.

    ```bash
    git submodule add -f -b main https://github.com/FakePhysicist/fakephysicist.github.io.git public
    ```

4. 生成网页, 并将其推送到 repository 2.

    ```bash
    hugo
    cd public
    git add .
    git commit -m "Build website"
    git push origin main
    cd ..
    ```

5. Add, commit and push repository 1.

    ```bash
    git add .
    git commit -m "Initial commit"
    git push -u origin master
    ```

This can be done automatically by creating a bash script:

```bash
#!/bin/bash

# Ensure we exit on any error
set -e

# Function to check current directory is the root of the repository
check_root_dir() {
    if [ ! -d ".git" ]; then
        echo "Error: The script needs to be run from the root of the repository."
        exit 1
    fi
}

# Step 1: Update submodules
check_root_dir
git submodule update --init --recursive

# Step 2: Ensure public folder is deleted
if [ -d "public" ]; then
    rm -rf public
fi
# git submodule add -f -b main https://github.com/FakePhysicist/fakephysicist.github.io.git public

# Step 3: Generate the website and push it to the submodule repository
hugo
cd public
git add .
git commit -m "Build website"
git push origin main
cd ..
rm -rf public

Step 4: Add, commit and push the main repository
git add .
git commit -m "Update website content"
git push -u origin master

echo "Deployment completed successfully!"
```

## Tips

### 使用 Math shortcode

可以顺利使用 KaTeX 的 Math shortcode. [参考](https://hugodoit.pages.dev/zh-cn/theme-documentation-extended-shortcodes/#math)

这样可以省去使用转义字符`\`的麻烦. 不用出现`\\\\`, `\_`, `\*` 这样奇奇怪怪的东西. [参考](https://discourse.gohugo.io/t/how-to-render-math-equations-properly-with-katex/40998/4).

使用方法:

```bash
{{< math >}}
\begin{aligned}
\frac{1}{2} &= \frac{1}{2} \\
\end{aligned}
{{< /math >}}
```

### 评论系统 giscus

在 `config.toml` 中启用评论系统

具体配置参考 [giscus](https://giscus.app/zh-CN).

### 中文排版指南

[中文文案排版指北](https://github.com/mzlogin/chinese-copywriting-guidelines)

主要就是说:

- 中英文之间要有空格
- 中文与数字之间要有空格

