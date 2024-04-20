import dotenv from 'dotenv';
import path from 'path';

dotenv.config()
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || ""
export const DATABASE_URL = process.env.DATABASE_URL || ""
export const EXPIRES_IN = "1d"
export const SERVER_PORT = process.env.SERVER_PORT;

export const MAIL_HOST = process.env.MAIL_HOST || ""
export const MAIL_USER = process.env.MAIL_USER || ""
export const MAIL_PASS = process.env.MAIL_PASS || ""

export const PAGINATION_COUNT = 50;

export const filesPath = path.join(__dirname, "../files/");

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || ""
export const S3_ENDPOINT_URL = process.env.S3_ENDPOINT_URL || ""
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || ""
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY || ""