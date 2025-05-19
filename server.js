import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.route.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();

const swaggerDocument = YAML.load("./swagger.yml");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
