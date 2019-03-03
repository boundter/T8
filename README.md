# T8

This is a rework of an experiment for the introductory lab at the University of
Potsdam. It consists of the manual in LaTeX, including some figures in Python,
and a simulation in JavaScript. A given number of particles under the influence
of Brownian motion are animated and their displacement is compared to a normal
distribution.

## Used Tools
- LaTeX
- Python
  - numpy to generate random numbers
  - matplotlib for the plotting of the figures in the manual
- JavaScript
  - Charts.js for the dynamic plotting in the simulation
  
## Applet

The JS-Applet can be opened by opening ```simulations/index.html``` in a modern browser. 

There are three parameters that can be changed. The number of particles, the duration and the number of collisions per second.
Changing the number of collisions is equivalent to increasing the duration. It is measured in 30 collissions per second.
