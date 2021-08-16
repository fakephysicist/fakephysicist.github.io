# Hugo Setup

再wsl环境下安装Go, Hugo 并且配置主题Loveit.
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

基本没了，一般情况下用这三个命令就够了。

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

## Git

## Loveit

### 安装

1. 通过 git 安装的话，首先建议你在 GitHub 上 fork 成你自己的项目
    - standard method `git clone https://github.com/dillonzq/LoveIt.git themes/LoveIt
` 将代码克隆到本地文件夹 My_Website
    - SSH method 更安全，也免于 push 时输入密码 `git clone git@github.com:FakePhysicist/starter-hugo-academic.git My_Website`

2. 进入文件夹，初始化项目：`git submodule update --init --recursive`，完成安装;

### auto update

说是自动，还是需要手动执行一条命令：`git submodule update --remote --merge`;

## Deploy to Github Pages

### 原理

网上介绍的办法很多，但核心其实就一句：

将 **`hugo`** 命令生成的 **`public`** 文件夹上传到 GitHub pages 项目下.

`public` 文件夹相当于编译完成的静态网站，你在本地打开其实就能看。换句话说，你每次手动将这个目录下的内容上传到你的 GitHub page 项目也是可以的。

然后为了达到这个目的，Academic 给出的做法是利用 `git submodule` 将你的 GitHub page 项目作为 My_Website 项目的子模块存放到 public 目录。那么当你更新你的文章之后，只提交 public 文件夹内的变更到 GitHub page 项目即可。

### 教程

1. 之前我们fork了模板,已经有了一个项目. 现在需要再新建一个github pages 项目. <USERNAME>.github.io where <USERNAME> is your Github username - we will save the generated website to this repo. To create the <USERNAME>.github.io repository, click the “+” icon in the top right corner and then choose “New Repository”.
2. 在 `My_Website` 目录下执行 `git submodule update --init --recursive` 将子模块更新到最新状态；
3. In your config/_default/config.yaml file, set baseurl = "https://<USERNAME>.github.io/", where <USERNAME> is your Github username. Stop Hugo if it’s running and delete the public directory if it exists (by typing rm -r public/).
4. Add your .github.io repository into a submodule in a folder named public, replacing with your Github username:

    ```bash
    git submodule add -f -b master https://github.com/<USERNAME>/<USERNAME>.github.io.git public
    ```

5. Add everything to your local git repository and push it up to your remote repository on GitHub:

    ```bash
    git add .
    git commit -m "Initial commit"
    git push -u origin master
    ```

## push to github.io

### 笨办法

regenerate your website’s HTML code by running Hugo and uploading the public submodule to GitHub:

    ```bash
    hugo
    cd public
    git add .
    git commit -m "Build website"
    git push origin main
    cd ..
    ```

    **Notice that the default branch of github is `main` instead of `master` now.**

### Github action

#### 创建 CI 脚本

{{< admonition type=info title="什么是Github Action?" open=false >}}
Github Action 是 Github 提供的 CI 系统，可以让用户编写脚本，并在触发指定的操作后（比如新 commit push 到仓库），自动触发脚本。它可以：

- 编译项目
- 测试项目
- 登陆远程服务器
- 发布服务
- 等等……
{{< /admonition >}}

在源代码项目根目录下新建`.github/workflow/main.yml`。(通过 Github Action 网页端操作也可以)

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
{{< admonition type=note title="需要自定义的部分" open=false >}}
注意trigger on里的 branch 是否和自己的相同，因为现在 Github 默认分支为 main。 同时最后三行内容需要自行替换。
{{< /admonition >}}

脚本主要做了以下事情：

1. 创建一个 Hugo 环境
2. 使用 hugo 命令编译代码，产生 public 文件夹
3. 将 public 文件 push 到你的Github用户名.github.io仓库。（也就是你之前创建的第二个仓库）

#### 设置 Push 用的密钥

为了让 Github Action 脚本有权限将代码 Push 到我们的xx.github.io仓库，我们需要申请一个密钥并告诉它。在 Github 设置中找到Developer settings/Personal access tokens

新建一个密钥，权限设置把Repo打勾。

回到第一个仓库的设置里，选择Secrets（密钥）

新建密钥，将刚才生成的个人密钥填进去，名字设为API_TOKEN_GITHUB(跟 CI 脚本里的名称对应即可)

#### 观察效果

在 Push 新修改到第一个仓库后，在`Action`界面可以看到新的`workflow`开始运行了。

在`workflow`结束后，可以在第二个仓库看到新的`Push`

在等待 1-2 分钟后，即可在`xx.github.io`观察到变化。
