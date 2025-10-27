import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hệ thống Quản lý Bàn Bida API',
      version: '1.0.0',
      description: 'API documentation cho hệ thống quản lý bàn bida với đầy đủ chức năng CRUD',
      contact: {
        name: 'Developer',
        email: 'developer@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        BanBida: {
          type: 'object',
          properties: {
            MaBan: {
              type: 'integer',
              description: 'Mã bàn'
            },
            TenBan: {
              type: 'string',
              description: 'Tên bàn'
            },
            TrangThai: {
              type: 'integer',
              description: 'Trạng thái bàn (1: Trống, 2: Đang sử dụng, 3: Đặt trước, 4: Bảo trì)'
            },
            GiaTheoGio: {
              type: 'number',
              format: 'decimal',
              description: 'Giá theo giờ'
            },
            MoTa: {
              type: 'string',
              description: 'Mô tả bàn'
            }
          }
        },
        NguoiDung: {
          type: 'object',
          properties: {
            MaNguoiDung: {
              type: 'integer',
              description: 'Mã người dùng'
            },
            TenDangNhap: {
              type: 'string',
              description: 'Tên đăng nhập'
            },
            HoTen: {
              type: 'string',
              description: 'Họ và tên'
            },
            SoDienThoai: {
              type: 'string',
              description: 'Số điện thoại'
            },
            Email: {
              type: 'string',
              description: 'Email'
            },
            VaiTro: {
              type: 'integer',
              description: 'Vai trò (1: Admin, 2: Khách hàng)'
            },
            NgayDangKy: {
              type: 'string',
              format: 'date-time',
              description: 'Ngày đăng ký'
            },
            TrangThai: {
              type: 'boolean',
              description: 'Trạng thái tài khoản (true: Hoạt động, false: Khóa)'
            }
          }
        },
        DatBan: {
          type: 'object',
          properties: {
            MaDatBan: {
              type: 'integer',
              description: 'Mã đặt bàn'
            },
            MaNguoiDung: {
              type: 'integer',
              description: 'Mã người dùng'
            },
            MaBan: {
              type: 'integer',
              description: 'Mã bàn'
            },
            ThoiGianBatDau: {
              type: 'string',
              format: 'date-time',
              description: 'Thời gian bắt đầu'
            },
            ThoiGianKetThuc: {
              type: 'string',
              format: 'date-time',
              description: 'Thời gian kết thúc'
            },
            TrangThai: {
              type: 'integer',
              description: 'Trạng thái đặt bàn (1: Đặt trước, 2: Đang sử dụng, 3: Đã thanh toán, 4: Đã hủy)'
            },
            GhiChu: {
              type: 'string',
              description: 'Ghi chú'
            }
          }
        },
        HoaDon: {
          type: 'object',
          properties: {
            MaHoaDon: {
              type: 'integer',
              description: 'Mã hóa đơn'
            },
            MaDatBan: {
              type: 'integer',
              description: 'Mã đặt bàn'
            },
            TongTien: {
              type: 'number',
              format: 'decimal',
              description: 'Tổng tiền'
            },
            NgayThanhToan: {
              type: 'string',
              format: 'date-time',
              description: 'Ngày thanh toán'
            },
            PhuongThucThanhToan: {
              type: 'string',
              description: 'Phương thức thanh toán'
            },
            GhiChu: {
              type: 'string',
              description: 'Ghi chú'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['TenDangNhap', 'MatKhau'],
          properties: {
            TenDangNhap: {
              type: 'string',
              description: 'Tên đăng nhập'
            },
            MatKhau: {
              type: 'string',
              description: 'Mật khẩu'
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['TenDangNhap', 'MatKhau', 'HoTen', 'SoDienThoai'],
          properties: {
            TenDangNhap: {
              type: 'string',
              description: 'Tên đăng nhập'
            },
            MatKhau: {
              type: 'string',
              description: 'Mật khẩu'
            },
            HoTen: {
              type: 'string',
              description: 'Họ và tên'
            },
            SoDienThoai: {
              type: 'string',
              description: 'Số điện thoại'
            },
            Email: {
              type: 'string',
              description: 'Email'
            },
            VaiTro: {
              type: 'integer',
              description: 'Vai trò (1: Admin, 2: Khách hàng)',
              default: 2
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Trạng thái thành công'
            },
            message: {
              type: 'string',
              description: 'Thông báo'
            },
            data: {
              type: 'object',
              description: 'Dữ liệu trả về'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
