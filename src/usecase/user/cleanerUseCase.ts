import { ErrorCode, RepositoryContainer, RoomMast, Scalars } from '../../entities';
import { HotelModel, ModelFactory, RoomModel, ScoreModel } from '../../entities/models';
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
    async fetchAllRecordsByHotelID(recordHotelID: Scalars['ID']) {
        const records = await this.repositoryContainer.recordMastRepository.fetchAllRecordsByHotelID(recordHotelID);
        return records.map((record) => this.modelFactory.RecordModel(record)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

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

    // いる
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
    // いる
    async fetchScoresByRecordID(recordID: Scalars['ID']): Promise<ScoreModel[]> {
        const res = await this.repositoryContainer.scoreMastRepository.fetchScoresByRecordID(recordID);
        return res.map((item) => this.modelFactory.ScoreModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

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

    // いる
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

    // roomIDとユーザーID入れたらそのユーザーの部屋の平均清掃時間文字列を返す関数
    // いらんかも
    public async roomIDAndUserIDToAverageStringTime(userID: Scalars['ID'], roomID: Scalars['ID']) {
        const user = await this.fetchUserModelByUserID(userID);
        const scoredRecords = await user.fetchScoredRecords();
        const recordsByRoomID = scoredRecords.filter((item) => item.cleaningRoomID === roomID);
        const cleaningTimeResults = [];
        for (let i = 0; i < recordsByRoomID.length; i++) {
            cleaningTimeResults[i] = recordsByRoomID[i].cleaningTime;
        }
        if (cleaningTimeResults.length === 0) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        const averageTime = cleaningTimeResults.reduce((a, b) => a + b) / cleaningTimeResults.length;
        return millisecondToStringTime(averageTime);
    }

    // 項目IDとユーザーIDを入れたらそのユーザーの特定の項目の平均スコアを返す関数
    public async scoreItemIDAndUserIDToAverageScore(userID: Scalars['ID'], scoreItemID: Scalars['ID']) {
        // ここでレコードIDで一意に特定したい
        const user = await this.fetchUserModelByUserID(userID);
        const scoredRecords = await user.fetchScoredRecords();
        const scoredRecordIDs = [];
        // このIDのスコアが一括で欲しい
        for (let i = 0; i < scoredRecords.length; i++) {
            scoredRecordIDs[i] = scoredRecords[i].recordID;
        }
        const scoresFromID = [];
        for (let i = 0; i < scoredRecordIDs.length; i++) {
            scoresFromID[i] = await this.fetchScoresByRecordID(scoredRecordIDs[i]);
        }
        const scores = scoresFromID.reduce((a, b) => [...a, ...b], []);
        // scores=このユーザーのスコアの一次元配列
        // 受け取ったIDでフィルターをかける
        const selectedItemScores = scores.filter((score) => score.scoreItemID === scoreItemID);
        const selectedScoresValues = [];
        for (let i = 0; i < selectedItemScores.length; i++) {
            selectedScoresValues[i] = selectedItemScores[i].score;
        }
        if (selectedScoresValues.length === 0) {
            throw new ChillnnTrainingError(ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        return selectedScoresValues.reduce((a, b) => a + b) / selectedScoresValues.length;
    }
}
