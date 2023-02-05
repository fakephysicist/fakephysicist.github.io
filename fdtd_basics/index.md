# FDTD Basics

FDTD basics, Python scripts controlling Lumerical.
<!--more-->

## Solver Physics

In three dimensions, Maxwell equations have six electromagnetic field components: Ex, Ey, Ez and Hx, Hy, and Hz. If we assume that **the structure is infinite in the z dimension** and that **the fields are independent of z**, then Maxwell's equations split into two independent sets of equations composed of three vector quantities each which can be solved in the x-y plane only.  These are termed the **TE (transverse electric)**, and **TM (transverse magnetic)** equations. We can solve both sets of equations with the following components:

- TE:   Ex, Ey, Hz
- TM:   Hx, Hy, Ez

## Impulse response

FDTD solves for the electric field and magnetic field as a function of time.

- the solver calculates $\vec{E}\left(t\right)$ and $\vec{H}\left(t\right)$
- but, in general, what we want is field as a function of frequency or wavelength

  - $\vec{E}\left(\omega\right)$
  - poynting vector, transmission, reflection

- time domain->freqency domain? Fourier Transform!
In linear systems, the impulse response of the system:
$$\vec{E}\left(\omega\right)=\frac{1}{s\left(\omega\right)}\int_{0}^{t_{sim}}e^{i\omega t}\vec{E}\left(t\right)dt$$
where
$$s\left(\omega\right)=\int_{0}^{t_{source}}e^{i\omega t}\vec{s}\left(t\right)dt$$
is the fourier transform of the source pulse.
It should be independent of the source pulse used in linear optics system (no nonlinearity is considered here).

- Ideally, $s\left(\omega\right)=1$ and $s\left(t\right)$ is a Dirac delta function
- $t_{sim}$ should be long enough.

with impulse response $\vec{E}\left(\omega\right)$, $\vec{H}\left(\omega\right)$ and $\varepsilon\left(\omega\right)$,
one can calculate reflection, transmission, scattering cross sections, absorptions and much more

- Poynting Vector
$$\left<\vec{P}\left(\omega\right)\right>_{t}=\frac{1}{2}\Re\left[\vec{E}\left(\omega\right)\times\vec{H}^{*}\left(\omega\right)\right]$$
which is not a simple fourier transform of $\vec{P}\left(t\right)$.

- Power

{{< math >}}
$$Power\left(\omega\right)=\int_{S}\left<\vec{P}\left(\omega\right)\right>_{t}\cdot d\vec{S}$$
{{< /math >}}

But we have the Parseval-Plancherel theorem

{{< math >}}
$$\int_{-\infty}^{\infty}\vec{E}\left(t\right)\times\vec{H}^{*}\left(t\right) dt=\frac{1}{2\pi}\int_{-\infty}^{\infty}\vec{E}\left(\omega\right)\times\vec{H}^{*}\left(\omega\right) d\omega$$
{{< /math >}}

- Transmission

{{< math >}}
$$T\left(\omega\right)=\frac{\int_{S}\vec{P}\left(\omega\right)\cdot d\vec{S}}{s\left(\omega\right)}$$
{{< /math >}}

## MODE

Given a cross section of a waveguide, the finite-difference eigenmode (FDE) solver calculates the **spatial profile** and **frequency dependence of modes**. It can provides us:

- mode field profile
- effective index
- loss
- TE and TM ratio
- combined with frequency sweep, one can calculate group delay, dispresion and etc
- applicable to bent waveguide

The solver assumes the waveguide structure in the z direction is uniform, and the field can be expressed as:
$$\vec{E}\left( x, y\right)e^{i\left(\beta z-\omega t\right)}$$
$$\vec{H}\left( x, y\right)e^{i\left(\beta z-\omega t\right)}$$
where $\omega$ is the angular frequency and $\beta$ is the propagation constant.

Once the structure is meshed, the whole problem is converted to a matrix eigenvalue problem and solved by sparse matrix technique.

It can be seen the physics convention $e^{i\left(\beta z-\omega t\right)}$ is adopted here. If $\beta>0$, the wave is propagating in the positive z direction.

### effective index

the modal effective index is defined as
$$n_{eff}=\frac{c\beta}{\omega}$$
similar to the bulk index definition, except that geometric contributions are taken into account. Since the mode must be guided the effective index is bounded by the indices such that
$$n_{\text{max(sub,clad)}} < n_{eff} < n_{core}$$

### loss (dB/m)

An electric field propagating in the positive z-direction in a medium with a complex refractive index of $n+i\kappa$ can be expressed as follows:
$$E(z) = e^{i2\pi(n+i\kappa)z/\lambda_0}$$
here, $k = 2\pi(n+i\kappa)/\lambda_0$.

The propagation loss in dB/m for a mode propagating in the z-direction is defined as

{{< math >}}
$$loss = -10 \log_{10}(\frac{P(z)|_{z = \ 1\ m}}{P(z)|_{z = \ 0\ m}}) = -10 \log_{10}(\frac{|E(1)|^2}{|E(0)|^2})=-20 \log_{10}(\frac{|E(1)|}{|E(0)|})$$
{{< /math >}}

Combining the formulas gives

{{< math >}}
$$loss = -20 \log_{10}(e^{-2\pi\kappa/\lambda_0})$$
{{< /math >}}

### TE polarization fraction

Two definitions for polarization fractions are provided by MODE. The TE Polarization Fraction definition is typically used in integrated optics, but for fibers, this also helps to determine the polarization of the mode.

The "TE polarization fraction Ex" for propagation along the z-direction is defined by the following equation:
$$\text{TE polarization fraction (Ex)} =  \frac{\int |Ex|^2 dxdy}{\int (|Ex|^2+|Ey|^2)dxdy}$$
where $|Ex|^2+|Ey|^2$ corresponds to $|E_{||}|^2$ (since we are considering the polarization of the modes, here we only consider the fields parallel to the mode cross section). In this case, if TE polarization fraction (Ex) = 100%, this mode is considered pure TE-polarized. In contrast, 0% refers to a pure TM-polarized mode. Note that some modes may not be perfectly polarized in one direction and in those cases you may find quasi-polarized modes in the Mode List.

For propagation along the x direction, ie., "TE polarization fraction Ey":
$$\text{TE polarization fraction (Ey)} = \frac{\int |Ey|^2 dydz}{\int (|Ey|^2+|Ez|^2) dydz}$$
For propagation along the y direction, ie., "TE polarization fraction Ex":
$$\text{TE polarization fraction (Ex)}  =\frac{\int |Ex|^2 dxdz}{\int (|Ex|^2+|Ez|^2) dxdz}$$
Note that this definition is arbitrary (since we allow for propagation in any direction), the user may have to look carefully at the field components if unusual orientations of the Eigenmode Solver are used.

### Waveguide TE/TM Fraction

There are alternative definitions that are used more frequently for other applications. The waveguide TE/TM fraction indicates the amount of E/H field in the direction of propagation. It is equal to the integrated transverse field intensity divided by the integrated total field intensity. A mode with a waveguide TE/TM fraction of 100%/100% is a TEM mode
The "waveguide TE/TM fraction" is defined by the following equations:.
$$\text{waveguide TE fraction } = 1-\frac{\int\left|E_{\perp}\right|^{2} dA_{||}}{\int\left(|E|^{2}\right) dA_{||}}$$
$$\text{waveguide TM fraction } =  1-\frac{\int\left|H_{\perp}\right|^{2} dA_{||}}{\int\left(|H|^{2}\right) dA_{||}}$$
where $E_{\perp}$ and H_{\perp} refer to the field components perpendicular to the mode cross section (ie. in the direction of propagation), $A_{||}$ refers to the integration area on the mode cross section plane.

### Effective Area

Effective area is a quantitative measure of the modal area. As with TE fraction, there are a number of possible similar definitions which can be easily misinterpreted. We have adopted the definition developed by G. P. Agrawal, Nonlinear Fiber Optics, 4th ed. (Academic, 2007). This method has the benefit of not making any assumptions about the shape of the field distribution beforehand.
$$\text{Effective Area} = \frac{(\int_{}^{}|E|^{2}dA)^{2} }{\int_{}^{}|E|^{4}dA}$$
The effective area defined here is similar to the Landau, and Lishitz method, based on the ratio of a mode's total energy density per unit length and its peak energy density.

For Gaussian beams, and fiber optic modes the most cited quantity is the beam waist w(z) or equivalently mode field diameter (MFD). The MFD corresponds to twice the radial distance, where $I(r) = 1-e^{-2}\approx 13.5$. In with the comparison normal distribution this radial value would correspond to $f( x \approx 3 \sigma )$, and is related to the full width half maximum (FWHM)  as $w(z) \approx 1.18 \text{ FWHM}$. The effective area method cited above is typically in the range of 95-104% of what would be found using through the circle described by the MFD.

## Boundary condition

### PML

- The steep angle profile should be used when the fields are incident on the PML at a **steep or grazing angle**, typically beyond 60 degrees.

### Periodic

- With periodic boundaries, the periodicity is determined by the span of the simulation region. It is very important to understand that both the structure, electromagnetic fields and source must be periodic. For this reason, **plane wave sources with normal incidence** are most often used with periodic boundary conditions.

### Bloch

- Bloch boundaries are used for periodic simulations where the source is injected at an angle – they are similar to periodic boundaries where light which exits one boundary is re-injected from the opposite boundary, but they add the required phase difference to the light that is re-injected corresponding to the phase accumulated between the unit cells due to **the angle of the source**.

### Symmetry/anti-symmetry

- When you have a structure and source that have a plane of symmetry through the middle of the simulation region, symmetry boundaries allow you to reduce the size of the solver region that needs to be simulated.
- The main challenge with using symmetry boundaries is determining which type of symmetry exists in the system: Positive Symmetry, or Anti-Symmetry.
- In most cases, the type of symmetry can be determined from the source polarization. If the source polarization arrow is tangential to the plane of symmetry, then the polarization arrow and the boundary shading color should match. If the polarization arrow is normal to the boundary, then the colors should not match.In most cases, monitors automatically unfold field data according to these rules.
- When using symmetry boundaries, the boundary should only be applied to the ‘min’ boundary. The ‘max’ boundary should be set to whatever the boundary would be without symmetry; typically PML.
- The only exception is when using symmetry boundaries with periodic structures. In such cases, set both the min and max boundaries in the periodic direction to use symmetric or anti-symmetric boundaries. You will need to enable the “allow symmetry on all boundaries” option.

## Source

### plane wave

- normal incidence/ angled incidence
- single frequency/ broadband
- Bloch/Periodic
- **BFAST**
- diffracting

### mode source

- The mode source can be used to inject the mode of a waveguide or fiber. The mode source includes an integrated mode solver with uses the finite-difference eigenmode solving algorithm to calculate the field profile of the supported modes of a given structure cross section.
- The mode solver assumes that the cross section of the structure constant along the propagation direction. To set up the mode source, the source should be positioned over the cross section of the waveguide or fiber.
- The mode source settings allow you to specify whether you want to find the mode for a straight or bent waveguide with a given bending radius, and also specify rotation angles to match the angle of the waveguide if the waveguide is not aligned with the x, y, or z-axis.
- You can choose to inject the **fundamental mode** which is the mode with **highest effective index**, or **fundamental TE** or **fundamental TM mode** which correspond to the mode with the highest effective index which has the desired **TE-like** or **TM-like** polarization.
- In FDTD Solutions, **TE-like modes** correspond to modes where the electric field polarization is primarily along the **y-direction** for sources injected along the **x-axis**, and primarily along the x-direction for sources injected in the y or z-axis directions.
- After calculating the modes using the specified mode solver settings, modes will appear in the model list at the top of the window, and you can select a mode from the mode list to plot the field profile of the mode. You can also see details about the calculated mode in the mode list table such as **the effective index** of the mode, **loss**, and **polarization fraction**. The formulae for the **polarization fraction** calculation and **waveguide TE/TM fraction** are calculated as:
- TE polarization fraction (for x-axis injection):
$$\frac{\int\left|E_{y}\right|^2 dydz}{\int\left(\left|E_{y}\right|^2+\left|E_{z}\right|^2\right) dydz}$$
- waveguide TE and TM fraction (for z-axis injection):
$$1-\frac{\int\left|E_{\perp}\right|^2 dxdy}{\int\left(\left|E\right|^2\right) dxdy}$$
$$1-\frac{\int\left|H_{\perp}\right|^2 dxdy}{\int\left(\left|H\right|^2\right) dxdy}$$
- Multifrequency mode calculation option. This option should be used whenever injecting a **broadband mode source**. This will calculate the supported mode profile over the broadband range rather than just at the center frequency of the range.
- Ensure that the **source span is wide enough to completely contain the mode of the structure**. You can visually check this by plotting the field profile and making sure that the field amplitude of the mode decays to 0 around the edges of the source, but another way you can test this is by doing convergence testing by changing the span of the source. Start by calculating the mode, then increasing the span of the mode source and re-calculating the mode, then compare the calculated effective index of the mode between the two different source spans. If the mode source region is wide enough to contain the full mode, the calculated effective index should stay the same when you further increase the source span.

### dipole source

- The dipole source is a point source which emits a dipole radiation pattern. There are 2 types of dipole sources available: electric and magnetic. The electric dipole is equivalent to an oscillating point charge, whereas the magnetic dipole is equivalent to a current loop.

### import source

- The import source allows you to specify a custom field profile to inject. The data for the field profile of the source can come from monitor data measured in a previous simulation, or it could be from another software such as a third-party ray tracing tool. It can also be calculated based on a formula using the script. **You might want to use monitor data from a previous simulation as a source in a subsequent simulation, and this can be done in order to break up a large simulation into two or more simulations.**

## Monitor

### frequency domain field monitor

- Frequency domain field monitors return data in the frequency domain by taking the Fourier transform of the time domain fields. By default, **CW normalization** is applied, which means that the data is also normalized by the spectrum of the source pulse to give the result as though the source spectrum is uniform. In other words, by default, the result from a frequency domain monitor at a given frequency point is the response as though the source is injecting a continuous wave at the specified frequency with amplitude 1.
- There are two available frequency domain field monitors: **the frequency-domain field profile monitor** and **the frequency-domain field and power monitor**. The only difference between the two monitor types is the spatial interpolation method used.
- The profile monitor uses the specified position interpolation and the power monitor uses the nearest mesh cell interpolation method. In most cases, the results from these two monitors will be very similar. We recommend using the **Frequency Domain Field and Power monitor** unless you are an advanced user and have a detailed understanding of the monitor interpolation options.
- If all E and H field components are recorded by the monitor, it’s possible to project the fields from the monitor to get the **far field angular distribution**. This result is something that is calculated as a post-processing step after the simulation has been run, so when you first try to visualize the farfield result of the monitor, if it hasn’t yet been calculated, a window will pop up asking you to select the settings you want to use for the far field projection calculation.

## Analysis group

Analysis groups can contain **structures**, **sources**, and **monitors**, and they are also capable of setting up the properties of these objects using a **setup script**. The **analysis script** is used to collect the results from monitors contained inside the group and calculate new results.

## Lumerical scripting language

### General workflow

- Set up simulation
  - add simulation objects
  - set properties
- Run simulation
- Analyze results

### Common commands

- comment: ##
- end the statement with ;
- put the result on screen ?
    -?set; ## return a list of properties of the selected objects
- layoutmode()
  - 0 No, in analysis mode
  - 1 Yes
- add+'object name'
    -addrect()
    -addplane()
    -addpower()
- select()
- set('property_name', value)
- setnamed('object_name', 'property_name', value) ## same as select + set
- getdata('object_name', 'data_name')
- getresult('object_name', 'dataset_name')
- getelectric() ## advanced command, return $\left|E_{x}\right|^2+\left|E_{y}\right|^2+\left|E_{z}\right|^2$ from the monitor
- transmission() ## return the fraction of power transmitted through the monitor with respect to the source power
- getsweepdata()
- getsweepresult()

## Python API

### import modules

```python
import numpy as np
from numpy.lib.scimath import sqrt ## complex sqrt()
from scipy import constants
import matplotlib.cm as cm
import matplotlib.pyplot as plt
%matplotlib inline
from scipy import interpolate
from collections import OrderedDict
import importlib
## import mplcursors ## for data cursor
## import sys
```

```python
## The default paths for windows
spec = importlib.util.spec_from_file_location(
    'lumapi',
    'D:\\Program Files\\Lumerical\\v202\\api\\python\\lumapi.py')
## Functions that perform the actual loading
lumapi = importlib.util.module_from_spec(spec) ## 
spec.loader.exec_module(lumapi)
```

### start a session

```python
fdtd = lumapi.FDTD() ## an empty instance
fdtd = lumapi.FDTD('instance_name.fsp') ## an existing instance
```

### get help

```python
?fdtd.addrect
help(fdtd.addrect)
```

### simulation objects

#### add and then set

```python
fdtd.addrect()
fdtd.set('name', 'grating_T')
```

#### add and set at the same time

##### set with parameters

```python
fdtd.addfdtd(dimension="2D", x=0.0e-9, y=0.0e-9, x_span=3.0e-6, y_span=1.0e-6)
```

##### set with dict

```python
## order matters
props = OrderedDict([("name", "power1"),("override global monitor settings", True),("x", 0.),("y", 0.4e-6),
                     ("monitor type", "linear x"),("frequency points", 10.0)])
fdtd.addpower(properties=props)
## order doesn't matter
props = {"name": "power2",
         "x" : 0.,
         "y" : 0.4e-6,
          "monitor type" : "linear x"}
fdtd.addpower(properties=props)
```

#### set with loop

```python
""" This function makes is convenient to reconstruct the simulation,
    while changing a few key properties, a brand new FDTD will start
    and close within this function
"""
fdtd = lumapi.FDTD()
fdtd.addcircle()
fdtd.addfdtd()
fdtd.addmesh()
fdtd.addtfsf()

fdtd.addobject("cross_section")
fdtd.set("name", "scat")
fdtd.addobject("cross_section")
fdtd.set("name", "total")

fdtd.addtime()
fdtd.set("name", "time")

fdtd.addprofile()
fdtd.set("name", "profile")

configuration = (
    ("source", (("polarization angle", 0.),
                ("injection axis", "y"),
                ("x", 0.),
                ("y", 0.),
                ("x span", 100.0e-9),
                ("y span", 100.0e-9),
                ("wavelength start", 300.0e-9),
                ("wavelength stop", 400.0e-9))),

    ("mesh", (("dx", 0.5e-9),
              ("dy", 0.5e-9),
              ("x", 0.),
              ("y", 0.),
              ("x span", 110.0e-9),
              ("y span", 110.0e-9))),

    ("FDTD", (("simulation time", 200e-15), ## in seconds
              ("dimension", "2D"),
              ("x",0.0e-9),
              ("y",0.),
              ("z",0.),
              ("x span", 800.0e-9),
              ("y span", 800.0e-9),
              ("mesh refinement", "conformal variant 1"))),

    ("circle", (("x", 0.0e-9),
                ("y", 0.0e-9),
                ("z", 0.0e-9),
                ("radius", 25.0e-9), ## in meters
                ("material", "Ag (Silver) - Palik (0-2um)"))),

    ("scat", (("x", 0.),
              ("y", 0.),
              ("z", 0.),
              ("x span", 110.0e-9),
              ("y span", 110.0e-9))),

    ("total", (("x", 0.),
               ("y", 0.),
               ("z", 0.),
               ("x span", 90.0e-9),
               ("y span", 90.0e-9))),

    ("time", (("x", 28.0e-9),
              ("y", 26.0e-9))),

    ("profile", (("x", 0.),
                 ("y", 0.),
                 ("x span", 90e-9),
                 ("y span", 90e-9),
                 ("override global monitor settings", True),
                 ("use source limits", False),
                 ("frequency points", 1),
                 ("wavelength center", float(profile_monitor_wavelength)),
                 ("wavelength span", 0.))),
)
'''
To set the geometry, we found that it is more efficient and cleaner to use nested tuple, 
however, advanced users may use any ordered collection. 
The order is important if a property depends on the value of another property.
'''
for obj, parameters in configuration:
   for k, v in parameters:
       fdtd.setnamed(obj, k, v)
```

### run, save and close

```python
fdtd.run()
fdtd.save('filename.fsp')
fdtd.close()
```

### deal with data

#### get data

```python
Ex = fdtd.getdata("profile","Ex")
print('Frequency field profile data Ex is type', type(Ex),' with shape', str(Ex.shape ))
```

> Frequency field profile data Ex is type <class 'numpy.ndarray'>  with shape (101, 61, 1, 5)

```python
T, time = fdtd.getresult("power", "T"), fdtd.getresult("time","E")
print('Transmission result T is type', type(T),' with keys', str(T.keys()) )
print('Time monitor result E is type', type(time),' with keys', str(time.keys()) )
```

> Transmission result T is type <class 'dict'>  with keys dict_keys(['lambda', 'f', 'T', 'Lumerical_dataset'])
>
> Time monitor result E is type <class 'dict'>  with keys dict_keys(['t', 'x', 'y', 'z', 'E', 'Lumerical_dataset'])

data is numerical data type, usually numpy array.

dataset is dict type, and should be taken care by

```python
T=T_dataset['T']
```

now T is numpy array type

#### data structure

```python
## get dataset
E = fdtd.getresult("DFT","E")
## electric field
E = E['E']
```

we see here E is a 5-dimension matrix

```python
Ex = E[:,:,0,:,0] ## spatial(x,y,z) ,wavelength, Ex
Ey = E[:,:,0,:,1] ## spatial(x,y,z) ,wavelength, Ey
Ez = E[:,:,0,:,2] ## spatial(x,y,z) ,wavelength, Ez
```

### pass data between python and lumerical

```python
fdtd.putv('var_name',py_var) ## python to lumerical
py_var = fdtd.getv( 'var_name') ## lumerical to python
```

### run lumerical script language

```python
fdtd.eval('x = [0;1;2];y = [0;sqrt(3);0];z = [0;0;0];C = [1,3,2];ds = unstructureddataset(x,y,z,C);')
```

### useful code snippets

```python
## make sure it is a "1d array", numpy type
n = np.array(fdtd.gratingn(mname, size_f)).flatten()
## MATLAB length()
size_n = n.size
## MATLAB zeros(), input should be a tuple
T_grating = np.zeros((size_n, size_m, size_f))
## initialize with data type
grating_S = np.zeros((size_n, size_m, size_f), dtype=np.complex_) 
## MATLAB and Lumerical start from 1, but python starts from 0
## 1 dimension closest value's index
n1 = abs(n - 0).argmin() ## n is an array
## 2 dimension closest values' index
u1i = abs(u1_new - u1[:, np.newaxis]).argmin(axis = 1)
u2i = abs(u2_new - u2[:, np.newaxis]).argmin(axis = 1)
T_nm_new[np.ix_(u1i,u2i)]  = T_nm + 1e-18 ## different with MATLAB
## meshgrid indexing, opposite to MATLAB, but more intuitive
np.meshgrid(u1, u2, indexing='ij')
## real transmitted power
power1 = fdtd.transmission(mname).flatten()
power1 = power1[fpoint] * fdtd.sourcepower(f)
## interp3d method 1
tempX,tempY,tempZ = np.meshgrid(tempx,tempy,tempz,indexing = 'ij')
pts = np.vstack((tempX.flatten(),tempY.flatten(),tempZ.flatten())).transpose()
temp_interp_func = interpolate.RegularGridInterpolator((xt,yt,zt), E2t)
E2t = temp_interp_func(pts).reshape((xt.size,yt.size,zt.size))
## interp3d method 2
tempX, tempY, tempZ = np.meshgrid(tempx, tempy, tempz, indexing='ij')
pts = np.vstack(
    (tempX.flatten(), tempY.flatten(), tempZ.flatten())).transpose()
E2t = interpolate.interpn((xt, yt, zt), E2t, pts).reshape(
    (xt.size, yt.size, zt.size))
```

#### 1d plot

```python
with plt.xkcd():
    fig, ax = plt.subplots(dpi = 100)
    ax.spines['right'].set_visible(False)
    ax.spines['top'].set_visible(False)
##     ax.set_xticks([])
##     ax.set_yticks([])

    ax.plot(lam/1e-6,theta_01, 
            label = "Theta")
    ax.plot(lam/1e-6,phi_01, 
            label = "Phi")

    ax.set_xlim(0.85,1)
    ax.set_ylim(70,91)
    ax.set_xlabel(r'Wavelength ($\mathrm{\mu m}$)')
    ax.set_ylabel("Diffraction angle for "+str(n_target)+","+str(m_target)+") order")
    ax.legend()
```

#### 2d plot with interp2d

```python
## create image
x  = E_image["x"]*1e6 ## data on uniform grid, convert m to um
y  = E_image["y"]*1e6 ## data on uniform grid, convert m to um
Ex = E_image["E"][:,:,0,0,0] ## data on uniform grid, selecting the x-component of first frequency
Ex_abs = abs(Ex)
xi = numpy.linspace(numpy.amin(x),numpy.amax(x),len(x))
yi = numpy.linspace(numpy.amin(y),numpy.amax(y),len(y))
f= interpolate.interp2d(y,x,Ex_abs)
Exi_abs = f(yi, xi)
im = plt.imshow(numpy.transpose(Exi_abs), aspect='equal', interpolation='bicubic', cmap=cm.RdYlGn,
                origin='lower', extent=[xi.min(), xi.max(), yi.min(), yi.max()],
                vmax=Exi_abs.max(), vmin=Exi_abs.min())

plt.colorbar()
plt.xlabel('x (um)')
plt.ylabel('y (um)')

indices=numpy.where(Exi_abs==Exi_abs.max()) ## finding the location of max abs(Ex)
plt.annotate('local max', xy=(xi[indices[0]], yi[indices[1]]), xytext=(0.7, -0.2),
             arrowprops=dict(arrowstyle="->"))


plt.savefig("image_plot.png")
plt.show()
```

#### 2d subplots

```python
Xt, Zt = np.meshgrid(xt, zt, indexing='ij')

with plt.xkcd():
    fig, axes = plt.subplots(1, 2, dpi=100, figsize=(10, 4))
    ax = axes[0]
    ax.spines['right'].set_visible(False)
    ax.spines['top'].set_visible(False)
    p = ax.pcolormesh(Xt * 1e6, Zt * 1e6, E2t, shading='auto')
    cb = fig.colorbar(p, ax=ax)
    ax.set_xlabel('x (microns)')
    ax.set_ylabel('z (microns)')
    ax.set_title("|E|^2 by FDTD at " + str(np.round(lam * 1e9, 3)) + "nm")

    ax = axes[1]
    ax.spines['right'].set_visible(False)
    ax.spines['top'].set_visible(False)
    p = ax.pcolormesh(Xt * 1e6, Zt * 1e6, E2p, shading='auto')
    cb = fig.colorbar(p, ax=ax)
    ax.set_xlabel('x (microns)')
    ax.set_ylabel('z (microns)')
    ax.set_title("|E|^2 by projection at " + str(np.round(lam * 1e9, 3)) +
                 "nm")
    plt.tight_layout()
```

#### custom functions

```python
def addattribute(dataset_name, attribute_name, attribute_data):
    '''
    Help on method addattribute:

    addattribute(dataset_name, attribute_name, attribute_data) method of lumapi.FDTD instance
    Adds an attribute to an existing dataset.
    
    +--------------------------------------+--------------------------------------+
    | Syntax                               | Description                          |
    +--------------------------------------+--------------------------------------+
    | addattribute(R, "a\_name", a)        | Adds the scalar attribute a to the   |
    |                                      | dataset R.                           |
    |                                      |                                      |
    |                                      | See Dataset introduction for details |
    |                                      | about the required dimensions of     |
    |                                      | attribute data.                      |
    +--------------------------------------+--------------------------------------+

    
    See Also
    
    rectilineardataset(), addattribute(), addparameter(), visualize(),
    getparameter(), getattribute(), matrixdataset()
    
    https://kb.lumerical.com/en/ref_scripts_addattribute.html
    '''
    dataset_name[attribute_name] = attribute_data
    if 'attributes' in dataset_name['Lumerical_dataset']:
        item = attribute_name
        item_list = dataset_name['Lumerical_dataset']['attributes']
        if item not in item_list:
            item_list.append(item)
    else:
        dataset_name['Lumerical_dataset']['attributes'] = [attribute_name]

def addparameter(dataset_name, parameter_name, parameter_data):
    '''
    Help on method addparameter:

    addparameter(dataset_name, parameter_name, parameter_data) method of lumapi.FDTD instance
    Adds a parameter to an existing dataset.
    
    +--------------------------------------+--------------------------------------+
    | Syntax                               | Description                          |
    +--------------------------------------+--------------------------------------+
    | addparameter(R, "p\_name", p)        | Adds the parameter p to the existing |
    |                                      | dataset R.                           |
    +--------------------------------------+--------------------------------------+
    
    See Also
    
    rectilineardataset(), addattribute(), addparameter(), visualize(),
    getparameter(), getattribute(), matrixdataset()
    
    https://kb.lumerical.com/en/ref_scripts_addparameter.html
    '''
    dataset_name[parameter_name] = parameter_data
    if 'parameters' in dataset_name['Lumerical_dataset']:
        item = parameter_name
        item_list = dataset_name['Lumerical_dataset']['parameters']
        if item not in item_list:
            item_list.append(item)
    else:
        dataset_name['Lumerical_dataset']['parameters'] = [parameter_name]
```

