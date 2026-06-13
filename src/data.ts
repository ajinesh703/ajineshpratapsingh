// ============================================
// NeuralPulse — Data Store
// ============================================

import type { NewsArticle, ResearchItem, ResearchPaper } from './types';

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-featured',
    title: 'GPT-5 Achieves Human-Level Reasoning on Complex Scientific Benchmarks',
    excerpt:
      "OpenAI's latest model demonstrates unprecedented capabilities in multi-step scientific reasoning, surpassing human experts on several key benchmarks for the first time.",
    category: 'Generative AI',
    date: 'June 13, 2026',
    readTime: '5 min read',
    featured: true,
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8h2m2 0h2m2 0h2M7 11h6"/></svg>`,
  },
  {
    id: 'news-2',
    title: "DeepMind's RT-3 Enables Robots to Learn Tasks from Single Demonstrations",
    excerpt:
      'A breakthrough in few-shot robotic learning that could revolutionize manufacturing and household automation.',
    category: 'Robotics',
    date: 'June 12, 2026',
    readTime: '4 min read',
    featured: false,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  },
  {
    id: 'news-3',
    title: 'Meta Releases SAM 3: Real-Time 3D Scene Understanding from Video',
    excerpt:
      'The third generation Segment Anything Model brings real-time 3D spatial understanding to consumer hardware.',
    category: 'Computer Vision',
    date: 'June 11, 2026',
    readTime: '3 min read',
    featured: false,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  },
  {
    id: 'news-4',
    title: 'New Mixture-of-Experts Architecture Cuts LLM Inference Cost by 80%',
    excerpt:
      'Researchers propose a dynamic routing mechanism that dramatically reduces compute while maintaining performance.',
    category: 'NLP',
    date: 'June 10, 2026',
    readTime: '6 min read',
    featured: false,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="9" y1="7" x2="16" y2="7"/><line x1="9" y1="11" x2="14" y2="11"/></svg>`,
  },
];

export const researchItems: ResearchItem[] = [
  {
    id: 'research-1',
    title: 'Scaling Laws for Sparse Transformers: Efficiency Without Compromise',
    excerpt:
      'This study establishes new scaling laws for sparse transformer architectures, showing that structured sparsity can achieve performance parity with dense models at a fraction of the compute cost.',
    category: 'llm',
    date: 'June 2026',
    source: 'Google DeepMind',
    tags: ['Transformers', 'Sparsity', 'Efficiency'],
  },
  {
    id: 'research-2',
    title: 'Neural Radiance Fields in the Wild: Unbounded Scene Reconstruction',
    excerpt:
      'A novel approach to NeRF that handles unbounded outdoor scenes with varying lighting conditions, enabling photorealistic 3D reconstruction from casual smartphone captures.',
    category: 'cv',
    date: 'June 2026',
    source: 'Stanford AI Lab',
    tags: ['NeRF', '3D Vision', 'Rendering'],
  },
  {
    id: 'research-3',
    title: 'Self-Play Fine-Tuning: Aligning Language Models Without Human Preferences',
    excerpt:
      'A groundbreaking self-play method where language models improve their alignment by playing both the generator and critic roles, eliminating the need for expensive human preference data.',
    category: 'rl',
    date: 'May 2026',
    source: 'Anthropic',
    tags: ['RLHF', 'Alignment', 'Self-Play'],
  },
  {
    id: 'research-4',
    title: 'Constitutional AI v2: Scalable Oversight for Superhuman Systems',
    excerpt:
      'An extension of Constitutional AI that introduces hierarchical oversight mechanisms, enabling reliable monitoring and control of AI systems that exceed human-level capabilities in specific domains.',
    category: 'acl',
    date: 'May 2026',
    source: 'OpenAI Safety',
    tags: ['AI Safety', 'Oversight', 'Alignment'],
  },
  {
    id: 'research-5',
    title: 'Multimodal Chain-of-Thought: Reasoning Across Vision and Language',
    excerpt:
      'This work presents a unified framework that enables multimodal models to perform step-by-step reasoning across visual and textual inputs simultaneously, achieving state-of-the-art on multiple benchmarks.',
    category: 'llm',
    date: 'May 2026',
    source: 'Microsoft Research',
    tags: ['Multimodal', 'CoT', 'Reasoning'],
  },
];

export const researchPapers: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Attention Is All You Need',
    authors: 'Vaswani, Shazeer, Parmar, et al. — Google Brain',
    abstract:
      'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms.',
    year: 2017,
    venue: 'NeurIPS',
    citations: '12,847',
  },
  {
    id: 'paper-2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: 'Devlin, Chang, Lee, Toutanova — Google AI',
    abstract:
      'We introduce BERT, designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.',
    year: 2019,
    venue: 'NAACL',
    citations: '9,231',
  },
  {
    id: 'paper-3',
    title: 'Generative Adversarial Networks (GANs)',
    authors: 'Goodfellow, Pouget-Abadie, Mirza, et al. — Université de Montréal',
    abstract:
      'We propose a new framework for estimating generative models via an adversarial process, simultaneously training a generative and a discriminative model in a minimax two-player game.',
    year: 2014,
    venue: 'NeurIPS',
    citations: '15,420',
  },
  {
    id: 'paper-4',
    title: 'Denoising Diffusion Probabilistic Models',
    authors: 'Ho, Jain, Abbeel — UC Berkeley',
    abstract:
      'We present high quality image synthesis results using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.',
    year: 2020,
    venue: 'NeurIPS',
    citations: '7,615',
  },
  {
    id: 'paper-5',
    title: 'Deep Residual Learning for Image Recognition (ResNet)',
    authors: 'He, Zhang, Ren, Sun — Microsoft Research',
    abstract:
      'We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously, reformulating the layers as learning residual functions.',
    year: 2016,
    venue: 'CVPR',
    citations: '5,890',
  },
  {
    id: 'paper-6',
    title: 'Language Models are Few-Shot Learners (GPT-3)',
    authors: 'Brown, Mann, Ryder, et al. — OpenAI',
    abstract:
      'We demonstrate that scaling up language models greatly improves task-agnostic, few-shot performance, achieving strong results on many NLP benchmarks without any gradient updates or fine-tuning.',
    year: 2020,
    venue: 'NeurIPS',
    citations: '4,230',
  },
];

// Category display labels
export const categoryLabels: Record<string, string> = {
  llm: 'LLM',
  cv: 'Vision',
  rl: 'RL',
  acl: 'Safety',
};
