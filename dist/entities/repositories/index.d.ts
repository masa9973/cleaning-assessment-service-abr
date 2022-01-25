import { IS3Repository } from './modules/S3Repository';
import { IUserMastRepository } from './modules/userMastRepository';
import { IRecordMastRepository } from './modules/recordMastRepository';
import { IScoreMastRepository } from './modules/scoreMastRepository';
import { IHotelMastRepository } from './modules/hotelMastRepository';
import { IRoomMastRepository } from './modules/roomMastRepository';
import { IScoreItemMastRepository } from './modules/scoreItemMastRepository';
export * from './modules/S3Repository';
export * from './modules/recordMastRepository';
export * from './modules/userMastRepository';
export * from './modules/scoreMastRepository';
export * from './modules/hotelMastRepository';
export * from './modules/roomMastRepository';
export * from './modules/scoreItemMastRepository';
export declare class RepositoryContainer {
    s3Repository: IS3Repository;
    userMastRepository: IUserMastRepository;
    recordMastRepository: IRecordMastRepository;
    scoreMastRepository: IScoreMastRepository;
    hotelMastRepository: IHotelMastRepository;
    roomMastRepository: IRoomMastRepository;
    scoreItemMastRepository: IScoreItemMastRepository;
    constructor(s3Repository: IS3Repository, userMastRepository: IUserMastRepository, recordMastRepository: IRecordMastRepository, scoreMastRepository: IScoreMastRepository, hotelMastRepository: IHotelMastRepository, roomMastRepository: IRoomMastRepository, scoreItemMastRepository: IScoreItemMastRepository);
}
