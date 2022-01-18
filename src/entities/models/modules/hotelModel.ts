import { Scalars, HotelMast } from '../..';
import { generateUUID } from '../../../util';
import { BaseModel } from './_baseModel';

export class HotelModel extends BaseModel<HotelMast> {
    get hotelID() {
        return this.mast.hotelID;
    }
    get hotelName() {
        return this.mast.hotelName;
    }
    set hotelName(input: string) {
        this.mast.hotelName = input;
    }
    async register() {
        this.mast = await this.repositoryContainer.hotelMastRepository.addHotel(this.mast)
    }
}