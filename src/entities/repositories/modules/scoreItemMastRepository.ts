import { Scalars, ScoreItemMast } from '../..';

export interface IScoreItemMastRepository {
    addScoreItem(input: ScoreItemMast): Promise<ScoreItemMast>
    fetchScoreItemsByHotelID(scoreItemHotelID: Scalars['ID']): Promise<ScoreItemMast[]>
}