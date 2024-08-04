# Compile Mitsuba


In this post, I will show you how to compile Mitsuba from source code. 

Follow the instructions in the [documentation](https://mitsuba.readthedocs.io/en/latest/src/developer_guide/compiling.html) to compile the project.

<!--more-->

## Compile Mitsuba

### Clone the Repository

```bash
git clone --recursive https://github.com/mitsuba-renderer/mitsuba3
```
### Switch to the Most Recent Version

Switch to the most recent version of the repository. For example, if the current version is `v3.5.2`, switch to tag `v3.5.3`:

```bash
git checkout v3.5.3
```

### Recursively Update the Submodules

```bash
git submodule update --init --recursive
```

### Compile the Project

```bash
mkdir build
cd build
cmake -GNinja ..
```

This should generate a `build` directory with a `mitsuba.conf` file. You should set the variants you want to compile in this file. 

For example, to compile the `scalar_rgb`, `scalar_spectral`, `scalar_spectral_polarized`, `llvm_spectral`, `llvm_spectral_polarized`, and `llvm_ad_rgb` variants, the `mitsuba.conf` file should look like this:

```
"enabled": [
    "scalar_rgb", "scalar_spectral", "scalar_spectral_polarized", "llvm_spectral", "llvm_spectral_polarized", "llvm_ad_rgb"
],
```

Then, compile the project:

```bash
ninja
```

## Using Mitsuba in Python

To call the compiled version of Mitsuba in python or Jupyter, add the path of the compiled python module to the python path. For example, if the path to the compiled python module is `/Users/your_username/mitsuba3/build/python`, you can add this path to the python path by running the following code:

```python
import sys
sys.path.insert(0, '/Users/your_username/mitsuba3/build/python')
```

This can work only temporarily. If you quit the python session, or restart the Jupyter kernel, you will have to run this code again. 

### Import Mitsuba

Then, you can then import Mitsuba as usual:

```python
import drjit as dr
import mitsuba as mi
```

### Check the Version of Mitsuba

To check if the correct version of Mitsuba is being used, you can run the following code:

```python
mi.variants()
mi.set_variant('llvm_spectral_polarized')
print(mi.MI_VERSION)
```

This code will print the available variants and the version of Mitsuba being used. Also, it tests if the variant `llvm_spectral_polarized` is available.


