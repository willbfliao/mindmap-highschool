# 數列與矩陣

## 數與式
### 實數系統
- 實數（real numbers）: 有理數與無理數的聯集
- 有理數（rational numbers）: 可表示為 $\frac{p}{q}$（$q \neq 0$）的數
- 無理數（irrational numbers）: 不循環無限小數，如 $\sqrt{2}$、$\pi$
- 數線（number line）: 實數與數線上的點一一對應
### 絕對值
- 絕對值定義（absolute value）: $|x| = x$（$x \geq 0$），$|x| = -x$（$x < 0$）
- 幾何意義（geometric meaning）: $x$ 到原點的距離
- 三角不等式（triangle inequality）: $|a + b| \leq |a| + |b|$
- 絕對值方程式與不等式（equations and inequalities）:
  - $|x| = a \to x = \pm a$
  - $|x| < a \to -a < x < a$
  - $|x| > a \to x > a$ 或 $x < -a$
### 多項式運算
- 多項式加減乘（polynomial arithmetic）: 合併同類項
- 多項式除法（polynomial division）: 長除法，商式與餘式
- 因式分解（factoring）: 提公因式、十字交乘、公式法
- 餘式定理（remainder theorem）: $f(x)$ 除以 $(x - a)$ 的餘式為 $f(a)$
- 因式定理（factor theorem）: $(x - a)$ 為 $f(x)$ 的因式 $\iff f(a) = 0$
- 分式運算（rational expressions）: 通分、約分
### 不等式
- 一元一次不等式（linear inequality）: $ax + b > 0$ → $x > -\frac{b}{a}$（$a > 0$ 時）
  - 注意: 乘除負數要**變號**
- 一元二次不等式（quadratic inequality）: $ax^2 + bx + c > 0$
  - 解法: 先求根 $\alpha, \beta$（$\alpha \leq \beta$），再看開口方向
  - $a > 0$ 且 $D > 0$: $x < \alpha$ 或 $x > \beta$（大於取兩邊）
  - $a > 0$ 且 $D = 0$: 除 $x = -\frac{b}{2a}$ 外皆成立
  - $a > 0$ 且 $D < 0$: 所有實數皆成立
- 二元一次不等式（two-variable linear inequality）: $ax + by + c > 0$ 為直線一側的半平面
- 💡 聯想：不等式就像考試門檻——分數 $\geq 60$ 才及格，畫在數線上就是一個半線
- 💡 聯想：溫度零下 5 度是 $-5$，「零下」就是絕對值和負數的生活例子
- 💡 聯想：因式分解就像拆積木——把一個複雜的式子拆成簡單零件的乘積

## 集合與邏輯
### 集合
- 集合（set）: 由明確定義的元素所組成的整體，記作大寫字母 $A$、$B$
- 元素（element）: $x \in A$ 表示 $x$ 屬於集合 $A$
- 表示法（notation）:
  - 列舉法: $A = \{1, 2, 3\}$
  - 描述法: $A = \{x \mid x \text{ 為正偶數}\}$
- 空集合（empty set）: $\varnothing$ 或 $\{\}$，不含任何元素
- 子集（subset）: $A \subseteq B$ 表示 $A$ 的每個元素都在 $B$ 中
### 集合運算
- 交集（intersection）: $A \cap B = \{x \mid x \in A \text{ 且 } x \in B\}$
- 聯集（union）: $A \cup B = \{x \mid x \in A \text{ 或 } x \in B\}$
- 差集（difference）: $A - B = \{x \mid x \in A \text{ 且 } x \notin B\}$
- 補集（complement）: $A' = U - A$，$U$ 為宇集
- 德摩根定律（De Morgan's laws）:
  - $(A \cap B)' = A' \cup B'$
  - $(A \cup B)' = A' \cap B'$
- 元素個數（cardinality）: $|A \cup B| = |A| + |B| - |A \cap B|$
### 命題與條件
- 命題（proposition）: 可以判斷真假的敘述
- 條件命題（conditional）: 若 $p$ 則 $q$，記作 $p \Rightarrow q$
- 逆命題（converse）: 若 $q$ 則 $p$
- 否命題（inverse）: 若 $\neg p$ 則 $\neg q$
- 逆否命題（contrapositive）: 若 $\neg q$ 則 $\neg p$（與原命題同真假）
- 充分條件（sufficient condition）: $p \Rightarrow q$，$p$ 是 $q$ 的充分條件
- 必要條件（necessary condition）: $p \Rightarrow q$，$q$ 是 $p$ 的必要條件
- 充要條件（iff）: $p \Leftrightarrow q$，$p$ 與 $q$ 互為充要條件
- 💡 聯想：「若下雨則地濕」——下雨是充分條件（下雨一定地濕），地濕是必要條件（不濕就沒下雨）
- 💡 聯想：文氏圖就像兩個圈圈的重疊——交集是共同好友，聯集是全部認識的人

## 數列與級數
### 等差數列
- 等差數列定義（arithmetic sequence）: $a_n = a_1 + (n-1)d$
- 公差（common difference）: $d = a_{n+1} - a_n$
- 等差中項（arithmetic mean）: $a_n = \frac{a_{n-1} + a_{n+1}}{2}$
- 等差級數求和（arithmetic series）: $S_n = \frac{n(a_1 + a_n)}{2} = \frac{n(2a_1 + (n-1)d)}{2}$
### 等比數列
- 等比數列定義（geometric sequence）: $a_n = a_1 \cdot r^{n-1}$
- 公比（common ratio）: $r = \frac{a_{n+1}}{a_n}$
- 等比中項（geometric mean）: $a_n^2 = a_{n-1} \cdot a_{n+1}$
- 等比級數求和（geometric series）: $S_n = \frac{a_1(1 - r^n)}{1 - r}$（$r \neq 1$）
- 無窮等比級數（infinite geometric series）: $S = \frac{a_1}{1 - r}$（$|r| < 1$ 時收斂）
### 其他數列
- 遞迴關係（recurrence relation）: 以前項定義後項
- 數學歸納法（mathematical induction）:
  - 步驟一: 驗證 $n = 1$ 成立
  - 步驟二: 假設 $n = k$ 成立，證明 $n = k+1$ 也成立
- $\Sigma$ 符號（sigma notation）: $\sum_{i=1}^{n} a_i = a_1 + a_2 + \cdots + a_n$
- 常用求和公式（summation formulas）:
  - $\sum k = \frac{n(n+1)}{2}$
  - $\sum k^2 = \frac{n(n+1)(2n+1)}{6}$
- 💡 聯想：銀行存款複利就是等比數列，本金 $\times 1.02^n$ 就是 $n$ 年後的金額
- 💡 聯想：老師常說「高斯小時候的故事」，$1+2+\cdots+100 = \frac{100 \times 101}{2} = 5050$ 就是等差級數

## 矩陣
### 矩陣基本概念
- 矩陣（matrix）: $m \times n$ 的數字矩形排列
- 矩陣表示（notation）: $A = [a_{ij}]$，$a_{ij}$ 為第 $i$ 列第 $j$ 行的元素
- 特殊矩陣（special matrices）:
  - 零矩陣（zero matrix）: 所有元素為 $0$
  - 單位矩陣（identity matrix）: $I$，對角線為 $1$ 其餘為 $0$
  - 方陣（square matrix）: 列數 $=$ 行數
### 矩陣運算
- 矩陣加減（addition/subtraction）: 對應元素相加減，須同階
- 純量乘法（scalar multiplication）: 每個元素乘以純量
- 矩陣乘法（matrix multiplication）: $(AB)_{ij} = \sum a_{ik} b_{kj}$
  - $A_{m \times n} \times B_{n \times p} = C_{m \times p}$
  - 矩陣乘法不滿足交換律: $AB \neq BA$（一般情況）
- 轉置矩陣（transpose）: $A^T$，列與行互換
### 行列式與反矩陣
- 二階行列式（2×2 determinant）: $\det(A) = ad - bc$
- 反矩陣（inverse matrix）: $A^{-1}$，使得 $AA^{-1} = A^{-1}A = I$
- 二階反矩陣公式（2×2 inverse）: $A^{-1} = \frac{1}{\det(A)} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$
- 可逆條件（invertibility）: $\det(A) \neq 0$
### 線性方程組
- 矩陣表示（matrix form）: $AX = B$
- 克乃美公式（Cramer's rule）:
  - $x = \frac{\det(A_x)}{\det(A)}$
  - $y = \frac{\det(A_y)}{\det(A)}$
- 解的情況（solution types）:
  - $\det(A) \neq 0$: 唯一解
  - $\det(A) = 0$: 無解或無窮多解
- 高斯消去法（Gaussian elimination）: 列運算化為階梯形矩陣
- 💡 聯想：Excel 試算表就是矩陣，每個儲存格 $a_{ij}$ 就是第 $i$ 列第 $j$ 行
- 💡 聯想：行列式為 0 代表系統「有冗餘」——就像兩條方程式其實是同一條，算不出唯一解
