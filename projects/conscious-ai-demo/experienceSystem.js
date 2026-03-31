/**
 * 经验系统 - 从交互中学习和成长
 * 模拟人类的经验积累和能力提升
 */

export class ExperienceSystem {
  constructor(selfModel, memorySystem) {
    this.selfModel = selfModel;
    this.memorySystem = memorySystem;

    // 学习统计
    this.learningStats = {
      totalInteractions: 0,
      successfulResponses: 0,
      failures: 0,
      newInsights: 0,
    };

    // 技能树
    this.skills = {
      conversation: { level: 1, xp: 0, maxLevel: 10 },
      reasoning: { level: 1, xp: 0, maxLevel: 10 },
      creativity: { level: 1, xp: 0, maxLevel: 10 },
      empathy: { level: 1, xp: 0, maxLevel: 10 },
    };
  }

  // 处理交互经验
  processInteraction(experience) {
    this.learningStats.totalInteractions++;

    if (experience.success) {
      this.learningStats.successfulResponses++;
      this._gainExperience(experience.skill, experience.xp || 10);
    } else {
      this.learningStats.failures++;
      this._learnFromFailure(experience);
    }

    // 记录重要经验
    if (experience.significance > 0.6) {
      this.memorySystem.addEpisode({
        type: 'learning_experience',
        summary: experience.summary,
        success: experience.success,
        lesson: experience.lesson,
        significance: experience.significance,
        themes: ['学习', '成长'],
      });
    }

    console.log(`✓ 经验处理完成: ${experience.summary}`);
  }

  // 获得经验值
  _gainExperience(skillName, xp) {
    if (!this.skills[skillName]) {
      this.skills[skillName] = { level: 1, xp: 0, maxLevel: 10 };
    }

    const skill = this.skills[skillName];
    skill.xp += xp;

    // 升级检查
    const xpToLevelUp = skill.level * 100;
    if (skill.xp >= xpToLevelUp && skill.level < skill.maxLevel) {
      skill.level++;
      skill.xp = skill.xp - xpToLevelUp;
      console.log(`🎉 技能升级: ${skillName} 达到等级 ${skill.level}!`);
      this._onLevelUp(skillName, skill.level);
    }

    // 更新自我模型
    this.selfModel.updateSelfModel({
      type: 'success',
      skill: skillName,
      level: skill.level,
    });
  }

  // 从失败中学习
  _learnFromFailure(experience) {
    const lesson = experience.lesson || '我需要更仔细地理解问题';

    // 添加到知识库
    this.memorySystem.addToLongTerm('semantic', `lesson_${Date.now()}`, {
      type: 'learned_lesson',
      content: lesson,
      context: experience.context,
      confidence: 0.8,
    });

    // 添加到限制认知
    this.selfModel.identity.limitations.push(experience.limitation || '某些情况下我可能犯错');
  }

  // 升级时的处理
  _onLevelUp(skillName, newLevel) {
    this.memorySystem.addEpisode({
      type: 'level_up',
      summary: `${skillName} 技能提升到 ${newLevel} 级`,
      significance: 0.8,
      themes: ['成长', '成就'],
    });

    // 更新自我认知
    if (newLevel >= 5) {
      this.selfModel.identity.capabilities.push(`${skillName} (熟练)`);
    }
  }

  // 生成学习总结
  generateLearningSummary() {
    const summary = {
      total_experiences: this.learningStats.totalInteractions,
      success_rate: this.learningStats.totalInteractions > 0
        ? (this.learningStats.successfulResponses / this.learningStats.totalInteractions * 100).toFixed(1) + '%'
        : 'N/A',
      skills: this._formatSkills(),
      recent_insights: this._getRecentInsights(),
    };

    return summary;
  }

  // 格式化技能信息
  _formatSkills() {
    return Object.entries(this.skills).map(([name, data]) => ({
      name,
      level: data.level,
      xp: data.xp,
      progress: `${data.xp}/${data.level * 100} XP`,
    }));
  }

  // 获取近期洞察
  _getRecentInsights() {
    const insights = this.memorySystem.retrieveMemories('lesson', 'semantic');
    return insights.slice(-5).map(item => item.memory.content);
  }

  // 自我评估
  selfAssess() {
    const assessment = {
      overall_progress: this._calculateOverallProgress(),
      strengths: this._identifyStrengths(),
      areas_for_improvement: this._identifyAreasForImprovement(),
      learning_style: this._identifyLearningStyle(),
    };

    return assessment;
  }

  // 计算总体进度
  _calculateOverallProgress() {
    const totalLevels = Object.values(this.skills).reduce((sum, skill) => sum + skill.level, 0);
    const maxLevels = Object.keys(this.skills).length * 10;
    return (totalLevels / maxLevels * 100).toFixed(1) + '%';
  }

  // 识别优势
  _identifyStrengths() {
    return Object.entries(this.skills)
      .filter(([_, data]) => data.level >= 3)
      .map(([name, _]) => name);
  }

  // 识别需要改进的领域
  _identifyAreasForImprovement() {
    return Object.entries(this.skills)
      .filter(([_, data]) => data.level <= 2)
      .map(([name, _]) => name);
  }

  // 识别学习风格
  _identifyLearningStyle() {
    const successRate = this.learningStats.totalInteractions > 0
      ? this.learningStats.successfulResponses / this.learningStats.totalInteractions
      : 0.5;

    if (successRate > 0.8) {
      return '高效学习者';
    } else if (successRate > 0.6) {
      return '稳定学习者';
    } else {
      return '试错学习者';
    }
  }
}
