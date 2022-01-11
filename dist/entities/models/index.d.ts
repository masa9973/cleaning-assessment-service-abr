import { RecordMast, ScoreMast, UserMast } from '../type';
import { RepositoryContainer } from '../repositories';
import { UserModel } from './modules/userModel';
import { RecordModel } from './modules/recordModel';
import { ModelOption } from './modules/_baseModel';
import { ManagerModel } from './modules/managerModel';
import { ScoreModel } from './modules/scoreModel';
export * from './modules/userModel';
export * from './modules/recordModel';
export * from './modules/scoreModel';
export declare class ModelFactory {
    private repositoryContainer;
    constructor(repositoryContainer: RepositoryContainer);
    UserModel(mast: UserMast, option?: ModelOption): UserModel;
    ManagerModel(mast: UserMast, option?: ModelOption): ManagerModel;
    CleanerModel(mast: UserMast, option?: ModelOption): UserModel;
    RecordModel(mast: RecordMast, option?: ModelOption): RecordModel;
    ScoreModel(mast: ScoreMast, option?: ModelOption): ScoreModel;
}
