import { DecisionCondition, DecisionContext } from '../decision-types';

export class CompletedCondition implements DecisionCondition {
  evaluate(context: DecisionContext): boolean {
    return context.completed;
  }
}


export class AndCondition implements DecisionCondition {
  constructor(private conditions: DecisionCondition[]) {}
  evaluate(context: DecisionContext): boolean {
   
    return this.conditions.every(c => c.evaluate(context));
  }
}

export class NotCondition implements DecisionCondition {
  constructor(private condition: DecisionCondition) {}
  evaluate(context: DecisionContext): boolean {
    return !this.condition.evaluate(context);
  }
}