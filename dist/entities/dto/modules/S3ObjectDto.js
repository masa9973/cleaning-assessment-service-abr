"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ObjectDto = void 0;
class S3ObjectDto {
    constructor(s3Object) {
        this.s3Object = s3Object;
    }
    get url() {
        return this.s3Object.url;
    }
    setObject(s3Object) {
        this.s3Object = s3Object;
    }
}
exports.S3ObjectDto = S3ObjectDto;
