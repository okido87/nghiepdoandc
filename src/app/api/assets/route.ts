import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const search = searchParams.get('search')
    const planId = searchParams.get('planId')
    const companyId = searchParams.get('companyId')

    const where = {
      ...(status && status !== 'all' && { status }),
      ...(type && type !== 'all' && { type }),
      ...(planId && { planId }),
      ...(companyId && { companyId }),
      ...(search && {
        OR: [
          { name: { contains: search } },
          { code: { contains: search } },
          { description: { contains: search } },
          { location: { contains: search } }
        ]
      })
    }

    const assets = await db.asset.findMany({
      where,
      include: {
        company: {
          select: {
            id: true,
            name: true
          }
        },
        plan: {
          select: {
            id: true,
            name: true
          }
        },
        certificate: {
          select: {
            id: true,
            number: true,
            name: true
          }
        },
        _count: {
          select: {
            reports: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await db.asset.count({ where })

    return NextResponse.json({
      assets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching assets:', error)
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
      name,
      code,
      type,
      description,
      location,
      status,
      planId,
      certificateId,
      companyId
    } = body

    const asset = await db.asset.create({
      data: {
        name,
        code,
        type,
        description,
        location,
        status: status || 'active',
        planId: planId || null,
        certificateId: certificateId || null,
        companyId
      },
      include: {
        company: {
          select: {
            id: true,
            name: true
          }
        },
        plan: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json(asset, { status: 201 })
  } catch (error) {
    console.error('Error creating asset:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}