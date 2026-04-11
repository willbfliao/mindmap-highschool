# 高中心智圖

多科目互動式學習工具，專為台灣高中學測設計。透過 [Markmap](https://markmap.js.org/) 心智圖呈現知識架構，搭配歷屆學測試題練習。涵蓋國文、英文、數學、自然（物理/化學/生物/地科）、社會（歷史/地理/公民）五大領域。

## 功能特色

- 🗺️ **互動式心智圖** — 以樹狀結構瀏覽各科目知識架構
- 📝 **學測題庫練習** — 歷屆試題，附完整解析
- 📊 **學習進度追蹤** — 標記已讀章節與節點完成狀態，一眼掌握複習進度
- 📱 **響應式設計** — 桌機、平板、手機皆可使用
- 🔍 **概念與考試側欄** — 查看關聯概念、考試重點與相關題目

## 涵蓋科目

| 科目 | 子科目 | 主題數 | 題庫數 | 狀態 |
|------|--------|--------|--------|------|
| 📜 國文 | — | 21 | 21 | ✅ 已完成 |
| 🔬 自然 — 化學 | 🧪 化學 | 27 | 26 | ✅ 已完成 |
| 🔬 自然 — 物理 | ⚡ 物理 | 27 | 5 | 🚧 開發中 |
| 🔬 自然 — 生物 | 🧬 生物 | 9 | 8 | ✅ 已完成 |
| 📐 數學 | — | 4 | 4 | 🚧 開發中 |
| 🔬 自然 — 地科 | 🌍 地球科學 | — | — | 📋 即將推出 |
| 🔤 英文 | — | — | — | 📋 即將推出 |
| 🌏 社會 | 📖 歷史 / 🗺️ 地理 / ⚖️ 公民 | — | — | 📋 即將推出 |

## 本機開發

本專案為純靜態網站，不需要任何建置工具。

```bash
# 複製專案
git clone https://github.com/willbfliao/mindmap-highschool.git
cd mindmap-highschool

# 啟動本機伺服器（任選一種）
python3 -m http.server 8000
# 或
npx http-server
```

開啟瀏覽器前往 `http://localhost:8000` 即可。

## 專案架構

```
高中心智圖/
├── index.html              # 首頁：科目選擇卡片
├── subject.html            # 子科目或主題列表頁
├── viewer.html             # 心智圖檢視器（Markmap）+ 側欄
├── quiz.html               # 題庫練習 + 計分
├── js/
│   └── app.js              # 所有應用邏輯（共用工具、首頁、科目、檢視器、測驗）
├── css/
│   └── style.css           # 全站樣式（CSS 自訂屬性主題化）
├── content/
│   ├── subjects.json       # 科目主索引（科目、子科目階層）
│   ├── {subject}/
│   │   ├── topics.json     # 主題索引（無子科目的科目，如國文、數學）
│   │   └── {sub}/
│   │       ├── topics.json # 主題索引（有子科目的科目，如自然/生物）
│   │       ├── *.md        # 心智圖 Markdown 原始檔
│   │       └── details/
│   │           └── *.json  # 節點詳細資料（關聯概念、考試重點）
├── questions/
│   ├── {subject}/
│   │   └── *.json          # 題庫（無子科目的科目）
│   │   └── {sub}/
│   │       └── *.json      # 題庫（有子科目的科目）
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages 自動部署
```

### 頁面導航流程

```
首頁 (index.html)
  └── 選擇科目
        ├── 無子科目 → subject.html?subject={id}（主題列表）
        │     ├── 查看心智圖 → viewer.html?subject={id}&topic={topicId}
        │     └── 練習題 → quiz.html?subject={id}&topic={topicId}
        └── 有子科目 → subject.html?subject={id}（子科目列表）
              └── 選擇子科目 → subject.html?subject={id}&sub={subId}（主題列表）
                    ├── 查看心智圖 → viewer.html?subject={id}&sub={subId}&topic={topicId}
                    └── 練習題 → quiz.html?subject={id}&sub={subId}&topic={topicId}
```

頁面間透過 URL 查詢參數傳遞科目與主題 ID。

### 資料流

1. `content/subjects.json` 為科目主索引，定義所有科目與子科目的階層結構
2. `content/{subject}/topics.json` 或 `content/{subject}/{sub}/topics.json` 為主題索引
3. `content/{subject}/{sub}/*.md` 為 Markmap 心智圖原始 Markdown，`#`/`##`/`###` 標題定義節點層級
4. `content/{subject}/{sub}/details/*.json` 提供節點關聯概念（`associations`）與考試重點（`examTips`）
5. `questions/{subject}/{sub}/*.json` 為題庫資料，每題包含題目、選項、答案、解析與 `tags`
6. 學習進度透過 `localStorage` 儲存，節點完成狀態以 ISO 時間戳記錄

## 技術棧

- **Vanilla JavaScript** — 無框架、無 TypeScript、無打包工具
- **Markmap** — 透過 CDN (`jsDelivr`) 載入（`markmap-lib@0.15`、`markmap-view@0.15`、`d3@7`）
- **CSS 自訂屬性** — `:root` 中定義主題色彩變數
- **LocalStorage** — 追蹤已閱讀/完成狀態與節點級別進度
- **GitHub Pages** — 推送至 `main` 分支自動部署

## 新增主題

請參閱 [內容撰寫指南](docs/content-guide.md) 了解如何新增主題、撰寫心智圖 Markdown 及建立題庫 JSON。

## 部署

推送至 `main` 分支即自動部署至 GitHub Pages（透過 `.github/workflows/deploy.yml`）。無需建置步驟，所有檔案直接提供服務。

## 授權條款

本專案僅供教育用途。
