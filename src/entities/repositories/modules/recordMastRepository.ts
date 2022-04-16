import { Scalars, RecordMast } from '../../type'

export interface IRecordMastRepository {
    /**
     * マネージャーがアサインする時に使う
     * @param input 
     */
    addRecord(input: RecordMast): Promise<RecordMast>
    /**
     * マネージャーが点数を作成する時に使う
     * クリーナーが時間を登録するときに使う
     * @param input 
     */
    updateRecord(input: RecordMast): Promise<RecordMast>
    /**
     * クリーナーがアサイン済みのレコードを取得するのに使う
     * @param cleanerID 
     */
    fetchRecordsByCleanerID(cleanerID: Scalars['ID']): Promise<RecordMast[]>
    /**
     * マネージャーが得点を入力するのに使う
     * クリーナーが時間を登録するのに使う
     * @param recordID 
     */
    fetchRecordByRecordID(recordID: Scalars['ID']): Promise<RecordMast | null>
    /**
     * グラフを作成するのに使う
     * @param cleanerID 
     * @param cleaningRoomID 
     * @param from 
     * @param to 
     */
    fetchTermRecordsByCleanerIDAndRoomID(cleanerID: Scalars['ID'], cleaningRoomID: Scalars['ID'], from: Scalars['String'], to:Scalars['String']): Promise<RecordMast[]>
}