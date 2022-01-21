import { ErrorCode, RepositoryContainer, RoomMast, Scalars } from '../../entities';
import { HotelModel, ModelFactory, RoomModel } from '../../entities/models';
import { RecordModel } from '../../entities/models/modules/recordModel';
import { ChillnnTrainingError, compareNumDesc } from '../../util';

export class CleanerUsecase {
    constructor(private repositoryContainer: RepositoryContainer, private modelFactory: ModelFactory) {}


    // =======================
    // user
    // =======================
    async fetchMyUserModel() {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            // 存在しない場合
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(me);
    }

    async fetchUserModelByUserID(userID: Scalars['ID']) {
        const user = await this.repositoryContainer.userMastRepository.fetchUserMastByUserID(userID);
        if (!user) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(user);
    }

    async fetchAllUserByHotelID(userHotelID: Scalars['ID']) {
        const users = await this.repositoryContainer.userMastRepository.fetchAllUserByHotelID(userHotelID);
        return users.map((user) => this.modelFactory.UserModel(user)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    // =======================
    // record
    // =======================
    async createNewRecord(): Promise<RecordModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        } else {
            const recordHotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof recordHotelID === "string" ) {
                return this.modelFactory.RecordModel(RecordModel.getBlanc('', '', 0, 0, 0, recordHotelID), {
                    isNew: true,
                });
            } else {
                throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound)
            }
        }
    }
    async fetchAllRecordsByHotelID(recordHotelID: Scalars['ID']) {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(recordHotelID);
        return records.map((record) => this.modelFactory.RecordModel(record)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }
    async fetchRecordsByCleanerID(userID: Scalars['ID']): Promise<RecordModel[]> {
        const records = await this.repositoryContainer.recordMastRepository.fetchRecordsByCleanerID(userID)
        return records.map((item) => this.modelFactory.RecordModel(item))
    }
    async fetchRecordByRecordID(recordID: Scalars['ID']) {
        const record = await this.repositoryContainer.recordMastRepository.fetchRecordByRecordID(recordID)
        if (!record) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound)
        }
        return this.modelFactory.RecordModel(record)
    }
    // =======================
    // room
    // =======================
    async createNewRoom(roomName: Scalars['String']): Promise<RoomModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast()
        if (!me) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound)
        } else {
            const hotelID = this.modelFactory.UserModel(me).userHotelID
            if (typeof hotelID === "string" ) {

                return this.modelFactory.RoomModel(RoomModel.getBlanc(roomName, hotelID), {
                    isNew: true,
                })
            } else {
                throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound)
            }
        }
    }
    // 施設に紐づく部屋を取得する
    async fetchRoomsByHotelID(roomHotelID: Scalars['ID']): Promise<RoomModel[]> {
        const res = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(roomHotelID)
        return res.map((item) => this.modelFactory.RoomModel(item))
    }
    async fetchRoomByRoomID(roomID: Scalars['ID']): Promise<RoomMast | null> {
        const room = await this.repositoryContainer.roomMastRepository.fetchRoomByRoomID(roomID)
        if (!room) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound)
        }
        return this.modelFactory.RoomModel(room)        
    }

    // =======================
    // hotel
    // =======================
    // hotelを登録
    async createNewHotel(hotelName: Scalars['String']): Promise<HotelModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast()
        if (!me) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound)
        } else {
            const hotelID = this.modelFactory.UserModel(me).userHotelID
            if (typeof hotelID === "string" ) {

                return this.modelFactory.HotelModel(HotelModel.getBlanc(hotelID, hotelName), {
                    isNew: true,
                })
            } else {
                throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound)
            }
        }
    }
}