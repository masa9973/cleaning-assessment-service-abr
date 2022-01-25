import { ErrorCode, ModelFactory, RepositoryContainer, Role } from '../../entities';
import { RecordModel } from '../../entities/models/modules/recordModel';
import { ScoreModel } from '../../entities/models/modules/scoreModel';
import { ChillnnTrainingError } from '../../util';

export class ScoreUsecase {
    constructor(private repositoryContainer: RepositoryContainer, private modelFactory: ModelFactory, private recordModel: RecordModel) {}

    /* 新しいスコアを作成 */
    async createNewScore(): Promise<ScoreModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        const userID = this.modelFactory.UserModel(me).userID;
        this.recordModel.switchIfScored();
        return this.modelFactory.ScoreModel(ScoreModel.getBlanc(this.recordModel.recordID, userID, 0, ''), {
            isNew: true,
        });
    }
}