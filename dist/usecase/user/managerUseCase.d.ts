import { ModelFactory, RepositoryContainer } from '../../entities';
import { RecordModel } from '../../entities/models/modules/recordModel';
export declare class ManagerUsecase {
    private repositoryContainer;
    private modelFactory;
    private recordModel;
    constructor(repositoryContainer: RepositoryContainer, modelFactory: ModelFactory, recordModel: RecordModel);
}
