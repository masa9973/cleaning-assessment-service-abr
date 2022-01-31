import { RecordMast, Scalars } from '../..';
import { ScoreModel } from './scoreModel';
import { BaseModel } from './_baseModel';
export declare class RecordModel extends BaseModel<RecordMast> {
    static getBlanc(cleanerID: Scalars['ID'], cleaningRoomID: Scalars['String'], startAt: Scalars['AWSTimestamp'], finishedAt: Scalars['AWSTimestamp'], cleaningTime: Scalars['Int'], recordHotelID: Scalars['ID']): RecordMast;
    get recordID(): string;
    get createdAt(): number;
    get recordDate(): string;
    get cleaningRoomID(): string;
    set cleaningRoomID(input: string);
    get startAt(): number;
    set startAt(input: number);
    get finishedAt(): number;
    set finishedAt(input: number);
    get ifScored(): boolean;
    set ifScored(input: boolean);
    get cleaningTime(): number;
    set cleaningTime(input: number);
    get recordHotelID(): string;
    set recordHotelID(input: string);
    get cleanerID(): string;
    set cleanerID(input: string);
    register(): Promise<void>;
    fetchScores(): Promise<ScoreModel[]>;
    fetchUserMonthScoresByRoomID(userID: Scalars['ID'], roomID: Scalars['ID']): Promise<ScoreModel[]>;
    switchIfScored(): Promise<void>;
}
