import Image from "next/image";
import Link from "next/link";
import {
  CITY_PAGES,
  PHONE_DISPLAY,
  PHONE_E164,
  SERVICE_PILLARS,
  SITE_NAME,
  SUPPORT_PAGES,
  SeoPage,
  cityFromTargetArea,
  linkLabel,
  toPath,
} from "@/lib/site-data";

const SERVICE_LOCATIONS = Array.from(
  CITY_PAGES.reduce((map, page) => {
    const city = cityFromTargetArea(page.targetArea);
    if (!map.has(city)) map.set(city, page);
    return map;
  }, new Map<string, SeoPage>()).values(),
).slice(0, 16);

function footerLinkLabel(page: SeoPage) {
  if (page.pageType === "City Service Page") return linkLabel(page);

  switch (page.pageSlug) {
    case "/commercial-laundry-service":
      return "Commercial Laundry";
    case "/uniform-rental-service":
      return "Uniform Rentals";
    case "/restaurant-linen-service":
      return "Restaurant Linens";
    case "/commercial-linen-service":
      return "Commercial Linens";
    case "/linen-rental":
      return "Linen Rental";
    case "/table-linen-napkin-rental":
      return "Table Linens";
    case "/floor-mat-rental-service":
      return "Floor Mats";
    case "/commercial-laundry-near-me":
      return "Laundry Near You";
    case "/uniform-rental-near-me":
      return "Uniforms Near You";
    case "/floor-mat-rental-near-me":
      return "Mats Near You";
    case "/linen-service-near-me":
      return "Linen Near You";
    case "/gym-fitness-towel-service":
      return "Gym Towels";
    case "/industrial-uniform-shop-towel-service":
      return "Shop Towels";
    case "/healthcare-medical-linen-service":
      return "Medical Linen";
    case "/hotel-hospitality-linen-service":
      return "Hotel Linen";
    case "/spa-salon-towel-service":
      return "Salon Towels";
    case "/chef-coat-kitchen-uniform-rental":
      return "Chef Coats";
    case "/uniform-rental-cost":
      return "Uniform Pricing";
    case "/linen-rental-cost":
      return "Linen Pricing";
    case "/floor-mat-rental-cost":
      return "Mat Pricing";
    default:
      return page.pageTitle.replace(/\s*\|\s*Linen Rental Pro$/i, "");
  }
}

export function SiteFooter() {
  return (
    <footer className="rescue-footer">
      <div className="rescue-wrap rescue-footer-grid">
        <div>
          <div className="rescue-footer-brand">
            <Image src="/logo.svg" alt="Linen Rental Pro logo" width={34} height={34} />
            <p>{SITE_NAME}</p>
          </div>
          <p className="rescue-footer-copy">
            Textile programs for restaurants, hotels, healthcare sites, gyms, and industrial teams across the GTA and
            Ontario.
          </p>
          <a className="rescue-call rescue-footer-call" href={`tel:${PHONE_E164}`}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
        <div>
          <h2>Main Services</h2>
          <nav className="rescue-footer-links" aria-label="Footer main services">
            {SERVICE_PILLARS.map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {footerLinkLabel(page)}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2>More Pages</h2>
          <nav className="rescue-footer-links" aria-label="Footer more pages">
            {SUPPORT_PAGES.slice(0, 8).map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {footerLinkLabel(page)}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2>Locations We Serve</h2>
          <nav className="rescue-footer-links rescue-footer-cities" aria-label="Footer locations we serve">
            {SERVICE_LOCATIONS.map((page) => (
              <Link key={cityFromTargetArea(page.targetArea)} href={toPath(page.pageSlug)} aria-label={linkLabel(page)}>
                {cityFromTargetArea(page.targetArea)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
