import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock statistics data
    const stats = {
      overview: [
        { title: 'Tổng số doanh nghiệp', value: '1,234', change: '+12%', icon: 'Building' },
        { title: 'Hồ sơ đang xử lý', value: '456', change: '+8%', icon: 'FileText' },
        { title: 'Người dùng active', value: '892', change: '+15%', icon: 'Users' },
        { title: 'Tỷ lệ hoàn thành', value: '94%', change: '+3%', icon: 'TrendingUp' }
      ],
      chartData: [
        { month: 'T1', submitted: 120, approved: 95, pending: 25 },
        { month: 'T2', submitted: 145, approved: 120, pending: 25 },
        { month: 'T3', submitted: 165, approved: 140, pending: 25 },
        { month: 'T4', submitted: 180, approved: 155, pending: 25 },
        { month: 'T5', submitted: 195, approved: 170, pending: 25 },
        { month: 'T6', submitted: 210, approved: 185, pending: 25 }
      ],
      documentTypes: [
        { type: 'Giấy phép', count: 450, percentage: 45 },
        { type: 'Báo cáo', count: 300, percentage: 30 },
        { type: 'Hồ sơ thuế', count: 150, percentage: 15 },
        { type: 'Khác', count: 100, percentage: 10 }
      ],
      performance: {
        avgProcessingTime: '2.5 ngày',
        approvalRate: '87%',
        needRevision: 23,
        totalProcessed: 1234
      },
      regionalStats: [
        { region: 'Hà Nội', companies: 342, growth: '+12%' },
        { region: 'TP. HCM', companies: 289, growth: '+8%' },
        { region: 'Đà Nẵng', companies: 156, growth: '+15%' },
        { region: 'Cần Thơ', companies: 98, growth: '+6%' },
        { region: 'Hải Phòng', companies: 87, growth: '+4%' }
      ]
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}