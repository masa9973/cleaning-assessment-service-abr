import { Scalars, HotelMast } from '../..';
import { BaseModel } from './_baseModel';
export declare class HotelModel extends BaseModel<HotelMast> {
    static getBlanc(hotelID: Scalars['ID'], hotelName: Scalars['String']): HotelMast;
    get hotelID(): string;
    get hotelName(): string;
    set hotelName(input: string);
    register(): Promise<void>;
}
