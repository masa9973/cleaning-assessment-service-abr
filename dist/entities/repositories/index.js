"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryContainer = void 0;
__exportStar(require("./modules/S3Repository"), exports);
__exportStar(require("./modules/recordMastRepository"), exports);
__exportStar(require("./modules/userMastRepository"), exports);
__exportStar(require("./modules/scoreMastRepository"), exports);
__exportStar(require("./modules/hotelMastRepository"), exports);
__exportStar(require("./modules/roomMastRepository"), exports);
__exportStar(require("./modules/scoreItemMastRepository"), exports);
class RepositoryContainer {
    constructor(s3Repository, userMastRepository, recordMastRepository, scoreMastRepository, hotelMastRepository, roomMastRepository, scoreItemMastRepository) {
        this.s3Repository = s3Repository;
        this.userMastRepository = userMastRepository;
        this.recordMastRepository = recordMastRepository;
        this.scoreMastRepository = scoreMastRepository;
        this.hotelMastRepository = hotelMastRepository;
        this.roomMastRepository = roomMastRepository;
        this.scoreItemMastRepository = scoreItemMastRepository;
    }
}
exports.RepositoryContainer = RepositoryContainer;
