import { PrismaClient } from './generated/client/index.js'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { hash } from 'bcryptjs'
import 'dotenv/config'

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new Error('DATABASE_URL is missing')

  const pool = new pg.Pool({ connectionString: databaseUrl })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  try {
    // 1. สร้าง/อัปเดต Admin
    const adminPassword = await hash('admin1234', 10)
    await prisma.admin.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        password: adminPassword,
        fullname: 'System Administrator',
        email: 'admin@bsru.ac.th'
      }
    })
    console.log('✅ Admin account: admin / admin1234')

    // 2. สร้าง/อัปเดต Teacher (อยู่ในตาราง User แต่เปลี่ยน Role เป็น teacher)
    const teacherPassword = await hash('teacher1234', 10)
    await prisma.user.upsert({
      where: { username: 'teacher01' },
      update: {
        role: 'teacher',
        isApproved: true
      },
      create: {
        username: 'teacher01',
        password: teacherPassword,
        fullname: 'อ.ธีรพัฒน์ ใจดี',
        email: 'teerapat@bsru.ac.th',
        academicYear: '2569',
        tel: '081-xxx-xxxx',
        role: 'teacher',
        isApproved: true
      }
    })
    console.log('✅ Teacher account: teacher01 / teacher1234')

  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
