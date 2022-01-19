"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordModel = void 0;
const util_1 = require("../../../util");
const _baseModel_1 = require("./_baseModel");
class RecordModel extends _baseModel_1.BaseModel {
    static getBlanc(cleanerID, cleaningRoomID, startAt, finishedAt, cleaningTime, hotelID) {
        return {
            recordID: util_1.generateUUID(),
            cleanerID,
            createdAt: new Date().getTime(),
            cleaningRoomID,
            startAt,
            finishedAt,
            ifScored: false,
            cleaningTime,
            hotelID,
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
    get cleaningRoomID() {
        return this.mast.cleaningRoomID;
    }
    set cleaningRoomID(input) {
        this.mast.cleaningRoomID = input;
    }
    get startAt() {
        return this.mast.startAt;
    }
    set startAt(input) {
        this.mast.startAt = input;
    }
    get finishedAt() {
        return this.mast.finishedAt;
    }
    set finishedAt(input) {
        this.mast.finishedAt = input;
    }
    get ifScored() {
        return this.mast.ifScored;
    }
    set ifScored(input) {
        this.mast.ifScored = input;
    }
    get cleaningTime() {
        return this.mast.cleaningTime;
    }
    set cleaningTime(input) {
        this.mast.cleaningTime = input;
    }
    /* 清掃記録の登録を行う */
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast.ifScored = false;
        this.mast.cleaningTime = this.mast.finishedAt - this.mast.startAt;
        this.mast = await this.repositoryContainer.recordMastRepository.addRecord(this.mast);
    }
    /* 評価の取得を行う */
    async fetchScoresByRecordID(recordID) {
        const res = await this.repositoryContainer.scoreMastRepository.fetchScoresByRecordID(recordID);
        return res.map((item) => this.modelFactory.ScoreModel(item));
    }
    // 評価したらifScoredの値を変更する
    async switchIfScored() {
        this.mast.ifScored = true;
        this.mast = await this.repositoryContainer.recordMastRepository.updateRecordMast(this.mast);
    }
}
exports.RecordModel = RecordModel;
