"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordMastRepositoryCacheAdaptor = void 0;
const __1 = require("../..");
class RecordMastRepositoryCacheAdaptor {
    constructor(repository) {
        this.repository = repository;
        this.userCache = {};
        this.recordCache = {};
    }
    async addRecord(input) {
        const res = await this.repository.addRecord(input);
        this.addCacheEach(res.recordID, res);
        return res;
    }
    async fetchRecordsByCleanerID(userID) {
        const cache = this.fetchRecords(userID);
        if (cache)
            return cache;
        const res = await this.repository.fetchRecordsByCleanerID(userID);
        this.addCacheBulk(userID, res);
        return res.sort((a, b) => __1.compareNumDesc(a.createdAt, b.createdAt));
    }
    // ===============================================================
    //
    // private
    //
    // ===============================================================
    addCacheEach(recordID, record) {
        this.recordCache[recordID] = record || 'blanc';
        if (!record)
            return;
        const userCache = this.userCache[record.cleanerID];
        if (userCache) {
            userCache[recordID] = record;
        }
    }
    addCacheBulk(userID, records) {
        this.userCache[userID] = {};
        for (const record of records) {
            this.addCacheEach(record.recordID, record);
        }
    }
    fetchRecord(recordID) {
        return this.recordCache[recordID];
    }
    fetchRecords(userID) {
        const userCache = this.userCache[userID];
        if (!userCache)
            return null;
        return Object.keys(userCache)
            .map((key) => {
            return userCache[key];
        })
            // .filter((item) => !item.deletedAt)
            .sort((a, b) => __1.compareNumDesc(a.createdAt, b.createdAt));
    }
}
exports.RecordMastRepositoryCacheAdaptor = RecordMastRepositoryCacheAdaptor;
