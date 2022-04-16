"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanerUsecase = void 0;
const entities_1 = require("../../entities");
const models_1 = require("../../entities/models");
const recordModel_1 = require("../../entities/models/modules/recordModel");
const scoreItemModel_1 = require("../../entities/models/modules/scoreItemModel");
const util_1 = require("../../util");
class CleanerUsecase {
    constructor(repositoryContainer, modelFactory) {
        this.repositoryContainer = repositoryContainer;
        this.modelFactory = modelFactory;
    }
    // =======================
    // user
    // =======================
    async fetchMyUserModel() {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            // 存在しない場合
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(me);
    }
    // いる
    async fetchUserModelByUserID(userID) {
        const user = await this.repositoryContainer.userMastRepository.fetchUserMastByUserID(userID);
        if (!user) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(user);
    }
    // =======================
    // record
    // =======================
    async createNewRecord() {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        else {
            const recordHotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof recordHotelID === 'string') {
                return this.modelFactory.RecordModel(recordModel_1.RecordModel.getBlanc('', '', 0, 0, 0, recordHotelID), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
    /**
     * 清掃時間の登録に使う（クリ）
     * @param recordID
     * @returns
     */
    async fetchRecordByRecordID(recordID) {
        const record = await this.repositoryContainer.recordMastRepository.fetchRecordByRecordID(recordID);
        if (!record) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.RecordModel(record);
    }
    // =======================
    // room
    // =======================
    async createNewRoom(roomName) {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        else {
            const hotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof hotelID === 'string') {
                return this.modelFactory.RoomModel(models_1.RoomModel.getBlanc(roomName, hotelID), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
    /**
     * 部屋の名前を出すのに使う（マネ、クリ）
     * @param roomID
     * @returns
     */
    async fetchRoomByRoomID(roomID) {
        const room = await this.repositoryContainer.roomMastRepository.fetchRoomByRoomID(roomID);
        if (!room) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.RoomModel(room);
    }
    // =======================
    // score
    // =======================
    // =======================
    // scoreItem
    // =======================
    async createNewScoreItem(scoreItemName) {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        else {
            const hotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof hotelID === 'string') {
                return this.modelFactory.ScoreItemModel(scoreItemModel_1.ScoreItemModel.getBlanc(scoreItemName, hotelID), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
    /**
     * レコードのスコアを表示するのに使う（マネ、クリ）
     * @param scoreItemID
     * @returns
     */
    async fetchScoreItemByScoreItemID(scoreItemID) {
        const scoreItem = await this.repositoryContainer.scoreItemMastRepository.fetchScoreItemByScoreItemID(scoreItemID);
        return this.modelFactory.ScoreItemModel(scoreItem);
    }
    // レコードの文字列平均時間を返す関数
    // いる
    recordsToAverageStringTime(records) {
        const scoredRecords = records.filter((record) => record.ifScored === true);
        const timeResults = [];
        for (let i = 0; i < scoredRecords.length; i++) {
            timeResults[i] = scoredRecords[i].cleaningTime;
        }
        if (timeResults.length === 0) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        const averageResultTime = timeResults.reduce((a, b) => a + b) / timeResults.length;
        return util_1.millisecondToStringTime(averageResultTime);
    }
    // レコードを入れたらその清掃時間の配列を返す関数（グラフ用）
    recordsToTimeArray(records) {
        const scoredRecords = records.filter((item) => item.ifScored === true);
        const timeResults = [];
        for (let i = 0; i < scoredRecords.length; i++) {
            timeResults[i] = scoredRecords[i].cleaningTime;
        }
        if (timeResults.length === 0) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return timeResults;
    }
}
exports.CleanerUsecase = CleanerUsecase;
