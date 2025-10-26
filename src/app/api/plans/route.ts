import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where = {
      ...(status && status !== 'all' && { status }),
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
          // Fix relational filter to company: use `is` for singular relation
          { company: { is: { name: { contains: search } } } }
        ]
      })
    }

    const plans = await db.inspectionPlan.findMany({
      where,
      include: {
        company: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        assets: true,
        tasks: true,
        certificates: true,
        _count: {
          select: {
            assets: true,
            tasks: true,
            certificates: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await db.inspectionPlan.count({ where })

    return NextResponse.json({
      plans,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching plans:', error)
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
      description,
      startDate,
      endDate,
      companyId,
      createdById
    } = body

    const plan = await db.inspectionPlan.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        companyId,
        createdById
      },
      include: {
        company: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error('Error creating plan:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}