import { ScoreModel } from '..';
import { Scalars, ScoreItemMast } from '../..';
import { BaseModel } from './_baseModel';
export declare class ScoreItemModel extends BaseModel<ScoreItemMast> {
    static getBlanc(scoreItemName: Scalars['String'], scoreItemHotelID: Scalars['ID']): ScoreItemMast;
    get scoreItemID(): string;
    get createdAt(): number;
    get scoreItemHotelID(): string;
    set scoreItemHotelID(input: string);
    get scoreItemName(): string;
    set scoreItemName(input: string);
    register(): Promise<void>;
    fetchScores(): Promise<ScoreModel[]>;
    createNewScore(recordID: Scalars['ID']): Promise<ScoreModel>;
}
