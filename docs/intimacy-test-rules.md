# 亲密表达与边界状态评估：题库与结果规则表

## 1. 题库基础信息

- `id`: `intimacy-boundary-state-assessment`
- `version`: `v1`
- `title`: `亲密表达与边界状态评估`
- `audience`: `adult-only`
- `answerWindow`: `recent-3-months-or-most-typical-relationship`

## 2. 维度定义

| key | 层级 | 名称 | 说明 |
| --- | --- | --- | --- |
| expression_burden | core | 表达负担 | 表达前后的回避、压抑、犹豫、后悔和内耗 |
| shame_burden | core | 羞耻负担 | 对亲密需求、表达和想法的羞耻、自责、自我否定 |
| relationship_safety | core | 关系安全感 | 表达后被误解、拒绝、疏远的担忧 |
| communication_openness | protective | 沟通开放度 | 是否能进入对话，讨论偏好、边界、不适和需要 |
| self_acceptance | protective | 自我接纳 | 是否能接住自己的差异、节奏和不确定感 |
| boundary_expression | protective | 边界表达能力 | 是否能在当下识别不适并明确表达 |

## 3. 结果等级

维度结果统一使用以下中性等级：

| 分数区间 | 等级 |
| --- | --- |
| 0-19 | 较低 |
| 20-39 | 偏低 |
| 40-59 | 中等 |
| 60-79 | 偏高 |
| 80-100 | 较高 |

说明：

- 该等级仅用于单维度结果展示
- 不作为人格或价值判断

## 4. 风险提示规则

### 4.1 风险标记定义

| id | 名称 | 触发逻辑 | 结果处理 | 分享策略 |
| --- | --- | --- | --- | --- |
| boundary_pressure | 边界受压 | 指定风险题中，至少 2 题得分 >= 4 | 显示风险模块，建议优先关注边界与中止能力 | `minimal` |
| rumination_load | 持续内耗 | 指定风险题中，至少 2 题得分 >= 4 | 显示风险模块，建议优先关注反刍、自责和支持资源 | `minimal` |
| avoidance_freeze | 明显回避 / 冻结 | 指定风险题中，至少 2 题得分 >= 4 | 显示风险模块，建议优先从低风险表达练习开始 | `minimal` |

### 4.2 风险触发题映射

| 风险标记 | 触发题 |
| --- | --- |
| boundary_pressure | q21, q23, q24 |
| rumination_load | q1, q8, q10, q29 |
| avoidance_freeze | q12, q18, q19 |

## 5. 状态摘要生成规则

状态摘要由高负担维度与低保护维度组合生成；默认输出 1 条主摘要，可补充 1 条次摘要。

### 5.1 主摘要优先级

1. 风险触发 + 低保护
2. 两个核心维度偏高/较高
3. 一个核心维度偏高/较高 + 一个保护维度偏低/较低
4. 核心维度整体中等，保护维度稳定

### 5.2 主摘要模板

| 条件 | 输出模板 |
| --- | --- |
| `expression_burden >= 60` 且 `relationship_safety >= 60` | 当前表达负担偏高，且你在关系中的安全感偏弱。 |
| `shame_burden >= 60` 且 `self_acceptance <= 39` | 当前羞耻负担偏高，自我接纳资源偏弱。 |
| `boundary_expression <= 39` 且 `expression_burden >= 60` | 当前边界表达较吃力，表达本身也在带来额外负担。 |
| `communication_openness <= 39` 且 `relationship_safety >= 60` | 当前更容易在不确定中回避表达，关系安全感也偏低。 |
| 所有核心维度 < 60 且 至少两个保护维度 >= 60 | 当前整体状态相对稳定，你拥有一定的表达和调节资源。 |

## 6. 次级状态模式规则

次级状态模式仅作辅助理解，不强制输出。

| 条件 | 模式名称 |
| --- | --- |
| `expression_burden >= 60` | 当前表达负担偏高 |
| `shame_burden >= 60` | 当前羞耻负担偏高 |
| `relationship_safety >= 60` | 当前关系警觉偏高 |
| `communication_openness <= 39` | 当前沟通开放度偏低 |
| `boundary_expression <= 39` | 当前边界表达受阻 |
| `self_acceptance <= 39` | 当前自我接纳资源偏弱 |

## 7. 分享降级规则

| 条件 | `shareLevel` | 分享内容 |
| --- | --- | --- |
| 任一风险标记触发 | `minimal` | 仅展示中性状态摘要 + 1 条建议方向 |
| 无风险，且存在核心维度 >= 60 | `neutral` | 展示状态摘要 + 1 个保护性亮点 |
| 无风险，核心维度均 < 60，至少两个保护维度 >= 60 | `standard` | 展示状态摘要 + 1-2 个保护性亮点 |

## 8. 文案模板映射

### 8.1 风险提示文案

| 风险标记 | 文案 |
| --- | --- |
| boundary_pressure | 过去一段时间里，你可能更容易在不舒服的情况下继续配合。建议优先关注自己的不适信号，并练习及时停下或表达。 |
| rumination_load | 过去一段时间里，你可能承受了较明显的表达内耗或自责。建议先减少反复自我评判，再处理表达本身。 |
| avoidance_freeze | 过去一段时间里，你在面对相关话题时可能更容易回避或卡住。建议从低风险、低暴露的表达开始练习。 |

### 8.2 建议文案模板

| 条件 | 建议 |
| --- | --- |
| `boundary_expression <= 39` | 优先练习识别“不舒服但还没来得及说”的时刻，用一句简短表达先中止或放慢。 |
| `communication_openness <= 39` | 从描述感受而不是解释立场开始，例如先说“我现在有点紧张 / 不确定”。 |
| `self_acceptance <= 39` | 先区分“我有这种反应”和“我就是有问题”这两件事，减少自动否定。 |
| `relationship_safety >= 60` | 在更安全的情境中做低风险表达练习，不必从最难的话题开始。 |
| `shame_burden >= 60` | 把注意力从“我这样正不正常”转向“这件事让我承受了什么负担”。 |
| `expression_burden >= 60` | 优先练习表达边界和不适，再逐步过渡到表达偏好和需要。 |

## 9. 30 题题库

选项统一为：

- 非常不同意
- 不同意
- 一般
- 同意
- 非常同意
- 不适用 / 没有经历 / 无法判断

| ID | 层级 | 维度 | 题目 | 反向题 | 风险触发题 |
| --- | --- | --- | --- | --- | --- |
| q1 | core | expression_burden | 过去一段时间里，即使我有明确的亲密需要，我也常常选择不说。 | 否 | 是 |
| q2 | core | expression_burden | 在关系中，我会因为担心说出来后的反应，而把自己的需要压回去。 | 否 | 否 |
| q3 | core | expression_burden | 当我想表达偏好或期待时，我常常拖到最后还是不说。 | 否 | 否 |
| q4 | core | expression_burden | 表达自己的亲密需要，对我来说通常会带来明显的心理负担。 | 否 | 否 |
| q5 | protective | communication_openness | 在关系中，当我感到不舒服时，我通常能在当下说出来。 | 是 | 否 |
| q6 | core | shame_burden | 过去一段时间里，我会因为自己的亲密需要或想法而感到羞耻。 | 否 | 否 |
| q7 | core | shame_burden | 当我意识到自己有某种需要时，我会担心自己显得不够体面。 | 否 | 否 |
| q8 | core | shame_burden | 表达这类需要后，我常会反复回想自己是不是说错了。 | 否 | 是 |
| q9 | protective | self_acceptance | 即使我的节奏或偏好和别人不同，我通常也能接受。 | 是 | 否 |
| q10 | core | shame_burden | 我会因为自己的亲密反应而暗自否定自己。 | 否 | 是 |
| q11 | core | relationship_safety | 在关系中，我担心真实表达后会被误解。 | 否 | 否 |
| q12 | core | relationship_safety | 我会因为害怕被拒绝或被疏远，而尽量少表达。 | 否 | 是 |
| q13 | core | relationship_safety | 当关系不够确定时，我会更倾向于收回自己的真实反应。 | 否 | 否 |
| q14 | core | relationship_safety | 如果我表达边界或偏好，我会担心关系变差。 | 否 | 否 |
| q15 | protective | communication_openness | 在关系中，我通常愿意讨论彼此的偏好、边界和不适。 | 是 | 否 |
| q16 | protective | communication_openness | 需要谈这类话题时，我通常能开口，而不是明显回避。 | 是 | 否 |
| q17 | protective | communication_openness | 即使有点紧张，我也能把自己的感受表达成一句清楚的话。 | 是 | 否 |
| q18 | protective | communication_openness | 面对这类话题时，我常常不知道怎么开口，最后干脆不谈。 | 否 | 是 |
| q19 | protective | communication_openness | 即使有必要，我也会尽量回避和亲密相关的表达。 | 否 | 是 |
| q20 | protective | boundary_expression | 当我感觉节奏不对或不舒服时，我通常能及时表达。 | 是 | 否 |
| q21 | protective | boundary_expression | 即使我已经不太舒服，我也可能顺着对方继续下去。 | 否 | 是 |
| q22 | protective | boundary_expression | 当我不想继续某件互动时，我通常能明确停下来。 | 是 | 否 |
| q23 | protective | boundary_expression | 我常常是在事后才意识到，自己其实并不愿意。 | 否 | 是 |
| q24 | protective | boundary_expression | 在关系中，我会优先照顾对方感受，而把自己的界限放在后面。 | 否 | 是 |
| q25 | protective | boundary_expression | 我能分辨“我不想继续”和“我只是有点紧张”之间的区别。 | 是 | 否 |
| q26 | protective | self_acceptance | 我基本能接纳自己在亲密表达上的节奏和方式。 | 是 | 否 |
| q27 | protective | self_acceptance | 我常觉得自己在亲密表达上不太正常。 | 否 | 否 |
| q28 | protective | self_acceptance | 即使我还不完全确定自己的需要，我也允许自己慢慢理解。 | 是 | 否 |
| q29 | protective | self_acceptance | 我会因为自己太保守、太主动或太敏感而反复苛责自己。 | 否 | 是 |
| q30 | core | relationship_safety | 在关系中，如果我不确定对方会不会接住我，我通常会更谨慎甚至沉默。 | 否 | 否 |

## 10. 数据接口建议

### 10.1 `questionnaire`

```ts
type Questionnaire = {
  id: string;
  version: string;
  title: string;
  audience: "adult-only";
  answerWindow: string;
  questions: Question[];
  dimensions: Dimension[];
  riskFlags: RiskFlagRule[];
  resultRules: ResultRules;
  shareRules: ShareRules;
};
```

### 10.2 `question`

```ts
type Question = {
  id: string;
  text: string;
  dimension: DimensionKey;
  layer: "core" | "protective";
  reverse: boolean;
  isRiskTrigger: boolean;
  allowNA: true;
};
```

### 10.3 `result`

```ts
type Result = {
  dimensionScores: Record<string, number | null>;
  protectiveScores: Record<string, number | null>;
  riskFlags: string[];
  stateSummary: string;
  prioritySignals: string[];
  recommendations: string[];
  shareLevel: "minimal" | "neutral" | "standard";
  statePattern?: string[];
};
```

### 10.4 `riskFlag`

```ts
type RiskFlagRule = {
  id: string;
  triggerQuestions: string[];
  threshold: number;
  message: string;
  sharePolicy: "minimal" | "neutral" | "standard";
  resultTone: "cautious" | "neutral";
};
```
