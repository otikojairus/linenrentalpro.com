import Image from "next/image";
import Link from "next/link";
import { CITY_PAGES, PHONE_DISPLAY, PHONE_E164, SERVICE_PILLARS, SITE_NAME, SUPPORT_PAGES, pageListLabel, toPath } from "@/lib/site-data";

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
            Commercial laundry, linen rental, uniform programs, towel service, and floor mat rental for restaurants,
            hotels, healthcare sites, gyms, and industrial teams across the GTA and Ontario.
          </p>
          <a className="rescue-call rescue-footer-call" href={`tel:${PHONE_E164}`}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
        <div>
          <h2>Service Hubs</h2>
          <nav className="rescue-footer-links" aria-label="Footer service hubs">
            {SERVICE_PILLARS.map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {pageListLabel(page)}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2>Support Pages</h2>
          <nav className="rescue-footer-links" aria-label="Footer support pages">
            {SUPPORT_PAGES.slice(0, 8).map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {pageListLabel(page)}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2>City Coverage</h2>
          <nav className="rescue-footer-links rescue-footer-cities" aria-label="Footer city pages">
            {CITY_PAGES.slice(0, 16).map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)} aria-label={pageListLabel(page)}>
                {pageListLabel(page)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
