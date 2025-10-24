import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock activities data
    const activities = [
      {
        id: 1,
        action: 'Công ty ABC',
        detail: 'nộp hồ sơ giấy phép kinh doanh',
        time: '5 phút trước',
        type: 'submit',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        action: 'Admin',
        detail: 'duyệt hồ sơ của Công ty XYZ',
        time: '15 phút trước',
        type: 'approve',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        action: 'Công ty DEF',
        detail: 'cập nhật thông tin doanh nghiệp',
        time: '1 giờ trước',
        type: 'update',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        action: 'Hệ thống',
        detail: 'gửi thông báo nhắc nhở',
        time: '2 giờ trước',
        type: 'system',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 5,
        action: 'Công ty GHI',
        detail: 'nộp báo cáo tài chính',
        time: '3 giờ trước',
        type: 'submit',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 6,
        action: 'Admin',
        detail: 'yêu cầu bổ sung hồ sơ',
        time: '4 giờ trước',
        type: 'request',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 7,
        action: 'Công ty JKL',
        detail: 'cập nhật giấy phép an toàn',
        time: '5 giờ trước',
        type: 'update',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 8,
        action: 'Hệ thống',
        detail: 'đồng bộ dữ liệu thành công',
        time: '6 giờ trước',
        type: 'system',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      }
    ]

    return NextResponse.json(activities)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}