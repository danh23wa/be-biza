import express from "express";
import nguoiDungController from "../controllers/nguoiDung.Controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/nguoidung/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [NguoiDung]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/register", nguoiDungController.register);

/**
 * @swagger
 * /api/nguoidung/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [NguoiDung]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
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
 *                     user:
 *                       $ref: '#/components/schemas/NguoiDung'
 *                     token:
 *                       type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Thông tin đăng nhập không đúng
 */
router.post("/login", nguoiDungController.login);

/**
 * @swagger
 * /api/nguoidung:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng (Admin only)
 *     tags: [NguoiDung]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
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
 *                     $ref: '#/components/schemas/NguoiDung'
 *                 message:
 *                   type: string
 */
router.get("/", nguoiDungController.getAllNguoiDung);

/**
 * @swagger
 * /api/nguoidung/search:
 *   get:
 *     summary: Tìm kiếm người dùng theo số điện thoại
 *     tags: [NguoiDung]
 *     parameters:
 *       - in: query
 *         name: SoDienThoai
 *         required: true
 *         schema:
 *           type: string
 *         description: Số điện thoại để tìm kiếm
 *     responses:
 *       200:
 *         description: Tìm kiếm thành công
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
 *                     $ref: '#/components/schemas/NguoiDung'
 *                 message:
 *                   type: string
 */
router.get("/search", nguoiDungController.searchNguoiDungByPhone);

/**
 * @swagger
 * /api/nguoidung/{MaNguoiDung}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     tags: [NguoiDung]
 *     parameters:
 *       - in: path
 *         name: MaNguoiDung
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã người dùng
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/NguoiDung'
 *                 message:
 *                   type: string
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get("/:MaNguoiDung", nguoiDungController.getNguoiDungById);

/**
 * @swagger
 * /api/nguoidung/{MaNguoiDung}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [NguoiDung]
 *     parameters:
 *       - in: path
 *         name: MaNguoiDung
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               HoTen:
 *                 type: string
 *               SoDienThoai:
 *                 type: string
 *               Email:
 *                 type: string
 *               VaiTro:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put("/:MaNguoiDung", nguoiDungController.updateNguoiDung);

/**
 * @swagger
 * /api/nguoidung/{MaNguoiDung}/password:
 *   put:
 *     summary: Cập nhật mật khẩu
 *     tags: [NguoiDung]
 *     parameters:
 *       - in: path
 *         name: MaNguoiDung
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - MatKhauMoi
 *             properties:
 *               MatKhauMoi:
 *                 type: string
 *                 description: Mật khẩu mới
 *     responses:
 *       200:
 *         description: Cập nhật mật khẩu thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put("/:MaNguoiDung/password", nguoiDungController.updatePassword);

/**
 * @swagger
 * /api/nguoidung/{MaNguoiDung}/trangthai:
 *   put:
 *     summary: Cập nhật trạng thái người dùng
 *     tags: [NguoiDung]
 *     parameters:
 *       - in: path
 *         name: MaNguoiDung
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã người dùng
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
 *                 type: boolean
 *                 description: "true: Hoạt động, false: Khóa"
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put("/:MaNguoiDung/trangthai", nguoiDungController.updateTrangThai);

/**
 * @swagger
 * /api/nguoidung/{MaNguoiDung}:
 *   delete:
 *     summary: Xóa người dùng
 *     tags: [NguoiDung]
 *     parameters:
 *       - in: path
 *         name: MaNguoiDung
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã người dùng
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.delete("/:MaNguoiDung", nguoiDungController.deleteNguoiDung);

export default router;