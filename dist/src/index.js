"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const websocket_1 = require("websocket");
const cuid2_1 = require("@paralleldrive/cuid2");
const PORT = 4000;
const wsServer = new websocket_1.server({
    httpServer: server_1.default,
});
server_1.default.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
const participantsByEventID = {};
wsServer.on("request", (request) => {
    const connection = request.accept();
    const id = (0, cuid2_1.createId)();
    connection.on("message", (message) => {
        const { eventID, participantID, location } = JSON.parse(message.utf8Data);
        if (!eventID || !participantID || !location)
            return;
        if (!participantsByEventID[eventID]) {
            participantsByEventID[eventID] = [{ connection, id }];
        }
        else if (!participantsByEventID[eventID].find((peer) => peer.id === id)) {
            participantsByEventID[eventID].push({ connection, id });
        }
        participantsByEventID[eventID]
            .filter((participant) => participant.id !== id)
            .forEach((participant) => participant.connection.send(message.utf8Data));
    });
    connection.on("close", (code) => {
        Object.values(participantsByEventID).forEach((clients) => {
            const index = clients.findIndex((client) => client.id === id);
            if (index > -1) {
                clients.splice(index, 1);
            }
        });
    });
});
