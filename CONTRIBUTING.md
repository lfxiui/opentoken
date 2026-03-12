# 贡献指南

感谢你愿意为 OpenToken 贡献数据！

## 方式一：修正或更新已有平台数据

1. Fork 本仓库
2. 编辑 `data/platforms/<slug>.yaml`
3. 运行 `npm run validate` 确认格式正确
4. 提交 PR，描述你修改/核实的内容

## 方式二：添加新平台

1. Fork 本仓库
2. 在 `data/platforms/` 新建 `<slug>.yaml`，参考已有文件格式
3. 运行 `npm run validate` 确认格式正确
4. 提交 PR

## YAML 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | ✅ | 平台显示名称 |
| `slug` | string | ✅ | URL 标识，仅小写字母+连字符 |
| `website` | URL | ✅ | 官网地址 |
| `description` | string | ✅ | 平台简介 |
| `category` | enum | ✅ | 见下方分类列表 |
| `tags` | string[] | | 标签，便于搜索 |
| `free_tier` | object | | 免费额度信息 |
| `promotions` | object[] | | 优惠活动列表 |
| `pricing_url` | URL | | 定价页面 |
| `docs_url` | URL | | 文档地址 |
| `status` | enum | ✅ | `active` / `beta` / `deprecated` |
| `last_verified` | date | ✅ | 最后验证日期，格式 `YYYY-MM-DD` |

### 分类（category）

- `llm-api` — 大语言模型 API
- `coding-assistant` — AI 编程助手
- `image-generation` — 图像生成
- `speech` — 语音（TTS/STT）
- `embedding` — 向量嵌入
- `multi-modal` — 多模态（含多类能力）
- `other` — 其他

### free_tier 字段

```yaml
free_tier:
  available: true          # 是否有免费额度
  description: "说明文字"
  models_included:         # 免费可用的模型列表（可选）
    - model-name
  limits:                  # 速率/用量限制，key-value 均为字符串（可选）
    requests_per_minute: "60"
  signup_url: https://...  # 注册/获取免费额度的链接
  requires_credit_card: false
```

### promotions 字段

```yaml
promotions:
  - title: "活动名称"
    description: "活动说明"
    credit_amount: "$100"        # 额度描述（字符串）
    credit_amount_usd: 100       # 额度数值（可选）
    start_date: "2025-01-01"     # 可选
    end_date: "2025-12-31"       # 可选，不填代表不限期
    is_ongoing: true             # 是否持续有效
    eligibility: "限制条件"      # 可选
    promo_url: https://...       # 获取优惠的链接
    promo_code: "CODE123"        # 优惠码（可选）
    verified_date: "2025-03-01"  # 验证日期
```

## 数据质量要求

- 所有 URL 必须真实可访问
- `last_verified` 必须是你实际核实的日期
- 不确定的信息请注明，或不填写该字段
- 价格/额度信息请注明来源或验证时间

## CI 校验

PR 提交后 GitHub Actions 会自动运行 `npm run validate` 校验所有 YAML 文件格式。

谢谢你的贡献！🎉
