"""Generate the fillable companion to the guided intake using its shared content schema."""
import json, re, unicodedata
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.utils import simpleSplit
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'src/data/intake.json').read_text())
out=ROOT/'public/forms/consents/NorthStar_New_Patient_Packet_Fillable.pdf'
c=canvas.Canvas(str(out),pagesize=(612,792));c.setTitle('NorthStar - New Patient Registration and Health History');c.setAuthor('NorthStar Implant Dentistry, P.C.')
ink=HexColor('#172c42');gold=HexColor('#96701f');line=HexColor('#aab8c4')
y=0;page=0;section_name=''
def clean(s):
 return unicodedata.normalize('NFKD',s.replace('—','-').replace('–','-').replace('’',"'").replace('“','"').replace('”','"').replace('™',' (TM)').replace('•','-')).encode('ascii','ignore').decode()
def txt(s,x,y,size=10,bold=False):
 c.setFillColor(ink);c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString(x,y,clean(s))
def footer():
 txt('NorthStar | Confidential patient information | Rev. November 2026',36,27,8)
 txt(f'Page {page}',535,27,8)
def newpage():
 global y,page
 if page:footer();c.showPage()
 page+=1;y=717
 txt('NORTHSTAR IMPLANT DENTISTRY, P.C.',36,758,14,True)
 txt('Registration, Dental History & Medical History',36,740,10)
 c.setStrokeColor(gold);c.line(36,730,576,730)
 txt(section_name,36,y,12,True);y-=25
 # Identification on every page helps staff keep a printed packet together.
 txt('Patient name:',36,y,9);c.acroForm.textfield(name=f'page_{page}_patient',x=105,y=y-4,width=300,height=17,fontName='Helvetica',fontSize=10,borderWidth=.5,borderColor=line,fillColor=white,textColor=black,forceBorder=True)
 txt('DOB:',420,y,9);c.acroForm.textfield(name=f'page_{page}_dob',x=448,y=y-4,width=128,height=17,fontName='Helvetica',fontSize=10,borderWidth=.5,borderColor=line,fillColor=white,textColor=black,forceBorder=True);y-=30

def need(h):
 if y-h<52:newpage()
def paragraph(s,size=9.5):
 global y
 lines=simpleSplit(clean(s),'Helvetica',size,540)
 for t in lines:
  need(size+6);txt(t,36,y,size);y-=size+4
 y-=5

def textfield(name,label,multiline=False,height=None):
 global y
 lines=simpleSplit(clean(label),'Helvetica-Bold',9.5,540);h=height or (44 if multiline else 21)
 need(len(lines)*13+h+14)
 for t in lines:txt(t,36,y,9.5,True);y-=13
 c.acroForm.textfield(name=name,tooltip=clean(label),x=36,y=y-h,width=540,height=h,fontName='Helvetica',fontSize=10,borderWidth=.6,borderColor=line,fillColor=white,textColor=black,forceBorder=True,fieldFlags='multiline' if multiline else '')
 y-=h+15

def radio(f):
 global y
 choices=f['choices'];label=f['label']+(' *' if f.get('required') else '')
 compact=choices==['Yes','No','Not sure'] or choices==['Yes','No']
 if compact:
  lines=simpleSplit(clean(label),'Helvetica',9.5,335);h=max(21,len(lines)*12+6);need(h)
  for n,t in enumerate(lines):txt(t,36,y-n*12,9.5)
  x=386
  for n,ch in enumerate(choices):
   c.acroForm.radio(name=f['id'],tooltip=clean(f['label']),value='option_'+str(n),selected=False,x=x,y=y-3,size=11,buttonStyle='circle',borderWidth=.6,borderColor=ink,fillColor=white,textColor=ink)
   txt(ch,x+15,y,8.5);x+=57 if n==0 else 48
  y-=h
 else:
  lines=simpleSplit(clean(label),'Helvetica-Bold',9.5,540)
  need(len(lines)*13+45)
  for t in lines:txt(t,36,y,9.5,True);y-=13
  # Lay options out across the page and wrap only when needed.
  x=39
  for n,ch in enumerate(choices):
   width=c.stringWidth(clean(ch),'Helvetica',9)+24
   if x+width>576:x=39;y-=21;need(25)
   c.acroForm.radio(name=f['id'],tooltip=clean(f['label']),value='option_'+str(n),selected=False,x=x,y=y-3,size=11,buttonStyle='circle',borderWidth=.6,borderColor=ink,fillColor=white,textColor=ink)
   txt(ch,x+16,y,9);x+=width+10
  y-=28

def checks(f):
 global y
 paragraph(f['label']+(' *' if f.get('required') else ''),10)
 choices=f['choices'];cols=2 if max(len(x) for x in choices)<80 else 1
 for base in range(0,len(choices),cols):
  group=choices[base:base+cols]
  wrapped=[simpleSplit(clean(ch),'Helvetica',9.5,245 if cols==2 else 515) for ch in group]
  h=max(22,max(len(ls) for ls in wrapped)*12+8);need(h)
  for offset,(ch,lines) in enumerate(zip(group,wrapped)):
   x=38+offset*275
   c.acroForm.checkbox(name=f['id']+'_'+str(base+offset),tooltip=clean(ch),x=x,y=y-3,size=11,buttonStyle='check',borderWidth=.6,borderColor=ink,fillColor=white,textColor=ink)
   for k,t in enumerate(lines):txt(t,x+19,y-k*12,9.5)
  y-=h
 y-=5

def paired(fields):
 global y
 need(55)
 for n,f in enumerate(fields):
  x=36+n*275
  txt(f['label']+(' *' if f.get('required') else ''),x,y,9.5,True)
  c.acroForm.textfield(name=f['id'],tooltip=clean(f['label']),x=x,y=y-29,width=265,height=22,fontName='Helvetica',fontSize=10,borderWidth=.6,borderColor=line,fillColor=white,textColor=black,forceBorder=True)
 y-=46

for section in data['sections']:
 section_name=section['title']
 if not page or y<210:newpage()
 else:
  y-=12;txt(section_name,36,y,12,True);y-=24
 paragraph(section['intro'])
 if section['id']=='patient':paragraph('Office locations: Briarwood / Queens, Manhattan, Commack. Brooklyn opens January 4, 2027. Complete on a trusted device; keep saved copies private. Bring this packet to your visit. No online submission is provided by the website. * = requested answer; use Not sure or ask our team when you need help.')
 if section['id']=='review':
  for label,key in [('Consent for care and use of information','consent'),('Financial policy','financial')]:
   need(45);txt(label,36,y,11,True);y-=20
   for p in data[key][1:]:paragraph(p)
  paragraph('Our team will confirm any cancellation fee or surgical deposit before scheduling. Review The NS UPFRONT Contract (Financial Policy) and Notice of Privacy Practices; ask about any inconsistency before signing. Calls, texts and email may be used for appointments, results, treatment plans, and billing according to your preferences. Message and data rates may apply; reply STOP to stop texts. You may update your preferences with our team.')
 pending=[]
 for f in section['fields']:
  if f['type'] in ['text','date','tel','email'] and len(f['label'])<45:
   pending.append(f)
   if len(pending)==2:paired(pending);pending=[]
   continue
  if pending:paired(pending);pending=[]
  label=f['label']
  if f.get('showIf'):label='If applicable: '+label
  if f['type']=='radio':radio(f)
  elif f['type']=='checkboxes':checks(f)
  elif f['type']=='medications':
   paragraph('Current medicines / supplements: include dose, frequency / route, and reason. Use additional paper or bring a separate list if needed. Write none if you take no medicines.')
   for n in range(8):
    need(71);txt(f'Medicine {n+1}',36,y,10,True);y-=17
    for key,label,x,w in [('name','Name',36,170),('dose','Dose',214,90),('frequency','Frequency / route',312,130),('reason','Reason',450,126)]:
     txt(label,x,y,8);c.acroForm.textfield(name=f'med_{n}_{key}',tooltip=f'Medicine {n+1}: {label}',x=x,y=y-26,width=w,height=21,fontName='Helvetica',fontSize=9,borderWidth=.6,borderColor=line,fillColor=white,textColor=black,forceBorder=True)
    y-=42
  else:textfield(f['id'],label+(' *' if f.get('required') else ''),f['type']=='textarea')
 if pending:paired(pending)
 if any(f.get('followup') for f in section['fields']):
  textfield(section['id']+'_details','Details for answers needing follow-up: identify the question, dates, conditions, and treatment. Explain No to good general health. Use additional paper if needed.',True,75)
 if section['id']=='review':
  need(90);paragraph('Sign after your questions have been answered. Surgery and sedation require their own separate consent forms.')
  txt('Patient / legal representative signature: __________________________ Date / time: ___________',36,y,10);y-=30
  txt('Witness (optional): ______________________________ Date: ___________________',36,y,10);y-=30
  section_name='Office use - clinician review'
  need(290);txt(section_name,36,y,12,True);y-=24
  checks({'id':'office_review','label':'To be completed by the clinical team','choices':data['officeReview']})
  paired([{'id':'reviewer','label':'Reviewed by and date / time'},{'id':'next_update','label':'Next health history update due'}]);textfield('staff_notes','Notes / follow-up before treatment',True,45)
  paragraph('Scan into the patient chart. Reconfirm health history at each surgical visit and update whenever health or medications change.')
footer();c.save()
from pypdf import PdfReader
r=PdfReader(out);fields=r.get_fields() or {};assert len(fields)>200
for p in r.pages:
 for a in p.get('/Annots',[]):
  w=a.get_object()
  if w.get('/Subtype')=='/Widget':assert w.get('/AP'), 'Missing appearance'
print(f'Generated {len(r.pages)} pages; {len(fields)} canonical fillable fields: {out}')
