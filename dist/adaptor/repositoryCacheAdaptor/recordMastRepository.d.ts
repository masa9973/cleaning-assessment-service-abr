import { BaseCacheAdaptor } from '..';
import { IRecordMastRepository } from '../..';
import { RecordMast } from '../../entities';
export declare class RecordMastRepositoryCacheAdaptor extends BaseCacheAdaptor implements IRecordMastRepository {
    private hotelIDCache;
    private cleanerIDCache;
    private roomIDCache;
    private recordIDCache;
    private cleanerIDRoomIDCache;
    cacheClear(): void;
    addRecord(input: RecordMast): Promise<RecordMast>;
    updateRecord(input: RecordMast): Promise<RecordMast>;
    fetchRecordsByCleanerID(cleanerID: string): Promise<RecordMast[]>;
    fetchRecordsByRoomID(cleaningRoomID: string): Promise<RecordMast[]>;
    fetchAllRecordsByHotelID(recordHotelID: string): Promise<RecordMast[]>;
    fetchRecordsByDate(recordHotelID: string, recordDate: string): Promise<RecordMast[]>;
    fetchRecordByRecordID(recordID: string): Promise<RecordMast | null>;
    fetchTermRecordsByCleanerIDAndRoomID(cleanerID: string, cleaningRoomID: string, from: string, to: string): Promise<RecordMast[]>;
    private addCache;
}
