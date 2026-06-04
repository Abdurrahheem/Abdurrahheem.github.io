---
layout: project_page
title: "Guess & Guide: Gradient-Free Zero-Shot Diffusion Guidance"
authors: "Abduragim Shtanchaev<sup>1</sup>, Albina Ilina<sup>1</sup>, Yazid Janati<sup>2</sup>, Arip Asadulaev<sup>1</sup>, Martin Takáč<sup>1</sup>, Eric Moulines<sup>1,2</sup>"
affiliations: "<sup>1</sup>Mohamed bin Zayed University of Artificial Intelligence &nbsp;&nbsp;&nbsp;&nbsp; <sup>2</sup>École Polytechnique"
venue: "ReALM-GEN 2026 (ICLR Workshop) / arXiv:2603.07860"
description: "A backpropagation-free framework for Bayesian inverse problems that avoids denoiser and decoder VJPs while preserving reconstruction quality."
paper: "https://arxiv.org/pdf/2603.07860"
arxiv: "https://arxiv.org/abs/2603.07860"
bibtex: true
permalink: /projects/guess-and-guide/
images:
  compare: true
---

<div style="text-align: center; margin-bottom: 2rem;">
  <img src="/assets/img/guess_and_guide/Drawing.jpg" alt="Guess and Guide Overview" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
</div>

<section class="gng-examples" aria-labelledby="gng-example-restorations">
  <h2 id="gng-example-restorations">Example Restorations</h2>
  <p class="gng-examples-intro">Move each divider to compare the degraded observation with the Guess and Guide reconstruction.</p>

  <div class="gng-comparison-grid">
    <figure class="gng-comparison-item">
      <img-comparison-slider tabindex="0">
        <figure slot="first" class="gng-comparison-panel gng-comparison-before">
          <img src="{{ '/assets/img/guess_and_guide/comparisons/blur_degraded.png' | relative_url }}" alt="Gaussian deblur degraded observation">
          <figcaption>Degraded</figcaption>
        </figure>
        <figure slot="second" class="gng-comparison-panel gng-comparison-after">
          <img src="{{ '/assets/img/guess_and_guide/comparisons/blur_restored.png' | relative_url }}" alt="Gaussian deblur Guess and Guide restoration">
          <figcaption>Restored</figcaption>
        </figure>
      </img-comparison-slider>
      <figcaption class="gng-task-caption">Gaussian deblur</figcaption>
    </figure>

    <figure class="gng-comparison-item">
      <img-comparison-slider tabindex="0">
        <figure slot="first" class="gng-comparison-panel gng-comparison-before">
          <img src="{{ '/assets/img/guess_and_guide/comparisons/inpainting_degraded.png' | relative_url }}" alt="Center inpainting degraded observation">
          <figcaption>Degraded</figcaption>
        </figure>
        <figure slot="second" class="gng-comparison-panel gng-comparison-after">
          <img src="{{ '/assets/img/guess_and_guide/comparisons/inpainting_restored.png' | relative_url }}" alt="Center inpainting Guess and Guide restoration">
          <figcaption>Restored</figcaption>
        </figure>
      </img-comparison-slider>
      <figcaption class="gng-task-caption">Center inpainting</figcaption>
    </figure>

    <figure class="gng-comparison-item">
      <img-comparison-slider tabindex="0">
        <figure slot="first" class="gng-comparison-panel gng-comparison-before">
          <img src="{{ '/assets/img/guess_and_guide/comparisons/sr4_degraded.png' | relative_url }}" alt="Super-resolution x4 degraded observation">
          <figcaption>Degraded</figcaption>
        </figure>
        <figure slot="second" class="gng-comparison-panel gng-comparison-after">
          <img src="{{ '/assets/img/guess_and_guide/comparisons/sr4_restored.png' | relative_url }}" alt="Super-resolution x4 Guess and Guide restoration">
          <figcaption>Restored</figcaption>
        </figure>
      </img-comparison-slider>
      <figcaption class="gng-task-caption">Super-resolution x4</figcaption>
    </figure>

    <figure class="gng-comparison-item">
      <img-comparison-slider tabindex="0">
        <figure slot="first" class="gng-comparison-panel gng-comparison-before">
          <img src="{{ '/assets/img/guess_and_guide/comparisons/jpeg2_degraded.png' | relative_url }}" alt="JPEG QF 2 degraded observation">
          <figcaption>Degraded</figcaption>
        </figure>
        <figure slot="second" class="gng-comparison-panel gng-comparison-after">
          <img src="{{ '/assets/img/guess_and_guide/comparisons/jpeg2_restored.png' | relative_url }}" alt="JPEG QF 2 Guess and Guide restoration">
          <figcaption>Restored</figcaption>
        </figure>
      </img-comparison-slider>
      <figcaption class="gng-task-caption">JPEG QF=2</figcaption>
    </figure>
  </div>
</section>

## Abstract

Pretrained diffusion models are strong priors for Bayesian inverse problems, but many zero-shot posterior-sampling methods require vector-Jacobian products through the denoiser at each denoising step. Guess & Guide (G&G) replaces this expensive guidance with a lightweight likelihood surrogate and sparse pixel-space optimization. This removes backpropagation through the denoiser, and through the encoder-decoder in latent diffusion settings, while maintaining strong reconstruction quality across diverse inverse problems.

## Introduction

Inverse problems arise when a signal must be recovered from incomplete, corrupted, or indirect observations. In Bayesian inverse problems, a measurement $\mathbf{y} = \mathcal{A}(\mathbf{x}) + n$ is combined with a prior over plausible clean signals. Diffusion models provide powerful priors for this setting because they can generate realistic samples without retraining for every degradation operator.

The main bottleneck is guidance. Existing zero-shot diffusion solvers often approximate the posterior score with likelihood terms that require vector-Jacobian products through the denoiser, and sometimes through the latent encoder-decoder. **Guess & Guide (G&G)** avoids this cost by separating learned prior refinement from data-consistency enforcement.

### Main Contributions
- **Backpropagation-free generative guidance**: G&G avoids VJPs through the denoiser and encoder-decoder, using gradients only through the forward operator $\mathcal{A}$ during explicit data-consistency optimization.
- **Two-phase inference**: A fixed-$t_*$ warm-start phase produces an initial guess through denoise-optimize-renoise iterations, then a sparse guided-denoising phase refines it at selected timesteps.
- **Broad inverse-problem coverage**: The method is evaluated on FFHQ, ImageNet, and FFHQ latent-diffusion experiments across linear and nonlinear tasks including deblurring, super-resolution, inpainting, JPEG restoration, phase retrieval, and HDR reconstruction.

## Method

G&G decomposes posterior sampling into two phases. The key design choice is to keep the diffusion prior forward-only, while enforcing measurement consistency with lightweight optimization outside the denoiser.

### Phase 1: Initial Guess (Warm Start)
G&G first seeks an approximate sample at a fixed intermediate timestep $t_*$. Each warm-start iteration:
1. denoises the current state and decodes it to image space,
2. optimizes the image to better match the observation under $\mathcal{A}$,
3. encodes and re-noises the optimized image back to the same timestep.

This creates a useful posterior-informed starting point and avoids running a full guided reverse process from pure noise.

### Phase 2: Guided Denoising
Starting from the warm-start sample, G&G follows a sparse grid of timesteps. At each selected timestep, it alternates between:
- **Prior refinement**: forward-only denoising and diffusion transitions preserve realism.
- **Data consistency**: pixel-space optimization pulls the reconstruction toward the observation.
- **Re-noising**: the optimized estimate is returned to the noisy trajectory before continuing.

The guidance schedule concentrates optimization around intermediate noise levels, where the denoiser can still correct optimization artifacts while the sample already carries useful structure.

## Results

G&G is evaluated on both pixel-space and latent-space diffusion models. The main paper reports LPIPS as the primary metric, with PSNR and SSIM in the supplementary material.

### FFHQ Pixel-Space Results
Lower LPIPS is better. The table below summarizes representative FFHQ results from the main paper.

<div class="gng-results-table-wrap">
  <table class="gng-results-table">
    <thead>
      <tr>
        <th>Task</th>
        <th>G&amp;G</th>
        <th>DAPS</th>
        <th>DPS</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Gaussian Deblur</td>
        <td>0.17 &plusmn; 0.06</td>
        <td>0.19 &plusmn; 0.06</td>
        <td><strong>0.16 &plusmn; 0.05</strong></td>
      </tr>
      <tr>
        <td>Motion Deblur</td>
        <td><strong>0.13 &plusmn; 0.04</strong></td>
        <td>0.19 &plusmn; 0.06</td>
        <td>0.21 &plusmn; 0.06</td>
      </tr>
      <tr>
        <td>Super-Resolution &times;4</td>
        <td>0.20 &plusmn; 0.07</td>
        <td><strong>0.19 &plusmn; 0.06</strong></td>
        <td>0.22 &plusmn; 0.07</td>
      </tr>
      <tr>
        <td>Super-Resolution &times;16</td>
        <td><strong>0.35 &plusmn; 0.08</strong></td>
        <td>0.45 &plusmn; 0.10</td>
        <td>0.36 &plusmn; 0.08</td>
      </tr>
      <tr>
        <td>Box Inpainting</td>
        <td>0.14 &plusmn; 0.04</td>
        <td><strong>0.12 &plusmn; 0.04</strong></td>
        <td>0.20 &plusmn; 0.08</td>
      </tr>
      <tr>
        <td>JPEG (QF=2)</td>
        <td><strong>0.16 &plusmn; 0.06</strong></td>
        <td>0.22 &plusmn; 0.07</td>
        <td>0.28 &plusmn; 0.07</td>
      </tr>
    </tbody>
  </table>
</div>

### Key Takeaways
- **Efficiency**: On FFHQ pixel-space experiments, G&G uses 1983 MB and 25 seconds, compared with DPS at 3309 MB and 105 seconds. In FFHQ latent-diffusion experiments, G&G reports 24 seconds compared with 509 seconds for ReSample and 1254 seconds for DAPS.
- **Quality-speed tradeoff**: G&G is best or second-best on most FFHQ pixel-space tasks while being the fastest method in the reported tables.
- **Generality**: The same inference framework is used across linear and nonlinear inverse problems, including latent diffusion settings where avoiding encoder-decoder VJPs is especially important.

## Limitations

The choice of the warm-start timestep $t_*$ and the spacing of guided timesteps are important. Starting too early increases runtime without clear quality gains, while starting too late can produce artifacts because the denoiser has less opportunity to correct the optimized estimate.

## Conclusion

Guess & Guide is a computationally efficient framework for zero-shot diffusion-based inverse problem solving. It replaces dense denoiser-gradient guidance with a two-phase procedure: a fixed-timestep warm start and sparse scheduled pixel-space guidance. This yields faster and more memory-efficient inference while maintaining competitive reconstruction quality across FFHQ, ImageNet, and latent-diffusion experiments.

## Citation

<div class="nerfies-bibtex" id="bibtex">
<pre><code>@article{shtanchaev2026guess,
  title={Guess \& Guide: Gradient-Free Zero-Shot Diffusion Guidance},
  author={Shtanchaev, Abduragim and Ilina, Albina and Janati, Yazid and Asadulaev, Arip and Takáč, Martin and Moulines, Eric},
  journal={arXiv preprint arXiv:2603.07860},
  year={2026}
}</code></pre>
</div>
