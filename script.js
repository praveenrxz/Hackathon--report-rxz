const form = document.getElementById('reportForm');
const previewSections = document.getElementById('previewSections');
const fields = ['studentName','registerNumber','department','college','submissionDate','github','projectTitle','problem','objectives','architecture','features','htmlCode','cssCode','jsCode','execution','screenshots','technical','conclusion','future'];
const sections = [
  ['problem','1. Problem Statement'],['objectives','2. Objectives'],['architecture','3. Architecture'],
  ['features','4.1 Features Implemented'],['htmlCode','4.2 Source Code — HTML'],['cssCode','4.2 Source Code — CSS'],
  ['jsCode','4.2 Source Code — JavaScript'],['execution','4.3 Project Execution'],['screenshots','5. Output Screenshots'],
  ['technical','6. Technical Explanation'],['conclusion','7. Conclusion'],['future','8. Future Enhancements']
];
function val(name){const el=form.elements[name]; return el ? el.value.trim() : ''}
function render(){
  const title=val('projectTitle') || 'Web Development Project Report';
  document.getElementById('p-projectTitle').textContent=title;
  ['studentName','registerNumber','department','college','submissionDate','github'].forEach(k=>{
    let v=val(k)||'—';
    if(k==='submissionDate' && v){const d=new Date(v+'T00:00:00');v=d.toLocaleDateString(undefined,{day:'2-digit',month:'short',year:'numeric'})}
    document.getElementById('p-'+k).textContent=v;
  });
  previewSections.innerHTML='';
  sections.forEach(([key,label])=>{
    const value=val(key);
    const section=document.createElement('section'); section.className='report-section';
    const h=document.createElement('h2');h.textContent=label;section.appendChild(h);
    if(key.endsWith('Code')){
      const pre=document.createElement('pre');pre.textContent=value||'Code section not provided yet.';if(!value)pre.className='empty';section.appendChild(pre);
    }else{
      const p=document.createElement('p');p.textContent=value||'Add your content in the form to complete this section.';if(!value)p.className='empty';section.appendChild(p);
    }
    previewSections.appendChild(section);
  });
  const completed=fields.filter(k=>val(k)).length;
  const percent=Math.round(completed/fields.length*100);
  document.getElementById('progressText').textContent=percent+'%';
  document.getElementById('progressBar').style.width=percent+'%';
}
form.addEventListener('input',render);
document.getElementById('previewBtn').addEventListener('click',()=>{render();document.querySelector('.preview-panel').scrollIntoView({behavior:'smooth',block:'start'})});
document.getElementById('printBtn').addEventListener('click',()=>{render();window.print()});
document.getElementById('resetBtn').addEventListener('click',()=>setTimeout(render,0));
render();
