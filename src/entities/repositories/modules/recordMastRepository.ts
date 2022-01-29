import { Scalars, RecordMast } from '../../type'

export interface IRecordMastRepository {
    addRecord(input: RecordMast): Promise<RecordMast>
    updateRecord(input: RecordMast): Promise<RecordMast>
    fetchRecordsByCleanerID(cleanerID: Scalars['ID']): Promise<RecordMast[]>
    fetchRecordsByRoomID(cleaningRoomID: Scalars['ID']): Promise<RecordMast[]>
    fetchAllRecordsByHotelID(recordHotelID: Scalars['ID']): Promise<RecordMast[]>
    fetchTodayRecords(recordHotelID: Scalars['ID'], recordDate: Scalars['String']): Promise<RecordMast[]>
    fetchRecordByRecordID(recordID: Scalars['ID']): Promise<RecordMast | null>
}