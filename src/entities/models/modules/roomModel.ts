import { RecordModel } from '..';
import { Scalars, RoomMast, ErrorCode } from '../..';
import { ChillnnTrainingError, generateUUID } from '../../../util';
import { BaseModel } from './_baseModel';

export class RoomModel extends BaseModel<RoomMast> {
    static getBlanc(roomName: Scalars['String'], hotelID: Scalars['ID']): RoomMast {
        return {
            roomID: generateUUID(),
            roomName,
            createdAt: new Date().getTime(),
            hotelID,
            lastAssignedDate: ''
        };
    }
    // ============================================
    // getter
    // ============================================
    get roomID() {
        return this.mast.roomID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    // ============================================
    // getters / setters
    // ============================================
    get roomName() {
        return this.mast.roomName;
    }
    set roomName(input: string) {
        this.mast.roomName = input;
    }
    get hotelID() {
        return this.mast.hotelID;
    }
    set hotelID(input: string) {
        this.mast.hotelID = input;
    }
    // 清掃部屋の登録を行う
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.roomMastRepository.addRoom(this.mast);
    }

    async createNewRecord(): Promise<RecordModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        } else {
            const recordHotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof recordHotelID === 'string') {
                return this.modelFactory.RecordModel(RecordModel.getBlanc('', this.roomID, 0, 0, 0, recordHotelID), {
                    isNew: true,
                });
            } else {
                throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }
}
