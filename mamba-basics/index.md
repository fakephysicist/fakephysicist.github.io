# Mamba Basics


`mamba` is a package manager for Python. It is a reimplementation of `conda` in C++. The syntax is the same as `conda`, but it is much faster. It is recommended to use `mamba` instead of `conda` for package management.

It is recommended to create a new environment for each project and leave the base environment untouched.

In the following, we assume the environment name is `cs101`.

<!--more-->

## Uninstall Anaconda/miniconda

See [Uninstalling Anaconda](https://docs.anaconda.com/free/anaconda/install/uninstall/) for more details.

## Install Mambaforge

See [Mambaforge](https://github.com/conda-forge/miniforge#mambaforge) for more details.

For Linux and macOS:

```bash
curl -L -O "https://github.com/conda-forge/miniforge/releases/latest/download/Mambaforge-$(uname)-$(uname -m).sh"
bash Mambaforge-$(uname)-$(uname -m).sh
```

For Windows:

Download the installer from [Mambaforge](https://github.com/conda-forge/miniforge/releases/latest/download/Mambaforge-Windows-x86_64.exe) and run it.

Enable the options to "Create start menu shortcuts" and "Add Miniforge3 to my PATH environment variable".

Open a `miniforge Prompt` from Start Menu. Now Try:

```powershell
conda init powershell
```

## Prevent `mamba` from activating the base environment automatically

```bash
mamba config --set auto_activate_base false
```

## Add Mambaforge to VS Code

Add the following lines to `settings.json`:

```json
    "python.condaPath": "~/mambaforge/condabin/conda",
    "python.defaultInterpreterPath": "~/mambaforge/envs/cs101/bin/python",
```

## Create a New Environment

```bash
mamba create -n cs101
```

## Activate an Environment

```bash
mamba activate cs101
```

## Install common packages for scientific computing

```bash
mamba install -y numpy matplotlib scipy pandas sympy numba jupyterlab plotly pytest
```

## Use `pip` to install packages not available in `Anaconda`

```bash
pip install rocket-fft
```

## Install local modules/packages

```bash
pip install -e .
```

In this way, the package will be installed in the current environment and the changes will be reflected immediately.

## Deactivate an Environment

```bash
mamba deactivate
```

## List All Environments

```bash
mamba env list
```

## Remove an Environment

```bash
mamba remove -n cs101 --all
```

