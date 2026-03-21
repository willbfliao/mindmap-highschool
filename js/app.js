/* ===== Shared Utilities ===== */

const STORAGE_PREFIX = 'bio-mindmap-';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getTopicParam() {
  return new URLSearchParams(window.location.search).get('topic');
}

async function loadTopics() {
  try {
    const res = await fetch('content/topics.json');
    return res.json();
  } catch {
    document.body.innerHTML =
      '<div class="loading" style="height:100vh">無法載入主題資料，請檢查網路連線後重新整理</div>';
    throw new Error('Failed to load topics.json');
  }
}

function getAllTopics(data) {
  return data.categories.flatMap(c => c.topics);
}

function isRead(topicId) {
  return localStorage.getItem(STORAGE_PREFIX + 'read-' + topicId) === '1';
}

function markAsRead(topicId) {
  localStorage.setItem(STORAGE_PREFIX + 'read-' + topicId, '1');
}

function markAsUnread(topicId) {
  localStorage.removeItem(STORAGE_PREFIX + 'read-' + topicId);
}

/* ===== Homepage ===== */

async function initHomepage() {
  const data = await loadTopics();
  const allTopics = getAllTopics(data);

  document.getElementById('site-title').textContent = data.title;
  document.getElementById('site-subtitle').textContent = data.subtitle;

  // Progress
  const readCount = allTopics.filter(t => isRead(t.id)).length;
  const total = allTopics.length;
  document.getElementById('progress-text').textContent = `${readCount} / ${total}`;
  document.getElementById('progress-fill').style.width = total > 0 ? `${(readCount / total) * 100}%` : '0%';

  // Categories
  const container = document.getElementById('categories-container');
  for (const category of data.categories) {
    const section = document.createElement('section');
    section.className = 'category';
    const h2 = document.createElement('h2');
    h2.className = 'category-title';
    h2.textContent = category.name;
    section.appendChild(h2);

    const grid = document.createElement('div');
    grid.className = 'card-grid';

    for (const topic of category.topics) {
      const card = document.createElement('div');
      card.className = 'card' + (isRead(topic.id) ? ' completed' : '');
      card.innerHTML = `
        <div class="card-check">✓</div>
        <div class="card-icon">${escapeHtml(topic.icon)}</div>
        <div class="card-title">${escapeHtml(topic.title)}</div>
        <div class="card-title-en">${escapeHtml(topic.titleEn)}</div>
        <div class="card-meta">
          <span class="card-badge exam">學測佔比 ${escapeHtml(String(topic.examRatio))}%</span>
        </div>
        <div class="card-actions">
          <a href="viewer.html?topic=${encodeURIComponent(topic.id)}" class="btn btn-primary">查看心智圖</a>
          <a href="quiz.html?topic=${encodeURIComponent(topic.id)}" class="btn btn-secondary">📝 練習</a>
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

function updateReadButton(btn, topicId) {
  if (isRead(topicId)) {
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
  const topicId = getTopicParam();
  if (!topicId) { window.location.href = 'index.html'; return; }

  const data = await loadTopics();
  const allTopics = getAllTopics(data);
  const topic = allTopics.find(t => t.id === topicId);
  if (!topic) { window.location.href = 'index.html'; return; }

  document.title = topic.title + ' - 題庫練習';
  document.getElementById('quiz-title').textContent = topic.icon + ' ' + topic.title + ' 題庫';
  document.getElementById('quiz-heading').textContent = topic.title + ' — 學測練習題';

  // Mindmap button
  document.getElementById('btn-mindmap').addEventListener('click', () => {
    window.location.href = 'viewer.html?topic=' + topicId;
  });

  // Load questions
  try {
    const res = await fetch('questions/' + topicId + '.json');
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

        // Disable all
        buttons.forEach(b => {
          b.classList.add('disabled');
          if (b.dataset.letter === q.answer) b.classList.add('correct');
        });
        if (!isCorrect) btn.classList.add('wrong');

        // Show explanation
        if (q.explanation) explanation.classList.add('show');

        // Check if all done
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
