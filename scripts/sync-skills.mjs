import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const source="https://open.zhihuiya.com/marketplace/agent-skills";
const output=new URL("../data/skills.json",import.meta.url);
let previous={meta:{},skills:[]};
try{previous=JSON.parse(await readFile(output,"utf8"))}catch{}
const previousMap=new Map(previous.skills.map(x=>[x.id,x]));
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({locale:"zh-CN"});
await page.goto(source,{waitUntil:"domcontentloaded",timeout:60000});
await page.locator('a[href*="/marketplace/agent-skills/"] h3').first().waitFor({timeout:60000});
const skills=[];
for(let pageNo=1;pageNo<=20;pageNo++){
  const rows=await page.locator('a[href*="/marketplace/agent-skills/"]').evaluateAll(nodes=>nodes.map(a=>{
    const href=a.getAttribute("href")||"";
    const category=[...a.querySelectorAll("span")].map(x=>x.textContent?.trim()).find(x=>["知识产权","生物医药","研发工程"].includes(x))||"未分类";
    return {
      id:href.split("/").filter(Boolean).pop(),
      name:(a.querySelector("h3")?.textContent||"").trim(),
      description:(a.querySelector("p")?.textContent||"").trim(),
      category,
      url:new URL(href,location.origin).href
    };
  }).filter(x=>x.id&&x.name));
  skills.push(...rows);
  const next=page.getByRole("button",{name:"下一页",exact:true});
  if(await next.isDisabled())break;
  const currentFirstId=rows[0]?.id;
  await next.click();
  await page.waitForFunction(
    previousId=>document.querySelector('a[href*="/marketplace/agent-skills/"]')?.getAttribute("href")?.split("/").filter(Boolean).pop()!==previousId,
    currentFirstId,
    {timeout:30000}
  );
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
