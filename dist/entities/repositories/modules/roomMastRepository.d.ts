import { Scalars, RoomMast } from '../../type';
export interface IRoomMastRepository {
    addRoom(input: RoomMast): Promise<RoomMast>;
    fetchRoomsByHotelID(hotelID: Scalars['ID']): Promise<RoomMast[]>;
}
