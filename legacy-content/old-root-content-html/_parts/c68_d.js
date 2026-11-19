/* Part D: angles, constructions, congruence, similarity and circle theorems */

lesson('c68-243','Angles on a straight line','Two angles on a straight line add to 180 degrees',A=>{
  A.say('A straight line is a half turn, so the angles on one side of it add to 180 degrees.',
        'সরলরেখা অর্ধ ঘূর্ণন, তাই এর এক পাশের কোণগুলো মিলে ১৮০ ডিগ্রি হয়।');
  A.line(120,320,680,320,{c:SK,w:3},.6);
  A.line(400,320,315,173,{c:INK,w:3},.4);
  A.say('Here a ray splits the straight angle into two adjacent angles, a and b.',
        'এখানে একটি রশ্মি সরল কোণটিকে পাশাপাশি দুই কোণ a ও b-তে ভাগ করেছে।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(400,320,62,180,240),{c:AM,w:2.5},.5);
  A.pts(arc(400,320,78,240,360),{c:PK,w:2.5},.5);
  A.text(335,282,'a = 60°',{size:20,c:AM});
  A.text(452,243,'b = 120°',{size:20,c:PK});
  A.say('Angle a is 60 degrees, so b is 180 minus 60, which is 120 degrees.',
        'কোণ a হলো ৬০ ডিগ্রি, তাই b হবে ১৮০ − ৬০, অর্থাৎ ১২০ ডিগ্রি।');
  A.text(400,380,'60° + 120° = 180°',{size:26,c:GR});
  A.say('No matter how many angles sit on the line, their total is always a straight angle.',
        'রেখার উপর যতগুলো কোণই থাকুক, তাদের যোগফল সবসময় সরল কোণই হয়।');
  A.text(400,415,'(a half turn)',{size:18,c:MU});
  NOTE(A,448,'angles on one side of a straight line add to 180 degrees.');
});

lesson('c68-244','Angles around a point','Angles around a point add to 360 degrees',A=>{
  A.say('A full turn around a point is 360 degrees.',
        'একটি বিন্দুর চারপাশে এক পূর্ণ ঘূর্ণন ৩৬০ ডিগ্রি।');
  A.circle(400,260,132,{c:MU,w:1.5},.6);
  A.circle(400,260,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.line(400,260,400,120,{c:SK,w:2.5},.3);
  A.line(400,260,530,335,{c:SK,w:2.5},.3);
  A.line(400,260,400,400,{c:SK,w:2.5},.3);
  A.line(400,260,260,260,{c:SK,w:2.5},.3);
  A.say('Four rays from the point make four angles that fill the whole turn.',
        'বিন্দু থেকে চারটি রশ্মি চারটি কোণ তৈরি করে, যা পুরো ঘূর্ণন ভরাট করে।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(400,260,68,-90,30),{c:AM,w:2.5},.5);
  A.pts(arc(400,260,82,30,90),{c:PK,w:2.5},.5);
  A.pts(arc(400,260,68,90,180),{c:GR,w:2.5},.5);
  A.pts(arc(400,260,82,180,270),{c:VI,w:2.5},.5);
  A.text(461,214,'120°',{size:19,c:AM});
  A.text(434,320,'60°',{size:19,c:PK});
  A.text(347,304,'90°',{size:19,c:GR});
  A.text(347,222,'90°',{size:19,c:VI});
  A.say('Here 120 + 60 + 90 leaves 90 degrees for the last angle.',
        'এখানে ১২০ + ৬০ + ৯০ বাদ দিলে শেষ কোণের জন্য থাকে ৯০ ডিগ্রি।');
  A.text(400,432,'120 + 60 + 90 + 90 = 360',{size:21,c:GR});
  A.say('So the angles around a point always add up to 360 degrees.',
        'সুতরাং একটি বিন্দুর চারপাশের কোণগুলোর যোগফল সবসময় ৩৬০ ডিগ্রি।');
  NOTE(A,462,'one complete turn is 360 degrees.');
});

lesson('c68-245','Vertically opposite angles','Crossing lines make equal opposite angles',A=>{
  A.say('When two straight lines cross, four angles are formed.',
        'দুটি সরলরেখা কাটাকাটি করলে চারটি কোণ তৈরি হয়।');
  A.line(210,110,590,390,{c:SK,w:3},.6);
  A.line(210,390,590,110,{c:PK,w:3},.6);
  A.circle(400,250,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.say('The angles facing each other are called vertically opposite angles.',
        'পরস্পরের বিপরীতে থাকা কোণগুলোকে বিপ্রতীপ কোণ বলে।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(400,250,54,322.1,360),{c:AM,w:2.5},.4);
  A.pts(arc(400,250,54,142.1,217.9),{c:AM,w:2.5},.4);
  A.pts(arc(400,250,70,0,36.9),{c:GR,w:2.5},.4);
  A.pts(arc(400,250,70,180,217.9),{c:GR,w:2.5},.4);
  A.text(470,232,'a',{size:22,c:AM});
  A.text(335,232,'a',{size:22,c:AM});
  A.text(447,318,'b',{size:22,c:GR});
  A.text(350,187,'b',{size:22,c:GR});
  A.say('They are equal because both are 180 degrees minus the same angle.',
        'তারা সমান, কারণ দুটিই একই কোণকে ১৮০ ডিগ্রি থেকে বিয়োগ করে পাওয়া।');
  A.text(400,400,'a = a     and     b = b',{size:26,c:GR});
  A.say('So opposite angles at a crossing are always equal.',
        'তাই ছেদবিন্দুতে বিপরীত কোণগুলো সবসময় সমান হয়।');
  A.text(400,432,'vertically opposite angles are equal',{size:19,c:AM});
  NOTE(A,462,'look for the X shape at the crossing.');
});

lesson('c68-246','Corresponding angles on parallel lines','Same position at each crossing means equal angles',A=>{
  A.say('A transversal cuts two parallel lines.',
        'একটি ছেদক দুটি সমান্তরাল রেখাকে কেটেছে।');
  A.line(150,180,650,180,{c:SK,w:3},.5);
  A.line(150,350,650,350,{c:SK,w:3},.5);
  A.line(250,90,488,430,{c:PK,w:2.5},.6);
  A.text(132,185,'m',{size:19,c:MU});
  A.text(132,355,'n',{size:19,c:MU});
  A.text(475,440,'t',{size:19,c:MU});
  A.say('Corresponding angles are in the same position at each crossing.',
        'অনুরূপ কোণগুলো প্রতিটি ছেদবিন্দুতে একই অবস্থানে থাকে।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(313,180,44,0,55),{c:AM,w:2.5},.4);
  A.pts(arc(432,350,44,0,55),{c:AM,w:2.5},.4);
  A.text(367,209,'x',{size:22,c:AM});
  A.text(486,379,'x',{size:22,c:AM});
  A.say('The lower right angle at the top equals the lower right angle below.',
        'উপরের ছেদে নিচ-ডানের কোণটি নিচের ছেদের নিচ-ডানের কোণের সমান।');
  A.text(400,405,'x = 55 degrees at both crossings',{size:22,c:GR});
  A.say('So corresponding angles on parallel lines are equal.',
        'সুতরাং সমান্তরাল রেখায় অনুরূপ কোণগুলো সমান।');
  A.text(400,440,'corresponding angles: F shape',{size:19,c:AM});
  NOTE(A,466,'same corner at each crossing.');
});

lesson('c68-247','Alternate angles on parallel lines','The Z angles are equal',A=>{
  A.say('Look for the Z shape made by the transversal and the parallel lines.',
        'ছেদক ও সমান্তরাল রেখা মিলে যে Z আকৃতি তৈরি হয়, তা খেয়াল করো।');
  A.line(150,180,650,180,{c:SK,w:3},.5);
  A.line(150,350,650,350,{c:SK,w:3},.5);
  A.line(250,90,488,430,{c:PK,w:2.5},.6);
  A.say('The angles inside the Z, on opposite sides, are alternate angles.',
        'Z-এর ভিতরের, বিপরীত পাশে থাকা কোণগুলো একান্তর কোণ।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(313,180,48,0,55),{c:AM,w:2.5},.4);
  A.pts(arc(432,350,48,180,235),{c:AM,w:2.5},.4);
  A.text(367,209,'x',{size:22,c:AM});
  A.text(378,322,'x',{size:22,c:AM});
  A.say('They are equal, so if the top angle is 55 degrees, the other is 55 too.',
        'তারা সমান, তাই উপরের কোণটি ৫৫ ডিগ্রি হলে অন্যটিও ৫৫ ডিগ্রি।');
  A.text(400,405,'alternate angles:  x = 55 degrees',{size:21,c:GR});
  A.say('Alternate angles on parallel lines are always equal.',
        'সমান্তরাল রেখায় একান্তর কোণগুলো সবসময় সমান।');
  A.text(400,440,'the Z or zig-zag shape',{size:19,c:AM});
  NOTE(A,466,'inside, on opposite sides of the transversal.');
});

lesson('c68-248','Co-interior angles on parallel lines','Same side inside angles add to 180 degrees',A=>{
  A.say('Co-interior angles lie between the parallel lines on the same side.',
        'সহ-অন্তঃস্থ কোণগুলো সমান্তরাল রেখার মাঝে, একই পাশে থাকে।');
  A.line(150,180,650,180,{c:SK,w:3},.5);
  A.line(150,350,650,350,{c:SK,w:3},.5);
  A.line(250,90,488,430,{c:PK,w:2.5},.6);
  A.say('They are not equal; together they make a straight angle of 180 degrees.',
        'তারা সমান নয়; একসাথে তারা ১৮০ ডিগ্রির সরল কোণ তৈরি করে।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(313,180,46,0,55),{c:AM,w:2.5},.4);
  A.pts(arc(432,350,62,235,360),{c:PK,w:2.5},.4);
  A.text(369,210,'p = 55',{size:18,c:AM});
  A.text(495,291,'q = 125',{size:18,c:PK});
  A.say('So if one is 55 degrees, the other is 180 minus 55, which is 125 degrees.',
        'তাই একটি ৫৫ ডিগ্রি হলে অন্যটি ১৮০ − ৫৫, অর্থাৎ ১২৫ ডিগ্রি।');
  A.text(400,405,'55 + 125 = 180 degrees',{size:23,c:GR});
  A.say('This is the C shape: co-interior angles are supplementary.',
        'এটি C আকৃতি: সহ-অন্তঃস্থ কোণগুলো সম্পূরক।');
  A.text(400,440,'inside the parallels, same side',{size:19,c:AM});
  NOTE(A,466,'co-interior angles add to 180, they are not equal.');
});

lesson('c68-249','Angle sum of a triangle','Three angles of a triangle make 180 degrees',A=>{
  A.say('Draw a line through the apex parallel to the base.',
        'শীর্ষবিন্দু দিয়ে ভূমির সমান্তরাল একটি রেখা আঁকো।');
  A.line(170,170,610,170,{c:SK,w:2.5},.5);
  A.pts([[250,360],[550,360],[380,170]],{c:INK,w:3,fill:AM,fo:.06},.6);
  A.say('The two angles at the apex are alternate to the base angles, so they are equal.',
        'শীর্ষে থাকা দুই কোণ ভূমির কোণগুলোর একান্তর, তাই তারা সমান।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(380,170,56,124.4,180),{c:PK,w:2.5},.4);
  A.pts(arc(380,170,72,48.2,124.4),{c:GR,w:2.5},.4);
  A.pts(arc(380,170,56,0,48.2),{c:PK,w:2.5},.4);
  A.pts(arc(250,360,50,304.4,360),{c:AM,w:2},.3);
  A.pts(arc(550,360,50,180,228.2),{c:AM,w:2},.3);
  A.text(312,206,'56',{size:18,c:PK});
  A.text(385,245,'76',{size:18,c:GR});
  A.text(450,204,'48',{size:18,c:PK});
  A.text(313,328,'56',{size:18,c:AM});
  A.text(487,330,'48',{size:18,c:AM});
  A.say('The three angles now sit together on that straight line.',
        'এখন তিনটি কোণ ওই সরলরেখার উপর একসাথে বসে।');
  A.say('So the angles of a triangle add to 180 degrees: 56 + 76 + 48 = 180.',
        'সুতরাং ত্রিভুজের কোণগুলোর যোগফল ১৮০ ডিগ্রি: ৫৬ + ৭৬ + ৪৮ = ১৮০।');
  A.text(400,420,'56 + 76 + 48 = 180 degrees',{size:23,c:GR});
  NOTE(A,455,'a triangle is half of a straight angle.');
});

lesson('c68-250','Exterior angle of a triangle','Outside angle equals the two inside opposites added',A=>{
  A.say('Extend one side of the triangle to make an exterior angle.',
        'ত্রিভুজের একটি বাহু বাড়িয়ে বর্হিস্থ কোণ তৈরি করো।');
  A.line(240,360,690,360,{c:SK,w:3},.5);
  A.pts([[240,360],[500,360],[340,190]],{c:INK,w:3,fill:AM,fo:.06},.6);
  A.say('The exterior angle and the inside angle next to it make 180 degrees.',
        'বর্হিস্থ কোণ ও তার পাশের অন্তঃস্থ কোণ মিলে ১৮০ ডিগ্রি হয়।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(500,360,42,180,226.7),{c:AM,w:2.5},.4);
  A.pts(arc(500,360,64,226.7,360),{c:GR,w:2.5},.4);
  A.pts(arc(240,360,52,300.5,360),{c:PK,w:2.5},.4);
  A.pts(arc(340,190,46,46.7,120.5),{c:VI,w:2.5},.4);
  A.text(444,338,'47',{size:18,c:AM});
  A.text(539,268,'133',{size:19,c:GR});
  A.text(296,327,'59',{size:18,c:PK});
  A.text(352,247,'74',{size:18,c:VI});
  A.say('Here the two far inside angles are 59 and 74 degrees.',
        'এখানে দূরের দুই অন্তঃস্থ কোণ ৫৯ ও ৭৪ ডিগ্রি।');
  A.say('Their sum is 133 degrees, exactly the exterior angle.',
        'তাদের যোগফল ১৩৩ ডিগ্রি, যা ঠিক বর্হিস্থ কোণের সমান।');
  A.text(400,412,'133 = 59 + 74',{size:25,c:GR});
  NOTE(A,448,'exterior angle = sum of the two opposite inside angles.');
});

lesson('c68-251','Isosceles triangle base angles','Equal sides face equal base angles',A=>{
  A.say('An isosceles triangle has two equal sides.',
        'সমদ্বিবাহু ত্রিভুজের দুইটি বাহু সমান।');
  A.pts([[300,405],[500,405],[400,130]],{c:INK,w:3,fill:SK,fo:.07},.6);
  A.line(342.5,264.8,357.5,270.2,{c:AM,w:2.5},.2);
  A.line(442.5,270.2,457.5,264.8,{c:AM,w:2.5},.2);
  A.say('The angles opposite those equal sides are also equal.',
        'ওই সমান বাহুগুলোর বিপরীত কোণগুলোও সমান।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(300,405,52,290,360),{c:GR,w:2.5},.4);
  A.pts(arc(500,405,52,180,250),{c:GR,w:2.5},.4);
  A.pts(arc(400,130,48,70,110),{c:PK,w:2.5},.4);
  A.text(354,367,'70',{size:19,c:GR});
  A.text(447,367,'70',{size:19,c:GR});
  A.text(400,198,'40',{size:19,c:PK});
  A.say('So if the apex angle is 40 degrees, the base angles are 70 degrees each.',
        'তাই শীর্ষ কোণ ৪০ ডিগ্রি হলে ভূমির প্রতিটি কোণ ৭০ ডিগ্রি।');
  A.text(400,435,'70 + 70 + 40 = 180 degrees',{size:22,c:GR});
  A.say('Base angles of an isosceles triangle are always equal.',
        'সমদ্বিবাহু ত্রিভুজের ভূমি কোণগুলো সবসময় সমান।');
  NOTE(A,462,'equal sides are marked with the same tick.');
});

lesson('c68-252','Angle sum of a quadrilateral','A diagonal makes two triangles: 360 degrees',A=>{
  A.say('Draw one diagonal of the quadrilateral.',
        'চতুর্ভুজের একটি কর্ণ আঁকো।');
  A.pts([[240,140],[570,170],[610,380],[210,360]],{c:INK,w:3,fill:VI,fo:.06},.6);
  A.dashed(240,140,610,380,{c:AM,w:2.5},.6);
  A.say('The diagonal splits it into two triangles.',
        'কর্ণটি চতুর্ভুজকে দুইটি ত্রিভুজে ভাগ করে।');
  A.text(470,235,'180',{size:24,c:SK});
  A.text(350,300,'180',{size:24,c:SK});
  A.say('Each triangle has 180 degrees, so together they have 360.',
        'প্রতিটি ত্রিভুজে ১৮০ ডিগ্রি, তাই একসাথে ৩৬০ ডিগ্রি।');
  A.text(268,168,'w',{size:20,c:AM});
  A.text(545,196,'x',{size:20,c:AM});
  A.text(583,355,'y',{size:20,c:AM});
  A.text(232,337,'z',{size:20,c:AM});
  A.say('The four corner angles fit inside those two triangles.',
        'চারটি কোণার কোণ ওই দুই ত্রিভুজের ভিতরেই পড়ে।');
  A.text(400,432,'w + x + y + z = 360',{size:26,c:GR});
  A.say('The angles of any quadrilateral add to 360 degrees.',
        'যেকোনো চতুর্ভুজের কোণগুলোর যোগফল ৩৬০ ডিগ্রি।');
  NOTE(A,462,'two triangles of 180 degrees each.');
});

lesson('c68-253','Constructing a perpendicular bisector','Compass arcs meet above and below the segment',A=>{
  A.say('Start with segment AB and open the compass wider than half of it.',
        'AB রেখাংশ নিয়ে কম্পাস অর্ধেকের চেয়ে বেশি খোলো।');
  A.line(250,330,550,330,{c:SK,w:3},.4);
  A.circle(250,330,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.circle(550,330,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.text(250,355,'A',{size:20,c:INK});
  A.text(550,355,'B',{size:20,c:INK});
  A.say('Draw an arc from A and the same arc from B, above and below.',
        'A থেকে একটি চাপ, আর B থেকে একই চাপ, উপরে ও নিচে আঁকো।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=36;i++){const t=(a1+(a2-a1)*i/36)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(250,330,190,-45,45),{c:PK,w:2.5},.7);
  A.pts(arc(550,330,190,135,225),{c:PK,w:2.5},.7);
  A.say('The arcs meet at two points; join them with a straight line.',
        'চাপগুলো দুই বিন্দুতে মেলে; তাদের সরলরেখায় যোগ করো।');
  A.dashed(400,185,400,458,{c:GR,w:2.5},.6);
  A.pts([[400,330],[418,330],[418,312]],{c:AM,w:2},.3);
  A.line(325,322,325,338,{c:AM,w:2.5},.2);
  A.line(475,322,475,338,{c:AM,w:2.5},.2);
  A.say('That line cuts AB at its midpoint and is perpendicular to it.',
        'ওই রেখাটি AB-কে মধ্যবিন্দুতে কাটে এবং তার উপর লম্ব।');
  A.text(400,405,'MA = MB and the line is at 90 degrees to AB',{size:18,c:GR});
  A.say('So the perpendicular bisector is built from two equal compass arcs.',
        'সুতরাং দুইটি সমান কম্পাস চাপ থেকেই লম্ব-সমদ্বিখণ্ডক তৈরি হয়।');
  NOTE(A,448,'the two arcs use the same radius.');
});

lesson('c68-254','Constructing an angle bisector','Equal arcs find the halfway ray',A=>{
  A.say('Draw an arc from the vertex that cuts both arms of the angle.',
        'শীর্ষবিন্দু থেকে একটি চাপ আঁকো যা কোণের দুই বাহুকে কাটে।');
  A.line(230,400,640,400,{c:SK,w:3},.4);
  A.line(230,400,430,150,{c:SK,w:3},.4);
  A.circle(230,400,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.text(212,425,'O',{size:19,c:INK});
  A.say('From those two points draw equal arcs that cross each other.',
        'ওই দুই বিন্দু থেকে সমান চাপ আঁকো যারা পরস্পরকে কাটে।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=30;i++){const t=(a1+(a2-a1)*i/30)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(230,400,120,308.7,360),{c:PK,w:2.5},.6);
  A.pts(arc(350,400,100,-86,-26),{c:MU,w:2},.6);
  A.pts(arc(305,306,100,-25,35),{c:MU,w:2},.6);
  A.dashed(230,400,482,278,{c:GR,w:2.5},.6);
  A.circle(350,400,3.5,{c:AM,w:1,fill:AM,fo:1},.15);
  A.circle(305,306,3.5,{c:AM,w:1,fill:AM,fo:1},.15);
  A.say('Join the vertex to that crossing point.',
        'শীর্ষবিন্দুকে ওই ছেদবিন্দুর সাথে যোগ করো।');
  A.pts(arc(230,400,56,308.7,334.3),{c:AM,w:2},.3);
  A.pts(arc(230,400,56,334.3,360),{c:AM,w:2},.3);
  A.text(291,357,'x',{size:19,c:AM});
  A.text(300,389,'x',{size:19,c:AM});
  A.say('The line splits the angle into two equal halves.',
        'রেখাটি কোণটিকে দুইটি সমান ভাগে ভাগ করে।');
  A.text(400,435,'the bisector makes two equal angles',{size:20,c:GR});
  NOTE(A,462,'both arcs from the cut points have the same radius.');
});

lesson('c68-255','Constructing a 60 degree angle','Two equal arcs make an equilateral triangle',A=>{
  A.say('Draw a ray and an arc from the vertex that cuts the ray.',
        'একটি রশ্মি ও শীর্ষবিন্দু থেকে একটি চাপ আঁকো যা রশ্মিকে কাটে।');
  A.line(220,390,680,390,{c:SK,w:3},.5);
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=30;i++){const t=(a1+(a2-a1)*i/30)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(220,390,180,-70,5),{c:PK,w:2.5},.7);
  A.circle(220,390,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.say('Keep the same compass width and draw an arc from that cut point.',
        'একই কম্পাস প্রস্থ রেখে ওই ছেদবিন্দু থেকে আরেকটি চাপ আঁকো।');
  A.pts(arc(400,390,180,210,270),{c:GR,w:2.5},.7);
  A.circle(400,390,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.say('The two arcs meet at a point; join it to the vertex.',
        'দুই চাপ একটি বিন্দুতে মেলে; সেটিকে শীর্ষবিন্দুর সাথে যোগ করো।');
  A.line(220,390,370,130,{c:INK,w:3},.5);
  A.line(400,390,310,234,{c:MU,w:2},.5);
  A.say('The triangle formed is equilateral, so every angle is 60 degrees.',
        'তৈরি হওয়া ত্রিভুজটি সমবাহু, তাই প্রতিটি কোণ ৬০ ডিগ্রি।');
  A.pts(arc(220,390,72,300,360),{c:AM,w:2.5},.4);
  A.text(299,348,'60',{size:21,c:AM});
  A.text(310,150,'equilateral triangle',{size:18,c:GR});
  A.text(400,428,'all three sides are equal, so the angle is 60 degrees',{size:18,c:GR});
  NOTE(A,460,'the compass stays at the same width throughout.');
});

lesson('c68-256','Congruence by SSS','Three pairs of equal sides are enough',A=>{
  A.say('Two triangles are congruent if all three pairs of sides are equal.',
        'দুইটি ত্রিভুজের তিন জোড়া বাহুই সমান হলে তারা সর্বসম।');
  A.pts([[150,350],[300,150],[400,350]],{c:SK,w:3,fill:SK,fo:.06},.5);
  A.pts([[470,350],[620,150],[720,350]],{c:PK,w:3,fill:PK,fo:.06},.5);
  A.say('Here AB = PQ, BC = QR and CA = RP.',
        'এখানে AB = PQ, BC = QR এবং CA = RP।');
  A.text(203,255,'6',{size:18,c:AM});
  A.text(368,250,'7',{size:18,c:AM});
  A.text(275,380,'5',{size:18,c:AM});
  A.text(523,255,'6',{size:18,c:AM});
  A.text(688,250,'7',{size:18,c:AM});
  A.text(595,380,'5',{size:18,c:AM});
  A.say('The matching numbers show which sides are equal.',
        'মিলে যাওয়া সংখ্যাগুলো দেখায় কোন বাহুগুলো সমান।');
  A.text(400,415,'SSS:  side - side - side',{size:24,c:GR});
  A.say('With SSS the triangles fit exactly on top of each other.',
        'SSS নিয়মে ত্রিভুজগুলো ঠিক একটির উপর আরেকটি বসে যায়।');
  A.text(400,448,'every matching side is equal',{size:18,c:AM});
  NOTE(A,466,'congruent means same shape and same size.');
});

lesson('c68-257','Congruence by SAS','Two sides and the included angle',A=>{
  A.say('Congruence needs enough matching parts, not all of them.',
        'সর্বসমতার জন্য সব অংশ নয়, যথেষ্ট অংশ মিললেই হয়।');
  A.pts([[150,360],[330,360],[280,190]],{c:SK,w:3,fill:SK,fo:.06},.5);
  A.pts([[470,360],[650,360],[600,190]],{c:PK,w:3,fill:PK,fo:.06},.5);
  A.say('Here two sides and the angle between them are equal.',
        'এখানে দুইটি বাহু এবং তাদের মধ্যবর্তী কোণ সমান।');
  A.line(240,352,240,368,{c:AM,w:2.5},.2);
  A.line(560,352,560,368,{c:AM,w:2.5},.2);
  A.line(312.7,272.8,297.3,277.2,{c:AM,w:2.5},.2);
  A.line(632.7,272.8,617.3,277.2,{c:AM,w:2.5},.2);
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(330,360,45,180,253.7),{c:GR,w:2.5},.4);
  A.pts(arc(650,360,45,180,253.7),{c:GR,w:2.5},.4);
  A.text(281,323,'x',{size:18,c:GR});
  A.text(601,323,'x',{size:18,c:GR});
  A.say('The equal angle must be included between the equal sides.',
        'সমান কোণটি অবশ্যই সমান বাহুগুলোর মাঝে থাকতে হবে।');
  A.text(400,415,'SAS:  side - angle - side',{size:24,c:GR});
  A.say('This is the SAS test for congruent triangles.',
        'এটিই সর্বসম ত্রিভুজের SAS পরীক্ষা।');
  A.text(400,448,'the angle is trapped between the two sides',{size:18,c:AM});
  NOTE(A,466,'without the included angle it is not SAS.');
});

lesson('c68-258','Similarity by equal angles','Same angles, same shape',A=>{
  A.say('Similar triangles have the same shape but not always the same size.',
        'সদৃশ ত্রিভুজের আকৃতি একই, তবে আকার সবসময় এক নয়।');
  A.pts([[170,380],[320,380],[230,260]],{c:SK,w:3,fill:SK,fo:.07},.5);
  A.pts([[430,400],[730,400],[550,160]],{c:PK,w:3,fill:PK,fo:.05},.5);
  A.say('If two angles of one triangle equal two angles of another, they are similar.',
        'এক ত্রিভুজের দুই কোণ অপরটির দুই কোণের সমান হলে তারা সদৃশ।');
  const arc=(cx,cy,r,a1,a2)=>{const p=[];for(let i=0;i<=24;i++){const t=(a1+(a2-a1)*i/24)*Math.PI/180;p.push([cx+r*Math.cos(t),cy+r*Math.sin(t)]);}return p;};
  A.pts(arc(170,380,35,296.6,360),{c:AM,w:2},.3);
  A.pts(arc(430,400,45,301.9,360),{c:AM,w:2},.3);
  A.pts(arc(320,380,35,180,233.1),{c:GR,w:2},.3);
  A.pts(arc(730,400,45,180,233.1),{c:GR,w:2},.3);
  A.pts(arc(230,260,38,53.1,116.6),{c:VI,w:2},.3);
  A.pts(arc(550,160,48,53.1,116.6),{c:VI,w:2},.3);
  A.text(205,350,'a',{size:18,c:AM});
  A.text(473,370,'a',{size:18,c:AM});
  A.text(292,344,'b',{size:18,c:GR});
  A.text(694,365,'b',{size:18,c:GR});
  A.text(238,300,'c',{size:17,c:VI});
  A.text(558,207,'c',{size:17,c:VI});
  A.text(170,407,'A',{size:17,c:MU});
  A.text(325,407,'B',{size:17,c:MU});
  A.text(430,427,'P',{size:17,c:MU});
  A.text(735,427,'Q',{size:17,c:MU});
  A.say('The third angle must also match, because each triangle has 180 degrees.',
        'তৃতীয় কোণও মিলবে, কারণ প্রতিটি ত্রিভুজে ১৮০ ডিগ্রি।');
  A.text(400,90,'side ratio  150 : 300  =  1 : 2',{size:21,c:SK});
  A.say('So the sides are in the same ratio, here 1 to 2.',
        'তাই বাহুগুলো একই অনুপাতে, এখানে ১ : ২।');
  A.text(400,440,'equal angles give the same shape',{size:20,c:GR});
  NOTE(A,462,'only two angles are needed, the third follows.');
});

lesson('c68-259','Ratio of areas of similar triangles','Areas grow as the square of the sides',A=>{
  A.say('When two triangles are similar, every length grows by the same scale factor.',
        'দুইটি ত্রিভুজ সদৃশ হলে প্রতিটি দৈর্ঘ্য একই অনুপাতে বাড়ে।');
  A.pts([[180,390],[330,390],[240,280]],{c:SK,w:3,fill:SK,fo:.10},.5);
  A.pts([[420,410],[720,410],[540,190]],{c:PK,w:3,fill:PK,fo:.06},.5);
  A.say('Here the sides of the big triangle are twice those of the small one.',
        'এখানে বড় ত্রিভুজের বাহুগুলো ছোটটির দ্বিগুণ।');
  A.text(250,348,'area 1',{size:18,c:AM});
  A.text(570,348,'area 4',{size:21,c:GR});
  A.say('Area grows with the square of the scale factor, so 2 squared is 4.',
        'ক্ষেত্রফল অনুপাতের বর্গে বাড়ে, তাই ২-এর বর্গ ৪।');
  A.text(400,95,'side ratio 1 : 2  gives  2 x 2 = 4',{size:21,c:SK});
  A.say('The ratio of the areas is 1 : 4, not 1 : 2.',
        'ক্ষেত্রফলের অনুপাত ১ : ৪, ১ : ২ নয়।');
  A.text(400,443,'area ratio = 1 : 4',{size:26,c:AM});
  NOTE(A,466,'area uses the square of the length ratio.');
});

lesson('c68-260','Tangent perpendicular to radius','Tangent meets the radius at 90 degrees',A=>{
  A.say('A tangent touches the circle at exactly one point.',
        'স্পর্শক বৃত্তকে ঠিক এক বিন্দুতে স্পর্শ করে।');
  A.circle(400,240,120,{c:SK,w:2.5},.7);
  A.line(220,360,580,360,{c:GR,w:3},.6);
  A.circle(400,360,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.say('Draw the radius to the point of contact.',
        'স্পর্শবিন্দু পর্যন্ত ব্যাসার্ধ আঁকো।');
  A.line(400,240,400,360,{c:PK,w:3},.5);
  A.circle(400,240,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.text(383,220,'O',{size:18,c:INK});
  A.text(418,305,'radius',{size:17,c:PK,anchor:'start'});
  A.text(540,388,'tangent',{size:18,c:GR,anchor:'start'});
  A.pts([[400,360],[382,360],[382,342]],{c:AM,w:2},.3);
  A.say('The tangent is always perpendicular to that radius.',
        'স্পর্শক সবসময় ওই ব্যাসার্ধের উপর লম্ব।');
  A.text(350,338,'90°',{size:19,c:AM});
  A.say('So the angle between the tangent and the radius is exactly 90 degrees.',
        'তাই স্পর্শক ও ব্যাসার্ধের মধ্যবর্তী কোণ ঠিক ৯০ ডিগ্রি।');
  A.text(400,412,'OT is perpendicular to the tangent at T',{size:20,c:GR});
  NOTE(A,448,'the radius meets the tangent at a right angle.');
});

lesson('c68-261','Angle in a semicircle','The angle at the circle is always 90 degrees',A=>{
  A.say('AB is a diameter and P is any point on the circle.',
        'AB একটি ব্যাস এবং P বৃত্তের যেকোনো একটি বিন্দু।');
  A.circle(400,270,140,{c:SK,w:2.5},.7);
  A.line(260,270,540,270,{c:MU,w:2.5},.4);
  A.circle(260,270,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.circle(540,270,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.circle(400,270,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.text(246,292,'A',{size:18,c:INK});
  A.text(550,292,'B',{size:18,c:INK});
  A.text(408,292,'O',{size:17,c:MU,anchor:'start'});
  A.say('Join P to A and to B to make an angle at the circle.',
        'P-কে A ও B-এর সাথে যোগ করলে বৃত্তে একটি কোণ তৈরি হয়।');
  A.line(352,138,260,270,{c:INK,w:2.5},.4);
  A.line(352,138,540,270,{c:INK,w:2.5},.4);
  A.circle(352,138,4,{c:PK,w:1,fill:PK,fo:1},.2);
  A.text(340,126,'P',{size:18,c:PK});
  A.pts([[352,138],[340.5,154.4],[357,165.9],[368.4,149.5]],{c:AM,w:2},.3);
  A.text(387,179,'90°',{size:18,c:AM});
  A.say('The angle at the centre on AB is 180 degrees, so the angle at P is half of it.',
        'AB-এর উপর কেন্দ্রের কোণ ১৮০ ডিগ্রি, তাই P-তে কোণ তার অর্ধেক।');
  A.say('The angle in a semicircle is always 90 degrees.',
        'অর্ধবৃত্তে অঙ্কিত কোণ সবসময় ৯০ ডিগ্রি।');
  A.text(400,415,'angle APB = 90 degrees',{size:24,c:GR});
  NOTE(A,448,'a diameter always makes a right angle at the circle.');
});

lesson('c68-262','Chord bisected by a perpendicular from the centre','The perpendicular cuts the chord in half',A=>{
  A.say('A perpendicular drawn from the centre to a chord cuts it in half.',
        'কেন্দ্র থেকে জ্যা-এর উপর অঙ্কিত লম্ব জ্যাটিকে দুই ভাগে ভাগ করে।');
  A.circle(400,240,130,{c:SK,w:2.5},.7);
  A.line(297.5,320,502.5,320,{c:GR,w:3},.5);
  A.line(400,240,400,320,{c:PK,w:2.5},.5);
  A.circle(400,240,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.text(383,225,'O',{size:17,c:INK});
  A.text(285,342,'A',{size:18,c:INK});
  A.text(512,342,'B',{size:18,c:INK});
  A.text(410,342,'M',{size:17,c:AM,anchor:'start'});
  A.say('Here the centre O joins the midpoint M of chord AB.',
        'এখানে কেন্দ্র O জ্যা AB-এর মধ্যবিন্দু M-এর সাথে যুক্ত।');
  A.pts([[400,320],[382,320],[382,302]],{c:AM,w:2},.3);
  A.line(348.5,314,348.5,326,{c:AM,w:2.5},.2);
  A.line(451.5,314,451.5,326,{c:AM,w:2.5},.2);
  A.say('The two halves AM and MB are equal.',
        'দুই অংশ AM ও MB সমান।');
  A.text(400,378,'AM = MB',{size:26,c:GR});
  A.say('So the perpendicular from the centre bisects the chord.',
        'তাই কেন্দ্র থেকে লম্ব জ্যাটিকে সমদ্বিখণ্ডিত করে।');
  A.text(400,408,'OM is perpendicular to AB at M',{size:20,c:AM});
  NOTE(A,448,'a perpendicular from the centre always bisects a chord.');
});

lesson('c68-263','Equal chords are equidistant from the centre','Same length means same distance',A=>{
  A.say('Two chords of the same length are equal chords.',
        'একই দৈর্ঘ্যের দুইটি জ্যা সমান জ্যা।');
  A.circle(400,250,140,{c:SK,w:2.5},.7);
  A.line(273.5,190,526.5,190,{c:PK,w:3},.5);
  A.line(273.5,310,526.5,310,{c:GR,w:3},.5);
  A.line(400,250,400,190,{c:AM,w:2.5},.4);
  A.line(400,250,400,310,{c:AM,w:2.5},.4);
  A.circle(400,250,4,{c:AM,w:1,fill:AM,fo:1},.2);
  A.text(386,238,'O',{size:17,c:INK});
  A.text(400,175,'M',{size:17,c:AM});
  A.text(400,330,'N',{size:17,c:AM});
  A.say('Drop perpendiculars from the centre to both chords.',
        'কেন্দ্র থেকে দুই জ্যার উপর লম্ব নামাও।');
  A.pts([[400,190],[382,190],[382,208]],{c:AM,w:2},.3);
  A.pts([[400,310],[382,310],[382,292]],{c:AM,w:2},.3);
  A.say('The distances OM and ON come out equal.',
        'দূরত্ব OM ও ON সমান হয়।');
  A.text(370,218,'60',{size:16,c:MU});
  A.text(370,278,'60',{size:16,c:MU});
  A.text(400,368,'AB = CD   and   OM = ON',{size:24,c:GR});
  A.say('So equal chords are equidistant from the centre.',
        'তাই সমান জ্যা কেন্দ্র থেকে সমদূরবর্তী।');
  A.text(400,405,'same chord length, same distance from O',{size:19,c:AM});
  NOTE(A,445,'equal chords stand at equal distances from the centre.');
});
