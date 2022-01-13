import { Scalars, RecordMast } from '../../type';
export interface IRecordMastRepository {
    addRecord(input: RecordMast): Promise<RecordMast>;
    fetchRecordsByCleanerID(userID: Scalars['ID']): Promise<RecordMast[]>;
    fetchAllRecords(): Promise<RecordMast[]>;
}
