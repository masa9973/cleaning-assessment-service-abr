"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMastRepositoryCacheAdaptor = void 0;
const __1 = require("../..");
// fetchCacheメソッドを実装、repositoryのメソッド内で定数のcacheを定義、キャッシュがない場合にfetchCacheでemptyを返すようにする
class RoomMastRepositoryCacheAdaptor {
    constructor(repository) {
        this.repository = repository;
        this.hotelIDCache = {};
        this.roomIDCache = {};
    }
    async addRoom(input) {
        this.addHotelIDCache(input);
        this.addRoomIDCache(input);
        return await this.repository.addRoom(input);
    }
    async fetchRoomsByHotelID(roomHotelID) {
        if (this.hotelIDCache[roomHotelID]) {
            return [];
        }
        const res = await this.repository.fetchRoomsByHotelID(roomHotelID);
        this.addHotelIDCaches(res);
        return res;
    }
    async fetchRoomByRoomID(roomID) {
        if (this.roomIDCache) {
            return this.roomIDCache[roomID];
        }
        const res = await this.repository.fetchRoomByRoomID(roomID);
        this.addRoomIDCache(res);
        return res;
    }
    addHotelIDCache(input) {
        this.hotelIDCache[input.roomHotelID] = input;
    }
    addHotelIDCaches(input) {
        for (const mast of input) {
            this.addHotelIDCache(mast);
        }
    }
    fetchHotelIDCaches() {
        return Object.keys(this.hotelIDCache)
            .map((key) => {
            return this.hotelIDCache[key];
        })
            .sort((a, b) => __1.compareNumDesc(a.createdAt, b.createdAt));
    }
    addRoomIDCache(input) {
        this.roomIDCache[input.roomID] = input;
    }
}
exports.RoomMastRepositoryCacheAdaptor = RoomMastRepositoryCacheAdaptor;
