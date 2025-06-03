# Conda Basics


It is recommended to create a new environment for each project and leave the base environment untouched.

In the following, we assume the environment name is `cs101`.

<!--more-->

## Install miniforge

See [Miniforge](https://github.com/conda-forge/miniforge) for more information.

For Linux and macOS:

```bash
curl -L -O "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-$(uname)-$(uname -m).sh"
bash Miniforge3-$(uname)-$(uname -m).sh
```

## Prevent `conda` from activating the base environment automatically

```bash
conda config --set auto_activate_base false
```

## Add Miniforge to VS Code

Add the following lines to `settings.json`:

```json
"python.condaPath": "~/miniforge/condabin/conda",
"python.defaultInterpreterPath": "~/miniforge/envs/cs101/bin/python",
```

## Create a New Environment

```bash
conda create -n cs101
```

## Activate an Environment

```bash
conda activate cs101
```

## Install common packages for scientific computing, data science, and machine learning

```bash
conda create -n cs101 \
pytorch torchvision torchaudio \
numpy matplotlib scipy \
pandas openpyxl seaborn \
scikit-image opencv \
sympy \
shapely rasterio \
colour-science tqdm \
jupyterlab jupytext \
ipykernel ipympl ipywidgets \
spyder \
pytest \
black isort flake8 \
natsort \
-c pytorch -c conda-forge
```

## Use `pip` to install packages not available in `conda`

```bash
python -m pip install <package_name>
```

### DL and ML packages

```bash
# JAX Metal, experimental support for Apple Silicon
python -m pip install jax-metal
```

## Install local modules/packages

```bash
pip install -e .
```

In this way, the package will be installed in the current environment and the changes will be reflected immediately.

## Deactivate an Environment

```bash
conda deactivate
```

## List All Environments

```bash
conda env list
```

## Remove an Environment

```bash
conda remove -n cs101 --all
```

