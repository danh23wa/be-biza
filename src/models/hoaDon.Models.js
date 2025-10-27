import database from "../config/database.js";
import sql from "mssql";

const HoaDonModel = {
  getAll: async () => {
    const pool = await database.getPool();
    const result = await pool.request().query(`
      SELECT 
        hd.MaHoaDon,
        hd.MaDatBan,
        db.MaNguoiDung,
        nd.TenDangNhap,
        nd.HoTen,
        nd.SoDienThoai,
        db.MaBan,
        bb.TenBan,
        hd.TongTien,
        hd.NgayThanhToan,
        hd.PhuongThucThanhToan,
        hd.GhiChu
      FROM HoaDon hd
      INNER JOIN DatBan db ON hd.MaDatBan = db.MaDatBan
      INNER JOIN NguoiDung nd ON db.MaNguoiDung = nd.MaNguoiDung
      INNER JOIN BanBida bb ON db.MaBan = bb.MaBan
      ORDER BY hd.NgayThanhToan DESC
    `);
    return result.recordset;
  },

  getById: async (MaHoaDon) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("MaHoaDon", sql.Int, MaHoaDon)
      .query(`
        SELECT 
          hd.MaHoaDon,
          hd.MaDatBan,
          db.MaNguoiDung,
          nd.TenDangNhap,
          nd.HoTen,
          nd.SoDienThoai,
          db.MaBan,
          bb.TenBan,
          bb.GiaTheoGio,
          db.ThoiGianBatDau,
          db.ThoiGianKetThuc,
          hd.TongTien,
          hd.NgayThanhToan,
          hd.PhuongThucThanhToan,
          hd.GhiChu
        FROM HoaDon hd
        INNER JOIN DatBan db ON hd.MaDatBan = db.MaDatBan
        INNER JOIN NguoiDung nd ON db.MaNguoiDung = nd.MaNguoiDung
        INNER JOIN BanBida bb ON db.MaBan = bb.MaBan
        WHERE hd.MaHoaDon = @MaHoaDon
      `);
    return result.recordset[0];
  },

  create: async ({ MaDatBan, TongTien, PhuongThucThanhToan, GhiChu }) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("MaDatBan", sql.Int, MaDatBan)
      .input("TongTien", sql.Decimal(10, 2), TongTien)
      .input("PhuongThucThanhToan", sql.NVarChar, PhuongThucThanhToan)
      .input("GhiChu", sql.NVarChar, GhiChu)
      .query("INSERT INTO HoaDon (MaDatBan, TongTien, PhuongThucThanhToan, GhiChu) VALUES (@MaDatBan, @TongTien, @PhuongThucThanhToan, @GhiChu); SELECT SCOPE_IDENTITY() as MaHoaDon");
    return result.recordset[0].MaHoaDon;
  },

  update: async (MaHoaDon, { TongTien, PhuongThucThanhToan, GhiChu }) => {
    const pool = await database.getPool();
    await pool
      .request()
      .input("MaHoaDon", sql.Int, MaHoaDon)
      .input("TongTien", sql.Decimal(10, 2), TongTien)
      .input("PhuongThucThanhToan", sql.NVarChar, PhuongThucThanhToan)
      .input("GhiChu", sql.NVarChar, GhiChu)
      .query("UPDATE HoaDon SET TongTien = @TongTien, PhuongThucThanhToan = @PhuongThucThanhToan, GhiChu = @GhiChu WHERE MaHoaDon = @MaHoaDon");
  },

  getByNguoiDung: async (MaNguoiDung) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("MaNguoiDung", sql.Int, MaNguoiDung)
      .query(`
        SELECT 
          hd.MaHoaDon,
          hd.MaDatBan,
          db.MaBan,
          bb.TenBan,
          hd.TongTien,
          hd.NgayThanhToan,
          hd.PhuongThucThanhToan,
          hd.GhiChu
        FROM HoaDon hd
        INNER JOIN DatBan db ON hd.MaDatBan = db.MaDatBan
        INNER JOIN BanBida bb ON db.MaBan = bb.MaBan
        WHERE db.MaNguoiDung = @MaNguoiDung
        ORDER BY hd.NgayThanhToan DESC
      `);
    return result.recordset;
  },

  getByDateRange: async (startDate, endDate) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("startDate", sql.DateTime, startDate)
      .input("endDate", sql.DateTime, endDate)
      .query(`
        SELECT 
          hd.MaHoaDon,
          hd.MaDatBan,
          db.MaNguoiDung,
          nd.TenDangNhap,
          nd.HoTen,
          db.MaBan,
          bb.TenBan,
          hd.TongTien,
          hd.NgayThanhToan,
          hd.PhuongThucThanhToan,
          hd.GhiChu
        FROM HoaDon hd
        INNER JOIN DatBan db ON hd.MaDatBan = db.MaDatBan
        INNER JOIN NguoiDung nd ON db.MaNguoiDung = nd.MaNguoiDung
        INNER JOIN BanBida bb ON db.MaBan = bb.MaBan
        WHERE hd.NgayThanhToan BETWEEN @startDate AND @endDate
        ORDER BY hd.NgayThanhToan DESC
      `);
    return result.recordset;
  },

  getTotalRevenue: async (startDate, endDate) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("startDate", sql.DateTime, startDate)
      .input("endDate", sql.DateTime, endDate)
      .query(`
        SELECT 
          COUNT(*) as SoHoaDon,
          SUM(TongTien) as TongDoanhThu
        FROM HoaDon
        WHERE NgayThanhToan BETWEEN @startDate AND @endDate
      `);
    return result.recordset[0];
  },

  delete: async (MaHoaDon) => {
    const pool = await database.getPool();
    await pool
      .request()
      .input("MaHoaDon", sql.Int, MaHoaDon)
      .query("DELETE FROM HoaDon WHERE MaHoaDon = @MaHoaDon");
  }
};

export default HoaDonModel;
