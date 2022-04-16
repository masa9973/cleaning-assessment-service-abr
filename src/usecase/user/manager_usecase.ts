import { compareNumDesc, HotelModel, ModelFactory, RecordModel, RepositoryContainer, RoomMast, RoomModel, timeStampToDateString, UserModel } from '../..';
import { UserUsecase } from './_user_base';

export class ManagerUsecase extends UserUsecase {
    constructor(
        repositoryContainer: RepositoryContainer, //
        modelFactory: ModelFactory,
    ){
        super(repositoryContainer, modelFactory);
    }
    // 部屋の登録
    async registerRoom(roomMast: RoomMast) {

    }
    // 全部屋を取得
    async fetchAllRoom(hotelID: string): Promise<RoomModel[]> {
        const res = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(hotelID);
        return res.map((item) => this.modelFactory.RoomModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }
    // アサインしてない部屋を取得
    async fetchYetAssignRoom(hotelID: string) {
        // 全部の部屋ID配列
        const allRoom = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(hotelID)
        const res = allRoom.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
        const allRoomID = []
        for (let i = 0; i < res.length; i++) {
            allRoomID[i] = res[i].roomID
        }
        // 今日アサインした部屋ID配列
        const assignRecords = await this.fetchTodayAllAssignRecords(hotelID)
        const assignRoomID: string | string[] = []
        for (let i = 0; i < assignRecords.length; i++) {
            assignRoomID[i] = assignRecords[i].cleaningRoomID
        }
        // ここで差分を抜き出す
        const yetAssignRoomID = allRoomID.filter(i => assignRoomID.indexOf(i) == -1)
        return yetAssignRoomID
    }

    // 評価項目の登録
    // スコアの登録
    // ユーザーの情報を見る
    // アサイン（レコードの作成）

    // アサイン済みのレコードを取得
    async fetchTodayAssignRecords(hotelID: string): Promise<RecordModel[]> {
        const today = timeStampToDateString(new Date().getTime());
        const records = await this.repositoryContainer.recordMastRepository.fetchRecordsByDate(hotelID, today);
        const filteredRecords = records.filter((item) => item.cleaningTime === 0);
        return filteredRecords.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }

    // 今日アサイン済みのレコードを清掃完了していないものも含めて取得する
    async fetchTodayAllAssignRecords(hotelID: string): Promise<RecordModel[]> {
        const today = timeStampToDateString(new Date().getTime());
        const records = await this.repositoryContainer.recordMastRepository.fetchRecordsByDate(hotelID, today);
        return records.map((item) => this.modelFactory.RecordModel(item)).sort((a, b) => compareNumDesc(a.createdAt, b.createdAt));
    }
}