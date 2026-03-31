# 赚钱Agent模板
用于赚钱的Agent，包含收益监控、验证和报告功能。

## 📁 模板结构

```
earner/
├── earner.js           # 核心Agent
├── monitor.js         # 监控器
├── payment.js        # 支付处理器
├── reporter.js        # 报告器
└── package.json
```

## 🚀 使用方法

```javascript
import { Earner } from './earner.js';

const earner = new Earner({
  targetAmount: 500,
  currency: 'CNY',
  paymentMethods: ['crypto', 'wechat', 'alipay'],
});

// 启动监控
earner.startMonitoring();

// 手动添加移动支付
earner.addPayment('wechat', 50);
```

## 💰 支付方式

### 1. 加密货币
- 自动查询区块链余额
- 支持ETH、USDT等
- 完全独立验证

### 2. 微信支付
- 手动添加记录
- 二维码收款
- 中国用户便捷

### 3. 支付宝
- 手动添加记录
- 二维码收款
- 中国用户便捷

## ✨ 特性

- ✅ 混合支付系统
- ✅ 自动监控加密货币
- ✅ 手动记录移动支付
- ✅ 独立验证收益
- ✅ 详细的收益报告
- ✅ 目标达成通知

## 📊 监控逻辑

```
加密货币
  ↓ 每小时查询区块链
自动验证

移动支付
  ↓ 手动添加记录
独立计算

  ↓
总收益 = 加密货币 + 移动支付
  ↓
是否 ≥ 目标？
  ↓ Yes → 发送达成通知
```

## 🔧 配置选项

```javascript
{
  targetAmount: 500,           // 目标金额
  currency: 'CNY',            // 货币单位
  checkInterval: 3600000,      // 检查间隔（毫秒）
  walletAddress: '0x...',      // 加密钱包地址
  paymentMethods: ['crypto'],   // 支付方式
}
```

## 📖 详细文档

- `monitor.js`: 监控和验证逻辑
- `payment.js`: 支付处理
- `reporter.js`: 报告生成

## 💡 使用场景

- 需要接受赞助的开源项目
- 需要监控收入的工具
- 需要混合支付方式
- 需要独立验证收益

## 🔑 关键文件

### mobile-payments.json
存储移动支付记录：
```json
{
  "wechat": 150,
  "alipay": 100
}
```

### earnings.log
收益日志：
```json
[2026-03-31T10:00:00Z] {
  "crypto": "¥125.00",
  "mobile": "¥250.00",
  "total": "¥375.00",
  "progress": "75%"
}
```
