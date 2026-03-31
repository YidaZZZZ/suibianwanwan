/**
 * Agent监控工具
 * 监控Agent运行状态、性能和资源使用
 */

export class AgentMonitor {
  constructor(options = {}) {
    this.metrics = {
      startTime: Date.now(),
      tasksCompleted: 0,
      tasksFailed: 0,
      totalMemoryUsage: 0,
      memorySamples: 0,
    };

    this.alerts = [];
    this.logging = options.logging ?? true;
  }

  /**
   * 记录任务完成
   */
  recordTaskComplete(taskName, duration) {
    this.metrics.tasksCompleted++;

    if (this.logging) {
      this.log({
        type: 'task_complete',
        task: taskName,
        duration: duration,
        timestamp: Date.now(),
      });
    }
  }

  /**
   * 记录任务失败
   */
  recordTaskFailure(taskName, error) {
    this.metrics.tasksFailed++;

    const alert = {
      type: 'task_failure',
      task: taskName,
      error: error.message,
      timestamp: Date.now(),
    };

    this.alerts.push(alert);

    if (this.logging) {
      this.log(alert);
    }
  }

  /**
   * 记录内存使用
   */
  recordMemoryUsage() {
    const usage = process.memoryUsage();
    const heapUsed = usage.heapUsed / 1024 / 1024; // MB

    this.metrics.totalMemoryUsage += heapUsed;
    this.metrics.memorySamples++;

    if (this.logging) {
      this.log({
        type: 'memory_usage',
        heapUsed: heapUsed.toFixed(2) + ' MB',
        heapTotal: (usage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
        external: (usage.external / 1024 / 1024).toFixed(2) + ' MB',
        timestamp: Date.now(),
      });
    }
  }

  /**
   * 计算平均内存使用
   */
  getAverageMemoryUsage() {
    if (this.metrics.memorySamples === 0) return 0;
    return this.metrics.totalMemoryUsage / this.metrics.memorySamples;
  }

  /**
   * 计算任务成功率
   */
  getSuccessRate() {
    const total = this.metrics.tasksCompleted + this.metrics.tasksFailed;
    if (total === 0) return 1;
    return this.metrics.tasksCompleted / total;
  }

  /**
   * 获取运行时间
   */
  getUptime() {
    return Date.now() - this.metrics.startTime;
  }

  /**
   * 生成性能报告
   */
  generateReport() {
    return {
      uptime: this.formatUptime(this.getUptime()),
      tasks: {
        completed: this.metrics.tasksCompleted,
        failed: this.metrics.tasksFailed,
        successRate: (this.getSuccessRate() * 100).toFixed(2) + '%',
      },
      memory: {
        average: this.getAverageMemoryUsage().toFixed(2) + ' MB',
        samples: this.metrics.memorySamples,
      },
      alerts: {
        total: this.alerts.length,
        recent: this.alerts.slice(-5),
      },
    };
  }

  /**
   * 格式化运行时间
   */
  formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
      formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
    };
  }

  /**
   * 记录日志
   */
  log(data) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${JSON.stringify(data)}\n`;

    console.log(logEntry);
  }

  /**
   * 获取所有告警
   */
  getAlerts() {
    return this.alerts;
  }

  /**
   * 清除告警
   */
  clearAlerts() {
    this.alerts = [];
  }
}

/**
 * 创建监控实例
 */
export function createMonitor(options) {
  return new AgentMonitor(options);
}
