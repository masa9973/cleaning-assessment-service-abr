"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreItemModel = void 0;
const __1 = require("../../..");
const _baseModel_1 = require("./_baseModel");
class ScoreItemModel extends _baseModel_1.BaseModel {
    static getBlanc(scoreItemName, scoreItemHotelID) {
        return {
            scoreItemID: __1.generateUUID(),
            scoreItemName,
            createdAt: new Date().getTime(),
            scoreItemHotelID,
        };
    }
    // ============================================
    // getter / setter
    // ============================================
    get scoreItemID() {
        return this.mast.scoreItemID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    get scoreItemHotelID() {
        return this.mast.scoreItemHotelID;
    }
    set scoreItemHotelID(input) {
        this.mast.scoreItemHotelID = input;
    }
    get scoreItemName() {
        return this.mast.scoreItemName;
    }
    set scoreItemName(input) {
        this.mast.scoreItemName = input;
    }
    // 評価項目を登録する
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.scoreItemMastRepository.addScoreItem(this.mast);
    }
    // この評価項目を持つスコアを取得する（追加）
    // ここでレコードID入れたら一意に特定できる
    async fetchScores() {
        const res = await this.repositoryContainer.scoreMastRepository.fetchScoresByScoreItemID(this.scoreItemID);
        return res.map((item) => this.modelFactory.ScoreModel(item)).sort((a, b) => __1.compareNumDesc(a.createdAt, b.createdAt));
    }
}
exports.ScoreItemModel = ScoreItemModel;
