import { RecordMast, ScoreMast, UserMast } from '../type';
import { RepositoryContainer } from '../repositories';
import { UserModel } from './modules/userModel';
import { RecordModel } from './modules/recordModel';
import { ModelOption } from './modules/_baseModel';
import { ScoreModel } from './modules/scoreModel';
import { RoomMast, ScoreItemMast } from '..';
import { RoomModel } from './modules/RoomModel';
import { ScoreItemModel } from './modules/scoreItemModel';
export * from './modules/userModel';
export * from './modules/recordModel';
export * from './modules/scoreModel';
export * from './modules/RoomModel';
export * from './modules/scoreItemModel';
export declare class ModelFactory {
    private repositoryContainer;
    constructor(repositoryContainer: RepositoryContainer);
    UserModel(mast: UserMast, option?: ModelOption): UserModel;
    RecordModel(mast: RecordMast, option?: ModelOption): RecordModel;
    ScoreModel(mast: ScoreMast, option?: ModelOption): ScoreModel;
    RoomModel(mast: RoomMast, option?: ModelOption): RoomModel;
    ScoreItemModel(mast: ScoreItemMast, option?: ModelOption): ScoreItemModel;
}
