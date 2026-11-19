/* ─── Real numbers: decimals and surds ─── */

lesson('c910-249','Terminating and recurring decimals','The remainder stops at 0 or repeats a block',A=>{
  A.say("Divide the numerator by the denominator and watch the remainder.",
        "লবকে হর দিয়ে ভাগ করো এবং ভাগশেষের দিকে খেয়াল রাখো।");
  A.text(190,100,'7 ÷ 20',{size:26,c:SK});
  A.text(570,100,'5 ÷ 6',{size:26,c:PK});
  A.text(105,160,'70 ÷ 20 = 3 rem 10',{size:18,c:INK,anchor:'start'});
  A.text(105,200,'100 ÷ 20 = 5 rem 0',{size:18,c:INK,anchor:'start'});
  A.text(105,260,'7/20 = 0.35',{size:28,c:SK,anchor:'start'});
  A.text(455,160,'50 ÷ 6 = 8 rem 2',{size:18,c:INK,anchor:'start'});
  A.text(455,200,'20 ÷ 6 = 3 rem 2',{size:18,c:INK,anchor:'start'});
  A.text(455,240,'20 ÷ 6 = 3 rem 2 ...',{size:18,c:INK,anchor:'start'});
  A.text(455,300,'5/6 = 0.8333…',{size:28,c:PK,anchor:'start'});
  A.say("For 7/20 the remainder becomes 0, so the decimal stops at 0.35.",
        "7/20-এ ভাগশেষ শূন্য হয়, তাই দশমিক 0.35-এ থেমে যায়।");
  A.say("For 5/6 the remainder 2 returns, so 0.8333… repeats forever.",
        "5/6-এ ভাগশেষ 2 বারবার ফিরে আসে, তাই 0.8333… অনন্তকাল পুনরাবৃত্ত হয়।");
  A.rect(120,330,560,58,{c:AM,w:2.5,fill:AM,fo:.10},.4);
  A.text(400,368,'after cancelling, denominator 2ᵃ5ᵇ  →  terminating',{size:19,c:AM});
  A.say("After cancelling, a denominator made only of 2s and 5s always terminates.",
        "লঘু করার পর হরে কেবল 2 ও 5 থাকলে দশমিক সবসময় সসীম হয়।");
  NOTE(A,445,'otherwise the repeating block starts sooner or later.');
});

lesson('c910-250','Recurring decimal to fraction','0.4545… = 5/11',A=>{
  A.say("Let x equal the recurring decimal 0.454545…",
        "ধরি x = 0.454545… পুনরাবৃত্ত দশমিকটি।");
  A.text(120,110,'x = 0.454545…',{size:26,c:AM,anchor:'start'});
  A.say("Two repeating digits need a factor of 100, so 100x = 45.454545…",
        "দুই অঙ্ক পুনরাবৃত্ত হলে 100 দিয়ে গুণ করতে হয়, তাই 100x = 45.454545…");
  A.text(120,170,'100x = 45.454545…',{size:26,c:SK,anchor:'start'});
  A.line(120,195,660,195,{c:MU,w:1.5},.4);
  A.text(120,235,'100x − x = 45.454545… − 0.454545…',{size:21,c:INK,anchor:'start'});
  A.say("Subtract x from 100x: the endless tails cancel and 99x = 45.",
        "100x থেকে x বিয়োগ করো: অসীম শেষাংশ কেটে যায় এবং 99x = 45।");
  A.line(120,258,660,258,{c:MU,w:1.5},.4);
  A.text(120,305,'99x = 45',{size:29,c:PK,anchor:'start'});
  A.say("Divide by 99 and reduce: x = 45/99 = 5/11.",
        "99 দিয়ে ভাগ করে লঘু করো: x = 45/99 = 5/11।");
  A.text(120,365,'x = 45/99 = 5/11',{size:30,c:GR,anchor:'start'});
  A.text(560,405,'check: 5 ÷ 11 = 0.4545…',{size:19,c:GR});
  NOTE(A,450,'one-digit blocks divide by 9; two-digit blocks by 99.');
});

lesson('c910-251','Rationalising a surd denominator','Multiply by the root or its conjugate',A=>{
  A.say("6/√3 has a surd below the line, so multiply top and bottom by √3.",
        "6/√3-এর হরে করণী আছে, তাই লব ও হরকে √3 দিয়ে গুণ করো।");
  A.text(200,115,'6/√3',{size:32,c:AM});
  A.text(200,185,'6 × √3',{size:22,c:INK});
  A.line(135,198,265,198,{c:MU,w:2},.4);
  A.text(200,228,'√3 × √3',{size:22,c:INK});
  A.say("√3 × √3 = 3, so the fraction becomes 6√3/3 = 2√3.",
        "√3 × √3 = 3, তাই ভগ্নাংশটি হয় 6√3/3 = 2√3।");
  A.text(200,285,'= 2√3',{size:30,c:GR});
  A.say("For 5/(√7 − √2) multiply by the conjugate √7 + √2.",
        "5/(√7 − √2)-এর জন্য অনুবন্ধী √7 + √2 দিয়ে গুণ করো।");
  A.text(560,115,'5 / (√7 − √2)',{size:23,c:SK});
  A.text(560,170,'× (√7 + √2) / (√7 + √2)',{size:18,c:INK});
  A.text(560,220,'= 5(√7 + √2) / (7 − 2)',{size:18,c:INK});
  A.say("The denominator becomes 7 − 2 = 5, leaving √7 + √2.",
        "হর হয় 7 − 2 = 5, ফলে থাকে √7 + √2।");
  A.text(560,285,'= √7 + √2',{size:28,c:GR});
  A.rect(130,330,540,52,{c:VI,w:2.5,fill:VI,fo:.10},.4);
  A.text(400,365,'(a − b)(a + b) = a² − b² clears the surd',{size:20,c:VI});
  NOTE(A,445,'the conjugate keeps the value the same because you divide by itself.');
});

lesson('c910-252','Adding and multiplying surds','Like surds add; roots multiply',A=>{
  A.say("Simplify first: √20 = 2√5, so √5 + √20 = 3√5.",
        "আগে সরল করো: √20 = 2√5, তাই √5 + √20 = 3√5।");
  A.text(400,105,'√5 + √20 = √5 + 2√5 = 3√5',{size:24,c:AM});
  A.say("Only like surds may be added; the coefficients add, the root stays.",
        "কেবল সদৃশ করণী যোগ করা যায়; সহগ যোগ হয়, মূল অপরিবর্তিত থাকে।");
  A.rect(120,145,250,58,{c:SK,w:2,fill:SK,fo:.10},.35);
  A.text(245,180,'3√5 + 2√5 = 5√5',{size:22,c:SK});
  A.rect(430,145,250,58,{c:RD,w:2,fill:RD,fo:.10},.35);
  A.text(555,180,'√3 + √5 stays split',{size:20,c:RD});
  A.say("Multiplying is different: √3 × √12 = √36 = 6.",
        "গুণ করা ভিন্ন: √3 × √12 = √36 = 6।");
  A.text(400,255,'√3 × √12 = √(3 × 12) = √36 = 6',{size:24,c:GR});
  A.say("Use (a − b)(a + b) = a² − b²: (√5 + 2)(√5 − 2) = 5 − 4 = 1.",
        "(a − b)(a + b) = a² − b² ব্যবহার করো: (√5 + 2)(√5 − 2) = 5 − 4 = 1।");
  A.text(400,315,'(√5 + 2)(√5 − 2) = 5 − 4 = 1',{size:24,c:PK});
  A.arrow(255,330,255,380,{c:MU,w:2},.35);
  A.text(400,390,'multiply the whole binomials, not just the roots',{size:18,c:INK});
  NOTE(A,448,'√a + √b is not √(a + b); keep them separate.');
});

lesson('c910-253','Spiral of roots on the number line','Unit steps build √2, √3, √5',A=>{
  A.say("Start with a unit segment and turn 90° at its end.",
        "এক একক রেখাংশ দিয়ে শুরু করো এবং তার শেষে 90° ঘুরো।");
  const O=[250,320], u=40, P=[[290,320]];
  for(let k=2;k<=5;k++){
    const a=P[P.length-1], dx=a[0]-O[0], dy=a[1]-O[1], L=Math.sqrt(dx*dx+dy*dy);
    P.push([a[0]+u*dy/L, a[1]-u*dx/L]);
  }
  for(let k=1;k<P.length;k++){
    A.line(P[k-1][0],P[k-1][1],P[k][0],P[k][1],{c:k%2?SK:GR,w:3},.35);
  }
  for(let k=1;k<P.length;k++){
    A.dashed(O[0],O[1],P[k][0],P[k][1],{c:MU,w:1.3},.3);
  }
  A.circle(O[0],O[1],5,{c:AM,w:2,fill:AM,fo:1},.25);
  A.text(240,340,'O',{size:16,c:AM,anchor:'end'});
  for(let k=1;k<P.length;k++){
    const p=P[k], dx=p[0]-O[0], dy=p[1]-O[1], L=Math.sqrt(dx*dx+dy*dy);
    A.circle(p[0],p[1],4,{c:AM,w:2,fill:AM,fo:1},.2);
    A.text(p[0]+18*dx/L,p[1]+18*dy/L+4,'√'+(k+1),{size:15,c:GR});
  }
  A.say("Each new unit step makes a right triangle, so the radius grows as √2, √3, √4.",
        "প্রতিটি নতুন একক ধাপ সমকোণী ত্রিভুজ তৈরি করে, তাই ব্যাসার্ধ √2, √3, √4 হয়ে বাড়ে।");
  A.say("The points spiral outward because every hypotenuse becomes the next short side.",
        "প্রতিটি অতিভুজ পরের ছোট বাহু হয়, তাই বিন্দুগুলো বাইরের দিকে সর্পিল হয়।");
  A.arrow(180,370,180,395,{c:MU,w:2},.3);
  A.line(100,405,700,405,{c:INK,w:2.5},.5);
  const base=120, step=65;
  const roots=[['0',0],['1',1],['√2',1.414],['√3',1.732],['2',2],['√5',2.236]];
  roots.forEach((r,i)=>{
    const x=base+r[1]*step*2;
    A.line(x,398,x,412,{c:MU,w:2},.2);
    A.text(x,434,r[0],{size:15,c:i>1?GR:INK});
  });
  A.say("Copy those radii with a compass onto the number line.",
        "কম্পাস দিয়ে সেই ব্যাসার্ধগুলো সংখ্যারেখায় বসাও।");
  NOTE(A,462,'√2 ≈ 1.414, √3 ≈ 1.732, √5 ≈ 2.236.');
});

/* ─── Sets and functions ─── */

lesson('c910-254','Three-set Venn diagram regions','Eight regions, eight membership patterns',A=>{
  A.say("Three circles cut the universe into eight named regions.",
        "তিনটি বৃত্ত মহাবিশ্বকে আটটি নামকরণযোগ্য অঞ্চলে ভাগ করে।");
  A.rect(80,110,640,340,{c:MU,w:2},.6);
  A.text(718,134,'U',{size:19,c:MU});
  A.circle(360,240,100,{c:SK,w:2.5,fill:SK,fo:.07},.8);
  A.circle(460,240,100,{c:GR,w:2.5,fill:GR,fo:.07},.8);
  A.circle(410,330,100,{c:PK,w:2.5,fill:PK,fo:.07},.8);
  A.text(285,155,'A',{size:20,c:SK});
  A.text(545,155,'B',{size:20,c:GR});
  A.text(300,412,'C',{size:20,c:PK});
  A.text(292,235,'A only',{size:14,c:SK});
  A.text(528,235,'B only',{size:14,c:GR});
  A.text(410,416,'C only',{size:14,c:PK});
  A.text(410,205,'A∩B only',{size:13,c:AM});
  A.text(360,315,'A∩C only',{size:13,c:AM});
  A.text(460,315,'B∩C only',{size:13,c:AM});
  A.text(410,282,'A∩B∩C',{size:14,c:RD});
  A.text(668,150,'outside',{size:13,c:MU});
  A.say("A only means inside A but outside both B and C.",
        "কেবল A মানে A-এর ভিতরে কিন্তু B ও C দুটিরই বাইরে।");
  A.say("The middle A∩B∩C belongs to all three sets.",
        "মাঝের A∩B∩C তিনটি সেটেরই অন্তর্গত।");
  A.say("The region outside all three circles is (A∪B∪C)ᶜ.",
        "তিনটি বৃত্তের বাইরের অঞ্চলটি (A∪B∪C)ᶜ।");
  NOTE(A,448,'label regions before you put numbers in them.');
});

lesson('c910-255','Union and intersection on a Venn diagram','Count the union without double counting',A=>{
  A.say("Let A = {2, 4, 6, 8} and B = {3, 6, 9} inside U = {1, …, 10}.",
        "ধরি U = {1, …, 10}-এর ভিতরে A = {2, 4, 6, 8} এবং B = {3, 6, 9}।");
  A.rect(95,120,610,290,{c:MU,w:2},.6);
  A.text(688,144,'U',{size:18,c:MU});
  A.circle(300,260,110,{c:SK,w:2.5,fill:SK,fo:.12},.8);
  A.circle(470,260,110,{c:GR,w:2.5,fill:GR,fo:.12},.8);
  A.text(250,155,'A',{size:20,c:SK});
  A.text(520,155,'B',{size:20,c:GR});
  A.text(255,270,'2, 4, 8',{size:20,c:SK});
  A.text(385,270,'6',{size:22,c:AM});
  A.text(515,270,'3, 9',{size:20,c:GR});
  A.text(200,155,'1, 5',{size:15,c:MU});
  A.text(600,160,'7, 10',{size:15,c:MU});
  A.say("The union A∪B collects every element in either circle: 2, 3, 4, 6, 8, 9.",
        "সংযোগ A∪B দুই বৃত্তের যেকোনো একটির সব উপাদান নেয়: 2, 3, 4, 6, 8, 9।");
  A.say("The intersection is only the shared element 6.",
        "ছেদ হলো কেবল সাধারণ উপাদান 6।");
  A.text(400,380,'|A| = 4      |B| = 3      |A∩B| = 1',{size:19,c:INK});
  A.say("Count with |A∪B| = |A| + |B| − |A∩B| = 4 + 3 − 1 = 6.",
        "গণনায় |A∪B| = |A| + |B| − |A∩B| = 4 + 3 − 1 = 6।");
  A.rect(160,398,480,45,{c:AM,w:2,fill:AM,fo:.10},.35);
  A.text(400,428,'|A∪B| = 6',{size:21,c:AM});
  NOTE(A,462,'subtract the overlap so it is not counted twice.');
});

lesson('c910-256','Difference and complement of sets','A − B and Aᶜ',A=>{
  A.say("A − B keeps the elements of A that are not in B.",
        "A − B রাখে A-এর সেই উপাদানগুলো যা B-তে নেই।");
  A.rect(70,135,300,250,{c:MU,w:2},.5);
  A.circle(170,260,75,{c:AM,w:2.5,fill:AM,fo:.30},.7);
  A.circle(265,260,75,{c:'#0b1220',w:2.5,fill:'#0b1220',fo:1},.6);
  A.circle(265,260,75,{c:GR,w:2.5},.3);
  A.text(135,250,'1, 2',{size:18,c:AM});
  A.text(300,255,'3',{size:18,c:GR});
  A.text(220,120,'A − B',{size:21,c:AM});
  A.text(220,410,'left crescent only',{size:15,c:MU});
  A.say("Here the left crescent is A − B, while the lens belongs to both.",
        "এখানে বাম অর্ধচন্দ্র A − B, আর মাঝের অংশ দুটিরই।");
  A.say("The complement Aᶜ is everything in U outside A.",
        "পূরক Aᶜ হলো U-তে A-এর বাইরের সবকিছু।");
  A.rect(430,135,300,250,{c:AM,w:2,fill:AM,fo:.16},.7);
  A.circle(580,260,80,{c:'#0b1220',w:2.5,fill:'#0b1220',fo:1},.6);
  A.circle(580,260,80,{c:SK,w:2.5},.3);
  A.text(580,266,'A',{size:20,c:SK});
  A.text(680,180,'Aᶜ',{size:22,c:AM});
  A.text(580,120,'U',{size:19,c:MU});
  A.say("Write them as A − B = A ∩ Bᶜ and Aᶜ = U − A.",
        "এগুলো লেখো A − B = A ∩ Bᶜ এবং Aᶜ = U − A।");
  A.text(400,425,'A − B = A ∩ Bᶜ        Aᶜ = U − A',{size:21,c:VI});
  NOTE(A,460,'difference removes, complement turns inside out.');
});

lesson('c910-257','De Morgan’s laws','(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ',A=>{
  A.say("Take U = {1,2,3,4,5,6,7,8}, A = {1,2,3} and B = {3,4,5}.",
        "ধরি U = {1,2,3,4,5,6,7,8}, A = {1,2,3} এবং B = {3,4,5}।");
  const xs=[]; for(let i=0;i<8;i++) xs.push(190+i*55);
  xs.forEach((x,i)=>A.text(x,142,String(i+1),{size:17,c:MU}));
  A.line(130,158,650,158,{c:MU,w:1.5},.3);
  const rows=[['A',[0,1,2]],['B',[2,3,4]],['A∪B',[0,1,2,3,4]],['(A∪B)ᶜ',[5,6,7]]];
  rows.forEach((r,ri)=>{
    const y=195+ri*42;
    A.text(105,y+5,r[0],{size:16,c:ri===3?RD:INK,anchor:'start'});
    r[1].forEach(i=>A.text(xs[i],y,'•',{size:24,c:ri===3?RD:AM}));
    A.line(130,y+20,650,y+20,{c:MU,w:.8},.2);
  });
  A.say("The union A∪B = {1,2,3,4,5}, so its complement is {6,7,8}.",
        "সংযোগ A∪B = {1,2,3,4,5}, তাই এর পূরক {6,7,8}।");
  A.say("Separately Aᶜ = {4,5,6,7,8} and Bᶜ = {1,2,6,7,8}; their intersection is again {6,7,8}.",
        "আলাদা করে Aᶜ = {4,5,6,7,8} এবং Bᶜ = {1,2,6,7,8}; তাদের ছেদ আবার {6,7,8}।");
  A.text(400,380,'Aᶜ ∩ Bᶜ = {6, 7, 8} = (A ∪ B)ᶜ',{size:21,c:GR});
  A.say("So (A∪B)ᶜ = Aᶜ ∩ Bᶜ; reversing gives (A∩B)ᶜ = Aᶜ ∪ Bᶜ.",
        "তাই (A∪B)ᶜ = Aᶜ ∩ Bᶜ; উল্টে দিলে (A∩B)ᶜ = Aᶜ ∪ Bᶜ।");
  A.text(400,425,'(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ',{size:20,c:VI});
  NOTE(A,462,'the complement swaps union with intersection.');
});

lesson('c910-258','Subsets and the power set','Each element: keep it or drop it',A=>{
  A.say("S = {a, b} has two elements, and each can be kept or dropped.",
        "S = {a, b}-এর দুইটি উপাদান, প্রতিটিকে রাখা বা বাদ দেওয়া যায়।");
  A.text(400,105,'S = {a, b}',{size:24,c:AM});
  A.line(400,120,300,180,{c:MU,w:2},.3);
  A.line(400,120,500,180,{c:MU,w:2},.3);
  A.text(325,155,'keep a',{size:14,c:GR});
  A.text(478,155,'drop a',{size:14,c:PK});
  A.line(300,190,240,255,{c:MU,w:2},.3);
  A.line(300,190,360,255,{c:MU,w:2},.3);
  A.line(500,190,440,255,{c:MU,w:2},.3);
  A.line(500,190,560,255,{c:MU,w:2},.3);
  [[240,'{a,b}'],[360,'{a}'],[440,'{b}'],[560,'∅']].forEach(l=>{
    A.rect(l[0]-48,262,96,40,{c:SK,w:2,fill:SK,fo:.10},.3);
    A.text(l[0],288,l[1],{size:17,c:SK});
  });
  A.say("The tree gives four leaves: {a,b}, {a}, {b} and ∅.",
        "বৃক্ষটি চারটি পাতা দেয়: {a,b}, {a}, {b} এবং ∅।");
  A.say("So there are 2 × 2 = 4 subsets, and P(S) has four members.",
        "তাই উপসেট 2 × 2 = 4টি, এবং P(S)-এর সদস্য চারটি।");
  A.text(400,340,'2 choices × 2 choices = 4 subsets',{size:20,c:GR});
  A.text(400,385,'P(S) = { ∅, {a}, {b}, {a,b} }',{size:19,c:SK});
  A.say("In general a set with n elements has 2ⁿ subsets.",
        "সাধারণভাবে n উপাদানের সেটের 2ⁿটি উপসেট থাকে।");
  A.text(400,425,'n elements  →  2ⁿ subsets',{size:20,c:AM});
  NOTE(A,458,'for n = 4 the power set has 2⁴ = 16 members.');
});

lesson('c910-259','Cartesian product as a grid','A × B is a table of ordered pairs',A=>{
  A.say("Ordered pairs put every element of A with every element of B.",
        "ক্রমজোড় A-এর প্রতিটি উপাদানকে B-এর প্রতিটির সঙ্গে যুক্ত করে।");
  A.text(400,100,'A = {1, 2, 3}      B = {x, y}',{size:21,c:AM});
  A.text(427,136,'x',{size:18,c:SK});
  A.text(547,136,'y',{size:18,c:SK});
  const vals=[[1,'x'],[1,'y'],[2,'x'],[2,'y'],[3,'x'],[3,'y']];
  [1,2,3].forEach((v,i)=>{
    A.text(318,186+i*68,String(v),{size:20,c:SK});
    [0,1].forEach(j=>{
      const x=370+j*120, y=152+i*68;
      A.rect(x,y,115,56,{c:MU,w:1.5,fill:MU,fo:.06},.3);
      A.text(x+57,y+36,'('+v+', '+vals[i*2+j][1]+')',{size:16,c:INK});
    });
  });
  A.say("Rows come from A = {1, 2, 3} and columns from B = {x, y}.",
        "সারি আসে A = {1, 2, 3} থেকে আর কলাম আসে B = {x, y} থেকে।");
  A.say("Filling the 3 × 2 grid gives six pairs such as (2, y).",
        "3 × 2 গ্রিড পূরণ করলে (2, y)-এর মতো ছয়টি জোড় পাওয়া যায়।");
  A.text(680,230,'3 rows × 2 columns',{size:16,c:MU});
  A.text(680,262,'= 6 pairs',{size:20,c:AM});
  A.say("Order matters, so (2, y) and (y, 2) are different.",
        "ক্রম গুরুত্বপূর্ণ, তাই (2, y) ও (y, 2) ভিন্ন।");
  A.text(400,390,'A × B = { (1,x), (1,y), (2,x), (2,y), (3,x), (3,y) }',{size:15,c:SK});
  A.text(400,430,'(2, y) ≠ (y, 2)',{size:19,c:PK});
  NOTE(A,462,'A × B has m × n elements when |A| = m and |B| = n.');
});

lesson('c910-260','Domain and range of a function','Allowed inputs and actual outputs',A=>{
  A.say("A function sends each input to exactly one output.",
        "একটি ফাংশন প্রতিটি ইনপুটকে ঠিক একটি আউটপুটে পাঠায়।");
  A.ell(220,250,80,100,{c:SK,w:2.5,fill:SK,fo:.10},.7);
  A.ell(580,250,80,100,{c:GR,w:2.5,fill:GR,fo:.10},.7);
  A.text(220,132,'domain',{size:19,c:SK});
  A.text(580,132,'range',{size:19,c:GR});
  [195,250,305].forEach((y,i)=>{
    A.text(220,y,String(i+1),{size:22,c:INK});
    A.text(580,y,String(2*(i+1)+1),{size:22,c:INK});
    A.arrow(305,y,495,y,{c:MU,w:2},.3);
  });
  A.text(400,170,'×2 + 1',{size:16,c:AM});
  A.say("Here f(x) = 2x + 1 maps 1, 2, 3 to 3, 5, 7.",
        "এখানে f(x) = 2x + 1 সংখ্যা 1, 2, 3-কে 3, 5, 7-এ পাঠায়।");
  A.say("The domain is the set of allowed inputs; the range is the set of outputs.",
        "ডোমেন হলো অনুমোদিত ইনপুটের সেট; রেঞ্জ হলো আউটপুটের সেট।");
  A.text(400,380,'domain = allowed inputs',{size:19,c:SK});
  A.text(400,415,'range = outputs that actually occur',{size:19,c:GR});
  A.say("For f(x) = 1/(x − 3), x = 3 is forbidden, so the domain is x ≠ 3.",
        "f(x) = 1/(x − 3)-এর জন্য x = 3 নিষিদ্ধ, তাই ডোমেন x ≠ 3।");
  A.text(400,448,'f(x) = 1/(x − 3)   →   domain  x ≠ 3',{size:18,c:AM});
  NOTE(A,466,'look for division by zero and negative roots when finding a domain.');
});

lesson('c910-261','Composite functions','gf(x) means g after f',A=>{
  A.say("Composite functions apply one machine after another.",
        "যৌগিক ফাংশনে একটির পরে আরেকটি মেশিন চলে।");
  A.text(95,236,'x',{size:22,c:INK});
  A.arrow(115,230,150,230,{c:MU,w:2},.3);
  A.rect(150,190,120,80,{c:SK,w:2.5,fill:SK,fo:.12},.4);
  A.text(210,225,'f',{size:26,c:SK});
  A.text(210,255,'×2 + 1',{size:14,c:INK});
  A.arrow(270,230,380,230,{c:MU,w:2},.3);
  A.text(325,175,'f(x) = 2x + 1',{size:13,c:MU});
  A.rect(380,190,120,80,{c:GR,w:2.5,fill:GR,fo:.12},.4);
  A.text(440,225,'g',{size:26,c:GR});
  A.text(440,255,'square',{size:14,c:INK});
  A.arrow(500,230,555,230,{c:MU,w:2},.3);
  A.text(635,236,'(2x + 1)²',{size:21,c:GR});
  A.say("First f doubles and adds 1; then g squares the result.",
        "প্রথমে f দ্বিগুণ করে 1 যোগ করে; তারপর g ফলাফলটির বর্গ করে।");
  A.say("So gf(x) = g(f(x)) = (2x + 1)².",
        "তাই gf(x) = g(f(x)) = (2x + 1)²।");
  A.text(400,330,'gf(x) = g(f(x)) = (2x + 1)²',{size:23,c:GR});
  A.say("Reversing the order gives fg(x) = f(x²) = 2x² + 1, which is different.",
        "ক্রম উল্টালে fg(x) = f(x²) = 2x² + 1, যা ভিন্ন।");
  A.text(400,378,'fg(x) = f(x²) = 2x² + 1',{size:23,c:PK});
  A.text(400,425,'at x = 2:   gf = 25   but   fg = 9',{size:19,c:AM});
  NOTE(A,460,'apply the function nearest the x first.');
});

lesson('c910-262','Inverse function as a mirror in y = x','Swap x and y, then solve',A=>{
  A.say("An inverse function undoes f: swap x and y, then solve for y.",
        "বিপরীত ফাংশন f-কে বাতিল করে: x ও y অদলবদল করো, তারপর y-এর জন্য সমাধান করো।");
  A.arrow(90,340,700,340,{c:MU,w:2},.4);
  A.arrow(330,440,330,80,{c:MU,w:2},.4);
  A.text(705,348,'x',{size:16,c:MU});
  A.text(342,74,'y',{size:16,c:MU});
  A.text(400,70,'f(x) = 2x + 3      f⁻¹(x) = (x − 3)/2',{size:17,c:AM});
  A.dashed(210,460,490,180,{c:MU,w:1.8},.5);
  A.text(500,182,'y = x',{size:16,c:MU,anchor:'start'});
  A.line(270,340,390,100,{c:SK,w:3},.6);
  A.line(290,420,530,300,{c:PK,w:3},.6);
  A.text(398,105,'f',{size:19,c:SK,anchor:'start'});
  A.text(538,300,'f⁻¹',{size:19,c:PK,anchor:'start'});
  A.say("From y = 2x + 3 we get x = (y − 3)/2, so f⁻¹(x) = (x − 3)/2.",
        "y = 2x + 3 থেকে পাই x = (y − 3)/2, তাই f⁻¹(x) = (x − 3)/2।");
  A.say("On a graph the inverse is the mirror image in the line y = x.",
        "গ্রাফে বিপরীত ফাংশন y = x রেখায় আয়নার প্রতিবিম্ব।");
  A.circle(330,220,6,{c:AM,w:2,fill:AM,fo:1},.3);
  A.circle(450,340,6,{c:AM,w:2,fill:AM,fo:1},.3);
  A.dashed(330,220,450,340,{c:PK,w:1.5},.3);
  A.text(318,212,'(0, 3)',{size:15,c:AM,anchor:'end'});
  A.text(465,360,'(3, 0)',{size:15,c:AM,anchor:'start'});
  A.say("The point (0, 3) on f reflects to (3, 0) on f⁻¹.",
        "f-এর বিন্দু (0, 3) প্রতিফলিত হয়ে f⁻¹-এর (3, 0) হয়।");
  A.text(400,440,'reflection swaps (a, b) with (b, a)',{size:18,c:VI});
  NOTE(A,464,'a function has an inverse only if it is one-to-one.');
});

lesson('c910-263','The vertical line test','One input, one output',A=>{
  A.say("A graph is a function when no vertical line hits it twice.",
        "কোনো উল্লম্ব রেখা গ্রাফটিকে দুইবার ছুঁলে না, তখনই তা ফাংশন।");
  A.arrow(110,300,360,300,{c:MU,w:2},.4);
  A.arrow(230,380,230,150,{c:MU,w:2},.4);
  const p=[];
  for(let i=0;i<=40;i++){const x=-2.2+4.4*i/40;p.push([230+x*45,300-(x*x-1)*45]);}
  A.pts(p,{c:GR,w:3.5},.9);
  A.dashed(248,130,248,360,{c:AM,w:2},.5);
  A.circle(248,338,6,{c:AM,w:2,fill:AM,fo:1},.3);
  A.text(230,105,'function ✓',{size:18,c:GR});
  A.text(230,400,'one hit',{size:17,c:GR});
  A.say("The parabola passes: every vertical line meets it once.",
        "প্যারাবোলা উত্তীর্ণ হয়: প্রতিটি উল্লম্ব রেখা একে একবার ছেদ করে।");
  A.arrow(440,240,700,240,{c:MU,w:2},.4);
  A.arrow(560,370,560,110,{c:MU,w:2},.4);
  A.circle(560,240,100,{c:PK,w:3,fill:PK,fo:.05},.9);
  A.dashed(600,120,600,360,{c:AM,w:2},.5);
  A.circle(600,148,6,{c:AM,w:2,fill:AM,fo:1},.3);
  A.circle(600,332,6,{c:AM,w:2,fill:AM,fo:1},.3);
  A.text(560,105,'circle ✗',{size:18,c:PK});
  A.text(560,400,'two hits',{size:17,c:PK});
  A.say("The circle fails: a vertical line cuts it at two points.",
        "বৃত্ত ব্যর্থ হয়: একটি উল্লম্ব রেখা একে দুই বিন্দুতে কাটে।");
  A.say("Two hits mean one input x has two different outputs.",
        "দুই ছেদ মানে একই ইনপুট x-এর দুইটি ভিন্ন আউটপুট।");
  A.text(400,432,'no vertical line may cross a function twice',{size:18,c:INK});
  NOTE(A,462,'draw the test line at the suspected input, not just anywhere.');
});

lesson('c910-264','Pythagoras theorem proof by areas','9 + 16 = 25 on the three sides',A=>{
  A.say("Build a square on each side of a right triangle.",
        "সমকোণী ত্রিভুজের প্রতিটি বাহুর উপর একটি বর্গ আঁকো।");
  A.pts([[390,246],[278,330],[194,218],[306,134],[390,246]],{c:AM,w:2,fill:AM,fo:.10},.5);
  A.pts([[278,330],[390,330],[390,442],[278,442],[278,330]],{c:GR,w:2,fill:GR,fo:.10},.4);
  A.pts([[390,246],[306,246],[306,330],[390,330],[390,246]],{c:SK,w:2,fill:SK,fo:.10},.4);
  A.pts([[390,246],[278,330],[390,330],[390,246]],{c:INK,w:3},.6);
  A.text(348,290,'9',{size:24,c:SK});
  A.text(334,400,'16',{size:24,c:GR});
  A.text(292,228,'25',{size:24,c:AM});
  A.text(402,285,'3',{size:19,c:INK,anchor:'start'});
  A.text(334,320,'4',{size:19,c:INK});
  A.text(356,305,'5',{size:19,c:INK});
  A.say("The two shorter squares have areas 9 and 16.",
        "দুই ছোট বর্গের ক্ষেত্রফল 9 ও 16।");
  A.say("The square on the hypotenuse has area 25.",
        "অতিভুজের উপর বর্গের ক্ষেত্রফল 25।");
  A.text(585,205,'9 + 16 = 25',{size:25,c:GR});
  A.text(585,255,'a² + b² = c²',{size:24,c:AM});
  A.say("Since 9 + 16 = 25, we get a² + b² = c².",
        "যেহেতু 9 + 16 = 25, তাই a² + b² = c²।");
  A.text(585,320,'the three square areas',{size:16,c:MU});
  A.text(585,345,'fit together exactly',{size:16,c:MU});
  NOTE(A,450,'this area proof works for every right triangle.');
});

lesson('c910-265','Similar triangles and scale factor','Same shape, lengths multiplied',A=>{
  A.say("Similar triangles have the same angles and proportional sides.",
        "সদৃশ ত্রিভুজের কোণ সমান এবং বাহু সমানুপাতিক।");
  A.pts([[100,360],[210,360],[100,213],[100,360]],{c:SK,w:3,fill:SK,fo:.08},.5);
  A.pts([[300,420],[520,420],[300,126],[300,420]],{c:GR,w:3,fill:GR,fo:.08},.5);
  A.text(400,105,'scale factor 2 doubles every side',{size:20,c:AM});
  A.text(155,382,'3',{size:18,c:SK});
  A.text(82,292,'4',{size:18,c:SK,anchor:'end'});
  A.text(168,278,'5',{size:18,c:SK});
  A.text(410,442,'6',{size:18,c:GR});
  A.text(282,282,'8',{size:18,c:GR,anchor:'end'});
  A.text(428,278,'10',{size:18,c:GR});
  A.say("The small triangle has sides 3, 4, 5; doubling gives 6, 8, 10.",
        "ছোট ত্রিভুজের বাহু 3, 4, 5; দ্বিগুণ করলে 6, 8, 10।");
  A.say("The scale factor 2 multiplies every length.",
        "স্কেল গুণক 2 প্রতিটি দৈর্ঘ্যকে গুণ করে।");
  A.text(600,360,'lengths × 2',{size:19,c:SK});
  A.say("Areas multiply by the square of the scale factor: 2² = 4.",
        "ক্ষেত্রফল স্কেল গুণকের বর্গ দিয়ে গুণ হয়: 2² = 4।");
  A.text(600,405,'area × 4',{size:19,c:GR});
  NOTE(A,462,'equal angles alone give similarity, not congruence.');
});

lesson('c910-266','Congruent triangles tests','SSS, SAS, ASA, RHS',A=>{
  A.say("Congruent triangles are exactly the same size and shape.",
        "সর্বসম ত্রিভুজের আকার ও মাপ হুবহু এক।");
  A.text(400,100,'matching colours mark corresponding parts',{size:17,c:MU});
  A.line(110,300,300,300,{c:SK,w:3.5},.4);
  A.line(110,300,205,165,{c:GR,w:3.5},.4);
  A.line(300,300,205,165,{c:PK,w:3.5},.4);
  A.line(430,300,620,300,{c:SK,w:3.5},.4);
  A.line(430,300,525,165,{c:GR,w:3.5},.4);
  A.line(620,300,525,165,{c:PK,w:3.5},.4);
  A.say("SSS, SAS, ASA and RHS each give enough information.",
        "SSS, SAS, ASA ও RHS প্রতিটি যথেষ্ট তথ্য দেয়।");
  const tests=['SSS','SAS','ASA','RHS'];
  tests.forEach((t,i)=>{
    const x=70+i*155;
    A.rect(x,320,140,46,{c:AM,w:2,fill:AM,fo:.10},.35);
    A.text(x+70,351,t,{size:19,c:AM});
  });
  ['3 sides','2 sides + angle','2 angles + side','right angle + hyp'].forEach((s,i)=>{
    A.text(140+i*155,392,s,{size:12,c:MU});
  });
  A.say("AAA only makes triangles similar, because size can change.",
        "AAA কেবল সদৃশ করে, কারণ আকার বদলাতে পারে।");
  A.say("SSA is ambiguous and can produce two different triangles.",
        "SSA দ্ব্যর্থক এবং দুইটি ভিন্ন ত্রিভুজ তৈরি করতে পারে।");
  A.text(400,432,'AAA ✗      SSA ✗',{size:20,c:RD});
  NOTE(A,462,'the equal parts must correspond in the same order.');
});

/* ─── Circle theorems ─── */

lesson('c910-267','Angle at the centre theorem','Central angle = 2 × angle at the circle',A=>{
  A.say("O is the centre and A, B lie on the circle.",
        "O কেন্দ্র এবং A, B বৃত্তের উপর অবস্থিত।");
  A.circle(400,250,140,{c:MU,w:2,fill:SK,fo:.04},.9);
  A.circle(400,250,5,{c:AM,w:2,fill:AM,fo:1},.25);
  A.text(416,266,'O',{size:17,c:AM,anchor:'start'});
  A.say("The radii OA and OB make the angle at the centre, here 120°.",
        "ব্যাসার্ধ OA ও OB কেন্দ্রে কোণ তৈরি করে, এখানে 120°।");
  A.line(400,250,278.8,320,{c:AM,w:2.5},.4);
  A.line(400,250,521.2,320,{c:AM,w:2.5},.4);
  A.text(400,303,'120°',{size:18,c:AM});
  A.say("Join A and B to a point C on the major arc; ∠ACB = 60°.",
        "A ও B-কে বৃহৎ চাপের C বিন্দুর সঙ্গে যোগ করো; ∠ACB = 60°।");
  A.line(400,110,278.8,320,{c:SK,w:2.5},.4);
  A.line(400,110,521.2,320,{c:SK,w:2.5},.4);
  A.circle(400,110,5,{c:SK,w:2,fill:SK,fo:1},.2);
  A.circle(278.8,320,5,{c:SK,w:2,fill:SK,fo:1},.2);
  A.circle(521.2,320,5,{c:SK,w:2,fill:SK,fo:1},.2);
  A.text(400,90,'C',{size:17,c:SK});
  A.text(262,335,'A',{size:17,c:SK});
  A.text(532,335,'B',{size:17,c:SK});
  A.text(400,150,'60°',{size:18,c:GR});
  A.say("The central angle is twice the angle at the circumference.",
        "কেন্দ্রস্থ কোণ পরিধিস্থ কোণের দ্বিগুণ।");
  A.text(400,390,'∠AOB = 2 × ∠ACB',{size:24,c:GR});
  A.text(400,425,'central angle = 2 × angle at the circumference',{size:17,c:INK});
  NOTE(A,458,'∠AOB = 2∠ACB for every C on the same arc.');
});

lesson('c910-268','Angle in a semicircle is 90°','A diameter always makes a right angle',A=>{
  A.say("AB is a diameter, so it divides the circle into two semicircles.",
        "AB ব্যাস, তাই এটি বৃত্তকে দুইটি অর্ধবৃত্তে ভাগ করে।");
  A.circle(400,255,145,{c:MU,w:2,fill:PK,fo:.04},.9);
  A.line(255,255,545,255,{c:AM,w:3.5},.5);
  A.circle(255,255,5,{c:AM,w:2,fill:AM,fo:1},.2);
  A.circle(545,255,5,{c:AM,w:2,fill:AM,fo:1},.2);
  A.text(238,275,'A',{size:17,c:AM,anchor:'end'});
  A.text(562,275,'B',{size:17,c:AM,anchor:'start'});
  A.text(414,275,'O',{size:16,c:MU,anchor:'start'});
  A.say("Pick any point C on a semicircle and join CA and CB.",
        "অর্ধবৃত্তের যেকোনো বিন্দু C নাও এবং CA ও CB যোগ করো।");
  A.line(461.3,123.6,255,255,{c:SK,w:2.5},.4);
  A.line(461.3,123.6,545,255,{c:SK,w:2.5},.4);
  A.circle(461.3,123.6,5,{c:SK,w:2,fill:SK,fo:1},.2);
  A.text(472,112,'C',{size:17,c:SK,anchor:'start'});
  A.pts([[447.8,132.2],[456.4,145.7],[469.9,137.1]],{c:GR,w:2},.3);
  A.text(432,160,'90°',{size:17,c:GR});
  A.say("Angle ACB is always a right angle.",
        "কোণ ACB সবসময় সমকোণ।");
  A.dashed(338.7,123.6,255,255,{c:MU,w:1.5},.3);
  A.dashed(338.7,123.6,545,255,{c:MU,w:1.5},.3);
  A.circle(338.7,123.6,4,{c:MU,w:2,fill:MU,fo:1},.2);
  A.text(322,150,'also 90°',{size:14,c:MU,anchor:'end'});
  A.say("This is the theorem of Thales: the angle in a semicircle is 90°.",
        "এটি থ্যালেসের উপপাদ্য: অর্ধবৃত্তে কোণ 90°।");
  A.text(400,390,'angle in a semicircle = 90°',{size:23,c:GR});
  A.text(400,425,'∠ACB = 90° because AB is a diameter',{size:18,c:INK});
  NOTE(A,458,'the right angle appears because AB passes through the centre.');
});

lesson('c910-269','Angles in the same segment','Same chord, same angle',A=>{
  A.say("Chord AB subtends angles at C and D on the same arc.",
        "জ্যা AB একই চাপের C ও D বিন্দুতে কোণ তৈরি করে।");
  A.circle(400,260,140,{c:MU,w:2,fill:SK,fo:.04},.9);
  A.line(268.4,307.9,531.6,307.9,{c:SK,w:3},.5);
  A.line(447.9,128.4,268.4,307.9,{c:GR,w:2.5},.4);
  A.line(447.9,128.4,531.6,307.9,{c:GR,w:2.5},.4);
  A.line(352.1,128.4,268.4,307.9,{c:PK,w:2.5},.4);
  A.line(352.1,128.4,531.6,307.9,{c:PK,w:2.5},.4);
  [[268.4,307.9],[531.6,307.9],[447.9,128.4],[352.1,128.4]].forEach(p=>{
    A.circle(p[0],p[1],5,{c:AM,w:2,fill:AM,fo:1},.2);
  });
  A.text(250,325,'A',{size:17,c:AM,anchor:'end'});
  A.text(548,325,'B',{size:17,c:AM,anchor:'start'});
  A.text(460,118,'C',{size:17,c:AM,anchor:'start'});
  A.text(336,118,'D',{size:17,c:AM,anchor:'end'});
  A.say("Both angles open onto the same chord and the same segment.",
        "দুই কোণই একই জ্যা ও একই বৃত্তাংশের দিকে খোলে।");
  A.text(452,168,'x',{size:20,c:GR});
  A.text(348,168,'x',{size:20,c:PK});
  A.say("They are equal: ∠ACB = ∠ADB.",
        "তারা সমান: ∠ACB = ∠ADB।");
  A.say("Moving C along the arc does not change the angle.",
        "চাপ বরাবর C সরালেও কোণ বদলায় না।");
  A.text(400,385,'same chord AB, same segment',{size:20,c:SK});
  A.text(400,422,'∠ACB = ∠ADB',{size:24,c:GR});
  NOTE(A,456,'angles in the same segment are always equal.');
});

lesson('c910-270','Cyclic quadrilateral opposite angles','Opposite angles add to 180°',A=>{
  A.say("A cyclic quadrilateral has all four vertices on one circle.",
        "চক্রীয় চতুর্ভুজের চারটি শীর্ষবিন্দুই একটি বৃত্তের উপর থাকে।");
  A.circle(400,255,140,{c:MU,w:2,fill:GR,fo:.04},.9);
  A.pts([[268.4,302.9],[507.2,345.0],[531.6,207.1],[292.8,165.0],[268.4,302.9]],{c:SK,w:3},.7);
  [[268.4,302.9],[507.2,345.0],[531.6,207.1],[292.8,165.0]].forEach(p=>{
    A.circle(p[0],p[1],5,{c:AM,w:2,fill:AM,fo:1},.2);
  });
  A.text(250,315,'A',{size:17,c:AM,anchor:'end'});
  A.text(520,362,'B',{size:17,c:AM});
  A.text(548,205,'C',{size:17,c:AM,anchor:'start'});
  A.text(285,150,'D',{size:17,c:AM,anchor:'end'});
  A.say("Opposite angles A and C face each other across the circle.",
        "বিপরীত কোণ A ও C বৃত্তের ওপারে মুখোমুখি।");
  A.say("They add to 180°, so A + C = 180°.",
        "তাদের যোগফল 180°, তাই A + C = 180°।");
  A.text(630,130,'A + C = 180°',{size:18,c:GR,anchor:'start'});
  A.say("The other pair also adds to 180°: B + D = 180°.",
        "অপর জোড়টিরও যোগফল 180°: B + D = 180°।");
  A.text(630,165,'B + D = 180°',{size:18,c:SK,anchor:'start'});
  A.text(400,400,'opposite angles are supplementary',{size:19,c:INK});
  NOTE(A,445,'opposite angles of a cyclic quadrilateral are supplementary.');
});

lesson('c910-271','Alternate segment theorem','Tangent–chord angle equals the segment angle',A=>{
  A.say("The tangent at A is perpendicular to the radius OA.",
        "A বিন্দুতে স্পর্শক ব্যাসার্ধ OA-এর উপর লম্ব।");
  A.circle(400,255,135,{c:MU,w:2,fill:AM,fo:.04},.9);
  A.line(200,390,620,390,{c:AM,w:3},.5);
  A.dashed(400,255,400,390,{c:MU,w:1.8},.4);
  A.pts([[400,372],[388,372],[388,390]],{c:MU,w:1.5},.25);
  A.text(600,410,'tangent',{size:15,c:AM,anchor:'end'});
  A.say("The chord AB makes an angle x with the tangent.",
        "জ্যা AB স্পর্শকের সঙ্গে x কোণ তৈরি করে।");
  A.line(400,390,477.4,144.4,{c:SK,w:3},.5);
  A.circle(400,390,5,{c:AM,w:2,fill:AM,fo:1},.2);
  A.circle(477.4,144.4,5,{c:SK,w:2,fill:SK,fo:1},.2);
  A.text(388,406,'A',{size:17,c:AM,anchor:'end'});
  A.text(490,140,'B',{size:17,c:SK,anchor:'start'});
  A.text(438,350,'x',{size:19,c:AM});
  A.say("In the alternate segment, C sees AB under the same angle x.",
        "বিপরীত বৃত্তাংশে C, AB-কে একই x কোণে দেখে।");
  A.line(277.6,197.9,400,390,{c:GR,w:2.5},.4);
  A.line(277.6,197.9,477.4,144.4,{c:PK,w:2.5},.4);
  A.circle(277.6,197.9,5,{c:GR,w:2,fill:GR,fo:1},.2);
  A.text(262,188,'C',{size:17,c:GR,anchor:'end'});
  A.text(306,228,'x',{size:19,c:GR});
  A.say("So the tangent–chord angle equals the angle in the alternate segment.",
        "তাই স্পর্শক–জ্যা কোণ বিপরীত বৃত্তাংশের কোণের সমান।");
  A.text(400,438,'tangent–chord angle = alternate segment angle',{size:17,c:VI});
  NOTE(A,462,'the two angles are on opposite sides of the chord.');
});

/* ─── Mensuration ─── */

lesson('c910-272','Surface area of a cylinder','Two circles plus one unrolled rectangle',A=>{
  A.say("A cylinder has two circular ends and one curved surface.",
        "সিলিন্ডারের দুইটি বৃত্তাকার প্রান্ত ও একটি বাঁকা পৃষ্ঠ থাকে।");
  A.ell(190,185,70,24,{c:SK,w:2.5,fill:SK,fo:.12},.6);
  A.ell(190,345,70,24,{c:SK,w:2.5,fill:SK,fo:.12},.6);
  A.line(120,185,120,345,{c:SK,w:2.5},.4);
  A.line(260,185,260,345,{c:SK,w:2.5},.4);
  A.dashed(190,185,190,345,{c:MU,w:1.8},.4);
  A.line(190,345,260,345,{c:AM,w:2.5},.4);
  A.text(232,368,'r = 3',{size:16,c:AM});
  A.text(178,265,'h = 7',{size:16,c:MU,anchor:'end'});
  A.say("Unrolling the curved surface gives a rectangle 2πr wide and h tall.",
        "বাঁকা পৃষ্ঠ খুললে 2πr চওড়া ও h উঁচু একটি আয়তক্ষেত্র পাওয়া যায়।");
  A.rect(430,180,240,150,{c:SK,w:2,fill:SK,fo:.08},.6);
  A.circle(550,128,42,{c:AM,w:2,fill:AM,fo:.12},.5);
  A.circle(550,388,42,{c:AM,w:2,fill:AM,fo:.12},.5);
  A.text(550,174,'2πr',{size:15,c:SK});
  A.text(682,258,'h',{size:17,c:MU,anchor:'start'});
  A.say("With r = 3 and h = 7, the end circles total 2π(3²) = 18π.",
        "r = 3 ও h = 7 হলে প্রান্তের বৃত্ত দুইটি মিলে 2π(3²) = 18π।");
  A.say("The curved part is 2π(3)(7) = 42π, so S = 60π ≈ 188.5 cm².",
        "বাঁকা অংশ 2π(3)(7) = 42π, তাই S = 60π ≈ 188.5 বর্গ সেমি।");
  A.text(400,442,'S = 2πr² + 2πrh = 18π + 42π = 60π ≈ 188.5',{size:18,c:GR});
  NOTE(A,464,'remember both circular ends when finding surface area.');
});

lesson('c910-273','Volume of a cone','A cone is one third of a cylinder',A=>{
  A.say("A cone has a circular base and a single vertex.",
        "কোনের একটি বৃত্তাকার ভূমি ও একটি শীর্ষবিন্দু থাকে।");
  A.ell(200,360,90,24,{c:SK,w:2.5,fill:SK,fo:.12},.6);
  A.line(200,140,110,360,{c:SK,w:2.5},.4);
  A.line(200,140,290,360,{c:SK,w:2.5},.4);
  A.dashed(200,140,200,360,{c:MU,w:1.8},.4);
  A.line(200,360,290,360,{c:AM,w:2.5},.4);
  A.text(252,382,'r = 3',{size:15,c:AM});
  A.text(188,255,'h = 4',{size:15,c:MU,anchor:'end'});
  A.text(252,238,'slant 5',{size:14,c:GR});
  A.say("Three identical cones fill a cylinder with the same base and height.",
        "একই ভূমি ও উচ্চতার সিলিন্ডার তিনটি সমান কোনে ভরে যায়।");
  A.ell(570,140,90,24,{c:GR,w:2,fill:GR,fo:.06},.5);
  A.ell(570,360,90,24,{c:GR,w:2,fill:GR,fo:.06},.5);
  A.line(480,140,480,360,{c:GR,w:2},.4);
  A.line(660,140,660,360,{c:GR,w:2},.4);
  A.line(570,140,480,360,{c:PK,w:2},.4);
  A.line(570,140,660,360,{c:PK,w:2},.4);
  A.text(570,390,'same base and height',{size:15,c:MU});
  A.say("So the cone is one third of that cylinder: V = ⅓πr²h.",
        "তাই কোনটি সেই সিলিন্ডারের এক-তৃতীয়াংশ: V = ⅓πr²h।");
  A.say("With r = 3 and h = 4: V = ⅓π(9)(4) = 12π ≈ 37.7 cm³.",
        "r = 3 ও h = 4 হলে: V = ⅓π(9)(4) = 12π ≈ 37.7 ঘন সেমি।");
  A.text(400,430,'V = ⅓πr²h = ⅓π(9)(4) = 12π ≈ 37.7',{size:19,c:GR});
  NOTE(A,460,'the slant height 5 is not used in the volume formula.');
});

lesson('c910-274','Volume of a sphere','V = 4/3 π r³',A=>{
  A.say("A sphere is every point at distance r from its centre.",
        "গোলক হলো কেন্দ্র থেকে r দূরত্বে থাকা সব বিন্দুর সেট।");
  A.circle(250,255,110,{c:SK,w:2.5,fill:SK,fo:.12},.9);
  A.ell(250,255,110,28,{c:MU,w:1.5},.5);
  A.line(250,255,360,255,{c:AM,w:3},.4);
  A.circle(250,255,5,{c:AM,w:2,fill:AM,fo:1},.25);
  A.text(310,240,'r = 3',{size:17,c:AM});
  A.say("Its volume is V = 4/3 π r³.",
        "এর আয়তন V = 4/3 π r³।");
  A.text(570,160,'V = 4/3 π r³',{size:27,c:GR});
  A.say("For r = 3, r³ = 27, so V = 4/3 π × 27 = 36π.",
        "r = 3 হলে r³ = 27, তাই V = 4/3 π × 27 = 36π।");
  A.text(570,215,'= 4/3 π × 27',{size:23,c:INK});
  A.text(570,265,'= 36π',{size:26,c:AM});
  A.say("That is about 113.1 cm³ of space inside.",
        "অর্থাৎ ভিতরে প্রায় 113.1 ঘন সেমি জায়গা আছে।");
  A.text(570,315,'≈ 113.1 cm³',{size:24,c:PK});
  A.text(570,370,'1 cm³ holds 1 ml of water',{size:15,c:MU});
  NOTE(A,448,'cube the radius first, then multiply by 4/3 π.');
});

lesson('c910-275','Surface area and volume of a prism','Area × length, and surfaces added',A=>{
  A.say("A prism keeps the same cross-section all along its length.",
        "প্রিজমের দৈর্ঘ্য বরাবর একই প্রস্থচ্ছেদ থাকে।");
  A.dashed(180,380,320,300,{c:MU,w:1.5},.3);
  A.dashed(360,380,500,300,{c:MU,w:1.5},.3);
  A.dashed(180,260,320,180,{c:MU,w:1.5},.3);
  A.pts([[320,300],[500,300],[320,180],[320,300]],{c:GR,w:2.5,fill:GR,fo:.06},.5);
  A.pts([[180,380],[360,380],[180,260],[180,380]],{c:SK,w:3,fill:SK,fo:.10},.6);
  A.text(270,402,'3',{size:18,c:SK});
  A.text(162,322,'4',{size:18,c:SK,anchor:'end'});
  A.text(258,304,'5',{size:18,c:SK});
  A.text(430,342,'10',{size:16,c:MU});
  A.say("The triangular end has area ½ × 3 × 4 = 6.",
        "ত্রিভুজাকার প্রান্তের ক্ষেত্রফল ½ × 3 × 4 = 6।");
  A.text(730,150,'base area = ½ × 3 × 4 = 6',{size:15,c:INK,anchor:'end'});
  A.say("Multiply by the length 10 to get volume V = 6 × 10 = 60.",
        "দৈর্ঘ্য 10 দিয়ে গুণ করলে আয়তন V = 6 × 10 = 60।");
  A.text(730,195,'V = 6 × 10 = 60',{size:16,c:GR,anchor:'end'});
  A.text(730,245,'perimeter = 3 + 4 + 5 = 12',{size:15,c:INK,anchor:'end'});
  A.say("Surface area adds two ends and three rectangles: 2(6) + 12(10) = 132.",
        "পৃষ্ঠতলের ক্ষেত্রফলে দুই প্রান্ত ও তিনটি আয়তক্ষেত্র যোগ হয়: 2(6) + 12(10) = 132।");
  A.text(730,295,'S = 2 × 6 + 12 × 10',{size:16,c:PK,anchor:'end'});
  A.text(730,335,'= 132',{size:20,c:PK,anchor:'end'});
  A.text(400,418,'V = base area × length',{size:19,c:AM});
  NOTE(A,452,'volume uses area × length; surface area uses perimeter × length.');
});
