import { RecordMast, Scalars } from '../..';
import { generateUUID } from '../../../util';
import { ScoreModel } from './scoreModel';
import { BaseModel } from './_baseModel';

export class RecordModel extends BaseModel<RecordMast> {
    static getBlanc(cleanerID: Scalars['ID'], cleaningRoomID: Scalars['String'], startAt: Scalars['AWSTimestamp'], finishedAt: Scalars['AWSTimestamp'], cleaningTime: Scalars['Int'], recordHotelID: Scalars['ID']): RecordMast {
        return {
            recordID: generateUUID(),
            cleanerID,
            createdAt: new Date().getTime(),
            cleaningRoomID,
            startAt,
            finishedAt,
            ifScored: false,
            cleaningTime,
            recordHotelID,
        };
    }

    // ============================================
    // getters
    // ============================================
    get recordID() {
        return this.mast.recordID;
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
    set cleaningRoomID(input: string) {
        this.mast.cleaningRoomID = input;
    }
    get startAt() {
        return this.mast.startAt;
    }
    set startAt(input: number) {
        this.mast.startAt = input;
    }
    get finishedAt() {
        return this.mast.finishedAt;
    }
    set finishedAt(input: number) {
        this.mast.finishedAt = input;
    }
    get ifScored() {
        return this.mast.ifScored;
    }
    set ifScored(input: boolean) {
        this.mast.ifScored = input;
    }
    get cleaningTime() {
        return this.mast.cleaningTime;
    }
    set cleaningTime(input: number) {
        this.mast.cleaningTime = input;
    }
    get recordHotelID() {
        return this.mast.recordHotelID
    }
    set recordHotelID(input: string) {
        this.mast.recordHotelID = input;
    }
    get cleanerID() {
        return this.mast.cleanerID;
    }
    set cleanerID(input: string) {
        this.mast.cleanerID = input;
    }

    /* 清掃記録の登録を行う */
    async register() {
        if (this.isNew) {
            this.mast.createdAt = new Date().getTime();
            this.mast.ifScored = false;
            this.mast.cleaningTime = this.mast.finishedAt - this.mast.startAt;
            this.mast = await this.repositoryContainer.recordMastRepository.addRecord(this.mast);
        } else {
            this.mast.cleaningTime = this.mast.finishedAt - this.mast.startAt;
            await this.repositoryContainer.recordMastRepository.updateRecord(this.mast)
        }
        this.isNew = false
    }

    /* 評価の取得を行う */
    async fetchScoresByRecordID(recordID: Scalars['ID']): Promise<ScoreModel[]> {
        const res = await this.repositoryContainer.scoreMastRepository.fetchScoresByRecordID(recordID);
        return res.map((item) => this.modelFactory.ScoreModel(item));
    }

    // この清掃の評価を取得する
    async fetchScores(): Promise<ScoreModel[]> {
        const res = await this.repositoryContainer.scoreMastRepository.fetchScoresByRecordID(this.recordID);
        return res.map((item) => this.modelFactory.ScoreModel(item));
    }

    // 評価したらifScoredの値を変更する
    async switchIfScored() {
        this.mast.ifScored = true
        this.mast = await this.repositoryContainer.recordMastRepository.updateRecord(this.mast)
    }
}
