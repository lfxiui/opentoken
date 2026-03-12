<div align="center">

# 🪙 OpenToken

**开源 AI Credits 信息聚合平台**

帮助 vibe coding 开发者发现各 AI 平台的免费额度、优惠活动

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[🚀 Live Demo](#) · [📖 贡献数据](CONTRIBUTING.md) · [🐛 反馈问题](https://github.com/issues)

</div>

---

## ✨ 功能特性

- **平台目录** — 收录主流 AI 平台的免费额度、速率限制、支持模型等信息
- **优惠活动** — 聚合各平台试用额度、初创公司计划、学生优惠等活动
- **搜索筛选** — 按名称、分类、标签快速找到合适的平台
- **社区驱动** — 数据以 YAML 格式开源，任何人均可通过 PR 贡献或更正
- **实时数据** — 所有信息标注最后验证时间，确保数据时效性

## 🏗️ 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Vite + React 19 + TypeScript + Tailwind CSS 4 |
| 后端 | Hono + TypeScript（支持 Node/CF Workers/Bun） |
| 数据库 | SQLite + Drizzle ORM |
| 数据格式 | YAML（社区可直接贡献） |
| Monorepo | npm workspaces |

## 🚀 快速开始

### 前置条件

- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/opentoken-dev/opentoken.git
cd opentoken

# 安装依赖
npm install

# 导入种子数据到数据库
npm run seed

# 启动开发服务器（前端 :5173，后端 :3000）
npm run dev
```

访问 http://localhost:5173 即可看到应用。

### 构建生产版本

```bash
npm run build
```

### 验证 YAML 数据

```bash
npm run validate
```

## 📁 项目结构

```
opentoken/
├── packages/
│   ├── shared/      # 共享类型和 Zod schema
│   ├── server/      # Hono API 服务端
│   └── web/         # React 前端
├── data/
│   └── platforms/   # AI 平台 YAML 数据（社区贡献）
└── scripts/
    ├── seed.ts      # 将 YAML 导入数据库
    └── validate.ts  # 校验 YAML 格式
```

## 🤝 贡献数据

最简单的贡献方式：直接修改 `data/platforms/` 下的 YAML 文件并提交 PR。

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

### YAML 格式示例

```yaml
name: Platform Name
slug: platform-name
website: https://platform.com
description: 平台描述
category: llm-api  # llm-api | coding-assistant | image-generation | speech | embedding | multi-modal | other
tags:
  - tag1
free_tier:
  available: true
  description: 免费额度说明
  signup_url: https://platform.com/signup
  requires_credit_card: false
pricing_url: https://platform.com/pricing
docs_url: https://platform.com/docs
status: active
last_verified: "2025-03-01"
```

## 📄 License

MIT © OpenToken Contributors
