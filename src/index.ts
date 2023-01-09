import httpServer from "./server";
import { IUtf8Message, server } from "websocket";
import { createId } from "@paralleldrive/cuid2";

// model
import { Client } from "./models/client";

const PORT: number = 4000;

const wsServer = new server({
  httpServer,
});

httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);

const participantsByEventID: Record<string, Client[]> = {};

wsServer.on("request", (request) => {
  const connection = request.accept();
  const id = createId();

  connection.on("message", (message) => {
    const { eventID, participantID, location } = JSON.parse(
      (message as IUtf8Message).utf8Data
    );

    if (!eventID || !participantID || !location) return;

    if (!participantsByEventID[eventID]) {
      participantsByEventID[eventID] = [{ connection, id }];
    } else if (!participantsByEventID[eventID].find((peer) => peer.id === id)) {
      participantsByEventID[eventID].push({ connection, id });
    }

    participantsByEventID[eventID]
      .filter((participant) => participant.id !== id)
      .forEach((participant) =>
        participant.connection.send((message as IUtf8Message).utf8Data)
      );
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
