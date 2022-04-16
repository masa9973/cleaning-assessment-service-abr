import { Scalars, ScoreMast } from '../../type';

export interface IScoreMastRepository {
    addScore(input: ScoreMast): Promise<ScoreMast>
    addScores(input: ScoreMast[]): Promise<ScoreMast[]>
    fetchTermScoresByRoomIDAndScoreItemIDAndCleanerID(
        scoreItemID: Scalars['ID'], //
        scoreCleanerID: Scalars['ID'], 
        scoreRoomID: Scalars['ID'], 
        from: Scalars['String'], 
        to:Scalars['String']
    ): Promise<ScoreMast[]>
}