import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function recoverDemoData() {
  console.log('🚀 Starting transactional recovery of demo data...')

  await prisma.$transaction(async (tx) => {
    // 1) Ensure base reference data exists: Users, Projects, Partners (customers), Branches, Companies
    console.log('🔧 Upserting base reference data...')

    const users = await Promise.all([
      tx.user.upsert({
        where: { email: 'admin@eaip.vn' },
        update: {},
        create: { email: 'admin@eaip.vn', role: 'ADMIN', name: 'Admin EAIP' }
      }),
      tx.user.upsert({
        where: { email: 'manager@eaip.vn' },
        update: {},
        create: { email: 'manager@eaip.vn', role: 'MANAGER', name: 'Manager EAIP' }
      }),
      tx.user.upsert({
        where: { email: 'supervisor@eaip.vn' },
        update: {},
        create: { email: 'supervisor@eaip.vn', role: 'SUPERVISOR', name: 'Supervisor EAIP' }
      }),
      tx.user.upsert({
        where: { email: 'inspector1@eaip.vn' },
        update: {},
        create: { email: 'inspector1@eaip.vn', role: 'INSPECTOR', name: 'Inspector One' }
      }),
      tx.user.upsert({
        where: { email: 'inspector2@eaip.vn' },
        update: {},
        create: { email: 'inspector2@eaip.vn', role: 'INSPECTOR', name: 'Inspector Two' }
      }),
    ])

    const projects = await Promise.all([
      tx.project.upsert({ where: { id: 'proj-rec-1' }, update: {}, create: { id: 'proj-rec-1', name: 'Khôi phục dữ liệu 1', company: 'Công ty Alpha', status: 'ACTIVE' } }),
      tx.project.upsert({ where: { id: 'proj-rec-2' }, update: {}, create: { id: 'proj-rec-2', name: 'Khôi phục dữ liệu 2', company: 'Công ty Beta', status: 'ACTIVE' } }),
      tx.project.upsert({ where: { id: 'proj-rec-3' }, update: {}, create: { id: 'proj-rec-3', name: 'Khôi phục dữ liệu 3', company: 'Công ty Gamma', status: 'ACTIVE' } }),
    ])

    const partners = await Promise.all([
      tx.partner.upsert({ where: { id: 'partner-rec-1' }, update: {}, create: { id: 'partner-rec-1', name: 'Khách hàng A', type: 'CUSTOMER', status: 'ACTIVE', email: 'kh.a@example.com' } }),
      tx.partner.upsert({ where: { id: 'partner-rec-2' }, update: {}, create: { id: 'partner-rec-2', name: 'Khách hàng B', type: 'CUSTOMER', status: 'ACTIVE', email: 'kh.b@example.com' } }),
      tx.partner.upsert({ where: { id: 'partner-rec-3' }, update: {}, create: { id: 'partner-rec-3', name: 'Khách hàng C', type: 'CUSTOMER', status: 'ACTIVE', email: 'kh.c@example.com' } }),
      tx.partner.upsert({ where: { id: 'partner-rec-4' }, update: {}, create: { id: 'partner-rec-4', name: 'Khách hàng D', type: 'CUSTOMER', status: 'ACTIVE', email: 'kh.d@example.com' } }),
      tx.partner.upsert({ where: { id: 'partner-rec-5' }, update: {}, create: { id: 'partner-rec-5', name: 'Khách hàng E', type: 'CUSTOMER', status: 'ACTIVE', email: 'kh.e@example.com' } }),
    ])

    const branches = await Promise.all([
      tx.branch.upsert({ where: { code: 'REC-HN' }, update: {}, create: { code: 'REC-HN', name: 'Chi nhánh Hà Nội', status: 'ACTIVE' } }),
      tx.branch.upsert({ where: { code: 'REC-HCM' }, update: {}, create: { code: 'REC-HCM', name: 'Chi nhánh TP.HCM', status: 'ACTIVE' } }),
      tx.branch.upsert({ where: { code: 'REC-DN' }, update: {}, create: { code: 'REC-DN', name: 'Chi nhánh Đà Nẵng', status: 'ACTIVE' } }),
    ])

    const companies = await Promise.all([
      tx.company.upsert({ where: { id: 'comp-rec-1' }, update: {}, create: { id: 'comp-rec-1', name: 'Công ty Alpha', address: 'Hà Nội' } }),
      tx.company.upsert({ where: { id: 'comp-rec-2' }, update: {}, create: { id: 'comp-rec-2', name: 'Công ty Beta', address: 'TP.HCM' } }),
      tx.company.upsert({ where: { id: 'comp-rec-3' }, update: {}, create: { id: 'comp-rec-3', name: 'Công ty Gamma', address: 'Đà Nẵng' } }),
      tx.company.upsert({ where: { id: 'comp-rec-4' }, update: {}, create: { id: 'comp-rec-4', name: 'Công ty Delta', address: 'Hải Phòng' } }),
      tx.company.upsert({ where: { id: 'comp-rec-5' }, update: {}, create: { id: 'comp-rec-5', name: 'Công ty Epsilon', address: 'Cần Thơ' } }),
    ])

    // 2) Create 20 Orders, each linked to a user and a customer (partner)
    console.log('📦 Creating 20 orders...')
    const inspectionTypes = ['EAIP_ASSESSMENT', 'SAFETY_INSPECTION', 'QUALITY_AUDIT']
    const orderRecords = [] as Array<{ id: string; orderNumber: string }>
    for (let i = 1; i <= 20; i++) {
      const user = users[i % users.length]
      const project = projects[i % projects.length]
      const partner = partners[i % partners.length]
      const branch = branches[i % branches.length]

      const order = await tx.order.create({
        data: {
          orderNumber: `ORD-REC-${String(i).padStart(3, '0')}`,
          userId: user.id,
          projectId: project.id,
          partnerId: partner.id,
          branchId: branch.id,
          status: i % 4 === 0 ? 'COMPLETED' : i % 3 === 0 ? 'IN_PROGRESS' : 'PENDING',
          inspectionType: inspectionTypes[i % inspectionTypes.length],
          scheduledDate: new Date(2025, 0, i),
          completedDate: i % 4 === 0 ? new Date(2025, 0, i + 1) : null,
        },
        select: { id: true, orderNumber: true }
      })
      orderRecords.push(order)
    }

    // 3) Create 20 InspectionPlans, link each to a company and creator, and relate to orders via TimelineEvent
    console.log('🗂️ Creating 20 inspection plans + timeline links to orders...')
    const planRecords = [] as Array<{ id: string }>
    for (let i = 1; i <= 20; i++) {
      const company = companies[i % companies.length]
      const creator = users[(i + 1) % users.length]
      const plan = await tx.inspectionPlan.create({
        data: {
          name: `Kế hoạch giám định phục hồi #${i}`,
          description: 'Phục hồi dữ liệu demo - kế hoạch giám định',
          status: i % 3 === 0 ? 'in_progress' : 'pending',
          startDate: new Date(2025, 0, i),
          endDate: i % 5 === 0 ? new Date(2025, 0, i + 7) : null,
          companyId: company.id,
          createdById: creator.id,
        },
        select: { id: true }
      })
      planRecords.push(plan)

      // Link plan to an order via TimelineEvent (FK backed), satisfying "plan must link to at least 1 order"
      const order = orderRecords[(i - 1) % orderRecords.length]
      await tx.timelineEvent.create({
        data: {
          title: 'Liên kết kế hoạch với đơn hàng',
          description: 'Tạo mốc thời gian để gắn kế hoạch với order',
          status: 'completed',
          eventDate: new Date(2025, 0, i),
          planId: plan.id,
          orderId: order.id,
          eventType: 'PLAN_ORDER_LINK',
          priority: 'MEDIUM',
          metadata: JSON.stringify({ orderNumber: order.orderNumber }),
          isMilestone: true,
        }
      })
    }

    // 4) Create some assets attached to plans (to support reports linkage)
    console.log('🔩 Creating 10 assets attached to plans...')
    const assetIds = [] as string[]
    for (let i = 1; i <= 10; i++) {
      const plan = planRecords[i % planRecords.length]
      const company = companies[i % companies.length]
      const asset = await tx.asset.create({
        data: {
          name: `Thiết bị phục hồi #${i}`,
          type: 'Thiết bị điện',
          description: 'Tài sản demo phục vụ báo cáo',
          status: 'active',
          location: i % 2 === 0 ? 'Hà Nội' : 'TP.HCM',
          companyId: company.id,
          planId: plan.id,
        },
        select: { id: true }
      })
      assetIds.push(asset.id)
    }

    // 5) Create 20 Reports, link to users and optionally assets, and attach them to orders via TimelineEvent
    console.log('📝 Creating 20 reports + timeline links to orders...')
    for (let i = 1; i <= 20; i++) {
      const creator = users[(i + 2) % users.length]
      const assetId = i % 2 === 0 ? assetIds[i % assetIds.length] : undefined
      const report = await tx.report.create({
        data: {
          title: `Báo cáo hiện trường phục hồi #${i}`,
          content: 'Nội dung báo cáo phục hồi dữ liệu demo',
          location: i % 2 === 0 ? 'Nhà máy VICEM' : 'Nhà máy Hòa Phát',
          reportDate: new Date(2025, 0, i + 2),
          status: i % 4 === 0 ? 'approved' : i % 3 === 0 ? 'submitted' : 'draft',
          assetId: assetId,
          createdById: creator.id,
        },
        select: { id: true }
      })

      // Create timeline event that references both an order (FK) and the report via metadata
      const order = orderRecords[(i + 3) % orderRecords.length]
      const plan = planRecords[(i + 1) % planRecords.length]
      await tx.timelineEvent.create({
        data: {
          title: 'Nộp báo cáo giám định',
          description: 'Báo cáo gắn với đơn hàng qua mốc thời gian',
          status: 'completed',
          eventDate: new Date(2025, 0, i + 3),
          planId: plan.id,
          orderId: order.id,
          eventType: 'REPORT_SUBMITTED',
          priority: 'HIGH',
          metadata: JSON.stringify({ reportId: report.id }),
          isMilestone: false,
        }
      })
    }

    // 6) Create 20 EAIPReports directly linked to orders
    console.log('📑 Creating 20 EAIP reports linked to orders...')
    for (let i = 1; i <= 20; i++) {
      const order = orderRecords[(i + 5) % orderRecords.length]
      await tx.eAIPReport.create({
        data: {
          orderId: order.id,
          severity: i % 4 === 0 ? 'CRITICAL' : i % 3 === 0 ? 'HIGH' : 'MEDIUM',
          riskLevel: i % 5 === 0 ? 'HIGH' : 'LOW',
          status: i % 2 === 0 ? 'COMPLETED' : 'PENDING',
          description: 'EAIP hiện trường và khuyến nghị',
          recommendations: 'Theo dõi tải và nhiệt độ, bảo dưỡng định kỳ',
          reportDate: new Date(2025, 0, i + 4),
        }
      })
    }

    console.log('✅ Creation completed inside transaction.')
  })

  // 7) Validation queries
  console.log('🔎 Validating counts and relationships...')
  const plansCount = await prisma.inspectionPlan.count()
  const reportsCount = await prisma.report.count()
  const eaipCount = await prisma.eAIPReport.count()
  console.log(`Plans: ${plansCount}, Reports: ${reportsCount}, EAIPReports: ${eaipCount}`)

  const ordersMissingCustomer = await prisma.order.count({ where: { partnerId: null } })
  console.log(`Orders missing customer (partnerId): ${ordersMissingCustomer}`)

  const plansWithOrderLink = await prisma.timelineEvent.count({ where: { planId: { not: null }, orderId: { not: null }, eventType: 'PLAN_ORDER_LINK' } })
  console.log(`Plans linked to orders via timeline: ${plansWithOrderLink}`)

  const reportEvents = await prisma.timelineEvent.count({ where: { eventType: 'REPORT_SUBMITTED', orderId: { not: null } } })
  console.log(`Report-submitted events linked to orders: ${reportEvents}`)

  // Show sample JOIN-like fetch for verification
  const sample = await prisma.order.findMany({
    take: 3,
    include: {
      partner: true,
      user: true,
      timeline: { where: { eventType: { in: ['PLAN_ORDER_LINK', 'REPORT_SUBMITTED'] } }, include: { plan: true } },
      eaipReports: true,
    }
  })
  console.log('📘 Sample order with joins:', JSON.stringify(sample, null, 2))

  console.log('🎉 Recovery completed successfully!')
}

recoverDemoData()
  .catch((e) => {
    console.error('❌ Recovery failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })