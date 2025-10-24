// 🌱 Database Seeder for WebApp Quản Lý Giám Định Nghiệp Đoàn DC
// Script to seed database with standardized demo data

import { PrismaClient } from '@prisma/client'
import { demoData } from './demo-data'

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    console.log('🚀 Starting database seeding...')
    
    // Clean existing data
    console.log('🧹 Cleaning existing data...')
    await prisma.task.deleteMany()
    await prisma.report.deleteMany()
    await prisma.certificate.deleteMany()
    await prisma.asset.deleteMany()
    await prisma.order.deleteMany()
    await prisma.user.deleteMany()
    await prisma.company.deleteMany()
    
    // Seed Companies
    console.log('🏢 Seeding companies...')
    for (const company of demoData.companies) {
      await prisma.company.create({
        data: {
          id: company.id,
          name: company.name,
          code: company.code,
          email: company.email,
          phone: company.phone,
          address: company.address,
          taxCode: company.taxCode,
          website: company.website,
          industry: company.industry,
          size: company.size,
          status: company.status,
          createdAt: new Date(company.createdAt),
          updatedAt: new Date(company.updatedAt)
        }
      })
    }
    console.log(`✅ Created ${demoData.companies.length} companies`)
    
    // Seed Users
    console.log('👥 Seeding users...')
    for (const user of demoData.users) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: user.role,
          department: user.department,
          position: user.position,
          avatar: user.avatar,
          status: user.status,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
          lastLogin: user.lastLogin ? new Date(user.lastLogin) : null
        }
      })
    }
    console.log(`✅ Created ${demoData.users.length} users`)
    
    // Seed Orders
    console.log('📋 Seeding orders...')
    for (const order of demoData.orders) {
      await prisma.order.create({
        data: {
          id: order.id,
          number: order.number,
          name: order.name,
          description: order.description,
          status: order.status,
          priority: order.priority,
          companyId: order.companyId,
          assignedTo: order.assignedTo,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
          deadline: new Date(order.deadline),
          progress: order.progress,
          risk: order.risk,
          estimatedValue: order.estimatedValue,
          actualValue: order.actualValue,
          location: order.location,
          contactPerson: order.contactPerson,
          contactPhone: order.contactPhone,
          contactEmail: order.contactEmail
        }
      })
    }
    console.log(`✅ Created ${demoData.orders.length} orders`)
    
    // Seed Assets
    console.log('🏗️ Seeding assets...')
    for (const asset of demoData.assets) {
      await prisma.asset.create({
        data: {
          id: asset.id,
          name: asset.name,
          code: asset.code,
          type: asset.type,
          category: asset.category,
          brand: asset.brand,
          model: asset.model,
          serialNumber: asset.serialNumber,
          manufactureDate: new Date(asset.manufactureDate),
          purchaseDate: new Date(asset.purchaseDate),
          purchasePrice: asset.purchasePrice,
          currentValue: asset.currentValue,
          location: asset.location,
          status: asset.status,
          condition: asset.condition,
          lastInspectionDate: asset.lastInspectionDate ? new Date(asset.lastInspectionDate) : null,
          nextInspectionDate: new Date(asset.nextInspectionDate),
          warrantyExpiry: asset.warrantyExpiry ? new Date(asset.warrantyExpiry) : null,
          companyId: asset.companyId,
          createdAt: new Date(asset.createdAt),
          updatedAt: new Date(asset.updatedAt)
        }
      })
    }
    console.log(`✅ Created ${demoData.assets.length} assets`)
    
    // Seed Reports
    console.log('📊 Seeding reports...')
    for (const report of demoData.reports) {
      await prisma.report.create({
        data: {
          id: report.id,
          orderNumber: report.orderNumber,
          orderId: report.orderId,
          title: report.title,
          content: report.content,
          summary: report.summary,
          conclusion: report.conclusion,
          recommendations: report.recommendations,
          status: report.status,
          inspectorId: report.inspectorId,
          reviewerId: report.reviewerId,
          inspectionDate: new Date(report.inspectionDate),
          submissionDate: new Date(report.submissionDate),
          reviewDate: report.reviewDate ? new Date(report.reviewDate) : null,
          approvalDate: report.approvalDate ? new Date(report.approvalDate) : null,
          location: report.location,
          weather: report.weather,
          temperature: report.temperature,
          humidity: report.humidity,
          images: report.images,
          attachments: report.attachments,
          createdAt: new Date(report.createdAt),
          updatedAt: new Date(report.updatedAt)
        }
      })
    }
    console.log(`✅ Created ${demoData.reports.length} reports`)
    
    // Seed Tasks
    console.log('📝 Seeding tasks...')
    for (const task of demoData.tasks) {
      await prisma.task.create({
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
          type: task.type,
          priority: task.priority,
          status: task.status,
          assignedTo: task.assignedTo,
          assignedBy: task.assignedBy,
          orderId: task.orderId,
          assetId: task.assetId,
          dueDate: new Date(task.dueDate),
          completedDate: task.completedDate ? new Date(task.completedDate) : null,
          estimatedHours: task.estimatedHours,
          actualHours: task.actualHours,
          location: task.location,
          notes: task.notes,
          attachments: task.attachments,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt)
        }
      })
    }
    console.log(`✅ Created ${demoData.tasks.length} tasks`)
    
    // Seed Certificates
    console.log('📜 Seeding certificates...')
    for (const certificate of demoData.certificates) {
      await prisma.certificate.create({
        data: {
          id: certificate.id,
          name: certificate.name,
          code: certificate.code,
          type: certificate.type,
          category: certificate.category,
          issuer: certificate.issuer,
          issueDate: new Date(certificate.issueDate),
          expiryDate: new Date(certificate.expiryDate),
          status: certificate.status,
          scope: certificate.scope,
          standards: certificate.standards,
          accreditedBy: certificate.accreditedBy,
          surveillanceFrequency: certificate.surveillanceFrequency,
          lastSurveillanceDate: certificate.lastSurveillanceDate ? new Date(certificate.lastSurveillanceDate) : null,
          nextSurveillanceDate: new Date(certificate.nextSurveillanceDate),
          attachments: certificate.attachments,
          createdAt: new Date(certificate.createdAt),
          updatedAt: new Date(certificate.updatedAt)
        }
      })
    }
    console.log(`✅ Created ${demoData.certificates.length} certificates`)
    
    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`- Companies: ${demoData.companies.length}`)
    console.log(`- Users: ${demoData.users.length}`)
    console.log(`- Orders: ${demoData.orders.length}`)
    console.log(`- Assets: ${demoData.assets.length}`)
    console.log(`- Reports: ${demoData.reports.length}`)
    console.log(`- Tasks: ${demoData.tasks.length}`)
    console.log(`- Certificates: ${demoData.certificates.length}`)
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error)
      process.exit(1)
    })
}

export default seedDatabase