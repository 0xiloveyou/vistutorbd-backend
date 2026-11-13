export const CATEGORIES = [
  {
    slug: "llm",
    name: "Large Language Models",
    short: "LLM",
    icon: "🧠",
    blurb:
      "Tokens, transformers, sampling, context windows, and the machinery behind modern chat models.",
  },
  {
    slug: "prompt-engineering",
    name: "Prompt Engineering",
    short: "Prompting",
    icon: "✍️",
    blurb:
      "Reusable prompt patterns, evaluation habits, structured output, and prompt debugging.",
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    short: "ML",
    icon: "📈",
    blurb:
      "Loss functions, gradient descent, generalization, and the ideas under every model.",
  },
  {
    slug: "deep-learning",
    name: "Deep Learning",
    short: "Deep Learning",
    icon: "🕸️",
    blurb:
      "Neurons, layers, activations, backpropagation, and how networks actually learn.",
  },
  {
    slug: "rag",
    name: "RAG & Vector Search",
    short: "RAG",
    icon: "🔎",
    blurb:
      "Chunking, embeddings, vector databases, retrieval quality, and grounded generation.",
  },
  {
    slug: "agents",
    name: "AI Agents",
    short: "Agents",
    icon: "🤖",
    blurb:
      "Tool calling, planning loops, memory, guardrails, and multi-step autonomy.",
  },
  {
    slug: "nlp",
    name: "Natural Language Processing",
    short: "NLP",
    icon: "💬",
    blurb:
      "Tokenization, embeddings, sequence models, and the pipeline from text to numbers.",
  },
  {
    slug: "computer-vision",
    name: "Computer Vision",
    short: "Vision",
    icon: "👁️",
    blurb:
      "Convolutions, pooling, detection, segmentation, and visual representation learning.",
  },
  {
    slug: "python",
    name: "Python for AI",
    short: "Python",
    icon: "🐍",
    blurb:
      "The Python patterns, tooling, and small programs that make AI work practical.",
  },
  {
    slug: "math",
    name: "Math for AI",
    short: "Math",
    icon: "∑",
    blurb:
      "Linear algebra, probability, calculus, and the intuition behind model behavior.",
  },
  {
    slug: "mlops",
    name: "MLOps & Deployment",
    short: "MLOps",
    icon: "🚀",
    blurb:
      "Serving models, validation, monitoring, evaluation, and shipping AI systems safely.",
  },
  {
    slug: "papers",
    name: "Research Papers",
    short: "Papers",
    icon: "📄",
    blurb:
      "How to read, critique, and reproduce the papers that move the field forward.",
  },
] as const;

export const CATEGORY_SLUGS = CATEGORIES.map((category) => category.slug);
