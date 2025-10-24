import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const EAIPCreateSchema = z.object({
  orderNumber: z.string(),
  projectName: z.string(),
  companyName: z.string(),
  inspector: z.string(),
  reportDate: z.string(),
  severity: z.string(),
  riskLevel: z.string(),
  status: z.string(),
  description: z.string().optional(),
  recommendations: z.string().optional(),
});

// GET all EAIP reports
export async function GET() {
  try {
    const reports = await db.eAIPReport.findMany({
      include: {
        order: {
          include: {
            user: true,
            project: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // If no reports exist, create demo data
    if (reports.length === 0) {
      await createDemoData();
      const newReports = await db.eAIPReport.findMany({
        include: {
          order: {
            include: {
              user: true,
              project: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return NextResponse.json(newReports);
    }

    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching EAIP reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch EAIP reports' },
      { status: 500 }
    );
  }
}

// POST new EAIP report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = EAIPCreateSchema.parse(body);

    // Find or create order
    let order = await db.order.findUnique({
      where: { orderNumber: validatedData.orderNumber },
    });

    if (!order) {
      // Create a new user for inspector if not exists
      let user = await db.user.findFirst({
        where: { name: validatedData.inspector },
      });

      if (!user) {
        user = await db.user.create({
          data: {
            name: validatedData.inspector,
            email: `${validatedData.inspector.toLowerCase().replace(/\s+/g, '.')}@example.com`,
            role: 'INSPECTOR',
          },
        });
      }

      // Create a new project if not exists
      let project = await db.project.findFirst({
        where: { name: validatedData.projectName },
      });

      if (!project) {
        project = await db.project.create({
          data: {
            name: validatedData.projectName,
            company: validatedData.companyName,
            status: 'ACTIVE',
          },
        });
      }

      // Create order
      order = await db.order.create({
        data: {
          orderNumber: validatedData.orderNumber,
          userId: user.id,
          projectId: project.id,
          status: 'IN_PROGRESS',
          inspectionType: 'EAIP_ASSESSMENT',
          scheduledDate: new Date(validatedData.reportDate),
        },
      });
    }

    // Create EAIP report
    const report = await db.eAIPReport.create({
      data: {
        orderId: order.id,
        severity: validatedData.severity,
        riskLevel: validatedData.riskLevel,
        status: validatedData.status,
        description: validatedData.description || '',
        recommendations: validatedData.recommendations || '',
        reportDate: new Date(validatedData.reportDate),
      },
      include: {
        order: {
          include: {
            user: true,
            project: true,
          },
        },
      },
    });

    // Create timeline event
    await db.timelineEvent.create({
      data: {
        orderId: order.id,
        userId: order.userId,
        eventType: 'EAIP_REPORT_CREATED',
        title: `EAIP Report Created`,
        description: `EAIP assessment report created for ${validatedData.projectName}`,
        timestamp: new Date(),
        priority: 'MEDIUM',
        metadata: {
          reportId: report.id,
          severity: validatedData.severity,
          riskLevel: validatedData.riskLevel,
        },
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error('Error creating EAIP report:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create EAIP report' },
      { status: 500 }
    );
  }
}

// Function to create demo data
async function createDemoData() {
  try {
    console.log('Creating demo EAIP data...');

    // Create demo users (inspectors)
    const demoUsers = [
      {
        name: 'Nguyễn Văn An',
        email: 'an.nguyen@inspection.com',
        role: 'INSPECTOR',
        department: 'EAIP Assessment',
      },
      {
        name: 'Trần Thị Bình',
        email: 'binh.tran@inspection.com',
        role: 'INSPECTOR',
        department: 'EAIP Assessment',
      },
      {
        name: 'Lê Văn Cường',
        email: 'cuong.le@inspection.com',
        role: 'INSPECTOR',
        department: 'EAIP Assessment',
      },
      {
        name: 'Phạm Thị Dung',
        email: 'dung.pham@inspection.com',
        role: 'INSPECTOR',
        department: 'EAIP Assessment',
      },
    ];

    const createdUsers = [];
    for (const userData of demoUsers) {
      let user = await db.user.findFirst({
        where: { email: userData.email },
      });
      if (!user) {
        user = await db.user.create({ data: userData });
      }
      createdUsers.push(user);
    }

    // Create demo projects
    const demoProjects = [
      {
        name: 'Dự án Nhà máy Thủy điện Sông Đà',
        company: 'Tập đoàn Điện lực Việt Nam',
        description: 'Kiểm tra an toàn lao động và thiết bị',
        status: 'ACTIVE',
      },
      {
        name: 'Dự án Khu công nghiệp Hòa Phát',
        company: 'Công ty TNHH Hòa Phát',
        description: 'Đánh giá rủi ro an toàn công nghiệp',
        status: 'ACTIVE',
      },
      {
        name: 'Dự án Tòa nhà Landmark 81',
        company: 'Công ty Cổ phần Vinhomes',
        description: 'Kiểm tra hệ thống phòng cháy chữa cháy',
        status: 'ACTIVE',
      },
      {
        name: 'Dự án Nhà máy Formosa Hà Tĩnh',
        company: 'Công ty TNHH Hưng Nghiệp Formosa',
        description: 'Đánh giá an toàn môi trường',
        status: 'ACTIVE',
      },
    ];

    const createdProjects = [];
    for (const projectData of demoProjects) {
      let project = await db.project.findFirst({
        where: { name: projectData.name },
      });
      if (!project) {
        project = await db.project.create({ data: projectData });
      }
      createdProjects.push(project);
    }

    // Create demo orders
    const demoOrders = [
      {
        orderNumber: 'EAIP-2024-001',
        inspectionType: 'EAIP_ASSESSMENT',
        scheduledDate: new Date('2024-01-15'),
        status: 'COMPLETED',
      },
      {
        orderNumber: 'EAIP-2024-002',
        inspectionType: 'EAIP_ASSESSMENT',
        scheduledDate: new Date('2024-01-20'),
        status: 'COMPLETED',
      },
      {
        orderNumber: 'EAIP-2024-003',
        inspectionType: 'EAIP_ASSESSMENT',
        scheduledDate: new Date('2024-02-01'),
        status: 'IN_PROGRESS',
      },
      {
        orderNumber: 'EAIP-2024-004',
        inspectionType: 'EAIP_ASSESSMENT',
        scheduledDate: new Date('2024-02-10'),
        status: 'PENDING',
      },
      {
        orderNumber: 'EAIP-2024-005',
        inspectionType: 'EAIP_ASSESSMENT',
        scheduledDate: new Date('2024-02-15'),
        status: 'COMPLETED',
      },
      {
        orderNumber: 'EAIP-2024-006',
        inspectionType: 'EAIP_ASSESSMENT',
        scheduledDate: new Date('2024-02-20'),
        status: 'IN_PROGRESS',
      },
      {
        orderNumber: 'EAIP-2024-007',
        inspectionType: 'EAIP_ASSESSMENT',
        scheduledDate: new Date('2024-03-01'),
        status: 'PENDING',
      },
      {
        orderNumber: 'EAIP-2024-008',
        inspectionType: 'EAIP_ASSESSMENT',
        scheduledDate: new Date('2024-03-05'),
        status: 'COMPLETED',
      },
    ];

    const createdOrders = [];
    for (let i = 0; i < demoOrders.length; i++) {
      const orderData = demoOrders[i];
      let order = await db.order.findUnique({
        where: { orderNumber: orderData.orderNumber },
      });
      if (!order) {
        order = await db.order.create({
          data: {
            ...orderData,
            userId: createdUsers[i % createdUsers.length].id,
            projectId: createdProjects[i % createdProjects.length].id,
          },
        });
      }
      createdOrders.push(order);
    }

    // Create demo EAIP reports
    const demoReports = [
      {
        severity: 'CRITICAL',
        riskLevel: 'HIGH',
        status: 'COMPLETED',
        description: 'Phát hiện nhiều vấn đề an toàn nghiêm trọng cần xử lý ngay',
        recommendations: 'Cần nâng cấp hệ thống an toàn và đào tạo lại nhân viên',
        reportDate: new Date('2024-01-15'),
      },
      {
        severity: 'MEDIUM',
        riskLevel: 'MEDIUM',
        status: 'COMPLETED',
        description: 'Một số vấn đề về quy trình cần cải thiện',
        recommendations: 'Tối ưu hóa quy trình làm việc và tăng cường giám sát',
        reportDate: new Date('2024-01-20'),
      },
      {
        severity: 'HIGH',
        riskLevel: 'HIGH',
        status: 'IN_PROGRESS',
        description: 'Đang đánh giá các rủi ro về thiết bị',
        recommendations: 'Chờ kết quả kiểm tra chi tiết',
        reportDate: new Date('2024-02-01'),
      },
      {
        severity: 'LOW',
        riskLevel: 'LOW',
        status: 'PENDING',
        description: 'Kiểm tra định kỳ theo kế hoạch',
        recommendations: 'Chưa có khuyến nghị cụ thể',
        reportDate: new Date('2024-02-10'),
      },
      {
        severity: 'MEDIUM',
        riskLevel: 'MEDIUM',
        status: 'COMPLETED',
        description: 'Các vấn đề về an toàn lao động đã được khắc phục',
        recommendations: 'Duy trì các biện pháp an toàn hiện tại',
        reportDate: new Date('2024-02-15'),
      },
      {
        severity: 'HIGH',
        riskLevel: 'CRITICAL',
        status: 'IN_PROGRESS',
        description: 'Phát hiện rủi ro cao về môi trường',
        recommendations: 'Cần đánh giá tác động môi trường chi tiết',
        reportDate: new Date('2024-02-20'),
      },
      {
        severity: 'LOW',
        riskLevel: 'MEDIUM',
        status: 'PENDING',
        description: 'Kiểm tra an toàn hệ thống điện',
        recommendations: 'Chờ lịch kiểm tra từ chuyên gia',
        reportDate: new Date('2024-03-01'),
      },
      {
        severity: 'CRITICAL',
        riskLevel: 'CRITICAL',
        status: 'APPROVED',
        description: 'Các vấn đề nghiêm trọng đã được phê duyệt xử lý',
        recommendations: 'Thực hiện các biện pháp khắc phục ngay lập tức',
        reportDate: new Date('2024-03-05'),
      },
    ];

    for (let i = 0; i < demoReports.length; i++) {
      const reportData = demoReports[i];
      await db.eAIPReport.create({
        data: {
          ...reportData,
          orderId: createdOrders[i].id,
        },
      });

      // Create timeline events
      await db.timelineEvent.create({
        data: {
          orderId: createdOrders[i].id,
          userId: createdUsers[i % createdUsers.length].id,
          eventType: 'EAIP_REPORT_CREATED',
          title: `EAIP Report Created - ${createdOrders[i].orderNumber}`,
          description: `EAIP assessment report created for ${createdProjects[i % createdProjects.length].name}`,
          timestamp: new Date(),
          priority: reportData.severity,
          metadata: JSON.stringify({
            severity: reportData.severity,
            riskLevel: reportData.riskLevel,
            status: reportData.status,
          }),
        },
      });
    }

    console.log('Demo EAIP data created successfully');
  } catch (error) {
    console.error('Error creating demo data:', error);
  }
}