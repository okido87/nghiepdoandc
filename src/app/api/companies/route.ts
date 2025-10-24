import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { address: { contains: search } },
          { email: { contains: search } },
          { taxCode: { contains: search } }
        ]
      })
    }

    const companies = await db.company.findMany({
      where,
      include: {
        _count: {
          select: {
            certificates: true,
            plans: true,
            assets: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await db.company.count({ where })

    return NextResponse.json({
      companies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
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
      address,
      phone,
      email,
      taxCode
    } = body

    const company = await db.company.create({
      data: {
        name,
        address,
        phone,
        email,
        taxCode
      }
    })

    return NextResponse.json(company, { status: 201 })
  } catch (error) {
    console.error('Error creating company:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}