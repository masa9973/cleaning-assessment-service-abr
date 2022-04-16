"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreItemModel = void 0;
const __1 = require("..");
const __2 = require("../..");
const __3 = require("../../..");
const _baseModel_1 = require("./_baseModel");
class ScoreItemModel extends _baseModel_1.BaseModel {
    static getBlanc(scoreItemName, scoreItemHotelID) {
        return {
            scoreItemID: __3.generateUUID(),
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
    // グラフ描画に使う（マネ、クリ）
    async fetchUserMonthScoresByRoomID(userID, roomID) {
        const to = new Date().getTime();
        const toTime = `${to}`;
        const fromTime = `${to - 2592000000}`;
        const res = await this.repositoryContainer.scoreMastRepository.fetchTermScoresByCleanerIDAndRoomID(userID, roomID, fromTime, toTime);
        return res.map((item) => this.modelFactory.ScoreModel(item)).sort((a, b) => __3.compareNumDesc(a.createdAt, b.createdAt));
    }
    // レコードIDを入れてスコアを作成する
    // ここスコア作れたら良くない？
    async createNewScore(recordID) {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new __3.ChillnnTrainingError(__2.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        const userID = this.modelFactory.UserModel(me).userID;
        return this.modelFactory.ScoreModel(__1.ScoreModel.getBlanc(recordID, userID, 0, this.scoreItemID, '', ''), {
            isNew: true,
        });
    }
}
exports.ScoreItemModel = ScoreItemModel;
