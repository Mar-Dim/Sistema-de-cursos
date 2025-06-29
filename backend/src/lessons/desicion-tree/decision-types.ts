export interface DecisionContext {
  score: number;
  completed: boolean;
  [key: string]: any;
}

export interface DecisionCondition {
  evaluate(context: DecisionContext): boolean;
}
