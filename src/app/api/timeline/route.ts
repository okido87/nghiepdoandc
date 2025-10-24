import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const planId = searchParams.get('planId')
    const status = searchParams.get('status')

    const where = {
      ...(planId && { planId }),
      ...(status && status !== 'all' && { status })
    }

    const events = await db.timelineEvent.findMany({
      where,
      include: {
        plan: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { eventDate: 'asc' }
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching timeline events:', error)
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
      status,
      eventDate,
      planId,
      createdBy
    } = body

    const event = await db.timelineEvent.create({
      data: {
        title,
        description,
        status: status || 'pending',
        eventDate: new Date(eventDate),
        planId,
        createdBy: createdBy || null
      },
      include: {
        plan: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating timeline event:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}