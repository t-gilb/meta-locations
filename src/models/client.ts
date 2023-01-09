import { connection } from "websocket";

export type Client = {
  connection: connection;
  id: string;
};
