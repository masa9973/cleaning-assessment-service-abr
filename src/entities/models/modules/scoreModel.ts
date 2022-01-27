import { Scalars, ScoreMast } from '../..';
import { generateUUID } from '../../../util';
import { BaseModel } from './_baseModel';

export class ScoreModel extends BaseModel<ScoreMast> {
    static getBlanc(recordID: Scalars['ID'], scorerUserID: Scalars['ID'], score: Scalars['Int'], scoreItemID: Scalars['ID']): ScoreMast {
        return {
            recordID,
            scoreID: generateUUID(),
            scorerUserID,
            createdAt: new Date().getTime(),
            score,
            scoreItemID,
        }
    }

    // ============================================
    // getter
    // ============================================
    get recordID() {
        return this.mast.recordID;
    }
    get scoreID() {
        return this.mast.scoreID;
    }
    get scorerUserID() {
        return this.mast.scorerUserID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    // ============================================
    // getters / setters
    // ============================================
    get score() {
        return this.mast.score;
    }
    set score(input: number) {
        this.mast.score = input;
    }
    get scoreItemID() {
        return this.mast.scoreItemID
    }
    set scoreItemID(input: string) {
        this.mast.scoreItemID = input
    }

    /* 清掃スコアの登録を行う */
    async register() {
        if (this.isNew) {

            this.mast.createdAt = new Date().getTime();
            this.mast = await this.repositoryContainer.scoreMastRepository.addScore(this.mast);
        } else {
            await this.repositoryContainer.scoreMastRepository.updateScore(this.mast);
        }
        this.isNew = false
    }
}