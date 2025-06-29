import { DecisionCondition, DecisionContext } from './decision-types';

export class DecisionTreeNode {
  condition?: DecisionCondition;
  left?: DecisionTreeNode;
  right?: DecisionTreeNode;
  lessonId?: number;

  constructor(options: {
    condition?: DecisionCondition;
    left?: DecisionTreeNode;
    right?: DecisionTreeNode;
    lessonId?: number;
  }) {
    this.condition = options.condition;
    this.left = options.left;
    this.right = options.right;
    this.lessonId = options.lessonId;
  }

  evaluate(context: DecisionContext): number | null {
    if (this.lessonId !== undefined) return this.lessonId;
    if (!this.condition || !this.left || !this.right) return null;
    return this.condition.evaluate(context)
      ? this.right.evaluate(context)
      : this.left.evaluate(context);
  }
}
