import { RecordModel } from '..';
import { Scalars, UserMast } from '../..';
import { BaseModel } from './_baseModel';
export declare class UserModel extends BaseModel<UserMast> {
    get userID(): string;
    get createdAt(): number;
    get updatedAt(): number;
    get userIcon(): string;
    get name(): string;
    set name(input: string);
    get email(): string;
    set email(input: string);
    get role(): string;
    set role(input: string);
    get userHotelID(): string;
    set userHotelID(input: string);
    get isRegisterble(): boolean;
    /**
     * アイコン画像をセットする
     * @param file
     */
    setIcon(file: File): Promise<void>;
    /**
     * ユーザー情報を新規登録、または更新する
     */
    register(): Promise<void>;
    fetchSameHotelRooms(): Promise<import("./RoomModel").RoomModel[]>;
    fetchYetAssignRoom(): Promise<string[]>;
    /**
     * 清掃時間のグラフを作成するのに使う（マネ、クリ）
     * @param roomID
     * @returns
     */
    fetchUserMonthRecordsByRoomID(roomID: Scalars['ID']): Promise<RecordModel[]>;
    fetchSameHotelCleaner(): Promise<UserModel[]>;
    fetchSameHotelScoreItems(): Promise<import("./scoreItemModel").ScoreItemModel[]>;
    private fetchTodayAllAssignRecords;
    /**
     * スコア登録してない一覧を取得（マネ）
     * @returns
     */
    fetchUnscoredRecords(): Promise<RecordModel[]>;
    private fetchScoredRecords;
    roomIDToTimeArray(roomID: Scalars['ID']): Promise<number[]>;
    fetchAssignedRecords(): Promise<RecordModel[]>;
}
