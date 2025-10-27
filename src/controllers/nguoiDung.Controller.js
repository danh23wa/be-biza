import NguoiDungModel from "../models/nguoiDung.Models.js";
import jwt from "jsonwebtoken";

const getAllNguoiDung = async (req, res, next) => {
  try {
    const data = await NguoiDungModel.getAll();
    res.json({
      success: true,
      data: data,
      message: "✅ Lấy danh sách người dùng thành công"
    });
  } catch (err) {
    next(err);
  }
};

const getNguoiDungById = async (req, res, next) => {
  try {
    const { MaNguoiDung } = req.params;
    const data = await NguoiDungModel.getById(MaNguoiDung);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy người dùng"
      });
    }
    res.json({
      success: true,
      data: data,
      message: "✅ Lấy thông tin người dùng thành công"
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { TenDangNhap, MatKhau, HoTen, SoDienThoai, Email, VaiTro = 2 } = req.body;
    
    // Validation
    if (!TenDangNhap || !MatKhau || !HoTen || !SoDienThoai) {
      return res.status(400).json({
        success: false,
        message: "❌ Tên đăng nhập, mật khẩu, họ tên và số điện thoại là bắt buộc"
      });
    }

    // Check if username already exists
    const existingUser = await NguoiDungModel.getByUsername(TenDangNhap);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "❌ Tên đăng nhập đã tồn tại"
      });
    }

    const MaNguoiDung = await NguoiDungModel.create({ 
      TenDangNhap, 
      MatKhau, 
      HoTen, 
      SoDienThoai, 
      Email, 
      VaiTro 
    });
    
    res.status(201).json({
      success: true,
      data: { MaNguoiDung },
      message: "✅ Đăng ký tài khoản thành công"
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { TenDangNhap, MatKhau } = req.body;
    
    // Validation
    if (!TenDangNhap || !MatKhau) {
      return res.status(400).json({
        success: false,
        message: "❌ Tên đăng nhập và mật khẩu là bắt buộc"
      });
    }

    // Get user by username
    const user = await NguoiDungModel.getByUsername(TenDangNhap);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "❌ Tên đăng nhập hoặc mật khẩu không đúng"
      });
    }

    // Check if account is active
    if (!user.TrangThai) {
      return res.status(401).json({
        success: false,
        message: "❌ Tài khoản đã bị khóa"
      });
    }

    // Verify password
    const isPasswordValid = await NguoiDungModel.verifyPassword(MatKhau, user.MatKhau);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "❌ Tên đăng nhập hoặc mật khẩu không đúng"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        MaNguoiDung: user.MaNguoiDung, 
        TenDangNhap: user.TenDangNhap,
        VaiTro: user.VaiTro 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { MatKhau: userPassword, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: "✅ Đăng nhập thành công"
    });
  } catch (err) {
    next(err);
  }
};

const updateNguoiDung = async (req, res, next) => {
  try {
    const { MaNguoiDung } = req.params;
    const { HoTen, SoDienThoai, Email, VaiTro } = req.body;
    
    // Check if user exists
    const existingUser = await NguoiDungModel.getById(MaNguoiDung);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy người dùng"
      });
    }

    await NguoiDungModel.update(MaNguoiDung, { HoTen, SoDienThoai, Email, VaiTro });
    res.json({
      success: true,
      message: "✅ Cập nhật thông tin người dùng thành công"
    });
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { MaNguoiDung } = req.params;
    const { MatKhauMoi } = req.body;
    
    if (!MatKhauMoi) {
      return res.status(400).json({
        success: false,
        message: "❌ Mật khẩu mới là bắt buộc"
      });
    }

    // Check if user exists
    const existingUser = await NguoiDungModel.getById(MaNguoiDung);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy người dùng"
      });
    }

    await NguoiDungModel.updatePassword(MaNguoiDung, MatKhauMoi);
    res.json({
      success: true,
      message: "✅ Cập nhật mật khẩu thành công"
    });
  } catch (err) {
    next(err);
  }
};

const updateTrangThai = async (req, res, next) => {
  try {
    const { MaNguoiDung } = req.params;
    const { TrangThai } = req.body;
    
    // Check if user exists
    const existingUser = await NguoiDungModel.getById(MaNguoiDung);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy người dùng"
      });
    }

    await NguoiDungModel.updateTrangThai(MaNguoiDung, TrangThai);
    res.json({
      success: true,
      message: "♻️ Cập nhật trạng thái người dùng thành công"
    });
  } catch (err) {
    next(err);
  }
};

const searchNguoiDungByPhone = async (req, res, next) => {
  try {
    const { SoDienThoai } = req.query;
    
    if (!SoDienThoai) {
      return res.status(400).json({
        success: false,
        message: "❌ Vui lòng nhập số điện thoại để tìm kiếm"
      });
    }

    const data = await NguoiDungModel.searchByPhone(SoDienThoai);
    res.json({
      success: true,
      data: data,
      message: `✅ Tìm thấy ${data.length} người dùng`
    });
  } catch (err) {
    next(err);
  }
};

const deleteNguoiDung = async (req, res, next) => {
  try {
    const { MaNguoiDung } = req.params;
    
    // Check if user exists
    const existingUser = await NguoiDungModel.getById(MaNguoiDung);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy người dùng"
      });
    }

    await NguoiDungModel.delete(MaNguoiDung);
    res.json({
      success: true,
      message: "✅ Xóa người dùng thành công"
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllNguoiDung,
  getNguoiDungById,
  register,
  login,
  updateNguoiDung,
  updatePassword,
  updateTrangThai,
  searchNguoiDungByPhone,
  deleteNguoiDung
};
