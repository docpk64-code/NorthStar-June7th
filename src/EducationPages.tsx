import { useEffect, useState } from 'react';
import { PageLayout } from './PageLayout';
import SiteLink from './components/SiteLink';
import { EducationCard } from './components/EducationCards';
import { articles, categories, articlePath, readingMinutes, type EducationArticle } from './data/education';
import { SITE_ORIGIN } from './utils/urls';
import './styles/education.css';

function ArticleSchema({article:a}:{article:EducationArticle}){
 useEffect(()=>{
  if(a.status !== 'published')return;
  const url=SITE_ORIGIN+articlePath(a.slug);const script=document.createElement('script');script.id='schema-education';script.type='application/ld+json';
  script.textContent=JSON.stringify({'@context':'https://schema.org','@graph':[
   {'@type':'Article',headline:a.title,description:a.summary,mainEntityOfPage:url,url,author:{'@type':'Organization',name:'NorthStar Implant Dentistry',url:SITE_ORIGIN+'/about/'},publisher:{'@id':SITE_ORIGIN+'/#organization'},...(a.publishedAt?{datePublished:a.publishedAt}:{}),...(a.updatedAt?{dateModified:a.updatedAt}:{})},
   {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_ORIGIN+'/'},{'@type':'ListItem',position:2,name:'Facts & Education',item:SITE_ORIGIN+'/education/'},{'@type':'ListItem',position:3,name:a.title,item:url}]}
  ]});document.head.appendChild(script);
  return()=>script.remove();
 },[a]);return null;
}
export function EducationLibraryPage(){
 const [category,setCategory]=useState('All topics');const [search,setSearch]=useState('');
 const filtered=articles.filter(a=>(category==='All topics'||a.category===category)&&[a.title,a.summary,a.lede,...a.sections.flatMap(s=>[s.heading,...s.paragraphs])].join(' ').toLowerCase().includes(search.trim().toLowerCase()));
 return <PageLayout kicker="Facts & Education" title="The NorthStar Learning Center" subtitle="Clear answers about dental implants, everyday care, and oral health." description="Explore NorthStar’s short educational articles on dental implants, full-arch treatment, maintenance, and oral and general health." noindex={articles.every(a=>a.status!=='published')} ctaLabel="Ask us about your care" ctaHref="/contact/#consultation">
  {articles.some(a=>a.status!=='published')&&<aside className="edu-review" aria-label="Editorial review status"><strong>Preview for clinical review.</strong> These starter articles are drafts. They have not been published or clinically reviewed by Dr. Kampf.</aside>}
  <section className="page-section edu-library" aria-labelledby="edu-library-title"><div className="edu-heading"><div><p className="page-kicker">Explore at your own pace</p><h2 id="edu-library-title">What would you like to understand?</h2></div><label className="edu-search">Search articles<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Try healing, cleaning, or diabetes"/></label></div>
  <div className="edu-filters" role="group" aria-label="Filter articles by topic">{categories.map(c=><button key={c} type="button" aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
  <p className="edu-results" role="status">{filtered.length} {filtered.length===1?'article':'articles'}{category!=='All topics'?` in ${category}`:''}</p>
  <div className="edu-grid">{filtered.map(a=><EducationCard key={a.slug} article={a}/>)}</div>
  {filtered.length===0&&<div className="edu-empty"><h3>No matching articles yet.</h3><p>Try a different search or browse all topics.</p><button type="button" onClick={()=>{setCategory('All topics');setSearch('')}}>Show all articles</button></div>}
  </section><section className="page-section edu-about"><h2>Education for a more informed conversation.</h2><p>Our aim is to answer the questions patients bring to an implant consultation. Articles distinguish general information from your individual care plan and link to the sources behind clinical points.</p><p>Read a topic, note your questions, then discuss what applies to you with your treating clinician. Articles do not diagnose a condition or replace an examination.</p><SiteLink className="edu-browse" href="/about/">Meet the NorthStar team</SiteLink></section>
 </PageLayout>;
}
export function EducationArticlePage({slug}:{slug:string}){
 const a=articles.find(a=>a.slug===slug)!;
 return <PageLayout kicker={a.category} title={a.title} subtitle={a.summary} description={a.summary} noindex={a.status!=='published'} ctaLabel="Discuss your questions" ctaHref="/contact/#consultation">
  <ArticleSchema article={a}/><nav className="edu-breadcrumb" aria-label="Article breadcrumb"><SiteLink href="/education/">Facts &amp; Education</SiteLink><span aria-hidden="true"> / </span><span>{a.category}</span></nav>
  <div className="edu-reading-layout"><article className="page-section edu-article">
   <div className="edu-meta"><span>NorthStar Implant Dentistry</span><span>{readingMinutes(a)} min read</span>{a.status==='published'&&a.publishedAt&&<span>Published <time dateTime={a.publishedAt}>{a.publishedAt}</time></span>}</div>
   {a.status!=='published'?<aside className="edu-review"><strong>Draft — clinical review pending.</strong> Prepared for Dr. Kampf’s review. No clinician authorship or review is claimed.</aside>:a.reviewedBy&&a.reviewedAt?<p className="edu-meta">Clinically reviewed by {a.reviewedBy} on <time dateTime={a.reviewedAt}>{a.reviewedAt}</time>.</p>:null}
   <p className="edu-lede">{a.lede}</p><aside className="edu-takeaway"><h2>The key point</h2><p>{a.takeaway}</p></aside>
   {a.sections.map((s,i)=><section key={s.heading} id={`article-section-${i}`} className="edu-article-section"><h2>{s.heading}</h2>{s.paragraphs.map(p=><p key={p}>{p}</p>)}{s.items&&<ul>{s.items.map(p=><li key={p}>{p}</li>)}</ul>}{s.sourceIndices.length>0&&<p className="edu-inline-sources">Sources: {s.sourceIndices.map((n,i)=><span key={n}>{i>0?', ':''}<a href={a.sources[n-1].url} target="_blank" rel="noopener noreferrer" aria-label={`Source ${n}: ${a.sources[n-1].label}`}>[{n}]</a></span>)}</p>}</section>)}
   <section className="edu-sources" id="article-sources"><h2>Sources &amp; further reading</h2><ol>{a.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ol></section><p className="edu-notice">General education only. Your treatment, instructions, timing, and costs depend on your assessment and individual plan.</p>
  </article><aside className="edu-sidebar" aria-label="Article navigation"><p className="edu-category">In this article</p><nav>{a.sections.map((s,i)=><a key={s.heading} href={`#article-section-${i}`}>{s.heading}</a>)}</nav><div className="edu-sidebar-care"><h2>Make it personal.</h2><p>Bring your questions to an evaluation.</p><SiteLink href={a.treatment.href}>{a.treatment.label}</SiteLink><SiteLink href="/contact/#consultation">Request a consultation</SiteLink></div></aside></div>
  <section className="page-section edu-related"><h2>Keep exploring</h2><div className="edu-grid">{a.related.map(slug=>articles.find(a=>a.slug===slug)).filter((a):a is EducationArticle=>Boolean(a)).slice(0,3).map(a=><EducationCard key={a.slug} article={a}/>)}</div><SiteLink className="edu-browse" href="/education/">Back to all articles</SiteLink></section>
 </PageLayout>;
}
