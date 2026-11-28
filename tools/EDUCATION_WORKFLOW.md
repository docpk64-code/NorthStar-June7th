# NorthStar Facts & Education workflow

This implementation is an unpublished branch for clinical and editorial review. All six starter articles have `status: draft`. No clinician authorship, clinical review, publication date, or publication is claimed.

Open `northstar-article-writer.html` on your own computer. It has no network dependencies. Choose a starter article or New article, write in plain text, review the preview, and export JSON. Changes can also save in that browser's storage; exported files are the durable backup. Do not use the writer for patient information. It is an offline drafting tool, not an authenticated online CMS and not a direct publishing interface.

Bring the exported draft back for inclusion in the website. A maintainer runs `node scripts/import-education-draft.mjs /path/to/draft.json`. Existing slugs require intentional `--replace`. Imports reset publication/review metadata and always remain drafts.

Article records live in `src/data/education.json`. The website discovers article routes from that file. After actual editorial/clinical approval, set status to published and record an actual publication date; record reviewedBy and reviewedAt only if that named person really performed that review. Do not update dates merely to make an article look newer. The prebuild script synchronizes published article URLs into the sitemap; prerender discovers published routes. Draft routes use noindex and no canonical. The production build removes draft article records from the public JavaScript bundle; local development previews can show them for review. The offline writer is excluded from the deployable output. Do not deploy this branch until the release content is cleared.

The public library includes topic filters, text search, article cards, reading-time estimates, per-article sources, related articles, a clinical-review field, treatment links, a contact action, and article/breadcrumb structured data for published records. Search and filters retain real article links; unknown article URLs use the existing 404 route. A short homepage preview and header/footer links expose the library. Treatment pages link to relevant articles.

Before publishing, run the route checks, TypeScript, production build and prerender, and verify links and metadata on the hosted site. The private writer stays under tools, outside the Vite dist output. A later authenticated CMS could replace the export/import step after its service and access are configured; no fake login is included.
