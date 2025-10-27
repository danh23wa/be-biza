import express from "express";
import datBanController from "../controllers/datBan.Controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/datban:
 *   get:
 *     summary: Lấy danh sách tất cả đặt bàn
 *     tags: [DatBan]
 *     responses:
 *       200:
 *         description: Lấy danh sách đặt bàn thành công
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
 *                     $ref: '#/components/schemas/DatBan'
 *                 message:
 *                   type: string
 */
router.get("/", datBanController.getAllDatBan);

/**
 * @swagger
 * /api/datban/nguoidung/{MaNguoiDung}:
 *   get:
 *     summary: Lấy lịch sử đặt bàn của người dùng
 *     tags: [DatBan]
 *     parameters:
 *       - in: path
 *         name: MaNguoiDung
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã người dùng
 *     responses:
 *       200:
 *         description: Lấy lịch sử đặt bàn thành công
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
 *                     $ref: '#/components/schemas/DatBan'
 *                 message:
 *                   type: string
 */
router.get("/nguoidung/:MaNguoiDung", datBanController.getDatBanByNguoiDung);

/**
 * @swagger
 * /api/datban/ban/{MaBan}:
 *   get:
 *     summary: Lấy lịch sử đặt bàn của một bàn cụ thể
 *     tags: [DatBan]
 *     parameters:
 *       - in: path
 *         name: MaBan
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã bàn
 *     responses:
 *       200:
 *         description: Lấy lịch sử đặt bàn thành công
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
 *                     $ref: '#/components/schemas/DatBan'
 *                 message:
 *                   type: string
 */
router.get("/ban/:MaBan", datBanController.getDatBanByBan);

/**
 * @swagger
 * /api/datban/{MaDatBan}:
 *   get:
 *     summary: Lấy thông tin đặt bàn theo ID
 *     tags: [DatBan]
 *     parameters:
 *       - in: path
 *         name: MaDatBan
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã đặt bàn
 *     responses:
 *       200:
 *         description: Lấy thông tin đặt bàn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/DatBan'
 *                 message:
 *                   type: string
 *       404:
 *         description: Không tìm thấy đặt bàn
 */
router.get("/:MaDatBan", datBanController.getDatBanById);

/**
 * @swagger
 * /api/datban:
 *   post:
 *     summary: Đặt bàn mới
 *     tags: [DatBan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - MaNguoiDung
 *               - MaBan
 *               - ThoiGianBatDau
 *             properties:
 *               MaNguoiDung:
 *                 type: integer
 *                 description: Mã người dùng
 *                 example: 1
 *               MaBan:
 *                 type: integer
 *                 description: Mã bàn
 *                 example: 1
 *               ThoiGianBatDau:
 *                 type: string
 *                 format: date-time
 *                 description: Thời gian bắt đầu
 *                 example: "2024-01-15T10:00:00"
 *               ThoiGianKetThuc:
 *                 type: string
 *                 format: date-time
 *                 description: Thời gian kết thúc
 *                 example: "2024-01-15T12:00:00"
 *               GhiChu:
 *                 type: string
 *                 description: Ghi chú
 *                 example: "Đặt bàn cho 2 người"
 *     responses:
 *       201:
 *         description: Đặt bàn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", datBanController.addDatBan);

/**
 * @swagger
 * /api/datban/{MaDatBan}:
 *   put:
 *     summary: Cập nhật thông tin đặt bàn
 *     tags: [DatBan]
 *     parameters:
 *       - in: path
 *         name: MaDatBan
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã đặt bàn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ThoiGianBatDau:
 *                 type: string
 *                 format: date-time
 *               ThoiGianKetThuc:
 *                 type: string
 *                 format: date-time
 *               TrangThai:
 *                 type: integer
 *                 description: "1: Đặt trước, 2: Đang sử dụng, 3: Đã thanh toán, 4: Đã hủy"
 *               GhiChu:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật đặt bàn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put("/:MaDatBan", datBanController.updateDatBan);

/**
 * @swagger
 * /api/datban/{MaDatBan}/trangthai:
 *   put:
 *     summary: Cập nhật trạng thái đặt bàn
 *     tags: [DatBan]
 *     parameters:
 *       - in: path
 *         name: MaDatBan
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã đặt bàn
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
 *                 description: "1: Đặt trước, 2: Đang sử dụng, 3: Đã thanh toán, 4: Đã hủy"
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put("/:MaDatBan/trangthai", datBanController.updateTrangThaiDatBan);

/**
 * @swagger
 * /api/datban/{MaDatBan}:
 *   delete:
 *     summary: Xóa đặt bàn
 *     tags: [DatBan]
 *     parameters:
 *       - in: path
 *         name: MaDatBan
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã đặt bàn
 *     responses:
 *       200:
 *         description: Xóa đặt bàn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Không tìm thấy đặt bàn
 */
router.delete("/:MaDatBan", datBanController.deleteDatBan);

export default router;