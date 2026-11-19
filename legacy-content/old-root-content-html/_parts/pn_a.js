/* Play & Nursery — part A: lessons pn-201 to pn-220 */

lesson('pn-201','Ordinal numbers: 1st to 5th','First, second, third, fourth, fifth',A=>{
  A.say("Here is a running race. Five children run to the finish line.",
        "এখানে একটি দৌড় প্রতিযোগিতা। পাঁচটি শিশু শেষ রেখার দিকে ছুটছে।");
  const names=['1st','2nd','3rd','4th','5th'];
  const words=['first','second','third','fourth','fifth'];
  const cols=[AM,SK,GR,PK,VI];
  for(let i=0;i<5;i++){
    const x=100+i*125;
    A.rect(x,130,105,115,{c:cols[i],w:3,fill:cols[i],fo:.14},.3);
    A.text(x+52,180,names[i],{size:30,c:cols[i]});
    A.text(x+52,218,words[i],{size:16,c:MU});
  }
  A.say("The child who finishes first is 1st. We also say first.",
        "যে সবার আগে শেষ করে, সে প্রথম। আমরা লিখি ১ম (1st)।");
  A.text(400,290,'order, not amount',{size:24,c:AM});
  A.say("Then come 2nd, 3rd, 4th and 5th.",
        "তারপর আসে ২য়, ৩য়, ৪র্থ আর ৫ম।");
  A.say("Ordinal numbers tell us the order. They do not tell us how many.",
        "ক্রমবাচক সংখ্যা ক্রম বা স্থান বলে, কতগুলো তা নয়।");
  A.text(250,345,'how many?',{size:18,c:MU});
  for(let i=0;i<5;i++) A.circle(190+i*30,382,8,{c:GR,w:2,fill:GR,fo:.9},.1);
  A.text(250,414,'5 runners',{size:18,c:GR});
  A.text(560,345,'which place?',{size:18,c:MU});
  A.text(560,394,'3rd',{size:32,c:PK});
  NOTE(A,452,'1st, 2nd and 3rd tell the place in line.');
});

lesson('pn-202','Doubles: 1+1 to 5+5','A double is the same number twice',A=>{
  A.say("A double means adding the same number two times.",
        "দ্বিগুণ মানে একই সংখ্যা দুইবার যোগ করা।");
  A.say("One and one make two.",
        "এক যোগ এক সমান দুই।");
  for(let n=1;n<=5;n++){
    const y=120+n*42;
    A.text(85,y+8,'double '+n,{size:20,c:MU,anchor:'start'});
    for(let i=0;i<n;i++) A.circle(255+i*22,y,9,{c:AM,w:2,fill:AM,fo:.9},.1);
    A.text(372,y+7,'=',{size:22,c:INK});
    for(let i=0;i<2*n;i++) A.circle(405+i*17,y,7,{c:GR,w:2,fill:GR,fo:.9},.08);
    A.text(614,y+9,String(2*n),{size:28,c:GR});
  }
  A.say("Two and two make four, and three and three make six.",
        "দুই যোগ দুই সমান চার, আর তিন যোগ তিন সমান ছয়।");
  A.say("Four and four make eight, and five and five make ten.",
        "চার যোগ চার আট, আর পাঁচ যোগ পাঁচ দশ।");
  A.text(400,382,'2, 4, 6, 8, 10',{size:28,c:AM});
  NOTE(A,442,'the doubles grow by two each time.');
});

lesson('pn-203','Number bonds to 10','Two parts make ten',A=>{
  A.say("Ten can be split into two parts. Each split is a number bond.",
        "দশকে দুইটি ভাগে ভাগ করা যায়। প্রতিটি ভাগকে সংখ্যা বন্ধন বলা হয়।");
  const fx=310, fy=85, cell=30;
  for(let i=0;i<10;i++){
    const r=Math.floor(i/5), k=i%5;
    A.rect(fx+k*cell,fy+r*cell,cell-2,cell-2,{c:MU,w:2},.08);
    A.circle(fx+k*cell+(cell-2)/2,fy+r*cell+(cell-2)/2,9,{c:AM,w:2,fill:AM,fo:.9},.08);
  }
  A.text(505,124,'10 dots',{size:22,c:AM});
  const pairs=[[1,9],[2,8],[3,7],[4,6],[5,5]];
  A.say("One and nine make ten.",
        "এক আর নয় মিলে দশ।");
  for(let i=0;i<5;i++){
    const cx=110+i*140;
    A.line(cx,212,cx-26,246,{c:MU,w:2},.2);
    A.line(cx,212,cx+26,246,{c:MU,w:2},.2);
    A.circle(cx,194,18,{c:PK,w:2.5,fill:PK,fo:.15},.2);
    A.text(cx,200,'10',{size:14,c:PK});
    A.circle(cx-26,260,15,{c:SK,w:2.5,fill:SK,fo:.15},.2);
    A.circle(cx+26,260,15,{c:GR,w:2.5,fill:GR,fo:.15},.2);
    A.text(cx-26,266,String(pairs[i][0]),{size:16,c:SK});
    A.text(cx+26,266,String(pairs[i][1]),{size:16,c:GR});
    A.text(cx,302,pairs[i][0]+' + '+pairs[i][1]+' = 10',{size:17,c:INK});
  }
  A.say("Two and eight, three and seven, four and six, five and five also make ten.",
        "দুই আর আট, তিন আর সাত, চার আর ছয়, পাঁচ আর পাঁচও দশ।");
  A.say("Every bond has one whole and two parts.",
        "প্রতিটি বন্ধনে একটি সম্পূর্ণ আর দুইটি অংশ থাকে।");
  A.text(400,360,'one whole, two parts',{size:24,c:AM});
  NOTE(A,448,'two parts always add up to ten.');
});

lesson('pn-204','AAB colour pattern','Two red, one blue, again',A=>{
  A.say("A pattern repeats the same design again and again.",
        "প্যাটার্ন মানে একই নকশা বারবার আসে।");
  A.say("Here the rule is AAB: two red, then one blue.",
        "এখানে নিয়ম হলো দুইটি লাল, তারপর একটি নীল।");
  for(let i=0;i<10;i++){
    const x=95+i*63;
    const c=i%3===2?SK:RD;
    A.circle(x,170,24,{c:c,w:3,fill:c,fo:.2},.25);
    A.text(x,216,i%3===2?'B':'A',{size:16,c:MU});
  }
  A.arrow(680,170,690,170,{c:MU,w:2},.25);
  A.circle(714,170,24,{c:MU,w:3},.3);
  A.text(714,180,'?',{size:26,c:AM});
  A.say("Red, red, blue - red, red, blue. It keeps on going.",
        "লাল, লাল, নীল — লাল, লাল, নীল — এভাবে চলতে থাকে।");
  A.say("What comes next? Yes, red.",
        "পরেরটি কী হবে? হ্যাঁ, লাল।");
  A.text(400,286,'two red, one blue, again',{size:24,c:AM});
  A.text(400,338,'A  A  B   A  A  B   A  A  B',{size:20,c:MU});
  NOTE(A,440,'say the pattern aloud to find the next colour.');
});

lesson('pn-205','Oval, star, heart and diamond','Four special shapes',A=>{
  A.say("Some shapes are not made only of straight sides.",
        "কিছু আকৃতির পাশ সোজা নয়, বাঁকা।");
  A.ell(150,190,60,42,{c:SK,w:3,fill:SK,fo:.15},.4);
  A.text(150,300,'oval',{size:20,c:SK});
  A.say("An oval looks like a stretched circle.",
        "ডিম্বাকৃতি দেখতে টানা বৃত্তের মতো।");
  const star=[];
  for(let i=0;i<10;i++){
    const rad=i%2===0?62:26;
    const a=-Math.PI/2+i*Math.PI/5;
    star.push([320+Math.cos(a)*rad,190+Math.sin(a)*rad]);
  }
  A.pts(star,{c:AM,w:3,fill:AM,fo:.18},.5);
  A.text(320,300,'star',{size:20,c:AM});
  A.say("A star has five points.",
        "তারার পাঁচটি কোণ আছে।");
  A.pts([[660,236],[620,196],[615,166],[632,146],[660,161],[688,146],[705,166],[700,196],[660,236]],{c:RD,w:3,fill:RD,fo:.16},.5);
  A.text(660,300,'heart',{size:20,c:RD});
  A.pts([[490,128],[550,190],[490,252],[430,190],[490,128]],{c:VI,w:3,fill:VI,fo:.16},.4);
  A.text(490,300,'diamond',{size:20,c:VI});
  A.say("A heart is curved, and a diamond is a square standing on a corner.",
        "হৃদয় বাঁকা, আর রম্বস চারকোণা — একটু ঘোরানো বর্গের মতো।");
  A.say("Curves and points make many different shapes.",
        "বাঁকা রেখা আর কোণ মিলে নানা রকম আকৃতি তৈরি হয়।");
  A.text(400,356,'curves and points',{size:24,c:AM});
  NOTE(A,440,'look around and find these shapes at home.');
});

lesson('pn-206','Symmetry: fold and match','A fold makes two matching halves',A=>{
  A.say("A shape is symmetric if a fold makes two matching halves.",
        "কোনো আকৃতি প্রতিসম, যদি ভাঁজ করলে দুই অংশ মিলে যায়।");
  A.pts([[230,238],[190,198],[185,168],[202,148],[230,163],[258,148],[275,168],[270,198],[230,238]],{c:PK,w:3,fill:PK,fo:.15},.5);
  A.dashed(230,100,230,290,{c:AM,w:2},.4);
  A.text(230,318,'fold here',{size:18,c:AM});
  A.say("Fold this heart down the middle. The two sides match.",
        "এই হৃদয়টিকে মাঝখানে ভাঁজ করো — দুই পাশ একই রকম।");
  A.rect(500,120,130,130,{c:SK,w:3,fill:SK,fo:.08},.4);
  A.dashed(565,104,565,266,{c:AM,w:2},.25);
  A.dashed(484,185,646,185,{c:AM,w:2},.25);
  A.dashed(500,120,630,250,{c:AM,w:2},.25);
  A.dashed(630,120,500,250,{c:AM,w:2},.25);
  A.text(565,304,'four folds',{size:18,c:SK});
  A.say("A square can fold in four ways.",
        "বর্গকে চারভাবে ভাঁজ করা যায়।");
  A.circle(400,365,38,{c:GR,w:3,fill:GR,fo:.1},.35);
  A.dashed(362,365,438,365,{c:AM,w:1.5},.2);
  A.dashed(400,327,400,403,{c:AM,w:1.5},.2);
  A.text(400,428,'many folds',{size:17,c:GR});
  A.say("A circle can fold in many ways.",
        "বৃত্তকে অনেকভাবে ভাঁজ করা যায়।");
  NOTE(A,460,'both halves must match exactly.');
});

lesson('pn-207','Sorting by colour','Put each colour in its own box',A=>{
  A.say("Sorting means putting things that are alike into one group.",
        "সাজানো মানে একই রকম জিনিস একসাথে রাখা।");
  const spots=[[150,130,RD],[260,110,SK],[380,150,AM],[500,120,RD],[620,140,SK],[200,205,AM],[330,215,RD],[460,200,SK],[590,210,AM]];
  spots.forEach(p=>A.circle(p[0],p[1],20,{c:p[2],w:2.5,fill:p[2],fo:.6},.15));
  A.say("Here are red, blue and yellow buttons.",
        "এখানে লাল, নীল আর হলুদ বোতাম আছে।");
  const bx=[90,310,530];
  const bc=[RD,SK,AM];
  const bn=['red','blue','yellow'];
  for(let i=0;i<3;i++){
    A.rect(bx[i],300,180,110,{c:bc[i],w:3,fill:bc[i],fo:.08},.35);
    A.text(bx[i]+90,335,bn[i],{size:20,c:bc[i]});
    for(let k=0;k<3;k++) A.circle(bx[i]+45+k*45,375,13,{c:bc[i],w:2,fill:bc[i],fo:.8},.12);
  }
  A.say("Put all the red ones in one box, all the blue in another, and all the yellow in the third.",
        "সব লাল একটি বাক্সে, সব নীল আরেকটিতে, সব হলুদ তৃতীয়টিতে।");
  A.say("Now each box holds one colour.",
        "এখন প্রতিটি বাক্সে একই রঙের জিনিস।");
  A.text(400,272,'three colour groups',{size:18,c:MU});
  NOTE(A,448,'sorting makes it easy to see how many of each.');
});

lesson('pn-208','Sorting by size','Big, middle and small',A=>{
  A.say("We can also sort things by size.",
        "আকার দেখে আমরা জিনিস সাজাতে পারি।");
  const centers=[180,400,620];
  const ringCols=[AM,SK,PK];
  const labels=['big','middle','small'];
  const radii=[22,15,9];
  A.say("These balls are big, middle and small.",
        "এই বলগুলো বড়, মাঝারি আর ছোট।");
  for(let i=0;i<3;i++){
    A.ell(centers[i],330,95,70,{c:ringCols[i],w:3,fill:ringCols[i],fo:.06},.4);
    A.text(centers[i],246,labels[i],{size:22,c:ringCols[i]});
    A.circle(centers[i]-32,330,radii[i],{c:ringCols[i],w:2.5,fill:ringCols[i],fo:.6},.2);
    A.circle(centers[i]+32,330,radii[i],{c:ringCols[i],w:2.5,fill:ringCols[i],fo:.6},.2);
  }
  A.say("Big balls go in the big ring, middle balls in the middle ring.",
        "বড় বলগুলো বড় ঝুড়িতে, মাঝারিগুলো মাঝারি ঝুড়িতে যাবে।");
  A.say("Small balls stay in the small ring.",
        "ছোট বলগুলো ছোট ঝুড়িতে থাকবে।");
  A.text(400,420,'big, middle, small',{size:24,c:AM});
  NOTE(A,455,'size means how big or small something is.');
});

lesson('pn-209','Position words: above and below','Above, below, left and right',A=>{
  A.say("Position words tell us where something is.",
        "অবস্থান শব্দ বলে জিনিস কোথায় আছে।");
  A.circle(400,214,50,{c:GR,w:3,fill:GR,fo:.15},.4);
  A.rect(390,258,20,58,{c:MU,w:2,fill:MU,fo:.5},.3);
  A.circle(400,118,16,{c:SK,w:2.5,fill:SK,fo:.2},.3);
  A.pts([[416,118],[430,112],[416,126],[416,118]],{c:AM,w:2,fill:AM,fo:.8},.2);
  A.say("The bird is above the tree.",
        "পাখিটি গাছের উপরে।");
  A.circle(400,375,22,{c:AM,w:2.5,fill:AM,fo:.2},.3);
  A.pts([[384,362],[390,344],[398,360]],{c:AM,w:2,fill:AM,fo:.4},.2);
  A.pts([[402,360],[410,344],[416,362]],{c:AM,w:2,fill:AM,fo:.4},.2);
  A.text(440,382,'cat',{size:16,c:MU,anchor:'start'});
  A.say("The cat is below the tree.",
        "বিড়ালটি গাছের নিচে।");
  A.circle(140,250,28,{c:RD,w:3,fill:RD,fo:.2},.3);
  A.pts([[660,210],[700,250],[660,290],[620,250],[660,210]],{c:PK,w:3,fill:PK,fo:.18},.4);
  A.line(660,290,650,330,{c:MU,w:2},.2);
  A.say("The ball is on the left. The kite is on the right.",
        "বলটি বাঁদিকে, আর ঘুড়িটি ডানদিকে।");
  A.text(400,84,'above',{size:20,c:AM});
  A.text(400,434,'below',{size:20,c:AM});
  A.text(104,306,'left',{size:20,c:MU});
  A.text(696,318,'right',{size:20,c:MU});
  NOTE(A,462,'stand still and point to show left and right.');
});

lesson('pn-210','Months of the year','Twelve months make one year',A=>{
  A.say("A year is divided into twelve months.",
        "এক বছরকে বারো মাসে ভাগ করা হয়।");
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const cols=[SK,GR,PK,AM,VI,RD];
  for(let i=0;i<4;i++){
    A.rect(75+i*165,100,145,72,{c:cols[i],w:2.5,fill:cols[i],fo:.1},.25);
    A.text(147+i*165,144,months[i],{size:18,c:cols[i]});
  }
  A.say("January, February, March and April begin the year.",
        "জানুয়ারি, ফেব্রুয়ারি, মার্চ আর এপ্রিল দিয়ে বছর শুরু হয়।");
  for(let i=0;i<4;i++){
    A.rect(75+i*165,190,145,72,{c:cols[i+1],w:2.5,fill:cols[i+1],fo:.1},.25);
    A.text(147+i*165,234,months[i+4],{size:18,c:cols[i+1]});
  }
  A.say("Then come May, June, July and August.",
        "তারপর আসে মে, জুন, জুলাই আর আগস্ট।");
  for(let i=0;i<4;i++){
    A.rect(75+i*165,280,145,72,{c:cols[i+2],w:2.5,fill:cols[i+2],fo:.1},.25);
    A.text(147+i*165,324,months[i+8],{size:17,c:cols[i+2]});
  }
  A.say("September to December finish the year, and then a new year begins.",
        "সেপ্টেম্বর থেকে ডিসেম্বর শেষ করে, আবার নতুন বছর আসে।");
  A.text(400,396,'12 months in one year',{size:26,c:AM});
  NOTE(A,446,'the months go round and round every year.');
});

lesson('pn-211','Tally marks','Count in groups of five',A=>{
  A.say("Tally marks help us count in groups of five.",
        "ট্যালি চিহ্ন দিয়ে পাঁচ পাঁচ করে গোনা সহজ হয়।");
  const xs=[120,170,220,270];
  for(let i=0;i<4;i++) A.line(xs[i],150,xs[i],240,{c:AM,w:5},.2);
  A.say("We draw one mark for each thing: one, two, three, four.",
        "প্রতিটি জিনিসের জন্য একটি দাগ: এক, দুই, তিন, চার।");
  A.line(110,232,280,158,{c:RD,w:5},.3);
  A.text(195,300,'5',{size:34,c:AM});
  A.say("The fifth mark goes across the four. One bundle means five.",
        "পাঁচ নম্বরের দাগটি চারটির ওপর বাঁকা হয়ে যায়। এক গোছা মানে পাঁচ।");
  const xs2=[430,480,530,580];
  for(let i=0;i<4;i++) A.line(xs2[i],150,xs2[i],240,{c:GR,w:5},.2);
  A.line(420,232,590,158,{c:RD,w:5},.3);
  A.line(630,150,630,240,{c:GR,w:5},.2);
  A.line(680,150,680,240,{c:GR,w:5},.2);
  A.text(555,300,'7',{size:34,c:GR});
  A.say("Here is one bundle and two more marks. That is seven.",
        "এখানে এক গোছা আর দুইটি দাগ মিলে সাত হয়।");
  A.text(400,356,'5 + 2 = 7',{size:30,c:GR});
  NOTE(A,446,'each crossed bundle is worth five.');
});

lesson('pn-212','Pictograph: favourite fruit','Pictures show how many',A=>{
  A.say("A pictograph uses pictures to show how many.",
        "ছবির লেখচিত্রে ছবি দিয়ে সংখ্যা দেখানো হয়।");
  A.text(400,84,'one picture = one child',{size:17,c:MU});
  A.text(80,157,'Mango',{size:20,c:AM,anchor:'start'});
  A.text(80,237,'Banana',{size:20,c:SK,anchor:'start'});
  A.text(80,317,'Apple',{size:20,c:RD,anchor:'start'});
  A.say("Each picture stands for one child.",
        "প্রতিটি ছবি একজন শিশুকে বোঝায়।");
  for(let i=0;i<4;i++) A.circle(260+i*55,150,14,{c:AM,w:2.5,fill:AM,fo:.7},.12);
  for(let i=0;i<2;i++) A.ell(260+i*55,230,16,9,{c:SK,w:2.5,fill:SK,fo:.5},.15);
  for(let i=0;i<3;i++){
    A.circle(260+i*55,310,14,{c:RD,w:2.5,fill:RD,fo:.6},.12);
    A.line(260+i*55,296,260+i*55,288,{c:MU,w:2},.1);
  }
  A.text(600,157,'4',{size:24,c:AM});
  A.text(600,237,'2',{size:24,c:SK});
  A.text(600,317,'3',{size:24,c:RD});
  A.say("Mango has four, banana has two, and apple has three.",
        "আম চারটি, কলা দুইটি আর আপেল তিনটি।");
  A.say("The longest row shows the most.",
        "সবচেয়ে লম্বা সারিতে সবচেয়ে বেশি দেখা যায়।");
  A.text(400,372,'the longest row has the most',{size:20,c:AM});
  NOTE(A,438,'count the pictures, not the lines.');
});

lesson('pn-213','Hot and cold','We feel temperature with our skin',A=>{
  A.say("Some things are hot and some things are cold.",
        "কিছু জিনিস গরম, কিছু জিনিস ঠান্ডা।");
  A.circle(210,200,55,{c:AM,w:3,fill:AM,fo:.3},.5);
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4;
    A.line(210+Math.cos(a)*68,200+Math.sin(a)*68,210+Math.cos(a)*92,200+Math.sin(a)*92,{c:AM,w:3},.12);
  }
  A.text(210,316,'hot',{size:30,c:RD});
  A.say("The sun is hot, and ice is cold.",
        "সূর্য গরম, আর বরফ ঠান্ডা।");
  A.rect(500,168,65,65,{c:SK,w:3,fill:SK,fo:.35},.3);
  A.rect(575,194,55,55,{c:SK,w:3,fill:SK,fo:.35},.3);
  A.rect(520,244,60,60,{c:SK,w:3,fill:SK,fo:.35},.3);
  A.text(575,330,'cold',{size:30,c:SK});
  A.dashed(400,100,400,350,{c:MU,w:1.5},.3);
  A.say("We feel hot and cold with our skin.",
        "আমরা ত্বক দিয়ে গরম আর ঠান্ডা বুঝি।");
  A.say("Never touch a hot stove or an open fire.",
        "গরম চুলা বা আগুন কখনো ছোঁবে না।");
  A.text(400,380,'hot  |  cold',{size:24,c:INK});
  A.text(400,420,'ask a grown-up before touching',{size:18,c:MU});
  NOTE(A,456,'stay safe near hot things.');
});

lesson('pn-214','2D and 3D shapes','Flat shapes and solid shapes',A=>{
  A.say("Flat shapes are called 2D shapes.",
        "সমতল আকৃতিকে 2D বা দ্বিমাত্রিক বলা হয়।");
  A.rect(90,170,140,140,{c:SK,w:3,fill:SK,fo:.12},.4);
  A.circle(285,240,45,{c:PK,w:3,fill:PK,fo:.12},.4);
  A.text(210,120,'2D',{size:32,c:SK});
  A.text(210,352,'flat',{size:24,c:SK});
  A.say("A square is flat. It has only length and width.",
        "বর্গ সমতল। এর কেবল দৈর্ঘ্য আর প্রস্থ আছে।");
  A.rect(500,190,140,140,{c:GR,w:3,fill:GR,fo:.1},.4);
  A.rect(540,150,140,140,{c:MU,w:2},.3);
  A.line(500,190,540,150,{c:GR,w:3},.2);
  A.line(640,190,680,150,{c:GR,w:3},.2);
  A.line(640,330,680,290,{c:GR,w:3},.2);
  A.text(590,120,'3D',{size:32,c:GR});
  A.text(590,372,'solid',{size:24,c:GR});
  A.say("Solid shapes are called 3D shapes.",
        "ঠোস আকৃতিকে 3D বা ত্রিমাত্রিক বলা হয়।");
  A.say("A cube is like a box. It has length, width and height.",
        "ঘনক একটি বাক্সের মতো। এর দৈর্ঘ্য, প্রস্থ আর উচ্চতা আছে।");
  A.dashed(400,100,400,380,{c:MU,w:1.5},.3);
  A.text(400,414,'flat has length and width; solid adds height',{size:17,c:MU});
  NOTE(A,454,'a ball is 3D, but a drawn circle is 2D.');
});

lesson('pn-215','Same and different','Compare colour, size and shape',A=>{
  A.say("Look at two things. Are they the same or different?",
        "দুইটি জিনিস দেখো। এরা একই, নাকি আলাদা?");
  A.text(400,90,'same',{size:26,c:GR});
  A.circle(300,162,45,{c:GR,w:3,fill:GR,fo:.2},.4);
  A.circle(500,162,45,{c:GR,w:3,fill:GR,fo:.2},.4);
  A.text(400,230,'same colour and same size',{size:20,c:INK});
  A.say("These two balls are the same colour and the same size.",
        "এই দুইটি বল একই রঙের আর একই আকারের।");
  A.text(400,286,'different',{size:26,c:PK});
  A.circle(300,362,50,{c:SK,w:3,fill:SK,fo:.2},.4);
  A.rect(455,317,90,90,{c:PK,w:3,fill:PK,fo:.2},.4);
  A.text(400,432,'different colour and shape',{size:18,c:INK});
  A.say("These two are different: one is a big blue circle, the other is a pink square.",
        "এই দুইটি আলাদা: একটি বড় নীল বৃত্ত, অন্যটি গোলাপি বর্গ।");
  A.say("We can compare colour, size and shape.",
        "রং, আকার আর আকৃতি মিলিয়ে আমরা তুলনা করি।");
  NOTE(A,460,'look at one feature at a time.');
});

lesson('pn-216','Half of a shape and a group','Two equal parts',A=>{
  A.say("Half means two equal parts.",
        "অর্ধ মানে দুইটি সমান ভাগ।");
  A.circle(210,190,78,{c:AM,w:3,fill:AM,fo:.08},.5);
  const half=[];
  for(let i=0;i<=24;i++){
    const a=Math.PI/2+i*Math.PI/24;
    half.push([210+Math.cos(a)*78,190+Math.sin(a)*78]);
  }
  half.push([210,268]);
  A.pts(half,{c:AM,w:2,fill:AM,fo:.4},.4);
  A.dashed(210,106,210,274,{c:INK,w:2},.4);
  A.text(210,304,'one half',{size:20,c:AM});
  A.say("Cut this roti down the middle. Each part is one half.",
        "এই রুটিটিকে মাঝখানে কাটো। প্রতিটি ভাগ এক-অর্ধ।");
  for(let i=0;i<3;i++) A.circle(420+i*45,174,15,{c:GR,w:2,fill:GR,fo:.7},.15);
  for(let i=0;i<3;i++) A.circle(570+i*45,174,15,{c:PK,w:2,fill:PK,fo:.7},.15);
  A.dashed(540,142,540,210,{c:MU,w:1.5},.2);
  A.text(400,238,'half of 6 = 3',{size:22,c:AM});
  A.say("Half of six sweets is three.",
        "ছয়টি মিষ্টির অর্ধেক হলো তিনটি।");
  A.say("Two halves make one whole.",
        "দুইটি অর্ধ মিলে হয় একটি সম্পূর্ণ।");
  A.text(400,362,'1/2 + 1/2 = 1 whole',{size:30,c:GR});
  A.text(400,412,'two equal parts',{size:20,c:MU});
  NOTE(A,456,'the two parts must be the same size.');
});

lesson('pn-217','Sharing equally between two','Six sweets shared by two',A=>{
  A.say("Sharing equally means each person gets the same amount.",
        "সমান ভাগে ভাগ মানে প্রত্যেকে একই পরিমাণ পায়।");
  for(let i=0;i<6;i++) A.circle(250+i*50,140,16,{c:i%2?PK:AM,w:2.5,fill:i%2?PK:AM,fo:.75},.15);
  A.say("Six sweets must be shared between two children.",
        "ছয়টি মিষ্টি দুই শিশুর মধ্যে ভাগ করতে হবে।");
  A.ell(220,330,130,55,{c:SK,w:3,fill:SK,fo:.06},.4);
  A.ell(580,330,130,55,{c:SK,w:3,fill:SK,fo:.06},.4);
  for(let i=0;i<3;i++) A.circle(170+i*50,325,13,{c:AM,w:2,fill:AM,fo:.8},.12);
  for(let i=0;i<3;i++) A.circle(530+i*50,325,13,{c:PK,w:2,fill:PK,fo:.8},.12);
  A.arrow(300,165,250,272,{c:MU,w:2},.3);
  A.arrow(450,165,550,272,{c:MU,w:2},.3);
  A.say("Give one sweet to each child, then another, and another.",
        "প্রত্যেকে একটি করে নেবে, আবার একটি করে।");
  A.text(400,252,'each gets 3',{size:20,c:AM});
  A.say("At the end each child has three.",
        "শেষে প্রত্যেকে তিনটি পায়।");
  A.text(400,414,'6 shared by 2 = 3 each',{size:26,c:GR});
  NOTE(A,452,'equal shares are always the same amount.');
});

lesson('pn-218','Seasons in Bangladesh','Summer, rainy season and winter',A=>{
  A.say("Bangladesh has six seasons.",
        "বাংলাদেশে ছয়টি ঋতু আছে।");
  A.circle(160,170,48,{c:AM,w:3,fill:AM,fo:.3},.5);
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4;
    A.line(160+Math.cos(a)*60,170+Math.sin(a)*60,160+Math.cos(a)*82,170+Math.sin(a)*82,{c:AM,w:3},.12);
  }
  A.text(160,290,'summer',{size:24,c:RD});
  A.text(160,325,'hot',{size:18,c:MU});
  A.say("In summer it is hot, and in the rainy season the rain falls.",
        "গ্রীষ্মে গরম থাকে, আর বর্ষায় বৃষ্টি নামে।");
  A.circle(370,160,30,{c:MU,w:2.5,fill:MU,fo:.25},.25);
  A.circle(400,145,34,{c:MU,w:2.5,fill:MU,fo:.25},.25);
  A.circle(430,160,30,{c:MU,w:2.5,fill:MU,fo:.25},.25);
  for(let i=0;i<5;i++) A.line(360+i*20,190,356+i*20,216,{c:SK,w:2.5},.1);
  A.text(400,290,'rainy season',{size:21,c:SK});
  A.text(400,325,'rain',{size:18,c:MU});
  A.rect(610,180,70,55,{c:AM,w:3,fill:AM,fo:.15},.3);
  A.circle(682,207,20,{c:AM,w:3},.2);
  A.pts([[625,165],[635,150],[625,135]],{c:MU,w:2},.15);
  A.pts([[652,165],[662,150],[652,135]],{c:MU,w:2},.15);
  A.text(640,290,'winter',{size:24,c:VI});
  A.text(640,325,'cool',{size:18,c:MU});
  A.say("In winter it is cool and misty.",
        "শীতে ঠান্ডা আর কুয়াশা থাকে।");
  A.say("Each season brings different fruit and fun.",
        "প্রতিটি ঋতু আলাদা ফল আর আনন্দ নিয়ে আসে।");
  A.dashed(290,112,290,342,{c:MU,w:1.2},.3);
  A.dashed(510,112,510,342,{c:MU,w:1.2},.3);
  A.text(400,386,'three seasons, different weather',{size:19,c:MU});
  NOTE(A,438,'Bangladesh has six seasons in all.');
});

lesson('pn-219','Near and far','Close to us or a long way away',A=>{
  A.say("Near means close to us. Far means a long way away.",
        "কাছে মানে আমাদের কাছাকাছি। দূরে মানে অনেক দূর।");
  A.line(70,380,730,380,{c:MU,w:3},.5);
  A.circle(170,300,24,{c:AM,w:2.5,fill:AM,fo:.25},.3);
  A.line(170,324,170,362,{c:SK,w:3},.2);
  A.line(142,340,198,340,{c:SK,w:3},.2);
  A.line(170,362,150,380,{c:SK,w:3},.2);
  A.line(170,362,190,380,{c:SK,w:3},.2);
  A.say("This ball is near the boy.",
        "এই বলটি ছেলেটির কাছে।");
  A.circle(272,354,18,{c:PK,w:3,fill:PK,fo:.3},.3);
  A.rect(642,325,16,55,{c:MU,w:2,fill:MU,fo:.5},.2);
  A.circle(650,300,42,{c:GR,w:3,fill:GR,fo:.2},.4);
  A.say("That tree is far away at the end of the field.",
        "ওই গাছটি মাঠের শেষে অনেক দূরে।");
  A.text(272,416,'near',{size:22,c:GR});
  A.text(650,416,'far',{size:22,c:AM});
  A.say("We use near and far to talk about distance.",
        "দূরত্ব বোঝাতে আমরা কাছে আর দূর শব্দ ব্যবহার করি।");
  A.dashed(300,438,620,438,{c:MU,w:1.5},.4);
  NOTE(A,458,'near is close, far is not.');
});

lesson('pn-220','Estimate: about how many?','Guess first, then count',A=>{
  A.say("This jar has many beads. Before counting, take a guess.",
        "এই জারটিতে অনেক পুঁতি আছে। গোনার আগে একটু আন্দাজ করো।");
  A.pts([[270,150],[530,150],[560,390],[240,390],[270,150]],{c:MU,w:3},.5);
  A.rect(280,125,240,25,{c:MU,w:2.5,fill:MU,fo:.15},.3);
  const beads=[
    [300,190],[350,185],[400,195],[450,190],[500,200],
    [280,240],[330,235],[380,245],[430,238],[480,243],[525,250],
    [300,290],[350,285],[400,295],[450,288],[500,292],
    [320,335],[370,340],[425,332],[475,338]
  ];
  beads.forEach((p,i)=>A.circle(p[0],p[1],10,{c:i%2?SK:AM,w:2,fill:i%2?SK:AM,fo:.8},.08));
  A.say("An estimate is a clever guess. It does not have to be exact.",
        "আন্দাজ মানে কাছাকাছি অনুমান। এটি হুবহু মিলতে হবে না।");
  A.text(652,180,'about how many?',{size:19,c:AM});
  A.text(652,220,'guess: about 20',{size:16,c:MU});
  A.say("Now count each bead once: one, two, three ... twenty.",
        "এখন এক এক করে গোনো: এক, দুই, তিন ... কুড়ি।");
  A.text(652,330,'count: 20',{size:22,c:GR});
  A.say("Estimating first helps us check our counting.",
        "আগে আন্দাজ করলে গোনার ভুল সহজে ধরা পড়ে।");
  A.text(400,424,'guess first, then count',{size:22,c:GR});
  NOTE(A,462,'an estimate is close, not always exact.');
});
