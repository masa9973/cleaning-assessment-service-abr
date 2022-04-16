import { Scalars, RoomMast } from '../../type';
export interface IRoomMastRepository {
    addRoom(input: RoomMast): Promise<RoomMast>;
    fetchRoomsByHotelID(roomHotelID: Scalars['ID']): Promise<RoomMast[]>;
    fetchRoomByRoomID(roomID: Scalars['ID']): Promise<RoomMast | null>;
}
