"""Generate the patient privacy packet from the same content used by the website."""
import json
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("NS", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("NS-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from xml.sax.saxutils import escape
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'src/data/hipaa.json').read_text())
out=ROOT/'public/forms/northstar-hipaa-notice-and-acknowledgment.pdf'
c=canvas.Canvas(str(out),pagesize=(612,792))
c.setTitle('NorthStar | Notice of Privacy Practices and Acknowledgment')
c.setAuthor('NorthStar Implant Dentistry')
navy=HexColor('#142c43'); gold=HexColor('#aa8232')
style=ParagraphStyle('body',fontName='NS',fontSize=10,leading=14,textColor=navy)
def para(text,y,size=10,bold=False):
    s=ParagraphStyle('p',parent=style,fontSize=size,leading=size*1.3,fontName='NS-Bold' if bold else 'NS')
    p=Paragraph(escape(text),s); w,h=p.wrap(508,700)
    p.drawOn(c,52,y-h)
    return y-h-5
def header(num,title):
    c.setFillColor(navy); c.rect(0,701,612,91,fill=1,stroke=0)
    c.setFillColor(white); c.setFont('NS-Bold',21); c.drawString(52,751,'NORTHSTAR')
    c.setFont('NS',10); c.drawString(52,733,'IMPLANT DENTISTRY  |  PATIENT PRIVACY')
    c.setFillColor(gold); c.rect(52,713,508,2,fill=1,stroke=0)
    c.setFillColor(navy); c.setFont('NS-Bold',18); c.drawString(52,674,title)
    c.setFont('NS',8); c.drawString(52,650,'NOTICE EFFECTIVE OCTOBER 14, 2026  •  NS-PRIVACY-01')
    c.setStrokeColor(gold); c.line(52,48,560,48)
    c.setFont('NS',8); c.drawString(52,33,'northstarimplants.com  |  (631) 315-1400'); c.drawRightString(560,33,f'{num} / 4')
for i,page in enumerate(data['pages'],1):
    header(i,page['title']); y=628
    if i==1: y=para(data['heading'],y,9,True)
    for section in page['sections']:
        y=para(section['title'],y,11,True)
        y=para(section['text'],y,9.5)
    assert y>55,(i,y)
    c.showPage()
header(4,'Acknowledgment of receipt')
y=para('Complete this page, print, sign by hand and bring it to your appointment. Keep pages 1–3 for your records. Fields can be completed electronically in a PDF reader.',625)
y=para(data['acknowledgment'],y)
def field(name,label,y,width=508,x=52):
    c.setFillColor(navy);c.setFont('NS-Bold',9);c.drawString(x,y,label)
    c.acroForm.textfield(name=name,tooltip=label,x=x,y=y-32,width=width,height=25,borderWidth=0.7,borderColor=HexColor('#8b9ba8'),fillColor=HexColor('#f4f7fa'),textColor=navy,fontName='Helvetica',fontSize=11,maxlen=100,forceBorder=True)
field('patient_name','Patient full name',y-8)
field('birth_date','Date of birth (MM/DD/YYYY)',y-69,240)
field('receipt_date','Date notice received (MM/DD/YYYY)',y-69,248,312)
field('representative','Representative name, if signing for the patient',y-130)
field('authority','Relationship / legal authority (office will verify)',y-191)
c.setFont('NS',10); c.drawString(52,y-265,'Patient or representative signature: ___________________________________')
c.drawString(52,y-292,'Date signed: ____________________   (Sign by hand after printing.)')
c.setStrokeColor(gold);c.line(52,y-317,560,y-317)
c.setFont('NS-Bold',11);c.drawString(52,y-338,'OFFICE USE ONLY — if acknowledgment is not obtained')
field('staff_reason','Reason / good-faith efforts to obtain acknowledgment',y-361)
field('staff_name','Staff name',y-422,320)
field('staff_date','Date',y-422,168,392)
assert y-454>55,y
c.showPage();c.save();print(out)
