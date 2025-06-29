"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionTreeNode = void 0;
class DecisionTreeNode {
    condition;
    left;
    right;
    lessonId;
    constructor(options) {
        this.condition = options.condition;
        this.left = options.left;
        this.right = options.right;
        this.lessonId = options.lessonId;
    }
    evaluate(context) {
        if (this.lessonId !== undefined)
            return this.lessonId;
        if (!this.condition || !this.left || !this.right)
            return null;
        return this.condition.evaluate(context)
            ? this.right.evaluate(context)
            : this.left.evaluate(context);
    }
}
exports.DecisionTreeNode = DecisionTreeNode;
//# sourceMappingURL=decision-tree-node.js.map