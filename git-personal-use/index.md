# Git Basics


As a solo developer working locally, you don’t need to worry about remotes (push, pull, etc.) yet — just the core Git workflow to track versions, explore ideas, and organize your work.

<!--more-->

## Setup (once per repo)

```bash
git init
```

Start tracking a new directory. This creates a `.git` folder in the current directory.

```bash
git config --local user.name "Your Name"
git config --local user.email "your@email.com"
```

Set your identity (needed for commits).

## Check status

```bash
git status
```

See what’s changed, what’s staged, and what’s untracked.

## Track files

```bash
git add file.py
```

Stage a file for commit.

```bash
git add .
```

Stage all changes.

## Commit changes

```bash
git commit -m "Your commit message"
```

Saves a snapshot of the current state.

## Version tags

After committing, you can tag a version for easy reference later.

```bash
git tag
```

List all tags.

```bash
git tag -a v1.0 -m "First version"
```

Tag the current commit with a version.

## View history

```bash
git log --oneline
```

Compact commit history.

A typical output looks like this:

```
a1b2c3d (HEAD -> main) Your commit message
e4f5g6h Previous commit message
f7h8i9j Another commit message
```

Here, `a1b2c3d` is the commit hash, and `HEAD -> main` indicates that this commit is on the `main` branch.

The commit hash is a unique identifier for each commit. The tag `v1.0` is a label for a specific commit, making it easier to reference later.

## Undo mistakes

```bash
git restore file.py
```

Undo changes to a file (Goes back to the last commit).

```bash
git restore --staged file.py
```

Unstage a file (still keeps changes in the working directory).

## Branching

```bash
git branch
```

List all branches.

```bash
git branch new-branch
```

Create a new branch.

```bash
git switch new-branch
```

Switch to a branch.

```bash
git switch -c new-branch
```

Create and switch to a new branch.

```bash
git switch main
```

Switch back to the main branch.

```bash
git merge new-branch
```

Merge changes from `new-branch` into the current branch.

```bash
git branch -d new-branch
```

Delete the branch after merging.

## Checkout a commit/tag

```bash
git switch --detach a1b2c3d
```
Checkout a specific commit. This puts you in a "detached HEAD" state, meaning you're not on any branch (orphaned). Then you create a new branch from this commit.

```bash
git switch -detach v1.0
```
Checkout a specific tag. This also puts you in a "detached HEAD" state.

After checking out a commit or tag, you can create a new branch from it:

```bash
git switch -c fix-on-v1.0
```
This creates a new branch called `fix-on-v1.0` starting from the commit or tag you checked out.

## Clean commit history

```bash
git rebase -i HEAD~n
```

Interactively rebase the last `n` commits. 

- pick: Keep the commit
- squash: Combine with the previous commit
- drop: Remove the commit

```bash
git reset --soft HEAD~n
```

Undo the last `n` commits but keep changes in the working directory.

```bash
git reset --soft HEAD~n
```

Undo the last `n` commits and remove changes from the working directory.


