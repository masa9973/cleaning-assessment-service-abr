// import { type } from 'os';
// import { compareNumAsc, compareNumDesc, IRoomMastRepository, RoomMast, Scalars } from '../..';

// type RoomCache = {
//     [roomID: string]: RoomMast | 'blanc' | undefined
// }

// type HotelCache = {
//     [hotelID: string]: {
//         [roomHotelID: string]: RoomMast,
//     } | null
// }

// export class RoomMastRepositoryCacheAdaptor implements IRoomMastRepository {
//     private roomCache: RoomCache = {}

//     constructor(private repository: IRoomMastRepository) {}

//     async addRoom(input: RoomMast): Promise<RoomMast> {
//         const res = await this.repository.addRoom(input)
//         this.addCacheEach(res.roomHotelID, res)
//         return res
//     }

//     async fetchRoomsByHotelID(roomHotelID: string): Promise<RoomMast[]> {
//         const cache = this.fetchCacheRooms(roomHotelID)
//         if (cache) return cache
//         const res = await this.repository.fetchRoomsByHotelID(roomHotelID)
//         this.addCacheBulk(roomHotelID, res)
//         return res.sort((a, b) => compareNumDesc(a.createdAt, b.createdAt))
//     }

//     // ===============================================================
//     // private
//     // ===============================================================
//     private addCacheEach(roomHotelID: Scalars['ID'], room: RoomMast | null) {
//         this.roomCache[roomHotelID] = room || 'blanc'
//         if (!room) return
//         if (this.roomCache) {
//             this.roomCache[roomHotelID] = room
//         }
//     }

//     private addCacheBulk(roomHotelID: Scalars['ID'], rooms: RoomMast[]) {
//         this.roomCache[roomHotelID] = {}
//         for (const room of rooms) {
//             this.addCacheEach(room.roomID, room)
//         }
//     }

//     private fetchRoom(roomID: Scalars['ID']) {
//         return this.roomCache[roomID]
//     }

//     private fetchCacheRooms(roomHotelID: Scalars['ID']) {
//         const roomCache = this.roomEachCache
//         if (!this.roomAllCache) return null
//         return Object.keys(this.roomAllCache)
//             .map((key) => {
//                 return this.roomAllCache![key]! as RoomMast
//             })
//             .sort((a, b) => compareNumDesc(a.createdAt, b.createdAt))
//     }
// }