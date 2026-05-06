import dotenv from "dotenv";
dotenv.config();

import express from "express";
import ConnectDb from "./config/db.js";
import noteRoute from "./routes/route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://notebook-fnd.onrender.com"],
    credentials: true,
  }),
);

app.use("/api/note", noteRoute);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Running" });
});
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await ConnectDb();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
