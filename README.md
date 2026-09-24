# BotanicExtract — Corporate Website

Static marketing website for **BotanicExtract**, the export brand of Xi'an Yuanqingyuan Technology Co., Ltd. — a supplier of botanical extracts for the dietary supplement and natural health industry.

Built as plain HTML, CSS and JavaScript. No build step, no framework, no dependencies to install. Upload the files and it runs.

---

## Structure

```
/
├── index.html                  Home
├── about.html                  About us
├── quality.html                Quality & compliance
├── contact.html                Contact & quotation form
├── 404.html                    Not-found page
├── robots.txt
├── sitemap.xml
├── favicon.svg                 (legacy, unused — favicon is now assets/favicon.png)
├── assets/
│   ├── css/style.css           All site styles
│   ├── js/main.js              Navigation toggle, footer year, active link
│   ├── js/chatbot.js           AI chat widget + knowledge base (edit KB at top to add Q&A)
│   ├── logo.png                Brand logo (wreath-and-drop emblem, 256px)
│   ├── favicon.png             Favicon (64px, from the brand emblem)
│   └── img/                    Images (placeholders currently live in the markup)
├── products/
│   ├── index.html              Product overview
│   ├── astragalus-extract.html
│   ├── milk-thistle-extract.html
│   ├── ginkgo-biloba-extract.html
│   ├── berberine-hcl.html
│   └── rhodiola-rosea-extract.html
└── blog/
    ├── index.html              Article list
    ├── how-to-evaluate-a-botanical-extract-supplier.html
    └── ginkgolic-acid-limit-ginkgo-extract.html
```

## Local preview

Open `index.html` in any browser. No server required.

For a more accurate local preview:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deployment

Hosted on **Cloudflare Pages** (global CDN, no ICP filing required for overseas hosting).

1. Upload the contents of this folder to a GitHub repository.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository. Build command: leave empty. Output directory: `/`.
4. Deploy, then attach the custom domain `botanicextract.com`.

> **Important:** before pointing the domain at Cloudflare, all existing DNS records for the domain must be recreated in Cloudflare, otherwise email hosted on the domain will stop working. The record list is maintained separately.

---

## To do before launch

### 1. Replace image placeholders

Every image position in the markup is currently a placeholder:

```html
<div class="ph ph-4x3">Astragalus root</div>
```

Replace with a real image, for example:

```html
<img src="../assets/img/astragalus-root.jpg" alt="Astragalus root extract powder" width="1200" height="900">
```

Guidelines: width 1200–1600 px, under 200 KB per image, WebP preferred where supported.

### 2. Enquiry form endpoint (done 2026-09-20)

`contact.html` submits to Formspree form **xdekeobl** (account: hunter@botanicextract.com):

```html
<form class="enquiry" action="https://formspree.io/f/xdekeobl" method="POST">
```

Free plan covers 50 submissions per month; upgrade in the Formspree dashboard when needed (the id stays the same, no code change).

### 3. Check legal and company details

- Legal entity name in the footer: `Xi'an Yuanqingyuan Technology Co., Ltd.`
- Contact email: `hunter@botanicextract.com`
- Certification wording on `quality.html` — keep it accurate. Do not claim a certificate that is not yet in hand.

---

## Adding a blog post

1. Copy an existing article in `blog/` and rename the file, e.g. `blog/my-new-article.html`.
2. Update the `<title>`, meta description, canonical URL and the article body.
3. Add a `<li>` entry to the post list in `blog/index.html`.
4. Add the URL to `sitemap.xml`.
5. Commit the changes — Cloudflare Pages redeploys automatically.

## Notes

- All internal links are relative, so the site works from any subdirectory as well as from the domain root.
- Each page carries its own title, meta description, canonical link and Open Graph tags.
- Structured data (Organization, Product, Article) is embedded per page type.
- Page weight target: home page under 300 KB, any single page under 1.5 MB.
