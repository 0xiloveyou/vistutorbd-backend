# Curriculum Map: Play to Class 12

> **Purpose:** the master list of chapters per class, so the AI agent knows what content belongs where. The `id` values are used as slugs and database keys.
> **Phase:** this file is a *map only*. Do **not** write lesson content or visualizations yet (see `requirements.md`).

> **Visualization ideas:** the short "Visualization idea" column in the tables below is only a hint. The full catalog (many visualizations per chapter, with difficulty tiers up to T4 for Class 11–12) is in the `visualizations/` folder: `README.md`, `play-nursery.md`, `class-1-5.md`, `class-6-8.md`, `class-9-10.md`, `class-11-12.md`. Use the catalog, not this column, when planning visualizations.

## How the AI Should Use This File
1. Each chapter becomes a `Chapter` record under its class and band. Sub-topics (where listed) become `Topic` records.
2. `id` format: `<class>.<NN>` for chapters, `<class>.<NN>.<MM>` for sub-topics (e.g. `c1.04`, `c2.01.03`).
3. Every chapter needs: bilingual title `{en, bn}`, a visualization idea, a question generator (mandatory), and knowledge chunks.
4. Chapter order here is the default display order.
5. Items marked ⚠️ are **unconfirmed** and must be checked against the real textbook before content work starts.
6. Page numbers from the textbooks were dropped on purpose; they are not needed.
7. Bangla titles for English-listed classes are working translations. Verify them against the official Bangla textbook.

| Band | Classes | Companion | Visual style |
|---|---|---|---|
| `PLAY_NURSERY` | Play, Nursery | Mandatory | Finger counting, objects, animals, tap-only |
| `C1_5` | 1–5 | Optional | Concrete objects, number lines, blocks |
| `C6_8` | 6–8 | Optional | Step-through, diagrams, early graphs |
| `C9_10` | 9–10 | Optional | Step-through, geometry, trigonometry |
| `C11_12` | 11–12 | Optional | Graphs, formulas, parameter sliders |

---

## Band: PLAY_NURSERY

### Class: Play (`play`)
Source: provided by you.

| id | Topic (EN) | Topic (BN) | Visualization idea |
|---|---|---|---|
| play.01 | Recognizing numbers 1 to 100 | ১ থেকে ১০০ পর্যন্ত সংখ্যা চেনা | Number grid that lights up and speaks each number; counting by fingers up to 10 |
| play.02 | Basic idea of addition and subtraction | যোগ ও বিয়োগের প্রাথমিক ধারণা | Objects join or leave a group; finger addition on both hands |
| play.03 | Comparing: big/small, long/short | বড়-ছোট, লম্বা-খাটো তুলনা | Drag two objects side by side; companion points at the longer one |
| play.04 | Recognizing shapes (circle, triangle, quadrilateral) | আকৃতি চেনা (বৃত্ত, ত্রিভুজ, চতুর্ভুজ) | Shape hunt in a picture; trace the outline |
| play.05 | Basic idea of time and money | সময় ও টাকার প্রাথমিক ধারণা | Clock with day routine; simple coins/notes |

### Class: Nursery (`nursery`)
Source: **drafted by me** (you asked me to make it). Please review. It builds on Play with bigger numbers and early two-digit work, matching the "2-digit addition (1 to 99)" example in your brief.

| id | Topic (EN) | Topic (BN) | Visualization idea |
|---|---|---|---|
| nursery.01 | Counting objects up to 20 | ২০ পর্যন্ত বস্তু গোনা | Tap each object to count; arrow or companion points |
| nursery.02 | Numbers 1 to 100: reading and writing | ১ থেকে ১০০ সংখ্যা পড়া ও লেখা | Tracing digits; number grid |
| nursery.03 | Before, after and between | আগে, পরে ও মাঝের সংখ্যা | Number path with hidden numbers |
| nursery.04 | Comparing numbers: more, less, equal | বেশি, কম ও সমান | Two groups with a balance scale |
| nursery.05 | Ordering numbers: smallest to biggest | ছোট থেকে বড় সাজানো | Drag cards into order |
| nursery.06 | Addition with objects (up to 10) | বস্তু দিয়ে যোগ (১০ পর্যন্ত) | Finger count; birds on a tree |
| nursery.07 | Subtraction with objects (up to 10) | বস্তু দিয়ে বিয়োগ (১০ পর্যন্ত) | Objects fly away; count what is left |
| nursery.08 | Two-digit addition (1 to 99), simple | দুই অঙ্কের সরল যোগ (১ থেকে ৯৯) | Tens and ones blocks |
| nursery.09 | Tens and ones (what is in 25?) | দশক ও একক | Bundles of ten sticks plus single sticks |
| nursery.10 | Measuring: long/short, heavy/light, full/empty | লম্বা-খাটো, ভারী-হালকা, ভরা-খালি | Drag-and-compare objects |
| nursery.11 | Shapes: circle, triangle, square, rectangle | আকৃতি: বৃত্ত, ত্রিভুজ, বর্গ, আয়তক্ষেত্র | Sorting game; build a picture from shapes |
| nursery.12 | Simple patterns | সহজ নকশা ও ধারা | Continue the colour/shape pattern |
| nursery.13 | Time: days of the week, morning/night | সময়: সপ্তাহের দিন, সকাল-রাত | Day cycle; weekly calendar |
| nursery.14 | Money: coins and notes (1, 2, 5, 10 Taka) | টাকা: কয়েন ও নোট | Shop game with a companion shopkeeper |

---

## Band: C1_5

### Class 1 (`c1`), 18 chapters (source: provided)

| id | Chapter (EN) | Chapter (BN) | Visualization idea |
|---|---|---|---|
| c1.01 | Comparison | তুলনা | Side-by-side objects |
| c1.02 | Counting | গণনা | Tap-to-count objects |
| c1.03 | Numbers (1 to 10) | সংখ্যা (১ থেকে ১০) | Fingers, number line 0–10 |
| c1.04 | Concept of Addition | যোগের ধারণা | Join two groups; birds on a tree |
| c1.05 | Concept of Subtraction | বিয়োগের ধারণা | Remove objects |
| c1.06 | Numbers (11 to 20) | সংখ্যা (১১ থেকে ২০) | Ten-frame plus extra ones |
| c1.07 | Addition (11 to 20) | যোগ (১১ থেকে ২০) | Ten-frame |
| c1.08 | Subtraction (11 to 20) | বিয়োগ (১১ থেকে ২০) | Ten-frame |
| c1.09 | Numbers (21 to 40) | সংখ্যা (২১ থেকে ৪০) | Number grid |
| c1.10 | Place Value | স্থানীয় মান | Tens and ones blocks |
| c1.11 | Let us do (practice) | চলো করি (অনুশীলন) | Mixed practice set |
| c1.12 | Geometry | জ্যামিতি | Shape recognition |
| c1.13 | Pattern | ধারা / নকশা | Continue the pattern |
| c1.14 | Numbers (41 to 100) | সংখ্যা (৪১ থেকে ১০০) | 100-grid |
| c1.15 | Addition | যোগ | Blocks, number line |
| c1.16 | Subtraction | বিয়োগ | Blocks, number line |
| c1.17 | Bangladeshi Currency | বাংলাদেশি মুদ্রা | Coins and notes |
| c1.18 | Let us do (practice) | চলো করি (অনুশীলন) | Mixed practice set |

### Class 2 (`c2`), 7 units (source: provided)

| id | Unit / topic (EN) | Unit / topic (BN) | Visualization idea |
|---|---|---|---|
| c2.01 | **Numbers and Place Values** | সংখ্যা ও স্থানীয় মান | |
| c2.01.01 | Read numbers and write in words (21 to 100) | সংখ্যা পড়া ও কথায় লেখা (২১–১০০) | Number cards with spoken words |
| c2.01.02 | Counting | গণনা | Grouping objects |
| c2.01.03 | Comparison of Numbers | সংখ্যার তুলনা | Balance, greater/less signs |
| c2.01.04 | Place Value | স্থানীয় মান | Place-value blocks |
| c2.01.05 | Comparison of Numbers (using place value) | স্থানীয় মান দিয়ে তুলনা | Column comparison |
| c2.01.06 | Even-odd Numbers and Number Patterns | জোড়-বিজোড় ও সংখ্যার নকশা | Pairing dots |
| c2.01.07 | Ordinal Number | ক্রমবাচক সংখ্যা | Race podium and queue |
| c2.02 | **Addition and Subtraction** | যোগ ও বিয়োগ | |
| c2.02.01 | Addition (1) | যোগ (১) | Number line |
| c2.02.02 | Subtraction (1) | বিয়োগ (১) | Number line |
| c2.02.03 | Mathematical Relation (Addition and Subtraction) | যোগ-বিয়োগের সম্পর্ক | Fact family triangle |
| c2.02.04 | Addition (2) (with carry) | যোগ (২) | Blocks with regrouping |
| c2.02.05 | Subtraction (2) (with borrow) | বিয়োগ (২) | Blocks with regrouping |
| c2.02.06 | Problems related to Addition and Subtraction | যোগ-বিয়োগ সংক্রান্ত সমস্যা | Story scenes |
| c2.03 | **Multiplication** | গুণ | |
| c2.03.01 | Concept of Multiplication | গুণের ধারণা | Equal groups, arrays |
| c2.04 | **Geometric Shapes and Patterns** | জ্যামিতিক আকৃতি ও নকশা | |
| c2.04.01 | Geometric Shapes | জ্যামিতিক আকৃতি | Shape explorer |
| c2.04.02 | Patterns | নকশা | Pattern builder |
| c2.05 | **Measurement** | পরিমাপ | |
| c2.05.01 | Measurement of Length | দৈর্ঘ্য পরিমাপ | Ruler |
| c2.05.02 | Measurement of Weight | ওজন পরিমাপ | Balance scale |
| c2.05.03 | Measurement of the Volume of Liquid | তরলের আয়তন পরিমাপ | Pouring into jugs |
| c2.05.04 | Measurement of Time | সময় পরিমাপ | Analog clock |
| c2.06 | **Currency** | মুদ্রা | |
| c2.06.01 | Bangladeshi Currency | বাংলাদেশি মুদ্রা | Shop and change |
| c2.07 | **Data** | তথ্য | |
| c2.07.01 | Data Collection and Arrangement | তথ্য সংগ্রহ ও সাজানো | Tally marks, pictograph |

### Class 3 (`c3`), 13 chapters (source: provided; chapter 1 title was missing a name, "Numbers" assumed)

| id | Chapter (EN) | Chapter (BN) | Visualization idea |
|---|---|---|---|
| c3.01 | Numbers | সংখ্যা | Place-value chart up to 4 digits |
| c3.02 | Addition | যোগ | Column addition with carry |
| c3.03 | Subtraction | বিয়োগ | Column subtraction with borrow |
| c3.04 | Relation between addition and subtraction | যোগ-বিয়োগের সম্পর্ক | Fact family |
| c3.05 | Multiplication | গুণ | Arrays, times tables |
| c3.06 | Division | ভাগ | Sharing into equal groups |
| c3.07 | Relation between multiplication and division | গুণ-ভাগের সম্পর্ক | Array flip |
| c3.08 | Problems related to addition, subtraction, multiplication and division | চার নিয়মের সমস্যা | Story scenes |
| c3.09 | Fractions | ভগ্নাংশ | Fraction bars, pizza |
| c3.10 | Bangladeshi currency | বাংলাদেশি মুদ্রা | Shop and change |
| c3.11 | Measurement | পরিমাপ | Ruler, scale, clock |
| c3.12 | Geometry | জ্যামিতি | Lines, angles, shapes |
| c3.13 | Data collection and arrangement | তথ্য সংগ্রহ ও সাজানো | Tables, pictographs |

### Class 4 (`c4`), 11 chapters (source: provided)

| id | Chapter (EN) | Chapter (BN) | Visualization idea |
|---|---|---|---|
| c4.01 | Numbers and Place Value | সংখ্যা ও স্থানীয় মান | Place-value chart |
| c4.02 | Addition and Subtraction | যোগ ও বিয়োগ | Column method |
| c4.03 | Multiplication | গুণ | Area model |
| c4.04 | Division | ভাগ | Long division stepper |
| c4.05 | Mathematical Sentence | গাণিতিক বাক্য | Balance with unknowns |
| c4.06 | Multiples and Factors | গুণিতক ও গুণনীয়ক | Factor pairs, multiples grid |
| c4.07 | Common Fractions | সাধারণ ভগ্নাংশ | Fraction bars, number line |
| c4.08 | Decimal Fractions | দশমিক ভগ্নাংশ | Tenths and hundredths grid |
| c4.09 | Measurement | পরিমাপ | Units and conversion |
| c4.10 | Geometry | জ্যামিতি | Angles, perimeter, area |
| c4.11 | Data collection and arrangement | তথ্য সংগ্রহ ও সাজানো | Bar chart builder |

### Class 5 (`c5`), 10 chapters (source: provided)

| id | Chapter (EN) | Chapter (BN) | Visualization idea |
|---|---|---|---|
| c5.01 | Multiplication and Division | গুণ ও ভাগ | Area model, long division |
| c5.02 | Mathematical Sentences | গাণিতিক বাক্য | Equation balance |
| c5.03 | Multiples and Factors | গুণিতক ও গুণনীয়ক | Prime factor tree, HCF/LCM |
| c5.04 | Common Fractions | সাধারণ ভগ্নাংশ | Fraction operations on bars |
| c5.05 | Decimal Fractions | দশমিক ভগ্নাংশ | Decimal grid |
| c5.06 | Percentage | শতকরা | 100-grid shading |
| c5.07 | Average | গড় | Levelling bars |
| c5.08 | Measurement | পরিমাপ | Units, area, volume |
| c5.09 | Geometry | জ্যামিতি | Shapes, angles, solids |
| c5.10 | Data Arrangement | তথ্য সাজানো | Charts |

---

## Band: C6_8

### Class 6 (`c6`), 8 chapters (source: provided)

| id | Chapter (EN) | Chapter (BN) | Visualization idea |
|---|---|---|---|
| c6.01 | Natural Numbers and Fractions | স্বাভাবিক সংখ্যা ও ভগ্নাংশ | Number line, fraction operations |
| c6.02 | Ratios and Percentages | অনুপাত ও শতকরা | Ratio bars, 100-grid |
| c6.03 | Integers | পূর্ণসংখ্যা | Number line with moves |
| c6.04 | Algebraic Expressions | বীজগাণিতিক রাশি | Expression builder |
| c6.05 | Simple Equations | সরল সমীকরণ | Balance scale |
| c6.06 | Basic Concepts of Geometry | জ্যামিতির মৌলিক ধারণা | Points, lines, angles |
| c6.07 | Practical Geometry | ব্যবহারিক জ্যামিতি | Compass and ruler constructions |
| c6.08 | Information and Data | তথ্য ও উপাত্ত | Chart builder |

### Class 7 (`c7`) ⚠️ NEEDS CONFIRMATION
The list you pasted for Class 7 is **identical to Class 6** (probably a copy-paste mistake). I did not invent a Class 7 list. Please send the real Class 7 chapter list. Until then, create the class and leave its chapters empty.

| id | Chapter (EN) | Chapter (BN) |
|---|---|---|
| c7.?? | ⚠️ TODO: awaiting real list | ⚠️ TODO |

### Class 8 (`c8`), 11 chapters (source: provided; chapter numbering reconstructed from messy paste)

| id | Chapter (EN) | Chapter (BN) | Visualization idea |
|---|---|---|---|
| c8.01 | Patterns | নকশা / ধারা | Pattern generator |
| c8.02 | Profits | লাভ-ক্ষতি | Cost/price bars |
| c8.03 | Measurement | পরিমাপ | Area, volume |
| c8.04 | Algebraic Formulae and Applications | বীজগাণিতিক সূত্র ও প্রয়োগ | Area-model identities |
| c8.05 | Algebraic Fractions | বীজগাণিতিক ভগ্নাংশ | Step simplifier |
| c8.06 | Simple Simultaneous Equations | সরল সহসমীকরণ | Two lines intersecting |
| c8.07 | Set | সেট | Venn diagram |
| c8.08 | Quadrilateral | চতুর্ভুজ | Interactive quadrilaterals |
| c8.09 | Pythagoras Theorem | পিথাগোরাসের উপপাদ্য | Squares on triangle sides |
| c8.10 | Circle | বৃত্ত | Chords, arcs |
| c8.11 | Information and Data | তথ্য ও উপাত্ত | Charts |

---

## Band: C9_10 (Classes 9 and 10 share one book)

### Class 9–10 (`c9_10`), 17 chapters (source: provided)
**Note:** one shared list. The split into Class 9 and Class 10 is not given. See ⚠️ below.

| id | Chapter (EN) | Chapter (BN) | Visualization idea |
|---|---|---|---|
| c9_10.01 | Real Numbers | বাস্তব সংখ্যা | Number-line hierarchy |
| c9_10.02 | Sets and Functions | সেট ও ফাংশন | Venn, mapping diagrams |
| c9_10.03 | Algebraic Expressions | বীজগাণিতিক রাশি | Area-model identities |
| c9_10.04 | Exponents and Logarithms | সূচক ও লগারিদম | Exponential curves |
| c9_10.05 | Equations in One Variable | এক চলকবিশিষ্ট সমীকরণ | Balance, graph roots |
| c9_10.06 | Lines, Angles and Triangles | রেখা, কোণ ও ত্রিভুজ | Interactive geometry |
| c9_10.07 | Practical Geometry | ব্যবহারিক জ্যামিতি | Constructions |
| c9_10.08 | Circle | বৃত্ত | Theorems with drag |
| c9_10.09 | Trigonometric Ratio | ত্রিকোণমিতিক অনুপাত | Unit circle, right triangle |
| c9_10.10 | Distance and Elevation | দূরত্ব ও উন্নতি | Angle of elevation scene |
| c9_10.11 | Algebraic Ratio and Proportion | বীজগাণিতিক অনুপাত ও সমানুপাত | Ratio bars |
| c9_10.12 | Simple Simultaneous Equations in Two Variables | দুই চলকবিশিষ্ট সরল সহসমীকরণ | Line intersection |
| c9_10.13 | Finite Series | সসীম ধারা | Stacking squares, sums |
| c9_10.14 | Ratio, Similarity and Symmetry | অনুপাত, সদৃশতা ও প্রতিসমতা | Scale and reflect |
| c9_10.15 | Area Related Theorems and Constructions | ক্ষেত্রফল সম্পর্কিত উপপাদ্য ও অঙ্কন | Shearing and area |
| c9_10.16 | Mensuration | পরিমিতি | 2D and 3D solids |
| c9_10.17 | Statistics | পরিসংখ্যান | Histogram, mean/median |

⚠️ **Open item:** confirm which chapters belong to Class 9 and which to Class 10, or keep them as one combined level in the UI. The class picker must still let a student choose "Class 9" or "Class 10" and land on this list.

---

## Band: C11_12 (Classes 11 and 12 share one book)

### Class 11–12 (`c11_12`), 19 chapters (source: provided)
You labelled this list as "class 12" and said it shows the maximum difficulty. The Class 11 list was not given, and the two classes share one book, so it is stored as one combined list.

| id | Chapter (EN) | Chapter (BN) | Visualization idea |
|---|---|---|---|
| c11_12.01 | Real Numbers and Inequalities | বাস্তব সংখ্যা ও অসমতা | Number line, shaded regions |
| c11_12.02 | Linear Programming | যোগাশ্রয়ী প্রোগ্রাম | Feasible region, corner points |
| c11_12.03 | Complex Numbers | জটিল সংখ্যা | Argand plane |
| c11_12.04 | Polynomials and Polynomial Equations | বহুপদী ও বহুপদী সমীকরণ | Graph with roots |
| c11_12.05 | Binomial Expansion | দ্বিপদী বিস্তৃতি | Pascal's triangle |
| c11_12.06 | Conics | কনিক | Parabola, ellipse, hyperbola sliders |
| c11_12.07 | Inverse Trigonometric Functions and Trigonometric Equations | বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ | Unit circle, graphs |
| c11_12.08 | Statics | স্থিতিবিদ্যা | Force vectors |
| c11_12.09 | Motion of a Particle in a Plane | সমতলে বস্তুকণার গতি | Projectile path |
| c11_12.10 | Measures of Dispersion and Probability | বিস্তার পরিমাপ ও সম্ভাবনা | Distributions, trees |
| c11_12.11 | Vectors | ভেক্টর | Vector addition, dot and cross |
| c11_12.12 | Straight Lines | সরলরেখা | Line sliders (m, c) |
| c11_12.13 | Circle | বৃত্ত | Circle sliders (h, k, r) |
| c11_12.14 | Permutations and Combinations | বিন্যাস ও সমাবেশ | Arrangement counter |
| c11_12.15 | Trigonometric Ratios | ত্রিকোণমিতিক অনুপাত | Unit circle |
| c11_12.16 | Trigonometric Ratios of Associated and Compound Angles | সংযুক্ত ও যৌগিক কোণের ত্রিকোণমিতিক অনুপাত | Angle-addition diagram |
| c11_12.17 | Functions and Graphs of Functions | ফাংশন ও ফাংশনের লেখচিত্র | Graph transformations |
| c11_12.18 | Differentiation | অন্তরীকরণ | Tangent slope animation |
| c11_12.19 | Integration | যোগজীকরণ | Area under curve |

⚠️ **Open item:** send the real Class 11 chapter list, or tell me which of these 19 chapters belong to Class 11 and which to Class 12. I did not guess the split, because a wrong split would put chapters in the wrong class.

---

## Summary Table

| Class | Band | Chapters | Status |
|---|---|---|---|
| Play | PLAY_NURSERY | 5 topics | Provided |
| Nursery | PLAY_NURSERY | 14 topics | Drafted by me, please review |
| 1 | C1_5 | 18 | Provided |
| 2 | C1_5 | 7 units (about 21 topics) | Provided |
| 3 | C1_5 | 13 | Provided (ch. 1 title assumed) |
| 4 | C1_5 | 11 | Provided |
| 5 | C1_5 | 10 | Provided |
| 6 | C6_8 | 8 | Provided |
| 7 | C6_8 | ⚠️ none | Pasted list duplicates Class 6; needs the real list |
| 8 | C6_8 | 11 | Provided |
| 9–10 | C9_10 | 17 | Provided; class split unknown |
| 11–12 | C11_12 | 19 | Provided; class split unknown |

## Seeding Guidance
- Seed the `ClassLevel` and `Chapter` records from this file only, with **empty topics and no content**.
- Make the Class 7 and the Class 9/10 and 11/12 splits configurable, so the real lists can be dropped in later without a migration.
