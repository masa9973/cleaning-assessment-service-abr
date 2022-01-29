import { RecordModel } from '..';
import { Scalars, RoomMast } from '../..';
import { BaseModel } from './_baseModel';
export declare class RoomModel extends BaseModel<RoomMast> {
    static getBlanc(roomName: Scalars['String'], roomHotelID: Scalars['ID']): RoomMast;
    get roomID(): string;
    get createdAt(): number;
    get roomIcon(): string;
    get roomName(): string;
    set roomName(input: string);
    get roomHotelID(): string;
    set roomHotelID(input: string);
    /**
     * アイコン画像をセットする
     * @param file
     */
    setIcon(file: File): Promise<void>;
    register(): Promise<void>;
    createNewRecord(): Promise<RecordModel>;
}
