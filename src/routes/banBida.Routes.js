import express from "express";
import banBidaController from "../controllers/banBida.Controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/banbida:
 *   get:
 *     summary: Lấy danh sách tất cả bàn bida
 *     tags: [BanBida]
 *     responses:
 *       200:
 *         description: Lấy danh sách bàn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BanBida'
 *                 message:
 *                   type: string
 */
router.get("/", banBidaController.getAllBanBida);

/**
 * @swagger
 * /api/banbida:
 *   post:
 *     summary: Thêm bàn bida mới
 *     tags: [BanBida]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - TenBan
 *               - GiaTheoGio
 *             properties:
 *               TenBan:
 *                 type: string
 *                 example: "Bàn VIP 1"
 *               GiaTheoGio:
 *                 type: number
 *                 example: 80000
 *               MoTa:
 *                 type: string
 *                 example: "Bàn VIP cao cấp"
 *     responses:
 *       201:
 *         description: Thêm bàn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post("/", banBidaController.addBanBida);

/**
 * @swagger
 * /api/banbida/{MaBan}:
 *   put:
 *     summary: Cập nhật trạng thái bàn
 *     tags: [BanBida]
 *     parameters:
 *       - in: path
 *         name: MaBan
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã bàn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - TrangThai
 *             properties:
 *               TrangThai:
 *                 type: integer
 *                 description: "1: Trống, 2: Đang sử dụng, 3: Đặt trước, 4: Bảo trì"
 *                 example: 1
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put("/:MaBan", banBidaController.updateTrangThaiBan);

export default router;