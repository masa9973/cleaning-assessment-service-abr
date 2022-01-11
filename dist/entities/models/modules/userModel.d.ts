import { UserMast } from '../..';
import { RecordModel } from './recordModel';
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
    /**
     * このユーザーの清掃記録を取得する
     * managerの清掃記録も見れる→cleanerModelに実装すべき？
     * @returns
     */
    fetchMyRecords(): Promise<RecordModel[]>;
}
