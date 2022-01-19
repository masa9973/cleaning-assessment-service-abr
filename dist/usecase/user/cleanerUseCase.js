"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanerUsecase = void 0;
const entities_1 = require("../../entities");
const recordModel_1 = require("../../entities/models/modules/recordModel");
const util_1 = require("../../util");
class CleanerUsecase {
    constructor(repositoryContainer, modelFactory) {
        this.repositoryContainer = repositoryContainer;
        this.modelFactory = modelFactory;
    }
    async fetchMyUserModel() {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            // 存在しない場合
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(me);
    }
    async fetchUserModelByUserID(userID) {
        const user = await this.repositoryContainer.userMastRepository.fetchUserMastByUserID(userID);
        if (!user) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(user);
    }
    async fetchAllUserByHotelID(hotelID) {
        const users = await this.repositoryContainer.userMastRepository.fetchAllUserByHotelID(hotelID);
        return users.map((user) => this.modelFactory.UserModel(user)).sort((a, b) => util_1.compareNumDesc(a.createdAt, b.createdAt));
    }
    // 新しいレコードを作成
    async createNewRecord() {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        else {
            const userID = this.modelFactory.UserModel(me).userID;
            return this.modelFactory.RecordModel(recordModel_1.RecordModel.getBlanc(userID, '', 0, 0, 0), {
                isNew: true,
            });
        }
    }
    // 全レコードを取得
    async fetchAllRecordsByHotelID(hotelID) {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(hotelID);
        return records.map((record) => this.modelFactory.RecordModel(record)).sort((a, b) => util_1.compareNumDesc(a.createdAt, b.createdAt));
    }
    // 任意のユーザーのレコードを取得
    async fetchRecordsByCleanerID(userID) {
        const records = await this.repositoryContainer.recordMastRepository.fetchRecordsByCleanerID(userID);
        return records.map((item) => this.modelFactory.RecordModel(item));
    }
}
exports.CleanerUsecase = CleanerUsecase;
