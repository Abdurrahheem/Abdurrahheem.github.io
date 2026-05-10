---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
_styles: |
  .pubs-page {
    --pub-card-bg: var(--global-card-bg-color);
    --pub-muted: var(--global-text-color-light);
    --pub-border: var(--global-divider-color);
    --pub-link-bg: var(--global-code-bg-color);
    --pub-link-hover-bg: rgba(0, 113, 227, 0.08);
    max-width: 920px;
    margin: 0 auto;
    padding-bottom: 2rem;
  }

  body {
    padding-bottom: 0;
  }

  footer.fixed-bottom {
    position: static;
    margin-top: 2rem;
  }

  .pubs-heading {
    margin: 0 0 1.5rem;
    color: var(--pub-muted);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .pub-card {
    display: flex;
    align-items: center;
    gap: 1.75rem;
    padding: 1.4rem;
    margin-bottom: 1rem;
    background: var(--pub-card-bg);
    border: 1px solid var(--pub-border);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition:
      box-shadow 0.25s ease,
      transform 0.25s ease,
      border-color 0.25s ease;
  }

  .pub-card:hover {
    border-color: var(--global-theme-color);
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
  }

  .pub-thumb {
    flex: 0 0 180px;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid var(--pub-border);
    background: var(--pub-link-bg);
  }

  .pub-thumb img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  .pub-card:hover .pub-thumb img {
    transform: scale(1.035);
  }

  .pub-body {
    flex: 1 1 auto;
    min-width: 0;
  }

  .pub-title {
    display: inline;
    color: var(--global-text-color);
    font-size: 1.06rem;
    font-weight: 700;
    line-height: 1.45;
  }

  .pub-title:hover {
    color: var(--global-theme-color);
    text-decoration: none;
  }

  .pub-authors {
    margin-top: 0.45rem;
    color: var(--pub-muted);
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .pub-authors strong {
    color: var(--global-text-color);
    font-weight: 600;
  }

  .pub-venue {
    margin-top: 0.35rem;
    color: var(--pub-muted);
    font-size: 0.88rem;
    font-weight: 600;
  }

  .pub-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.75rem;
  }

  .pub-link {
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    padding: 0.28rem 0.72rem;
    color: var(--pub-muted);
    background: var(--pub-link-bg);
    border: 1px solid var(--pub-border);
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1.2;
    text-decoration: none;
    transition:
      color 0.2s ease,
      background-color 0.2s ease,
      border-color 0.2s ease;
  }

  .pub-link:hover {
    color: var(--global-theme-color);
    background: var(--pub-link-hover-bg);
    border-color: var(--global-theme-color);
    text-decoration: none;
  }

  .pub-link i {
    font-size: 0.86rem;
  }

  .pub-link--disabled {
    opacity: 0.55;
    cursor: default;
  }

  .pub-link--disabled:hover {
    color: var(--pub-muted);
    background: var(--pub-link-bg);
    border-color: var(--pub-border);
  }

  @media (max-width: 700px) {
    .pub-card {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
      padding: 1rem;
    }

    .pub-thumb {
      flex-basis: auto;
      width: 100%;
    }
  }
---

<!-- _pages/publications.md -->

<div class="pubs-page">
  <h2 class="pubs-heading">Selected Publications</h2>

  <article class="pub-card">
    <div class="pub-thumb">
      <img src="{{ '/assets/img/guess_and_guide/Drawing.jpg' | relative_url }}" alt="Guess and Guide preview">
    </div>
    <div class="pub-body">
      <a class="pub-title" href="{{ '/projects/guess-and-guide/' | relative_url }}">Guess and Guide Zero-Shot Diffusion Guidance (under review)</a>
      <div class="pub-authors"><strong>Abduragim Shtanchaev</strong>, Albina Ilina, Yazid Janati, Badr Maufad, Martin Takac, Eric Moulines</div>
      <div class="pub-venue">CVPR 2026</div>
      <div class="pub-links">
        <a class="pub-link" href="{{ '/projects/guess-and-guide/' | relative_url }}"><i class="fa-solid fa-globe"></i>Project</a>
        <span class="pub-link pub-link--disabled"><i class="fa-solid fa-file-pdf"></i>Paper</span>
        <span class="pub-link pub-link--disabled"><i class="fa-brands fa-github"></i>Code</span>
      </div>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-thumb">
      <img src="{{ '/assets/img/publication_preview/y-shaped-generative-flows.png' | relative_url }}" alt="Y-shaped generative flows preview">
    </div>
    <div class="pub-body">
      <a class="pub-title" href="https://arxiv.org/pdf/2510.11955">Y-shaped Generative Flows (under review)</a>
      <div class="pub-authors">Arip Asadulaev, Semyon Semenov*, <strong>Abduragim Shtanchaev</strong>*, Eric Moulines, Fakhri Karray, Martin Takac</div>
      <div class="pub-venue">ICLR 2026</div>
      <div class="pub-links">
        <a class="pub-link" href="https://arxiv.org/pdf/2510.11955"><i class="fa-solid fa-file-pdf"></i>Paper</a>
      </div>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-thumb">
      <img src="{{ '/assets/img/publication_preview/cagfn-mrna-generation.png' | relative_url }}" alt="Curriculum-augmented GFlowNets preview">
    </div>
    <div class="pub-body">
      <a class="pub-title" href="https://www.arxiv.org/pdf/2510.03811">Curriculum-Augmented GFlowNets For mRNA Sequence Generation (under review)</a>
      <div class="pub-authors">Aya Laajil, <strong>Abduragim Shtanchaev</strong>, Sajan Muhammad, Eric Moulines, Salem Lahlou</div>
      <div class="pub-venue">ICLR 2026</div>
      <div class="pub-links">
        <a class="pub-link" href="https://www.arxiv.org/pdf/2510.03811"><i class="fa-solid fa-file-pdf"></i>Paper</a>
      </div>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-thumb">
      <img src="{{ '/assets/img/publication_preview/all-languages-included.png' | relative_url }}" alt="All Languages Matter preview">
    </div>
    <div class="pub-body">
      <a class="pub-title" href="https://arxiv.org/pdf/2411.16508">All Languages Matter: Evaluating LMMs on Culturally Diverse 100 Languages</a>
      <div class="pub-authors">Ashmal Vayani, Dinura Dissanayake, ..., <strong>Abduragim Shtanchaev</strong>, ...</div>
      <div class="pub-venue">CVPR 2025</div>
      <div class="pub-links">
        <a class="pub-link" href="https://mbzuai-oryx.github.io/ALM-Bench/"><i class="fa-solid fa-globe"></i>Project</a>
        <a class="pub-link" href="https://arxiv.org/pdf/2411.16508"><i class="fa-solid fa-file-pdf"></i>Paper</a>
      </div>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-thumb">
      <img src="{{ '/assets/img/publication_preview/extract-more-from-less.png' | relative_url }}" alt="Extract More from Less preview">
    </div>
    <div class="pub-body">
      <a class="pub-title" href="https://arxiv.org/pdf/2406.19814">Extract More from Less</a>
      <div class="pub-authors">Dmitry Demidov, <strong>Abduragim Shtanchaev</strong>, Mihail Mihaylov, Mohammad Almansoori</div>
      <div class="pub-venue">BMVC 2024</div>
      <div class="pub-links">
        <a class="pub-link" href="https://arxiv.org/pdf/2406.19814"><i class="fa-solid fa-file-pdf"></i>Paper</a>
      </div>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-thumb">
      <img src="{{ '/assets/img/publication_preview/opencv-chatgpt-cover.jpg' | relative_url }}" alt="OpenCV ChatGPT blog preview">
    </div>
    <div class="pub-body">
      <a class="pub-title" href="https://www.opencv.ai/blog/getting-the-hang-of-opencvs-inner-workings-with-chatgpt">Getting the Hang of OpenCV's Inner Workings with ChatGPT</a>
      <div class="pub-authors"><strong>Abduragim Shtanchaev</strong></div>
      <div class="pub-venue">OpenCV, 2023</div>
      <div class="pub-links">
        <a class="pub-link" href="https://www.opencv.ai/blog/getting-the-hang-of-opencvs-inner-workings-with-chatgpt"><i class="fa-solid fa-newspaper"></i>Blog</a>
      </div>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-thumb">
      <img src="{{ '/data/images/train-detector/objects-of-different-scales.jpeg' | relative_url }}" alt="Object detection preview">
    </div>
    <div class="pub-body">
      <a class="pub-title" href="{{ '/algorithm/How-to-Train-Detectors-Properly/' | relative_url }}">A Recipe to Train Object Detection Models</a>
      <div class="pub-authors"><strong>Abduragim Shtanchaev</strong></div>
      <div class="pub-venue">Blog, 2021</div>
      <div class="pub-links">
        <a class="pub-link" href="{{ '/algorithm/How-to-Train-Detectors-Properly/' | relative_url }}"><i class="fa-solid fa-newspaper"></i>Blog</a>
      </div>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-thumb">
      <img src="{{ '/assets/img/publication_preview/ad-recall-prediction.png' | relative_url }}" alt="Ad recall prediction preview">
    </div>
    <div class="pub-body">
      <a class="pub-title" href="https://psyarxiv.com/csv5d/">Multimodal Ad Recall Prediction Based on Viewer's and Ad Features</a>
      <div class="pub-authors">Mariya Malygina, <strong>Abduragim Shtanchaev</strong>, Marina Churikova, Olga Perepelkina</div>
      <div class="pub-venue">PsyArXiv, 2020</div>
      <div class="pub-links">
        <a class="pub-link" href="https://psyarxiv.com/csv5d/"><i class="fa-solid fa-file-lines"></i>Paper</a>
      </div>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-thumb">
      <img src="{{ '/assets/img/publication_preview/tree-crown-classification.png' | relative_url }}" alt="Forest inventory preview">
    </div>
    <div class="pub-body">
      <a class="pub-title" href="https://arxiv.org/abs/2110.08590">Automated Remote Sensing Forest Inventory Using Satellite Imagery</a>
      <div class="pub-authors"><strong>Abduragim Shtanchaev</strong>, Artur Bille, Olga Sutyrina, Sara Elelimy</div>
      <div class="pub-venue">IAC, 2020</div>
      <div class="pub-links">
        <a class="pub-link" href="https://arxiv.org/abs/2110.08590"><i class="ai ai-arxiv"></i>arXiv</a>
      </div>
    </div>
  </article>

  <article class="pub-card">
    <div class="pub-thumb">
      <img src="{{ '/data/images/camera-trajectory-estimation/trajectory.jpg' | relative_url }}" alt="Camera trajectory preview">
    </div>
    <div class="pub-body">
      <a class="pub-title" href="{{ '/algorithm/Camera-Trajectory-Estimation/' | relative_url }}">Camera Trajectory Estimation</a>
      <div class="pub-authors"><strong>Abduragim Shtanchaev</strong></div>
      <div class="pub-venue">Blog, 2020</div>
      <div class="pub-links">
        <a class="pub-link" href="{{ '/algorithm/Camera-Trajectory-Estimation/' | relative_url }}"><i class="fa-solid fa-newspaper"></i>Blog</a>
      </div>
    </div>
  </article>
</div>
