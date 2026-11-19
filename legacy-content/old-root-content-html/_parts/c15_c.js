/* Class 1-5 — part C: lessons c15-218 to c15-234 */

lesson('c15-218','Division with remainder','Share 17 sweets among 5 children',A=>{
  A.say("Seventeen sweets are shared equally among five children. Let us see how many are left.",
        "সতেরোটি মিষ্টি পাঁচজন শিশুর মধ্যে সমানভাবে ভাগ করা হলো। দেখি কতগুলো বাকি থাকে।");
  const gx=[70,230,390];
  for(let g=0;g<3;g++){
    A.rect(gx[g],140,140,80,{c:SK,w:2.5,fill:SK,fo:.08});
    for(let i=0;i<5;i++){
      A.circle(gx[g]+26+i*22,180,9,{c:SK,w:2,fill:SK,fo:.35});
    }
  }
  A.circle(576,180,9,{c:PK,w:2,fill:PK,fo:.4});
  A.circle(614,180,9,{c:PK,w:2,fill:PK,fo:.4});
  A.text(595,220,'left over',{size:16,c:PK});
  A.say("Each group has five sweets, and three full groups use fifteen sweets.",
        "প্রতিটি দলে পাঁচটি মিষ্টি, আর তিনটি পূর্ণ দলে পনেরোটি মিষ্টি ব্যবহৃত হলো।");
  A.say("Seventeen take away fifteen leaves two sweets that cannot make another group.",
        "সতেরো থেকে পনেরো বাদ দিলে দুইটি মিষ্টি থাকে, যা আরেকটি দল 만들 수 없습니다।");
  A.text(400,275,'17 ÷ 5 = 3 remainder 2',{size:30,c:AM});
  A.say("So the quotient is three and the remainder is two. The remainder is always less than the divisor.",
        "তাই ভাগফল তিন এবং ভাগশেষ দুই। ভাগশেষ সবসময় ভাজকের চেয়ে ছোট।");
  A.text(400,330,'2 < 5',{size:24,c:GR});
  NOTE(A,450,'the remainder must be smaller than the divisor.');
});

lesson('c15-219','Checking division by multiplication','Use multiplication to check 47 ÷ 6',A=>{
  A.say("We divide 47 by 6 and get 7 remainder 5. A good habit is to check the answer.",
        "৪৭-কে ৬ দিয়ে ভাগ করলে ৭ ভাগশেষ ৫ পাওয়া যায়। উত্তরটি যাচাই করা ভালো অভ্যাস।");
  A.text(400,120,'47 ÷ 6 = 7 remainder 5',{size:28,c:SK});
  A.say("Multiply the divisor by the quotient, then add the remainder.",
        "ভাজককে ভাগফল দিয়ে গুণ করো, তারপর ভাগশেষ যোগ করো।");
  A.rect(150,180,200,90,{c:AM,w:2.5,fill:AM,fo:.1});
  A.text(250,215,'6 × 7',{size:24,c:AM});
  A.text(250,250,'= 42',{size:24,c:AM});
  A.arrow(360,225,450,225,{c:MU,w:2.5});
  A.rect(460,180,200,90,{c:GR,w:2.5,fill:GR,fo:.1});
  A.text(560,215,'42 + 5',{size:24,c:GR});
  A.text(560,250,'= 47',{size:24,c:GR});
  A.say("Six times seven is forty-two, and forty-two plus five is forty-seven.",
        "ছয় গুণ সাত হলো বিয়াল্লিশ, আর বিয়াল্লিশ যোগ পাঁচ হলো সাতচল্লিশ।");
  A.say("This matches the dividend, so our division is correct.",
        "এটি ভাজ্যের সমান, তাই আমাদের ভাগটি সঠিক।");
  A.text(400,330,'divisor × quotient + remainder = dividend',{size:20,c:INK});
  NOTE(A,448,'if the check fails, look again at the division.');
});

lesson('c15-220','Long multiplication by a two-digit number','Multiply 34 by 26 in two parts',A=>{
  A.say("To multiply 34 by 26, split 26 into 20 and 6.",
        "৩৪-কে ২৬ দিয়ে গুণ করতে ২৬-কে ২০ আর ৬-এ ভাগ করো।");
  A.text(620,120,'34',{size:28,c:INK,anchor:'end'});
  A.text(620,158,'× 26',{size:28,c:INK,anchor:'end'});
  A.line(520,172,650,172,{c:INK,w:3});
  A.text(620,210,'204',{size:26,c:SK,anchor:'end'});
  A.text(620,246,'680',{size:26,c:GR,anchor:'end'});
  A.line(520,260,650,260,{c:INK,w:3});
  A.text(620,300,'884',{size:28,c:AM,anchor:'end'});
  A.say("First multiply by 6: 34 × 6 = 204.",
        "প্রথমে ৬ দিয়ে গুণ করো: ৩৪ × ৬ = ২০৪।");
  A.arrow(430,200,510,205,{c:SK,w:2.5});
  A.text(300,200,'34 × 6 = 204',{size:20,c:SK,anchor:'start'});
  A.say("Then multiply by 20, which is 34 × 2 = 68 tens, so write 680 shifted left.",
        "তারপর ২০ দিয়ে গুণ করো, যা ৩৪ × ২ = ৬৮ দশক, তাই ৬৮০ এক ঘর বাঁয়ে লিখো।");
  A.arrow(430,242,510,242,{c:GR,w:2.5});
  A.text(300,242,'34 × 20 = 680',{size:20,c:GR,anchor:'start'});
  A.say("Add the two partial products: 204 + 680 = 884.",
        "দুটি আংশিক গুণফল যোগ করো: ২০৪ + ৬৮০ = ৮৮৪।");
  A.text(300,330,'204 + 680 = 884',{size:24,c:AM,anchor:'start'});
  NOTE(A,450,'the second product starts one place to the left.');
});

lesson('c15-221','Word problems with money and change','Pay 100 taka for items costing 35 and 28',A=>{
  A.say("A ball costs 35 taka and a bat costs 28 taka. First find the total cost.",
        "একটি বলের দাম ৩৫ টাকা আর একটি ব্যাটের দাম ২৮ টাকা। প্রথমে মোট দাম বের করো।");
  A.rect(160,130,150,80,{c:SK,w:2.5,fill:SK,fo:.12});
  A.text(235,160,'ball',{size:20,c:SK});
  A.text(235,192,'৳35',{size:24,c:INK});
  A.rect(490,130,150,80,{c:PK,w:2.5,fill:PK,fo:.12});
  A.text(565,160,'bat',{size:20,c:PK});
  A.text(565,192,'৳28',{size:24,c:INK});
  A.say("Thirty-five plus twenty-eight is sixty-three taka.",
        "পঁয়ত্রিশ যোগ আটাশ হলো তেষট্টি টাকা।");
  A.text(400,255,'35 + 28 = 63 taka',{size:28,c:AM});
  A.say("Pay with a 100 taka note. Change is one hundred minus sixty-three, which is thirty-seven taka.",
        "১০০ টাকার নোট দিয়ে দাও। ফেরত হবে একশো বাদ তেষট্টি, অর্থাৎ সাঁইত্রিশ টাকা।");
  A.rect(170,290,140,60,{c:GR,w:2.5,fill:GR,fo:.12});
  A.text(240,328,'৳100',{size:26,c:INK});
  A.text(400,320,'− ৳63',{size:24,c:RD});
  A.text(560,320,'= ৳37',{size:26,c:GR});
  A.say("Check by adding the change back: 63 + 37 = 100 taka.",
        "ফেরত টাকা যোগ করে মিলাও: ৬৩ + ৩৭ = ১০০ টাকা।");
  NOTE(A,450,'change = amount paid minus total cost.');
});

lesson('c15-222','Elapsed time in hours','From 9:00 to 1:00 is how long?',A=>{
  A.say("A class begins at 9:00 in the morning and finishes at 1:00 in the afternoon.",
        "একটি ক্লাস সকাল ৯টায় শুরু হয়ে দুপুর ১টায় শেষ হয়।");
  A.line(110,260,690,260,{c:INK,w:3});
  const hrs=['9','10','11','12','1pm'];
  hrs.forEach((h,i)=>{
    const x=110+i*145;
    A.line(x,252,x,268,{c:MU,w:2});
    A.text(x,290,h,{size:22,c:INK});
  });
  A.say("Each step from one hour to the next is one hour.",
        "এক ঘণ্টা থেকে পরের ঘণ্টায় প্রতিটি ধাপ এক ঘণ্টা।");
  for(let i=0;i<4;i++){
    const x1=110+i*145, x2=110+(i+1)*145;
    const pts=[];
    for(let t=0;t<=10;t++){
      const u=t/10;
      pts.push([x1+(x2-x1)*u,260-40*Math.sin(Math.PI*u)]);
    }
    A.pts(pts,{c:AM,w:2.5});
  }
  A.say("From 9 to 12 is three hours. From 12 to 1 is one more hour.",
        "৯ থেকে ১২ পর্যন্ত তিন ঘণ্টা। ১২ থেকে ১ পর্যন্ত আরও এক ঘণ্টা।");
  A.text(400,340,'3 + 1 = 4 hours',{size:30,c:GR});
  A.say("So the elapsed time is four hours.",
        "তাই অতিবাহিত সময় চার ঘণ্টা।");
  NOTE(A,450,'count the jumps between the hour marks.');
});

lesson('c15-223','Reading a bar chart','How many children like each fruit?',A=>{
  A.say("This bar chart shows the favourite fruit of some children.",
        "এই বার চার্টটি কিছু শিশুর পছন্দের ফলের সংখ্যা দেখায়।");
  const base=390, left=150, unit=32;
  A.line(left,base,700,base,{c:INK,w:3});
  A.line(left,base,left,150,{c:INK,w:3});
  for(let v=0;v<=6;v++){
    const y=base-v*unit;
    A.line(left-6,y,left,y,{c:MU,w:2});
    A.text(left-22,y+7,String(v),{size:16,c:MU});
    if(v>0&&v<6) A.dashed(left,y,690,y,{c:MU,w:1});
  }
  const fruits=['mango','banana','apple','lychee'];
  const vals=[6,4,5,3];
  const cols=[AM,SK,GR,PK];
  vals.forEach((v,i)=>{
    const x=210+i*120;
    A.rect(x,base-v*unit,70,v*unit,{c:cols[i],w:2,fill:cols[i],fo:.5});
    A.text(x+35,base+28,fruits[i],{size:17,c:INK});
    A.text(x+35,base-v*unit-10,String(v),{size:18,c:INK});
  });
  A.say("Mango has the tallest bar, so six children chose mango.",
        "আমের বারটি সবচেয়ে উঁচু, তাই ছয়জন শিশু আম পছন্দ করেছে।");
  A.say("Apple has five, banana has four and lychee has three.",
        "আপেলে পাঁচ, কলায় চার আর লিচুতে তিনজন।");
  A.say("In total, 6 + 4 + 5 + 3 = 18 children answered.",
        "সব মিলিয়ে ৬ + ৪ + ৫ + ৩ = ১৮ জন শিশু উত্তর দিয়েছে।");
  NOTE(A,455,'read the height of each bar against the scale.');
});

lesson('c15-224','Reading a pictograph with a key','One symbol stands for four students',A=>{
  A.say("In a pictograph, one picture can stand for more than one thing. Always read the key.",
        "চিত্রলেখে একটি ছবি একাধিক জিনিস বোঝাতে পারে। সর্বদা কী-টি পড়ো।");
  A.circle(180,110,14,{c:AM,w:2.5,fill:AM,fo:.4});
  A.text(205,116,'= 4 students',{size:18,c:AM,anchor:'start'});
  const rows=[['Cricket',5],['Football',3],['Ludo',2]];
  const cols=[SK,GR,PK];
  rows.forEach((r,ri)=>{
    const y=170+ri*75;
    A.text(80,y+6,r[0],{size:18,c:INK,anchor:'start'});
    for(let i=0;i<r[1];i++){
      A.circle(230+i*52,y,13,{c:cols[ri],w:2,fill:cols[ri],fo:.4});
    }
    A.text(620,y+6,String(r[1]*4),{size:20,c:cols[ri],anchor:'start'});
  });
  A.say("Cricket has five symbols, and five times four is twenty students.",
        "ক্রিকেটে পাঁচটি প্রতীক, আর পাঁচ গুণ চার হলো বিশ জন শিক্ষার্থী।");
  A.say("Football has three symbols, so 3 × 4 = 12 students.",
        "ফুটবলে তিনটি প্রতীক, তাই ৩ × ৪ = ১২ জন শিক্ষার্থী।");
  A.say("Ludo has two symbols, so 2 × 4 = 8 students. The key changes the value of each picture.",
        "লুডুতে দুইটি প্রতীক, তাই ২ × ৪ = ৮ জন শিক্ষার্থী। কী প্রতিটি ছবির মান বদলে দেয়।");
  NOTE(A,450,'multiply the number of symbols by the key value.');
});

lesson('c15-225','Mode and range of a small data set','Find the most common value and the spread',A=>{
  A.say("Here is a small data set: 3, 7, 7, 9 and 12.",
        "এখানে একটি ছোট তথ্যসেট: ৩, ৭, ৭, ৯ আর ১২।");
  const data=[3,7,7,9,12];
  data.forEach((n,i)=>A.text(160+i*110,120,String(n),{size:26,c:SK}));
  A.say("First put the numbers in order, from smallest to largest.",
        "প্রথমে সংখ্যাগুলো ছোট থেকে বড় ক্রমে সাজাও।");
  A.line(100,240,700,240,{c:INK,w:3});
  for(let n=0;n<=12;n++){
    const x=100+n*50;
    A.line(x,234,x,246,{c:MU,w:1.5});
    if(n%2===0) A.text(x,268,String(n),{size:15,c:MU});
  }
  const cnt={3:1,7:2,9:1,12:1};
  Object.keys(cnt).forEach(k=>{
    const n=Number(k), x=100+n*50;
    for(let j=0;j<cnt[k];j++){
      A.circle(x,220-j*26,8,{c:AM,w:2,fill:AM,fo:.5});
    }
  });
  A.say("The mode is the value that appears most often. Seven appears twice, so the mode is 7.",
        "মোড হলো সবচেয়ে বেশি বার আসা মান। সাত দুইবার আসে, তাই মোড ৭।");
  A.say("The range is the largest value minus the smallest: 12 − 3 = 9.",
        "রেঞ্জ হলো সবচেয়ে বড় মান বিয়োগ সবচেয়ে ছোট মান: ১২ − ৩ = ৯।");
  A.text(250,330,'mode = 7',{size:28,c:AM});
  A.text(550,330,'range = 9',{size:28,c:GR});
  NOTE(A,450,'mode shows what is common; range shows how spread out.');
});

lesson('c15-226','Coordinates in the first quadrant','Read a point as (x, y)',A=>{
  A.say("Coordinates tell us how far to go across and how far to go up. They are written (x, y).",
        "স্থানাঙ্ক বলে কত দূর ডানে আর কত দূর উপরে যেতে হবে। এগুলো (x, y) আকারে লেখা হয়।");
  const ox=150, oy=400, u=42;
  A.line(ox,oy,ox+6*u+20,oy,{c:INK,w:3});
  A.line(ox,oy,ox,oy-6*u-20,{c:INK,w:3});
  for(let i=1;i<=6;i++){
    A.line(ox+i*u,oy-4,ox+i*u,oy+4,{c:MU,w:1.5});
    A.line(ox-4,oy-i*u,ox+4,oy-i*u,{c:MU,w:1.5});
    A.text(ox+i*u,oy+20,String(i),{size:16,c:MU});
    A.text(ox-18,oy-i*u+5,String(i),{size:16,c:MU});
  }
  A.text(ox+6*u+30,oy+5,'x',{size:20,c:SK,anchor:'start'});
  A.text(ox-8,oy-6*u-28,'y',{size:20,c:SK});
  A.say("Start at zero. Move four steps to the right along the x-axis.",
        "শূন্য থেকে শুরু করো। x-অক্ষ বরাবর ডানে চার ধাপ যাও।");
  A.dashed(ox,oy,ox+4*u,oy,{c:SK,w:2});
  A.arrow(ox,oy-14,ox+4*u,oy-14,{c:SK,w:2});
  A.text(ox+2*u,oy-22,'4 right',{size:16,c:SK});
  A.say("Then move three steps up along the y-axis.",
        "তারপর y-অক্ষ বরাবর উপরে তিন ধাপ যাও।");
  A.dashed(ox+4*u,oy,ox+4*u,oy-3*u,{c:GR,w:2});
  A.arrow(ox+4*u+14,oy,ox+4*u+14,oy-3*u,{c:GR,w:2});
  A.text(ox+4*u+24,oy-1.5*u,'3 up',{size:16,c:GR,anchor:'start'});
  const px=ox+4*u, py=oy-3*u;
  A.circle(px,py,9,{c:AM,w:3,fill:AM,fo:.6});
  A.text(px+30,py-8,'(4, 3)',{size:22,c:AM,anchor:'start'});
  A.say("The point is (4, 3): four across and three up.",
        "বিন্দুটি (৪, ৩): চার ডানে আর তিন উপরে।");
  NOTE(A,450,'x is written first, y is written second.');
});

lesson('c15-227','Plotting points and joining them','Draw a rectangle from four points',A=>{
  A.say("We can draw a shape by plotting points and joining them in order.",
        "বিন্দুগুলো এঁকে ক্রমানুসারে যোগ করে আমরা একটি আকৃতি আঁকতে পারি।");
  const ox=170, oy=400, u=45;
  A.line(ox,oy,ox+5*u+20,oy,{c:INK,w:3});
  A.line(ox,oy,ox,oy-5*u-20,{c:INK,w:3});
  for(let i=1;i<=5;i++){
    A.line(ox+i*u,oy-4,ox+i*u,oy+4,{c:MU,w:1.5});
    A.line(ox-4,oy-i*u,ox+4,oy-i*u,{c:MU,w:1.5});
    A.text(ox+i*u,oy+20,String(i),{size:15,c:MU});
    A.text(ox-18,oy-i*u+5,String(i),{size:15,c:MU});
  }
  A.say("Plot (1, 1) and (4, 1). They lie on the same horizontal line.",
        "(১, ১) আর (৪, ১) বসাও। এরা একই অনুভূমিক রেখায় আছে।");
  const P=[[1,1],[4,1],[4,3],[1,3]];
  const cols=[SK,PK,GR,AM];
  P.forEach((p,i)=>{
    const x=ox+p[0]*u, y=oy-p[1]*u;
    A.circle(x,y,7,{c:cols[i],w:3,fill:cols[i],fo:.6});
  });
  A.text(ox+1*u,oy-1*u+26,'(1, 1)',{size:15,c:SK});
  A.text(ox+4*u,oy-1*u+26,'(4, 1)',{size:15,c:PK});
  A.say("Now plot (4, 3) and (1, 3), then join all four points.",
        "এবার (৪, ৩) আর (১, ৩) বসাও, তারপর চারটি বিন্দু যোগ করো।");
  A.text(ox+4*u+8,oy-3*u-6,'(4, 3)',{size:15,c:GR,anchor:'start'});
  A.text(ox+1*u-8,oy-3*u-6,'(1, 3)',{size:15,c:AM,anchor:'end'});
  const pts=P.map(p=>[ox+p[0]*u,oy-p[1]*u]);
  pts.push([ox+1*u,oy-1*u]);
  A.pts(pts,{c:VI,w:3,fill:VI,fo:.06});
  A.say("The shape is a rectangle, 3 units wide and 2 units tall.",
        "আকৃতিটি একটি আয়তক্ষেত্র, ৩ একক চওড়া আর ২ একক উঁচু।");
  NOTE(A,450,'join the points in the order given around the shape.');
});

lesson('c15-228','Angles: right, acute and obtuse','Three kinds of angle',A=>{
  A.say("An angle measures the turn between two straight arms that meet at a point.",
        "কোণ মাপে দুটি সরল বাহুর মধ্যে ঘূর্ণন, যারা একটি বিন্দুতে মেলে।");
  A.line(160,330,160,210,{c:SK,w:4});
  A.line(160,330,280,330,{c:SK,w:4});
  let a1=[];
  for(let d=-90;d<=0;d+=6){
    const t=d*Math.PI/180;
    a1.push([160+35*Math.cos(t),330+35*Math.sin(t)]);
  }
  A.pts(a1,{c:AM,w:3});
  A.text(220,378,'right 90°',{size:18,c:AM});
  A.say("A right angle is exactly 90 degrees, like the corner of a book.",
        "সমকোণ ঠিক ৯০ ডিগ্রি, যেমন বইয়ের কোণা।");
  A.line(390,330,500,330,{c:GR,w:4});
  A.line(390,330,461,246,{c:GR,w:4});
  let a2=[];
  for(let d=-50;d<=0;d+=5){
    const t=d*Math.PI/180;
    a2.push([390+35*Math.cos(t),330+35*Math.sin(t)]);
  }
  A.pts(a2,{c:PK,w:3});
  A.text(445,378,'acute < 90°',{size:18,c:PK});
  A.say("An acute angle is less than 90 degrees.",
        "সূক্ষ্মকোণ ৯০ ডিগ্রির কম।");
  A.line(620,330,740,330,{c:AM,w:4});
  A.line(620,330,549,246,{c:AM,w:4});
  let a3=[];
  for(let d=-130;d<=0;d+=5){
    const t=d*Math.PI/180;
    a3.push([620+35*Math.cos(t),330+35*Math.sin(t)]);
  }
  A.pts(a3,{c:VI,w:3});
  A.text(650,378,'obtuse > 90°',{size:18,c:VI});
  A.say("An obtuse angle is more than 90 degrees but less than 180 degrees.",
        "স্থূলকোণ ৯০ ডিগ্রির বেশি কিন্তু ১৮০ ডিগ্রির কম।");
  NOTE(A,450,'right = 90°, acute < 90°, obtuse between 90° and 180°.');
});

lesson('c15-229','Measuring an angle with a protractor','Read 60 degrees',A=>{
  A.say("A protractor measures angles in degrees. Put its centre on the vertex of the angle.",
        "প্রোট্রাক্টর কোণ ডিগ্রিতে মাপে। এর কেন্দ্র কোণের শীর্ষবিন্দুতে রাখো।");
  const cx=260, cy=360, R=170;
  A.line(cx,cy,470,cy,{c:INK,w:3});
  const ax=cx+200*Math.cos(-Math.PI/3), ay=cy+200*Math.sin(-Math.PI/3);
  A.line(cx,cy,ax,ay,{c:SK,w:3});
  A.circle(cx,cy,5,{c:RD,w:2,fill:RD,fo:.8});
  A.say("Line up the zero line of the protractor with one arm.",
        "প্রোট্রাক্টরের শূন্য রেখা একটি বাহুর সাথে মিলাও।");
  let arc=[];
  for(let d=180;d<=360;d+=4){
    const t=d*Math.PI/180;
    arc.push([cx+R*Math.cos(t),cy+R*Math.sin(t)]);
  }
  A.pts(arc,{c:MU,w:2.5});
  for(let deg=0;deg<=180;deg+=10){
    const t=(360-deg)*Math.PI/180;
    const x1=cx+(R-14)*Math.cos(t), y1=cy+(R-14)*Math.sin(t);
    const x2=cx+R*Math.cos(t), y2=cy+R*Math.sin(t);
    A.line(x1,y1,x2,y2,{c:MU,w:1.5});
    if(deg%30===0){
      A.text(cx+(R+22)*Math.cos(t),cy+(R+22)*Math.sin(t)+6,String(deg),{size:15,c:INK});
    }
  }
  A.say("Read the scale where the other arm crosses the edge: it points at 60 degrees.",
        "অন্য বাহুটি প্রান্তে যেখানে ছেদ করে সেখানে স্কেল পড়ো: এটি ৬০ ডিগ্রি দেখায়।");
  const mx=cx+R*Math.cos(-Math.PI/3), my=cy+R*Math.sin(-Math.PI/3);
  A.circle(mx,my,7,{c:RD,w:3,fill:RD,fo:.6});
  A.text(mx+20,my-8,'60°',{size:24,c:RD,anchor:'start'});
  A.say("Sixty degrees is less than ninety, so this is an acute angle.",
        "ষাট ডিগ্রি নব্বইয়ের কম, তাই এটি একটি সূক্ষ্মকোণ।");
  NOTE(A,455,'always read from the zero marked on the arm you lined up.');
});

lesson('c15-230','Drawing a triangle with given sides','Sides 3 cm, 4 cm and 5 cm',A=>{
  A.say("To draw a triangle with sides 3 cm, 4 cm and 5 cm, begin with the 4 cm base.",
        "৩ সেমি, ৪ সেমি আর ৫ সেমি বাহুর ত্রিভুজ আঁকতে ৪ সেমি ভূমি দিয়ে শুরু করো।");
  const A1=[250,340], B1=[410,340];
  A.line(A1[0],A1[1],B1[0],B1[1],{c:SK,w:4});
  A.text(330,365,'4 cm',{size:18,c:SK});
  A.text(240,362,'A',{size:20,c:INK});
  A.text(420,362,'B',{size:20,c:INK});
  A.say("From one end draw an arc of radius 3 cm.",
        "এক প্রান্ত থেকে ৩ সেমি ব্যাসার্ধের একটি চাপ আঁকো।");
  let arcA=[];
  for(let d=-90;d<=-50;d+=3){
    const t=d*Math.PI/180;
    arcA.push([A1[0]+120*Math.cos(t),A1[1]+120*Math.sin(t)]);
  }
  A.pts(arcA,{c:AM,w:2.5});
  A.say("From the other end draw an arc of radius 5 cm. The two arcs cross at the third corner.",
        "অন্য প্রান্ত থেকে ৫ সেমি ব্যাসার্ধের একটি চাপ আঁকো। দুই চাপ তৃতীয় কোণায় ছেদ করে।");
  let arcB=[];
  for(let d=-170;d<=-120;d+=3){
    const t=d*Math.PI/180;
    arcB.push([B1[0]+200*Math.cos(t),B1[1]+200*Math.sin(t)]);
  }
  A.pts(arcB,{c:PK,w:2.5});
  A.circle(250,220,7,{c:RD,w:3,fill:RD,fo:.7});
  A.text(250,205,'C',{size:20,c:RD});
  A.say("Join the corner C to both ends of the base.",
        "C কোণাটিকে ভূমির দুই প্রান্তের সাথে যোগ করো।");
  A.line(250,340,250,220,{c:AM,w:4});
  A.line(410,340,250,220,{c:PK,w:4});
  A.text(235,285,'3 cm',{size:18,c:AM,anchor:'end'});
  A.text(340,272,'5 cm',{size:18,c:PK,anchor:'start'});
  A.say("The triangle has sides 3 cm, 4 cm and 5 cm, and the angle at A is a right angle.",
        "ত্রিভুজটির বাহু ৩ সেমি, ৪ সেমি আর ৫ সেমি, এবং A-তে কোণটি সমকোণ।");
  NOTE(A,450,'check each side with a ruler after drawing.');
});

lesson('c15-231','Nets of a cube','Six squares fold into a cube',A=>{
  A.say("A net is a flat pattern that folds up to make a solid.",
        "নেট হলো একটি সমতল নকশা, যা ভাঁজ করে একটি ঘনবস্তু তৈরি হয়।");
  const s=56;
  const sq=[[372,176,SK],[316,232,GR],[372,232,AM],[428,232,PK],[484,232,VI],[372,288,SK]];
  sq.forEach(q=>A.rect(q[0],q[1],s,s,{c:q[2],w:2.5,fill:q[2],fo:.3}));
  A.say("These six equal squares fold along the edges and close into a cube.",
        "এই ছয়টি সমান বর্গ প্রান্ত বরাবর ভাঁজ হয়ে একটি ঘনক তৈরি করে।");
  A.say("A cube has 6 faces, 12 edges and 8 corners.",
        "একটি ঘনকের ৬টি তল, ১২টি প্রান্ত আর ৮টি কোণা আছে।");
  A.text(400,390,'6 faces   12 edges   8 corners',{size:22,c:AM});
  A.say("Every face of a cube is a square of the same size.",
        "ঘনকের প্রতিটি তল একই আকারের বর্গ।");
  NOTE(A,450,'a cube net always has exactly six squares.');
});

lesson('c15-232','Volume by counting unit cubes','A 3 by 2 by 2 box holds 12 cubes',A=>{
  A.say("Volume is the amount of space inside a solid. We can count unit cubes.",
        "আয়তন হলো ঘনবস্তুর ভেতরের জায়গার পরিমাণ। আমরা একক ঘনক গুনতে পারি।");
  const s=55;
  for(let r=0;r<2;r++){
    for(let c=0;c<3;c++){
      A.rect(245+c*s,235+r*s,s,s,{c:MU,w:1.5,fill:MU,fo:.12});
    }
  }
  A.text(420,225,'back layer',{size:15,c:MU,anchor:'start'});
  A.say("The back layer has 3 columns and 2 rows, so 3 × 2 = 6 cubes.",
        "পেছনের স্তরে ৩টি কলাম আর ২টি সারি, তাই ৩ × ২ = ৬টি ঘনক।");
  for(let r=0;r<2;r++){
    for(let c=0;c<3;c++){
      A.rect(200+c*s,280+r*s,s,s,{c:AM,w:2,fill:AM,fo:.35});
    }
  }
  A.text(150,270,'front layer',{size:15,c:AM,anchor:'end'});
  A.say("The front layer also has 3 × 2 = 6 cubes. Two layers make 6 + 6 = 12 cubes.",
        "সামনের স্তরেও ৩ × ২ = ৬টি ঘনক। দুই স্তরে ৬ + ৬ = ১২টি ঘনক।");
  A.text(400,415,'3 × 2 × 2 = 12 cubic units',{size:24,c:GR});
  A.say("The volume is twelve cubic units.",
        "আয়তন বারো ঘন একক।");
  NOTE(A,452,'volume = length × width × height for a cuboid.');
});

lesson('c15-233','Capacity in litres and millilitres','1 litre = 1000 millilitres',A=>{
  A.say("Capacity tells how much liquid a container can hold.",
        "ধারণক্ষমতা বলে একটি পাত্র কত তরল ধরে রাখতে পারে।");
  A.pts([[165,180],[255,180],[270,370],[150,370]],{c:SK,w:3,fill:SK,fo:.18});
  A.text(210,225,'1 litre',{size:20,c:SK});
  A.text(210,260,'1000 mL',{size:18,c:INK});
  A.say("One litre is the same as one thousand millilitres.",
        "এক লিটার এক হাজার মিলিলিটারের সমান।");
  A.text(560,220,'1 L = 1000 mL',{size:26,c:AM});
  A.text(560,265,'2 L = 2000 mL',{size:22,c:GR});
  A.say("Four cups of 250 millilitres fill one litre: 4 × 250 = 1000 millilitres.",
        "২৫০ মিলিলিটারের চার কাপ এক লিটার পূর্ণ করে: ৪ × ২৫০ = ১০০০ মিলিলিটার।");
  for(let i=0;i<4;i++){
    A.rect(350+i*85,380,60,55,{c:PK,w:2,fill:PK,fo:.25});
    A.text(380+i*85,415,'250',{size:16,c:INK});
    A.text(380+i*85,432,'mL',{size:13,c:MU});
  }
  A.say("So when a bottle says 2 litres, it can hold 2000 millilitres.",
        "তাই বোতলে ২ লিটার লেখা থাকলে সেটি ২০০০ মিলিলিটার ধরে।");
  NOTE(A,455,'multiply litres by 1000 to get millilitres.');
});

lesson('c15-234','Mass in kilograms and grams','1 kilogram = 1000 grams',A=>{
  A.say("Mass tells how heavy an object is. We use kilograms and grams.",
        "ভর বলে একটি বস্তু কত ভারী। আমরা কিলোগ্রাম আর গ্রাম ব্যবহার করি।");
  A.pts([[400,380],[368,330],[432,330]],{c:MU,w:2,fill:MU,fo:.2});
  A.line(400,330,400,220,{c:MU,w:3});
  A.line(250,220,550,220,{c:INK,w:4});
  A.line(250,220,250,262,{c:MU,w:2});
  A.line(550,220,550,262,{c:MU,w:2});
  A.rect(190,262,120,18,{c:SK,w:2,fill:SK,fo:.4});
  A.rect(490,262,120,18,{c:PK,w:2,fill:PK,fo:.4});
  A.text(250,244,'2 kg 350 g',{size:18,c:SK});
  A.text(550,244,'2350 g',{size:18,c:PK});
  A.say("One kilogram is one thousand grams.",
        "এক কিলোগ্রাম এক হাজার গ্রাম।");
  A.say("Two kilograms is 2 × 1000 = 2000 grams.",
        "দুই কিলোগ্রাম হলো ২ × ১০০০ = ২০০০ গ্রাম।");
  A.say("Add the extra 350 grams: 2000 + 350 = 2350 grams. Both pans balance.",
        "বাড়তি ৩৫০ গ্রাম যোগ করো: ২০০০ + ৩৫০ = ২৩৫০ গ্রাম। দুই পাল্লা সমান।");
  A.text(400,315,'2 kg 350 g = 2350 g',{size:24,c:AM});
  A.say("To change kilograms to grams, multiply by 1000 and add the grams.",
        "কিলোগ্রামকে গ্রামে বদলাতে ১০০০ দিয়ে গুণ করে গ্রাম যোগ করো।");
  NOTE(A,450,'1000 g = 1 kg, so 3 kg = 3000 g.');
});
