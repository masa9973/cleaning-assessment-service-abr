import { BaseCacheAdaptor } from '..';
import { IRecordMastRepository } from '../..';
import { RecordMast } from '../../entities';
export declare class RecordMastRepositoryCacheAdaptor extends BaseCacheAdaptor implements IRecordMastRepository {
    private repository;
    constructor(repository: IRecordMastRepository);
    private hotelIDCaches;
    private hotelIDRecordDateCaches;
    private cleanerIDCaches;
    private recordIDCache;
    private cleanerIDRoomIDCache;
    cacheClear(): void;
    addRecord(input: RecordMast): Promise<RecordMast>;
    updateRecord(input: RecordMast): Promise<RecordMast>;
    fetchAllRecordsByHotelID(recordHotelID: string): Promise<RecordMast[]>;
    fetchRecordsByDate(recordHotelID: string, recordDate: string): Promise<RecordMast[]>;
    fetchRecordByRecordID(recordID: string): Promise<RecordMast | null>;
    /**
     * ここ時間ある時実装しよう
     * @param cleanerID
     * @param cleaningRoomID
     * @param from
     * @param to
     * @returns
     */
    fetchTermRecordsByCleanerIDAndRoomID(cleanerID: string, cleaningRoomID: string, from: string, to: string): Promise<RecordMast[]>;
    private addHotelIDCaches;
    private addHotelIDCache;
    private addHotelIDRecordDateCache;
    private addHotelIDRecordDateCaches;
    private addRecordIDCache;
}
