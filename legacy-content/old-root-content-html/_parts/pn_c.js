/* Play & Nursery — part C: lessons pn-248 to pn-274 */

lesson('pn-248','Counting backward from 20','Count back: 20, 19, 18 ... down to 1',A=>{
  A.say("Here are the numbers from twenty down to sixteen.",
        "এখানে কুড়ি থেকে কমতে কমতে ষোলো পর্যন্ত সংখ্যাগুলো আছে।");
  for(let i=0;i<5;i++){
    const x=120+i*140;
    A.circle(x,140,38,{c:i===0?AM:SK,w:3,fill:i===0?AM:SK,fo:.18},.2);
    A.text(x,150,String(20-i),{size:30,c:i===0?AM:SK});
    if(i<4) A.arrow(x+42,140,x+98,140,{c:MU,w:2},.15);
  }
  A.say("Each step takes away one: twenty, nineteen, eighteen, seventeen, sixteen.",
        "প্রতিটি ধাপে এক করে কমে: কুড়ি, উনিশ, আঠারো, সতেরো, ষোলো।");
  for(let i=0;i<5;i++){
    const x=120+i*140;
    A.circle(x,240,30,{c:GR,w:2.5,fill:GR,fo:.15},.15);
    A.text(x,248,String(15-i),{size:24,c:GR});
  }
  A.say("Now fifteen, fourteen, thirteen, twelve and eleven.",
        "এখন পনেরো, চৌদ্দ, তেরো, বারো আর এগারো।");
  A.text(400,316,'each step = take away 1',{size:24,c:AM});
  A.text(400,360,'20 -> 19 -> 18 -> 17',{size:26,c:SK});
  A.say("Counting back is the same as subtracting one again and again.",
        "পিছিয়ে গোনা মানে বারবার এক বিয়োগ করা।");
  A.text(400,408,'20, 19, 18, 17, 16 ... 1',{size:25,c:GR});
  NOTE(A,456,'counting back makes the number smaller.');
});

lesson('pn-249','Ordinal numbers: 6th to 10th','Sixth, seventh, eighth, ninth, tenth',A=>{
  A.say("Ten children have finished a race and stand in one line.",
        "দশটি শিশু দৌড় শেষ করে এক সারিতে দাঁড়িয়েছে।");
  for(let i=0;i<10;i++){
    const x=95+i*70;
    A.circle(x,140,12,{c:MU,w:2,fill:MU,fo:.4},.06);
    A.line(x,152,x,182,{c:MU,w:2},.06);
    A.line(x-12,162,x+12,162,{c:MU,w:2},.06);
    A.text(x,206,String(i+1),{size:17,c:MU});
  }
  A.say("The first five places are first to fifth.",
        "প্রথম পাঁচটি স্থান হলো প্রথম থেকে পঞ্চম।");
  const cols=[AM,SK,GR,PK,VI];
  const ord=['6th','7th','8th','9th','10th'];
  const words=['sixth','seventh','eighth','ninth','tenth'];
  for(let i=0;i<5;i++){
    const x=125+i*135;
    A.rect(x-58,250,116,90,{c:cols[i],w:3,fill:cols[i],fo:.13},.25);
    A.text(x,296,ord[i],{size:30,c:cols[i]});
    A.text(x,324,words[i],{size:15,c:MU});
  }
  A.say("Next come the sixth, seventh, eighth, ninth and tenth.",
        "এরপর আসে ষষ্ঠ, সপ্তম, অষ্টম, নবম আর দশম।");
  A.say("Sixth is written 6th and tenth is written 10th.",
        "ষষ্ঠ সংখ্যাটি লেখা হয় 6th, আর দশম লেখা হয় 10th।");
  A.text(400,376,'the place in line',{size:22,c:AM});
  NOTE(A,442,'ordinal numbers tell the order, not the amount.');
});

lesson('pn-250','Big and small animals','Some animals are big, some are small',A=>{
  A.say("Animals come in many sizes. Some are big and some are small.",
        "প্রাণীরা নানা আকারের। কেউ বড়, কেউ ছোট।");
  A.ell(210,210,90,58,{c:MU,w:3,fill:MU,fo:.18},.4);
  A.circle(305,175,36,{c:MU,w:3,fill:MU,fo:.18},.35);
  A.pts([[335,192],[366,202],[356,226],[330,216]],{c:MU,w:2.5,fill:MU,fo:.2},.3);
  A.line(135,258,135,296,{c:MU,w:6},.2);
  A.line(180,262,180,300,{c:MU,w:6},.2);
  A.line(240,262,240,300,{c:MU,w:6},.2);
  A.line(285,260,285,298,{c:MU,w:6},.2);
  A.text(230,336,'elephant',{size:22,c:MU});
  A.text(230,370,'big',{size:26,c:AM});
  A.say("An elephant is a big animal.",
        "হাতি একটি বড় প্রাণী।");
  A.circle(590,290,20,{c:PK,w:2.5,fill:PK,fo:.3},.25);
  A.circle(574,276,11,{c:PK,w:2,fill:PK,fo:.3},.2);
  A.circle(606,276,11,{c:PK,w:2,fill:PK,fo:.3},.2);
  A.dashed(610,300,640,318,{c:PK,w:2},.2);
  A.text(590,346,'mouse',{size:22,c:PK});
  A.text(590,380,'small',{size:26,c:SK});
  A.say("A mouse is a small animal.",
        "ইঁদুর একটি ছোট প্রাণী।");
  A.say("Big and small tell us the size of a thing.",
        "বড় আর ছোট জিনিসের আকার বোঝায়।");
  A.text(400,418,'big  or  small?',{size:24,c:GR});
  NOTE(A,458,'compare two animals to see which is bigger.');
});

lesson('pn-251','Equal and unequal groups','Same number in each group?',A=>{
  A.say("Two groups are equal when both have the same number.",
        "দুইটি দল সমান, যখন দুই দলেই একই সংখ্যক জিনিস থাকে।");
  A.text(230,100,'group A',{size:20,c:SK});
  A.text(570,100,'group B',{size:20,c:SK});
  A.rect(90,120,280,110,{c:SK,w:2.5,fill:SK,fo:.06},.3);
  A.rect(430,120,280,110,{c:SK,w:2.5,fill:SK,fo:.06},.3);
  for(let i=0;i<4;i++){
    A.circle(140+i*55,175,17,{c:AM,w:2.5,fill:AM,fo:.7},.12);
    A.circle(480+i*55,175,17,{c:AM,w:2.5,fill:AM,fo:.7},.12);
  }
  A.text(400,260,'4 and 4: equal',{size:24,c:GR});
  A.say("Four apples in each group. The groups are equal.",
        "প্রতিটি দলে চারটি আপেল। দল দুটি সমান।");
  A.rect(90,290,280,110,{c:PK,w:2.5,fill:PK,fo:.06},.3);
  A.rect(430,290,280,110,{c:PK,w:2.5,fill:PK,fo:.06},.3);
  for(let i=0;i<5;i++) A.circle(130+i*45,345,14,{c:PK,w:2,fill:PK,fo:.7},.1);
  for(let i=0;i<3;i++) A.circle(480+i*60,345,14,{c:PK,w:2,fill:PK,fo:.7},.1);
  A.say("Here one group has five and the other has three.",
        "এখানে এক দলে পাঁচটি, অন্য দলে তিনটি।");
  A.text(400,432,'5 and 3: unequal',{size:24,c:RD});
  A.say("Five and three are not the same, so the groups are unequal.",
        "পাঁচ আর তিন সমান নয়, তাই দল দুটি অসমান।");
  NOTE(A,462,'equal groups always have the same count.');
});

lesson('pn-252','Sharing into three equal groups','Nine sweets for three children',A=>{
  A.say("Nine sweets must be shared equally between three children.",
        "নয়টি মিষ্টি তিনটি শিশুর মধ্যে সমানভাবে ভাগ করতে হবে।");
  for(let i=0;i<9;i++){
    const c=i%3===0?AM:i%3===1?SK:PK;
    A.circle(240+i*40,120,14,{c:c,w:2.5,fill:c,fo:.75},.1);
  }
  A.say("Give one sweet to each child, then another, then another.",
        "প্রত্যেককে একটি করে দাও, আবার একটি, আবার একটি।");
  const cols=[AM,SK,PK];
  for(let i=0;i<3;i++){
    const x=160+i*240;
    A.ell(x,300,100,42,{c:cols[i],w:3,fill:cols[i],fo:.1},.35);
    for(let k=0;k<3;k++) A.circle(x-45+k*45,292,13,{c:cols[i],w:2,fill:cols[i],fo:.85},.1);
    A.text(x,362,'child '+(i+1),{size:20,c:cols[i]});
  }
  A.say("Each child gets three sweets. The shares are equal.",
        "প্রত্যেকে তিনটি মিষ্টি পায়। ভাগগুলো সমান।");
  A.text(400,406,'9 shared by 3 = 3 each',{size:26,c:GR});
  A.say("Three equal groups of three make nine again.",
        "তিনটি সমান দলে তিনটি করে মিলে আবার নয় হয়।");
  NOTE(A,452,'check by giving one at a time.');
});

lesson('pn-253','Adding zero','Zero means nothing at all',A=>{
  A.say("Zero means there is nothing in a group.",
        "শূন্য মানে কোনো দল খালি, কিছুই নেই।");
  A.ell(200,260,90,60,{c:SK,w:3,fill:SK,fo:.08},.35);
  for(let i=0;i<5;i++) A.circle(150+i*25,250,12,{c:AM,w:2,fill:AM,fo:.8},.1);
  A.text(200,340,'5 mangoes',{size:20,c:AM});
  A.ell(400,260,70,48,{c:MU,w:2.5,fill:MU,fo:.05},.3);
  A.text(400,268,'empty',{size:18,c:MU});
  A.text(400,340,'0 mangoes',{size:20,c:MU});
  A.text(560,268,'=',{size:34,c:INK});
  A.ell(680,260,55,42,{c:GR,w:3,fill:GR,fo:.08},.3);
  for(let i=0;i<5;i++) A.circle(650+i*15,250,9,{c:GR,w:2,fill:GR,fo:.8},.08);
  A.text(680,340,'5 mangoes',{size:20,c:GR});
  A.say("Five mangoes plus an empty plate is still five mangoes.",
        "পাঁচটি আম আর একটি খালি প্লেট মিলে আবার পাঁচটি আমই হয়।");
  A.text(400,388,'5 + 0 = 5',{size:32,c:AM});
  A.say("Adding zero never changes the number.",
        "শূন্য যোগ করলে সংখ্যা কখনো বদলায় না।");
  A.text(400,428,'6 + 0 = 6      9 + 0 = 9',{size:22,c:GR});
  NOTE(A,462,'zero adds nothing new.');
});

lesson('pn-254','Subtracting zero','Nothing is taken away',A=>{
  A.say("Here are six balloons. We take away zero balloons.",
        "এখানে ছয়টি বেলুন। আমরা শূন্য বেলুন সরাই।");
  for(let i=0;i<6;i++){
    const x=115+i*105;
    A.ell(x,160,26,34,{c:i%2?PK:SK,w:2.5,fill:i%2?PK:SK,fo:.4},.15);
    A.line(x,194,x,220,{c:MU,w:1.5},.1);
  }
  A.circle(700,175,26,{c:MU,w:2.5,fill:MU,fo:.05},.2);
  A.text(700,182,'0',{size:26,c:MU});
  A.say("Zero means we do not take anything away.",
        "শূন্য মানে আমরা কিছুই নিচ্ছি না।");
  A.text(400,258,'6 - 0 = 6',{size:32,c:AM});
  A.say("All six balloons are still there.",
        "ছয়টি বেলুনই রয়ে গেল।");
  for(let i=0;i<6;i++){
    const x=115+i*105;
    A.ell(x,320,26,34,{c:i%2?PK:SK,w:2.5,fill:i%2?PK:SK,fo:.4},.1);
  }
  A.say("Subtracting zero never changes the number.",
        "শূন্য বিয়োগ করলে সংখ্যা কখনো বদলায় না।");
  A.text(400,400,'8 - 0 = 8      10 - 0 = 10',{size:22,c:GR});
  NOTE(A,448,'nothing taken away means nothing changes.');
});

lesson('pn-255','Adding one','One more makes the next number',A=>{
  A.say("When we add one, the number goes up by one step.",
        "এক যোগ করলে সংখ্যা এক ধাপ বড় হয়।");
  for(let i=0;i<4;i++) A.rect(180+i*45,130,40,40,{c:SK,w:2,fill:SK,fo:.15},.15);
  A.rect(360,130,40,40,{c:AM,w:3,fill:AM,fo:.3},.25);
  A.text(400,205,'4 + 1 = 5',{size:30,c:AM});
  A.say("Four blocks and one more block make five blocks.",
        "চারটি ব্লক আর আরও একটি ব্লক মিলে পাঁচটি ব্লক।");
  A.line(80,300,720,300,{c:MU,w:3},.4);
  for(let i=0;i<11;i++){
    const x=80+i*64;
    A.circle(x,300,6,{c:MU,w:2,fill:MU,fo:.6},.05);
    A.text(x,330,String(i),{size:15,c:MU});
  }
  A.arrow(470,282,530,282,{c:GR,w:2.5},.25);
  A.text(500,266,'+1',{size:18,c:GR});
  A.say("On a number line, adding one is a hop to the right.",
        "সংখ্যারেখায় এক যোগ করা মানে ডানদিকে এক লাফ।");
  A.text(400,382,'5 + 1 = 6',{size:26,c:GR});
  A.text(400,418,'6 + 1 = 7',{size:26,c:GR});
  A.say("The answer is always the very next number.",
        "উত্তর সবসময় ঠিক পরের সংখ্যাটিই হয়।");
  NOTE(A,460,'adding one gives the number after.');
});

lesson('pn-256','Doubles plus one','Double it, then add one more',A=>{
  A.say("A double is a number added to itself.",
        "দ্বিগুণ মানে একই সংখ্যাকে নিজের সাথে যোগ করা।");
  for(let i=0;i<3;i++) A.circle(130+i*45,140,16,{c:SK,w:2.5,fill:SK,fo:.7},.12);
  A.text(270,148,'+',{size:26,c:MU});
  for(let i=0;i<3;i++) A.circle(315+i*45,140,16,{c:SK,w:2.5,fill:SK,fo:.7},.12);
  A.text(455,148,'=',{size:26,c:MU});
  A.circle(510,140,16,{c:GR,w:2.5,fill:GR,fo:.7},.12);
  A.text(565,148,'6',{size:28,c:GR});
  A.say("Three and three make six.",
        "তিন আর তিন মিলে ছয়।");
  A.circle(510,200,16,{c:AM,w:3,fill:AM,fo:.8},.2);
  A.text(565,208,'7',{size:28,c:AM});
  A.text(640,205,'one more',{size:16,c:AM});
  A.say("Add one more and we get seven. So three plus four is seven.",
        "আরও এক যোগ করলে সাত হয়। তাই তিন যোগ চার সমান সাত।");
  const cols=[AM,SK,GR,PK];
  for(let i=0;i<4;i++){
    const x=160+i*160;
    A.text(x,290,(i+2)+' + '+(i+2)+' = '+(2*i+4),{size:19,c:cols[i]});
    A.text(x,330,(i+2)+' + '+(i+3)+' = '+(2*i+5),{size:19,c:cols[i]});
  }
  A.say("Double two is four, and one more is five.",
        "দুইয়ের দ্বিগুণ চার, আর এক বেশি পাঁচ।");
  A.say("Double five is ten, and one more is eleven.",
        "পাঁচের দ্বিগুণ দশ, আর এক বেশি এগারো।");
  A.text(400,392,'double, then add 1',{size:24,c:AM});
  NOTE(A,446,'doubles plus one are quick facts to remember.');
});

lesson('pn-257','Five-frame counting','Fill the five-frame',A=>{
  A.say("A five-frame has five boxes in one row.",
        "পাঁচ-ঘর ফ্রেমে এক সারিতে পাঁচটি ঘর থাকে।");
  const fx=140,fy=150,cs=52;
  for(let i=0;i<5;i++) A.rect(fx+i*cs,fy,cs,cs,{c:MU,w:2.5},.15);
  for(let i=0;i<3;i++) A.circle(fx+i*cs+cs/2,fy+cs/2,16,{c:AM,w:2.5,fill:AM,fo:.8},.15);
  A.text(270,236,'3 dots',{size:22,c:AM});
  A.say("Put one counter in each box. Three boxes are full, so we have three.",
        "প্রতিটি ঘরে একটি করে কাউন্টার রাখো। তিনটি ঘর ভরা, তাই সংখ্যা তিন।");
  const gx=470;
  for(let i=0;i<5;i++) A.rect(gx+i*cs,fy,cs,cs,{c:MU,w:2.5},.15);
  for(let i=0;i<5;i++) A.circle(gx+i*cs+cs/2,fy+cs/2,16,{c:GR,w:2.5,fill:GR,fo:.8},.12);
  A.text(600,236,'5 dots',{size:22,c:GR});
  A.say("When all five boxes are full, the frame shows five.",
        "যখন পাঁচটি ঘরই ভরে যায়, ফ্রেমটি পাঁচ দেখায়।");
  A.say("A five-frame helps us see numbers close to five.",
        "পাঁচ-ঘর ফ্রেম পাঁচের কাছাকাছি সংখ্যা দেখতে সাহায্য করে।");
  A.text(400,320,'3 full + 2 empty = 5 boxes',{size:22,c:SK});
  A.text(400,368,'3 + 2 = 5',{size:28,c:AM});
  NOTE(A,458,'fill frames from the left, one dot per box.');
});

lesson('pn-258','Ten-frame counting to 10','Two rows of five',A=>{
  A.say("A ten-frame has two rows of five boxes.",
        "দশ-ঘর ফ্রেমে পাঁচটি ঘরের দুই সারি থাকে।");
  const cx=110,cy=120,cs=44;
  for(let r=0;r<2;r++) for(let i=0;i<5;i++) A.rect(cx+i*cs,cy+r*cs,cs,cs,{c:MU,w:2.5},.08);
  for(let k=0;k<7;k++){
    const r=Math.floor(k/5),i=k%5;
    A.circle(cx+i*cs+cs/2,cy+r*cs+cs/2,13,{c:AM,w:2.5,fill:AM,fo:.8},.1);
  }
  A.text(220,238,'7 dots',{size:22,c:AM});
  A.say("Seven dots fill one full row and two more boxes.",
        "সাতটি ডট একটি ভরা সারি আর আরও দুইটি ঘর ভরে।");
  const gx=440,gy=120;
  for(let r=0;r<2;r++) for(let i=0;i<5;i++) A.rect(gx+i*cs,gy+r*cs,cs,cs,{c:MU,w:2.5},.08);
  for(let k=0;k<10;k++){
    const r=Math.floor(k/5),i=k%5;
    A.circle(gx+i*cs+cs/2,gy+r*cs+cs/2,13,{c:GR,w:2.5,fill:GR,fo:.8},.08);
  }
  A.text(550,238,'10 dots',{size:22,c:GR});
  A.say("The second frame is full, so it shows ten.",
        "দ্বিতীয় ফ্রেমটি ভরা, তাই এটি দশ দেখায়।");
  A.say("Five and five make ten. A full ten-frame is always ten.",
        "পাঁচ আর পাঁচ মিলে দশ। ভরা দশ-ঘর ফ্রেম সবসময় দশ।");
  A.text(400,330,'7 = 5 + 2',{size:28,c:AM});
  A.text(400,378,'10 = 5 + 5',{size:28,c:GR});
  NOTE(A,458,'a full ten-frame holds ten dots.');
});

lesson('pn-259','Tally marks up to 10','Five in a bundle, then count the rest',A=>{
  A.say("We draw one tally mark for each thing we count.",
        "প্রতিটি জিনিসের জন্য আমরা একটি করে ট্যালি দাগ টানি।");
  const xs=[110,155,200,245];
  for(let i=0;i<4;i++) A.line(xs[i],130,xs[i],210,{c:SK,w:5},.12);
  A.line(100,202,262,138,{c:RD,w:5},.2);
  A.text(185,260,'5',{size:32,c:SK});
  A.say("Four marks and one across them make a bundle of five.",
        "চারটি দাগ আর তার ওপর একটি আড়াআড়ি দাগ মিলে পাঁচের গোছা হয়।");
  const xs7=[330,365,400,435];
  for(let i=0;i<4;i++) A.line(xs7[i],130,xs7[i],210,{c:GR,w:5},.12);
  A.line(320,202,452,138,{c:RD,w:5},.2);
  A.line(475,130,475,210,{c:GR,w:5},.12);
  A.line(510,130,510,210,{c:GR,w:5},.12);
  A.text(420,260,'7',{size:32,c:GR});
  A.say("One bundle and two more marks make seven.",
        "একটি গোছা আর দুইটি দাগ মিলে সাত।");
  const hs=[560,595,630,665];
  for(let i=0;i<4;i++) A.line(hs[i],110,hs[i],190,{c:PK,w:5},.1);
  A.line(550,182,682,118,{c:RD,w:5},.18);
  for(let i=0;i<4;i++) A.line(hs[i],220,hs[i],300,{c:PK,w:5},.1);
  A.line(550,292,682,228,{c:RD,w:5},.18);
  A.text(615,340,'10',{size:32,c:PK});
  A.say("Two bundles make ten. That is 5 + 5.",
        "দুইটি গোছা মিলে দশ। এটা ৫ + ৫।");
  A.text(400,400,'5 + 2 = 7        5 + 5 = 10',{size:24,c:AM});
  A.say("Count five at a glance, then add the loose marks.",
        "এক নজরে পাঁচ গোনো, তারপর আলগা দাগগুলো যোগ করো।");
  NOTE(A,458,'each crossed bundle is five.');
});

lesson('pn-260','Pictograph of pets','One paw print = one pet',A=>{
  A.say("A pictograph uses small pictures to show how many.",
        "ছবি-লেখচিত্রে ছোট ছবি দিয়ে সংখ্যা দেখানো হয়।");
  A.text(400,80,'one paw print = one pet',{size:16,c:MU});
  A.text(80,142,'Dog',{size:20,c:AM,anchor:'start'});
  A.text(80,222,'Cat',{size:20,c:SK,anchor:'start'});
  A.text(80,302,'Fish',{size:20,c:PK,anchor:'start'});
  for(let i=0;i<4;i++){
    A.circle(255+i*58,138,10,{c:AM,w:2,fill:AM,fo:.7},.08);
    A.circle(255+i*58-8,124,5,{c:AM,w:1.5,fill:AM,fo:.7},.05);
    A.circle(255+i*58+8,124,5,{c:AM,w:1.5,fill:AM,fo:.7},.05);
  }
  for(let i=0;i<3;i++){
    A.circle(255+i*58,218,10,{c:SK,w:2,fill:SK,fo:.7},.08);
    A.circle(255+i*58-8,204,5,{c:SK,w:1.5,fill:SK,fo:.7},.05);
    A.circle(255+i*58+8,204,5,{c:SK,w:1.5,fill:SK,fo:.7},.05);
  }
  for(let i=0;i<2;i++){
    A.circle(255+i*58,298,10,{c:PK,w:2,fill:PK,fo:.7},.08);
    A.circle(255+i*58-8,284,5,{c:PK,w:1.5,fill:PK,fo:.7},.05);
    A.circle(255+i*58+8,284,5,{c:PK,w:1.5,fill:PK,fo:.7},.05);
  }
  A.text(600,142,'4',{size:24,c:AM});
  A.text(600,222,'3',{size:24,c:SK});
  A.text(600,298,'2',{size:24,c:PK});
  A.say("Dogs have four pictures, cats three and fish two.",
        "কুকুরের চারটি, বিড়ালের তিনটি আর মাছের দুইটি ছবি।");
  A.text(400,360,'most pets: dogs',{size:24,c:AM});
  A.say("The row with the most pictures shows the most pets.",
        "যে সারিতে ছবি সবচেয়ে বেশি, সেখানে প্রাণীও সবচেয়ে বেশি।");
  A.text(400,406,'4 + 3 + 2 = 9 pets',{size:22,c:GR});
  A.say("Count the pictures, then compare the rows.",
        "ছবিগুলো গোনো, তারপর সারিগুলো তুলনা করো।");
  NOTE(A,452,'one picture always stands for one pet.');
});

lesson('pn-261','Bar chart of favourite colours','Which colour is the favourite?',A=>{
  A.say("A bar chart uses bars to show how many like each colour.",
        "বার লেখচিত্রে প্রতিটি রঙ কতজন পছন্দ করে, তা বার দিয়ে দেখানো হয়।");
  A.line(90,400,720,400,{c:MU,w:3},.4);
  A.line(90,400,90,120,{c:MU,w:3},.4);
  const bars=[[180,'red',6,RD],[320,'blue',4,SK],[460,'green',5,GR],[600,'yellow',3,AM]];
  for(let b=0;b<4;b++){
    const x=bars[b][0],h=bars[b][2]*38;
    A.rect(x-32,400-h,64,h,{c:bars[b][3],w:2.5,fill:bars[b][3],fo:.55},.3);
    A.text(x,430,bars[b][1],{size:20,c:bars[b][3]});
    A.text(x,400-h-16,String(bars[b][2]),{size:20,c:bars[b][3]});
  }
  A.say("Red has six, blue four, green five and yellow three.",
        "লাল ছয়, নীল চার, সবুজ পাঁচ আর হলুদ তিন।");
  A.text(400,80,'one square = one child',{size:16,c:MU});
  A.say("The tallest bar is red, so red is the favourite colour.",
        "সবচেয়ে উঁচু বার লাল, তাই লালই প্রিয় রঙ।");
  A.say("Bars make it easy to compare at a glance.",
        "বারগুলো এক নজরে তুলনা করা সহজ করে।");
  NOTE(A,462,'the tallest bar shows the most votes.');
});

lesson('pn-262','Symmetry of a butterfly','A fold down the middle matches both wings',A=>{
  A.say("A butterfly has two wings. They look like mirror images.",
        "প্রজাপতির দুইটি ডানা। তারা একে অপরের আয়নার প্রতিচ্ছবির মতো।");
  A.ell(320,190,62,88,{c:PK,w:3,fill:PK,fo:.2},.4);
  A.ell(480,190,62,88,{c:PK,w:3,fill:PK,fo:.2},.4);
  A.ell(400,195,10,80,{c:VI,w:3,fill:VI,fo:.6},.3);
  A.circle(400,110,12,{c:VI,w:2,fill:VI,fo:.7},.2);
  A.pts([[394,100],[372,74]],{c:VI,w:2},.2);
  A.pts([[406,100],[428,74]],{c:VI,w:2},.2);
  A.circle(320,170,12,{c:AM,w:2,fill:AM,fo:.8},.15);
  A.circle(480,170,12,{c:AM,w:2,fill:AM,fo:.8},.15);
  A.say("Look at the two round spots. One on each wing.",
        "দুইটি গোল দাগ দেখো। প্রতিটি ডানায় একটি করে।");
  A.dashed(400,96,400,288,{c:AM,w:2.5},.4);
  A.text(400,312,'fold line',{size:18,c:AM});
  A.say("If we fold along the middle line, the two wings match exactly.",
        "মাঝের রেখা ধরে ভাঁজ করলে দুই ডানা হুবহু মিলে যায়।");
  A.text(400,352,'this line is a line of symmetry',{size:20,c:GR});
  A.say("Shapes with two matching halves are symmetric.",
        "যে আকৃতির দুই অর্ধেক মিলে যায়, তা প্রতিসম।");
  A.text(400,396,'two matching halves',{size:24,c:GR});
  NOTE(A,448,'a fold line that makes two matching halves is a line of symmetry.');
});

lesson('pn-263','Mirror images','The mirror flips left and right',A=>{
  A.say("A mirror shows a flipped picture of what is in front of it.",
        "আয়না তার সামনের জিনিসের উল্টো প্রতিচ্ছবি দেখায়।");
  A.line(400,90,400,360,{c:SK,w:4},.5);
  A.text(400,384,'mirror',{size:20,c:SK});
  A.line(300,160,300,300,{c:MU,w:4},.2);
  A.pts([[300,160],[360,185],[300,210]],{c:RD,w:3,fill:RD,fo:.5},.3);
  A.text(310,320,'flag',{size:18,c:MU});
  A.say("Here is a flag pointing to the right.",
        "এখানে ডানদিকে তাক করা একটি পতাকা।");
  A.line(500,160,500,300,{c:MU,w:4},.2);
  A.pts([[500,160],[440,185],[500,210]],{c:RD,w:3,fill:RD,fo:.5},.3);
  A.text(490,320,'mirror flag',{size:18,c:MU});
  A.say("In the mirror the flag points to the left.",
        "আয়নায় পতাকাটি বাঁদিকে তাক করে।");
  A.say("The shape stays the same size, only the side changes.",
        "আকৃতি একই আকারে থাকে, কেবল দিক বদলায়।");
  A.text(400,428,'left  <->  right',{size:24,c:AM});
  NOTE(A,462,'a mirror image is the same shape flipped.');
});

lesson('pn-264','Corners of shapes','Count each corner',A=>{
  A.say("A corner is the point where two sides meet.",
        "কোণ হলো সেই বিন্দু যেখানে দুইটি বাহু মেলে।");
  A.pts([[110,210],[170,100],[230,210],[110,210]],{c:SK,w:3,fill:SK,fo:.1},.4);
  A.circle(110,210,6,{c:RD,w:2,fill:RD,fo:.9},.1);
  A.circle(170,100,6,{c:RD,w:2,fill:RD,fo:.9},.1);
  A.circle(230,210,6,{c:RD,w:2,fill:RD,fo:.9},.1);
  A.text(170,250,'3 corners',{size:20,c:SK});
  A.say("A triangle has three corners.",
        "ত্রিভুজের তিনটি কোণ আছে।");
  A.rect(300,120,110,110,{c:GR,w:3,fill:GR,fo:.1},.4);
  A.circle(300,120,6,{c:RD,w:2,fill:RD,fo:.9},.06);
  A.circle(410,120,6,{c:RD,w:2,fill:RD,fo:.9},.06);
  A.circle(410,230,6,{c:RD,w:2,fill:RD,fo:.9},.06);
  A.circle(300,230,6,{c:RD,w:2,fill:RD,fo:.9},.06);
  A.text(355,250,'4 corners',{size:20,c:GR});
  A.say("A square has four corners.",
        "বর্গের চারটি কোণ আছে।");
  const pent=[];
  for(let i=0;i<5;i++){
    const a=-Math.PI/2+i*2*Math.PI/5;
    pent.push([520+Math.cos(a)*62,175+Math.sin(a)*62]);
  }
  A.pts(pent,{c:AM,w:3,fill:AM,fo:.12},.4);
  for(let i=0;i<5;i++) A.circle(pent[i][0],pent[i][1],6,{c:RD,w:2,fill:RD,fo:.9},.06);
  A.text(520,262,'5 corners',{size:20,c:AM});
  A.say("A pentagon has five corners.",
        "পঞ্চভুজের পাঁচটি কোণ আছে।");
  A.circle(660,175,60,{c:PK,w:3,fill:PK,fo:.08},.4);
  A.text(660,262,'0 corners',{size:20,c:PK});
  A.say("A circle is smooth all round. It has no corners.",
        "বৃত্ত চারদিকে মসৃণ। এর কোনো কোণ নেই।");
  A.text(400,320,'corners have a sharp point',{size:22,c:AM});
  NOTE(A,452,'count the pointy corners carefully.');
});

lesson('pn-265','Sorting shapes by sides','Three sides, four sides, five sides',A=>{
  A.say("We can sort shapes by counting their sides.",
        "বাহু গণনা করে আমরা আকৃতিগুলো সাজাতে পারি।");
  A.pts([[120,140],[180,240],[60,240],[120,140]],{c:SK,w:3,fill:SK,fo:.15},.35);
  A.rect(230,150,90,90,{c:GR,w:3,fill:GR,fo:.12},.35);
  const pent=[];
  for(let i=0;i<5;i++){
    const a=-Math.PI/2+i*2*Math.PI/5;
    pent.push([420+Math.cos(a)*62,195+Math.sin(a)*62]);
  }
  A.pts(pent,{c:AM,w:3,fill:AM,fo:.14},.35);
  A.say("A triangle has three sides, a square has four, and a pentagon has five.",
        "ত্রিভুজের তিন বাহু, বর্গের চার বাহু আর পঞ্চভুজের পাঁচ বাহু।");
  const bx=[90,320,550];
  const bc=[SK,GR,AM];
  const lbl=['3 sides','4 sides','5 sides'];
  for(let i=0;i<3;i++){
    A.rect(bx[i],300,160,120,{c:bc[i],w:3,fill:bc[i],fo:.08},.35);
    A.text(bx[i]+80,330,lbl[i],{size:20,c:bc[i]});
  }
  A.text(170,380,'triangle',{size:17,c:SK});
  A.text(400,380,'square',{size:17,c:GR});
  A.text(630,380,'pentagon',{size:17,c:AM});
  A.say("Put each shape in the box for its number of sides.",
        "প্রতিটি আকৃতিকে তার বাহুর সংখ্যার বাক্সে রাখো।");
  A.say("Sorting by sides puts alike shapes together.",
        "বাহু দিয়ে সাজালে একই রকম আকৃতি একসাথে থাকে।");
  NOTE(A,452,'count the sides before you sort.');
});

lesson('pn-266','3D objects: ball, box, can, cone','Solid shapes all around us',A=>{
  A.say("Solid objects take up space. Here are four of them.",
        "ঠোস বস্তু জায়গা নেয়। এখানে এমন চারটি বস্তু আছে।");
  A.circle(150,180,58,{c:GR,w:3,fill:GR,fo:.25},.4);
  A.ell(150,180,58,20,{c:MU,w:1.5},.2);
  A.text(150,310,'ball',{size:20,c:GR});
  A.rect(260,150,110,110,{c:AM,w:3,fill:AM,fo:.18},.4);
  A.rect(295,115,110,110,{c:MU,w:2},.25);
  A.line(260,150,295,115,{c:AM,w:3},.15);
  A.line(370,150,405,115,{c:AM,w:3},.15);
  A.line(370,260,405,225,{c:AM,w:3},.15);
  A.text(335,310,'box',{size:20,c:AM});
  A.rect(500,150,80,120,{c:SK,w:2.5,fill:SK,fo:.12},.3);
  A.ell(540,150,40,14,{c:SK,w:2.5,fill:SK,fo:.3},.3);
  A.ell(540,270,40,14,{c:SK,w:2.5,fill:SK,fo:.3},.3);
  A.text(540,310,'can',{size:20,c:SK});
  A.pts([[635,245],[680,120],[725,245]],{c:PK,w:3,fill:PK,fo:.18},.35);
  A.ell(680,245,45,14,{c:PK,w:2.5,fill:PK,fo:.3},.25);
  A.text(680,310,'cone',{size:20,c:PK});
  A.say("A ball is round like a sphere. It can roll anywhere.",
        "বল গোলাকার, দেখতে গোলকের মতো। এটি যেদিকে খুশি গড়াতে পারে।");
  A.say("A box has flat faces and straight edges.",
        "বাক্সের সমতল তল আর সোজা কিনারা থাকে।");
  A.say("A can has two round ends, and a cone has one point.",
        "ক্যানের দুই প্রান্ত গোল, আর কোনের এক মাথা সূচালো।");
  A.text(400,352,'ball, box, can, cone',{size:24,c:AM});
  NOTE(A,446,'look for these solids in your kitchen.');
});

lesson('pn-267','Near and far: the park','Close by looks big, far away looks small',A=>{
  A.say("Near means close to us, and far means a long way away.",
        "কাছে মানে আমাদের কাছাকাছি, আর দূরে মানে অনেক দূর।");
  A.line(60,300,740,300,{c:MU,w:2},.3);
  A.circle(150,250,52,{c:GR,w:3,fill:GR,fo:.2},.4);
  A.rect(140,296,20,70,{c:MU,w:2,fill:MU,fo:.5},.2);
  A.text(150,390,'near tree',{size:20,c:GR});
  A.rect(600,250,60,40,{c:SK,w:2,fill:SK,fo:.2},.3);
  A.pts([[595,250],[630,225],[665,250]],{c:RD,w:2,fill:RD,fo:.2},.25);
  A.text(630,326,'far house',{size:20,c:SK});
  A.say("The big tree at the front is near to us.",
        "সামনের বড় গাছটি আমাদের কাছে।");
  A.circle(320,370,10,{c:AM,w:2,fill:AM,fo:.6},.15);
  A.line(320,382,320,410,{c:AM,w:3},.1);
  A.text(320,440,'near child',{size:18,c:AM});
  A.say("The little house on the hill is far away.",
        "পাহাড়ের ওপর ছোট বাড়িটি অনেক দূরে।");
  A.say("Near things look big, and far things look small.",
        "কাছের জিনিস বড় দেখায়, আর দূরের জিনিস ছোট দেখায়।");
  NOTE(A,462,'we judge distance by size and position.');
});

lesson('pn-268','Over and under','Above the bridge, below the bridge',A=>{
  A.say("Over means above something. Under means below it.",
        "ওপরে মানে কোনো কিছুর উপরে। নিচে মানে তার নিচে।");
  A.rect(140,190,520,30,{c:MU,w:3,fill:MU,fo:.25},.4);
  A.rect(190,220,34,100,{c:MU,w:3,fill:MU,fo:.25},.3);
  A.rect(576,220,34,100,{c:MU,w:3,fill:MU,fo:.25},.3);
  A.line(60,340,740,340,{c:SK,w:4},.3);
  A.line(60,360,740,360,{c:SK,w:2},.2);
  A.say("This is a bridge over a river.",
        "এটি নদীর ওপর একটি সেতু।");
  A.circle(360,140,16,{c:GR,w:2.5,fill:GR,fo:.5},.25);
  A.pts([[376,140],[400,128],[376,152],[376,140]],{c:GR,w:2,fill:GR,fo:.7},.2);
  A.text(280,144,'bird',{size:18,c:GR,anchor:'end'});
  A.say("The bird flies over the bridge.",
        "পাখিটি সেতুর ওপর দিয়ে উড়ছে।");
  A.pts([[400,326],[490,326],[476,348],[414,348],[400,326]],{c:RD,w:2.5,fill:RD,fo:.35},.3);
  A.line(445,326,445,292,{c:MU,w:2},.1);
  A.pts([[445,292],[475,302],[445,312]],{c:AM,w:2,fill:AM,fo:.7},.15);
  A.text(400,398,'boat under the bridge',{size:17,c:RD});
  A.say("The boat sails under the bridge, on the water.",
        "নৌকাটি সেতুর নিচে, পানিতে ভাসছে।");
  A.say("Over and under tell us the position of a thing.",
        "ওপর আর নিচ জিনিসের অবস্থান বলে।");
  NOTE(A,450,'the bird is over; the boat is under.');
});

lesson('pn-269','In and out','Inside the box or outside it',A=>{
  A.say("In means inside something. Out means not inside.",
        "ভিতরে মানে কোনো কিছুর ভেতরে। বাইরে মানে ভেতরে নয়।");
  A.rect(120,150,260,190,{c:AM,w:3,fill:AM,fo:.06},.4);
  A.text(250,112,'box',{size:20,c:AM});
  A.circle(250,245,30,{c:RD,w:3,fill:RD,fo:.4},.3);
  A.text(250,304,'red ball is in',{size:18,c:RD});
  A.say("The red ball is inside the box.",
        "লাল বলটি বাক্সের ভিতরে।");
  A.circle(590,245,30,{c:SK,w:3,fill:SK,fo:.4},.3);
  A.text(590,304,'blue ball is out',{size:18,c:SK});
  A.say("The blue ball is outside the box.",
        "নীল বলটি বাক্সের বাইরে।");
  A.arrow(470,180,420,180,{c:GR,w:2.5},.25);
  A.text(500,150,'in',{size:20,c:GR,anchor:'start'});
  A.arrow(620,320,690,320,{c:PK,w:2.5},.25);
  A.text(655,296,'out',{size:20,c:PK});
  A.say("We say in when something is inside, and out when it is not.",
        "কিছু ভিতরে থাকলে বলি ইন, আর না থাকলে বলি আউট।");
  A.text(400,400,'in  <->  out',{size:26,c:AM});
  NOTE(A,450,'look at the edge of the container.');
});

lesson('pn-270','Morning, afternoon and night','Three parts of one day',A=>{
  A.say("A day has morning, afternoon and night.",
        "একদিনে সকাল, বিকেল আর রাত থাকে।");
  const arc=[];
  for(let i=0;i<=40;i++){
    const a=Math.PI+i*Math.PI/40;
    arc.push([400+Math.cos(a)*270,330+Math.sin(a)*230]);
  }
  A.pts(arc,{c:MU,w:2,fill:'none',fo:0},.6);
  A.circle(150,320,26,{c:AM,w:2.5,fill:AM,fo:.6},.3);
  A.text(150,372,'morning',{size:20,c:AM});
  A.circle(400,110,30,{c:AM,w:2.5,fill:AM,fo:.7},.3);
  A.text(400,166,'afternoon',{size:20,c:AM});
  A.circle(650,320,26,{c:VI,w:2.5,fill:VI,fo:.4},.3);
  A.text(650,372,'night',{size:20,c:SK});
  A.say("In the morning the sun rises and we get ready for school.",
        "সকালে সূর্য ওঠে আর আমরা স্কুলের জন্য তৈরি হই।");
  A.say("In the afternoon the sun is high in the sky.",
        "বিকেলে সূর্য আকাশে উঁচুতে থাকে।");
  A.say("At night the moon comes out and we sleep.",
        "রাতে চাঁদ ওঠে আর আমরা ঘুমাই।");
  A.text(400,410,'morning -> afternoon -> night',{size:21,c:GR});
  NOTE(A,456,'the sun and moon help us tell the time of day.');
});

lesson('pn-271','Yesterday, today and tomorrow','Three days in a row',A=>{
  A.say("Yesterday is the day that has already gone.",
        "গতকাল হলো যে দিনটি চলে গেছে।");
  const cards=[[120,'Yesterday',MU],[300,'Today',AM],[480,'Tomorrow',SK]];
  for(let i=0;i<3;i++){
    A.rect(cards[i][0],140,200,150,{c:cards[i][2],w:3,fill:cards[i][2],fo:i===1?.18:.07},.4);
    A.text(cards[i][0]+100,196,cards[i][1],{size:20,c:cards[i][2]});
  }
  A.text(220,250,'gone',{size:18,c:MU});
  A.text(400,250,'now',{size:18,c:AM});
  A.text(580,250,'next',{size:18,c:SK});
  A.arrow(120,318,300,318,{c:MU,w:2},.25);
  A.arrow(300,318,480,318,{c:MU,w:2},.25);
  A.say("Today is the day we are living in right now.",
        "আজ হলো যে দিনে আমরা এখন আছি।");
  A.say("Tomorrow is the day that comes next.",
        "আগামীকাল হলো পরের দিন।");
  A.say("After today, tomorrow becomes today.",
        "আজ শেষ হলে আগামীকালই আবার আজ হয়ে যায়।");
  A.text(400,366,'yesterday -> today -> tomorrow',{size:20,c:GR});
  A.text(400,408,'today moves forward every day',{size:19,c:MU});
  NOTE(A,456,'yesterday is gone, tomorrow has not come yet.');
});

lesson('pn-272','The week in order','Monday to Sunday',A=>{
  A.say("A week has seven days, and they always come in the same order.",
        "এক সপ্তাহে সাত দিন, আর এরা সবসময় একই ক্রমে আসে।");
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  for(let i=0;i<7;i++){
    const x=75+i*94;
    A.rect(x,120,86,86,{c:i>4?PK:SK,w:2.5,fill:i>4?PK:SK,fo:.12},.2);
    A.text(x+43,152,days[i],{size:19,c:i>4?PK:SK});
    A.text(x+43,182,String(i+1),{size:17,c:MU});
  }
  A.say("Monday is the first day and Sunday is the last.",
        "সোমবার প্রথম দিন আর রবিবার শেষ দিন।");
  A.say("Saturday and Sunday are the weekend, when school is closed.",
        "শনিবার আর রবিবার হলো ছুটির দিন, স্কুল বন্ধ থাকে।");
  A.text(400,262,'Monday, Tuesday, Wednesday,',{size:20,c:SK});
  A.text(400,296,'Thursday, Friday, Saturday, Sunday',{size:20,c:SK});
  A.say("After Sunday, a new week starts again with Monday.",
        "রবিবারের পরে আবার সোমবার দিয়ে নতুন সপ্তাহ শুরু হয়।");
  A.text(400,356,'7 days make one week',{size:26,c:AM});
  A.text(400,404,'weekend: Saturday and Sunday',{size:19,c:PK});
  NOTE(A,456,'say the days in order every morning.');
});

lesson('pn-273','The months in order','January to December',A=>{
  A.say("A year has twelve months, and they follow one another in order.",
        "এক বছরে বারো মাস, আর তারা একের পর এক ক্রমে আসে।");
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const cols=[SK,SK,GR,GR,AM,AM,SK,SK,PK,PK,VI,VI];
  for(let i=0;i<12;i++){
    const r=Math.floor(i/6), k=i%6;
    const x=75+k*112, y=95+r*80;
    A.rect(x,y,104,64,{c:cols[i],w:2.5,fill:cols[i],fo:.1},.15);
    A.text(x+52,y+26,months[i],{size:16,c:cols[i]});
    A.text(x+52,y+50,String(i+1),{size:14,c:MU});
  }
  A.say("January comes first, then February and March.",
        "জানুয়ারি প্রথমে, তারপর ফেব্রুয়ারি আর মার্চ।");
  A.text(400,268,'12 months in one year',{size:24,c:AM});
  A.say("June is the sixth month, and December is the twelfth.",
        "জুন ষষ্ঠ মাস, আর ডিসেম্বর দ্বাদশ মাস।");
  A.say("After December, January starts a brand new year.",
        "ডিসেম্বরের পরে জানুয়ারি নতুন বছর শুরু করে।");
  A.text(400,320,'first: January      last: December',{size:20,c:GR});
  A.text(400,368,'January -> ... -> December -> January',{size:18,c:SK});
  NOTE(A,452,'twelve months go round and round each year.');
});

lesson('pn-274','Estimating: about how many?','Guess first, then count',A=>{
  A.say("Estimating means making a careful guess about how many.",
        "আন্দাজ করা মানে কতগুলো হতে পারে তার একটি যুক্তিসঙ্গত অনুমান করা।");
  const star=(cx,cy,r)=>[[cx,cy-r],[cx+r*.3,cy-r*.25],[cx+r,cy],[cx+r*.3,cy+r*.3],[cx+r*.55,cy+r],[cx,cy+r*.45],[cx-r*.55,cy+r],[cx-r*.3,cy+r*.3],[cx-r,cy],[cx-r*.3,cy-r*.25],[cx,cy-r]];
  for(let i=0;i<10;i++){
    A.pts(star(110+i*58,150,17),{c:AM,w:2,fill:AM,fo:.5},.06);
    A.pts(star(110+i*58,215,17),{c:AM,w:2,fill:AM,fo:.5},.06);
  }
  A.text(400,90,'about how many?',{size:20,c:MU});
  A.say("Look at the stars and guess before you count.",
        "তারাগুলো দেখো আর গোনার আগে আন্দাজ করো।");
  A.text(140,286,'my guess: about 20',{size:18,c:SK,anchor:'start'});
  A.say("Two rows of ten make twenty, so the guess of twenty is close.",
        "দশটির দুই সারি মিলে কুড়ি, তাই কুড়ি আন্দাজটি কাছাকাছি।");
  A.text(400,330,'10 + 10 = 20',{size:28,c:GR});
  A.say("An estimate does not have to be exact. It should be close.",
        "আন্দাজ হুবহু হতে হয় না। কাছাকাছি হলেই হয়।");
  A.text(400,378,'count to check: 20 stars',{size:22,c:AM});
  A.say("Now count them one by one to see if the guess was right.",
        "এখন এক এক করে গুনে দেখো আন্দাজ ঠিক ছিল কি না।");
  A.text(400,418,'guess, then count',{size:22,c:GR});
  NOTE(A,458,'a good estimate is close to the real count.');
});

