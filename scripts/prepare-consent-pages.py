"""Extract existing PDF widgets and render exact page backgrounds for local-only filling.
The original downloadable PDFs are never rewritten.
Requires pypdf and Poppler (pdftoppm).
"""
from pathlib import Path
import json,subprocess,html
from pypdf import PdfReader
root=Path(__file__).resolve().parents[1]
items=[('all-on-x','Full-Arch Implant Treatment (All-on-X)','NorthStar_AllOnX_FullArch_Consent_Fillable.pdf'),('subperiosteal','Patient-Specific / Subperiosteal Implant','NorthStar_Subperiosteal_PSI_Consent_Fillable.pdf')]
result=[]
for slug,title,filename in items:
 path=root/'public/forms/consents'/filename;r=PdfReader(path);pages=[]
 subprocess.run(['pdftoppm','-r','144','-png',str(path),str(path.parent/slug)],check=True)
 for n,page in enumerate(r.pages,1):
  fields=[]
  for ref in page.get('/Annots',[]):
   a=ref.get_object()
   if a.get('/Subtype')!='/Widget':continue
   assert a.get('/T') in r.get_fields()
   x1,y1,x2,y2=map(float,a['/Rect']);name=str(a['/T'])
   fields.append({'name':name,'label':html.unescape(str(a.get('/TU',name))).replace('_',' '),'type':'checkbox' if a['/FT']=='/Btn' else 'text','multiline':bool(int(a.get('/Ff',0))&4096),'handSign':name in ['sig_patient','sig_interpreter','sig_witness','sig_surgeon','sig_asst'],'x':x1,'y':792-y2,'width':x2-x1,'height':y2-y1})
  pages.append({'image':f'/forms/consents/{slug}-{n}.png','text':page.extract_text().replace('\x7f','•'),'fields':fields})
 assert sum(len(p['fields']) for p in pages)==len(r.get_fields())
 result.append({'slug':slug,'title':title,'pdf':f'/forms/consents/{filename}','pages':pages})
(root/'src/data/consents.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print('Prepared 10 exact page backgrounds and 259 matching PDF widgets.')
