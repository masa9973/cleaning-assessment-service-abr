import { Scalars, HotelMast } from '../../type'

export interface IHotelMastRepository {
    addHotel(input: HotelMast): Promise<HotelMast>
}