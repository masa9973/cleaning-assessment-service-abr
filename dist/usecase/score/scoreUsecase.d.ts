import { ModelFactory, RepositoryContainer } from '../../entities';
import { RecordModel } from '../../entities/models/modules/recordModel';
import { ScoreModel } from '../../entities/models/modules/scoreModel';
export declare class ScoreUsecase {
    private repositoryContainer;
    private modelFactory;
    private recordModel;
    constructor(repositoryContainer: RepositoryContainer, modelFactory: ModelFactory, recordModel: RecordModel);
    createNewScore(): Promise<ScoreModel>;
    fetchRecordsByCleanerID(): Promise<RecordModel[]>;
}
