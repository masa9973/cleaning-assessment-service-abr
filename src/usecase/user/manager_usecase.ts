import { RepositoryContainer, ModelFactory, RoomMast, generateUUID, ScoreItemMast, RoomModel, compareNumAsc, compareNumDesc, ScoreItemModel, RecordMast } from '../..';

export class ManagerUsecase {
    constructor(private repositoryContainer: RepositoryContainer,//
        private modelFactory: ModelFactory
        
        ) {}

    // ユーザー登録する
    // ====================
    // room
    // ====================
    // 部屋を作成
    async createNewRoom(hotelID: string, roomName: string): Promise<RoomMast> {
        const mast: RoomMast = {
            roomID: generateUUID(),
            roomName: roomName,
            createdAt: new Date().getTime(),
            hotelID: hotelID
        }
        return this.repositoryContainer.roomMastRepository.addRoom(mast)
    }
    // 部屋を一覧で見る
    async fetchAllRoom(hotelID: string): Promise<RoomModel[]> {
        const res = await this.repositoryContainer.roomMastRepository.fetchRoomsByHotelID(hotelID)
        const models = res.map((item) => this.modelFactory.RoomModel(item))
        return models.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt))
    }
    // ====================
    // scoreItems
    // ====================
    // 評価項目を作成
    async createNewScoreItem(hotelID: string, scoreItemName: string): Promise<ScoreItemMast> {
        const mast: ScoreItemMast = {
            scoreItemID: generateUUID(),
            scoreItemName: scoreItemName,
            createdAt: new Date().getTime(),
            hotelID: hotelID
        }
        return this.repositoryContainer.scoreItemMastRepository.addScoreItem(mast)
    }
    // 評価項目を取得
    async fetchAllScoreItems(hotelID: string): Promise<ScoreItemModel[]> {
        const res = await this.repositoryContainer.scoreItemMastRepository.fetchScoreItemsByHotelID(hotelID)
        const models = res.map((item) => this.modelFactory.ScoreItemModel(item))
        return models.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt))
    }
    // クリーナーをアサイン
    // 1. 今日未清掃の部屋を取得
    async fetchYetCleanedRoom(hotelID):Promise<RoomModel[]> {
        // 全部屋を取得
        const allModel = await this.fetchAllRoom(hotelID)
        // アサインしてない部屋を取得
        return allModel.filter((item) => item)
    }
    // 2. 清掃者を取得
    // 3. アサイン
    // クリーナーを評価
    // クリーナーの評価を確認する

    // private
}