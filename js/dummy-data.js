function fillDummyData() {
  document.getElementById('fullName').value = 'Jane Smith';
  document.getElementById('jobTitle').value = 'Senior Full-Stack Engineer';
  document.getElementById('email').value = 'jane.smith@email.com';
  document.getElementById('phone').value = '+1 (555) 987-6543';
  document.getElementById('location').value = 'San Francisco, CA';
  document.getElementById('website').value = 'linkedin.com/in/janesmith';
  document.getElementById('summary').value = 'Results-driven full-stack engineer with 8+ years of experience building scalable web applications. Passionate about clean architecture, performance optimization, and mentoring junior developers.';

  const expBlocks = document.querySelectorAll('#experience-container .exp-block');
  if (expBlocks.length > 0) {
    const b = expBlocks[0];
    b.querySelector('[name=exp_title]').value = 'Senior Software Engineer';
    b.querySelector('[name=exp_company]').value = 'Stripe';
    b.querySelector('[name=exp_start]').value = 'Mar 2021';
    b.querySelector('[name=exp_end]').value = 'Present';
    b.querySelector('[name=exp_desc]').value = 'Led a team of 5 engineers to rebuild the payments dashboard, reducing load time by 40%. Designed and implemented microservices architecture handling 10M+ daily transactions.';
  }
  addExperience();
  const expBlocks2 = document.querySelectorAll('#experience-container .exp-block');
  const b2 = expBlocks2[expBlocks2.length - 1];
  b2.querySelector('[name=exp_title]').value = 'Software Engineer';
  b2.querySelector('[name=exp_company]').value = 'Airbnb';
  b2.querySelector('[name=exp_start]').value = 'Jun 2018';
  b2.querySelector('[name=exp_end]').value = 'Feb 2021';
  b2.querySelector('[name=exp_desc]').value = 'Built and maintained core search features serving 50M+ users. Migrated legacy jQuery codebase to React, improving developer velocity by 30%.';

  const projBlocks = document.querySelectorAll('#projects-container .exp-block');
  if (projBlocks.length > 0) {
    projBlocks[0].querySelector('[name=proj_name]').value = 'Real-Time Chat Platform';
    projBlocks[0].querySelector('[name=proj_tech]').value = 'React, Socket.io, Redis, Node.js';
    projBlocks[0].querySelector('[name=proj_link]').value = 'github.com/janesmith/chat-app';
    projBlocks[0].querySelector('[name=proj_date]').value = '2023';
    projBlocks[0].querySelector('[name=proj_desc]').value = 'Built a scalable real-time messaging app supporting 5K concurrent users with typing indicators, read receipts, and end-to-end encryption.';
  }
  addProject();
  const projBlocks2 = document.querySelectorAll('#projects-container .exp-block');
  const pj2 = projBlocks2[projBlocks2.length - 1];
  pj2.querySelector('[name=proj_name]').value = 'ML-Powered Recommendation Engine';
  pj2.querySelector('[name=proj_tech]').value = 'Python, TensorFlow, FastAPI';
  pj2.querySelector('[name=proj_link]').value = 'github.com/janesmith/rec-engine';
  pj2.querySelector('[name=proj_date]').value = '2022';
  pj2.querySelector('[name=proj_desc]').value = 'Developed a collaborative filtering recommendation system achieving 92% accuracy on the MovieLens dataset.';

  const eduBlocks = document.querySelectorAll('#education-container .exp-block');
  if (eduBlocks.length > 0) {
    const e = eduBlocks[0];
    e.querySelector('[name=edu_degree]').value = 'B.S. Computer Science';
    e.querySelector('[name=edu_school]').value = 'UC Berkeley';
    e.querySelector('[name=edu_year]').value = '2018';
    e.querySelector('[name=edu_gpa]').value = '3.8 GPA, Dean\'s List';
  }

  skills = ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'];
  renderSkills();

  const profBlocks = document.querySelectorAll('#proficiency-container .exp-block');
  if (profBlocks.length > 0) {
    profBlocks[0].querySelector('[name=prof_label]').value = 'Programming Languages';
    profBlocks[0].querySelector('[name=prof_values]').value = 'JavaScript, TypeScript, Python, Go, SQL';
  }
  addProficiency();
  const profBlocks2 = document.querySelectorAll('#proficiency-container .exp-block');
  const p2 = profBlocks2[profBlocks2.length - 1];
  p2.querySelector('[name=prof_label]').value = 'Frameworks & Tools';
  p2.querySelector('[name=prof_values]').value = 'React, Next.js, Express, Django, Terraform';
  addProficiency();
  const profBlocks3 = document.querySelectorAll('#proficiency-container .exp-block');
  const p3 = profBlocks3[profBlocks3.length - 1];
  p3.querySelector('[name=prof_label]').value = 'Cloud & DevOps';
  p3.querySelector('[name=prof_values]').value = 'AWS, GCP, Docker, Kubernetes, CI/CD';
}
