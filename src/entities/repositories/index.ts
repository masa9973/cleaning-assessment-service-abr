import { IS3Repository } from './modules/S3Repository'
import { IUserMastRepository } from './modules/userMastRepository'
import { IRecordMastRepository } from './modules/recordMastRepository'
import { IScoreMastRepository } from './modules/scoreMastRepository'
import { IHotelMastRepository } from './modules/hotelMastRepository'
import { IRoomMastRepository } from './modules/roomMastRepository'

export * from './modules/S3Repository'
export * from './modules/recordMastRepository'
export * from './modules/userMastRepository'
export * from './modules/scoreMastRepository'
export * from './modules/hotelMastRepository'
export * from './modules/roomMastRepository'

export class RepositoryContainer{
    constructor(
        public s3Repository: IS3Repository,
        public userMastRepository: IUserMastRepository,
        public recordMastRepository: IRecordMastRepository,
        public scoreMastRepository: IScoreMastRepository,
        public hotelMastRepository: IHotelMastRepository,
        public roomMastRepository: IRoomMastRepository,
    ) {}
}