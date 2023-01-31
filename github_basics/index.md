# Git Basics

Some basics about Git and GitHub. 其实上网一搜到处都有, 但还是记录一下, 方便自己查阅.
<!--more-->

## Some References
- [Git and GitHub](https://sourabhbajaj.com/mac-setup/Git/) (Concise)
- [Git 与代码管理](https://seismo-learn.org/seismology101/programming/git/) (Good!)

## Configure Git

```bash
git config --global user.name "Your Name Here"
git config --global user.email "your_email@youremail.com"
```

## Git Clone

```bash
git clone https://github.com/<username>/<repo-name>.git # https
git clone git@github.com:<username>/<repo-name>.git # SSH
```

## SSH Config for GitHub

### Check for existing SSH keys

First check for existing SSH keys on your computer by running:

```bash
ls -al ~/.ssh
# Lists the files in your .ssh directory, if they exist
```
Check the directory listing to see if you have files named either `id_rsa.pub` or `id_dsa.pub`. If you don't have either of those files then read on, otherwise skip the next section.

### Generate  a new SSH key

1. Open Terminal.
2. Paste the text below, substituting in your GitHub email address. This creates a new ssh key, using the provided email as a label. 

    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```

### Add  your SSH key to the ssh-agent

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

### Add a new SSH key to your GitHub account

[See GitHub documents](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

