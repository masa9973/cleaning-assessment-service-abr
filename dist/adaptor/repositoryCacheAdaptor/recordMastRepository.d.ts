import { IRecordMastRepository } from '../..';
import { RecordMast } from '../../entities';
export declare class RecordMastRepositoryCacheAdaptor implements IRecordMastRepository {
    private repository;
    private userCache;
    private recordCache;
    constructor(repository: IRecordMastRepository);
    addRecord(input: RecordMast): Promise<RecordMast>;
    fetchRecordsByCleanerID(userID: string): Promise<RecordMast[]>;
    private addCacheEach;
    private addCacheBulk;
    private fetchRecord;
    private fetchRecords;
}
