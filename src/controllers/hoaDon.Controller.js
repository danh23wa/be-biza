import HoaDonModel from "../models/hoaDon.Models.js";

const getAllHoaDon = async (req, res, next) => {
  try {
    const data = await HoaDonModel.getAll();
    res.json({
      success: true,
      data: data,
      message: "✅ Lấy danh sách hóa đơn thành công"
    });
  } catch (err) {
    next(err);
  }
};

const getHoaDonById = async (req, res, next) => {
  try {
    const { MaHoaDon } = req.params;
    const data = await HoaDonModel.getById(MaHoaDon);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy hóa đơn"
      });
    }
    res.json({
      success: true,
      data: data,
      message: "✅ Lấy thông tin hóa đơn thành công"
    });
  } catch (err) {
    next(err);
  }
};

const addHoaDon = async (req, res, next) => {
  try {
    const { MaDatBan, TongTien, PhuongThucThanhToan, GhiChu } = req.body;
    
    // Validation
    if (!MaDatBan || !TongTien) {
      return res.status(400).json({
        success: false,
        message: "❌ Mã đặt bàn và tổng tiền là bắt buộc"
      });
    }

    const MaHoaDon = await HoaDonModel.create({ MaDatBan, TongTien, PhuongThucThanhToan, GhiChu });
    res.status(201).json({
      success: true,
      data: { MaHoaDon },
      message: "✅ Tạo hóa đơn thành công"
    });
  } catch (err) {
    next(err);
  }
};

const updateHoaDon = async (req, res, next) => {
  try {
    const { MaHoaDon } = req.params;
    const { TongTien, PhuongThucThanhToan, GhiChu } = req.body;
    
    // Check if invoice exists
    const existingInvoice = await HoaDonModel.getById(MaHoaDon);
    if (!existingInvoice) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy hóa đơn"
      });
    }

    await HoaDonModel.update(MaHoaDon, { TongTien, PhuongThucThanhToan, GhiChu });
    res.json({
      success: true,
      message: "✅ Cập nhật hóa đơn thành công"
    });
  } catch (err) {
    next(err);
  }
};

const getHoaDonByNguoiDung = async (req, res, next) => {
  try {
    const { MaNguoiDung } = req.params;
    const data = await HoaDonModel.getByNguoiDung(MaNguoiDung);
    res.json({
      success: true,
      data: data,
      message: `✅ Lấy lịch sử hóa đơn của người dùng thành công`
    });
  } catch (err) {
    next(err);
  }
};

const getHoaDonByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "❌ Vui lòng cung cấp ngày bắt đầu và ngày kết thúc"
      });
    }

    const data = await HoaDonModel.getByDateRange(startDate, endDate);
    res.json({
      success: true,
      data: data,
      message: `✅ Lấy hóa đơn từ ${startDate} đến ${endDate} thành công`
    });
  } catch (err) {
    next(err);
  }
};

const getTotalRevenue = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "❌ Vui lòng cung cấp ngày bắt đầu và ngày kết thúc"
      });
    }

    const data = await HoaDonModel.getTotalRevenue(startDate, endDate);
    res.json({
      success: true,
      data: data,
      message: `✅ Thống kê doanh thu từ ${startDate} đến ${endDate} thành công`
    });
  } catch (err) {
    next(err);
  }
};

const deleteHoaDon = async (req, res, next) => {
  try {
    const { MaHoaDon } = req.params;
    
    // Check if invoice exists
    const existingInvoice = await HoaDonModel.getById(MaHoaDon);
    if (!existingInvoice) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy hóa đơn"
      });
    }

    await HoaDonModel.delete(MaHoaDon);
    res.json({
      success: true,
      message: "✅ Xóa hóa đơn thành công"
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllHoaDon,
  getHoaDonById,
  addHoaDon,
  updateHoaDon,
  getHoaDonByNguoiDung,
  getHoaDonByDateRange,
  getTotalRevenue,
  deleteHoaDon
};
