import { Scalars, ScoreMast } from '../..';
import { BaseModel } from './_baseModel';
export declare class ScoreModel extends BaseModel<ScoreMast> {
    static getBlanc(recordID: Scalars['ID'], scorerUserID: Scalars['ID'], score: Scalars['Int'], scoreItemID: Scalars['ID'], scoreCleanerID: Scalars['ID'], scoreRoomID: Scalars['ID']): ScoreMast;
    get recordID(): string;
    get scoreID(): string;
    get scorerUserID(): string;
    get createdAt(): number;
    get score(): number;
    set score(input: number);
    get scoreItemID(): string;
    set scoreItemID(input: string);
    get scoreCleanerID(): string;
    set scoreCleanerID(input: string);
    get scoreRoomID(): string;
    set scoreRoomID(input: string);
    register(): Promise<void>;
}
