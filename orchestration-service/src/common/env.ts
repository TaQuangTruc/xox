import * as dotenv from 'dotenv';

dotenv.config();

export const MAIN_PORT = process.env.MAIN_PORT || 3000;

export const PROJECT_NAME = process.env.PROJECT_NAME || "";
export const DB_USER = process.env.DB_USER || "";
export const DB_PASS = process.env.DB_PASS || "";
export const DB_NAME = process.env.DB_NAME || "";
export const DB_HOST = process.env.DB_HOST || "";
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_DIALECT = process.env.DB_DIALECT;
export const DB_SSL = process.env.DB_SSL;
export const NODE_ENV = process.env.NODE_ENV;
