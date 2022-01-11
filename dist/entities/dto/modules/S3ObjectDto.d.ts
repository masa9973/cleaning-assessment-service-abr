import { S3Object } from '../../type';
export declare class S3ObjectDto {
    private s3Object;
    constructor(s3Object: S3Object);
    get url(): string;
    setObject(s3Object: S3Object): void;
}
