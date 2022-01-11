import { ErrorCode, ModelFactory, RepositoryContainer, Scalars } from '../../entities';
import { RecordModel } from '../../entities/models/modules/recordModel';
import { ChillnnTrainingError } from '../../util';

export class ManagerUsecase {
    // managerModelとrecordModel
    constructor(
        private repositoryContainer: RepositoryContainer,
        private modelFactory: ModelFactory,
        private recordModel: RecordModel,
    ) {}
}