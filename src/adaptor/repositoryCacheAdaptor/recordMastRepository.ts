import { compareNumDesc, IRecordMastRepository } from '../..';
import { RecordMast, Scalars } from '../../entities';

type UserCache = {
    [userID: string]:
        | {
              [recordID: string]: RecordMast;
          }
        | undefined;
};
type RecordCache = {
    [recordID: string]: RecordMast | 'blanc' | undefined;
};

export class RecordMastRepositoryCacheAdaptor implements IRecordMastRepository {
    private userCache: UserCache = {};
    private recordCache: RecordCache = {};
    private recordAllCache: RecordCache | null = null;

    constructor(private repository: IRecordMastRepository) {}

    async addRecord(input: RecordMast): Promise<RecordMast> {
        const res = await this.repository.addRecord(input);
        this.addCacheEach(res.recordID, res);
        return res;
    }

    async updateRecordMast(input: RecordMast): Promise<RecordMast> {
        const res = await this.repository.updateRecordMast(input);
        this.updateCacheEach(res.recordID, res);
        return res;
    }

    async fetchRecordsByCleanerID(userID: string): Promise<RecordMast[]> {
        const cache = this.fetchRecords(userID);
        if (cache) return cache;
        const res = await this.repository.fetchRecordsByCleanerID(userID);
        this.addCacheBulk(userID, res);
        return res.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    async fetchAllRecords(): Promise<RecordMast[]> {
        const cache = this.fetchCacheRecordsAll();
        if (cache) return cache;
        const res = await this.repository.fetchAllRecords();
        this.updateCacheBulk(res);
        return res;
    }

    // ===============================================================
    //
    // private
    //
    // ===============================================================

    private addCacheEach(recordID: Scalars['ID'], record: RecordMast | null) {
        this.recordCache[recordID] = record || 'blanc';
        if (!record) return;
        const userCache = this.userCache[record.cleanerID];
        if (userCache) {
            userCache[recordID] = record;
        }
    }

    private addCacheBulk(userID: Scalars['ID'], records: RecordMast[]) {
        this.userCache[userID] = {};
        for (const record of records) {
            this.addCacheEach(record.recordID, record);
        }
    }

    private updateCacheEach(recordID: Scalars['ID'], record: RecordMast | null) {
        this.recordCache[recordID] = record || 'blanc';
        if (this.recordAllCache && record ) {
            this.recordAllCache[recordID] = record;
        }
    } 

    private updateCacheBulk(records: RecordMast[]) {
        this.recordAllCache = {};
        for (const record of records) {
            this.updateCacheEach(record.recordID, record);
        }
    }

    // ここの仕組みあんまよくわかってない
    private fetchRecords(userID: Scalars['ID']) {
        const userCache = this.userCache[userID];
        if (!userCache) return null;
        return Object.keys(userCache)
            .map((key) => {
                return userCache[key];
            })
            // .filter((item) => !item.deletedAt)
            .sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    private fetchCacheRecordsAll() {
        if (!this.recordAllCache) return null;
        return Object.keys(this.recordAllCache)
        .map((key) => {
            return this.recordAllCache![key]! as RecordMast;
        })
        .sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }
}