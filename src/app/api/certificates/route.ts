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
          { number: { contains: search } },
          { company: { name: { contains: search } } }
        ]
      })
    }

    const certificates = await db.certificate.findMany({
      where,
      include: {
        company: true,
        inspector: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        assets: true
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await db.certificate.count({ where })

    return NextResponse.json({
      certificates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching certificates:', error)
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
      number,
      name,
      description,
      issueDate,
      expiryDate,
      companyId,
      inspectorId,
      planId
    } = body

    const certificate = await db.certificate.create({
      data: {
        number,
        name,
        description,
        issueDate: new Date(issueDate),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        companyId,
        inspectorId,
        planId: planId || null
      },
      include: {
        company: true,
        inspector: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(certificate, { status: 201 })
  } catch (error) {
    console.error('Error creating certificate:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}