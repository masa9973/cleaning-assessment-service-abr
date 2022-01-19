"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelModel = void 0;
const util_1 = require("../../../util");
const _baseModel_1 = require("./_baseModel");
class HotelModel extends _baseModel_1.BaseModel {
    get hotelID() {
        return this.mast.hotelID;
    }
    get hotelName() {
        return this.mast.hotelName;
    }
    set hotelName(input) {
        this.mast.hotelName = input;
    }
    async register() {
        this.mast.hotelID = util_1.generateUUID();
        this.mast = await this.repositoryContainer.hotelMastRepository.addHotel(this.mast);
    }
}
exports.HotelModel = HotelModel;
