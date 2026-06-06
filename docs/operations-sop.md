# The Ba Zi — 运营 SOP 文档

> 最后更新：2026-06-05
> 适用版本：v3.0

---

## 目录

1. [GA4 看板配置](#1-ga4-看板配置)
2. [核心指标定义](#2-核心指标定义)
3. [事件埋点清单](#3-事件埋点清单)
4. [例行运营流程](#4-例行运营流程)
5. [内容迭代策略](#5-内容迭代策略)
6. [技术运维检查清单](#6-技术运维检查清单)

---

## 1. GA4 看板配置

### 1.1 前提条件

- GA4 媒体资源已创建（使用 `NEXT_PUBLIC_GA_ID` 中的 Measurement ID）
- 所有埋点事件已在代码中集成（见第 3 节）
- 拥有 GA4 编辑者或管理员权限

### 1.2 关键事件注册

在 GA4 后台 **Admin > Events** 中，确认以下事件已被自动捕获（或手动创建）：

| 事件名称 | 触发时机 | 状态 |
|---------|---------|------|
| `bazi_calculated` | 排盘结果页加载完成 | 代码已埋点 |
| `bazi_shared` | 点击任意社交分享按钮 | 代码已埋点 |
| `compatibility_checked` | 完成生肖配对查询 | 代码已埋点 |
| `newsletter_signup` | 成功订阅邮件简报 | 代码已埋点 |
| `reading_saved` | 保存命盘并生成分享链接 | 代码已埋点 |
| `reading_viewed_shared` | 访问 `/m/[code]` 共享命盘页 | 代码已埋点 |
| `page_view` | 任意页面访问 | GA4 自动捕获 |
| `session_start` | 会话开始 | GA4 自动捕获 |
| `first_visit` | 首次访问 | GA4 自动捕获 |

### 1.3 自定义维度配置

在 **Admin > Custom Definitions > Custom Dimensions** 中创建以下维度：

| 维度名称 | 事件参数 | 范围 | 说明 |
|---------|---------|------|------|
| 生肖 / Animal | `animal` | 事件级 | bazi_calculated, reading_viewed_shared |
| 日主 / Day Master | `day_master` | 事件级 | bazi_calculated |
| 五行 / Element | `element` | 事件级 | bazi_calculated |
| 性别 / Gender | `gender` | 事件级 | bazi_calculated |
| 分享平台 / Platform | `platform` | 事件级 | bazi_shared |
| 订阅来源 / Source | `source` | 事件级 | newsletter_signup |
| 语言 / Locale | `locale` | 事件级 | newsletter_signup, reading_viewed_shared |
| 生肖 1 / Animal 1 | `animal_1` | 事件级 | compatibility_checked |
| 生肖 2 / Animal 2 | `animal_2` | 事件级 | compatibility_checked |
| 匹配评分 / Rating | `rating` | 事件级 | compatibility_checked |

### 1.4 推荐看板布局

在 GA4 **Explore > Blank** 中创建以下报告：

#### 看板 1：每日运营概览（必看）

| 卡片 | 图表类型 | 维度/指标 |
|------|---------|----------|
| DAU / 日活跃用户 | 趋势线（7 天） | 指标：活跃用户数 |
| 排盘次数 | 趋势线（7 天） | 事件：bazi_calculated |
| 分享率 | 比率卡片 | bazi_shared / bazi_calculated |
| 订阅转化率 | 比率卡片 | newsletter_signup / 活跃用户数 |
| 命盘保存数 | 趋势线（7 天） | 事件：reading_saved |
| TOP 10 页面 | 柱状图 | 路径 / 浏览量 |

#### 看板 2：SEO 内容表现

| 卡片 | 图表类型 | 维度/指标 |
|------|---------|----------|
| 自然搜索流量趋势 | 趋势线（28 天） | 会话（organic） |
| TOP 着陆页 | 表格 | 着陆页 + 会话 + 平均互动时长 |
| 文章浏览量排名 | 表格 | 页面标题 + 浏览数 + 平均互动时间 |
| 零流量文章 | 表格 | 筛选：30 天浏览数为 0 |

#### 看板 3：用户行为漏斗

| 步骤 | 事件 | 说明 |
|------|------|------|
| 1. 访问排盘页 | `page_view` + `/bazi` | 进入排盘工具 |
| 2. 完成排盘 | `bazi_calculated` | 生成了结果 |
| 3. 保存命盘 | `reading_saved` | 点击保存 |
| 4. 分享 | `bazi_shared` | 点击分享按钮 |
| 5. 订阅 | `newsletter_signup` | 订阅邮件简报 |

---

## 2. 核心指标定义

| 指标 | 定义 | 计算方式 | 目标参考值 |
|------|------|---------|-----------|
| **DAU** | 日活跃用户数 | GA4 活跃用户数 | 初期 50-200 |
| **MAU** | 月活跃用户数 | GA4 月活跃用户数 | 初期 500-2000 |
| **排盘次数/日** | 每日 bazi_calculated 事件数 | GA4 事件计数 | 初期 30-100 |
| **分享率** | 分享数 / 排盘数 | bazi_shared / bazi_calculated | > 5% |
| **订阅转化率** | 订阅数 / 独立访客数 | newsletter_signup / 用户数 | > 1% |
| **跳出率** | 未互动会话比例 | GA4 自动计算 | < 60% |
| **平均互动时间** | 用户互动平均时长 | GA4 自动计算 | > 60s |
| **保存率** | 保存数 / 排盘数 | reading_saved / bazi_calculated | > 10% |

---

## 3. 事件埋点清单

所有事件代码位于 `src/lib/gtag-events.ts`，通过 `src/components/GoogleAnalytics.tsx` 加载 GA4。

### 3.1 前端事件触发位置

| 事件 | 文件 | 触发时机 |
|------|------|---------|
| `bazi_calculated` | `[locale]/bazi/result/client.tsx` | 页面 mount（useEffect） |
| `bazi_shared` | `components/SocialShare.tsx` | 点击分享按钮 |
| `bazi_shared` (copy) | `[locale]/bazi/result/client.tsx` | 点击复制链接 |
| `compatibility_checked` | `[locale]/compatibility-calculator/client.tsx` | 配对完成 |
| `newsletter_signup` | `components/NewsletterPopup.tsx` | 订阅成功 |
| `newsletter_signup` | `components/NewsletterBar.tsx` | 订阅成功 |
| `reading_saved` | `[locale]/bazi/result/client.tsx` | 命盘保存成功 |
| `reading_viewed_shared` | `[locale]/m/[code]/page.tsx` | 共享页加载 |

### 3.2 新增事件流程

1. 在 `src/lib/gtag-events.ts` 中添加新的事件辅助函数
2. 在目标组件中 import 并调用
3. 在 GA4 Admin > Events 中确认自动捕获
4. 如需要自定义参数 → 在 GA4 Custom Dimensions 中注册
5. 更新本 SOP 文档

---

## 4. 例行运营流程

### 4.1 每日检查（5 分钟）

- [ ] 查看 GA4 看板 1（运营概览），确认数据正常
- [ ] 检查是否有异常事件峰值或骤降
- [ ] 确认网站可正常访问（thebazi.com 返回 200）
- [ ] 确认 API 路由正常（/api/reading/save, /api/newsletter）

### 4.2 每两周流量分析（30 分钟）

#### Step 1: 拉取数据

1. 打开 GA4 Explore > 看板 2（SEO 内容表现）
2. 设置时间范围：过去 14 天 vs 前 14 天
3. 导出页面排名表格

#### Step 2: TOP 5 页面分析

对流量最高的 5 个页面：
- 分析用户从哪个渠道进入（organic / social / direct）
- 检查互动时间是否 > 60s
- 检查是否有转化行为（订阅 / 保存 / 分享）
- 记录成功模式 → 用于指导新内容

#### Step 3: BOTTOM 5 页面分析

对流量最低的 5 个页面（排除刚发布的 <30 天）：
- 判断原因：SEO 问题？内容质量问题？话题不够吸引人？
- 决定策略：优化 → 合并 → 下架
- 指派优化任务

#### Step 4: 热搜词分析

- 在 GA4 中查看 Google Organic Search 查询词
- 识别未被覆盖的长尾关键词
- 列入新文章选题池

### 4.3 新文章发布流程

1. 在 `src/lib/blog-content.ts` 中添加英文文章
2. 在 `src/lib/blog-content-zh.ts` 中添加繁中翻译
3. 确认 `getArticleBySlug()` 和 `getArticleSlugs()` 已包含新 slug
4. 本地测试：访问 `/[locale]/blog/[slug]` 返回 200
5. 部署到生产环境
6. 在 GA4 中标记为关注文章
7. 发布后 30 天检查流量 → 见 4.4

### 4.4 零流量文章处理流程

**触发条件**：文章发布超过 30 天，GA4 显示 0 次浏览。

**Step 1 — 诊断（15 分钟）**
- 确认文章 URL 返回 200（非 404/301）
- 确认文章已被 Google 索引：`site:thebazi.com/blog/[slug]`
- 检查 Google Search Console 是否有展示量但无点击
- 检查文章标题和 meta description 是否含目标关键词

**Step 2 — 优化（30 分钟）**
| 问题 | 解决方案 |
|------|---------|
| 未被索引 | 检查是否被 noindex 阻挡；在 GSC 提交索引 |
| 标题无关键词 | 重写标题，包含主要长尾关键词 |
| 内容太薄（< 1000 字） | 扩充到 1500+ 字，添加更多有价值信息 |
| 无内链 | 从其他相关文章添加链接到此文章 |
| 主题搜索量低 | 保留作为权威内容的一部分，不处理 |

**Step 3 — 决策**
| 30 天后表现 | 操作 |
|------------|------|
| 仍为 0 | 考虑合并到相关文章中 + 301 重定向 |
| 有少量展示 >100 | 继续观察 2 周 |
| 有展示无点击 | 优化 meta description + 标题 |

---

## 5. 内容迭代策略

### 5.1 内容矩阵

| 内容类型 | 频率 | 目的 | SEO 重点 |
|---------|------|------|---------|
| 年度运势（2027） | 每年底更新 | 季节性流量 | "2027年运势" 系列 |
| 每月运势 | 每月初更新 | 回头客 + 社交分享 | "2026年X月运势" |
| 基础教学 | 一次性（可更新） | 长尾 SEO + 权威性 | "从零学八字" 系列 |
| 日柱详解 | 持续补充 | 长尾 SEO（精确匹配） | "甲子日柱" 类精确词 |
| 博客文章 | 每周 1-2 篇 | 覆盖更多关键词 | 中低竞争长尾词 |

### 5.2 选题来源

1. **GA4 Search Console 数据** — 发掘未被覆盖的搜索查询
2. **竞争对手分析** — 对标网站的高流量文章
3. **用户行为数据** — 排盘中最常出现的问题（如"五行缺金"）
4. **季节性** — 新年、春节、中秋节等节点的运势内容

### 5.3 A/B 测试建议

- 标题测试：同一篇文章，发布 2 周后若流量不理想，改标题再观察 2 周
- CTA 测试：Newsletter 弹窗时机（10s vs 30s vs 滚动位置）
- 分享文案：测试不同的社交媒体预填充文案

---

## 6. 技术运维检查清单

### 6.1 部署前检查（12 项）

所有部署到生产环境前，确认以下 12 项：

- [ ] Google Rich Results Test 通过 FAQPage 校验
- [ ] Google Rich Results Test 通过 BreadcrumbList 校验
- [ ] Google Rich Results Test 通过 Article 校验
- [ ] /bazi 结果页有真实 AdSense 广告（非占位块）
- [ ] 某篇 blog 文章内有 2 个真实广告
- [ ] 排盘完成后看到保存命盘按钮
- [ ] 保存后生成的可分享链接正常渲染命盘
- [ ] 首页看到 Newsletter 订阅输入框
- [ ] 排盘结果页看到底部弹窗
- [ ] 首页看到每日一言卡片
- [ ] 随机抽查 3 篇新文章各返回 200
- [ ] GA4 事件已触发（在 GA4 DebugView 确认）

### 6.2 定期运维

| 频率 | 任务 | 工具 |
|------|------|------|
| 每日 | 确认网站可用性 | 浏览器 / uptime monitor |
| 每周 | 检查 GA4 数据正常 | GA4 Dashboard |
| 每月 | 检查 Google Search Console | Search Console |
| 每月 | 检查 AdSense 收益 | AdSense Dashboard |
| 每季度 | 审查 Rate Limiting 阈值 | 代码审查 |
| 每季度 | 检查 Resend 邮件额度 | Resend Dashboard |

### 6.3 故障响应

| 故障类型 | 响应时间 | 处理流程 |
|---------|---------|---------|
| 网站无法访问 | 4 小时内 | 检查 Vercel Dashboard → 回滚最近部署 |
| API 返回 500 | 8 小时内 | 检查 Vercel Function Logs → 修复并重部署 |
| 邮件发送失败 | 24 小时内 | 检查 Resend Dashboard → 确认 API Key 有效 |
| AdSense 广告不展示 | 24 小时内 | 检查 AdSense 政策中心 → 确认账户正常 |
| GA4 数据中断 | 48 小时内 | 检查 GA4 媒体资源 → 确认 Measurement ID 正确 |

---

*本 SOP 文档随项目迭代持续更新。每次重大功能上线后，建议同步更新此文档。*
