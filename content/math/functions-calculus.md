# 函數與微積分

## 多項式函數
### 一次函數
- 一次函數（linear function）: $y = ax + b$，圖形為直線
- 斜率（slope）: $a$ 值決定傾斜程度與方向
  - $a > 0$ 向右上升，$a < 0$ 向右下降
- $y$ 截距（y-intercept）: $b$ 值為直線與 $y$ 軸的交點
- 零點（zero）: $x = -\frac{b}{a}$，直線與 $x$ 軸的交點
### 二次函數
- 標準式（standard form）: $y = ax^2 + bx + c$
- 頂點式（vertex form）: $y = a(x - h)^2 + k$，頂點為 $(h, k)$
- 頂點公式（vertex formula）: $h = -\frac{b}{2a}$，$k = \frac{4ac - b^2}{4a}$
- 開口方向（opening direction）: $a > 0$ 開口向上，$a < 0$ 開口向下
- 判別式（discriminant）: $D = b^2 - 4ac$
  - $D > 0$ 兩相異實根
  - $D = 0$ 重根
  - $D < 0$ 無實根
- 對稱軸（axis of symmetry）: $x = -\frac{b}{2a}$
### 高次多項式
- 多項式除法（polynomial division）: 長除法與綜合除法
- 餘式定理（remainder theorem）: $f(x)$ 除以 $(x - a)$ 的餘式為 $f(a)$
- 因式定理（factor theorem）: $f(a) = 0$ 則 $(x - a)$ 為 $f(x)$ 的因式
- 勘根定理（intermediate value theorem）: 連續函數若 $f(a) \cdot f(b) < 0$，則 $(a, b)$ 間至少有一根

## 指數與對數函數
### 指數函數
- 指數律（laws of exponents）: $a^m \times a^n = a^{m+n}$，$(a^m)^n = a^{mn}$
- 指數函數圖形（exponential graph）: $y = a^x$（$a > 0$ 且 $a \neq 1$）
  - $a > 1$ 為遞增函數
  - $0 < a < 1$ 為遞減函數
- 恆過定點（fixed point）: $(0, 1)$，因為 $a^0 = 1$
### 對數函數
- 對數定義（logarithm definition）: $y = \log_a x$ 等價於 $a^y = x$
- 對數律（laws of logarithms）:
  - $\log_a(xy) = \log_a x + \log_a y$
  - $\log_a\!\left(\frac{x}{y}\right) = \log_a x - \log_a y$
  - $\log_a(x^n) = n \cdot \log_a x$
- 換底公式（change of base）: $\log_a b = \frac{\log b}{\log a}$
- 常用對數（common log）: $\log_{10}$，自然對數（natural log）: $\ln = \log_e$
### 指數與對數方程式
- 指數方程式（exponential equations）: 同底比較指數
- 對數方程式（logarithmic equations）: 化為指數形式求解
- 定義域限制（domain restriction）: 對數的真數必須 $> 0$

## 三角函數
### 三角比
- 直角三角形定義（right triangle definition）:
  - $\sin\theta = \frac{\text{對邊}}{\text{斜邊}}$
  - $\cos\theta = \frac{\text{鄰邊}}{\text{斜邊}}$
  - $\tan\theta = \frac{\text{對邊}}{\text{鄰邊}}$
- 特殊角（special angles）: $30°$、$45°$、$60°$ 的三角比值
- 互餘關係（complementary relation）: $\sin\theta = \cos(90° - \theta)$
### 廣義角與弧度
- 廣義角（general angle）: 角度可為任意實數
- 弧度（radian）: $\pi \text{ rad} = 180°$
- 弧長公式（arc length）: $s = r\theta$（$\theta$ 為弧度）
- 扇形面積（sector area）: $A = \frac{1}{2}r^2\theta$
### 三角函數圖形
- 正弦函數（sine function）: $y = \sin x$，週期 $2\pi$
- 餘弦函數（cosine function）: $y = \cos x$，週期 $2\pi$
- 正切函數（tangent function）: $y = \tan x$，週期 $\pi$
- 振幅（amplitude）: $y = A\sin(Bx + C)$ 中 $|A|$ 為振幅
- 週期（period）: $T = \frac{2\pi}{|B|}$
### 三角恆等式
- 畢氏恆等式（Pythagorean identity）: $\sin^2\theta + \cos^2\theta = 1$
- 和角公式（addition formulas）:
  - $\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta$
  - $\cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta$
- 倍角公式（double angle）: $\sin 2\theta = 2\sin\theta\cos\theta$，$\cos 2\theta = \cos^2\theta - \sin^2\theta$
- 正弦定理（law of sines）: $\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$
- 餘弦定理（law of cosines）: $c^2 = a^2 + b^2 - 2ab\cos C$

## 極限與微積分初步
### 極限概念
- 函數極限（limit of function）: $\lim_{x \to a} f(x) = L$
- 單邊極限（one-sided limits）: 左極限與右極限須相等
- 極限運算性質（limit properties）: 可加減乘除（分母不為零）
- 連續性（continuity）: $f(a) = \lim_{x \to a} f(x)$
### 導數
- 導數定義（derivative definition）: $f'(x) = \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x}$
- 切線斜率（tangent slope）: $f'(a)$ 為曲線在 $x = a$ 處的切線斜率
- 基本微分公式（basic differentiation）:
  - $(x^n)' = nx^{n-1}$
  - $(c)' = 0$
  - $(cf(x))' = cf'(x)$
  - $(f \pm g)' = f' \pm g'$
### 微分應用
- 遞增遞減判定（increasing/decreasing）: $f'(x) > 0$ 遞增，$f'(x) < 0$ 遞減
- 極值判定（extrema）: $f'(x) = 0$ 且導數變號為極值
- 最佳化問題（optimization）: 利用微分求最大值或最小值
### 積分初步
- 不定積分（indefinite integral）: $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$
- 定積分（definite integral）: $\int_a^b f(x) \, dx = F(b) - F(a)$
- 面積計算（area calculation）: 曲線與 $x$ 軸圍成的面積
- 微積分基本定理（fundamental theorem）: 微分與積分互為逆運算
