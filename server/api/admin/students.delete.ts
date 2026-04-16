import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = parseInt(query.id as string)

  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID ไม่ถูกต้อง'
    })
  }

  const prisma = getPrisma()

  try {
    await prisma.user.delete({
      where: {
        id,
        role: 'student'
      }
    })

    return {
      success: true,
      message: 'ลบข้อมูลนักศึกษาเรียบร้อยแล้ว'
    }
  } catch (error: any) {
    console.error('Delete Student Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการลบข้อมูลนักศึกษา'
    })
  }
})
