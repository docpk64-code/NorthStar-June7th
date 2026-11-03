import { useEffect, useRef, useState } from 'react';
import { PageLayout } from './PageLayout';
import data from './data/intake.json';
import './styles/intake.css';

type Field = {id:string;label:string;type:string;required?:boolean;choices?:string[];exclusive?:string[];followup?:boolean;detailOn?:string[];detailLabel?:string;showIf?:{id:string;values:string[]}};
type Medicine = {name:string;dose:string;frequency:string;reason:string};
type Values = Record<string,string|string[]>;
const pdf='/forms/consents/NorthStar_New_Patient_Packet_Fillable.pdf';
export default function IntakePage(){
 const [step,setStep]=useState(0),[values,setValues]=useState<Values>({}),[medicines,setMedicines]=useState<Medicine[]>([{name:'',dose:'',frequency:'',reason:''}]),[message,setMessage]=useState('');
 const title=useRef<HTMLHeadingElement>(null);
 const fields=data.sections.flatMap(s=>s.fields as Field[]);
 const visible=(f:Field)=>!f.showIf||f.showIf.values.includes(String(values[f.showIf.id]||''));
 const missing=fields.filter(f=>f.required&&visible(f)&&(!values[f.id]||(Array.isArray(values[f.id])?(values[f.id] as string[]).length===0:!String(values[f.id]).trim())));
 for(const f of fields){
  if(visible(f)&&f.followup&&(f.detailOn||['Yes','Not sure']).includes(String(values[f.id]))&&!String(values[f.id+'_detail']||'').trim())missing.push({...f,label:f.label+' - please add details or write not sure'});
 }
 if(values.takes_medicines==='Yes'&&!medicines.some(m=>m.name.trim()))missing.push({...fields.find(f=>f.id==='medication_list')!,label:'Add a medicine name, or note in Additional medication information that you will bring a list'});
 if(values.medication_extra&&missing[missing.length-1]?.id==='medication_list')missing.pop();
 if(values.allergy_status==='Yes'&&!String(values.allergy_details||'').trim())missing.push({...fields.find(f=>f.id==='allergy_details')!,label:'Describe your allergy and reaction, or write not sure'});
 const set=(id:string,value:string|string[])=>{setValues(v=>({...v,[id]:value}));setMessage('');};
 const go=(index:number)=>{setStep(index);setMessage('');requestAnimationFrame(()=>title.current?.focus());};
 useEffect(()=>{
  const dirty=Object.values(values).some(v=>Array.isArray(v)?v.length:!!v)||medicines.some(m=>Object.values(m).some(Boolean));
  const warn=(e:BeforeUnloadEvent)=>{e.preventDefault();e.returnValue='';};
  if(dirty)window.addEventListener('beforeunload',warn);
  return()=>window.removeEventListener('beforeunload',warn);
 },[values,medicines]);
 const toggle=(f:Field,choice:string)=>{
  const current=(values[f.id] as string[])||[];
  const next=current.includes(choice)?current.filter(x=>x!==choice):f.exclusive?.includes(choice)?[choice]:[...current.filter(x=>!f.exclusive?.includes(x)),choice];
  set(f.id,next);
 };
 const print=()=>{
  if(missing.length&&!window.confirm(`${missing.length} required answers are still missing. Print an incomplete copy to review with your clinician?`)){setMessage('Please answer the items listed in Review, or print an incomplete copy for assistance.');return;}
  window.print();
 };
 const renderField=(f:Field)=>{
  if(!visible(f))return null;
  const value=values[f.id]||''; const id='intake-'+f.id;
  const hint=f.required?' (required)':'';
  let control;
  if(f.type==='radio'||f.type==='checkboxes')control=<fieldset className="intake-field" key={id}><legend>{f.label}{hint}</legend><div className="intake-choices">{f.choices?.map(choice=><label key={choice}><input type={f.type==='radio'?'radio':'checkbox'} name={id} value={choice} checked={f.type==='radio'?value===choice:Array.isArray(value)&&value.includes(choice)} onChange={()=>f.type==='radio'?set(f.id,choice):toggle(f,choice)}/><span>{choice}</span></label>)}</div><p className="intake-answer">{Array.isArray(value)?value.join('; ')||'Not answered':value||'Not answered'}</p></fieldset>;
  else if(f.type==='medications')control=<div className="intake-field" key={id}><h3>{f.label}</h3><p>Include dose and how often you take it. If unsure, write “not sure” and bring your list or medicine bottles.</p>{medicines.map((med,i)=><fieldset className="intake-medicine" key={i}><legend>Medicine {i+1}</legend><div className="intake-grid">{(['name','dose','frequency','reason'] as const).map(key=><label key={key}>{({name:'Medicine / supplement name',dose:'Dose / strength',frequency:'How often / route',reason:'Reason for taking it'})[key]}<input autoComplete="off" value={med[key]} onChange={e=>{const v=e.target.value;setMedicines(ms=>ms.map((m,n)=>n===i?{...m,[key]:v}:m));}}/><span className="intake-answer">{med[key]||'Not provided'}</span></label>)}</div>{medicines.length>1&&<button className="intake-remove" type="button" onClick={()=>setMedicines(ms=>ms.filter((_,n)=>n!==i))}>Remove medicine {i+1}</button>}</fieldset>)}<button className="intake-secondary" type="button" onClick={()=>setMedicines(ms=>[...ms,{name:'',dose:'',frequency:'',reason:''}])}>+ Add another medicine</button></div>;
  else control=<div className="intake-field" key={id}><label htmlFor={id}>{f.label}{hint}</label>{f.type==='textarea'?<textarea id={id} rows={3} autoComplete="off" value={String(value)} onChange={e=>set(f.id,e.target.value)}/>:<input id={id} type={f.type} autoComplete="off" value={String(value)} onChange={e=>set(f.id,e.target.value)}/>}<p className="intake-answer">{String(value)||'Not provided'}</p></div>;
  const showDetail=f.followup&&(f.detailOn||['Yes','Not sure']).includes(String(value));
  return <div key={id} className={f.type==='text'||f.type==='date'||f.type==='email'||f.type==='tel'?'intake-short':'intake-wide'}>{control}{showDetail&&<div className="intake-followup"><label htmlFor={id+'-detail'}>{f.detailLabel||'Please explain (required; write not sure if needed)'}</label><textarea id={id+'-detail'} autoComplete="off" rows={2} value={String(values[f.id+'_detail']||'')} onChange={e=>set(f.id+'_detail',e.target.value)}/><p className="intake-answer">{String(values[f.id+'_detail']||'Details to discuss with clinician')}</p></div>}</div>;
 };
 return <PageLayout kicker="Patient forms" title={data.title} subtitle="One guided form for your first NorthStar visit." description="Complete your NorthStar registration, dental and medical history, then print and bring a copy for review.">
 <div className="intake-app">
 <aside className="intake-notice"><strong>Complete here. Print or save. Bring to your visit.</strong><p>Your answers are not sent to NorthStar or saved by this website. Leaving or refreshing clears them. Use a trusted device and keep any saved copy private. Sign on paper after your questions are answered.</p><div className="intake-tools"><a href={pdf} download>Download fillable PDF</a><a href="/patient-forms/">All patient forms</a></div></aside>
 <div className="intake-print-heading"><h1>NorthStar Implant Dentistry, P.C.</h1><h2>{data.title}</h2><p>Briarwood · Manhattan · Commack · Brooklyn (opening January 4, 2027)</p><p>Revision: {data.revision} · {missing.length?`INCOMPLETE: ${missing.length} required answers missing - review with patient.`:'Required history answers completed - clinician review still required.'}</p></div>
 <nav className="intake-steps" aria-label="Form sections">{data.sections.map((s,i)=><button key={s.id} type="button" aria-current={step===i?'step':undefined} onClick={()=>go(i)}><span>{i+1}</span>{s.title}</button>)}</nav>
 <p className="intake-progress" aria-live="polite">Section {step+1} of {data.sections.length} · {missing.length} required answers remaining</p>
 <form onSubmit={e=>e.preventDefault()}>
 {data.sections.map((s,i)=><section key={s.id} className="intake-section" data-active={step===i} aria-label={s.title}>
 <h2 ref={step===i?title:undefined} tabIndex={-1}>{i+1}. {s.title}</h2><p className="intake-intro">{s.intro}</p>
 {s.id==='review'&&<>
 <div className="intake-review"><h3>{missing.length?'Please review unanswered items':'Your required history answers are complete'}</h3><p>This is a preparation form. Your clinician will review your answers before treatment. Check previous sections using the buttons above.</p>{missing.length>0&&<details open><summary>{missing.length} items need attention</summary><ul>{missing.map(f=><li key={f.id}><button type="button" onClick={()=>go(data.sections.findIndex(s=>s.fields.some(x=>x.id===f.id)))}>{f.label}</button></li>)}</ul></details>}</div>
 <div className="intake-policies"><h3>Consent for care and use of information</h3>{data.consent.slice(1).map((p,n)=><p key={n}>{p}</p>)}<h3>Financial policy</h3>{data.financial.slice(1).map((p,n)=><p key={n}>{p}</p>)}<p>Our team will confirm any applicable cancellation fee or surgical deposit with you before scheduling. See <a href="/patient-forms/#financial-policy">The NS UPFRONT™ Contract (Financial Policy)</a> and <a href="/patient-forms/hipaa/">Notice of Privacy Practices</a>. Ask our team about any inconsistency before signing.</p><p>Calls, texts and email may be used for appointments, results, treatment plans, and billing according to your preferences below. Message and data rates may apply; reply STOP to stop texts. You may update these preferences with our team.</p></div>
 </>}
 <div className="intake-grid">{(s.fields as Field[]).map(renderField)}</div>
 {s.id==='review'&&<><div className="intake-signature"><p>Signature of patient / legal representative: __________________________________</p><p>Date / time: _____________________ Witness (optional): _____________________</p><p>Sign on paper after questions have been answered. No electronic signature is collected here.</p></div><div className="intake-office"><h3>Office use - clinician review</h3><p>{data.officeReview.map(x=>'[ ] '+x).join(' · ')}</p><p>Reviewed by: __________________ Date / time: ______________ Next update: __________</p><p>Notes / follow-up before treatment: ____________________________________________</p><p>Reconfirm health history at each surgical visit and update the record when health or medicines change.</p></div></>}
 </section>)}
 <div className="intake-bottom"><p role="status">{message}</p><div className="intake-actions">{step>0&&<button className="intake-secondary" type="button" onClick={()=>go(step-1)}>Back</button>}{step<data.sections.length-1?<button type="button" onClick={()=>{const sectionMissing=missing.filter(f=>data.sections[step].fields.some(x=>x.id===f.id));if(sectionMissing.length){setMessage(`Please answer ${sectionMissing.length} required items in this section. Use Not sure where available, or use the section navigation to continue and review later.`);return;}go(step+1);}}>Continue →</button>:<button type="button" onClick={print}>Print / Save completed form</button>}<button className="intake-secondary" type="button" onClick={()=>{if(window.confirm('Clear all answers? Unsaved entries will be removed.')){setValues({});setMedicines([{name:'',dose:'',frequency:'',reason:''}]);go(0);}}}>Clear answers</button></div></div>
 </form></div>
 </PageLayout>;
}
