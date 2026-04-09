# typeInk 前端风格提炼

## 1. 结论先行

当前项目的前端不是常规产品站，也不是 SaaS 面板风格，而是一套很明确的个人化叙事界面：

- 底层气质是 `paper / ink / editorial`，像高质量纸面与专栏排版
- 中层语言是 `system / console / agent`，通过 mono 字体、状态词、日志感文案建立“AI 工作流”语境
- 上层记忆点是 `mechanical / tactile`，通过打字机过渡、按键、纸张、滚轴等元素把抽象智能落到可感知的物理隐喻

这三层叠加后，形成了项目当前最核心的视觉定位：

**一种带有编辑气质、机械触感和 ambient intelligence 氛围的个人 AI 品牌站。**

后续新增页面、模块或视觉升级，应该围绕这个核心继续演化，而不是切到通用科技官网语法。

## 2. 风格核心关键词

可归纳为以下关键词：

- Paper-like
- Ink-like
- Editorial
- Quiet luxury
- Mechanical tactility
- Ambient system
- Personal manifesto
- Human-centered AI

如果要用一句话描述：

**不是在展示一个 AI 产品，而是在展示“一个人如何把 AI 融入自己的认知与创作系统”。**

## 3. 视觉基础层

### 3.1 色彩体系

来自 [`src/index.css`](/Users/qingli/Projects/apps/typeInk/typeInk/src/index.css) 的基础 token 非常稳定，整体不是高饱和科技感，而是偏纸张、墨色、陶土橙：

- `--color-paper: #FDFDFB`
- `--color-ink: #2C2925`
- `--color-accent: #D97757`
- `--color-surface: #F4F1EA`
- `--color-dark: #1C1A18`
- `--color-border: #EAE5D9`
- `--color-muted: #737373`

风格含义：

- `paper` 用于大面积背景，避免纯白造成现代产品页的冷感
- `ink` 不是纯黑，保留印刷品和墨水质感
- `accent` 不是荧光科技色，而是偏陶土/铁锈橙，既有人味，也能承担“系统活跃”状态
- `dark` 页面不是赛博黑，而是暖黑，适合承接“protocol / lab / system”语义

### 3.2 字体层级

当前站点依赖三套字体语义：

- `serif`：用于主标题、宣言、大段高辨识度文案
- `mono`：用于标签、状态、导航、辅助元信息、系统提示
- `sans`：用于主体说明、结构化内容、通用阅读文本

对应关系不是随意混排，而是角色明确：

- `serif` 负责“思想性、主张、品牌人格”
- `mono` 负责“系统感、日志感、工具感”
- `sans` 负责“可读性、信息承载、正文效率”

这个分工已经成为站点识别度的一部分，后续不建议打散。

## 4. 页面语法

### 4.1 首页不是营销首页，而是“带视觉装置的宣言首页”

从 [`src/sections/Hero.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/sections/Hero.tsx) 和 [`src/pages/Home.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/pages/Home.tsx) 可以看出，首页核心语法是：

- 左侧为强观点文案
- 右侧为抽象但有系统意味的视觉装置
- CTA 不是“立即注册”，而是“继续阅读我的系统”

这意味着首页承担的不是转化，而是定调：

- 先让用户理解人格和方法论
- 再逐步进入 builds / usage / notes / manifesto / now

### 4.2 二级页采用“杂志栏目 + 档案页”结构

从 [`src/pages/BuildsPage.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/pages/BuildsPage.tsx)、[`src/pages/UsagePage.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/pages/UsagePage.tsx)、[`src/pages/SystemizePage.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/pages/SystemizePage.tsx)、[`src/pages/ContactPage.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/pages/ContactPage.tsx) 可以提炼出统一骨架：

- 顶部有 mono eyebrow
- 接 serif 大标题
- 再接一段说明性导语
- 主体内容按“条目 / 卡片 / 列表 / 档案”展开
- 条目之间大量使用 divider、留白、弱边框而非强容器包裹

这种结构更像出版物目录、研究档案或个人 field notes，而不是功能型 dashboard。

### 4.3 导航采用“悬浮控制台”而不是传统页头

[`src/components/FloatingNav.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/components/FloatingNav.tsx) 的作用不仅是导航，更是风格锚点：

- 固定底部
- 深色半透明
- 胶囊状
- mono 大写追踪字距
- 带呼吸感浮动
- 以状态点强化“在线系统”隐喻

因此它不只是交互组件，而是“站点人格”的一部分。后续若改导航，不应退化成普通顶栏。

## 5. 组件风格规律

### 5.1 卡片不是 UI 容器，而是纸面内容块

当前 `card` 风格具有这些共性：

- 浅暖色背景
- 细边框
- 小圆角
- 阴影非常克制
- hover 只轻微抬起

这使卡片看起来像“整理好的内容页片段”，而不是商业后台里的模块框。

### 5.2 标签与状态有明显的“系统编码感”

例如 `tag`、`text-mono-xs`、`status-dot`：

- 字号偏小
- mono
- 大写
- 高字距
- 强调状态与分类，而不是情绪装饰

它们在语义上更接近：

- 索引
- 目录
- 日志标记
- 控制台状态

### 5.3 强视觉记忆来自“打字机过渡”

[`src/components/TypewriterOverlay.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/components/TypewriterOverlay.tsx) 与 [`src/components/MechanicalKeyboard.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/components/MechanicalKeyboard.tsx) 构成了项目最独特的体验层：

- 页面跳转不是瞬时切换，而是先进入打字机状态
- 纸张、滚轴、键盘、墨迹共同构成一次“意图被写入系统”的过渡
- 文案并非 loading，而是命令行式提示语

这说明当前项目的转场思路是：

**把“导航”设计成一次有触感的认知切换。**

这个思路很强，后续新增重要转场时应优先复用，而不是引入普通淡入淡出覆盖它。

## 6. 动效语言

从 [`src/utils/animations.ts`](/Users/qingli/Projects/apps/typeInk/typeInk/src/utils/animations.ts) 和多个页面实现可以看出，当前动效不是炫技式 motion，而是“轻、慢、带空气阻力”的进入方式。

核心特征：

- 主要使用 `fade + upward motion + blur reduction`
- 带少量 `rotateX`，形成轻微立体感
- spring 参数偏柔和，不追求弹跳
- stagger 节奏均匀，像段落逐步显现

可概括为：

**像纸页、卡片、思绪从空气里浮现出来，而不是像 app 元素被硬切进来。**

### 6.1 环境动效

[`src/components/BackgroundGlow.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/components/BackgroundGlow.tsx) 和 [`src/components/VisualAmbientSystem.tsx`](/Users/qingli/Projects/apps/typeInk/typeInk/src/components/VisualAmbientSystem.tsx) 说明项目的背景动效也遵循同一个原则：

- 环境光弱，不抢主体
- 大面积虚化渐变制造空间感
- 系统日志滚动与柱状波动提供“AI 正在运行”的低频信号
- 整体透明度克制，作为氛围层存在

因此后续如果加背景特效，必须满足两个条件：

- 不能抢正文的阅读权重
- 不能破坏纸面感与静谧感

## 7. 内容气质

这个项目的文案风格高度统一，且是风格系统的一部分，不应与视觉拆开看。

当前文案特征：

- 常使用 manifesto、protocol、field notes、archive、system log 等词
- 不是功能介绍口吻，而是方法论与 worldview 输出
- 强调个人实践，不强调产品卖点
- AI 被写成认知伙伴、环境智能、系统能力，而不是“工具合集”

典型气质：

- 冷静
- 克制
- 有判断
- 不喧哗
- 带哲学和研究语感

所以新增模块的文案不应突然切成：

- 电商式促销语
- SaaS 式功能堆叠语
- 过度热血的创业口号
- 空泛的“改变世界”叙述

## 8. 当前项目已经形成的稳定规范

### 8.1 应保留的稳定规则

- 大背景优先使用暖白、暖灰、暖黑，不用冷白和赛博霓虹
- 大标题优先 serif，辅助信息优先 mono
- 页面结构优先“栏目 / 档案 / 宣言”，不是“功能模块宫格”
- CTA 要像继续阅读一个系统，而不是触发一个销售漏斗
- hover 与动画要克制，只做轻微位移、显隐和强调
- 强视觉装置应服务“AI 是环境与认知延伸”这个主题

### 8.2 不建议出现的偏移

- 玻璃拟态、强霓虹、紫蓝科技光污染
- 典型 startup marketing hero
- 重按钮、重渐变、重转化组件
- 过密的信息卡片网格
- 过多图标化功能陈列
- 过快、过弹、过强的动效反馈

## 9. 新页面或新模块设计准则

如果未来继续扩展页面，建议按下面的优先级判断是否符合现有风格。

### 9.1 先判断它属于哪一种叙事角色

优先落在以下三类之一：

- 宣言页：表达观点、方法论、价值观
- 档案页：展示项目、笔记、记录、时间状态
- 协议页：展示工作方式、系统流程、使用方法

如果一个新页面不属于这三类，设计时要额外警惕它是否会破坏整体语义一致性。

### 9.2 视觉上优先使用这些手段

- 细边框替代厚重容器
- 留白替代高密度装饰
- 排版层级替代多色区块
- 少量暖色 accent 替代大面积强调色
- 环境氛围替代炫技特效

### 9.3 交互上优先使用这些手段

- 页面内分段 reveal
- 内容列表的轻 hover
- 带文案提示的过渡
- 低频率状态反馈

## 10. 可直接执行的设计检查清单

新增前端内容时，可以直接用这份 checklist 自查：

- 这部分看起来像纸面编辑系统，而不是通用模板站吗？
- serif / mono / sans 的职责是否清晰？
- 主色是否仍然维持暖纸、墨色、陶土 accent 的关系？
- 动效是否轻、慢、克制，而不是炫耀存在感？
- 文案是否像“个人 AI 系统的记录与表达”，而不是功能广告？
- 新组件是否真的属于当前世界观，而不是单独看着好看？
- 如果去掉 logo，这一屏是否仍然能被认出是 typeInk 的语言？

## 11. 建议的后续文档用途

这份提炼文档可以作为后续三类工作的基线：

- 新页面设计约束
- UI 重构时的风格对齐依据
- 生成式设计或 AI 辅助产出时的 prompt 基准

如果后续要继续完善，建议再补两类文档：

- 一个更偏执行层的 `UI pattern inventory`
- 一个更偏视觉层的 `design tokens + component examples`

这样可以把“风格理解”继续落到“组件实现”和“新增页面复用”层面。
