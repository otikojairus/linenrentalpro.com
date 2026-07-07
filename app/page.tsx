import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { HOME_HERO, pillarCardImage } from "@/lib/images";
import { CITY_PAGES, PHONE_DISPLAY, PHONE_E164, SERVICE_PILLARS, SITE_NAME, SUPPORT_PAGES, absoluteUrl, linkLabel, pageListLabel, toPath } from "@/lib/site-data";
import { breadcrumbSchema } from "@/lib/schema";

const homeFaqs = [
  {
    q: "Do you work with a business like mine?",
    a: "If you run a restaurant, hotel, clinic, gym, salon, or industrial site, yes. You get recurring linen, towel, uniform, or mat service sized to how much you actually go through.",
  },
  {
    q: "How do I know which service I need?",
    a: "Tell us your business type and what is giving you trouble now. If you already know your city, start there; if not, we will point you to the right service and size it to your volume.",
  },
  {
    q: "Can I just call before I figure it all out?",
    a: "Yes. Call us, describe your business, roughly what you need, and how soon you want to start. We will take it from there and get your first quote moving.",
  },
];

export const metadata: Metadata = {
  title: `${SITE_NAME} | Commercial Laundry and Linen Rental`,
  description:
    "Commercial laundry, linen rental, uniform rental, towel service, and floor mat service across Toronto and the GTA.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Commercial Laundry and Linen Rental`,
    description: "Commercial laundry, linen rental, and uniform service across Toronto and the GTA.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function HomePage() {
  return (
    <main className="rescue-main">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />
      <section className="rescue-hero">
        <Image
          className="rescue-hero-image"
          src={HOME_HERO.image.src}
          alt={HOME_HERO.alt}
          fill
          priority
          sizes="100vw"
        />
        <div className="rescue-hero-scrim" />
        <div className="rescue-wrap rescue-hero-content">
          <p className="rescue-kicker">Serving Toronto and the GTA</p>
          <h1>Commercial Linen, Laundry and Uniform Rental Across the GTA</h1>
          <p>
            If you run a restaurant, hotel, clinic, gym, or industrial site, you already know how much smoother things
            go when your linen, towels, uniforms, and floor mats show up on a schedule built around your hours. Tell us
            your business type and roughly what you go through, and we will size it to your volume and your city.
          </p>
          <div className="rescue-actions">
            <a className="rescue-call rescue-call-large" href={`tel:${PHONE_E164}`}>
              Call {PHONE_DISPLAY}
            </a>
            <Link className="rescue-secondary" href="/services">
              View Services
            </Link>
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-band">
        <div className="rescue-wrap rescue-split">
          <div>
            <p className="rescue-kicker">Built for recurring programs</p>
            <h2>Service Built Around How You Actually Run</h2>
          </div>
          <p>
            You do not get a one-size plan. If you swap restaurant linen weekly, compare table linen for a hotel, or
            need floor mats kept fresh at a busy entrance, you get a schedule sized to your volume and your hours. Tell
            us what you go through, and we build the route around you rather than dropping you into a generic account.
          </p>
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
                    <span>Featured service</span>
                    <h3>{pageListLabel(page)}</h3>
                    <p>Keep your {pageListLabel(page).toLowerCase()} covered across {page.targetArea.toLowerCase()}, with a real person on the phone.</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-soft">
        <div className="rescue-wrap">
          <h2>Popular Ways To Get Started</h2>
          <div className="rescue-grid rescue-grid-4">
            {SUPPORT_PAGES.slice(0, 12).map((page) => (
              <Link className="rescue-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {linkLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-section">
        <div className="rescue-wrap">
          <h2>Find Your City</h2>
          <div className="rescue-grid rescue-grid-4">
            {CITY_PAGES.slice(0, 28).map((page) => (
              <Link className="rescue-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {linkLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rescue-section rescue-band">
        <div className="rescue-wrap">
          <h2>Common Questions</h2>
          <div className="rescue-grid rescue-grid-3">
            {homeFaqs.map((faq) => (
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
