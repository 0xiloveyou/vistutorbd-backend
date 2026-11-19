/*
 * Shared runtime for every "next plan" activity.
 *
 * The generator injects one activity as `window.__NEXT_PLAN__.activity`.
 * This file only contains behaviour; all wording lives in the activity data.
 *
 * Sections:
 *   1. state + helpers
 *   2. companion (Bolt) and narration
 *   3. stage renderers (games, visuals, Q&A)
 *   4. controls (sliders and toggles)
 *   5. explanation, hints, check and rounds
 *   6. wiring
 */
(() => {
  "use strict";

  const DATA = window.__NEXT_PLAN__ || {};
  const A = DATA.activity;
  if (!A) return;

  /* ------------------------------------------------------------------ *
   * 1. state + helpers
   * ------------------------------------------------------------------ */
  const BN = "০১২৩৪৫৬৭৮৯";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, reduce ? 30 : ms));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const fmt = (value) => String(Math.round(Number(value) * 100) / 100);
  const signed = (value) => (value > 0 ? `+${value}` : `${value}`);
  const parseNumber = (value) => {
    const ascii = String(value ?? "").replace(/[০-৯]/g, (digit) => String(BN.indexOf(digit)));
    return Number.parseFloat(ascii.replace(",", "."));
  };
  const nm = (value) =>
    lang === "bn" ? String(value).replace(/\d/g, (digit) => BN[digit]) : String(value);
  const esc = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const UI = {
    en: {
      style: "Style",
      sRobot: "Robot explains",
      sLine: "Line art",
      sText: "Text only",
      check: "Check",
      how: "Show me how",
      hint: "Suggestion",
      conf: "I didn’t understand",
      next: "Next",
      again: "Play again",
      nextQuestion: "Next question",
      finish: "Finish",
      round: "Round {r} of {t}",
      question: "Question {r} of {t}",
      stars: "⭐ {s}",
      review: "Today I learned",
      explore: "Explore freely",
      tangent: "Make tangent",
      line: "Show the line",
      lineHide: "Hide the line",
      correct: "Correct",
      notYet: "Not yet",
    },
    bn: {
      style: "স্টাইল",
      sRobot: "রোবট বোঝায়",
      sLine: "রেখাচিত্র",
      sText: "শুধু লেখা",
      check: "যাচাই",
      how: "দেখাও কীভাবে",
      hint: "ইঙ্গিত",
      conf: "আমি বুঝিনি",
      next: "পরের",
      again: "আবার খেলো",
      nextQuestion: "পরের প্রশ্ন",
      finish: "শেষ করো",
      round: "রাউন্ড {r}/{t}",
      question: "প্রশ্ন {r}/{t}",
      stars: "⭐ {s}",
      review: "আজ শিখলাম",
      explore: "স্বাধীনভাবে দেখো",
      tangent: "স্পর্শক বানাও",
      line: "রেখা দেখাও",
      lineHide: "রেখা লুকাও",
      correct: "সঠিক",
      notYet: "এখনও নয়",
    },
  };
  const u = (key, vars = {}) =>
    (UI[lang][key] || UI.en[key] || "").replace(/\{(\w+)\}/g, (m, name) =>
      vars[name] === undefined ? m : nm(vars[name]),
    );

  function T(value, vars = {}) {
    if (!value) return "";
    const text = typeof value === "string" ? value : value[lang] ?? value.en ?? "";
    return text.replace(/\{(\w+)\}/g, (match, name) =>
      vars[name] === undefined ? match : nm(vars[name]),
    );
  }

  let lang = "en";
  let style = A.defaultStyle || "robot";
  let sound = true;
  let round = 0;
  let stars = 0;
  let tries = 0;
  let hintN = 0;
  let stepN = -1;
  let busy = false;
  let ready = false;
  let finished = false;

  let sel = new Set();
  let lift = 0;
  let params = {};
  let guess = "";
  let qIndex = 0;
  let chosen = -1;
  let answered = false;
  let correctCount = 0;
  let shapeTapped = new Set();
  let explore = { line: true };

  const C = A.coach || {};
  const rounds = A.rounds || [];
  const questions = A.questions || [];
  const roundData = () => rounds[Math.min(round, Math.max(0, rounds.length - 1))] || null;
  const isVisual = A.type === "visual";
  const isQuestion = A.type === "question-set";
  const isPlay = A.group === "play-nursery";
  const totalSteps = isQuestion ? questions.length : rounds.length;

  function msg(key, extra = {}) {
    return T(C[key], { ...roundVars(), ...extra });
  }

  function roundVars() {
    const r = roundData();
    if (A.type === "visual") {
      if (A.scene === "pythagoras") {
        const a = params.a ?? 3;
        const b = params.b ?? 4;
        return { a, b, a2: a * a, b2: b * b, c2: a * a + b * b, c: fmt(Math.sqrt(a * a + b * b)) };
      }
      if (A.scene === "parabola")
        return { a: params.a ?? 1, h: params.h ?? 0, k: params.k ?? 0 };
      if (A.scene === "secant") return { a: 1, h: params.h ?? 1, v: 2 };
      return {};
    }
    if (!r) return {};
    if (A.type === "count") return { a: r.target };
    if (A.type === "fraction-pizza") return { a: r.num, b: r.den };
    if (A.type === "integer-elevator")
      return {
        st: r.start,
        m: signed(r.move),
        t: r.start + r.move,
        k: Math.abs(r.move),
        dir: r.move < 0 ? (lang === "bn" ? "নিচে" : "down") : lang === "bn" ? "ওপরে" : "up",
      };
    if (A.type === "quadratic-hoops")
      return { a: r.a, h: r.h, k: r.k, x: r.hoop.x, y: r.hoop.y };
    if (A.type === "secant-slope") return { a: r.a, v: 2 * r.a };
    return {};
  }

  /* ------------------------------------------------------------------ *
   * 2. sound and voice
   * ------------------------------------------------------------------ */
  let audio;
  function beep(freq, duration = 0.12, type = "sine") {
    if (!sound) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = 0.06;
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
      osc.stop(audio.currentTime + duration);
    } catch (error) {
      /* audio is optional */
    }
  }
  const SND = {
    pop: () => beep(520, 0.08),
    ding: () => {
      beep(880, 0.15);
      setTimeout(() => beep(1175, 0.2), 120);
    },
    oops: () => {
      beep(300, 0.18, "sawtooth");
      setTimeout(() => beep(240, 0.26, "sawtooth"), 150);
    },
  };

  let voiceTimer;
  function speak(text) {
    if (!sound || !text || !("speechSynthesis" in window)) return;
    try {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "bn" ? "bn-BD" : "en-US";
      const voice = speechSynthesis
        .getVoices()
        .find((item) => item.lang.replace("_", "-").toLowerCase().startsWith(lang));
      if (voice) utterance.voice = voice;
      utterance.rate = lang === "bn" ? 0.85 : 0.95;
      utterance.pitch = 1.08;
      speechSynthesis.speak(utterance);
      clearTimeout(voiceTimer);
    } catch (error) {
      /* speech is optional */
    }
  }

  /* ------------------------------------------------------------------ *
   * 3. companion: Bolt (cute robot from the folder 1 example)
   * ------------------------------------------------------------------ */
  const robot = $("#robot");
  const bubble = $("#bubble");
  const arm = $("#arm");
  const rsvg = $("#rsvg");
  const cap = $("#cap");
  const RW = 88;
  const RH = 106;

  let talkTimer;
  let hideTimer;
  let atHome = true;

  const home = () => ({ x: 14, y: innerHeight - RH - 14 });

  function setPos(x, y, instant) {
    robot.classList.toggle("nomove", !!instant);
    robot.style.left = `${x}px`;
    robot.style.top = `${y}px`;
    if (instant) {
      void robot.offsetWidth;
      robot.classList.remove("nomove");
    }
    robot.classList.toggle("below", y < 120);
    robot.classList.toggle("right", x + RW / 2 > innerWidth * 0.6);
  }

  function emotion(value) {
    robot.dataset.emo = value || "idle";
  }

  function say(text, ms = 3400) {
    if (!text) return;
    if (style === "robot") {
      clearTimeout(talkTimer);
      clearTimeout(hideTimer);
      bubble.textContent = text;
      bubble.classList.add("show");
      robot.dataset.talk = "on";
      talkTimer = setTimeout(() => {
        robot.dataset.talk = "off";
      }, Math.min(ms, 500 + text.length * 42));
      hideTimer = setTimeout(() => bubble.classList.remove("show"), ms);
      speak(text);
    } else {
      cap.hidden = false;
      cap.textContent = text;
      speak(text);
    }
  }

  async function moveTo(selector) {
    if (style !== "robot") return;
    const target = typeof selector === "string" ? $(selector) : selector;
    if (!target) return;
    target.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    await sleep(450);
    const rect = target.getBoundingClientRect();
    let x = rect.left - RW - 10;
    if (x < 8) x = rect.right + 10;
    x = clamp(x, 8, innerWidth - RW - 8);
    const y = clamp(rect.top + rect.height / 2 - RH / 2, 8, innerHeight - RH - 8);
    atHome = false;
    robot.classList.add("fly");
    setPos(x, y);
    await sleep(1050);
    robot.classList.remove("fly");
  }

  function point(selector) {
    if (style !== "robot") return;
    const target = typeof selector === "string" ? $(selector) : selector;
    if (!target) return;
    const t = target.getBoundingClientRect();
    const r = robot.getBoundingClientRect();
    const dir = t.left + t.width / 2 < r.left + r.width / 2 ? -1 : 1;
    rsvg.style.transform = `scaleX(${dir})`;
    const px = dir === 1 ? r.left + r.width * 0.76 : r.left + r.width * 0.24;
    const py = r.top + r.height * 0.65;
    const dx = (t.left + t.width / 2 - px) * dir;
    const dy = t.top + t.height / 2 - py;
    arm.style.transform = `rotate(${((Math.atan2(dy, dx) * 180) / Math.PI) - 90}deg)`;
  }

  function unpoint() {
    arm.style.transform = "rotate(0deg)";
    rsvg.style.transform = "scaleX(1)";
  }

  async function goHome() {
    if (style !== "robot") return;
    unpoint();
    const spot = home();
    robot.classList.add("fly");
    setPos(spot.x, spot.y);
    await sleep(1050);
    robot.classList.remove("fly");
    atHome = true;
    emotion("idle");
  }

  function hop() {
    robot.classList.remove("hop");
    void robot.offsetWidth;
    robot.classList.add("hop");
    setTimeout(() => robot.classList.remove("hop"), 650);
  }

  function shake() {
    robot.classList.remove("shake");
    void robot.offsetWidth;
    robot.classList.add("shake");
    setTimeout(() => robot.classList.remove("shake"), 550);
  }

  const hl = (selector, on) => {
    const target = typeof selector === "string" ? $(selector) : selector;
    if (target) target.classList.toggle("hl", !!on);
  };
  const clearHl = () => $$(".hl").forEach((element) => element.classList.remove("hl"));

  /* ------------------------------------------------------------------ *
   * 4. small SVG helpers
   * ------------------------------------------------------------------ */
  const text = (x, y, value, options = {}) => {
    const { size = 16, fill = "var(--ink)", anchor = "middle", weight = 700, opacity = 1, id = "", cls = "" } =
      options;
    return `<text ${id ? `id="${id}"` : ""} class="${cls}" x="${fmt(x)}" y="${fmt(y)}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}" opacity="${opacity}">${value}</text>`;
  };
  const rect = (x, y, width, height, options = {}) => {
    const { fill = "none", stroke = "none", sw = 2, rx = 0, id = "", cls = "" } = options;
    return `<rect ${id ? `id="${id}"` : ""} class="${cls}" x="${fmt(x)}" y="${fmt(y)}" width="${fmt(width)}" height="${fmt(height)}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  };
  const circle = (cx, cy, r, options = {}) => {
    const { fill = "none", stroke = "none", sw = 2, id = "", cls = "" } = options;
    return `<circle ${id ? `id="${id}"` : ""} class="${cls}" cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  };
  const line = (x1, y1, x2, y2, options = {}) => {
    const { stroke = "var(--ink)", sw = 2, dash = "", id = "", cls = "" } = options;
    return `<line ${id ? `id="${id}"` : ""} class="${cls}" x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" stroke="${stroke}" stroke-width="${sw}" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
  };

  function graphBox(width = 720, height = 440, xmin = -6, xmax = 6, ymin = -4, ymax = 6) {
    const pad = { left: 54, right: 22, top: 22, bottom: 42 };
    const sx = (x) => pad.left + ((x - xmin) / (xmax - xmin)) * (width - pad.left - pad.right);
    const sy = (y) => height - pad.bottom - ((y - ymin) / (ymax - ymin)) * (height - pad.top - pad.bottom);
    return { width, height, xmin, xmax, ymin, ymax, pad, sx, sy };
  }

  function graphGrid(g, step = 1) {
    let out = "";
    for (let x = Math.ceil(g.xmin); x <= g.xmax; x += step) {
      out += line(g.sx(x), g.sy(g.ymin), g.sx(x), g.sy(g.ymax), { stroke: "#e1e8f5", sw: 1 });
      if (x !== 0) out += text(g.sx(x), g.sy(0) + 16, nm(x), { size: 11, fill: "var(--muted)" });
    }
    for (let y = Math.ceil(g.ymin); y <= g.ymax; y += step) {
      out += line(g.sx(g.xmin), g.sy(y), g.sx(g.xmax), g.sy(y), { stroke: "#e1e8f5", sw: 1 });
      if (y !== 0) out += text(g.sx(0) - 10, g.sy(y) + 4, nm(y), { size: 11, fill: "var(--muted)", anchor: "end" });
    }
    out += line(g.sx(g.xmin), g.sy(0), g.sx(g.xmax), g.sy(0), { stroke: "var(--ink)", sw: 2 });
    out += line(g.sx(0), g.sy(g.ymin), g.sx(0), g.sy(g.ymax), { stroke: "var(--ink)", sw: 2 });
    out += text(g.sx(g.xmax) - 6, g.sy(0) - 8, "x", { size: 13, fill: "var(--muted)" });
    out += text(g.sx(0) + 10, g.sy(g.ymax) + 8, "y", { size: 13, fill: "var(--muted)" });
    return out;
  }

  function parabolaPath(g, a, h, k, samples = 140) {
    const points = [];
    for (let i = 0; i <= samples; i += 1) {
      const x = g.xmin + ((g.xmax - g.xmin) * i) / samples;
      const y = a * (x - h) ** 2 + k;
      if (Number.isFinite(y) && y >= g.ymin - 1 && y <= g.ymax + 1) {
        points.push(`${g.sx(x) + 0},${g.sy(y)}`);
      }
    }
    return points.length > 1 ? `M${points.join(" L")}` : "";
  }

  /* ------------------------------------------------------------------ *
   * 5. stage renderers
   * ------------------------------------------------------------------ */
  function stageCount() {
    const r = roundData();
    const total = 9;
    const positions = [
      [90, 150], [170, 110], [250, 145], [320, 105], [120, 235],
      [205, 210], [285, 240], [345, 190], [250, 300],
    ];
    let mangoes = "";
    positions.slice(0, total).forEach(([x, y], index) => {
      const on = sel.has(index);
      mangoes += `<g class="mango" data-act="mango" data-i="${index}" tabindex="0" role="button" aria-label="${esc(T(r.itemName))} ${nm(index + 1)}" aria-pressed="${on}">`
        + circle(x, y, 24, { fill: on ? "rgba(247,183,51,.28)" : "rgba(255,255,255,.6)", stroke: on ? "var(--cheese)" : "#c9d5e8", sw: 2 })
        + `<text x="${x}" y="${y + 9}" font-size="32" text-anchor="middle" ${on ? 'opacity=".35"' : ""}>${r.item}</text></g>`;
    });
    const basket = [...sel]
      .map((index, order) => `<text x="${470 + (order % 4) * 42}" y="${300 - Math.floor(order / 4) * 40}" font-size="30" text-anchor="middle">${r.item}</text>`)
      .join("");
    return `<svg viewBox="0 0 720 420" role="img" aria-label="${esc(T(A.title))}">
      ${rect(0, 0, 720, 420, { fill: "#f7fbff", rx: 18 })}
      <path d="M70 330 q120 -40 300 0" fill="none" stroke="#9c6b3f" stroke-width="14" stroke-linecap="round"/>
      <path d="M120 180 q100 -120 250 -70 q80 30 30 130 q-80 90 -200 40 q-100 -40 -80 -100Z" fill="#cfead8" stroke="#2f9e63" stroke-width="3"/>
      <g id="tree">${mangoes}</g>
      ${rect(470, 240, 210, 120, { fill: "#f6d3a4", stroke: "#9c6b3f", sw: 4, rx: 18 })}
      <path d="M480 270h190M480 300h190M505 250v100M540 250v100M575 250v100M610 250v100M645 250v100" stroke="#c08a55" stroke-width="2" opacity=".7"/>
      ${basket}
      <g id="numCard">
        ${rect(500, 40, 150, 120, { fill: "#fff", stroke: "var(--ink)", sw: 3, rx: 18 })}
        ${text(575, 86, lang === "bn" ? "সংখ্যা" : "Put in basket", { size: 14, fill: "var(--muted)" })}
        ${text(575, 138, nm(r.target), { size: 62, fill: "var(--accent)" })}
      </g>
      <g id="basket">
        ${text(575, 236, `${lang === "bn" ? "ঝুড়িতে" : "In basket"}: ${nm(sel.size)}`, { size: 16, fill: "var(--muted)" })}
      </g>
    </svg>`;
  }

  function stageFraction() {
    const r = roundData();
    const cx = 270;
    const cy = 210;
    const radius = 160;
    let slices = "";
    for (let i = 0; i < r.den; i += 1) {
      const a0 = ((-90 + (i * 360) / r.den) * Math.PI) / 180;
      const a1 = ((-90 + ((i + 1) * 360) / r.den) * Math.PI) / 180;
      const am = (a0 + a1) / 2;
      const on = sel.has(i);
      slices += `<path class="slice ${on ? "on" : ""}" data-act="slice" data-i="${i}" tabindex="0" role="button" aria-pressed="${on}" aria-label="${lang === "bn" ? "টুকরো" : "slice"} ${nm(i + 1)}" d="M${cx} ${cy}L${fmt(cx + radius * Math.cos(a0))} ${fmt(cy + radius * Math.sin(a0))}A${radius} ${radius} 0 0 1 ${fmt(cx + radius * Math.cos(a1))} ${fmt(cy + radius * Math.sin(a1))}Z"/>`;
      if (on) {
        slices += circle(cx + radius * 0.62 * Math.cos(am), cy + radius * 0.62 * Math.sin(am), 8, { fill: "var(--accent)" });
      }
    }
    return `<svg viewBox="0 0 720 420" role="img" aria-label="${esc(T(A.title))}">
      ${rect(0, 0, 720, 420, { fill: "#fff8ec", rx: 18 })}
      <g id="fracCard">
        ${rect(470, 90, 200, 220, { fill: "#fff", stroke: "var(--ink)", sw: 3, rx: 18 })}
        ${text(570, 130, lang === "bn" ? "গ্রাহকের অর্ডার" : "Customer order", { size: 14, fill: "var(--muted)" })}
        ${text(570, 226, nm(r.num), { size: 58 })}
        ${line(530, 244, 610, 244, { stroke: "var(--ink)", sw: 5 })}
        ${text(570, 296, nm(r.den), { size: 58 })}
      </g>
      <g id="pizzaSvg">
        ${circle(cx, cy, radius + 6, { fill: "var(--base)", stroke: "#d9a441", sw: 6 })}
        ${slices}
      </g>
      ${text(270, 398, lang === "bn" ? "টুকরোতে ট্যাপ করো" : "Tap the slices", { size: 16, fill: "var(--muted)" })}
    </svg>`;
  }

  function stageElevator() {
    const r = roundData();
    const minFloor = -7;
    const maxFloor = 8;
    const top = 26;
    const step = 26;
    const floors = [];
    for (let f = maxFloor; f >= minFloor; f -= 1) {
      const y = top + (maxFloor - f) * step;
      const ground = f === 0;
      floors.push(
        line(150, y, 470, y, { stroke: ground ? "var(--ink)" : "#c9d5e8", sw: ground ? 4 : 1.5 })
        + text(132, y + 5, nm(f), { size: 13, anchor: "end", fill: f < 0 ? "var(--accent)" : "var(--ink)" })
        + (f === 0 ? text(480, y + 5, lang === "bn" ? "মাটি" : "ground", { size: 12, anchor: "start", fill: "var(--muted)" }) : ""),
      );
    }
    const liftY = top + (maxFloor - lift) * step - 18;
    return `<svg viewBox="0 0 720 470" role="img" aria-label="${esc(T(A.title))}">
      ${rect(0, 0, 720, 470, { fill: "#f7fbff", rx: 18 })}
      ${rect(150, top - 14, 320, (maxFloor - minFloor) * step + 18, { fill: "#eef5ff", stroke: "var(--ink)", sw: 3, rx: 8 })}
      <g id="building">${floors.join("")}</g>
      <g id="lift">
        ${rect(286, liftY, 96, 34, { fill: "var(--cheese)", stroke: "var(--ink)", sw: 3, rx: 8 })}
        ${text(334, liftY + 23, nm(lift), { size: 18 })}
        ${text(334, liftY - 6, lang === "bn" ? "লিফট" : "lift", { size: 11, fill: "var(--muted)" })}
      </g>
      <g id="liftCard">
        ${rect(500, 80, 190, 150, { fill: "#fff", stroke: "var(--ink)", sw: 3, rx: 18 })}
        ${text(595, 110, lang === "bn" ? "শুরু" : "Start", { size: 13, fill: "var(--muted)" })}
        ${text(595, 146, nm(r.start), { size: 34 })}
        ${text(595, 182, lang === "bn" ? "চলো" : "Move", { size: 13, fill: "var(--muted)" })}
        ${text(595, 216, signed(r.move), { size: 34, fill: "var(--accent)" })}
      </g>
      <g class="floorbtn" data-act="up" tabindex="0" role="button" aria-label="${lang === "bn" ? "ওপরে" : "Up"}">
        ${rect(520, 280, 140, 58, { fill: "#e4f7ec", stroke: "var(--ink)", sw: 3, rx: 14 })}
        ${text(590, 317, "▲ " + (lang === "bn" ? "ওপরে" : "Up"), { size: 20 })}
      </g>
      <g class="floorbtn" data-act="down" tabindex="0" role="button" aria-label="${lang === "bn" ? "নিচে" : "Down"}">
        ${rect(520, 352, 140, 58, { fill: "#ffe9e2", stroke: "var(--ink)", sw: 3, rx: 14 })}
        ${text(590, 389, "▼ " + (lang === "bn" ? "নিচে" : "Down"), { size: 20 })}
      </g>
      ${text(334, 450, `${lang === "bn" ? "এখন" : "Now"}: ${nm(lift)}`, { size: 18, fill: "var(--blue)" })}
    </svg>`;
  }

  function stageQuadratic() {
    const r = roundData();
    const g = graphBox(720, 440, -6, 6, -5, 7);
    const a = params.a ?? 1;
    const h = params.h ?? 0;
    const k = params.k ?? 0;
    return `<svg viewBox="0 0 720 440" role="img" aria-label="${esc(T(A.title))}">
      ${rect(0, 0, 720, 440, { fill: "#fbfdff", rx: 18 })}
      ${graphGrid(g)}
      <path id="targetGhost" d="${parabolaPath(g, r.a, r.h, r.k)}" fill="none" stroke="#b9c6dd" stroke-width="2.5" stroke-dasharray="7 7"/>
      <path id="parabola" class="curve" d="${parabolaPath(g, a, h, k)}"/>
      <g id="vertex">${circle(g.sx(h), g.sy(k), 6, { fill: "var(--accent)" })}${text(g.sx(h) + 12, g.sy(k) - 10, `(${nm(h)}, ${nm(k)})`, { size: 12, anchor: "start", fill: "var(--accent)" })}</g>
      <g id="hoop">${circle(g.sx(r.hoop.x), g.sy(r.hoop.y), 18, { fill: "rgba(47,158,99,.14)", stroke: "var(--green)", sw: 4 })}${text(g.sx(r.hoop.x), g.sy(r.hoop.y) + 5, "◎", { size: 20, fill: "var(--green)" })}</g>
      ${text(650, 398, `y = ${nm(a)}(x − ${nm(h)})² + ${nm(k)}`, { size: 14, anchor: "end", fill: "var(--blue)" })}
      ${text(54, 24, lang === "bn" ? "লক্ষ্য: হুপ ও ড্যাশ রেখা" : "Target: hoop + dashed curve", { size: 12, anchor: "start", fill: "var(--muted)" })}
    </svg>`;
  }

  function stageSecant() {
    const r = roundData();
    const g = graphBox(720, 440, -3, 6, -3, 12);
    const a = r.a;
    const h = params.h ?? 1;
    const ah = a + h;
    const slope = 2 * a + h;
    const intercept = a * a - slope * a;
    const lineY = (x) => slope * x + intercept;
    const clip = `clip-path="url(#plotClip)"`;
    return `<svg viewBox="0 0 720 440" role="img" aria-label="${esc(T(A.title))}">
      <defs><clipPath id="plotClip"><rect x="${g.pad.left}" y="${g.pad.top}" width="${g.width - g.pad.left - g.pad.right}" height="${g.height - g.pad.top - g.pad.bottom}"/></clipPath></defs>
      ${rect(0, 0, 720, 440, { fill: "#fbfdff", rx: 18 })}
      ${graphGrid(g, 2)}
      <path d="${parabolaPath(g, 1, 0, 0, 220)}" fill="none" stroke="var(--blue)" stroke-width="3" ${clip}/>
      <g ${clip}>
        <path id="secLine" class="secant" d="M${g.sx(g.xmin)} ${g.sy(lineY(g.xmin))}L${g.sx(g.xmax)} ${g.sy(lineY(g.xmax))}" fill="none"/>
      </g>
      <g id="secPointA">${circle(g.sx(a), g.sy(a * a), 7, { fill: "var(--accent)" })}${text(g.sx(a) - 8, g.sy(a * a) - 12, `A (${nm(a)}, ${nm(a * a)})`, { size: 12, anchor: "end", fill: "var(--accent)" })}</g>
      <g id="secPointB">${circle(g.sx(ah), g.sy(ah * ah), 7, { fill: "var(--green)" })}${text(g.sx(ah) + 8, g.sy(ah * ah) - 12, `B`, { size: 12, anchor: "start", fill: "var(--green)" })}</g>
      <g id="secTable">
        ${rect(520, 52, 170, 116, { fill: "#fff", stroke: "var(--ink)", sw: 2, rx: 12 })}
        ${text(605, 76, lang === "bn" ? "h" : "h", { size: 12, fill: "var(--muted)" })}
        ${text(660, 76, lang === "bn" ? "ঢাল" : "slope", { size: 12, fill: "var(--muted)" })}
        ${[1, 0.5, 0.1, 0.01].map((value, index) => `${text(605, 98 + index * 18, nm(value), { size: 11 })}${text(660, 98 + index * 18, nm(fmt(2 * a + value)), { size: 11, fill: "var(--blue)" })}`).join("")}
      </g>
      ${text(54, 24, `${lang === "bn" ? "এখন" : "Now"}: h = ${nm(h)} · ${lang === "bn" ? "ঢাল" : "slope"} = ${nm(fmt(slope))}`, { size: 13, anchor: "start", fill: "var(--blue)" })}
    </svg>`;
  }

  function stageShapes() {
    const found = (name) => shapeTapped.has(name);
    return `<svg viewBox="0 0 720 440" role="img" aria-label="${esc(T(A.title))}">
      ${rect(0, 0, 720, 440, { fill: "#eef8ff", rx: 18 })}
      ${rect(0, 300, 720, 140, { fill: "#d8f0d8" })}
      <g class="shape" data-act="shape" data-name="circle" id="shape-circle" tabindex="0" role="button" aria-label="${lang === "bn" ? "বৃত্ত" : "circle"}">
        ${circle(110, 84, 48, { fill: found("circle") ? "#ffd23f" : "#ffe89a", stroke: "#e0a800", sw: 4 })}
        ${text(110, 92, "☀", { size: 36 })}
        ${text(110, 152, lang === "bn" ? "বৃত্ত" : "circle", { size: 14, fill: found("circle") ? "var(--accent)" : "var(--muted)" })}
      </g>
      <g id="shape-square" class="shape" data-act="shape" data-name="square" tabindex="0" role="button" aria-label="${lang === "bn" ? "বর্গ" : "square"}">
        ${rect(280, 70, 120, 120, { fill: found("square") ? "#bfe3ff" : "#dcefff", stroke: "#3a6ea5", sw: 4, rx: 2 })}
        <path d="M340 70v120M280 130h120" stroke="#3a6ea5" stroke-width="3"/>
        ${text(340, 214, lang === "bn" ? "বর্গ" : "square", { size: 14, fill: found("square") ? "var(--accent)" : "var(--muted)" })}
      </g>
      <g id="shape-triangle" class="shape" data-act="shape" data-name="triangle" tabindex="0" role="button" aria-label="${lang === "bn" ? "ত্রিভুজ" : "triangle"}">
        <path d="M505 190L590 40L675 190Z" fill="${found("triangle") ? "#ffc9b8" : "#ffe3db"}" stroke="#c9553a" stroke-width="4"/>
        ${text(590, 214, lang === "bn" ? "ত্রিভুজ" : "triangle", { size: 14, fill: found("triangle") ? "var(--accent)" : "var(--muted)" })}
      </g>
      <g id="shape-rect" class="shape" data-act="shape" data-name="rectangle" tabindex="0" role="button" aria-label="${lang === "bn" ? "আয়তক্ষেত্র" : "rectangle"}">
        ${rect(290, 300, 150, 110, { fill: found("rectangle") ? "#d8c7ff" : "#e9e1ff", stroke: "#6b4bb8", sw: 4, rx: 4 })}
        ${circle(365, 372, 5, { fill: "#6b4bb8" })}
        ${text(365, 434, lang === "bn" ? "আয়তক্ষেত্র" : "rectangle", { size: 14, fill: found("rectangle") ? "var(--accent)" : "var(--muted)" })}
      </g>
      <path d="M40 330 q80 -40 160 0 t160 0 t160 0 t160 0" fill="none" stroke="#2f9e63" stroke-width="4" opacity=".5"/>
      ${text(590, 330, found("circle") && found("square") && found("triangle") && found("rectangle") ? "🎉" : "🔎", { size: 34 })}
    </svg>`;
  }

  function stageFractionWall() {
    const bars = [
      { id: "frac-half", label: "1/2", parts: 2, filled: 1, y: 96, colour: "#f7b733" },
      { id: "frac-quarters", label: "2/4", parts: 4, filled: 2, y: 176, colour: "#3a6ea5" },
      { id: "frac-eighths", label: "4/8", parts: 8, filled: 4, y: 256, colour: "#2f9e63" },
    ];
    const x0 = 160;
    const width = 400;
    const groups = bars
      .map((bar) => {
        const part = width / bar.parts;
        let inner = "";
        for (let index = 0; index < bar.parts; index += 1) {
          inner += rect(x0 + index * part, bar.y, part, 46, {
            fill: index < bar.filled ? bar.colour : "#f4f7fc",
            stroke: "var(--ink)",
            sw: 2,
          });
        }
        inner += text(120, bar.y + 30, bar.label, { size: 20, anchor: "end" });
        inner += rect(x0 - 6, bar.y - 6, width + 12, 58, {
          fill: "none",
          stroke: "var(--ink)",
          sw: 2.5,
          rx: 8,
        });
        return `<g id="${bar.id}">${inner}</g>`;
      })
      .join("");
    const marker = explore.line
      ? line(x0 + width, 82, x0 + width, 322, {
          stroke: "var(--accent)",
          sw: 2.5,
          dash: "6 5",
        })
      : "";
    return `<svg viewBox="0 0 720 380" role="img" aria-label="${esc(T(A.title))}">
      ${rect(0, 0, 720, 380, { fill: "#fff", rx: 18 })}
      ${text(360, 44, lang === "bn" ? "একই দৈর্ঘ্য, তিনটি নাম" : "Same length, three names", { size: 20 })}
      ${groups}
      <g id="frac-line">${marker}</g>
      ${text(360, 348, "1/2 = 2/4 = 4/8", { size: 24, fill: "var(--blue)" })}
    </svg>`;
  }

  function stagePythagoras() {
    const a = params.a ?? 3;
    const b = params.b ?? 4;
    const s = 22;
    const ox = 300;
    const oy = 360;
    const A = [ox, oy];
    const B = [ox + a * s, oy];
    const C = [ox, oy - b * s];
    const c2 = a * a + b * b;
    const c = Math.sqrt(c2);
    const perp = [b * s, -a * s];
    const sq = [B, C, [C[0] + perp[0], C[1] + perp[1]], [B[0] + perp[0], B[1] + perp[1]]];
    const poly = (points, fill, stroke) => `<path d="M${points.map((point) => point.join(" ")).join(" L")}Z" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
    return `<svg viewBox="0 0 720 520" role="img" aria-label="${esc(T(A.title))}">
      ${rect(0, 0, 720, 520, { fill: "#fbfdff", rx: 18 })}
      <g id="pyth-a">${poly([[ox, oy], [ox + a * s, oy], [ox + a * s, oy + a * s], [ox, oy + a * s]], "#ffe0b2", "#e08b00")}${text(ox + (a * s) / 2, oy + (a * s) / 2 + 6, `a² = ${nm(a * a)}`, { size: 16 })}</g>
      <g id="pyth-b">${poly([[ox, oy], [ox - b * s, oy], [ox - b * s, oy - b * s], [ox, oy - b * s]], "#c8e6ff", "#3a6ea5")}${text(ox - (b * s) / 2, oy - (b * s) / 2 + 6, `b² = ${nm(b * b)}`, { size: 16 })}</g>
      <g id="pyth-c">${poly(sq, "#d6f5e3", "#2f9e63")}${text((sq[0][0] + sq[2][0]) / 2, (sq[0][1] + sq[2][1]) / 2 + 6, `c² = ${nm(c2)}`, { size: 16 })}</g>
      ${poly([A, B, C], "#fff4d6", "var(--ink)")}
      ${rect(ox, oy - 18, 18, 18, { fill: "none", stroke: "var(--ink)", sw: 2 })}
      ${text(ox + 12, oy - 24, "a", { size: 16, fill: "var(--accent)" })}
      ${text(ox - 18, oy - 12, "b", { size: 16, fill: "var(--blue)", anchor: "end" })}
      ${text((B[0] + C[0]) / 2 + 14, (B[1] + C[1]) / 2, "c", { size: 16, fill: "var(--green)", anchor: "start" })}
      <g id="pyth-eq">${rect(250, 20, 220, 48, { fill: "#fff", stroke: "var(--ink)", sw: 2, rx: 12 })}${text(360, 50, `${nm(a * a)} + ${nm(b * b)} = ${nm(c2)}`, { size: 20 })}</g>
      ${text(360, 500, `c = √${nm(c2)} ≈ ${nm(fmt(c))}`, { size: 16, fill: "var(--muted)" })}
    </svg>`;
  }

  function stageParabola() {
    const a = params.a ?? 1;
    const h = params.h ?? 0;
    const k = params.k ?? 0;
    const g = graphBox(720, 440, -7, 7, -6, 8);
    const disc = -k / a;
    let roots = "";
    if (a !== 0 && disc >= 0) {
      const x1 = h - Math.sqrt(disc);
      const x2 = h + Math.sqrt(disc);
      roots = circle(g.sx(x1), g.sy(0), 5, { fill: "var(--accent)" })
        + circle(g.sx(x2), g.sy(0), 5, { fill: "var(--accent)" })
        + text(g.sx(x1), g.sy(0) + 22, nm(fmt(x1)), { size: 11, fill: "var(--accent)" })
        + text(g.sx(x2), g.sy(0) + 22, nm(fmt(x2)), { size: 11, fill: "var(--accent)" });
    }
    return `<svg viewBox="0 0 720 440" role="img" aria-label="${esc(T(A.title))}">
      ${rect(0, 0, 720, 440, { fill: "#fbfdff", rx: 18 })}
      ${graphGrid(g)}
      ${line(g.sx(h), g.sy(g.ymin), g.sx(h), g.sy(g.ymax), { stroke: "var(--muted)", sw: 1.5, dash: "5 5", id: "par-axis" })}
      <path id="par-curve" class="curve" d="${parabolaPath(g, a, h, k)}"/>
      <g id="par-vertex">${circle(g.sx(h), g.sy(k), 7, { fill: "var(--accent)" })}${text(g.sx(h) + 12, g.sy(k) - 10, `(${nm(h)}, ${nm(k)})`, { size: 12, anchor: "start", fill: "var(--accent)" })}</g>
      <g id="par-roots">${roots}</g>
      ${text(650, 410, `y = ${nm(a)}(x − ${nm(h)})² + ${nm(k)}`, { size: 14, anchor: "end", fill: "var(--blue)" })}
    </svg>`;
  }

  function stageSecantVisual() {
    const g = graphBox(720, 440, -2, 4, -1, 9);
    const a = 1;
    const h = params.h ?? 1;
    const slope = 2 * a + h;
    const intercept = a * a - slope * a;
    const lineY = (x) => slope * x + intercept;
    return `<svg viewBox="0 0 720 440" role="img" aria-label="${esc(T(A.title))}">
      <defs><clipPath id="plotClip2"><rect x="${g.pad.left}" y="${g.pad.top}" width="${g.width - g.pad.left - g.pad.right}" height="${g.height - g.pad.top - g.pad.bottom}"/></clipPath></defs>
      ${rect(0, 0, 720, 440, { fill: "#fbfdff", rx: 18 })}
      ${graphGrid(g)}
      <path d="${parabolaPath(g, 1, 0, 0, 200)}" fill="none" stroke="var(--blue)" stroke-width="3" clip-path="url(#plotClip2)"/>
      <g clip-path="url(#plotClip2)">
        <path id="sec-line" class="secant" d="M${g.sx(g.xmin)} ${g.sy(lineY(g.xmin))}L${g.sx(g.xmax)} ${g.sy(lineY(g.xmax))}" fill="none"/>
      </g>
      <g id="sec-pointA">${circle(g.sx(a), g.sy(1), 7, { fill: "var(--accent)" })}${text(g.sx(a) + 10, g.sy(1) - 10, "A", { size: 14, anchor: "start", fill: "var(--accent)" })}</g>
      <g id="sec-pointB">${circle(g.sx(a + h), g.sy((a + h) ** 2), 7, { fill: "var(--green)" })}${text(g.sx(a + h) + 10, g.sy((a + h) ** 2) - 10, "B", { size: 14, anchor: "start", fill: "var(--green)" })}</g>
      <g id="sec-table">
        ${rect(500, 56, 190, 140, { fill: "#fff", stroke: "var(--ink)", sw: 2, rx: 12 })}
        ${text(548, 80, "h", { size: 12, fill: "var(--muted)" })}
        ${text(628, 80, lang === "bn" ? "ঢাল" : "slope", { size: 12, fill: "var(--muted)" })}
        ${[1, 0.5, 0.1, 0.01].map((value, index) => `${text(548, 104 + index * 22, nm(value), { size: 12 })}${text(628, 104 + index * 22, nm(fmt(2 + value)), { size: 12, fill: "var(--blue)" })}`).join("")}
      </g>
      ${text(54, 24, `${lang === "bn" ? "এখন" : "Now"}: h = ${nm(h)} · ${lang === "bn" ? "ঢাল" : "slope"} = ${nm(fmt(slope))}`, { size: 13, anchor: "start", fill: "var(--blue)" })}
    </svg>`;
  }

  function questionScene(question) {
    const data = question.sceneData || {};
    if (question.scene === "count") {
      const left = Number(data.left || 0);
      const right = Number(data.right || 0);
      const item = data.item || "🍎";
      const group = (x, count, label) =>
        rect(x, 40, 240, 110, { fill: "#fff", stroke: "var(--ink)", sw: 2, rx: 14 })
        + text(x + 120, 30, label, { size: 13, fill: "var(--muted)" })
        + [...Array(count)].map((_, index) => `<text x="${x + 30 + (index % 4) * 50}" y="${70 + Math.floor(index / 4) * 40}" font-size="28" text-anchor="middle">${item}</text>`).join("");
      return `<svg viewBox="0 0 540 160" role="img">${group(10, left, lang === "bn" ? "দল ১" : "Group 1")}${group(290, right, lang === "bn" ? "দল ২" : "Group 2")}</svg>`;
    }
    if (question.scene === "fraction") {
      const numA = Number(data.numA || 1);
      const numB = Number(data.numB || 1);
      const den = Number(data.den || 4);
      const bar = (x, num, label, colour) => {
        const width = 180;
        const part = width / den;
        let out = text(x + width / 2, 26, label, { size: 18 });
        for (let i = 0; i < den; i += 1) {
          out += rect(x + i * part, 40, part, 32, { fill: i < num ? colour : "#f4f7fc", stroke: "var(--ink)", sw: 2 });
        }
        return out;
      };
      return `<svg viewBox="0 0 520 110" role="img">${bar(20, numA, `${nm(numA)}/${nm(den)}`, "var(--cheese)")}${bar(300, numB, `${nm(numB)}/${nm(den)}`, "var(--blue)")}</svg>`;
    }
    if (question.scene === "bar") {
      if (data.discount) {
        return `<svg viewBox="0 0 520 120" role="img">
          ${rect(20, 30, 480, 50, { fill: "#e8f0ff", stroke: "var(--ink)", sw: 2, rx: 10 })}
          ${rect(20, 30, (480 * Number(data.discount)) / 100, 50, { fill: "var(--accent)", rx: 10 })}
          ${text(260, 104, `${nm(data.value)} − ${nm(data.discount)}%`, { size: 18 })}
        </svg>`;
      }
      const tens = Number(data.tens || 4);
      const ones = Number(data.ones || 7);
      return `<svg viewBox="0 0 520 120" role="img">
        ${[...Array(tens)].map((_, index) => rect(30 + index * 48, 24, 32, 64, { fill: "var(--cheese)", stroke: "var(--ink)", sw: 2, rx: 5 })).join("")}
        ${[...Array(ones)].map((_, index) => rect(270 + index * 28, 60, 20, 28, { fill: "var(--blue)", stroke: "var(--ink)", sw: 2, rx: 4 })).join("")}
        ${text(260, 112, lang === "bn" ? "দশক" : "tens", { size: 12, fill: "var(--muted)" })}
        ${text(420, 112, lang === "bn" ? "একক" : "ones", { size: 12, fill: "var(--muted)" })}
      </svg>`;
    }
    if (question.scene === "graph") {
      const g = graphBox(520, 220, -2, 6, -2, 6);
      const type = data.type;
      if (type === "area") {
        const a = Number(data.a || 2);
        const to = Number(data.to || 3);
        return `<svg viewBox="0 0 520 220" role="img">${rect(0, 0, 520, 220, { fill: "#fbfdff", rx: 12 })}${graphGrid(g, 1)}<path d="M${g.sx(0)} ${g.sy(0)}L${g.sx(to)} ${g.sy(a * to)}L${g.sx(to)} ${g.sy(0)}Z" fill="rgba(58,110,165,.2)" stroke="var(--blue)" stroke-width="2"/></svg>`;
      }
      return `<svg viewBox="0 0 520 220" role="img">${rect(0, 0, 520, 220, { fill: "#fbfdff", rx: 12 })}${graphGrid(g, 1)}<path d="${parabolaPath(g, 1, 2.5, -0.25)}" fill="none" stroke="var(--blue)" stroke-width="3"/></svg>`;
    }
    return "";
  }

  function stageQuestion() {
    const question = questions[qIndex];
    if (!question) return "";
    const options = question.options
      .map((option, index) => {
        const state = answered
          ? option.correct
            ? "ok"
            : chosen === index
              ? "bad"
              : ""
          : "";
        return `<button type="button" class="option ${state}" data-act="option" data-i="${index}" aria-pressed="${chosen === index}">
          <span class="key">${nm(index + 1)}</span><span>${esc(T(option.label))}</span>
        </button>`;
      })
      .join("");
    return `<div style="width:100%">
      <p class="q-progress">${u("question", { r: qIndex + 1, t: questions.length })}</p>
      ${questionScene(question)}
      <p class="q-prompt" id="qPrompt">${esc(T(question.prompt))}</p>
      <div class="opt-list" id="optList" role="group" aria-label="${lang === "bn" ? "উত্তর" : "Answers"}">${options}</div>
      <div class="explain" id="explain" ${answered ? "" : "hidden"}>${answered ? esc(T(question.explain)) : ""}</div>
    </div>`;
  }

  const STAGES = {
    count: stageCount,
    "fraction-pizza": stageFraction,
    "integer-elevator": stageElevator,
    "quadratic-hoops": stageQuadratic,
    "secant-slope": stageSecant,
    "question-set": stageQuestion,
  };

  function stageVisual() {
    if (A.scene === "shapes") return stageShapes();
    if (A.scene === "fraction-wall") return stageFractionWall();
    if (A.scene === "pythagoras") return stagePythagoras();
    if (A.scene === "parabola") return stageParabola();
    if (A.scene === "secant") return stageSecantVisual();
    return "";
  }

  function renderStage() {
    $("#stage").innerHTML = isVisual ? stageVisual() : (STAGES[A.type] ? STAGES[A.type]() : "");
  }

  /* ------------------------------------------------------------------ *
   * 6. controls
   * ------------------------------------------------------------------ */
  function range(label, param, value, min, max, step) {
    return `<label class="control">
      <span>${label}: <output id="out-${param}">${nm(value)}</output></span>
      <input type="range" data-param="${param}" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label}">
    </label>`;
  }

  function controlsFor() {
    if (A.type === "quadratic-hoops") {
      return range(lang === "bn" ? "a (প্রস্থ)" : "a (width)", "a", params.a ?? 1, -2, 2, 0.5)
        + range("h", "h", params.h ?? 0, -5, 5, 0.5)
        + range("k", "k", params.k ?? 0, -5, 5, 0.5);
    }
    if (A.type === "secant-slope") {
      return range("h", "h", params.h ?? 1, 0.01, 1.5, 0.01)
        + `<label class="control"><span>${lang === "bn" ? "তোমার সীমা" : "Your limit"}</span><input id="guess" inputmode="decimal" autocomplete="off" value="${esc(guess)}" aria-label="${lang === "bn" ? "সীমা" : "limit"}"></label>`
        + `<button type="button" class="mini" data-act="tangent">${u("tangent")}</button>`;
    }
    if (A.type === "visual") {
      if (A.scene === "pythagoras") {
        return range("a", "a", params.a ?? 3, 2, 7, 1) + range("b", "b", params.b ?? 4, 2, 7, 1);
      }
      if (A.scene === "parabola") {
        return range(lang === "bn" ? "a (প্রস্থ)" : "a (width)", "a", params.a ?? 1, -2, 2, 0.5)
          + range("h", "h", params.h ?? 0, -5, 5, 0.5)
          + range("k", "k", params.k ?? 0, -5, 5, 0.5);
      }
      if (A.scene === "secant") {
        return range("h", "h", params.h ?? 1, 0.01, 1.5, 0.01)
          + `<button type="button" class="mini" data-act="tangent">${u("tangent")}</button>`;
      }
      if (A.scene === "fraction-wall") {
        return `<button type="button" class="mini ${explore.line ? "on" : ""}" data-act="line" aria-pressed="${explore.line}">${explore.line ? u("lineHide") : u("line")}</button>`;
      }
    }
    return "";
  }

  function renderControls() {
    const html = controlsFor();
    const box = $("#controls");
    box.innerHTML = html;
    box.hidden = !html;
  }

  function syncOutput(param) {
    const output = $(`#out-${param}`);
    if (output) output.textContent = nm(params[param]);
  }

  /* ------------------------------------------------------------------ *
   * 7. header and language
   * ------------------------------------------------------------------ */
  function updateHeader() {
    $("#title").textContent = T(A.title);
    $("#goal").textContent = T(A.goal);
    $("#kicker").textContent = `${T(DATA.groupLabel)} · ${T(DATA.kindLabel)}`;
    const current = isQuestion ? qIndex + 1 : round + 1;
    const pill = isQuestion
      ? totalSteps > 1
        ? u("question", { r: current, t: totalSteps })
        : ""
      : totalSteps > 1
        ? u("round", { r: current, t: totalSteps })
        : "";
    $("#roundPill").textContent = pill;
    $("#starPill").textContent = u("stars", { s: stars });
    document.documentElement.lang = lang;
  }

  function applyUiText() {
    $$("[data-k]").forEach((element) => {
      element.textContent = u(element.dataset.k);
    });
    const check = $("#check");
    if (check) check.textContent = `✔ ${isVisual ? u("explore") : u("check")}`;
    const next = $("#next");
    if (next) next.textContent = `➡ ${isQuestion ? u("nextQuestion") : u("next")}`;
    updateHeader();
  }

  function setStyle(nextStyle) {
    style = nextStyle;
    document.body.dataset.style = style;
    $$(".styles button").forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.s === style)),
    );
    robot.hidden = style !== "robot";
    cap.hidden = style === "robot";
    bubble.classList.remove("show");
    if (style === "robot") {
      const spot = home();
      setPos(spot.x, spot.y, true);
      atHome = true;
      emotion("idle");
    } else {
      cap.hidden = false;
      cap.textContent = T(A.goal);
    }
    renderStage();
    renderControls();
  }

  /* ------------------------------------------------------------------ *
   * 8. round / question lifecycle
   * ------------------------------------------------------------------ */
  function roundVarsForMessage(extra = {}) {
    const vars = { ...roundVars(), s: stars, ...extra };
    if (A.type === "secant-slope" && roundData()) {
      vars.sl = fmt(2 * roundData().a + (params.h ?? 1));
    }
    return vars;
  }

  function startRound() {
    ready = false;
    finished = false;
    tries = 0;
    hintN = 0;
    stepN = -1;
    sel = new Set();
    chosen = -1;
    answered = false;
    guess = "";
    const r = roundData();
    if (A.type === "integer-elevator") lift = r.start;
    if (A.type === "quadratic-hoops") params = { a: 1, h: 0, k: 0 };
    if (A.type === "secant-slope") params = { h: 1 };
    if (A.type === "visual") {
      params = {};
      if (A.scene === "pythagoras") params = { a: 3, b: 4 };
      if (A.scene === "parabola") params = { a: 1, h: 0, k: 0 };
      if (A.scene === "secant") params = { h: 1 };
      shapeTapped = new Set();
    }
    $("#next").hidden = true;
    $("#next").dataset.restart = "";
    $("#review").hidden = true;
    renderStage();
    renderControls();
    updateHeader();
    setTimeout(() => {
      emotion("happy");
      say(msg("intro"), 4200);
      setTimeout(() => emotion("idle"), 3800);
    }, 350);
  }

  function startQuestion() {
    chosen = -1;
    answered = false;
    tries = 0;
    hintN = 0;
    finished = false;
    ready = false;
    $("#next").hidden = true;
    $("#next").dataset.restart = "";
    renderStage();
    updateHeader();
    setTimeout(() => say(msg("intro"), 3200), 250);
  }

  function newRound() {
    if (isQuestion) {
      if (qIndex < questions.length - 1) {
        qIndex += 1;
        startQuestion();
      } else {
        finish();
      }
      return;
    }
    if (round < rounds.length - 1) {
      round += 1;
      startRound();
    } else {
      finish();
    }
  }

  function finish() {
    if (finished) return;
    finished = true;
    ready = false;
    $("#next").hidden = false;
    $("#next").dataset.restart = "1";
    $("#next").textContent = `➡ ${u("again")}`;
    $("#review").hidden = false;
    const learned = T(A.goal);
    $("#review").innerHTML = `<small>${u("review")}</small>${esc(learned)} · ${u("stars", { s: stars })}`;
    emotion("happy");
    hop();
    SND.ding();
    const total = isQuestion ? correctCount : stars;
    say(msg("done", { s: total, c: correctCount }), 5200);
  }

  function restart() {
    round = 0;
    qIndex = 0;
    stars = 0;
    correctCount = 0;
    finished = false;
    ready = false;
    $("#next").dataset.restart = "";
    if (isQuestion) startQuestion();
    else startRound();
  }

  /* ------------------------------------------------------------------ *
   * 9. explanation ("Show me how")
   * ------------------------------------------------------------------ */
  function stepTargets() {
    if (A.type === "count") return ["#numCard", "#tree", "#basket", "#check"];
    if (A.type === "fraction-pizza") return ["#fracCard", "#pizzaSvg", "#pizzaSvg", "#check"];
    if (A.type === "integer-elevator") return ["#liftCard", "#building", "#lift", "#check"];
    if (A.type === "quadratic-hoops") return ["#targetGhost", "#hoop", "#parabola", "#check"];
    if (A.type === "secant-slope") return ["#secPointA", "#secPointB", "#secLine", "#secTable"];
    if (isQuestion) return ["#qPrompt", "#optList", "#check", "#check"];
    return [];
  }

  function steps() {
    const targets = stepTargets();
    const lines = isVisual
      ? A.steps.map((step) => ({
          target: step.target,
          text: T(step.say, roundVarsForMessage()),
        }))
      : C.steps.map((line, index) => ({
          target: targets[index] || (isQuestion ? "#optList" : "#stage"),
          text: T(line, roundVarsForMessage()),
        }));

    return lines.map((step, index) => ({
      ...step,
      say: step.text,
      before:
        !isVisual && !isQuestion && A.type === "fraction-pizza" && index === 2
          ? () => {
              sel = new Set([...Array(roundData().num).keys()]);
              renderStage();
            }
          : undefined,
    }));
  }

  async function explain() {
    if (busy || finished) return;
    busy = true;
    clearHl();
    unpoint();
    const list = steps();
    if (style === "text") {
      cap.hidden = false;
      cap.innerHTML = `<ol>${list.map((step) => `<li>${esc(step.text)}</li>`).join("")}</ol>`;
      busy = false;
      return;
    }
    for (let index = 0; index < list.length; index += 1) {
      const step = list[index];
      stepN = index;
      if (step.before) step.before();
      if (style === "robot" && step.target) {
        emotion("think");
        await moveTo(step.target);
        point(step.target);
        emotion("idle");
        say(step.say, 3800);
      } else {
        const element = $(step.target);
        if (element) element.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
        await sleep(350);
        cap.hidden = false;
        cap.textContent = step.text;
        speak(step.say);
      }
      hl(step.target, true);
      await sleep(3800);
      hl(step.target, false);
    }
    clearHl();
    unpoint();
    await goHome();
    busy = false;
  }

  function hint() {
    if (busy || finished || ready) return;
    const ladder = C.hints || [];
    if (!ladder.length) return;
    const line = ladder[Math.min(hintN, ladder.length - 1)];
    hintN += 1;
    const target = stepTargets()[Math.min(hintN - 1, stepTargets().length - 1)] || "#stage";
    busy = true;
    emotion("think");
    moveTo(target).then(() => {
      point(target);
      say(T(line, roundVarsForMessage()), 4000);
    });
    setTimeout(async () => {
      unpoint();
      await goHome();
      busy = false;
    }, 4200);
  }

  function confused() {
    if (busy || finished) return;
    busy = true;
    clearHl();
    emotion("think");
    const slot = hintN % 2;
    const example = slot ? C.again : C.steps[C.steps.length - 1];
    say(T(example, roundVarsForMessage()), 4400);
    const target = stepTargets()[0] || "#stage";
    moveTo(target).then(() => {
      point(target);
      hl(target, true);
    });
    setTimeout(async () => {
      clearHl();
      unpoint();
      await goHome();
      busy = false;
    }, 4600);
  }

  /* ------------------------------------------------------------------ *
   * 10. check
   * ------------------------------------------------------------------ */
  async function correct() {
    stars += 1;
    ready = true;
    emotion("happy");
    hop();
    SND.ding();
    say(msg("good", { s: stars }), 3200);
    updateHeader();
    if (A.type === "question-set") {
      answered = true;
      correctCount += 1;
      renderStage();
      $("#next").hidden = false;
      $("#next").textContent = `➡ ${qIndex < questions.length - 1 ? u("nextQuestion") : u("finish")}`;
    } else {
      $("#next").hidden = false;
      $("#next").textContent = `➡ ${round < rounds.length - 1 ? u("next") : u("finish")}`;
    }
    await sleep(1400);
  }

  async function wrong(extra = {}) {
    tries += 1;
    emotion("sad");
    shake();
    SND.oops();
    const key = extra.key || "again";
    say(msg(key, { s: stars, ...extra.vars }), 3800);
    await sleep(700);
    if (tries >= 3) {
      tries = 0;
      busy = false;
      await explain();
    } else {
      emotion("idle");
    }
  }

  async function check() {
    if (busy || ready || finished) return;
    if (isVisual) {
      say(T(C.intro, roundVarsForMessage()), 3200);
      return;
    }
    busy = true;
    clearHl();
    if (isQuestion) {
      if (chosen < 0) {
        busy = false;
        emotion("think");
        say(msg("none"), 2600);
        return;
      }
      const question = questions[qIndex];
      const option = question.options[chosen];
      if (option && option.correct) {
        await correct();
      } else {
        answered = true;
        renderStage();
        updateHeader();
        emotion("sad");
        shake();
        SND.oops();
        say(T(question.explain), 4200);
        $("#next").hidden = false;
        $("#next").textContent = `➡ ${qIndex < questions.length - 1 ? u("nextQuestion") : u("finish")}`;
        ready = true;
      }
      busy = false;
      return;
    }

    const r = roundData();
    if (A.type === "count") {
      const n = sel.size;
      const a = r.target;
      if (n === 0) {
        busy = false;
        say(msg("none"), 2600);
        return;
      }
      if (n === a) await correct();
      else await wrong({ key: n < a ? "less" : "more", vars: { n, a, d: Math.abs(a - n) } });
    } else if (A.type === "fraction-pizza") {
      const n = sel.size;
      const a = r.num;
      if (n === 0) {
        busy = false;
        say(msg("none"), 2600);
        return;
      }
      if (n === a) await correct();
      else await wrong({ key: n < a ? "less" : "more", vars: { n, a, d: Math.abs(a - n) } });
    } else if (A.type === "integer-elevator") {
      const target = r.start + r.move;
      if (lift === target) await correct();
      else await wrong({ key: "less", vars: { n: lift, t: target } });
    } else if (A.type === "quadratic-hoops") {
      const close = Math.abs((params.a ?? 1) - r.a) < 0.26
        && Math.abs((params.h ?? 0) - r.h) < 0.26
        && Math.abs((params.k ?? 0) - r.k) < 0.26;
      if (close) await correct();
      else await wrong({ key: "again" });
    } else if (A.type === "secant-slope") {
      const value = parseNumber(guess);
      const target = 2 * r.a;
      if (!Number.isFinite(value)) {
        busy = false;
        say(msg("none"), 2600);
        return;
      }
      if (Math.abs(value - target) <= 0.05) await correct();
      else await wrong({ key: "again", vars: { v: target } });
    }
    busy = false;
  }

  /* ------------------------------------------------------------------ *
   * 11. stage events
   * ------------------------------------------------------------------ */
  function stageAction(action, element) {
    if (busy || finished || ready) return;
    const index = Number(element.dataset.i);
    if (action === "mango") {
      if (sel.has(index)) sel.delete(index);
      else sel.add(index);
      SND.pop();
      renderStage();
      return;
    }
    if (action === "slice") {
      if (sel.has(index)) sel.delete(index);
      else sel.add(index);
      SND.pop();
      renderStage();
      return;
    }
    if (action === "up" || action === "down") {
      const r = roundData();
      const min = -7;
      const max = Math.min(8, Math.max(r.start + Math.abs(r.move) + 2, r.start));
      lift = clamp(lift + (action === "up" ? 1 : -1), min, max);
      SND.pop();
      renderStage();
      return;
    }
    if (action === "option") {
      if (answered) return;
      chosen = index;
      SND.pop();
      renderStage();
      return;
    }
    if (action === "shape") {
      const name = element.dataset.name;
      if (!shapeTapped.has(name)) {
        shapeTapped.add(name);
        SND.pop();
        const label = {
          circle: { en: "Circle", bn: "বৃত্ত" },
          square: { en: "Square", bn: "বর্গ" },
          triangle: { en: "Triangle", bn: "ত্রিভুজ" },
          rectangle: { en: "Rectangle", bn: "আয়তক্ষেত্র" },
        }[name];
        say(T(label), 2400);
      }
      renderStage();
      if (shapeTapped.size === 4) {
        setTimeout(() => say(msg("done"), 3600), 500);
      }
    }
  }

  $("#stage").addEventListener("click", (event) => {
    const element = event.target.closest("[data-act]");
    if (!element) return;
    stageAction(element.dataset.act, element);
  });
  $("#stage").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const element = event.target.closest("[data-act]");
    if (!element) return;
    event.preventDefault();
    stageAction(element.dataset.act, element);
  });

  $("#controls").addEventListener("input", (event) => {
    const input = event.target;
    if (input.id === "guess") {
      guess = input.value;
      return;
    }
    const param = input.dataset.param;
    if (!param) return;
    params[param] = parseFloat(input.value);
    syncOutput(param);
    renderStage();
  });

  $("#controls").addEventListener("click", (event) => {
    const button = event.target.closest("[data-act]");
    if (!button) return;
    if (button.dataset.act === "tangent") {
      params.h = 0.01;
      const rangeInput = $('#controls input[data-param="h"]');
      if (rangeInput) rangeInput.value = "0.01";
      syncOutput("h");
      renderStage();
      SND.pop();
    }
    if (button.dataset.act === "line") {
      explore.line = !explore.line;
      button.classList.toggle("on", explore.line);
      button.setAttribute("aria-pressed", String(explore.line));
      button.textContent = explore.line ? u("lineHide") : u("line");
      renderStage();
      SND.pop();
    }
  });

  /* ------------------------------------------------------------------ *
   * 12. wiring
   * ------------------------------------------------------------------ */
  $$(".styles button").forEach((button) => {
    button.onclick = () => {
      if (!busy) setStyle(button.dataset.s);
    };
  });
  if (isPlay) $(".styles").hidden = true;

  $("#check").onclick = check;
  $("#how").onclick = explain;
  $("#hint").onclick = hint;
  $("#conf").onclick = confused;
  $("#next").onclick = () => {
    if ($("#next").dataset.restart === "1") {
      restart();
      return;
    }
    if (isQuestion && chosen >= 0 && !answered) return;
    newRound();
  };
  $("#snd").onclick = (event) => {
    sound = !sound;
    event.currentTarget.textContent = sound ? "🔊" : "🔇";
    if (!sound && "speechSynthesis" in window) speechSynthesis.cancel();
  };
  $("#lng").onclick = () => {
    lang = lang === "en" ? "bn" : "en";
    applyUiText();
    renderStage();
    renderControls();
    cap.hidden = style === "robot";
    if (style !== "robot") cap.textContent = T(A.goal);
  };

  robot.addEventListener("click", () => {
    if (busy) return;
    emotion("happy");
    say(hintN ? T(C.again, roundVarsForMessage()) : msg("intro"), 3000);
    SND.pop();
  });
  robot.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      robot.click();
    }
  });

  addEventListener("resize", () => {
    if (atHome && !busy && style === "robot") {
      const spot = home();
      setPos(spot.x, spot.y, true);
    }
  });

  /* start */
  applyUiText();
  setStyle(style);
  if (isQuestion) startQuestion();
  else startRound();
})();
