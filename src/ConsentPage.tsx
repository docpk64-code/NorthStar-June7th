import { useState } from 'react';
import { PageLayout } from './PageLayout';
import consents from './data/consents.json';
const styles = `
.consent-tools{display:flex;flex-wrap:wrap;gap:12px;margin:20px 0}.consent-tools a,.consent-tools button{display:inline-block;padding:12px 18px;border-radius:8px;border:1px solid #96701f;background:#f1d58e;color:#182f44!important;font:600 15px system-ui;cursor:pointer}
.consent-help{padding:24px;background:#f4f7fa;color:#203b51;border-left:4px solid #bd963c;border-radius:10px}.consent-help p{line-height:1.7}
.consent-scroll{overflow-x:auto;margin:28px 0;background:#dce3e9;padding:16px}
.consent-sheet{position:relative;width:816px;height:1056px;margin:0 auto;background:white;color:#111;container-type:inline-size}
.consent-sheet img{display:block;width:100%;height:100%}.consent-widget{position:absolute;box-sizing:border-box;margin:0;padding:0;min-width:0;min-height:0;z-index:1}
.consent-widget input,.consent-widget textarea{box-sizing:border-box;width:100%;height:100%;margin:0;padding:0 2px;border:0;border-radius:0;background:transparent;box-shadow:none;text-shadow:none;letter-spacing:normal;color:#102b43;font:1.47cqw/1.12 Arial,sans-serif;resize:none}
.consent-widget input[type=checkbox]{appearance:none;padding:0;cursor:pointer}.consent-widget input[type=checkbox]:checked{background:#193b58}.consent-widget input[type=checkbox]:checked:after{content:'✓';display:block;color:white;line-height:1;font-size:1.35cqw;text-align:center}
.consent-widget :focus-visible{outline:2px solid #0073c4;outline-offset:-2px}.consent-output{display:none}.consent-transcript{white-space:pre-wrap;line-height:1.65}.consent-page-label{font-weight:700;margin:12px 0}
@media print{
 @page{size:letter portrait;margin:0}
 html,body,#root,.page-root,.page-body{margin:0!important;padding:0!important;background:white!important;max-width:none!important;width:auto!important}
 .page-root>:not(.page-body),.consent-no-print{display:none!important}
 .consent-scroll{overflow:visible;padding:0;margin:0;background:white;break-after:page;page-break-after:always}
 .consent-scroll:last-child{break-after:auto;page-break-after:auto}
 .consent-sheet{width:8.5in;height:11in;margin:0;break-inside:avoid}
 .consent-widget input,.consent-widget textarea{display:none}
 .consent-output{display:block;width:100%;height:100%;box-sizing:border-box;white-space:pre-wrap;overflow:hidden;overflow-wrap:anywhere;font:1.47cqw/1.12 Arial,sans-serif;padding:0 2px;color:black}
 .consent-output.check{text-align:center;padding:0;font-size:1.35cqw;line-height:1}
}
`;
export default function ConsentPage({slug}:{slug:string}){
 const consent=consents.find(item=>item.slug===slug)!;
 const isPacket=slug==='new-patient';
 const [values,setValues]=useState<Record<string,string|boolean>>({});
 const [message,setMessage]=useState('');
 const update=(name:string,value:string|boolean)=>setValues(old=>({...old,[name]:value}));
 const print=()=>{
  const images=Array.from(document.querySelectorAll<HTMLImageElement>('.consent-sheet img'));
  if(images.some(img=>!img.complete||img.naturalWidth===0)){setMessage('Please wait for all pages to load before printing. If a page does not load, use Download Fillable PDF.');return;}
  const overflowing=Array.from(document.querySelectorAll<HTMLInputElement|HTMLTextAreaElement>('.consent-widget input[type=text],.consent-widget textarea')).some(el=>el.scrollWidth>el.clientWidth+2||el.scrollHeight>el.clientHeight+2);
  if(overflowing){setMessage('An entry is longer than its field. Please shorten it or discuss the extra information with your clinician before printing.');return;}
  setMessage('');window.print();
 };
 return <PageLayout kicker={isPacket ? "New patient forms" : "Patient consent forms"} title={consent.title} subtitle={isPacket ? "Registration, dental history and medical history in one packet." : "Review your consent form and prepare a copy for your visit."} description={`Read, download or fill out the NorthStar form: ${consent.title}. Print your completed form for discussion with your clinician.`}>
  <style>{styles}</style>
  <div className="consent-help consent-no-print"><h2>Review, complete, and bring to your visit</h2><p>This is the full {consent.pages.length}-page form supplied by our practice. {isPacket ? "Complete your registration, dental history and medical history below. Include your current medicines and allergies; bring a separate list if you need more space. Leave office-use fields for our team." : "Fill in the appropriate fields below. Leave treatment details you are unsure about and office-use fields for your clinician."} Initial only statements you understand and have discussed. Signatures should be completed after your questions have been answered; signature lines remain blank in this online preparation version.</p><p><strong>Your entries are not submitted or stored by this form.</strong> Leaving or refreshing clears them. Print or save a copy on a device you trust, and bring it to your appointment. Do not send completed forms through the general contact form.</p><p>On a small screen, scroll sideways to see the complete page. For more convenient editing, download the fillable PDF and open it in a PDF reader.</p><div className="consent-tools"><a href={consent.pdf} download>Download Fillable PDF · {consent.pages.length} pages</a><button type="button" onClick={print}>Print / Save completed form</button><button type="button" onClick={()=>{if(window.confirm('Clear all entries on this form?')){setValues({});setMessage('');}}}>Clear entries</button><a href={isPacket ? "/patient-forms/#new-patient-forms" : "/patient-forms/#consent-forms"}>Back to Patient Forms</a></div><p role="status">{message}</p></div>
  <div>{consent.pages.map((page,index)=><div className="consent-scroll" key={page.image}><p className="consent-page-label consent-no-print">Page {index+1} of {consent.pages.length}</p><details className="consent-no-print"><summary>Read page {index+1} as text</summary><div className="consent-transcript">{page.text}</div></details><div className="consent-sheet" aria-label={`Form page ${index+1}`}><img src={page.image} alt={`Original form page ${index+1}; full text is available above`} width={1224} height={1584}/>{page.fields.filter(field=>!field.handSign).map(field=>{
   const id=`consent-${slug}-${field.name}`;const val=values[field.name];const label=`Page ${index+1}: ${field.label} (${field.name.replaceAll('_',' ')})`;
   return <div className="consent-widget" key={field.name} style={{left:`${field.x/612*100}%`,top:`${field.y/792*100}%`,width:`${field.width/612*100}%`,height:`${field.height/792*100}%`}}>
    {field.type==='checkbox'?<input id={id} type="checkbox" aria-label={label} title={label} checked={val===true} onChange={event=>update(field.name,event.target.checked)}/>:field.multiline?<textarea id={id} aria-label={label} title={label} autoComplete="off" spellCheck={false} value={typeof val==='string'?val:''} onChange={event=>update(field.name,event.target.value)}/>:<input id={id} type="text" aria-label={label} title={label} autoComplete="off" spellCheck={false} value={typeof val==='string'?val:''} onChange={event=>update(field.name,event.target.value)}/>}
    <span className={`consent-output ${field.type==='checkbox'?'check':''}`}>{field.type==='checkbox'?(val===true?'✓':''):(typeof val==='string'?val:'')}</span>
   </div>;
  })}</div></div>)}</div>
 </PageLayout>;
}
