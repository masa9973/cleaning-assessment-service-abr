import { BaseCacheAdaptor } from '..';
import { IRecordMastRepository } from '../..';
import { RecordMast } from '../../entities';

type HotelIDCache = {
    [hotelID: string]: {
        mast: RecordMast,
        createdAt: number
    }
}

type CleanerIDCache = {
    [cleanerID: string]: {
        mast: RecordMast,
        createdAt: number
    }
}

type RoomIDCache = {
    [roomID: string]: {
        mast: RecordMast,
        createdAt: number
    }
}

type RecordIDCache = {
    [recordID: string]: {
        mast: RecordMast,
        createdAt: number
    }
}

type CleanerIDRoomIDCache = {
    [cleanerID: string]: {
        [roomID: string]: {
            mast: RecordMast,
            createdAt: number,
        }
    }
}

export class RecordMastRepositoryCacheAdaptor extends BaseCacheAdaptor implements IRecordMastRepository {
    private hotelIDCache: HotelIDCache = {}
    private cleanerIDCache: CleanerIDCache = {}
    private roomIDCache: RoomIDCache = {}
    private recordIDCache: RecordIDCache = {}
    private cleanerIDRoomIDCache: CleanerIDRoomIDCache = {}

    cacheClear(): void {
        this.hotelIDCache = {}
        this.cleanerIDCache = {}
        this.roomIDCache = {}
        this.recordIDCache = {}
        this.cleanerIDRoomIDCache = {}
    }
    async addRecord(input: RecordMast): Promise<RecordMast> {
        const res = await this.addRecord(input)

        return res
    }
    async updateRecord(input: RecordMast): Promise<RecordMast> {
        throw new Error('Method not implemented.');
    }
    async fetchRecordsByCleanerID(cleanerID: string): Promise<RecordMast[]> {
        throw new Error('Method not implemented.');
    }
    async fetchRecordsByRoomID(cleaningRoomID: string): Promise<RecordMast[]> {
        throw new Error('Method not implemented.');
    }
    async fetchAllRecordsByHotelID(recordHotelID: string): Promise<RecordMast[]> {
        throw new Error('Method not implemented.');
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
    private addCache(input: RecordMast) {
        const now = new Date().getTime()
        this.hotelIDCache[input.recordHotelID] = {
            mast: input,
            createdAt: now
        }
        this.cleanerIDCache[input.cleanerID] = {
            mast: input,
            createdAt: now
        }
        this.roomIDCache[input.cleaningRoomID] = {
            mast: input,
            createdAt: now
        }
        this.recordIDCache[input.recordID] = {
            mast: input,
            createdAt: now
        }
        this.cleanerIDRoomIDCache[input.cleanerID][input.cleaningRoomID] = {
            mast: input,
            createdAt: now
        }
    }
}