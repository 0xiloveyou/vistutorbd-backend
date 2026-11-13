import fs from "node:fs/promises";
import path from "node:path";
import { CATEGORY_SLUGS } from "../frontend/src/lib/categories.js";

const outDir = path.join(process.cwd(), "posts");

const EMPTY_CONSOLE = () => ({
  c: "",
  cpp: "",
  go: "",
  py: "",
  js: "",
  java: "",
});

const consoleBlock = (py, extra = {}) => ({
  ...EMPTY_CONSOLE(),
  py,
  ...extra,
});

const section = (subtitle, description, options = {}) => {
  const result = {
    subtitle,
    description,
    descriptionFormat: "html",
    defaultLang: options.defaultLang || "py",
  };

  if (options.consoleBlock) result.consoleBlock = options.consoleBlock;

  if (options.visualization) {
    result.visualization = {
      enabled: true,
      title: options.visualization.title || "Visualization",
      html: options.visualization.html || "",
      url: options.visualization.url || "",
    };
  }

  if (options.python) {
    result.python = {
      enabled: true,
      title: options.python.title || "Runnable Python",
      code: options.python.code || "",
      stdin: options.python.stdin || "",
    };
  }

  return result;
};

const postsByCategory = {
  llm: [
    {
      id: "seed-llm-next-token",
      title: "How a Large Language Model Predicts the Next Token",
      date: "2026-10-24",
      category: "LLM Fundamentals",
      tags: ["LLM", "Tokens", "Sampling"],
      link: "",
      images: [],
      namedLinks: [
        {
          name: "Attention Is All You Need",
          url: "https://arxiv.org/abs/1706.03762",
        },
      ],
      sections: [
        section(
          "Text becomes tokens",
          `<p>A language model never sees a sentence. It sees a sequence of <span style="color:#facc15;font-weight:600">tokens</span> — small chunks of text mapped to integer IDs. The same sentence can become different token sequences depending on the tokenizer.</p>
<p>Token counts matter because context windows, pricing, and latency are all measured in tokens.</p>`,
          {
            consoleBlock: consoleBlock(`text = "AI learning hub"
tokens = text.lower().split()

print("tokens:", tokens)
print("count:", len(tokens))`),
          }
        ),
        section(
          "From logits to probabilities",
          `<p>For every position, the model produces a score (a <span style="color:#93c5fd">logit</span>) for every token in its vocabulary. Softmax turns those scores into a probability distribution. The next token is <mark>sampled</mark> from that distribution.</p>
<p>A greedy decoder always picks the highest-probability token. Sampling adds controlled randomness.</p>`,
          {
            visualization: {
              title: "Next-token probability bars",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 18px; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  h3 { margin: 0 0 14px; color: #fca5a5; font-size: 16px; }
  .row { display: flex; align-items: center; gap: 10px; margin: 9px 0; font-size: 13px; }
  .label { width: 86px; color: #93c5fd; }
  .bar { height: 18px; border-radius: 4px; background: linear-gradient(90deg, #6366f1, #22d3ee); }
  .val { color: #a7f3d0; font-variant-numeric: tabular-nums; }
  .note { margin-top: 14px; color: #9ca3af; font-size: 12px; line-height: 1.5; }
</style>
</head>
<body>
<h3>Next-token probabilities</h3>
<div class="row"><span class="label">learning</span><div class="bar" style="width:68%"></div><span class="val">0.68</span></div>
<div class="row"><span class="label">systems</span><div class="bar" style="width:17%"></div><span class="val">0.17</span></div>
<div class="row"><span class="label">models</span><div class="bar" style="width:9%"></div><span class="val">0.09</span></div>
<div class="row"><span class="label">other</span><div class="bar" style="width:6%"></div><span class="val">0.06</span></div>
<p class="note">A temperature near 0 sharpens this distribution. A higher temperature flattens it.</p>
</body>
</html>`,
            },
            python: {
              title: "Compute a softmax distribution",
              code: `import math

logits = {"learning": 2.4, "systems": 1.1, "models": 0.6, "other": 0.2}
total = sum(math.exp(value) for value in logits.values())

for token, score in logits.items():
    probability = math.exp(score) / total
    bar = "#" * int(probability * 40)
    print(f"{token:>9} {probability:6.3f} {bar}")`,
            },
          }
        ),
        section(
          "Temperature reshapes the distribution",
          `<p><span style="color:#22c55e;font-weight:600">Temperature</span> divides the logits before softmax. Low temperature makes the model more deterministic; high temperature makes it more exploratory.</p>
<p>Use low temperature for extraction and code. Use higher temperature for brainstorming — and always evaluate the result.</p>`,
          {
            consoleBlock: consoleBlock(`import math

def softmax(logits, temperature=1.0):
    scaled = [value / temperature for value in logits]
    top = max(scaled)
    exps = [math.exp(value - top) for value in scaled]
    total = sum(exps)
    return [value / total for value in exps]

logits = [2.4, 1.1, 0.6, 0.2]

for temperature in [0.2, 1.0, 2.0]:
    probs = softmax(logits, temperature)
    print(f"T={temperature:<4} " + " ".join(f"{p:.3f}" for p in probs))`),
          }
        ),
      ],
    },
  ],

  "prompt-engineering": [
    {
      id: "seed-prompt-patterns",
      title: "Prompt Patterns That Reliably Improve Output",
      date: "2026-10-21",
      category: "Prompt Patterns",
      tags: ["Prompting", "Few-shot", "Evaluation"],
      link: "",
      images: [],
      namedLinks: [
        { name: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/" },
      ],
      sections: [
        section(
          "The four-part prompt",
          `<p>Most reliable prompts contain four pieces: <span style="color:#facc15;font-weight:600">role</span>, <span style="color:#93c5fd;font-weight:600">context</span>, <span style="color:#22c55e;font-weight:600">task</span>, and <span style="color:#f472b6;font-weight:600">output format</span>.</p>
<p>The format is not decoration. It tells the model what a successful answer looks like, which makes evaluation much easier.</p>`,
          {
            visualization: {
              title: "The four-part prompt",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 18px; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  h3 { margin: 0 0 14px; color: #fca5a5; font-size: 16px; }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .card { background: #111827; border: 1px solid #374151; border-radius: 8px; padding: 12px; }
  .card b { color: #c7d2fe; font-size: 13px; }
  .card p { margin: 6px 0 0; color: #cbd5e1; font-size: 12px; line-height: 1.5; }
</style>
</head>
<body>
<h3>The four-part prompt</h3>
<div class="grid">
  <div class="card"><b>Role</b><p>You are a patient Python tutor.</p></div>
  <div class="card"><b>Context</b><p>The reader knows loops but not decorators.</p></div>
  <div class="card"><b>Task</b><p>Explain decorators with one example.</p></div>
  <div class="card"><b>Format</b><p>Short answer, then a code block.</p></div>
</div>
</body>
</html>`,
            },
          }
        ),
        section(
          "Few-shot examples",
          `<p>Examples are compressed instructions. Two or three high-quality examples usually beat a long paragraph of adjectives.</p>
<p>Keep examples <span style="color:#22c55e">consistent</span>: same shape, same level of detail, same output format.</p>`,
          {
            consoleBlock: consoleBlock(`def build_prompt(role, context, task, output_format):
    return f"""Role: {role}
Context: {context}
Task: {task}
Format: {output_format}"""

prompt = build_prompt(
    "You are a senior Python engineer.",
    "The reader knows loops but not decorators.",
    "Explain decorators with one example.",
    "Short answer, then a code block.",
)

print(prompt)`),
          }
        ),
        section(
          "Evaluate, don't guess",
          `<p>Write down the failure modes you care about before you tune the prompt: hallucination, missing constraints, wrong format, or excessive length.</p>
<p>Then test the prompt against a small set of <mark>fixed examples</mark>. A prompt that feels better is not necessarily a prompt that performs better.</p>`
        ),
      ],
    },
  ],

  "machine-learning": [
    {
      id: "seed-ml-gradient-descent",
      title: "Gradient Descent, Explained Visually",
      date: "2026-10-18",
      category: "ML Foundations",
      tags: ["Optimization", "Gradient Descent", "Loss"],
      link: "",
      images: [],
      namedLinks: [],
      sections: [
        section(
          "Loss is the landscape",
          `<p>A model is a function with parameters. The <span style="color:#fca5a5;font-weight:600">loss</span> measures how wrong its predictions are. Training is the search for parameters that make the loss small.</p>
<p>Gradient descent walks downhill by following the negative gradient.</p>`,
          {
            visualization: {
              title: "A point walking down a loss curve",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  canvas { display: block; width: 100%; height: 320px; }
  .legend { display: flex; gap: 16px; padding: 0 18px 16px; font-size: 12px; color: #9ca3af; }
  .sw { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 6px; }
</style>
</head>
<body>
<canvas id="c" width="720" height="340"></canvas>
<div class="legend">
  <span><i class="sw" style="background:#fca5a5"></i>loss curve</span>
  <span><i class="sw" style="background:#22d3ee"></i>current point</span>
</div>
<script>
  const canvas = document.getElementById("c");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const pad = 34;

  function f(x) { return (x - 3) * (x - 3) + 2; }
  function toX(x) { return pad + (x / 6) * (w - pad * 2); }
  function toY(y) { return h - pad - (y / 12) * (h - pad * 2); }

  const points = [];
  let x = 0.4;
  for (let i = 0; i < 14; i++) {
    points.push(x);
    x = x - 0.32 * (2 * (x - 3));
  }

  let step = 0;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 6; i++) {
      const gx = toX(i);
      ctx.beginPath();
      ctx.moveTo(gx, pad);
      ctx.lineTo(gx, h - pad);
      ctx.stroke();
    }

    ctx.strokeStyle = "#fca5a5";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= 300; i++) {
      const px = toX((i / 300) * 6);
      const py = toY(f((i / 300) * 6));
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    const px = toX(points[step]);
    const py = toY(f(points[step]));
    ctx.fillStyle = "#22d3ee";
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e5e7eb";
    ctx.font = "13px monospace";
    ctx.fillText("step " + step, pad, 22);

    step = (step + 1) % points.length;
  }

  draw();
  setInterval(draw, 420);
</script>
</body>
</html>`,
            },
          }
        ),
        section(
          "The update rule",
          `<p>At each step, compute the gradient and move in the opposite direction. The <span style="color:#facc15;font-weight:600">learning rate</span> decides how far you move.</p>
<p>Too small: training crawls. Too large: the loss bounces or diverges.</p>`,
          {
            python: {
              title: "Run gradient descent",
              code: `def loss(x):
    return (x - 3) ** 2 + 2

def gradient(x):
    return 2 * (x - 3)

x = 0.4
learning_rate = 0.32

for step in range(12):
    x = x - learning_rate * gradient(x)
    print(f"step {step:02d}  x={x:6.3f}  loss={loss(x):6.3f}")`,
            },
          }
        ),
        section(
          "Learning rate",
          `<p>A learning rate is a <span style="color:#93c5fd">hyperparameter</span>, not something the model learns from the gradient itself. Schedules, warmup, and adaptive optimizers all change how the step size behaves over time.</p>
<p>When training is unstable, inspect the loss curve before changing the architecture.</p>`
        ),
      ],
    },
  ],

  "deep-learning": [
    {
      id: "seed-dl-forward-pass",
      title: "A Neural Network Forward Pass in 20 Lines",
      date: "2026-10-16",
      category: "Neural Networks",
      tags: ["Neural Networks", "Forward Pass", "Activation"],
      link: "",
      images: [],
      namedLinks: [
        { name: "TensorFlow Playground", url: "https://playground.tensorflow.org/" },
      ],
      sections: [
        section(
          "Neurons are weighted sums",
          `<p>A neuron multiplies its inputs by weights, adds a bias, and passes the result through an activation function. A layer is just many neurons evaluated in parallel.</p>
<p>The <span style="color:#22d3ee;font-weight:600">forward pass</span> is the process of turning inputs into predictions.</p>`,
          {
            consoleBlock: consoleBlock(`import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

inputs = [1.0, 0.5, -0.2]
weights = [
    [0.2, -0.4, 0.7],
    [0.5, 0.1, -0.3],
    [0.1, 0.8, 0.2],
    [-0.6, 0.2, 0.4],
]
bias = [0.1, -0.2, 0.0, 0.3]

hidden = []
for row, b in zip(weights, bias):
    z = sum(x * w for x, w in zip(inputs, row)) + b
    hidden.append(sigmoid(z))

print("hidden activations:", [round(value, 3) for value in hidden])`),
          }
        ),
        section(
          "Activation functions",
          `<p>Without a non-linearity, stacked layers collapse into a single linear transformation. <span style="color:#facc15">ReLU</span> keeps positive values and zeros the rest. <span style="color:#a855f7">Sigmoid</span> squashes values into 0–1.</p>
<p>The choice of activation affects gradient flow, not just the output range.</p>`,
          {
            consoleBlock: consoleBlock(`import math

def relu(x):
    return max(0.0, x)

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

for x in [-2, -0.5, 0, 0.5, 2]:
    print(f"x={x:>4}  relu={relu(x):>4}  sigmoid={sigmoid(x):.3f}")`),
            visualization: {
              title: "A small feed-forward network",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 12px; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  svg { width: 100%; height: 300px; }
  .lbl { fill: #9ca3af; font-size: 11px; }
  .node { fill: #111827; stroke: #6366f1; stroke-width: 2; }
  .edge { stroke: #374151; stroke-width: 1.4; }
</style>
</head>
<body>
<svg viewBox="0 0 700 300">
  <g class="edge">
    <line x1="120" y1="70" x2="330" y2="60" /><line x1="120" y1="70" x2="330" y2="120" />
    <line x1="120" y1="70" x2="330" y2="180" /><line x1="120" y1="70" x2="330" y2="240" />
    <line x1="120" y1="150" x2="330" y2="60" /><line x1="120" y1="150" x2="330" y2="120" />
    <line x1="120" y1="150" x2="330" y2="180" /><line x1="120" y1="150" x2="330" y2="240" />
    <line x1="120" y1="230" x2="330" y2="60" /><line x1="120" y1="230" x2="330" y2="120" />
    <line x1="120" y1="230" x2="330" y2="180" /><line x1="120" y1="230" x2="330" y2="240" />
    <line x1="330" y1="60" x2="570" y2="110" /><line x1="330" y1="60" x2="570" y2="190" />
    <line x1="330" y1="120" x2="570" y2="110" /><line x1="330" y1="120" x2="570" y2="190" />
    <line x1="330" y1="180" x2="570" y2="110" /><line x1="330" y1="180" x2="570" y2="190" />
    <line x1="330" y1="240" x2="570" y2="110" /><line x1="330" y1="240" x2="570" y2="190" />
  </g>
  <g>
    <circle class="node" cx="120" cy="70" r="22" /><circle class="node" cx="120" cy="150" r="22" /><circle class="node" cx="120" cy="230" r="22" />
    <circle class="node" cx="330" cy="60" r="22" /><circle class="node" cx="330" cy="120" r="22" /><circle class="node" cx="330" cy="180" r="22" /><circle class="node" cx="330" cy="240" r="22" />
    <circle class="node" cx="570" cy="110" r="22" /><circle class="node" cx="570" cy="190" r="22" />
  </g>
  <g class="lbl">
    <text x="95" y="32">input</text><text x="300" y="22">hidden</text><text x="545" y="72">output</text>
    <text x="104" y="74">x1</text><text x="104" y="154">x2</text><text x="104" y="234">x3</text>
    <text x="562" y="114">y1</text><text x="562" y="194">y2</text>
  </g>
</svg>
</body>
</html>`,
            },
          }
        ),
      ],
    },
  ],

  rag: [
    {
      id: "seed-rag-pipeline",
      title: "Build a RAG Pipeline from Scratch",
      date: "2026-10-14",
      category: "RAG",
      tags: ["RAG", "Embeddings", "Retrieval"],
      link: "",
      images: [],
      namedLinks: [
        {
          name: "LangChain RAG tutorial",
          url: "https://python.langchain.com/docs/tutorials/rag/",
        },
      ],
      sections: [
        section(
          "The pipeline",
          `<p>RAG connects a <span style="color:#93c5fd;font-weight:600">retriever</span> to a generator. The retriever finds relevant chunks; the generator answers using those chunks as context.</p>
<p>The quality of the answer is capped by the quality of retrieval. Start there.</p>`,
          {
            visualization: {
              title: "Documents → chunks → vectors → answer",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 18px; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  h3 { margin: 0 0 14px; color: #fca5a5; font-size: 16px; }
  .flow { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .box { background: #111827; border: 1px solid #374151; border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #cbd5e1; }
  .box strong { display: block; color: #a5b4fc; margin-bottom: 3px; }
  .arrow { color: #6b7280; font-size: 18px; }
  .note { margin-top: 16px; color: #9ca3af; font-size: 12px; line-height: 1.6; }
</style>
</head>
<body>
<h3>RAG pipeline</h3>
<div class="flow">
  <div class="box"><strong>Documents</strong>PDF, docs, notes</div>
  <div class="arrow">→</div>
  <div class="box"><strong>Chunks</strong>overlap + metadata</div>
  <div class="arrow">→</div>
  <div class="box"><strong>Vectors</strong>embedding model</div>
  <div class="arrow">→</div>
  <div class="box"><strong>Retrieve</strong>top-k search</div>
  <div class="arrow">→</div>
  <div class="box"><strong>Generate</strong>answer + citations</div>
</div>
<p class="note">Each stage adds its own failure mode. Evaluate retrieval separately from generation.</p>
</body>
</html>`,
            },
          }
        ),
        section(
          "Chunking and embeddings",
          `<p>Chunks should be small enough to be specific and large enough to be meaningful. Overlap preserves context across boundaries.</p>
<p>An embedding maps a chunk to a vector. Similar meaning should produce nearby vectors.</p>`,
          {
            consoleBlock: consoleBlock(`text = """Retrieval augmented generation combines a retriever with a generator.
Chunking decides what the retriever can find.
Embeddings turn chunks into vectors."""

chunks = [chunk.strip() for chunk in text.split(".") if chunk.strip()]

for index, chunk in enumerate(chunks, start=1):
    print(index, chunk)`),
          }
        ),
        section(
          "Rank with cosine similarity",
          `<p>Cosine similarity measures the angle between two vectors. It ignores magnitude, which is useful when embedding lengths vary.</p>
<p>In production, a vector database handles this search at scale.</p>`,
          {
            python: {
              title: "Rank chunks with cosine similarity",
              code: `import math

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))
    return dot / (norm_a * norm_b)

query = [0.9, 0.1, 0.4]
docs = {
    "chunk-a": [0.8, 0.2, 0.5],
    "chunk-b": [0.1, 0.9, 0.2],
    "chunk-c": [0.7, 0.3, 0.1],
}

ranked = sorted(docs.items(), key=lambda item: cosine(query, item[1]), reverse=True)
for name, vector in ranked:
    print(f"{name}: {cosine(query, vector):.3f}")`,
            },
          }
        ),
      ],
    },
  ],

  agents: [
    {
      id: "seed-agents-tool-loop",
      title: "Tool-Calling Agents: The Loop Behind Autonomous AI",
      date: "2026-10-11",
      category: "Agents",
      tags: ["Agents", "Tool Calling", "Planning"],
      link: "",
      images: [],
      namedLinks: [
        {
          name: "OpenAI function calling",
          url: "https://platform.openai.com/docs/guides/function-calling",
        },
      ],
      sections: [
        section(
          "Observe, think, act",
          `<p>An agent is a loop, not a single prompt. It observes the current state, decides on an action, calls a tool, and observes the result.</p>
<p>The loop stops when the agent has an answer, hits a step limit, or fails a guardrail.</p>`,
          {
            visualization: {
              title: "The agent loop",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 18px; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  h3 { margin: 0 0 14px; color: #fca5a5; font-size: 16px; }
  .loop { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .node { background: #111827; border: 1px solid #4f46e5; border-radius: 8px; padding: 14px 8px; text-align: center; font-size: 12px; color: #c7d2fe; }
  .node span { display: block; font-size: 18px; margin-bottom: 5px; }
  .note { margin-top: 16px; color: #9ca3af; font-size: 12px; line-height: 1.6; }
</style>
</head>
<body>
<h3>Observe → think → act → check</h3>
<div class="loop">
  <div class="node"><span>👁️</span>Observe</div>
  <div class="node"><span>🧠</span>Think</div>
  <div class="node"><span>🛠️</span>Act</div>
  <div class="node"><span>✅</span>Check</div>
</div>
<p class="note">A step limit and a clear stop condition are part of the design, not an afterthought.</p>
</body>
</html>`,
            },
          }
        ),
        section(
          "A tiny agent loop",
          `<p>This toy agent routes a calculation request to a calculator tool. Real agents usually have multiple tools and a model choosing between them.</p>
<p>Notice the <span style="color:#22c55e">tool boundary</span>: the agent never evaluates untrusted text directly.</p>`,
          {
            python: {
              title: "Simulate a tool-calling agent",
              code: `def calculator(expression):
    allowed = set("0123456789+-*/(). ")
    if not set(expression) <= allowed:
        return "unsafe expression"
    return eval(expression, {"__builtins__": {}}, {})

def run_agent(question):
    steps = []
    if "calculate" in question.lower():
        expression = question.split(":")[-1].strip()
        result = calculator(expression)
        steps.append(("tool", "calculator", result))
        steps.append(("answer", f"The result is {result}."))
    else:
        steps.append(("answer", "I need a calculator tool for that."))
    return steps

for step in run_agent("Please calculate: (12 + 8) * 3"):
    print(step)`,
            },
          }
        ),
        section(
          "Guardrails",
          `<p>Agents need limits: <span style="color:#facc15">maximum steps</span>, tool allowlists, input validation, and human approval for destructive actions.</p>
<p>Log every tool call. Without a trace, debugging an agent is guesswork.</p>`
        ),
      ],
    },
  ],

  nlp: [
    {
      id: "seed-nlp-tokenization",
      title: "Tokenization: How Text Becomes Numbers",
      date: "2026-10-09",
      category: "NLP",
      tags: ["Tokenization", "BPE", "NLP"],
      link: "",
      images: [],
      namedLinks: [{ name: "tiktoken", url: "https://github.com/openai/tiktoken" }],
      sections: [
        section(
          "Word, character, and subword tokens",
          `<p>Word tokens are intuitive but explode in size. Character tokens are tiny but produce long sequences. <span style="color:#facc15;font-weight:600">Subword</span> tokenization sits in between.</p>
<p>Byte-pair encoding learns frequent character pairs and merges them into tokens.</p>`,
          {
            visualization: {
              title: "Subword tokenization",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 18px; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  h3 { margin: 0 0 14px; color: #fca5a5; font-size: 16px; }
  .tokens { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0 18px; }
  .token { background: #111827; border: 1px solid #374151; border-radius: 6px; padding: 8px 10px; font-family: monospace; color: #a7f3d0; }
  .hint { color: #9ca3af; font-size: 12px; margin: 0 0 4px; }
</style>
</head>
<body>
<h3>Subword tokenization</h3>
<p class="hint">"unbelievable" can become:</p>
<div class="tokens"><span class="token">un</span><span class="token">believ</span><span class="token">able</span></div>
<p class="hint">"tokenization" can become:</p>
<div class="tokens"><span class="token">token</span><span class="token">ization</span></div>
<p class="hint">Rare words get split. Common words stay whole.</p>
</body>
</html>`,
            },
          }
        ),
        section(
          "A tiny tokenizer",
          `<p>Real tokenizers are trained on a corpus and shipped as a vocabulary plus merge rules. This example only shows the idea.</p>`,
          {
            consoleBlock: consoleBlock(`text = "AI learning hub is unbelievable"

print("words:", text.split())
print("characters:", list(text.replace(" ", "")))
print("lowercase:", text.lower().split())`),
          }
        ),
        section(
          "Why BPE wins",
          `<p>BPE keeps common words intact and breaks rare words into reusable pieces. That gives a <span style="color:#93c5fd">bounded vocabulary</span> without losing the ability to represent new text.</p>
<p>It also means token counts are not word counts. Always measure with the tokenizer you actually use.</p>`
        ),
      ],
    },
  ],

  "computer-vision": [
    {
      id: "seed-cv-convolution",
      title: "Convolutional Layers: Seeing with Filters",
      date: "2026-10-06",
      category: "Computer Vision",
      tags: ["CNN", "Convolution", "Vision"],
      link: "",
      images: [],
      namedLinks: [
        { name: "CS231n CNN notes", url: "https://cs231n.github.io/convolutional-networks/" },
      ],
      sections: [
        section(
          "A kernel slides across the image",
          `<p>A convolution applies a small <span style="color:#facc15;font-weight:600">kernel</span> to every local patch of an image. The kernel learns to detect edges, textures, or other patterns.</p>
<p>Weight sharing is the key: the same kernel is reused across the whole image.</p>`,
          {
            visualization: {
              title: "A 3×3 kernel produces one output value",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 18px; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  h3 { margin: 0 0 12px; color: #fca5a5; font-size: 16px; }
  .grid { display: grid; gap: 4px; margin-bottom: 8px; }
  .cell { height: 38px; min-width: 38px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 12px; background: #111827; border: 1px solid #374151; color: #e5e7eb; }
  .kernel .cell { background: #1e1b4b; border-color: #6366f1; color: #c7d2fe; }
  .out .cell { background: #052e16; border-color: #22c55e; color: #bbf7d0; }
  .arrow { color: #6b7280; font-size: 16px; margin: 4px 0; }
  .hint { color: #9ca3af; font-size: 12px; }
</style>
</head>
<body>
<h3>Input 4×4 → kernel 3×3 → output</h3>
<p class="hint">Input patch</p>
<div class="grid" style="grid-template-columns:repeat(4,38px)">
  <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">0</div>
  <div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>
  <div class="cell">3</div><div class="cell">2</div><div class="cell">1</div><div class="cell">0</div>
  <div class="cell">1</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div>
</div>
<div class="arrow">↓</div>
<p class="hint">Kernel</p>
<div class="grid kernel" style="grid-template-columns:repeat(3,38px)">
  <div class="cell">1</div><div class="cell">0</div><div class="cell">-1</div>
  <div class="cell">1</div><div class="cell">0</div><div class="cell">-1</div>
  <div class="cell">1</div><div class="cell">0</div><div class="cell">-1</div>
</div>
<div class="arrow">↓</div>
<p class="hint">Output value</p>
<div class="grid out" style="grid-template-columns:38px"><div class="cell">-4</div></div>
</body>
</html>`,
            },
          }
        ),
        section(
          "Pooling and channels",
          `<p>Channels let a layer learn multiple feature maps. Pooling reduces spatial size and makes the representation more robust to small shifts.</p>
<p>Modern vision models often use strided convolutions instead of explicit pooling, but the idea is the same: compress space while keeping useful signal.</p>`,
          {
            consoleBlock: consoleBlock(`image = [
    [1, 2, 3, 0],
    [0, 1, 2, 3],
    [3, 2, 1, 0],
    [1, 0, 1, 2],
]
kernel = [
    [1, 0, -1],
    [1, 0, -1],
    [1, 0, -1],
]

def convolve(image, kernel):
    size = len(kernel)
    output = []
    for row in range(len(image) - size + 1):
        output_row = []
        for col in range(len(image[0]) - size + 1):
            total = 0
            for kr in range(size):
                for kc in range(size):
                    total += image[row + kr][col + kc] * kernel[kr][kc]
            output_row.append(total)
        output.append(output_row)
    return output

for row in convolve(image, kernel):
    print(row)`),
          }
        ),
      ],
    },
  ],

  python: [
    {
      id: "seed-python-essentials",
      title: "Python Essentials for AI Work",
      date: "2026-10-04",
      category: "Python",
      tags: ["Python", "Basics", "Functions"],
      link: "",
      images: [],
      namedLinks: [{ name: "Python docs", url: "https://docs.python.org/3/" }],
      sections: [
        section(
          "Lists, dicts, and comprehensions",
          `<p>Most AI glue code is data shaping: lists of documents, dictionaries of metadata, and comprehensions that transform one into the other.</p>
<p>Prefer clear comprehensions over nested loops. Your future self will thank you.</p>`,
          {
            consoleBlock: consoleBlock(`documents = [
    {"title": "LLM basics", "tokens": 120},
    {"title": "RAG", "tokens": 90},
    {"title": "Agents", "tokens": 150},
]

long_docs = [doc["title"] for doc in documents if doc["tokens"] > 100]
total = sum(doc["tokens"] for doc in documents)

print("long docs:", long_docs)
print("total tokens:", total)`),
          }
        ),
        section(
          "Functions and generators",
          `<p>Generators are useful for streaming batches without loading everything into memory. They are a natural fit for chunking text and iterating over datasets.</p>`,
          {
            consoleBlock: consoleBlock(`def chunks(items, size):
    for start in range(0, len(items), size):
        yield items[start:start + size]

text = list(range(1, 13))

for batch in chunks(text, 4):
    print(batch)`),
          }
        ),
        section(
          "A mini pipeline",
          `<p>Small, composable functions are easier to test than one giant script. This pipeline cleans text, tokenizes it, and returns a structured result.</p>`,
          {
            python: {
              title: "Run a tiny text pipeline",
              code: `def clean(text):
    return " ".join(text.lower().split())

def pipeline(raw):
    text = clean(raw)
    tokens = text.split()
    return {"text": text, "tokens": tokens, "count": len(tokens)}

print(pipeline("  Python   makes AI work  "))`,
            },
          }
        ),
      ],
    },
  ],

  math: [
    {
      id: "seed-math-linear-algebra",
      title: "Linear Algebra You Actually Need for AI",
      date: "2026-10-02",
      category: "Math",
      tags: ["Linear Algebra", "Vectors", "Matrices"],
      link: "",
      images: [],
      namedLinks: [
        {
          name: "3Blue1Brown linear algebra",
          url: "https://www.3blue1brown.com/topics/linear-algebra",
        },
      ],
      sections: [
        section(
          "Vectors and dot products",
          `<p>A vector is a direction and a magnitude. The <span style="color:#facc15;font-weight:600">dot product</span> measures how much two vectors point in the same direction.</p>
<p>Cosine similarity normalizes that dot product by both magnitudes, giving a score between -1 and 1.</p>`,
          {
            visualization: {
              title: "Dot product as alignment",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 14px; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  svg { width: 100%; height: 240px; }
  .axis { stroke: #374151; stroke-width: 1; }
  .a { stroke: #22d3ee; stroke-width: 3; }
  .b { stroke: #fca5a5; stroke-width: 3; }
  .lbl { fill: #cbd5e1; font-size: 12px; }
</style>
</head>
<body>
<svg viewBox="0 0 420 240">
  <line class="axis" x1="40" y1="200" x2="390" y2="200" />
  <line class="axis" x1="40" y1="200" x2="40" y2="20" />
  <line class="a" x1="40" y1="200" x2="300" y2="80" />
  <line class="b" x1="40" y1="200" x2="260" y2="150" />
  <text class="lbl" x="305" y="76">a</text>
  <text class="lbl" x="265" y="146">b</text>
  <text class="lbl" x="50" y="214">small angle → high similarity</text>
</svg>
</body>
</html>`,
            },
            consoleBlock: consoleBlock(`import math

a = [0.9, 0.4]
b = [0.7, 0.6]

dot = sum(x * y for x, y in zip(a, b))
norm_a = math.sqrt(sum(x * x for x in a))
norm_b = math.sqrt(sum(y * y for y in b))
cosine = dot / (norm_a * norm_b)

print("dot:", round(dot, 3))
print("cosine similarity:", round(cosine, 3))`),
          }
        ),
        section(
          "Matrices are transformations",
          `<p>A matrix-vector product transforms a vector into a new space. Every neural network layer is a matrix multiplication followed by a non-linearity.</p>
<p>Shape discipline prevents most bugs: an <code>(m, n)</code> matrix times an <code>(n,)</code> vector produces an <code>(m,)</code> vector.</p>`,
          {
            consoleBlock: consoleBlock(`matrix = [
    [1, 2],
    [3, 4],
]
vector = [5, 6]

result = [
    sum(row[i] * vector[i] for i in range(len(vector)))
    for row in matrix
]

print(result)`),
          }
        ),
      ],
    },
  ],

  mlops: [
    {
      id: "seed-mlops-fastapi",
      title: "Deploy an AI Model with FastAPI",
      date: "2026-09-29",
      category: "MLOps",
      tags: ["FastAPI", "Deployment", "API"],
      link: "",
      images: [],
      namedLinks: [{ name: "FastAPI docs", url: "https://fastapi.tiangolo.com/" }],
      sections: [
        section(
          "The request lifecycle",
          `<p>A production model is a service. A request arrives, gets validated, is transformed into model input, and returns a structured response.</p>
<p>Latency, error handling, and observability matter as much as model quality.</p>`,
          {
            visualization: {
              title: "Inference request lifecycle",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 18px; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  h3 { margin: 0 0 14px; color: #fca5a5; font-size: 16px; }
  .flow { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .box { background: #111827; border: 1px solid #374151; border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #cbd5e1; }
  .box strong { display: block; color: #a5b4fc; margin-bottom: 3px; }
  .arrow { color: #6b7280; font-size: 18px; }
</style>
</head>
<body>
<h3>Request → prediction → response</h3>
<div class="flow">
  <div class="box"><strong>Request</strong>JSON body</div>
  <div class="arrow">→</div>
  <div class="box"><strong>Validate</strong>Pydantic schema</div>
  <div class="arrow">→</div>
  <div class="box"><strong>Predict</strong>model inference</div>
  <div class="arrow">→</div>
  <div class="box"><strong>Respond</strong>typed JSON</div>
</div>
</body>
</html>`,
            },
          }
        ),
        section(
          "A minimal API",
          `<p>FastAPI turns a Python function into an HTTP endpoint. Pydantic validates the request body before your model code runs.</p>
<p>The runnable example below is a dependency-free mock of the prediction function.</p>`,
          {
            consoleBlock: consoleBlock(`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Request(BaseModel):
    text: str

@app.post("/predict")
def predict(request: Request):
    return {"label": "positive", "score": 0.92}`),
            python: {
              title: "Run the prediction function",
              code: `def predict(text):
    positive = ["good", "great", "love", "excellent"]
    negative = ["bad", "hate", "poor", "awful"]
    words = text.lower().split()
    score = sum(word in positive for word in words) - sum(
        word in negative for word in words
    )
    label = "positive" if score >= 0 else "negative"
    return {"label": label, "score": round(abs(score) / max(len(words), 1), 2)}

for text in ["I love this model", "This is awful"]:
    print(text, "->", predict(text))`,
            },
          }
        ),
        section(
          "Production checklist",
          `<p>Before shipping: <span style="color:#facc15">input validation</span>, timeouts, structured logs, a health endpoint, and a rollback plan.</p>
<p>Also track prediction quality over time. A model can drift even when the code does not change.</p>`
        ),
      ],
    },
  ],

  papers: [
    {
      id: "seed-papers-reading",
      title: "Reading AI Papers Without Getting Lost",
      date: "2026-09-26",
      category: "Paper Reading",
      tags: ["Research", "Papers", "Method"],
      link: "",
      images: [],
      namedLinks: [{ name: "arXiv", url: "https://arxiv.org/" }],
      sections: [
        section(
          "Read the abstract last",
          `<p>The abstract tells you the claim. The method tells you how the claim was tested. Read the method and experiments before deciding whether the abstract is convincing.</p>
<p>A useful order: figures, method, experiments, limitations, then abstract.</p>`,
          {
            visualization: {
              title: "Paper anatomy",
              html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 18px; background: #0b0b0b; color: #e5e7eb; font-family: "Segoe UI", system-ui, sans-serif; }
  h3 { margin: 0 0 14px; color: #fca5a5; font-size: 16px; }
  .paper { display: grid; gap: 6px; }
  .block { background: #111827; border: 1px solid #374151; border-radius: 6px; padding: 9px 11px; font-size: 12px; color: #cbd5e1; }
  .block.title { border-color: #6366f1; color: #c7d2fe; font-weight: 700; }
</style>
</head>
<body>
<h3>Paper anatomy</h3>
<div class="paper">
  <div class="block title">Title</div>
  <div class="block">Abstract — the claim</div>
  <div class="block">Introduction — why it matters</div>
  <div class="block">Method — how it works</div>
  <div class="block">Experiments — evidence</div>
  <div class="block">Limitations — what is not covered</div>
</div>
</body>
</html>`,
            },
          }
        ),
        section(
          "Reproduce one number",
          `<p>Pick a single result from the paper and try to reproduce it, even approximately. This exposes hidden assumptions faster than reading the appendix.</p>
<p>If you cannot reproduce it, write down exactly which piece is missing.</p>`
        ),
        section(
          "Keep a claim-evidence table",
          `<p>For each claim, record the evidence, the dataset, and the baseline. This turns a pile of papers into a map of what is actually known.</p>
<p><span style="color:#22c55e">Claims without evidence</span> are hypotheses. Treat them that way.</p>`
        ),
      ],
    },
  ],
};

await fs.mkdir(outDir, { recursive: true });

for (const slug of CATEGORY_SLUGS) {
  const posts = postsByCategory[slug] || [];
  await fs.writeFile(
    path.join(outDir, `${slug}.json`),
    `${JSON.stringify(posts, null, 2)}\n`,
    "utf8"
  );
  console.log(`${slug}.json — ${posts.length} post(s)`);
}

console.log("Seed complete.");
