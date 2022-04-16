import { IS3Repository } from './modules/S3Repository';
import { IUserMastRepository } from './modules/userMastRepository';
import { IRecordMastRepository } from './modules/recordMastRepository';
import { IScoreMastRepository } from './modules/scoreMastRepository';
import { IRoomMastRepository } from './modules/roomMastRepository';
import { IScoreItemMastRepository } from './modules/scoreItemMastRepository';
import { IHotelMastRepository } from './modules/hotelMastRepository';
export * from './modules/S3Repository';
export * from './modules/recordMastRepository';
export * from './modules/userMastRepository';
export * from './modules/scoreMastRepository';
export * from './modules/roomMastRepository';
export * from './modules/scoreItemMastRepository';
export * from './modules/hotelMastRepository';
export declare class RepositoryContainer {
    hotelMastRepository: IHotelMastRepository;
    s3Repository: IS3Repository;
    userMastRepository: IUserMastRepository;
    recordMastRepository: IRecordMastRepository;
    scoreMastRepository: IScoreMastRepository;
    roomMastRepository: IRoomMastRepository;
    scoreItemMastRepository: IScoreItemMastRepository;
    constructor(hotelMastRepository: IHotelMastRepository, s3Repository: IS3Repository, userMastRepository: IUserMastRepository, recordMastRepository: IRecordMastRepository, scoreMastRepository: IScoreMastRepository, roomMastRepository: IRoomMastRepository, scoreItemMastRepository: IScoreItemMastRepository);
}
