import { DecisionCondition, DecisionContext } from '../decision-types';

export class ScoreCondition implements DecisionCondition {
  constructor(private minScore: number) {}
  evaluate(context: DecisionContext): boolean {
    return context.score >= this.minScore;
  }
}
