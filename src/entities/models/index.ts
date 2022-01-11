import { RecordMast, ScoreMast, UserMast } from '../type';
import { RepositoryContainer } from '../repositories';
import { UserModel } from './modules/userModel';
import { RecordModel } from './modules/recordModel';
import { BaseModel, ModelOption } from './modules/_baseModel';
import { ManagerModel } from './modules/managerModel';
import { ScoreModel } from './modules/scoreModel';

export * from './modules/userModel';
export * from './modules/recordModel';
export * from './modules/scoreModel';

export class ModelFactory {
    constructor(private repositoryContainer: RepositoryContainer) {}
    public UserModel(mast: UserMast, option?: ModelOption) {
        return new UserModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }

    public ManagerModel(mast: UserMast, option?: ModelOption) {
        return new ManagerModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }

    public CleanerModel(mast: UserMast, option?: ModelOption) {
        return new UserModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }

    public RecordModel(mast: RecordMast, option?: ModelOption) {
        return new RecordModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }

    public ScoreModel(mast: ScoreMast, option?: ModelOption) {
        return new ScoreModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }
}
