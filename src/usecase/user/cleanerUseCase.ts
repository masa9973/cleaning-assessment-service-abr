import { fail } from 'assert';
import { ErrorCode, RecordMast, RepositoryContainer, Role, Scalars } from '../../entities';
import { ModelFactory } from '../../entities/models';
import { RecordModel } from '../../entities/models/modules/recordModel';
import { ChillnnTrainingError, compareNumDesc } from '../../util';

export class CleanerUsecase {
    constructor(private repositoryContainer: RepositoryContainer, private modelFactory: ModelFactory) {}

    async fetchMyUserModel() {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            // 存在しない場合
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(me);
    }

    async fetchUserModelByUserID(userID: Scalars['ID']) {
        const user = await this.repositoryContainer.userMastRepository.fetchUserMastByUserID(userID);
        if (!user) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(user);
    }

    async fetchAllUser() {
        const users = await this.repositoryContainer.userMastRepository.fetchAllUser();
        return users.map((user) => this.modelFactory.UserModel(user)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    // 新しいレコードを作成
    async createNewRecord(): Promise<RecordModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        } else {
            // if (this.modelFactory.UserModel(me).role === 'cleaner') {}
            const userID = this.modelFactory.UserModel(me).userID;
            return this.modelFactory.RecordModel(RecordModel.getBlanc(userID, '', 0, 0), {
                isNew: true,
            });
        }
    }

    // 全レコードを取得
    async fetchAllRecords() {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecords();
        return records.map((record) => this.modelFactory.RecordModel(record)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    // 任意のユーザーのレコードを取得
    async fetchRecordsByCleanerID(userID: Scalars['ID']): Promise<RecordModel[]> {
        const records = await this.repositoryContainer.recordMastRepository.fetchRecordsByCleanerID(userID)
        return records.map((item) => this.modelFactory.RecordModel(item))
    }
}