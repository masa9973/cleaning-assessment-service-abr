import { HotelMast } from '../..';
import { BaseModel } from './_baseModel';
export declare class HotelModel extends BaseModel<HotelMast> {
    get hotelID(): string;
    get hotelName(): string;
    set hotelName(input: string);
    register(): Promise<void>;
}
