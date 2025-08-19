const express = require("express");
const http = require("http");
const apiRoutes = require("./routes");
const { ServerConfig } = require("./config");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/dbConfig");
const runExpiredPostCleanup = require("./utils/cronJob");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",          // local frontend
  "https://gbpiet-desk.vercel.app", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error(`CORS policy does not allow access from origin: ${origin}`),
          false
        );
      }
    },
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ❌ remove this if using only Cloudinary
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
    runExpiredPostCleanup(); // optional cron job
    server.listen(ServerConfig.PORT, () => {
      console.log(`🚀 Server listening on port ${ServerConfig.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1);
  }
}

startServer();
