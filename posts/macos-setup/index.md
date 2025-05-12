# macOS Setup


Some basics about setting up a development environment on macOS.

<!--more-->

## Xcode

In the terminal, run

```bash
sudo xcode-select --install
```

## Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## Oh My Zsh

Install Zsh first:

```bash
brew install zsh
```

Then install Oh My Zsh:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### Plugins

Edit `~/.zshrc`:

```bash
plugins=(
  sudo
  extract
  autojump
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

#### sudo

Press `ESC` twice to add `sudo` to the beginning of the command.

#### extract

Use `x abc.zip` to extract `abc.zip`. It supports almost all compressed formats.

#### autojump

```bash
brew install autojump
```

Follow the instructions to add the following line to `~/.zshrc`:

```bash
# >>> autojump initialize >>>
  [ -f /opt/homebrew/etc/profile.d/autojump.sh ] && . /opt/homebrew/etc/profile.d/autojump.sh
# <<< autojump initialize <<<
```

Use `j` to jump to the matching directory.

```bash
j <keyword>
```

#### zsh-autosuggestions

auto-suggestion for zsh. It suggests commands based on your command history.

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
```

#### zsh-syntax-highlighting

Syntax highlighting for zsh. It should be the last plugin in the `plugins` list.

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
```

### Theme

I prefer the `powerlevel10k` theme. One can find the installation instructions [here](https://github.com/romkatv/powerlevel10k#oh-my-zsh).

1. clone the repository

   ```bash
   git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
   ```

2. Set `ZSH_THEME="powerlevel10k/powerlevel10k"` in `~/.zshrc`.

3. Run `p10k configure` to configure the theme. (It will be automatically run when you open a new terminal window. I prefer not to install the recommended fonts.)

## High-efficiency software

### tldr

`tldr` is a community effort to simplify the beloved `man` pages with practical examples.

```bash
brew install tldr
```

To use it, run

```bash
tldr <command>
```

### tree

`tree` is a recursive directory listing command that produces a depth indented listing of files.

```bash
brew install tree
```

## .gitignore

Set the global `.gitignore` file:

```bash
curl https://raw.githubusercontent.com/github/gitignore/master/Global/macOS.gitignore -o ~/.gitignore
```

Config `git` to use the global `.gitignore` file:

```bash
git config --global core.excludesfile ~/.gitignore
```

visit [gitignore](gitignore.io) to generate a `.gitignore` file for your project.

## conda

See [conda-basics](./conda-basics) for more details.

