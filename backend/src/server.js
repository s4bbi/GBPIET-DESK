const express = require("express");
const http = require("http");
const apiRoutes = require("./routes");
const bodyParser = require("body-parser");
const { ServerConfig } = require("./config");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/dbConfig");
const runExpiredPostCleanup = require("./utils/cronJob");
const path = require("path");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",               // local frontend
  "https://gbpiet-desk.vercel.app",      // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error(`CORS policy does not allow access from origin: ${origin}`),
          false
        );
      }
    },
    credentials: true, // ✅ Allow cookies, tokens, etc.
  })
);

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("The Server is running!!");
});

// ✅ API Routes
app.use("/api", apiRoutes);

// ✅ Global Error Handler
app.use(errorHandler);

// ✅ Start Server
async function startServer() {
  try {
    await connectToDB();
    runExpiredPostCleanup(); // Optional: your cron job
    server.listen(ServerConfig.PORT, () => {
      console.log(`🚀 Server listening on port ${ServerConfig.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1);
  }
}

startServer();
