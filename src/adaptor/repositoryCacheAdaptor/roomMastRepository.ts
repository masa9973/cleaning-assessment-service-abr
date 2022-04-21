import { compareNumDesc, IRoomMastRepository } from '../..';
import { RoomMast } from '../../entities';

type HotelIDCache = {
    [hotelID: string]: RoomMast
}

type RoomIDCache = {
    [roomID: string]: RoomMast | null
}
export class RoomMastRepositoryCacheAdaptor implements IRoomMastRepository {
    constructor(private repository: IRoomMastRepository){}
    private hotelIDCache: HotelIDCache = {}
    private roomIDCache: RoomIDCache = {}

    async addRoom(input: RoomMast): Promise<RoomMast> {
        this.addHotelIDCache(input)
        this.addRoomIDCache(input)
        return await this.repository.addRoom(input)
    }
    async fetchRoomsByHotelID(roomHotelID: string): Promise<RoomMast[]> {
        if (this.hotelIDCache) {
            return this.fetchHotelIDCaches()
        }
        const res = await this.repository.fetchRoomsByHotelID(roomHotelID)
        this.addHotelIDCaches(res)
        return res
    }
    async fetchRoomByRoomID(roomID: string): Promise<RoomMast | null> {
        if (this.roomIDCache) {
            return this.roomIDCache[roomID]
        }
        const res = await this.repository.fetchRoomByRoomID(roomID)
        this.addRoomIDCache(res)
        return res
    }

    private addHotelIDCache(input: RoomMast) {
        // ここ多分バグの原因
        this.hotelIDCache[input.roomHotelID] = input
    }

    private addHotelIDCaches(input: RoomMast[]) {
        for (const mast of input) {
            this.addHotelIDCache(mast)
        }
    }

    private fetchHotelIDCaches() {
        return Object.keys(this.hotelIDCache)
                .map((key) => {
                    return this.hotelIDCache[key] as RoomMast;
                })
                .sort((a, b) => compareNumDesc(a.createdAt, b.createdAt))
    }

    private addRoomIDCache(input: RoomMast | null) {
        this.roomIDCache[input!.roomID] = input
    }
}