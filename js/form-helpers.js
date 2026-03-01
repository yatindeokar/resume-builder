function handleSkillInput(e) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    const val = e.target.value.trim().replace(/,$/, '');
    if (val) addSkill(val);
    e.target.value = '';
  } else if (e.key === 'Backspace' && e.target.value === '' && skills.length > 0) {
    removeSkill(skills.length - 1);
  }
}
function addSkill(name) {
  if (!skills.includes(name)) {
    skills.push(name);
    renderSkills();
  }
}
function removeSkill(idx) {
  skills.splice(idx, 1);
  renderSkills();
}
function renderSkills() {
  const c = document.getElementById('skillsContainer');
  const input = document.getElementById('skillInput');
  c.innerHTML = '';
  skills.forEach((s, i) => {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `${s}<button onclick="removeSkill(${i})" type="button">✕</button>`;
    c.appendChild(tag);
  });
  c.appendChild(input);
  input.focus();
}

function addExperience() {
  const c = document.getElementById('experience-container');
  const d = document.createElement('div');
  d.className = 'exp-block';
  d.style.animation = 'fadeUp 0.3s ease both';
  d.innerHTML = `<button type="button" class="remove-btn" onclick="removeBlock(this)" title="Remove">✕</button>
  <div class="form-grid">
    <div class="form-group"><label>Job Title</label><input type="text" name="exp_title" placeholder="Software Engineer"></div>
    <div class="form-group"><label>Company</label><input type="text" name="exp_company" placeholder="Tech Inc."></div>
    <div class="form-group"><label>Start Date</label><input type="text" name="exp_start" placeholder="Mar 2019"></div>
    <div class="form-group"><label>End Date</label><input type="text" name="exp_end" placeholder="Dec 2020"></div>
    <div class="form-group full"><label>Description</label><textarea name="exp_desc" placeholder="Describe your role and achievements..."></textarea></div>
  </div>`;
  c.appendChild(d);
}
function addEducation() {
  const c = document.getElementById('education-container');
  const d = document.createElement('div');
  d.className = 'exp-block';
  d.style.animation = 'fadeUp 0.3s ease both';
  d.innerHTML = `<button type="button" class="remove-btn" onclick="removeBlock(this)" title="Remove">✕</button>
  <div class="form-grid">
    <div class="form-group"><label>Degree</label><input type="text" name="edu_degree" placeholder="M.S. Data Science"></div>
    <div class="form-group"><label>Institution</label><input type="text" name="edu_school" placeholder="Stanford University"></div>
    <div class="form-group"><label>Year</label><input type="text" name="edu_year" placeholder="2020"></div>
    <div class="form-group"><label>GPA / Honors (optional)</label><input type="text" name="edu_gpa" placeholder=""></div>
  </div>`;
  c.appendChild(d);
}
function addProject() {
  const c = document.getElementById('projects-container');
  const d = document.createElement('div');
  d.className = 'exp-block';
  d.style.animation = 'fadeUp 0.3s ease both';
  d.innerHTML = `<button type="button" class="remove-btn" onclick="removeBlock(this)" title="Remove">✕</button>
  <div class="form-grid">
    <div class="form-group"><label>Project Name</label><input type="text" name="proj_name" placeholder="Portfolio Website"></div>
    <div class="form-group"><label>Technologies</label><input type="text" name="proj_tech" placeholder="Next.js, Tailwind CSS"></div>
    <div class="form-group"><label>Link (optional)</label><input type="text" name="proj_link" placeholder="github.com/user/project"></div>
    <div class="form-group"><label>Date / Duration</label><input type="text" name="proj_date" placeholder="2022"></div>
    <div class="form-group full"><label>Description</label><textarea name="proj_desc" placeholder="Describe what you built..."></textarea></div>
  </div>`;
  c.appendChild(d);
}
function addProficiency() {
  const c = document.getElementById('proficiency-container');
  const d = document.createElement('div');
  d.className = 'exp-block';
  d.style.animation = 'fadeUp 0.3s ease both';
  d.innerHTML = `<button type="button" class="remove-btn" onclick="removeBlock(this)" title="Remove">✕</button>
  <div class="form-grid">
    <div class="form-group"><label>Label</label><input type="text" name="prof_label" placeholder="Frameworks"></div>
    <div class="form-group"><label>Values (comma separated)</label><input type="text" name="prof_values" placeholder="React, Angular, Django"></div>
  </div>`;
  c.appendChild(d);
}
function removeBlock(btn) {
  btn.closest('.exp-block').remove();
}
