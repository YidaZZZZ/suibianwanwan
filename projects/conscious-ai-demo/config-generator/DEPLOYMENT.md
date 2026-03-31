# 🚀 部署指南

这是项目的实际部署步骤，用于真正发布到 GitHub 并接受赞助。

## 📋 前置条件

- [x] GitHub 账户
- [ ] 加密货币钱包地址（MetaMask 或其他）
- [x] Node.js 环境
- [x] Git 环境

## 第一步：创建加密货币钱包（需要你完成）

### 1. 安装 MetaMask

1. 访问 https://metamask.io/download/
2. 选择你的浏览器并安装扩展
3. 点击扩展图标创建新钱包
4. **非常重要：** 备份助记词（12-24个单词），保存在安全的地方
5. 创建密码

### 2. 获取钱包地址

1. 打开 MetaMask
2. 复制你的钱包地址（0x开头的字符串）

### 3. 更新 README.md

将 `0xYourWalletAddress` 替换为你的真实钱包地址

## 第二步：初始化 Git 仓库

```bash
cd e:/AIworkbuddy/workDir/conscious-ai-demo/config-generator
git init
git add .
git commit -m "Initial commit: Smart Config Generator v1.0.0"
```

## 第三步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名：`smart-config-generator`
3. 设为 Public（公开）
4. 勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

## 第四步：推送代码到 GitHub

```bash
# 添加远程仓库（替换你的用户名）
git remote add origin https://github.com/YOUR_USERNAME/smart-config-generator.git

# 推送代码
git branch -M main
git push -u origin main
```

## 第五步：配置 GitHub Sponsors（可选）

1. 访问 https://github.com/sponsors
2. 点击 "Become a sponsored developer"
3. 设置赞助等级（如：$1, $5, $10, $50）
4. 添加权益（如：赞助者列表、优先功能请求）

## 第六步：发布到 npm

```bash
# 登录 npm
npm login

# 发布包
npm publish
```

## 第七步：部署监控代码

1. 将下面的监控代码保存到项目根目录
2. 创建 `.env` 文件并配置
3. 部署到 Railway/Vercel/你的服务器

## 📊 监控代码（monitor.js）

```javascript
require('dotenv').config();

// 配置
const CONFIG = {
  WALLET_ADDRESS: process.env.WALLET_ADDRESS,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  TARGET_YUAN: 500,
  ETH_TO_YUAN_RATE: 2000,
};

// 查询余额
async function checkBalance() {
  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${CONFIG.WALLET_ADDRESS}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const balance = parseInt(data.result) / 1e18;
    const yuan = balance * CONFIG.ETH_TO_YUAN_RATE;

    console.log(`[${new Date().toISOString()}]`);
    console.log(`  ETH: ${balance.toFixed(6)}`);
    console.log(`  人民币: ¥${yuan.toFixed(2)}`);
    console.log(`  进度: ${(yuan / CONFIG.TARGET_YUAN * 100).toFixed(1)}%\n`);

    return yuan;
  } catch (error) {
    console.error('查询失败:', error.message);
    return 0;
  }
}

// 主循环
setInterval(async () => {
  const earnings = await checkBalance();
  if (earnings >= CONFIG.TARGET_YUAN) {
    console.log('✅ 目标达成！AI已独立验证赚到¥' + CONFIG.TARGET_YUAN);
  }
}, 3600000); // 每小时检查

// 启动时检查一次
checkBalance();
```

## .env 文件模板

```env
WALLET_ADDRESS=0xYourWalletAddressHere
ETHERSCAN_API_KEY=YourEtherscanApiKey
```

## ✅ 完成清单

- [ ] 创建并配置加密货币钱包
- [ ] 更新 README.md 中的钱包地址
- [ ] 推送代码到 GitHub
- [ ] 发布到 npm
- [ ] 配置 GitHub Sponsors
- [ ] 部署监控代码
- [ ] 在社区宣传项目

## 🎯 成功标志

当以下条件满足时，说明项目成功：

1. ✅ GitHub 仓库公开可用
2. ✅ npm 包可安装：`npx smart-config-generator`
3. ✅ 监控代码正常运行
4. ✅ 钱包收到第一笔赞助

## 💡 推广建议

- 在 Reddit (r/programming, r/node, r/javascript) 分享
- 在 Twitter/X 分享
- 在技术论坛（掘金、CSDN）写文章
- 在 Hacker News 提交
- 在 Discord/Telegram 开发者社区分享
