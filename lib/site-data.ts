import { RAW_PAGES } from "@/lib/generated-pages";
import { cityFacts } from "@/lib/city-facts";
import { hashIndex, serviceMetaFor } from "@/lib/service-meta";

export type SeoPage = (typeof RAW_PAGES)[number];

export const SITE_NAME = "Linen Rental Pro";
export const DEFAULT_SITE_URL = "https://linenrentalpro.com";
export const PHONE_DISPLAY = "1-888-689-6881";
export const PHONE_E164 = "+18886896881";

export const SEO_PAGES: SeoPage[] = [...RAW_PAGES];
export const SERVICE_PILLARS = SEO_PAGES.filter((page) => page.pageType === "Service Pillar");
export const NEAR_ME_PAGES = SEO_PAGES.filter((page) => page.pageType === "Near Me Page");
export const SERVICE_PAGES = SEO_PAGES.filter((page) => page.pageType === "Service Page");
export const COST_PAGES = SEO_PAGES.filter((page) => page.pageType === "Cost Guide");
export const CITY_PAGES = SEO_PAGES.filter((page) => page.pageType === "City Service Page");
export const SUPPORT_PAGES = SEO_PAGES.filter((page) => page.pageType !== "Service Pillar" && !isCityPage(page));

const PILLAR_SLUGS = new Set(SERVICE_PILLARS.map((page) => page.pageSlug));

const FAMILY_RULES: Array<[string, string]> = [
  ["/commercial-laundry-service", "/commercial-laundry-service"],
  ["/uniform-rental-service", "/uniform-rental-service"],
  ["/restaurant-linen-service", "/restaurant-linen-service"],
  ["/commercial-linen-service", "/commercial-linen-service"],
  ["/linen-rental", "/linen-rental"],
  ["/table-linen-napkin-rental", "/table-linen-napkin-rental"],
  ["/floor-mat-rental-service", "/floor-mat-rental-service"],
  ["/commercial-laundry-near-me", "/commercial-laundry-service"],
  ["/uniform-rental-near-me", "/uniform-rental-service"],
  ["/floor-mat-rental-near-me", "/floor-mat-rental-service"],
  ["/linen-service-near-me", "/linen-rental"],
  ["/gym-fitness-towel-service", "/linen-rental"],
  ["/industrial-uniform-shop-towel-service", "/uniform-rental-service"],
  ["/healthcare-medical-linen-service", "/commercial-linen-service"],
  ["/hotel-hospitality-linen-service", "/linen-rental"],
  ["/spa-salon-towel-service", "/linen-rental"],
  ["/chef-coat-kitchen-uniform-rental", "/uniform-rental-service"],
  ["/uniform-rental-cost", "/uniform-rental-service"],
  ["/linen-rental-cost", "/linen-rental"],
  ["/floor-mat-rental-cost", "/floor-mat-rental-service"],
];

const CITY_PREFIX_RULES: Array<[string, string]> = [
  ["/commercial-laundry-service-", "/commercial-laundry-service"],
  ["/commercial-laundry-linen-service-", "/commercial-laundry-service"],
  ["/linen-service-", "/linen-rental"],
  ["/uniform-rental-", "/uniform-rental-service"],
];

const COMBINED_CITY_PREFIX = "/commercial-laundry-linen-service-";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

export function toPath(slug: string) {
  return slug.startsWith("/") ? slug : `/${slug}`;
}

export function absoluteUrl(path: string) {
  return `${getSiteUrl()}${toPath(path)}`;
}

export function titleCase(value: string) {
  return value
    .split(/(\s|-|\/)/)
    .map((part) => {
      if (/^\s|-|\/$/.test(part)) return part;
      if (part === "rv") return "RV";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("")
    .replace(/\bAnd\b/g, "and")
    .replace(/\bIn\b/g, "in")
    .replace(/\bNear Me\b/g, "Near Me");
}

export function cityFromTargetArea(targetArea: string) {
  return targetArea.replace(/\s*\([^)]*\)/, "").split(",")[0].trim();
}

export function provinceFromTargetArea(targetArea: string) {
  return targetArea.includes(",") ? targetArea.split(",")[1].trim() : "Ontario";
}

export function isCityPage(page: SeoPage) {
  return page.pageType === "City Service Page";
}

export function isCombinedCityPage(page: SeoPage) {
  return page.pageSlug.startsWith(COMBINED_CITY_PREFIX);
}

function stripBrand(value: string) {
  return value.replace(/\s*\|\s*Linen Rental Pro$/i, "").trim();
}

export function pageListLabel(page: SeoPage) {
  return stripBrand(page.pageTitle) || titleCase(page.primaryKeyword);
}

export function linkLabel(page: SeoPage) {
  return isCityPage(page) ? cityFromTargetArea(page.targetArea) : pageListLabel(page);
}

/** Keyword-rich anchor text for internal links (never a generic "click here"). */
export function anchorText(page: SeoPage) {
  return titleCase(page.primaryKeyword);
}

export function pillarAnchor(page: SeoPage) {
  return titleCase(page.primaryKeyword);
}

export function pageLocation(page: SeoPage) {
  if (isCityPage(page)) return cityFromTargetArea(page.targetArea);
  if (page.targetArea.includes("GTA")) return "the GTA";
  if (page.targetArea.includes("Canada")) return "Canada";
  return provinceFromTargetArea(page.targetArea);
}

export function serviceFamily(page: SeoPage) {
  const slug = toPath(page.pageSlug).replace(/\/+$/, "");

  if (PILLAR_SLUGS.has(slug)) return slug;
  for (const [prefix, family] of FAMILY_RULES) {
    if (slug === prefix || slug.startsWith(prefix)) return family;
  }
  for (const [prefix, family] of CITY_PREFIX_RULES) {
    if (slug.startsWith(prefix)) return family;
  }
  if (slug.includes("cost")) {
    if (slug.includes("uniform")) return "/uniform-rental-service";
    if (slug.includes("mat")) return "/floor-mat-rental-service";
    return "/linen-rental";
  }
  if (slug.includes("near-me")) {
    if (slug.includes("uniform")) return "/uniform-rental-service";
    if (slug.includes("mat")) return "/floor-mat-rental-service";
    return "/commercial-laundry-service";
  }
  if (slug.includes("towel") || slug.includes("linen")) return "/linen-rental";
  if (slug.includes("uniform")) return "/uniform-rental-service";
  if (slug.includes("mat")) return "/floor-mat-rental-service";
  return "/commercial-laundry-service";
}

export function bySlug(slug: string) {
  const clean = toPath(slug).replace(/\/+$/, "");
  return SEO_PAGES.find((page) => page.pageSlug === clean) || fallbackPageFromSlug(clean);
}

export function pillarFor(page: SeoPage) {
  return bySlug(serviceFamily(page)) || SERVICE_PILLARS[0];
}

/** For the 14 combined city pages, resolve every pillar the page's keywords actually cover. */
export function pillarsForCombinedCity(page: SeoPage): SeoPage[] {
  const haystack = `${page.primaryKeyword} ${page.secondaryKeywords}`.toLowerCase();
  const pillars: SeoPage[] = [];
  const add = (slug: string) => {
    const found = SEO_PAGES.find((item) => item.pageSlug === slug);
    if (found && !pillars.some((item) => item.pageSlug === found.pageSlug)) pillars.push(found);
  };
  add("/commercial-laundry-service");
  if (haystack.includes("linen")) add("/linen-rental");
  if (haystack.includes("uniform")) add("/uniform-rental-service");
  if (haystack.includes("mat")) add("/floor-mat-rental-service");
  return pillars;
}

export function cityPagesForPillar(pillar: SeoPage): SeoPage[] {
  const direct = CITY_PAGES.filter((page) => serviceFamily(page) === pillar.pageSlug);
  if (pillar.pageSlug === "/commercial-laundry-service") return direct;
  const extra = CITY_PAGES.filter(
    (page) =>
      isCombinedCityPage(page) &&
      !direct.some((item) => item.pageSlug === page.pageSlug) &&
      pillarsForCombinedCity(page).some((item) => item.pageSlug === pillar.pageSlug),
  );
  return [...direct, ...extra];
}

export function sameCityPages(page: SeoPage) {
  if (!isCityPage(page)) return [];
  const city = cityFromTargetArea(page.targetArea);
  return CITY_PAGES.filter((item) => item.pageSlug !== page.pageSlug && cityFromTargetArea(item.targetArea) === city);
}

export function supportCityLinks(page: SeoPage, limit = 5) {
  const family = serviceFamily(page);
  const matches = CITY_PAGES.filter((item) => item.pageSlug !== page.pageSlug && serviceFamily(item) === family);
  if (matches.length >= limit) return matches.slice(0, limit);
  const extras = CITY_PAGES.filter((item) => item.pageSlug !== page.pageSlug && !matches.some((match) => match.pageSlug === item.pageSlug));
  return [...matches, ...extras.slice(0, Math.max(0, limit - matches.length))];
}

export function serviceTopicLabel(page: SeoPage) {
  return pageListLabel(isCityPage(page) ? pillarFor(page) : page).replace(/\s+(Service|Services)$/i, "").trim();
}

export function buildH1(page: SeoPage) {
  return pageListLabel(page);
}

/** Ordered Home > Services > Pillar > Page breadcrumb trail, reused for schema + visible UI. */
export function breadcrumbTrail(page: SeoPage): Array<{ name: string; path: string }> {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];
  if (page.pageType === "Service Pillar") {
    trail.push({ name: buildH1(page), path: toPath(page.pageSlug) });
    return trail;
  }
  const pillar = pillarFor(page);
  trail.push({ name: pillarAnchor(pillar), path: toPath(pillar.pageSlug) });
  trail.push({ name: buildH1(page), path: toPath(page.pageSlug) });
  return trail;
}

function fitTitle(base: string, brandSuffix: string): string {
  const min = 50;
  const max = 60;
  let candidate = `${base}${brandSuffix}`;
  if (candidate.length >= min && candidate.length <= max) return candidate;

  if (candidate.length > max) {
    const words = base.split(" ");
    while (words.length > 1 && `${words.join(" ")}${brandSuffix}`.length > max) {
      words.pop();
    }
    candidate = `${words.join(" ")}${brandSuffix}`;
    if (candidate.length <= max) return candidate;
    const hardCut = max - brandSuffix.length;
    return `${base.slice(0, Math.max(hardCut, 1))}${brandSuffix}`;
  }

  const fillers = ["Service", "Rental", "Program", "Booking"];
  let widened = base;
  for (const filler of fillers) {
    if (widened.toLowerCase().includes(filler.toLowerCase())) continue;
    const attempt = `${widened} ${filler}`;
    if (`${attempt}${brandSuffix}`.length <= max) {
      widened = attempt;
      candidate = `${widened}${brandSuffix}`;
      if (candidate.length >= min) return candidate;
    }
  }
  return candidate;
}

export function buildMetaTitle(page: SeoPage): string {
  const brandSuffix = ` | ${SITE_NAME}`;
  const keyword = titleCase(page.primaryKeyword);
  const lower = keyword.toLowerCase();
  let base = keyword;
  if (!isCityPage(page) && !lower.includes("near me")) {
    base = page.pageType === "Cost Guide" ? `${keyword} Canada` : `${keyword} GTA`;
  }
  return fitTitle(base, brandSuffix);
}

const MIN_DESC = 150;
const MAX_DESC = 160;

/**
 * Grows the description word by word from a long "filler pool" sentence until the
 * total lands inside [150,160]. Because word-boundary cuts are checked in increasing
 * order, this reliably lands in a fairly narrow target window for arbitrary opener/CTA
 * lengths without ever truncating mid-word or dropping the closing call-to-action.
 */
function fitDescription(opener: string, pool: string, cta: string): string {
  const fixedOpener = /[.!?]$/.test(opener.trim()) ? opener.trim() : `${opener.trim()}.`;
  const words = pool.trim().split(/\s+/);
  const danglingConnectors = new Set(["a", "an", "the", "and", "or", "with", "since", "for", "to", "in", "of", "so", "is", "are"]);
  let bestCandidate = "";
  let bestDiff = Infinity;
  let fallbackValidButDangling = "";

  for (let i = 1; i <= words.length; i += 1) {
    const lastWord = words[i - 1].replace(/[.,;:]+$/, "").toLowerCase();
    const dangling = danglingConnectors.has(lastWord) && i < words.length;
    let middle = words.slice(0, i).join(" ").replace(/[,;:\s]+$/, "");
    if (!/[.!?]$/.test(middle)) middle += ".";
    const candidate = `${fixedOpener} ${middle} ${cta}`.replace(/\s+/g, " ").trim();
    const len = candidate.length;
    if (len > MAX_DESC) break;
    if (len >= MIN_DESC) {
      if (!dangling) return candidate;
      fallbackValidButDangling = candidate;
      continue;
    }
    if (dangling) continue;
    const diff = MIN_DESC - len;
    if (diff < bestDiff) {
      bestDiff = diff;
      bestCandidate = candidate;
    }
  }

  return fallbackValidButDangling || bestCandidate || `${fixedOpener} ${cta}`.replace(/\s+/g, " ").trim();
}

export function buildMetaDescription(page: SeoPage): string {
  const location = pageLocation(page);
  const meta = serviceMetaFor(serviceKeyFor(page));
  const keywordLower = page.primaryKeyword.toLowerCase();
  const needsPricingWord = !keywordLower.includes("pricing") && !keywordLower.includes("cost");
  const opener =
    page.pageType === "Cost Guide"
      ? `Compare ${page.primaryKeyword}${needsPricingWord ? " pricing" : ""} for ${location} before you call.`
      : `Book ${page.primaryKeyword} in ${location}.`;
  const cta = `Call ${PHONE_DISPLAY} now.`;
  const pool = `Serves ${meta.audiences[0]}, ${meta.audiences[1]}, ${meta.audiences[2]}, and ${meta.audiences[3]}, since ${meta.differentiator}. Same-week scheduling is usually available for most requests, including multi-location accounts and seasonal volume changes.`;
  return fitDescription(opener, pool, cta);
}

function serviceKeyFor(page: SeoPage): string {
  if (page.pageType === "Service Page" || page.pageType === "Cost Guide" || page.pageType === "Near Me Page") {
    return page.pageSlug;
  }
  return serviceFamily(page);
}

/** Deterministic pseudo-random pick so the same page always renders the same variant. */
function pick<T>(list: T[], seed: string, salt: string): T {
  return list[hashIndex(`${seed}:${salt}`, list.length)];
}

export function localFacts(page: SeoPage): Array<{ label: string; value: string }> {
  const city = cityFromTargetArea(page.targetArea);
  const facts = cityFacts(city);
  return [
    { label: "Population", value: facts.population },
    { label: "Known for", value: facts.landmark },
    { label: "Neighbourhood served", value: facts.neighbourhood },
    { label: "Climate note", value: facts.climate },
  ];
}

/** True when the authored H1 already contains the exact primary keyword phrase. */
function h1HasKeyword(page: SeoPage): boolean {
  return buildH1(page).toLowerCase().includes(page.primaryKeyword.toLowerCase().trim());
}

export function introText(page: SeoPage): string {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  const keyword = page.primaryKeyword;
  // The exact primary keyword phrase should appear exactly once across the whole page.
  // If the authored H1 already contains it, the intro opener switches to a keyword-free
  // variant that leans on the location name; otherwise the opener carries the one mention.
  const needsKeyword = !h1HasKeyword(page);

  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    const facts = cityFacts(city);
    const combined = isCombinedCityPage(page);
    const scopeLine = combined
      ? `laundry, linen, uniforms and floor mats can run through one account`
      : `you get ${meta.audiences[0]} and ${meta.audiences[1]} handled on a schedule that suits ${city}`;
    const opener = needsKeyword ? `With ${titleCase(keyword)}, ${scopeLine}` : `In ${city}, ${scopeLine}`;
    return `${opener}. ${city} is home to ${facts.population}, and if your business sits near ${facts.neighbourhood} you already know ${facts.climate} changes how often your textiles need a fresh wash cycle. Instead of a flat national schedule, your pickups across ${city} are timed around your hours, the ${meta.items[0]} you actually go through, and ${meta.differentiator}. You end up with a plan that matches how you run day to day, not one copied from another market.`;
  }

  if (page.pageType === "Cost Guide") {
    const opener = needsKeyword
      ? `${titleCase(keyword)} varies more than most published rate cards suggest`
      : `What you pay varies more than most published rate cards suggest`;
    return `${opener}, mainly because ${meta.audiences[0]} and ${meta.audiences[1]} rarely need the same setup. Here is what actually moves your number: ${meta.items.join(", ")}, and the fact that ${meta.differentiator}. Rather than a single flat rate, expect a range shaped by how much you use, because ${meta.painPoint} is exactly what you are trying to avoid. Knowing these factors before you ask for a quote makes it easier to compare offers side by side and to ask sharper questions on the call, whether you run a single site or a multi-location group.`;
  }

  if (page.pageType === "Near Me Page") {
    const opener = needsKeyword
      ? `When you look for ${keyword}, you want one thing: a route that actually shows up on schedule`
      : `When you need a local provider, you want one thing: a route that actually shows up on schedule`;
    return `${opener}, not a call centre in another province. You get service alongside ${meta.audiences[0]}, ${meta.audiences[1]}, and similar operators across the GTA, and ${meta.differentiator}. Most businesses that switch to us do so because of ${meta.painPoint}, so when you call, we focus on your pickup address, your item counts, and how soon you need to start. From there, ${meta.synonym} can usually begin within days rather than weeks, with a delivery window built around the hours you already keep.`;
  }

  if (page.pageType === "Service Pillar") {
    const opener = needsKeyword ? `${titleCase(keyword)} is built for you if you run` : `You are in the right place if you run`;
    return `${opener} one of ${meta.audiences[0]}, ${meta.audiences[1]}, ${meta.audiences[2]}, or ${meta.audiences[3]} across the GTA. Your account centres on ${meta.items[0]} and ${meta.items[1]}, and ${meta.differentiator}, instead of a one-size schedule forced on every business. Most owners reach out to us because ${meta.painPoint} kept happening with a previous vendor, and the fix usually starts with a short call about your counts, frequency, and delivery windows. Below, you will see how your account gets set up, what your first few weeks look like, and how ${meta.synonym} adjusts as you grow, add a location, or shift with the season.`;
  }

  // Service Page (industry-specific)
  const opener = needsKeyword ? `${titleCase(keyword)} is built around` : `Your service is built around`;
  return `${opener} the day-to-day reality of running ${meta.audiences[0]} and ${meta.audiences[1]}, where ${meta.painPoint} is the exact problem you want gone. Your deliveries cover ${meta.items[0]} and ${meta.items[1]} on a recurring schedule, and ${meta.differentiator} instead of treating every site the same way. You will find out who this fits, how your first delivery gets scheduled, and what to ask before you switch from an in-house setup or a previous vendor. If you run ${meta.audiences[2]} or ${meta.audiences[3]}, you get the same setup with only minor tweaks to counts and timing.`;
}

export function planningText(page: SeoPage): string {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    return `When you start service in ${city}, you begin with a short walkthrough of your item counts, what is going wrong today, and when you need deliveries to land. Because ${meta.differentiator}, that first visit usually settles whether you need a full setup, a swap from your current vendor, or simply more volume. Clearing ${meta.painPoint} off your plate early is the whole point before your first delivery is booked, and you are usually quoted before the visit even wraps up.`;
  }
  if (page.pageType === "Cost Guide") {
    return `Before you compare numbers, know what a vendor is really quoting you. Ask whether the price includes ${meta.items[0]}, how ${meta.items[1]} affects your total, and what happens if your usage changes mid-contract. When a quote skips these details, ${meta.painPoint} tends to show up later as a surprise line item, so ask for a breakdown in writing before you sign anything. Putting two or three quotes side by side tells you more than any single rate card can.`;
  }
  return `When you plan your service, you start with your current volume, how often your ${meta.items[0]} needs to rotate, and whether ${location} delivery timing fits your staff schedule. Because ${meta.differentiator}, you are matched to a route on the first call instead of waiting on a drawn-out proposal. Expect one quick follow-up once your real usage numbers land in the first few weeks, and know that small adjustments then are normal, not a sign anything was set up wrong.`;
}

const STEP_TITLES = ["Intake Call", "Site Review", "Route Setup", "First Delivery"];

export function processSteps(page: SeoPage) {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  return [
    {
      title: STEP_TITLES[0],
      text: `Tell us your business type, roughly how much ${meta.items[0]} you go through, and whether you need ${location} delivery to start this week or next month.`,
    },
    {
      title: STEP_TITLES[1],
      text: `We look at the ${meta.items[1]} you have on hand today, your current par levels, and whether ${meta.painPoint} has been a problem with your previous setup.`,
    },
    {
      title: STEP_TITLES[2],
      text: `Your pickup and delivery windows are set around your actual schedule, since ${meta.differentiator} instead of a generic weekly slot.`,
    },
    {
      title: STEP_TITLES[3],
      text: `Your first delivery brings enough stock to build a working par level, so you are not left short in week one. After that, any change to your counts or timing is usually a quick call, not a whole new setup.`,
    },
  ];
}

export function keyTakeaways(page: SeoPage): string[] {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    return [
      `Whether you need a brand-new setup or a swap from your current vendor in ${city}.`,
      `How your ${meta.items[0]} and ${meta.items[1]} should be sized for your location.`,
      `A delivery window that fits how you actually run day to day.`,
      `What it takes to keep ${meta.painPoint} from happening once you are up and running.`,
      `Which other ${city} businesses run the same setup, and why it works for them.`,
    ];
  }
  return [
    `Whether this fits you better than a generic in-house setup if you run ${meta.audiences[0]} or ${meta.audiences[1]}.`,
    `How your ${meta.items[0]} gets sized, delivered, and rotated across ${location}.`,
    `Why ${meta.differentiator} instead of a flat schedule forced on you.`,
    `What usually causes ${meta.painPoint}, and how a recurring route keeps it away.`,
    `When it makes sense to revisit your pricing as your volume changes.`,
  ];
}

/** Pillar-only deep dive that adds substantive, non-duplicated detail so pillar pages clear an 800-word floor. */
export function pillarDeepDive(page: SeoPage): { heading: string; paragraphs: string[] } | null {
  if (page.pageType !== "Service Pillar") return null;
  const meta = serviceMetaFor(serviceKeyFor(page));
  return {
    heading: "What Your Standard Setup Includes",
    paragraphs: [
      `You start with ${meta.items[0]}, ${meta.items[1]}, and ${meta.items[2]}, sized to match your current volume rather than a generic starter pack. If you run ${meta.audiences[0]}, you order differently than someone running ${meta.audiences[2]}, so your opening quote reflects the specific mix you actually need instead of a flat catalogue price you did not ask for.`,
      `${titleCase(meta.differentiator)}. That matters most if you have already dealt with ${meta.painPoint}, since it is usually a routing or par-level problem rather than a fabric-quality one. Fixing your schedule, not just swapping vendors, is what tends to solve it for good and keep it solved.`,
      `If you operate more than one site, you can run every location through a single account, with reporting broken out by address so your ${meta.audiences[1]} and ${meta.audiences[3]} are never lumped into one undifferentiated order. When you need to adjust your frequency or item counts, that is a short call, not a formal contract amendment you have to negotiate.`,
      `You usually see your first delivery inside the same week you call, since routes are already running through most GTA neighbourhoods. When a seasonal spike, a one-off event, or a sudden jump in volume hits, you can absorb it without renegotiating your whole account, because ${meta.synonym} is built to flex around you rather than lock you into a fixed quantity for the full term.`,
    ],
  };
}

export function faqsFor(page: SeoPage) {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  const synonym = meta.synonym;

  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    const facts = cityFacts(city);
    const combined = isCombinedCityPage(page);
    return [
      {
        q: `What should I have ready before my first call?`,
        a: `Have a rough count of your ${meta.items[0]}, the delivery problems you are dealing with now, and whether you are near ${facts.neighbourhood} or elsewhere in ${city}. That is enough for us to give you a first quote.`,
      },
      {
        q: combined ? `Can one account cover my laundry, linen, uniforms and mats together?` : `Can you handle more than one of my locations?`,
        a: combined
          ? `Yes. You can run your laundry, linen, uniform, and floor mat needs through a single account across ${city} instead of juggling a separate vendor for each one.`
          : `Yes. Multi-site accounts across ${location} are common, and we route yours by address instead of forcing every location onto the same schedule.`,
      },
      {
        q: `Will the weather affect my deliveries?`,
        a: `${city} deals with ${facts.climate}, so winter routing sometimes needs a little extra lead time. We build that into your delivery window at setup so you are not left with missed pickups later.`,
      },
    ];
  }

  if (page.pageType === "Cost Guide") {
    return [
      {
        q: `What mainly drives my total price?`,
        a: `Your ${meta.items[0]}, your ${meta.items[1]}, and how often you need service are the biggest factors. Two businesses your size can land on very different numbers once real usage is counted.`,
      },
      {
        q: `Is there a minimum order to get a quote?`,
        a: `No. Whether you are a single site or a multi-location group, you get a walkthrough of your ${meta.items[0]} and ${meta.items[1]} before we quote you any number.`,
      },
      {
        q: `Can my price change once I start?`,
        a: `Yes, usually in either direction. If your usage grows or drops, we adjust your account so you are not stuck paying to avoid ${meta.painPoint} you no longer have.`,
      },
    ];
  }

  if (page.pageType === "Near Me Page") {
    return [
      {
        q: `How fast can you start near me?`,
        a: `Most businesses across the GTA can get going within a few business days once you confirm your pickup address and item counts.`,
      },
      {
        q: `Do you serve smaller, single-location businesses?`,
        a: `Yes. If you run ${meta.audiences[0]} or ${meta.audiences[1]}, you are exactly who we work with, not just large multi-site operators.`,
      },
      {
        q: `What if I am outside your usual coverage area?`,
        a: `Call and ask. We add routes as demand grows, and because ${meta.differentiator}, it is easier to fit you in as a new pickup point.`,
      },
    ];
  }

  if (page.pageType === "Service Pillar") {
    return [
      {
        q: `Is this right for my business?`,
        a: `If you run ${meta.audiences[0]}, ${meta.audiences[1]}, ${meta.audiences[2]}, or ${meta.audiences[3]}, yes. We work with everyone from single locations to multi-site operators.`,
      },
      {
        q: `What is included in my standard setup?`,
        a: `You start with ${meta.items[0]} and ${meta.items[1]}, sized to your current volume and adjusted after your first few deliveries.`,
      },
      {
        q: `How are you different from a generic laundry vendor?`,
        a: `${titleCase(meta.differentiator)}, instead of shipping you the same fixed schedule everyone else gets regardless of your size or usage.`,
      },
      {
        q: `Can I switch from my current provider without a gap?`,
        a: `Yes. We time most switch-overs so your new deliveries start before your old contract ends, which keeps ${meta.painPoint} from ever happening.`,
      },
      {
        q: `Is my price different if I have multiple locations?`,
        a: `Usually, yes. We quote each of your locations and can pull them onto one invoice once every address has an active route.`,
      },
    ];
  }

  return [
    {
      q: `Is this a good fit for me?`,
      a: `Yes, if you run ${meta.audiences[0]}, ${meta.audiences[1]}, or something similar. Your service is built around ${meta.items[0]}, not a generic mixed-use textile order.`,
    },
    {
      q: `How is my delivery scheduled?`,
      a: `Your pickup and delivery windows are set around your hours, because ${meta.differentiator}, which works far better than a fixed slot dropped on every business.`,
    },
    {
      q: `What if I run short between deliveries?`,
      a: `Call ahead of your next route. We build in enough buffer stock to keep ${meta.painPoint} away, and we can usually arrange a short-notice top-up.`,
    },
  ];
}

function fallbackPageType(slug: string) {
  const clean = toPath(slug).replace(/\/+$/, "");
  if (PILLAR_SLUGS.has(clean)) return "Service Pillar";
  if (CITY_PREFIX_RULES.some(([prefix]) => clean.startsWith(prefix))) return "City Service Page";
  if (clean.includes("cost")) return "Cost Guide";
  if (clean.includes("near-me")) return "Near Me Page";
  return "Service Page";
}

function fallbackSearchIntent(pageType: string) {
  if (pageType === "City Service Page" || pageType === "Near Me Page") return "Local Transactional";
  if (pageType === "Cost Guide") return "Commercial";
  if (pageType === "Service Pillar" || pageType === "Service Page") return "Transactional";
  return "Transactional";
}

function fallbackPageFromSlug(slug: string): SeoPage {
  const clean = toPath(slug).replace(/\/+$/, "");
  const pageType = fallbackPageType(clean);
  const keyword = clean.replace(/^\//, "").replace(/-/g, " ");
  const city = cityFromSlug(clean);
  const pageTitle = city ? `${titleCase(keyword.replace(new RegExp(`\\b${city.toLowerCase()}\\b`, "g"), "").replace(/\s+/g, " ").trim())} in ${city}` : titleCase(keyword);

  return {
    id: clean,
    pageTitle,
    pageSlug: clean,
    primaryKeyword: keyword,
    secondaryKeywords: `${keyword} near me, ${keyword} service, ${keyword} rental`,
    targetArea: city ? `${city}, ON` : "GTA (Toronto Wide)",
    pageType,
    searchIntent: fallbackSearchIntent(pageType),
    volumePerMonth: "40.0",
    keywordDifficulty: "0.0",
    cpc: "3.0",
    priority: pageType === "Service Pillar" ? "Top Priority" : "Medium",
    ctaStrategy: `Click to Call ${PHONE_DISPLAY}`,
  } as SeoPage;
}

function cityFromSlug(slug: string) {
  const prefix = CITY_PREFIX_RULES.find(([cityPrefix]) => slug.startsWith(cityPrefix));
  if (!prefix) return null;
  return titleCase(slug.slice(prefix[0].length).replace(/-/g, " "));
}

// Re-exported so callers can vary presentation deterministically per page without
// reaching into the service-meta module directly.
export { pick };
