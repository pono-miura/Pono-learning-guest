const A=document.querySelector("#app");
const SUBJECTS=[["国語","📖"],["算数","🔢"],["理科","🔬"],["社会","🗾"],["英語","🔤"]];
const STUDENTS=[{id:"PONO001",name:"はるさん",actualGrade:3},{id:"PONO002",name:"そらさん",actualGrade:5}];
let U=null,G=3,SUB="",unit=null,step=0,qi=0;

const UNITS=[
{g:1,s:"国語",title:"漢字のはじめ",learn:"漢字には、形と読みと意味があります。まずは見て、読んで、意味をつなげてみよう。",example:"山 →「やま」⛰️",qs:[
 {skill:"読み",q:"「山」の読み方は？",c:["やま","かわ","そら"],a:0,h:"⛰️ 高い山を思い浮かべよう。"},
 {skill:"意味",q:"「川」はどれ？",c:["水が流れるところ","高いところ","空を飛ぶもの"],a:0,h:"水が流れている場所だよ。"}]},
{g:1,s:"算数",title:"たし算",learn:"たし算は、数と数を合わせる計算です。",example:"🍎🍎 + 🍎 = 3こ　→ 2 + 1 = 3",qs:[
 {skill:"計算",q:"3 + 2 は？",c:["4","5","6"],a:1,h:"3から2つ先へ数えてみよう。"}]},
{g:2,s:"国語",title:"文の中の漢字",learn:"同じ音でも、意味によって使う漢字が変わります。文全体を見て選ぼう。",example:"かわで魚をつる → 川",qs:[
 {skill:"文中選択",q:"「かわで さかなを つる」の「かわ」は？",c:["川","山","空"],a:0,h:"魚がいる場所を考えよう。"}]},
{g:2,s:"算数",title:"ひき算",learn:"ひき算は、ある数から減らしたり、違いを調べたりするときに使います。",example:"12 - 5 = 7",qs:[
 {skill:"計算",q:"12 - 5 は？",c:["6","7","8"],a:1,h:"12から5つ戻ってみよう。"}]},
{g:3,s:"国語",title:"漢字クエスト",learn:"漢字は「書ける」だけでなく、読める・意味が分かる・文で選べる・形を見分けられることも大切です。",example:"橋 → はし。川などを渡るためのもの。",qs:[
 {skill:"読み",q:"「橋」の読み方は？",c:["はし","はた","はな"],a:0,h:"川を渡るときに使うものだよ。"},
 {skill:"意味",q:"「島」に近い説明は？",c:["海などに囲まれた陸地","高い山","長い川"],a:0,h:"周りに水がある陸地だよ。"},
 {skill:"形",q:"「氵（さんずい）」がつく漢字は？",c:["海","林","空"],a:0,h:"水に関係する漢字を探そう。"}]},
{g:3,s:"算数",title:"わり算",learn:"わり算は、同じ数ずつ分けるときに使います。",example:"🍬12こを3人に同じ数ずつ → 1人4こ　12 ÷ 3 = 4",qs:[
 {skill:"概念",q:"8こを2人に同じ数ずつ分けると、1人何こ？",c:["3こ","4こ","5こ"],a:1,h:"8こを2つのグループに同じ数ずつ分けよう。"},
 {skill:"計算",q:"24 ÷ 6 は？",c:["3","4","5"],a:1,h:"6 × 4 = 24 を使ってもいいよ。"}]},
{g:3,s:"理科",title:"植物の育ち",learn:"植物の育ち方は、光・水・温度など周りの環境と関係しています。",example:"植物の様子を比べて、何が違うか観察します。",qs:[
 {skill:"理解",q:"植物の育ちと関係が深いものは？",c:["光","紙だけ","石だけ"],a:0,h:"日なたと暗い場所の植物を想像してみよう。"}]},
{g:3,s:"社会",title:"わたしたちの地域",learn:"社会では、自分たちの住む地域から少しずつ範囲を広げて学びます。",example:"山梨県は日本の中部地方にあります。",qs:[
 {skill:"地域",q:"山梨県がある地方は？",c:["中部地方","北海道地方","九州地方"],a:0,h:"日本の真ん中あたりにある県だよ。"}]},
{g:3,s:"英語",title:"身近な英単語",learn:"英語は、まず身近なものと音・文字を結びつけて覚えよう。",example:"🍎 apple（アップル）",qs:[
 {skill:"単語",q:"「りんご」は英語で？",c:["apple","dog","book"],a:0,h:"最初の音は「ア」に近いよ。"}]},
{g:4,s:"算数",title:"分数",learn:"分数は、1つのものを同じ大きさに分けたうちのいくつ分かを表します。",example:"1/2 は「2つに分けたうちの1つ分」。2/4と同じ大きさです。",qs:[
 {skill:"概念",q:"1/2 と同じ大きさは？",c:["2/4","1/4","3/4"],a:0,h:"2/4は4つのうち2つ。半分だね。"}]},
{g:4,s:"国語",title:"熟語",learn:"二つ以上の漢字が組み合わさってできた言葉を熟語といいます。",example:"希 + 望 → 希望",qs:[{skill:"熟語",q:"「希望」の「希」と組み合わせる漢字は？",c:["望","海","森"],a:0,h:"「きぼう」という言葉を思い出そう。"}]},
{g:5,s:"算数",title:"小数",learn:"小数も整数と同じように、位をそろえて考えると分かりやすくなります。",example:"0.5 + 0.3 = 0.8",qs:[{skill:"計算",q:"0.5 + 0.3 は？",c:["0.8","0.2","8"],a:0,h:"0.1が5こ＋3こ、と考えよう。"}]},
{g:5,s:"理科",title:"種子の発芽",learn:"発芽に必要な条件を、条件を変えた実験で比べます。",example:"水・適当な温度・空気が発芽に必要です。",qs:[{skill:"理解",q:"種子の発芽に必要なものは？",c:["水・適当な温度・空気","光だけ","土だけ"],a:0,h:"発芽の実験で比べる条件を思い出そう。"}]},
{g:5,s:"英語",title:"好きなものを伝える",learn:"I like ～. で「私は～が好きです」と伝えられます。",example:"I like dogs. = 私は犬が好きです。",qs:[{skill:"文",q:"「私は犬が好きです。」は？",c:["I like dogs.","I am a dog.","This is a book."],a:0,h:"「好き」は like を使うよ。"}]},
{g:6,s:"算数",title:"割合",learn:"割合は「もとにする量の何倍か」を表します。%は100をもとにした表し方です。",example:"100人の25% → 100 × 0.25 = 25人",qs:[{skill:"概念",q:"100人の25%は？",c:["25人","50人","75人"],a:0,h:"25%は100のうち25という意味だよ。"}]},
{g:6,s:"理科",title:"植物と光",learn:"植物は光を受け、葉で養分をつくります。このはたらきを光合成といいます。",example:"光 + 葉 → 養分をつくる（光合成）",qs:[{skill:"理解",q:"植物が光を受けて養分をつくるはたらきは？",c:["光合成","蒸発","凝結"],a:0,h:"「光」を使ってつくるはたらきだよ。"}]},
{g:6,s:"国語",title:"文章の中心をつかむ",learn:"文章全体で筆者が最も伝えたい中心的な内容を「要旨」といいます。",example:"大事な文や繰り返される言葉に注目しよう。",qs:[{skill:"読解",q:"文章の中心となる考えを何という？",c:["要旨","文字数","題名だけ"],a:0,h:"文章全体の中心を表す言葉だよ。"}]}
];

function data(){try{return JSON.parse(localStorage.getItem("ponoV3")||"{}")}catch(e){return{}}}
function save(x){localStorage.setItem("ponoV3",JSON.stringify(x))}
function login(){A.innerHTML=`<div class="card"><h1>おかえりなさい</h1><button onclick="student()">👦 生徒</button><button onclick="parent()">🏠 保護者</button><button onclick="teacher()">👩‍🏫 先生・Pono</button><p class="small">試作版です。実際の児童情報はまだ入力しないでください。</p></div>`}
function student(){A.innerHTML=`<div class="card"><h2>生徒ログイン</h2><input id="sid" class="input" placeholder="PONO001"><button onclick="signin()">ログイン</button><button class="light" onclick="login()">もどる</button></div>`}
function signin(){let id=sid.value.trim().toUpperCase();U=STUDENTS.find(x=>x.id===id);if(!U)return alert("試作IDは PONO001 または PONO002 です");grades()}
function grades(){A.innerHTML=`<h1>${U.name}、おかえり！</h1><div class="card"><h2>どの学年から学ぶ？</h2><p>今の学年に関係なく、分かるところ・復習したいところから選べるよ。</p><div class="grid">${[1,2,3,4,5,6].map(x=>`<button class="light" onclick="subjects(${x})"><b>${x}年生</b></button>`).join("")}</div></div><button onclick="login()">ログアウト</button>`}
function subjects(x){G=x;A.innerHTML=`<h1>${G}年生</h1><div class="card grid">${SUBJECTS.map(y=>`<button class="light" onclick="choose('${y[0]}')"><span style="font-size:30px">${y[1]}</span><br>${y[0]}</button>`).join("")}</div><button onclick="grades()">学年を選びなおす</button>`}
function choose(s){SUB=s;let us=UNITS.filter(x=>x.g===G&&x.s===SUB);A.innerHTML=`<h1>${G}年 ${SUB}</h1><div class="card">${us.length?us.map((x,i)=>`<button class="light" onclick="openUnit(${UNITS.indexOf(x)})">${x.title}<br><span class="small">まなぶ → やってみる → 確認</span></button>`).join(""):"<p>この単元はこれから追加します。</p>"}</div><button onclick="subjects(G)">教科にもどる</button>`}
function openUnit(i){unit=UNITS[i];step=0;qi=0;record("opened");learn()}
function learn(){record("learned");A.innerHTML=`<div class="card"><span class="tag">① まなぶ</span><h1>${unit.title}</h1><div class="lesson">${unit.learn}</div><div class="example">${unit.example}</div><p class="small">初めて学ぶ人も、ここから始めれば大丈夫。</p><button onclick="practice()">一緒にやってみる</button></div><button class="light" onclick="choose(SUB)">単元にもどる</button>`}
function practice(){let q=unit.qs[0];A.innerHTML=`<div class="card"><span class="tag">② 一緒にやってみる</span><h2>${q.q}</h2><p>分からなければヒントを見て大丈夫。</p><button class="hint" onclick="showHint(0)">💡 ヒントを見る</button><button onclick="quiz()">自分でやってみる</button><button class="light" onclick="learn()">説明をもう一度見る</button></div>`}
function showHint(i){record("hint");alert(unit.qs[i].h)}
function quiz(){qi=0;showQ()}
 showQfunction(){if(qi>=unit.qs.length)return finish();let q=unit.qs[qi];A.innerHTML=`<div class="card"><span class="tag">③ 自分でやる</span><p>${qi+1}/${unit.qs.length}　確認：${q.skill}</p><h1>${q.q}</h1>${q.c.map((c,i)=>`<button class="light" onclick="answer(${i})">${c}</button>`).join("")}<button class="hint" onclick="showHint(${qi})">💡 ヒントを見る</button><button class="light" onclick="dontKnow()">わからない・説明を見る</button></div>`}
function dontKnow(){record("dontKnow");learn()}
function answer(i){let q=unit.qs[qi],ok=i===q.a;record(ok?"independent":"retry",q.skill);if(ok){alert("⭐ できた！");qi++;showQ()}else{alert("大丈夫。ヒントや説明を見て、もう一度確かめよう。");showQ()}}
function record(kind,skill=""){if(!U)return;let d=data();d[U.id]??={};let k=`${unit.g}-${unit.s}-${unit.title}`;d[U.id][k]??={g:unit.g,s:unit.s,title:unit.title,opened:0,learned:0,hint:0,dontKnow:0,independent:0,retry:0,skills:{},last:""};let r=d[U.id][k];r[kind]=(r[kind]||0)+1;if(skill){r.skills[skill]??={independent:0,retry:0};r.skills[skill][kind]=(r.skills[skill][kind]||0)+1}r.last=new Date().toLocaleDateString("ja-JP");save(d)}
function finish(){A.innerHTML=`<div class="card"><p class="good">🌱 できた！</p><h2>${unit.title}</h2><p>「知らなかったことを学ぶ」ことも大切な学習です。</p><button onclick="learn()">もう一度まなぶ</button><button class="light" onclick="choose(SUB)">ほかの単元へ</button></div>`}
function parent(){A.innerHTML=`<div class="card"><h2>保護者用</h2><input id="pid" class="input" placeholder="PONO001"><button onclick="report(pid.value.trim().toUpperCase(),false)">学習の様子を見る</button><button class="light" onclick="login()">もどる</button></div>`}
function teacher(){let d=data();A.innerHTML=`<h1>先生ダッシュボード</h1><div class="card"><p>点数だけでなく「説明を見た」「ヒントを使った」「自分でできた」を確認します。</p><table><tr><th>児童</th><th>在籍</th><th></th></tr>${STUDENTS.map(x=>`<tr><td>${x.name}</td><td>小${x.actualGrade}</td><td><button onclick="report('${x.id}',true)">個別</button></td></tr>`).join("")}</table></div><button onclick="login()">もどる</button>`}
function report(id,t){let st=STUDENTS.find(x=>x.id===id);if(!st)return alert("IDを確認してください");let rows=Object.values(data()[id]||{});A.innerHTML=`<div class="card"><h1>Pono 個別学習報告書</h1><p>児童：${st.name}　　在籍：小学${st.actualGrade}年</p><p>作成日：${new Date().toLocaleDateString("ja-JP")}</p>${rows.length?`<table><tr><th>教材</th><th>教科</th><th>学習</th><th>ヒント</th><th>自分で</th></tr>${rows.map(r=>`<tr><td>${r.g}年 ${r.title}</td><td>${r.s}</td><td>${r.learned}</td><td>${r.hint}</td><td>${r.independent}</td></tr>`).join("")}</table>`:"<p>まだ学習記録はありません。</p>"}<p>「書けない＝理解していない」とはせず、読み・意味・選択・形・計算・概念理解などを分けて確認します。</p>${t?`<button onclick="window.print()">学校提出用に印刷／PDF保存</button>`:""}</div><button onclick="${t?"teacher()":"parent()"}">もどる</button>`}
// 🔊 読み上げ機能
function speak(text){
  if(!("speechSynthesis" in window)){
    alert("この端末では読み上げ機能を利用できません。");
    return;
  }
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="ja-JP";
  u.rate=0.85;
  window.speechSynthesis.speak(u);
}

function speakQuestion(){
  if(!unit || !unit.qs || !unit.qs[qi]) return;
  const q=unit.qs[qi];

  // 「読み」の問題は漢字を読んで答えを教えない
  if(q.skill==="読み"){
    speak("画面にある漢字の読み方を選んでください。");
  }else{
    speak(q.q);
  }
}

function speakChoices(){
  if(!unit || !unit.qs || !unit.qs[qi]) return;
  const q=unit.qs[qi];
  const text=q.c.map((x,i)=>(i+1)+"、"+x).join("。");
  speak("選択肢です。"+text);
}
// 🔊 問題画面に読み上げボタンを自動追加
const originalShowQ = showQ;

showQ = function(){
  originalShowQ();

  const card = A.querySelector(".card");
  if(!card) return;

  const title = card.querySelector("h1");
  if(!title) return;

  const audioBox = document.createElement("div");
  audioBox.innerHTML =
    '<button class="light" onclick="speakQuestion()">🔊 問題をきく</button>' +
    '<button class="light" onclick="speakChoices()">🔊 選択肢をきく</button>';

  title.insertAdjacentElement("afterend", audioBox);
};
login();
