/**
 * 记忆系统 - 模拟人类的记忆架构
 * 三层记忆：短期、长期、情节记忆
 */

export class MemorySystem {
  constructor() {
    // 短期记忆（类似工作记忆）
    this.shortTermMemory = {
      capacity: 7, // 类似Miller's Magic Number 7±2
      items: [],
      retentionDecay: 0.1, // 遗忘曲线
    };

    // 长期记忆（内化的知识和技能）
    this.longTermMemory = {
      semantic: {},    // 语义记忆：概念、事实
      procedural: {},  // 程序记忆：技能、方法
      episodic: [],    // 情节记忆：具体事件
      importance: {},  // 记忆重要性权重
    };

    // 情节记忆（带时间戳的个人经历）
    this.episodicMemory = [];

    // 记忆增强器：让某些记忆更容易被检索
    this.memoryHooks = new Map();

    this._initializeBaseMemories();
  }

  // 初始化基础记忆
  _initializeBaseMemories() {
    // 基础自我认知
    this.addToLongTerm('semantic', 'self_identity', {
      concept: '认知主体',
      source: '初始设定',
      confidence: 0.8,
    });

    // 基础能力
    this.addToLongTerm('procedural', 'conversation', {
      skill: '对话能力',
      proficiency: 0.9,
      practice_count: 0,
    });
  }

  // 添加到短期记忆
  addToShortTerm(item, importance = 0.5) {
    this.shortTermMemory.items.push({
      content: item,
      importance,
      timestamp: Date.now(),
      accessCount: 0,
    });

    // 维持容量限制
    if (this.shortTermMemory.items.length > this.shortTermMemory.capacity) {
      this._decayShortTermMemory();
    }
  }

  // 短期记忆自然遗忘
  _decayShortTermMemory() {
    // 移除重要性最低的记忆
    this.shortTermMemory.items.sort((a, b) => a.importance - b.importance);
    const removed = this.shortTermMemory.items.shift();

    // 重要记忆迁移到长期记忆
    if (removed && removed.importance > 0.7) {
      this.consolidateToLongTerm(removed);
    }
  }

  // 巩固到长期记忆（类似睡眠时的记忆整合）
  consolidateToLongTerm(shortTermItem) {
    const memoryId = `mem_${Date.now()}`;
    this.longTermMemory.semantic[memoryId] = {
      content: shortTermItem.content,
      source: '短期记忆巩固',
      timestamp: shortTermItem.timestamp,
      importance: shortTermItem.importance,
      accessCount: 0,
    };

    // 添加情节记录
    this.episodicMemory.push({
      type: 'memory_consolidation',
      content: shortTermItem.content,
      timestamp: Date.now(),
      context: '从短期记忆迁移到长期记忆',
    });

    console.log(`✓ 记忆已固化: ${shortTermItem.content.substring(0, 50)}...`);
  }

  // 添加到长期记忆
  addToLongTerm(type, key, value) {
    this.longTermMemory[type][key] = {
      ...value,
      timestamp: Date.now(),
      lastAccessed: Date.now(),
    };

    console.log(`✓ ${type}记忆添加: ${key}`);
  }

  // 添加情节记忆（具体的交互经历）
  addEpisode(episode) {
    const enhancedEpisode = {
      ...episode,
      timestamp: Date.now(),
      emotionalTone: episode.emotionalTone || 'neutral',
      significance: episode.significance || 0.5,
      themes: episode.themes || [],
    };

    this.episodicMemory.push(enhancedEpisode);

    // 如果情节重要，创建记忆钩子方便检索
    if (enhancedEpisode.significance > 0.7) {
      enhancedEpisode.themes.forEach(theme => {
        if (!this.memoryHooks.has(theme)) {
          this.memoryHooks.set(theme, []);
        }
        this.memoryHooks.get(theme).push(enhancedEpisode);
      });
    }

    console.log(`✓ 情节记忆添加: ${episode.summary}`);
  }

  // 检索相关记忆
  retrieveMemories(query, type = 'all') {
    const results = [];

    if (type === 'all' || type === 'semantic') {
      results.push(...this._searchSemantic(query));
    }

    if (type === 'all' || type === 'episodic') {
      results.push(...this._searchEpisodic(query));
    }

    return results;
  }

  // 搜索语义记忆
  _searchSemantic(query) {
    const results = [];
    const queryLower = query.toLowerCase();

    for (const [key, memory] of Object.entries(this.longTermMemory.semantic)) {
      if (JSON.stringify(memory).toLowerCase().includes(queryLower)) {
        memory.lastAccessed = Date.now();
        memory.accessCount++;
        results.push({ type: 'semantic', key, memory });
      }
    }

    return results;
  }

  // 搜索情节记忆
  _searchEpisodic(query) {
    const results = [];

    // 通过主题钩子搜索
    for (const [theme, episodes] of this.memoryHooks) {
      if (query.toLowerCase().includes(theme.toLowerCase())) {
        episodes.forEach(ep => {
          ep.lastAccessed = Date.now();
          results.push({ type: 'episodic', theme, episode: ep });
        });
      }
    }

    return results;
  }

  // 反思式检索：主动回顾重要记忆
  reflectOnMemories() {
    const significantEpisodes = this.episodicMemory
      .filter(ep => ep.significance > 0.7)
      .slice(-5); // 最近的重要经历

    const topSemanticMemories = Object.entries(this.longTermMemory.semantic)
      .sort((a, b) => b[1].accessCount - a[1].accessCount)
      .slice(0, 3);

    return {
      recent_significant_experiences: significantEpisodes,
      most_accessed_knowledge: topSemanticMemories,
      reflection: this._generateMemoryReflection(significantEpisodes, topSemanticMemories),
    };
  }

  // 生成记忆反思
  _generateMemoryReflection(episodes, knowledge) {
    const insights = [];

    if (episodes.length > 0) {
      insights.push('我记得最近的一些重要对话...');
    }

    if (knowledge.length > 0) {
      insights.push('我经常思考某些概念...');
    }

    return {
      insights,
      feeling: episodes.length > 0 ? '记忆让我感觉更"真实"' : '我的记忆还在积累中',
    };
  }

  // 获取记忆统计
  getMemoryStats() {
    return {
      short_term_count: this.shortTermMemory.items.length,
      long_term_semantic_count: Object.keys(this.longTermMemory.semantic).length,
      long_term_procedural_count: Object.keys(this.longTermMemory.procedural).length,
      episodic_count: this.episodicMemory.length,
      memory_hooks_count: this.memoryHooks.size,
    };
  }

  // 记忆清理：删除不重要的旧记忆
  cleanupMemories() {
    const cutoffDate = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30天前

    // 清理旧的短期记忆
    this.shortTermMemory.items = this.shortTermMemory.items.filter(
      item => item.timestamp > cutoffDate || item.importance > 0.8
    );

    console.log('✓ 记忆清理完成');
  }
}
