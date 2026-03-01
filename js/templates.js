function renderTemplate(tpl, d) {
  switch(tpl) {
    case 'classic': return renderClassic(d);
    case 'modern': return renderModern(d);
    case 'minimal': return renderMinimal(d);
    case 'creative': return renderCreative(d);
    case 'executive': return renderExecutive(d);
    case 'compact': return renderCompact(d);
    case 'elegant': return renderElegant(d);
    case 'tech': return renderTech(d);
    case 'timeline': return renderTimeline(d);
    case 'professional': return renderProfessional(d);
    case 'corporate': return renderCorporate(d);
    case 'polished': return renderPolished(d);
    case 'bold': return renderBold(d);
    default: return renderClassic(d);
  }
}

function contactLine(d) {
  return [d.email, d.phone, d.location, d.website].filter(Boolean).join(' · ');
}

function expHTML(d, cls) {
  return d.experiences.filter(e => e.title || e.company).map(e => `
    <div class="${cls.item}">
      <div class="${cls.title}">${e.title}</div>
      <div class="${cls.sub}">${[e.company, [e.start, e.end].filter(Boolean).join(' – ')].filter(Boolean).join(' · ')}</div>
      ${e.desc ? `<div class="${cls.desc}">${e.desc}</div>` : ''}
    </div>`).join('');
}

function eduHTML(d, cls) {
  return d.education.filter(e => e.degree || e.school).map(e => `
    <div class="${cls.item}">
      <div class="${cls.deg}">${e.degree}</div>
      <div class="${cls.sub}">${[e.school, e.year, e.gpa].filter(Boolean).join(' · ')}</div>
    </div>`).join('');
}

function projHTML(d, cls) {
  return d.projects.filter(p => p.name).map(p => `
    <div class="${cls.item}">
      <div class="${cls.title}">${p.name}${p.tech ? ` <span class="${cls.tech}">[${p.tech}]</span>` : ''}</div>
      <div class="${cls.sub}">${[p.link, p.date].filter(Boolean).join(' · ')}</div>
      ${p.desc ? `<div class="${cls.desc}">${p.desc}</div>` : ''}
    </div>`).join('');
}

function renderClassic(d) {
  const expCls = {item:'o-exp-item', title:'o-exp-title', sub:'o-exp-company', desc:'o-exp-desc'};
  const eduCls = {item:'o-edu-item', deg:'o-edu-title', sub:'o-edu-sub'};
  return `<div class="out-classic">
    <div class="o-name">${d.name}</div>
    ${d.title ? `<div class="o-title">${d.title}</div>` : ''}
    <div class="o-contact">${contactLine(d).split(' · ').map(x=>`<span>${x}</span>`).join('')}</div>
    ${d.summary ? `<div class="o-sec-title">Professional Summary</div><div class="o-summary">${d.summary}</div>` : ''}
    ${d.proficiencies.length ? `<div class="o-sec-title">Technical Proficiency</div>${d.proficiencies.map(p=>`
      <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}` : ''}
    ${d.experiences.some(e=>e.title) ? `<div class="o-sec-title">Work Experience</div>${expHTML(d, expCls)}` : ''}
    ${d.projects.some(p=>p.name) ? `<div class="o-sec-title">Projects</div>${projHTML(d, {item:'o-exp-item', title:'o-exp-title', tech:'o-proj-tech', sub:'o-exp-company', desc:'o-exp-desc'})}` : ''}
    ${d.education.some(e=>e.degree) ? `<div class="o-sec-title">Education</div>${eduHTML(d, eduCls)}` : ''}
    ${d.skills.length ? `<div class="o-sec-title">Skills</div><div class="o-skills">${d.skills.map(s=>`<span class="o-skill">${s}</span>`).join('')}</div>` : ''}
  </div>`;
}

function renderModern(d) {
  const initials = d.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
  const avatarContent = d.photo
    ? `<img src="${d.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
    : initials;
  const skillBars = d.skills.slice(0,7).map((s,i)=>{
    const pct = [90,85,80,75,88,70,82][i] || 75;
    return `<div class="o-skill-bar"><div class="name"><span>${s}</span></div><div class="bar"><div class="fill" style="width:${pct}%"></div></div></div>`;
  }).join('');
  return `<div class="out-modern">
    <div class="o-sidebar">
      <div class="o-avatar">${avatarContent}</div>
      <div class="o-s-name">${d.name}</div>
      <div class="o-s-title">${d.title}</div>
      ${d.email||d.phone||d.location||d.website ? `<div class="o-s-sec">Contact</div>
        ${d.email?`<div class="o-s-item">${d.email}</div>`:''}
        ${d.phone?`<div class="o-s-item">${d.phone}</div>`:''}
        ${d.location?`<div class="o-s-item">${d.location}</div>`:''}
        ${d.website?`<div class="o-s-item">${d.website}</div>`:''}` : ''}
      ${d.skills.length ? `<div class="o-s-sec">Skills</div>${skillBars}` : ''}
    </div>
    <div class="o-main">
      <div class="o-m-name">${d.name}</div>
      <div class="o-m-tag">${d.title}</div>
      ${d.summary ? `<div class="o-m-sec">Summary</div><div class="o-summary">${d.summary}</div>` : ''}
      ${d.proficiencies.length ? `<div class="o-m-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
        <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}` : ''}
      ${d.experiences.some(e=>e.title) ? `<div class="o-m-sec">Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
        <div class="o-exp-item">
          <div class="o-exp-title">${e.title}</div>
          <div class="o-exp-sub"><span>${e.company}</span>${(e.start||e.end)?`<span class="o-exp-sep">·</span><span>${[e.start,e.end].filter(Boolean).join(' – ')}</span>`:''}</div>
          ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
        </div>`).join('')}` : ''}
      ${d.projects.some(p=>p.name) ? `<div class="o-m-sec">Projects</div>${projHTML(d, {item:'o-exp-item', title:'o-exp-title', tech:'o-proj-tech', sub:'o-exp-sub', desc:'o-exp-desc'})}` : ''}
      ${d.education.some(e=>e.degree) ? `<div class="o-m-sec">Education</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
        <div class="o-edu-item">
          <div class="o-edu-deg">${e.degree}</div>
          <div class="o-edu-sub">${[e.school,e.year,e.gpa].filter(Boolean).join(' · ')}</div>
        </div>`).join('')}` : ''}
    </div>
  </div>`;
}

function renderMinimal(d) {
  return `<div class="out-minimal">
    <div class="o-name">${d.name}</div>
    ${d.title?`<div class="o-role">${d.title}</div>`:''}
    <div class="o-contact-row">
      ${[d.email,d.phone,d.location,d.website].filter(Boolean).map(x=>`<span class="o-c">${x}</span>`).join('')}
    </div>
    ${d.summary?`<div class="o-sec">Summary</div><div class="o-summary">${d.summary}</div><div class="o-divider"></div>`:''}
    ${d.proficiencies.length?`<div class="o-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
      <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}<div class="o-divider"></div>`:''}
    ${d.experiences.some(e=>e.title)?`<div class="o-sec">Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
      <div class="o-exp-item">
        <div class="o-exp-date-col">${[e.start,e.end].filter(Boolean).join(' –\n')}</div>
        <div class="o-exp-content">
          <div class="o-exp-title">${e.title}</div>
          <div class="o-exp-company">${e.company}</div>
          ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
        </div>
      </div>`).join('')}<div class="o-divider"></div>`:''}
    ${d.projects.some(p=>p.name)?`<div class="o-sec">Projects</div>${d.projects.filter(p=>p.name).map(p=>`
      <div class="o-exp-item">
        <div class="o-exp-date-col">${p.date}</div>
        <div class="o-exp-content">
          <div class="o-exp-title">${p.name}${p.tech?` <span class="o-proj-tech">[${p.tech}]</span>`:''}</div>
          <div class="o-exp-company">${p.link||''}</div>
          ${p.desc?`<div class="o-exp-desc">${p.desc}</div>`:''}
        </div>
      </div>`).join('')}<div class="o-divider"></div>`:''}
    ${d.education.some(e=>e.degree)?`<div class="o-sec">Education</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
      <div class="o-edu-item">
        <div class="o-edu-date">${e.year}</div>
        <div>
          <div class="o-edu-deg">${e.degree}</div>
          <div class="o-edu-sub">${[e.school,e.gpa].filter(Boolean).join(' · ')}</div>
        </div>
      </div>`).join('')}<div class="o-divider"></div>`:''}
    ${d.skills.length?`<div class="o-sec">Skills</div><div class="o-skills">${d.skills.map(s=>`<span class="o-skill">${s}</span>`).join('')}</div><div class="o-divider"></div>`:''}
  </div>`;
}

function renderCreative(d) {
  return `<div class="out-creative">
    <div class="o-hero">
      <div class="o-name">${d.name}</div>
      ${d.title?`<div class="o-title-role">${d.title}</div>`:''}
      <div class="o-contact-pills">
        ${[d.email,d.phone,d.location,d.website].filter(Boolean).map(x=>`<span class="o-pill">${x}</span>`).join('')}
      </div>
    </div>
    <div class="o-wave"></div>
    <div class="o-body">
      <div class="o-left">
        ${d.summary?`<div class="o-sec">Summary</div><div class="o-summary">${d.summary}</div>`:''}
        ${d.proficiencies.length?`<div class="o-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
          <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> <span class="o-prof-vals">${p.values.join(', ')}</span></div>`).join('')}`:''}
        ${d.experiences.some(e=>e.title)?`<div class="o-sec">Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
          <div class="o-exp-item">
            <div class="o-exp-title">${e.title}</div>
            <div class="o-exp-sub">${[e.company,[e.start,e.end].filter(Boolean).join(' – ')].filter(Boolean).join(' · ')}</div>
            ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
          </div>`).join('')}`:''}
        ${d.projects.some(p=>p.name)?`<div class="o-sec">Projects</div>${projHTML(d, {item:'o-exp-item', title:'o-exp-title', tech:'o-proj-tech', sub:'o-exp-sub', desc:'o-exp-desc'})}`:''}
      </div>
      <div class="o-right">
        ${d.skills.length?`<div class="o-r-sec">Skills</div><div>${d.skills.map(s=>`<span class="o-skill-pill">${s}</span>`).join('')}</div>`:''}
        ${d.education.some(e=>e.degree)?`<div class="o-r-sec">Education</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
          <div class="o-edu-item">
            <div class="o-edu-deg">${e.degree}</div>
            <div class="o-edu-sub">${[e.school,e.year].filter(Boolean).join(' · ')}</div>
          </div>`).join('')}`:''}
      </div>
    </div>
  </div>`;
}

function renderExecutive(d) {
  const cls = {item:'o-exp-item', title:'o-exp-title', sub:'o-exp-sub', desc:'o-exp-desc'};
  return `<div class="out-executive">
    <div class="o-top">
      <div class="o-name">${d.name}</div>
      ${d.title?`<div class="o-title">${d.title}</div>`:''}
      <div class="o-contact-bar">
        ${[d.email,d.phone,d.location,d.website].filter(Boolean).map(x=>`<span>${x}</span>`).join('')}
      </div>
    </div>
    <div class="o-accent"></div>
    <div class="o-body">
      ${d.summary?`<div class="o-sec">Professional Summary</div><div class="o-summary">${d.summary}</div>`:''}
      ${d.proficiencies.length?`<div class="o-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
        <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}`:''}
      ${d.experiences.some(e=>e.title)?`<div class="o-sec">Work Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
        <div class="o-exp-item">
          <div class="o-exp-title">${e.title}</div>
          <div class="o-exp-sub">${[e.company,[e.start,e.end].filter(Boolean).join(' – ')].filter(Boolean).join(' · ')}</div>
          ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
        </div>`).join('')}`:''}
      ${d.projects.some(p=>p.name)?`<div class="o-sec">Projects</div>${projHTML(d, {item:'o-exp-item', title:'o-exp-title', tech:'o-proj-tech', sub:'o-exp-sub', desc:'o-exp-desc'})}`:''}
      ${d.education.some(e=>e.degree)?`<div class="o-sec">Education</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
        <div class="o-edu-item">
          <div class="o-edu-deg">${e.degree}</div>
          <div class="o-edu-sub">${[e.school,e.year,e.gpa].filter(Boolean).join(' · ')}</div>
        </div>`).join('')}`:''}
      ${d.skills.length?`<div class="o-sec">Skills</div><div class="o-skills">${d.skills.map(s=>`<span class="o-skill">${s}</span>`).join('')}</div>`:''}
    </div>
  </div>`;
}

function renderCompact(d) {
  return `<div class="out-compact">
    <div class="o-header">
      <div>
        <div class="o-name">${d.name}</div>
        ${d.title?`<div class="o-title">${d.title}</div>`:''}
      </div>
      <div class="o-contact-col">
        ${[d.email,d.phone,d.location,d.website].filter(Boolean).map(x=>`<div>${x}</div>`).join('')}
      </div>
    </div>
    <div class="o-cols">
      <div class="o-left">
        ${d.summary?`<div class="o-sec">Summary</div><div class="o-summary">${d.summary}</div>`:''}
        ${d.proficiencies.length?`<div class="o-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
          <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}`:''}
        ${d.experiences.some(e=>e.title)?`<div class="o-sec">Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
          <div class="o-exp-item">
            <div class="o-exp-title">${e.title}</div>
            <div class="o-exp-sub">${[e.company,[e.start,e.end].filter(Boolean).join(' – ')].filter(Boolean).join(' · ')}</div>
            ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
          </div>`).join('')}`:''}
        ${d.projects.some(p=>p.name)?`<div class="o-sec">Projects</div>${projHTML(d, {item:'o-exp-item', title:'o-exp-title', tech:'o-proj-tech', sub:'o-exp-sub', desc:'o-exp-desc'})}`:''}
      </div>
      <div class="o-right">
        ${d.skills.length?`<div class="o-sec">Skills</div><div class="o-skills">${d.skills.map(s=>`<span class="o-skill">${s}</span>`).join('')}</div>`:''}
        ${d.education.some(e=>e.degree)?`<div class="o-sec">Education</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
          <div class="o-edu-item">
            <div class="o-edu-deg">${e.degree}</div>
            <div class="o-edu-sub">${[e.school,e.year,e.gpa].filter(Boolean).join(' · ')}</div>
          </div>`).join('')}`:''}
      </div>
    </div>
  </div>`;
}

function renderElegant(d) {
  return `<div class="out-elegant">
    <div class="o-name">${d.name}</div>
    <div class="o-divider-gold"></div>
    ${d.title?`<div class="o-title">${d.title}</div>`:''}
    <div class="o-contact-row">${[d.email,d.phone,d.location,d.website].filter(Boolean).join('  ·  ')}</div>
    <div class="o-body">
      ${d.summary?`<div class="o-sec">Summary</div><div class="o-summary">${d.summary}</div>`:''}
      ${d.proficiencies.length?`<div class="o-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
        <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}`:''}
      ${d.experiences.some(e=>e.title)?`<div class="o-sec">Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
        <div class="o-exp-item">
          <div class="o-exp-title">${e.title}</div>
          <div class="o-exp-sub">${[e.company,[e.start,e.end].filter(Boolean).join(' – ')].filter(Boolean).join(' · ')}</div>
          ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
        </div>`).join('')}`:''}
      ${d.projects.some(p=>p.name)?`<div class="o-sec">Projects</div>${projHTML(d, {item:'o-exp-item', title:'o-exp-title', tech:'o-proj-tech', sub:'o-exp-sub', desc:'o-exp-desc'})}`:''}
      ${d.education.some(e=>e.degree)?`<div class="o-sec">Education</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
        <div class="o-edu-item">
          <div class="o-edu-deg">${e.degree}</div>
          <div class="o-edu-sub">${[e.school,e.year,e.gpa].filter(Boolean).join(' · ')}</div>
        </div>`).join('')}`:''}
      ${d.skills.length?`<div class="o-sec">Skills</div><div class="o-skills">${d.skills.map(s=>`<span class="o-skill">${s}</span>`).join('')}</div>`:''}
    </div>
  </div>`;
}

function renderTech(d) {
  return `<div class="out-tech">
    <div class="o-prompt">$ cat resume.md</div>
    <div class="o-name">${d.name}</div>
    ${d.title?`<div class="o-title">${d.title}</div>`:''}
    <div class="o-contact-row">${[d.email,d.phone,d.location,d.website].filter(Boolean).map(x=>`<span>${x}</span>`).join('')}</div>
    <div class="o-hr"></div>
    ${d.summary?`<div class="o-sec">Summary</div><div class="o-summary">${d.summary}</div>`:''}
    ${d.proficiencies.length?`<div class="o-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
      <div class="o-prof-item"><span class="o-prof-label" style="color:#58a6ff">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}`:''}
    ${d.experiences.some(e=>e.title)?`<div class="o-sec">Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
      <div class="o-exp-item">
        <div class="o-exp-title">${e.title}</div>
        <div class="o-exp-sub">${[e.company,[e.start,e.end].filter(Boolean).join(' – ')].filter(Boolean).join(' · ')}</div>
        ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
      </div>`).join('')}`:''}
    ${d.projects.some(p=>p.name)?`<div class="o-sec">Projects</div>${d.projects.filter(p=>p.name).map(p=>`
      <div class="o-exp-item">
        <div class="o-exp-title">${p.name}${p.tech?` <span style="color:#58a6ff;font-weight:400;font-size:0.78rem">[${p.tech}]</span>`:''}</div>
        <div class="o-exp-sub">${[p.link,p.date].filter(Boolean).join(' · ')}</div>
        ${p.desc?`<div class="o-exp-desc">${p.desc}</div>`:''}
      </div>`).join('')}`:''}
    ${d.education.some(e=>e.degree)?`<div class="o-sec">Education</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
      <div class="o-edu-item">
        <div class="o-edu-deg">${e.degree}</div>
        <div class="o-edu-sub">${[e.school,e.year,e.gpa].filter(Boolean).join(' · ')}</div>
      </div>`).join('')}`:''}
    ${d.skills.length?`<div class="o-sec">Skills</div><div class="o-skills">${d.skills.map(s=>`<span class="o-skill">${s}</span>`).join('')}</div>`:''}
  </div>`;
}

function renderTimeline(d) {
  return `<div class="out-timeline">
    <div class="o-name">${d.name}</div>
    ${d.title?`<div class="o-title">${d.title}</div>`:''}
    <div class="o-contact-row">${[d.email,d.phone,d.location,d.website].filter(Boolean).map(x=>`<span>${x}</span>`).join('')}</div>
    ${d.summary?`<div class="o-sec">Summary</div><div class="o-summary">${d.summary}</div>`:''}
    ${d.proficiencies.length?`<div class="o-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
      <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}`:''}
    ${d.experiences.some(e=>e.title)?`<div class="o-sec">Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
      <div class="o-tl-item">
        <div class="o-tl-date">${[e.start,e.end].filter(Boolean).join(' – ')}</div>
        <div class="o-tl-title">${e.title}</div>
        <div class="o-tl-sub">${e.company}</div>
        ${e.desc?`<div class="o-tl-desc">${e.desc}</div>`:''}
      </div>`).join('')}`:''}
    ${d.projects.some(p=>p.name)?`<div class="o-sec">Projects</div>${d.projects.filter(p=>p.name).map(p=>`
      <div class="o-tl-item">
        <div class="o-tl-date">${p.date}</div>
        <div class="o-tl-title">${p.name}${p.tech?` <span class="o-proj-tech">[${p.tech}]</span>`:''}</div>
        <div class="o-tl-sub">${p.link||''}</div>
        ${p.desc?`<div class="o-tl-desc">${p.desc}</div>`:''}
      </div>`).join('')}`:''}
    ${d.education.some(e=>e.degree)?`<div class="o-sec">Education</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
      <div class="o-edu-item">
        <div class="o-edu-deg">${e.degree}</div>
        <div class="o-edu-sub">${[e.school,e.year,e.gpa].filter(Boolean).join(' · ')}</div>
      </div>`).join('')}`:''}
    ${d.skills.length?`<div class="o-sec">Skills</div><div class="o-skills">${d.skills.map(s=>`<span class="o-skill">${s}</span>`).join('')}</div>`:''}
  </div>`;
}

function renderProfessional(d) {
  const initials = d.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
  const photoEl = d.photo
    ? `<img src="${d.photo}">`
    : `<div class="o-photo-initials">${initials}</div>`;
  return `<div class="out-professional">
    <div class="o-sidebar">
      <div class="o-photo">${photoEl}</div>
      <div class="o-s-name">${d.name}</div>
      <div class="o-s-title">${d.title}</div>
      ${d.email||d.phone||d.location||d.website ? `<div class="o-s-sec">Contact</div>
        ${d.email?`<div class="o-s-item">${d.email}</div>`:''}
        ${d.phone?`<div class="o-s-item">${d.phone}</div>`:''}
        ${d.location?`<div class="o-s-item">${d.location}</div>`:''}
        ${d.website?`<div class="o-s-item">${d.website}</div>`:''}` : ''}
      ${d.skills.length ? `<div class="o-s-sec">Skills</div><div>${d.skills.map(s=>`<span class="o-s-skill">${s}</span>`).join('')}</div>` : ''}
      ${d.education.some(e=>e.degree) ? `<div class="o-s-sec">Education</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
        <div class="o-s-edu">
          <div class="o-s-edu-deg">${e.degree}</div>
          <div class="o-s-edu-sub">${[e.school,e.year].filter(Boolean).join(' · ')}</div>
        </div>`).join('')}` : ''}
    </div>
    <div class="o-main">
      <div class="o-m-name">${d.name}</div>
      <div class="o-m-tag">${d.title}</div>
      ${d.summary ? `<div class="o-m-sec">Summary</div><div class="o-summary">${d.summary}</div>` : ''}
      ${d.proficiencies.length ? `<div class="o-m-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
        <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}` : ''}
      ${d.experiences.some(e=>e.title) ? `<div class="o-m-sec">Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
        <div class="o-exp-item">
          <div class="o-exp-title">${e.title}</div>
          <div class="o-exp-sub"><span>${e.company}</span>${(e.start||e.end)?`<span class="o-exp-sep">·</span><span>${[e.start,e.end].filter(Boolean).join(' – ')}</span>`:''}</div>
          ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
        </div>`).join('')}` : ''}
      ${d.projects.some(p=>p.name) ? `<div class="o-m-sec">Projects</div>${projHTML(d, {item:'o-exp-item', title:'o-exp-title', tech:'o-proj-tech', sub:'o-exp-sub', desc:'o-exp-desc'})}` : ''}
    </div>
  </div>`;
}

function renderCorporate(d) {
  return `<div class="out-corporate">
    <div class="o-hdr">
      <div class="o-name">${d.name}</div>
      <div class="o-hdr-quotes">&#8220;&#8221;</div>
    </div>
    <div class="o-cols">
      <div class="o-sidebar">
        <div class="o-sec gold">Contact</div>
        ${[d.email,d.phone,d.location,d.website].filter(Boolean).map(x=>`
          <div class="o-s-item"><span class="o-s-dot"></span>${x}</div>`).join('')}
        ${d.education.some(e=>e.degree)?`<div class="o-sec gold">Education &amp; Training</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
          <div class="o-s-edu">
            <div class="o-s-edu-year">${e.year}</div>
            <div class="o-s-edu-deg">${e.degree}</div>
            <div class="o-s-edu-sub">${[e.school,e.gpa].filter(Boolean).join(' · ')}</div>
          </div>`).join('')}`:''}
      </div>
      <div class="o-main">
        ${d.summary?`<div class="o-sec">Summary</div><div class="o-summary">${d.summary}</div>`:''}
        ${d.proficiencies.length?`<div class="o-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
          <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}`:''}
        ${d.skills.length?`<div class="o-sec">Skills</div><div class="o-skills-grid">${d.skills.map(s=>`<div class="o-skill-item">${s}</div>`).join('')}</div>`:''}
        ${d.experiences.some(e=>e.title)?`<div class="o-sec">Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
          <div class="o-exp-item">
            <div class="o-exp-title">${e.title}</div>
            <div class="o-exp-sub">${e.company}${e.company&&(e.start||e.end)?' | ':''}${[e.start,e.end].filter(Boolean).join(' – ')}</div>
            ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
          </div>`).join('')}`:''}
        ${d.projects.some(p=>p.name)?`<div class="o-sec">Projects</div>${projHTML(d, {item:'o-exp-item', title:'o-exp-title', tech:'o-proj-tech', sub:'o-exp-sub', desc:'o-exp-desc'})}`:''}
      </div>
    </div>
  </div>`;
}

function renderPolished(d) {
  const initials = d.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
  const photoEl = d.photo
    ? `<img src="${d.photo}">`
    : `<div class="o-initials">${initials}</div>`;
  return `<div class="out-polished">
    <div class="o-accent-bar"></div>
    <div class="o-top">
      <div class="o-top-left">
        <div class="o-name">${d.name}</div>
      </div>
      <div class="o-photo-rect">${photoEl}</div>
    </div>
    <div class="o-body">
      ${d.summary?`<div class="o-sec">Summary</div><div class="o-summary">${d.summary}</div>`:''}
      ${d.proficiencies.length?`<div class="o-sec">Technical Proficiency</div>${d.proficiencies.map(p=>`
        <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}`:''}
      <div class="o-mid">
        <div class="o-mid-left">
          ${d.experiences.some(e=>e.title)?`<div class="o-sec">Experience</div>${d.experiences.filter(e=>e.title||e.company).map(e=>`
            <div class="o-exp-item">
              <div class="o-exp-head">
                <div class="o-exp-title">${e.title}${e.company?', ':''}<span style="font-weight:400">${e.company}</span></div>
                <div class="o-exp-date">${[e.start,e.end].filter(Boolean).join(' – ')}</div>
              </div>
              ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
            </div>`).join('')}`:''}
          ${d.projects.some(p=>p.name)?`<div class="o-sec">Projects</div>${d.projects.filter(p=>p.name).map(p=>`
            <div class="o-exp-item">
              <div class="o-exp-head">
                <div class="o-exp-title">${p.name}${p.tech?` <span class="o-proj-tech">[${p.tech}]</span>`:''}</div>
                <div class="o-exp-date">${p.date}</div>
              </div>
              ${p.link?`<div class="o-exp-sub">${p.link}</div>`:''}
              ${p.desc?`<div class="o-exp-desc">${p.desc}</div>`:''}
            </div>`).join('')}`:''}
        </div>
        <div class="o-mid-right">
          ${d.email||d.phone||d.location||d.website?`<div class="o-sec">Contact</div>
            ${[{l:'Address',v:d.location},{l:'Phone',v:d.phone},{l:'Email',v:d.email},{l:'Web',v:d.website}].filter(x=>x.v).map(x=>`
              <div class="o-s-item"><strong>${x.l}:</strong> ${x.v}</div>`).join('')}`:''}
          ${d.skills.length?`<div class="o-sec">Skills</div>${d.skills.map(s=>`<div class="o-skill-item">${s}</div>`).join('')}`:''}
        </div>
      </div>
      ${d.education.some(e=>e.degree)?`<div class="o-sec">Education &amp; Training</div>${d.education.filter(e=>e.degree||e.school).map(e=>`
        <div class="o-edu-item">
          <div class="o-edu-deg">${e.degree}${e.year?', '+e.year:''}</div>
          <div class="o-edu-sub">${[e.school,e.gpa].filter(Boolean).join(' · ')}</div>
        </div>`).join('')}`:''}
    </div>
  </div>`;
}

function renderBold(d) {
  return `<div class="out-bold">
    <div class="o-hdr">
      <div class="o-name">Hi, I'm ${d.name.split(' ')[0]}${d.name.split(' ')[1]?' '+d.name.split(' ').slice(1).join(' '):''}.</div>
      ${d.title?`<div class="o-title">${d.title}</div>`:''}
    </div>
    <div class="o-contact-bar">
      ${[d.phone,d.email,d.location,d.website].filter(Boolean).map(x=>`<span>${x}</span>`).join('')}
    </div>
    <div class="o-body">
      ${d.summary?`<div class="o-row"><div class="o-row-label">Summary</div><div class="o-row-content"><div class="o-summary">${d.summary}</div></div></div>`:''}
      ${d.proficiencies.length?`<div class="o-row"><div class="o-row-label">Technical Proficiency</div><div class="o-row-content">${d.proficiencies.map(p=>`
        <div class="o-prof-item"><span class="o-prof-label">${p.label}:</span> ${p.values.join(', ')}</div>`).join('')}</div></div>`:''}
      ${d.skills.length?`<div class="o-row"><div class="o-row-label">Skills</div><div class="o-row-content"><div class="o-skills-grid">${d.skills.map(s=>`<div class="o-skill-item">${s}</div>`).join('')}</div></div></div>`:''}
      ${d.experiences.some(e=>e.title)?`<div class="o-row"><div class="o-row-label">Experience</div><div class="o-row-content">${d.experiences.filter(e=>e.title||e.company).map(e=>`
        <div class="o-exp-item">
          <div class="o-exp-head">
            <div><span class="o-exp-title">${e.title}</span>${e.company?`, <span class="o-exp-date">${[e.start,e.end].filter(Boolean).join(' – ')}</span>`:''}</div>
            ${!e.company&&(e.start||e.end)?`<div class="o-exp-date">${[e.start,e.end].filter(Boolean).join(' – ')}</div>`:''}
          </div>
          ${e.company?`<div class="o-exp-sub">${e.company}${e.start||e.end?' – '+[e.start,e.end].filter(Boolean).join(' – '):''}</div>`:''}
          ${e.desc?`<div class="o-exp-desc">${e.desc}</div>`:''}
        </div>`).join('')}</div></div>`:''}
      ${d.projects.some(p=>p.name)?`<div class="o-row"><div class="o-row-label">Projects</div><div class="o-row-content">${d.projects.filter(p=>p.name).map(p=>`
        <div class="o-exp-item">
          <div class="o-exp-head">
            <div class="o-exp-title">${p.name}${p.tech?` <span class="o-proj-tech">[${p.tech}]</span>`:''}</div>
            <div class="o-exp-date">${p.date}</div>
          </div>
          ${p.link?`<div class="o-exp-sub">${p.link}</div>`:''}
          ${p.desc?`<div class="o-exp-desc">${p.desc}</div>`:''}
        </div>`).join('')}</div></div>`:''}
      ${d.education.some(e=>e.degree)?`<div class="o-row"><div class="o-row-label">Education &amp; Training</div><div class="o-row-content">${d.education.filter(e=>e.degree||e.school).map(e=>`
        <div class="o-edu-item">
          <div class="o-edu-deg">${e.degree}${e.year?', '+e.year:''}</div>
          <div class="o-edu-sub">${[e.school,e.gpa].filter(Boolean).join(' · ')}</div>
        </div>`).join('')}</div></div>`:''}
    </div>
  </div>`;
}
