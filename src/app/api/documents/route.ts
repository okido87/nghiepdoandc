import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Mock data - in real app, this would come from database
    const documents = [
      {
        id: 1,
        name: 'Giấy phép kinh doanh ABC',
        type: 'Giấy phép',
        status: 'Đã duyệt',
        date: '2024-01-15',
        company: 'Công ty ABC',
        description: 'Giấy phép kinh doanh cho công ty ABC'
      },
      {
        id: 2,
        name: 'Báo cáo tài chính Q4',
        type: 'Báo cáo',
        status: 'Đang xử lý',
        date: '2024-01-14',
        company: 'Công ty XYZ',
        description: 'Báo cáo tài chính quý 4 năm 2023'
      },
      {
        id: 3,
        name: 'Hồ sơ đăng ký thuế',
        type: 'Thuế',
        status: 'Chờ duyệt',
        date: '2024-01-13',
        company: 'Công ty DEF',
        description: 'Hồ sơ đăng ký mã số thuế'
      },
      {
        id: 4,
        name: 'Giấy chứng nhận an toàn',
        type: 'An toàn',
        status: 'Đã duyệt',
        date: '2024-01-12',
        company: 'Công ty GHI',
        description: 'Giấy chứng nhận an toàn lao động'
      },
      {
        id: 5,
        name: 'Báo cáo môi trường',
        type: 'Môi trường',
        status: 'Đang xử lý',
        date: '2024-01-11',
        company: 'Công ty JKL',
        description: 'Báo cáo đánh giá tác động môi trường'
      }
    ]

    let filteredDocuments = documents

    if (status && status !== 'all') {
      filteredDocuments = filteredDocuments.filter(doc => 
        doc.status.toLowerCase() === status.toLowerCase()
      )
    }

    if (search) {
      filteredDocuments = filteredDocuments.filter(doc =>
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.company.toLowerCase().includes(search.toLowerCase()) ||
        doc.type.toLowerCase().includes(search.toLowerCase())
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex)

    return NextResponse.json({
      documents: paginatedDocuments,
      pagination: {
        page,
        limit,
        total: filteredDocuments.length,
        totalPages: Math.ceil(filteredDocuments.length / limit)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mock creating a document
    const newDocument = {
      id: Date.now(),
      ...body,
      status: 'Chờ duyệt',
      date: new Date().toISOString().split('T')[0]
    }

    return NextResponse.json(newDocument, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}