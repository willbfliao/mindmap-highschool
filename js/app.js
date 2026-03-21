/* ===== Shared Utilities ===== */

const STORAGE_PREFIX = 'bio-mindmap-';

function getTopicParam() {
  return new URLSearchParams(window.location.search).get('topic');
}

async function loadTopics() {
  const res = await fetch('content/topics.json');
  return res.json();
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
    section.innerHTML = `<h2 class="category-title">${category.name}</h2>`;

    const grid = document.createElement('div');
    grid.className = 'card-grid';

    for (const topic of category.topics) {
      const card = document.createElement('div');
      card.className = 'card' + (isRead(topic.id) ? ' completed' : '');
      card.innerHTML = `
        <div class="card-check">✓</div>
        <div class="card-icon">${topic.icon}</div>
        <div class="card-title">${topic.title}</div>
        <div class="card-title-en">${topic.titleEn}</div>
        <div class="card-meta">
          <span class="card-badge exam">學測佔比 ${topic.examRatio}%</span>
        </div>
        <div class="card-actions">
          <a href="viewer.html?topic=${topic.id}" class="btn btn-primary">查看心智圖</a>
          <a href="quiz.html?topic=${topic.id}" class="btn btn-secondary">📝 練習</a>
        </div>
      `;
      grid.appendChild(card);
    }

    section.appendChild(grid);
    container.appendChild(section);
  }
}

/* ===== Viewer (Markmap) ===== */

async function initViewer() {
  const topicId = getTopicParam();
  if (!topicId) { window.location.href = 'index.html'; return; }

  const data = await loadTopics();
  const allTopics = getAllTopics(data);
  const topic = allTopics.find(t => t.id === topicId);
  if (!topic) { window.location.href = 'index.html'; return; }

  // Title
  document.title = topic.title + ' - 心智圖';
  document.getElementById('viewer-title').textContent = topic.icon + ' ' + topic.title;

  // Mark read button
  const btnRead = document.getElementById('btn-mark-read');
  updateReadButton(btnRead, topicId);
  btnRead.addEventListener('click', () => {
    if (isRead(topicId)) {
      markAsUnread(topicId);
    } else {
      markAsRead(topicId);
    }
    updateReadButton(btnRead, topicId);
  });

  // Quiz button
  document.getElementById('btn-quiz').addEventListener('click', () => {
    window.location.href = 'quiz.html?topic=' + topicId;
  });

  // Fetch markdown and render
  try {
    const res = await fetch('content/' + topic.file);
    const md = await res.text();

    const { Transformer } = window.markmap;
    const transformer = new Transformer();
    const { root } = transformer.transform(md);

    const svgEl = document.getElementById('mindmap-svg');
    const { Markmap } = window.markmap;
    const mm = Markmap.create(svgEl, {
      colorFreezeLevel: 2,
      initialExpandLevel: 2,
      paddingX: 16
    }, root);

    // Fit button
    document.getElementById('btn-fit').addEventListener('click', () => {
      mm.fit();
    });
  } catch (err) {
    document.getElementById('mindmap-svg').outerHTML =
      '<div class="loading" style="height:80vh">無法載入心智圖內容</div>';
  }
}

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
      ${q.year ? `<span class="question-year">${q.year} 年學測</span>` : ''}
      <div class="question-text">${q.text}</div>
      <ul class="options-list">
        ${q.options.map((opt, oi) => {
          const letter = String.fromCharCode(65 + oi);
          return `<li><button class="option-btn" data-letter="${letter}">${opt}</button></li>`;
        }).join('')}
      </ul>
      <div class="explanation">${q.explanation || ''}</div>
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
