import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    const students = await prisma.user.findMany({
      where: {
        role: 'student',
        isApproved: true
      },
      orderBy: {
        username: 'asc'
      }
    })

    return {
      success: true,
      students
    }
  } catch (error: any) {
    console.error('Fetch Approved Students Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา'
    })
  }
})
