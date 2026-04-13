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
- 法向量（normal vector）: 凡是與平面垂直的非零向量，均稱為該平面的法向量，不唯一
  - 若 $\vec{a}$、$\vec{b}$ 與平面平行且 $\vec{a} \not\parallel \vec{b}$，則 $\vec{a} \times \vec{b}$ 即為法向量
- 推導: 平面 $E$ 過定點 $(p,q,r)$，法向量 $(a,b,c)$，則 $(x-p,y-q,z-r) \perp (a,b,c)$
  - $a(x-p)+b(y-q)+c(z-r)=0$
- 標準式（standard form）: $ax+by+cz=d$，係數向量 $(a,b,c)$ 即為法向量
- 缺項的平面方程式: 缺 $x$ 項→平行 $x$ 軸，缺 $y$ 項→平行 $y$ 軸，缺 $z$ 項→平行 $z$ 軸
- 截距式（intercept form）: $\frac{x}{p}+\frac{y}{q}+\frac{z}{r}=1$，與三軸交於 $(p,0,0)$、$(0,q,0)$、$(0,0,r)$
### 兩平面的關係與點面距公式
- 兩平面的關係: $E_1: a_1x+b_1y+c_1z=d_1$ 與 $E_2: a_2x+b_2y+c_2z=d_2$
  - 兩面重合: $\frac{a_1}{a_2}=\frac{b_1}{b_2}=\frac{c_1}{c_2}=\frac{d_1}{d_2}$
  - 兩面平行: $\frac{a_1}{a_2}=\frac{b_1}{b_2}=\frac{c_1}{c_2} \neq \frac{d_1}{d_2}$
  - 兩面相交: $(a_1,b_1,c_1) \not\parallel (a_2,b_2,c_2)$
- 兩平面的交角: $\cos\theta = \pm\frac{\vec{n_1} \cdot \vec{n_2}}{|\vec{n_1}| \times |\vec{n_2}|}$
- 點面距（point-to-plane distance）: $d(K,E) = \frac{|ap+bq+cr-d|}{\sqrt{a^2+b^2+c^2}}$
- 兩平行平面間距: $d(E_1,E_2) = \frac{|d_1-d_2|}{\sqrt{a^2+b^2+c^2}}$（需先確認係數對應相等）
- 角平分面: $\frac{|a_1x+b_1y+c_1z-d_1|}{\sqrt{a_1^2+b_1^2+c_1^2}} = \frac{|a_2x+b_2y+c_2z-d_2|}{\sqrt{a_2^2+b_2^2+c_2^2}}$
- 平面系方程式: $(a_1x+b_1y+c_1z-d_1)+k(a_2x+b_2y+c_2z-d_2)=0$，隨 $k$ 值繞交線旋轉
  - $E_1+kE_2=0$ 無法消去 $E_1$ 表示 $E_2$；$kE_1+E_2=0$ 無法表示 $E_1$
### 空間直線
- 方向向量（direction vector）: 與直線 $L$ 平行的非零向量，記為 $\vec{d}$，不唯一
- 參數式（parametric form）: $\begin{cases} x=x_0+at \\ y=y_0+bt \\ z=z_0+ct \end{cases}$，$t \in \mathbb{R}$
  - 常數項為起點，$t$ 的係數為方向向量
  - 同一直線參數式有無限多種，可改變起點或伸縮方向向量
  - 控制 $t$ 範圍可變成線段或射線
- 比例式（symmetric form）: $\frac{x-x_0}{a}=\frac{y-y_0}{b}=\frac{z-z_0}{c}$（$a,b,c$ 均不為 0）
  - 分子為 0 得起點，分母為方向向量
  - 注意 $x,y,z$ 係數必須是 1，如 $\frac{2x-3}{4}=\frac{-y-1}{3}=\frac{z}{2}$ 方向向量是 $(2,-3,2)$ 不是 $(4,3,2)$
- 兩面式: $\begin{cases} a_1x+b_1y+c_1z=d_1 \\ a_2x+b_2y+c_2z=d_2 \end{cases}$，兩平面法向量外積得方向向量
  - 可用加減消去法化為參數式
  - 若兩面平行則無解（無圖形）
### 空間中直線與點、線、面的關係
- 直線與平面的關係: $\vec{d}$ 為方向向量，$\vec{n}$ 為法向量
  - $\vec{d}$ 與 $\vec{n}$ 不垂直 → $L$ 與 $E$ 交於一點（若 $\vec{d} \parallel \vec{n}$ 則 $L \perp E$）
  - $\vec{d}$ 與 $\vec{n}$ 垂直 → 線面平行或線在平面上（取 $L$ 上一點代入 $E$ 判斷）
- 點與直線的關係: 用「配方」求距離最小值，或「內積為 0」求最近距離與垂足點
- 兩直線的關係:
  - 平行: $\vec{d_1} \parallel \vec{d_2}$，可求間距
  - 相交: 分別用參數 $t$、$k$，聯立 $x,y$ 坐標解出後確認 $z$ 也相等
  - 歪斜: 設公垂線垂足點，利用內積為 0 解聯立；或求含 $L_1$ 且平行 $L_2$ 的平面 $E$，再求 $L_2$ 到 $E$ 的距離

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
