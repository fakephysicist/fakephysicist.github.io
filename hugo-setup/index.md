# Hugo+DoIt 创建个人主页

在 wsl 环境下安装 Go, Hugo 并且配置主题 DoIt.
<!--more-->
## Go

### 下载

```bash
wget https://golang.org/dl/go1.16.7.linux-amd64.tar.gz
```

### 安装

1. Extract the archive you downloaded into /usr/local, creating a Go tree in /usr/local/go.

    ```bash
    sudo rm -rf /usr/local/go &&sudo tar -C /usr/local -xzf go1.16.7.linux-amd64.tar.gz
    ```

2. Add /usr/local/go/bin to the PATH environment variable, or add to ~/.zshrc

    ```bash
    export PATH=$PATH:/usr/local/go/bin
    ```

3. Verify that you've installed Go by opening a command prompt and typing the following command

    ```bash
    go version
    ```

## Hugo

### 安装/升级

1. go to [github page](https://github.com/gohugoio/hugo/releases) and download the Hugo Extended installer for Debian (hugo_extended_<VERSION>_Linux-64bit.deb)

    ```bash
    wget https://github.com/gohugoio/hugo/releases/download/v0.87.0/hugo_extended_0.87.0_Linux-64bit.deb
    ```

2. install Hugo with

    ```bash
    sudo dpkg -i hugo_extended_0.87.0_Linux-64bit.deb
    ```

3. update Hugo by repeating the first two steps, overwrite installation.

### 常用命令

- hugo： 编译项目生成静态网站，默认位置在项目的 public 目录下
- hugo server： 启动你的网站服务
- hugo new {folder}/{name}.md: 创建新文章，使用 markdown 进行排版，一般默认放在 posts 文件夹下；

基本没了，一般情况下用这三个命令就够了.

## DoIt

{{< admonition type=tip title="提示" open=false >}}
主要参考了[这篇文章](https://xinqi.gq/2021/08/%E4%BD%BF%E7%94%A8hugo-loveit%E4%B8%BB%E9%A2%98%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2/#%E5%AE%89%E8%A3%85-hugo)

本来是要写 LoveIt 这个主题, 但是她实在是太久没有更新了... 所以爱是会消失是吗:)
{{< /admonition >}}

### DoIt 安装

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

    {{< admonition type=tip title="How to remove a submodule?" open=false >}}

    ```bash
    # Remove the submodule entry from .git/config
    git submodule deinit -f path/to/submodule
    # Remove the submodule directory from the superproject's .git/modules directory
    rm -rf .git/modules/path/to/submodule
    # Remove the entry in .gitmodules and remove the submodule directory located at path/to/submodule
    git rm -f path/to/submodule
    ```

    {{< /admonition >}}

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

### 配置网站设置

配置文件位置：`./config.toml`

{{< admonition type=tip title="提示" open=false >}}
具体的配置条目参考 [DoIt 官方文档](https://hugodoit.pages.dev/theme-documentation-basics/#3-configuration)
{{< /admonition >}}

### 开始写第一篇文章

#### 文章前缀参数

在每篇 markdown 文章最前面可以用一部分注释来告诉DoIt主题，这篇文章的属性，譬如文章标签、分类、是否为草稿等.

#### 将文章前缀参数保存在 markdown 模版中

模版文件位置：`./archetypes/default.md`

#### 生成新文章

生成新文章中文版`HelloWorld`的命令：

```bash
hugo new posts/HelloWorld/index.cn.md
```

执行完成后，在`./content/posts`目录下应该可以看到新文件，同时里面已经有 markdown 模版中的文章前缀参数.

{{< admonition type=tip title="技巧" open=open >}}

- 也可以手动复制旧文章来生成新文章，不通过命令.
- 也可以在`content`文件夹下建新的文件夹，方便管理.这种情况下生成的静态 Html 文件路由效果如下：

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

{{< /admonition >}}

#### 本地调试

```bash
hugo server --disableFastRender
```

## Github SSH

### Generating a new SSH key

1. Open Terminal.
2. Paste the text below, substituting in your GitHub email address.
    ```ssh-keygen -t ed25519 -C "your_email@example.com"```
This creates a new ssh key, using the provided email as a label.

### Adding your SSH key to the ssh-agent

1. Start the ssh-agent in the background.

    ```bash
    eval "$(ssh-agent -s)"
    ```

2. Add your SSH private key to the ssh-agent. If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_ed25519 in the command with the name of your private key file.

    ```bash
    ssh-add ~/.ssh/id_ed25519
    ```

### Adding a new SSH key to your GitHub account

网页操作,很容易

## 创建 Github 仓库

个人建议创建两个仓库：

- 一个用于托管博客项目源文件，包括配置文件等包含后续可能配置 `API KEY` 的东西.设置权限为 Private（不公开）

- 一个用于托管博客编译后生成的`静态 Html 文件`(即使用 hugo 命令编译生成的 `public` 文件夹)，并配置该仓库使用 `Github Pages`，然后 Github 就会自动检测到它其中的`静态 Html 文件`并搭建网站.设置权限为 Public（公开）

{{< image src="git_management.svg" caption="Github Workflow">}}

### 第一个仓库

设置为private权限等级，没人看得见

#### 链接本地仓库与远端仓库

```bash
## 位于博客源代码根目录

## 初始化本地Git仓库
git init

## 设置名为Origin的远端Git仓库
git remote add origin {{这里替换成你的仓库在Github Clone用的地址}}

## 选择所有文件
git add -A

## Push到github
git push -u origin master
```

直接用vscode链接本地仓库与远端Github仓库 (vscode yyds)

#### 创建.gitignore

在源代码项目中创建.gitignore文件，来防止把生成的静态文件上传

参考 [gitignore.io](https://gitignore.io/)

### 第二个仓库

#### 创建仓库，注意名称

第二个仓库名字比较重要，必须是 `{{你的github用户名}}.github.io`. 比如我的 Github 名字为 `FakePhysicist`, 那么我需要创建的仓库名称为 `fakephysicist.github.io`.

#### 在仓库设置里设置启用Github Pages

设置 `Branch` 为 `master`, 静态文件位置为`/(root)`, 原因是我们在下个步骤中会直接将生成的 `public` 文件夹中的内容 `push` 到 `master` 分支的 `/` 目录下.

## 从第一个仓库 push 到第二个仓库

### 纯手工操作

1. 在 `My_Website` 目录下执行 `git submodule update --init --recursive` 将子模块更新到最新状态；
2. In your config/_default/config.yaml file, set baseurl = "https://<USERNAME>.github.io/", where <USERNAME> is your Github username. Stop Hugo if it’s running and delete the public directory if it exists (by typing rm -r public/).
3. Add your .github.io repository into a submodule in a folder named public, replacing with your Github username:

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

    **Notice that the default branch of github is `main` instead of `master` now.**

### 给源代码仓库添加 Github Action

#### 创建 CI 脚本

{{< admonition type=info title="什么是Github Action?" open=false >}}
Github Action 是 Github 提供的 CI 系统，可以让用户编写脚本，并在触发指定的操作后（比如新 commit push 到仓库），自动触发脚本.它可以：

- 编译项目
- 测试项目
- 登陆远程服务器
- 发布服务
- 等等……
{{< /admonition >}}

在源代码项目根目录下新建`.github/workflow/main.yml`.(通过 Github Action 网页端操作也可以)

```bash
.
├── .git
├── .github
│   └── workflows
│       └── main.yml  <---在这里创建
├── .gitignore
├── README.md
├── archetypes
├── config.toml
├── content
├── data
├── layouts
├── public
├── resources
├── static
└── themes
```

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
      - uses: actions/checkout@v2
        with:
          submodules: true # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0 # Fetch all history for .GitInfo and .Lastmod

      - name: Hugo setup
        # You may pin to the exact commit or the version.
        # uses: peaceiris/actions-hugo@2e89aa66d0093e4cd14751b3028fc1a179452c2e
        uses: peaceiris/actions-hugo@v2.4.13
        with:
          # The Hugo version to download (if necessary) and use. Example: 0.58.2
          hugo-version: latest # optional, default is latest
          # Download (if necessary) and use Hugo extended version. Example: true
          extended: true # optional, default is false

      - name: Build
        run: hugo

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

{{< admonition type=warning title="注意" open=false >}}
注意trigger on里的 branch 是否和自己的相同. 添加了 `target-branch`, 因为现在 Github 默认 branch 为 `main`. 最后三行内容需要自行替换.
{{< /admonition >}}

脚本主要做了以下事情：

1. 创建一个 Hugo 环境
2. 使用 hugo 命令编译代码，产生 public 文件夹
3. 将 public 文件 push 到你的Github用户名.github.io仓库.（也就是你之前创建的第二个仓库）

#### 设置 Push 用的密钥

为了让 Github Action 脚本有权限将代码 Push 到我们的 `xx.github.io` 仓库，我们需要申请一个密钥并告诉它.在 Github 设置中找到 `Developer settings/Personal access tokens`

新建一个密钥，权限设置把 `Repo` 打勾. 复制密钥.

回到第一个仓库的设置里，选择`Secrets（密钥）`

新建密钥，将刚才生成的密钥填进去，名字设为 `API_TOKEN_GITHUB` (跟 CI 脚本里的名称对应即可)

#### 观察效果

在 Push 新修改到第一个仓库后，在`Action`界面可以看到新的`workflow`开始运行了.

在`workflow`结束后，可以在第二个仓库看到新的`Push`

在等待 1-2 分钟后，即可在`xx.github.io`观察到变化.

