import BanBidaModel from "../models/banBida.Models.js";

const getAllBanBida = async (req, res, next) => {
  try {
    const data = await BanBidaModel.getAll();
    res.json(data);
  } catch (err) { 
    next(err);
  }
};

 const addBanBida = async (req, res, next) => {
  try {
    const { TenBan, GiaTheoGio, MoTa, AnhURL } = req.body;
    await BanBidaModel.create({ TenBan, GiaTheoGio, MoTa ,AnhURL });
    res.status(201).json({ message: "✅ Thêm bàn thành công" });
  } catch (err) {
    next(err);
  }
};

 const updateTrangThaiBan = async (req, res, next) => {
  try {
    const { MaBan } = req.params;
    const { TrangThai } = req.body;
    await BanBidaModel.updateTrangThai(MaBan, TrangThai);
    res.json({ message: "♻️ Cập nhật trạng thái bàn thành công" });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllBanBida,
  addBanBida,
  updateTrangThaiBan
};