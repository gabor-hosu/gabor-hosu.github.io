---
title: "Particle Swarm: Optimizing Material Design of Bridges"
description: "Designing efficient bridge structures is a challenging task that requires balancing material use with safety and stability. Because many possible designs exist, finding the best solution can be difficult. Particle Swarm Optimization is a powerful technique that helps engineers explore a wide range of design options and discover more efficient bridge structures."
coverImage:
  url: "./images/pso/bridge.jpg"
date:
  end: "2026-02-12"
tags: ["Swarm Intelligence", "PSO"]
---

## Introduction

During my Swarm Intelligence class at first semester of Data Analysis and Modelling master's of UBB, I with two of my groupmates explored the application of the particle swarm optimization (PSO) technique. This blog post is based on our class work.

## Material Design Optimization

Designing truss structures is one of the classic challenges in structural engineering. Engineers must carefully balance competing goals: reducing material use and cost while ensuring the structure remains strong, stable, and visually appealing. From the frameworks that support large roofs to the bridges we cross every day, truss designs play a vital role in modern construction.

![Struss structure of a bridge.](./images/pso/bridge.jpg)

Our group had to present the PSO method with one specific, related application. After some reasearch we found [this paper](https://www.researchgate.net/publication/261688919_IMPROVED_PSO_ALGORITHM_FOR_SHAPE_AND_SIZING_OPTIMIZATION_OF_TRUSS_STRUCTURE), where a specific struss structure was optimized. This optimization problem and its solution will presented in the next.

## Problem Formulation

We have the following 37-bar bridge, which we want to optimize with respect to the total amount of material:

![37-bar bridge: the blue nodes are fixed, the green force is pulling the bottom of the bridge.](./images/pso/original_bridge.png)

where

- the $\color{blue}{1, 20}$ blue nodes are fixed;
- a constant $\color{green}{P = 10 \text{ kN}}$ force is pulling the bottom $\color{red}{2, 4, 6, 8, 10, 12, 14, 16, 18}$ nodes;
- during the shaping the bridge the top $\color{red}{3, 5, 7, 9, 11, 13, 15, 17, 19}$ nodes are fixed horizontally;
- the bars have same density, only the area of there cross-section can be changed during the design process;
- the bridge must be symmetric to the middle $(27)$ bar;
- we also want to the bridge be stable.

So, in simple terms, we want to find a better form of the $37$-bar bridge using minimal amount of material, for which the previous constraint are applied.

### Parameters of the objective function

![37-bar bridge: parameters highlighted with orange and yellow.](./images/pso/original_bridge_highlight.png)

So far we know, due to the structure's symmetry, that the following $24$ parameter can change freely:

$$
    \left[
      \begin{array}{l}
        \textcolor{#FFCC00}{A_1}, \textcolor{#FFCC00}{A_3}, \textcolor{#FFCC00}{A_5}, \textcolor{#FFCC00}{A_7}, \textcolor{#FFCC00}{A_9}, \textcolor{#FFCC00}{A_{11}}, \textcolor{#FFCC00}{A_{13}}, \textcolor{#FFCC00}{A_{15}}, \textcolor{#FFCC00}{A_{17}}, \textcolor{#FFCC00}{A_{19}}, \\
        \textcolor{#FFCC00}{A_{21}}, \textcolor{#FFCC00}{A_{23}}, \textcolor{#FFCC00}{A_{25}}, \textcolor{#FFCC00}{A_{27}}, \textcolor{#FFCC00}{A_{29}}, \textcolor{#FFCC00}{A_{31}}, \textcolor{#FFCC00}{A_{33}}, \textcolor{#FFCC00}{A_{35}}, \textcolor{#FFCC00}{A_{37}}, \\
        \textcolor{orange}{y_3}, \textcolor{orange}{y_5}, \textcolor{orange}{y_7}, \textcolor{orange}{y_9}, \textcolor{orange}{y_{11}}
      \end{array}
    \right]
$$

where $\textcolor{#FFCC00}{A_i}$ the corss-section area of the $\textcolor{#FFCC00}{i}$'th bar, and $\textcolor{orange}{y_j}$ is the $y$-coordinate of the $\textcolor{orange}{j}$'th node.

### Material amount and stability constraints

Next, we need to find the objective function, which we want to minimize, and the stability constraints.

If the constant density of the used material is $\rho$, then the amount of material we need to use is

$$
  \sum_{i} \rho A_i l_i = \rho \sum_{i} A_i l_i
$$

where $l_i$ is the length of the $i$'th bar.

We also consider the stability constraints of the optimized structure:

1. we don't want to break any individual bar, so for $i$'th bar must hold
   $$
    \begin{align*}
      \sigma_{\min} \leq \frac{FN_i}{A_i} \leq \sigma_{\max}
    \end{align*}
   $$
   where $FN_i$ is the axial force on the $i$'th bar, so the stress on an bar must stay in the $[\sigma_{\min}, \sigma_{\max}]$ range;
2. and we don't want to much total deformations, so

   $$
    \begin{align*}
      \sum_{i} \frac{|FN_i|\cdot |FL_i| \cdot l_i}{E\cdot A_i} \leq D_{\max}.
    \end{align*}
   $$

   where
   - $FN_i$ is the axial force on the $i$'th bar produced by the load-force $P$;
   - $FL_i$ is the axial force on the $i$'th bar produced by the a unit load (this comes from the a practical trick to derive the deflection, it depends on the nodes, where the unit load was attached);
   - $E$ is the elastic modulus of the material, from the bridge was built.

The condition above is useful generally in case of hand-calculations. Using finite element method we can rewrite it as

$$
  u_{\max} \leq D_{\max}
$$

where $u_{\max}$ is the magnitude of the maximal displacements across all nodes.

### Quality objective function

So we want to minimize the total amount of material used and cosidering the _1._ and _2._ constraints. By choosing a previously fixed $M > 0$ quantity and

$$
  \lambda = \begin{cases}
    0, \text{ if the constraints hold},\\
    1, \text{ otherwise}
  \end{cases}
$$

we can include the conditions, by adding an extra $+\lambda M$ punishing term to the material amount. So we get the

$$
  W := \rho \sum_{i} A_i l_i + \lambda M
$$

"quality" objective function, which we want to minimize.

For the sanity check: $W$ depends directly on $A_i$ cross-sectional areas, and $y_j$ through the $l_j$ bar-lengths. So $24$ previously choosen parameters are correct.

### Problems with the objective function

Our $W$ objective function only lives in $\mathbb{R}^{24}$, but due to the constraints ($+\lambda M$ conditional term), the $W$ is a non-continuous, so a non-smooth function. Therefor the gradient based methods don't work.

These type of problems usually motivate the use of some metaheuristics, such as swarm intelligent based optimization methods.

## Particle Swarm Optimization

### Intuition and motivation

### Variants of PSO

### Why does it work?

## Solution of the Problem

### Hyperparams

### Fuzzy inertia weighting

### Extra randomness

## Final Thoughts
