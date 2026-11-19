# Lesson authoring spec (Bolt "visual explanations" engine)

You are adding NEW lessons to a class HTML file. Read this fully.

## Output format
Write ONLY a sequence of `lesson(...)` calls (and optional `/* comments */`) to your
assigned part file. Do NOT add `<script>`, `<!DOCTYPE>`, `const`/`function` declarations
at top level, imports, or exports. Each part is spliced into an existing IIFE.

## The lesson signature
```js
lesson('unique-id','Slide title','Heading drawn on the board',A=>{
  A.say('English sentence.','সত্যিকারের বাংলা বাক্য।');
  A.text(400,120,'some text',{size:24,c:AM});
  // ... draw ...
  NOTE(A,455,'short closing note.');
});
```
- `id` must be exactly the id assigned to you (e.g. `c910-201`).
- `title` is the carousel tooltip. `head` is the heading written at the top of the stage.
- The callback runs immediately and queues every element; the robot then draws them in order.

## Canvas
- Stage is 800 x 480. Keep drawing inside x in [45,755], y in [60,470].
- The heading is auto-drawn at y=34, so start content at y >= 62.
- Coordinates are SVG pixels, origin top-left, y grows downward.

## Guaranteed API (available in every file) — use ONLY these
- `A.say(en, bn)` — one narration line. `bn` MUST be real Bengali Unicode text.
  Call `A.say(...)` between drawings so the explanation is line by line.
- `A.text(x, y, str, opts, dur)` — opts `{size=20, c=INK, anchor='middle', weight=700}`.
- `A.line(x1,y1,x2,y2,opts,dur)` — opts `{c, w}`.
- `A.arrow(x1,y1,x2,y2,opts,dur)` — draws a line plus an arrow head.
- `A.dashed(x1,y1,x2,y2,opts,dur)` — dashed line.
- `A.circle(cx,cy,r,opts,dur)` — opts `{c,w,fill,fo}`.
- `A.ell(cx,cy,rx,ry,opts,dur)` — ellipse.
- `A.rect(x,y,w,h,opts,dur)` — corner (x,y) is top-left. opts `{c,w,fill,fo}`.
- `A.pts([[x,y],[x,y],...], opts, dur)` — polyline; opts `{c,w,fill,fo}`.
- `A.mat(cx,cy,[[..],[..]],opts,dur)` — matrix; returns `{cell(i,j),cx(j),cy(i)}`.
- `A.box(r,c)` — highlight a `A.mat` cell rectangle `r` with colour `c`.
- `NOTE(A, y, text)` — amber note line at the given y.
- Colour constants: `AM` amber, `SK` sky, `GR` green, `PK` pink, `VI` violet,
  `RD` red, `INK` near-white, `MU` muted grey.
- `dur` (seconds) is optional on every draw; omit it and the engine picks a sensible value.

Do NOT call any other helper (no `axes`, `curve`, `arcPts`, `node`, etc. — they may not
exist in the target file). If you need a curve/arc, compute the points yourself with a
`for` loop and pass them to `A.pts`.

## Hard rules
- Use `{c:SK}` style object properties. NEVER write `{c=SK}`.
- Declare every local variable inside the lesson callback with `const`/`let`.
  Never create top-level variables or functions (name clashes break the file).
- Keep numbers explicit and correct. Do not invent impossible arithmetic.
- 3 to 6 narration lines per lesson is the target (like differentiation1.html).
- Draw something meaningful for each line; do not dump all text at once.
- Use `A.text` for short labels only; put long sentences in `A.say`.
- Do not repeat existing topics in the target file. Read its existing `lesson('...')` titles first.
- End most lessons with `NOTE(A, y, '...')` at y in 430..468.

## Multi-page support (when an explanation needs more room)
The stage holds one "page". When the page is full, wipe it and start page 2 by drawing a
filled board-coloured rectangle AFTER the old content, then keep drawing on the same stage:
```js
A.rect(0,58,800,422,{c:'#0b1220',w:0,fill:'#0b1220',fo:1},.35);
A.text(400,74,'Page 2',{size:15,c:MU});
```
This erases page 1 on screen (the grid texture stays) exactly like turning to a new page.
You may use up to 3 pages. To "carry a value forward", after wiping write a small card on
page 2 with the value you need, e.g. `A.text(120,110,'carried from page 1:  x = 4',{size:16,c:AM,anchor:'start'});`
and say what you moved where: `A.say('Carry x = 4 from page 1 onto page 2 and put it under the root sign.', '...');`

## Visual variety — pick what fits the topic
number line, bar model, fraction bar, place-value table, grid/array, right triangle,
circle with radii/chords, Venn diagram, flow boxes with arrows, balance scale, matrix,
sign chart, axes with a plotted curve, tally table, clock face, unit circle, tree diagram.

## Example (style reference)
```js
lesson('c910-201','Sum of first n odd numbers','1 + 3 + 5 + ... = n squared',A=>{
  A.say("The odd numbers are 1, 3, 5, 7 and so on. Add the first few and look at the totals.",
        "বিজোড় সংখ্যাগুলো হলো ১, ৩, ৫, ৭ ইত্যাদি। প্রথম কয়েকটি যোগ করে যোগফল দেখো।");
  const v=[1,3,5,7];
  v.forEach((n,i)=>A.text(150+i*130,120,String(n),{size:26,c:SK}));
  A.say("One gives one, one plus three gives four, then nine, then sixteen.",
        "এক দেয় এক, এক যোগ তিন দেয় চার, তারপর নয়, তারপর ষোলো।");
  const s=[1,4,9,16];
  s.forEach((n,i)=>{
    A.rect(105+i*130,165,90,90,{c:AM,w:2.5,fill:AM,fo:.12},.35);
    A.text(150+i*130,225,String(n),{size:24,c:AM});
  });
  A.say("Each total is a perfect square, and it is the square of how many odds we added.",
        "প্রতিটি যোগফল একটি পূর্ণবর্গ, এবং সেটি যোগ করা বিজোড় সংখ্যার সংখ্যার বর্গ।");
  A.text(400,315,'1 + 3 + 5 + ... + (2n-1) = n²',{size:28,c:GR});
  A.text(400,365,'4 odds  ->  4² = 16',{size:22,c:INK});
  NOTE(A,440,'the square of the count, not of the last number.');
});
```

## Self-check before you finish
- Every `{` is closed, every `lesson(` has `});` at the end.
- No `c=` typos. No top-level declarations.
- The number of lessons equals the requested count, ids are consecutive and unique.
- Bengali lines are actual Bengali text (not transliteration, not `????`).
