import { SeoPage, isCityPage, pageLocation, serviceFamily, serviceTopicLabel } from "@/lib/site-data";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
};

// Every asset below is a locally hosted WebP copy of a real Unsplash photo, downloaded
// and re-encoded at build time so pages never depend on a third-party CDN at runtime.
const IMG = {
  laundryIron: { src: "/images/laundry-iron.webp", width: 1600, height: 1000 },
  laundryBasket: { src: "/images/laundry-basket.webp", width: 1600, height: 1000 },
  foldedTextiles: { src: "/images/folded-textiles.webp", width: 1600, height: 1000 },
  hotelBedLinen: { src: "/images/hotel-bed-linen.webp", width: 1600, height: 1000 },
  restaurantTable: { src: "/images/restaurant-table.webp", width: 1600, height: 1000 },
  restaurantInterior: { src: "/images/restaurant-interior.webp", width: 1600, height: 1000 },
  restaurantInteriorAlt: { src: "/images/restaurant-interior-alt.webp", width: 1600, height: 1000 },
  gymInterior: { src: "/images/gym-interior.webp", width: 1600, height: 1000 },
  gymTraining: { src: "/images/gym-training.webp", width: 1600, height: 1000 },
  spaHotStone: { src: "/images/spa-hotstone.webp", width: 1600, height: 1000 },
  spaMassage: { src: "/images/spa-massage.webp", width: 1600, height: 1000 },
  chefPlating: { src: "/images/chef-plating.webp", width: 1600, height: 1000 },
  medicalRoom: { src: "/images/medical-operating-room.webp", width: 1600, height: 1000 },
  medicalCoat: { src: "/images/medical-coat.webp", width: 1600, height: 1000 },
  foldedShirts: { src: "/images/folded-dress-shirts.webp", width: 1600, height: 1000 },
  foldingLaundry: { src: "/images/folding-laundry.webp", width: 1600, height: 1000 },
  rolledMat: { src: "/images/rolled-mat.webp", width: 1600, height: 1000 },
} as const;

type FamilyImageSet = { hero: SiteImage; secondary: SiteImage; subject: string };

const FAMILY_IMAGES: Record<string, FamilyImageSet> = {
  "/commercial-laundry-service": { hero: IMG.laundryIron, secondary: IMG.laundryBasket, subject: "freshly pressed commercial laundry" },
  "/uniform-rental-service": { hero: IMG.foldedShirts, secondary: IMG.foldingLaundry, subject: "pressed uniform shirts ready for rotation" },
  "/restaurant-linen-service": { hero: IMG.restaurantTable, secondary: IMG.restaurantInterior, subject: "a table set with rented restaurant linen" },
  "/commercial-linen-service": { hero: IMG.foldedTextiles, secondary: IMG.foldingLaundry, subject: "folded commercial linen stock" },
  "/linen-rental": { hero: IMG.hotelBedLinen, secondary: IMG.foldedTextiles, subject: "rental bed linen styled on a bed" },
  "/table-linen-napkin-rental": { hero: IMG.restaurantTable, secondary: IMG.restaurantInteriorAlt, subject: "table linen and napkins set for service" },
  "/floor-mat-rental-service": { hero: IMG.rolledMat, secondary: IMG.laundryBasket, subject: "a rolled commercial floor mat" },
};

const SERVICE_PAGE_IMAGES: Record<string, FamilyImageSet> = {
  "/gym-fitness-towel-service": { hero: IMG.gymInterior, secondary: IMG.gymTraining, subject: "a fitness floor supplied with rental gym towels" },
  "/industrial-uniform-shop-towel-service": { hero: IMG.foldedShirts, secondary: IMG.foldingLaundry, subject: "industrial uniforms and shop towels staged for delivery" },
  "/healthcare-medical-linen-service": { hero: IMG.medicalRoom, secondary: IMG.medicalCoat, subject: "a clean clinical room supplied with medical linen" },
  "/hotel-hospitality-linen-service": { hero: IMG.hotelBedLinen, secondary: IMG.restaurantInterior, subject: "hotel bed linen prepared for a guest room" },
  "/spa-salon-towel-service": { hero: IMG.spaHotStone, secondary: IMG.spaMassage, subject: "spa towels in use during a treatment" },
  "/chef-coat-kitchen-uniform-rental": { hero: IMG.chefPlating, secondary: IMG.restaurantInteriorAlt, subject: "a chef in a rented kitchen coat plating food" },
};

const FALLBACK_SET: FamilyImageSet = FAMILY_IMAGES["/commercial-laundry-service"];

function baseSetFor(page: SeoPage): FamilyImageSet {
  if (SERVICE_PAGE_IMAGES[page.pageSlug]) return SERVICE_PAGE_IMAGES[page.pageSlug];
  const family = serviceFamily(page);
  return FAMILY_IMAGES[family] || FALLBACK_SET;
}

export function heroImageFor(page: SeoPage): { image: SiteImage; alt: string } {
  const set = baseSetFor(page);
  const topic = serviceTopicLabel(page);
  const location = pageLocation(page);
  const alt = isCityPage(page)
    ? `${set.subject}, representing ${topic.toLowerCase()} service in ${location}`
    : `${set.subject}, representing ${topic.toLowerCase()} service across ${location}`;
  return { image: set.hero, alt };
}

export function secondaryImageFor(page: SeoPage): { image: SiteImage; alt: string } {
  const set = baseSetFor(page);
  const location = pageLocation(page);
  const alt = `${set.subject} prepared for a delivery route in ${location}`;
  return { image: set.secondary, alt };
}

/** Hero image for the homepage. */
export const HOME_HERO: { image: SiteImage; alt: string } = {
  image: IMG.hotelBedLinen,
  alt: "Crisp folded hotel linen ready for a commercial delivery route across the GTA",
};

/** Banner image for the services index page. */
export const SERVICES_HERO: { image: SiteImage; alt: string } = {
  image: IMG.foldedTextiles,
  alt: "Stacks of folded commercial textiles staged for pickup and delivery",
};

/** Small card image for a service pillar, used in listing grids. */
export function pillarCardImage(slug: string): { image: SiteImage; alt: string } {
  const set = FAMILY_IMAGES[slug] || FALLBACK_SET;
  return { image: set.hero, alt: `${set.subject}, illustrating the service` };
}
