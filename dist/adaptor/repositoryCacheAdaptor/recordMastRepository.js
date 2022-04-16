"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordMastRepositoryCacheAdaptor = void 0;
const __1 = require("..");
class RecordMastRepositoryCacheAdaptor extends __1.BaseCacheAdaptor {
    constructor() {
        super(...arguments);
        this.hotelIDCache = {};
        this.cleanerIDCache = {};
        this.roomIDCache = {};
        this.recordIDCache = {};
        this.cleanerIDRoomIDCache = {};
    }
    cacheClear() {
        this.hotelIDCache = {};
        this.cleanerIDCache = {};
        this.roomIDCache = {};
        this.recordIDCache = {};
        this.cleanerIDRoomIDCache = {};
    }
    async addRecord(input) {
        const res = await this.addRecord(input);
        return res;
    }
    async updateRecord(input) {
        throw new Error('Method not implemented.');
    }
    async fetchRecordsByCleanerID(cleanerID) {
        throw new Error('Method not implemented.');
    }
    async fetchRecordsByRoomID(cleaningRoomID) {
        throw new Error('Method not implemented.');
    }
    async fetchAllRecordsByHotelID(recordHotelID) {
        throw new Error('Method not implemented.');
    }
    async fetchRecordsByDate(recordHotelID, recordDate) {
        throw new Error('Method not implemented.');
    }
    async fetchRecordByRecordID(recordID) {
        throw new Error('Method not implemented.');
    }
    async fetchTermRecordsByCleanerIDAndRoomID(cleanerID, cleaningRoomID, from, to) {
        throw new Error('Method not implemented.');
    }
    // private
    addCache(input) {
        const now = new Date().getTime();
        this.hotelIDCache[input.recordHotelID] = {
            mast: input,
            createdAt: now
        };
        this.cleanerIDCache[input.cleanerID] = {
            mast: input,
            createdAt: now
        };
        this.roomIDCache[input.cleaningRoomID] = {
            mast: input,
            createdAt: now
        };
        this.recordIDCache[input.recordID] = {
            mast: input,
            createdAt: now
        };
        this.cleanerIDRoomIDCache[input.cleanerID][input.cleaningRoomID] = {
            mast: input,
            createdAt: now
        };
    }
}
exports.RecordMastRepositoryCacheAdaptor = RecordMastRepositoryCacheAdaptor;
