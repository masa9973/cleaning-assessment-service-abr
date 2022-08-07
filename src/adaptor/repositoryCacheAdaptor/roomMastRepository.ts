import { IRoomMastRepository } from "../..";
import { RoomMast } from "../../entities";

// この構造だとadd時にキャッシュ追加ができない
type HotelIDCache = {
    [hotelID: string]: {
        masts: RoomMast[];
        createdAt: number;
    };
};

type RoomIDCache = {
    [roomID: string]: {
        mast: RoomMast | null;
        createdAt: number;
    };
};
// fetchCacheメソッドを実装、repositoryのメソッド内で定数のcacheを定義、キャッシュがない場合にfetchCacheでemptyを返すようにする
export class RoomMastRepositoryCacheAdaptor implements IRoomMastRepository {
    constructor(private repository: IRoomMastRepository, private cacheTimeMilli: number) {}
    private hotelIDCache: HotelIDCache = {};
    private roomIDCache: RoomIDCache = {};
    addRoom(input: RoomMast): Promise<RoomMast> {
        return this.repository.addRoom(input); // 一旦こうしている addCache関数を作成するう
    }
    async fetchRoomsByHotelID(roomHotelID: string): Promise<RoomMast[]> {
        // キャッシュがあるならキャッシュを返す
        const cache = this.fetchHotelIDCache(roomHotelID);
        if (cache) {
            return cache;
        } else {
            const res = await this.fetchHotelIDViaRepository(roomHotelID);
            // キャッシュ追加
            return res;
        }
    }
    async fetchRoomByRoomID(roomID: string): Promise<RoomMast | null> {
        const cache = this.fetchRoomIDCache(roomID);
        if (cache) {
            return cache;
        } else {
            const res = await this.repository.fetchRoomByRoomID(roomID);
            // キャッシュを追加
            return res;
        }
    }

    // private
    private fetchRoomIDCache(roomID: string) {
        if (this.roomIDCache[roomID]) {
            // ここで生きてるかも判別したい
            return this.roomIDCache[roomID].mast;
        } else {
            return null;
        }
    }

    private fetchHotelIDCache(hotelID: string) {
        if (this.hotelIDCache[hotelID]) {
            return this.hotelIDCache[hotelID].masts;
        } else {
            return null;
        }
    }

    /**
     * repositoryを使いたい関数
     * @param hotelID
     * @returns
     */
    private async fetchHotelIDViaRepository(hotelID: string) {
        return await this.repository.fetchRoomsByHotelID(hotelID);
    }
}
