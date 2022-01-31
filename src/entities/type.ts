/* tslint:disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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










export enum ErrorCode {
  chillnnTraining_400_badRequest = 'chillnnTraining_400_badRequest',
  chillnnTraining_401_notSignIn = 'chillnnTraining_401_notSignIn',
  chillnnTraining_404_resourceNotFound = 'chillnnTraining_404_resourceNotFound',
  chillnnTraining_500_systemError = 'chillnnTraining_500_systemError'
}

export type HotelMast = {
  hotelID: Scalars['ID'];
  hotelName: Scalars['String'];
};

export type HotelMastInput = {
  hotelID: Scalars['ID'];
  hotelName: Scalars['String'];
};

export type RecordMast = {
  recordID: Scalars['ID'];
  cleanerID: Scalars['ID'];
  cleaningRoomID: Scalars['ID'];
  startAt: Scalars['AWSTimestamp'];
  finishedAt: Scalars['AWSTimestamp'];
  createdAt: Scalars['AWSTimestamp'];
  ifScored: Scalars['Boolean'];
  cleaningTime: Scalars['Int'];
  recordHotelID: Scalars['ID'];
  recordDate: Scalars['String'];
};

export type RecordMastInput = {
  recordID: Scalars['ID'];
  cleanerID: Scalars['ID'];
  cleaningRoomID: Scalars['ID'];
  startAt: Scalars['AWSTimestamp'];
  finishedAt: Scalars['AWSTimestamp'];
  createdAt: Scalars['AWSTimestamp'];
  ifScored: Scalars['Boolean'];
  cleaningTime: Scalars['Int'];
  recordHotelID: Scalars['ID'];
  recordDate: Scalars['String'];
};

export enum Role {
  manager = 'manager',
  cleaner = 'cleaner'
}

export type RoomMast = {
  roomID: Scalars['ID'];
  roomName: Scalars['String'];
  roomIcon?: Maybe<S3Object>;
  createdAt: Scalars['AWSTimestamp'];
  roomHotelID: Scalars['ID'];
};

export type RoomMastInput = {
  roomID: Scalars['ID'];
  roomName: Scalars['String'];
  roomIcon?: Maybe<S3ObjectInput>;
  createdAt: Scalars['AWSTimestamp'];
  roomHotelID: Scalars['ID'];
};

export type S3Object = {
  url: Scalars['AWSURL'];
  bucket: Scalars['String'];
  key: Scalars['String'];
  region: Scalars['String'];
};

export type S3ObjectInput = {
  url: Scalars['AWSURL'];
  bucket: Scalars['String'];
  key: Scalars['String'];
  region: Scalars['String'];
};

export type ScoreItemMast = {
  scoreItemID: Scalars['ID'];
  scoreItemName: Scalars['ID'];
  createdAt: Scalars['AWSTimestamp'];
  scoreItemHotelID: Scalars['ID'];
};

export type ScoreItemMastInput = {
  scoreItemID: Scalars['ID'];
  scoreItemName: Scalars['ID'];
  createdAt: Scalars['AWSTimestamp'];
  scoreItemHotelID: Scalars['ID'];
};

export type ScoreMast = {
  recordID: Scalars['ID'];
  scoreID: Scalars['ID'];
  scorerUserID: Scalars['ID'];
  score: Scalars['Int'];
  createdAt: Scalars['AWSTimestamp'];
  scoreItemID: Scalars['ID'];
  scoreCleanerID: Scalars['ID'];
  scoreRoomID: Scalars['ID'];
};

export type ScoreMastInput = {
  recordID: Scalars['ID'];
  scoreID: Scalars['ID'];
  scorerUserID: Scalars['ID'];
  score: Scalars['Int'];
  createdAt: Scalars['AWSTimestamp'];
  scoreItemID: Scalars['ID'];
  scoreCleanerID: Scalars['ID'];
  scoreRoomID: Scalars['ID'];
};

export type UserMast = {
  userID: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  userIcon?: Maybe<S3Object>;
  role: Scalars['String'];
  createdAt: Scalars['AWSTimestamp'];
  updatedAt: Scalars['AWSTimestamp'];
  userHotelID: Scalars['ID'];
};

export type UserMastInput = {
  userID: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  userIcon?: Maybe<S3ObjectInput>;
  role: Scalars['String'];
  createdAt: Scalars['AWSTimestamp'];
  updatedAt: Scalars['AWSTimestamp'];
  userHotelID: Scalars['ID'];
};
