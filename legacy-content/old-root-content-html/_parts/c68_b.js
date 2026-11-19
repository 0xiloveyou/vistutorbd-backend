/* Part B: integers, powers, algebra and percentages */

lesson('c68-201','Adding integers on the number line','Add a positive: step right; add a negative: step left',A=>{
  A.say('Adding a positive integer moves you to the right on the number line.',
        'ধনাত্মক পূর্ণসংখ্যা যোগ করলে সংখ্যারেখায় ডানে এগোতে হয়।');
  A.line(80,260,730,260,{c:MU,w:2.5},.6);
  for(let i=-8;i<=8;i++){
    const x=400+i*38;
    A.line(x,252,x,268,{c:MU,w:2},.06);
    A.text(x,286,String(i),{size:15,c:INK});
  }
  A.say('Start at -3 and add 5: take five steps right and land on 2.',
        '−৩ থেকে শুরু করে ৫ যোগ করি: ডানে পাঁচ ধাপ গেলে পৌঁছাই ২-এ।');
  A.arrow(286,213,476,213,{c:GR,w:3},.8);
  A.text(381,190,'-3 + 5 = 2',{size:22,c:GR});
  A.say('Adding a negative integer moves you to the left, so 4 + (-6) = -2.',
        'ঋণাত্মক পূর্ণসংখ্যা যোগ করলে বাঁয়ে যেতে হয়, তাই ৪ + (−৬) = −২।');
  A.arrow(552,330,324,330,{c:PK,w:3},.8);
  A.text(438,360,'4 + (-6) = -2',{size:22,c:PK});
  A.say('The sign of the number you add decides the direction; the size decides how far.',
        'যে সংখ্যাটি যোগ করছি তার চিহ্ন দিক ঠিক করে, আর তার মান দূরত্ব ঠিক করে।');
  A.text(400,405,'sign -> direction      size -> distance',{size:19,c:AM});
  NOTE(A,445,'a positive addend goes right, a negative one goes left.');
});

lesson('c68-202','Subtracting a negative by cancelling debt','a - (-b) is the same as a + b',A=>{
  A.say('Subtracting a negative is the same as adding its opposite.',
        'ঋণাত্মক সংখ্যা বিয়োগ করা মানে তার বিপরীত সংখ্যা যোগ করা।');
  A.rect(140,88,520,56,{c:SK,w:2.5,fill:SK,fo:.10},.4);
  A.text(400,124,'a - (-b)  =  a + b',{size:30,c:SK});
  A.say('On the line, 7 - (-4) is two turns: face left, then step backwards, so you move right.',
        'সংখ্যারেখায় ৭ − (−৪) দুইবার ঘোরার মতো: বাঁয়ে মুখ করে পিছনে পা রাখলে ডানেই এগোই।');
  A.text(210,190,'-',{size:52,c:PK});
  A.text(268,190,'-',{size:52,c:PK});
  A.arrow(305,175,405,175,{c:MU,w:2.5},.5);
  A.text(455,190,'+',{size:52,c:GR});
  A.text(550,178,'move right',{size:17,c:GR,anchor:'start'});
  A.say('Rewrite every double negative as a plus: 7 - (-4) = 7 + 4 = 11.',
        'প্রতিটি দুইবার বিয়োগফলকে যোগে লেখো: ৭ − (−৪) = ৭ + ৪ = ১১।');
  const rows=[['7 - (-4)','7 + 4','11'],['5 - (-2)','5 + 2','7'],['-3 - (-6)','-3 + 6','3']];
  rows.forEach((r,i)=>{
    const y=230+i*48;
    A.rect(120,y,560,40,{c:SK,w:1.5,fill:SK,fo:.06},.2);
    A.text(250,y+27,r[0],{size:20,c:INK});
    A.text(420,y+27,'=',{size:20,c:MU});
    A.text(505,y+27,r[1],{size:20,c:AM});
    A.text(640,y+27,'= '+r[2],{size:20,c:GR});
  });
  A.say('This is like cancelling a debt of 4, which raises your money by 4.',
        'এটি ৪ টাকার ঋণ মিটিয়ে দেওয়ার মতো, যাতে তোমার টাকা ৪ বেড়ে যায়।');
  A.text(400,405,'a debt removed is money gained',{size:19,c:AM});
  NOTE(A,445,'minus a minus makes a plus.');
});

lesson('c68-203','Multiplying integers: the sign table','Multiply the sizes, then fix the sign',A=>{
  A.say('Multiply the sizes first, then decide the sign from the two signs.',
        'আগে সংখ্যাগুলোর মান গুণ করি, তারপর দুই চিহ্ন দেখে চিহ্ন ঠিক করি।');
  A.rect(230,146,170,62,{c:MU,w:2,fill:MU,fo:.10},.3);
  A.rect(430,146,170,62,{c:MU,w:2,fill:MU,fo:.10},.3);
  A.text(315,184,'(+)',{size:26,c:INK});
  A.text(515,184,'(-)',{size:26,c:INK});
  A.text(200,184,'x',{size:20,c:MU,anchor:'end'});
  A.say('Plus times plus is plus, and plus times minus is minus.',
        'ধনাত্মক গুণ ধনাত্মক ধনাত্মক হয়, আর ধনাত্মক গুণ ঋণাত্মক ঋণাত্মক হয়।');
  A.rect(230,216,170,62,{c:GR,w:2,fill:GR,fo:.14},.3);
  A.rect(430,216,170,62,{c:PK,w:2,fill:PK,fo:.14},.3);
  A.text(315,252,'+  3 x 4 = 12',{size:17,c:GR});
  A.text(515,252,'-  3 x (-4) = -12',{size:17,c:PK});
  A.say('Minus times plus is minus, and minus times minus is plus.',
        'ঋণাত্মক গুণ ধনাত্মক ঋণাত্মক হয়, আর ঋণাত্মক গুণ ঋণাত্মক ধনাত্মক হয়।');
  A.rect(230,286,170,62,{c:PK,w:2,fill:PK,fo:.14},.3);
  A.rect(430,286,170,62,{c:GR,w:2,fill:GR,fo:.14},.3);
  A.text(315,322,'-  (-3) x 4 = -12',{size:17,c:PK});
  A.text(515,322,'+  (-3) x (-4) = 12',{size:17,c:GR});
  A.say('The second minus reverses the first, so two negatives give a positive product.',
        'দ্বিতীয় বিয়োগ প্রথমটিকে উল্টে দেয়, তাই দুই ঋণাত্মক মিলে ধনাত্মক গুণফল দেয়।');
  A.text(400,395,'same signs -> plus      different signs -> minus',{size:20,c:AM});
  NOTE(A,445,'the sign of the product comes from counting minus signs.');
});

lesson('c68-204','Dividing integers: check with multiplication','Every division hides a multiplication fact',A=>{
  A.say('Division asks how many times the divisor fits, and the sign rule matches multiplication.',
        'ভাগ বলে ভাজক কতবার বসে, আর চিহ্নের নিয়ম গুণের মতোই।');
  A.text(400,105,'12 / 3 = 4',{size:34,c:SK});
  A.text(400,148,'because 3 x 4 = 12',{size:19,c:MU});
  A.say('A positive divided by a positive gives a positive quotient, because 3 x 4 = 12.',
        'ধনাত্মককে ধনাত্মক দিয়ে ভাগ করলে ভাগফল ধনাত্মক হয়, কারণ ৩ × ৪ = ১২।');
  A.text(400,210,'-12 / 3 = -4',{size:34,c:PK});
  A.text(400,253,'because 3 x (-4) = -12',{size:19,c:MU});
  A.say('A negative divided by a positive gives a negative quotient.',
        'ঋণাত্মককে ধনাত্মক দিয়ে ভাগ করলে ভাগফল ঋণাত্মক হয়।');
  A.text(400,315,'-12 / (-3) = 4',{size:34,c:GR});
  A.text(400,358,'because (-3) x 4 = -12',{size:19,c:MU});
  A.say('Two negatives in a division cancel, so the quotient becomes positive.',
        'ভাগে দুইটি ঋণাত্মক কেটে যায়, তাই ভাগফল ধনাত্মক হয়।');
  A.text(400,415,'multiply back to check every answer',{size:20,c:AM});
  NOTE(A,448,'same signs give plus; different signs give minus.');
});

lesson('c68-205','Order of operations with integers','Brackets, powers, then multiply or divide, then add or subtract',A=>{
  A.say('Order of operations: brackets first, then powers, then multiply or divide, then add or subtract.',
        'ক্রমের নিয়ম: আগে বন্ধনী, তারপর ঘাত, তারপর গুণ বা ভাগ, শেষে যোগ বা বিয়োগ।');
  A.text(400,95,'-3 + 4 x (-2)^2 / 8',{size:32,c:SK});
  A.say('There are no brackets, so the power comes first: (-2)^2 = 4.',
        'কোনো বন্ধনী নেই, তাই আগে ঘাত: (−২)² = ৪।');
  A.rect(150,140,500,44,{c:VI,w:2,fill:VI,fo:.10},.3);
  A.text(175,169,'1. power:  (-2)^2 = 4',{size:21,c:VI,anchor:'start'});
  A.say('Then multiply and divide from left to right: 4 x 4 = 16 and 16 / 8 = 2.',
        'তারপর বাঁ থেকে ডানে গুণ ও ভাগ: ৪ × ৪ = ১৬ এবং ১৬ ÷ ৮ = ২।');
  A.rect(150,198,500,44,{c:VI,w:2,fill:VI,fo:.10},.3);
  A.text(175,227,'2. x and / :  4 x 4 = 16, then 16 / 8 = 2',{size:20,c:VI,anchor:'start'});
  A.say('Finally add: -3 + 2 = -1.',
        'সবশেষে যোগ: −৩ + ২ = −১।');
  A.rect(150,256,500,44,{c:VI,w:2,fill:VI,fo:.10},.3);
  A.text(175,285,'3. add:  -3 + 2 = -1',{size:21,c:VI,anchor:'start'});
  A.say('Write one step per line so no operation is skipped.',
        'প্রতিটি ধাপ আলাদা লাইনে লেখো, যাতে কোনো কাজ বাদ না পড়ে।');
  A.text(400,345,'-3 + 4 x (-2)^2 / 8 = -1',{size:26,c:GR});
  A.text(400,405,'power, then x and /, then + and -',{size:19,c:MU});
  NOTE(A,445,'the power belongs only to its own base.');
});

lesson('c68-206','Powers: base and exponent','2^5 means five copies of 2 multiplied',A=>{
  A.say('A power is a short way to write repeated multiplication.',
        'ঘাত হলো বারবার গুণ লেখার সংক্ষিপ্ত উপায়।');
  A.text(320,170,'2',{size:64,c:SK});
  A.text(372,128,'5',{size:34,c:AM});
  A.arrow(215,210,288,182,{c:SK,w:2},.3);
  A.text(205,215,'base 2',{size:17,c:SK,anchor:'end'});
  A.arrow(445,112,388,124,{c:AM,w:2},.3);
  A.text(455,112,'exponent 5',{size:17,c:AM,anchor:'start'});
  A.say('In 2^5, the base 2 is the factor and the exponent 5 tells how many copies.',
        '২⁵-এ ভিত্তি ২ হলো গুণনীয়ক, আর সূচক ৫ বলে কতটি কপি আছে।');
  A.text(400,290,'2 x 2 x 2 x 2 x 2 = 32',{size:26,c:GR});
  A.say('So 2^5 = 32, and 10^3 = 10 x 10 x 10 = 1000.',
        'তাই ২⁵ = ৩২, এবং ১০³ = ১০ × ১০ × ১০ = ১০০০।');
  const v=[2,4,8,16,32,64];
  v.forEach((n,i)=>{
    A.rect(110+i*95,340,80,42,{c:SK,w:1.8,fill:SK,fo:.08},.2);
    A.text(150+i*95,368,String(n),{size:18,c:INK});
  });
  A.say('Brackets matter: (-2)^4 = 16 but -2^4 = -16.',
        'বন্ধনী গুরুত্বপূর্ণ: (−২)⁴ = ১৬ কিন্তু −২⁴ = −১৬।');
  A.text(400,425,'(-2)^4 = 16      -2^4 = -16',{size:21,c:PK});
  NOTE(A,462,'the exponent counts factors, not values.');
});

lesson('c68-207','Laws of exponents for the same base','Three rules: add, subtract and multiply the exponents',A=>{
  A.say('When the bases are the same, exponents follow three short laws.',
        'ভিত্তি একই হলে সূচক তিনটি সহজ নিয়ম মানে।');
  A.rect(90,88,620,92,{c:SK,w:2.5,fill:SK,fo:.10},.4);
  A.text(400,120,'a^m x a^n = a^(m+n)',{size:26,c:SK});
  A.text(400,156,'2^3 x 2^4 = 2^7',{size:20,c:AM});
  A.say('Multiplying adds the exponents, because the copies are joined together.',
        'গুণে সূচক যোগ হয়, কারণ কপিগুলো একসাথে জুড়ে যায়।');
  A.rect(90,196,620,92,{c:GR,w:2.5,fill:GR,fo:.10},.4);
  A.text(400,228,'a^m / a^n = a^(m-n)',{size:26,c:GR});
  A.text(400,264,'3^5 / 3^2 = 3^3',{size:20,c:AM});
  A.say('Dividing subtracts them, because equal factors cancel.',
        'ভাগে সূচক বিয়োগ হয়, কারণ সমান গুণনীয়ক কেটে যায়।');
  A.rect(90,304,620,92,{c:VI,w:2.5,fill:VI,fo:.10},.4);
  A.text(400,336,'(a^m)^n = a^(m x n)',{size:26,c:VI});
  A.text(400,372,'(5^2)^3 = 5^6',{size:20,c:AM});
  A.say('A power of a power multiplies them, because n groups of m copies are m x n copies.',
        'ঘাতের ঘাতে সূচক গুণ হয়, কারণ m কপির n দল মিলে m × n কপি হয়।');
  NOTE(A,445,'the base must be the same: 2^3 x 3^2 does not combine.');
});

lesson('c68-208','Square roots of perfect squares','The root undoes the square',A=>{
  A.say('A square root undoes squaring: it asks which number multiplied by itself gives the inside.',
        'বর্গমূল বর্গ করার কাজ উল্টায়: কোন সংখ্যা নিজে দিয়ে গুণ করলে ভেতরের সংখ্যা হয়, তা জিজ্ঞেস করে।');
  const roots=[1,2,3,4,5,6];
  roots.forEach((n,i)=>{
    const x=104+i*100;
    A.rect(x,86,92,66,{c:SK,w:1.8,fill:SK,fo:.08},.2);
    A.text(x+46,116,String(n*n),{size:20,c:SK});
    A.text(x+46,140,'root '+n,{size:13,c:MU});
  });
  A.say('Because 1, 4, 9, 16, 25 and 36 come from 1^2 to 6^2, their roots are whole numbers.',
        '১, ৪, ৯, ১৬, ২৫ ও ৩৬ আসে ১² থেকে ৬² পর্যন্ত, তাই এদের মূল পূর্ণসংখ্যা।');
  const L=320,T=175,S=160;
  A.rect(L,T,S,S,{c:AM,w:3,fill:AM,fo:.08},.5);
  for(let i=1;i<12;i++){
    A.line(L+S*i/12,T,L+S*i/12,T+S,{c:MU,w:.7},.05);
    A.line(L,T+S*i/12,L+S,T+S*i/12,{c:MU,w:.7},.05);
  }
  A.text(L+S/2,T+S/2,'12 x 12 = 144',{size:20,c:AM});
  A.text(L-12,T+18,'12',{size:18,c:MU,anchor:'end'});
  A.text(L+S/2,T+S+24,'12',{size:18,c:MU});
  A.say('For 144 the square of 12 is 144, so the root is 12, as the square grid shows.',
        '১৪৪-এর জন্য ১২-এর বর্গ ১৪৪, তাই মূল ১২, যেমন বর্গের গ্রিড দেখাচ্ছে।');
  A.text(400,400,'sqrt(144) = 12    because 12 x 12 = 144',{size:24,c:GR});
  A.say('Only perfect squares give exact whole-number roots.',
        'শুধু পূর্ণবর্গ সংখ্যাই সঠিক পূর্ণসংখ্যার মূল দেয়।');
  NOTE(A,445,'the root is the side length of the square.');
});

lesson('c68-209','Cube roots of perfect cubes','The root is the side of a cube',A=>{
  A.say('A cube root asks which number multiplied by itself three times gives the inside.',
        'ঘনমূল জিজ্ঞেস করে কোন সংখ্যাকে তিনবার নিজে দিয়ে গুণ করলে ভেতরের সংখ্যা হয়।');
  const v=[1,8,27,64,125,216];
  v.forEach((n,i)=>{
    const h=14+n*0.8;
    A.rect(120+i*100,370-h,52,h,{c:SK,w:2,fill:SK,fo:.16},.3);
    A.text(146+i*100,370-h-12,String(n),{size:16,c:SK});
    A.text(146+i*100,390,String(i+1),{size:16,c:INK});
  });
  A.say('The cubes are 1, 8, 27, 64, 125 and 216, and their roots are 1 to 6.',
        'ঘনগুলো ১, ৮, ২৭, ৬৪, ১২৫ ও ২১৬, আর এদের মূল ১ থেকে ৬।');
  A.say('So the cube root of 125 is 5, because 5 x 5 x 5 = 125.',
        'তাই ১২৫-এর ঘনমূল ৫, কারণ ৫ × ৫ × ৫ = ১২৫।');
  A.rect(520,256,52,114,{c:GR,w:3,fill:GR,fo:.28},.4);
  A.say('Notice how the cube values grow much faster than the roots.',
        'খেয়াল করো, ঘনগুলোর মান মূলের চেয়ে অনেক দ্রুত বাড়ে।');
  A.text(400,430,'cube root of 125 = 5',{size:22,c:GR});
  NOTE(A,462,'cube roots grow slowly while the cubes grow fast.');
});

lesson('c68-210','Collecting like terms with tiles','Same letter and same power combine',A=>{
  A.say('Simplify by collecting like terms: same letter and same power belong together.',
        'সদৃশ পদ একত্র করে সরল করি: একই অক্ষর ও একই ঘাত একসাথে থাকে।');
  for(let i=0;i<3;i++){ A.rect(100+i*92,100,74,28,{c:SK,w:2,fill:SK,fo:.18},.2); A.text(137+i*92,120,'x',{size:17,c:SK}); }
  for(let i=0;i<5;i++){ A.rect(420+i*40,100,28,28,{c:GR,w:2,fill:GR,fo:.18},.15); A.text(434+i*40,120,'1',{size:14,c:GR}); }
  A.text(390,120,'+',{size:22,c:MU});
  A.say('In 3x + 5 + 2x - 1, the x terms are 3x and 2x, giving 5x.',
        '৩x + ৫ + ২x − ১-এ x-এর পদ ৩x ও ২x, মিলে ৫x হয়।');
  for(let i=0;i<2;i++){ A.rect(100+i*92,165,74,28,{c:SK,w:2,fill:SK,fo:.18},.2); A.text(137+i*92,185,'x',{size:17,c:SK}); }
  A.rect(420,165,28,28,{c:RD,w:2,fill:RD,fo:.25},.2); A.text(434,185,'-1',{size:13,c:INK});
  A.text(390,185,'-',{size:22,c:MU});
  A.say('The plain numbers 5 and -1 combine to 4.',
        'শুধু সংখ্যাগুলো ৫ ও −১ মিলে ৪ হয়।');
  for(let i=0;i<5;i++){ A.rect(100+i*80,275,66,28,{c:SK,w:2,fill:SK,fo:.18},.2); A.text(133+i*80,295,'x',{size:16,c:SK}); }
  for(let i=0;i<4;i++){ A.rect(560+i*36,276,26,26,{c:GR,w:2,fill:GR,fo:.18},.15); A.text(573+i*36,295,'1',{size:13,c:GR}); }
  A.say('The result is 5x + 4, which is shorter but equal for every x.',
        'ফল ৫x + ৪, যা ছোট কিন্তু প্রতিটি x-এর জন্য সমান।');
  A.text(400,345,'5x + 4',{size:32,c:AM});
  NOTE(A,445,'3x + 2x = 5x, but 3x + 2y cannot be added.');
});

lesson('c68-211','Expanding a bracket with a negative factor','The factor multiplies every term inside',A=>{
  A.say('A bracket is multiplied by the factor in front of it, term by term.',
        'বন্ধনীর সামনের গুণনীয়কটি বন্ধনীর প্রতিটি পদে গুণ হয়।');
  A.text(400,110,'-2(3x - 5)',{size:38,c:SK});
  A.arrow(345,135,300,170,{c:PK,w:2.5},.4);
  A.arrow(455,135,500,170,{c:PK,w:2.5},.4);
  A.text(280,196,'-6x',{size:26,c:PK});
  A.text(520,196,'+10',{size:26,c:GR});
  A.say('With a negative factor the signs change: -2 times 3x is -6x and -2 times -5 is +10.',
        'গুণনীয়ক ঋণাত্মক হলে চিহ্ন বদলায়: −২ গুণ ৩x = −৬x এবং −২ গুণ −৫ = +১০।');
  A.text(400,250,'-2(3x - 5) = -6x + 10',{size:26,c:GR});
  A.say('Check with x = 2: the bracket is 6 - 5 = 1, and -2 times 1 is -2.',
        'x = ২ দিয়ে মিলাই: বন্ধনী ৬ − ৫ = ১, আর −২ গুণ ১ = −২।');
  A.rect(170,285,460,58,{c:AM,w:2,fill:AM,fo:.10},.3);
  A.text(400,312,'x = 2:  -2(6 - 5) = -2',{size:19,c:AM});
  A.text(400,332,'and  -12 + 10 = -2  (same)',{size:19,c:AM});
  A.say('The sign travels with each term, so the minus inside also changes.',
        'চিহ্ন প্রতিটি পদের সাথে চলে, তাই ভেতরের বিয়োগও বদলে যায়।');
  A.text(400,390,'-2 x 3x = -6x       -2 x (-5) = +10',{size:20,c:INK});
  NOTE(A,440,'a negative factor flips every sign inside the bracket.');
});

lesson('c68-212','Expanding two brackets in FOIL order','(x + 3)(x - 2) = x^2 + x - 6',A=>{
  A.say('For two brackets, multiply every term in the first by every term in the second.',
        'দুই বন্ধনীতে প্রথম বন্ধনীর প্রতিটি পদকে দ্বিতীয়টির প্রতিটি পদ দিয়ে গুণ করি।');
  A.text(400,100,'(x + 3)(x - 2)',{size:32,c:SK});
  A.say('Use FOIL: First x times x is x^2, Outer x times -2 is -2x.',
        'FOIL ব্যবহার করি: প্রথম x গুণ x = x², বাইরের x গুণ −২ = −২x।');
  const gx=250,gy=152,cw=160,ch=64;
  A.rect(gx,gy,cw,ch,{c:SK,w:2,fill:SK,fo:.12},.25); A.text(gx+cw/2,gy+40,'x^2',{size:24,c:SK});
  A.rect(gx+cw,gy,cw,ch,{c:AM,w:2,fill:AM,fo:.12},.25); A.text(gx+cw+cw/2,gy+40,'-2x',{size:24,c:AM});
  A.rect(gx,gy+ch,cw,ch,{c:AM,w:2,fill:AM,fo:.12},.25); A.text(gx+cw/2,gy+ch+40,'+3x',{size:24,c:AM});
  A.rect(gx+cw,gy+ch,cw,ch,{c:GR,w:2,fill:GR,fo:.12},.25); A.text(gx+cw+cw/2,gy+ch+40,'-6',{size:24,c:GR});
  A.say('Inner 3 times x is 3x, and Last 3 times -2 is -6.',
        'ভেতরের ৩ গুণ x = ৩x, এবং শেষের ৩ গুণ −২ = −৬।');
  A.text(400,320,'x^2 - 2x + 3x - 6',{size:25,c:INK});
  A.say('The middle terms combine: -2x + 3x = x.',
        'মাঝের পদগুলো মেলে: −২x + ৩x = x।');
  A.text(400,375,'x^2 + x - 6',{size:32,c:GR});
  A.say('Four products, then collect like terms, and the expansion is complete.',
        'চারটি গুণফল, তারপর সদৃশ পদ মিলিয়ে সম্প্রসারণ শেষ।');
  NOTE(A,445,'FOIL stands for First, Outer, Inner, Last.');
});

lesson('c68-213','Factorising out the highest common factor','6x^2 + 9x = 3x(2x + 3)',A=>{
  A.say('Factorising is expanding backwards: take out what every term shares.',
        'উৎপাদকে বিশ্লেষণ হলো সম্প্রসারণের উল্টো: সব পদে যা সাধারণ তা বাইরে আনি।');
  A.text(400,95,'6x^2 + 9x',{size:32,c:SK});
  A.say('In 6x^2 + 9x, the number 3 and the letter x appear in both terms, so the HCF is 3x.',
        '৬x² + ৯x-এ ৩ সংখ্যাটি ও x অক্ষরটি দুই পদেই আছে, তাই গ.সা.গু ৩x।');
  A.text(220,150,'6x^2 = 2 x 3 x x x x',{size:19,c:AM,anchor:'start'});
  A.text(220,188,'9x   = 3 x 3 x x',{size:19,c:AM,anchor:'start'});
  A.rect(200,205,170,32,{c:GR,w:2,fill:GR,fo:.18},.3);
  A.text(285,227,'common: 3x',{size:17,c:GR});
  A.say('Take out 3x: 6x^2 divided by 3x is 2x, and 9x divided by 3x is 3.',
        '৩x বাইরে নিই: ৬x² ÷ ৩x = ২x, এবং ৯x ÷ ৩x = ৩।');
  const L=220,T=270,W=420,H=80;
  A.rect(L,T,W,H,{c:SK,w:2.5,fill:SK,fo:.10},.4);
  A.line(L+280,T,L+280,T+H,{c:MU,w:2},.3);
  A.text(L+140,T+18,'2x',{size:18,c:SK});
  A.text(L+350,T+18,'3',{size:18,c:SK});
  A.text(L-10,T+H/2,'3x',{size:18,c:AM,anchor:'end'});
  A.say('So 6x^2 + 9x = 3x(2x + 3); multiply back to check.',
        'তাই ৬x² + ৯x = ৩x(২x + ৩); ফিরে গুণ করে মিলিয়ে দেখো।');
  A.text(400,395,'3x(2x + 3) = 6x^2 + 9x',{size:24,c:GR});
  A.say('Always take out the highest common factor, not just any factor.',
        'সবসময় সর্বোচ্চ সাধারণ গুণনীয়ক বাইরে নাও, যেকোনো গুণনীয়ক নয়।');
  NOTE(A,448,'check by expanding the bracket again.');
});

lesson('c68-214','Factorising a difference of two squares','a^2 - b^2 = (a + b)(a - b)',A=>{
  A.say('A difference of two squares has no middle term, and it factorises into a sum times a difference.',
        'দুই বর্গের বিয়োগে মাঝের পদ থাকে না, আর এটি যোগ ও বিয়োগের গুণফলে ভাঙে।');
  A.rect(150,86,500,54,{c:SK,w:2.5,fill:SK,fo:.10},.4);
  A.text(400,122,'a^2 - b^2 = (a + b)(a - b)',{size:25,c:SK});
  A.say('Expand (a + b)(a - b): a^2 - ab + ab - b^2, and the middle terms cancel.',
        '(a + b)(a − b) সম্প্রসারিত করি: a² − ab + ab − b², মাঝের পদগুলো কেটে যায়।');
  A.text(300,175,'a x a  =  a^2',{size:20,c:SK,anchor:'start'});
  A.text(300,210,'a x (-b) = -ab',{size:20,c:PK,anchor:'start'});
  A.text(300,245,'b x a  = +ab',{size:20,c:PK,anchor:'start'});
  A.text(300,280,'b x (-b) = -b^2',{size:20,c:GR,anchor:'start'});
  A.line(295,222,475,222,{c:MU,w:1.5},.2);
  A.line(295,257,475,257,{c:MU,w:1.5},.2);
  A.say('So x^2 - 49 = x^2 - 7^2 = (x + 7)(x - 7).',
        'তাই x² − ৪৯ = x² − ৭² = (x + ৭)(x − ৭)।');
  A.text(400,320,'x^2 - 49 = (x + 7)(x - 7)',{size:22,c:AM});
  A.say('Likewise 9x^2 - 25 = (3x)^2 - 5^2 = (3x + 5)(3x - 5).',
        'একইভাবে ৯x² − ২৫ = (৩x)² − ৫² = (৩x + ৫)(৩x − ৫)।');
  A.text(400,365,'9x^2 - 25 = (3x + 5)(3x - 5)',{size:22,c:AM});
  A.text(400,410,'both terms must be squares, joined by a minus',{size:18,c:MU});
  NOTE(A,448,'if there is a plus, it does not factorise this way.');
});

lesson('c68-215','Perfect square expansions','(a + b)^2 = a^2 + 2ab + b^2',A=>{
  A.say('A perfect square expansion comes from multiplying a bracket by itself.',
        'পূর্ণবর্গ সম্প্রসারণ আসে একটি বন্ধনীকে নিজে দিয়ে গুণ করলে।');
  A.rect(150,86,500,54,{c:VI,w:2.5,fill:VI,fo:.10},.4);
  A.text(400,122,'(a + b)^2 = a^2 + 2ab + b^2',{size:25,c:VI});
  A.say('In the area model, the two ab rectangles appear twice, so the middle term is 2ab.',
        'ক্ষেত্রফলের মডেলে ab আকারের দুইটি অংশ দুইবার আসে, তাই মাঝের পদ ২ab।');
  const L=250,T=150,S=240,Aw=150,Bh=90;
  A.rect(L,T,S,S,{c:SK,w:2.5,fill:SK,fo:.06},.4);
  A.line(L+Aw,T,L+Aw,T+S,{c:MU,w:2},.2);
  A.line(L,T+Aw,L+S,T+Aw,{c:MU,w:2},.2);
  A.text(L+Aw/2,T+Aw/2,'a^2',{size:24,c:SK});
  A.text(L+Aw+Bh/2,T+Aw/2,'ab',{size:22,c:AM});
  A.text(L+Aw/2,T+Aw+Bh/2,'ab',{size:22,c:AM});
  A.text(L+Aw+Bh/2,T+Aw+Bh/2,'b^2',{size:24,c:GR});
  A.say('With a minus sign, (a - b)^2 = a^2 - 2ab + b^2, and the last term stays positive.',
        'বিয়োগ চিহ্ন হলে (a − b)² = a² − ২ab + b², শেষ পদটি তবু ধনাত্মক থাকে।');
  A.text(400,410,'(a - b)^2 = a^2 - 2ab + b^2',{size:21,c:PK});
  A.say('For x^2 + 8x + 16, half of 8 is 4, so this is (x + 4)^2.',
        'x² + ৮x + ১৬-এ ৮-এর অর্ধেক ৪, তাই এটি (x + ৪)²।');
  A.text(400,440,'x^2 + 8x + 16 = (x + 4)^2',{size:22,c:GR});
  NOTE(A,466,'square the first, twice the product, square the last.');
});

lesson('c68-216','Solving an equation whose terms are fractions','Clear the denominators with the LCM',A=>{
  A.say('Clear the fractions by multiplying every term by the least common multiple of the denominators.',
        'হরগুলোর লঘিষ্ঠ সাধারণ গুণিতক দিয়ে প্রতিটি পদ গুণ করে ভগ্নাংশ সরাই।');
  A.text(400,94,'(x + 1)/2 - (x - 1)/3 = 1',{size:29,c:SK});
  A.say('For this equation the denominators are 2 and 3, so the LCM is 6.',
        'এই সমীকরণে হর ২ ও ৩, তাই ল.সা.গু ৬।');
  A.rect(150,132,500,40,{c:AM,w:2,fill:AM,fo:.10},.3);
  A.text(400,160,'LCM of 2 and 3 is 6',{size:20,c:AM});
  A.say('Multiplying every term by 6 gives 3(x + 1) - 2(x - 1) = 6.',
        'প্রতিটি পদকে ৬ দিয়ে গুণ করলে ৩(x + ১) − ২(x − ১) = ৬ হয়।');
  A.text(400,215,'3(x + 1) - 2(x - 1) = 6',{size:25,c:VI});
  A.say('Expand to 3x + 3 - 2x + 2 = 6, so x + 5 = 6 and x = 1.',
        'সম্প্রসারিত করলে ৩x + ৩ − ২x + ২ = ৬, তাই x + ৫ = ৬ এবং x = ১।');
  A.text(400,265,'3x + 3 - 2x + 2 = 6',{size:23,c:INK});
  A.text(400,310,'x + 5 = 6',{size:23,c:INK});
  A.rect(300,335,200,56,{c:GR,w:2.5,fill:GR,fo:.14},.4);
  A.text(400,371,'x = 1',{size:30,c:GR});
  A.say('Check in the original: (1 + 1)/2 - (1 - 1)/3 = 1, so the solution works.',
        'মূল সমীকরণে মিলিয়ে দেখি: (১ + ১)/২ − (১ − ১)/৩ = ১, তাই সমাধানটি ঠিক।');
  A.text(400,420,'check: 2/2 - 0/3 = 1',{size:18,c:MU});
  NOTE(A,452,'multiply every term, including the right-hand side.');
});

lesson('c68-217','Inequalities: when the sign flips','An inequality is solved like an equation',A=>{
  A.say('An inequality is solved like an equation, but the sign can flip.',
        'অসমতা সমীকরণের মতোই সমাধান হয়, তবে চিহ্ন উল্টে যেতে পারে।');
  A.text(400,92,'2x + 3 < 11',{size:30,c:SK});
  A.text(400,134,'2x < 8   ->   x < 4',{size:23,c:SK});
  A.say('For 2x + 3 < 11, subtract 3 to get 2x < 8, then divide by 2: x < 4.',
        '২x + ৩ < ১১-এ ৩ বিয়োগ করলে ২x < ৮, তারপর ২ দিয়ে ভাগ করলে x < ৪।');
  A.line(180,185,620,185,{c:MU,w:2.5},.4);
  for(let i=0;i<=8;i++){const x=180+i*55; A.line(x,178,x,192,{c:MU,w:1.5},.05); A.text(x,210,String(i),{size:13,c:INK});}
  A.circle(400,185,8,{c:SK,w:2.5},.3);
  A.arrow(400,168,610,168,{c:SK,w:2.5},.5);
  A.text(510,152,'x < 4',{size:17,c:SK});
  A.say('Dividing or multiplying by a negative number reverses the inequality.',
        'ঋণাত্মক সংখ্যা দিয়ে ভাগ বা গুণ করলে অসমতার দিক উল্টে যায়।');
  A.text(400,258,'-3x >= 12',{size:30,c:PK});
  A.text(400,300,'divide by -3   ->   x <= -4',{size:23,c:PK});
  A.say('For -3x >= 12, divide by -3 and flip the sign to get x <= -4.',
        '−৩x ≥ ১২-এ −৩ দিয়ে ভাগ করলে চিহ্ন উল্টে x ≤ −৪ হয়।');
  A.line(180,345,620,345,{c:MU,w:2.5},.4);
  for(let i=0;i<=8;i++){const x=180+i*55; A.line(x,338,x,352,{c:MU,w:1.5},.05); A.text(x,370,String(i-6),{size:13,c:INK});}
  A.circle(290,345,8,{c:PK,w:2.5,fill:PK,fo:1},.3);
  A.arrow(290,328,190,328,{c:PK,w:2.5},.5);
  A.text(235,312,'x <= -4',{size:17,c:PK});
  NOTE(A,448,'flip only for negative multiply or divide.');
});

lesson('c68-218','Ratio in simplest form','Divide both parts by their HCF',A=>{
  A.say('A ratio compares two amounts, and simplest form divides both by their highest common factor.',
        'অনুপাত দুইটি রাশি তুলনা করে, আর সরলতম রূপে দুটিকেই তাদের গ.সা.গু দিয়ে ভাগ করি।');
  A.text(280,110,'18',{size:34,c:SK});
  A.text(400,110,':',{size:30,c:MU});
  A.text(520,110,'24',{size:34,c:SK});
  A.say('For 18 : 24 the HCF is 6.',
        '১৮ : ২৪-এ গ.সা.গু ৬।');
  A.rect(330,145,210,44,{c:AM,w:2,fill:AM,fo:.12},.3);
  A.text(435,174,'HCF = 6',{size:21,c:AM});
  A.say('Divide both parts: 18 / 6 = 3 and 24 / 6 = 4, so the ratio is 3 : 4.',
        'দুই পক্ষকে ভাগ করি: ১৮ ÷ ৬ = ৩ ও ২৪ ÷ ৬ = ৪, তাই অনুপাত ৩ : ৪।');
  A.text(280,235,'3',{size:34,c:GR});
  A.text(400,235,':',{size:30,c:MU});
  A.text(520,235,'4',{size:34,c:GR});
  A.text(400,285,'18 : 24 = 3 : 4',{size:23,c:INK});
  A.say('The two bars keep the same share, just with fewer equal pieces.',
        'দুই দণ্ডে অংশ একই থাকে, শুধু সমান টুকরার সংখ্যা কমে।');
  for(let i=0;i<3;i++) A.rect(200+i*80,320,76,38,{c:SK,w:2,fill:SK,fo:.18},.2);
  for(let i=0;i<4;i++) A.rect(200+i*80,372,76,38,{c:GR,w:2,fill:GR,fo:.18},.2);
  A.text(150,347,'3',{size:20,c:SK,anchor:'end'});
  A.text(150,399,'4',{size:20,c:GR,anchor:'end'});
  NOTE(A,448,'multiply or divide both parts by the same number.');
});

lesson('c68-219','Proportion by cross multiplication','If a/b = c/d then a x d = b x c',A=>{
  A.say('A proportion says two ratios are equal, and cross multiplication removes the fractions.',
        'সমানুপাত বলে দুইটি অনুপাত সমান, আর আড়গুণন ভগ্নাংশগুলো সরিয়ে দেয়।');
  A.text(250,128,'3',{size:32,c:SK});
  A.line(225,140,275,140,{c:SK,w:2.5},.2);
  A.text(250,172,'4',{size:32,c:SK});
  A.text(400,150,'=',{size:32,c:MU});
  A.text(550,128,'x',{size:32,c:AM});
  A.line(520,140,580,140,{c:AM,w:2.5},.2);
  A.text(550,172,'20',{size:32,c:AM});
  A.say('If 3/4 = x/20, multiply the cross pairs: 3 times 20 and 4 times x.',
        'যদি ৩/৪ = x/২০ হয়, আড়ের জোড়া গুণ করি: ৩ × ২০ ও ৪ × x।');
  A.arrow(285,178,515,228,{c:GR,w:2.5},.5);
  A.arrow(515,178,285,228,{c:PK,w:2.5},.5);
  A.say('So 3 x 20 = 4x, which is 60 = 4x.',
        'তাই ৩ × ২০ = ৪x, অর্থাৎ ৬০ = ৪x।');
  A.text(400,275,'3 x 20 = 4 x x',{size:24,c:INK});
  A.text(400,320,'60 = 4x',{size:26,c:VI});
  A.say('Divide by 4 to get x = 15.',
        '৪ দিয়ে ভাগ করলে x = ১৫।');
  A.rect(320,345,160,54,{c:GR,w:2.5,fill:GR,fo:.14},.4);
  A.text(400,380,'x = 15',{size:30,c:GR});
  A.text(400,428,'check: 3/4 = 15/20 = 0.75',{size:19,c:MU});
  NOTE(A,460,'cross multiply only across an equals sign.');
});

lesson('c68-220','Percentage increase with a multiplier','Increase 250 by 20 percent',A=>{
  A.say('A percentage increase adds a part of the original amount.',
        'শতকরা বৃদ্ধি মূল পরিমাণের একটি অংশ যোগ করে।');
  for(let i=0;i<5;i++) A.rect(155+i*85,110,80,48,{c:SK,w:2,fill:SK,fo:.20},.2);
  A.text(352,185,'original 250',{size:18,c:SK});
  A.say('Increase 250 by 20 percent: find 20 percent of 250, which is 50.',
        '২৫০-কে ২০% বাড়াই: ২৫০-এর ২০% বের করি, যা ৫০।');
  A.rect(580,110,80,48,{c:AM,w:2.5,fill:AM,fo:.24},.3);
  A.text(620,185,'+50',{size:18,c:AM});
  A.say('Add it to the original: 250 + 50 = 300.',
        'মূলের সাথে যোগ করি: ২৫০ + ৫০ = ৩০০।');
  A.text(400,245,'20% of 250 = 50',{size:23,c:AM});
  A.text(400,295,'250 + 50 = 300',{size:26,c:GR});
  A.say('The multiplier way is quicker: 250 times 1.20 = 300.',
        'গুণক পদ্ধতি দ্রুত: ২৫০ × ১.২০ = ৩০০।');
  A.rect(250,330,300,54,{c:VI,w:2.5,fill:VI,fo:.10},.4);
  A.text(400,365,'250 x 1.20 = 300',{size:24,c:VI});
  A.say('An increase of p percent is always a multiply by 1 + p/100.',
        'p শতাংশ বৃদ্ধি মানে সবসময় ১ + p/১০০ দিয়ে গুণ।');
  NOTE(A,445,'increase by 20 percent means multiply by 1.20.');
});

lesson('c68-221','Percentage decrease with a multiplier','Decrease 80 by 25 percent',A=>{
  A.say('A percentage decrease subtracts a part of the original amount.',
        'শতকরা হ্রাস মূল পরিমাণের একটি অংশ বিয়োগ করে।');
  for(let i=0;i<4;i++) A.rect(180+i*90,110,85,48,{c:SK,w:2,fill:SK,fo:.20},.2);
  A.text(342,185,'original 80',{size:18,c:SK});
  A.say('Decrease 80 by 25 percent: find 25 percent of 80, which is 20.',
        '৮০-কে ২৫% কমাই: ৮০-এর ২৫% বের করি, যা ২০।');
  A.rect(450,110,85,48,{c:PK,w:2.5,fill:PK,fo:.24},.3);
  A.text(492,185,'-20',{size:18,c:PK});
  A.say('Subtract it: 80 - 20 = 60.',
        'বিয়োগ করি: ৮০ − ২০ = ৬০।');
  A.text(400,245,'25% of 80 = 20',{size:23,c:PK});
  A.text(400,295,'80 - 20 = 60',{size:26,c:GR});
  A.say('The multiplier way: 80 times 0.75 = 60.',
        'গুণক পদ্ধতি: ৮০ × ০.৭৫ = ৬০।');
  A.rect(250,330,300,54,{c:VI,w:2.5,fill:VI,fo:.10},.4);
  A.text(400,365,'80 x 0.75 = 60',{size:24,c:VI});
  A.say('A decrease of p percent is a multiply by 1 - p/100.',
        'p শতাংশ হ্রাস মানে ১ − p/১০০ দিয়ে গুণ।');
  NOTE(A,445,'decrease by 25 percent means multiply by 0.75.');
});

