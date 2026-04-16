# 機率統計與數據分析

## 排列組合
### 計數原理
- 加法原理（addition principle）: 完成一件事有 $m$ 類方法或 $n$ 類方法，共 $m + n$ 種
- 乘法原理（multiplication principle）: 完成一件事需先後兩步，共 $m \times n$ 種
### 排列
- 排列數（permutation）: $P^n_r = \frac{n!}{(n-r)!}$
- 階乘（factorial）: $n! = n \times (n-1) \times \cdots \times 2 \times 1$，$0! = 1$
- 相同物排列（identical objects）: $\frac{n!}{n_1! \times n_2! \times \cdots \times n_k!}$
- 環狀排列（circular permutation）: $(n-1)!$
### 組合
- 組合數（combination）: $C^n_r = \frac{n!}{r!(n-r)!}$
- 組合性質（combination properties）:
  - $C^n_r = C^n_{n-r}$
  - $C^n_0 = C^n_n = 1$
  - $C^n_r = C^{n-1}_{r-1} + C^{n-1}_r$（巴斯卡定理）
### 二項式定理
- 二項式展開（binomial theorem）: $(a+b)^n = \sum_{k=0}^{n} C^n_k \, a^{n-k} b^k$
- 一般項（general term）: 第 $k+1$ 項 $= C^n_k \, a^{n-k} b^k$
- 💡 聯想：手機 4 位密碼有幾種可能？就是 $10^4 = 10000$ 種排列
- 💡 聯想：從 52 張撲克牌抽 5 張，不管順序就是組合 $C^{52}_5$

## 古典機率
### 樣本空間
- 樣本空間（sample space）: 所有可能結果的集合 $S$
- 事件（event）: 樣本空間的子集合
- 基本事件（elementary event）: 只含一個結果的事件
### 古典機率定義
- 機率公式（probability formula）: $P(A) = \frac{n(A)}{n(S)}$
- 機率範圍（probability range）: $0 \leq P(A) \leq 1$
- 必然事件（certain event）: $P(S) = 1$
- 不可能事件（impossible event）: $P(\varnothing) = 0$
### 機率運算
- 餘事件（complement）: $P(A') = 1 - P(A)$
- 聯集（union）: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- 互斥事件（mutually exclusive）: $P(A \cap B) = 0$ 則 $P(A \cup B) = P(A) + P(B)$
- 💡 聯想：抽籤決定掃地區域，每人機率相等就是古典機率
- 💡 聯想：「至少一個」問題，用餘事件 $1 - P(都沒有)$ 較快——像計算「至少中一筆的機率」

## 數據分析
### 集中趨勢
- 算術平均數（arithmetic mean）: $\bar{x} = \frac{\sum x_i}{n}$
- 中位數（median）: 資料排序後中間值
- 眾數（mode）: 出現次數最多的值
### 離散程度
- 全距（range）: 最大值 $-$ 最小值
- 變異數（variance）: $\sigma^2 = \frac{\sum (x_i - \bar{x})^2}{n}$
- 標準差（standard deviation）: $\sigma = \sqrt{\text{變異數}}$
- 標準化值（z-score）: $z = \frac{x - \bar{x}}{\sigma}$
### 相關分析
- 散布圖（scatter plot）: 觀察兩變數的關聯
- 相關係數（correlation coefficient）: $r$，$-1 \leq r \leq 1$
  - $r$ 接近 $1$ 正相關
  - $r$ 接近 $-1$ 負相關
  - $r$ 接近 $0$ 無線性相關
- 最小平方法（least squares method）: 迴歸直線 $\hat{y} = a + bx$
  - 斜率: $b = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2}$
  - 截距: $a = \bar{y} - b\bar{x}$
  - 迴歸直線必過 $(\bar{x}, \bar{y})$
- 💡 聯想：期中考全班成績，用中位數比平均數更能看出「典型同學」的水準
- 💡 聯想：身高與體重的散布圖就是相關分析，$r$ 接近 1 代表高的人通常較重

## 條件機率與貝氏定理
### 條件機率
- 條件機率定義（conditional probability）: $P(A|B) = \frac{P(A \cap B)}{P(B)}$
- 意義（interpretation）: 在 $B$ 已發生的條件下，$A$ 發生的機率
### 獨立事件
- 獨立事件（independent events）: $P(A \cap B) = P(A) \times P(B)$
- 判定方法（independence test）: $P(A|B) = P(A)$ 則 $A$、$B$ 獨立
### 貝氏定理
- 貝氏定理（Bayes' theorem）: $P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$
- 全機率公式（total probability）: $P(B) = \sum P(B|A_i) \cdot P(A_i)$
- 應用場景（applications）: 疾病檢測、垃圾郵件過濾
- 💡 聯想：快篩陽性不等於確診！「陽性時真正生病的機率」就是貝氏定理
- 💡 聯想：獨立事件就像擲兩顆骰子——第一顆的結果不影響第二顆

## 隨機變數與期望值
### 隨機變數
- 隨機變數（random variable）: 將樣本空間對應到實數的函數
- 機率分配（probability distribution）: 列出所有可能值及其機率
- 機率分配表（probability table）: $\sum P(X = x_i) = 1$
### 期望值
- 期望值（expected value）: $E(X) = \sum x_i \cdot P(X = x_i)$
- 期望值性質（properties）:
  - $E(aX + b) = aE(X) + b$
  - $E(X + Y) = E(X) + E(Y)$
- 變異數（variance）: $\text{Var}(X) = E(X^2) - [E(X)]^2$
### 二項分配
- 伯努利試驗（Bernoulli trial）: 只有成功與失敗兩種結果
- 二項分配（binomial distribution）: $X \sim B(n, p)$
  - $P(X = k) = C^n_k \, p^k (1-p)^{n-k}$
- 期望值: $E(X) = np$
- 標準差: $\sigma = \sqrt{np(1-p)}$
- 💡 聯想：夜市套圈圈每次 50 元、中獎率 30%、獎品值 100 元，期望值 $= 100 \times 0.3 - 50 = -20$——平均每次虧 20 元
- 💡 聯想：投籃命中率 70% 投 10 球，進球數服從 $B(10, 0.7)$，期望進 7 球
