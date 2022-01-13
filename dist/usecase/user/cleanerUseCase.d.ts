import { RepositoryContainer, Scalars } from '../../entities';
import { ModelFactory } from '../../entities/models';
import { RecordModel } from '../../entities/models/modules/recordModel';
export declare class CleanerUsecase {
    private repositoryContainer;
    private modelFactory;
    constructor(repositoryContainer: RepositoryContainer, modelFactory: ModelFactory);
    fetchMyUserModel(): Promise<import("../../entities").UserModel>;
    fetchUserModelByUserID(userID: Scalars['ID']): Promise<import("../../entities").UserModel>;
    fetchAllUser(): Promise<import("../../entities").UserModel[]>;
    createNewRecord(): Promise<RecordModel>;
}
