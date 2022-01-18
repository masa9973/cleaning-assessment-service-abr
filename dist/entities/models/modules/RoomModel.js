"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const _baseModel_1 = require("./_baseModel");
class RoomModel extends _baseModel_1.BaseModel {
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
        return this.mast.hotelID;
    }
    // ============================================
    // getters / setters
    // ============================================
    get roomName() {
        return this.mast.roomName;
    }
    set roomName(input) {
        this.mast.roomName = input;
    }
    // 清掃部屋の登録を行う（マネージャー）
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.roomMastRepository.addRoom(this.mast);
    }
    // 施設に紐づく部屋を取得する
    async fetchRoomsByHotelID(hotelID) {
        const res = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(hotelID);
        return res.map((item) => this.modelFactory.RoomModel(item));
    }
}
exports.RoomModel = RoomModel;
