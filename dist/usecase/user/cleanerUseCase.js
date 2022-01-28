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
    // 多分なくていける
    async fetchAllUserByHotelID(userHotelID) {
        const users = await this.repositoryContainer.userMastRepository.fetchAllUserByHotelID(userHotelID);
        return users.map((user) => this.modelFactory.UserModel(user)).sort((a, b) => util_1.compareNumDesc(a.createdAt, b.createdAt));
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
            if (typeof recordHotelID === "string") {
                return this.modelFactory.RecordModel(recordModel_1.RecordModel.getBlanc('', '', 0, 0, 0, recordHotelID), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
    async fetchAllRecordsByHotelID(recordHotelID) {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(recordHotelID);
        return records.map((record) => this.modelFactory.RecordModel(record)).sort((a, b) => util_1.compareNumDesc(a.createdAt, b.createdAt));
    }
    // いらない
    async fetchRecordsByCleanerID(userID) {
        const records = await this.repositoryContainer.recordMastRepository.fetchRecordsByCleanerID(userID);
        return records.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => util_1.compareNumDesc(a.createdAt, b.createdAt));
    }
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
            if (typeof hotelID === "string") {
                return this.modelFactory.RoomModel(models_1.RoomModel.getBlanc(roomName, hotelID), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
    // いらない、施設に紐づく部屋を取得する
    async fetchRoomsByHotelID(roomHotelID) {
        const res = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(roomHotelID);
        return res.map((item) => this.modelFactory.RoomModel(item)).sort((a, b) => util_1.compareNumDesc(a.createdAt, b.createdAt));
    }
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
    // いらない
    async fetchScoresByRecordID(recordID) {
        const res = await this.repositoryContainer.scoreMastRepository.fetchScoresByRecordID(recordID);
        return res.map((item) => this.modelFactory.ScoreModel(item)).sort((a, b) => util_1.compareNumDesc(a.createdAt, b.createdAt));
    }
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
            if (typeof hotelID === "string") {
                return this.modelFactory.ScoreItemModel(scoreItemModel_1.ScoreItemModel.getBlanc(scoreItemName, hotelID), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
    // いらない
    async fetchScoreItemsByHotelID(scoreItemHotelID) {
        const res = await this.repositoryContainer.scoreItemMastRepository.fetchScoreItemsByHotelID(scoreItemHotelID);
        return res.map((item) => this.modelFactory.ScoreItemModel(item));
    }
    // いる
    async fetchScoreItemByScoreItemID(scoreItemID) {
        const scoreItem = await this.repositoryContainer.scoreItemMastRepository.fetchScoreItemByScoreItemID(scoreItemID);
        return this.modelFactory.ScoreItemModel(scoreItem);
    }
    // =======================
    // hotel
    // =======================
    // いらない、hotelを登録
    async createNewHotel(hotelName) {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        else {
            const hotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof hotelID === "string") {
                return this.modelFactory.HotelModel(models_1.HotelModel.getBlanc(hotelID, hotelName), {
                    isNew: true,
                });
            }
            else {
                throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
    // レコードの文字列平均時間を返す関数
    recordsToAvarageStringTime(records) {
        const scoredRecords = records.filter((record) => record.ifScored === true);
        // ここいらんかも
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
    // 項目を入れたらそのユーザーの特定の項目の平均スコアを返す関数
    async scoreItemIDToAvarageScore(userID, scoreItemID) {
        // ここでレコードIDで一意に特定したい
        const user = await this.fetchUserModelByUserID(userID);
        const scoredRecords = await user.fetchScoredRecords();
        scoredRecords.map((item) => item.fetchScores());
        const scoredRecordIDs = [];
        // このIDのスコアが一括で欲しい
        for (let i = 0; i < scoredRecords.length; i++) {
            scoredRecordIDs[i] = scoredRecords[i].recordID;
        }
        const scoresFromID = [];
        for (let i = 0; i < scoredRecordIDs.length; i++) {
            scoresFromID[i] = await this.fetchScoresByRecordID(scoredRecordIDs[i]);
        }
        const scores = scoresFromID.reduce((a, b) => [...a, ...b], []);
        // scores=このユーザーのスコアの一次元配列
        // 受け取ったIDでフィルターをかける
        const selectedItemScores = scores.filter((score) => score.scoreItemID === scoreItemID);
        const selectedScoresValues = [];
        for (let i = 0; i < selectedItemScores.length; i++) {
            selectedScoresValues[i] = selectedItemScores[i].score;
        }
        if (selectedScoresValues.length === 0) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return selectedScoresValues.reduce((a, b) => a + b) /
            selectedScoresValues.length;
    }
}
exports.CleanerUsecase = CleanerUsecase;
