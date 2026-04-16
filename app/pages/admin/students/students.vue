<template>
  <div class="p-4 md:p-8 font-['Prompt',_sans-serif]">
    
    <div class="mb-8">
      <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">ข้อมูลนักศึกษา</h2>
      <p class="text-slate-500 text-sm">รายชื่อนักศึกษาทั้งหมดที่ได้รับการอนุมัติสิทธิ์เข้าใช้งานแล้ว</p>
    </div>

    <div class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 min-h-[70vh] animate-[fadeIn_0.3s_ease-in-out]">
      
      <div class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
        <div class="w-full xl:w-[400px] relative">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <i class="bi bi-search text-lg"></i>
          </div>
          <input type="text" v-model="searchQuery" placeholder="ค้นหาชื่อ หรือ รหัสนักศึกษา..." class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-all">
        </div>

        <div class="relative w-full sm:w-auto">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#1a1a40]"><i class="bi bi-calendar3"></i></div>
          <select v-model="selectedYear" class="w-full sm:w-[180px] bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl pl-11 pr-10 py-3 outline-none focus:border-[#1a1a40] focus:bg-white appearance-none cursor-pointer">
            <option value="">ทุกปีการศึกษา</option>
            <option v-for="year in availableYears" :key="year" :value="year">ปี {{ year }}</option>
          </select>
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400"><i class="bi bi-chevron-down font-bold"></i></div>
        </div>
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a1a40]"></div>
      </div>

      <div v-else class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="border-b-2 border-slate-100 text-slate-400 text-sm">
              <th class="pb-4 px-4 w-[80px] text-center">รูป</th>
              <th class="pb-4 font-medium">รหัสนักศึกษา</th>
              <th class="pb-4 font-medium">ชื่อ - นามสกุล</th>
              <th class="pb-4 font-medium">ปีการศึกษา</th>
              <th class="pb-4 font-medium">เบอร์โทรศัพท์</th>
              <th class="pb-4 font-medium">LINE ID</th>
              <th class="pb-4 font-medium text-center">สถานะ</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in filteredStudents" :key="student.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td class="py-4 px-2 text-center">
                <div v-if="student.profileImage" class="w-10 h-10 rounded-full mx-auto overflow-hidden border border-slate-200">
                  <img :src="student.profileImage" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-10 h-10 rounded-full bg-slate-100 text-slate-500 font-bold text-sm flex items-center justify-center border border-slate-200 shadow-inner mx-auto">
                  {{ student.fullname.substring(0, 1) }}
                </div>
              </td>
              <td class="py-4 font-bold text-slate-500">{{ student.username }}</td>
              <td class="py-4 font-bold text-slate-800">{{ student.fullname }}</td>
              <td class="py-4 text-[14px] text-slate-600">{{ student.academicYear }}</td>
              <td class="py-4 text-[15px] text-slate-600">{{ student.tel || '-' }}</td>
              <td class="py-4 text-[15px] text-indigo-600 font-medium">{{ student.lineId || '-' }}</td>
              <td class="py-4 text-center">
                <span class="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-bold">อนุมัติแล้ว</span>
              </td>
              <td class="py-4 text-center">
                <button @click="confirmDelete(student)" class="text-slate-300 hover:text-rose-500 transition-colors p-2">
                  <i class="bi bi-trash text-lg"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredStudents.length === 0" class="py-20 text-center text-slate-400">
          <i class="bi bi-people text-5xl opacity-20"></i>
          <p class="mt-4 font-medium text-slate-500">ไม่พบข้อมูลนักศึกษาที่อนุมัติแล้ว</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
definePageMeta({ layout: 'admin' })

const searchQuery = ref('')
const selectedYear = ref('')

// ดึงข้อมูลนักศึกษาจาก API
const { data: studentsData, pending, refresh } = await useFetch('/api/admin/students')
const students = computed(() => studentsData.value?.students || [])

// ดึงรายการปีการศึกษาที่มีทั้งหมดมาทำเป็น filter
const availableYears = computed(() => {
  const years = students.value.map(s => s.academicYear)
  return [...new Set(years)].sort((a, b) => b.localeCompare(a))
})

// กรองข้อมูลตาม search และ ปีการศึกษา
const filteredStudents = computed(() => {
  return students.value.filter(s => {
    const search = searchQuery.value.toLowerCase()
    const matchSearch = s.fullname.toLowerCase().includes(search) || s.username.includes(search)
    const matchYear = selectedYear.value === '' || s.academicYear === selectedYear.value
    return matchSearch && matchYear
  })
})

const confirmDelete = async (student) => {
  if (confirm(`คุณยืนยันที่จะลบข้อมูลของ "${student.fullname}" ทิ้งถาวรหรือไม่?\n* การกระทำนี้ไม่สามารถกู้คืนได้`)) {
    try {
      const response = await $fetch(`/api/admin/students?id=${student.id}`, {
        method: 'DELETE'
      })
      if (response.success) {
        alert('ลบข้อมูลเรียบร้อยแล้ว')
        refresh()
      }
    } catch (error) {
      alert(error.statusMessage || 'เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
}
</script>