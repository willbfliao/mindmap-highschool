# 牛頓運動定律應用

## 摩擦力進階
### 靜摩擦力
- 靜摩擦力（static friction）: $0 \leq f_{s} \leq \mu_{s} N$
- 最大靜摩擦力: $f_{s,max} = \mu_{s} N$
- 靜摩擦力隨外力增大而增大，直到最大值
- 物體在斜面上不滑動條件: $\tan\theta \leq \mu_{s}$
### 動摩擦力
- 動摩擦力（kinetic friction）: $f_{k} = \mu_{k} N$
- $\mu_{k} < \mu_{s}$（動摩擦係數小於靜摩擦係數）
- 與接觸面積無關，與速度大小無關（理想狀態）
### 摩擦力的應用
- 斜面問題（a 為沿斜面方向加速度大小）:
  - 上滑（減速）: 減速度 $a = g(\sin\theta + \mu_{k} \cos\theta)$
  - 下滑（加速）: 加速度 $a = g(\sin\theta - \mu_{k} \cos\theta)$，條件 $\tan\theta > \mu_{k}$
- 車輛煞車: 煞車距離 $d = \frac{v_{0}^{2}}{2 \mu_{k} g}$
- 傳動帶: 靜摩擦力驅動物體

## 等速率圓周運動
### 基本物理量
- 角速度（angular velocity）: $\omega = \frac{2\pi}{T} = 2\pi f$
  - 單位: $\text{rad/s}$
- 週期（period）: $T = \frac{2\pi r}{v}$（繞一圈的時間）
- 頻率（frequency）: $f = \frac{1}{T}$（每秒繞圈數）
### 向心加速度
- 向心加速度（centripetal acceleration）: $a_{c} = \frac{v^{2}}{r} = \omega^{2} r$
- 方向: 永遠指向圓心
- 速率不變但速度方向持續改變 → 有加速度
### 向心力
- 向心力（centripetal force）: $F_{c} = \frac{mv^{2}}{r} = m\omega^{2} r$
- 向心力不是新的力，是合力的效果
- 來源: 繩張力、重力、摩擦力、正向力等

## 圓周運動的應用
### 水平圓周運動
- 汽車過彎: 摩擦力提供向心力，$v_{max} = \sqrt{\mu_{s} g r}$
- 傾斜路面: 正向力水平分量提供向心力，$\tan\theta = \frac{v^{2}}{rg}$
- 圓錐擺: $T \sin\theta = \frac{mv^{2}}{r}$、$T \cos\theta = mg$
### 鉛直圓周運動
- 最高點: $mg - N = \frac{mv^{2}}{r}$（繩拉力或軌道正向力最小）
- 最低點: $N - mg = \frac{mv^{2}}{r}$（繩拉力或軌道正向力最大）
- 最高點不脫離條件: $v \geq \sqrt{gr}$
- 最低點最小速度: $v \geq \sqrt{5gr}$（完整繞圈）

## 非慣性座標系
- 慣性座標系: 牛頓定律適用（靜止或等速運動的參考系）
- 非慣性座標系: 需引入假想力（加速運動的參考系）
- 假想力（pseudo force）: $\vec{F}_{慣} = -m\vec{a}_{系}$
  - $\vec{a}_{系}$: 非慣性參考系相對於慣性參考系的加速度
  - 假想力方向與參考系加速度相反
- 電梯問題: 上升加速時體重計讀數增加（$N = m(g + a)$）
