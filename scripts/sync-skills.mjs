import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const source="https://open.zhihuiya.com/marketplace/agent-skills";
const output=new URL("../data/skills.json",import.meta.url);
let previous={meta:{},skills:[]};
try{previous=JSON.parse(await readFile(output,"utf8"))}catch{}
const previousMap=new Map(previous.skills.map(x=>[x.id,x]));
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({locale:"zh-CN"});
await page.goto(source,{waitUntil:"networkidle",timeout:60000});
const skills=[];
for(let pageNo=1;pageNo<=20;pageNo++){
  const rows=await page.locator('a[href*="/marketplace/agent-skills/"]').evaluateAll(nodes=>nodes.map(a=>{
    const href=a.getAttribute("href")||"";
    const text=a.textContent||"";
    return {
      id:href.split("/").filter(Boolean).pop(),
      name:(a.querySelector("h3")?.textContent||"").trim(),
      description:(a.querySelector("p")?.textContent||"").trim(),
      category:text.includes("知识产权")?"知识产权":text.includes("生物医药")?"生物医药":text.includes("研发工程")?"研发工程":"未分类",
      url:new URL(href,location.origin).href
    };
  }).filter(x=>x.id&&x.name));
  skills.push(...rows);
  const next=page.getByRole("button",{name:"下一页",exact:true});
  if(await next.isDisabled())break;
  await next.click();
  await page.waitForTimeout(500);
}
await browser.close();
const unique=[...new Map(skills.map(x=>[x.id,x])).values()].map(x=>{
  const old=previousMap.get(x.id)||{};
  return {...old,...x,annotations:old.annotations||{}};
});
if(unique.length<50)throw new Error(`Only ${unique.length} skills found; keeping previous successful dataset.`);
await mkdir(new URL("../data/",import.meta.url),{recursive:true});
await writeFile(output,JSON.stringify({meta:{total:unique.length,syncedAt:new Date().toISOString().slice(0,10),source,status:"success"},skills:unique},null,2)+"\n");
console.log(`Synced ${unique.length} skills.`);
