import { RecordModel } from '..';
import { ErrorCode, Scalars, UserMast } from '../..';
import { ChillnnTrainingError, compareNumDesc, timeStampToDateString } from '../../..';
import { BaseModel } from './_baseModel';

export class UserModel extends BaseModel<UserMast> {
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
        } else {
            return this.repositoryContainer.s3Repository.getSampleImage().url;
        }
    }
    // ============================================
    // getter / setter
    // ============================================
    get name() {
        return this.mast.name;
    }
    set name(input: string) {
        this.mast.name = input;
    }
    get email() {
        return this.mast.email;
    }
    set email(input: string) {
        this.mast.email = input;
    }
    get role() {
        return this.mast.role;
    }
    set role(input: string) {
        this.mast.role = input;
    }
    get userHotelID() {
        return this.mast.userHotelID;
    }
    set userHotelID(input: string) {
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
    async setIcon(file: File) {
        const path = `user/${this.userID}/iconImage/${new Date().getTime()}`;
        this.mast.userIcon = await this.repositoryContainer.s3Repository.addFile(path, file);
    }

    // ユーザーの特定の部屋の1ヶ月分の清掃記録を取得する
    async fetchUserMonthRecordsByRoomID(roomID: Scalars['ID']): Promise<RecordModel[]> {
        const to = new Date().getTime()
        const toTime = `${to}`
        const fromTime = `${to - 2592000000}`
        const res = await this.repositoryContainer.recordMastRepository.fetchTermRecordsByCleanerIDAndRoomID(this.userID, roomID, fromTime, toTime)
        return res.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    // 自分と同じ所属のcleanerを取得する
    async fetchSameHotelCleaner() {
        const res = await this.repositoryContainer.userMastRepository.fetchAllUserByHotelID(this.userHotelID);
        const cleaners = res.filter((user) => user.role === 'cleaner');
        return cleaners.map((item) => this.modelFactory.UserModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    // 自分と同じ所属のscoreItemを取得する
    async fetchSameHotelScoreItems() {
        const res = await this.repositoryContainer.scoreItemMastRepository.fetchScoreItemsByHotelID(this.userHotelID);
        return res.map((item) => this.modelFactory.ScoreItemModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    // 自分のレコードを取得する
    async fetchRecords(): Promise<RecordModel[]> {
        const records = await this.repositoryContainer.recordMastRepository.fetchRecordsByCleanerID(this.userID);
        return records.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    
    // このユーザーの未評価のレコードを取得する
    async fetchUnscoredRecords(): Promise<RecordModel[]> {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(this.userHotelID);
        const filteredRecords = records.filter((record) => !record.ifScored && !!record.cleaningTime);
        return filteredRecords.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }
    
    // このユーザーの評価済みレコードを取得する
    async fetchScoredRecords(): Promise<RecordModel[]> {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(this.userHotelID);
        const filteredRecords = records.filter((record) => record.ifScored === true);
        return filteredRecords.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }
    
    // roomID入れたらこのユーザーのroomIDの清掃時間の配列を返す
    async roomIDToTimeArray(roomID: Scalars['ID']) {
        const records = await this.fetchScoredRecords();
        // record.ifScored === true && record.roomID === roomID でいい？
        const roomRecords = records.filter((record) => record.cleaningRoomID === roomID);
        const cleaningTimeResults = [];
        for (let i = 0; i < roomRecords.length; i++) {
            cleaningTimeResults[i] = roomRecords[i].cleaningTime;
        }
        if (cleaningTimeResults.length === 0) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return cleaningTimeResults;
    }
}