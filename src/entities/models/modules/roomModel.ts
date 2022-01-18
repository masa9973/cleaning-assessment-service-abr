import { Scalars, RoomMast } from '../..';
import { generateUUID } from '../../../util';
import { HotelModel } from './hotelModel';
import { BaseModel } from './_baseModel';

export class RoomModel extends BaseModel<RoomMast> {
    // ============================================
    // getter
    // ============================================
    get roomID() {
        return this.mast.roomID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    get hotelID() {
        return this.mast.hotelID
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
    // 清掃部屋の登録を行う（マネージャー）
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.roomMastRepository.addRoom(this.mast)
    }

    // 施設に紐づく部屋を取得する
    async fetchRoomsByHotelID(hotelID: Scalars['ID']): Promise<RoomModel[]> {
        const res = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(hotelID)
        return res.map((item) => this.modelFactory.RoomModel(item))
    }
}