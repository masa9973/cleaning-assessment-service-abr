"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordMastRepositoryCacheAdaptor = void 0;
class RecordMastRepositoryCacheAdaptor {
    constructor(repository) {
        this.repository = repository;
        this.hotelIDCaches = [];
        this.hotelIDRecordDateCaches = [];
        this.cleanerIDCaches = [];
        this.recordIDCache = {};
        this.cleanerIDRoomIDCache = {};
        // super();
    }
    cacheClear() {
        this.hotelIDCaches = [];
        this.hotelIDRecordDateCaches = [];
        this.cleanerIDCaches = [];
        this.recordIDCache = {};
        this.cleanerIDRoomIDCache = {};
    }
    async addRecord(input) {
        // 全キャッシュを保存
        this.addHotelIDCache(input);
        this.addHotelIDRecordDateCache(input);
        this.addRecordIDCache(input);
        const res = await this.repository.addRecord(input);
        return res;
    }
    async updateRecord(input) {
        this.addHotelIDCache(input);
        this.addHotelIDRecordDateCache(input);
        const res = await this.repository.updateRecord(input);
        return res;
    }
    async fetchAllRecordsByHotelID(recordHotelID) {
        // キャッシュがあるならキャッシュを返す
        if (this.hotelIDCaches) {
            // キャッシュをRecordMastの型にする
            return this.hotelIDCaches.map((item) => item[recordHotelID]);
        }
        // ないならキャッシュを追加
        const res = await this.repository.fetchAllRecordsByHotelID(recordHotelID);
        this.addHotelIDCaches(res);
        return res;
    }
    async fetchRecordsByDate(recordHotelID, recordDate) {
        if (this.hotelIDRecordDateCaches) {
            return this.hotelIDRecordDateCaches.map((item) => item[recordHotelID][recordDate]);
        }
        const res = await this.repository.fetchRecordsByDate(recordHotelID, recordDate);
        this.addHotelIDRecordDateCaches(res);
        return res;
    }
    async fetchRecordByRecordID(recordID) {
        if (this.recordIDCache) {
            return this.recordIDCache[recordID];
        }
        const res = await this.repository.fetchRecordByRecordID(recordID);
        this.addRecordIDCache(res);
        return res;
    }
    /**
     * ここ時間ある時実装しよう
     * @param cleanerID
     * @param cleaningRoomID
     * @param from
     * @param to
     * @returns
     */
    async fetchTermRecordsByCleanerIDAndRoomID(cleanerID, cleaningRoomID, from, to) {
        const res = await this.repository.fetchTermRecordsByCleanerIDAndRoomID(cleanerID, cleaningRoomID, from, to);
        return res;
    }
    // private
    addHotelIDCaches(input) {
        input.map((item) => {
            this.addHotelIDCache(item);
        });
    }
    addHotelIDCache(input) {
        this.hotelIDCaches.push({ [input.recordHotelID]: input });
    }
    addHotelIDRecordDateCache(input) {
        const arg = {
            [input.recordHotelID]: {
                [input.recordDate]: input
            }
        };
        this.hotelIDRecordDateCaches.push(arg);
    }
    addHotelIDRecordDateCaches(input) {
        input.map((item) => {
            this.addHotelIDRecordDateCache(item);
        });
    }
    addRecordIDCache(input) {
        this.recordIDCache[input.recordID] = input;
    }
}
exports.RecordMastRepositoryCacheAdaptor = RecordMastRepositoryCacheAdaptor;
