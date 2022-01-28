import { RepositoryContainer, Scalars } from '../../entities';
import { HotelModel, ModelFactory, RoomModel, ScoreModel } from '../../entities/models';
import { RecordModel } from '../../entities/models/modules/recordModel';
import { ScoreItemModel } from '../../entities/models/modules/scoreItemModel';
export declare class CleanerUsecase {
    private repositoryContainer;
    private modelFactory;
    constructor(repositoryContainer: RepositoryContainer, modelFactory: ModelFactory);
    fetchMyUserModel(): Promise<import("../../entities").UserModel>;
    fetchUserModelByUserID(userID: Scalars['ID']): Promise<import("../../entities").UserModel>;
    fetchAllUserByHotelID(userHotelID: Scalars['ID']): Promise<import("../../entities").UserModel[]>;
    createNewRecord(): Promise<RecordModel>;
    fetchAllRecordsByHotelID(recordHotelID: Scalars['ID']): Promise<RecordModel[]>;
    fetchRecordsByCleanerID(userID: Scalars['ID']): Promise<RecordModel[]>;
    fetchRecordByRecordID(recordID: Scalars['ID']): Promise<RecordModel>;
    createNewRoom(roomName: Scalars['String']): Promise<RoomModel>;
    fetchRoomsByHotelID(roomHotelID: Scalars['ID']): Promise<RoomModel[]>;
    fetchRoomByRoomID(roomID: Scalars['ID']): Promise<RoomModel | null>;
    fetchScoresByRecordID(recordID: Scalars['ID']): Promise<ScoreModel[]>;
    createNewScoreItem(scoreItemName: Scalars['String']): Promise<ScoreItemModel>;
    fetchScoreItemsByHotelID(scoreItemHotelID: Scalars['ID']): Promise<ScoreItemModel[]>;
    fetchScoreItemByScoreItemID(scoreItemID: Scalars['ID']): Promise<ScoreItemModel | null>;
    createNewHotel(hotelName: Scalars['String']): Promise<HotelModel>;
    recordsToAvarageStringTime(records: RecordModel[]): string;
    scoreItemIDToAvarageScore(userID: Scalars['ID'], scoreItemID: Scalars['ID']): Promise<number>;
}
