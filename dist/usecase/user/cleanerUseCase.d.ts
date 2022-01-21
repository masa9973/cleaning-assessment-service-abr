import { RepositoryContainer, RoomMast, Scalars } from '../../entities';
import { HotelModel, ModelFactory, RoomModel } from '../../entities/models';
import { RecordModel } from '../../entities/models/modules/recordModel';
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
    fetchRoomByRoomID(roomID: Scalars['ID']): Promise<RoomMast | null>;
    createNewHotel(hotelName: Scalars['String']): Promise<HotelModel>;
}
