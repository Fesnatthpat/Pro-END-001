<template>
  <div class="p-4 md:p-8 font-['Prompt',_sans-serif]">
    
    <div class="mb-6">
      <NuxtLink to="/admin" class="inline-flex items-center gap-2 text-slate-500 hover:text-[#1a1a40] font-bold text-sm transition-colors group">
        <i class="bi bi-arrow-left group-hover:-translate-x-1 transition-transform"></i> ย้อนกลับไปหน้า Dashboard
      </NuxtLink>
    </div>

    <div class="mb-8">
      <div class="flex items-center gap-2 text-blue-500 font-bold mb-2"><i class="bi bi-person-fill-add"></i> คำร้องเข้าใช้งานใหม่</div>
      <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">จัดการการอนุมัตินักศึกษา</h2>
      <p class="text-slate-500 text-sm">ตรวจสอบรายชื่อนักศึกษาใหม่ที่รอการยืนยันสิทธิ์</p>
    </div>

    <div class="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100 min-h-[60vh] animate-[fadeIn_0.3s_ease-in-out]">
      
      <div v-if="!pendingList || pendingList.length === 0" class="py-24 text-center">
        <div class="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner"><i class="bi bi-check-all"></i></div>
        <h3 class="text-2xl font-bold text-slate-800 mb-2">จัดการคำร้องครบถ้วนแล้ว!</h3>
        <p class="text-slate-500 text-sm mb-10 max-w-xs mx-auto">ขณะนี้ไม่มีนักศึกษาที่รอการอนุมัติสิทธิ์เข้าใช้งานระบบ</p>
      </div>

      <div v-else>
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-6 border-b border-slate-100">
          <div class="text-slate-700 font-bold">
            รายการที่รอตรวจสอบ <span class="text-blue-600 text-xl mx-1">{{ pendingList.length }}</span> รายการ
          </div>
        </div>

        <div class="overflow-x-auto pb-4">
          <table class="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr class="bg-slate-50 text-slate-500 text-sm">
                <th class="py-3 font-bold px-4 text-center w-[80px] rounded-l-xl">รูป</th>
                <th class="py-3 font-bold">รหัสนักศึกษา</th>
                <th class="py-3 font-bold">ชื่อ - นามสกุล</th>
                <th class="py-3 font-bold">อีเมล (Email)</th>
                <th class="py-3 font-bold text-center">สถานะ</th>
                <th class="py-3 font-bold text-center rounded-r-xl">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in pendingList" :key="student.id" class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td class="py-4 px-4 text-center">
                  <div v-if="student.profileImage" class="w-10 h-10 rounded-full border border-slate-200 shadow-inner mx-auto overflow-hidden">
                    <img :src="student.profileImage" alt="Profile" class="w-full h-full object-cover">
                  </div>
                  <div v-else class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 font-bold text-sm flex items-center justify-center border border-slate-200 shadow-inner mx-auto">
                    {{ student.fullname.substring(0, 1) }}
                  </div>
                </td>
                <td class="py-4 font-bold text-slate-500">{{ student.username }}</td>
                <td class="py-4 font-bold text-slate-800">{{ student.fullname }}</td>
                <td class="py-4 text-[15px] text-slate-500 font-medium">{{ student.email }}</td>
                <td class="py-4 text-center">
                  <span class="bg-amber-50 text-amber-600 border border-amber-200 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap inline-flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span> รออนุมัติ
                  </span>
                </td>
                <td class="py-4 text-center">
                  <button @click="approveStudent(student.id)" class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
                    <i class="bi bi-check-lg"></i> อนุมัติ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const { data: result, refresh } = await useFetch('/api/admin/pending-students')
const pendingList = computed(() => result.value?.students || [])

const approveStudent = async (userId) => {
  if (!confirm('ยืนยันการอนุมัตินักศึกษาท่านนี้ให้เข้าใช้งานระบบ?')) return

  try {
    const { data, error } = await useFetch('/api/admin/approve-student', {
      method: 'POST',
      body: { userId }
    })

    if (error.value) throw new Error(error.value.data?.statusMessage || 'อนุมัติล้มเหลว')

    alert('อนุมัติเรียบร้อยแล้ว!')
    refresh()
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
}
</script>