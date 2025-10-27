import DatBanModel from "../models/datBan.Models.js";

const getAllDatBan = async (req, res, next) => {
  try {
    const data = await DatBanModel.getAll();
    res.json({
      success: true,
      data: data,
      message: "✅ Lấy danh sách đặt bàn thành công"
    });
  } catch (err) {
    next(err);
  }
};

const getDatBanById = async (req, res, next) => {
  try {
    const { MaDatBan } = req.params;
    const data = await DatBanModel.getById(MaDatBan);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy đặt bàn"
      });
    }
    res.json({
      success: true,
      data: data,
      message: "✅ Lấy thông tin đặt bàn thành công"
    });
  } catch (err) {
    next(err);
  }
};

const addDatBan = async (req, res, next) => {
  try {
    const { MaNguoiDung, MaBan, ThoiGianBatDau, ThoiGianKetThuc, GhiChu } = req.body;
    
    // Validation
    if (!MaNguoiDung || !MaBan || !ThoiGianBatDau) {
      return res.status(400).json({
        success: false,
        message: "❌ Mã người dùng, mã bàn và thời gian bắt đầu là bắt buộc"
      });
    }

    const MaDatBan = await DatBanModel.create({ MaNguoiDung, MaBan, ThoiGianBatDau, ThoiGianKetThuc, GhiChu });
    res.status(201).json({
      success: true,
      data: { MaDatBan },
      message: "✅ Đặt bàn thành công"
    });
  } catch (err) {
    next(err);
  }
};

const updateDatBan = async (req, res, next) => {
  try {
    const { MaDatBan } = req.params;
    const { ThoiGianBatDau, ThoiGianKetThuc, TrangThai, GhiChu } = req.body;
    
    // Check if booking exists
    const existingBooking = await DatBanModel.getById(MaDatBan);
    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy đặt bàn"
      });
    }

    await DatBanModel.update(MaDatBan, { ThoiGianBatDau, ThoiGianKetThuc, TrangThai, GhiChu });
    res.json({
      success: true,
      message: "✅ Cập nhật đặt bàn thành công"
    });
  } catch (err) {
    next(err);
  }
};

const updateTrangThaiDatBan = async (req, res, next) => {
  try {
    const { MaDatBan } = req.params;
    const { TrangThai } = req.body;
    
    // Check if booking exists
    const existingBooking = await DatBanModel.getById(MaDatBan);
    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy đặt bàn"
      });
    }

    await DatBanModel.updateTrangThai(MaDatBan, TrangThai);
    res.json({
      success: true,
      message: "♻️ Cập nhật trạng thái đặt bàn thành công"
    });
  } catch (err) {
    next(err);
  }
};

const getDatBanByNguoiDung = async (req, res, next) => {
  try {
    const { MaNguoiDung } = req.params;
    const data = await DatBanModel.getByNguoiDung(MaNguoiDung);
    res.json({
      success: true,
      data: data,
      message: `✅ Lấy lịch sử đặt bàn của người dùng thành công`
    });
  } catch (err) {
    next(err);
  }
};

const getDatBanByBan = async (req, res, next) => {
  try {
    const { MaBan } = req.params;
    const data = await DatBanModel.getByBan(MaBan);
    res.json({
      success: true,
      data: data,
      message: `✅ Lấy lịch sử đặt bàn của bàn ${MaBan} thành công`
    });
  } catch (err) {
    next(err);
  }
};

const deleteDatBan = async (req, res, next) => {
  try {
    const { MaDatBan } = req.params;
    
    // Check if booking exists
    const existingBooking = await DatBanModel.getById(MaDatBan);
    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: "❌ Không tìm thấy đặt bàn"
      });
    }

    await DatBanModel.delete(MaDatBan);
    res.json({
      success: true,
      message: "✅ Xóa đặt bàn thành công"
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllDatBan,
  getDatBanById,
  addDatBan,
  updateDatBan,
  updateTrangThaiDatBan,
  getDatBanByNguoiDung,
  getDatBanByBan,
  deleteDatBan
};
