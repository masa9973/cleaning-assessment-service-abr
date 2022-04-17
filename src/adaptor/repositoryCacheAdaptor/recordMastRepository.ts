import { BaseCacheAdaptor } from '..';
import { IRecordMastRepository } from '../..';
import { RecordMast } from '../../entities';

type HotelIDRecordDateCache = {
    [hotelID: string]: {
        [recordDate: string]: RecordMast[]
    }
}

type HotelIDCache = {
    [hotelID: string]: RecordMast
}

type CleanerIDCache = {
    [cleanerID: string]: RecordMast
}

type RecordIDCache = {
    [recordID: string]: RecordMast
}

type CleanerIDRoomIDCache = {
    [cleanerID: string]: {
        [roomID: string]: RecordMast
    }
}

export class RecordMastRepositoryCacheAdaptor extends BaseCacheAdaptor implements IRecordMastRepository {
    private hotelIDCaches: HotelIDCache[] = []
    private hotelIDRecordDateCache: HotelIDRecordDateCache = {}
    private cleanerIDCache: CleanerIDCache = {}
    private recordIDCache: RecordIDCache = {}
    private cleanerIDRoomIDCache: CleanerIDRoomIDCache = {}
    cacheClear(): void {
        this.hotelIDCaches = []
        this.hotelIDRecordDateCache  = {}
        this.cleanerIDCache = {}
        this.recordIDCache = {}
        this.cleanerIDRoomIDCache = {}
    }
    async addRecord(input: RecordMast): Promise<RecordMast> {
        this.addHotelIDCache(input)
        const res = await this.addRecord(input)
        return res
    }
    async updateRecord(input: RecordMast): Promise<RecordMast> {
        throw new Error('Method not implemented.');
    }
    async fetchAllRecordsByHotelID(recordHotelID: string): Promise<RecordMast[]> {
        // キャッシュがあるならキャッシュを返す
        if (this.hotelIDCaches) {
            // キャッシュをRecordMastの型にする
            return this.hotelIDCaches.map((item) => item[recordHotelID])
        }
        // ないならキャッシュを追加
        const res = await this.fetchAllRecordsByHotelID(recordHotelID)
        this.addHotelIDCaches(res)
        return res
    }
    async fetchRecordsByDate(recordHotelID: string, recordDate: string): Promise<RecordMast[]> {
        throw new Error('Method not implemented.');
    }
    async fetchRecordByRecordID(recordID: string): Promise<RecordMast | null> {
        throw new Error('Method not implemented.');
    }
    async fetchTermRecordsByCleanerIDAndRoomID(cleanerID: string, cleaningRoomID: string, from: string, to: string): Promise<RecordMast[]> {
        throw new Error('Method not implemented.');
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
}