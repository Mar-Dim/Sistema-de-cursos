

import { ContentNode, Course, Module } from './content-tree';
import { DecisionTreeNode } from '../lessons/desicion-tree/decision-tree-node';
import { CompletedCondition, AndCondition, NotCondition } from '../lessons/desicion-tree/conditions/completed-condition';
import { ScoreCondition } from '../lessons/desicion-tree/conditions/score-condition';

const BLOCKED_NODE = new DecisionTreeNode({ lessonId: -1 });


function buildSuccessTree(requiredScore: number, lessonId: number): DecisionTreeNode {
  return new DecisionTreeNode({
    condition: new AndCondition([new CompletedCondition(), new ScoreCondition(requiredScore)]),
    left: BLOCKED_NODE,
    right: new DecisionTreeNode({ lessonId }),
  });
}
function buildFailTree(requiredScore: number, lessonId: number): DecisionTreeNode {
    return new DecisionTreeNode({
        condition: new AndCondition([new CompletedCondition(), new NotCondition(new ScoreCondition(requiredScore))]),
        left: BLOCKED_NODE,
        right: new DecisionTreeNode({ lessonId }),
    });
}
function buildSimpleCompletionTree(lessonId: number): DecisionTreeNode {
    return new DecisionTreeNode({
        condition: new CompletedCondition(),
        left: BLOCKED_NODE,
        right: new DecisionTreeNode({ lessonId }),
    });
}
export function buildCourseTreeFromData(courseData: any): ContentNode {
  const nodeMap = new Map<number, ContentNode>();
  const prerequisites = new Map<number, number[]>();

   for (const lessonId in courseData) {
    const data = courseData[lessonId];
    const node: ContentNode = {
      id: data.id.toString(),
      type: data.type.toUpperCase(), 
      title: data.name,
      unlockDecisionTree: null, 
      children: [],
      metadata: {
        content: data.content,
        questions: data.questions,
        requiredScore: data.requiredScore,
      },
    };
    nodeMap.set(data.id, node);

    const allUnlocks = [...(data.unlocks || []), ...(data.unlocksOnFail || [])];
    allUnlocks.forEach(targetId => {
        if (!prerequisites.has(targetId)) {
            prerequisites.set(targetId, []);
        }
        prerequisites.get(targetId)!.push(data.id);
    });
  }

  for (const [targetId, sourceIds] of prerequisites.entries()) {
      const targetNode = nodeMap.get(targetId);
      if (!targetNode) continue;
      
     
      const sourceId = sourceIds[0];
      const sourceData = courseData[sourceId];

      if (sourceData.unlocks.includes(targetId)) {
          if (sourceData.type === 'QUIZ' || sourceData.type === 'EVALUATION') {
              targetNode.unlockDecisionTree = buildSuccessTree(sourceData.requiredScore, targetId);
          } else {
              targetNode.unlockDecisionTree = buildSimpleCompletionTree(targetId);
          }
      } else if (sourceData.unlocksOnFail?.includes(targetId)) {
          targetNode.unlockDecisionTree = buildFailTree(sourceData.requiredScore, targetId);
      }
  }
  
 const courseRoot = new Course('main-course', 'Curso de JavaScript');
  const mainModule = new Module('main-module', 'Contenido Principal');
  
  mainModule.children = Array.from(nodeMap.values());
  courseRoot.children.push(mainModule);

  return courseRoot;
}