import sql from 'mssql';

const dbConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'NewPassword123!',
  server: process.env.DB_SERVER || 'localhost',
  port: Number(process.env.DB_PORT) || 1433,
  database: process.env.DB_DATABASE || 'QuanLyBida',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true,
  },
};

let pool = null;

const connectDB = async () => {
  try {
    pool = await sql.connect(dbConfig);
    console.log('Connected to SQL Server');
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return pool;
};

const closeDB = async () => {
  if (pool) {
    await pool.close();
    console.log('Database connection closed');
  }
};

export default {
  connectDB,
  getPool,
  closeDB
}; 