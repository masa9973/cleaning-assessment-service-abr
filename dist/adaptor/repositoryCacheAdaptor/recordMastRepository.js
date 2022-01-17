"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordMastRepositoryCacheAdaptor = void 0;
const __1 = require("../..");
class RecordMastRepositoryCacheAdaptor {
    constructor(repository) {
        this.repository = repository;
        this.userCache = {};
        this.recordCache = {};
        this.recordAllCache = null;
    }
    async addRecord(input) {
        const res = await this.repository.addRecord(input);
        this.addCacheEach(res.recordID, res);
        return res;
    }
    async updateRecordMast(input) {
        const res = await this.repository.updateRecordMast(input);
        this.updateCacheEach(res.recordID, res);
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
    async fetchAllRecords() {
        const cache = this.fetchCacheRecordsAll();
        if (cache)
            return cache;
        const res = await this.repository.fetchAllRecords();
        this.updateCacheBulk(res);
        return res;
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
    updateCacheEach(recordID, record) {
        this.recordCache[recordID] = record || 'blanc';
        if (this.recordAllCache && record) {
            this.recordAllCache[recordID] = record;
        }
    }
    updateCacheBulk(records) {
        this.recordAllCache = {};
        for (const record of records) {
            this.updateCacheEach(record.recordID, record);
        }
    }
    // ここの仕組みあんまよくわかってない
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
    fetchCacheRecordsAll() {
        if (!this.recordAllCache)
            return null;
        return Object.keys(this.recordAllCache)
            .map((key) => {
            return this.recordAllCache[key];
        })
            .sort((a, b) => __1.compareNumDesc(a.createdAt, b.createdAt));
    }
}
exports.RecordMastRepositoryCacheAdaptor = RecordMastRepositoryCacheAdaptor;
