import { Scalars, ScoreMast } from '../../type';

export interface IScoreMastRepository {
    addScore(input: ScoreMast): Promise<ScoreMast>
    updateScore(input: ScoreMast): Promise<ScoreMast>
    fetchTermScoresByCleanerIDAndRoomID(scoreCleanerID: Scalars['ID'], scoreRoomID: Scalars['ID'], from: Scalars['String'], to:Scalars['String']): Promise<ScoreMast[]>
}