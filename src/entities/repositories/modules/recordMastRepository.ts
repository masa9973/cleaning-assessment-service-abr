import { Scalars, RecordMast } from '../../type'

export interface IRecordMastRepository {
    addRecord(input: RecordMast): Promise<RecordMast>
    // updateRecordMast(input: RecordMast): Promise<RecordMast>
    fetchRecordsByCleanerID(userID: Scalars['ID']): Promise<RecordMast[]>
    // fetchRecordByRecordID(recordID: Scalars['ID']): Promise<RecordMast>
}