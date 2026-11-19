/* Class 1-5 — part B: lessons c15-201 to c15-217 */

lesson('c15-201','Rounding to the nearest ten','Which ten is closest?',A=>{
  A.say("Rounding replaces a number with a friendly number nearby. Here we round 34 and 38 to the nearest ten.",
        "রাউন্ডিং মানে কাছের সহজ সংখ্যায় বদলে দেওয়া। এখানে ৩৪ আর ৩৮-কে নিকটতম দশে রাউন্ড করব।");
  A.line(160,190,640,190,{c:INK,w:3});
  A.line(160,185,160,195,{c:MU,w:2});
  A.line(640,185,640,195,{c:MU,w:2});
  A.dashed(400,160,400,220,{c:AM,w:2});
  A.text(160,225,'30',{size:22,c:MU});
  A.text(400,225,'35',{size:22,c:AM});
  A.text(640,225,'40',{size:22,c:MU});
  A.circle(352,190,13,{c:SK,w:3,fill:SK,fo:.2});
  A.text(352,160,'34',{size:20,c:SK});
  A.circle(544,190,13,{c:PK,w:3,fill:PK,fo:.2});
  A.text(544,160,'38',{size:20,c:PK});
  A.say("The midpoint between 30 and 40 is 35. A number left of 35 is closer to 30.",
        "৩০ আর ৪০-এর মাঝখানে ৩৫। ৩৫-এর বাঁ দিকের সংখ্যা ৩০-এর বেশি কাছে।");
  A.arrow(352,210,240,250,{c:SK,w:3});
  A.arrow(544,210,600,250,{c:PK,w:3});
  A.text(220,278,'34 -> 30',{size:22,c:SK});
  A.text(620,278,'38 -> 40',{size:22,c:PK});
  A.say("38 is right of 35, so it is closer to 40. Round 34 down and 38 up.",
        "৩৮ হলো ৩৫-এর ডান দিকে, তাই ৪০-এর বেশি কাছে। ৩৪ নিচে, ৩৮ উপরে রাউন্ড হয়।");
  A.say("Look at the ones digit: 0, 1, 2, 3, 4 round down; 5, 6, 7, 8, 9 round up.",
        "এককের অঙ্ক দেখো: ০, ১, ২, ৩, ৪ হলে নিচে; ৫, ৬, ৭, ৮, ৯ হলে উপরে।");
  A.text(400,340,'ones 0-4 -> down      ones 5-9 -> up',{size:20,c:AM});
  NOTE(A,450,'round to the ten that is closer on the number line.');
});

lesson('c15-202','Rounding to the nearest hundred','Which hundred is closest?',A=>{
  A.say("Hundreds are 300, 400, 500 and so on. Let us round 340, 350 and 380 to the nearest hundred.",
        "শতক হলো ৩০০, ৪০০, ৫০০ ইত্যাদি। চলো ৩৪০, ৩৫০ আর ৩৮০-কে নিকটতম শতকে রাউন্ড করি।");
  A.line(140,190,660,190,{c:INK,w:3});
  A.line(140,185,140,195,{c:MU,w:2});
  A.line(660,185,660,195,{c:MU,w:2});
  A.dashed(400,155,400,220,{c:AM,w:2});
  A.text(140,225,'300',{size:22,c:MU});
  A.text(400,225,'350',{size:20,c:AM});
  A.text(660,225,'400',{size:22,c:MU});
  A.circle(348,190,13,{c:SK,w:3,fill:SK,fo:.2});
  A.text(348,160,'340',{size:18,c:SK});
  A.circle(556,190,13,{c:PK,w:3,fill:PK,fo:.2});
  A.text(588,160,'380',{size:18,c:PK});
  A.say("340 is left of the midpoint 350, so it rounds down to 300.",
        "৩৪০ মধ্যপয়েন্ট ৩৫০-এর বাঁয়ে, তাই নিচে ৩০০-তে রাউন্ড হয়।");
  A.arrow(348,210,260,250,{c:SK,w:3});
  A.text(230,280,'340 -> 300',{size:22,c:SK});
  A.say("380 is right of 350, so it rounds up to 400. 350 itself goes up to 400.",
        "৩৮০ ৩৫০-এর ডানে, তাই উপরে ৪০০-তে রাউন্ড হয়। ৩৫০ নিজেও উপরে ৪০০ হয়।");
  A.arrow(556,210,610,250,{c:PK,w:3});
  A.text(620,280,'380 -> 400',{size:22,c:PK});
  A.say("For the nearest hundred, look at the tens digit: 0-4 round down, 5-9 round up.",
        "নিকটতম শতকের জন্য দশকের অঙ্ক দেখো: ০-৪ হলে নিচে, ৫-৯ হলে উপরে।");
  A.text(400,340,'tens 0-4 -> down      tens 5-9 -> up',{size:20,c:AM});
  NOTE(A,448,'the tens digit decides the hundred.');
});

lesson('c15-203','Estimating a sum before adding','Round first, then check',A=>{
  A.say("Before adding 48 and 31, make a quick estimate. Round each number to the nearest ten.",
        "৪৮ আর ৩১ যোগ করার আগে দ্রুত একটি আন্দাজ করো। প্রতিটি সংখ্যাকে নিকটতম দশে রাউন্ড করো।");
  A.rect(90,110,190,80,{c:SK,w:3,fill:SK,fo:.1});
  A.text(185,142,'48',{size:34,c:SK});
  A.text(185,172,'about 50',{size:17,c:MU});
  A.text(330,150,'+',{size:36,c:INK});
  A.rect(380,110,190,80,{c:GR,w:3,fill:GR,fo:.1});
  A.text(475,142,'31',{size:34,c:GR});
  A.text(475,172,'about 30',{size:17,c:MU});
  A.say("48 is close to 50, and 31 is close to 30. The estimate is 50 + 30 = 80.",
        "৪৮ কাছাকাছি ৫০, আর ৩১ কাছাকাছি ৩০। আন্দাজ হলো ৫০ + ৩০ = ৮০।");
  A.text(400,230,'estimate:  50 + 30 = 80',{size:28,c:AM});
  A.say("Now add exactly: 48 + 31 = 79. The exact answer is very close to the estimate.",
        "এবার ঠিকভাবে যোগ করো: ৪৮ + ৩১ = ৭৯। সঠিক উত্তর আন্দাজের খুব কাছে।");
  A.text(400,300,'exact:  48 + 31 = 79',{size:28,c:GR});
  A.text(400,350,'80 and 79 are close, so the answer is reasonable.',{size:19,c:INK});
  A.say("An estimate does not replace the exact sum. It tells you whether the answer looks right.",
        "আন্দাজ সঠিক যোগফলের বদল নয়। এটি বলে উত্তরটি ঠিক দেখাচ্ছে কি না।");
  NOTE(A,450,'estimate first, then add carefully.');
});

lesson('c15-204','Factors of a number','Numbers that divide exactly',A=>{
  A.say("A factor divides a number exactly, with no remainder.",
        "একটি গুণনীয়ক সংখ্যাটিকে ভাগ করে নিঃশেষে, কোনো ভাগশেষ থাকে না।");
  for(let i=0;i<12;i++) A.circle(100+i*16,110,5,{c:SK,w:1.5,fill:SK,fo:.8},.05);
  A.text(188,155,'1 × 12',{size:20,c:SK});
  for(let r=0;r<2;r++) for(let c=0;c<6;c++) A.circle(340+c*24,104+r*28,6,{c:GR,w:1.5,fill:GR,fo:.8},.05);
  A.text(400,160,'2 × 6',{size:20,c:GR});
  for(let r=0;r<3;r++) for(let c=0;c<4;c++) A.circle(590+c*30,96+r*26,7,{c:AM,w:1.5,fill:AM,fo:.8},.05);
  A.text(635,172,'3 × 4',{size:20,c:AM});
  A.say("Twelve counters can sit in one row of twelve, two rows of six, or three rows of four.",
        "বারোটি কাউন্টার এক সারিতে বারো, দুই সারিতে ছয়, বা তিন সারিতে চার করে বসানো যায়।");
  A.say("Each row number and column number is a factor pair of twelve.",
        "প্রতিটি সারির সংখ্যা আর স্তম্ভের সংখ্যা বারোর একটি গুণনীয়ক জোড়া।");
  A.text(400,235,'factor pairs of 12:  (1,12)   (2,6)   (3,4)',{size:22,c:VI});
  A.text(400,285,'12 ÷ 1 = 12    12 ÷ 2 = 6    12 ÷ 3 = 4',{size:20,c:MU});
  A.say("List the factors of 12: 1, 2, 3, 4, 6 and 12.",
        "বারোর গুণনীয়কগুলো লেখো: ১, ২, ৩, ৪, ৬ আর ১২।");
  const fs=[1,2,3,4,6,12];
  fs.forEach((n,i)=>{
    A.circle(180+i*88,355,22,{c:AM,w:2.5,fill:AM,fo:.12},.15);
    A.text(180+i*88,362,String(n),{size:22,c:AM});
  });
  NOTE(A,450,'every number has 1 and itself as factors.');
});

lesson('c15-205','Prime and composite numbers','How many factors?',A=>{
  A.say("A prime number has exactly two factors: 1 and itself. A composite number has more factors.",
        "মৌলিক সংখ্যার ঠিক দুইটি গুণনীয়ক: ১ আর নিজে। যৌগিক সংখ্যার আরও গুণনীয়ক থাকে।");
  A.text(225,100,'7 is prime',{size:24,c:SK});
  for(let i=0;i<7;i++) A.circle(135+i*30,145,10,{c:SK,w:2,fill:SK,fo:.7},.08);
  A.text(225,195,'only 1 × 7',{size:18,c:MU});
  A.text(575,100,'8 is composite',{size:24,c:PK});
  for(let r=0;r<2;r++) for(let c=0;c<4;c++) A.circle(515+c*40,132+r*34,13,{c:PK,w:2,fill:PK,fo:.7},.08);
  A.text(575,215,'2 × 4 also works',{size:18,c:MU});
  A.say("Seven can only be shown as one row of seven. It has no other factor pair.",
        "সাতকে শুধু এক সারিতে সাতটি করে দেখানো যায়। এর অন্য গুণনীয়ক জোড়া নেই।");
  A.say("Eight can be two rows of four, so 2 and 4 are extra factors. Eight is composite.",
        "আটকে দুই সারিতে চারটি করে দেখা যায়, তাই ২ আর ৪ অতিরিক্ত গুণনীয়ক। আট যৌগিক।");
  const nums=[2,3,4,5,6,7,8,9,10];
  nums.forEach((n,i)=>{
    const px=120+i*65;
    const prime=[2,3,5,7].includes(n);
    A.circle(px,300,24,{c:prime?GR:PK,w:2.5,fill:prime?GR:PK,fo:.16},.12);
    A.text(px,307,String(n),{size:20,c:prime?GR:PK});
  });
  A.text(400,355,'green: prime 2, 3, 5, 7     pink: composite 4, 6, 8, 9, 10',{size:18,c:INK});
  A.say("From 2 to 10 the primes are 2, 3, 5 and 7. The others are composite.",
        "২ থেকে ১০ পর্যন্ত মৌলিক সংখ্যা ২, ৩, ৫ আর ৭। বাকিগুলো যৌগিক।");
  A.say("One is special: it is neither prime nor composite, because it has only one factor.",
        "একটি বিশেষ সংখ্যা: সে মৌলিকও নয়, যৌগিকও নয়, কারণ তার একটিই গুণনীয়ক।");
  NOTE(A,448,'count the factors to decide.');
});

lesson('c15-206','Multiples and the LCM idea','Where do the lists meet?',A=>{
  A.say("Multiples of 3 are 3, 6, 9, 12 and so on. Multiples of 4 are 4, 8, 12, 16 and so on.",
        "৩-এর গুণিতক ৩, ৬, ৯, ১২ ইত্যাদি। ৪-এর গুণিতক ৪, ৮, ১২, ১৬ ইত্যাদি।");
  A.text(80,100,'multiples of 3',{size:18,c:SK,anchor:'start'});
  A.text(80,215,'multiples of 4',{size:18,c:PK,anchor:'start'});
  const x0=90, x1=710, step=(x1-x0)/24;
  A.line(x0,145,x1,145,{c:INK,w:2});
  A.line(x0,260,x1,260,{c:INK,w:2});
  for(let n=0;n<=24;n++){
    const px=x0+n*step;
    A.line(px,140,px,150,{c:MU,w:1},.02);
    A.line(px,255,px,265,{c:MU,w:1},.02);
  }
  [0,6,12,18,24].forEach(n=>A.text(x0+n*step,175,String(n),{size:15,c:MU}));
  for(let n=3;n<=24;n+=3){const px=x0+n*step; A.circle(px,145,9,{c:SK,w:2,fill:SK,fo:.8},.05);}
  for(let n=4;n<=24;n+=4){const px=x0+n*step; A.circle(px,260,9,{c:PK,w:2,fill:PK,fo:.8},.05);}
  A.say("The lists meet at 12 and 24. These are common multiples.",
        "দুই তালিকা মেলে ১২ আর ২৪-এ। এগুলো সাধারণ গুণিতক।");
  [12,24].forEach(n=>{
    const px=x0+n*step;
    A.dashed(px,120,px,290,{c:AM,w:2});
    A.text(px,115,String(n),{size:18,c:AM});
  });
  A.say("The smallest common multiple is called the LCM. Here the LCM of 3 and 4 is 12.",
        "সবচেয়ে ছোট সাধারণ গুণিতককে LCM বলে। এখানে ৩ আর ৪-এর LCM হলো ১২।");
  A.text(400,325,'LCM(3, 4) = 12',{size:30,c:AM});
  A.text(400,375,'12 is in both lists and no smaller number is.',{size:18,c:INK});
  A.say("Use the LCM when two events repeat after different numbers of steps.",
        "দুটি ঘটনা ভিন্ন ভিন্ন ধাপে বারবার ঘটলে LCM ব্যবহার করো।");
  NOTE(A,448,'the LCM is the first number the two lists share.');
});

lesson('c15-207','Equivalent fractions by multiplying','Same amount, different pieces',A=>{
  A.say("Equivalent fractions look different but name the same amount.",
        "সমতুল্য ভগ্নাংশ দেখতে আলাদা, কিন্তু একই পরিমাণ বোঝায়।");
  const bx=230, bw=440;
  A.rect(bx,120,bw,48,{c:INK,w:2},.15);
  A.rect(bx,120,bw/2,48,{c:SK,w:0,fill:SK,fo:.35},.15);
  A.line(bx+bw/2,120,bx+bw/2,168,{c:INK,w:2});
  A.text(140,150,'1/2',{size:24,c:SK});
  A.say("Start with one half. Split each half into two equal parts.",
        "এক-দ্বিতীয়াংশ দিয়ে শুরু করো। প্রতিটি অর্ধকে দুই সমান ভাগে ভাগ করো।");
  A.rect(bx,210,bw,48,{c:INK,w:2},.15);
  A.rect(bx,210,bw/2,48,{c:GR,w:0,fill:GR,fo:.35},.15);
  for(let i=1;i<4;i++) A.line(bx+i*bw/4,210,bx+i*bw/4,258,{c:INK,w:1.5},.05);
  A.text(140,240,'2/4',{size:24,c:GR});
  A.say("Now there are four parts and two are shaded, so the fraction is two quarters.",
        "এবার চারটি ভাগ আর দুইটি ছায়াযুক্ত, তাই ভগ্নাংশ দুই-চতুর্থাংশ।");
  A.rect(bx,300,bw,48,{c:INK,w:2},.15);
  A.rect(bx,300,bw/2,48,{c:AM,w:0,fill:AM,fo:.35},.15);
  for(let i=1;i<6;i++) A.line(bx+i*bw/6,300,bx+i*bw/6,348,{c:INK,w:1.2},.04);
  A.text(140,330,'3/6',{size:24,c:AM});
  A.say("Multiplying the top and the bottom by the same number keeps the value.",
        "উপর আর নিচকে একই সংখ্যা দিয়ে গুণ করলে মান একই থাকে।");
  A.text(400,385,'1/2 × 2/2 = 2/4     1/2 × 3/3 = 3/6',{size:22,c:VI});
  A.say("So one half, two quarters and three sixths are equivalent fractions.",
        "তাই এক-দ্বিতীয়াংশ, দুই-চতুর্থাংশ আর তিন-ষষ্ঠাংশ সমতুল্য ভগ্নাংশ।");
  NOTE(A,448,'multiply top and bottom by the same number.');
});

lesson('c15-208','Comparing two fractions','Which fraction is larger?',A=>{
  A.say("Compare two thirds and three quarters. Draw two bars of the same length.",
        "দুই-তৃতীয়াংশ আর তিন-চতুর্থাংশ তুলনা করো। একই দৈর্ঘ্যের দুইটি বার আঁকো।");
  const bx=220, bw=480;
  A.rect(bx,120,bw,50,{c:INK,w:2},.15);
  A.rect(bx,120,bw*2/3,50,{c:SK,w:0,fill:SK,fo:.35},.15);
  for(let i=1;i<3;i++) A.line(bx+i*bw/3,120,bx+i*bw/3,170,{c:INK,w:1.5},.05);
  A.text(130,150,'2/3',{size:24,c:SK});
  A.rect(bx,210,bw,50,{c:INK,w:2},.15);
  A.rect(bx,210,bw*3/4,50,{c:PK,w:0,fill:PK,fo:.35},.15);
  for(let i=1;i<4;i++) A.line(bx+i*bw/4,210,bx+i*bw/4,260,{c:INK,w:1.5},.05);
  A.text(130,240,'3/4',{size:24,c:PK});
  A.say("The second shaded part reaches farther, so three quarters is larger than two thirds.",
        "দ্বিতীয় ছায়াযুক্ত অংশ আরও দূরে যায়, তাই তিন-চতুর্থাংশ দুই-তৃতীয়াংশের চেয়ে বড়।");
  A.say("To prove it, use a common denominator. Twelve works for both.",
        "প্রমাণ করতে সাধারণ হর ব্যবহার করো। দুইটির জন্যই বারো কাজ করে।");
  A.text(400,300,'2/3 = 8/12      3/4 = 9/12',{size:26,c:VI});
  A.text(400,345,'8/12 < 9/12  so  2/3 < 3/4',{size:24,c:AM});
  A.say("Another check is cross multiplication: 2 × 4 = 8 and 3 × 3 = 9.",
        "আরেকটি পরীক্ষা ক্রস গুণ: ২ × ৪ = ৮ আর ৩ × ৩ = ৯।");
  A.text(400,385,'2 × 4 = 8    3 × 3 = 9',{size:20,c:MU});
  NOTE(A,448,'same whole bars must be used for a fair compare.');
});

lesson('c15-209','Adding fractions with the same denominator','Add the parts, keep the size',A=>{
  A.say("The denominator tells the size of each part. Here every part is one fifth.",
        "হর বলে প্রতিটি অংশের আকার। এখানে প্রতিটি অংশ এক-পঞ্চমাংশ।");
  const bx=180, bw=500;
  A.rect(bx,140,bw,60,{c:INK,w:2},.15);
  for(let i=1;i<5;i++) A.line(bx+i*bw/5,140,bx+i*bw/5,200,{c:INK,w:1.5},.05);
  A.rect(bx,140,2*bw/5,60,{c:SK,w:0,fill:SK,fo:.38},.15);
  A.rect(bx+2*bw/5,140,bw/5,60,{c:GR,w:0,fill:GR,fo:.38},.15);
  A.text(bx+bw/5,125,'2/5',{size:18,c:SK});
  A.text(bx+bw/2,125,'1/5',{size:18,c:GR});
  A.say("Shade two fifths, then one more fifth. Together three fifths are shaded.",
        "দুই-পঞ্চমাংশ ছায়া করো, তারপর আরও এক-পঞ্চমাংশ। মিলে তিন-পঞ্চমাংশ ছায়াযুক্ত হয়।");
  A.text(400,235,'2/5 + 1/5 = 3/5',{size:26,c:AM});
  A.say("Add only the numerators: 2 + 1 = 3. The denominator stays 5.",
        "শুধু লবগুলো যোগ করো: ২ + ১ = ৩। হর ৫ থাকে।");
  A.text(400,290,'2 + 1 = 3   and the denominator stays 5',{size:20,c:INK});
  A.say("The answer is three fifths. We do not add the denominators.",
        "উত্তর তিন-পঞ্চমাংশ। আমরা হরগুলো যোগ করি না।");
  A.text(400,340,'wrong: 2/5 + 1/5 = 3/10',{size:18,c:RD});
  A.text(400,380,'right: 3/5',{size:22,c:GR});
  NOTE(A,448,'same denominator: add the top numbers only.');
});

lesson('c15-210','Subtracting fractions with the same denominator','Take parts away',A=>{
  A.say("Subtraction takes parts away. Here we start with four sixths.",
        "বিয়োগ অংশ সরিয়ে নেয়। এখানে আমরা চার-ষষ্ঠাংশ দিয়ে শুরু করি।");
  const bx=180, bw=480;
  A.rect(bx,140,bw,60,{c:INK,w:2},.15);
  for(let i=1;i<6;i++) A.line(bx+i*bw/6,140,bx+i*bw/6,200,{c:INK,w:1.5},.04);
  A.rect(bx,140,4*bw/6,60,{c:SK,w:0,fill:SK,fo:.38},.15);
  A.text(bx+bw/2,125,'4/6 shaded',{size:18,c:SK});
  A.say("Cross out one sixth. Three shaded sixths remain.",
        "এক-ষষ্ঠাংশ কেটে দাও। তিনটি ছায়াযুক্ত ষষ্ঠাংশ থাকে।");
  const cx=bx+4*bw/6-bw/12;
  A.line(cx-25,150,cx+25,190,{c:RD,w:4},.2);
  A.line(cx+25,150,cx-25,190,{c:RD,w:4},.2);
  A.say("Subtract the numerators: 4 - 1 = 3. Keep the denominator 6.",
        "লব বিয়োগ করো: ৪ - ১ = ৩। হর ৬ অপরিবর্তিত রাখো।");
  A.text(400,265,'4/6 - 1/6 = 3/6',{size:28,c:AM});
  A.say("Three sixths is the same as one half, so we can simplify.",
        "তিন-ষষ্ঠাংশ এক-দ্বিতীয়াংশের সমান, তাই সরল করা যায়।");
  A.text(400,320,'3/6 = 1/2',{size:26,c:GR});
  A.text(400,370,'both 3 and 6 divide by 3',{size:18,c:MU});
  NOTE(A,448,'subtract the top numbers, keep the bottom number.');
});

lesson('c15-211','Multiplying a fraction by a whole number','Repeated equal parts',A=>{
  A.say("Three times two fifths means three groups of two fifths.",
        "তিন গুণ দুই-পঞ্চমাংশ মানে দুই-পঞ্চমাংশের তিনটি দল।");
  const bx=110, bw=220;
  for(let g=0;g<3;g++){
    const y=120+g*80;
    A.rect(bx,y,bw,46,{c:INK,w:2},.12);
    for(let i=1;i<5;i++) A.line(bx+i*bw/5,y,bx+i*bw/5,y+46,{c:INK,w:1.2},.03);
    A.rect(bx,y,2*bw/5,46,{c:SK,w:0,fill:SK,fo:.4},.1);
    A.text(bx-18,y+28,'2/5',{size:18,c:SK,anchor:'end'});
  }
  A.say("Each group shades two fifths. Adding them gives two fifths three times.",
        "প্রতিটি দলে দুই-পঞ্চমাংশ ছায়া থাকে। যোগ করলে দুই-পঞ্চমাংশ তিনবার পাওয়া যায়।");
  A.text(560,150,'2/5 + 2/5 + 2/5',{size:22,c:INK});
  A.text(560,195,'= 6/5',{size:30,c:AM});
  A.say("Multiply the numerator by 3: 2 × 3 = 6. The denominator stays 5.",
        "লবকে ৩ দিয়ে গুণ করো: ২ × ৩ = ৬। হর ৫ থাকে।");
  A.text(560,255,'2 × 3',{size:26,c:GR});
  A.line(510,272,610,272,{c:INK,w:2});
  A.text(560,300,'5',{size:26,c:GR});
  A.text(560,340,'= 6/5',{size:26,c:AM});
  A.say("Six fifths is one whole and one fifth. We write it as one and one fifth.",
        "ছয়-পঞ্চমাংশ এক সম্পূর্ণ আর এক-পঞ্চমাংশ। লিখি এক পূর্ণ এক-পঞ্চমাংশ।");
  A.text(400,410,'6/5 = 1 1/5',{size:28,c:PK});
  NOTE(A,455,'multiply the top, keep the bottom.');
});

lesson('c15-212','Decimals: tenths and hundredths','Places after the point',A=>{
  A.say("After the decimal point the places are tenths, then hundredths.",
        "দশমিক বিন্দুর পরে স্থান হলো দশমাংশ, তারপর শতাংশ।");
  A.rect(110,80,540,110,{c:INK,w:2},.15);
  A.line(110,125,650,125,{c:INK,w:1.5});
  A.line(290,80,290,190,{c:INK,w:1.5});
  A.line(470,80,470,190,{c:INK,w:1.5});
  A.text(200,110,'ones',{size:20,c:MU});
  A.text(380,110,'tenths',{size:20,c:MU});
  A.text(560,110,'hundredths',{size:20,c:MU});
  A.text(200,170,'3',{size:32,c:SK});
  A.text(288,168,'.',{size:30,c:RD});
  A.text(380,170,'4',{size:32,c:GR});
  A.text(560,170,'7',{size:32,c:PK});
  A.say("The number 3.47 has 3 ones, 4 tenths and 7 hundredths.",
        "সংখ্যা ৩.৪৭-এ আছে ৩ একক, ৪ দশমাংশ আর ৭ শতাংশ।");
  A.text(400,225,'3.47 = 3 + 4/10 + 7/100',{size:24,c:VI});
  A.say("A hundredths grid shows 0.47 as forty-seven small squares.",
        "শতাংশ গ্রিডে ০.৪৭ দেখায় সাতচল্লিশটি ছোট বর্গ।");
  const gx=305, gy=245, cell=19;
  for(let c=0;c<4;c++) A.rect(gx+c*cell,gy,cell,10*cell,{c:SK,w:0,fill:SK,fo:.7},.05);
  for(let r=0;r<7;r++) A.rect(gx+4*cell,gy+r*cell,cell,cell,{c:SK,w:0,fill:SK,fo:.7},.03);
  for(let i=0;i<=10;i++){
    A.line(gx+i*cell,gy,gx+i*cell,gy+10*cell,{c:MU,w:1},.01);
    A.line(gx,gy+i*cell,gx+10*cell,gy+i*cell,{c:MU,w:1},.01);
  }
  A.text(610,290,'0.47',{size:28,c:SK});
  A.text(610,330,'47 shaded',{size:18,c:INK});
  A.text(610,360,'of 100',{size:18,c:INK});
  A.text(610,395,'= 47/100',{size:20,c:AM});
  A.say("One tenth equals ten hundredths, so tenths are bigger parts.",
        "এক-দশমাংশ সমান দশ-শতাংশ, তাই দশমাংশ বড় অংশ।");
  A.text(610,430,'1/10 = 10/100',{size:18,c:GR});
  NOTE(A,462,'the place tells how many parts of that size.');
});

lesson('c15-213','Adding decimals by lining up points','Put the points in a column',A=>{
  A.say("Write the numbers one under another with the decimal points in a straight column.",
        "সংখ্যাগুলো একটির নিচে আরেকটি লেখো যাতে দশমিক বিন্দু সোজা কলামে থাকে।");
  A.text(240,95,'ones',{size:17,c:MU});
  A.text(360,95,'tenths',{size:17,c:MU});
  A.text(420,95,'hundredths',{size:17,c:MU});
  A.text(300,120,'.',{size:28,c:RD});
  A.text(240,155,'3',{size:30,c:SK});
  A.text(300,155,'.',{size:30,c:RD});
  A.text(360,155,'4',{size:30,c:SK});
  A.text(420,155,'0',{size:22,c:MU});
  A.say("Write 3.4 as 3.40 so it has two decimal places like 1.25.",
        "৩.৪-কে ৩.৪০ লেখো যাতে ১.২৫-এর মতো দুই দশমিক স্থান হয়।");
  A.text(180,215,'+',{size:32,c:INK});
  A.text(240,215,'1',{size:30,c:GR});
  A.text(300,215,'.',{size:30,c:RD});
  A.text(360,215,'2',{size:30,c:GR});
  A.text(420,215,'5',{size:30,c:GR});
  A.line(180,240,470,240,{c:INK,w:3});
  A.say("Add the hundredths, then the tenths, then the ones, just like whole numbers.",
        "শতাংশ, তারপর দশমাংশ, তারপর একক যোগ করো, পূর্ণ সংখ্যার মতোই।");
  A.text(240,275,'4',{size:30,c:AM});
  A.text(300,275,'.',{size:30,c:RD});
  A.text(360,275,'6',{size:30,c:AM});
  A.text(420,275,'5',{size:30,c:AM});
  A.say("0 + 5 = 5 hundredths, 4 + 2 = 6 tenths, 3 + 1 = 4 ones.",
        "০ + ৫ = ৫ শতাংশ, ৪ + ২ = ৬ দশমাংশ, ৩ + ১ = ৪ একক।");
  A.say("Bring the decimal point straight down. The answer is 4.65.",
        "দশমিক বিন্দু সোজা নিচে আনো। উত্তর ৪.৬৫।");
  A.text(400,350,'3.40 + 1.25 = 4.65',{size:28,c:VI});
  A.text(400,395,'points lined up -> correct answer',{size:18,c:MU});
  NOTE(A,448,'never add digits from different place values.');
});

lesson('c15-214','Perimeter of a rectangle','Walk around the edge',A=>{
  A.say("Perimeter is the distance all the way around a shape.",
        "পরিসীমা হলো একটি আকৃতির চারপাশ দিয়ে সম্পূর্ণ ঘুরে আসার দূরত্ব।");
  const x=200, y=140, w=300, h=180;
  A.rect(x,y,w,h,{c:SK,w:3,fill:SK,fo:.08},.2);
  A.text(x+w/2,y-18,'5 cm',{size:20,c:SK});
  A.text(x-12,y+h/2,'3 cm',{size:20,c:SK,anchor:'end'});
  A.say("Its top and bottom are 5 cm. Its left and right sides are 3 cm.",
        "এর উপরের আর নিচের বাহু ৫ সেমি। বাঁ আর ডান বাহু ৩ সেমি।");
  A.arrow(x,y+h+18,x+w,y+h+18,{c:AM,w:3});
  A.text(x+w/2,y+h+45,'5 cm',{size:18,c:AM});
  A.arrow(x+w+22,y+h,x+w+22,y,{c:GR,w:3});
  A.text(x+w+45,y+h/2,'3 cm',{size:18,c:GR,anchor:'start'});
  A.say("Add the four sides: 5 + 3 + 5 + 3 = 16 centimetres.",
        "চার বাহু যোগ করো: ৫ + ৩ + ৫ + ৩ = ১৬ সেন্টিমিটার।");
  A.text(400,390,'5 + 3 + 5 + 3 = 16 cm',{size:26,c:AM});
  A.say("Opposite sides are equal, so we can also do 2 × (5 + 3) = 16 cm.",
        "বিপরীত বাহু সমান, তাই ২ × (৫ + ৩) = ১৬ সেমি-ও করা যায়।");
  A.text(400,425,'2 × (5 + 3) = 16 cm',{size:24,c:GR});
  NOTE(A,458,'perimeter is a length, so use centimetres.');
});

lesson('c15-215','Area of a rectangle','Count the square units',A=>{
  A.say("Area is the amount of space inside a shape. We measure it in square units.",
        "ক্ষেত্রফল হলো আকৃতির ভেতরের জায়গার পরিমাণ। একক বর্গ দিয়ে এটি মাপি।");
  const x=200, y=120, cell=70, cols=5, rows=3;
  for(let c=0;c<=cols;c++) A.line(x+c*cell,y,x+c*cell,y+rows*cell,{c:MU,w:1},.01);
  for(let r=0;r<=rows;r++) A.line(x,y+r*cell,x+cols*cell,y+r*cell,{c:MU,w:1},.01);
  A.rect(x,y,cols*cell,rows*cell,{c:SK,w:3},.15);
  A.text(x+cols*cell/2,y-16,'5 cm',{size:20,c:SK});
  A.text(x-12,y+rows*cell/2,'3 cm',{size:20,c:SK,anchor:'end'});
  A.say("The rectangle is 5 centimetres long and 3 centimetres wide.",
        "আয়তক্ষেত্রটি ৫ সেন্টিমিটার লম্বা আর ৩ সেন্টিমিটার চওড়া।");
  A.say("Inside there are 3 rows of 5 unit squares, so 5 × 3 = 15 squares.",
        "ভেতরে ৫টি একক বর্গের ৩টি সারি আছে, তাই ৫ × ৩ = ১৫ বর্গ।");
  A.rect(x,y,cols*cell,cell,{c:AM,w:2,fill:AM,fo:.18},.2);
  A.text(400,360,'Area = length × width',{size:26,c:AM});
  A.text(400,405,'Area = 5 × 3 = 15 square cm',{size:24,c:GR});
  A.say("The answer is 15 square centimetres, written as 15 cm².",
        "উত্তর ১৫ বর্গ সেন্টিমিটার, লেখা হয় ১৫ বর্গসেমি।");
  NOTE(A,452,'area is measured in square units.');
});

lesson('c15-216','Area of a right triangle','Half of a rectangle',A=>{
  A.say("A right triangle is half of a rectangle that has the same base and height.",
        "সমকোণী ত্রিভুজ একই ভূমি আর উচ্চতার আয়তক্ষেত্রের অর্ধেক।");
  const x=230, y=100, cell=60, cols=6, rows=4;
  A.rect(x,y,cols*cell,rows*cell,{c:MU,w:2},.15);
  A.pts([[x,y+rows*cell],[x+cols*cell,y+rows*cell],[x,y]],{c:SK,w:3,fill:SK,fo:.22},.3);
  A.line(x,y,x+cols*cell,y+rows*cell,{c:AM,w:2.5},.25);
  A.line(x+cols*cell,y,x+cols*cell,y+rows*cell,{c:MU,w:2},.1);
  A.line(x,y,x,y+rows*cell,{c:MU,w:2},.1);
  A.line(x,y+rows*cell-20,x+20,y+rows*cell-20,{c:GR,w:2},.1);
  A.line(x+20,y+rows*cell-20,x+20,y+rows*cell,{c:GR,w:2},.1);
  A.text(x+cols*cell/2,y+rows*cell+28,'base = 6 cm',{size:20,c:SK});
  A.text(x-14,y+rows*cell/2,'height = 4 cm',{size:20,c:SK,anchor:'end'});
  A.say("The rectangle is 6 centimetres by 4 centimetres, so its area is 24 square centimetres.",
        "আয়তক্ষেত্রটি ৬ সেন্টিমিটার বাই ৪ সেন্টিমিটার, তাই এর ক্ষেত্রফল ২৪ বর্গ সেন্টিমিটার।");
  A.say("The triangle covers exactly half of that rectangle.",
        "ত্রিভুজটি সেই আয়তক্ষেত্রের ঠিক অর্ধেক জায়গা ঢাকে।");
  A.say("The base and the height meet at the right angle.",
        "ভূমি আর উচ্চতা সমকোণে মেলে।");
  A.text(400,400,'Area = ½ × base × height',{size:24,c:AM});
  A.text(400,438,'Area = ½ × 6 × 4 = 12 square cm',{size:20,c:GR});
  A.say("So the area of this right triangle is 12 square centimetres.",
        "তাই এই সমকোণী ত্রিভুজের ক্ষেত্রফল ১২ বর্গ সেন্টিমিটার।");
  NOTE(A,465,'half of base times height.');
});

lesson('c15-217','Lines of symmetry in letters','Fold to match both halves',A=>{
  A.say("A line of symmetry folds a shape into two matching halves.",
        "প্রতিসাম্য রেখা আকৃতিকে ভাঁজ করলে দুইটি মিলে যাওয়া অর্ধেক হয়।");
  const letters=['A','H','M','T','F'];
  const xs=[120,260,400,520,640];
  for(let i=0;i<letters.length;i++) A.text(xs[i],175,letters[i],{size:90,c:SK});
  [0,1,2,3].forEach(i=>A.dashed(xs[i],95,xs[i],235,{c:AM,w:2.5}));
  A.dashed(225,155,295,155,{c:GR,w:2.5});
  A.say("A has one vertical line. M and T also have one vertical line.",
        "A-এর একটি উল্লম্ব রেখা আছে। M আর T-এরও একটি উল্লম্ব রেখা আছে।");
  A.say("H has two lines: one vertical and one horizontal.",
        "H-এর দুইটি রেখা: একটি উল্লম্ব আর একটি অনুভূমিক।");
  A.text(120,275,'1',{size:20,c:AM});
  A.text(260,275,'2',{size:20,c:AM});
  A.text(400,275,'1',{size:20,c:AM});
  A.text(520,275,'1',{size:20,c:AM});
  A.text(640,275,'0',{size:20,c:RD});
  A.say("The letter F has no line of symmetry, because its two halves do not match.",
        "F অক্ষরের কোনো প্রতিসাম্য রেখা নেই, কারণ এর দুই অর্ধেক মেলে না।");
  A.text(400,330,'number of symmetry lines',{size:20,c:MU});
  A.text(400,380,'fold along the line: both halves must fit exactly',{size:18,c:INK});
  NOTE(A,450,'letters can have 0, 1 or 2 lines of symmetry.');
});
