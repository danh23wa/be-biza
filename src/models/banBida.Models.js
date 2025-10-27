import database from "../config/database.js";
import sql from "mssql";

const BanBidaModel = {
  getAll: async () => {
    const pool = await database.getPool();
    const result = await pool.request().query("SELECT * FROM BanBida");
    return result.recordset;
  },

  create: async ({ TenBan, GiaTheoGio, MoTa }) => {
    const pool = await database.getPool();
    await pool
      .request()
      .input("TenBan", sql.NVarChar, TenBan)
      .input("GiaTheoGio", sql.Decimal(10, 2), GiaTheoGio)
      .input("MoTa", sql.NVarChar, MoTa)
      .query("INSERT INTO BanBida (TenBan, GiaTheoGio, MoTa) VALUES (@TenBan, @GiaTheoGio, @MoTa)");
  },

  updateTrangThai: async (MaBan, TrangThai) => {
    const pool = await database.getPool();
    await pool
      .request()
      .input("MaBan", sql.Int, MaBan)
      .input("TrangThai", sql.Int, TrangThai)
      .query("UPDATE BanBida SET TrangThai = @TrangThai WHERE MaBan = @MaBan");
  },
};

export default BanBidaModel;