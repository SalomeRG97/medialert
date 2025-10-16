import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db/connection.js";
import authRoutes from "./routes/auth.routes.js";
import { seedDatabase } from "../seed.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

async function startServer(retries = 10, delay = 5000) {
  while (retries) {
    try {
      console.log("⏳ Intentando conectar a la base de datos...");
      await sequelize.authenticate();
      console.log("✅ Conexión con la base de datos establecida");

      await sequelize.sync({ alter: true });
      console.log("✅ Base de datos sincronizada correctamente");

      await seedDatabase();

      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => {
        console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
      });
      break;
    } catch (error) {
      console.error(`❌ Error al conectar con DB: ${error.message}`);
      retries -= 1;
      if (!retries) {
        console.error(
          "❌ No se pudo conectar con la base de datos. Saliendo..."
        );
        process.exit(1);
      }
      console.log(
        `🔁 Reintentando en ${
          delay / 1000
        } segundos... (${retries} intentos restantes)`
      );
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

startServer();
