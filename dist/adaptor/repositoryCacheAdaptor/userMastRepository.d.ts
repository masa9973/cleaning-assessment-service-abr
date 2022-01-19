import { IUserMastRepository, UserMast } from '../../entities';
export declare class UserMastRepositoryCacheAdaptor implements IUserMastRepository {
    private repository;
    private userEachCache;
    private userAllCache;
    constructor(repository: IUserMastRepository);
    addUserMast(input: UserMast): Promise<UserMast>;
    updateUserMast(input: UserMast): Promise<UserMast>;
    fetchMyUserMast(): Promise<UserMast | null>;
    fetchUserMastByUserID(userID: string): Promise<UserMast | null>;
    fetchAllUserByHotelID(hotelID: string): Promise<UserMast[]>;
    private myUserID;
    private updateCacheEach;
    private updateCacheBulk;
    private fetchCacheUserMast;
    private fetchCacheUserAll;
}
