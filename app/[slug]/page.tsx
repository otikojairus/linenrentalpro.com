import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { heroImageFor, secondaryImageFor } from "@/lib/images";
import {
  PHONE_DISPLAY,
  PHONE_E164,
  SEO_PAGES,
  SITE_NAME,
  SeoPage,
  anchorText,
  breadcrumbTrail,
  bySlug,
  buildH1,
  buildMetaDescription,
  buildMetaTitle,
  cityPagesForPillar,
  faqsFor,
  introText,
  isCityPage,
  isCombinedCityPage,
  keyTakeaways,
  localFacts,
  pageLocation,
  pillarAnchor,
  pillarDeepDive,
  pillarFor,
  planningText,
  processSteps,
  sameCityPages,
  serviceTopicLabel,
  supportCityLinks,
  toPath,
} from "@/lib/site-data";
import { cityServiceSchema, faqSchema, pageBreadcrumb } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;

export async function generateStaticParams() {
  return SEO_PAGES.map((page) => ({ slug: page.pageSlug.replace(/^\//, "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = bySlug(slug);
  return {
    title: buildMetaTitle(page),
    description: buildMetaDescription(page),
    alternates: { canonical: toPath(page.pageSlug) },
    openGraph: {
      title: buildMetaTitle(page),
      description: buildMetaDescription(page),
      url: toPath(page.pageSlug),
      type: "article",
      siteName: SITE_NAME,
      locale: "en_CA",
    },
  };
}

function Breadcrumbs({ page }: { page: SeoPage }) {
  const trail = breadcrumbTrail(page);
  return (
    <nav className="rescue-crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((item, index) => (
          <li key={item.path}>
            {index === trail.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.path}>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function LocalFacts({ page }: { page: SeoPage }) {
  if (!isCityPage(page)) return null;
  const facts = localFacts(page);
  return (
    <section className="rescue-section">
      <div className="rescue-wrap">
        <p className="rescue-kicker">Local details</p>
        <h2>What Makes {pageLocation(page)} Different</h2>
        <div className="rescue-grid rescue-grid-4">
          {facts.map((fact) => (
            <div className="rescue-fact" key={fact.label}>
              <span>{fact.label}</span>
              <p>{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeepDive({ page }: { page: SeoPage }) {
  const deepDive = pillarDeepDive(page);
  if (!deepDive) return null;
  return (
    <section className="rescue-section rescue-soft">
      <div className="rescue-wrap">
        <p className="rescue-kicker">Program details</p>
        <h2>{deepDive.heading}</h2>
        <div className="rescue-prose">
          {deepDive.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageLinks({ page }: { page: SeoPage }) {
  const pillar = pillarFor(page);
  const cityLinks = cityPagesForPillar(pillar);
  const siblingLinks = sameCityPages(page);
  const supportLinks = supportCityLinks(page, 5);
  const combined = isCombinedCityPage(page);

  if (page.pageType === "Service Pillar") {
    const links = cityLinks.length ? cityLinks : supportLinks;
    return (
      <section className="rescue-detail">
        <h2>{buildH1(page)} By City</h2>
        <p>
          Pick your city below and you get the same {serviceTopicLabel(page).toLowerCase()} service, sized and
          scheduled around your local business.
        </p>
        <div className="rescue-grid rescue-grid-4">
          {links.map((item) => (
            <Link className="rescue-chip" key={item.pageSlug} href={toPath(item.pageSlug)}>
              {anchorText(item)}
            </Link>
          ))}
        </div>
      </section>
    );
  }

  if (isCityPage(page)) {
    return (
      <section className="rescue-detail">
        <h2>Related Local Routes</h2>
        <div className="rescue-link-panels">
          <Link className="rescue-card rescue-card-link" href={toPath(pillar.pageSlug)}>
            <span>Parent service</span>
            <h3>{pillarAnchor(pillar)}</h3>
            <p>See how your {pillarAnchor(pillar).toLowerCase()} account is set up and priced.</p>
          </Link>
          {siblingLinks.slice(0, 5).map((item) => (
            <Link className="rescue-card rescue-card-link" key={item.pageSlug} href={toPath(item.pageSlug)}>
              <span>{combined ? "Also in this city" : "Same city"}</span>
              <h3>{anchorText(item)}</h3>
              <p>Add {anchorText(item).toLowerCase()} to the same local account.</p>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rescue-detail">
      <h2>Relevant Service And City Pages</h2>
      <div className="rescue-link-panels">
        <Link className="rescue-card rescue-card-link" href={toPath(pillar.pageSlug)}>
          <span>Recommended service</span>
          <h3>{pillarAnchor(pillar)}</h3>
          <p>See the full {pillarAnchor(pillar).toLowerCase()} service and how your account works.</p>
        </Link>
        {supportLinks.slice(0, 5).map((item) => (
          <Link className="rescue-card rescue-card-link" key={item.pageSlug} href={toPath(item.pageSlug)}>
            <span>City route</span>
            <h3>{anchorText(item)}</h3>
            <p>Start {anchorText(item).toLowerCase()} if your business is in that area.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function DynamicSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = bySlug(slug);
  const faqs = faqsFor(page);
  const takeaways = keyTakeaways(page);
  const hero = heroImageFor(page);
  const secondary = secondaryImageFor(page);
  const serviceSchema = cityServiceSchema(page);
  const schema = serviceSchema ? [pageBreadcrumb(page), faqSchema(page), ...serviceSchema] : [pageBreadcrumb(page), faqSchema(page)];

  return (
    <main className="rescue-main rescue-page">
      <JsonLd data={schema} />
      <div className="rescue-wrap">
        <Breadcrumbs page={page} />
      </div>

      <section className="rescue-wrap rescue-page-head rescue-split rescue-split-media">
        <div>
          <p className="rescue-kicker">{page.pageType}</p>
          <h1>{buildH1(page)}</h1>
          <p>{introText(page)}</p>
          <div className="rescue-actions">
            <a className="rescue-call rescue-call-large" href={`tel:${PHONE_E164}`}>
              Call {PHONE_DISPLAY}
            </a>
            <Link className="rescue-secondary rescue-secondary-dark" href="/services">
              Browse All Services
            </Link>
          </div>
        </div>
        <div className="rescue-media-frame">
          <Image
            src={hero.image.src}
            alt={hero.alt}
            width={hero.image.width}
            height={hero.image.height}
            priority
            sizes="(max-width: 1020px) 100vw, 46vw"
            className="rescue-media-image"
          />
        </div>
      </section>

      <LocalFacts page={page} />

      <section className="rescue-section rescue-band">
        <div className="rescue-wrap rescue-split">
          <div>
            <p className="rescue-kicker">Getting started</p>
            <h2>What We Sort Out On Your First Call</h2>
          </div>
          <p>{planningText(page)}</p>
        </div>
      </section>

      <section className="rescue-section">
        <div className="rescue-wrap rescue-split rescue-split-media rescue-split-reverse">
          <div className="rescue-media-frame rescue-media-frame-small">
            <Image
              src={secondary.image.src}
              alt={secondary.alt}
              width={secondary.image.width}
              height={secondary.image.height}
              loading="lazy"
              sizes="(max-width: 1020px) 100vw, 40vw"
              className="rescue-media-image"
            />
          </div>
          <div>
            <h2>How Your Setup Works</h2>
            <div className="rescue-timeline">
              {processSteps(page).map((step, index) => (
                <article className="rescue-step" key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rescue-section">
        <div className="rescue-wrap rescue-split">
          <div>
            <p className="rescue-kicker">Before you call</p>
            <h2>What You Will Sort Out Before You Call</h2>
          </div>
          <ul className="rescue-checks">
            {takeaways.map((item) => (
              <li key={item.slice(0, 40)}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <DeepDive page={page} />

      <div className="rescue-wrap">
        <PageLinks page={page} />
      </div>

      <section className="rescue-section rescue-band">
        <div className="rescue-wrap">
          <h2>Common Questions</h2>
          <div className="rescue-grid rescue-grid-3">
            {faqs.map((faq) => (
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
