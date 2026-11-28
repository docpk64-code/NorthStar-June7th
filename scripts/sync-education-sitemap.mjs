import { readFileSync, writeFileSync } from 'node:fs';
const articles=JSON.parse(readFileSync('src/data/education.json','utf8'));
const published=articles.filter(a=>a.status==='published');
let sitemap=readFileSync('public/sitemap.xml','utf8').replace(/^.*<loc>https:\/\/northstarimplants\.com\/education\/.*\n/gm,'');
const entries=published.length?['/education/',...published.map(a=>`/education/${a.slug}/`)]:[];
sitemap=sitemap.replace('</urlset>',entries.map(p=>`  <url><loc>https://northstarimplants.com${p}</loc></url>`).join('\n')+(entries.length?'\n':'')+'</urlset>');
writeFileSync('public/sitemap.xml',sitemap);
console.log(`Education sitemap synchronized: ${published.length} published articles; drafts excluded.`);
