const roles=["研发负责人","知识产权人员","生物医药研发人员"];
const industries=["半导体与集成电路","新能源与汽车","高端装备与制造","新材料与化工","生物医药与大健康","消费电子"];
const stages=["技术预研","研发立项","技术攻关","专利申请","风险管理","成果转化"];
const sourceTypes=["搜索趋势","知乎问答","微信生态","小红书内容","行业媒体","竞品官网"];
const skillAliases={
  "technology-insight-analysis":"技术洞察分析",
  "patent-project-proposal":"专利项目立项报告",
  "patent-research-analyst":"专利调研分析师",
  "competitor-patent-landscape":"竞品专利全景",
  "triz-functional-search":"TRIZ 功能检索",
  "ceae-skill":"工程瓶颈根因分析",
  "cross-border-patent-risk-screen":"跨境专利风险初筛",
  "generic-fto-report":"通用 FTO 报告",
  "patent-application-evaluation-assistant":"专利申请评估助手",
  "pharma-project-initiation-report":"医药项目立项报告",
  "pharma-conference-insight-report":"医药会议洞察报告",
  "patsnap-lifescience-target-intelligence_zh":"靶点情报",
  "patsnap-lifescience-company-profiling_zh":"医药公司画像",
  "innovation-radar":"创新雷达",
  "tech-evolution-analysis":"技术演进分析"
};
const hotspots=[
 {id:1,industry:"新能源与汽车",title:"固态电池产业化进程持续加速",fact:"头部企业密集发布量产时间表，材料体系与工艺路线仍存在分化。",role:"研发负责人",pain:"路线选择缺少证据，担心投入后技术路线被淘汰",impact:"研发立项与路线决策",skills:["technology-insight-analysis","patent-project-proposal","tech-evolution-analysis"],hook:"《固态电池技术路线初筛报告》",score:96},
 {id:2,industry:"半导体与集成电路",title:"AI 芯片供应链与先进封装成为关注焦点",fact:"算力需求推动先进封装、散热与材料方案快速演进。",role:"研发负责人",pain:"现有工程方案达到性能瓶颈，团队难以跳出本行业经验",impact:"技术攻关与跨域创新",skills:["ceae-skill","triz-functional-search","technology-insight-analysis"],hook:"《工程瓶颈根因与跨域方案清单》",score:94},
 {id:3,industry:"高端装备与制造",title:"研发降本与避免重复研发进入管理层议程",fact:"企业从压缩预算转向提高立项质量和复用外部技术证据。",role:"研发负责人",pain:"无法证明项目是否重复、竞争对手是否已经领先",impact:"立项评审与研发预算",skills:["patent-research-analyst","patent-project-proposal","competitor-patent-landscape"],hook:"《研发立项重复性初筛报告》",score:93},
 {id:4,industry:"消费电子",title:"产品出海专利风险讨论升温",fact:"跨境平台合规趋严，外观与功能专利风险需要在上市前识别。",role:"知识产权人员",pain:"产品上市节奏快，人工 FTO 周期长且难以覆盖多国风险",impact:"上市风险与合规成本",skills:["cross-border-patent-risk-screen","generic-fto-report","patent-application-evaluation-assistant"],hook:"《出海产品专利风险自查清单》",score:91},
 {id:5,industry:"生物医药与大健康",title:"医药顶会密集披露新靶点与临床数据",fact:"会议数据密度高，管线变化、靶点热度与 BD 信号需要快速整合。",role:"生物医药研发人员",pain:"信息过载，难以快速判断哪些变化真正影响项目优先级",impact:"管线决策与项目立项",skills:["pharma-conference-insight-report","pharma-project-initiation-report","patsnap-lifescience-target-intelligence_zh"],hook:"《热门靶点机会与风险速览》",score:90},
 {id:6,industry:"新材料与化工",title:"绿色制造推动材料配方与催化工艺升级",fact:"双碳要求与成本压力共同推动替代材料、低能耗工艺和催化体系创新。",role:"研发负责人",pain:"性能、成本和绿色要求互相制约，缺少可验证的替代路径",impact:"配方优化与工艺创新",skills:["triz-functional-search","ceae-skill","technology-insight-analysis"],hook:"《材料工艺替代路径诊断》",score:88}
];
const outcomes=[
 {name:"看清方向",icon:"⌁",desc:"技术路线、竞争格局与演进趋势",skills:["technology-insight-analysis","tech-evolution-analysis","competitor-patent-landscape"]},
 {name:"解决技术问题",icon:"✓",desc:"根因定位、跨领域类比与创新设计",skills:["ceae-skill","triz-functional-search","innovation-radar"]},
 {name:"降低知识产权风险",icon:"●",desc:"查新、FTO、出海与申请前评估",skills:["generic-fto-report","cross-border-patent-risk-screen","patent-application-evaluation-assistant"]},
 {name:"提高立项质量",icon:"■",desc:"避免重复研发，用证据支持 GO/NO-GO",skills:["patent-project-proposal","patent-research-analyst","pharma-project-initiation-report"]},
 {name:"洞察生物医药",icon:"✦",desc:"靶点、管线、顶会与公司情报",skills:["pharma-conference-insight-report","patsnap-lifescience-target-intelligence_zh","patsnap-lifescience-company-profiling_zh"]}
];
let skillData={meta:{total:100,syncedAt:"2026-07-07",source:"https://open.zhihuiya.com/marketplace/agent-skills",status:"seed"},skills:[]};
let activeOutcome="全部";
let painSignals=[];
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
function skill(id){
  const found=skillData.skills.find(x=>x.id===id);
  return found||{id,name:skillAliases[id]||id,description:"智慧芽 SkillHub 能力，等待下一次同步补全官方简介。",url:`https://open.zhihuiya.com/marketplace/agent-skills/${id}`,category:"待分类"};
}
function cnDate(date){
  return new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}).format(date).replace(/\//g,"-");
}
function updateStatus(){
  const synced=skillData.meta.syncedAt||"2026-07-07";
  const base=new Date(`${synced}T09:00:00+08:00`);
  const now=new Date();
  let last=base;
  while(last.getTime()+12*3600*1000<=now.getTime())last=new Date(last.getTime()+12*3600*1000);
  const next=new Date(last.getTime()+12*3600*1000);
  $("#lastUpdated").textContent=cnDate(last);
  $("#nextUpdated").textContent=cnDate(next);
  $("#updateStatus").textContent=skillData.meta.status==="success"?"同步成功":"种子数据";
  $("#syncDate").textContent=cnDate(last);
}
function buildPainSignals(){
  const templates=[
    ["立项前不知道同行是否已经布局，担心重复研发","立项重复","patent-project-proposal","patent-research-analyst"],
    ["技术路线太多，无法判断哪条路线更值得投入","路线选择","technology-insight-analysis","tech-evolution-analysis"],
    ["竞品动作分散在官网、论文、专利和招聘信息里，人工追踪成本高","竞品监测","competitor-patent-landscape","technology-insight-analysis"],
    ["工程性能遇到瓶颈，团队只能在原有经验里反复试错","技术瓶颈","ceae-skill","triz-functional-search"],
    ["专利申请前缺少查新和可授权性判断，担心材料质量不够","申请评估","patent-application-evaluation-assistant","patent-research-analyst"],
    ["产品即将出海，但多国专利风险无法在上市节奏内判断","出海 FTO","cross-border-patent-risk-screen","generic-fto-report"],
    ["研发会议和实验记录里可能有创新点，但没有人系统识别","创新捕捉","innovation-radar","patent-application-evaluation-assistant"],
    ["外部技术很多，不知道哪些可以转化为自己的方案","技术转化","technology-insight-analysis","triz-functional-search"],
    ["管理层要研发降本，但团队缺少能解释取舍的证据","研发降本","patent-project-proposal","competitor-patent-landscape"],
    ["新靶点、新适应症和临床数据太密集，难以判断优先级","医药情报","pharma-conference-insight-report","patsnap-lifescience-target-intelligence_zh"],
    ["BD 或技术引进前缺少目标公司和管线画像","外部合作","patsnap-lifescience-company-profiling_zh","pharma-project-initiation-report"],
    ["材料替代方案需要同时满足性能、成本和绿色要求","替代方案","triz-functional-search","ceae-skill"],
    ["客户问到竞品能力时，销售没有可引用的证据话术","销售赋能","competitor-patent-landscape","technology-insight-analysis"],
    ["研发方向变化快，周报和月报很难沉淀成决策依据","趋势汇报","technology-insight-analysis","tech-evolution-analysis"],
    ["专利组合数量不少，但不知道哪些资产真正有价值","资产分级","patent-research-analyst","competitor-patent-landscape"],
    ["项目推进到中后期才发现风险，返工成本很高","前置风控","generic-fto-report","patent-application-evaluation-assistant"],
    ["跨部门讨论缺少统一证据口径，研发、知产和市场各说各话","证据对齐","patent-project-proposal","technology-insight-analysis"]
  ];
  const rows=[];
  for(let i=0;i<100;i++){
    const t=templates[i%templates.length],h=hotspots[i%hotspots.length],role=roles[(i+h.id)%roles.length];
    const industry=industries[(i*2+h.id)%industries.length],stage=stages[(i*3+h.id)%stages.length];
    const score=98-(i%27)-Math.floor(i/18);
    const growth=32-(i%19)+(i%5);
    const fit=96-(i%13);
    const skills=[t[2],t[3],h.skills[i%h.skills.length]];
    rows.push({
      rank:i+1,
      title:t[0],
      keyword:t[1],
      role:role==="生物医药研发人员"||industry==="生物医药与大健康"?role:"研发负责人"===role?role:"知识产权人员",
      industry,
      stage,
      expression:`典型表达：${t[1]}怎么办 / 如何快速判断${stage}风险 / ${industry}竞品怎么查`,
      score:Math.max(62,score),
      growth,
      fit,
      skills:[...new Set(skills)].slice(0,3),
      sources:[sourceTypes[i%sourceTypes.length],sourceTypes[(i+2)%sourceTypes.length],sourceTypes[(i+4)%sourceTypes.length]]
    });
  }
  return rows.sort((a,b)=>b.score-a.score).map((x,i)=>({...x,rank:i+1}));
}
async function loadSkills(){
  try{
    const r=await fetch("./data/skills.json",{cache:"no-store"});
    if(r.ok)skillData=await r.json();
  }catch(e){}
  updateSkillMeta();
  updateStatus();
  renderSkills();
  renderPainRadar();
}
function updateSkillMeta(){
  const n=skillData.meta.total||skillData.skills.length||100;
  const date=skillData.meta.syncedAt||"待首次同步";
  ["#skillCount","#syncCount"].forEach(x=>$(x).textContent=n);
  $("#skillMeta").textContent=`${n} 个 Skill · ${date} 同步`;
  $("#miniSync").textContent=`${n} 个 Skill · 上次 ${date}`;
  const cats=new Set((skillData.skills||[]).map(x=>x.category).filter(Boolean));
  $("#syncCategories").textContent=cats.size||3;
}
function populate(){
  roles.forEach(x=>{$("#roleSelect").add(new Option(x,x));$("#contentRole").add(new Option(x,x));});
  industries.forEach(x=>$("#industrySelect").add(new Option(x,x)));
  stages.forEach(x=>$("#stageSelect").add(new Option(x,x)));
  hotspots.forEach(x=>$("#contentHotspot").add(new Option(x.title,x.id)));
  $("#industryFilters").innerHTML=["全部",...new Set(hotspots.map(x=>x.industry))].map((x,i)=>`<button class="${i?"":"active"}" data-filter="${x}">${x}</button>`).join("");
  $("#outcomeTabs").innerHTML=["全部",...outcomes.map(x=>x.name)].map((x,i)=>`<button class="${i?"":"active"}" data-outcome="${x}">${x}</button>`).join("");
  $("#painRoleFilter").innerHTML=["全部人群",...roles].map(x=>`<option>${x}</option>`).join("");
  $("#painIndustryFilter").innerHTML=["全部行业",...industries].map(x=>`<option>${x}</option>`).join("");
}
function renderOverview(){
  $("#opportunityGrid").innerHTML=hotspots.slice(0,3).map(h=>`<article class="op-card"><div class="op-top"><span class="tag">${h.industry}</span><b class="score">${h.score}</b></div><h3>${h.title}</h3><div class="chain"><div><span>影响用户</span><b>${h.role}</b></div><div><span>真实痛点</span><b>${h.pain}</b></div><div><span>轻解决方案</span><b>${h.skills.map(x=>skill(x).name).join(" + ")}</b></div></div><div class="hook">留资钩子：${h.hook}</div><div class="card-foot"><small>${h.impact}</small><button class="secondary generate" data-id="${h.id}">生成内容</button></div></article>`).join("");
}
function renderHotspots(filter="全部"){
  const list=filter==="全部"?hotspots:hotspots.filter(x=>x.industry===filter);
  $("#hotspotList").innerHTML=list.map(h=>`<article class="hotspot-card"><div><div class="hotspot-top"><span class="tag">${h.industry}</span><b class="score">${h.score}</b></div><h3>${h.title}</h3><p>${h.fact}</p></div><div class="impact-box"><div><span>影响谁</span><b>${h.role}</b></div><div><span>引发什么问题</span><b>${h.pain}</b></div><div><span>业务影响</span><b>${h.impact}</b></div></div><button class="primary generate" data-id="${h.id}">生成方案</button></article>`).join("");
}
function renderPainRadar(){
  const role=$("#painRoleFilter").value,industry=$("#painIndustryFilter").value,sort=$("#painSort").value;
  let list=painSignals.filter(x=>(role==="全部人群"||x.role===role)&&(industry==="全部行业"||x.industry===industry));
  list=list.sort((a,b)=>b[sort]-a[sort]);
  $("#painRadarCount").textContent=list.length;
  $("#painTopScore").textContent=list[0]?.score||0;
  $("#painAvgFit").textContent=Math.round(list.reduce((s,x)=>s+x.fit,0)/(list.length||1));
  $("#painTable").innerHTML=list.map((x,i)=>`<tr><td><span class="rank-no ${i<3?"top":""}">${i+1}</span></td><td><div class="pain-title">${x.title}</div><div class="pain-expr">${x.expression}</div></td><td><span class="tag">${x.role}</span></td><td>${x.industry}</td><td>${x.stage}</td><td><div class="mini-score"><b>${x.score}</b><div class="mini-bar"><i style="width:${x.score}%"></i></div></div></td><td class="${x.growth>0?"trend-up":"trend-flat"}">${x.growth>0?"+":""}${x.growth}%</td><td><div class="skill-chips">${x.skills.map(id=>`<a class="skill-link" href="${skill(id).url}" target="_blank" rel="noopener">${skill(id).name}</a>`).join("")}</div></td><td><div class="source-list">${x.sources.map(s=>`<span>${s}</span>`).join("")}</div></td></tr>`).join("");
}
function renderSolutions(){
  const list=activeOutcome==="全部"?outcomes:outcomes.filter(x=>x.name===activeOutcome);
  $("#solutionCards").innerHTML=list.map(o=>`<article class="solution-card"><div class="solution-icon">${o.icon}</div><div><h3>${o.name}</h3><p>${o.desc}</p><div class="skill-chips">${o.skills.map(id=>`<a href="${skill(id).url}" target="_blank" rel="noopener">${skill(id).name}</a>`).join("")}</div></div></article>`).join("");
}
function renderSkills(q=""){
  const list=(skillData.skills.length?skillData.skills:Object.keys(skillAliases).map(id=>skill(id))).filter(x=>(x.name+x.description+x.category).toLowerCase().includes(q.toLowerCase())).slice(0,30);
  $("#skillList").innerHTML=list.map(s=>`<article class="skill-item"><b>${s.name}</b><p>${s.description}</p><span class="tag">${s.category}</span></article>`).join("")||"<p>没有找到匹配 Skill</p>";
  renderSolutions();
  renderOverview();
}
function inferMatch(){
  const role=$("#roleSelect").value,industry=$("#industrySelect").value,stage=$("#stageSelect").value,text=$("#problemInput").value.trim();
  let chosen=hotspots.find(x=>x.role===role&&x.industry===industry)||hotspots.find(x=>x.role===role)||hotspots[0];
  let ids=[...chosen.skills],solutionName=chosen.impact,hook=chosen.hook;
  if(/侵权|风险|出海|FTO/i.test(text)){ids=["generic-fto-report","cross-border-patent-risk-screen","patent-application-evaluation-assistant"];solutionName="产品专利风险初筛";hook="《产品上市前专利风险自查清单》";}
  if(/根因|瓶颈|性能|方案/i.test(text)){ids=["ceae-skill","triz-functional-search","technology-insight-analysis"];solutionName="工程瓶颈诊断与跨域解题";hook="《工程瓶颈根因与跨域方案清单》";}
  if(/立项|重复|路线|竞品/i.test(text)){ids=role==="生物医药研发人员"?["pharma-project-initiation-report","patsnap-lifescience-target-intelligence_zh","technology-insight-analysis"]:["patent-project-proposal","patent-research-analyst","technology-insight-analysis"];solutionName=role==="生物医药研发人员"?"医药项目立项初筛":"研发立项重复性与路线初筛";hook=role==="生物医药研发人员"?"《药物/靶点立项机会速览》":"《研发立项重复性初筛报告》";}
  const pain=text||chosen.pain;
  $("#matchResult").className="match-result";
  $("#matchResult").innerHTML=`<div class="result-grid"><article class="diagnosis"><span class="live">痛点判断</span><h2>${role} · ${stage}</h2><p><b>所在行业：</b>${industry}</p><p><b>核心问题：</b>${pain}</p><p><b>浅层判断：</b>当前问题首先需要完成证据化诊断，再比较路线或风险，不建议直接跳到单一工具或结论。</p></article><article class="recommendation"><span class="live">推荐轻解决方案</span><h2>${solutionName}</h2><div class="skill-chips">${ids.map(id=>`<a href="${skill(id).url}" target="_blank" rel="noopener">${skill(id).name}</a>`).join("")}</div><p>${ids.map((id,i)=>`${i+1}. ${skill(id).description}`).join("<br>")}</p><div class="hook">建议留资钩子：${hook}</div><button class="primary" onclick="createDraft(${chosen.id},'${role}')">继续生成内容</button></article></div>`;
}
function createDraft(id,role){
  const h=hotspots.find(x=>x.id==id)||hotspots[0];
  go("content");
  $("#contentHotspot").value=h.id;
  $("#contentRole").value=role||h.role;
  renderDraft(h,role||h.role);
}
function renderDraft(h,role){
  const title=`${role}别只看“${h.title}”：真正要防的是这类决策盲区`;
  $("#draftResult").className="draft-result";
  $("#draftResult").innerHTML=`<span class="tag">事实 / 推断 / 建议已分层</span><h2>${title}</h2><div class="draft-section"><h3>01 发生了什么</h3><p>${h.fact}</p><small>事实层：发布前需要补充并核验原始信源。</small></div><div class="draft-section"><h3>02 为什么与你有关</h3><p>对${role}而言，这一变化真正影响的是${h.impact}。如果仍沿用旧的信息和判断框架，可能出现：${h.pain}。</p></div><div class="draft-section"><h3>03 先问自己三个问题</h3><ol><li>现有判断是否有专利、论文、临床或市场证据支撑？</li><li>团队是否只在熟悉的技术路线中寻找答案？</li><li>是否已经明确风险边界、替代路径和下一步验证动作？</li></ol></div><div class="draft-section"><h3>04 一个浅层解决方案</h3><p>${h.skills.map((id,i)=>`${i+1}. 用 ${skill(id).name}：${skill(id).description}`).join("<br>")}</p></div><div class="draft-section hook"><h3>留资钩子</h3><p>回复关键词“诊断”，领取${h.hook}。提交行业、角色和当前问题后，可获得一次对应场景的初步匹配。</p></div>`;
}
function go(id){
  $$(".page").forEach(x=>x.classList.toggle("active",x.id===id));
  $$("[data-page]").forEach(x=>x.classList.toggle("active",x.dataset.page===id));
  $("#pageTitle").textContent={overview:"机会总览",hotspots:"行业热点",pains:"用户痛点",painRadar:"痛点 Top100",solutions:"解决方案",content:"内容工作台",leads:"线索与效果",sync:"数据与同步"}[id];
  scrollTo(0,0);
}
function toast(t){$("#toast").textContent=t;$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),1600);}
document.addEventListener("click",e=>{
  const n=e.target.closest("[data-page],[data-jump]"); if(n)go(n.dataset.page||n.dataset.jump);
  const g=e.target.closest(".generate"); if(g)createDraft(+g.dataset.id);
  const f=e.target.closest("[data-filter]"); if(f){$$("[data-filter]").forEach(x=>x.classList.remove("active"));f.classList.add("active");renderHotspots(f.dataset.filter);}
  const o=e.target.closest("[data-outcome]"); if(o){activeOutcome=o.dataset.outcome;$$("[data-outcome]").forEach(x=>x.classList.toggle("active",x===o));renderSolutions();}
});
$("#matchButton").onclick=inferMatch;
$("#draftButton").onclick=()=>renderDraft(hotspots.find(x=>x.id==$("#contentHotspot").value),$("#contentRole").value);
$("#skillSearch").oninput=e=>renderSkills(e.target.value);
$("#globalSearch").oninput=e=>{if(e.target.value.trim()){go("solutions");$("#skillSearch").value=e.target.value;renderSkills(e.target.value);}};
["#painRoleFilter","#painIndustryFilter","#painSort"].forEach(id=>$(id).onchange=renderPainRadar);
painSignals=buildPainSignals();
populate();
renderHotspots();
renderOverview();
renderSolutions();
renderPainRadar();
loadSkills();
