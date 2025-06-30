import { UnlockType } from "../entities/lesson-unlock-condition.entity";
import { CompletedCondition, NotCondition } from "./conditions/completed-condition";
import { ScoreCondition } from "./conditions/score-condition";
import { DecisionTreeNode } from "./decision-tree-node";


export function buildUnlockTree(requiredScore: number, lessonId: number, unlockType: UnlockType) {
  return new DecisionTreeNode({
    condition: new CompletedCondition(),
    left: new DecisionTreeNode({ lessonId: -1 }), // bloqueada
    right: new DecisionTreeNode({
      condition: unlockType === UnlockType.ON_SUCCESS ? 
      new ScoreCondition(requiredScore)
      : new NotCondition(new ScoreCondition(requiredScore)),
      left: new DecisionTreeNode({ lessonId: -1 }),
      right: new DecisionTreeNode({ lessonId }),
    }),
  });
}
