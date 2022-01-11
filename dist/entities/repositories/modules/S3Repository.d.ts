import { S3Object } from '../../type';
export interface IS3Repository {
    fetchObject<T>(s3Object: S3Object): Promise<T>;
    addFile(uniquePath: string, file: File): Promise<S3Object>;
    getSampleImage(): S3Object;
}
