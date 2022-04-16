import { ErrorCode, RepositoryContainer, RoomMast, Scalars } from '../../entities';
import { ModelFactory, RoomModel, ScoreModel } from '../../entities/models';
import { RecordModel } from '../../entities/models/modules/recordModel';
import { ScoreItemModel } from '../../entities/models/modules/scoreItemModel';
import { ChillnnTrainingError, compareNumDesc, millisecondToStringTime } from '../../util';

export class CleanerUsecase {
    constructor(private repositoryContainer: RepositoryContainer, private modelFactory: ModelFactory) {}

    // =======================
    // user
    // =======================
    async fetchMyUserModel() {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            // 存在しない場合
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(me);
    }

    // いる
    async fetchUserModelByUserID(userID: Scalars['ID']) {
        const user = await this.repositoryContainer.userMastRepository.fetchUserMastByUserID(userID);
        if (!user) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.UserModel(user);
    }

    // =======================
    // record
    // =======================
    async createNewRecord(): Promise<RecordModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        } else {
            const recordHotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof recordHotelID === 'string') {
                return this.modelFactory.RecordModel(RecordModel.getBlanc('', '', 0, 0, 0, recordHotelID), {
                    isNew: true,
                });
            } else {
                throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }

    /**
     * 清掃時間の登録に使う（クリ）
     * @param recordID 
     * @returns 
     */
    async fetchRecordByRecordID(recordID: Scalars['ID']) {
        const record = await this.repositoryContainer.recordMastRepository.fetchRecordByRecordID(recordID);
        if (!record) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.RecordModel(record);
    }
    // =======================
    // room
    // =======================
    async createNewRoom(roomName: Scalars['String']): Promise<RoomModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        } else {
            const hotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof hotelID === 'string') {
                return this.modelFactory.RoomModel(RoomModel.getBlanc(roomName, hotelID), {
                    isNew: true,
                });
            } else {
                throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }

    /**
     * 部屋の名前を出すのに使う（マネ、クリ）
     * @param roomID 
     * @returns 
     */
    async fetchRoomByRoomID(roomID: Scalars['ID']): Promise<RoomModel | null> {
        const room = await this.repositoryContainer.roomMastRepository.fetchRoomByRoomID(roomID);
        if (!room) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return this.modelFactory.RoomModel(room);
    }

    // =======================
    // score
    // =======================

    // =======================
    // scoreItem
    // =======================
    async createNewScoreItem(scoreItemName: Scalars['String']): Promise<ScoreItemModel> {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        } else {
            const hotelID = this.modelFactory.UserModel(me).userHotelID;
            if (typeof hotelID === 'string') {
                return this.modelFactory.ScoreItemModel(ScoreItemModel.getBlanc(scoreItemName, hotelID), {
                    isNew: true,
                });
            } else {
                throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
            }
        }
    }

    /**
     * レコードのスコアを表示するのに使う（マネ、クリ）
     * @param scoreItemID 
     * @returns 
     */
    async fetchScoreItemByScoreItemID(scoreItemID: Scalars['ID']): Promise<ScoreItemModel | null> {
        const scoreItem = await this.repositoryContainer.scoreItemMastRepository.fetchScoreItemByScoreItemID(scoreItemID);
        return this.modelFactory.ScoreItemModel(scoreItem!);
    }

    // レコードの文字列平均時間を返す関数
    // いる
    public recordsToAverageStringTime(records: RecordModel[]): string {
        const scoredRecords = records.filter((record) => record.ifScored === true);
        const timeResults = [];
        for (let i = 0; i < scoredRecords.length; i++) {
            timeResults[i] = scoredRecords[i].cleaningTime;
        }
        if (timeResults.length === 0) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        const averageResultTime = timeResults.reduce((a, b) => a + b) / timeResults.length;
        return millisecondToStringTime(averageResultTime);
    }

    // レコードを入れたらその清掃時間の配列を返す関数（グラフ用）
    public recordsToTimeArray(records: RecordModel[]) {
        const scoredRecords = records.filter((item) => item.ifScored === true)
        const timeResults = []
        for (let i = 0; i < scoredRecords.length; i++) {
            timeResults[i] = scoredRecords[i].cleaningTime;
        }
        if (timeResults.length === 0) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return timeResults
    }
}
