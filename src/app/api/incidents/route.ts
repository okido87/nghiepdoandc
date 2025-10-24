import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const severity = searchParams.get('severity')
    const search = searchParams.get('search')

    const where = {
      ...(status && status !== 'all' && { status }),
      ...(severity && severity !== 'all' && { severity }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { location: { contains: search } }
        ]
      })
    }

    const incidents = await db.incident.findMany({
      where,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { incidentDate: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await db.incident.count({ where })

    return NextResponse.json({
      incidents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching incidents:', error)
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
      description,
      severity,
      status,
      incidentDate,
      location,
      createdById,
      images
    } = body

    const incident = await db.incident.create({
      data: {
        title,
        description,
        severity,
        status: status || 'pending',
        incidentDate: new Date(incidentDate),
        location,
        createdById,
        images: images ? JSON.stringify(images) : null
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(incident, { status: 201 })
  } catch (error) {
    console.error('Error creating incident:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}