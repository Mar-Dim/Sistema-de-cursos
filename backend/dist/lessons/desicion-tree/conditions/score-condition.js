"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreCondition = void 0;
class ScoreCondition {
    minScore;
    constructor(minScore) {
        this.minScore = minScore;
    }
    evaluate(context) {
        return context.score >= this.minScore;
    }
}
exports.ScoreCondition = ScoreCondition;
//# sourceMappingURL=score-condition.js.map