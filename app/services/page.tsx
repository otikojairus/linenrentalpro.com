import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SERVICES_HERO, pillarCardImage } from "@/lib/images";
import { CITY_PAGES, COST_PAGES, NEAR_ME_PAGES, PHONE_DISPLAY, PHONE_E164, SEO_PAGES, SERVICE_PAGES, SERVICE_PILLARS, SITE_NAME, SUPPORT_PAGES, absoluteUrl, linkLabel, pageListLabel, toPath } from "@/lib/site-data";
import { breadcrumbSchema } from "@/lib/schema";

const serviceFaqs = [
  {
    q: "Should I start with a service hub or my city?",
    a: "If you want the full picture of how a service works, start with the service hub. If you already know your location and just want local pickup and delivery, jump straight to your city.",
  },
  {
    q: "Where do I find pricing?",
    a: "Open one of the cost guides. Each one walks you through what affects your order size, how often you need service, and how your account is set up, so your first call is quick and focused.",
  },
  {
    q: "Can I just call instead of picking a page?",
    a: "Yes. Call us, tell us your business type and roughly what you need, and we will point you to the right service and get your first quote started.",
  },
];

export const metadata: Metadata = {
  title: `${SITE_NAME} Services`,
  description:
    "Browse our main services, local pages, pricing guides, and city coverage in one place.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${SITE_NAME} Services`,
    description: "Browse services, pricing, and city coverage for Linen Rental Pro.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <main className="rescue-main rescue-page">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: serviceFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />
      <section className="rescue-wrap rescue-page-head rescue-split rescue-split-media">
        <div>
          <p className="rescue-kicker">Every service in one place</p>
          <h1>Services</h1>
          <p>
            Find exactly what you need in one place. Whether you want recurring linen, uniforms, floor mats, or full
            commercial laundry, start with the broad service that fits you and drill down to your city. If you would
            rather skip the browsing, call us and we will get you to the right service and a first quote.
          </p>
          <div className="rescue-actions">
            <a className="rescue-call rescue-call-large" href={`tel:${PHONE_E164}`}>
              Call {PHONE_DISPLAY}
            </a>
            <Link className="rescue-secondary" href="/">
              Back to Home
            </Link>
          </div>
        </div>
        <div className="rescue-media-frame">
          <Image
            src={SERVICES_HERO.image.src}
            alt={SERVICES_HERO.alt}
            width={SERVICES_HERO.image.width}
            height={SERVICES_HERO.image.height}
            priority
            sizes="(max-width: 1020px) 100vw, 46vw"
            className="rescue-media-image"
          />
        </div>
      </section>

      <section className="rescue-section">
        <div className="rescue-wrap">
          <h2>Main Services</h2>
          <div className="rescue-grid rescue-grid-3">
            {SERVICE_PILLARS.map((page) => {
              const card = pillarCardImage(page.pageSlug);
              return (
                <Link className="rescue-media-card" href={toPath(page.pageSlug)} key={page.pageSlug}>
                  <div className="rescue-media-card-thumb">
                    <Image
                      src={card.image.src}
                      alt={card.alt}
                      width={card.image.width}
                      height={card.image.height}
                      loading="lazy"
                      sizes="(max-width: 1020px) 100vw, 33vw"
                    />
                  </div>
                  <div className="rescue-media-card-body">
                    <span>{page.priority}</span>
                    <h3>{pageListLabel(page)}</h3>
                    <p>Set up recurring service across {page.targetArea.toLowerCase()}, with a real person on the phone.</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-soft">
        <div className="rescue-wrap">
          <h2>Nearby Searches</h2>
          <div className="rescue-grid rescue-grid-4">
            {NEAR_ME_PAGES.map((page) => (
              <Link className="rescue-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {linkLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-section">
        <div className="rescue-wrap">
          <h2>Industry Pages</h2>
          <div className="rescue-grid rescue-grid-4">
            {SERVICE_PAGES.map((page) => (
              <Link className="rescue-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {pageListLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-band">
        <div className="rescue-wrap">
          <h2>Pricing Guides</h2>
          <div className="rescue-grid rescue-grid-4">
            {COST_PAGES.map((page) => (
              <Link className="rescue-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {pageListLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-section">
        <div className="rescue-wrap">
          <h2>Local Pages</h2>
          <div className="rescue-grid rescue-grid-4">
            {CITY_PAGES.map((page) => (
              <Link className="rescue-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {linkLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-band">
        <div className="rescue-wrap">
          <h2>More Pages</h2>
          <div className="rescue-grid rescue-grid-4">
            {SUPPORT_PAGES.map((page) => (
              <Link className="rescue-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {pageListLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-section">
        <div className="rescue-wrap">
          <h2>Browse All</h2>
          <div className="rescue-index-list">
            {SEO_PAGES.map((page) => (
              <Link href={toPath(page.pageSlug)} key={page.pageSlug} aria-label={pageListLabel(page)}>
                {pageListLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-band">
        <div className="rescue-wrap">
          <h2>Common Questions</h2>
          <div className="rescue-grid rescue-grid-3">
            {serviceFaqs.map((faq) => (
              <article className="rescue-card" key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
