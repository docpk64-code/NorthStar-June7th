import assert from 'node:assert/strict';
import React, { act } from 'react';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<div id="root"></div>', {url:'https://northstarimplants.com/patient-forms/hipaa/'});
Object.assign(globalThis,{React,window:dom.window,document:dom.window.document,IS_REACT_ACT_ENVIRONMENT:true});
Object.defineProperty(globalThis,'navigator',{value:dom.window.navigator,configurable:true});
globalThis.IntersectionObserver = class { observe() {} disconnect() {} unobserve() {} } as any;
const {createRoot}=await import('react-dom/client');
const {default:Page}=await import('../src/ConsentPage');
const root=createRoot(document.getElementById('root')!);
await act(async()=>root.render(<Page slug="new-patient"/>));
const input=document.getElementById('consent-new-patient-first_name') as HTMLInputElement;
await act(async()=>{Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value')!.set!.call(input,'Example Patient');input.dispatchEvent(new window.Event('input',{bubbles:true}));});
assert.equal(input.parentElement?.querySelector('.consent-output')?.textContent,'Example Patient');
let printed=false;window.print=()=>{printed=true;};
const buttons=document.querySelectorAll('.consent-tools button');
await act(async()=>(buttons[0] as HTMLButtonElement).click());assert(!printed); // missing images must block incomplete print
for(const img of document.querySelectorAll('img')) {Object.defineProperty(img,'complete',{value:true});Object.defineProperty(img,'naturalWidth',{value:1224});}
await act(async()=>(buttons[0] as HTMLButtonElement).click());assert(printed);
const check=document.querySelector('input[type=checkbox]') as HTMLInputElement;
await act(async()=>check.click());assert.equal(check.parentElement?.querySelector('.consent-output')?.textContent,'✓');
assert.equal(document.querySelectorAll('.consent-sheet').length,4);
assert.equal(document.querySelectorAll('.consent-widget').length,246); // 124 PDF fields minus five handwritten signatures
assert.equal(document.querySelectorAll('button[type="submit"]').length,0);
assert.equal(window.localStorage.length,0);
assert(document.querySelector('a[download]')?.getAttribute('href')?.endsWith('.pdf'));
window.confirm=()=>true;
await act(async()=>(buttons[1] as HTMLButtonElement).click());assert.equal(input.value,'');assert(!check.checked);
await act(async()=>root.unmount());
console.log('PASS: all pages/fields present; text and checks print; incomplete image loading blocks print; clearing works; no submission/storage.');
