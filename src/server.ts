import http from "http";
import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

// request parsing
app.use(express.urlencoded({ extended: false }));
// json data
app.use(express.json());

// define cors
app.use(cors());

// define routes if needed
// app.use("/", routes);

// error handling
app.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);

export default httpServer;
