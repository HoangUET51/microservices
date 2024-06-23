import * as dotenv from "dotenv";

dotenv.config();

export const Config = {
  APP_PORT: Number(process.env.APP_PORT),
  APP_HOST: String(process.env.APP_HOST),
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
