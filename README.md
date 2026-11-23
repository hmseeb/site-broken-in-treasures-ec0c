# Broken in Treasures — Salem, WV

Single-page marketing site for Broken in Treasures, an owner-run gift and treasure
shop at 112 E Main St, Salem, WV 26426.

Built with vanilla HTML, CSS and JavaScript — no build step, no dependencies.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The entire site (semantic single page + Store JSON-LD) |
| `styles.css` | Design system, responsive layout, mobile call bar |
| `script.js` | Progressive enhancement: `_page` stamping, fetch form submit, confirmation |
| `favicon.svg` | Favicon |
| `robots.txt` | Crawler directives |

## Conversion design

- **One primary action everywhere:** `Call (304) 669-3479` — in the header, hero,
  after the services section, in the contact section, in the closing CTA, and in a
  sticky bottom call bar on mobile.
- The Google rating (5.0 from 56 reviews) sits beside the hero CTA and links to the
  business's Google listing.
- Secondary action: a short contact form (name, phone, optional email, message).

## Form handling

The single contact form POSTs to the LeadrVision endpoint and works with or without
JavaScript. With JS it submits via `fetch()` to the same URL and shows an inline
confirmation; without JS the browser POSTs normally and the visitor returns with
`?submitted=1`, which also renders the confirmation. A hidden `_gotcha` honeypot
filters bots.

## Content policy

All review text, the rating, the phone number and the address come from the
business's real Google Business Profile. Nothing on the page is invented — there are
no fabricated testimonials, hours, awards or statistics. Hours were not supplied, so
the site asks visitors to call for today's hours. No images were available, so the
layout is typographic rather than photographic.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Note: `/review` is provided by the hosting platform and is intentionally not part of
this repo.
