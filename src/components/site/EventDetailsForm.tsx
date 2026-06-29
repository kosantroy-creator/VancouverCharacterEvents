import { useState, type ComponentType, type CSSProperties, type FormEvent } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Crown, Loader2, Receipt, Sparkles, Store, Tent, Wand2, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { submitInquiry } from "@/lib/inquiry";
import { WORLD_BY_ID } from "@/lib/world-characters";
import { PRINCESS_ART } from "@/lib/princess-portraits";
import { BAZAAR_CATEGORIES, FORM_PKG_BY_ID, type FormPkg } from "@/lib/bazaar-extras";
import dreamVista from "@/assets/booking/step3-form-bg.webp";

/**
 * EventDetailsForm — "Step Three: Event Details". A short request form styled as a
 * majestic event scroll, themed to the world the visitor chose in Step 2: the chosen
 * world's art backs the section, its accent runs through the card + banner, and the
 * requested characters appear as portrait cards on the scroll. A multi-world selection
 * gets one gold "all worlds" scroll with every chosen character. Same submitInquiry →
 * Resend pipeline (field names/validation untouched). See ".ef3" in styles.css.
 */
type Status = "idle" | "submitting" | "success" | "error";
type CharCard = { key: string; name: string; art?: string; Icon: ComponentType<{ className?: string }>; acc: string };

const BOOKING_EMAIL = "info@vancouvercharacterevents.com";
const fld =
  "w-full rounded-[12px] border border-[rgba(201,164,92,0.5)] bg-[#FFFDF7] px-3.5 py-2.5 text-[0.95rem] text-[#243463] placeholder:text-[#9aa0b5] transition-colors focus:border-[#C19A3C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E7B24B]/45";
const lbl = "mb-1.5 block text-sm font-semibold text-[#1B2A52]";

const EVENT_TYPES = [
  "Birthday Party",
  "School / Daycare Event",
  "Festival / Community Event",
  "Mall Appearance",
  "Corporate Event",
  "Family Fun Day",
  "Holiday Event",
  "Other / Custom Event",
];
const PACKAGE = ["60 Minutes", "90 Minutes", "Custom / Not sure yet"];

/* Deterministic ambient motif particles drifting across the themed banner. */
const PARTICLES = [
  { left: "7%", delay: "0s", dur: "9s", s: 7 },
  { left: "21%", delay: "2.4s", dur: "11s", s: 5 },
  { left: "38%", delay: "1.2s", dur: "10s", s: 8 },
  { left: "55%", delay: "3.6s", dur: "12s", s: 6 },
  { left: "70%", delay: "0.8s", dur: "9.5s", s: 7 },
  { left: "86%", delay: "2s", dur: "11.5s", s: 5 },
  { left: "95%", delay: "4.1s", dur: "10.5s", s: 6 },
] as const;

export function EventDetailsForm({
  bookingPath,
  worldChars,
  requestedGuest,
  requestedInflatable,
}: {
  bookingPath?: string;
  worldChars: Record<string, string[]>;
  requestedGuest?: string;
  requestedInflatable?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  // Bazaar add-ons: a category -> people -> packages browser that builds an estimate.
  const [navCat, setNavCat] = useState<string | null>(null);
  const [navVendor, setNavVendor] = useState<string | null>(null);
  const [navSubcat, setNavSubcat] = useState<string | null>(null);
  const [quote, setQuote] = useState<string[]>([]);
  const toggleQuote = (id: string) =>
    setQuote((q) => (q.includes(id) ? q.filter((x) => x !== id) : [...q, id]));

  // Derive the theme + the requested characters from the Step-2 selection.
  const worldIds = Object.keys(worldChars).filter((id) => worldChars[id]?.length && WORLD_BY_ID[id]);
  const single = worldIds.length === 1;
  const themeWorld = single ? WORLD_BY_ID[worldIds[0]] : undefined;
  const themeAcc = themeWorld?.acc ?? "#C19A3C";
  // The section background stays the neutral dream-vista; the FORM is themed instead.
  const bannerArt = themeWorld?.hero;
  const bannerPos = themeWorld?.cardPos ?? "50% 45%";
  const motif = themeWorld?.motif ?? "star";
  const headline = single ? themeWorld!.name : worldIds.length > 1 ? "Multi-World Event" : "Your Event";
  // The Bazaar already lists these as its "characters", so skip the panel for a Bazaar-only booking.
  const bazaarOnly = single && worldIds[0] === "bazaar";

  // Estimate: sum the numeric package prices; custom-quote items are noted separately.
  const lineItems = quote.map((id) => FORM_PKG_BY_ID[id]).filter(Boolean);
  const estTotal = lineItems.reduce((s, p) => s + (p.priceNum ?? 0), 0);
  const hasCustom = lineItems.some((p) => p.priceNum == null);
  const hasTravel = lineItems.some((p) => /travel/i.test(p.price));
  const estText = `~$${estTotal}${hasTravel ? " + travel" : ""}${hasCustom ? " + custom items" : ""}`;
  const cat = navCat ? BAZAAR_CATEGORIES.find((c) => c.id === navCat) ?? null : null;
  const vendor = cat && navVendor ? cat.vendors.find((v) => v.id === navVendor) ?? null : null;
  const subcat = vendor?.subcats && navSubcat ? vendor.subcats.find((s) => s.id === navSubcat) ?? null : null;

  const chars: CharCard[] = worldIds.flatMap((wid) => {
    const w = WORLD_BY_ID[wid];
    return (worldChars[wid] ?? []).map((cid) => {
      const ch = w.characters.find((c) => c.id === cid);
      return {
        key: `${wid}-${cid}`,
        name: ch?.name ?? cid,
        art: wid === "princess" ? PRINCESS_ART[cid] : undefined,
        Icon: w.icon,
        acc: w.acc,
      };
    });
  });

  const selectedWorlds = worldIds.length ? worldIds.map((id) => WORLD_BY_ID[id].name).join(", ") : undefined;
  const selectedCharacters = worldIds.length
    ? worldIds
        .map((id) => {
          const w = WORLD_BY_ID[id];
          const names = worldChars[id].map((cid) => w.characters.find((c) => c.id === cid)?.name ?? cid);
          return `${w.name} (${names.join(", ")})`;
        })
        .join(" · ")
    : undefined;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot
    const fields = Object.fromEntries(
      [...data.entries()].filter(([k]) => k !== "company"),
    ) as Record<string, string>;
    setStatus("submitting");
    const res = await submitInquiry("Event request (booking page)", fields);
    if (res.ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const renderChar = (c: CharCard) => (
    <li key={c.key} className="ef3-char">
      <span className="ef3-char-frame" style={{ "--acc": c.acc } as CSSProperties}>
        {c.art ? (
          <img src={c.art} alt="" aria-hidden className="ef3-char-art" />
        ) : (
          <span aria-hidden className="ef3-char-art ef3-char-deco"><c.Icon className="h-5 w-5" /></span>
        )}
      </span>
      <span className="ef3-char-name">{c.name}</span>
    </li>
  );

  const vendorHead = (v: { name: string; role: string; photo?: string; logo?: string }) => (
    <div className="ef3-bz-vendor">
      {v.photo ? (
        <img src={v.photo} alt="" aria-hidden className="ef3-bz-vendor-img" />
      ) : v.logo ? (
        <img src={v.logo} alt="" aria-hidden className="ef3-bz-vendor-img ef3-bz-vendor-logoimg" />
      ) : (
        <span aria-hidden className="ef3-bz-vendor-img ef3-bz-vendor-logo"><Tent className="h-5 w-5" /></span>
      )}
      <div><span className="ef3-bz-vendor-name">{v.name}</span><span className="ef3-bz-vendor-role">{v.role}</span></div>
    </div>
  );

  const pkgToggle = (p: FormPkg) => {
    const on = quote.includes(p.id);
    return (
      <li key={p.id}>
        <button type="button" aria-pressed={on} onClick={() => toggleQuote(p.id)} className={on ? "ef3-bz-pkg is-on" : "ef3-bz-pkg"}>
          {p.img ? <img src={p.img} alt="" aria-hidden className="ef3-bz-pkg-img" /> : null}
          <span className="ef3-bz-pkg-body">
            <span className="ef3-bz-pkg-top">
              <span className="ef3-bz-pkg-name">{p.name}</span>
              <span className="ef3-bz-pkg-price">{p.price}</span>
            </span>
            <span className="ef3-bz-pkg-meta">{p.meta}</span>
            <span aria-hidden className="ef3-bz-pkg-add">{on ? <><Check className="h-3.5 w-3.5" /> Added to estimate</> : <>+ Add to estimate</>}</span>
          </span>
        </button>
      </li>
    );
  };

  return (
    <section
      id="book"
      aria-labelledby="edf-title"
      className={`edf ef3 relative isolate scroll-mt-20 overflow-hidden${single ? "" : " ef3--multi"}`}
      style={{ "--theme": themeAcc } as CSSProperties}
    >
      <img src={dreamVista} alt="" aria-hidden decoding="async" loading="lazy" className="ef3-bg absolute inset-0 -z-20 h-full w-full object-cover" style={{ objectPosition: "50% 48%" }} />
      <span aria-hidden className="ef3-scrim absolute inset-0 -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[760px] px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        {status === "success" ? (
          <Reveal y={18} className="block">
            <div className="ef3-card ef3-success text-center">
              <span aria-hidden className="ef3-seal"><Crown className="h-7 w-7" /></span>
              <h3 id="edf-title" className="ef3-success-title">Your Event Request Has Entered the Booking Hall</h3>
              <p className="ef3-success-copy">
                Thank you! We&apos;ve received your event details and will follow up with availability,
                recommendations, and next steps — usually within one business day. (If you don&apos;t see
                our confirmation, check your spam folder.)
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="ef3-success-again">
                Send another request
              </button>
            </div>
          </Reveal>
        ) : (
          <>
          <Reveal y={18} className="block">
            <form onSubmit={handleSubmit} className="ef3-card" noValidate>
              {/* honeypot */}
              <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="company">Company (leave blank)</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {/* carried-forward selections (hidden) */}
              {bookingPath ? <input type="hidden" name="bookingPath" value={bookingPath} /> : null}
              {selectedWorlds ? <input type="hidden" name="selectedWorlds" value={selectedWorlds} /> : null}
              {selectedCharacters ? <input type="hidden" name="selectedCharacters" value={selectedCharacters} /> : null}
              {requestedGuest ? <input type="hidden" name="requestedGuest" value={requestedGuest} /> : null}
              {requestedInflatable ? (
                <>
                  <input type="hidden" name="requestedInflatable" value={requestedInflatable} />
                  <input type="hidden" name="inflatablePartner" value="HW House of Bounce" />
                </>
              ) : null}
              {quote.length ? <input type="hidden" name="bazaarExtras" value={lineItems.map((p) => `${p.category} — ${p.vendor} — ${p.name} (${p.price})`).join("; ")} /> : null}
              {quote.length ? <input type="hidden" name="addOnsEstimate" value={estText} /> : null}

              {/* themed scroll banner — the world scene + its motif + requested characters */}
              <div className={`ef3-banner ef3-banner--${motif}`}>
                {bannerArt ? (
                  <img src={bannerArt} alt="" aria-hidden className="ef3-banner-bg" style={{ objectPosition: bannerPos }} />
                ) : null}
                <span aria-hidden className="ef3-banner-veil" />
                <div aria-hidden className="ef3-motif">
                  {PARTICLES.map((p, i) => (
                    <span
                      key={i}
                      className={`ef3-pcl ef3-pcl--${motif}`}
                      style={{ left: p.left, width: p.s, height: p.s, animationDelay: p.delay, animationDuration: p.dur }}
                    />
                  ))}
                </div>
                <div className="ef3-banner-head">
                  <span className="ef3-banner-eyebrow">Your Event Request</span>
                  <h3 id="edf-title" className="ef3-banner-title">{headline}</h3>
                </div>
                {chars.length ? (
                  <ul className="ef3-chars" aria-label="Your requested characters">
                    {chars.map(renderChar)}
                  </ul>
                ) : null}
              </div>

              <div className="ef3-body">
                <p className="ef3-sub">Tell us what you know — we&apos;ll follow up with availability and next steps.</p>

                <div className={bazaarOnly ? "mt-4" : "ef3-layout mt-4"}>
                  <div className="ef3-fields">
                  <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={lbl} htmlFor="date">Event date</label>
                    <input id="date" name="date" type="date" className={fld} />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="time">Event time</label>
                    <input id="time" name="time" type="time" className={fld} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={lbl} htmlFor="address">Event address</label>
                    <input id="address" name="address" type="text" className={fld} placeholder="Street address or venue name" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="city">Event city</label>
                    <input id="city" name="city" type="text" className={fld} placeholder="Coquitlam, Vancouver, Surrey…" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="eventType">Event type</label>
                    <select id="eventType" name="eventType" className={fld} defaultValue="">
                      <option value="" disabled>Select event type</option>
                      {EVENT_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={lbl} htmlFor="name">Your name <span className="text-[#C9337E]">*</span></label>
                    <input id="name" name="name" type="text" required autoComplete="name" className={fld} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="guestName">
                      Child&apos;s name <span className="font-normal text-[#7a8099]">(optional — helps us prep our actors)</span>
                    </label>
                    <input id="guestName" name="guestName" type="text" className={fld} placeholder="Guest of honour" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="email">Email <span className="text-[#C9337E]">*</span></label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={fld} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" className={fld} placeholder="(778) 000-0000" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="guests">Guest count</label>
                    <input id="guests" name="guests" type="number" min={1} className={fld} placeholder="Approx. number of guests" />
                  </div>
                  <div>
                    <label className={lbl} htmlFor="packageStyle">Package</label>
                    <select id="packageStyle" name="packageStyle" className={fld} defaultValue="">
                      <option value="" disabled>Select</option>
                      {PACKAGE.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={lbl} htmlFor="message">Notes</label>
                    <textarea id="message" name="message" rows={4} className={fld} placeholder="Theme, favourite characters, schedule, special moments, parking/access, or anything else we should know." />
                  </div>
                  </div>
                  </div>

                  {!bazaarOnly ? (
                    <aside className="ef3-addons">
                      <div className="ef3-addons-head">
                        <span aria-hidden className="ef3-addons-ic"><Store className="h-5 w-5" /></span>
                        <div>
                          <h4 className="ef3-addons-title">Add Bazaar Extras</h4>
                          <p className="ef3-addons-sub">Pick a category, then a partner, then a package.</p>
                        </div>
                      </div>

                      {vendor && vendor.subcats ? (
                        subcat ? (
                          /* inflatable items — image + price */
                          <div className="ef3-bz-view">
                            <button type="button" className="ef3-bz-back" onClick={() => setNavSubcat(null)}>
                              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> {subcat.name}
                            </button>
                            {vendorHead(vendor)}
                            <ul className="ef3-bz-pkgs">{subcat.items.map(pkgToggle)}</ul>
                          </div>
                        ) : (
                          /* inflatable sub-categories */
                          <div className="ef3-bz-view">
                            <button type="button" className="ef3-bz-back" onClick={() => setNavVendor(null)}>
                              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> {cat!.name}
                            </button>
                            {vendorHead(vendor)}
                            <ul className="ef3-bz-subcats">
                              {vendor.subcats.map((s) => {
                                const n = s.items.filter((it) => quote.includes(it.id)).length;
                                return (
                                  <li key={s.id}>
                                    <button type="button" className="ef3-bz-subcat" onClick={() => setNavSubcat(s.id)}>
                                      <img src={s.thumb} alt="" aria-hidden className="ef3-bz-subcat-thumb" />
                                      <span className="ef3-bz-subcat-meta">
                                        <span className="ef3-bz-subcat-name">{s.name}</span>
                                        <span className="ef3-bz-subcat-count">{s.items.length} options</span>
                                      </span>
                                      {n ? <span className="ef3-bz-cat-badge">{n}</span> : null}
                                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )
                      ) : vendor ? (
                        /* person packages */
                        <div className="ef3-bz-view">
                          <button type="button" className="ef3-bz-back" onClick={() => setNavVendor(null)}>
                            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> {cat!.name}
                          </button>
                          {vendorHead(vendor)}
                          <ul className="ef3-bz-pkgs">{(vendor.packages ?? []).map(pkgToggle)}</ul>
                        </div>
                      ) : cat ? (
                        /* people / partners */
                        <div className="ef3-bz-view">
                          <button type="button" className="ef3-bz-back" onClick={() => setNavCat(null)}>
                            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All categories
                          </button>
                          <p className="ef3-bz-step">{cat.name}</p>
                          <ul className="ef3-bz-vendors">
                            {cat.vendors.map((v) => (
                              <li key={v.id}>
                                <button type="button" className="ef3-bz-vendor-btn" onClick={() => setNavVendor(v.id)}>
                                  {v.photo ? (
                                    <img src={v.photo} alt="" aria-hidden className="ef3-bz-vendor-img" />
                                  ) : v.logo ? (
                                    <img src={v.logo} alt="" aria-hidden className="ef3-bz-vendor-img ef3-bz-vendor-logoimg" />
                                  ) : (
                                    <span aria-hidden className="ef3-bz-vendor-img ef3-bz-vendor-logo"><Tent className="h-5 w-5" /></span>
                                  )}
                                  <span className="ef3-bz-vendor-meta"><span className="ef3-bz-vendor-name">{v.name}</span><span className="ef3-bz-vendor-role">{v.role}</span></span>
                                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        /* categories */
                        <ul className="ef3-bz-cats">
                          {BAZAAR_CATEGORIES.map((c) => {
                            const Icon = c.icon;
                            const n = c.vendors.reduce((s, v) => s + (v.packages ?? v.subcats?.flatMap((sc) => sc.items) ?? []).filter((p) => quote.includes(p.id)).length, 0);
                            return (
                              <li key={c.id}>
                                <button type="button" className="ef3-bz-cat" onClick={() => setNavCat(c.id)}>
                                  <span aria-hidden className="ef3-bz-cat-ic"><Icon className="h-4 w-4" /></span>
                                  <span className="ef3-bz-cat-name">{c.name}</span>
                                  {n ? <span className="ef3-bz-cat-badge">{n}</span> : null}
                                  <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      <p className="ef3-addons-note">Partner add-ons may depend on date, location, setup needs, event type, and partner availability.</p>
                    </aside>
                  ) : null}
                </div>

                {quote.length ? (
                  <Reveal y={12} className="block">
                    <div className="ef3-quote">
                      <div className="ef3-quote-head"><Receipt className="h-4 w-4" aria-hidden /> Your estimate</div>
                      <ul className="ef3-quote-lines">
                        {lineItems.map((p) => (
                          <li key={p.id}>
                            <span className="ef3-quote-li">
                              <span className="ef3-quote-li-cat">{p.category} · {p.vendor}</span>
                              <span className="ef3-quote-li-name">{p.name}</span>
                            </span>
                            <span className="ef3-quote-li-price">{p.price}</span>
                            <button type="button" aria-label={`Remove ${p.name}`} onClick={() => toggleQuote(p.id)} className="ef3-quote-rm"><X className="h-3.5 w-3.5" /></button>
                          </li>
                        ))}
                      </ul>
                      <div className="ef3-quote-total"><span>Estimated add-ons</span><strong>{estText}</strong></div>
                      <p className="ef3-quote-note">Estimate only — final pricing is confirmed on request. Your event entertainment is quoted separately with your request; travel and custom-quote items are added by our team.</p>
                    </div>
                  </Reveal>
                ) : null}

                <p className="ef3-note">
                  <Tent className="h-3.5 w-3.5" aria-hidden /> Inflatable partner add-ons may be available through
                  trusted vendors depending on date, location, setup needs, and event type.
                </p>

                <label className="ef3-ack">
                  <input type="checkbox" name="acknowledge" value="Yes" className="ef3-ack-box" />
                  <span>I understand this is a request for availability &amp; pricing, not a confirmed booking yet.</span>
                </label>

                {status === "error" ? (
                  <div role="alert" className="ef3-error">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      Something went wrong sending your request. Please try again, or email us at{" "}
                      <a href={`mailto:${BOOKING_EMAIL}`} className="font-semibold underline underline-offset-2">{BOOKING_EMAIL}</a>.
                    </span>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <button type="submit" disabled={status === "submitting"} className="ef3-submit group">
                    {status === "submitting" ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending Request…</>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4" aria-hidden />
                        Send My Event Request
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-[#6B7596]">We typically reply within one business day.</p>
                </div>
              </div>
            </form>
          </Reveal>

          {/* reassurance at the decision point — folds the old "what happens next" section */}
          <Reveal delay={140} y={16} className="block">
            <div className="ef3-reassure">
              <div className="ef3-next">
                <span className="ef3-next-l"><Sparkles className="h-3.5 w-3.5" aria-hidden /> What happens next</span>
                <ol className="ef3-next-steps">
                  <li><span aria-hidden className="ef3-next-n">1</span> We review your request</li>
                  <li><span aria-hidden className="ef3-next-n">2</span> We check availability</li>
                  <li><span aria-hidden className="ef3-next-n">3</span> We recommend the best fit</li>
                  <li><span aria-hidden className="ef3-next-n">4</span> We send pricing &amp; next steps</li>
                </ol>
              </div>
              <ul className="ef3-trust">
                {["Availability checked manually", "Recommendations included", "Custom quotes available", "No booking confirmed until finalized"].map((t) => (
                  <li key={t}><Check className="h-3.5 w-3.5" aria-hidden /> {t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
