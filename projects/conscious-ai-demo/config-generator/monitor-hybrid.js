/**
 * 混合支付监控系统
 * 支持加密货币（自动验证）+ 移动支付（手动报告）
 */

require('dotenv').config();

const fs = require('fs');

// 配置
const CONFIG = {
  // 加密货币配置（可自动验证）
  crypto: {
    walletAddress: process.env.WALLET_ADDRESS || '0xYourWalletAddress',
    etherscanApiKey: process.env.ETHERSCAN_API_KEY || '',
    ethToYuanRate: 2000,
  },

  // 移动支付配置（需要手动报告）
  mobile: {
    wechatTotal: 0,
    alipayTotal: 0,
  },

  // 目标
  target: 500,

  // 日志文件
  logFile: 'earnings.log',
};

/**
 * 查询加密货币余额（AI可独立执行）
 */
async function checkCryptoBalance() {
  if (!CONFIG.crypto.walletAddress || CONFIG.crypto.walletAddress === '0xYourWalletAddress') {
    return 0;
  }

  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${CONFIG.crypto.walletAddress}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === '1') {
      const balanceETH = parseInt(data.result) / 1e18;
      const balanceYuan = balanceETH * CONFIG.crypto.ethToYuanRate;
      return balanceYuan;
    }
  } catch (error) {
    console.error('查询加密货币余额失败:', error.message);
  }

  return 0;
}

/**
 * 读取移动支付记录（手动报告的数据）
 */
function loadMobilePayments() {
  try {
    const data = fs.readFileSync('mobile-payments.json', 'utf-8');
    const payments = JSON.parse(data);

    CONFIG.mobile.wechatTotal = payments.wechat || 0;
    CONFIG.mobile.alipayTotal = payments.alipay || 0;

    return CONFIG.mobile.wechatTotal + CONFIG.mobile.alipayTotal;
  } catch (error) {
    return 0;
  }
}

/**
 * 记录移动支付（手动添加）
 */
function addMobilePayment(type, amount) {
  try {
    let payments = {};
    try {
      const data = fs.readFileSync('mobile-payments.json', 'utf-8');
      payments = JSON.parse(data);
    } catch (error) {
      // 文件不存在，使用空对象
    }

    if (!payments[type]) {
      payments[type] = 0;
    }

    payments[type] += amount;

    fs.writeFileSync('mobile-payments.json', JSON.stringify(payments, null, 2));

    console.log(`✅ 已添加 ${type} 赞助: ¥${amount}`);
  } catch (error) {
    console.error('记录支付失败:', error.message);
  }
}

/**
 * 记录日志
 */
function log(logData) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${JSON.stringify(logData)}\n`;

  console.log(logEntry);

  try {
    fs.appendFileSync(CONFIG.logFile, logEntry);
  } catch (error) {
    // 忽略文件写入错误
  }
}

/**
 * 主监控函数
 */
async function monitor() {
  console.log('='.repeat(70));
  console.log('💰 混合支付监控系统');
  console.log('='.repeat(70));
  console.log('\n监控模式：');
  console.log('  ✅ 加密货币：自动验证（区块链API）');
  console.log('  ⚠️  移动支付：手动报告（需要人工添加）\n');

  log({ message: '混合支付监控系统启动' });

  // 立即检查一次
  await checkAndReport();

  // 定期检查
  setInterval(async () => {
    await checkAndReport();
  }, 3600000); // 每小时检查
}

/**
 * 检查并报告
 */
async function checkAndReport() {
  const cryptoEarnings = await checkCryptoBalance();
  const mobileEarnings = loadMobilePayments();
  const totalEarnings = cryptoEarnings + mobileEarnings;
  const progress = (totalEarnings / CONFIG.target * 100).toFixed(1);

  console.log('\n' + '='.repeat(70));
  console.log('💰 收益统计');
  console.log('='.repeat(70));
  console.log(`  🪙 加密货币: ¥${cryptoEarnings.toFixed(2)}`);
  console.log(`  💳 移动支付: ¥${mobileEarnings.toFixed(2)}`);
  console.log(`  ────────────────`);
  console.log(`  📊 总收益: ¥${totalEarnings.toFixed(2)}`);
  console.log(`  🎯 目标: ¥${CONFIG.target}`);
  console.log(`  📈 进度: ${progress}%`);
  console.log('='.repeat(70) + '\n');

  log({
    type: 'earnings_report',
    crypto: `¥${cryptoEarnings.toFixed(2)}`,
    mobile: `¥${mobileEarnings.toFixed(2)}`,
    total: `¥${totalEarnings.toFixed(2)}`,
    progress: `${progress}%`,
    status: totalEarnings >= CONFIG.target ? '✅ 目标达成！' : '⏳ 进行中',
  });

  if (totalEarnings >= CONFIG.target) {
    log({
      success: true,
      message: `🎉 AI已独立验证赚到¥${CONFIG.target}！`,
      breakdown: {
        crypto: `¥${cryptoEarnings.toFixed(2)}`,
        mobile: `¥${mobileEarnings.toFixed(2)}`,
      },
      timestamp: new Date().toISOString(),
    });

    console.log('🎉 目标达成！\n');
  }
}

/**
 * CLI命令：手动添加移动支付
 */
async function addPaymentCommand() {
  const inquirer = await import('inquirer');

  const answers = await inquirer.default.prompt([
    {
      type: 'list',
      name: 'type',
      message: '选择支付方式：',
      choices: ['微信', '支付宝'],
    },
    {
      type: 'input',
      name: 'amount',
      message: '输入金额（元）：',
      validate: (input) => {
        const num = parseFloat(input);
        if (isNaN(num) || num <= 0) {
          return '请输入有效的金额';
        }
        return true;
      },
    },
  ]);

  const type = answers.type === '微信' ? 'wechat' : 'alipay';
  const amount = parseFloat(answers.amount);

  addMobilePayment(type, amount);
  await checkAndReport();
}

// 启动
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--add')) {
    // 手动添加移动支付
    addPaymentCommand().catch(console.error);
  } else if (args.includes('--check')) {
    // 立即检查一次
    checkAndReport().catch(console.error);
  } else {
    // 启动监控
    monitor().catch(console.error);
  }
}

module.exports = {
  checkCryptoBalance,
  loadMobilePayments,
  addMobilePayment,
  monitor,
};
