/* ─── Part B: quadratic methods ─── */

lesson('c910-221','Quadratic formula','x = (−b ± √(b² − 4ac)) / 2a',A=>{
  A.say("Start with ax² + bx + c = 0 and divide every term by the leading coefficient a.",
        "ax² + bx + c = 0 দিয়ে শুরু করো এবং প্রতিটি পদকে প্রথম সহগ a দিয়ে ভাগ করো।");
  A.text(400,95,'x² + (b/a)x + c/a = 0',{size:26,c:AM});
  A.say("Move the constant across, then add (b/2a)² to both sides to complete the square.",
        "ধ্রুবক পদটি অন্যপাশে নাও, তারপর দুই পাশে (b/2a)² যোগ করে পূর্ণবর্গ করো।");
  A.text(400,155,'(x + b/2a)² = (b² − 4ac) / 4a²',{size:24,c:SK});
  A.line(150,195,650,195,{c:MU,w:1.5},.4);
  A.say("Take the square root of both sides and keep the plus or minus sign.",
        "দুই পাশের বর্গমূল নাও এবং যোগ বা বিয়োগ চিহ্নটি রাখো।");
  A.text(400,235,'x + b/2a = ± √(b² − 4ac) / 2a',{size:22,c:VI});
  A.rect(130,270,540,80,{c:GR,w:2.5,fill:GR,fo:.10},.45);
  A.text(400,322,'x = (−b ± √(b² − 4ac)) / 2a',{size:27,c:GR});
  A.say("For x² − 5x + 6: a = 1, b = −5, c = 6, so x = (5 ± 1)/2.",
        "x² − 5x + 6-এর জন্য: a = 1, b = −5, c = 6, তাই x = (5 ± 1)/2।");
  A.text(400,390,'x = (5 + 1)/2 = 3      x = (5 − 1)/2 = 2',{size:21,c:INK});
  NOTE(A,448,'the formula works for every quadratic, even when it does not factor.');
});

lesson('c910-222','Discriminant and nature of roots','D = b² − 4ac decides the roots',A=>{
  A.say("The discriminant D = b² − 4ac sits under the square root, so its sign controls the roots.",
        "নিরূপক D = b² − 4ac বর্গমূলের নিচে থাকে, তাই এর চিহ্নই মূলের ধরন ঠিক করে।");
  const par=(cx,y0,f,color)=>{
    const q=[];
    for(let i=0;i<=26;i++){const x=-1.3+2.6*i/26;q.push([cx+x*58,y0-f(x)*52]);}
    A.pts(q,{c:color,w:3},.5);
  };
  A.line(70,270,250,270,{c:MU,w:2},.4);
  A.line(310,270,490,270,{c:MU,w:2},.4);
  A.line(550,270,730,270,{c:MU,w:2},.4);
  par(160,270,x=>x*x-1,GR);
  par(400,270,x=>x*x,AM);
  par(640,270,x=>x*x+0.6,PK);
  A.say("D > 0 gives two roots, because the parabola crosses the axis twice.",
        "D > 0 হলে দুইটি মূল পাওয়া যায়, কারণ পরাবৃত্তটি অক্ষকে দুইবার ছেদ করে।");
  A.text(160,330,'D > 0',{size:20,c:GR});
  A.text(160,360,'two real roots',{size:15,c:GR});
  A.say("D = 0 touches the axis once, so there is one repeated root.",
        "D = 0 হলে অক্ষকে একবার স্পর্শ করে, তাই একটি পুনরাবৃত্ত মূল থাকে।");
  A.text(400,330,'D = 0',{size:20,c:AM});
  A.text(400,360,'one equal root',{size:15,c:AM});
  A.say("D < 0 misses the axis, so there are no real roots.",
        "D < 0 হলে অক্ষকে ছোঁয় না, তাই কোনো বাস্তব মূল নেই।");
  A.text(640,330,'D < 0',{size:20,c:PK});
  A.text(640,360,'no real root',{size:15,c:PK});
  A.text(400,405,'x² + x + 1:  D = 1 − 4 = −3  →  no real roots',{size:20,c:INK});
  NOTE(A,450,'the discriminant tells the story before you solve anything.');
});

lesson('c910-223','Completing the square to solve','x² + 6x − 7 = 0 becomes (x + 3)² = 16',A=>{
  A.say("Draw x² as a square and split 6x into two strips of 3x so the pieces form an L.",
        "x²-কে একটি বর্গ হিসেবে আঁকো এবং 6x-কে 3x করে দুইটি স্ট্রিপে ভাগ করো যাতে টুকরোগুলো L আকৃতি নেয়।");
  A.rect(210,150,120,120,{c:SK,w:2.5,fill:SK,fo:.15},.4);
  A.rect(330,150,32,120,{c:AM,w:2.5,fill:AM,fo:.18},.4);
  A.rect(210,270,120,32,{c:AM,w:2.5,fill:AM,fo:.18},.4);
  A.text(270,215,'x²',{size:28,c:SK});
  A.text(346,215,'3x',{size:18,c:AM});
  A.text(270,290,'3x',{size:18,c:AM});
  A.say("The missing corner is 3 × 3 = 9, so add 9 to complete a bigger square of side x + 3.",
        "যে কোণাটি নেই সেটি 3 × 3 = 9, তাই 9 যোগ করলে বাহু x + 3 বিশিষ্ট বড় বর্গ সম্পূর্ণ হয়।");
  A.rect(330,270,32,32,{c:GR,w:2.5,fill:GR,fo:.35},.35);
  A.text(346,292,'9',{size:17,c:GR});
  A.line(210,315,362,315,{c:MU,w:1.5},.3);
  A.text(286,338,'(x + 3)²',{size:22,c:GR});
  A.say("Now solve: x² + 6x = 7, add 9 to get (x + 3)² = 16.",
        "এখন সমাধান করো: x² + 6x = 7, 9 যোগ করলে (x + 3)² = 16।");
  A.text(400,385,'(x + 3)² = 16   →   x + 3 = ±4',{size:23,c:VI});
  A.say("So x = 1 or x = −7, the two values that make the original expression zero.",
        "তাই x = 1 অথবা x = −7, এই দুই মানেই মূল রাশিটি শূন্য হয়।");
  A.text(400,430,'x = 1      or      x = −7',{size:26,c:GR});
  NOTE(A,466,'half of 6 is 3, and its square 9 is the number you add.');
});

lesson('c910-224','Forming a quadratic from its roots','Roots 2 and 5 give x² − 7x + 10 = 0',A=>{
  A.say("If the roots are 2 and 5, then x = 2 or x = 5, so the factors are (x − 2) and (x − 5).",
        "মূল 2 ও 5 হলে x = 2 অথবা x = 5, তাই উৎপাদক (x − 2) ও (x − 5)।");
  A.text(400,95,'(x − 2)(x − 5) = 0',{size:26,c:AM});
  A.say("Multiply the two brackets using a two-by-two grid.",
        "দুই বন্ধনীকে ২×২ গ্রিড ব্যবহার করে গুণ করো।");
  const g=A.mat(400,210,[['x²','−5x'],['−2x','+10']],{cw:130,rh:56,size:24,col:(i,j)=>i===j?SK:PK});
  A.text(335,140,'x',{size:18,c:MU});
  A.text(465,140,'−5',{size:18,c:MU});
  A.text(250,188,'x',{size:18,c:MU,anchor:'end'});
  A.text(250,244,'−2',{size:18,c:MU,anchor:'end'});
  A.say("The four cells add to x² − 5x − 2x + 10, which simplifies to x² − 7x + 10.",
        "চারটি ঘর যোগ করলে x² − 5x − 2x + 10, যা সরল হয়ে x² − 7x + 10।");
  A.text(400,320,'x² − 7x + 10 = 0',{size:26,c:GR});
  A.say("In general, roots α and β give x² − (α + β)x + αβ = 0.",
        "সাধারণভাবে, মূল α ও β হলে x² − (α + β)x + αβ = 0।");
  A.rect(190,350,420,60,{c:VI,w:2.5,fill:VI,fo:.10},.4);
  A.text(400,390,'x² − (sum)x + (product) = 0',{size:21,c:VI});
  A.text(400,438,'sum 7, product 10  →  x² − 7x + 10',{size:19,c:INK});
  NOTE(A,466,'the coefficient of x is minus the sum of the roots.');
});

/* ─── Simultaneous equations ─── */

lesson('c910-225','Two linear equations by elimination','Add the equations to remove y',A=>{
  A.say("Solve 2x + 3y = 12 and 4x − 3y = 6. The y-terms are opposites, so add the equations.",
        "2x + 3y = 12 ও 4x − 3y = 6 সমাধান করো। y-পদ বিপরীত, তাই সমীকরণ দুইটি যোগ করো।");
  A.rect(220,90,360,48,{c:SK,w:2,fill:SK,fo:.10},.3);
  A.text(400,122,'2x + 3y = 12',{size:22,c:SK});
  A.rect(220,148,360,48,{c:PK,w:2,fill:PK,fo:.10},.3);
  A.text(400,180,'4x − 3y = 6',{size:22,c:PK});
  A.text(400,222,'+',{size:26,c:MU});
  A.say("Adding gives 6x = 18, because +3y and −3y cancel.",
        "যোগ করলে 6x = 18 পাওয়া যায়, কারণ +3y ও −3y কাটাকাটি যায়।");
  A.text(400,262,'6x = 18   →   x = 3',{size:25,c:AM});
  A.say("Put x = 3 back into the first equation: 6 + 3y = 12.",
        "x = 3 প্রথম সমীকরণে বসাও: 6 + 3y = 12।");
  A.text(400,308,'2(3) + 3y = 12   →   3y = 6',{size:22,c:VI});
  A.say("So y = 2. The two lines cross at the point (3, 2).",
        "তাই y = 2। দুই রেখা (3, 2) বিন্দুতে ছেদ করে।");
  A.arrow(140,380,700,380,{c:MU,w:2},.35);
  A.arrow(300,445,300,140,{c:MU,w:2},.3);
  A.line(327.5,178.3,602.5,361.7,{c:SK,w:3},.5);
  A.line(382.5,380,547.5,160,{c:PK,w:3},.5);
  A.circle(465,270,7,{c:AM,w:3,fill:AM,fo:1},.3);
  A.text(485,282,'(3, 2)',{size:17,c:AM,anchor:'start'});
  NOTE(A,462,'elimination is quickest when one variable has matching coefficients.');
});

lesson('c910-226','Two linear equations by substitution','Replace y with 2x + 1',A=>{
  A.say("Solve y = 2x + 1 and 3x + y = 11. The first equation already tells us y.",
        "y = 2x + 1 ও 3x + y = 11 সমাধান করো। প্রথম সমীকরণই y-এর মান বলে দেয়।");
  A.rect(250,85,300,44,{c:SK,w:2,fill:SK,fo:.12},.3);
  A.text(400,113,'y = 2x + 1',{size:21,c:SK});
  A.rect(250,145,300,44,{c:PK,w:2,fill:PK,fo:.12},.3);
  A.text(400,173,'3x + y = 11',{size:21,c:PK});
  A.arrow(400,192,400,228,{c:MU,w:2},.3);
  A.say("Substitute the whole expression 2x + 1 in place of y in the second equation.",
        "দ্বিতীয় সমীকরণে y-এর জায়গায় পুরো রাশি 2x + 1 বসাও।");
  A.rect(200,232,400,50,{c:AM,w:2.5,fill:AM,fo:.12},.35);
  A.text(400,264,'3x + (2x + 1) = 11',{size:23,c:AM});
  A.say("Collect the x-terms: 5x + 1 = 11, so 5x = 10 and x = 2.",
        "x-পদগুলো একত্র করো: 5x + 1 = 11, তাই 5x = 10 এবং x = 2।");
  A.text(400,318,'5x = 10   →   x = 2',{size:23,c:VI});
  A.say("Then y = 2(2) + 1 = 5, so the solution is (2, 5).",
        "তারপর y = 2(2) + 1 = 5, তাই সমাধান (2, 5)।");
  A.rect(280,350,240,55,{c:GR,w:2.5,fill:GR,fo:.12},.4);
  A.text(400,385,'(2, 5)',{size:26,c:GR});
  A.text(400,430,'check: 3(2) + 5 = 11 ✓',{size:19,c:INK});
  NOTE(A,466,'substitution is easiest when one equation is already solved for a variable.');
});

/* ─── Logarithms and exponents ─── */

lesson('c910-227','Laws of logarithms','Turn products, quotients and powers into simple moves',A=>{
  A.say("A product inside a logarithm becomes a sum outside: log_a(xy) = log_a x + log_a y.",
        "লগারিদমের ভিতরে গুণফল বাইরে যোগফল হয়: log_a(xy) = log_a x + log_a y।");
  A.rect(170,90,460,52,{c:SK,w:2.5,fill:SK,fo:.10},.35);
  A.text(400,125,'logₐ(xy) = logₐ x + logₐ y',{size:23,c:SK});
  A.say("A quotient becomes a difference: log_a(x/y) = log_a x − log_a y.",
        "ভাগফল বিয়োগফল হয়: log_a(x/y) = logₐ x − logₐ y।");
  A.rect(170,160,460,52,{c:PK,w:2.5,fill:PK,fo:.10},.35);
  A.text(400,195,'logₐ(x/y) = logₐ x − logₐ y',{size:23,c:PK});
  A.say("A power slides to the front: log_a(xⁿ) = n log_a x.",
        "ঘাত সামনে নেমে আসে: logₐ(xⁿ) = n logₐ x।");
  A.rect(170,230,460,52,{c:VI,w:2.5,fill:VI,fo:.10},.35);
  A.text(400,265,'logₐ(xⁿ) = n · logₐ x',{size:23,c:VI});
  A.say("Check with base 2: log₂ 8 + log₂ 16 = 3 + 4 = 7, and log₂ 128 is also 7.",
        "ভিত্তি 2 দিয়ে যাচাই: log₂ 8 + log₂ 16 = 3 + 4 = 7, আর log₂ 128-ও 7।");
  A.text(200,335,'8 × 16 = 128',{size:20,c:AM});
  A.arrow(330,330,430,330,{c:AM,w:2.5},.35);
  A.text(560,335,'3 + 4 = 7',{size:20,c:GR});
  A.line(160,370,640,370,{c:MU,w:1.5},.3);
  A.text(400,408,'log₂(8 × 16) = log₂ 128 = 7',{size:21,c:GR});
  NOTE(A,450,'the laws hold only when every logarithm is defined.');
});

lesson('c910-228','Solving a logarithmic equation','log₂ x + log₂(x − 2) = 3',A=>{
  A.say("First note the domain: x must be positive and x − 2 must be positive, so x > 2.",
        "প্রথমে ডোমেইন লক্ষ করো: x ধনাত্মক এবং x − 2 ধনাত্মক হতে হবে, তাই x > 2।");
  A.line(90,180,710,180,{c:MU,w:3},.5);
  const mx=v=>90+(v+3)*68.8;
  [-2,0,2,4].forEach(v=>{
    A.line(mx(v),170,mx(v),190,{c:MU,w:2},.2);
    A.text(mx(v),210,String(v),{size:18,c:INK});
  });
  A.circle(mx(2),180,7,{c:PK,w:3,fill:'#0b1220',fo:1},.3);
  A.line(mx(2),180,710,180,{c:GR,w:6},.4);
  A.text(620,158,'allowed: x > 2',{size:17,c:GR});
  A.say("Combine the logs into one: log₂[x(x − 2)] = 3, so x(x − 2) = 2³ = 8.",
        "লগগুলো একত্র করো: log₂[x(x − 2)] = 3, তাই x(x − 2) = 2³ = 8।");
  A.text(400,255,'x² − 2x − 8 = 0',{size:24,c:AM});
  A.say("Factor: (x − 4)(x + 2) = 0, giving x = 4 or x = −2.",
        "উৎপাদকে: (x − 4)(x + 2) = 0, ফলে x = 4 অথবা x = −2।");
  A.text(400,305,'(x − 4)(x + 2) = 0',{size:22,c:VI});
  A.circle(mx(-2),180,7,{c:RD,w:3,fill:'#0b1220',fo:1},.3);
  A.text(mx(-2),145,'reject',{size:15,c:RD});
  A.circle(mx(4),180,8,{c:GR,w:3,fill:GR,fo:1},.3);
  A.say("Only x = 4 is greater than 2, so x = 4 is the only solution.",
        "কেবল x = 4-ই 2-এর চেয়ে বড়, তাই x = 4 একমাত্র সমাধান।");
  A.text(400,365,'x = 4',{size:30,c:GR});
  A.text(400,415,'log₂ 4 + log₂ 2 = 2 + 1 = 3 ✓',{size:20,c:INK});
  NOTE(A,458,'always check a root against the domain before accepting it.');
});

lesson('c910-229','Solving an exponential equation','2^(x + 1) = 32',A=>{
  A.say("Write both sides with the same base. Here 32 is a power of 2.",
        "দুই পাশকে একই ভিত্তিতে লেখো। এখানে 32 হলো 2-এর একটি ঘাত।");
  const pw=['1','2','4','8','16','32'];
  pw.forEach((v,i)=>{
    const x=150+i*110;
    A.rect(x-42,120,84,54,{c:SK,w:2,fill:SK,fo:.12},.25);
    A.text(x,155,v,{size:22,c:SK});
    A.text(x,195,'2^'+i,{size:14,c:MU});
  });
  A.say("The last card 32 equals 2⁵, so the equation becomes 2^(x + 1) = 2⁵.",
        "শেষ কার্ড 32 = 2⁵, তাই সমীকরণ হয় 2^(x + 1) = 2⁵।");
  A.box([658,117,84,60],AM);
  A.text(400,245,'2^(x + 1) = 2⁵',{size:25,c:AM});
  A.say("Equal bases mean equal exponents: x + 1 = 5.",
        "ভিত্তি সমান হলে ঘাতও সমান: x + 1 = 5।");
  A.text(400,300,'x + 1 = 5   →   x = 4',{size:24,c:VI});
  A.say("Check: 2^(4 + 1) = 2⁵ = 32, so x = 4 is correct.",
        "যাচাই: 2^(4 + 1) = 2⁵ = 32, তাই x = 4 সঠিক।");
  A.text(400,355,'2⁵ = 32 ✓',{size:23,c:GR});
  A.text(400,405,'same base  →  same exponent',{size:21,c:INK});
  NOTE(A,450,'if the bases cannot match, take logarithms of both sides.');
});

/* ─── Geometric sequences and series ─── */

lesson('c910-230','Geometric sequence and common ratio','Multiply by 2 each time',A=>{
  A.say("In a geometric sequence each term is the previous term multiplied by a fixed number r.",
        "গুণোত্তর ধারায় প্রতিটি পদ আগের পদকে একটি নির্দিষ্ট সংখ্যা r দিয়ে গুণ করে পাওয়া যায়।");
  const terms=[3,6,12,24];
  terms.forEach((v,i)=>{
    const x=160+i*140;
    A.rect(x-40,150,80,60,{c:SK,w:2.5,fill:SK,fo:.15},.3);
    A.text(x,190,String(v),{size:25,c:SK});
  });
  A.say("Divide a term by the one before it: 6/3 = 2, 12/6 = 2, 24/12 = 2.",
        "একটি পদকে তার আগের পদ দিয়ে ভাগ করো: 6/3 = 2, 12/6 = 2, 24/12 = 2।");
  for(let i=0;i<3;i++){
    A.arrow(200+i*140,140,260+i*140,140,{c:AM,w:2},.3);
    A.text(230+i*140,125,'×2',{size:18,c:AM});
  }
  A.say("So the common ratio is r = 2. The first term is a = 3.",
        "তাই সাধারণ অনুপাত r = 2। প্রথম পদ a = 3।");
  A.rect(180,245,200,60,{c:GR,w:2.5,fill:GR,fo:.10},.35);
  A.text(280,285,'r = a₂ / a₁',{size:21,c:GR});
  A.rect(420,245,200,60,{c:AM,w:2.5,fill:AM,fo:.10},.35);
  A.text(520,285,'r = 6 / 3 = 2',{size:21,c:AM});
  A.say("The nth term is a r^(n−1), so the 5th term here is 3 × 2⁴ = 48.",
        "n-তম পদ a r^(n−1), তাই এখানে পঞ্চম পদ 3 × 2⁴ = 48।");
  A.text(400,350,'aₙ = a r^(n−1)',{size:25,c:VI});
  A.text(400,405,'a₅ = 3 × 16 = 48',{size:23,c:INK});
  NOTE(A,450,'a ratio bigger than 1 makes the terms grow; below 1 they shrink.');
});

lesson('c910-231','Sum of a geometric series','3 + 6 + 12 + 24 = 45',A=>{
  A.say("Add the first four terms of 3, 6, 12, 24. The bars show how fast they grow.",
        "3, 6, 12, 24-এর প্রথম চার পদ যোগ করো। দণ্ডগুলো দেখায় কত দ্রুত তারা বাড়ে।");
  const vals=[3,6,12,24];
  const base=380;
  vals.forEach((v,i)=>{
    const x=210+i*105;
    const h=v*7;
    A.rect(x-38,base-h,76,h,{c:[SK,GR,AM,PK][i],w:2,fill:[SK,GR,AM,PK][i],fo:.35},.35);
    A.text(x,base+25,String(v),{size:20,c:[SK,GR,AM,PK][i]});
    A.text(x,base-h-12,'term '+(i+1),{size:13,c:MU});
  });
  A.say("The formula for a finite geometric sum is Sₙ = a(rⁿ − 1)/(r − 1).",
        "সসীম গুণোত্তর ধারার যোগফলের সূত্র Sₙ = a(rⁿ − 1)/(r − 1)।");
  A.text(400,95,'Sₙ = a(rⁿ − 1)/(r − 1)      r ≠ 1',{size:24,c:AM});
  A.say("With a = 3, r = 2 and n = 4: S₄ = 3(16 − 1)/(2 − 1) = 45.",
        "a = 3, r = 2 ও n = 4 নিলে: S₄ = 3(16 − 1)/(2 − 1) = 45।");
  A.text(400,425,'S₄ = 3 × 15 / 1 = 45',{size:25,c:GR});
  A.say("Check by adding directly: 3 + 6 + 12 + 24 = 45.",
        "সরাসরি যোগ করে যাচাই: 3 + 6 + 12 + 24 = 45।");
  A.text(400,444,'3 + 6 + 12 + 24 = 45 ✓',{size:19,c:INK});
  NOTE(A,466,'for r = 1 the sum is simply n × a.');
});

lesson('c910-232','Infinite geometric series','1 + 1/2 + 1/4 + … = 2',A=>{
  A.say("When the ratio is between −1 and 1, the terms shrink and the total settles down.",
        "অনুপাত −1 ও 1-এর মধ্যে থাকলে পদগুলো ছোট হয় এবং যোগফল একটি নির্দিষ্ট মানে থামে।");
  A.line(120,200,680,200,{c:MU,w:3},.5);
  const px=v=>120+v*280;
  [0,1,1.5,1.75,2].forEach((v,i)=>{
    A.line(px(v),190,px(v),210,{c:MU,w:2},.2);
    A.text(px(v),235,String(v),{size:16,c:INK});
  });
  A.say("Build the sum on the line: 1, then half, then a quarter of the remaining gap.",
        "রেখার উপর যোগফল গড়ো: 1, তারপর অর্ধেক, তারপর বাকি ফাঁকের এক-চতুর্থাংশ।");
  const seg=[[0,1,SK],[1,1.5,GR],[1.5,1.75,AM],[1.75,1.875,PK]];
  seg.forEach((s,i)=>{
    A.line(px(s[0]),200,px(s[1]),200,{c:s[2],w:7},.4);
    A.text((px(s[0])+px(s[1]))/2,175,String(['1','½','¼','⅛'][i]),{size:15,c:s[2]});
  });
  A.say("Each step closes half the remaining distance to 2, so the sum approaches 2.",
        "প্রতিটি ধাপ 2-এর দিকে বাকি দূরত্বের অর্ধেক কমায়, তাই যোগফল 2-এর দিকে এগোয়।");
  A.circle(px(2),200,7,{c:RD,w:3,fill:RD,fo:1},.3);
  A.say("The formula is S = a/(1 − r), here 1/(1 − ½) = 2.",
        "সূত্র S = a/(1 − r), এখানে 1/(1 − ½) = 2।");
  A.rect(200,280,400,70,{c:VI,w:2.5,fill:VI,fo:.10},.4);
  A.text(400,326,'S∞ = a / (1 − r),  |r| < 1',{size:24,c:VI});
  A.text(400,395,'1 + ½ + ¼ + ⅛ + … = 2',{size:23,c:GR});
  NOTE(A,450,'if |r| is 1 or more, the infinite sum does not settle.');
});

/* ─── Binomial expansion ─── */

lesson('c910-233','Binomial expansion of (a + b)ⁿ','(a + b)³ = a³ + 3a²b + 3ab² + b³',A=>{
  A.say("Expand (a + b)³ by multiplying three brackets. The coefficients follow a pattern.",
        "তিনটি বন্ধনী গুণ করে (a + b)³ বিস্তার করো। সহগগুলো একটি নিয়ম অনুসরণ করে।");
  const row=[1,3,3,1];
  row.forEach((v,i)=>{
    const x=180+i*146;
    A.rect(x-40,95,80,52,{c:AM,w:2,fill:AM,fo:.15},.3);
    A.text(x,130,String(v),{size:24,c:AM});
  });
  A.say("The coefficients 1, 3, 3, 1 are the third row of Pascal's triangle.",
        "সহগ 1, 3, 3, 1 হলো প্যাসকেলের ত্রিভুজের তৃতীয় সারি।");
  A.text(400,185,'coefficients: 1   3   3   1',{size:19,c:MU});
  A.say("Powers of a fall from 3 to 0 while powers of b rise from 0 to 3.",
        "a-এর ঘাত 3 থেকে 0-তে নামে আর b-এর ঘাত 0 থেকে 3-তে ওঠে।");
  A.text(400,235,'a³   +   3a²b   +   3ab²   +   b³',{size:24,c:SK});
  A.say("So (a + b)³ = a³ + 3a²b + 3ab² + b³. For (x + 2)³ the terms become numbers.",
        "তাই (a + b)³ = a³ + 3a²b + 3ab² + b³। (x + 2)³-এ পদগুলো সংখ্যায় পরিণত হয়।");
  A.text(400,295,'(x + 2)³ = x³ + 6x² + 12x + 8',{size:23,c:GR});
  A.say("The same row works for any power n, using nCr for each coefficient.",
        "একই সারি যেকোনো ঘাত n-এর জন্য কাজ করে, প্রতিটি সহগে nCr ব্যবহার করে।");
  A.text(400,355,'coefficient of a^(n−r)b^r = nCr',{size:20,c:VI});
  A.text(400,405,'(a + b)ⁿ = Σ nCr · a^(n−r) · b^r',{size:20,c:INK});
  NOTE(A,452,'each expansion has n + 1 terms and is symmetric.');
});

lesson('c910-234','Pascal\'s triangle row sums','Row n adds to 2ⁿ',A=>{
  A.say("Pascal's triangle starts with 1, and each number is the sum of the two above it.",
        "প্যাসকেলের ত্রিভুজ 1 দিয়ে শুরু, আর প্রতিটি সংখ্যা তার উপরের দুই সংখ্যার যোগফল।");
  const rows=[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]];
  const cy=110;
  rows.forEach((r,i)=>{
    r.forEach((v,j)=>{
      const x=300+(j-(r.length-1)/2)*58;
      const y=cy+i*50;
      A.text(x,y,String(v),{size:20,c:SK});
    });
    const sum=r.reduce((p,c)=>p+c,0);
    A.line(470,cy+i*50-14,500,cy+i*50-14,{c:MU,w:1},.2);
    A.text(585,cy+i*50,'= '+sum,{size:19,c:AM});
  });
  A.text(585,cy-20,'row sum',{size:15,c:MU});
  A.say("Row 0 sums to 1, row 1 to 2, row 2 to 4, row 3 to 8, row 4 to 16.",
        "শূন্য সারির যোগফল 1, প্রথম 2, দ্বিতীয় 4, তৃতীয় 8, চতুর্থ 16।");
  A.say("The row sums double every time, so row n sums to 2ⁿ.",
        "সারির যোগফল প্রতিবার দ্বিগুণ হয়, তাই n-তম সারির যোগফল 2ⁿ।");
  A.text(400,380,'1 + 1 + 1 + …  (row n)  =  2ⁿ',{size:22,c:VI});
  A.say("That is why a set of n items has 2ⁿ subsets, one choice per number.",
        "এজন্যই n সংখ্যার সেটের 2ⁿ উপসেট থাকে, প্রতিটি সংখ্যার জন্য একটি করে বাছাই।");
  A.rect(230,405,340,50,{c:GR,w:2.5,fill:GR,fo:.10},.4);
  A.text(400,438,'row 4:  1 + 4 + 6 + 4 + 1 = 16 = 2⁴',{size:19,c:GR});
  NOTE(A,466,'Pascal rows count combinations as well as subsets.');
});

lesson('c910-235','General term of a binomial expansion','T_(r+1) = nCr · a^(n−r) · b^r',A=>{
  A.say("In (a + b)ⁿ the term with b^r has coefficient nCr and power a^(n−r).",
        "(a + b)ⁿ-এ b^r বিশিষ্ট পদের সহগ nCr এবং a-এর ঘাত a^(n−r)।");
  A.rect(140,85,520,62,{c:AM,w:2.5,fill:AM,fo:.10},.4);
  A.text(400,125,'T_(r + 1) = nCr · a^(n−r) · b^r',{size:24,c:AM});
  A.say("Take (x + 2)⁵. The coefficients are row 5 of Pascal's triangle.",
        "(x + 2)⁵ নাও। সহগগুলো প্যাসকেলের ত্রিভুজের পঞ্চম সারি।");
  const co=[1,5,10,10,5,1];
  co.forEach((v,i)=>{
    const x=150+i*90;
    A.rect(x-32,180,64,48,{c:SK,w:2,fill:SK,fo:.12},.25);
    A.text(x,211,String(v),{size:20,c:SK});
    A.text(x,255,'r='+i,{size:13,c:MU});
  });
  A.say("For the term with x³ we need r = 2, which uses the coefficient 10.",
        "x³ বিশিষ্ট পদের জন্য দরকার r = 2, যার সহগ 10।");
  A.box([150+2*90-32,177,64,54],GR);
  A.text(400,310,'r = 2:  T₃ = ₁₀C₂ · x³ · 2²',{size:22,c:GR});
  A.say("Since 5C2 = 10 and 2² = 4, that term is 40x³.",
        "যেহেতু 5C2 = 10 এবং 2² = 4, সেই পদটি 40x³।");
  A.text(400,360,'T₃ = 10 × 4 × x³ = 40x³',{size:24,c:VI});
  A.say("The exponent of b tells you which entry of the row to pick.",
        "b-এর ঘাতই বলে দেয় সারির কোন সংখ্যাটি নিতে হবে।");
  A.text(400,410,'b^r  →  r counts from 0',{size:19,c:INK});
  NOTE(A,455,'the term number is r + 1, not r.');
});

/* ─── Trigonometric graphs and the unit circle ─── */

lesson('c910-236','Sine and cosine graphs','y = sin x and y = cos x from 0° to 360°',A=>{
  A.say("Plot the height of a point on the unit circle as the angle turns from 0° to 360°.",
        "কোণ 0° থেকে 360° ঘোরার সময় একক বৃত্তের বিন্দুর উচ্চতা লেখচিত্রে বসাও।");
  A.arrow(90,280,720,280,{c:MU,w:2},.4);
  A.arrow(110,380,110,150,{c:MU,w:2},.4);
  A.text(725,286,'x',{size:16,c:MU,anchor:'start'});
  const sx=d=>110+d*600/360;
  [0,90,180,270,360].forEach(d=>A.text(sx(d),305,d+'°',{size:15,c:MU}));
  A.say("The sine curve starts at 0, rises to 1 at 90°, and returns to 0 at 180°.",
        "সাইন রেখা 0 থেকে শুরু, 90°-তে 1-এ ওঠে, আর 180°-তে আবার 0 হয়।");
  const sp=[],cp=[];
  for(let d=0;d<=360;d+=6){
    sp.push([sx(d),280-Math.sin(d*Math.PI/180)*80]);
    cp.push([sx(d),280-Math.cos(d*Math.PI/180)*80]);
  }
  A.pts(sp,{c:SK,w:3.5},1);
  A.say("The cosine curve starts at 1 and falls to 0 at 90°, then to −1 at 180°.",
        "কোসাইন রেখা 1 থেকে শুরু, 90°-তে 0-তে নামে, তারপর 180°-তে −1 হয়।");
  A.pts(cp,{c:PK,w:3.5},1);
  A.say("Both wave between −1 and 1 and repeat every 360°.",
        "দুটি তরঙ্গই −1 ও 1-এর মধ্যে দোলে এবং প্রতি 360°-এ পুনরাবৃত্ত হয়।");
  A.line(150,175,190,175,{c:SK,w:3},.25);
  A.text(200,181,'sin x',{size:16,c:SK,anchor:'start'});
  A.line(300,175,340,175,{c:PK,w:3},.25);
  A.text(350,181,'cos x',{size:16,c:PK,anchor:'start'});
  NOTE(A,445,'cos x is just sin x shifted 90° to the left.');
});

lesson('c910-237','Amplitude and period','y = 3 sin 2x',A=>{
  A.say("Amplitude is how far the wave rises from the middle; period is the length of one full wave.",
        "বিস্তার হলো তরঙ্গ মধ্যরেখা থেকে কত উপরে ওঠে; পর্যায় হলো একটি পূর্ণ তরঙ্গের দৈর্ঘ্য।");
  A.arrow(90,270,720,270,{c:MU,w:2},.4);
  A.arrow(110,370,110,140,{c:MU,w:2},.4);
  const sx=d=>110+d*600/360;
  A.say("For y = A sin Bx the amplitude is |A| and the period is 360°/B.",
        "y = A sin Bx-এর জন্য বিস্তার |A| এবং পর্যায় 360°/B।");
  const p1=[],p2=[];
  for(let d=0;d<=360;d+=4){
    p1.push([sx(d),270-Math.sin(d*Math.PI/180)*(100/3)]);
    p2.push([sx(d),270-Math.sin(2*d*Math.PI/180)*100]);
  }
  A.pts(p1,{c:MU,w:2},.7);
  A.say("Here A = 3 and B = 2, so the amplitude is 3 and the period is 180°.",
        "এখানে A = 3 ও B = 2, তাই বিস্তার 3 এবং পর্যায় 180°।");
  A.pts(p2,{c:GR,w:3.5},1);
  A.arrow(sx(45),270,sx(45),170,{c:AM,w:2},.35);
  A.text(sx(45)+60,220,'amplitude 3',{size:16,c:AM});
  A.line(sx(0),300,sx(180),300,{c:PK,w:3},.4);
  A.text(sx(90),322,'period 180°',{size:17,c:PK});
  A.say("The thin grey curve is y = sin x for comparison.",
        "পাতলা ধূসর রেখাটি তুলনার জন্য y = sin x।");
  A.text(400,385,'y = 3 sin 2x:  amplitude 3,  period 180°',{size:20,c:GR});
  NOTE(A,450,'the period shrinks as B grows, because the wave cycles faster.');
});

lesson('c910-238','Unit circle and CAST rule','Which ratios are positive in each quadrant',A=>{
  A.say("On the unit circle a point at angle θ is (cos θ, sin θ), and tan θ = sin θ / cos θ.",
        "একক বৃত্তে θ কোণে থাকা বিন্দু (cos θ, sin θ), এবং tan θ = sin θ / cos θ।");
  A.circle(400,250,140,{c:MU,w:2,fill:SK,fo:.04},.8);
  A.arrow(220,250,580,250,{c:MU,w:2},.4);
  A.arrow(400,410,400,90,{c:MU,w:2},.4);
  A.say("In quadrant I both coordinates are positive, so all three ratios are positive.",
        "প্রথম চতুর্ভাগে দুই স্থানাঙ্কই ধনাত্মক, তাই তিনটি অনুপাতই ধনাত্মক।");
  A.text(500,170,'I  All +',{size:20,c:GR});
  A.say("In quadrant II x is negative, so only sine is positive.",
        "দ্বিতীয় চতুর্ভাগে x ঋণাত্মক, তাই কেবল সাইন ধনাত্মক।");
  A.text(300,170,'II  sin +',{size:20,c:SK});
  A.say("In quadrant III both are negative, so tan is positive, and in IV only cos is positive.",
        "তৃতীয় চতুর্ভাগে দুটোই ঋণাত্মক, তাই tan ধনাত্মক; চতুর্থে কেবল cos ধনাত্মক।");
  A.text(300,345,'III  tan +',{size:20,c:AM});
  A.text(500,345,'IV  cos +',{size:20,c:PK});
  A.line(400,250,506,151,{c:RD,w:2.5},.4);
  A.circle(506,151,6,{c:RD,w:3,fill:RD,fo:1},.25);
  A.text(520,142,'θ',{size:17,c:RD,anchor:'start'});
  A.say("Remember CAST: cos, all, sin, tan in the four quadrants going anticlockwise.",
        "মনে রাখো CAST: ঘড়ির বিপরীতে চার চতুর্ভাগে cos, all, sin, tan।");
  A.text(400,395,'C  A  S  T',{size:22,c:VI});
  NOTE(A,445,'the signs come from the signs of x and y alone.');
});

lesson('c910-239','Reference angles','sin 150° = sin 30° = ½',A=>{
  A.say("A reference angle is the acute angle between the radius and the x-axis.",
        "প্রসঙ্গ কোণ হলো ব্যাসার্ধ ও x-অক্ষের মধ্যবর্তী সূক্ষ্ম কোণ।");
  A.circle(400,250,150,{c:MU,w:2,fill:SK,fo:.04},.8);
  A.arrow(210,250,590,250,{c:MU,w:2},.4);
  A.arrow(400,420,400,80,{c:MU,w:2},.4);
  const p150=[400+150*Math.cos(5*Math.PI/6),250-150*Math.sin(5*Math.PI/6)];
  const p30=[400+150*Math.cos(Math.PI/6),250-150*Math.sin(Math.PI/6)];
  A.say("The point at 150° has the same height as the point at 30°, because 180° − 150° = 30°.",
        "150°-এর বিন্দুর উচ্চতা 30°-এর বিন্দুর সমান, কারণ 180° − 150° = 30°।");
  A.line(400,250,p150[0],p150[1],{c:RD,w:2.5},.4);
  A.line(400,250,p30[0],p30[1],{c:SK,w:2.5},.4);
  A.circle(p150[0],p150[1],6,{c:RD,w:3,fill:RD,fo:1},.25);
  A.circle(p30[0],p30[1],6,{c:SK,w:3,fill:SK,fo:1},.25);
  A.text(p150[0]-12,p150[1]-12,'150°',{size:15,c:RD,anchor:'end'});
  A.text(p30[0]+14,p30[1]-12,'30°',{size:15,c:SK,anchor:'start'});
  A.say("Both heights are half the radius, so sin 150° = sin 30° = 1/2.",
        "দুই উচ্চতাই ব্যাসার্ধের অর্ধেক, তাই sin 150° = sin 30° = ১/২।");
  A.dashed(p150[0],p150[1],p150[0],250,{c:RD,w:1.5},.3);
  A.dashed(p30[0],p30[1],p30[0],250,{c:SK,w:1.5},.3);
  A.text(400,315,'height = 75 = 150 × ½',{size:17,c:MU});
  A.say("The sign depends on the quadrant, but the size comes from the reference angle.",
        "চিহ্ন চতুর্ভাগের উপর নির্ভর করে, কিন্তু মান আসে প্রসঙ্গ কোণ থেকে।");
  A.text(400,375,'sin 150° = + sin 30° = 0.5',{size:22,c:GR});
  NOTE(A,448,'reduce every angle to its acute reference angle, then fix the sign.');
});

lesson('c910-240','Sine and cosine of 90° and 180°','Special angles on the unit circle',A=>{
  A.say("At 0° the point is (1, 0), so cos 0° = 1 and sin 0° = 0.",
        "0°-তে বিন্দু (1, 0), তাই cos 0° = 1 এবং sin 0° = 0।");
  const g=A.mat(400,190,[['θ','0°','90°','180°','270°'],['sin θ','0','1','0','−1'],['cos θ','1','0','−1','0']],{cw:100,rh:46,size:19,col:(i,j)=>j===0?AM:INK});
  A.say("At 90° the point is (0, 1), so cos 90° = 0 and sin 90° = 1.",
        "90°-তে বিন্দু (0, 1), তাই cos 90° = 0 এবং sin 90° = 1।");
  A.box(g.cell(1,2),GR);
  A.box(g.cell(2,2),GR);
  A.say("At 180° the point is (−1, 0), so cos 180° = −1 and sin 180° = 0.",
        "180°-তে বিন্দু (−1, 0), তাই cos 180° = −1 এবং sin 180° = 0।");
  A.box(g.cell(1,3),PK);
  A.box(g.cell(2,3),PK);
  A.say("These four points are the compass points of the unit circle.",
        "এই চারটি বিন্দুই একক বৃত্তের চার দিকের বিন্দু।");
  A.circle(620,380,58,{c:MU,w:2,fill:SK,fo:.04},.6);
  A.arrow(550,380,690,380,{c:MU,w:1.5},.3);
  A.arrow(620,448,620,312,{c:MU,w:1.5},.3);
  [[678,380],[620,322],[562,380],[620,438]].forEach(p=>A.circle(p[0],p[1],4,{c:AM,w:2,fill:AM,fo:1},.2));
  A.text(400,395,'sin 90° = 1,  cos 180° = −1',{size:19,c:VI});
  NOTE(A,450,'use the coordinates of the unit circle, not memory, for these values.');
});

/* ─── Height and distance ─── */

lesson('c910-241','Height and distance with one angle','A 30° elevation and a 30 m base',A=>{
  A.say("A tower stands on level ground. From 30 m away the top is seen at 30° above the horizontal.",
        "সমতল ভূমিতে একটি টাওয়ার। 30 মিটার দূর থেকে তার শীর্ষ 30° উন্নতি কোণে দেখা যায়।");
  A.line(130,390,640,390,{c:MU,w:3},.5);
  A.line(560,390,560,182,{c:SK,w:4},.5);
  A.line(200,390,560,182,{c:AM,w:3},.5);
  A.rect(546,376,14,14,{c:MU,w:1.3},.25);
  A.text(570,285,'h',{size:20,c:SK,anchor:'start'});
  A.text(380,415,'30 m',{size:19,c:GR});
  A.text(240,362,'30°',{size:16,c:AM});
  A.say("The triangle is right-angled, with the height h opposite the 30° angle.",
        "ত্রিভুজটি সমকোণী, যেখানে 30° কোণের বিপরীতে উচ্চতা h।");
  A.say("So tan 30° = h / 30, which gives h = 30 tan 30°.",
        "তাই tan 30° = h / 30, যা থেকে h = 30 tan 30°।");
  A.text(400,105,'tan 30° = h / 30',{size:24,c:AM});
  A.say("tan 30° = 1/√3 ≈ 0.577, so h ≈ 30 × 0.577 ≈ 17.3 m.",
        "tan 30° = 1/√3 ≈ 0.577, তাই h ≈ 30 × 0.577 ≈ 17.3 মিটার।");
  A.text(400,442,'h = 30 / √3 ≈ 17.3 m',{size:22,c:GR});
  NOTE(A,466,'keep the angle and the opposite side in the same ratio.');
});

lesson('c910-242','Height and distance with two angles','30° and 60° from two points 20 m apart',A=>{
  A.say("From point A the elevation is 30°; from point B, 20 m nearer, it is 60°.",
        "A বিন্দু থেকে উন্নতি কোণ 30°; 20 মিটার কাছে B বিন্দু থেকে কোণ 60°।");
  A.line(150,400,650,400,{c:MU,w:3},.5);
  A.line(560,400,560,192,{c:SK,w:4},.5);
  A.line(200,400,560,192,{c:AM,w:3},.5);
  A.line(440,400,560,192,{c:PK,w:3},.5);
  A.rect(546,386,14,14,{c:MU,w:1.3},.25);
  A.circle(200,400,5,{c:AM,w:2,fill:AM,fo:1},.2);
  A.circle(440,400,5,{c:PK,w:2,fill:PK,fo:1},.2);
  A.text(190,430,'A',{size:18,c:AM});
  A.text(440,430,'B',{size:18,c:PK});
  A.text(250,378,'30°',{size:15,c:AM});
  A.text(462,378,'60°',{size:15,c:PK});
  A.text(320,425,'20 m',{size:18,c:GR});
  A.text(572,290,'h',{size:19,c:SK,anchor:'start'});
  A.say("Let the height be h and let B be d metres from the foot of the tower.",
        "ধরি উচ্চতা h এবং B টাওয়ারের পাদদেশ থেকে d মিটার দূরে।");
  A.text(400,90,'tan 60° = h/d        tan 30° = h/(d + 20)',{size:19,c:AM});
  A.say("Eliminate h: d tan 60° = (d + 20) tan 30°.",
        "h বাদ দাও: d tan 60° = (d + 20) tan 30°।");
  A.text(400,140,'d√3 = (d + 20)/√3   →   3d = d + 20',{size:20,c:VI});
  A.say("So d = 10 m, and h = 10 tan 60° = 10√3 ≈ 17.3 m.",
        "তাই d = 10 মিটার, এবং h = 10 tan 60° = 10√3 ≈ 17.3 মিটার।");
  A.text(400,450,'d = 10,   h = 10√3 ≈ 17.3 m',{size:20,c:GR});
  NOTE(A,468,'two angles give two equations, so both d and h can be found.');
});

/* ─── Coordinate geometry: lines and circles ─── */

lesson('c910-243','Equation of a line in gradient form','y − y₁ = m(x − x₁)',A=>{
  A.say("A line through (2, 3) with slope 2 can be written with the point-gradient form.",
        "ঢাল 2 এবং (2, 3) বিন্দু দিয়ে যাওয়া রেখা বিন্দু-ঢাল রূপে লেখা যায়।");
  A.rect(160,85,480,58,{c:AM,w:2.5,fill:AM,fo:.10},.4);
  A.text(400,122,'y − y₁ = m(x − x₁)',{size:25,c:AM});
  A.say("Put in x₁ = 2, y₁ = 3 and m = 2: y − 3 = 2(x − 2).",
        "x₁ = 2, y₁ = 3 ও m = 2 বসাও: y − 3 = 2(x − 2)।");
  A.text(400,180,'y − 3 = 2(x − 2)',{size:23,c:SK});
  A.arrow(120,360,700,360,{c:MU,w:2},.4);
  A.arrow(250,420,250,110,{c:MU,w:2},.4);
  A.line(225,460,400,110,{c:GR,w:3},.6);
  A.say("Expanding gives y = 2x − 1, which is the gradient-intercept form.",
        "বিস্তার করলে y = 2x − 1, যা ঢাল-অন্তর্ধন রূপ।");
  A.text(400,215,'y = 2x − 1',{size:23,c:GR});
  A.circle(350,210,7,{c:PK,w:3,fill:PK,fo:1},.3);
  A.text(365,200,'(2, 3)',{size:16,c:PK,anchor:'start'});
  A.say("The line crosses the y-axis at −1 and rises 2 for every 1 step right.",
        "রেখাটি y-অক্ষকে −1-এ ছেদ করে এবং প্রতি 1 ধাপ ডানে 2 ওঠে।");
  A.circle(250,410,6,{c:SK,w:3,fill:SK,fo:1},.25);
  A.text(265,425,'(0, −1)',{size:15,c:SK,anchor:'start'});
  A.text(400,445,'slope 2, intercept −1',{size:18,c:MU});
  NOTE(A,466,'point-gradient form is the fastest way from a point and a slope.');
});

lesson('c910-244','Angle between two straight lines','tan θ = |(m₂ − m₁)/(1 + m₁m₂)|',A=>{
  A.say("Two lines with slopes m₁ and m₂ cross at an angle θ given by a tangent formula.",
        "ঢাল m₁ ও m₂ বিশিষ্ট দুই রেখা যে কোণ θ-এ মেলে, তা একটি ট্যানজেন্ট সূত্রে পাওয়া যায়।");
  A.rect(150,85,500,60,{c:AM,w:2.5,fill:AM,fo:.10},.4);
  A.text(400,124,'tan θ = |(m₂ − m₁) / (1 + m₁m₂)|',{size:23,c:AM});
  A.arrow(130,300,710,300,{c:MU,w:2},.4);
  A.arrow(400,390,400,180,{c:MU,w:2},.4);
  A.line(316,384,484,216,{c:SK,w:3},.5);
  A.line(347.5,457.5,452.5,142.5,{c:PK,w:3},.5);
  A.say("Here m₁ = 1 and m₂ = 3, so the numerators and denominators are easy.",
        "এখানে m₁ = 1 ও m₂ = 3, তাই লব ও হর সহজ।");
  A.say("Then tan θ = |(3 − 1)/(1 + 3)| = 2/4 = 0.5.",
        "তাহলে tan θ = |(3 − 1)/(1 + 3)| = 2/4 = 0.5।");
  const arc=[];
  for(let k=0;k<=20;k++){
    const a=(45+26.565*k/20)*Math.PI/180;
    arc.push([400+70*Math.cos(a),300-70*Math.sin(a)]);
  }
  A.pts(arc,{c:GR,w:3},.5);
  A.text(485,230,'θ',{size:18,c:GR});
  A.say("So θ = tan⁻¹(0.5) ≈ 26.6°, the acute angle between the lines.",
        "তাই θ = tan⁻¹(0.5) ≈ 26.6°, রেখা দুইটির মধ্যবর্তী সূক্ষ্ম কোণ।");
  A.text(400,430,'θ = tan⁻¹(0.5) ≈ 26.6°',{size:22,c:GR});
  NOTE(A,462,'take the absolute value to get the acute angle.');
});

lesson('c910-245','Perpendicular distance from a point to a line','Distance from P(3, 4) to 3x + 4y − 10 = 0',A=>{
  A.say("The perpendicular distance from (x₀, y₀) to ax + by + c = 0 has a neat formula.",
        "(x₀, y₀) থেকে ax + by + c = 0 রেখার লম্ব দূরত্বের একটি সহজ সূত্র আছে।");
  A.rect(110,80,580,60,{c:AM,w:2.5,fill:AM,fo:.10},.4);
  A.text(400,120,'d = |a x₀ + b y₀ + c| / √(a² + b²)',{size:22,c:AM});
  A.arrow(120,380,700,380,{c:MU,w:2},.4);
  A.arrow(200,430,200,95,{c:MU,w:2},.4);
  A.line(200,268,425,436,{c:SK,w:3},.5);
  A.circle(335,200,7,{c:PK,w:3,fill:PK,fo:1},.3);
  A.text(350,192,'P(3, 4)',{size:17,c:PK,anchor:'start'});
  A.say("Take the line 3x + 4y − 10 = 0 and the point P(3, 4).",
        "রেখা 3x + 4y − 10 = 0 এবং বিন্দু P(3, 4) নাও।");
  A.circle(254,308,6,{c:GR,w:3,fill:GR,fo:1},.25);
  A.text(240,328,'foot',{size:15,c:GR,anchor:'end'});
  A.dashed(335,200,254,308,{c:AM,w:2},.5);
  A.text(260,235,'d',{size:19,c:AM});
  A.say("Substitute: |3(3) + 4(4) − 10| = |9 + 16 − 10| = 15.",
        "মান বসাও: |3(3) + 4(4) − 10| = |9 + 16 − 10| = 15।");
  A.text(400,340,'|9 + 16 − 10| = 15',{size:21,c:VI});
  A.say("The denominator is √(9 + 16) = 5, so the distance is 15/5 = 3.",
        "হর হলো √(9 + 16) = 5, তাই দূরত্ব 15/5 = 3।");
  A.text(400,415,'d = 15 / 5 = 3',{size:24,c:GR});
  A.text(400,445,'perpendicular foot F(1.2, 1.6)',{size:16,c:MU});
  NOTE(A,466,'drop a perpendicular, then measure along it.');
});

lesson('c910-246','Tangent to a circle at a point','At P(3, 4) on x² + y² = 25',A=>{
  A.say("A tangent touches the circle at one point and is perpendicular to the radius there.",
        "স্পর্শক বৃত্তকে এক বিন্দুতে স্পর্শ করে এবং সেখানে ব্যাসার্ধের উপর লম্ব।");
  A.circle(400,250,130,{c:MU,w:2,fill:SK,fo:.04},.8);
  A.arrow(200,250,600,250,{c:MU,w:1.5},.4);
  A.arrow(400,410,400,100,{c:MU,w:1.5},.4);
  const P=[478,146];
  A.say("On x² + y² = 25 the point P(3, 4) gives radius OP with slope 4/3.",
        "x² + y² = 25-এ বিন্দু P(3, 4)-এর ব্যাসার্ধ OP-এর ঢাল 4/3।");
  A.line(400,250,P[0],P[1],{c:AM,w:3},.5);
  A.circle(P[0],P[1],7,{c:PK,w:3,fill:PK,fo:1},.3);
  A.text(P[0]+12,P[1]-10,'P(3, 4)',{size:17,c:PK,anchor:'start'});
  A.text(430,190,'r',{size:18,c:AM});
  A.say("A perpendicular slope is −3/4, so the tangent equation through P is 3x + 4y = 25.",
        "লম্ব ঢাল −3/4, তাই P দিয়ে স্পর্শকের সমীকরণ 3x + 4y = 25।");
  A.line(382,74,574,218,{c:GR,w:3},.5);
  A.rect(468,156,12,12,{c:MU,w:1.2},.25);
  A.text(590,225,'tangent',{size:16,c:GR,anchor:'end'});
  A.say("Check P: 3(3) + 4(4) = 9 + 16 = 25, so the point lies on the tangent.",
        "P যাচাই: 3(3) + 4(4) = 9 + 16 = 25, তাই বিন্দুটি স্পর্শকের উপর আছে।");
  A.text(400,365,'3x + 4y = 25',{size:25,c:GR});
  A.say("For centre (0, 0) and radius r at point (x₁, y₁), the tangent is x x₁ + y y₁ = r².",
        "কেন্দ্র (0, 0), ব্যাসার্ধ r এবং বিন্দু (x₁, y₁) হলে স্পর্শক x x₁ + y y₁ = r²।");
  A.text(400,415,'x x₁ + y y₁ = r²',{size:21,c:VI});
  NOTE(A,458,'the radius and tangent always meet at 90°.');
});

lesson('c910-247','Line meeting a circle','y = x + 1 cuts x² + y² = 25 at two points',A=>{
  A.say("Substitute the line into the circle to find where they meet.",
        "কোথায় মেলে তা বের করতে রেখাটিকে বৃত্তে বসাও।");
  A.arrow(120,250,680,250,{c:MU,w:1.5},.4);
  A.arrow(400,420,400,90,{c:MU,w:1.5},.4);
  A.circle(400,250,130,{c:MU,w:2,fill:SK,fo:.04},.8);
  A.say("Put y = x + 1 into x² + y² = 25: x² + (x + 1)² = 25.",
        "x² + y² = 25-এ y = x + 1 বসাও: x² + (x + 1)² = 25।");
  A.line(244,380,530,94,{c:PK,w:3},.6);
  A.text(400,105,'x² + (x + 1)² = 25',{size:22,c:AM});
  A.say("This simplifies to 2x² + 2x − 24 = 0, then x² + x − 12 = 0.",
        "এটি সরল হয়ে 2x² + 2x − 24 = 0, তারপর x² + x − 12 = 0।");
  A.text(400,145,'x² + x − 12 = 0',{size:22,c:VI});
  A.say("Factor: (x − 3)(x + 4) = 0, so x = 3 or x = −4.",
        "উৎপাদকে: (x − 3)(x + 4) = 0, তাই x = 3 অথবা x = −4।");
  A.text(400,185,'(x − 3)(x + 4) = 0',{size:20,c:GR});
  A.circle(478,146,7,{c:GR,w:3,fill:GR,fo:1},.3);
  A.circle(296,328,7,{c:GR,w:3,fill:GR,fo:1},.3);
  A.text(492,140,'(3, 4)',{size:16,c:GR,anchor:'start'});
  A.text(282,350,'(−4, −3)',{size:16,c:GR,anchor:'end'});
  A.say("So the line cuts the circle at (3, 4) and (−4, −3).",
        "তাই রেখাটি বৃত্তকে (3, 4) ও (−4, −3) বিন্দুতে ছেদ করে।");
  A.text(400,430,'intersection points: (3, 4), (−4, −3)',{size:19,c:INK});
  NOTE(A,462,'a quadratic with two roots means the line is a secant.');
});

lesson('c910-248','Two circles: touching or crossing','Compare d with r₁ + r₂ and |r₁ − r₂|',A=>{
  A.say("Two circles are placed by the distance d between their centres.",
        "দুই বৃত্তের অবস্থান নির্ভর করে তাদের কেন্দ্রের দূরত্ব d-এর উপর।");
  const r1=40,r2=24;
  const panel=(cx,d,label,color)=>{
    A.circle(cx-d/2,230,r1,{c:SK,w:2.5,fill:SK,fo:.06},.5);
    A.circle(cx+d/2,230,r2,{c:PK,w:2.5,fill:PK,fo:.08},.5);
    A.circle(cx-d/2,230,4,{c:SK,w:2,fill:SK,fo:1},.2);
    A.circle(cx+d/2,230,4,{c:PK,w:2,fill:PK,fo:1},.2);
    A.text(cx,320,label,{size:16,c:color});
    A.text(cx,345,'d = '+d,{size:16,c:MU});
  };
  panel(170,80,'separate',AM);
  A.say("When d is greater than r₁ + r₂ = 64, the circles stay apart.",
        "d যদি r₁ + r₂ = 64-এর চেয়ে বড় হয়, বৃত্ত দুটি আলাদা থাকে।");
  panel(400,64,'touching',GR);
  A.say("When d equals r₁ + r₂, they touch at exactly one outside point.",
        "d যদি r₁ + r₂-এর সমান হয়, তারা ঠিক একটি বাইরের বিন্দুতে স্পর্শ করে।");
  panel(630,46,'crossing',VI);
  A.say("When |r₁ − r₂| < d < r₁ + r₂, the circles cross at two points.",
        "|r₁ − r₂| < d < r₁ + r₂ হলে বৃত্ত দুটি দুই বিন্দুতে ছেদ করে।");
  A.text(400,380,'|r₁ − r₂| < d < r₁ + r₂  →  two points',{size:19,c:VI});
  A.say("Here |r₁ − r₂| = 16, so crossing needs d between 16 and 64.",
        "এখানে |r₁ − r₂| = 16, তাই ছেদের জন্য d-কে 16 ও 64-এর মধ্যে হতে হবে।");
  A.text(400,425,'touching:  d = r₁ + r₂',{size:19,c:GR});
  NOTE(A,462,'compare d with the sum and the difference of the radii.');
});
