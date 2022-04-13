import { BaseCacheAdaptor } from '..';
import { IRecordMastRepository } from '../..';
import { RecordMast } from '../../entities';

export class RecordMastRepositoryCacheAdaptor extends BaseCacheAdaptor implements IRecordMastRepository {
    cacheClear(): void {
        throw new Error('Method not implemented.');
    }
    addRecord(input: RecordMast): Promise<RecordMast> {
        throw new Error('Method not implemented.');
    }
    updateRecord(input: RecordMast): Promise<RecordMast> {
        throw new Error('Method not implemented.');
    }
    fetchRecordsByCleanerID(cleanerID: string): Promise<RecordMast[]> {
        throw new Error('Method not implemented.');
    }
    fetchRecordsByRoomID(cleaningRoomID: string): Promise<RecordMast[]> {
        throw new Error('Method not implemented.');
    }
    fetchAllRecordsByHotelID(recordHotelID: string): Promise<RecordMast[]> {
        throw new Error('Method not implemented.');
    }
    fetchRecordsByDate(recordHotelID: string, recordDate: string): Promise<RecordMast[]> {
        throw new Error('Method not implemented.');
    }
    fetchRecordByRecordID(recordID: string): Promise<RecordMast | null> {
        throw new Error('Method not implemented.');
    }
    fetchTermRecordsByCleanerIDAndRoomID(cleanerID: string, cleaningRoomID: string, from: string, to: string): Promise<RecordMast[]> {
        throw new Error('Method not implemented.');
    }

}