import { Scalars, RecordMast } from '../../type';
export interface IRecordMastRepository {
    addRecord(input: RecordMast): Promise<RecordMast>;
    updateRecordMast(input: RecordMast): Promise<RecordMast>;
    fetchRecordsByCleanerID(cleanerID: Scalars['ID']): Promise<RecordMast[]>;
    fetchRecordsByRoomID(cleaningRoomID: Scalars['ID']): Promise<RecordMast[]>;
    fetchAllRecordsByHotelID(recordHotelID: Scalars['ID']): Promise<RecordMast[]>;
}
