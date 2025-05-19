import express, { json, urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import productRouter from "./routes/products/index.js";
import authRouter from "./routes/auth/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import serverless from "serverless-http";

const port = process.env.PORT || 3030;

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(urlencoded({ extended: false }));
app.use(json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export const handler = serverless(app);