import { ScoreModel } from '..';
import { ErrorCode, Scalars, ScoreItemMast } from '../..';
import { ChillnnTrainingError, compareNumDesc, generateUUID } from '../../..';
import { BaseModel } from './_baseModel';

export class ScoreItemModel extends BaseModel<ScoreItemMast> {
    static getBlanc(scoreItemName: Scalars['String'], scoreItemHotelID: Scalars['ID']): ScoreItemMast {
        return {
            scoreItemID: generateUUID(),
            scoreItemName,
            createdAt: new Date().getTime(),
            scoreItemHotelID,
        }
    }
    // ============================================
    // getter / setter
    // ============================================
    get scoreItemID() {
        return this.mast.scoreItemID
    }
    get createdAt() {
        return this.mast.createdAt
    }
    get scoreItemHotelID() {
        return this.mast.scoreItemHotelID
    }
    set scoreItemHotelID(input: string) {
        this.mast.scoreItemHotelID = input
    }
    get scoreItemName() {
        return this.mast.scoreItemName
    }
    set scoreItemName(input: string) {
        this.mast.scoreItemName = input
    }

    // 評価項目を登録する
    async register() {
        this.mast.createdAt = new Date().getTime()
        this.mast = await this.repositoryContainer.scoreItemMastRepository.addScoreItem(this.mast)
    }

    // この評価項目を持つスコアを取得する（追加）
    // ここでレコードID入れたら一意に特定できる
    async fetchScores(): Promise<ScoreModel[]> {
        const res = await this.repositoryContainer.scoreMastRepository.fetchScoresByScoreItemID(this.scoreItemID)
        return res.map((item) => this.modelFactory.ScoreModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt))
    }

    // レコードIDを入れてスコアを作成する
    // ここスコア作れたら良くない？
    async createNewScore(recordID: Scalars['ID']):Promise<ScoreModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast()
        if (!me) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        const userID = this.modelFactory.UserModel(me).userID;
        return this.modelFactory.ScoreModel(ScoreModel.getBlanc(recordID, userID, 0, this.scoreItemID), {
            isNew: true,
        })
    }
}