const A=document.querySelector("#app");
const STUDENTS=[{id:"PONO001",name:"はるさん",grade:3},{id:"PONO002",name:"そらさん",grade:5}];
const SUBJECTS=[["国語","📖"],["算数","🔢"],["理科","🔬"],["社会","🗾"],["英語","🔤"]];
const UNITS={
  "3-国語":{title:"漢字クエスト",learn:"「橋」は、川や道などをわたるためにかけるものです。読み方は「はし」です。",qs:[
    {skill:"読み",q:"「橋」の読み方は？",c:["はし","かわ","みち"],a:0,h:"川を渡るときに使うものだよ。",readTarget:false},
    {skill:"意味",q:"「橋」の意味に近いものは？",c:["川などを渡るためのもの","食べもの","天気の名前"],a:0,h:"向こう側へ渡るときに使います。",readTarget:true},
    {skill:"文脈",q:"文に合う漢字はどれ？「川に ○ がかかっている。」",c:["橋","空","森"],a:0,h:"川を渡るためのものを思い出そう。",readTarget:true}
  ]},
  "3-算数":{title:"わり算",learn:"12このあめを3人で同じ数ずつ分けると、1人4こです。12÷3＝4 と書きます。",qs:[
    {q:"12こを3人で同じ数ずつ分けると、1人何こ？",c:["3こ","4こ","6こ"],a:1,h:"4＋4＋4＝12 だね。",readTarget:true}
  ]},
  "3-理科":{title:"植物の育ち",learn:"植物は、芽が出て、葉が増え、育っていきます。",qs:[
    {q:"植物が育つと増えていくものは？",c:["葉","石","雲"],a:0,h:"茎についている緑色の部分だよ。",readTarget:true}
  ]},
  "3-社会":{title:"わたしたちの地域",learn:"地図では、場所や道、川などを記号や色で表します。",qs:[
    {q:"場所や道を調べるときに役立つものは？",c:["地図","体温計","時計"],a:0,h:"町の様子を上から見たように表します。",readTarget:true}
  ]},
  "3-英語":{title:"身近な英単語",learn:"apple は「りんご」という意味です。",qs:[
    {q:"apple の意味は？",c:["りんご","いぬ","みず"],a:0,h:"赤や緑のくだものだよ。",readTarget:true}
  ]}
};
let state={student:null,grade:3,subject:null,unit:null,qi:0,learned:false,hints:0,independent:0};

function speak(t){
  if(!("speechSynthesis" in window)){alert("この端末では読み上げを利用できません。");return;}
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t); u.lang="ja-JP"; u.rate=.82; speechSynthesis.speak(u);
}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
function login(){
 A.innerHTML=`<div class="card"><h1>おかえりなさい</h1>
 <button onclick="studentLogin('PONO001')">👦 生徒</button>
 <button onclick="parent()">🏠 保護者</button><button onclick="teacher()">🧑‍🏫 先生・Pono</button>
 <p class="small">試作版：実際の児童情報はまだ入力しないでください。</p></div>`;
}
function studentLogin(id){state.student=STUDENTS.find(x=>x.id===id); grades();}
function grades(){
 A.innerHTML=`<div class="card"><h1>${state.student.name}、おかえり！</h1><p class="lead">学習する学年を選んでね。在籍学年と違う学年も選べます。</p>
 ${[1,2,3,4,5,6].map(g=>`<button class="light" onclick="subjects(${g})">${g}年生</button>`).join("")}<button class="back" onclick="login()">もどる</button></div>`;
}
function subjects(g){
 state.grade=g;
 A.innerHTML=`<div class="card"><h1>${g}年生の学習</h1><div class="grid">
 ${SUBJECTS.map(([s,e])=>`<button class="light" onclick="choose('${s}')">${e}<br>${s}</button>`).join("")}</div><button class="back" onclick="grades()">学年にもどる</button></div>`;
}
function choose(s){
 state.subject=s; let key=`${state.grade}-${s}`; state.unit=UNITS[key];
 if(!state.unit){A.innerHTML=`<div class="card"><h1>${state.grade}年 ${s}</h1><div class="notice">この学年の教材はこれから追加します。</div><button class="back" onclick="subjects(${state.grade})">科目にもどる</button></div>`;return;}
 learn();
}
function learn(){
 state.learned=true; state.qi=0; state.hints=0; state.independent=0;
 A.innerHTML=`<div class="card"><div class="progress">① まなぶ → ② 一緒にやってみる → ③ 自分でやる</div>
 <h1>${state.subject}・${state.unit.title}</h1><h2>① まず、まなぼう</h2><div class="notice">${esc(state.unit.learn)}</div>
 <button class="audio" onclick="speak(state.unit.learn)">🔊 説明をきく</button>
 <button onclick="practice()">一緒にやってみる</button></div>`;
}
function practice(){
 const q=state.unit.qs[0];
 A.innerHTML=`<div class="card"><div class="progress">② 一緒にやってみる</div><h1>${state.unit.title}</h1>
 <div class="big">${esc(q.q)}</div>${audioButtons(q)}
 ${choices(q,"practiceAnswer")}<button class="hint" onclick="hint()">💡 ヒント</button>
 <button class="light" onclick="learn()">わからない・説明を見る</button></div>`;
}
function practiceAnswer(i){
 const q=state.unit.qs[0];
 if(i===q.a){A.innerHTML=`<div class="card center"><h1>🌱 できた！</h1><p class="lead">今度は自分でやってみよう。</p><button onclick="startQuiz()">③ 自分でやる</button></div>`}
 else alert("大丈夫。ヒントや説明を使って、もう一度確認しよう。");
}
function startQuiz(){state.qi=0;showQ();}
function showQ(){
 const q=state.unit.qs[state.qi];
 A.innerHTML=`<div class="card"><div class="progress">③ 自分でやる　${state.qi+1}/${state.unit.qs.length}</div>
 <h1>${state.unit.title}</h1><div class="big">${esc(q.q)}</div>${audioButtons(q)}
 ${choices(q,"answer")}<button class="hint" onclick="hint()">💡 ヒント</button>
 <button class="light" onclick="dontKnow()">わからない・説明を見る</button></div>`;
}
function audioButtons(q){
 const prompt=q.readTarget===false ? "画面にある漢字の読み方を選んでください。" : q.q;
 return `<button class="audio" onclick='speak(${JSON.stringify(prompt)})'>🔊 問題をきく</button>
 <button class="audio" onclick='speak(${JSON.stringify("選択肢です。"+q.c.map((x,i)=>(i+1)+"、"+x).join("。"))})'>🔊 選択肢をきく</button>`;
}
function choices(q,fn){return `<div class="grid">${q.c.map((x,i)=>`<button class="choice light" onclick="${fn}(${i})">${i+1}. ${esc(x)}</button>`).join("")}</div>`;}
function hint(){state.hints++;speak(state.unit.qs[state.qi]?.h || state.unit.qs[0].h);alert("ヒント："+(state.unit.qs[state.qi]?.h || state.unit.qs[0].h));}
function dontKnow(){state.hints++;learn();}
function answer(i){
 const q=state.unit.qs[state.qi];
 if(i===q.a){state.independent++;state.qi++; if(state.qi>=state.unit.qs.length)finish();else showQ();}
 else alert("もう一度、別の方法で確認しよう。ヒントや説明を使って大丈夫です。");
}
function finish(){
 saveResult();
 A.innerHTML=`<div class="card center"><h1>🌱 できた！</h1><p class="lead">${state.unit.title}を最後まで進めました。</p>
 <div class="notice">ヒントを使うことも、説明に戻ることも学習の一部です。</div><button onclick="subjects(${state.grade})">科目へもどる</button></div>`;
}
function saveResult(){
 const data=JSON.parse(localStorage.getItem("ponoResults")||"[]");
 data.push({name:state.student.name,grade:state.grade,subject:state.subject,unit:state.unit.title,hints:state.hints,independent:state.independent,date:new Date().toLocaleDateString("ja-JP")});
 localStorage.setItem("ponoResults",JSON.stringify(data));
}
function parent(){
 const d=JSON.parse(localStorage.getItem("ponoResults")||"[]");
 A.innerHTML=`<div class="card"><h1>🏠 保護者画面</h1><p class="lead">できたことを中心に表示します。</p>${reportRows(d)}<button class="back" onclick="login()">もどる</button></div>`;
}
function teacher(){
 const d=JSON.parse(localStorage.getItem("ponoResults")||"[]");
 A.innerHTML=`<div class="card"><h1>🧑‍🏫 先生・Pono</h1><p class="lead">説明・ヒントを使いながら進めた過程も確認できます。</p>${reportRows(d)}<button class="back" onclick="login()">もどる</button></div>`;
}
function reportRows(d){
 if(!d.length)return `<div class="notice">まだ学習記録はありません。</div>`;
 return d.slice().reverse().map(x=>`<div class="notice"><b>${esc(x.name)}｜${x.grade}年 ${esc(x.subject)}</b><br>${esc(x.unit)}<br>自分で解けた：${x.independent}問／ヒント利用：${x.hints}回<br>${x.date}</div>`).join("");
}
login();
