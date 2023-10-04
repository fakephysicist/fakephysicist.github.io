# Git Basics


Some basics about Git and GitHub.

Although there are many tutorials online, I still want to record some of them here for my own reference.

<!--more-->

## Some References

- [Git and GitHub](https://sourabhbajaj.com/mac-setup/Git/) (Concise)
- [Git 与代码管理](https://seismo-learn.org/seismology101/programming/git/) (Good!)

## Configure Git

```bash
git config --global user.name "Your Name Here"
git config --global user.email "your_email@youremail.com"
```

NOTE: `your_email@@youremail.com` should be the `noreply` email address of your GitHub account.

## Git Clone

```bash
git clone https://github.com/<username>/<repo-name>.git # https
git clone git@github.com:<username>/<repo-name>.git # SSH
```

## SSH Config for GitHub

Make sure you have generated an SSH key pair on your local machine.

### Add a new SSH public key to your GitHub account

[See GitHub documents](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

### Test SSH connection

```bash
ssh -T git@github.com
```

## Some Useful Commands

### Remove all `.DS_Store` files recursively

Delete all `.DS_Store` files recursively and print the path of each deleted file:

```bash
find . -name ".DS_Store" -print -delete
```

### Generate a timestamp

Use the following code snippet to generate the current timestamp in the format of `YYYY-MM-DD HH:MM:SS-07:00`:

```bash
timestamp=$(date +"%Y-%m-%dT%H:%M:%S")
offset=$(date +%z)
formatted_offset=${offset:0:3}:${offset:3:2}
echo "${timestamp}${formatted_offset}"
```

