import { Scalars, ScoreMast } from '../../type';

export interface IScoreMastRepository {
    addScore(input: ScoreMast): Promise<ScoreMast>
    // updateScoreMast(input: ScoreMast): Promise<ScoreMast>
    /* なぜここはnullを許さない？
    fetchUserMastByUserIDはnullとuserMastのユニオン
    fetchUserMastByUserID(userID: Scalars['ID']): Promise<UserMast | null> */
    fetchScoresByRecordID(recordID: Scalars['ID']): Promise<ScoreMast[]>
}