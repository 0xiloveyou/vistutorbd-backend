/* Part C: money, data, probability and coordinate graphs for classes 6-8 */

lesson('c68-222','Profit and loss','Cost price, selling price, profit and loss',A=>{
  A.say('Cost price is what the shopkeeper pays; selling price is what the customer pays.',
        'ক্রয়মূল্য হলো দোকানদার যা দেয়, আর বিক্রয়মূল্য হলো ক্রেতা যা দেয়।');
  A.rect(140,110,300,44,{c:SK,w:2,fill:SK,fo:.16},.4);
  A.text(290,138,'CP 1200',{size:19,c:SK});
  A.rect(140,178,375,44,{c:AM,w:2,fill:AM,fo:.16},.4);
  A.text(327,206,'SP 1500',{size:19,c:AM});
  A.say('When the selling price is higher there is a profit: 1500 - 1200 = 300.',
        'বিক্রয়মূল্য বেশি হলে লাভ হয়: ১৫০০ − ১২০০ = ৩০০।');
  A.arrow(445,236,515,236,{c:GR,w:2.5},.4);
  A.text(480,260,'+300 profit',{size:17,c:GR});
  A.say('When the selling price is lower there is a loss: 800 - 720 = 80.',
        'বিক্রয়মূল্য কম হলে ক্ষতি হয়: ৮০০ − ৭২০ = ৮০।');
  A.rect(140,300,190,56,{c:SK,w:2,fill:SK,fo:.12},.3);
  A.text(235,336,'CP 800',{size:19,c:SK});
  A.rect(430,300,190,56,{c:PK,w:2,fill:PK,fo:.12},.3);
  A.text(525,336,'SP 720',{size:19,c:PK});
  A.arrow(340,328,420,328,{c:PK,w:2.5},.4);
  A.text(400,378,'loss = 80',{size:19,c:PK});
  A.say('Profit is always selling price minus cost price, and loss is the other way round.',
        'লাভ সবসময় বিক্রয়মূল্য থেকে ক্রয়মূল্য বিয়োগে পাওয়া যায়, আর ক্ষতি হয় উল্টোভাবে।');
  A.text(400,412,'profit = SP - CP      loss = CP - SP',{size:19,c:AM});
  NOTE(A,448,'profit = SP - CP, loss = CP - SP.');
});

lesson('c68-223','Selling price from cost and profit percent','Cost price plus a percentage of profit',A=>{
  A.say('A profit percent is a percent of the cost price, not of the selling price.',
        'শতকরা লাভ ক্রয়মূল্যের উপর হিসাব হয়, বিক্রয়মূল্যের উপর নয়।');
  A.rect(170,112,250,46,{c:SK,w:2,fill:SK,fo:.16},.4);
  A.text(295,140,'CP 500',{size:19,c:SK});
  A.rect(420,112,50,46,{c:GR,w:2,fill:GR,fo:.26},.4);
  A.text(445,140,'100',{size:14,c:GR});
  A.say('Cost 500 with 20 percent profit: the profit is 20 percent of 500, which is 100.',
        'ক্রয়মূল্য ৫০০ টাকায় ২০% লাভ: লাভ হলো ৫০০-এর ২০%, অর্থাৎ ১০০ টাকা।');
  A.text(400,196,'20% of 500 = 100',{size:22,c:GR});
  A.say('Add the profit to the cost: the selling price is 500 + 100 = 600.',
        'ক্রয়মূল্যের সঙ্গে লাভ যোগ করো: বিক্রয়মূল্য ৫০০ + ১০০ = ৬০০ টাকা।');
  A.text(400,242,'SP = 500 + 100 = 600',{size:26,c:AM});
  A.say('A single multiplier does it too: 500 times 1.20 = 600.',
        'একটি গুণক দিয়েও করা যায়: ৫০০ × ১.২০ = ৬০০।');
  A.rect(250,286,300,52,{c:VI,w:2.5,fill:VI,fo:.10},.4);
  A.text(400,320,'500 x 1.20 = 600',{size:23,c:VI});
  A.say('So 800 with 15 percent profit sells for 800 times 1.15 = 920.',
        'তাই ৮০০ টাকায় ১৫% লাভে বিক্রয়মূল্য ৮০০ × ১.১৫ = ৯২০ টাকা।');
  A.text(400,382,'800 x 1.15 = 920',{size:24,c:GR});
  A.text(400,420,'selling price = cost x (1 + profit percent / 100)',{size:17,c:MU});
  NOTE(A,448,'add the profit percent to the cost as a multiplier.');
});

lesson('c68-224','Simple interest','Interest paid only on the original principal',A=>{
  A.say('Simple interest is paid only on the original principal.',
        'সরল মুনাফা কেবল মূল আসলের উপর দেওয়া হয়।');
  A.rect(70,105,150,90,{c:SK,w:2.5,fill:SK,fo:.14},.4);
  A.text(145,142,'Principal',{size:16,c:SK});
  A.text(145,170,'P = 5000',{size:20,c:SK});
  A.say('For 5000 taka at 8 percent, one year gives 8 percent of 5000, which is 400.',
        '৫০০০ টাকায় ৮% হারে এক বছরে মুনাফা ৫০০০-এর ৮%, অর্থাৎ ৪০০ টাকা।');
  for(let i=0;i<3;i++){
    A.rect(245+i*95,105,85,90,{c:AM,w:2,fill:AM,fo:.14},.3);
    A.text(287+i*95,138,'Year '+(i+1),{size:14,c:MU});
    A.text(287+i*95,170,'400',{size:22,c:AM});
  }
  A.rect(545,105,150,90,{c:GR,w:2.5,fill:GR,fo:.14},.4);
  A.text(620,142,'Amount',{size:16,c:GR});
  A.text(620,170,'6200',{size:22,c:GR});
  A.say('Three years give the same 400 each year, so the interest is 1200.',
        'তিন বছরে প্রতি বছর একই ৪০০ টাকা, তাই মোট মুনাফা ১২০০ টাকা।');
  A.text(400,235,'400 + 400 + 400 = 1200',{size:24,c:AM});
  A.say('Use I = P x R x T / 100: 5000 x 8 x 3 / 100 = 1200.',
        'সূত্র ব্যবহার করো I = P × R × T ÷ ১০০: ৫০০০ × ৮ × ৩ ÷ ১০০ = ১২০০।');
  A.rect(210,268,380,54,{c:VI,w:2.5,fill:VI,fo:.10},.4);
  A.text(400,303,'5000 x 8 x 3 / 100 = 1200',{size:21,c:VI});
  A.say('The amount to repay is principal plus interest: 5000 + 1200 = 6200.',
        'শেষে ফেরত দিতে হবে আসল যোগ মুনাফা: ৫০০০ + ১২০০ = ৬২০০ টাকা।');
  A.text(400,365,'amount = principal + interest = 6200',{size:22,c:GR});
  A.text(400,410,'the interest stays the same every year',{size:18,c:MU});
  NOTE(A,448,'I = PRT / 100; amount = P + I.');
});

lesson('c68-225','Compound interest for two years','Interest on the interest, year by year',A=>{
  A.say('Compound interest adds each year interest to the principal before the next year.',
        'চক্রবৃদ্ধি মুনাফায় প্রতি বছরের মুনাফা পরের বছরের আগে আসলের সঙ্গে যোগ হয়।');
  A.rect(95,110,160,74,{c:SK,w:2.5,fill:SK,fo:.14},.4);
  A.text(175,138,'Year 0',{size:15,c:MU});
  A.text(175,166,'10000',{size:22,c:SK});
  A.rect(320,110,160,74,{c:AM,w:2.5,fill:AM,fo:.14},.4);
  A.text(400,138,'Year 1',{size:15,c:MU});
  A.text(400,166,'11000',{size:22,c:AM});
  A.arrow(260,147,315,147,{c:GR,w:2.5},.4);
  A.text(287,132,'+1000',{size:14,c:GR});
  A.say('Start with 10000 at 10 percent: year one interest is 1000, so the amount is 11000.',
        '১০০০০ টাকায় ১০% হারে শুরু করি: প্রথম বছরের মুনাফা ১০০০, তাই সবৃদ্ধিমূল ১১০০০।');
  A.rect(545,110,160,74,{c:GR,w:2.5,fill:GR,fo:.14},.4);
  A.text(625,138,'Year 2',{size:15,c:MU});
  A.text(625,166,'12100',{size:22,c:GR});
  A.arrow(485,147,540,147,{c:PK,w:2.5},.4);
  A.text(512,132,'+1100',{size:14,c:PK});
  A.say('Year two earns 10 percent of 11000, which is 1100, so the amount is 12100.',
        'দ্বিতীয় বছরে ১১০০০-এর ১০% মুনাফা ১১০০, তাই সবৃদ্ধিমূল ১২১০০।');
  A.text(400,220,'year 1:  10000 + 1000 = 11000',{size:19,c:INK,anchor:'start'});
  A.text(400,252,'year 2:  11000 + 1100 = 12100',{size:19,c:INK,anchor:'start'});
  A.say('Total compound interest is 2100, which is 100 more than the simple interest.',
        'মোট চক্রবৃদ্ধি মুনাফা ২১০০, যা সরল মুনাফার চেয়ে ১০০ টাকা বেশি।');
  A.text(400,292,'compound interest = 12100 - 10000 = 2100',{size:21,c:AM});
  A.rect(210,318,380,54,{c:VI,w:2,fill:VI,fo:.10},.4);
  A.text(400,353,'10000 x 1.10 x 1.10 = 12100',{size:21,c:VI});
  A.say('That extra 100 is interest earned on the first year interest.',
        'এই বাড়তি ১০০ টাকা হলো প্রথম বছরের মুনাফার উপর পাওয়া মুনাফা।');
  A.text(400,405,'the extra 100 is interest on interest',{size:19,c:GR});
  NOTE(A,448,'CI for two years = P(1 + r/100)^2 - P.');
});

lesson('c68-226','Distance, speed and time','One triangle holds all three formulae',A=>{
  A.say('Speed tells how far you go in one hour, so distance equals speed times time.',
        'গতিবেগ বলে এক ঘণ্টায় কত দূর যাওয়া যায়, তাই দূরত্ব = গতিবেগ × সময়।');
  A.pts([[400,96],[286,228],[514,228]],{c:SK,w:2.5,fill:SK,fo:.08},.5);
  A.text(400,150,'d',{size:36,c:SK});
  A.text(348,215,'s',{size:32,c:AM});
  A.text(452,215,'t',{size:32,c:PK});
  A.text(400,262,'d = s x t',{size:20,c:MU});
  A.say('A bus covers 120 km in 2 hours, so its speed is 120 / 2 = 60 km per hour.',
        'একটি বাস ২ ঘণ্টায় ১২০ কিমি যায়, তাই তার গতিবেগ ১২০ ÷ ২ = ৬০ কিমি/ঘণ্টা।');
  A.rect(180,288,440,44,{c:GR,w:2,fill:GR,fo:.10},.3);
  A.text(400,317,'s = d / t = 120 / 2 = 60 km per hour',{size:19,c:GR});
  A.say('At 60 km per hour for 3 hours it covers 60 x 3 = 180 km.',
        '৬০ কিমি/ঘণ্টা বেগে ৩ ঘণ্টায় যায় ৬০ × ৩ = ১৮০ কিমি।');
  A.text(400,358,'d = s x t = 60 x 3 = 180 km',{size:21,c:AM});
  A.say('To find time, divide distance by speed: 180 / 60 = 3 hours.',
        'সময় বের করতে দূরত্বকে গতিবেগ দিয়ে ভাগ করো: ১৮০ ÷ ৬০ = ৩ ঘণ্টা।');
  A.text(400,398,'t = d / s = 180 / 60 = 3 hours',{size:21,c:PK});
  NOTE(A,448,'cover the unknown in the triangle: d = s x t.');
});

lesson('c68-227','Average of a set of numbers','The mean shares the total equally',A=>{
  A.say('The average, or mean, shares the total equally among all the values.',
        'গড় মোট যোগফলকে সব মানের মধ্যে সমানভাবে ভাগ করে।');
  const vals=[4,6,8,10,12];
  vals.forEach((v,i)=>{
    const h=v*12, x=160+i*90;
    A.rect(x,250-h,54,h,{c:SK,w:2,fill:SK,fo:.18},.3);
    A.text(x+27,270,String(v),{size:18,c:INK});
  });
  A.say('Add the numbers 4, 6, 8, 10 and 12: the total is 40.',
        '৪, ৬, ৮, ১০ ও ১২ যোগ করো: মোট ৪০।');
  A.text(400,306,'4 + 6 + 8 + 10 + 12 = 40',{size:22,c:AM});
  A.say('There are five values, so divide 40 by 5 to get the mean 8.',
        'পাঁচটি মান আছে, তাই ৪০-কে ৫ দিয়ে ভাগ করলে গড় ৮।');
  A.text(400,346,'mean = 40 / 5 = 8',{size:26,c:GR});
  A.dashed(140,154,650,154,{c:AM,w:2},.5);
  A.text(692,158,'mean 8',{size:16,c:AM});
  A.say('The mean is the balance point: the amounts above and below it are equal.',
        'গড় হলো ভারসাম্যের বিন্দু: এর উপরের ও নিচের বিচ্যুতিগুলো সমান হয়।');
  A.text(400,395,'the mean line balances the bars',{size:19,c:MU});
  NOTE(A,448,'mean = sum of values / number of values.');
});

lesson('c68-228','Median of an ordered list','Sort the values, then take the middle',A=>{
  A.say('Always put the values in order before you look for the median.',
        'মধ্যমা খোঁজার আগে সব মান অবশ্যই ক্রমানুসারে সাজাও।');
  const even=[3,5,8,10,15,20];
  even.forEach((v,i)=>{
    const mid=(i===2||i===3);
    A.rect(70+i*110,112,96,62,{c:mid?GR:SK,w:mid?2.5:2,fill:mid?GR:SK,fo:mid?.20:.10},.25);
    A.text(118+i*110,152,String(v),{size:26,c:mid?GR:INK});
  });
  A.say('For 3, 5, 8, 10, 15, 20 there are six values, so the median lies between the third and fourth.',
        '৩, ৫, ৮, ১০, ১৫, ২০-এ ছয়টি মান, তাই মধ্যমা তৃতীয় ও চতুর্থ মানের মাঝে।');
  A.text(400,200,'six values: the middle pair is 8 and 10',{size:17,c:MU});
  A.arrow(338,180,370,222,{c:GR,w:2},.3);
  A.arrow(448,180,430,222,{c:GR,w:2},.3);
  A.rect(330,225,140,48,{c:GR,w:2.5,fill:GR,fo:.16},.35);
  A.text(400,256,'median = 9',{size:21,c:GR});
  A.say('Average those two middle values: (8 + 10) / 2 = 9.',
        'মাঝের দুইটি মানের গড় নাও: (৮ + ১০) ÷ ২ = ৯।');
  A.text(400,300,'(8 + 10) / 2 = 9',{size:23,c:AM});
  A.say('With an odd count the middle value itself is the median; in 2, 4, 7, 11, 15 it is 7.',
        'সংখ্যা বিজোড় হলে মাঝের মানই মধ্যমা; ২, ৪, ৭, ১১, ১৫-এ তা ৭।');
  const odd=[2,4,7,11,15];
  odd.forEach((v,i)=>{
    const mid=(i===2);
    A.rect(135+i*100,332,82,48,{c:mid?AM:MU,w:mid?2.5:1.5,fill:mid?AM:MU,fo:mid?.20:.08},.2);
    A.text(176+i*100,362,String(v),{size:20,c:mid?AM:INK});
  });
  A.text(400,405,'five values: the middle one is 7',{size:17,c:AM});
  NOTE(A,448,'sort first, then take the middle; with an even count average the two middles.');
});

lesson('c68-229','Mode of a data set','The value that appears most often',A=>{
  A.say('The mode is the value that appears most often.',
        'প্রচুরক হলো যে মানটি সবচেয়ে বেশি বার আসে।');
  A.text(400,92,'value        tally        frequency',{size:16,c:MU});
  const rows=[[2,'|',1],[3,'|||',3],[4,'|',1],[5,'|',1],[6,'|',1]];
  rows.forEach((r,i)=>{
    const y=110+i*48, hot=(r[0]===3);
    A.rect(220,y,360,40,{c:hot?GR:SK,w:hot?2.5:1.5,fill:hot?GR:SK,fo:hot?.16:.05},.2);
    A.text(300,y+27,String(r[0]),{size:20,c:hot?GR:INK});
    A.text(420,y+27,r[1],{size:22,c:hot?GR:INK});
    A.text(535,y+27,String(r[2]),{size:20,c:hot?GR:INK});
  });
  A.say('Count each value in 2, 3, 3, 4, 5, 3, 6.',
        '২, ৩, ৩, ৪, ৫, ৩, ৬-এ প্রতিটি মান কতবার আছে গুনো।');
  A.say('The number 3 appears three times, more than any other value.',
        'সংখ্যা ৩ তিনবার আসে, অন্য যেকোনো মানের চেয়ে বেশি।');
  A.text(400,370,'mode = 3   (frequency 3)',{size:24,c:GR});
  A.say('So the mode is 3; a set can also have two modes or no mode at all.',
        'তাই প্রচুরক ৩; একটি উপাত্তে দুইটি প্রচুরকও থাকতে পারে, আবার একটিও না থাকতে পারে।');
  A.text(400,410,'a set may have one mode, two modes, or none',{size:17,c:MU});
  NOTE(A,448,'mode = the value with the highest frequency.');
});

lesson('c68-230','Range of a data set','Largest minus smallest measures the spread',A=>{
  A.say('The range measures how spread out the data is.',
        'পরিসর বলে উপাত্তগুলো কতটা ছড়ানো।');
  A.line(90,190,710,190,{c:MU,w:2.5},.4);
  for(let i=0;i<=20;i+=5){
    const x=90+i*31;
    A.line(x,183,x,197,{c:MU,w:2},.06);
    A.text(x,215,String(i),{size:15,c:INK});
  }
  const data=[12,7,19,4,15];
  data.forEach(v=>{
    const x=90+v*31;
    A.circle(x,190,7,{c:SK,w:0,fill:SK,fo:1},.22);
    A.text(x,170,String(v),{size:15,c:SK});
  });
  A.say('Find the largest value 19 and the smallest value 4.',
        'সবচেয়ে বড় মান ১৯ এবং সবচেয়ে ছোট মান ৪ খুঁজে বের করো।');
  A.circle(214,190,11,{c:RD,w:2.5,fill:RD,fo:.18},.3);
  A.circle(679,190,11,{c:GR,w:2.5,fill:GR,fo:.18},.3);
  A.text(214,145,'min 4',{size:16,c:RD});
  A.text(679,145,'max 19',{size:16,c:GR});
  A.say('Subtract: the range is 19 - 4 = 15.',
        'বিয়োগ করো: পরিসর ১৯ − ৪ = ১৫।');
  A.arrow(214,248,679,248,{c:AM,w:2.5},.5);
  A.text(446,278,'range = 19 - 4 = 15',{size:24,c:AM});
  A.say('A small range means the values are close together; a large range means they are widely spread.',
        'ছোট পরিসর মানে মানগুলো কাছাকাছি; বড় পরিসর মানে তারা অনেক ছড়ানো।');
  A.text(400,335,'small range: close together      large range: widely spread',{size:16,c:MU});
  NOTE(A,448,'range = largest value - smallest value.');
});

lesson('c68-231','Reading a pie chart','Angles and percentages around a circle',A=>{
  A.say('A pie chart shows each share as a slice of a full turn, 360 degrees.',
        'পাই চার্টে প্রতিটি অংশ পূর্ণ এক ঘূর্ণনের, অর্থাৎ ৩৬০ ডিগ্রির একটি টুকরো হিসেবে দেখানো হয়।');
  const cx=280, cy=215, r=105, pc=[40,25,20,15], cols=[AM,SK,GR,PK];
  let a0=-90;
  for(let i=0;i<4;i++){
    const a1=a0+pc[i]*3.6;
    const pts=[[cx,cy]];
    for(let k=0;k<=24;k++){
      const a=(a0+(a1-a0)*k/24)*Math.PI/180;
      pts.push([cx+r*Math.cos(a),cy+r*Math.sin(a)]);
    }
    A.pts(pts,{c:cols[i],w:2,fill:cols[i],fo:.32},.35);
    const mid=(a0+a1)/2*Math.PI/180;
    A.text(cx+138*Math.cos(mid),cy+138*Math.sin(mid),pc[i]+'%',{size:18,c:cols[i]});
    a0=a1;
  }
  A.say('Turn each percentage into degrees by multiplying by 3.6: 40 percent gives 144 degrees.',
        'প্রতিটি শতাংশকে ৩.৬ দিয়ে গুণ করে ডিগ্রিতে লেখো: ৪০% হয় ১৪৪ ডিগ্রি।');
  A.text(490,120,'40% = 144 degrees',{size:18,c:AM,anchor:'start'});
  A.say('The other slices are 25 percent = 90 degrees, 20 percent = 72 degrees, 15 percent = 54 degrees.',
        'বাকি অংশগুলো ২৫% = ৯০ ডিগ্রি, ২০% = ৭২ ডিগ্রি, ১৫% = ৫৪ ডিগ্রি।');
  A.text(490,170,'25% = 90 degrees',{size:18,c:SK,anchor:'start'});
  A.text(490,205,'20% = 72 degrees',{size:18,c:GR,anchor:'start'});
  A.text(490,240,'15% = 54 degrees',{size:18,c:PK,anchor:'start'});
  A.say('Add the angles to check: 144 + 90 + 72 + 54 = 360 degrees.',
        'কোণগুলো যোগ করে মিলাও: ১৪৪ + ৯০ + ৭২ + ৫৪ = ৩৬০ ডিগ্রি।');
  A.text(280,350,'144 + 90 + 72 + 54 = 360 degrees',{size:16,c:GR});
  A.say('The largest slice is the biggest share, so read the labels before comparing.',
        'সবচেয়ে বড় টুকরোই সবচেয়ে বড় অংশ, তাই তুলনার আগে লেবেল পড়ো।');
  A.text(400,395,'the whole circle represents all the data',{size:17,c:MU});
  NOTE(A,448,'percentage x 3.6 = angle in degrees.');
});

lesson('c68-232','Constructing a bar chart','Equal bars, equal gaps, scale from zero',A=>{
  A.say('In a bar chart every bar has the same width and the gaps are equal.',
        'বার চার্টে প্রতিটি বারের প্রস্থ সমান এবং ফাঁকও সমান।');
  A.arrow(160,360,700,360,{c:MU,w:2.5},.4);
  A.arrow(160,360,160,90,{c:MU,w:2.5},.4);
  for(let v=0;v<=10;v+=2){
    const y=360-v*26;
    A.line(154,y,166,y,{c:MU,w:2},.06);
    A.text(142,y+5,String(v),{size:15,c:INK,anchor:'end'});
  }
  A.text(400,402,'category',{size:16,c:MU});
  A.say('The height of each bar shows the frequency of that category.',
        'প্রতিটি বারের উচ্চতা ওই শ্রেণির সংখ্যা দেখায়।');
  const labels=['A','B','C','D'], values=[6,9,4,7], cols=[SK,AM,GR,PK];
  values.forEach((v,i)=>{
    const x=210+i*120, h=v*26;
    A.rect(x,360-h,70,h,{c:cols[i],w:2,fill:cols[i],fo:.28},.35);
    A.text(x+35,385,labels[i],{size:18,c:INK});
    A.text(x+35,360-h-11,String(v),{size:16,c:cols[i]});
  });
  A.say('Here A is 6, B is 9, C is 4 and D is 7, so B is the tallest bar.',
        'এখানে A = ৬, B = ৯, C = ৪ এবং D = ৭, তাই B সবচেয়ে উঁচু বার।');
  A.say('Start the vertical scale at zero, or the heights will tell a false story.',
        'উল্লম্ব স্কেল শূন্য থেকে শুরু করো, নাহলে উচ্চতা ভুল গল্প বলবে।');
  A.text(400,428,'equal width, equal gaps, scale starts at 0',{size:16,c:AM});
  NOTE(A,448,'label both axes and keep the gaps equal.');
});

lesson('c68-233','Probability on a die','Favourable outcomes over all outcomes',A=>{
  A.say('A fair die has six equally likely outcomes: 1, 2, 3, 4, 5 and 6.',
        'একটি ন্যায্য ছক্কায় ছয়টি সমসম্ভাব্য ফল আছে: ১, ২, ৩, ৪, ৫ ও ৬।');
  for(let i=0;i<6;i++){
    const even=((i+1)%2===0), x=85+i*105;
    A.rect(x,110,82,82,{c:even?GR:SK,w:2.5,fill:even?GR:SK,fo:even?.22:.08},.25);
    A.text(x+41,164,String(i+1),{size:34,c:even?GR:INK});
  }
  A.say('Probability is favourable outcomes divided by all outcomes.',
        'সম্ভাবনা = অনুকূল ফল ÷ মোট ফল।');
  A.text(400,226,'P(event) = favourable / total',{size:20,c:MU});
  A.say('The even numbers are 2, 4 and 6, so P(even) = 3/6 = 1/2.',
        'জোড় সংখ্যাগুলো ২, ৪ ও ৬, তাই P(জোড়) = ৩/৬ = ১/২।');
  A.rect(140,258,230,70,{c:GR,w:2.5,fill:GR,fo:.12},.35);
  A.text(255,285,'P(even)',{size:19,c:GR});
  A.text(255,312,'3/6 = 1/2',{size:20,c:GR});
  A.say('Numbers greater than 4 are 5 and 6, so P(more than 4) = 2/6 = 1/3.',
        '৪-এর চেয়ে বড় সংখ্যা ৫ ও ৬, তাই P(৪-এর বেশি) = ২/৬ = ১/৩।');
  A.rect(430,258,230,70,{c:AM,w:2.5,fill:AM,fo:.12},.35);
  A.text(545,285,'P(more than 4)',{size:18,c:AM});
  A.text(545,312,'2/6 = 1/3',{size:20,c:AM});
  A.text(400,380,'3 evens out of 6 faces, 2 faces above 4',{size:17,c:MU});
  NOTE(A,448,'probability is always between 0 and 1.');
});

lesson('c68-234','Probability with two coins','Four outcomes in the sample space',A=>{
  A.say('Two coins give four equally likely outcomes: HH, HT, TH and TT.',
        'দুইটি মুদ্রায় চারটি সমসম্ভাব্য ফল: HH, HT, TH ও TT।');
  A.circle(120,200,16,{c:MU,w:2,fill:MU,fo:.14},.25);
  A.line(136,196,280,140,{c:MU,w:2},.2);
  A.line(136,204,280,260,{c:MU,w:2},.2);
  A.line(296,140,450,106,{c:MU,w:2},.2);
  A.line(296,140,450,182,{c:MU,w:2},.2);
  A.line(296,260,450,222,{c:MU,w:2},.2);
  A.line(296,260,450,298,{c:MU,w:2},.2);
  A.text(205,165,'H',{size:22,c:GR});
  A.text(205,240,'T',{size:22,c:PK});
  A.text(470,110,'HH',{size:22,c:GR,anchor:'start'});
  A.text(470,186,'HT',{size:22,c:AM,anchor:'start'});
  A.text(470,226,'TH',{size:22,c:AM,anchor:'start'});
  A.text(470,302,'TT',{size:22,c:PK,anchor:'start'});
  A.say('HH means both coins show heads, HT means first head and second tail.',
        'HH মানে দুই মুদ্রাতেই হেড, HT মানে প্রথম হেড ও দ্বিতীয় টেইল।');
  A.say('Only one outcome is two heads, so P(HH) = 1/4.',
        'দুই হেড পাওয়ার অনুকূল ফল একটিই, তাই P(HH) = ১/৪।');
  A.text(400,352,'P(HH) = 1/4',{size:21,c:GR});
  A.say('Exactly one head comes from HT and TH, so P(one head) = 2/4 = 1/2; at least one head gives 3/4.',
        'ঠিক একটি হেড আসে HT ও TH থেকে, তাই P(একটি হেড) = ২/৪ = ১/২; অন্তত একটি হেডের সম্ভাবনা ৩/৪।');
  A.text(400,388,'P(exactly one head) = 2/4 = 1/2',{size:19,c:AM});
  A.text(400,420,'P(at least one head) = 3/4',{size:19,c:SK});
  NOTE(A,448,'list the whole sample space before counting.');
});

lesson('c68-235','A sample space table for two dice','Thirty-six pairs in a six by six table',A=>{
  A.say('Two dice give 36 equally likely pairs, so write them in a 6 by 6 table.',
        'দুইটি ছক্কায় ৩৬টি সমসম্ভাব্য জোড়া, তাই সেগুলো ৬ গুণ ৬ ছকে লেখো।');
  const sums=[
    [2,3,4,5,6,7],
    [3,4,5,6,7,8],
    [4,5,6,7,8,9],
    [5,6,7,8,9,10],
    [6,7,8,9,10,11],
    [7,8,9,10,11,12]
  ];
  const g=A.mat(400,265,sums,{cw:54,rh:38,size:18,bc:MU,col:(i,j,v)=>v===7?GR:INK},.2);
  for(let j=0;j<6;j++) A.text(g.cx(j),136,String(j+1),{size:15,c:SK});
  for(let i=0;i<6;i++) A.text(226,g.cy(i),String(i+1),{size:15,c:SK});
  A.say('Each cell shows the sum of the row die and the column die.',
        'প্রতিটি ঘরে সারির ছক্কা ও কলামের ছক্কার যোগফল লেখা আছে।');
  for(let i=0;i<6;i++) A.box(g.cell(i,5-i),GR);
  A.say('The sum 7 appears in six cells, along the diagonal from 1 and 6 to 6 and 1.',
        'যোগফল ৭ ছয়টি ঘরে আসে, ১ ও ৬ থেকে ৬ ও ১ পর্যন্ত কর্ণ বরাবর।');
  A.say('So P(sum 7) = 6/36 = 1/6.',
        'তাই P(যোগফল ৭) = ৬/৩৬ = ১/৬।');
  A.text(400,412,'P(sum 7) = 6/36 = 1/6',{size:22,c:GR});
  NOTE(A,448,'36 pairs in total; count the cells for the event.');
});

lesson('c68-236','Complementary events','Two probabilities that add to one',A=>{
  A.say('An event and its complement together cover every possible outcome.',
        'একটি ঘটনা ও তার পূরক মিলে সব সম্ভাব্য ফল ঢেকে দেয়।');
  A.rect(140,120,182,70,{c:AM,w:2.5,fill:AM,fo:.24},.35);
  A.rect(322,120,338,70,{c:SK,w:2.5,fill:SK,fo:.16},.35);
  A.text(231,160,'P(A) = 0.35',{size:20,c:AM});
  A.text(491,160,'P(not A) = 0.65',{size:20,c:SK});
  A.text(140,212,'0',{size:16,c:MU});
  A.text(660,212,'1',{size:16,c:MU});
  A.say('If the probability of rain is 0.35, the probability of no rain is 1 - 0.35 = 0.65.',
        'বৃষ্টির সম্ভাবনা ০.৩৫ হলে বৃষ্টি না হওয়ার সম্ভাবনা ১ − ০.৩৫ = ০.৬৫।');
  A.text(400,265,'P(A) + P(not A) = 1',{size:28,c:GR});
  A.say('The two probabilities always add to 1, because one of them must happen.',
        'দুই সম্ভাবনার যোগফল সবসময় ১, কারণ এদের একটি অবশ্যই ঘটবে।');
  A.rect(160,305,220,68,{c:GR,w:2,fill:GR,fo:.12},.3);
  A.text(270,332,'P(even) = 1/2',{size:19,c:GR});
  A.text(270,358,'P(not even) = 1/2',{size:19,c:GR});
  A.say('For a die, P(even) = 1/2, so P(not even) = 1 - 1/2 = 1/2.',
        'ছক্কায় P(জোড়) = ১/২, তাই P(জোড় নয়) = ১ − ১/২ = ১/২।');
  A.rect(430,305,220,68,{c:VI,w:2,fill:VI,fo:.12},.3);
  A.text(540,332,'1/2 + 1/2 = 1',{size:19,c:VI});
  A.text(540,358,'the whole sample space',{size:15,c:MU});
  NOTE(A,448,'P(A) + P(not A) = 1.');
});

lesson('c68-237','Coordinates of a point','Across first, then up or down',A=>{
  A.say('A point is named by an ordered pair: the x-coordinate first, then the y-coordinate.',
        'একটি বিন্দুকে ক্রমজোড় দিয়ে লেখা হয়: আগে x-স্থানাঙ্ক, তারপর y-স্থানাঙ্ক।');
  A.arrow(120,300,700,300,{c:MU,w:2.5},.4);
  A.arrow(320,300,320,80,{c:MU,w:2.5},.4);
  A.text(700,282,'x',{size:20,c:MU,anchor:'end'});
  A.text(332,86,'y',{size:20,c:MU});
  A.text(304,322,'O',{size:18,c:MU});
  for(let i=1;i<=6;i++) A.text(320+i*50,322,String(i),{size:14,c:MU});
  for(let i=1;i<=4;i++) A.text(300,300-i*46,String(i),{size:14,c:MU,anchor:'end'});
  A.say('To reach (3, 2), start at the origin, move 3 right and then 2 up.',
        '(৩, ২) বিন্দুতে পৌঁছাতে মূলবিন্দু থেকে ৩ ডানে, তারপর ২ উপরে যাও।');
  A.dashed(470,300,470,208,{c:AM,w:2},.4);
  A.dashed(320,208,470,208,{c:AM,w:2},.4);
  A.circle(470,208,7,{c:AM,w:0,fill:AM,fo:1},.3);
  A.text(492,198,'P(3, 2)',{size:18,c:AM,anchor:'start'});
  A.say('The dashed lines show that its x-value is 3 and its y-value is 2.',
        'কাটা রেখাগুলো দেখায় এর x-মান ৩ এবং y-মান ২।');
  A.dashed(220,300,220,254,{c:SK,w:2},.4);
  A.dashed(220,254,320,254,{c:SK,w:2},.4);
  A.circle(220,254,7,{c:SK,w:0,fill:SK,fo:1},.3);
  A.text(206,240,'Q(-2, 1)',{size:17,c:SK,anchor:'end'});
  A.say('For (-2, 1), move 2 left and 1 up; the x value comes first again.',
        '(−২, ১)-এর জন্য ২ বাঁয়ে ও ১ উপরে যাও; এখানেও আগে x-মান।');
  A.say('The origin is (0, 0), where the two axes meet.',
        'মূলবিন্দু (০, ০), যেখানে দুই অক্ষ মিলিত হয়।');
  A.text(400,390,'x first, y second: (across, then up)',{size:19,c:GR});
  A.text(400,425,'origin is (0, 0)',{size:17,c:MU});
  NOTE(A,448,'read the x-coordinate before the y-coordinate.');
});

lesson('c68-238','The four quadrants','Signs of the coordinates in each region',A=>{
  A.say('The two axes divide the plane into four quadrants.',
        'দুইটি অক্ষ সমতলকে চারটি চতুর্ভাগে ভাগ করে।');
  A.arrow(110,260,690,260,{c:MU,w:2.5},.4);
  A.arrow(400,260,400,80,{c:MU,w:2.5},.4);
  A.text(690,242,'x',{size:18,c:MU,anchor:'end'});
  A.text(412,86,'y',{size:18,c:MU});
  A.text(384,282,'O',{size:16,c:MU,anchor:'end'});
  A.say('In quadrant I both coordinates are positive, like (2, 3).',
        'প্রথম চতুর্ভাগে দুই স্থানাঙ্কই ধনাত্মক, যেমন (২, ৩)।');
  A.text(520,180,'I',{size:36,c:GR});
  A.text(520,214,'(+, +)',{size:19,c:GR});
  A.say('Quadrant II has negative x and positive y, like (-2, 3).',
        'দ্বিতীয় চতুর্ভাগে x ঋণাত্মক ও y ধনাত্মক, যেমন (−২, ৩)।');
  A.text(280,180,'II',{size:36,c:SK});
  A.text(280,214,'(-, +)',{size:19,c:SK});
  A.say('Quadrant III has both negative, and quadrant IV has positive x and negative y.',
        'তৃতীয় চতুর্ভাগে দুইটিই ঋণাত্মক, আর চতুর্থ চতুর্ভাগে x ধনাত্মক ও y ঋণাত্মক।');
  A.text(280,330,'III',{size:36,c:PK});
  A.text(280,364,'(-, -)',{size:19,c:PK});
  A.text(520,330,'IV',{size:36,c:AM});
  A.text(520,364,'(+, -)',{size:19,c:AM});
  A.say('The quadrants are numbered anticlockwise starting from the top right.',
        'চতুর্ভাগগুলো ডান-উপর থেকে ঘড়ির কাঁটার উল্টো দিকে নম্বর দেওয়া হয়।');
  A.text(400,412,'I -> II -> III -> IV  anticlockwise',{size:18,c:VI});
  NOTE(A,448,'I (+,+), II (-,+), III (-,-), IV (+,-).');
});

lesson('c68-239','Plotting a straight-line graph','A table of values gives the points',A=>{
  A.say('Make a table of values, then plot each pair of coordinates.',
        'মানের ছক তৈরি করো, তারপর প্রতিটি ক্রমজোড় বিন্দু আঁকো।');
  A.arrow(140,400,650,400,{c:MU,w:2.5},.4);
  A.arrow(140,400,140,80,{c:MU,w:2.5},.4);
  A.text(650,382,'x',{size:18,c:MU,anchor:'end'});
  A.text(152,88,'y',{size:18,c:MU});
  for(let i=0;i<=5;i++){
    A.text(140+i*100,420,String(i),{size:14,c:MU});
    if(i>0) A.line(140+i*100,394,140+i*100,406,{c:MU,w:1.5},.05);
  }
  for(let i=1;i<=8;i++){
    A.text(124,400-i*40+5,String(i),{size:14,c:MU,anchor:'end'});
  }
  A.text(622,166,'x   y',{size:18,c:MU});
  A.text(622,194,'0   1',{size:18,c:SK});
  A.text(622,222,'1   3',{size:18,c:SK});
  A.text(622,250,'2   5',{size:18,c:SK});
  A.text(622,278,'3   7',{size:18,c:SK});
  A.say('For y = 2x + 1, when x is 0, 1, 2 and 3, y becomes 1, 3, 5 and 7.',
        'y = ২x + ১-এ x = ০, ১, ২, ৩ হলে y হয় ১, ৩, ৫ ও ৭।');
  const pts=[[140,360],[240,280],[340,200],[440,120]];
  pts.forEach((p,i)=>{
    A.circle(p[0],p[1],7,{c:AM,w:0,fill:AM,fo:1},.25);
    A.text(p[0]+16,p[1]-10,'('+i+', '+(2*i+1)+')',{size:14,c:AM,anchor:'start'});
  });
  A.say('Each step right by 1 raises y by 2, so the points lie on a straight line.',
        'প্রতি ১ ডান যাওয়ায় y বাড়ে ২, তাই বিন্দুগুলো একটি সরলরেখায় থাকে।');
  A.pts([[140,360],[480,88]],{c:GR,w:3},.6);
  A.say('Join the points with a ruler and extend the line in both directions.',
        'বিন্দুগুলো রুলার দিয়ে যোগ করো এবং রেখাটি দুই দিকে বাড়াও।');
  A.text(400,350,'straight line through all four points',{size:18,c:GR});
  NOTE(A,448,'a straight-line graph comes from an equation like y = mx + c.');
});

lesson('c68-240','Gradient from a graph','Rise over run on a straight line',A=>{
  A.say('Gradient measures how steep a line is.',
        'ঢাল বা গ্রেডিয়েন্ট বলে একটি রেখা কতটা খাড়া।');
  A.arrow(150,400,650,400,{c:MU,w:2.5},.4);
  A.arrow(150,400,150,80,{c:MU,w:2.5},.4);
  A.text(650,382,'x',{size:18,c:MU,anchor:'end'});
  A.text(162,88,'y',{size:18,c:MU});
  for(let i=1;i<=5;i++) A.text(150+i*100,420,String(i),{size:14,c:MU});
  for(let i=1;i<=9;i+=2) A.text(134,400-i*32+5,String(i),{size:14,c:MU,anchor:'end'});
  A.pts([[200,336],[600,80]],{c:SK,w:2.5},.6);
  A.say('Take two points on the line, then find the vertical rise and the horizontal run.',
        'রেখার উপর দুইটি বিন্দু নাও, তারপর উল্লম্ব উত্থান ও অনুভূমিক অগ্রগতি বের করো।');
  A.circle(250,304,7,{c:AM,w:0,fill:AM,fo:1},.25);
  A.circle(550,112,7,{c:AM,w:0,fill:AM,fo:1},.25);
  A.text(238,292,'(1, 3)',{size:16,c:AM,anchor:'end'});
  A.text(562,104,'(4, 9)',{size:16,c:AM,anchor:'start'});
  A.say('Here the rise is 6 and the run is 3, so the gradient is 6 / 3 = 2.',
        'এখানে উত্থান ৬ এবং অগ্রগতি ৩, তাই গ্রেডিয়েন্ট ৬ ÷ ৩ = ২।');
  A.dashed(250,304,550,304,{c:GR,w:2},.4);
  A.dashed(550,304,550,112,{c:PK,w:2},.4);
  A.text(400,330,'run = 3',{size:18,c:GR});
  A.text(562,205,'rise = 6',{size:18,c:PK,anchor:'start'});
  A.say('Moving 1 step right, the line goes 2 steps up.',
        '১ ধাপ ডানে গেলে রেখাটি ২ ধাপ উপরে যায়।');
  A.text(400,370,'gradient = rise / run = 6 / 3 = 2',{size:22,c:AM});
  A.say('A steeper line has a larger gradient; a falling line has a negative gradient.',
        'বেশি খাড়া রেখার গ্রেডিয়েন্ট বড়; নিচের দিকে নামা রেখার গ্রেডিয়েন্ট ঋণাত্মক।');
  A.text(400,408,'up to the right: positive gradient',{size:17,c:MU});
  NOTE(A,448,'gradient = rise / run.');
});

lesson('c68-241','Direct proportion and its graph','A straight line through the origin',A=>{
  A.say('In direct proportion, when one quantity doubles, the other doubles too.',
        'সরাসরি অনুপাতে একটি রাশি দ্বিগুণ হলে অন্যটিও দ্বিগুণ হয়।');
  A.arrow(140,410,640,410,{c:MU,w:2.5},.4);
  A.arrow(140,410,140,90,{c:MU,w:2.5},.4);
  A.text(640,392,'x',{size:18,c:MU,anchor:'end'});
  A.text(152,98,'y',{size:18,c:MU});
  for(let i=1;i<=4;i++) A.text(140+i*110,430,String(i),{size:15,c:MU});
  for(let i=3;i<=12;i+=3) A.text(124,410-i*25+5,String(i),{size:15,c:MU,anchor:'end'});
  A.text(620,258,'x    y',{size:17,c:MU,anchor:'start'});
  A.text(620,286,'1    3',{size:17,c:SK,anchor:'start'});
  A.text(620,314,'2    6',{size:17,c:SK,anchor:'start'});
  A.text(620,342,'3    9',{size:17,c:SK,anchor:'start'});
  A.say('Here y = 3x, so x = 1, 2, 3, 4 gives y = 3, 6, 9, 12.',
        'এখানে y = ৩x, তাই x = ১, ২, ৩, ৪ হলে y = ৩, ৬, ৯, ১২।');
  const pts=[[250,335],[360,260],[470,185],[580,110]];
  pts.forEach(p=>A.circle(p[0],p[1],7,{c:AM,w:0,fill:AM,fo:1},.25));
  A.pts([[140,410],[580,110]],{c:GR,w:2.5},.6);
  A.say('The ratio y / x is always 3, which is the constant of proportion.',
        'y ÷ x অনুপাত সবসময় ৩, এটাই অনুপাতের ধ্রুবক।');
  A.text(360,380,'y / x = 3 every time',{size:19,c:AM});
  A.say('The graph is a straight line through the origin.',
        'লেখচিত্রটি মূলবিন্দু দিয়ে যাওয়া একটি সরলরেখা।');
  A.say('That is why direct proportion graphs always pass through (0, 0).',
        'এই কারণেই সরাসরি অনুপাতের লেখচিত্র সবসময় (০, ০) দিয়ে যায়।');
  A.circle(140,410,8,{c:RD,w:0,fill:RD,fo:1},.25);
  A.text(114,435,'O',{size:16,c:RD});
  NOTE(A,448,'direct proportion: y = kx, a straight line through O.');
});

lesson('c68-242','Inverse proportion and its graph','When one doubles, the other halves',A=>{
  A.say('In inverse proportion, when one quantity doubles, the other halves.',
        'ব্যস্তানুপাতে একটি রাশি দ্বিগুণ হলে অন্যটি অর্ধেক হয়।');
  A.arrow(150,400,710,400,{c:MU,w:2.5},.4);
  A.arrow(150,400,150,90,{c:MU,w:2.5},.4);
  A.text(710,382,'x',{size:18,c:MU,anchor:'end'});
  A.text(162,98,'y',{size:18,c:MU});
  for(let i=1;i<=7;i++) A.text(150+i*70,420,String(i),{size:14,c:MU});
  for(let i=2;i<=12;i+=2) A.text(134,400-i*26+5,String(i),{size:14,c:MU,anchor:'end'});
  const curve=[];
  for(let x=1.2;x<=7;x+=.2) curve.push([150+x*70,400-(12/x)*26]);
  A.pts(curve,{c:VI,w:2.5},.7);
  A.text(605,125,'x    y',{size:16,c:MU,anchor:'start'});
  A.text(605,151,'1   12',{size:16,c:SK,anchor:'start'});
  A.text(605,177,'2    6',{size:16,c:SK,anchor:'start'});
  A.text(605,203,'3    4',{size:16,c:SK,anchor:'start'});
  A.text(605,229,'4    3',{size:16,c:SK,anchor:'start'});
  A.text(605,255,'6    2',{size:16,c:SK,anchor:'start'});
  A.say('Here y = 12 / x, so x = 1, 2, 3, 4, 6 gives y = 12, 6, 4, 3, 2.',
        'এখানে y = ১২ ÷ x, তাই x = ১, ২, ৩, ৪, ৬ হলে y = ১২, ৬, ৪, ৩, ২।');
  A.say('The product x times y is always 12, so the curve never touches an axis.',
        'x × y গুণফল সবসময় ১২, তাই বক্ররেখা কখনো অক্ষকে স্পর্শ করে না।');
  A.text(390,370,'x times y = 12 every time',{size:19,c:AM});
  A.say('The graph curves downwards and gets closer to the axes without meeting them.',
        'লেখচিত্রটি নিচের দিকে বেঁকে যায় এবং অক্ষের কাছে আসে কিন্তু মেলে না।');
  A.say('Four workers take 3 days, so eight workers take only 1.5 days at the same rate.',
        'চার শ্রমিকের ৩ দিন লাগলে একই হারে আট শ্রমিকের লাগে মাত্র ১.৫ দিন।');
  A.text(400,438,'4 workers x 3 days = 8 workers x 1.5 days',{size:14,c:GR});
  NOTE(A,460,'inverse proportion: xy = k, a curve that never meets the axes.');
});


