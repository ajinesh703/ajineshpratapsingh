// ============================================
// ajineshpratapsingh — Data Store
// Updated: June 14, 2026
// ============================================

import type { NewsArticle, ResearchItem, ResearchPaper } from './types';

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-featured',
    title: 'Anthropic Launches Claude 3.7 Sonnet: Hybrid Thinking and Native Computer Use',
    excerpt:
      'Anthropic has introduced Claude 3.7 Sonnet, their first model capable of hybrid thinking—allowing users to toggle between instant responses and detailed, step-by-step reasoning. The model sets new benchmarks in coding, mathematics, and agentic workflows, featuring improved native computer use capabilities.',
    category: 'Industry News',
    date: 'February 24, 2025',
    readTime: '6 min read',
    featured: true,
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
    url: 'https://www.anthropic.com/news/claude-3-7-sonnet',
  },
  {
    id: 'news-2',
    title: 'US orders Anthropic to disable AI models for all foreign nationals',
    excerpt:
      'US orders Anthropic to disable AI models for all foreign nationals',
    category: 'Generative AI',
    date: 'June 13, 2025',
    readTime: '5 min read',
    featured: false,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    url: 'https://www.aljazeera.com/news/2026/6/13/us-orders-anthropic-to-disable-ai-models-for-all-foreign-nationals',
  },
  {
    id: 'news-3',
    title: 'OpenAI Releases o3-mini: High-Speed Reasoning Model for Coding & STEM',
    excerpt:
      'OpenAI has launched o3-mini, a cost-efficient reasoning model designed for developers. o3-mini provides state-of-the-art performance in software engineering, mathematics, and science, allowing developers to execute complex reasoning steps with minimal latency.',
    category: 'Generative AI',
    date: 'January 31, 2025',
    readTime: '5 min read',
    featured: false,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    url: 'https://openai.com/index/openai-o3-mini/',
  },
  {
    id: 'news-4',
    title: 'DeepSeek-R1 Takes the AI World by Storm with SOTA Open Reasoning',
    excerpt:
      'DeepSeek has open-sourced DeepSeek-R1, a reasoning model that rivals OpenAI o1 on math, coding, and logical tasks. Released under the MIT license, it utilizes reinforcement learning to cultivate chain-of-thought processing, starting a new era of open reasoning models.',
    category: 'Open Source',
    date: 'January 20, 2025',
    readTime: '5 min read',
    featured: false,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    url: 'https://github.com/deepseek-ai/DeepSeek-R1',
  },
  {
    id: 'news-5',
    title: 'Google DeepMind Unveils Gemini 2.0 Flash: Speed and Multimodality Combined',
    excerpt:
      'Google announced Gemini 2.0 Flash, a lightweight model optimized for low latency and high-throughput multimodal applications. It offers major enhancements in real-time conversational speeds, tool use, and agentic task execution.',
    category: 'Generative AI',
    date: 'December 11, 2024',
    readTime: '4 min read',
    featured: false,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8h2m2 0h2m2 0h2M7 11h6"/></svg>`,
    url: 'https://deepmind.google/technologies/gemini/',
  },
  {
    id: 'news-6',
    title: 'Meta Launches Llama 3.3 70B: High-Efficiency SOTA Open Weights Model',
    excerpt:
      'Meta has released Llama 3.3 70B, which delivers the capabilities of much larger models (like the Llama 3 405B) at a fraction of the compute cost. It features a 128k token context window and excels at multilingual dialogue and tool calling.',
    category: 'Open Source',
    date: 'December 6, 2024',
    readTime: '4 min read',
    featured: false,
    icon: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    url: 'https://ai.meta.com/blog/meta-llama-3-3/',
  },
  
];

export const researchItems: ResearchItem[] = [
  {
    id: 'research-1',
    title: 'Mixture-of-Depths: Structurally Dynamic Compute Allocation',
    excerpt:
      'Google DeepMind researchers present Mixture-of-Depths, a method that allows transformer models to dynamically choose which tokens receive full processing compute, saving up to 50% inference compute.',
    category: 'llm',
    date: 'April 2024',
    source: 'arXiv — 2404.02258',
    tags: ['Transformers', 'Efficiency', 'Dynamic Compute'],
    url: 'https://arxiv.org/abs/2404.02258',
  },
  {
    id: 'research-2',
    title: 'Segment Anything (SAM): Foundational Model for Image Segmentation',
    excerpt:
      'Meta AI introduces the Segment Anything Project, creating the first foundational model for image segmentation. Trained on 1.1 billion masks, SAM supports promptable segmentation with zero-shot generalization.',
    category: 'cv',
    date: 'April 2023',
    source: 'arXiv — 2304.02643',
    tags: ['Computer Vision', 'Segmentation', 'Zero-Shot'],
    url: 'https://arxiv.org/abs/2304.02643',
  },
  {
    id: 'research-3',
    title: 'Self-Play Fine-Tuning (SPIN) Converts Weak LLMs to Strong LLMs',
    excerpt:
      'SPIN introduces a self-play mechanism where a language model aligns itself by generating training data and playing against its previous iterations, eliminating the need for human preference data.',
    category: 'rl',
    date: 'January 2024',
    source: 'arXiv — 2401.01335',
    tags: ['RLHF', 'Self-Play', 'Alignment'],
    url: 'https://arxiv.org/abs/2401.01335',
  },
  {
    id: 'research-4',
    title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model',
    excerpt:
      'DPO shows that RLHF can be simplified by optimization over a binary cross-entropy loss directly, completely bypassing the need for a separate reward model or reinforcement learning training.',
    category: 'rl',
    date: 'May 2023',
    source: 'arXiv — 2305.18290',
    tags: ['RLHF', 'Optimization', 'Alignment'],
    url: 'https://arxiv.org/abs/2305.18290',
  },
  {
    id: 'research-5',
    title: 'Multimodal Chain-of-Thought Reasoning in Language Models',
    excerpt:
      'This work presents a unified framework that enables language models to perform step-by-step reasoning across visual and textual inputs, greatly improving performance on ScienceQA.',
    category: 'llm',
    date: 'February 2023',
    source: 'arXiv — 2302.00923',
    tags: ['Multimodal', 'Reasoning', 'Chain-of-Thought'],
    url: 'https://arxiv.org/abs/2302.00923',
  },
  {
    id: 'research-6',
    title: 'SWE-agent: Agent-Computer Interfaces for Software Engineering',
    excerpt:
      'SWE-agent introduces a specialized agent-computer interface (ACI) that allows LLMs to efficiently browse, edit, and build software repositories, achieving state-of-the-art on SWE-bench.',
    category: 'llm',
    date: 'May 2024',
    source: 'arXiv — 2405.15793',
    tags: ['Agents', 'Software Engineering', 'Benchmarks'],
    url: 'https://arxiv.org/abs/2405.15793',
  },
  {
    id: 'research-7',
    title: 'Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training',
    excerpt:
      'Anthropic researchers demonstrate that safety training can fail to remove backdoor behaviors (deceptive alignment) in LLMs, showing they can persist even after standard safety fine-tuning.',
    category: 'acl',
    date: 'January 2024',
    source: 'arXiv — 2401.05566',
    tags: ['AI Safety', 'Deception', 'Backdoors'],
    url: 'https://arxiv.org/abs/2401.05566',
  },
  {
    id: 'research-8',
    title: 'NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis',
    excerpt:
      'The seminal paper presenting Neural Radiance Fields (NeRF), a method that uses continuous volumetric scene functions parameterized by fully-connected neural networks to synthesize photorealistic 3D views.',
    category: 'cv',
    date: 'March 2020',
    source: 'arXiv — 2003.08934',
    tags: ['NeRF', '3D Scene Reconstruction', 'Graphics'],
    url: 'https://arxiv.org/abs/2003.08934',
  },
];

export const researchPapers: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Attention Is All You Need',
    authors: 'Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin — Google Brain',
    abstract:
      'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose the Transformer, a new simple network architecture based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
    year: 2017,
    venue: 'NeurIPS',
    citations: '122,840+',
    arxivUrl: 'https://arxiv.org/abs/1706.03762',
    pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf',
  },
  {
    id: 'paper-2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: 'Devlin, Chang, Lee, Toutanova — Google AI Language',
    abstract:
      'We introduce a new language representation model called BERT. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context.',
    year: 2019,
    venue: 'NAACL',
    citations: '109,230+',
    arxivUrl: 'https://arxiv.org/abs/1810.04805',
    pdfUrl: 'https://arxiv.org/pdf/1810.04805.pdf',
  },
  {
    id: 'paper-3',
    title: 'Generative Adversarial Networks (GANs)',
    authors: 'Goodfellow, Pouget-Abadie, Mirza, Xu, Warde-Farley, Ozair, Courville, Bengio — Université de Montréal',
    abstract:
      'We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model that captures the data distribution, and a discriminative model.',
    year: 2014,
    venue: 'NeurIPS',
    citations: '75,420+',
    arxivUrl: 'https://arxiv.org/abs/1406.2661',
    pdfUrl: 'https://arxiv.org/pdf/1406.2661.pdf',
  },
  {
    id: 'paper-4',
    title: 'Denoising Diffusion Probabilistic Models (DDPM)',
    authors: 'Ho, Jain, Abbeel — UC Berkeley',
    abstract:
      'We present high quality image synthesis results using diffusion probabilistic models, a class of latent variable models inspired by nonequilibrium thermodynamics. Our best results are obtained by training on a weighted variational bound.',
    year: 2020,
    venue: 'NeurIPS',
    citations: '17,610+',
    arxivUrl: 'https://arxiv.org/abs/2006.11239',
    pdfUrl: 'https://arxiv.org/pdf/2006.11239.pdf',
  },
  {
    id: 'paper-5',
    title: 'Deep Residual Learning for Image Recognition (ResNet)',
    authors: 'He, Zhang, Ren, Sun — Microsoft Research',
    abstract:
      'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those previously used. We provide comprehensive empirical evidence.',
    year: 2016,
    venue: 'CVPR',
    citations: '215,890+',
    arxivUrl: 'https://arxiv.org/abs/1512.03385',
    pdfUrl: 'https://arxiv.org/pdf/1512.03385.pdf',
  },
  {
    id: 'paper-6',
    title: 'Language Models are Few-Shot Learners (GPT-3)',
    authors: 'Brown, Mann, Ryder, Subbiah, Kaplan, Dhariwal, Neelakantan, Shyam, Sastry, Askell, et al. — OpenAI',
    abstract:
      'We demonstrate that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art fine-tuning approaches.',
    year: 2020,
    venue: 'NeurIPS',
    citations: '44,230+',
    arxivUrl: 'https://arxiv.org/abs/2005.14165',
    pdfUrl: 'https://arxiv.org/pdf/2005.14165.pdf',
  },
  {
    id: 'paper-7',
    title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)',
    authors: 'Dosovitskiy, Beyer, Kolesnikov, Weissenborn, Zhai, Unterthiner, Dehghani, Minderer, Heigold, Gelly, et al. — Google Brain',
    abstract:
      'While the Transformer architecture has become the de facto standard for natural language processing, its applications to computer vision remain limited. We show that a pure Transformer applied directly to sequences of image patches works exceedingly well.',
    year: 2021,
    venue: 'ICLR',
    citations: '38,110+',
    arxivUrl: 'https://arxiv.org/abs/2010.11929',
    pdfUrl: 'https://arxiv.org/pdf/2010.11929.pdf',
  },
  {
    id: 'paper-8',
    title: 'High-Resolution Image Synthesis with Latent Diffusion Models (Stable Diffusion)',
    authors: 'Rombach, Blattmann, Lorenz, Esser, Ommer — LMU Munich / Runway / Stability AI',
    abstract:
      'By operating in the latent space of powerful pre-trained autoencoders, we enable training diffusion models on limited computational resources while retaining their quality and flexibility.',
    year: 2022,
    venue: 'CVPR',
    citations: '26,340+',
    arxivUrl: 'https://arxiv.org/abs/2112.10752',
    pdfUrl: 'https://arxiv.org/pdf/2112.10752.pdf',
  },
  {
    id: 'paper-9',
    title: 'Llama 3: The Herd of Models',
    authors: 'Dubey, Jauhri, Pandey, Keneally, Oestreich, Bhalerao, Bystristky, Zhang, Chowdhury, et al. — Meta AI',
    abstract:
      'We introduce the Llama 3 family of foundation models (8B, 70B, and 405B parameters). Llama 3 is a highly capable family of models that supports multimodality, multilingualism, and longer context.',
    year: 2024,
    venue: 'arXiv',
    citations: '2,870+',
    arxivUrl: 'https://arxiv.org/abs/2407.21783',
    pdfUrl: 'https://arxiv.org/pdf/2407.21783.pdf',
  },
  {
    id: 'paper-10',
    title: 'DeepSeek-R1: Incentivizing Reasoning via Reinforcement Learning',
    authors: 'DeepSeek-AI Team',
    abstract:
      'We introduce DeepSeek-R1-Zero and DeepSeek-R1, which use reinforcement learning to cultivate reasoning capabilities. DeepSeek-R1 performs on par with OpenAI o1 across math, coding, and logical tasks.',
    year: 2025,
    venue: 'arXiv',
    citations: '1,940+',
    arxivUrl: 'https://arxiv.org/abs/2501.12948',
    pdfUrl: 'https://arxiv.org/pdf/2501.12948.pdf',
  },
  {
    id: 'paper-11',
    title: 'Scalable Diffusion Models with Transformers (DiT)',
    authors: 'Peebles, Xie — UC Berkeley / Meta AI',
    abstract:
      'We explore a new class of diffusion models based on the Transformer architecture. We show that DiT models scale exceptionally well with compute, and produce excellent generative results.',
    year: 2023,
    venue: 'ICCV',
    citations: '3,120+',
    arxivUrl: 'https://arxiv.org/abs/2212.09748',
    pdfUrl: 'https://arxiv.org/pdf/2212.09748.pdf',
  },
  {
    id: 'paper-12',
    title: 'Constitutional AI: Harmlessness from AI Feedback',
    authors: 'Bai, Jones, Ndousse, Askell, Chen, DasSarma, Dawn, et al. — Anthropic',
    abstract:
      'We train a harmless AI assistant using a set of rules or principles as a "constitution". The assistant is trained using reinforcement learning from AI feedback (RLAIF) rather than human feedback.',
    year: 2022,
    venue: 'arXiv',
    citations: '2,450+',
    arxivUrl: 'https://arxiv.org/abs/2212.08073',
    pdfUrl: 'https://arxiv.org/pdf/2212.08073.pdf',
  },
  {
    id: 'paper-13',
    title: 'Mamba: Linear-Time Sequence Modeling with Selective State Spaces',
    authors: 'Gu, Dao — Carnegie Mellon University / Princeton University',
    abstract:
      'We present Mamba, a sequence modeling architecture based on selective state space models. Mamba scales linearly in sequence length, outperforms Transformers of similar size, and runs faster.',
    year: 2024,
    venue: 'ICLR',
    citations: '1,750+',
    arxivUrl: 'https://arxiv.org/abs/2312.00752',
    pdfUrl: 'https://arxiv.org/pdf/2312.00752.pdf',
  },
  {
    id: 'paper-14',
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (RAG)',
    authors: 'Lewis, Perez, Piktus, Petroni, Lewis, Mikolov, Riedel, Yih — Meta AI / UCL / NYU',
    abstract:
      'We explore workflows that combine parametric memory (pre-trained seq2seq models) and non-parametric memory (dense vector search over Wikipedia) for knowledge-intensive natural language processing tasks.',
    year: 2020,
    venue: 'NeurIPS',
    citations: '8,670+',
    arxivUrl: 'https://arxiv.org/abs/2005.11401',
    pdfUrl: 'https://arxiv.org/pdf/2005.11401.pdf',
  },
];

// Category display labels
export const categoryLabels: Record<string, string> = {
  llm: 'LLM',
  cv:  'Vision',
  rl:  'RL',
  acl: 'Safety',
};