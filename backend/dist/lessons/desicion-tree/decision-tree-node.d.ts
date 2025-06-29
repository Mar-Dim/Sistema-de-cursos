import { DecisionCondition, DecisionContext } from './decision-types';
export declare class DecisionTreeNode {
    condition?: DecisionCondition;
    left?: DecisionTreeNode;
    right?: DecisionTreeNode;
    lessonId?: number;
    constructor(options: {
        condition?: DecisionCondition;
        left?: DecisionTreeNode;
        right?: DecisionTreeNode;
        lessonId?: number;
    });
    evaluate(context: DecisionContext): number | null;
}
