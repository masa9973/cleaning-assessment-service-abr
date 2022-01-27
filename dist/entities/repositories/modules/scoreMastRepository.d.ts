import { Scalars, ScoreMast } from '../../type';
export interface IScoreMastRepository {
    addScore(input: ScoreMast): Promise<ScoreMast>;
    updateScore(input: ScoreMast): Promise<ScoreMast>;
    fetchScoresByRecordID(recordID: Scalars['ID']): Promise<ScoreMast[]>;
}
