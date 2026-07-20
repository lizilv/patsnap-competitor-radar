import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const source = "https://open.zhihuiya.com/marketplace/agent-skills";
const output = new URL("../data/skills.json", import.meta.url);
const skillLinkSelector = [
  'a[href*="/marketplace/skill-hub/"]',
  'a[href*="/marketplace/agent-skills/"]',
].join(",");

let previous = { meta: {}, skills: [] };
try {
  previous = JSON.parse(await readFile(output, "utf8"));
} catch {}

const previousMap = new Map(previous.skills.map((skill) => [skill.id, skill]));
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ locale: "zh-CN" });

try {
  await page.goto(source, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.locator(`${skillLinkSelector} h3`).first().waitFor({ timeout: 60000 });

  const skills = [];
  for (let pageNo = 1; pageNo <= 20; pageNo++) {
    const rows = await page.locator(skillLinkSelector).evaluateAll((nodes) =>
      nodes
        .map((anchor) => {
          const href = anchor.getAttribute("href") || "";
          const category =
            [...anchor.querySelectorAll("span")]
              .map((element) => element.textContent?.trim())
              .find((text) => ["知识产权", "生物医药", "研发工程"].includes(text)) ||
            "未分类";

          return {
            id: href.split("/").filter(Boolean).pop(),
            name: (anchor.querySelector("h3")?.textContent || "").trim(),
            description: (anchor.querySelector("p")?.textContent || "").trim(),
            category,
            url: new URL(href, location.origin).href,
          };
        })
        .filter((skill) => skill.id && skill.name),
    );
    skills.push(...rows);

    const next = page.getByRole("button", { name: "下一页", exact: true });
    if (await next.isDisabled()) break;
    await next.click();
    await page.waitForTimeout(1000);
  }

  const unique = [...new Map(skills.map((skill) => [skill.id, skill])).values()].map(
    (skill) => {
      const old = previousMap.get(skill.id) || {};
      return { ...old, ...skill, annotations: old.annotations || {} };
    },
  );

  if (unique.length < 50) {
    throw new Error(`Only ${unique.length} skills found; keeping previous successful dataset.`);
  }

  await mkdir(new URL("../data/", import.meta.url), { recursive: true });
  await writeFile(
    output,
    `${JSON.stringify(
      {
        meta: {
          total: unique.length,
          syncedAt: new Date().toISOString().slice(0, 10),
          source,
          status: "success",
        },
        skills: unique,
      },
      null,
      2,
    )}\n`,
  );
  console.log(`Synced ${unique.length} skills.`);
} finally {
  await browser.close();
}
