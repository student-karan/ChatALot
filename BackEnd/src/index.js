import dotenv from "dotenv";
if(process.env.NODE_ENV != "Production"){
dotenv.config();
}
import express from "express";
import fs from "node:fs"
import { app, server} from "./lib/socket.js";
import { connectdb } from "./lib/db.js";
import authRouter from "./routes/auth_Route.js";
import messageRouter from "./routes/message_Route.js";
import cookieParser from "cookie-parser";
import path from "path";
const __dirname = path.resolve();
import cors from "cors";
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "Production") {
  const frontendDistPath = path.join(__dirname, "../FrontEnd/dist");
  const frontendAssetsPath = path.join(frontendDistPath, "assets");

  app.use(express.static(frontendDistPath));

  app.get("*", async (req, res) => {
    try {
      const files = await fs.promises.readdir(frontendAssetsPath);
      const jsFile = files.find(file => file.endsWith(".js"));

      if (jsFile) {
        res.sendFile(path.join(frontendDistPath, "index.html"));
      } else {
        res.status(500).send("Error: Main JavaScript bundle not found.");
      }
    } catch (error) {
      console.error("Error reading assets directory:", error);
      res.status(500).send("Error serving frontend.");
    }
  });
}

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).send(message);
})


server.listen(port, () => {
  console.log("app listening on port:" + port);
  connectdb();
})