# 幾何與向量

## 直線與圓
### 直線方程式
- 斜截式（slope-intercept form）: $y = mx + b$
- 點斜式（point-slope form）: $y - y_1 = m(x - x_1)$
- 一般式（general form）: $ax + by + c = 0$
- 截距式（intercept form）: $\frac{x}{a} + \frac{y}{b} = 1$
- 兩點式斜率（slope from two points）: $m = \frac{y_2 - y_1}{x_2 - x_1}$
### 距離公式
- 兩點距離（distance between two points）: $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$
- 點到直線距離（point-to-line distance）: $d = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$
- 中點公式（midpoint formula）: $M = \left(\frac{x_1 + x_2}{2},\; \frac{y_1 + y_2}{2}\right)$
### 直線關係
- 平行條件（parallel condition）: 斜率相等 $m_1 = m_2$
- 垂直條件（perpendicular condition）: $m_1 \times m_2 = -1$
- 兩平行線距離（distance between parallel lines）: $d = \frac{|c_1 - c_2|}{\sqrt{a^2 + b^2}}$
### 圓方程式
- 標準式（standard form）: $(x - h)^2 + (y - k)^2 = r^2$，圓心 $(h, k)$，半徑 $r$
- 一般式（general form）: $x^2 + y^2 + Dx + Ey + F = 0$
- 圓心（center）: $\left(-\frac{D}{2},\; -\frac{E}{2}\right)$，半徑: $r = \sqrt{\frac{D^2}{4} + \frac{E^2}{4} - F}$
- 圓與直線關係（circle-line relation）: 利用圓心到直線距離 $d$ 與 $r$ 比較
  - $d < r$ 相交（兩交點）
  - $d = r$ 相切（一交點）
  - $d > r$ 相離（無交點）

## 平面向量
### 向量基本概念
- 向量（vector）: 具有大小與方向的量，記作 $\vec{a}$ 或 $\mathbf{a}$
- 位置向量（position vector）: 從原點到點 $P$ 的向量
- 向量相等（equal vectors）: 大小相同且方向相同
- 零向量（zero vector）: 大小為零，方向不定
### 向量運算
- 向量加法（vector addition）: $\vec{a} + \vec{b}$，平行四邊形法則或三角形法則
- 向量減法（vector subtraction）: $\vec{a} - \vec{b} = \vec{a} + (-\vec{b})$
- 純量乘法（scalar multiplication）: $k\vec{a}$，改變大小與方向
- 向量分解（vector decomposition）: $\vec{a} = a_1\vec{i} + a_2\vec{j}$
### 內積
- 內積定義（dot product）: $\vec{a} \cdot \vec{b} = |\vec{a}||\vec{b}|\cos\theta$
- 座標表示（coordinate form）: $\vec{a} \cdot \vec{b} = a_1 b_1 + a_2 b_2$
- 向量長度（magnitude）: $|\vec{a}| = \sqrt{a_1^2 + a_2^2}$
- 夾角公式（angle formula）: $\cos\theta = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}||\vec{b}|}$
- 垂直判定（perpendicularity）: $\vec{a} \cdot \vec{b} = 0$ 則 $\vec{a} \perp \vec{b}$
### 投影
- 正射影（projection）: $\text{proj}_{\vec{b}}\,\vec{a} = \frac{\vec{a} \cdot \vec{b}}{|\vec{b}|^2}\,\vec{b}$
- 投影長（projection length）: $|\vec{a}|\cos\theta = \frac{\vec{a} \cdot \vec{b}}{|\vec{b}|}$
- 面積公式（area formula）: 三角形面積 $= \frac{1}{2}|\vec{a} \times \vec{b}| = \frac{1}{2}|a_1 b_2 - a_2 b_1|$

## 空間向量與空間幾何
### 空間座標
- 三維座標（3D coordinates）: $P(x, y, z)$
- 空間兩點距離（distance in 3D）: $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$
- 空間中點公式（midpoint in 3D）: $M = \left(\frac{x_1 + x_2}{2},\; \frac{y_1 + y_2}{2},\; \frac{z_1 + z_2}{2}\right)$
### 空間向量運算
- 空間內積（dot product in 3D）: $\vec{a} \cdot \vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3$
- 外積（cross product）: $\vec{a} \times \vec{b}$，結果為垂直於兩向量的向量
  - $|\vec{a} \times \vec{b}| = |\vec{a}||\vec{b}|\sin\theta$
- 外積行列式（determinant form）: $\vec{a} \times \vec{b} = (a_2 b_3 - a_3 b_2,\; a_3 b_1 - a_1 b_3,\; a_1 b_2 - a_2 b_1)$
### 平面方程式
- 一般式（general form）: $ax + by + cz + d = 0$
- 法向量（normal vector）: $\vec{n} = (a, b, c)$
- 點到平面距離（point-to-plane distance）: $d = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}$
### 空間直線
- 參數式（parametric form）: $x = x_0 + at,\; y = y_0 + bt,\; z = z_0 + ct$
- 方向向量（direction vector）: $\vec{d} = (a, b, c)$

## 圓錐曲線
### 拋物線
- 標準式（standard form）: $y^2 = 4px$（焦點在 $x$ 軸上）
- 焦點（focus）: $F(p, 0)$
- 準線（directrix）: $x = -p$
- 定義（definition）: 到焦點與準線等距的點之軌跡
### 橢圓
- 標準式（standard form）: $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$（$a > b > 0$）
- 焦點（foci）: $F(\pm c, 0)$，其中 $c^2 = a^2 - b^2$
- 定義（definition）: 到兩焦點距離和為 $2a$ 的點之軌跡
- 離心率（eccentricity）: $e = \frac{c}{a}$（$0 < e < 1$）
### 雙曲線
- 標準式（standard form）: $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$
- 焦點（foci）: $F(\pm c, 0)$，其中 $c^2 = a^2 + b^2$
- 定義（definition）: 到兩焦點距離差的絕對值為 $2a$ 的點之軌跡
- 漸近線（asymptotes）: $y = \pm\frac{b}{a}x$
- 離心率（eccentricity）: $e = \frac{c}{a}$（$e > 1$）
