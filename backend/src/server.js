const express = require("express");
const http = require("http");
const apiRoutes = require("./routes");
const bodyParser = require("body-parser");
const { ServerConfig } = require("./config");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/dbConfig");
const runExpiredPostCleanup = require("./utils/cronJob");
const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.text());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", apiRoutes);
app.use(errorHandler);

async function startServer() {
  try {
    await connectToDB();
    // console.log("✅ Connected to MongoDB");
    runExpiredPostCleanup();
    // await checkRedisConnection(); // Check Redis connection

    server.listen(ServerConfig.PORT, () => {
      console.log(`🚀 Server listening on port ${ServerConfig.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1);
  }
}
startServer();
