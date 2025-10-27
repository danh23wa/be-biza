import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import banBidaRoutes from "./routes/banBida.Routes.js";
import nguoiDungRoutes from "./routes/nguoiDung.Routes.js";
import datBanRoutes from "./routes/datBan.Routes.js";
import hoaDonRoutes from "./routes/hoaDon.Routes.js";
import database from "./config/database.js";
import { specs, swaggerUi } from "./config/swagger.config.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Bàn Bida API Documentation'
}));

// API Routes
app.use("/api/banbida", banBidaRoutes);
app.use("/api/nguoidung", nguoiDungRoutes);
app.use("/api/datban", datBanRoutes);
app.use("/api/hoadon", hoaDonRoutes);

// middleware xử lý lỗi toàn cục
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Initialize database connection before starting server
const startServer = async () => {
  try {
    await database.connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
