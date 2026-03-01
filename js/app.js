let skills = [];
let selectedTemplate = null;
let photoDataUrl = '';

function scrollTemplates(dir) {
  const grid = document.getElementById('templatesGrid');
  grid.scrollBy({ left: dir * 260, behavior: 'smooth' });
}
function updateScrollArrows() {
  const grid = document.getElementById('templatesGrid');
  if (!grid) return;
  const left = document.getElementById('scrollLeft');
  const right = document.getElementById('scrollRight');
  left.classList.toggle('hidden', grid.scrollLeft <= 10);
  right.classList.toggle('hidden', grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10);
}
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('templatesGrid');
  if (grid) {
    grid.addEventListener('scroll', updateScrollArrows);
    new ResizeObserver(updateScrollArrows).observe(grid);
  }
});

function collectData() {
  const g = id => document.getElementById(id)?.value?.trim() || '';
  const experiences = [];
  document.querySelectorAll('#experience-container .exp-block').forEach(block => {
    experiences.push({
      title: block.querySelector('[name=exp_title]')?.value?.trim() || '',
      company: block.querySelector('[name=exp_company]')?.value?.trim() || '',
      start: block.querySelector('[name=exp_start]')?.value?.trim() || '',
      end: block.querySelector('[name=exp_end]')?.value?.trim() || '',
      desc: block.querySelector('[name=exp_desc]')?.value?.trim() || '',
    });
  });
  const education = [];
  document.querySelectorAll('#education-container .exp-block').forEach(block => {
    education.push({
      degree: block.querySelector('[name=edu_degree]')?.value?.trim() || '',
      school: block.querySelector('[name=edu_school]')?.value?.trim() || '',
      year: block.querySelector('[name=edu_year]')?.value?.trim() || '',
      gpa: block.querySelector('[name=edu_gpa]')?.value?.trim() || '',
    });
  });
  const projects = [];
  document.querySelectorAll('#projects-container .exp-block').forEach(block => {
    projects.push({
      name: block.querySelector('[name=proj_name]')?.value?.trim() || '',
      tech: block.querySelector('[name=proj_tech]')?.value?.trim() || '',
      link: block.querySelector('[name=proj_link]')?.value?.trim() || '',
      date: block.querySelector('[name=proj_date]')?.value?.trim() || '',
      desc: block.querySelector('[name=proj_desc]')?.value?.trim() || '',
    });
  });
  const proficiencies = [];
  document.querySelectorAll('#proficiency-container .exp-block').forEach(block => {
    const label = block.querySelector('[name=prof_label]')?.value?.trim() || '';
    const values = block.querySelector('[name=prof_values]')?.value?.trim() || '';
    if (label || values) {
      proficiencies.push({ label, values: values.split(',').map(v => v.trim()).filter(Boolean) });
    }
  });
  return {
    name: g('fullName') || 'Your Name',
    title: g('jobTitle'),
    email: g('email'),
    phone: g('phone'),
    location: g('location'),
    website: g('website'),
    summary: g('summary'),
    photo: photoDataUrl,
    experiences,
    projects,
    education,
    skills,
    proficiencies,
  };
}

function generateResume() {
  const sec = document.getElementById('template-section');
  sec.classList.add('visible');
  document.getElementById('step2').classList.add('active');
  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(updateScrollArrows, 100);
}

function selectTemplate(name, card) {
  selectedTemplate = name;
  document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

function buildAndShowResume() {
  if (!selectedTemplate) {
    alert('Please select a template first!');
    return;
  }
  const data = collectData();
  const paper = document.getElementById('resume-paper');
  paper.innerHTML = renderTemplate(selectedTemplate, data);
  const out = document.getElementById('resume-output');
  out.classList.add('visible');
  document.getElementById('step3').classList.add('active');
  out.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
