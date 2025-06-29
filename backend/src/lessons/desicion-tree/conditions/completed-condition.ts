import { DecisionCondition, DecisionContext } from '../decision-types';

export class CompletedCondition implements DecisionCondition {
  evaluate(context: DecisionContext): boolean {
    return context.completed;
  }
}
