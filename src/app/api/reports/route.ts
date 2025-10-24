import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const assetId = searchParams.get('assetId')

    const where = {
      ...(status && status !== 'all' && { status }),
      ...(assetId && { assetId }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } },
          { location: { contains: search } }
        ]
      })
    }

    const reports = await db.report.findMany({
      where,
      include: {
        asset: {
          select: {
            id: true,
            name: true,
            code: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { reportDate: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await db.report.count({ where })

    return NextResponse.json({
      reports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      content,
      location,
      reportDate,
      status,
      assetId,
      createdById,
      images
    } = body

    const report = await db.report.create({
      data: {
        title,
        content,
        location,
        reportDate: new Date(reportDate),
        status: status || 'draft',
        assetId: assetId || null,
        createdById,
        images: images ? JSON.stringify(images) : null
      },
      include: {
        asset: {
          select: {
            id: true,
            name: true,
            code: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}