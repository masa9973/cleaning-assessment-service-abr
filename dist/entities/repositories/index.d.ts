import { IS3Repository } from './modules/S3Repository';
import { IUserMastRepository } from './modules/userMastRepository';
import { IRecordMastRepository } from './modules/recordMastRepository';
import { IScoreMastRepository } from './modules/scoreMastRepository';
export * from './modules/S3Repository';
export * from './modules/recordMastRepository';
export * from './modules/userMastRepository';
export * from './modules/scoreMastRepository';
export declare class RepositoryContainer {
    s3Repository: IS3Repository;
    userMastRepository: IUserMastRepository;
    recordMastRepository: IRecordMastRepository;
    scoreMastRepository: IScoreMastRepository;
    constructor(s3Repository: IS3Repository, userMastRepository: IUserMastRepository, recordMastRepository: IRecordMastRepository, scoreMastRepository: IScoreMastRepository);
}
