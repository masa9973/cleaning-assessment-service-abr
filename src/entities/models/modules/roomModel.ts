import { Scalars, RoomMast } from '../..';
import { generateUUID } from '../../../util';
import { BaseModel } from './_baseModel';

export class RoomModel extends BaseModel<RoomMast> {
    static getBlanc(roomName: Scalars['String'], roomHotelID: Scalars['ID']): RoomMast {
        return {
            roomID: generateUUID(),
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
        } else {
            return this.repositoryContainer.s3Repository.getSampleImage().url;
        }
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
    get roomHotelID() {
        return this.mast.roomHotelID;
    }
    set roomHotelID(input: string) {
        this.mast.roomHotelID = input;
    }
    /**
     * アイコン画像をセットする
     * @param file
     */
    async setIcon(file: File) {
        const path = `room/${this.roomID}/iconImage/${new Date().getTime()}`;
        this.mast.roomIcon = await this.repositoryContainer.s3Repository.addFile(path, file);
    }
    // 清掃部屋の登録を行う（マネージャー）
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.roomMastRepository.addRoom(this.mast);
    }
}
