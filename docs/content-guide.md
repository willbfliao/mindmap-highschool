# 內容撰寫指南

本指南說明如何為 Bio-Mindmap 新增主題內容、撰寫心智圖 Markdown 及建立題庫 JSON。

## 新增主題步驟

新增一個主題需要修改/建立 3 個檔案：

1. `content/{topic-id}.md` — 心智圖 Markdown 原始檔
2. `questions/{topic-id}.json` — 題庫資料
3. `content/topics.json` — 在主題索引中註冊新主題

### 步驟一：建立心智圖 Markdown

在 `content/` 目錄建立新的 `.md` 檔案，檔名使用 kebab-case（例如 `muscular.md`）。

#### Markdown 格式規範

Markmap 使用 Markdown 標題層級來定義心智圖節點：

```markdown
# 系統名稱（根節點）

## 主要分類（第一層子節點）
### 次要分類（第二層子節點）
- 項目說明（葉節點）
- 另一個項目
  - 補充細節（更深層葉節點）

## 另一個主要分類
### 次要分類 A
- 項目 1
- 項目 2
### 次要分類 B
- 項目 3
```

#### 範例（節錄自神經系統）

```markdown
# 神經系統

## 神經元（神經細胞）
### 構造
- 細胞體（soma）: 含細胞核，為代謝中心
- 樹突（dendrite）: 短而多分支，接收來自其他神經元的訊號
- 軸突（axon）: 單一且長，將訊號傳出細胞體
  - 髓鞘（myelin sheath）: 由乏乃氏細胞包覆
  - 乏氏結（node of Ranvier）: 髓鞘間的裸露間隙
### 類型
- 感覺神經元（傳入神經元）: 將訊號傳入中樞
- 運動神經元（傳出神經元）: 將指令傳至動器
- 聯絡神經元（中間神經元）: 連接感覺與運動神經元

## 突觸傳導
### 突觸構造
- 突觸前膜
- 突觸間隙（synaptic cleft）
- 突觸後膜
```

#### 撰寫注意事項

- **根節點** (`#`) — 每個檔案只能有一個，作為心智圖中心
- **主要分類** (`##`) — 第一層展開的大主題
- **次要分類** (`###`) — 第二層細分主題
- **項目** (`-`) — 使用無序列表作為葉節點內容
- **術語格式** — 中文名稱後加括號標註英文：`樹突（dendrite）`
- **冒號說明** — 使用冒號分隔名詞與解釋：`細胞體（soma）: 含細胞核`
- **縮排** — 使用 2 個空格縮排子項目

### 步驟二：建立題庫 JSON

在 `questions/` 目錄建立對應的 `.json` 檔案。

#### JSON Schema

```json
{
  "topicId": "topic-id",
  "year_stats": "105-114年出題約X題",
  "questions": [
    {
      "id": "q1",
      "year": 105,
      "text": "題目敘述文字",
      "options": [
        "(A) 選項 A 內容",
        "(B) 選項 B 內容",
        "(C) 選項 C 內容",
        "(D) 選項 D 內容"
      ],
      "answer": "C",
      "explanation": "解析：詳細的解題說明..."
    }
  ]
}
```

#### 欄位說明

| 欄位 | 型別 | 說明 |
|------|------|------|
| `topicId` | string | 主題 ID，須與檔名及 `topics.json` 中的 ID 一致 |
| `year_stats` | string | 歷屆出題統計，格式：`"105-114年出題約X題"` |
| `questions` | array | 題目陣列 |
| `questions[].id` | string | 題目 ID，格式 `q1`、`q2`... |
| `questions[].year` | number | 出題年份（民國年） |
| `questions[].text` | string | 題目敘述 |
| `questions[].options` | string[] | 4 個選項，格式 `"(A) 內容"` |
| `questions[].answer` | string | 正確答案字母：`"A"`、`"B"`、`"C"` 或 `"D"` |
| `questions[].explanation` | string | 解析文字，建議以 `"解析："` 開頭 |

#### 注意事項

- 每個主題建議 **8 題**（與 `topics.json` 中的 `questionCount` 一致）
- 題目 ID 在同一檔案內不可重複
- 選項固定為 4 個（A/B/C/D）
- `answer` 只接受大寫字母

### 步驟三：註冊至 topics.json

在 `content/topics.json` 的對應 category 的 `topics` 陣列中新增一筆：

```json
{
  "id": "muscular",
  "file": "muscular.md",
  "title": "肌肉系統",
  "titleEn": "Muscular System",
  "icon": "💪",
  "color": "#f97316",
  "examRatio": 5,
  "questionCount": 8
}
```

#### 欄位說明

| 欄位 | 說明 |
|------|------|
| `id` | 主題 ID（kebab-case），必須與 `.md` 和 `.json` 檔名一致 |
| `file` | 對應的 Markdown 檔案名稱 |
| `title` | 繁體中文標題 |
| `titleEn` | 英文標題 |
| `icon` | Emoji 圖示 |
| `color` | 主題色彩（hex 色碼） |
| `examRatio` | 學測佔比百分比 |
| `questionCount` | 題庫題數（須與 JSON 中的實際題數一致） |

## 驗證清單

新增主題後，請確認：

- [ ] `content/{id}.md` 存在且有 `#` 根節點
- [ ] `questions/{id}.json` 存在且符合 schema
- [ ] `topics.json` 中的 `id` 與檔名一致
- [ ] `topics.json` 中的 `questionCount` 與實際題數一致
- [ ] 本機開啟 `viewer.html?topic={id}` 可正常顯示心智圖
- [ ] 本機開啟 `quiz.html?topic={id}` 可正常作答
- [ ] 首頁 `index.html` 顯示新主題卡片
