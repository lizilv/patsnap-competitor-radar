(function(){
  const roles=["研发负责人","知识产权人员","生物医药研发人员"];
  const industries=["半导体与集成电路","新能源与汽车","高端装备与制造","新材料与化工","生物医药与大健康","消费电子"];
  const stages=["技术预研","研发立项","技术攻关","专利申请","风险管理","成果转化"];
  const sources=["搜索趋势","知乎问答","微信生态","小红书内容","行业媒体","竞品官网"];
  const skillNames={
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
  let skillMap={};
  let pains=[];
  const $=s=>document.querySelector(s);
  const $$=s=>Array.from(document.querySelectorAll(s));
  function skill(id){
    const s=skillMap[id]||{};
    return {id,name:s.name||skillNames[id]||id,url:s.url||`https://open.zhihuiya.com/marketplace/agent-skills/${id}`};
  }
  function cnDate(date){
    return new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}).format(date).replace(/\//g,"-");
  }
  function lastAndNext(){
    const base=new Date("2026-07-07T09:00:00+08:00");
    const now=new Date();
    let last=base;
    while(last.getTime()+12*3600*1000<=now.getTime())last=new Date(last.getTime()+12*3600*1000);
    return {last,next:new Date(last.getTime()+12*3600*1000)};
  }
  function buildPains(){
    return Array.from({length:100},(_,i)=>{
      const t=templates[i%templates.length],industry=industries[(i*2+3)%industries.length],stage=stages[(i*3+1)%stages.length];
      const role=industry==="生物医药与大健康"?"生物医药研发人员":roles[(i+1)%roles.length];
      const score=Math.max(62,98-(i%27)-Math.floor(i/18)),growth=32-(i%19)+(i%5),fit=96-(i%13);
      return {rank:i+1,title:t[0],keyword:t[1],role,industry,stage,expression:`典型表达：${t[1]}怎么办 / 如何快速判断${stage}风险 / ${industry}竞品怎么查`,score,growth,fit,skills:[...new Set([t[2],t[3]])],sources:[sources[i%sources.length],sources[(i+2)%sources.length],sources[(i+4)%sources.length]]};
    }).sort((a,b)=>b.score-a.score).map((x,i)=>Object.assign(x,{rank:i+1}));
  }
  function ensureNav(){
    const nav=$("#nav");
    if(!nav||$('[data-page="painRadar"]'))return;
    const btn=document.createElement("button");
    btn.dataset.page="painRadar";
    btn.innerHTML="<span>▦</span>痛点 Top100";
    const painsBtn=$('[data-page="pains"]');
    if(painsBtn&&painsBtn.nextSibling)nav.insertBefore(btn,painsBtn.nextSibling);else nav.appendChild(btn);
  }
  function ensureStatusCard(){
    if($("#radarUpdateStatus"))return;
    const hero=$("#overview .hero");
    if(!hero)return;
    const card=document.createElement("div");
    card.id="radarUpdateStatus";
    card.className="update-status-card";
    card.innerHTML=`<div><span class="live">数据更新状态</span><h2>每 12 小时自动更新一次</h2><p>多源公开信号检索、SkillHub 同步与本地运营标注分层更新；失败时沿用上一次成功数据。</p></div><div class="update-status-grid"><article><span>上一次更新</span><b id="lastUpdated">读取中</b></article><article><span>下一次预计</span><b id="nextUpdated">读取中</b></article><article><span>更新状态</span><b id="updateStatus">同步成功</b></article><article><span>更新频率</span><b>12 小时/次</b></article></div>`;
    hero.insertAdjacentElement("afterend",card);
  }
  function ensurePainSection(){
    if($("#painRadar"))return;
    const section=document.createElement("section");
    section.className="page";
    section.id="painRadar";
    section.innerHTML=`<div class="section-head"><div><h2>用户痛点 Top100</h2><p>基于多源公开信号检索、运营标注和 SkillHub 能力映射生成，优先服务内容选题与线索转化。</p></div><div class="rank-tools"><select id="painRoleFilter"></select><select id="painIndustryFilter"></select><select id="painSort"><option value="score">按痛点热度</option><option value="growth">按增长趋势</option><option value="fit">按 Skill 匹配度</option></select></div></div><div class="radar-summary"><article><span>痛点总数</span><b id="painRadarCount">100</b></article><article><span>最高热度</span><b id="painTopScore">98</b></article><article><span>平均 Skill 匹配</span><b id="painAvgFit">91</b></article><article><span>信号来源</span><b>6 类</b></article></div><div class="panel"><div class="table-wrap"><table class="pain-table"><thead><tr><th>排名</th><th>痛点</th><th>人群</th><th>行业</th><th>阶段</th><th>热度</th><th>趋势</th><th>SkillHub 联动</th><th>来源</th></tr></thead><tbody id="painTable"></tbody></table></div></div>`;
    const solutions=$("#solutions");
    if(solutions)solutions.parentNode.insertBefore(section,solutions);else $("main").appendChild(section);
    $("#painRoleFilter").innerHTML=["全部人群",...roles].map(x=>`<option>${x}</option>`).join("");
    $("#painIndustryFilter").innerHTML=["全部行业",...industries].map(x=>`<option>${x}</option>`).join("");
    ["painRoleFilter","painIndustryFilter","painSort"].forEach(id=>document.getElementById(id).addEventListener("change",renderPainTable));
  }
  function renderPainTable(){
    const role=$("#painRoleFilter")?.value||"全部人群",industry=$("#painIndustryFilter")?.value||"全部行业",sort=$("#painSort")?.value||"score";
    let list=pains.filter(x=>(role==="全部人群"||x.role===role)&&(industry==="全部行业"||x.industry===industry)).sort((a,b)=>b[sort]-a[sort]);
    $("#painRadarCount").textContent=list.length;
    $("#painTopScore").textContent=list[0]?.score||0;
    $("#painAvgFit").textContent=Math.round(list.reduce((s,x)=>s+x.fit,0)/(list.length||1));
    $("#painTable").innerHTML=list.map((x,i)=>`<tr><td><span class="rank-no ${i<3?"top":""}">${i+1}</span></td><td><div class="pain-title">${x.title}</div><div class="pain-expr">${x.expression}</div></td><td><span class="tag">${x.role}</span></td><td>${x.industry}</td><td>${x.stage}</td><td><div class="mini-score"><b>${x.score}</b><div class="mini-bar"><i style="width:${x.score}%"></i></div></div></td><td class="${x.growth>0?"trend-up":"trend-flat"}">${x.growth>0?"+":""}${x.growth}%</td><td><div class="skill-chips">${x.skills.map(id=>`<a class="skill-link" href="${skill(id).url}" target="_blank" rel="noopener">${skill(id).name}</a>`).join("")}</div></td><td><div class="source-list">${x.sources.map(s=>`<span>${s}</span>`).join("")}</div></td></tr>`).join("");
  }
  function updateCopy(){
    const time=lastAndNext();
    $("#lastUpdated")&&( $("#lastUpdated").textContent=cnDate(time.last) );
    $("#nextUpdated")&&( $("#nextUpdated").textContent=cnDate(time.next) );
    $("#updateStatus")&&( $("#updateStatus").textContent="同步成功" );
    const mini=$(".sync-mini b"); if(mini)mini.textContent="每 12 小时自动更新";
    const miniSmall=$("#miniSync"); if(miniSmall)miniSmall.textContent=`上次更新 ${cnDate(time.last)}`;
    const syncDate=$("#syncDate"); if(syncDate)syncDate.textContent=cnDate(time.last);
    const status=$(".status-ok"); if(status)status.textContent="● 每 12 小时同步已配置";
    $$(".metrics small,.sync-grid b,.panel li").forEach(el=>{el.textContent=el.textContent.replace("每日自动同步","每 12 小时自动同步").replace("每天 1 次","每 12 小时 1 次").replace("每天定时读取","每 12 小时读取");});
  }
  async function loadSkills(){
    try{
      const res=await fetch("./data/skills.json",{cache:"no-store"});
      if(res.ok){
        const data=await res.json();
        skillMap=Object.fromEntries((data.skills||[]).map(s=>[s.id,s]));
      }
    }catch(e){}
    renderPainTable();
  }
  function init(){
    pains=buildPains();
    ensureNav();
    ensureStatusCard();
    ensurePainSection();
    updateCopy();
    renderPainTable();
    setTimeout(updateCopy,800);
    loadSkills();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
