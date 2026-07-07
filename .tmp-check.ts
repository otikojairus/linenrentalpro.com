import {
  SEO_PAGES,
  buildMetaTitle,
  buildMetaDescription,
  buildH1,
  introText,
  planningText,
  processSteps,
  keyTakeaways,
  faqsFor,
  localFacts,
  isCityPage,
  pillarDeepDive,
} from "./lib/site-data";

function wc(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

let titleFail = 0;
let descFail = 0;
let wordFail = 0;
let faqFail = 0;
let factFail = 0;

for (const page of SEO_PAGES) {
  const title = buildMetaTitle(page);
  const desc = buildMetaDescription(page);
  const h1 = buildH1(page);
  const intro = introText(page);
  const planning = planningText(page);
  const steps = processSteps(page);
  const takeaways = keyTakeaways(page);
  const faqs = faqsFor(page);
  const deepDive = pillarDeepDive(page);

  const bodyWords =
    wc(intro) +
    wc(planning) +
    steps.reduce((a, s) => a + wc(s.title) + wc(s.text), 0) +
    takeaways.reduce((a, t) => a + wc(t), 0) +
    faqs.reduce((a, f) => a + wc(f.q) + wc(f.a), 0) +
    (deepDive ? wc(deepDive.heading) + deepDive.paragraphs.reduce((a, p) => a + wc(p), 0) : 0);

  const minWords = page.pageType === "Service Pillar" ? 800 : page.pageType === "City Service Page" ? 400 : 500;

  if (title.length < 50 || title.length > 60) {
    titleFail++;
    console.log(`TITLE(${title.length}) ${page.pageSlug}: "${title}"`);
  }
  if (desc.length < 150 || desc.length > 160) {
    descFail++;
    console.log(`DESC(${desc.length}) ${page.pageSlug}: "${desc}"`);
  }
  if (bodyWords < minWords) {
    wordFail++;
    console.log(`WORDS(${bodyWords}/${minWords}) ${page.pageSlug}`);
  }
  if (faqs.length < 3) {
    faqFail++;
    console.log(`FAQ(${faqs.length}) ${page.pageSlug}`);
  }
  if (isCityPage(page) && localFacts(page).length < 2) {
    factFail++;
    console.log(`FACTS ${page.pageSlug}`);
  }

  // keyword repetition check across all visible body copy
  const kw = page.primaryKeyword.toLowerCase().trim();
  const allText = [
    h1,
    intro,
    planning,
    ...steps.map((s) => `${s.title} ${s.text}`),
    ...takeaways,
    ...faqs.map((f) => `${f.q} ${f.a}`),
    ...(deepDive ? [deepDive.heading, ...deepDive.paragraphs] : []),
  ]
    .join(" ")
    .toLowerCase();
  const count = allText.split(kw).length - 1;
  if (count !== 1) {
    console.log(`KEYWORD x${count} (want 1) in ${page.pageSlug} ("${kw}")`);
  }
}

console.log("\n--- SUMMARY ---");
console.log("total pages:", SEO_PAGES.length);
console.log("title fails:", titleFail);
console.log("desc fails:", descFail);
console.log("word fails:", wordFail);
console.log("faq fails:", faqFail);
console.log("fact fails:", factFail);
