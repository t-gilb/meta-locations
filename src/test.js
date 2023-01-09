const setupWebSocketConnection = () => {
  const connection = new WebSocket("ws://127.0.0.1:4000");

  connection.onopen = () => {
    console.log("connected");
  };

  connection.onerror = (error) => {
    console.log(`An error occured: ${error}`);
  };

  connection.onmessage = (message) => {
    console.log("message received");
  };
};

setupWebSocketConnection();
