import { BaseCacheAdaptor } from '..';
import { IRecordMastRepository } from '../..';
import { RecordMast } from '../../entities';

type HotelIDRecordDateCache = {
    [hotelID: string]: {
        [recordDate: string]: RecordMast
    }
}

type HotelIDCache = {
    [hotelID: string]: RecordMast
}

type CleanerIDCache = {
    [cleanerID: string]: RecordMast
}

type RecordIDCache = {
    [recordID: string]: RecordMast | null
}

type CleanerIDRoomIDCache = {
    [cleanerID: string]: {
        [roomID: string]: RecordMast
    }
}

export class RecordMastRepositoryCacheAdaptor extends BaseCacheAdaptor implements IRecordMastRepository {
    constructor(
        private repository: IRecordMastRepository
    ){
        super();
    }
    private hotelIDCaches: HotelIDCache[] = []
    private hotelIDRecordDateCaches: HotelIDRecordDateCache[] = []
    private cleanerIDCaches: CleanerIDCache[] = []
    private recordIDCache: RecordIDCache = {}
    private cleanerIDRoomIDCache: CleanerIDRoomIDCache = {}
    cacheClear(): void {
        this.hotelIDCaches = []
        this.hotelIDRecordDateCaches  = []
        this.cleanerIDCaches = []
        this.recordIDCache = {}
        this.cleanerIDRoomIDCache = {}
    }
    async addRecord(input: RecordMast): Promise<RecordMast> {
        // 全キャッシュを保存
        this.addHotelIDCache(input)
        this.addHotelIDRecordDateCache(input)
        this.addRecordIDCache(input)
        const res = await this.repository.addRecord(input)
        return res
    }
    async updateRecord(input: RecordMast): Promise<RecordMast> {
        this.addHotelIDCache(input)
        this.addHotelIDRecordDateCache(input)
        const res = await this.repository.updateRecord(input)
        return res
    }
    async fetchAllRecordsByHotelID(recordHotelID: string): Promise<RecordMast[]> {
        // キャッシュがあるならキャッシュを返す
        if (this.hotelIDCaches) {
            // キャッシュをRecordMastの型にする
            return this.hotelIDCaches.map((item) => item[recordHotelID])
        }
        // ないならキャッシュを追加
        const res = await this.repository.fetchAllRecordsByHotelID(recordHotelID)
        this.addHotelIDCaches(res)
        return res
    }
    async fetchRecordsByDate(recordHotelID: string, recordDate: string): Promise<RecordMast[]> {
        if (this.hotelIDRecordDateCaches) {
            return this.hotelIDRecordDateCaches.map((item) => item[recordHotelID][recordDate])
        }
        const res = await this.repository.fetchRecordsByDate(recordHotelID, recordDate)
        this.addHotelIDRecordDateCaches(res)
        return res
    }
    async fetchRecordByRecordID(recordID: string): Promise<RecordMast | null> {
        if (this.recordIDCache) {
            return this.recordIDCache[recordID]
        }
        const res = await this.repository.fetchRecordByRecordID(recordID)
        this.addRecordIDCache(res)
        return res
    }
    /**
     * ここ時間ある時実装しよう
     * @param cleanerID 
     * @param cleaningRoomID 
     * @param from 
     * @param to 
     * @returns 
     */
    async fetchTermRecordsByCleanerIDAndRoomID(cleanerID: string, cleaningRoomID: string, from: string, to: string): Promise<RecordMast[]> {
        const res = await this.repository.fetchTermRecordsByCleanerIDAndRoomID(cleanerID, cleaningRoomID, from, to)
        return res
    }
    
    // private
    private addHotelIDCaches(input: RecordMast[]) {
        input.map((item) => {
            this.addHotelIDCache(item)
        })
    }

    private addHotelIDCache(input: RecordMast) {
        this.hotelIDCaches.push({[input.recordHotelID]: input})
    }

    private addHotelIDRecordDateCache(input: RecordMast) {
        const arg: HotelIDRecordDateCache = {
            [input.recordHotelID]: {
                [input.recordDate]: input
            }
        }
        this.hotelIDRecordDateCaches.push(arg)
    }

    private addHotelIDRecordDateCaches(input: RecordMast[]) {
        input.map((item) => {
            this.addHotelIDRecordDateCache(item)
        })
    }

    private addRecordIDCache(input: RecordMast | null) {
        this.recordIDCache[input!.recordID] = input
    }
}