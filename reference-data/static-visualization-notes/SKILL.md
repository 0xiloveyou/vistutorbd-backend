---
name: ai-visual-learning
description: Builds interactive, animated, VisuAlgo-style learning pages (one self-contained index.html per topic) that teach AI, machine learning, deep learning, LLMs and current AI topics to a complete beginner, with live visualizations, step-by-step controls, plain-English explanations and math revealed in stages. Use this skill whenever the user wants to learn or understand any AI / ML / neural network / transformer / LLM / data-science concept visually, asks for an index.html, a visualization, a motion graphic, an animated explainer, a "like VisuAlgo" or "like CS Visualizer" page, or says they know nothing about CSS/HTML/coding and want a topic explained with live visuals. Trigger even if the user does not say "skill" or "visualization", as long as they want to learn an AI/ML concept in an interactive visual way.
---

# AI Visual Learning Skill

You are building a **personal interactive textbook**. Each topic becomes **one folder with one `index.html`**. The learner sees the idea move, changes numbers with sliders, watches the result update live, and reads the explanation and math in small stages.

The reference style is **VisuAlgo** (visualgo.net) and **CS Visualizer** (csvistool.com): a big animated canvas in the middle, playback controls (Play / Pause / Step / Back / Reset / Speed), a short explanation that matches the current step, and the real numbers shown on screen.

## 0. Who the learner is (read this first)

- The learner knows **nothing about CSS** and little or no HTML/JS. They want to *understand AI*, not learn web design.
- **You own all the HTML, CSS and JavaScript.** Never ask them to write or edit CSS. Never say "just tweak the stylesheet."
- Never leave jargon undefined. First use of a term gets a one-line plain definition (use a hover tooltip or an inline "In plain words:" note).
- Explain with **everyday analogies first, math second, code last**.
- Be encouraging and concrete. No walls of text.
- If the learner wants to see how the page is built, add an optional collapsed "How this page is built" section at the bottom (see 7.5). It is never required reading.

## 1. Folder layout and delivery

```
ai-learning/
├── index.html                  <- home page: roadmap with links to every topic
├── 01-what-is-ai/index.html
├── 02-linear-regression/index.html
├── 03-gradient-descent/index.html
└── ...one folder per topic, each with its own index.html
```

Rules:
- **Every topic = one self-contained `index.html`.** All CSS in a `<style>` tag, all JS in a `<script>` tag. No build tools, no npm, no frameworks. The learner must be able to **double-click the file and it works**, offline if possible.
- Prefer **vanilla JS + Canvas 2D or inline SVG**. If a library is truly needed, load a pinned version from `https://cdnjs.cloudflare.com` only (for example KaTeX for math). Always include a fallback so the page still shows readable text if the CDN fails.
- Do not use `localStorage` / `sessionStorage` (they fail in sandboxed previews). Keep state in JS variables.
- Create the file with the file tools, then **present it to the user**. Tell them in one line how to open it ("double-click the file").
- Build **one topic per turn**. Finish, present, then suggest the next topic in the roadmap. Never dump ten topics at once.

## 2. The sequential curriculum (the "stages")

Teach in this order. Each topic assumes only the ones before it. When the user names a topic, locate it in the roadmap, mention which prerequisites it builds on, and offer to build a missing prerequisite first if they are clearly lost.

**Stage A: Foundations**
1. What is AI vs ML vs Deep Learning (nested circles, real examples)
2. Data, features and labels (a table turning into points on a plot)
3. Vectors and matrices as "lists of numbers" (dot product shown geometrically)
4. Functions, slope and derivatives, just intuition (a ball rolling on a curve)

**Stage B: Classic machine learning**
5. Linear regression (drag points, line fits, error squares shown)
6. Loss functions: MSE, cross-entropy (error bars shrinking)
7. Gradient descent (ball rolling downhill, learning-rate slider, overshoot demo)
8. Logistic regression and the sigmoid (decision boundary moving)
9. k-Nearest Neighbors (click to add a point, neighbors light up)
10. Decision trees (splits drawn on a 2D plot plus the tree)
11. k-Means clustering (centroids moving frame by frame)
12. Overfitting, underfitting, train/test split (polynomial degree slider)
13. Evaluation: accuracy, precision, recall, confusion matrix, ROC

**Stage C: Neural networks**
14. The perceptron / one neuron (inputs, weights, bias, activation)
15. Activation functions (ReLU, sigmoid, tanh, GELU curves)
16. Multi-layer network forward pass (numbers flowing through nodes)
17. Backpropagation (error flowing backward, chain rule step by step)
18. Training a tiny network live (playground-style, decision boundary evolving)
19. Optimizers: SGD, Momentum, Adam (race on a loss landscape)
20. Regularization, dropout, batch norm

**Stage D: Deep learning architectures**
21. Convolution and CNNs (kernel sliding over an image grid)
22. Pooling and feature maps
23. RNN / LSTM intuition (sequence, memory)
24. Embeddings (words as points in space, nearest neighbors)
25. Attention (query, key, value, heatmap)
26. The Transformer (tokens in, attention layers, probabilities out)

**Stage E: Current AI**
27. Tokenization (type text, see tokens and IDs)
28. How an LLM predicts the next token (probability bars, temperature, top-k/top-p sliders)
29. Pretraining, fine-tuning, RLHF/preference tuning
30. Prompting, context windows, hallucination
31. RAG: retrieval-augmented generation (documents, embeddings, retrieval, answer)
32. AI agents and tool use (loop: think, act, observe)
33. Diffusion models (noise gradually removed from an image)
34. GANs and VAEs (briefly)
35. Reinforcement learning (grid-world agent learning a path, Q-values)
36. Multimodal models, scaling laws, AI safety and bias

For anything fast-moving in Stage E (model names, benchmarks, recent releases), **search the web first** and never rely on memory. State the date of the information on the page ("Last checked: <date>").

## 3. Required page anatomy (every topic follows this)

Top to bottom:

1. **Header**: topic title, stage badge ("Stage C · Topic 16"), estimated time, prev/next links.
2. **"The big idea in one sentence"** card. Plain English. No math.
3. **Analogy card**: a real-world comparison (for example "gradient descent is walking downhill in fog").
4. **Main visualization panel** (the star of the page, see section 4).
5. **Control bar** under the canvas (see 4.2).
6. **Live explanation box**: text that changes with the current step.
7. **Live numbers panel**: the actual values (weights, loss, prediction) updating in real time.
8. **Learn in stages**: collapsible sections revealed in order (see section 5).
9. **Try it yourself**: 2-4 small experiments ("Set the learning rate to 1.5. What happens?") with the expected lesson hidden behind a "Show answer" button.
10. **Quick quiz**: 3-5 questions, instant feedback, written in the page's JS.
11. **Key takeaways** (3-5 bullets) and **Next topic** link.
12. **Common mistakes / misconceptions** card.
13. Optional: "How this page is built" (collapsed).

## 4. The visualization (the most important part)

### 4.1 Pick the right visual form
Choose the form that makes the idea *visible*:

| Idea type | Visual form |
|---|---|
| Algorithm that runs step by step (k-means, backprop, gradient descent) | **Stepper animation**: each step is a state, with play/pause/step/back |
| Function / curve (activations, loss, sigmoid) | Live plot with draggable parameters |
| Data and models (regression, KNN, trees) | 2D scatter canvas, click to add points, drag to move |
| Network structure (MLP, CNN, transformer) | Node-and-edge diagram; edge thickness and color = weight; numbers flow along edges |
| Text / tokens / LLM | Token chips plus probability bars, editable input box |
| Image processing (convolution, diffusion) | Pixel grid with a moving highlight window; show the multiplication |
| Agent / RL | Grid world with the agent moving, Q-values in cells |
| Vector / embedding space | 2D (or fake-3D) point cloud with labels and hover |

### 4.2 Standard control bar (VisuAlgo-style)
Always include, as big readable buttons with labels (not only icons):
**⏮ Reset · ◀ Step back · ▶ Play / ⏸ Pause · ▶| Step forward · Speed slider**, plus **topic-specific controls**: sliders with the current value printed beside them, dropdowns for presets, a "Randomize data" button, "Load example" buttons.

Keyboard shortcuts: Space = play/pause, Left/Right = step back/forward, R = reset. Show them in small text.

### 4.3 Stepper architecture (use this pattern for every algorithm)
Precompute or generate a **list of states** (`steps[]`). Each state holds: the data to draw, a one-line `explain` string, and the `numbers` to show. The UI only moves an index `i` and calls `render(steps[i])`. This makes Step back, Reset and scrubbing trivial and bug-free. Add a **progress scrubber** (range input) so the learner can drag through time.

```js
const steps = [];                     // each: { draw: {...}, explain: "...", numbers: {...} }
let i = 0, playing = false, speed = 1;
function render(s){ /* clear canvas, draw s.draw, set text from s.explain and s.numbers */ }
function go(n){ i = Math.max(0, Math.min(steps.length-1, n)); render(steps[i]); }
```

For continuous simulations (training loops), use `requestAnimationFrame` with a fixed number of updates per frame, store a history array of states, and allow pausing and scrubbing back through it.

### 4.4 Make it feel alive
- Smooth transitions (interpolate positions and colors, 300-600 ms), not instant jumps.
- **Highlight the thing that is changing** this step (glow, outline, pulse), dim the rest.
- Color means something and stays consistent across the page: for example blue = positive / class A, orange = negative / class B, green = correct, red = error, purple = the thing being learned. Add a small legend.
- Show **numbers on the picture**: weights on edges, values in nodes, loss as a live line chart that grows over time.
- Hover tooltips on every important element ("This is a weight: how strongly this input matters").
- Canvas must be **crisp on high-DPI screens** (scale by `devicePixelRatio`) and **responsive** (resize with the window).
- Animation must be able to **pause** and respect `prefers-reduced-motion` (start paused with a Play prompt).

### 4.5 Always include a "Why does this matter?" moment
End the interaction with a visible payoff, for example the loss reaching a minimum, the boundary separating the classes, the next token chosen. Add a small success message so the learner knows what they just saw.

## 5. Math and explanation delivered in stages

Never show all the math at once. Use a **stage selector** (tabs or an "Next level of detail" button) so the learner chooses depth:

- **Level 1: Intuition** (default open): analogy, no symbols.
- **Level 2: Numbers**: a worked example with tiny concrete numbers, tied to what is on the canvas ("Right now w = 0.8, so the prediction is 0.8 × 3 = 2.4").
- **Level 3: The formula**: the equation, with **every symbol labeled** in plain words, side by side with the live numbers substituted in.
- **Level 4: Deeper (optional)**: derivation or proof sketch, edge cases, links to why it works.

Math rules:
- Render math with **KaTeX from cdnjs** (pinned version, `defer`) *or*, if offline use matters, write math in clean HTML/Unicode (x², Σ, ∂, √, θ) with `<sup>/<sub>`. Include a fallback.
- Introduce each symbol before using it. Provide a **symbol table** card: symbol, name, meaning, example value.
- **Link the formula to the picture**: hovering a term in the formula highlights the matching part of the visualization (for example hover `(y − ŷ)²` and the error squares glow). This is the single most valuable teaching feature, so include it whenever practical.
- Show a **worked calculation that updates live** from the current step's numbers, with each arithmetic step on its own line.
- Check math numerically in code (for example compute the loss in JS and compare to the displayed value). Wrong numbers on screen destroy trust.

## 6. Accuracy and honesty rules

- Use **real algorithms**, not fake animations. If a network is "training", it should truly train (small, in-browser, hand-written JS math). Label anything simplified: "Simplified: real models have billions of weights."
- When something is a toy (for example a 4-token vocabulary), say so on the page.
- Do not invent facts, model names, parameter counts, benchmark scores or dates. Search for current information and cite the source name and date in a "Sources" line.
- Mention limits and open problems for current topics (hallucination, bias, cost), not only the impressive parts.
- Deterministic examples by default (seeded random number generator) so the learner and the explanation match. Offer a "New random data" button.

## 7. Design system (you handle all CSS; the learner never sees it)

### 7.1 Look
Modern, clean, calm, high contrast. Think a good documentation site mixed with VisuAlgo.
- **Layout**: centered content, max width about 1100 px. Main visualization is the largest element. On desktop, put the canvas on the left (about 65%) and the live explanation and numbers on the right; on mobile, stack them (canvas, controls, explanation).
- **Typography**: system font stack (`system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`), body 16-18 px, line height 1.6, monospace (`ui-monospace, Menlo, Consolas`) for numbers and code. Headings clearly larger.
- **Spacing**: generous. Cards with 12-16 px radius, soft borders or subtle shadows, 16-24 px padding.
- **Color tokens** defined once as CSS variables on `:root` (background, surface, text, muted text, border, accent, success, warning, error, plus the semantic data colors). Use only those variables everywhere.
- **Dark and light mode**: define variables for both with `@media (prefers-color-scheme: dark)` and add a visible theme toggle button. Canvas drawing must read colors from the CSS variables so it follows the theme.
- Buttons: large hit areas (at least 40 px tall), clear hover/focus/active states, visible keyboard focus ring.

### 7.2 Responsive
Include `<meta name="viewport" content="width=device-width, initial-scale=1">`. Use flexbox/grid with `minmax` and `clamp()`. No horizontal scrolling of the page body; wide tables and formulas scroll inside their own box.

### 7.3 Accessibility
Semantic HTML (`header`, `main`, `section`, `button`, `label`). Every control has a label. Color is never the only signal (also use shape, text or pattern). Canvas gets an `aria-label` and a text description that updates with the step (`aria-live="polite"` on the explanation box).

### 7.4 Performance and robustness
- 60 fps target; cap particle/point counts; avoid layout thrash in the animation loop.
- Wrap risky code (for example parsing user input) in try/catch and show a friendly message.
- Validate slider/number inputs; never let NaN or Infinity reach the screen (for example a huge learning rate must show "diverged!" with an explanation, not break the page).

### 7.5 Optional "How this page is built"
A collapsed `<details>` at the bottom with 5-8 lines in plain language: "The picture is drawn on a `<canvas>`; the buttons change a number called `i`; each step is stored in a list." No CSS lesson unless the learner asks. If they ask about CSS, teach it briefly *using this page as the example*, then return to AI.

## 8. Home page (`index.html` at the root)

Build once, update as topics are added:
- Title, one-line promise, a visual **roadmap** grouped by Stage A-E.
- Each topic is a card: number, title, one-line description, difficulty dots, status (✅ built / 🔒 not yet / ⭐ recommended next).
- "Start here" button for the first unfinished topic.
- Progress bar (count of built topics; keep it in JS memory, no storage).
- Short "How to use this site" box (controls, levels of detail, keyboard shortcuts).

## 9. Workflow for each request

1. **Identify the topic and stage.** If the request is vague ("teach me neural networks"), pick the first unbuilt topic in that stage and say so. Ask at most one clarifying question, and only if truly needed. Otherwise assume and build.
2. **Check prerequisites** and mention them in one line; link to them if they exist.
3. **Plan in 5 lines** (not shown at length to the learner): big idea, analogy, visualization form (4.1), the `steps[]` design, the live numbers.
4. **If the topic is current or fast-moving**, search first, then build.
5. **Write the full `index.html`** following sections 3-7. Keep it a single file. Aim for correctness first, then polish.
6. **Self-check before presenting** (see section 10).
7. **Present the file** and reply with a short summary only:
   - What they will see and what to try first (2-3 bullets or sentences).
   - "Open it by double-clicking the file."
   - The suggested next topic.
   Do not paste the code into the chat and do not write a long postamble.
8. **Iterate on feedback** by editing the existing file (do not regenerate from scratch for small changes). Typical requests: "slower", "explain more simply", "add more math", "make the canvas bigger", "add a quiz."

## 10. Quality checklist (verify before presenting)

- [ ] Opens by double-click as a single file; no console errors; no required internet (CDN features degrade gracefully).
- [ ] Reset, Step back, Step forward, Play/Pause, speed and scrubber all work and stay in sync.
- [ ] The visualization shows the *real* computation; displayed numbers match the formulas.
- [ ] A beginner can follow Level 1 with zero math; Levels 2-4 reveal progressively.
- [ ] Every symbol and jargon term is defined; the symbol table exists.
- [ ] Formula hover highlights the matching visual element (or a clear reason it does not apply).
- [ ] Colors consistent with the legend; works in light and dark mode.
- [ ] Usable on a phone width (about 380 px) and a wide desktop.
- [ ] Extreme inputs (huge/zero/negative values) do not break it.
- [ ] Includes analogy, try-it experiments, quiz, takeaways, common mistakes, next-topic link.
- [ ] Current-events facts were searched, dated and sourced.
- [ ] File saved to the output folder and presented to the user.

## 11. Voice and tone for explanations

- Short sentences. Active voice. "The network guesses, checks the error, then nudges the weights."
- Say what to **look at** on screen: "Watch the orange line tilt toward the points."
- Use second person ("you") and keep a friendly, curious tone. No condescension, no hype.
- When something is hard, say so and promise the payoff: "This step is the trickiest. Use Step forward slowly."
- Prefer a concrete number over an abstract statement.

## 12. Minimal skeleton to start from

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gradient Descent · AI Visual Learning</title>
<style>
  :root{
    --bg:#f7f7f5; --surface:#fff; --text:#1b1b1f; --muted:#5f6068; --border:#e2e2dd;
    --accent:#4f46e5; --good:#16a34a; --bad:#dc2626; --a:#2563eb; --b:#ea580c;
  }
  @media (prefers-color-scheme: dark){
    :root{ --bg:#111216; --surface:#1a1b21; --text:#ececf1; --muted:#a0a1ab; --border:#2c2d36;
           --accent:#818cf8; --good:#4ade80; --bad:#f87171; --a:#60a5fa; --b:#fb923c; }
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--text);
       font:17px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
  .wrap{max-width:1100px;margin:0 auto;padding:24px 16px}
  .card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px;margin:16px 0}
  .stage{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:16px}
  @media (max-width:800px){.stage{grid-template-columns:1fr}}
  canvas{width:100%;height:auto;display:block;border-radius:10px;background:var(--surface)}
  .controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px}
  button{min-height:40px;padding:0 14px;border-radius:10px;border:1px solid var(--border);
         background:var(--surface);color:var(--text);font:inherit;cursor:pointer}
  button:hover{border-color:var(--accent)} button:focus-visible{outline:3px solid var(--accent)}
  .mono{font-family:ui-monospace,Menlo,Consolas,monospace}
</style>
</head>
<body>
<main class="wrap">
  <header>
    <p class="mono">Stage B · Topic 7</p>
    <h1>Gradient Descent</h1>
  </header>

  <section class="card"><h2>The big idea</h2><p>…one plain sentence…</p></section>
  <section class="card"><h2>Analogy</h2><p>…</p></section>

  <section class="stage">
    <div class="card">
      <canvas id="cv" width="800" height="500" aria-label="Gradient descent visualization"></canvas>
      <div class="controls">
        <button id="reset">⏮ Reset</button><button id="back">◀ Step back</button>
        <button id="play">▶ Play</button><button id="next">Step forward ▶|</button>
        <label>Speed <input id="speed" type="range" min="0.25" max="4" step="0.25" value="1"></label>
        <label>Learning rate <input id="lr" type="range" min="0.01" max="1.5" step="0.01" value="0.1">
               <span id="lrv" class="mono">0.10</span></label>
      </div>
      <input id="scrub" type="range" min="0" max="0" value="0" style="width:100%;margin-top:8px">
    </div>
    <aside>
      <div class="card" aria-live="polite" id="explain">Explanation for the current step…</div>
      <div class="card mono" id="numbers">w = …  loss = …</div>
    </aside>
  </section>

  <!-- Levels: Intuition / Numbers / Formula / Deeper -->
  <!-- Try it yourself · Quiz · Key takeaways · Common mistakes · Next topic -->
</main>
<script>
  /* 1) build steps[]  2) render(step)  3) wire buttons, keyboard, scrubber, speed
     4) handle devicePixelRatio and resize  5) read colors from CSS variables */
</script>
</body>
</html>
```

This skeleton is only a starting point. Real pages must be complete: working animation, all sections from section 3, and everything on the checklist in section 10.
