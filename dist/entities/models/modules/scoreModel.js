"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreModel = void 0;
const util_1 = require("../../../util");
const _baseModel_1 = require("./_baseModel");
class ScoreModel extends _baseModel_1.BaseModel {
    static getBlanc(recordID, scorerUserID, score, scoreItemID) {
        return {
            recordID,
            scoreID: util_1.generateUUID(),
            scorerUserID,
            createdAt: new Date().getTime(),
            score,
            scoreItemID,
        };
    }
    // ============================================
    // getter
    // ============================================
    get recordID() {
        return this.mast.recordID;
    }
    get scoreID() {
        return this.mast.scoreID;
    }
    get scorerUserID() {
        return this.mast.scorerUserID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    // ============================================
    // getters / setters
    // ============================================
    get score() {
        return this.mast.score;
    }
    set score(input) {
        this.mast.score = input;
    }
    get scoreItemID() {
        return this.mast.scoreItemID;
    }
    set scoreItemID(input) {
        this.mast.scoreItemID = input;
    }
    /* 清掃スコアの登録を行う */
    async register() {
        if (this.isNew) {
            this.mast.createdAt = new Date().getTime();
            this.mast = await this.repositoryContainer.scoreMastRepository.addScore(this.mast);
        }
        else {
            await this.repositoryContainer.scoreMastRepository.updateScore(this.mast);
        }
        this.isNew = false;
    }
}
exports.ScoreModel = ScoreModel;
