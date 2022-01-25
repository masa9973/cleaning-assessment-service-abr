import { RecordMast, ScoreMast, UserMast } from '../type';
import { RepositoryContainer } from '../repositories';
import { UserModel } from './modules/userModel';
import { RecordModel } from './modules/recordModel';
import { BaseModel, ModelOption } from './modules/_baseModel';
import { ScoreModel } from './modules/scoreModel';
import { HotelMast, RoomMast, ScoreItemMast } from '..';
import { RoomModel } from './modules/RoomModel';
import { HotelModel } from './modules/hotelModel';
import { ScoreItemModel } from './modules/scoreItemModel';

export * from './modules/userModel';
export * from './modules/recordModel';
export * from './modules/scoreModel';
export * from './modules/hotelModel'
export * from './modules/RoomModel'
export * from './modules/scoreItemModel'

export class ModelFactory {
    constructor(private repositoryContainer: RepositoryContainer) {}
    public UserModel(mast: UserMast, option?: ModelOption) {
        return new UserModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }

    public RecordModel(mast: RecordMast, option?: ModelOption) {
        return new RecordModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }

    public ScoreModel(mast: ScoreMast, option?: ModelOption) {
        return new ScoreModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }

    public RoomModel(mast: RoomMast, option?: ModelOption) {
        return new RoomModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }

    public HotelModel(mast: HotelMast, option?: ModelOption) {
        return new HotelModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption());
    }

    public ScoreItemModel(mast: ScoreItemMast, option?: ModelOption) {
        return new ScoreItemModel(mast, this.repositoryContainer, this, option || BaseModel.baseModelOption())
    }
}
