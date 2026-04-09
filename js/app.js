/* ===== Shared Utilities ===== */

const STORAGE_PREFIX = 'bio-mindmap-';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

async function loadSubjects() {
  try {
    const res = await fetch('content/subjects.json');
    if (!res.ok) throw new Error(res.status);
    return res.json();
  } catch {
    document.body.innerHTML =
      '<div class="loading" style="height:100vh">無法載入科目資料，請檢查網路連線後重新整理</div>';
    throw new Error('Failed to load subjects.json');
  }
}

function getContentBase(subjectId, subId) {
  return subId ? `content/${subjectId}/${subId}` : `content/${subjectId}`;
}

function getQuestionBase(subjectId, subId) {
  return subId ? `questions/${subjectId}/${subId}` : `questions/${subjectId}`;
}

async function loadTopicsFor(subjectId, subId) {
  const base = getContentBase(subjectId, subId);
  const res = await fetch(base + '/topics.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

function getAllTopics(data) {
  return data.categories.flatMap(c => c.topics);
}

function buildReadKey(subjectId, subId, topicId) {
  const parts = [subjectId];
  if (subId) parts.push(subId);
  parts.push(topicId);
  return STORAGE_PREFIX + 'read-' + parts.join('-');
}

function isRead(subjectId, subId, topicId) {
  return localStorage.getItem(buildReadKey(subjectId, subId, topicId)) === '1';
}

function markAsRead(subjectId, subId, topicId) {
  localStorage.setItem(buildReadKey(subjectId, subId, topicId), '1');
}

function markAsUnread(subjectId, subId, topicId) {
  localStorage.removeItem(buildReadKey(subjectId, subId, topicId));
}

function buildViewerUrl(subjectId, subId, topicId) {
  let url = 'viewer.html?subject=' + encodeURIComponent(subjectId);
  if (subId) url += '&sub=' + encodeURIComponent(subId);
  if (topicId) url += '&topic=' + encodeURIComponent(topicId);
  return url;
}

/* ===== Node-level progress (checkbox) ===== */

function buildNodeKey(subjectId, subId, pathParts) {
  const parts = [subjectId];
  if (subId) parts.push(subId);
  return STORAGE_PREFIX + 'node-' + parts.concat(pathParts).join('-');
}

function isNodeChecked(nodeId) {
  const val = localStorage.getItem(nodeId);
  return val === '1' || (val && val.length > 1);
}

function getNodeCheckedTime(nodeId) {
  const val = localStorage.getItem(nodeId);
  if (!val || val === '1') return null;
  return val;
}

function toggleNodeCheck(nodeId) {
  if (isNodeChecked(nodeId)) {
    localStorage.removeItem(nodeId);
  } else {
    localStorage.setItem(nodeId, new Date().toISOString());
  }
}

/* ===== Per-subject last location ===== */

function saveSubjectLocation(subjectId, sub, topic) {
  localStorage.setItem(
    STORAGE_PREFIX + 'last-' + subjectId,
    JSON.stringify({ sub: sub || null, topic: topic || null })
  );
}

function getSubjectLocation(subjectId) {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'last-' + subjectId));
  } catch {
    return null;
  }
}

/* ===== Zoom/pan state per view ===== */

function buildViewKey(subjectId, subId, topicId) {
  const parts = [subjectId];
  if (subId) parts.push(subId);
  if (topicId) parts.push(topicId);
  return STORAGE_PREFIX + 'view-' + parts.join('-');
}

function saveViewTransform(subjectId, subId, topicId, transform) {
  localStorage.setItem(buildViewKey(subjectId, subId, topicId),
    JSON.stringify({ k: transform.k, x: transform.x, y: transform.y })
  );
}

function getViewTransform(subjectId, subId, topicId) {
  try {
    return JSON.parse(localStorage.getItem(buildViewKey(subjectId, subId, topicId)));
  } catch { return null; }
}

function buildQuizUrl(subjectId, subId, topicId) {
  let url = 'quiz.html?subject=' + encodeURIComponent(subjectId);
  if (subId) url += '&sub=' + encodeURIComponent(subId);
  url += '&topic=' + encodeURIComponent(topicId);
  return url;
}

function buildSubjectUrl(subjectId, subId) {
  let url = 'subject.html?subject=' + encodeURIComponent(subjectId);
  if (subId) url += '&sub=' + encodeURIComponent(subId);
  return url;
}

/* ===== Homepage (Subject Selection) ===== */

async function initHomepage() {
  const data = await loadSubjects();

  document.getElementById('site-title').textContent = data.title;
  document.getElementById('site-subtitle').textContent = data.subtitle;

  const container = document.getElementById('subjects-container');
  const grid = document.createElement('div');
  grid.className = 'subject-grid';

  for (const subject of data.subjects) {
    const card = document.createElement('a');
    // Subjects without sub-subjects go directly to viewer (merged mind map)
    const lastLoc = getSubjectLocation(subject.id);
    card.href = lastLoc
      ? buildViewerUrl(subject.id, lastLoc.sub, lastLoc.topic)
      : (subject.hasSubjects
          ? buildSubjectUrl(subject.id)
          : ('viewer.html?subject=' + encodeURIComponent(subject.id)));
    card.className = 'subject-card';
    card.style.borderColor = subject.color;

    card.innerHTML = `
      <div class="subject-icon">${escapeHtml(subject.icon)}</div>
      <div class="subject-info">
        <div class="subject-title">${escapeHtml(subject.title)}</div>
        <div class="subject-title-en">${escapeHtml(subject.titleEn)}</div>
        <div class="subject-desc">${escapeHtml(subject.description)}</div>
      </div>
    `;

    grid.appendChild(card);
  }

  container.appendChild(grid);
}

/* ===== Subject Page ===== */

async function initSubject() {
  const subjectId = getParam('subject');
  const subId = getParam('sub');
  if (!subjectId) { window.location.href = 'index.html'; return; }

  const data = await loadSubjects();
  const subject = data.subjects.find(s => s.id === subjectId);
  if (!subject) { window.location.href = 'index.html'; return; }

  // Back button
  const backBtn = document.getElementById('back-btn');
  if (subId) {
    backBtn.href = buildSubjectUrl(subjectId);
    document.getElementById('subject-title').textContent = subject.icon + ' ' + subject.title;
  } else {
    backBtn.href = 'index.html';
    document.getElementById('subject-title').textContent = subject.icon + ' ' + subject.title;
  }

  // If subject has sub-subjects and no sub selected → show sub-subject cards
  if (subject.hasSubjects && !subId) {
    renderSubSubjects(subject);
    return;
  }

  // Validate sub-subject if specified
  if (subId && subject.subSubjects) {
    const sub = subject.subSubjects.find(s => s.id === subId);
    if (!sub) { window.location.href = buildSubjectUrl(subjectId); return; }
    document.getElementById('subject-title').textContent = subject.icon + ' ' + subject.title + ' / ' + sub.title;
  }

  // Load topics for this subject/sub
  try {
    const topicsData = await loadTopicsFor(subjectId, subId);
    renderTopicsList(topicsData, subjectId, subId);
  } catch {
    document.getElementById('content-container').innerHTML =
      '<div class="loading" style="height:30vh">尚無主題內容</div>';
  }
}

function renderSubSubjects(subject) {
  document.getElementById('page-title').textContent = subject.title;
  document.getElementById('page-subtitle').textContent = subject.description || '';

  // Hide progress for sub-subject selection
  const progressSection = document.querySelector('.progress-section');
  if (progressSection) progressSection.style.display = 'none';

  const container = document.getElementById('content-container');
  const grid = document.createElement('div');
  grid.className = 'subject-grid';

  for (const sub of subject.subSubjects) {
    const card = document.createElement('a');
    card.href = buildViewerUrl(subject.id, sub.id);
    card.className = 'subject-card';
    card.style.borderColor = sub.color;

    card.innerHTML = `
      <div class="subject-icon">${escapeHtml(sub.icon)}</div>
      <div class="subject-info">
        <div class="subject-title">${escapeHtml(sub.title)}</div>
        <div class="subject-title-en">${escapeHtml(sub.titleEn)}</div>
      </div>
    `;

    grid.appendChild(card);
  }

  container.appendChild(grid);
}

function renderTopicsList(topicsData, subjectId, subId) {
  const allTopics = getAllTopics(topicsData);

  document.getElementById('page-title').textContent = topicsData.title;
  document.getElementById('page-subtitle').textContent = topicsData.subtitle;
  document.title = topicsData.title;

  // Progress
  const readCount = allTopics.filter(t => isRead(subjectId, subId, t.id)).length;
  const total = allTopics.length;
  document.getElementById('progress-text').textContent = `${readCount} / ${total}`;
  document.getElementById('progress-fill').style.width = total > 0 ? `${(readCount / total) * 100}%` : '0%';

  if (total === 0) {
    document.getElementById('content-container').innerHTML =
      '<div class="loading" style="height:30vh">尚無主題內容，敬請期待</div>';
    return;
  }

  const container = document.getElementById('content-container');
  for (const category of topicsData.categories) {
    const section = document.createElement('section');
    section.className = 'category';
    const h2 = document.createElement('h2');
    h2.className = 'category-title';
    h2.textContent = category.name;
    if (category.tag) {
      const tag = document.createElement('span');
      tag.className = 'category-tag' + (category.tag === '必修' ? ' required' : ' elective');
      tag.textContent = category.tag;
      h2.appendChild(tag);
    }
    section.appendChild(h2);

    const grid = document.createElement('div');
    grid.className = 'card-grid';

    for (const topic of category.topics) {
      const card = document.createElement('div');
      card.className = 'card' + (isRead(subjectId, subId, topic.id) ? ' completed' : '');
      card.innerHTML = `
        <div class="card-check">✓</div>
        <div class="card-icon">${escapeHtml(topic.icon)}</div>
        <div class="card-title">${escapeHtml(topic.title)}</div>
        <div class="card-title-en">${escapeHtml(topic.titleEn)}</div>
        <div class="card-meta">
          <span class="card-badge exam">學測佔比 ${escapeHtml(String(topic.examRatio))}%</span>
        </div>
        <div class="card-actions">
          <a href="${buildViewerUrl(subjectId, subId, topic.id)}" class="btn btn-primary">查看心智圖</a>
          <a href="${buildQuizUrl(subjectId, subId, topic.id)}" class="btn btn-secondary">📝 練習</a>
        </div>
      `;
      grid.appendChild(card);
    }

    section.appendChild(grid);
    container.appendChild(section);
  }
}

/* ===== Viewer (Markmap) ===== */
// Viewer initialization logic is in viewer.html inline script (uses markmap-autoloader)

function updateReadButton(btn, subjectId, subId, topicId) {
  if (isRead(subjectId, subId, topicId)) {
    btn.textContent = '✓ 已完成';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');
  } else {
    btn.textContent = '☐ 標記已讀';
    btn.classList.remove('btn-secondary');
    btn.classList.add('btn-primary');
  }
}

/* ===== Quiz ===== */

async function initQuiz() {
  const subjectId = getParam('subject');
  const subId = getParam('sub');
  const topicId = getParam('topic');
  if (!subjectId || !topicId) { window.location.href = 'index.html'; return; }

  let topicsData;
  try {
    topicsData = await loadTopicsFor(subjectId, subId);
  } catch {
    document.getElementById('questions-container').innerHTML =
      '<div class="loading" style="height:30vh">無法載入主題資料</div>';
    return;
  }
  const allTopics = getAllTopics(topicsData);
  const topic = allTopics.find(t => t.id === topicId);
  if (!topic) { window.location.href = buildSubjectUrl(subjectId, subId); return; }

  document.title = topic.title + ' - 題庫練習';
  document.getElementById('quiz-title').textContent = topic.icon + ' ' + topic.title + ' 題庫';
  document.getElementById('quiz-heading').textContent = topic.title + ' — 學測練習題';

  // Back button
  document.getElementById('back-btn').href = buildSubjectUrl(subjectId, subId);

  // Mindmap button
  document.getElementById('btn-mindmap').addEventListener('click', () => {
    window.location.href = buildViewerUrl(subjectId, subId, topicId);
  });

  // Load questions
  const questionBase = getQuestionBase(subjectId, subId);
  try {
    const res = await fetch(questionBase + '/' + topicId + '.json');
    if (!res.ok) throw new Error(res.status);
    const qData = await res.json();
    renderQuiz(qData);
  } catch {
    document.getElementById('questions-container').innerHTML =
      '<div class="loading" style="height:30vh">題庫尚未建立</div>';
  }
}

function renderQuiz(qData) {
  const container = document.getElementById('questions-container');
  const questions = qData.questions;
  const total = questions.length;
  let answered = 0;
  let correct = 0;

  document.getElementById('quiz-progress').textContent =
    qData.year_stats + ` · 共 ${total} 題`;

  questions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.innerHTML = `
      <div class="question-number">第 ${idx + 1} 題 / 共 ${total} 題</div>
      ${q.year ? `<span class="question-year">${escapeHtml(String(q.year))} 年學測</span>` : ''}
      <div class="question-text">${escapeHtml(q.text)}</div>
      <ul class="options-list">
        ${q.options.map((opt, oi) => {
          const letter = String.fromCharCode(65 + oi);
          return `<li><button class="option-btn" data-letter="${letter}">${escapeHtml(opt)}</button></li>`;
        }).join('')}
      </ul>
      <div class="explanation">${escapeHtml(q.explanation || '')}</div>
    `;

    const buttons = card.querySelectorAll('.option-btn');
    const explanation = card.querySelector('.explanation');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) return;

        answered++;
        const chosen = btn.dataset.letter;
        const isCorrect = chosen === q.answer;
        if (isCorrect) correct++;

        buttons.forEach(b => {
          b.classList.add('disabled');
          if (b.dataset.letter === q.answer) b.classList.add('correct');
        });
        if (!isCorrect) btn.classList.add('wrong');

        if (q.explanation) explanation.classList.add('show');

        if (answered === total) {
          showScore(correct, total);
        }
      });
    });

    container.appendChild(card);
  });
}

function showScore(correct, total) {
  const summary = document.getElementById('score-summary');
  document.getElementById('score-number').textContent = `${correct} / ${total}`;
  document.getElementById('score-label').textContent =
    `答對率 ${Math.round((correct / total) * 100)}%`;
  summary.classList.add('show');
  summary.scrollIntoView({ behavior: 'smooth' });
}
