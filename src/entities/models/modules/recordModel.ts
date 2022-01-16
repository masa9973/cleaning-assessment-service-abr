import { RecordMast, Scalars } from '../..';
import { generateUUID } from '../../../util';
import { ScoreModel } from './scoreModel';
import { BaseModel } from './_baseModel';

export class RecordModel extends BaseModel<RecordMast> {
    static getBlanc(cleanerID: Scalars['ID'], room: Scalars['String'], startAt: Scalars['AWSTimestamp'], finishedAt: Scalars['AWSTimestamp']): RecordMast {
        return {
            recordID: generateUUID(),
            cleanerID,
            createdAt: new Date().getTime(),
            room,
            startAt,
            finishedAt,
        }
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
    set room(input: string) {
        this.mast.room = input;
    }
    get startAt() {
        return this.mast.startAt;
    }
    set startAt(input: number) {
        this.mast.startAt = input;
    }
    get finishedAt() {
        return this.mast.startAt;
    }
    set finishedAt(input: number) {
        this.mast.finishedAt = input;
    }
    /* 清掃記録の登録を行う */
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.recordMastRepository.addRecord(this.mast);
    }

    /* 評価の取得を行う */
    async fetchScoresByRecordID(recordID: Scalars['ID']): Promise<ScoreModel[]> {
        const res = await this.repositoryContainer.scoreMastRepository.fetchScoresByRecordID(recordID);
        return res.map((item) => this.modelFactory.ScoreModel(item));
    }
       
}