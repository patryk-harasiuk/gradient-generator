# React Gradient Generator

Create gradients that you can use in your CSS

<div align="center">
  <img src="https://img.shields.io/badge/react-blue" />
  <img src="https://img.shields.io/badge/typescript-blue" />
  <img src="https://img.shields.io/badge/chromajs-green" />
  <img src="https://img.shields.io/badge/pnpm-blue" />
</div>

Change available options until you generate gradient you like. You can increase precision (the number of in-between colors), change angle and manipulate color-stops (the position of where colors start transitioning from one to the next) using bezier-curve.

<div style="display: flex; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/e194e177-1aaf-4492-b82f-c9cb20437c60"
       style="height: 300px; width: auto; object-fit: cover;" />
  <img src="https://github.com/user-attachments/assets/675ba18f-295d-4879-a9e9-9d50b189e759"
       style="height: 300px; width: auto; object-fit: cover;" />
</div>

## The "gray dead zone"

I also tried to eliminate the desaturated midsection of gradient that often happens when combining different colors.
When using RBG color space we are taking the average of three R/G/B channels: Red, Green, Blue

We can use different color channels, for example, HSL (hue-saturation-lightness) and then the start and end colors share the same saturation and lightness parameters and hue is changed

I used yet another color mode - HCL, which is more suitable for human vision.

## TODO

- add generating random gradients on click
- add option to change between different color modes - RGB, HSL etc
