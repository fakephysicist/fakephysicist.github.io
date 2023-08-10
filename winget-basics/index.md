# Winget Basics

Windows Package Manager (winget) is a package manager for Windows. It is similar to `apt` in Linux. It is a command-line tool that allows you to search for and install apps from the command line. It is a great tool for setting up a new Windows machine.
<!--more-->

## Search

```powershell
winget search <app name>
```

## Install

```powershell
winget install <app name>
```

The `<app name>` can be found by `winget search`. It does not have to be the full name, but it has to be unique.

