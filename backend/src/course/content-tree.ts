// --- content-tree.ts ---

import { DecisionTreeNode } from '../lessons/desicion-tree/decision-tree-node';

export type NodeType = 'Course' | 'Module' | 'Lesson' | 'Quiz' | 'Case_Study' | 'Remediation' | 'Evaluation' | string;

export interface ContentNode {
  id: string;
  type: NodeType;
  title: string;
  unlockDecisionTree: DecisionTreeNode | null;
  children: ContentNode[];
   metadata?: {
    content?: string;
    questions?: any[];
    requiredScore?: number;
    [key: string]: any;
  };
}

export class Course implements ContentNode {
  id: string;
  type: NodeType = 'Course';
  title: string;
  unlockDecisionTree: null = null;
  children: Module[] = [];

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}

export class Module implements ContentNode {
  id: string;
  type: NodeType = 'Module';
  title: string;
  unlockDecisionTree: DecisionTreeNode | null;
  children: ContentNode[] = [];
  
  constructor(id: string, title: string, unlockDecisionTree: DecisionTreeNode | null = null) {
    this.id = id;
    this.title = title;
    this.unlockDecisionTree = unlockDecisionTree;
  }
}