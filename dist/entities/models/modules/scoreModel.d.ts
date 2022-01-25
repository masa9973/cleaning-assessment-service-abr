import { Scalars, ScoreMast } from '../..';
import { BaseModel } from './_baseModel';
export declare class ScoreModel extends BaseModel<ScoreMast> {
    static getBlanc(recordID: Scalars['ID'], scorerUserID: Scalars['ID'], score: Scalars['Int'], scoreItemID: Scalars['ID']): ScoreMast;
    get recordID(): string;
    get scoreID(): string;
    get scorerUserID(): string;
    get createdAt(): number;
    get score(): number;
    set score(input: number);
    register(): Promise<void>;
}
