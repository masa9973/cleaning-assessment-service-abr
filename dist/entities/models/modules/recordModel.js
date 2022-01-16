"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordModel = void 0;
const util_1 = require("../../../util");
const _baseModel_1 = require("./_baseModel");
class RecordModel extends _baseModel_1.BaseModel {
    static getBlanc(cleanerID, room, startAt, finishedAt) {
        return {
            recordID: util_1.generateUUID(),
            cleanerID,
            createdAt: new Date().getTime(),
            room,
            startAt,
            finishedAt,
        };
    }
    // ============================================
    // getters
    // ============================================
    get recordID() {
        return this.mast.recordID;
    }
    get cleanerID() {
        return this.mast.cleanerID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    // ============================================
    // getter / setter
    // ============================================
    get room() {
        return this.mast.room;
    }
    set room(input) {
        this.mast.room = input;
    }
    get startAt() {
        return this.mast.startAt;
    }
    set startAt(input) {
        this.mast.startAt = input;
    }
    get finishedAt() {
        return this.mast.startAt;
    }
    set finishedAt(input) {
        this.mast.finishedAt = input;
    }
    get ifScored() {
        return this.mast.ifScored || false;
    }
    set ifScored(input) {
        this.mast.ifScored = input;
    }
    /* 清掃記録の登録を行う */
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.recordMastRepository.addRecord(this.mast);
    }
    /* 評価の取得を行う */
    async fetchScoresByRecordID(recordID) {
        const res = await this.repositoryContainer.scoreMastRepository.fetchScoresByRecordID(recordID);
        return res.map((item) => this.modelFactory.ScoreModel(item));
    }
}
exports.RecordModel = RecordModel;
