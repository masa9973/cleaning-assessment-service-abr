import { Scalars, RecordMast } from '../../type'

export interface IRecordMastRepository {
    addRecord(input: RecordMast): Promise<RecordMast>
    updateRecordMast(input: RecordMast): Promise<RecordMast>
    fetchRecordsByCleanerID(cleanerID: Scalars['ID']): Promise<RecordMast[]>
    // fetchRecordByRecordID(recordID: Scalars['ID']): Promise<RecordMast>
    // fetchAllRecordsUnscored()も検討
    fetchAllRecords(): Promise<RecordMast[]>
}