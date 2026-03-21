# 🧬 Bio-Mindmap 高中生物心智圖

互動式學習工具，專為台灣高中生物「人體生理」單元設計。透過 [Markmap](https://markmap.js.org/) 心智圖呈現知識架構，搭配歷屆學測試題練習。

## 功能特色

- 🗺️ **互動式心智圖** — 以樹狀結構瀏覽 8 大人體生理系統知識
- 📝 **學測題庫練習** — 105–114 年歷屆試題，附完整解析
- 📊 **學習進度追蹤** — 標記已讀章節，一眼掌握複習進度
- 📱 **響應式設計** — 桌機、平板、手機皆可使用

## 涵蓋主題

| 系統 | 學測佔比 | 題數 |
|------|---------|------|
| 🧠 神經系統 | 14% | 8 |
| ⚗️ 內分泌系統 | 12% | 8 |
| ❤️ 循環系統 | 10% | 8 |
| 🛡️ 免疫系統 | 11% | 8 |
| 🍽️ 消化系統 | 8% | 8 |
| 🫁 呼吸系統 | 7% | 8 |
| 💧 泌尿系統 | 6% | 8 |
| 🧬 生殖系統 | 8% | 8 |

## 本機開發

本專案為純靜態網站，不需要任何建置工具。

```bash
# 複製專案
git clone https://github.com/<your-username>/bio-mindmap.git
cd bio-mindmap

# 啟動本機伺服器（任選一種）
python3 -m http.server 8000
# 或
npx http-server
```

開啟瀏覽器前往 `http://localhost:8000` 即可。

## 專案架構

```
bio-mindmap/
├── index.html              # 首頁：主題卡片 + 學習進度
├── viewer.html             # 心智圖檢視器（Markmap）
├── quiz.html               # 題庫練習 + 計分
├── js/
│   └── app.js              # 所有應用邏輯（共用工具、首頁、檢視器、測驗）
├── css/
│   └── style.css           # 全站樣式（CSS 自訂屬性主題化）
├── content/
│   ├── topics.json         # 主題索引（分類、metadata）
│   └── *.md                # 各系統心智圖 Markdown 原始檔
├── questions/
│   └── *.json              # 各系統學測題庫
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages 自動部署
```

### 頁面導航流程

```
首頁 (index.html)
  ├── 查看心智圖 → viewer.html?topic={id}
  └── 練習題 → quiz.html?topic={id}
```

頁面間透過 URL 查詢參數 `?topic=nervous-system` 傳遞主題 ID。

### 資料流

1. `content/topics.json` 為主題索引，定義所有系統的 metadata（ID、標題、圖示、顏色、學測佔比、題數）
2. `content/*.md` 為 Markmap 心智圖原始 Markdown，`#`/`##`/`###` 標題定義節點層級
3. `questions/*.json` 為題庫資料，每題包含題目、選項、答案與解析
4. 學習進度透過 `localStorage` 儲存，以 `bio-mindmap-read-{topicId}` 為 key

## 技術棧

- **Vanilla JavaScript** — 無框架、無 TypeScript、無打包工具
- **Markmap** — 透過 CDN (`jsDelivr`) 載入，將 Markdown 渲染為互動心智圖
- **CSS 自訂屬性** — `:root` 中定義主題色彩變數
- **LocalStorage** — 追蹤已閱讀/完成狀態
- **GitHub Pages** — 推送至 `main` 分支自動部署

## 新增主題

請參閱 [內容撰寫指南](docs/content-guide.md) 了解如何新增主題、撰寫心智圖 Markdown 及建立題庫 JSON。

## 部署

推送至 `main` 分支即自動部署至 GitHub Pages（透過 `.github/workflows/deploy.yml`）。無需建置步驟，所有檔案直接提供服務。

## 授權條款

本專案僅供教育用途。
