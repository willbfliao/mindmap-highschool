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
- 分式運算（rational expressions）: 通分、約分

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
