import { ErrorCode, IUserMastRepository, Scalars, UserMast } from '../../entities';
import { ChillnnTrainingError, compareNumDesc } from '../../util';

type UserCache = {
    [userID: string]: UserMast | 'blanc' | undefined;
};

export class UserMastRepositoryCacheAdaptor implements IUserMastRepository {
    private userEachCache: UserCache = {};
    private userAllCache: UserCache | null = null;
    constructor(private repository: IUserMastRepository) {}

    async addUserMast(input: UserMast): Promise<UserMast> {
        const res = await this.repository.addUserMast(input);
        this.updateCacheEach(res.userID, res);
        this.myUserID = res.userID;
        return res;
    }
    async updateUserMast(input: UserMast): Promise<UserMast> {
        const res = await this.repository.updateUserMast(input);
        this.updateCacheEach(res.userID, res);
        this.myUserID = res.userID;
        return res;
    }
    async fetchMyUserMast(): Promise<UserMast | null> {
        if (this.myUserID) return this.fetchCacheUserMast(this.myUserID) as UserMast;
        const res = await this.repository.fetchMyUserMast();
        if (!res) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_401_notSignIn);
        } else {
            this.myUserID = res.userID;
            this.updateCacheEach(res.userID, res);
        }
        return res;
    }
    async fetchUserMastByUserID(userID: string): Promise<UserMast | null> {
        const cache = this.fetchCacheUserMast(userID);
        if (cache && cache === 'blanc') {
            return null;
        } else if (cache) {
            return cache;
        }
        const res = await this.repository.fetchUserMastByUserID(userID);
        this.updateCacheEach(userID, res);
        return res;
    }
    async fetchAllUserByHotelID(hotelID: string): Promise<UserMast[]> {
        const cache = this.fetchCacheUserAll();
        if (cache) return cache;
        const res = await this.repository.fetchAllUserByHotelID(hotelID);
        this.updateCacheBulk(res);
        return res;
    }

    // ===============================================================
    //
    // private
    //
    // ===============================================================
    private myUserID: string | null = null;
    private updateCacheEach(userID: Scalars['ID'], user: UserMast | null) {
        this.userEachCache[userID] = user || 'blanc';
        if (this.userAllCache && user) {
            this.userAllCache[userID] = user;
        }
    }
    private updateCacheBulk(users: UserMast[]) {
        this.userAllCache = {};
        for (const user of users) {
            this.updateCacheEach(user.userID, user);
        }
    }

    private fetchCacheUserMast(userID: Scalars['ID']) {
        return this.userEachCache[userID];
    }

    private fetchCacheUserAll() {
        if (!this.userAllCache) return null;
        return Object.keys(this.userAllCache)
            .map((key) => {
                return this.userAllCache![key]! as UserMast;
            })
            .sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }
}