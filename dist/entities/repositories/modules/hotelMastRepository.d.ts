import { Scalars, HotelMast } from '../../type';
export interface IHotelMastRepository {
    addHotel(input: HotelMast): Promise<HotelMast>;
    fetchHotelByHotelID(hotelID: Scalars['ID']): Promise<HotelMast | null>;
}
