import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedData = async () => {
  try {
    console.log('Starting database seeding...')

    // Create demo users
    const users = await Promise.all([
      prisma.user.upsert({
        where: { email: 'nguyen.van.an@example.com' },
        update: {},
        create: {
          email: 'nguyen.van.an@example.com',
          name: 'Nguyễn Văn An',
          role: 'INSPECTOR',
          phone: '0901234567',
          department: 'Technical Inspection'
        }
      }),
      prisma.user.upsert({
        where: { email: 'tran.thi.binh@example.com' },
        update: {},
        create: {
          email: 'tran.thi.binh@example.com',
          name: 'Trần Thị Bình',
          role: 'INSPECTOR',
          phone: '0901234568',
          department: 'Safety Inspection'
        }
      }),
      prisma.user.upsert({
        where: { email: 'le.van.cuong@example.com' },
        update: {},
        create: {
          email: 'le.van.cuong@example.com',
          name: 'Lê Văn Cường',
          role: 'INSPECTOR',
          phone: '0901234569',
          department: 'Quality Assurance'
        }
      }),
      prisma.user.upsert({
        where: { email: 'pham.thi.dung@example.com' },
        update: {},
        create: {
          email: 'pham.thi.dung@example.com',
          name: 'Phạm Thị Dung',
          role: 'INSPECTOR',
          phone: '0901234570',
          department: 'Electrical Inspection'
        }
      }),
      prisma.user.upsert({
        where: { email: 'hoang.van.em@example.com' },
        update: {},
        create: {
          email: 'hoang.van.em@example.com',
          name: 'Hoàng Văn Em',
          role: 'INSPECTOR',
          phone: '0901234571',
          department: 'Fire Safety'
        }
      })
    ])

    // Create demo projects
    const projects = await Promise.all([
      prisma.project.upsert({
        where: { id: 'project-1' },
        update: {},
        create: {
          id: 'project-1',
          name: 'Máy phát điện 1500KVA',
          company: 'Công ty Điện lực ABC',
          description: 'Installation and inspection of 1500KVA generator system',
          status: 'ACTIVE',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31')
        }
      }),
      prisma.project.upsert({
        where: { id: 'project-2' },
        update: {},
        create: {
          id: 'project-2',
          name: 'Hệ thống điện nhà xưởng',
          company: 'Công ty XYZ Manufacturing',
          description: 'Complete electrical system installation for manufacturing facility',
          status: 'ACTIVE',
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-06-30')
        }
      }),
      prisma.project.upsert({
        where: { id: 'project-3' },
        update: {},
        create: {
          id: 'project-3',
          name: 'Thiết bị nâng',
          company: 'Công ty Cơ khí DEF',
          description: 'Lifting equipment inspection and certification',
          status: 'ACTIVE',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-08-31')
        }
      }),
      prisma.project.upsert({
        where: { id: 'project-4' },
        update: {},
        create: {
          id: 'project-4',
          name: 'Hệ thống chống sét',
          company: 'Tòa nhà Landmark 81',
          description: 'Lightning protection system installation and inspection',
          status: 'COMPLETED',
          startDate: new Date('2023-12-01'),
          endDate: new Date('2024-01-31')
        }
      }),
      prisma.project.upsert({
        where: { id: 'project-5' },
        update: {},
        create: {
          id: 'project-5',
          name: 'Hệ thống PCCC',
          company: 'Trung tâm thương mại Vincom',
          description: 'Fire protection system installation and maintenance',
          status: 'ACTIVE',
          startDate: new Date('2024-01-10'),
          endDate: new Date('2024-03-30')
        }
      })
    ])

    // Create demo partners
    const partners = await Promise.all([
      prisma.partner.upsert({
        where: { id: 'partner-1' },
        update: {},
        create: {
          id: 'partner-1',
          name: 'Công ty Điện lực ABC',
          type: 'CUSTOMER',
          email: 'info@dienlucabc.vn',
          phone: '0281234567',
          address: '123 Nguyễn Huệ, Q.1, TP.HCM',
          taxCode: '123456789',
          contactPerson: 'Trần Văn Nam',
          status: 'ACTIVE'
        }
      }),
      prisma.partner.upsert({
        where: { id: 'partner-2' },
        update: {},
        create: {
          id: 'partner-2',
          name: 'Công ty XYZ Manufacturing',
          type: 'CUSTOMER',
          email: 'contact@xyzmanufacturing.com',
          phone: '0282345678',
          address: '456 Lê Lợi, Q.1, TP.HCM',
          taxCode: '234567890',
          contactPerson: 'Lê Thị Mai',
          status: 'ACTIVE'
        }
      }),
      prisma.partner.upsert({
        where: { id: 'partner-3' },
        update: {},
        create: {
          id: 'partner-3',
          name: 'Công ty Cơ khí DEF',
          type: 'SUPPLIER',
          email: 'sales@co Khi def.vn',
          phone: '0283456789',
          address: '789 Võ Văn Kiệt, Q.1, TP.HCM',
          taxCode: '345678901',
          contactPerson: 'Nguyễn Văn Hùng',
          status: 'ACTIVE'
        }
      })
    ])

    // Create demo branches
    const branches = await Promise.all([
      prisma.branch.upsert({
        where: { code: 'HCM-01' },
        update: {},
        create: {
          name: 'Chi nhánh TP.HCM',
          code: 'HCM-01',
          address: '123 Đồng Khởi, Q.1, TP.HCM',
          phone: '0281234567',
          email: 'hcm01@company.com',
          manager: 'Trần Văn Nam',
          status: 'ACTIVE'
        }
      }),
      prisma.branch.upsert({
        where: { code: 'HN-01' },
        update: {},
        create: {
          name: 'Chi nhánh Hà Nội',
          code: 'HN-01',
          address: '456 Ba Đình, Hà Nội',
          phone: '0241234567',
          email: 'hn01@company.com',
          manager: 'Lê Thị Mai',
          status: 'ACTIVE'
        }
      }),
      prisma.branch.upsert({
        where: { code: 'DN-01' },
        update: {},
        create: {
          name: 'Chi nhánh Đà Nẵng',
          code: 'DN-01',
          address: '789 Hải Phòng, Đà Nẵng',
          phone: '0236123456',
          email: 'dn01@company.com',
          manager: 'Nguyễn Văn Hùng',
          status: 'ACTIVE'
        }
      })
    ])

    // Create demo orders
    const orders = await Promise.all([
      prisma.order.upsert({
        where: { orderNumber: 'ORD-2024-001' },
        update: {},
        create: {
          orderNumber: 'ORD-2024-001',
          userId: users[0].id,
          projectId: projects[0].id,
          partnerId: partners[0].id,
          branchId: branches[0].id,
          status: 'COMPLETED',
          inspectionType: 'EAIP_ASSESSMENT',
          scheduledDate: new Date('2024-01-15'),
          completedDate: new Date('2024-01-15')
        }
      }),
      prisma.order.upsert({
        where: { orderNumber: 'ORD-2024-002' },
        update: {},
        create: {
          orderNumber: 'ORD-2024-002',
          userId: users[1].id,
          projectId: projects[1].id,
          partnerId: partners[1].id,
          branchId: branches[0].id,
          status: 'IN_PROGRESS',
          inspectionType: 'EAIP_ASSESSMENT',
          scheduledDate: new Date('2024-01-16')
        }
      }),
      prisma.order.upsert({
        where: { orderNumber: 'ORD-2024-003' },
        update: {},
        create: {
          orderNumber: 'ORD-2024-003',
          userId: users[2].id,
          projectId: projects[2].id,
          partnerId: partners[2].id,
          branchId: branches[1].id,
          status: 'PENDING',
          inspectionType: 'EAIP_ASSESSMENT',
          scheduledDate: new Date('2024-01-17')
        }
      }),
      prisma.order.upsert({
        where: { orderNumber: 'ORD-2024-004' },
        update: {},
        create: {
          orderNumber: 'ORD-2024-004',
          userId: users[3].id,
          projectId: projects[3].id,
          partnerId: partners[0].id,
          branchId: branches[2].id,
          status: 'APPROVED',
          inspectionType: 'EAIP_ASSESSMENT',
          scheduledDate: new Date('2024-01-14'),
          completedDate: new Date('2024-01-14')
        }
      }),
      prisma.order.upsert({
        where: { orderNumber: 'ORD-2024-005' },
        update: {},
        create: {
          orderNumber: 'ORD-2024-005',
          userId: users[4].id,
          projectId: projects[4].id,
          partnerId: partners[1].id,
          branchId: branches[0].id,
          status: 'REVIEWED',
          inspectionType: 'EAIP_ASSESSMENT',
          scheduledDate: new Date('2024-01-18'),
          completedDate: new Date('2024-01-18')
        }
      })
    ])

    // Create 20 EAIP demo reports
    const eaipReportsData = [
      {
        orderId: orders[0].id,
        severity: 'HIGH',
        riskLevel: 'HIGH',
        status: 'COMPLETED',
        description: 'Phát hiện vấn đề về hệ thống làm mát của máy phát điện. Quạt làm mát hoạt động không hiệu quả, nhiệt độ hoạt động cao hơn mức cho phép.',
        recommendations: 'Cần bảo dưỡng định kỳ hệ thống tản nhiệt, vệ sinh quạt làm mát, kiểm tra dầu bôi trơn và thay thế khi cần thiết.',
        reportDate: new Date('2024-01-15')
      },
      {
        orderId: orders[1].id,
        severity: 'MEDIUM',
        riskLevel: 'MEDIUM',
        status: 'IN_PROGRESS',
        description: 'Đánh giá an toàn hệ thống điện nhà xưởng. Phát hiện một số điểm kết nối không đạt chuẩn, hệ thống grounding cần cải thiện.',
        recommendations: 'Nâng cấp hệ thống grounding, siết lại các điểm kết nối, thay thế các dây điện bị mài mòn.',
        reportDate: new Date('2024-01-16')
      },
      {
        orderId: orders[2].id,
        severity: 'CRITICAL',
        riskLevel: 'CRITICAL',
        status: 'PENDING',
        description: 'Kiểm tra cần trục và thiết bị nâng. Phát hiện dây cáp bị mài mòn nghiêm trọng, có nguy cơ đứt cáp trong quá trình vận hành.',
        recommendations: 'Cần thay thế ngay lập tức dây cáp bị mài mòn, kiểm tra toàn bộ hệ thống phanh, bảo dưỡng định kỳ các vòng bi.',
        reportDate: new Date('2024-01-17')
      },
      {
        orderId: orders[3].id,
        severity: 'LOW',
        riskLevel: 'LOW',
        status: 'APPROVED',
        description: 'Kiểm tra hệ thống tiếp đất và chống sét. Hệ thống hoạt động tốt, các thông số kỹ thuật đạt yêu cầu.',
        recommendations: 'Hệ thống hoạt động tốt, chỉ cần bảo dưỡng định kỳ 6 tháng/lần.',
        reportDate: new Date('2024-01-14')
      },
      {
        orderId: orders[4].id,
        severity: 'MEDIUM',
        riskLevel: 'MEDIUM',
        status: 'REVIEWED',
        description: 'Kiểm tra hệ thống phòng cháy chữa cháy. Các bình chữa cháy còn hạn sử dụng, hệ thống báo cháy hoạt động tốt.',
        recommendations: 'Cần bổ sung bình chữa cháy tại khu vực stairs, tổ chức tập huấn PCCC định kỳ.',
        reportDate: new Date('2024-01-18')
      },
      {
        orderId: orders[0].id,
        severity: 'MEDIUM',
        riskLevel: 'MEDIUM',
        status: 'COMPLETED',
        description: 'Kiểm tra hệ thống điều khiển tự động của máy phát điện. Một số cảm biến cần hiệu chỉnh lại.',
        recommendations: 'Hiệu chỉnh lại các cảm biến nhiệt độ và áp suất, cập nhật phần mềm điều khiển phiên bản mới nhất.',
        reportDate: new Date('2024-01-12')
      },
      {
        orderId: orders[1].id,
        severity: 'LOW',
        riskLevel: 'LOW',
        status: 'APPROVED',
        description: 'Kiểm tra hệ thống chiếu sáng nhà xưởng. Độ sáng đạt yêu cầu, các đèn LED hoạt động tốt.',
        recommendations: 'Hệ thống hoạt động tốt, chỉ cần vệ sinh đèn định kỳ.',
        reportDate: new Date('2024-01-13')
      },
      {
        orderId: orders[2].id,
        severity: 'HIGH',
        riskLevel: 'HIGH',
        status: 'IN_PROGRESS',
        description: 'Kiểm tra hệ thống thủy lực của thiết bị nâng. Phát hiện rò rỉ dầu tại các điểm kết nối.',
        recommendations: 'Thay thế các gioăng cao su bị chai cứng, siết lại các kết nối, kiểm tra áp suất hoạt động.',
        reportDate: new Date('2024-01-19')
      },
      {
        orderId: orders[3].id,
        severity: 'MEDIUM',
        riskLevel: 'MEDIUM',
        status: 'COMPLETED',
        description: 'Kiểm tra hệ thống nguồn dự phòng. UPS hoạt động tốt nhưng thời lượng pin giảm.',
        recommendations: 'Thay thế bộ pin UPS, kiểm tra hệ thống chuyển mạch tự động.',
        reportDate: new Date('2024-01-11')
      },
      {
        orderId: orders[4].id,
        severity: 'CRITICAL',
        riskLevel: 'CRITICAL',
        status: 'PENDING',
        description: 'Kiểm tra hệ thống báo cháy nhiệt. Một số đầu dò không hoạt động, có nguy cơ không phát hiện cháy kịp thời.',
        recommendations: 'Thay thế các đầu dò nhiệt bị lỗi, kiểm tra lại toàn bộ hệ thống kết nối.',
        reportDate: new Date('2024-01-20')
      },
      {
        orderId: orders[0].id,
        severity: 'LOW',
        riskLevel: 'LOW',
        status: 'APPROVED',
        description: 'Kiểm tra hệ thống nhiên liệu. Dầu diesel đạt tiêu chuẩn, không có tạp chất.',
        recommendations: 'Hệ thống hoạt động tốt, tiếp tục theo dõi định kỳ.',
        reportDate: new Date('2024-01-10')
      },
      {
        orderId: orders[1].id,
        severity: 'HIGH',
        riskLevel: 'HIGH',
        status: 'REVIEWED',
        description: 'Kiểm tra tủ điện phân phối. Phát hiện quá tải tại một số nhánh, cần phân tích lại tải.',
        recommendations: 'Phân tích lại tải tiêu thụ, cân bằng lại các pha, xem xét nâng cấp công suất tủ điện.',
        reportDate: new Date('2024-01-21')
      },
      {
        orderId: orders[2].id,
        severity: 'MEDIUM',
        riskLevel: 'MEDIUM',
        status: 'COMPLETED',
        description: 'Kiểm tra hệ thống hãm phanh cơ. Phanh hoạt động nhưng có tiếng kêu bất thường.',
        recommendations: 'Bảo dưỡng hệ thống hãm, thay thế má phanh, kiểm tra hệ thống điều khiển phanh.',
        reportDate: new Date('2024-01-09')
      },
      {
        orderId: orders[3].id,
        severity: 'CRITICAL',
        riskLevel: 'CRITICAL',
        status: 'IN_PROGRESS',
        description: 'Kiểm tra hệ thống cấp nguồn cho thiết bị giám sát. Phát hiện sụt áp không ổn định.',
        recommendations: 'Kiểm tra và ổn định nguồn cấp, lắp đặt bộ ổn áp, kiểm tra hệ thống grounding.',
        reportDate: new Date('2024-01-22')
      },
      {
        orderId: orders[4].id,
        severity: 'LOW',
        riskLevel: 'LOW',
        status: 'APPROVED',
        description: 'Kiểm tra hệ thống van an toàn. Các van hoạt động đúng áp suất thiết kế.',
        recommendations: 'Hệ thống hoạt động tốt, chỉ cần kiểm tra định kỳ.',
        reportDate: new Date('2024-01-08')
      },
      {
        orderId: orders[0].id,
        severity: 'MEDIUM',
        riskLevel: 'MEDIUM',
        status: 'REVIEWED',
        description: 'Kiểm tra hệ thống giám sát từ xa. Kết nối mạng không ổn định, cần cải thiện.',
        recommendations: 'Nâng cấp hệ thống mạng, lắp đặt bộ phát wifi công suất lớn, kiểm tra cáp mạng.',
        reportDate: new Date('2024-01-23')
      },
      {
        orderId: orders[1].id,
        severity: 'HIGH',
        riskLevel: 'HIGH',
        status: 'PENDING',
        description: 'Kiểm tra hệ thống chống quá tải. Một số CB không hoạt động đúng khi quá tải.',
        recommendations: 'Thay thế các CB bị lỗi, kiểm tra lại hệ thống chọn CB phù hợp với tải.',
        reportDate: new Date('2024-01-24')
      },
      {
        orderId: orders[2].id,
        severity: 'LOW',
        riskLevel: 'LOW',
        status: 'COMPLETED',
        description: 'Kiểm tra hệ thống điều khiển từ xa. Remote control hoạt động tốt.',
        recommendations: 'Hệ thống hoạt động tốt, chỉ cần thay pin định kỳ.',
        reportDate: new Date('2024-01-07')
      },
      {
        orderId: orders[3].id,
        severity: 'MEDIUM',
        riskLevel: 'MEDIUM',
        status: 'IN_PROGRESS',
        description: 'Kiểm tra hệ thống đèn hiệu và báo hiệu. Một số đèn LED bị yếu.',
        recommendations: 'Thay thế các đèn LED bị yếu, kiểm tra hệ thống cấp nguồn cho đèn hiệu.',
        reportDate: new Date('2024-01-25')
      },
      {
        orderId: orders[4].id,
        severity: 'CRITICAL',
        riskLevel: 'CRITICAL',
        status: 'REVIEWED',
        description: 'Kiểm tra hệ thống chữa cháy tự động. Sprinkler không hoạt động tại khu vực kho.',
        recommendations: 'Sửa chữa hệ thống sprinkler, kiểm tra van chính, kiểm tra áp suất nước.',
        reportDate: new Date('2024-01-26')
      }
    ]

    // Create all EAIP reports
    const eaipReports = await Promise.all(
      eaipReportsData.map((report, index) =>
        prisma.eAIPReport.upsert({
          where: { id: `eaip-${index + 1}` },
          update: {},
          create: {
            id: `eaip-${index + 1}`,
            ...report
          }
        })
      )
    )

    // Create timeline events for EAIP reports
    const timelineEvents = await Promise.all(
      eaipReports.map((report, index) =>
        prisma.timelineEvent.create({
          data: {
            title: `EAIP Report Created`,
            description: `EAIP assessment report created for order ${report.orderId}`,
            eventDate: report.reportDate,
            orderId: report.orderId,
            userId: users[index % users.length].id,
            eventType: 'EAIP_REPORT_CREATED',
            priority: report.severity,
            metadata: JSON.stringify({
              reportId: report.id,
              severity: report.severity,
              riskLevel: report.riskLevel
            }),
            sequence: index + 1,
            isMilestone: report.severity === 'CRITICAL'
          }
        })
      )
    )

    console.log('Database seeding completed successfully!')
    console.log(`Created ${users.length} users`)
    console.log(`Created ${projects.length} projects`)
    console.log(`Created ${partners.length} partners`)
    console.log(`Created ${branches.length} branches`)
    console.log(`Created ${orders.length} orders`)
    console.log(`Created ${eaipReports.length} EAIP reports`)
    console.log(`Created ${timelineEvents.length} timeline events`)

  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedData()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })