import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    const teachers = await prisma.user.findMany({
      where: {
        role: 'teacher'
      },
      orderBy: {
        fullname: 'asc'
      }
    })

    return {
      success: true,
      teachers
    }
  } catch (error: any) {
    console.error('Fetch Teachers Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลอาจารย์'
    })
  }
})
