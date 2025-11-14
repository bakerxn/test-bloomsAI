
const state = { cognitive:null, knowledge:null, ai_literacy:null, form:{} };
const DATA_URL = 'data.json';

const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.hidden = true;
document.body.appendChild(tooltip);

function announce(msg){
  const live = document.getElementById('live');
  if(live){ live.textContent = msg; }
}

fetch(DATA_URL).then(r=>r.json()).then(DATA=>{
  window._DATA = DATA;
  ['cognitive','knowledge','ai_literacy'].forEach(cat => renderCategory(cat, DATA[cat]));
  // Tool buttons in modal
  const toolWrap = document.getElementById('aiToolButtons');
  if(toolWrap && DATA.ai_tools){
    DATA.ai_tools.forEach(t => {
      const b = document.createElement('button');
      b.className = 'btn secondary';
      b.textContent = t.label;
      b.addEventListener('click', ()=> copyAndOpenAI(t.url));
      toolWrap.appendChild(b);
    });
  }
});

function renderCategory(category, items){
  const row = document.querySelector(`.hex-row[data-category="${category}"]`);
  if(!row) return;
  items.forEach(item=>{
    const btn = document.createElement('button');
    btn.className = 'hex';
    btn.type = 'button';
    btn.dataset.id = item.id;
    btn.dataset.label = item.label;
    btn.dataset.desc = item.desc;
    btn.dataset.category = category;
    btn.setAttribute('aria-pressed','false');
    btn.setAttribute('aria-describedby', `${item.id}-desc`);
    btn.textContent = item.label;

    btn.addEventListener('mouseenter', e=>showPreview(e,item.desc));
    btn.addEventListener('mouseleave', hidePreview);
    btn.addEventListener('focus', e=>showPreview(e,item.desc));
    btn.addEventListener('blur', hidePreview);

    btn.addEventListener('click', ()=> selectAndShow(btn));
    row.appendChild(btn);
  });
}

function selectAndShow(btn){
  const cat = btn.dataset.category;
  // clear existing selection
  document.querySelectorAll(`.hex-row[data-category="${cat}"] .hex[aria-pressed="true"]`)
    .forEach(x => x.setAttribute('aria-pressed','false'));
  // set new
  btn.setAttribute('aria-pressed','true');
  state[cat] = btn.dataset.id;
  // update description panel
  const panel = document.getElementById(`desc-${cat}`);
  if(panel){
    panel.textContent = btn.dataset.desc;
    panel.classList.add('updated');
    setTimeout(()=>panel.classList.remove('updated'), 250);
  }
  updateContinueButton();
}

function updateContinueButton(){
  const ready = state.cognitive && state.knowledge && state.ai_literacy;
  const btn = document.getElementById('submitChoices');
  if(btn){ btn.disabled = !ready; }
}

function showPreview(e, text){
  const el = e.currentTarget;
  tooltip.textContent = text;
  tooltip.hidden = false;
  const r = el.getBoundingClientRect();
  tooltip.style.left = (r.left + window.scrollX) + 'px';
  tooltip.style.top  = (r.top + window.scrollY - 36) + 'px';
}
function hidePreview(){ tooltip.hidden = true; }

// Actions panel
const submitBtn = document.getElementById('submitChoices');
if(submitBtn){
  submitBtn.addEventListener('click', ()=>{
    document.getElementById('actionsPanel').style.display = 'block';
    announce('Selections ready. Choose an action.');
  });
}
document.getElementById('seeExamples')?.addEventListener('click', ()=>{
  alert('Example activity: This will show a context-specific example based on your three selections.');
});
document.getElementById('seeAssessment')?.addEventListener('click', ()=>{
  alert('Assessment ideas: rubric criteria aligned to your cognitive process selection.');
});
document.getElementById('seeAccessibility')?.addEventListener('click', ()=>{
  alert('Accessibility tips: inclusive alternatives, keyboard-only paths, and SR-friendly outputs.');
});

// Modal controls
const formModal = document.getElementById('formModal');
document.getElementById('openForm')?.addEventListener('click', ()=> openModal());
document.getElementById('closeForm')?.addEventListener('click', ()=> closeModal());
function openModal(){
  formModal.classList.add('open');
  formModal.querySelector('input, textarea, select')?.focus();
}
function closeModal(){ formModal.classList.remove('open'); }

// Build Prompt
document.getElementById('buildPromptBtn')?.addEventListener('click', ()=>{
  const formEl = document.getElementById('contextForm');
  const fd = new FormData(formEl);
  const form = Object.fromEntries(fd.entries());
  state.form = form;
  const prompt = buildPrompt(form, state);
  const out = document.getElementById('promptPanel');
  document.getElementById('promptOut').value = prompt;
  out.style.display = 'block';
  announce('Prompt generated. Ready to copy and open in your AI tool.');
});

function buildPrompt(form, choices){
  const cog = (choices.cognitive || '').toUpperCase();
  const know = (choices.knowledge || '');
  const ai = (choices.ai_literacy || '');
  return `You are an instructional designer.

Bloom’s Revised Taxonomy target: ${cog}
Knowledge dimension: ${know}
AI literacy focus: ${ai}

Context:
- Institution: ${form.institution || ''}
- Course: ${form.course || ''} (level: ${form.level || ''}, modality: ${form.modality || ''}, discipline: ${form.discipline || ''})
- Learning objective(s): ${form.objectives || ''}
- Time: ${form.time || ''}
- Materials: ${form.materials || ''}
- Academic integrity/AI use policy: ${form.ai_policy || ''}

Task:
Design 3 activity options aligned to ${cog} with ${know} knowledge and an emphasis on ${ai}. For each: student instructions, estimated time, deliverable, rubric criteria aligned to ${cog}, where AI is allowed/required, integrity guardrails, accessibility notes, and a reflection question.

Return in Markdown.`.trim();
}

async function copyAndOpenAI(url){
  const txt = document.getElementById('promptOut').value || '';
  try{
    await navigator.clipboard.writeText(txt);
    announce('Prompt copied to clipboard.');
  }catch(e){
    announce('Copy failed. You can copy manually from the textbox.');
  }
  window.open(url, '_blank', 'noopener');
}
