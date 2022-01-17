import { ErrorCode, ModelFactory, RepositoryContainer, Role } from '../../entities';
import { RecordModel } from '../../entities/models/modules/recordModel';
import { ScoreModel } from '../../entities/models/modules/scoreModel';
import { ChillnnTrainingError } from '../../util';

export class ScoreUsecase {
    constructor(
       private repositoryContainer: RepositoryContainer,
       private modelFactory: ModelFactory,
       private recordModel: RecordModel, 
    ) {}
    
    /* 新しいスコアを作成 */
    async createNewScore(): Promise<ScoreModel> {
        // 自分しか評価ができないのはいいんだけど、清掃者も評価ができてしまう
        // role === managerをやりたい
        // 表示できるページで分けたらいいんじゃねえか

        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me)  {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
            // if (this.modelFactory.UserModel(me).role === 'manager') {

                const userID = this.modelFactory.UserModel(me).userID;
                this.recordModel.ifScored = true;
                return this.modelFactory.ScoreModel(ScoreModel.getBlanc(this.recordModel.recordID, userID, 0), {
                    isNew: true,
                });
            // }
    }
}