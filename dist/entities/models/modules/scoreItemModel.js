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
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.scoreItemMastRepository.addScoreItem(this.mast);
    }
}
exports.ScoreItemModel = ScoreItemModel;
