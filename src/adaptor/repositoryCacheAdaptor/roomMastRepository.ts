import { compareNumDesc, IRoomMastRepository } from '../..';
import { RoomMast } from '../../entities';

type HotelIDCache = {
    [hotelID: string]: RoomMast | undefined;
}

type RoomIDCache = {
    [roomID: string]: RoomMast | null
}
// fetchCacheメソッドを実装、repositoryのメソッド内で定数のcacheを定義、キャッシュがない場合にfetchCacheでemptyを返すようにする
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
        if (this.hotelIDCache[roomHotelID]) {
            return []
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