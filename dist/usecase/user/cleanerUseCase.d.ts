import { RepositoryContainer, Scalars } from '../../entities';
import { ModelFactory, RoomModel } from '../../entities/models';
import { RecordModel } from '../../entities/models/modules/recordModel';
import { ScoreItemModel } from '../../entities/models/modules/scoreItemModel';
export declare class CleanerUsecase {
    private repositoryContainer;
    private modelFactory;
    constructor(repositoryContainer: RepositoryContainer, modelFactory: ModelFactory);
    fetchMyUserModel(): Promise<import("../../entities").UserModel>;
    fetchUserModelByUserID(userID: Scalars['ID']): Promise<import("../../entities").UserModel>;
    createNewRecord(): Promise<RecordModel>;
    /**
     * 清掃時間の登録に使う（クリ）
     * @param recordID
     * @returns
     */
    fetchRecordByRecordID(recordID: Scalars['ID']): Promise<RecordModel>;
    createNewRoom(roomName: Scalars['String']): Promise<RoomModel>;
    /**
     * 部屋の名前を出すのに使う（マネ、クリ）
     * @param roomID
     * @returns
     */
    fetchRoomByRoomID(roomID: Scalars['ID']): Promise<RoomModel | null>;
    createNewScoreItem(scoreItemName: Scalars['String']): Promise<ScoreItemModel>;
    /**
     * レコードのスコアを表示するのに使う（マネ、クリ）
     * @param scoreItemID
     * @returns
     */
    fetchScoreItemByScoreItemID(scoreItemID: Scalars['ID']): Promise<ScoreItemModel | null>;
    recordsToAverageStringTime(records: RecordModel[]): string;
    recordsToTimeArray(records: RecordModel[]): number[];
}
