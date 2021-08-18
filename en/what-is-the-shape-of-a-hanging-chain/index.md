# KaTex Test

This a $\KaTeX$ functionality test article.

{{< admonition type=warning title="Warning" open=false >}}
This article is copied from this [page](https://planet-cloud.fun/what-is-the-shape-of-a-hanging-chain/).
{{< /admonition >}}

What is the shape of a hanging chain?

<!--more-->

You may think that the graph of $\cosh{x}$ looks like a parabola, but it is slightly flatter. It is called a catenary, which is the shape formed by a hanging chain.

## Preface

We can find many different "hanging strings" or "hanging chains" in our daily life. When a string has its two ends fixed, the gravity will bend it into a nice convex curve.

{{< image src="https://upload.wikimedia.org/wikipedia/commons/0/04/Kette_Kettenkurve_Catenary_2008_PD.JPG" caption="A hanging chain (Image Source: [Wikipedia](https://en.wikipedia.org/wiki/File:Kette_Kettenkurve_Catenary_2008_PD.JPG))" width="2272" height="1704" >}}

{{< image src="https://upload.wikimedia.org/wikipedia/commons/f/f3/PylonsSunset-5982.jpg" caption="Hanging electric wires (Image Source: [Wikipedia](https://commons.wikimedia.org/wiki/File:PylonsSunset-5982.jpg))" width="2816" height="1872">}}

So here comes the question: what is the expression of this curve? Is it $y=x^2$ or $y=\sin(x)$ or something else?

It turns out the curve has an expression of $y=a\cosh\left(\frac{x}{a}\right)$, which is a hyperbolic function.

{{< admonition type=tip title="Rewind" open=true >}}
Hyperbolic functions are covered in A Level Further Mathematics Pure Core Student Book 2, Chapter 6 - Hyperbolic functions.
{{< /admonition >}}

But how can we derive this result?

## Try to prove it yourself

1. Consider a catenary $y$, select a curve $AB$ on $y$ where point $A$ is the lowest point of $y$ and point $B$ is an arbitrary point on $y$. Show that $y'=\frac{l}{a}$ where $l$ is the length of $AB$ and $a$ is a constant.

2. By considering a very short length of the chain $AB$ or otherwise, show that $l=\int_{0}^{x}\sqrt{1+y'^{2}}\mathrm{d}x$.

3. Show that $y''=\frac{1}{a}\sqrt{1+y'^{2}}$.

4. Given that $y(0)=a$, solve the differential equation $y''=\frac{1}{a}\sqrt{1+y'^{2}}$ and find $y$. (Hint: consider the substitution $y'=p$)

## What is the shape of a hanging chain

### Resolve forces

Assume we have a thin and inextensible chain hangs stationary in the air. Let $A$ be the lowest point of the chain. We select another arbitrary point $B$ and let's consider the chain $AB$. There are $3$ forces acting on the chain $AB$, a horizontal force $F$ to the left acting on point $A$, a force $T$ acting on point $B$ along its tangent and the gravity of the chain $AB$.

{{< image src="./images/catenary.svg" caption="Catenary" title="Catenary" width="80%" height="80%" >}}

{{< admonition type=tip title="Rewind" open=true >}}
How to split a force into components in two perpendicular directions is covered in A Level Mathematics Student Book 2, Chapter 21 - Forces in context, Section 1 - Resolving forces
{{< /admonition >}}

Since chain $AB$ is hanging stationary in the air, the resultant force is zero. Hence we have a pair of simultaneous equations.

$$
\begin{cases}
   F=T\cos(\theta) \\\\ 
   G=T\sin(\theta)
\end{cases}
$$

Dividing these two equations gives us

$$
\begin{aligned}
    \tan(\theta)&=\frac{G}{F} \\\\ 
    &=\frac{mg}{F} \\\\ 
    &=\frac{\rho lg}{F} \\\\ 
    &=\frac{l}{a} \left(\text{where a }=\frac{F}{\rho g}\right)
\end{aligned}
$$

$m$ is the mass of the chain, $\rho$ is the density of the chain, $l$ is the length of the chain, $g$ is the gravitational acceleration. We can measure the value of $F$, $\rho$ and $g$, so we can determine the value of $a$ and it is a constant.

{{< admonition type=question title="Extension question" open=true >}}
How can we measure the value of $F$?
{{< /admonition >}}

Since $\tan(\theta)$ is the tangent to the curve, we can write it as

$$\tan(\theta)=y'=\frac{l}{a}$$

Now we have a differential equation.

$$y'=\frac{l}{a}$$

But what is the length of the chain $AB$?

### Determine the length of a curve

Consider a very short length $\mathrm{d}c$ of our curve $c$, as it is very short, we can approximate it to a straight line.

By the Pythagoras's Theorem, we have

$$\mathrm{d}c^2=\mathrm{d}x^2+\mathrm{d}y^2$$

Divide $\mathrm{d}x^2$ on both side.

$$\left(\frac{\mathrm{d}c}{\mathrm{d}x}\right)^2=1+\left(\frac{\mathrm{d}y}{\mathrm{d}x}\right)^2$$

Then we square root bot side.

$$\frac{\mathrm{d}c}{\mathrm{d}x}=\sqrt{1+\left(\frac{\mathrm{d}y}{\mathrm{d}x}\right)^2}$$

Finally, we integrate both side to get our result.

$$\int_a^b1\\ \mathrm{d}c=\int_a^b\sqrt{1+\left(\frac{\mathrm{d}y}{\mathrm{d}x}\right)^2}\mathrm{d}x$$

So the length of the curve between point $a$ and $b$ is $|c_{ab}|=\int_a^b\sqrt{1+\left(\frac{\mathrm{d}y}{\mathrm{d}x}\right)^2}\mathrm{d}x$.

We have $y'=\frac{l}{a}$ above, and now we know how to calculate the length of the chain.

$$l=\int_{0}^{x}\sqrt{1+y'^{2}}\mathrm{d}x$$

And we get

$$y'=\frac{1}{a}\int_{0}^{x}\sqrt{1+y'^{2}}\mathrm{d}x$$

Next, we different both sides of the equation to get rid of the integral on the right.

$$
\begin{aligned}
    y''=&\frac{1}{a}\left(\int_{0}^{x}\sqrt{1+y'^{2}}\mathrm{d}x\right)' \\\\ 
    =&\frac{1}{a}\sqrt{1+y'^{2}}
\end{aligned}
$$

{{< admonition type=info title="Calculation" open=true >}}
What is the value of $\left(\int_{0}^{x}f(x)\mathrm{d}x\right)'$?

Let $g'(x)=f(x)$.

$$
\begin{aligned}
    \int_{0}^{x}f(x)\mathrm{d}x&=g(x)-g(0) \\\\ 
    \left(\int_{0}^{x}f(x)\mathrm{d}x\right)'&=g'(x) - 0 \\\\ 
    &=f(x)
\end{aligned}
$$
{{< /admonition >}}

### Solve the differential equation

{{< admonition type=tip title="Rewind" open=true >}}
Differential equations are covered in A Level Mathematics Student Book 2, Chapter 13 - Differential equations.
{{< /admonition >}}

$$y''=\frac{1}{a}\sqrt{1+y'^{2}}$$

Now we have a nice differential equation with some initial conditions: $y'(0)=0$; we might as well let $y(0)=a$ is a constant to keep our final result neat.

Let $y'=p$, the original equation turns into

$$\frac{\mathrm{d}p}{\mathrm{d}x}=\frac{1}{a}\sqrt{1+p^2}$$

We then separate the variables, which gives us

$$\frac{\mathrm{d}p}{\sqrt{1+p^2}}=\frac{\mathrm{d}x}{a}$$

Next we integrate both sides.

$$\int\frac{\mathrm{d}p}{\sqrt{1+p^2}}=\int\frac{\mathrm{d}x}{a}$$

Which gives us

$$\sinh^{-1}(p)=\frac{x}{a}+c_1$$

{{< admonition type=info title="Prove $\int\frac{\mathrm{d}p}{\sqrt{1+p^2}}=\sinh^{-1}(p)+c$" open=true >}}

Notice the hyperbolic identity $\cosh^{2}(x)-\sinh^{2}(x)=1$, it is obvious to make a substitution $p=\sinh(u)$.

So we have

$$\frac{\mathrm{d}p}{\mathrm{d}u}=\cosh(u)$$

$$
\begin{aligned}
    \int\frac{\mathrm{d}p}{\sqrt{1+p^2}}&=\int\frac{\cosh(u)\mathrm{d}u}{\sqrt{1+\sinh^{2}(u)}} \\\\ 
    &=\int\frac{\cosh(u)}{\cosh(u)}\mathrm{d}u \\\\ 
    &=\int1\\ \mathrm{d}u \\\\ 
    &=u+c
\end{aligned}
$$

Where we have $u=\sinh^{-1}(p)$, so here we have proved this.

$$\int\frac{\mathrm{d}p}{\sqrt{1+p^2}}=\sinh^{-1}(p)+c$$

{{< /admonition >}}

We have the initial condition that when $x=0$, $p=y'(0)=0$.

$$\sinh^{-1}(0)=0=\frac{0}{a}+c_1$$

Which gives us the value of the constant $c_1=0$.

$$\sinh^{-1}(p)=\frac{x}{a}$$
$$p=\sinh\left(\frac{x}{a}\right)$$

Now we subsitute $p=y'(x)$ back into the equation and integrate both sides again.

$$\frac{\mathrm{d}y}{\mathrm{d}x}=\sinh\left(\frac{x}{a}\right)$$

$$\int1\\ \mathrm{d}y=\int\sinh\left(\frac{x}{a}\right)\mathrm{d}x$$

Which gives us
$$y=\frac{1}{a}\cosh\left(\frac{x}{a}\right)+c_2$$

Use our initial condition $y(0)=a$

$$y(0)=a\cosh\left(\frac{0}{a}\right)+c_2=a$$

So we get the value of $c_2=0$ as well.

The final expression for the curve of the hanging chain is

$$y=a\cosh\left(\frac{x}{a}\right)$$

## Extension problem

We made an assumption for our model: the chain is thin, inextensible with uniform density. What if the chain is extensible? Or nonuniform? How will these conditions change the result?

