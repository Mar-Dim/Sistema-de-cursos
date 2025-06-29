import { DecisionCondition, DecisionContext } from '../decision-types';
export declare class CompletedCondition implements DecisionCondition {
    evaluate(context: DecisionContext): boolean;
}
