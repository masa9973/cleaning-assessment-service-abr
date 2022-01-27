import { Scalars, RoomMast } from '../../type';
export interface IRoomMastRepository {
    addRoom(input: RoomMast): Promise<RoomMast>;
    deleteRoom(roomID: Scalars['ID']): Promise<RoomMast>;
    fetchRoomsByHotelID(roomHotelID: Scalars['ID']): Promise<RoomMast[]>;
    fetchRoomByRoomID(roomID: Scalars['ID']): Promise<RoomMast | null>;
}
