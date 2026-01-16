---
layout: project_page
title: "Guess and Guide Zero-Shot Diffusion Guidance"
authors: "Abduragim Shtanchaev<sup>1</sup>, Albina Ilina<sup>1</sup>, Yazid Janati<sup>2</sup>, Badr Moufad<sup>2</sup>, Martin Takáč<sup>1</sup>, Eric Moulines<sup>1,2</sup>"
affiliations: "<sup>1</sup>Mohamed bin Zayed University of Artificial Intelligence &nbsp;&nbsp;&nbsp;&nbsp; <sup>2</sup>École Polytechnique"
venue: "CVPR 2026 (Under Review)"
description: "A computationally efficient, gradient-free framework for zero-shot diffusion guidance that achieves 2x-50x speedup."
paper: "#" 
arxiv: "#"
code: "#"
bibtex: true
permalink: /projects/guess-and-guide/
---

## Abstract

Pretrained diffusion models serve as effective priors for tackling Bayesian inverse problems across domains, from image editing to voice separation and beyond. Current zero-shot methods work by sampling through a chain of posterior distributions, avoiding the need for task-specific retraining. These approaches depend on surrogate likelihoods that demand vector-Jacobian products at each denoising step, creating a substantial computational burden. We introduce a likelihood surrogate that sidesteps this bottleneck entirely. Our method views the guidance process as an optimization procedure that is both simple and efficient to compute, eliminating the need for gradients through the denoiser network. This enables us to handle diverse inverse problems without backpropagation overhead. Experiments confirm that our approach delivers strong consistency with observations and high-quality results across multiple tasks while significantly reducing inference costs, making it the fastest method among competitors.

## Introduction

Inverse problems arise when a signal of interest must be recovered from incomplete, corrupted, or indirect observations—a challenge that pervades fields such as medical imaging, computational photography, and scientific inference. While diffusion models have achieved state-of-the-art performance as priors for these problems, existing zero-shot posterior sampling methods suffer from high computational and memory overhead due to the need for computing gradients through the denoiser network at every step.

**Guess and Guide (G&G)** is a computationally efficient framework that eliminates these bottlenecks by replacing backpropagation with a lightweight optimization procedure applied at selected diffusion steps.

### Main Contributions
- **Gradient-free guidance**: We eliminate backpropagation through the denoiser network by introducing a lightweight optimization procedure, avoiding costly vector-Jacobian products at each sampling step.
- **Two-phase inference**: We propose (1) an initial guess phase that rapidly obtains a high-quality estimate through iterative optimization and re-noising at a fixed timestep, and (2) a guided denoising phase with flexible scheduling that refines this estimate.
- **Efficiency and generality**: G&G achieves high reconstruction quality across diverse tasks while significantly reducing memory usage and inference time (up to 50x speedup).

## Method

Our method decomposes the inference process into two distinct phases, both operating primarily in pixel space to avoid the heavy memory footprint of latent-space gradients.

### Phase 1: Initial Guess (Warm Start)
We begin by obtaining a high-quality initial estimate at a fixed intermediate timestep $t^*$. This phase involves iterative iterations of:
1. **Pixel-space optimization**: Refining the denoised estimate to better fit the observation $y$.
2. **Re-noising**: Pushing the optimized solution back to the noisy manifold.
This "warm start" allows the diffusion process to start closer to the data manifold, significantly accelerating inference.

### Phase 2: Guided Denoising
Starting from the initial guess, we perform a guided reverse diffusion process. At each step, we alternate between:
- **Prior refinement**: Using the pretrained denoiser and diffusion dynamics to maintain realism.
- **Data consistency**: Enforcing fidelity to the observation through optimization in pixel space.

By restricting gradients to the forward operator $A(\cdot)$ and avoiding backpropagation through the U-Net, G&G achieves a **2x to 50x speedup** over existing methods like DPS, DAPS, and Resample.

## Results

We evaluate G&G on several challenging linear and nonlinear inverse problems, including:
- **Linear**: Super-resolution ($\times 4, \times 16$), Inpainting, and Deblurring (Gaussian and Motion).
- **Nonlinear**: JPEG dequantization, Phase Retrieval, and HDR reconstruction.

### Quantitative Comparison
G&G achieves competitive or superior LPIPS scores while being significantly faster and more memory-efficient.

| Task | G&G (Ours) | DPS [3] | DAPS [39] | Runtime Gain |
| :--- | :---: | :---: | :---: | :---: |
| Gaussian Deblur (FFHQ) | **0.17** | 0.16 | 0.19 | **4x faster** |
| Super-Resolution $\times 16$ | **0.35** | 0.36 | 0.45 | **3x faster** |
| JPEG (QF=2) | **0.16** | 0.28 | 0.22 | **5x faster** |

### Key Takeaways
- **Efficiency**: G&G is the fastest method among competitors, requiring as little as 25 seconds for an FFHQ reconstruction where others take over 100 seconds.
- **Generality**: The framework is robust across different diffusion architectures (pixel-space and latent-space) and diverse degradation models.

## Conclusion

We introduced Guess and Guide, a computationally efficient framework for zero-shot diffusion-based inverse problem solving. Our method eliminates backpropagation through denoiser networks by decomposing inference into two phases: a warm-start phase that obtains high-quality initial estimates through iterative optimization and re-noising at a fixed timestep, followed by guided denoising that refines estimates through pixel-space optimization. This achieves at least 2× speedup over gradient-based baselines while maintaining competitive reconstruction quality across diverse linear and nonlinear inverse problems.

## Citation

<div class="nerfies-bibtex" id="bibtex">
<pre><code>@article{shtanchaev2026guess,
  title={Guess and Guide Zero-Shot Diffusion Guidance},
  author={Shtanchaev, Abduragim and Ilina, Albina and Janati, Yazid and Moufad, Badr and Takáč, Martin and Moulines, Eric},
  journal={arXiv preprint},
  year={2026}
}</code></pre>
</div>
