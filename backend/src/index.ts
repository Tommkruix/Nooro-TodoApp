import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import routes from "./routes";
import { swaggerUi, swaggerSpec } from "./swagger";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const { v1 } = routes;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// v1 routes
app.use("/api/tasks", v1.todo);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
