import { Scalars, RoomMast } from '../..';
import { BaseModel } from './_baseModel';
export declare class RoomModel extends BaseModel<RoomMast> {
    get roomID(): string;
    get createdAt(): number;
    get hotelID(): string;
    get roomName(): string;
    set roomName(input: string);
    register(): Promise<void>;
    fetchRoomsByHotelID(hotelID: Scalars['ID']): Promise<RoomModel[]>;
}
