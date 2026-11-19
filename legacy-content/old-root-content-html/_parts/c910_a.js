/* ─── Quadratic equations: roots and graphs ─── */

lesson('c910-201','Sum and product of roots','Roots α, β of ax² + bx + c = 0',A=>{
  A.say("If α and β are the roots of ax² + bx + c = 0, factorisation writes it as a(x − α)(x − β).",
        "ax² + bx + c = 0-এর মূল α ও β হলে উৎপাদকে লেখা যায় a(x − α)(x − β)।");
  A.text(400,95,'ax² + bx + c = a(x − α)(x − β)',{size:25,c:AM});
  A.say("Expand the right side: a[x² − (α + β)x + αβ].",
        "ডানপক্ষ বিস্তার করো: a[x² − (α + β)x + αβ]।");
  A.text(400,155,'a x² − a(α + β)x + a αβ',{size:26,c:SK});
  A.say("Match the coefficients of x and the constant term on both sides.",
        "দুই পাশে x-এর সহগ ও ধ্রুবক পদ মিলাও।");
  A.rect(115,205,270,90,{c:GR,w:2.5,fill:GR,fo:.10},.35);
  A.text(250,240,'sum of roots',{size:18,c:GR});
  A.text(250,275,'α + β = −b/a',{size:24,c:GR});
  A.rect(415,205,270,90,{c:PK,w:2.5,fill:PK,fo:.10},.35);
  A.text(550,240,'product of roots',{size:18,c:PK});
  A.text(550,275,'α β = c/a',{size:24,c:PK});
  A.say("For x² − 5x + 6 = 0 the sum is 5 and the product is 6, so the roots are 2 and 3.",
        "x² − 5x + 6 = 0-এ যোগফল 5 ও গুণফল 6, তাই মূল দুটি 2 ও 3।");
  A.text(400,355,'x² − 5x + 6 = (x − 2)(x − 3)',{size:23,c:VI});
  A.text(400,400,'2 + 3 = 5     ·     2 × 3 = 6',{size:22,c:INK});
  NOTE(A,448,'you can rebuild a quadratic from its two roots.');
});

lesson('c910-202','Quadratic graph and vertex','y = (x − h)² + k puts the vertex at (h, k)',A=>{
  A.say("Every quadratic graph is a parabola. Completing the square reveals its turning point.",
        "প্রতিটি দ্বিঘাত লেখচিত্র একটি পরাবৃত্ত। পূর্ণবর্গ করলে এর শীর্ষবিন্দু বের হয়।");
  A.text(400,90,'y = x² − 4x + 3 = (x − 2)² − 1',{size:24,c:AM});
  A.arrow(110,300,690,300,{c:MU,w:2},.4);
  A.arrow(240,390,240,80,{c:MU,w:2},.4);
  A.text(700,306,'x',{size:18,c:MU,anchor:'start'});
  A.text(250,76,'y',{size:18,c:MU,anchor:'start'});
  A.say("The vertex is (2, −1). Draw the dashed axis of symmetry through x = 2.",
        "শীর্ষবিন্দু (2, −1)। x = 2 বরাবর প্রতিসাম্য অক্ষটি ড্যাশ করে আঁকো।");
  const p=[];
  for(let i=0;i<=40;i++){const x=4*i/40;const y=x*x-4*x+3;p.push([400+(x-2)*80,300-y*55]);}
  A.pts(p,{c:SK,w:3.5},1);
  A.dashed(400,390,400,90,{c:MU,w:1.5},.5);
  A.circle(400,355,7,{c:AM,w:3,fill:AM,fo:1},.3);
  A.text(440,385,'vertex (2, −1)',{size:17,c:AM,anchor:'start'});
  A.say("It cuts the x-axis at x = 1 and x = 3, because (x − 1)(x − 3) = 0.",
        "এটি x-অক্ষকে x = 1 ও x = 3-এ ছেদ করে, কারণ (x − 1)(x − 3) = 0।");
  A.circle(320,300,6,{c:GR,w:3,fill:GR,fo:1},.25);
  A.circle(480,300,6,{c:GR,w:3,fill:GR,fo:1},.25);
  A.text(315,330,'1',{size:18,c:GR});
  A.text(485,330,'3',{size:18,c:GR});
  A.say("The lowest point is the vertex, so the range is y ≥ −1.",
        "সবচেয়ে নিচের বিন্দুটি শীর্ষ, তাই রেঞ্জ y ≥ −1।");
  NOTE(A,448,'the sign of a decides whether the parabola opens up or down.');
});

lesson('c910-203','Quadratic inequalities','Sign chart for (x − 1)(x − 3)',A=>{
  A.say("To solve (x − 1)(x − 3) > 0, find where each factor changes sign.",
        "(x − 1)(x − 3) > 0 সমাধানে দেখো কোথায় প্রতিটি উৎপাদকের চিহ্ন বদলায়।");
  A.line(90,220,710,220,{c:MU,w:3},.6);
  A.circle(250,220,9,{c:INK,w:3,fill:'#0b1220',fo:1},.3);
  A.circle(550,220,9,{c:INK,w:3,fill:'#0b1220',fo:1},.3);
  A.text(250,255,'1',{size:20,c:AM});
  A.text(550,255,'3',{size:20,c:AM});
  A.say("The critical points are 1 and 3. They split the line into three intervals.",
        "সংকট বিন্দু 1 ও 3। এরা সংখ্যারেখাকে তিনটি ব্যবধিতে ভাগ করে।");
  A.text(170,195,'x < 1',{size:19,c:SK});
  A.text(400,195,'1 < x < 3',{size:19,c:SK});
  A.text(630,195,'x > 3',{size:19,c:SK});
  A.say("Test one number in each interval: x = 0 gives +, x = 2 gives −, x = 4 gives +.",
        "প্রতিটি ব্যবধিতে একটি সংখ্যা পরীক্ষা করো: x = 0 দেয় +, x = 2 দেয় −, x = 4 দেয় +।");
  A.text(170,300,'+',{size:40,c:GR});
  A.text(400,300,'−',{size:40,c:RD});
  A.text(630,300,'+',{size:40,c:GR});
  A.say("We need greater than zero, so take the two outer intervals.",
        "আমাদের দরকার শূন্যের চেয়ে বড়, তাই দুই বাইরের ব্যবধি নাও।");
  A.line(90,220,250,220,{c:GR,w:7},.5);
  A.line(550,220,710,220,{c:GR,w:7},.5);
  A.text(400,365,'x < 1   or   x > 3',{size:26,c:GR});
  A.text(400,405,'(−∞, 1) ∪ (3, ∞)',{size:22,c:INK});
  NOTE(A,448,'open circles mean 1 and 3 themselves are not included.');
});

lesson('c910-204','Absolute value equations','|x − 2| = 3 means distance 3 from 2',A=>{
  A.say("Absolute value measures distance from zero, so |x − 2| is the distance of x from 2.",
        "পরম মান শূন্য থেকে দূরত্ব মাপে, তাই |x − 2| হলো x-এর 2 থেকে দূরত্ব।");
  A.line(90,200,710,200,{c:MU,w:3},.6);
  [-1,2,5].forEach((v,i)=>{const x=250+i*150;A.line(x,190,x,210,{c:MU,w:2},.2);});
  A.circle(250,200,8,{c:PK,w:3,fill:PK,fo:1},.3);
  A.circle(400,200,9,{c:AM,w:3,fill:AM,fo:1},.3);
  A.circle(550,200,8,{c:PK,w:3,fill:PK,fo:1},.3);
  A.text(250,235,'−1',{size:20,c:PK});
  A.text(400,235,'2',{size:20,c:AM});
  A.text(550,235,'5',{size:20,c:PK});
  A.say("The points at distance 3 from 2 are x = −1 on the left and x = 5 on the right.",
        "2 থেকে 3 দূরত্বে থাকা বিন্দু হলো বামে x = −1 এবং ডানে x = 5।");
  A.arrow(400,175,250,175,{c:SK,w:2.5},.4);
  A.arrow(400,175,550,175,{c:SK,w:2.5},.4);
  A.text(325,155,'3',{size:18,c:SK});
  A.text(475,155,'3',{size:18,c:SK});
  A.say("So remove the bars and write two ordinary equations.",
        "তাই পরম মানের দাগ সরিয়ে দুটি সাধারণ সমীকরণ লেখো।");
  A.text(400,320,'x − 2 = 3      or      x − 2 = −3',{size:24,c:VI});
  A.text(400,370,'x = 5      or      x = −1',{size:28,c:GR});
  NOTE(A,445,'an absolute value equation usually gives two solutions.');
});

/* ─── Logarithms and exponential change ─── */

lesson('c910-205','Change of base','log_b x = log_a x / log_a b',A=>{
  A.say("Let y = log_b x. By definition this means bʸ = x.",
        "ধরি y = log_b x। সংজ্ঞা অনুযায়ী এর অর্থ bʸ = x।");
  A.text(400,100,'y = log_b x     ⇔     bʸ = x',{size:27,c:AM});
  A.say("Take logarithms with any new base a on both sides.",
        "নতুন যেকোনো ভিত্তি a-তে দুই পাশের লগারিদম নাও।");
  A.text(400,160,'log_a (bʸ) = log_a x',{size:25,c:SK});
  A.say("A power slides out in front: y log_a b = log_a x.",
        "ঘাত সামনে নেমে আসে: y log_a b = log_a x।");
  A.text(400,220,'y · log_a b = log_a x',{size:25,c:VI});
  A.say("Divide by log_a b to finish the formula.",
        "log_a b দিয়ে ভাগ করলেই সূত্রটি পাওয়া যায়।");
  A.rect(190,275,420,75,{c:GR,w:2.5,fill:GR,fo:.10},.4);
  A.text(400,320,'log_b x = (log_a x) / (log_a b)',{size:25,c:GR});
  A.say("Example: log_5 25 = log 25 / log 5 = 2, because 5² = 25.",
        "উদাহরণ: log_5 25 = log 25 / log 5 = 2, কারণ 5² = 25।");
  A.text(400,395,'log₅ 25 = 1.398 / 0.699 = 2',{size:22,c:INK});
  NOTE(A,448,'the base you change to cancels out below the division line.');
});

lesson('c910-206','Exponential growth and decay','Multiply a fixed factor each step',A=>{
  A.say("Growth multiplies by 1 + r each year; decay multiplies by 1 − r.",
        "প্রবৃদ্ধিতে প্রতি বছর (1 + r) দিয়ে গুণ হয়; ক্ষয়ে (1 − r) দিয়ে।");
  A.text(400,88,'growth: y = 1000(1.1)ᵗ      decay: y = 1000(0.9)ᵗ',{size:20,c:AM});
  A.line(140,380,700,380,{c:MU,w:2.5},.5);
  A.line(140,380,140,130,{c:MU,w:2.5},.4);
  A.say("Start at 1000. After one year growth gives 1100 and decay gives 900.",
        "শুরু 1000। এক বছর পরে প্রবৃদ্ধি দেয় 1100, ক্ষয় দেয় 900।");
  const grow=[1000,1100,1210,1331],dec=[1000,900,810,729];
  grow.forEach((v,i)=>{
    const x=190+i*125;
    A.rect(x-18,380-v/12,36,v/12,{c:SK,w:2,fill:SK,fo:.45},.35);
    A.text(x,405,String(v),{size:15,c:SK});
  });
  dec.forEach((v,i)=>{
    const x=230+i*125;
    A.rect(x-18,380-v/12,36,v/12,{c:PK,w:2,fill:PK,fo:.45},.35);
    A.text(x,430,String(v),{size:15,c:PK});
  });
  A.say("The growth bars climb while the decay bars shrink, both curving by the same rule.",
        "প্রবৃদ্ধির দণ্ড ওঠে, ক্ষয়ের দণ্ড কমে — দুটোই একই নিয়মে বাঁক নেয়।");
  A.text(655,150,'blue: growth',{size:16,c:SK,anchor:'end'});
  A.text(655,172,'pink: decay',{size:16,c:PK,anchor:'end'});
  A.say("After three years growth is 1331 and decay is only 729.",
        "তিন বছর পরে প্রবৃদ্ধি 1331 আর ক্ষয় মাত্র 729।");
  NOTE(A,462,'a decay factor between 0 and 1 makes the graph fall.');
});

/* ─── Polynomials ─── */

lesson('c910-207','Polynomial long division','Divide x³ − 2x² + 4x − 3 by x − 1',A=>{
  A.say("Long division of polynomials works like dividing numbers, step by step.",
        "বহুপদীর দীর্ঘ ভাগ সংখ্যার ভাগের মতোই ধাপে ধাপে হয়।");
  A.text(400,95,'(x³ − 2x² + 4x − 3) ÷ (x − 1)',{size:24,c:AM});
  A.say("Write the coefficients 1, −2, 4, −3 and bring down the first one.",
        "সহগগুলো 1, −2, 4, −3 লেখো এবং প্রথমটি নিচে নামাও।");
  const xs=[250,370,490,610];
  xs.forEach((x,i)=>{
    A.rect(x-45,160,90,52,{c:MU,w:2,fill:MU,fo:.08},.25);
    A.text(x,196,String([1,-2,4,-3][i]),{size:22,c:INK});
  });
  A.text(250,240,'1',{size:22,c:GR});
  A.say("Multiply 1 by the divisor's root 1 and add to the next column: −2 + 1 = −1.",
        "1-কে ভাজকের মূল 1 দিয়ে গুণ করে পরের ঘরে যোগ করো: −2 + 1 = −1।");
  A.text(370,240,'−1',{size:22,c:GR});
  A.say("Repeat: multiply −1 by 1, add to 4 gives 3; then 3 by 1, add to −3 gives 0.",
        "পুনরাবৃত্তি: −1-কে 1 দিয়ে গুণ, 4-এ যোগে 3; তারপর 3-কে 1 দিয়ে গুণ, −3-এ যোগে 0।");
  A.text(490,240,'3',{size:22,c:GR});
  A.text(610,240,'0',{size:22,c:SK});
  A.line(190,270,670,270,{c:MU,w:2},.4);
  A.text(400,310,'quotient: x² − x + 3        remainder: 0',{size:23,c:VI});
  A.say("The zero remainder means x − 1 is a factor of the cubic.",
        "শূন্য ভাগশেষ মানে x − 1 ঘন বহুপদীর একটি উৎপাদক।");
  A.text(400,365,'x³ − 2x² + 4x − 3 = (x − 1)(x² − x + 3)',{size:21,c:GR});
  NOTE(A,445,'check by multiplying the quotient back by the divisor.');
});

/* ─── Sequences and series ─── */

lesson('c910-208','Arithmetic sequence','nth term = a + (n − 1)d',A=>{
  A.say("An arithmetic sequence adds the same number d each time. Here 3, 7, 11, 15 has d = 4.",
        "সমান্তর ধারায় প্রতিবার একই সংখ্যা d যোগ হয়। এখানে 3, 7, 11, 15-এ d = 4।");
  const terms=[3,7,11,15];
  terms.forEach((v,i)=>{
    const x=170+i*150;
    A.rect(x-40,120,80,60,{c:SK,w:2.5,fill:SK,fo:.15},.3);
    A.text(x,160,String(v),{size:26,c:SK});
  });
  A.say("To reach term 4 we start at 3 and add 4 three times.",
        "চতুর্থ পদে পৌঁছাতে 3 থেকে শুরু করে তিনবার 4 যোগ করি।");
  for(let i=0;i<3;i++){
    A.arrow(215+i*150,110,280+i*150,110,{c:AM,w:2},.3);
    A.text(248+i*150,95,'+4',{size:17,c:AM});
  }
  A.say("So the nth term is the first term plus n − 1 copies of d.",
        "তাই n-তম পদ = প্রথম পদ + (n − 1) বার d।");
  A.rect(190,235,420,70,{c:GR,w:2.5,fill:GR,fo:.10},.4);
  A.text(400,278,'aₙ = a + (n − 1)d',{size:28,c:GR});
  A.say("For the 10th term: a₁₀ = 3 + 9 × 4 = 39.",
        "দশম পদের জন্য: a₁₀ = 3 + 9 × 4 = 39।");
  A.text(400,350,'a₁₀ = 3 + 36 = 39',{size:26,c:VI});
  A.text(400,398,'n − 1 = 9 jumps of 4',{size:20,c:INK});
  NOTE(A,448,'the difference d can be negative for a decreasing sequence.');
});

lesson('c910-209','Sum of an arithmetic series','Pair the ends to get equal sums',A=>{
  A.say("Add 3 + 7 + 11 + ... + 39. Write the ten terms in a row.",
        "3 + 7 + 11 + ... + 39 যোগ করো। দশটি পদ এক সারিতে লেখো।");
  const row=[];for(let i=0;i<10;i++)row.push(3+4*i);
  row.forEach((v,i)=>{
    const x=150+i*60;
    A.text(x,115,String(v),{size:18,c:SK});
  });
  A.say("Write the same series backwards underneath.",
        "একই ধারা নিচে উল্টো করে লেখো।");
  const rev=row.slice().reverse();
  rev.forEach((v,i)=>{
    const x=150+i*60;
    A.text(x,175,String(v),{size:18,c:PK});
  });
  A.say("Each column adds to the same total: 3 + 39 = 42.",
        "প্রতিটি কলামের যোগফল একই: 3 + 39 = 42।");
  [0,3,6,9].forEach(i=>{
    A.line(130+i*60,195,170+i*60,195,{c:AM,w:2},.25);
    A.text(150+i*60,220,'42',{size:15,c:AM});
  });
  A.say("Ten columns of 42 count every term twice, so divide by 2.",
        "42-এর দশটি কলাম প্রতিটি পদ দুইবার গোনে, তাই 2 দিয়ে ভাগ করো।");
  A.text(400,290,'S₁₀ = 10 × 42 ÷ 2 = 210',{size:27,c:GR});
  A.say("In general Sₙ = n/2 (a + l), the average of the ends times the count.",
        "সাধারণভাবে Sₙ = n/2 (a + l), অর্থাৎ দুই প্রান্তের গড় গুণ পদের সংখ্যা।");
  A.rect(190,330,420,62,{c:VI,w:2.5,fill:VI,fo:.10},.4);
  A.text(400,370,'Sₙ = n/2 (2a + (n − 1)d)',{size:24,c:VI});
  NOTE(A,448,'when you know the last term l, use n/2 (a + l).');
});

/* ─── Coordinate geometry ─── */

lesson('c910-210','Distance formula','Distance from A(1, 2) to B(4, 6)',A=>{
  A.say("Plot A(1, 2) and B(4, 6). Draw a right triangle with horizontal and vertical legs.",
        "A(1, 2) ও B(4, 6) বসাও। অনুভূমিক ও উল্লম্ব বাহু দিয়ে একটি সমকোণী ত্রিভুজ আঁকো।");
  A.arrow(130,400,730,400,{c:MU,w:2},.4);
  A.arrow(180,430,180,90,{c:MU,w:2},.4);
  A.text(740,406,'x',{size:18,c:MU,anchor:'start'});
  A.text(190,80,'y',{size:18,c:MU,anchor:'start'});
  A.circle(250,300,7,{c:SK,w:3,fill:SK,fo:1},.3);
  A.circle(460,100,7,{c:PK,w:3,fill:PK,fo:1},.3);
  A.text(225,325,'A(1, 2)',{size:18,c:SK});
  A.text(475,95,'B(4, 6)',{size:18,c:PK,anchor:'start'});
  A.say("The horizontal run is 4 − 1 = 3 and the vertical rise is 6 − 2 = 4.",
        "অনুভূমিক দূরত্ব 4 − 1 = 3 এবং উল্লম্ব উচ্চতা 6 − 2 = 4।");
  A.line(250,300,460,300,{c:GR,w:3},.5);
  A.line(460,300,460,100,{c:GR,w:3},.5);
  A.text(355,325,'3',{size:20,c:GR});
  A.text(478,205,'4',{size:20,c:GR});
  A.say("Pythagoras gives the straight distance AB² = 3² + 4² = 25.",
        "পিথাগোরাস অনুযায়ী সরল দূরত্ব AB² = 3² + 4² = 25।");
  A.line(250,300,460,100,{c:AM,w:4},.6);
  A.text(330,185,'5',{size:22,c:AM});
  A.say("So AB = 5. In general the distance formula is the same picture.",
        "তাই AB = 5। সাধারণভাবে দূরত্বের সূত্রও একই চিত্র।");
  A.text(400,370,'AB = √[(x₂ − x₁)² + (y₂ − y₁)²]',{size:23,c:VI});
  NOTE(A,445,'a horizontal or vertical gap just makes one leg zero.');
});

lesson('c910-211','Midpoint formula','Midpoint averages the coordinates',A=>{
  A.say("The midpoint of a segment is the point exactly halfway between its ends.",
        "রেখাংশের মধ্যবিন্দু হলো দুই প্রান্তের ঠিক মাঝের বিন্দু।");
  A.arrow(120,300,730,300,{c:MU,w:2},.4);
  A.arrow(350,420,350,90,{c:MU,w:2},.4);
  A.circle(230,260,7,{c:SK,w:3,fill:SK,fo:1},.3);
  A.circle(590,100,7,{c:PK,w:3,fill:PK,fo:1},.3);
  A.circle(410,180,8,{c:GR,w:3,fill:GR,fo:1},.3);
  A.line(230,260,590,100,{c:MU,w:2},.5);
  A.text(205,285,'A(−2, 1)',{size:18,c:SK,anchor:'start'});
  A.text(605,95,'B(4, 5)',{size:18,c:PK,anchor:'start'});
  A.text(390,160,'M(1, 3)',{size:18,c:GR,anchor:'end'});
  A.say("A is (−2, 1) and B is (4, 5). Average the x-values: (−2 + 4)/2 = 1.",
        "A হলো (−2, 1) ও B হলো (4, 5)। x-মানের গড়: (−2 + 4)/2 = 1।");
  A.text(400,335,'x: (−2 + 4) / 2 = 1',{size:21,c:SK});
  A.say("Average the y-values: (1 + 5)/2 = 3. So M is (1, 3).",
        "y-মানের গড়: (1 + 5)/2 = 3। তাই M হলো (1, 3)।");
  A.text(400,375,'y: (1 + 5) / 2 = 3',{size:21,c:PK});
  A.rect(200,395,400,50,{c:GR,w:2.5,fill:GR,fo:.10},.35);
  A.text(400,428,'M = ((x₁+x₂)/2 , (y₁+y₂)/2)',{size:21,c:GR});
  NOTE(A,466,'the midpoint is the average of the two endpoints.');
});

lesson('c910-212','Section formula','Divide a segment in the ratio m : n',A=>{
  A.say("A point P can divide AB in a given ratio. Here A(0, 0), B(6, 3) and the ratio is 2 : 1.",
        "একটি বিন্দু P রেখাংশ AB-কে নির্দিষ্ট অনুপাতে ভাগ করে। এখানে A(0, 0), B(6, 3), অনুপাত 2 : 1।");
  A.arrow(120,330,720,330,{c:MU,w:2},.4);
  A.arrow(180,410,180,90,{c:MU,w:2},.4);
  A.circle(180,330,7,{c:SK,w:3,fill:SK,fo:1},.3);
  A.circle(540,150,7,{c:PK,w:3,fill:PK,fo:1},.3);
  A.circle(420,210,8,{c:GR,w:3,fill:GR,fo:1},.3);
  A.line(180,330,540,150,{c:MU,w:3},.5);
  A.text(150,355,'A(0, 0)',{size:18,c:SK,anchor:'end'});
  A.text(552,145,'B(6, 3)',{size:18,c:PK,anchor:'start'});
  A.text(405,198,'P(4, 2)',{size:18,c:GR,anchor:'end'});
  A.say("The ratio 2 : 1 means P is twice as far from A as from B, so it sits closer to B.",
        "অনুপাত 2 : 1 মানে P, A থেকে B-র দ্বিগুণ দূরে, তাই P, B-র কাছে বসে।");
  A.text(300,315,'2 parts',{size:17,c:SK});
  A.text(480,190,'1 part',{size:17,c:GR});
  A.say("Multiply the far point by the near ratio number, add, then divide by m + n.",
        "দূরের বিন্দুকে কাছের অনুপাতের সংখ্যা দিয়ে গুণ করো, যোগ করো, তারপর m + n দিয়ে ভাগ করো।");
  A.text(400,110,'P = ( (m x₂ + n x₁)/(m+n) , (m y₂ + n y₁)/(m+n) )',{size:18,c:VI});
  A.say("With m = 2, n = 1: x = (2×6 + 1×0)/3 = 4 and y = (2×3 + 1×0)/3 = 2.",
        "m = 2, n = 1 নিলে: x = (2×6 + 1×0)/3 = 4 এবং y = (2×3 + 1×0)/3 = 2।");
  A.text(400,395,'P = (4, 2)',{size:26,c:GR});
  NOTE(A,448,'for an external division the denominator becomes m − n.');
});

lesson('c910-213','Slope of a line','Slope = rise / run',A=>{
  A.say("Slope measures steepness: rise divided by run. A line through (1, 2) and (4, 6) rises 4 for a run of 3.",
        "ঢাল খাড়াত্ব মাপে: উল্লম্ব বৃদ্ধি ÷ অনুভূমিক বৃদ্ধি। (1, 2) ও (4, 6) দিয়ে রেখা 3 অনুভূমিকে 4 ওঠে।");
  A.arrow(110,380,720,380,{c:MU,w:2},.4);
  A.arrow(200,430,200,90,{c:MU,w:2},.4);
  A.circle(260,300,7,{c:SK,w:3,fill:SK,fo:1},.3);
  A.circle(440,140,7,{c:PK,w:3,fill:PK,fo:1},.3);
  A.line(230,325,475,115,{c:AM,w:3.5},.6);
  A.text(230,325,'A(1, 2)',{size:17,c:SK,anchor:'end'});
  A.text(452,135,'B(4, 6)',{size:17,c:PK,anchor:'start'});
  A.say("Draw the staircase: run 3 across, then rise 4 up.",
        "সিঁড়ি আঁকো: 3 ডানে, তারপর 4 উপরে।");
  A.line(260,300,440,300,{c:GR,w:3},.5);
  A.line(440,300,440,140,{c:GR,w:3},.5);
  A.text(350,325,'run = 3',{size:18,c:GR});
  A.text(455,225,'rise = 4',{size:18,c:GR,anchor:'start'});
  A.say("Slope m = 4 / 3. The same value comes from (y₂ − y₁)/(x₂ − x₁).",
        "ঢাল m = 4 / 3। একই মান পাওয়া যায় (y₂ − y₁)/(x₂ − x₁) থেকেও।");
  A.text(400,370,'m = (6 − 2) / (4 − 1) = 4/3',{size:24,c:VI});
  A.say("A positive slope climbs to the right; a negative slope falls.",
        "ধনাত্মক ঢাল ডানে উঠে; ঋণাত্মক ঢাল নিচে নামে।");
  A.text(400,410,'up to the right  ↗      down to the right  ↘',{size:20,c:INK});
  NOTE(A,448,'a horizontal line has slope 0; a vertical line has no slope.');
});

lesson('c910-214','Equation of a straight line','y = mx + c',A=>{
  A.say("A line is fixed by its slope m and its y-intercept c. The equation is y = mx + c.",
        "একটি রেখা তার ঢাল m ও y-অন্তর্ধন c দিয়ে নির্ধারিত হয়। সমীকরণ y = mx + c।");
  A.arrow(100,350,730,350,{c:MU,w:2},.4);
  A.arrow(300,430,300,80,{c:MU,w:2},.4);
  const p=[];
  for(let i=0;i<=40;i++){const x=-1.5+4.5*i/40;p.push([300+x*60,350-(2*x+1)*40]);}
  A.pts(p,{c:SK,w:3.5},1);
  A.say("Here y = 2x + 1, so the line crosses the y-axis at c = 1.",
        "এখানে y = 2x + 1, তাই রেখাটি y-অক্ষকে c = 1-এ ছেদ করে।");
  A.circle(300,310,7,{c:AM,w:3,fill:AM,fo:1},.3);
  A.text(320,300,'c = 1',{size:18,c:AM,anchor:'start'});
  A.say("Pick two points on the line: when x = 0, y = 1; when x = 2, y = 5.",
        "রেখার দুইটি বিন্দু নাও: x = 0 হলে y = 1; x = 2 হলে y = 5।");
  A.circle(420,150,6,{c:GR,w:3,fill:GR,fo:1},.25);
  A.text(435,145,'(2, 5)',{size:17,c:GR,anchor:'start'});
  A.text(300,395,'x = 0 → y = 1      x = 2 → y = 5',{size:20,c:INK});
  A.say("From a known point (x₁, y₁) use the form y − y₁ = m(x − x₁).",
        "জানা বিন্দু (x₁, y₁) থেকে ব্যবহার করো y − y₁ = m(x − x₁)।");
  A.rect(200,405,400,45,{c:VI,w:2.5,fill:VI,fo:.10},.35);
  A.text(400,438,'y = 2x + 1',{size:24,c:VI});
  NOTE(A,468,'m is the change in y for every one step in x.');
});

lesson('c910-215','Parallel and perpendicular lines','Same slope, or negative reciprocal',A=>{
  A.say("Two lines are parallel when they never meet, which means their slopes are equal.",
        "দুই রেখা সমান্তরাল যখন কখনো মেলে না, অর্থাৎ তাদের ঢাল সমান।");
  A.arrow(80,240,370,240,{c:MU,w:2},.4);
  A.arrow(220,360,220,100,{c:MU,w:2},.4);
  A.line(100,320,300,180,{c:SK,w:3},.5);
  A.line(150,340,350,200,{c:SK,w:3},.5);
  A.text(225,120,'m₁ = m₂',{size:22,c:SK});
  A.say("Both lines here have slope 2, so they stay the same distance apart.",
        "এখানে দুই রেখারই ঢাল 2, তাই তারা একই দূরত্বে থাকে।");
  A.say("Perpendicular lines meet at 90°; their slopes multiply to −1.",
        "লম্ব রেখা 90° কোণে মেলে; তাদের ঢালের গুণফল −1।");
  A.arrow(440,280,750,280,{c:MU,w:2},.4);
  A.arrow(560,380,560,90,{c:MU,w:2},.4);
  A.line(470,360,650,200,{c:PK,w:3},.5);
  A.line(480,190,640,370,{c:GR,w:3},.5);
  A.text(470,190,'m = 2',{size:18,c:PK,anchor:'end'});
  A.text(650,390,'m = −1/2',{size:18,c:GR,anchor:'start'});
  A.say("A slope of 2 pairs with −1/2, because 2 × (−1/2) = −1.",
        "ঢাল 2-এর জোড়া −1/2, কারণ 2 × (−1/2) = −1।");
  A.text(400,415,'m₁ · m₂ = −1',{size:24,c:VI});
  A.text(400,450,'perpendicular  ⇔  negative reciprocal',{size:18,c:INK});
  NOTE(A,468,'flip the fraction and change its sign.');
});

lesson('c910-216','Equation of a circle','(x − h)² + (y − k)² = r²',A=>{
  A.say("A circle is all points at the same distance r from a centre (h, k).",
        "বৃত্ত হলো কেন্দ্র (h, k) থেকে সমান দূরত্ব r-এ থাকা সব বিন্দুর সেট।");
  A.arrow(120,260,740,260,{c:MU,w:2},.4);
  A.arrow(400,420,400,80,{c:MU,w:2},.4);
  A.circle(520,200,120,{c:AM,w:3,fill:AM,fo:.05},1);
  A.circle(520,200,6,{c:AM,w:3,fill:AM,fo:1},.3);
  A.say("Take centre (2, 1) and radius 2. The circle is (x − 2)² + (y − 1)² = 4.",
        "কেন্দ্র (2, 1) ও ব্যাসার্ধ 2 নাও। বৃত্তটি (x − 2)² + (y − 1)² = 4।");
  A.line(520,200,640,200,{c:SK,w:3},.5);
  A.text(585,185,'r = 2',{size:18,c:SK});
  A.say("The radius comes from the distance formula between (x, y) and the centre.",
        "ব্যাসার্ধ আসে (x, y) ও কেন্দ্রের মধ্যে দূরত্বের সূত্র থেকে।");
  A.text(400,370,'(x − h)² + (y − k)² = r²',{size:26,c:GR});
  A.say("Its four compass points are (0, 1), (4, 1), (2, 3) and (2, −1).",
        "(0, 1), (4, 1), (2, 3) ও (2, −1) এর চারটি দিক-বিন্দু।");
  [[400,200],[640,200],[520,80],[520,320]].forEach(p=>A.circle(p[0],p[1],6,{c:PK,w:3,fill:PK,fo:1},.25));
  A.text(400,405,'centre (2, 1),  radius 2',{size:20,c:INK});
  NOTE(A,448,'expanding the brackets gives x² + y² − 4x − 2y + 1 = 0.');
});

/* ─── Trigonometry ─── */

lesson('c910-217','Sine rule','a / sin A = b / sin B = c / sin C',A=>{
  A.say("In any triangle, each side divided by the sine of its opposite angle is the same.",
        "যেকোনো ত্রিভুজে প্রতিটি বাহুকে তার বিপরীত কোণের সাইন দিয়ে ভাগ করলে একই মান হয়।");
  A.circle(400,260,100,{c:MU,w:2,fill:SK,fo:.03},.8);
  A.pts([[500,260],[417.4,358.5],[306,225.8],[500,260]],{c:INK,w:3},.8);
  A.say("Here angle A = 40°, angle B = 60° and angle C = 80°.",
        "এখানে কোণ A = 40°, কোণ B = 60° ও কোণ C = 80°।");
  A.text(282,218,'A = 40°',{size:17,c:AM,anchor:'end'});
  A.text(514,252,'B = 60°',{size:17,c:AM,anchor:'start'});
  A.text(425,385,'C = 80°',{size:17,c:AM});
  A.say("Side a is opposite A, side b opposite B, and side c opposite C.",
        "বাহু a, A-এর বিপরীত; বাহু b, B-এর বিপরীত; বাহু c, C-এর বিপরীত।");
  A.text(470,320,'a',{size:19,c:SK});
  A.text(345,300,'b',{size:19,c:SK});
  A.text(405,232,'c',{size:19,c:SK});
  A.say("With a circumradius R = 100 pixels, a = 2R sin A = 200 sin 40° ≈ 129.",
        "পরিবৃত্তের ব্যাসার্ধ R = 100 পিক্সেল হলে a = 2R sin A = 200 sin 40° ≈ 129।");
  A.text(400,405,'a / sin A = b / sin B = c / sin C = 2R',{size:22,c:GR});
  A.say("The common value is 2R, twice the radius of the circumcircle.",
        "সাধারণ মানটি 2R, অর্থাৎ পরিবৃত্তের ব্যাসার্ধের দ্বিগুণ।");
  NOTE(A,448,'use the sine rule when you know a side and its opposite angle.');
});

lesson('c910-218','Cosine rule','a² = b² + c² − 2bc cos A',A=>{
  A.say("The cosine rule handles a triangle when you know two sides and the angle between them.",
        "কোসাইন সূত্র তখন কাজে লাগে যখন দুই বাহু ও তাদের মধ্যবর্তী কোণ জানা থাকে।");
  A.pts([[250,360],[549.6,262.7],[296.8,139.9],[250,360]],{c:INK,w:3},.8);
  A.text(232,370,'A',{size:18,c:AM,anchor:'end'});
  A.text(560,262,'B',{size:18,c:AM,anchor:'start'});
  A.text(292,128,'C',{size:18,c:AM});
  A.say("Let b = AC = 5, c = AB = 7 and the included angle A = 60°.",
        "ধরি b = AC = 5, c = AB = 7 এবং মধ্যবর্তী কোণ A = 60°।");
  A.text(255,250,'b = 5',{size:18,c:SK,anchor:'end'});
  A.text(410,320,'c = 7',{size:18,c:SK});
  A.text(440,200,'a = ?',{size:18,c:PK});
  A.circle(250,360,7,{c:AM,w:3,fill:AM,fo:1},.3);
  A.text(305,338,'60°',{size:16,c:AM});
  A.say("Substitute: a² = 5² + 7² − 2(5)(7) cos 60°.",
        "মান বসাও: a² = 5² + 7² − 2(5)(7) cos 60°।");
  A.text(400,390,'a² = 25 + 49 − 70 × 0.5 = 39',{size:22,c:VI});
  A.say("So a = √39 ≈ 6.24. The rule is just Pythagoras plus a cosine correction.",
        "তাই a = √39 ≈ 6.24। সূত্রটি পিথাগোরাসের সঙ্গে কোসাইন সংশোধন।");
  A.text(400,435,'a = √39 ≈ 6.24',{size:24,c:GR});
  NOTE(A,466,'if A = 90°, cos 90° = 0 and it becomes Pythagoras.');
});

lesson('c910-219','Area of a triangle','Area = ½ a b sin C',A=>{
  A.say("Two sides and the angle between them fix the area of a triangle.",
        "দুই বাহু ও তাদের মধ্যবর্তী কোণ একটি ত্রিভুজের ক্ষেত্রফল নির্ধারণ করে।");
  A.pts([[250,360],[570,360],[457.8,240],[250,360]],{c:INK,w:3},.8);
  A.line(250,360,457.8,240,{c:SK,w:3},.5);
  A.line(457.8,240,457.8,360,{c:MU,w:2},.5);
  A.rect(446,346,14,14,{c:MU,w:1.3},.3);
  A.say("Take base AB = 8 and side AC = 6 with angle A = 30°.",
        "ভূমি AB = 8 এবং বাহু AC = 6, কোণ A = 30° নাও।");
  A.text(410,385,'base = 8',{size:18,c:SK});
  A.text(300,290,'side = 6',{size:18,c:SK});
  A.text(300,340,'30°',{size:16,c:AM});
  A.say("The height is h = 6 sin 30° = 3, because sine turns the slanted side into a height.",
        "উচ্চতা h = 6 sin 30° = 3, কারণ সাইন কাত বাহুকে উচ্চতায় পরিণত করে।");
  A.text(480,300,'h = 3',{size:18,c:MU,anchor:'start'});
  A.say("Area = ½ × base × height = ½ × 8 × 3 = 12.",
        "ক্ষেত্রফল = ½ × ভূমি × উচ্চতা = ½ × 8 × 3 = 12।");
  A.text(400,415,'Area = ½ × 8 × 3 = 12',{size:23,c:GR});
  A.say("In general, Area = ½ a b sin C.",
        "সাধারণভাবে, ক্ষেত্রফল = ½ a b sin C।");
  A.text(400,445,'Area = ½ a b sin C',{size:20,c:VI});
  NOTE(A,466,'use the angle between the two sides you multiply.');
});

lesson('c910-220','Trigonometric identities','sin²θ + cos²θ = 1 from a unit circle',A=>{
  A.say("On a unit circle the radius is 1, so any point is (cos θ, sin θ).",
        "একক বৃত্তে ব্যাসার্ধ 1, তাই যেকোনো বিন্দু (cos θ, sin θ)।");
  A.circle(400,230,130,{c:MU,w:2,fill:SK,fo:.04},.9);
  A.arrow(230,230,660,230,{c:MU,w:2},.4);
  A.arrow(400,390,400,80,{c:MU,w:2},.4);
  A.say("For θ = 40°, the point sits at (cos 40°, sin 40°).",
        "θ = 40° হলে বিন্দুটি (cos 40°, sin 40°)-এ থাকে।");
  A.line(400,230,499.6,146.4,{c:AM,w:3.5},.5);
  A.line(499.6,230,499.6,146.4,{c:GR,w:3},.5);
  A.line(400,230,499.6,230,{c:SK,w:3},.5);
  A.circle(499.6,146.4,7,{c:PK,w:3,fill:PK,fo:1},.3);
  A.text(515,140,'(cos θ, sin θ)',{size:17,c:PK,anchor:'start'});
  A.text(450,215,'cos θ',{size:17,c:SK});
  A.text(510,195,'sin θ',{size:17,c:GR,anchor:'start'});
  A.say("The two legs make a right triangle with hypotenuse 1.",
        "দুই বাহু একটি সমকোণী ত্রিভুজ গঠন করে যার অতিভুজ 1।");
  A.say("Pythagoras then gives (cos θ)² + (sin θ)² = 1².",
        "পিথাগোরাস তখন দেয় (cos θ)² + (sin θ)² = 1²।");
  A.text(400,390,'sin²θ + cos²θ = 1',{size:26,c:GR});
  A.say("Divide by cos²θ to get 1 + tan²θ = sec²θ; divide by sin²θ for 1 + cot²θ = cosec²θ.",
        "cos²θ দিয়ে ভাগ করলে 1 + tan²θ = sec²θ; sin²θ দিয়ে ভাগ করলে 1 + cot²θ = cosec²θ।");
  A.text(400,425,'1 + tan²θ = sec²θ',{size:18,c:VI});
  A.text(400,450,'1 + cot²θ = cosec²θ',{size:18,c:VI});
  NOTE(A,468,'these three identities all come from the same right triangle.');
});

