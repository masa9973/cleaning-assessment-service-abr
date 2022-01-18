import { IRecordMastRepository } from '../..';
import { RecordMast } from '../../entities';
export declare class RecordMastRepositoryCacheAdaptor implements IRecordMastRepository {
    private repository;
    private userCache;
    private recordCache;
    private recordAllCache;
    constructor(repository: IRecordMastRepository);
    addRecord(input: RecordMast): Promise<RecordMast>;
    updateRecordMast(input: RecordMast): Promise<RecordMast>;
    fetchRecordsByCleanerID(userID: string): Promise<RecordMast[]>;
    fetchRecordsByRoomID(cleaningRoomID: string): Promise<RecordMast[]>;
    fetchAllRecords(): Promise<RecordMast[]>;
    private addCacheEach;
    private addCacheBulk;
    private updateCacheEach;
    private updateCacheBulk;
    private fetchRecords;
    private fetchCacheRecordsAll;
}
