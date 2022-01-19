import { Scalars, RoomMast } from '../..';
import { BaseModel } from './_baseModel';
export declare class RoomModel extends BaseModel<RoomMast> {
    static getBlanc(roomName: Scalars['String'], hotelID: Scalars['ID']): RoomMast;
    get roomID(): string;
    get createdAt(): number;
    get hotelID(): string;
    get userIcon(): string;
    get roomName(): string;
    set roomName(input: string);
    /**
     * アイコン画像をセットする
     * @param file
     */
    setIcon(file: File): Promise<void>;
    register(): Promise<void>;
    fetchRoomsByHotelID(hotelID: Scalars['ID']): Promise<RoomModel[]>;
}
