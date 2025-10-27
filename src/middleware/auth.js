import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '❌ Không có token xác thực'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: '❌ Token không hợp lệ'
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.VaiTro !== 1) {
    return res.status(403).json({
      success: false,
      message: '❌ Bạn không có quyền truy cập'
    });
  }
  next();
};

export { authMiddleware, adminMiddleware };
