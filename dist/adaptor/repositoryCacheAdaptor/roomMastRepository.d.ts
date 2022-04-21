import { IRoomMastRepository } from '../..';
import { RoomMast } from '../../entities';
export declare class RoomMastRepositoryCacheAdaptor implements IRoomMastRepository {
    private repository;
    constructor(repository: IRoomMastRepository);
    private hotelIDCache;
    private roomIDCache;
    addRoom(input: RoomMast): Promise<RoomMast>;
    fetchRoomsByHotelID(roomHotelID: string): Promise<RoomMast[]>;
    fetchRoomByRoomID(roomID: string): Promise<RoomMast | null>;
    private addHotelIDCache;
    private addHotelIDCaches;
    private fetchHotelIDCaches;
    private addRoomIDCache;
}
