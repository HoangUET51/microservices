import { createConnection } from "typeorm";
import dotenv from "dotenv";
import path from "path";

const initEnvironments = (): void => {
  dotenv.config({
    path: path.join(process.cwd(), "environments", ".env.common"),
  });
  dotenv.config({
    path: path.join(
      process.cwd(),
      "environments",
      `.env.${process.env.NODE_ENV}`,
    ),
  });
};

const initPostgresConnection = async () => {
  const connection = await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + "/entities/*.{js,ts}"],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
  });
  return connection;
};

export { initEnvironments, initPostgresConnection };
