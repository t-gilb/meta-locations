/// <reference types="node" />
import http from "http";
declare const httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
export default httpServer;
