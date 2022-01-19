"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const util_1 = require("../../../util");
const _baseModel_1 = require("./_baseModel");
class RoomModel extends _baseModel_1.BaseModel {
    static getBlanc(roomName, roomHotelID) {
        return {
            roomID: util_1.generateUUID(),
            roomName,
            createdAt: new Date().getTime(),
            roomHotelID,
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
    get userIcon() {
        if (this.mast.roomIcon) {
            return this.mast.roomIcon.url;
        }
        else {
            return this.repositoryContainer.s3Repository.getSampleImage().url;
        }
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
    get roomHotelID() {
        return this.mast.roomHotelID;
    }
    set roomHotelID(input) {
        this.mast.roomHotelID;
    }
    /**
     * アイコン画像をセットする
     * @param file
     */
    async setIcon(file) {
        const path = `room/${this.roomID}/iconImage/${new Date().getTime()}`;
        this.mast.roomIcon = await this.repositoryContainer.s3Repository.addFile(path, file);
    }
    // 清掃部屋の登録を行う（マネージャー）
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.roomMastRepository.addRoom(this.mast);
    }
    // 施設に紐づく部屋を取得する
    async fetchRoomsByHotelID(roomHotelID) {
        const res = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(roomHotelID);
        return res.map((item) => this.modelFactory.RoomModel(item));
    }
}
exports.RoomModel = RoomModel;
