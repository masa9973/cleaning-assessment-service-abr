import { S3Object } from '../../type';

export class S3ObjectDto {
    constructor(private s3Object: S3Object) {}

    get url() {
        return this.s3Object.url;
    }
    setObject(s3Object: S3Object) {
        this.s3Object = s3Object;
    }
}