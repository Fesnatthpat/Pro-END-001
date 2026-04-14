import { compare } from 'bcryptjs'
import { getPrisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email_or_id, password } = body

  const prisma = getPrisma()

  try {
    // 1. Try to find in Admin table first
    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          { username: email_or_id },
          { email: email_or_id }
        ]
      }
    })

    if (admin) {
      const isPasswordValid = await compare(password, admin.password)
      if (!isPasswordValid) {
        throw createError({ statusCode: 401, statusMessage: 'รหัสผ่านไม่ถูกต้อง' })
      }
      return {
        success: true,
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          fullname: admin.fullname,
          role: 'admin'
        }
      }
    }

    // 2. If not admin, try to find in User table (Student/Teacher)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: email_or_id },
          { email: email_or_id }
        ]
      }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'ไม่พบผู้ใช้งานในระบบ'
      })
    }

    // 3. Compare password
    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'รหัสผ่านไม่ถูกต้อง'
      })
    }

    // 4. Check approval status
    if (!user.isApproved) {
      throw createError({
        statusCode: 403,
        statusMessage: 'ชื่อผู้ใช้นี้ยังไม่ได้รับอนุมัติจากผู้ดูแลระบบ'
      })
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        profileImage: user.profileImage,
        tel: user.tel,
        lineId: user.lineId,
        role: user.role,
        isApproved: user.isApproved
      }
    }
  } catch (error: any) {
    console.error('Login Error:', error)
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
    })
  }
})
