import express from "express";
import hoaDonController from "../controllers/hoaDon.Controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/hoadon:
 *   get:
 *     summary: Lấy danh sách tất cả hóa đơn
 *     tags: [HoaDon]
 *     responses:
 *       200:
 *         description: Lấy danh sách hóa đơn thành công
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
 *                     $ref: '#/components/schemas/HoaDon'
 *                 message:
 *                   type: string
 */
router.get("/", hoaDonController.getAllHoaDon);

/**
 * @swagger
 * /api/hoadon/thongke:
 *   get:
 *     summary: Thống kê doanh thu theo khoảng thời gian
 *     tags: [HoaDon]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Ngày bắt đầu
 *         example: "2024-01-01T00:00:00"
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Ngày kết thúc
 *         example: "2024-01-31T23:59:59"
 *     responses:
 *       200:
 *         description: Thống kê doanh thu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     SoHoaDon:
 *                       type: integer
 *                     TongDoanhThu:
 *                       type: number
 *                 message:
 *                   type: string
 */
router.get("/thongke", hoaDonController.getTotalRevenue);

/**
 * @swagger
 * /api/hoadon/nguoidung/{MaNguoiDung}:
 *   get:
 *     summary: Lấy lịch sử hóa đơn của người dùng
 *     tags: [HoaDon]
 *     parameters:
 *       - in: path
 *         name: MaNguoiDung
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã người dùng
 *     responses:
 *       200:
 *         description: Lấy lịch sử hóa đơn thành công
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
 *                     $ref: '#/components/schemas/HoaDon'
 *                 message:
 *                   type: string
 */
router.get("/nguoidung/:MaNguoiDung", hoaDonController.getHoaDonByNguoiDung);

/**
 * @swagger
 * /api/hoadon/date-range:
 *   get:
 *     summary: Lấy hóa đơn theo khoảng thời gian
 *     tags: [HoaDon]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Ngày bắt đầu
 *         example: "2024-01-01T00:00:00"
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Ngày kết thúc
 *         example: "2024-01-31T23:59:59"
 *     responses:
 *       200:
 *         description: Lấy hóa đơn theo khoảng thời gian thành công
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
 *                     $ref: '#/components/schemas/HoaDon'
 *                 message:
 *                   type: string
 */
router.get("/date-range", hoaDonController.getHoaDonByDateRange);

/**
 * @swagger
 * /api/hoadon/{MaHoaDon}:
 *   get:
 *     summary: Lấy thông tin hóa đơn theo ID
 *     tags: [HoaDon]
 *     parameters:
 *       - in: path
 *         name: MaHoaDon
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã hóa đơn
 *     responses:
 *       200:
 *         description: Lấy thông tin hóa đơn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/HoaDon'
 *                 message:
 *                   type: string
 *       404:
 *         description: Không tìm thấy hóa đơn
 */
router.get("/:MaHoaDon", hoaDonController.getHoaDonById);

/**
 * @swagger
 * /api/hoadon:
 *   post:
 *     summary: Tạo hóa đơn mới
 *     tags: [HoaDon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - MaDatBan
 *               - TongTien
 *             properties:
 *               MaDatBan:
 *                 type: integer
 *                 description: Mã đặt bàn
 *                 example: 1
 *               TongTien:
 *                 type: number
 *                 format: decimal
 *                 description: Tổng tiền
 *                 example: 160000
 *               PhuongThucThanhToan:
 *                 type: string
 *                 description: Phương thức thanh toán
 *                 example: "Tiền mặt"
 *               GhiChu:
 *                 type: string
 *                 description: Ghi chú
 *                 example: "Thanh toán đầy đủ"
 *     responses:
 *       201:
 *         description: Tạo hóa đơn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", hoaDonController.addHoaDon);

/**
 * @swagger
 * /api/hoadon/{MaHoaDon}:
 *   put:
 *     summary: Cập nhật thông tin hóa đơn
 *     tags: [HoaDon]
 *     parameters:
 *       - in: path
 *         name: MaHoaDon
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã hóa đơn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TongTien:
 *                 type: number
 *                 format: decimal
 *               PhuongThucThanhToan:
 *                 type: string
 *               GhiChu:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật hóa đơn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put("/:MaHoaDon", hoaDonController.updateHoaDon);

/**
 * @swagger
 * /api/hoadon/{MaHoaDon}:
 *   delete:
 *     summary: Xóa hóa đơn
 *     tags: [HoaDon]
 *     parameters:
 *       - in: path
 *         name: MaHoaDon
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã hóa đơn
 *     responses:
 *       200:
 *         description: Xóa hóa đơn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Không tìm thấy hóa đơn
 */
router.delete("/:MaHoaDon", hoaDonController.deleteHoaDon);

export default router;