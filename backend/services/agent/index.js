import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/agent.route.js";
import path from "path";
dotenv.config();
const app = express();
app.use(express.json());
// Serve locally generated images
app.use("/generated-images", express.static("generated-images"));
// Serve locally generated files
app.use(
  "/generated-files",
  express.static(path.resolve(process.cwd(), "generated-files")),
);
const port = process.env.PORT;

app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err);

  if (err.status) {
    return res.status(err.status).json(err.data);
  }

  return res.status(500).json({
    success: false,

    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  connectDB();
  console.log(`agent service running on ${port}`);
});
