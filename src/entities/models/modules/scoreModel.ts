import { Scalars, ScoreMast } from '../..';
import { generateUUID } from '../../../util';
import { BaseModel } from './_baseModel';

export class ScoreModel extends BaseModel<ScoreMast> {
    static getBlanc(recordID: Scalars['ID'], scorerUserID: Scalars['ID'], score: Scalars['Int']) {
        return {
            recordID,
            scoreID: generateUUID(),
            scorerUserID,
            createdAt: new Date().getTime(),
            score,
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

    /* 清掃スコアの登録を行う */
    async register() {
        this.mast.createdAt = new Date().getTime();
        this.mast = await this.repositoryContainer.scoreMastRepository.addScore(this.mast);
    }
}