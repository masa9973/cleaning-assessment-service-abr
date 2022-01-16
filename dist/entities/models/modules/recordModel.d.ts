import { RecordMast, Scalars } from '../..';
import { ScoreModel } from './scoreModel';
import { BaseModel } from './_baseModel';
export declare class RecordModel extends BaseModel<RecordMast> {
    static getBlanc(cleanerID: Scalars['ID'], room: Scalars['String'], startAt: Scalars['AWSTimestamp'], finishedAt: Scalars['AWSTimestamp']): RecordMast;
    get recordID(): string;
    get cleanerID(): string;
    get createdAt(): number;
    get room(): string;
    set room(input: string);
    get startAt(): number;
    set startAt(input: number);
    get finishedAt(): number;
    set finishedAt(input: number);
    register(): Promise<void>;
    fetchScoresByRecordID(recordID: Scalars['ID']): Promise<ScoreModel[]>;
}
