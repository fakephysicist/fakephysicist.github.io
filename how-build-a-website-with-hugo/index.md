# Hugo + DoIt 创建个人主页

在 wsl 环境下安装 Hugo 并且配置主题 DoIt.
<!--more-->

## Hugo

### 安装
[Install Hugo](https://gohugo.io/installation/)

### 常用命令

- `hugo` 编译项目生成静态网站，默认位置在项目的 public 目录下
- `hugo server --disableFastRender -D` 预览网站内容
- `hugo new {folder}/{name}.md` 创建新文章，使用 markdown 进行排版，一般默认放在 posts 文件夹下；

基本没了，一般情况下用这三个命令就够了.

## DoIt

### 安装

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

- `config.toml` ：保存 hugo 的配置，包括主题的配置等.详细设置见下方 #网站配置
- `content` ：保存网站的各种内容，比如文章.
- `archetypes` ： 保存文章的 markdown 模版，通常包括文章的前缀注释，是一些在创建新文章时会被用到.
- `static` ：保存文章中用到的静态文件，比如图片、网站缩略图等.
- `public` ：通过hugo命令生成的静态 html 文件、css、js 等.在服务器上发布时主要发布这个文件夹.

## 开始写第一篇文章

### 生成新文章

生成新文章`hello-world`的命令：

```bash
hugo new posts/hello-world/index.md
```

执行完成后，在`./content/posts`目录下应该可以看到新文件，同时里面已经有 markdown 模版中的文章前缀参数.

也可以手动复制旧文章来生成新文章，不通过命令.

也可以在`content`文件夹下建新的文件夹，方便管理.这种情况下生成的静态 Html 文件路由效果如下：

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

## Github SSH

### Generating a new SSH key

1. Open Terminal.
2. Paste the text below, substituting in your GitHub email address. This creates a new ssh key, using the provided email as a label. 

    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```

### Adding your SSH key to the ssh-agent

1. Start the ssh-agent in the background.

    ```bash
    eval "$(ssh-agent -s)"
    ```

2. Add your SSH private key to the ssh-agent. If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_ed25519 in the command with the name of your private key file.

    ```bash
    ssh-add ~/.ssh/id_ed25519
    ```

### Test SSH connection

```bash
ssh -T git@github.com
```

### Adding a new SSH key to your GitHub account

[网页操作, 很容易](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

## Github Repository

两个仓库：

- 一个用于托管博客项目源文件, 设置权限为 Private（私有）

- 一个用于托管博客编译后生成的静态文件, 设置权限为 Public（公开）

### 第一个仓库

设置为private权限等级，没人看得见

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

或者直接用 VSCode 链接本地仓库与远端 Github 仓库.

#### 创建.gitignore

在源代码项目中创建.gitignore文件，来防止把生成的静态文件上传

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

### 第二个仓库

#### 创建仓库，注意名称

第二个仓库名字比较重要，必须是 `{{你的github用户名}}.github.io`. 比如我的 Github 名字为 `FakePhysicist`, 那么我需要创建的仓库名称为 `fakephysicist.github.io`. 同时注意要设置为 Public 权限等级.

#### 在仓库设置里设置启用Github Pages

设置 `Branch` 为 `main`, 静态文件位置为`/(root)`, 原因是我们在下个步骤中会直接将生成的 `public` 文件夹中的内容 `push` 到 `main` 分支的 `/` 目录下.

## 手工发布

**将**`hugo`**命令生成的**`public`**文件夹上传到 GitHub pages 项目下。**

1. 在 `my_website` 目录下执行 `git submodule update --init --recursive` 将子模块更新到最新状态；
2. In your `config.toml` file, set `baseurl = https://<USERNAME>.github.io/`, where `<USERNAME>` is your Github username.
3. set your `<USERNAME>.github.io` repository into a submodule, in the folder named `public`. Still, replacing `<USERNAME>` with your Github username:

    ```bash
    git submodule add -f -b master https://github.com/<USERNAME>/<USERNAME>.github.io.git public
    ```

4. Add everything to your local git repository and push it up to your remote repository on GitHub:

    ```bash
    git add .
    git commit -m "Initial commit"
    git push -u origin master
    ```

5. regenerate your website’s HTML code by running Hugo and uploading the public submodule to GitHub:

    ```bash
    hugo
    cd public
    git add .
    git commit -m "Build website"
    git push origin main
    cd ..
    ```

## 通过 Github Action 发布

### 创建 CI 脚本

在源代码项目根目录下新建`.github/workflow/main.yml`.(通过 Github Action 网页端操作也可以)

`main.yml`脚本内容：

```YAML
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the action will run.
on:
  # Triggers the workflow on push or pull request events but only for the master branch
  push:
    branches: [master]
  pull_request:
    branches: [master]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v3
        with:
          submodules: true # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0 # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        # You may pin to the exact commit or the version.
        uses: peaceiris/actions-hugo@v2
        with:
          # The Hugo version to download (if necessary) and use. Example: 0.58.2
          hugo-version: latest # optional, default is latest
          # Download (if necessary) and use Hugo extended version. Example: true
          extended: true # optional, default is false

      - name: Build
        run: hugo --minify

      - name: Pushes to another repository
        uses: cpina/github-action-push-to-another-repository@main
        env:
          API_TOKEN_GITHUB: ${{ secrets.API_TOKEN_GITHUB }}
        with:
          target-branch: "main"
          source-directory: "public"
          destination-github-username: "这里输入你的Github用户名"
          destination-repository-name: "这里输入你的Github用户名.github.io"
          user-email: 这里输入你的 Github no-reply 邮箱
```

### 设置 Push 用的密钥

为了让 Github Action 脚本有权限将代码 Push 到我们的 `xx.github.io` 仓库，我们需要申请一个密钥并告诉它.在 Github 设置中找到 `Developer settings/Personal access tokens`

新建一个密钥，权限设置把 `Repo` 打勾. 复制密钥.

回到第一个仓库的设置里，选择`Secrets`

新建密钥，将刚才生成的密钥填进去，名字设为 `API_TOKEN_GITHUB` (跟 CI 脚本里的名称对应即可)

