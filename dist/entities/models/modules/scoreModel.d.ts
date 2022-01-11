import { Scalars, ScoreMast } from '../..';
import { BaseModel } from './_baseModel';
export declare class ScoreModel extends BaseModel<ScoreMast> {
    static getBlanc(recordID: Scalars['ID'], scorerUserID: Scalars['ID'], score: Scalars['Int']): {
        recordID: string;
        scoreID: string;
        scorerUserID: string;
        createdAt: number;
        score: number;
    };
    get recordID(): string;
    get scoreID(): string;
    get scorerUserID(): string;
    get createdAt(): number;
    get score(): number;
    set score(input: number);
    register(): Promise<void>;
}
