"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMastRepositoryCacheAdaptor = void 0;
const entities_1 = require("../../entities");
const util_1 = require("../../util");
class UserMastRepositoryCacheAdaptor {
    constructor(repository) {
        this.repository = repository;
        this.userEachCache = {};
        this.userAllCache = null;
        // ===============================================================
        //
        // private
        //
        // ===============================================================
        this.myUserID = null;
    }
    async addUserMast(input) {
        const res = await this.repository.addUserMast(input);
        this.updateCacheEach(res.userID, res);
        this.myUserID = res.userID;
        return res;
    }
    async updateUserMast(input) {
        const res = await this.repository.updateUserMast(input);
        this.updateCacheEach(res.userID, res);
        this.myUserID = res.userID;
        return res;
    }
    async fetchMyUserMast() {
        if (this.myUserID)
            return this.fetchCacheUserMast(this.myUserID);
        const res = await this.repository.fetchMyUserMast();
        if (!res) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_401_notSignIn);
        }
        else {
            this.myUserID = res.userID;
            this.updateCacheEach(res.userID, res);
        }
        return res;
    }
    async fetchUserMastByUserID(userID) {
        const cache = this.fetchCacheUserMast(userID);
        if (cache && cache === 'blanc') {
            return null;
        }
        else if (cache) {
            return cache;
        }
        const res = await this.repository.fetchUserMastByUserID(userID);
        this.updateCacheEach(userID, res);
        return res;
    }
    async fetchAllUser() {
        const cache = this.fetchCacheUserAll();
        if (cache)
            return cache;
        const res = await this.repository.fetchAllUser();
        this.updateCacheBulk(res);
        return res;
    }
    updateCacheEach(userID, user) {
        this.userEachCache[userID] = user || 'blanc';
        if (this.userAllCache && user) {
            this.userAllCache[userID] = user;
        }
    }
    updateCacheBulk(users) {
        this.userAllCache = {};
        for (const user of users) {
            this.updateCacheEach(user.userID, user);
        }
    }
    fetchCacheUserMast(userID) {
        return this.userEachCache[userID];
    }
    fetchCacheUserAll() {
        if (!this.userAllCache)
            return null;
        return Object.keys(this.userAllCache)
            .map((key) => {
            return this.userAllCache[key];
        })
            .sort((a, b) => util_1.compareNumDesc(a.createdAt, b.createdAt));
    }
}
exports.UserMastRepositoryCacheAdaptor = UserMastRepositoryCacheAdaptor;
