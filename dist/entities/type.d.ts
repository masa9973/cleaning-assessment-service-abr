export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    AWSDate: string;
    AWSDateTime: string;
    AWSEmail: string;
    AWSIPAddress: any;
    AWSJSON: string;
    AWSPhone: string;
    AWSTime: string;
    AWSTimestamp: number;
    AWSURL: string;
};
export declare enum ErrorCode {
    chillnnTraining_400_badRequest = "chillnnTraining_400_badRequest",
    chillnnTraining_401_notSignIn = "chillnnTraining_401_notSignIn",
    chillnnTraining_404_resourceNotFound = "chillnnTraining_404_resourceNotFound",
    chillnnTraining_500_systemError = "chillnnTraining_500_systemError"
}
export declare type HotelMast = {
    hotelID: Scalars['ID'];
    hotelName: Scalars['String'];
};
export declare type HotelMastInput = {
    hotelID: Scalars['ID'];
    hotelName: Scalars['String'];
};
export declare type RecordMast = {
    recordID: Scalars['ID'];
    cleanerID: Scalars['ID'];
    cleaningRoomID: Scalars['ID'];
    startAt: Scalars['AWSTimestamp'];
    finishedAt: Scalars['AWSTimestamp'];
    createdAt: Scalars['AWSTimestamp'];
    ifScored: Scalars['Boolean'];
    cleaningTime: Scalars['Int'];
};
export declare type RecordMastInput = {
    recordID: Scalars['ID'];
    cleanerID: Scalars['ID'];
    cleaningRoomID: Scalars['ID'];
    startAt: Scalars['AWSTimestamp'];
    finishedAt: Scalars['AWSTimestamp'];
    createdAt: Scalars['AWSTimestamp'];
    ifScored: Scalars['Boolean'];
    cleaningTime: Scalars['Int'];
};
export declare enum Role {
    manager = "manager",
    cleaner = "cleaner"
}
export declare type RoomMast = {
    roomID: Scalars['ID'];
    roomName: Scalars['String'];
    roomIcon?: Maybe<S3Object>;
    createdAt: Scalars['AWSTimestamp'];
    hotelID: Scalars['ID'];
};
export declare type RoomMastInput = {
    roomID: Scalars['ID'];
    roomName: Scalars['String'];
    roomIcon?: Maybe<S3ObjectInput>;
    createdAt: Scalars['AWSTimestamp'];
    hotelID: Scalars['ID'];
};
export declare type S3Object = {
    url: Scalars['AWSURL'];
    bucket: Scalars['String'];
    key: Scalars['String'];
    region: Scalars['String'];
};
export declare type S3ObjectInput = {
    url: Scalars['AWSURL'];
    bucket: Scalars['String'];
    key: Scalars['String'];
    region: Scalars['String'];
};
export declare type ScoreMast = {
    recordID: Scalars['ID'];
    scoreID: Scalars['ID'];
    scorerUserID: Scalars['ID'];
    score: Scalars['Int'];
    createdAt: Scalars['AWSTimestamp'];
};
export declare type ScoreMastInput = {
    recordID: Scalars['ID'];
    scoreID: Scalars['ID'];
    scorerUserID: Scalars['ID'];
    score: Scalars['Int'];
    createdAt: Scalars['AWSTimestamp'];
};
export declare type UserMast = {
    userID: Scalars['ID'];
    name: Scalars['String'];
    email: Scalars['String'];
    userIcon?: Maybe<S3Object>;
    role: Scalars['String'];
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    hotelID: Scalars['ID'];
};
export declare type UserMastInput = {
    userID: Scalars['ID'];
    name: Scalars['String'];
    email: Scalars['String'];
    userIcon?: Maybe<S3ObjectInput>;
    role: Scalars['String'];
    createdAt: Scalars['AWSTimestamp'];
    updatedAt: Scalars['AWSTimestamp'];
    hotelID: Scalars['ID'];
};
