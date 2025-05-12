# Git Basics


Some basics about Git and GitHub.

Although there are many tutorials online, I still want to record some of them here for my own reference.

<!--more-->

## Some References

- [Git and GitHub](https://sourabhbajaj.com/mac-setup/Git/) (Concise)
- [Git 与代码管理](https://seismo-learn.org/seismology101/programming/git/) (Good!)

## Configure Tooling

### Name and Email
Configure user information for all local repositories:

```bash
git config --global color.ui auto # enable helpful colorization of command line output
git config --global user.name "Your Name Here"
git config --global user.email "your_email@youremail.com"
```
NOTE: `your_email@@youremail.com` should be the `noreply` email address of your GitHub account.

<<<<<<< HEAD
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

## Git Clone
=======
To check your configuration, run:

```bash
git config --list | grep user
```
This will show your user name and email. The `grep` command filters the output to only show lines containing "user".

### Default Branch

Configure your default branch:

```bash
git config --global init.defaultBranch main
```
This sets the default branch name to `main` when you create a new repository. To show the current default branch name, use:

```bash
git config --global init.defaultBranch
```

If this returns nothing, it means the default branch is still set to `master`.

### Default Editor

Configure your default editor:

```bash
git config --global core.editor "code --wait" # set Visual Studio Code as the default editor
```

Now you can run `git config --global -e` and use VS Code as editor for configuring Git.

VS Code as Git difftool and mergetool:

```.gitconfig
[diff]
    tool = default-difftool
[difftool "default-difftool"]
    cmd = code --wait --diff $LOCAL $REMOTE
[merge]
  tool = code
[mergetool "code"]
  cmd = code --wait --merge $REMOTE $LOCAL $BASE $MERGED
```

More about [Using Git with Visual Studio Code](https://code.visualstudio.com/docs/sourcecontrol/overview).

## Create Repositories

Start a new repository or obtain one from an existing URL:

### Create a new repository

```bash
git init <project-name>
cd <project-name>
```

If you want to turn an existing project into a Git repository, use the following command:

```bash
cd existing_project
git init
```

### Clone a repository

Download a project and its entire version history:
>>>>>>> fe6b87b (Update timestamp command)

```bash
git clone https://github.com/<username>/<repo-name>.git # https
git clone git@github.com:<username>/<repo-name>.git # SSH
```

## Make changes

Review edits and craft a commit transaction:

```bash
git add [file] # Snapshots the file in preparation for versioning
git commit -m "[descriptive message]" # Record file snapshots permanently in version history
git status # List all new or modified files to be committed
git diff # Compare working directory with staging area
git diff --staged # Compare staging area with the last commit (HEAD)
```



## Undo changes

Revert changes.

```bash
git reset [file] # 'unstage' a file (inverse of `git add`), no changes to file contents
git checkout -- [file] # Revert the file to the last committed version, make changes to the file contents
```

https://docs.gitlab.com/ee/topics/git/undo.html


## Group Changes

Name a series of commits and combine completed efforts.

List branches.

```bash
git branch # List all local branches in the local repository
git branch -a # The -a flag shows all branches (local and remote)
```

Create a new branch and switch to it.

```bash
git branch [branch-name] # Create a new branch
git checkout [branch-name] # Switch to the specified branch and update the working directory
```

Use `git switch`. This command was introduced in Git 2.23 as a more user-friendly and branch-specific command for switching branches. 
It was created to simplify the branch-switching process and avoid some of the confusion that came with git checkout's multiple uses.
`git switch [branch-name]` is simpler and less error-prone when you only want to switch branches, 
without the risk of affecting files or the working directory.

```bash
git switch -c [branch-name] # Create a new branch and switch to it
git switch [branch-name] # Switch to the specified branch and update the working directory, similar to `git checkout`
```

Merge changes from one branch to another.

```bash
git merge [branch-to-merge] # Combine the specified branch's history into the current branch
```

Delete a branch

```bash
git branch -d <branch-name>
```

If the branch has not been merged, use `-D` instead of `-d`:

```bash
git branch -D <branch-name>
```

## Delete and Rename Files

```bash
git rm [file] # Delete the file from the working directory and stage the deletion
git rm --cached [file] # Remove the file from version control but preserve the file locally
git mv [file-original] [file-renamed] # Change the file name and prepare it for a commit
```

## Suppress Tracking

Exclude temporary files and paths.
A text file named `.gitignore` suppresses accidental versioning of files and paths matching the specified patterns.

```bash
git ls-files --others --ignored --exclude-standard # List all ignored files in this project
```

## Save Fragments

Shelve and restore incomplete changes.

```bash
git stash # Temporarily store all modified tracked files
git stash list # List all stashed changes
git stash pop # Restore the most recently stashed files
git stash drop # Discard the most recently stashed changes
```

## Review History

Browse and inspect the evolution of project files.

```bash
git log # Show all commits in the current branch's history
git log --follow [file] # List version history for a file, including renames
git log --oneline # Show a compacted log with each commit on a single line
git diff [first-branch]...[second-branch] # Show content differences between two branches
git show [commit] # Output metadata and content changes of the specified commit
```

## Redo Commits

Erase mistakes and craft replacement history.

```bash
git reset --soft [commit] # Move the HEAD to the specified commit and preserve changes in both the working directory and the staging area
git reset [commit] # Equivalent to `git reset --mixed`, will move the HEAD to the specified commit, unstage changes, and preserve changes in the working directory
git reset --hard [commit] # Move the HEAD to the specified commit and discard changes in the working directory and staging area
```

## Synchronize Changes

Register a repository bookmark and exchange version history.

```bash
git fetch [remote repository] # Download all history from the repository bookmark
git merge [remote repository]/[branch] # Combine bookmark's branch into current local branch
git pull # Download bookmark history and incorporate changes
git push [remote repository] [local branch] # Upload all local branch commits to GitHub
```

### Fetch

`git fetch` is a command that retrieves the latest changes from the remote repository (e.g., on GitHub) but does not modify your local working directory or branches. It simply downloads the latest commits, branches, and other updates and stores them in your local repository, so you can inspect or apply them later.

For example, 

```bash
git fetch origin
```

This fetches all the changes from the remote repository (which is typically referred to as origin) and updates your local repository with the latest information from that remote. However, your working directory and branches remain unchanged until you decide to incorporate those changes.

### Merge

After you’ve fetched updates from the remote repository, you may want to integrate them into your current branch. To do this, you use `git merge`. This command merges the changes from a remote branch (fetched with git fetch) into your current local branch.

For example, 

```bash
git merge origin/main
```

Here, `origin/main` refers to the main branch on the remote repository (`origin`). This command merges the changes from the remote main branch into your current branch (typically `main`).

### Pull

`git pull` is a shorthand command that combines `git fetch` and `git merge` into a single command. It fetches the latest changes from the remote repository and merges them into your current branch in one step.

### Push

`git push [remote repository] [local branch]` is a command that sends the commits you have made on your local branch to the corresponding branch on the remote repository. This updates the remote repository with your local changes. Here `[alias]` is typically the name of the remote repository (e.g., origin), and `[local branch]` is the name of the branch you want to push. Notice the syntax difference between `git merge [remote repository]/[branch]` and `git push [remote repository] [branch]`.

For example, 

```bash
git push origin main
```

This command pushes the commits from your local `main` branch to the remote repository (`origin`).

## Commit

In Git, the <commit> refers to a specific point in the history of your repository. This could be represented in a few different ways, including using the commit hash, HEAD, or other shorthand references. Let’s break down the different ways Git allows you to refer to a commit.

### Commit Hash

- Every commit in Git has a unique identifier, called a commit hash or SHA-1 hash.
- This is a 40-character long alphanumeric string that looks something like 1a2b3c4d5e6f7g8h9i0j.... This hash is unique to that particular commit.
- In most cases, you only need to use the first 7 or so characters of the hash (since that is usually enough to uniquely identify the commit).

```bash
git checkout 1a2b3c4
```

### HEAD

- `HEAD` is a reference to the current commit that your repository is on. Think of it as a pointer to the current state of your working directory.
- `HEAD~n` refers to the commit before HEAD:
  - `HEAD~1`: The commit immediately before the current one.
  - `HEAD~2`: Two commits before the current one.

```bash
git checkout HEAD
```

`HEAD` always points to the latest commit on the current branch that you have checked out.
  
### Branches

- You can use the branch name to refer to the latest commit on that branch.

```bash
git checkout main
```

This command switches to the latest commit on the `main` branch.

### Tags

- A `tag` is a human-readable label applied to a specific commit (typically used for marking release points).
- You can refer to a commit by its tag name.

```bash
git checkout v1.0
```

This command switches to the commit that has the tag `v1.0`.

### Relative References

- `HEAD^`: Refers to the parent of the current commit.
- `HEAD^2`: Refers to the second parent of the current commit (for merge commits).
- `HEAD~3`: Refers to the commit three steps before the current commit.

```bash
git checkout HEAD^
```





## Go Back in Time

### Scenario A

I accidentally made a commit, I have not pushed it to the server, and I don't want the commit anymore.

```bash
git reset HEAD~
```

This command resets the git history to the previous commit (one commit earlier than the current unwanted commit HEAD).

### Scenario B

I accidentally made a commit, I have already pushed it to the server, and I don't want the commit anymore.

```bash
git revert HEAD && git push
```

This command creates a “reverse commit” of the current commit, then pushes to the server to revert it.

In this scenario, don't use the solution for Scenario A, since that might create a mismatch between your repo and others' repos.

### Scenario C

I wanted to pull from the remote repo, but git says I have conflicting uncommitted changes in my working copy. And I am sure I can just get rid of those changes.

```bash

git stash && git stash drop && git pull
```

This command drops uncommitted changes.

### Scenario D

I wanted to pull from the remote repo, but git says I have conflicting uncommitted changes in my working copy. And I actually need to preserve my changes.

```bash
git stash && git pull && git stash pop
```

This command temporarily hides uncommitted changes in a stash, does the pull, and pops the changes from the stash.

If your changes affect the same files that were changed on the remote repo, then things get complicated – you will need to actually merge your changes in. Please Google for details.

### Scenario E

One of my files got messed up just now. I want to overwrite it with the version stored in the repo.

```bash
git checkout path/to/file
```

This command fetches the file from HEAD and replaces that file in the working copy.

### Scenario F

One of my files got messed up a while ago. I want to overwrite it with an earlier version in the repo.

```bash
git checkout commit_index path/to/file
```

This command fetches the file from the commit specified with `commit_index` and replaces the file in the working copy.

The commit index can be found in the history of commits: `git log`



## SSH Config for GitHub

Make sure you have generated an SSH key pair on your local machine.

### Add a new SSH public key to your GitHub account

[See GitHub documents](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

### Test SSH connection

```bash
ssh -T git@github.com
<<<<<<< HEAD
```
=======
```

## Some Useful Commands

### Remove all `.DS_Store` files recursively

Delete all `.DS_Store` files recursively and print the path of each deleted file:

```bash
find . -name ".DS_Store" -print -delete
```
>>>>>>> fe6b87b (Update timestamp command)

