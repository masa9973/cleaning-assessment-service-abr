// 現在使用していない、UserにIDつけて施設を識別している
import { Scalars, HotelMast } from '../..';
import { BaseModel } from './_baseModel';

export class HotelModel extends BaseModel<HotelMast> {
    static getBlanc(hotelID: Scalars['ID'], hotelName: Scalars['String']): HotelMast {
        return {
            hotelID,
            hotelName,
        }
    }
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