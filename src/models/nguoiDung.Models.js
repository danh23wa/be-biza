import database from "../config/database.js";
import sql from "mssql";
import bcrypt from "bcryptjs";

const NguoiDungModel = {
  getAll: async () => {
    const pool = await database.getPool();
    const result = await pool.request().query(`
      SELECT 
        MaNguoiDung,
        TenDangNhap,
        HoTen,
        SoDienThoai,
        Email,
        VaiTro,
        NgayDangKy,
        TrangThai
      FROM NguoiDung 
      ORDER BY NgayDangKy DESC
    `);
    return result.recordset;
  },

  getById: async (MaNguoiDung) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("MaNguoiDung", sql.Int, MaNguoiDung)
      .query(`
        SELECT 
          MaNguoiDung,
          TenDangNhap,
          HoTen,
          SoDienThoai,
          Email,
          VaiTro,
          NgayDangKy,
          TrangThai
        FROM NguoiDung 
        WHERE MaNguoiDung = @MaNguoiDung
      `);
    return result.recordset[0];
  },

  getByUsername: async (TenDangNhap) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("TenDangNhap", sql.NVarChar, TenDangNhap)
      .query(`
        SELECT 
          MaNguoiDung,
          TenDangNhap,
          MatKhau,
          HoTen,
          SoDienThoai,
          Email,
          VaiTro,
          NgayDangKy,
          TrangThai
        FROM NguoiDung 
        WHERE TenDangNhap = @TenDangNhap
      `);
    return result.recordset[0];
  },

  create: async ({ TenDangNhap, MatKhau, HoTen, SoDienThoai, Email, VaiTro = 2 }) => {
    const pool = await database.getPool();
    
    // Hash password
    const hashedPassword = await bcrypt.hash(MatKhau, 10);
    
    const result = await pool
      .request()
      .input("TenDangNhap", sql.NVarChar, TenDangNhap)
      .input("MatKhau", sql.NVarChar, hashedPassword)
      .input("HoTen", sql.NVarChar, HoTen)
      .input("SoDienThoai", sql.VarChar, SoDienThoai)
      .input("Email", sql.NVarChar, Email)
      .input("VaiTro", sql.Int, VaiTro)
      .query(`
        INSERT INTO NguoiDung (TenDangNhap, MatKhau, HoTen, SoDienThoai, Email, VaiTro) 
        VALUES (@TenDangNhap, @MatKhau, @HoTen, @SoDienThoai, @Email, @VaiTro); 
        SELECT SCOPE_IDENTITY() as MaNguoiDung
      `);
    return result.recordset[0].MaNguoiDung;
  },

  update: async (MaNguoiDung, { HoTen, SoDienThoai, Email, VaiTro }) => {
    const pool = await database.getPool();
    await pool
      .request()
      .input("MaNguoiDung", sql.Int, MaNguoiDung)
      .input("HoTen", sql.NVarChar, HoTen)
      .input("SoDienThoai", sql.VarChar, SoDienThoai)
      .input("Email", sql.NVarChar, Email)
      .input("VaiTro", sql.Int, VaiTro)
      .query(`
        UPDATE NguoiDung 
        SET HoTen = @HoTen, SoDienThoai = @SoDienThoai, Email = @Email, VaiTro = @VaiTro 
        WHERE MaNguoiDung = @MaNguoiDung
      `);
  },

  updatePassword: async (MaNguoiDung, MatKhauMoi) => {
    const pool = await database.getPool();
    const hashedPassword = await bcrypt.hash(MatKhauMoi, 10);
    
    await pool
      .request()
      .input("MaNguoiDung", sql.Int, MaNguoiDung)
      .input("MatKhau", sql.NVarChar, hashedPassword)
      .query("UPDATE NguoiDung SET MatKhau = @MatKhau WHERE MaNguoiDung = @MaNguoiDung");
  },

  updateTrangThai: async (MaNguoiDung, TrangThai) => {
    const pool = await database.getPool();
    await pool
      .request()
      .input("MaNguoiDung", sql.Int, MaNguoiDung)
      .input("TrangThai", sql.Bit, TrangThai)
      .query("UPDATE NguoiDung SET TrangThai = @TrangThai WHERE MaNguoiDung = @MaNguoiDung");
  },

  searchByPhone: async (SoDienThoai) => {
    const pool = await database.getPool();
    const result = await pool
      .request()
      .input("SoDienThoai", sql.VarChar, SoDienThoai)
      .query(`
        SELECT 
          MaNguoiDung,
          TenDangNhap,
          HoTen,
          SoDienThoai,
          Email,
          VaiTro,
          NgayDangKy,
          TrangThai
        FROM NguoiDung 
        WHERE SoDienThoai LIKE '%' + @SoDienThoai + '%'
      `);
    return result.recordset;
  },

  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  delete: async (MaNguoiDung) => {
    const pool = await database.getPool();
    await pool
      .request()
      .input("MaNguoiDung", sql.Int, MaNguoiDung)
      .query("DELETE FROM NguoiDung WHERE MaNguoiDung = @MaNguoiDung");
  }
};

export default NguoiDungModel;
