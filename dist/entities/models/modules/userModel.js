"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const __1 = require("../..");
const __2 = require("../../..");
const _baseModel_1 = require("./_baseModel");
class UserModel extends _baseModel_1.BaseModel {
    // ============================================
    // getters
    // ============================================
    get userID() {
        return this.mast.userID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    get updatedAt() {
        return this.mast.updatedAt;
    }
    get userIcon() {
        if (this.mast.userIcon) {
            return this.mast.userIcon.url;
        }
        else {
            return this.repositoryContainer.s3Repository.getSampleImage().url;
        }
    }
    // ============================================
    // getter / setter
    // ============================================
    get name() {
        return this.mast.name;
    }
    set name(input) {
        this.mast.name = input;
    }
    get email() {
        return this.mast.email;
    }
    set email(input) {
        this.mast.email = input;
    }
    get role() {
        return this.mast.role;
    }
    set role(input) {
        this.mast.role = input;
    }
    get userHotelID() {
        return this.mast.userHotelID;
    }
    set userHotelID(input) {
        this.mast.userHotelID = input;
    }
    // ============================================
    // validation
    // ============================================
    get isRegisterble() {
        return true;
    }
    // ============================================
    // functions
    // ============================================
    /**
     * アイコン画像をセットする
     * @param file
     */
    async setIcon(file) {
        const path = `user/${this.userID}/iconImage/${new Date().getTime()}`;
        this.mast.userIcon = await this.repositoryContainer.s3Repository.addFile(path, file);
    }
    /**
     * ユーザー情報を新規登録、または更新する
     */
    async register() {
        if (this.isRegisterble) {
            const now = new Date().getTime();
            if (this.isNew) {
                this.mast.createdAt = now;
                this.mast.updatedAt = now;
                await this.repositoryContainer.userMastRepository.addUserMast(this.mast);
            }
            else {
                this.mast.updatedAt = now;
                await this.repositoryContainer.userMastRepository.updateUserMast(this.mast);
            }
            this.isNew = false;
        }
    }
    // このユーザーと同じ所属の部屋を取得する
    async fetchSameHotelRooms() {
        const res = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(this.userHotelID);
        return res.map((item) => this.modelFactory.RoomModel(item)).sort((a, b) => __2.compareNumDesc(a.createdAt, b.createdAt));
    }
    // 今日まだアサインしてない部屋を取得する
    async fetchYetAssignRoom() {
        // 全部の部屋ID配列
        const allRoom = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(this.userHotelID);
        const res = allRoom.sort((a, b) => __2.compareNumDesc(a.createdAt, b.createdAt));
        const allRoomID = [];
        for (let i = 0; i < res.length; i++) {
            allRoomID[i] = res[i].roomID;
        }
        if (res.length === 0) {
            throw new __2.ChillnnTrainingError(__1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        // 今日アサインした部屋ID配列
        const assignRecords = await this.fetchTodayAssignRecords();
        const assignRoomID = [];
        for (let i = 0; i < assignRecords.length; i++) {
            assignRoomID[i] = assignRecords[i].cleaningRoomID;
        }
        // ここで差分を抜き出す
        const yetAssignRoomID = allRoomID.filter(i => assignRoomID.indexOf(i) == -1);
        return yetAssignRoomID;
    }
    // 自分と同じ所属のcleanerを取得する
    async fetchSameHotelCleaner() {
        const res = await this.repositoryContainer.userMastRepository.fetchAllUserByHotelID(this.userHotelID);
        const cleaners = res.filter((user) => user.role === 'cleaner');
        return cleaners.map((item) => this.modelFactory.UserModel(item)).sort((a, b) => __2.compareNumDesc(a.createdAt, b.createdAt));
    }
    // 自分と同じ所属のscoreItemを取得する
    async fetchSameHotelScoreItems() {
        const res = await this.repositoryContainer.scoreItemMastRepository.fetchScoreItemsByHotelID(this.userHotelID);
        return res.map((item) => this.modelFactory.ScoreItemModel(item)).sort((a, b) => __2.compareNumDesc(a.createdAt, b.createdAt));
    }
    // 自分のレコードを取得する
    async fetchRecords() {
        const records = await this.repositoryContainer.recordMastRepository.fetchRecordsByCleanerID(this.userID);
        return records.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => __2.compareNumDesc(a.createdAt, b.createdAt));
    }
    // 今日アサイン済みのレコードを取得する
    async fetchTodayAssignRecords() {
        const today = __2.timeStampToDateString(new Date().getTime());
        const records = await this.repositoryContainer.recordMastRepository.fetchRecordsByDate(this.userHotelID, today);
        const filteredRecords = records.filter((item) => item.cleaningTime === 0);
        return filteredRecords.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => __2.compareNumDesc(a.createdAt, b.createdAt));
    }
    // このユーザーの未評価のレコードを取得する
    async fetchUnscoredRecords() {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(this.userHotelID);
        const filteredRecords = records.filter((record) => !record.ifScored && !!record.cleaningTime);
        return filteredRecords.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => __2.compareNumDesc(a.createdAt, b.createdAt));
    }
    // このユーザーの評価済みレコードを取得する
    async fetchScoredRecords() {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(this.userHotelID);
        const filteredRecords = records.filter((record) => record.ifScored === true);
        return filteredRecords.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => __2.compareNumDesc(a.createdAt, b.createdAt));
    }
    // roomID入れたらこのユーザーのroomIDの清掃時間の配列を返す
    async roomIDToTimeArray(roomID) {
        const records = await this.fetchScoredRecords();
        // record.ifScored === true && record.roomID === roomID でいい？
        const roomRecords = records.filter((record) => record.cleaningRoomID === roomID);
        const cleaningTimeResults = [];
        for (let i = 0; i < roomRecords.length; i++) {
            cleaningTimeResults[i] = roomRecords[i].cleaningTime;
        }
        if (cleaningTimeResults.length === 0) {
            throw new __2.ChillnnTrainingError(__1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return cleaningTimeResults;
    }
    // 多分いらないやつ
    // いらん気がする、このユーザーのレコードの配列を入れたら平均時間を返す関数（途中）
    async recordsToAverageTime(records) {
        const userRecords = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(this.userHotelID);
        const filteredRecords = userRecords.filter((record) => record.ifScored === true);
        const timeResults = [];
        for (let i = 0; i < records.length; i++) {
            timeResults[i] = records;
        }
    }
    // アサイン済みのレコードを取得する
    async fetchAssignedRecords() {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(this.userHotelID);
        const filteredRecords = records.filter((item) => item.cleaningTime === 0);
        return filteredRecords.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => __2.compareNumDesc(a.createdAt, b.createdAt));
    }
}
exports.UserModel = UserModel;
