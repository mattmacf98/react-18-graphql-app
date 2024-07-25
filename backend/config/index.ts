import dotenv from "dotenv";
import config from "./config.json";
dotenv.config();

type DB = {
    dialect: string,
    host: string,
    port: string,
    database: string,
    username: string,
    password: string
}
type Security = {
    secretKey: string,
    expiresIn: string
}
type Server = {
    port: number
}

const db: DB = {
    dialect: process.env.DB_DIALECT || '',
    port: process.env.DB_PORT || '',
    host: process.env.DB_HOST || '',
    database: process.env.DB_DATABASE || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || ''
};

const { security, server } = config;
export const $db: DB = db;
export const $security: Security =  security;
export const $server: Server = server;