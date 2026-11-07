(()=>{
  'use strict';
  const WA='5591991933479';
  const $=id=>document.getElementById(id);
  const nav=$('mainNav'); const navToggle=$('navToggle');
  navToggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded',String(open));
    navToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('is-open');navToggle?.setAttribute('aria-expanded','false');
  }));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&nav?.classList.contains('is-open')){
      nav.classList.remove('is-open');navToggle?.setAttribute('aria-expanded','false');navToggle?.focus();
    }
  });
  if('IntersectionObserver' in window){
    const links=[...document.querySelectorAll('.nav-link')];
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){if(entry.isIntersecting){
        links.forEach(link=>link.classList.toggle('active',link.hash==='#'+entry.target.id));
      }}
    },{rootMargin:'-15% 0px -68% 0px',threshold:0});
    document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));
  }
  if($('currentYear')) $('currentYear').textContent=String(new Date().getFullYear());
  const months=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const week=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const now=new Date();now.setHours(0,0,0,0);
  let visibleMonth=new Date(now.getFullYear(),now.getMonth(),1);
  let chosenDate=null;
  const maxDate=new Date(now.getFullYear(),now.getMonth()+6,0);maxDate.setHours(0,0,0,0);
  const calendar=$('bookingCalendar'), status=$('bookingStatus');
  const keyFor=date=>[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
  function renderCalendar(){
    if(!calendar)return;
    const y=visibleMonth.getFullYear(),m=visibleMonth.getMonth();
    const firstWeekday=new Date(y,m,1).getDay();
    const count=new Date(y,m+1,0).getDate();
    calendar.replaceChildren();
    const head=document.createElement('div');head.className='cal-head';
    const label=document.createElement('strong');label.textContent=`${months[m]} de ${y}`;
    const controls=document.createElement('div');controls.className='cal-head__nav';
    function arrow(isNext){
      const btn=document.createElement('button');btn.type='button';
      btn.setAttribute('aria-label',isNext?'Próximo mês':'Mês anterior');
      btn.innerHTML='<svg class="icon"><use href="#i-chevron"/></svg>';
      const other=new Date(y,m+(isNext?1:-1),1);
      btn.disabled=other<new Date(now.getFullYear(),now.getMonth(),1)||other>new Date(maxDate.getFullYear(),maxDate.getMonth(),1);
      btn.addEventListener('click',()=>{visibleMonth=other;renderCalendar();});
      return btn;
    }
    controls.append(arrow(false),arrow(true));head.append(label,controls);calendar.append(head);
    const weekdayRow=document.createElement('div');weekdayRow.className='cal-week';
    week.forEach(w=>{const s=document.createElement('span');s.textContent=w;weekdayRow.append(s);});
    calendar.append(weekdayRow);
    const days=document.createElement('div');days.className='cal-days';
    for(let i=0;i<firstWeekday;i++){const s=document.createElement('span');s.className='cal-day cal-day--blank';days.append(s);}
    for(let i=1;i<=count;i++){
      const date=new Date(y,m,i);const btn=document.createElement('button');btn.type='button';btn.className='cal-day';btn.textContent=String(i);
      btn.disabled=date<now||date>maxDate;
      btn.setAttribute('aria-label',date.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}));
      if(date.getTime()===now.getTime())btn.classList.add('cal-day--today');
      if(chosenDate&&date.getTime()===chosenDate.getTime()){
        btn.classList.add('cal-day--chosen');btn.setAttribute('aria-pressed','true');
      }else btn.setAttribute('aria-pressed','false');
      btn.addEventListener('click',()=>{
        chosenDate=date;renderCalendar();
        if(status){status.className='booking__hint success';status.textContent=`Data selecionada: ${date.toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'})}.`}
      });
      days.append(btn);
    }
    calendar.append(days);
  }
  renderCalendar();
  $('bookingForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const name=$('bookingName').value.trim();
    if(!name){$('bookingName').focus();return;}
    if(!chosenDate){status.textContent='Escolha uma data no calendário antes de continuar.';status.className='booking__hint error';calendar.scrollIntoView({behavior:'smooth',block:'center'});return;}
    const mode=$('bookingMode').value,service=$('bookingService').value,notes=$('bookingNotes').value.trim();
    const date=chosenDate.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
    const message=`Olá, equipe NEXTO! Meu nome é ${name}.\nGostaria de solicitar um agendamento para ${date}.\nModalidade de preferência: ${mode}.\nServiço: ${service}.`+(notes?`\nSobre meu negócio: ${notes}`:'')+'\nPodem me informar a disponibilidade e confirmar o horário?';
    const url=`https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
    const popup=window.open(url,'_blank','noopener,noreferrer');
    if(!popup){window.location.href=url;}
  });
  // This static-site event agenda is browser-local only. No fake administrator login.
  const key='nexto_eventos_locais_v1';
  let events={};
  try{const parsed=JSON.parse(localStorage.getItem(key)||'{}');if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed)){events=parsed;}}catch{}
  const eventList=$('eventList'),feedback=$('eventFeedback');
  function renderEvents(){
    if(!eventList)return;eventList.replaceChildren();
    const upcoming=Object.entries(events).filter(([date,name])=>/^\d{4}-\d{2}-\d{2}$/.test(date)&&typeof name==='string'&&date>=keyFor(now)).sort((a,b)=>a[0].localeCompare(b[0]));
    if(!upcoming.length){const li=document.createElement('li');li.className='event-list__empty';li.textContent='Nenhum evento cadastrado neste navegador.';eventList.append(li);return;}
    upcoming.forEach(([date,name])=>{
      const [year,month,day]=date.split('-').map(Number);const when=new Date(year,month-1,day);
      const li=document.createElement('li'),dateSpan=document.createElement('span'),labelSpan=document.createElement('span');
      dateSpan.className='event-list__date';labelSpan.className='event-list__label';
      dateSpan.textContent=when.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});labelSpan.textContent=name;li.append(dateSpan,labelSpan);eventList.append(li);
    });
  }
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(events));return true;}catch{if(feedback)feedback.textContent='Não foi possível salvar neste navegador.';return false;}};
  $('saveEvent')?.addEventListener('click',()=>{
    const day=$('eventDate').value,name=$('eventTitle').value.trim();
    if(!day||!name){feedback.textContent='Informe uma data e o nome do evento.';return;}
    if(!/^\d{4}-\d{2}-\d{2}$/.test(day)){feedback.textContent='Selecione uma data válida.';return;}
    events[day]=name;if(save()){feedback.textContent='Evento salvo somente neste navegador.';renderEvents();}
  });
  $('deleteEvent')?.addEventListener('click',()=>{
    const day=$('eventDate').value;
    if(!day){feedback.textContent='Selecione a data a excluir.';return;}
    delete events[day];if(save()){feedback.textContent='Evento removido deste navegador.';renderEvents();}
  });
  renderEvents();
  let installPrompt=null;
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('installButton').hidden=false;});
  $('installButton')?.addEventListener('click',async()=>{
    if(!installPrompt)return;
    installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('installButton').hidden=true;
  });
  window.addEventListener('appinstalled',()=>{$('installButton').hidden=true;installPrompt=null;});
  if('serviceWorker' in navigator&&window.location.protocol.startsWith('http')){
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  }
})();
