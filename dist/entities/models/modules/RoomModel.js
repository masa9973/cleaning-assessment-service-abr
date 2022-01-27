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
    get roomIcon() {
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
        this.mast.roomHotelID = input;
    }
    /**
     * アイコン画像をセットする
     * @param file
     */
    async setIcon(file) {
        const path = `room/${this.roomID}/iconImage/${new Date().getTime()}`;
        this.mast.roomIcon = await this.repositoryContainer.s3Repository.addFile(path, file);
    }
    // 清掃部屋の登録を行う
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.roomMastRepository.addRoom(this.mast);
    }
}
exports.RoomModel = RoomModel;
