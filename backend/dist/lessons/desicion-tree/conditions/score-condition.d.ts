import { DecisionCondition, DecisionContext } from '../decision-types';
export declare class ScoreCondition implements DecisionCondition {
    private minScore;
    constructor(minScore: number);
    evaluate(context: DecisionContext): boolean;
}
