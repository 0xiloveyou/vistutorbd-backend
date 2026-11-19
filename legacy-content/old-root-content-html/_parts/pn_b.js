/* Play & Nursery — part B: lessons pn-221 to pn-247 */

lesson('pn-221','Skip counting by 2s','Count in twos: 2, 4, 6, 8',A=>{
  A.say("Skip counting by two means we jump over one number each time.",
        "দুই দুই করে গোনা মানে প্রতিবার একটি সংখ্যা ডিঙিয়ে যাওয়া।");
  A.say("Socks come in pairs. Two socks make one pair.",
        "মোজা জোড়ায় জোড়ায় আসে। দুইটি মোজা মিলে এক জোড়া।");
  for(let i=0;i<6;i++){
    const x=120+i*112;
    A.ell(x-14,170,13,22,{c:i%2?PK:SK,w:3,fill:i%2?PK:SK,fo:.35},.15);
    A.ell(x+14,170,13,22,{c:i%2?PK:SK,w:3,fill:i%2?PK:SK,fo:.35},.15);
    A.text(x,222,String(2*(i+1)),{size:26,c:AM});
    A.text(x,252,'pair '+(i+1),{size:14,c:MU});
  }
  A.say("So we say two, four, six, eight, ten, twelve.",
        "তাই আমরা বলি দুই, চার, ছয়, আট, দশ, বারো।");
  A.line(100,350,700,350,{c:MU,w:3},.4);
  for(let i=0;i<6;i++){
    const x=120+i*112;
    A.circle(x,350,7,{c:AM,w:2,fill:AM,fo:.9},.1);
    A.text(x,384,String(2*(i+1)),{size:17,c:MU});
  }
  A.arrow(150,330,288,330,{c:GR,w:2.5},.3);
  A.text(220,312,'+2',{size:18,c:GR});
  A.say("Each jump adds two. The skips land on even numbers only.",
        "প্রতিটি লাফে দুই যোগ হয়। তাই কেবল জোড় সংখ্যায় পা পড়ে।");
  A.text(400,420,'even numbers',{size:22,c:AM});
  NOTE(A,456,'count in twos: 2, 4, 6, 8, 10.');
});

lesson('pn-222','Skip counting by 5s','Five, ten, fifteen, twenty',A=>{
  A.say("Each hand has five fingers. Hands help us skip count by five.",
        "প্রতিটি হাতে পাঁচটি আঙুল। হাত দিয়ে পাঁচ করে গোনা সহজ।");
  for(let i=0;i<6;i++){
    const x=115+i*110;
    for(let f=0;f<5;f++) A.line(x-30+f*15,200,x-30+f*15,150,{c:SK,w:5},.08);
    A.rect(x-38,200,76,30,{c:SK,w:2.5,fill:SK,fo:.15},.12);
    A.text(x,258,String(5*(i+1)),{size:24,c:AM});
  }
  A.say("Count the hands: five, ten, fifteen, twenty, twenty-five, thirty.",
        "হাত গুনে বলো: পাঁচ, দশ, পনেরো, কুড়ি, পঁচিশ, ত্রিশ।");
  A.text(400,306,'5   10   15   20   25   30',{size:24,c:GR});
  A.say("Every number ends in five or zero.",
        "প্রতিটি সংখ্যা পাঁচ বা শূন্য দিয়ে শেষ হয়।");
  A.text(400,354,'5, 10, 15, 20, 25, 30',{size:22,c:SK});
  A.say("From thirty we can keep going: thirty-five, forty.",
        "ত্রিশ থেকে আরও এগোই: পঁয়ত্রিশ, চল্লিশ।");
  A.text(400,406,'+5 each time',{size:20,c:AM});
  NOTE(A,452,'five fingers, five more, keep counting.');
});

lesson('pn-223','Skip counting by 10s','Ten, twenty, thirty ... one hundred',A=>{
  A.say("A bundle of ten sticks is one ten.",
        "দশটি কাঠির একটি গোছা হলো এক দশ।");
  for(let i=0;i<10;i++){
    const x=95+i*68;
    for(let s=0;s<3;s++) A.line(x-8+s*8,150,x-8+s*8,196,{c:AM,w:2.5},.05);
    A.line(x-14,152,x+14,152,{c:RD,w:3},.05);
    A.text(x,222,String(10*(i+1)),{size:16,c:AM});
  }
  A.say("Ten, twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, one hundred.",
        "দশ, কুড়ি, ত্রিশ, চল্লিশ, পঞ্চাশ, ষাট, সত্তর, আশি, নব্বই, একশ।");
  A.line(90,300,710,300,{c:MU,w:3},.5);
  for(let i=0;i<10;i++){
    const x=95+i*68;
    A.circle(x,300,6,{c:GR,w:2,fill:GR,fo:.9},.08);
    A.text(x,332,String(10*(i+1)),{size:13,c:MU});
  }
  A.say("Each step adds ten, so only the tens digit changes.",
        "প্রতিটি ধাপে দশ যোগ হয়, তাই শুধু দশকের অঙ্ক বদলায়।");
  A.text(400,392,'10, 20, 30 ... 100',{size:24,c:GR});
  A.say("Skip counting by ten is fast for big numbers.",
        "বড় সংখ্যায় দশ করে গোনা খুব দ্রুত।");
  NOTE(A,448,'ten bundles make one hundred.');
});

lesson('pn-224','The number before','One step back on the path',A=>{
  A.say("The number before is one less. We take one step back.",
        "আগের সংখ্যা মানে এক কম। আমরা এক ধাপ পিছিয়ে যাই।");
  const nums=[9,10,11,12,13];
  for(let i=0;i<5;i++){
    const x=116+i*128;
    A.rect(x-52,130,104,86,{c:i===3?AM:SK,w:3,fill:i===3?AM:SK,fo:.12},.3);
    A.text(x,185,String(nums[i]),{size:34,c:i===3?AM:SK});
  }
  A.say("Here is the row nine, ten, eleven, twelve, thirteen.",
        "এখানে সারিটি নয়, দশ, এগারো, বারো, তেরো।");
  A.say("What comes just before thirteen? Count back one step to twelve.",
        "তেরোর ঠিক আগে কী আসে? এক ধাপ পিছিয়ে বারো।");
  A.arrow(500,250,372,250,{c:GR,w:3},.35);
  A.text(435,232,'one less',{size:18,c:GR});
  A.text(400,304,'13  ->  12',{size:30,c:AM});
  A.say("Before means the smaller neighbour. So before thirteen is twelve.",
        "আগে মানে ছোট প্রতিবেশী। তাই তেরোর আগে বারো।");
  A.text(400,362,'12 is just before 13',{size:22,c:SK});
  NOTE(A,448,'the number before is always one less.');
});

lesson('pn-225','The number after','One step forward',A=>{
  A.say("The number after is one more. We take one step forward.",
        "পরের সংখ্যা মানে এক বেশি। আমরা এক ধাপ সামনে যাই।");
  A.text(400,90,'a hop to the next stone',{size:18,c:MU});
  const xs=[150,280,410,540,670];
  for(let i=0;i<5;i++){
    A.ell(xs[i],210,40,20,{c:i===2?GR:MU,w:2.5,fill:i===2?GR:MU,fo:.15},.25);
    A.text(xs[i],218,String(6+i),{size:22,c:i===2?GR:INK});
  }
  A.say("The stones show six, seven, eight, nine and ten.",
        "পাথরগুলোতে ছয়, সাত, আট, নয় আর দশ লেখা।");
  A.arrow(445,158,525,158,{c:GR,w:3},.3);
  A.text(485,140,'one more',{size:18,c:GR});
  A.text(400,288,'8  ->  9',{size:30,c:AM});
  A.say("After eight is nine. After nine is ten.",
        "আটের পরে নয়। নয়ের পরে দশ।");
  A.text(400,342,'the next number is one more',{size:22,c:SK});
  A.say("The number after is always the bigger neighbour.",
        "পরের সংখ্যা সবসময় বড় প্রতিবেশী।");
  NOTE(A,448,'the number after is one more.');
});

lesson('pn-226','The number between','Eight, nine, ten',A=>{
  A.say("A number can sit between two numbers.",
        "একটি সংখ্যা দুই সংখ্যার মাঝখানে থাকতে পারে।");
  A.rect(120,140,120,100,{c:SK,w:3,fill:SK,fo:.12},.3);
  A.text(180,205,'8',{size:40,c:SK});
  A.rect(560,140,120,100,{c:SK,w:3,fill:SK,fo:.12},.3);
  A.text(620,205,'10',{size:40,c:SK});
  A.dashed(250,190,550,190,{c:MU,w:2},.3);
  A.say("Eight is on the left and ten is on the right.",
        "বাঁদিকে আট, ডানদিকে দশ।");
  A.circle(400,190,55,{c:AM,w:3,fill:AM,fo:.15},.4);
  A.text(400,206,'?',{size:36,c:AM});
  A.say("Which number comes between eight and ten? Count on from eight.",
        "আট আর দশের মাঝে কোন সংখ্যা? আট থেকে গুনে এগোও।");
  A.text(400,290,'8, 9, 10',{size:30,c:GR});
  A.text(400,340,'nine is between',{size:24,c:AM});
  A.say("Nine sits exactly between eight and ten.",
        "নয় ঠিক আট আর দশের মাঝখানে বসে।");
  NOTE(A,448,'between means greater than one and less than the other.');
});

lesson('pn-227','Compare three numbers','Four, seven and two',A=>{
  A.say("We can compare three numbers at once.",
        "আমরা একসাথে তিনটি সংখ্যা তুলনা করতে পারি।");
  A.say("These three bars stand for seven, four and two.",
        "এই তিনটি দণ্ড বোঝায় সাত, চার আর দুই।");
  const nums=[7,4,2];
  const cols=[GR,SK,PK];
  const names=['seven','four','two'];
  for(let i=0;i<3;i++){
    const y=160+i*90;
    A.text(110,y+8,names[i],{size:20,c:cols[i],anchor:'start'});
    A.rect(250,y-18,nums[i]*62,36,{c:cols[i],w:2.5,fill:cols[i],fo:.35},.3);
    A.text(250+nums[i]*62+28,y+9,String(nums[i]),{size:24,c:cols[i]});
  }
  A.say("The longest bar is seven, so seven is the greatest.",
        "সবচেয়ে লম্বা দণ্ড সাত, তাই সাত সবচেয়ে বড়।");
  A.say("The shortest bar is two, so two is the smallest.",
        "সবচেয়ে ছোট দণ্ড দুই, তাই দুই সবচেয়ে ছোট।");
  A.text(400,430,'2 < 4 < 7',{size:30,c:AM});
  NOTE(A,462,'longer bar, greater number.');
});

lesson('pn-228','ABB colour pattern','One red, two blue, again',A=>{
  A.say("A pattern repeats in the same order again and again.",
        "প্যাটার্নে একই ক্রম বারবার ফিরে আসে।");
  A.say("The rule here is ABB: one red bead, then two blue beads.",
        "এখানে নিয়ম ABB: একটি লাল পুঁতি, তারপর দুটি নীল পুঁতি।");
  for(let i=0;i<9;i++){
    const x=110+i*70;
    const c=i%3===0?RD:SK;
    A.circle(x,170,26,{c:c,w:3,fill:c,fo:.55},.15);
    A.text(x,222,i%3===0?'A':'B',{size:16,c:MU});
  }
  A.say("Red, blue, blue - red, blue, blue. The group of three repeats.",
        "লাল, নীল, নীল — লাল, নীল, নীল। তিনটির দল বারবার আসে।");
  A.text(400,280,'A  B  B   A  B  B   A  B  B',{size:20,c:MU});
  A.say("So the next bead after the last blue one is red.",
        "তাই শেষ নীল পুঁতির পরে আবার লাল আসবে।");
  A.arrow(686,170,694,170,{c:MU,w:2},.2);
  A.circle(716,170,22,{c:MU,w:3},.3);
  A.text(716,180,'?',{size:24,c:AM});
  A.text(400,350,'one red, two blue',{size:24,c:AM});
  A.text(400,402,'ABB  ABB  ABB',{size:22,c:SK});
  NOTE(A,452,'say ABB aloud to find the next colour.');
});

lesson('pn-229','ABAB colour pattern','Stripe, stripe, repeat',A=>{
  A.say("Some patterns use a simple swap: this, that, this, that.",
        "কিছু প্যাটার্নে পালা করে আসে: এটি, ওটি, এটি, ওটি।");
  A.say("This scarf has an ABAB pattern: yellow, green, yellow, green.",
        "এই শালটির প্যাটার্ন ABAB: হলুদ, সবুজ, হলুদ, সবুজ।");
  for(let i=0;i<8;i++){
    const x=120+i*72;
    const c=i%2===0?AM:GR;
    A.rect(x,120,58,150,{c:c,w:2.5,fill:c,fo:.45},.15);
    A.text(x+29,292,i%2===0?'A':'B',{size:16,c:MU});
  }
  A.say("The two colours take turns. A, then B, then A again.",
        "দুটি রং পালা করে আসে। A, তারপর B, আবার A।");
  A.text(400,340,'A  B  A  B  A  B  A  B',{size:22,c:MU});
  A.say("If it ends on green, the next stripe is yellow.",
        "যদি সবুজে শেষ হয়, পরের ডোরাটি হলুদ হবে।");
  A.circle(712,195,22,{c:MU,w:3},.3);
  A.text(712,205,'?',{size:22,c:AM});
  A.text(400,400,'yellow is A, green is B',{size:20,c:SK});
  NOTE(A,452,'ABAB just takes turns.');
});

lesson('pn-230','Hops on a number line','3 + 4 with four hops',A=>{
  A.say("We can add by making hops on a number line.",
        "সংখ্যা রেখায় লাফ দিয়ে আমরা যোগ করতে পারি।");
  A.line(90,300,720,300,{c:MU,w:3},.5);
  for(let i=0;i<=10;i++){
    const x=90+i*60;
    A.line(x,290,x,310,{c:MU,w:2},.05);
    A.text(x,336,String(i),{size:16,c:MU});
  }
  A.say("Start at three. Each hop moves one step to the right.",
        "তিন থেকে শুরু করো। প্রতিটি লাফ এক ঘর ডানে যায়।");
  for(let k=1;k<=4;k++){
    const x1=270+(k-1)*60, x2=270+k*60;
    A.arrow(x1,268,x2,268,{c:GR,w:2.5},.2);
  }
  A.say("One hop to four, two to five, three to six, four to seven.",
        "এক লাফে চার, দুইয়ে পাঁচ, তিনে ছয়, চার লাফে সাত।");
  A.circle(270,300,10,{c:AM,w:2.5,fill:AM,fo:.9},.2);
  A.circle(510,300,10,{c:GR,w:2.5,fill:GR,fo:.9},.2);
  A.text(270,254,'start',{size:15,c:AM});
  A.text(510,254,'end',{size:15,c:GR});
  A.say("Four hops from three land on seven. So three plus four is seven.",
        "তিন থেকে চার লাফে পৌঁছায় সাতে। তাই তিন যোগ চার সমান সাত।");
  A.text(400,392,'3 + 4 = 7',{size:34,c:GR});
  NOTE(A,450,'each hop adds one.');
});

lesson('pn-231','One more, one less','Seven in the middle',A=>{
  A.say("One more means add one. One less means take away one.",
        "এক বেশি মানে এক যোগ। এক কম মানে এক বিয়োগ।");
  A.say("Start with seven children in a line.",
        "ধরো সাতটি শিশু সারিতে দাঁড়িয়ে আছে।");
  for(let i=0;i<7;i++) A.circle(260+i*30,160,10,{c:SK,w:2,fill:SK,fo:.8},.08);
  A.text(360,196,'7 children',{size:18,c:SK});
  A.say("With one more child there are eight. With one less there are six.",
        "একজন বেশি হলে আটজন, একজন কম হলে ছয়জন।");
  A.rect(110,260,160,90,{c:AM,w:3,fill:AM,fo:.12},.3);
  A.text(190,296,'6',{size:34,c:AM});
  A.text(190,326,'one less',{size:16,c:MU});
  A.rect(320,250,160,110,{c:GR,w:3,fill:GR,fo:.16},.35);
  A.text(400,296,'7',{size:40,c:GR});
  A.text(400,332,'now',{size:16,c:MU});
  A.rect(530,260,160,90,{c:PK,w:3,fill:PK,fo:.12},.3);
  A.text(610,296,'8',{size:34,c:PK});
  A.text(610,326,'one more',{size:16,c:MU});
  A.say("The middle number has a neighbour on each side.",
        "মাঝের সংখ্যার দুই পাশে একটি করে প্রতিবেশী আছে।");
  A.text(400,400,'6   7   8',{size:30,c:AM});
  NOTE(A,452,'one more and one less are the two neighbours.');
});

lesson('pn-232','Two more, two less','Jump two steps',A=>{
  A.say("Two more means jump two steps forward. Two less means jump two steps back.",
        "দুই বেশি মানে দুই ধাপ সামনে। দুই কম মানে দুই ধাপ পিছনে।");
  A.line(100,230,700,230,{c:MU,w:3},.5);
  for(let i=0;i<=10;i++){
    const x=100+i*60;
    A.line(x,222,x,238,{c:MU,w:2},.05);
    A.text(x,262,String(i),{size:16,c:MU});
  }
  A.say("Start at five and jump two to the right. You land on seven.",
        "পাঁচ থেকে দুই ঘর ডানে লাফাও। পৌঁছাবে সাতে।");
  A.arrow(400,190,520,190,{c:GR,w:3},.3);
  A.text(460,172,'+2',{size:18,c:GR});
  A.say("Start at five and jump two to the left. You land on three.",
        "পাঁচ থেকে দুই ঘর বামে লাফাও। পৌঁছাবে তিনে।");
  A.arrow(400,310,280,310,{c:RD,w:3},.3);
  A.text(340,330,'-2',{size:18,c:RD});
  A.circle(400,230,10,{c:AM,w:2.5,fill:AM,fo:.9},.2);
  A.text(400,120,'start at 5',{size:20,c:AM});
  A.say("Five and seven and three: seven is two more, three is two less.",
        "পাঁচ, সাত আর তিন: সাত দুই বেশি, তিন দুই কম।");
  A.text(400,380,'3   5   7',{size:30,c:SK});
  A.text(400,424,'two steps each way',{size:18,c:MU});
  NOTE(A,460,'two steps forward or two steps back.');
});

lesson('pn-233','Tens and ones in bundles','Thirty-four is 3 tens and 4 ones',A=>{
  A.say("We bundle ten sticks into one group. That group is one ten.",
        "দশটি কাঠি একসাথে বাঁধলে হয় এক দশ।");
  A.say("Here are three full bundles and four single sticks.",
        "এখানে তিনটি পূর্ণ গোছা আর চারটি আলাদা কাঠি আছে।");
  for(let b=0;b<3;b++){
    const x=130+b*120;
    A.rect(x-30,130,60,120,{c:AM,w:2.5,fill:AM,fo:.12},.25);
    for(let s=0;s<5;s++) A.line(x-22+s*11,138,x-22+s*11,242,{c:AM,w:2},.04);
    A.line(x-34,178,x+34,178,{c:RD,w:3},.1);
    A.text(x,282,'10',{size:20,c:AM});
  }
  for(let s=0;s<4;s++) A.line(470+s*34,140,470+s*34,250,{c:GR,w:4},.1);
  A.text(520,282,'4 ones',{size:18,c:GR});
  A.say("Three tens make thirty, and four more ones make thirty-four.",
        "তিন দশে ত্রিশ, আর চারটি এক যোগে চৌত্রিশ।");
  A.text(400,330,'3 tens + 4 ones = 34',{size:26,c:AM});
  A.text(400,382,'30 + 4 = 34',{size:24,c:GR});
  A.say("The tens go in the tens place and the ones in the ones place.",
        "দশক যায় দশকের ঘরে, একক যায় এককের ঘরে।");
  A.text(400,428,'tens place: 3,  ones place: 4',{size:18,c:MU});
  NOTE(A,462,'bundle tens first, then add the ones.');
});

lesson('pn-234','Bangladeshi coins','One, two, five and ten taka',A=>{
  A.say("Bangladesh has coins of one, two and five taka.",
        "বাংলাদেশে এক, দুই আর পাঁচ টাকার কয়েন আছে।");
  const vals=[1,2,5,10];
  const cols=[AM,SK,GR,PK];
  for(let i=0;i<4;i++){
    const x=130+i*160;
    A.circle(x,180,i===3?44:38,{c:cols[i],w:3,fill:cols[i],fo:.18},.3);
    A.text(x,190,String(vals[i]),{size:30,c:cols[i]});
    A.text(x,262,'taka',{size:15,c:MU});
  }
  A.say("Ten taka is also a note. It is worth the same as ten one-taka coins.",
        "দশ টাকা কাগজের নোটও হয়। এটি দশটি এক টাকার সমান।");
  A.rect(300,300,130,66,{c:PK,w:3,fill:PK,fo:.12},.3);
  A.text(365,340,'10 taka',{size:22,c:PK});
  A.text(365,388,'one note',{size:16,c:MU});
  A.rect(490,300,180,66,{c:AM,w:2,fill:AM,fo:.06},.3);
  for(let i=0;i<5;i++) A.circle(510+i*34,333,12,{c:AM,w:2,fill:AM,fo:.6},.08);
  A.text(580,388,'five coins of 2 taka',{size:14,c:MU});
  A.say("Two taka plus two taka plus two taka plus two taka plus two taka is ten.",
        "দুই যোগ দুই যোগ দুই যোগ দুই যোগ দুই টাকা মিলে দশ টাকা।");
  A.say("We pick coins that add up to the price.",
        "দামের সমান হওয়া কয়েনগুলো আমরা বেছে নিই।");
  A.text(400,424,'1, 2, 5, 10 taka',{size:22,c:GR});
  NOTE(A,460,'count the value, not the number of coins.');
});

lesson('pn-235','O\'clock on a clock face','Three o\'clock and six o\'clock',A=>{
  A.say("The short hand shows the hour. The long hand shows the minutes.",
        "ছোট কাঁটা ঘণ্টা দেখায়, লম্বা কাঁটা মিনিট দেখায়।");
  const drawClock=(cx,cy,h)=>{
    A.circle(cx,cy,70,{c:INK,w:3,fill:'#0e1a2e',fo:.6},.4);
    for(let i=0;i<12;i++){
      const a=i*Math.PI/6-Math.PI/2;
      A.line(cx+Math.cos(a)*60,cy+Math.sin(a)*60,cx+Math.cos(a)*70,cy+Math.sin(a)*70,{c:MU,w:2},.05);
    }
    const ha=h*Math.PI/6-Math.PI/2;
    A.line(cx,cy,cx+Math.cos(ha)*40,cy+Math.sin(ha)*40,{c:AM,w:5},.2);
    A.line(cx,cy,cx,cy-58,{c:GR,w:3},.15);
    A.circle(cx,cy,5,{c:INK,w:1,fill:INK,fo:1},.1);
  };
  drawClock(250,205,3);
  A.text(250,318,'3 o\'clock',{size:22,c:AM});
  A.say("At three o'clock the short hand points to three and the long hand points to twelve.",
        "তিনটায় ছোট কাঁটা তিনে আর লম্বা কাঁটা বারোটায় থাকে।");
  drawClock(570,205,6);
  A.text(570,318,'6 o\'clock',{size:22,c:AM});
  A.say("At six o'clock the short hand points down to six.",
        "ছয়টায় ছোট কাঁটা নিচে ছয়ে থাকে।");
  A.say("When the long hand is on twelve, we say o'clock.",
        "যখন লম্বা কাঁটা বারোটায় থাকে, তখন আমরা বলি 'টা'।");
  A.text(400,382,'long hand on 12 means o\'clock',{size:18,c:MU});
  NOTE(A,450,'short hand names the hour.');
});

lesson('pn-236','Days of the week in order','Sunday to Saturday',A=>{
  A.say("A week has seven days, and they always come in the same order.",
        "এক সপ্তাহে সাত দিন, আর এরা সবসময় একই ক্রমে আসে।");
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  A.say("The week starts with Sunday, then Monday and Tuesday.",
        "সপ্তাহ শুরু হয় রবিবার, তারপর সোমবার আর মঙ্গলবার।");
  for(let i=0;i<7;i++){
    const y=100+i*50;
    A.circle(120,y,18,{c:i%2?SK:GR,w:2.5,fill:i%2?SK:GR,fo:.2},.12);
    A.text(120,y+6,String(i+1),{size:16,c:INK});
    A.text(170,y+8,days[i],{size:22,c:i%2?SK:GR,anchor:'start'});
    if(i<6) A.line(120,y+18,120,y+32,{c:MU,w:2},.08);
  }
  A.say("Then Wednesday, Thursday and Friday.",
        "তারপর বুধবার, বৃহস্পতিবার আর শুক্রবার।");
  A.say("Saturday is the last day, and after it Sunday comes again.",
        "শনিবার শেষ দিন, আর তারপর আবার রবিবার আসে।");
  A.text(560,150,'seven days',{size:22,c:AM});
  A.text(560,204,'school days',{size:18,c:SK});
  A.text(560,238,'Friday and Saturday',{size:16,c:MU});
  A.text(560,268,'are the weekend',{size:16,c:MU});
  A.text(560,340,'then repeat',{size:18,c:GR});
  NOTE(A,452,'say the seven days in order every morning.');
});

lesson('pn-237','Heavy and light','The heavier side goes down',A=>{
  A.say("Heavy things pull the balance down. Light things go up.",
        "ভারী জিনিস দাঁড়িপাল্লা নিচে টানে, হালকা জিনিস উপরে ওঠে।");
  A.line(230,196,570,146,{c:MU,w:5},.4);
  A.line(400,171,400,330,{c:MU,w:4},.3);
  A.line(340,330,400,352,{c:MU,w:3},.2);
  A.line(460,330,400,352,{c:MU,w:3},.2);
  A.say("Here is a balance. Two things hang on the two sides.",
        "এটি একটি দাঁড়িপাল্লা। দুই পাশে দুইটি জিনিস ঝুলছে।");
  A.line(230,196,230,250,{c:MU,w:2},.15);
  A.ell(230,270,60,20,{c:MU,w:2.5,fill:MU,fo:.15},.2);
  A.rect(202,236,56,32,{c:AM,w:2.5,fill:AM,fo:.35},.2);
  A.line(570,146,570,200,{c:MU,w:2},.15);
  A.ell(570,220,60,20,{c:MU,w:2.5,fill:MU,fo:.15},.2);
  A.circle(570,206,18,{c:PK,w:2.5,fill:PK,fo:.35},.15);
  A.say("The box on the left is heavy. The balloon on the right is light.",
        "বাঁদিকের বাক্সটি ভারী। ডানদিকের বেলুনটি হালকা।");
  A.text(230,318,'heavy',{size:20,c:AM});
  A.text(570,262,'light',{size:20,c:PK});
  A.arrow(300,300,360,320,{c:GR,w:2.5},.25);
  A.text(400,402,'the heavy side sinks',{size:20,c:GR});
  A.say("We use a balance to compare weight.",
        "ওজন মাপতে আমরা দাঁড়িপাল্লা ব্যবহার করি।");
  NOTE(A,446,'the side that sinks holds the heavier thing.');
});

lesson('pn-238','Long and short','Same start line',A=>{
  A.say("Long and short compare length from the same starting point.",
        "লম্বা আর ছোট তুলনা করতে একই শুরু বিন্দু থেকে মাপি।");
  A.dashed(110,140,110,330,{c:MU,w:2},.35);
  A.text(110,124,'start',{size:15,c:MU});
  A.rect(110,180,470,34,{c:GR,w:2.5,fill:GR,fo:.35},.4);
  A.text(600,202,'long snake',{size:18,c:GR,anchor:'start'});
  A.rect(110,280,220,34,{c:PK,w:2.5,fill:PK,fo:.35},.4);
  A.text(350,302,'short snake',{size:18,c:PK,anchor:'start'});
  A.say("Both snakes start at the same line, so we can compare them.",
        "দুই সাপ একই রেখা থেকে শুরু, তাই তুলনা করা যায়।");
  A.say("The green snake reaches much further. It is the longer one.",
        "সবুজ সাপ অনেক দূর পর্যন্ত যায়। সে-ই লম্বা।");
  A.arrow(340,240,560,240,{c:AM,w:2.5},.3);
  A.text(450,222,'longer',{size:18,c:AM});
  A.say("If we start at different places, we cannot compare fairly.",
        "আলাদা জায়গা থেকে শুরু করলে ঠিকভাবে তুলনা হয় না।");
  A.text(400,372,'start together to compare',{size:20,c:SK});
  NOTE(A,440,'the longer one covers more distance.');
});

lesson('pn-239','Full and empty','Water level shows how much',A=>{
  A.say("Full means there is no space left. Empty means nothing is inside.",
        "ভরা মানে আর জায়গা নেই। খালি মানে ভেতরে কিছু নেই।");
  const drawJug=(cx,level,col)=>{
    A.pts([[cx-45,120],[cx+45,120],[cx+45,300],[cx-45,300],[cx-45,120]],{c:col,w:3},.3);
    if(level>0) A.rect(cx-40,300-level*160,80,level*160,{c:SK,w:1,fill:SK,fo:.45},.3);
  };
  drawJug(180,1,GR);
  A.text(180,332,'full',{size:22,c:GR});
  A.say("The first jug is full of water right up to the top.",
        "প্রথম জগটি উপরে পর্যন্ত পানিতে ভরা।");
  drawJug(400,0.5,AM);
  A.text(400,332,'half full',{size:22,c:AM});
  A.say("The second jug is half full.",
        "দ্বিতীয় জগটি অর্ধেক ভরা।");
  drawJug(620,0,RD);
  A.text(620,332,'empty',{size:22,c:RD});
  A.say("The third jug is empty. There is no water at all.",
        "তৃতীয় জগটি খালি। একদম পানি নেই।");
  A.say("We can tell by looking at the water level.",
        "পানির উচ্চতা দেখেই আমরা বুঝতে পারি।");
  A.text(400,392,'top level = full, low level = less',{size:18,c:MU});
  NOTE(A,448,'full, half full and empty.');
});

lesson('pn-240','More or less capacity','Which holds more?',A=>{
  A.say("Capacity is how much a container can hold.",
        "ধারণক্ষমতা মানে একটি পাত্র কতটা ধরে।");
  A.rect(120,170,140,190,{c:SK,w:3,fill:SK,fo:.12},.35);
  A.rect(124,252,132,104,{c:SK,w:1,fill:SK,fo:.5},.3);
  A.text(190,392,'big jug',{size:18,c:SK});
  A.rect(480,220,110,140,{c:PK,w:3,fill:PK,fo:.12},.35);
  A.rect(484,272,102,84,{c:SK,w:1,fill:SK,fo:.5},.3);
  A.text(535,392,'small cup',{size:18,c:PK});
  A.say("Here is a big jug and a small cup.",
        "এখানে একটি বড় জগ আর একটি ছোট কাপ।");
  A.say("The big jug holds much more, and the small cup holds less.",
        "বড় জগ অনেক বেশি ধরে, আর ছোট কাপ কম ধরে।");
  A.arrow(300,250,450,260,{c:GR,w:3},.3);
  A.text(375,232,'more',{size:18,c:GR});
  A.say("Capacity is not about how heavy it is, but how much fits inside.",
        "ধারণক্ষমতা ওজন নয়, ভেতরে কতটা ধরবে তা।");
  A.text(400,430,'bigger container, more capacity',{size:19,c:AM});
  NOTE(A,462,'the bigger container has more capacity.');
});

lesson('pn-241','Sides and corners','Count the sides and corners',A=>{
  A.say("Every flat shape has sides and corners.",
        "প্রতিটি সমতল আকৃতির বাহু আর কোণ আছে।");
  A.pts([[110,120],[210,120],[210,220],[110,220],[110,120]],{c:SK,w:3,fill:SK,fo:.12},.4);
  A.text(160,264,'square',{size:18,c:SK});
  A.text(160,292,'4 sides, 4 corners',{size:15,c:MU});
  A.say("A square has four straight sides and four corners.",
        "বর্গের চারটি সোজা বাহু আর চারটি কোণ আছে।");
  A.pts([[320,220],[400,90],[480,220],[320,220]],{c:GR,w:3,fill:GR,fo:.12},.4);
  A.text(400,264,'triangle',{size:18,c:GR});
  A.text(400,292,'3 sides, 3 corners',{size:15,c:MU});
  A.say("A triangle has three sides and three corners.",
        "ত্রিভুজের তিনটি বাহু আর তিনটি কোণ আছে।");
  A.circle(640,166,66,{c:PK,w:3,fill:PK,fo:.12},.4);
  A.text(640,264,'circle',{size:18,c:PK});
  A.text(640,292,'0 sides, 0 corners',{size:15,c:MU});
  A.say("A circle has no straight sides and no corners.",
        "বৃত্তের কোনো সোজা বাহু বা কোণ নেই।");
  A.text(400,340,'sides are straight edges; corners are points',{size:17,c:AM});
  NOTE(A,440,'count carefully: a circle has none.');
});

lesson('pn-242','Rectangle and square','Same corners, different sides',A=>{
  A.say("Both a square and a rectangle have four sides and four corners.",
        "বর্গ আর আয়তক্ষেত্র দুটিরই চারটি বাহু আর চারটি কোণ আছে।");
  A.pts([[100,140],[240,140],[240,280],[100,280],[100,140]],{c:SK,w:3,fill:SK,fo:.12},.4);
  A.text(170,318,'square',{size:20,c:SK});
  A.say("In a square all four sides are the same length.",
        "বর্গের চারটি বাহুর দৈর্ঘ্য সমান।");
  A.text(170,120,'4 = 4 = 4 = 4',{size:14,c:MU});
  A.pts([[400,160],[680,160],[680,260],[400,260],[400,160]],{c:GR,w:3,fill:GR,fo:.12},.4);
  A.text(540,318,'rectangle',{size:20,c:GR});
  A.say("In a rectangle two sides are long and two are short.",
        "আয়তক্ষেত্রের দুই বাহু লম্বা আর দুই বাহু ছোট।");
  A.text(540,140,'long',{size:15,c:GR});
  A.text(382,214,'short',{size:15,c:GR,anchor:'end'});
  A.say("So a square is a special rectangle with all sides equal.",
        "তাই বর্গ হলো এক বিশেষ আয়তক্ষেত্র, যার সব বাহু সমান।");
  A.text(400,372,'4 corners each, but sides differ',{size:18,c:AM});
  NOTE(A,444,'a square is a rectangle with equal sides.');
});

lesson('pn-243','Triangle and circle','Corners or curves',A=>{
  A.say("A triangle is made of straight lines. A circle is one smooth curve.",
        "ত্রিভুজ সোজা রেখায় গড়া। বৃত্ত একটি মসৃণ বাঁকা রেখা।");
  A.pts([[160,230],[280,230],[220,100],[160,230]],{c:GR,w:3,fill:GR,fo:.12},.4);
  A.text(220,272,'triangle',{size:20,c:GR});
  A.circle(560,166,66,{c:SK,w:3,fill:SK,fo:.12},.4);
  A.text(560,272,'circle',{size:20,c:SK});
  A.say("The triangle has three corners and three straight sides.",
        "ত্রিভুজের তিনটি কোণ আর তিনটি সোজা বাহু আছে।");
  A.text(220,312,'3 sides, 3 corners',{size:16,c:MU});
  A.say("The circle has no corner and no straight side.",
        "বৃত্তের কোনো কোণ নেই, সোজা বাহুও নেই।");
  A.text(560,312,'no corners at all',{size:16,c:MU});
  A.say("A triangle can slide but a circle can roll.",
        "ত্রিভুজ গড়িয়ে যেতে পারে না, কিন্তু বৃত্ত গড়িয়ে যায়।");
  A.arrow(200,350,150,400,{c:GR,w:2.5},.25);
  A.text(140,352,'slide',{size:16,c:GR});
  A.arrow(560,350,640,400,{c:SK,w:2.5},.25);
  A.text(650,352,'roll',{size:16,c:SK});
  NOTE(A,452,'corners stop a shape from rolling.');
});

lesson('pn-244','Roll, slide or stack','Sort the solids',A=>{
  A.say("Some objects roll, some slide and some stack.",
        "কিছু জিনিস গড়ায়, কিছু পিছলে যায়, কিছু স্তূপ করা যায়।");
  A.circle(140,180,40,{c:PK,w:3,fill:PK,fo:.2},.35);
  A.text(140,244,'ball rolls',{size:17,c:PK});
  A.rect(320,140,90,90,{c:SK,w:3,fill:SK,fo:.15},.35);
  A.text(365,254,'box slides',{size:17,c:SK});
  A.rect(500,160,60,60,{c:AM,w:3,fill:AM,fo:.2},.3);
  A.rect(500,94,60,60,{c:AM,w:3,fill:AM,fo:.2},.3);
  A.text(530,254,'blocks stack',{size:17,c:AM});
  A.say("A ball is round, so it rolls easily.",
        "বল গোলাকার, তাই সহজে গড়িয়ে যায়।");
  A.say("A box has flat faces, so it slides and can be pushed.",
        "বাক্সের সমতল তল আছে, তাই এটি পিছলে যায় আর ঠেলা যায়।");
  A.say("Flat blocks can sit on top of each other and stack up.",
        "সমতল ব্লক একটির ওপর আরেকটি বসিয়ে স্তূপ করা যায়।");
  A.line(90,296,690,296,{c:MU,w:2},.3);
  A.text(140,330,'roll',{size:18,c:PK});
  A.text(365,330,'slide',{size:18,c:SK});
  A.text(530,330,'stack',{size:18,c:AM});
  A.text(400,386,'round rolls, flat slides or stacks',{size:18,c:GR});
  NOTE(A,442,'test each object on a slope.');
});

lesson('pn-245','Number pattern by twos','Two, four, six, eight',A=>{
  A.say("In a number pattern the rule stays the same.",
        "সংখ্যার প্যাটার্নে নিয়ম একই থাকে।");
  A.say("This pattern starts at two and adds two each time.",
        "এই প্যাটার্ন দুই থেকে শুরু, প্রতিবার দুই যোগ হয়।");
  const lane=[2,4,6,8,10];
  for(let i=0;i<5;i++){
    const x=120+i*130;
    A.circle(x,180,40,{c:i%2?SK:AM,w:3,fill:i%2?SK:AM,fo:.16},.3);
    A.text(x,192,String(lane[i]),{size:26,c:i%2?SK:AM});
    if(i<4){
      A.arrow(x+46,180,x+84,180,{c:GR,w:2.5},.2);
      A.text(x+65,162,'+2',{size:14,c:GR});
    }
  }
  A.say("Two, four, six, eight and ten. Each number is two more than the one before.",
        "দুই, চার, ছয়, আট আর দশ। প্রতিটি আগেরটির চেয়ে দুই বেশি।");
  A.text(400,280,'rule: add 2',{size:24,c:AM});
  A.say("If we keep going, the next number is twelve.",
        "এভাবে চললে পরের সংখ্যা বারো।");
  A.text(400,340,'2, 4, 6, 8, 10, 12',{size:26,c:GR});
  A.text(400,396,'same rule, same step',{size:18,c:MU});
  NOTE(A,448,'find the rule, then follow it.');
});

lesson('pn-246','The missing number','Fill the gap in the pattern',A=>{
  A.say("Sometimes one number in a pattern is hidden.",
        "কখনো প্যাটার্নের একটি সংখ্যা লুকানো থাকে।");
  const seq=[5,10,null,20,25];
  for(let i=0;i<5;i++){
    const x=110+i*140;
    A.rect(x-56,140,112,90,{c:seq[i]===null?AM:SK,w:3,fill:seq[i]===null?AM:SK,fo:.12},.3);
    A.text(x,198,seq[i]===null?'?':String(seq[i]),{size:32,c:seq[i]===null?AM:SK});
  }
  A.say("Look at the numbers we can see: five, ten, twenty, twenty-five.",
        "যেগুলো দেখা যাচ্ছে: পাঁচ, দশ, কুড়ি, পঁচিশ।");
  A.say("Each step adds five. So between ten and twenty we need fifteen.",
        "প্রতিটি ধাপে পাঁচ যোগ হয়। তাই দশ আর কুড়ির মাঝে দরকার পনেরো।");
  A.text(400,290,'+5    +5    +5    +5',{size:18,c:MU});
  A.text(400,344,'5, 10, 15, 20, 25',{size:28,c:GR});
  A.say("Fifteen is the missing number that keeps the pattern going.",
        "পনেরো-ই সেই হারানো সংখ্যা, যা প্যাটার্ন চালু রাখে।");
  A.text(400,400,'the gap is 15',{size:22,c:AM});
  NOTE(A,450,'check the jump, then fill the gap.');
});

lesson('pn-247','Counting backwards from ten','Ten, nine, eight ... one',A=>{
  A.say("Counting backwards means going down by one each time.",
        "উল্টো গোনা মানে প্রতিবার এক এক করে কমে যাওয়া।");
  A.say("Ten birds sit on a wire. One flies away at a time.",
        "তারের ওপর দশটি পাখি বসে আছে। একে একে উড়ে যায়।");
  for(let i=0;i<10;i++) A.circle(120+i*60,160,13,{c:SK,w:2,fill:SK,fo:.7},.06);
  A.text(400,204,'10 birds',{size:18,c:SK});
  A.say("Ten, nine, eight, seven, six, five, four, three, two, one.",
        "দশ, নয়, আট, সাত, ছয়, পাঁচ, চার, তিন, দুই, এক।");
  for(let i=0;i<10;i++){
    const x=110+i*62;
    const y=250+i*15;
    A.rect(x-26,y,52,40,{c:i%2?AM:GR,w:2.5,fill:i%2?AM:GR,fo:.28},.1);
    A.text(x,y+27,String(10-i),{size:20,c:INK});
  }
  A.arrow(150,232,650,232,{c:RD,w:2.5},.35);
  A.text(400,222,'count down',{size:18,c:RD});
  A.say("Each step takes away one, so the numbers get smaller.",
        "প্রতিটি ধাপে একটি কমে, তাই সংখ্যা ছোট হয়।");
  A.say("When we reach one, the next stop is zero: nothing left.",
        "এক-এ পৌঁছে পরের ধাপ শূন্য: কিছুই বাকি নেই।");
  A.text(400,440,'10 -> 9 -> 8 ... -> 1 -> 0',{size:18,c:SK});
  NOTE(A,466,'count down slowly and keep the order.');
});
