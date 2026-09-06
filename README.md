# debugtoad.com

Static marketing site for DebugToad, hosted on GitHub Pages at
[debugtoad.com](https://debugtoad.com).

No build step, no dependencies, no framework. Plain HTML, one stylesheet, one
small JS file. Edit a file, commit, push — that's the deploy.

## Local preview

```bash
python3 -m http.server 8000
# → http://127.0.0.1:8000
```

All paths are relative, so opening `index.html` directly from disk works too.

## Files

| Path | What it is |
|---|---|
| `index.html` | The landing page — hero, app showcase, features, gallery, studio, contact |
| `support.html` | Support / FAQ page (App Store requires a support URL) |
| `privacy.html` | Privacy policy (App Store requires a privacy URL) |
| `terms.html` | Terms of use |
| `404.html` | Served by GitHub Pages for unknown paths |
| `assets/css/styles.css` | Every style. Design tokens live at the top in `:root` |
| `assets/js/main.js` | Sticky header, mobile nav, copy-to-clipboard, footer year |
| `CNAME` | Custom domain for GitHub Pages — **do not delete** |
| `.nojekyll` | Tells Pages to serve files as-is instead of running Jekyll |
| `robots.txt`, `sitemap.xml` | Basic SEO |

## Dropping in the real images

Every image slot already ships a placeholder PNG at the exact final size.
**Overwrite the file, keep the name — no HTML changes needed.**

| File | Size | Used for |
|---|---|---|
| `assets/img/hero-phone.png` | 1170 × 2532 | Phone in the hero |
| `assets/img/app-hero.png` | 1170 × 2532 | Phone in the app showcase |
| `assets/img/shot-1.png` … `shot-4.png` | 1170 × 2532 | The four gallery screens |
| `assets/img/app-icon.png` | 512 × 512 | App icon (CSS rounds the corners) |
| `assets/img/og-image.png` | 1200 × 630 | Link preview for social / chat apps |
| `assets/img/apple-touch-icon.png` | 180 × 180 | iOS home-screen icon |
| `assets/img/logo-mark.png` | 128 × 128 | Header + footer logo |
| `assets/img/favicon.png` | 64 × 64 | Browser tab icon |
| `assets/img/mascot.png` | 65 × 67 | Pixel-art toad in the footer (drawn at 1:1, `image-rendering: pixelated`) |

1170 × 2532 is the iPhone 13/14 Pro screenshot size — the phone frame is drawn
in CSS at that aspect ratio, so simulator screenshots drop straight in. Other
portrait sizes work; they'll be centre-cropped.

If an image is ever missing, the slot falls back to a labelled dashed outline
instead of a broken-image icon.

### Store badges

The App Store / Google Play buttons in `index.html` are currently inline SVG
marked `aria-disabled="true"` ("Coming soon"). When the app ships, replace them
with the official badge artwork from Apple and Google — both require their own
badge art and have brand rules about size and spacing.

## Copy left to write

Placeholder copy is marked with `TODO(copy)` / `TODO(legal)` comments:

- Hero headline and lead
- App name, description and feature bullets (currently "Interval Timer")
- The three "What we care about" cards
- The studio paragraph
- `privacy.html` and `terms.html` are standard-form legal documents. Both
  should be read by counsel before the App Store submission. Three points in
  them are business decisions, not boilerplate:
  - the arbitration agreement and class action waiver (`terms.html` section 17);
  - the liability cap (`terms.html` section 13, currently the greater of the
    price paid or US$10);
  - the email-only contact blocks. Apple's minimum EULA terms call for a name,
    postal address, telephone number and email in a custom EULA, so this is a
    known deviation, taken so that a home address is not published. Once a
    virtual-office or registered-agent address exists, put the postal address
    and phone number back into `terms.html` section 21.

  `privacy.html` must also stay consistent with the Apple App Privacy and
  Google Play Data Safety declarations.

## Deploying

Pages serves whatever is on `main`:

```bash
git add -A && git commit -m "Update site" && git push
```

First-time setup, in **Settings → Pages** of the `debugtoad/main-website` repo:

1. **Source:** Deploy from a branch → `main` → `/ (root)`
2. **Custom domain:** `debugtoad.com` (the `CNAME` file already sets this)
3. Tick **Enforce HTTPS** once the certificate is issued (can take ~15 min)

DNS for the apex domain, at your registrar:

```
A     debugtoad.com   185.199.108.153
A     debugtoad.com   185.199.109.153
A     debugtoad.com   185.199.110.153
A     debugtoad.com   185.199.111.153
CNAME www             debugtoad.github.io.
```

(Also add the four `AAAA` records from GitHub's docs if you want IPv6.)

## The contact address

`contact@debugtoad.com` appears in the hero, the contact section, the footer,
and on every sub-page. GitHub Pages only serves files — it cannot receive mail —
so the address needs a mail route of its own. Cloudflare Email Routing and
ImprovMX both forward a custom-domain address to an existing inbox for free,
which is enough for a support address.

To change the address, search and replace `contact@debugtoad.com` across
`*.html`.
