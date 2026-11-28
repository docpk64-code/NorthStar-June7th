import data from './education.json';
export type EducationArticle = {
  slug:string; title:string; summary:string; category:string; lede:string; takeaway:string;
  sections:{heading:string;paragraphs:string[];items?:string[];sourceIndices:number[]}[];
  sources:{label:string;url:string}[]; treatment:{label:string;href:string}; related:string[];
  status:string; publishedAt?:string; updatedAt?:string; reviewedBy?:string; reviewedAt?:string;
};
export const articles: EducationArticle[] = data;
export const articlePath = (slug:string) => `/education/${slug}/`;
export const categories = ['All topics', ...new Set(articles.map(a=>a.category))];
export function readingMinutes(a:EducationArticle){return Math.max(1,Math.ceil([a.lede,a.takeaway,...a.sections.flatMap(s=>[s.heading,...s.paragraphs,...s.items??[]])].join(' ').split(/\s+/).length/200));}
