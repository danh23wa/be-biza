import database from "../config/database.js";
import sql from "mssql";

const DatBanModel = {
  getAll: async () => {
    const pool = await database.getPool();
    const result = await pool.request().query(`
      SELECT 
        db.MaDatBan,
        db.MaNguoiDung,
        nd.TenDangNhap,
        nd.HoTen,
        nd.SoDienThoai,
        db.MaBan,
        bb.TenBan,
        bb.GiaTheoGio,
        db.ThoiGianBatDau,
        db.ThoiGianKetThuc,
        db.TrangThai,
        db.GhiChu
      FROM DatBan db
      INNER JOIN NguoiDung nd ON db.MaNguoiDung = nd.MaNguoiDung
      INNER JOIN BanBida bb ON db.MaBan = bb.MaBan
      ORDER BY db.ThoiGianBatDau DESC
    `);
    return result.recordset;
  },

  getById: async (MaDatBan) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("MaDatBan", sql.Int, MaDatBan)
      .query(`
        SELECT 
          db.MaDatBan,
          db.MaNguoiDung,
          nd.TenDangNhap,
          nd.HoTen,
          nd.SoDienThoai,
          db.MaBan,
          bb.TenBan,
          bb.GiaTheoGio,
          db.ThoiGianBatDau,
          db.ThoiGianKetThuc,
          db.TrangThai,
          db.GhiChu
        FROM DatBan db
        INNER JOIN NguoiDung nd ON db.MaNguoiDung = nd.MaNguoiDung
        INNER JOIN BanBida bb ON db.MaBan = bb.MaBan
        WHERE db.MaDatBan = @MaDatBan
      `);
    return result.recordset[0];
  },

  create: async ({ MaNguoiDung, MaBan, ThoiGianBatDau, ThoiGianKetThuc, GhiChu }) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("MaNguoiDung", sql.Int, MaNguoiDung)
      .input("MaBan", sql.Int, MaBan)
      .input("ThoiGianBatDau", sql.DateTime, ThoiGianBatDau)
      .input("ThoiGianKetThuc", sql.DateTime, ThoiGianKetThuc)
      .input("GhiChu", sql.NVarChar, GhiChu)
      .query("INSERT INTO DatBan (MaNguoiDung, MaBan, ThoiGianBatDau, ThoiGianKetThuc, GhiChu) VALUES (@MaNguoiDung, @MaBan, @ThoiGianBatDau, @ThoiGianKetThuc, @GhiChu); SELECT SCOPE_IDENTITY() as MaDatBan");
    return result.recordset[0].MaDatBan;
  },

  update: async (MaDatBan, { ThoiGianBatDau, ThoiGianKetThuc, TrangThai, GhiChu }) => {
    const pool = await database.getPool();
    await pool
      .request()
      .input("MaDatBan", sql.Int, MaDatBan)
      .input("ThoiGianBatDau", sql.DateTime, ThoiGianBatDau)
      .input("ThoiGianKetThuc", sql.DateTime, ThoiGianKetThuc)
      .input("TrangThai", sql.Int, TrangThai)
      .input("GhiChu", sql.NVarChar, GhiChu)
      .query("UPDATE DatBan SET ThoiGianBatDau = @ThoiGianBatDau, ThoiGianKetThuc = @ThoiGianKetThuc, TrangThai = @TrangThai, GhiChu = @GhiChu WHERE MaDatBan = @MaDatBan");
  },

  updateTrangThai: async (MaDatBan, TrangThai) => {
    const pool = await database.getPool();
    await pool
      .request()
      .input("MaDatBan", sql.Int, MaDatBan)
      .input("TrangThai", sql.Int, TrangThai)
      .query("UPDATE DatBan SET TrangThai = @TrangThai WHERE MaDatBan = @MaDatBan");
  },

  getByNguoiDung: async (MaNguoiDung) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("MaNguoiDung", sql.Int, MaNguoiDung)
      .query(`
        SELECT 
          db.MaDatBan,
          db.MaBan,
          bb.TenBan,
          bb.GiaTheoGio,
          db.ThoiGianBatDau,
          db.ThoiGianKetThuc,
          db.TrangThai,
          db.GhiChu
        FROM DatBan db
        INNER JOIN BanBida bb ON db.MaBan = bb.MaBan
        WHERE db.MaNguoiDung = @MaNguoiDung
        ORDER BY db.ThoiGianBatDau DESC
      `);
    return result.recordset;
  },

  getByBan: async (MaBan) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("MaBan", sql.Int, MaBan)
      .query(`
        SELECT 
          db.MaDatBan,
          db.MaNguoiDung,
          nd.TenDangNhap,
          nd.HoTen,
          nd.SoDienThoai,
          db.ThoiGianBatDau,
          db.ThoiGianKetThuc,
          db.TrangThai,
          db.GhiChu
        FROM DatBan db
        INNER JOIN NguoiDung nd ON db.MaNguoiDung = nd.MaNguoiDung
        WHERE db.MaBan = @MaBan
        ORDER BY db.ThoiGianBatDau DESC
      `);
    return result.recordset;
  },

  delete: async (MaDatBan) => {
    const pool = await database.getPool();
    await pool
      .request()
      .input("MaDatBan", sql.Int, MaDatBan)
      .query("DELETE FROM DatBan WHERE MaDatBan = @MaDatBan");
  }
};

export default DatBanModel;
