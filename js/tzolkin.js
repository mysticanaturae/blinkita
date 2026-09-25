/* BLINKITA TZOLKIN ENGINE
   Traditional 260-day Tzolk'in naming. Dreamspell is not used.
   Correlation: GMT 584283. Reference: 2012-12-21 = 4 Ajaw.
*/
const TZOLKIN_SIGNS=['Imix','Ik’','Ak’b’al','K’an','Chikchan','Kimi','Manik’','Lamat','Muluk','Ok','Chuwen','Eb’','B’en','Ix','Men','K’ib’','Kab’an','Etz’nab’','Kawak','Ajaw'];
function tzolkinForDate(input){const d=new Date(input+'T12:00:00');const ref=new Date('2012-12-21T12:00:00');const days=Math.round((d-ref)/86400000);return {number:((days+3)%13+13)%13+1,sign:TZOLKIN_SIGNS[((days+19)%20+20)%20],days};}
function renderTzolkin(input=''){const el=document.querySelector('[data-tzolkin]');if(!el)return;const iso=input||new Date().toISOString().slice(0,10);const t=tzolkinForDate(iso);el.innerHTML=`<span class="tz-label">TZOLK’IN · TRADITIONAL COUNT</span><strong>${t.number} ${t.sign}</strong><small>${iso}</small>`;}
document.addEventListener('DOMContentLoaded',()=>renderTzolkin());
