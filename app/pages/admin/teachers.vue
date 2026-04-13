<template>
  <div class="p-4 md:p-8 font-['Prompt',_sans-serif]">
    
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">ข้อมูลอาจารย์ที่ปรึกษา</h2>
        <p class="text-slate-500 text-sm">รายชื่อและช่องทางการติดต่อของอาจารย์ทั้งหมดในระบบ</p>
      </div>
      
      <button class="bg-[#1a1a40] hover:bg-[#2c2c54] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-2 w-fit">
        <i class="bi bi-person-plus-fill"></i> เพิ่มอาจารย์ใหม่
      </button>
    </div>

    <div class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 min-h-[70vh] animate-[fadeIn_0.3s_ease-in-out]">
      
      <div class="flex mb-8">
        <div class="w-full xl:w-[400px] relative">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <i class="bi bi-search text-lg"></i>
          </div>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ค้นหาชื่อ หรือ ชื่อผู้ใช้อาจารย์..." 
            class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-all"
          >
        </div>
      </div>

      <div class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr class="border-b-2 border-slate-100 text-slate-400 text-sm">
              <th class="pb-4 px-4 w-[80px] text-center">รูป</th>
              <th class="pb-4 font-medium">ชื่อผู้ใช้ (Username)</th>
              <th class="pb-4 font-medium">ชื่อ - นามสกุล</th>
              <th class="pb-4 font-medium">เบอร์โทรศัพท์</th>
              <th class="pb-4 font-medium">LINE ID</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in filteredTeachers" :key="teacher.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              
              <td class="py-4 px-2 text-center">
                <div class="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center border border-indigo-100 mx-auto">
                  {{ teacher.name.substring(0, 1) }}
                </div>
              </td>

              <td class="py-4 font-bold text-slate-500">{{ teacher.username }}</td>
              <td class="py-4 font-bold text-slate-800">{{ teacher.name }}</td>
              <td class="py-4 text-[15px] text-slate-600">{{ teacher.tel || '-' }}</td>
              <td class="py-4 text-[15px] text-[#00B900] font-medium">{{ teacher.line || '-' }}</td>

              <td class="py-4 text-center">
                <button @click="deleteTeacher(teacher.id, teacher.name)" class="text-rose-400 hover:text-white hover:bg-rose-500 border border-rose-200 hover:border-rose-500 transition-all px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-sm">
                  <i class="bi bi-trash"></i> ลบ
                </button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredTeachers.length === 0" class="py-20 text-center text-slate-400">
        <i class="bi bi-person-badge text-5xl opacity-20"></i>
        <p class="mt-4 font-medium text-slate-500">ไม่พบข้อมูลอาจารย์</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({ layout: 'admin' })

// State สำหรับช่องค้นหา
const searchQuery = ref('')

// Mock Data ข้อมูลอาจารย์ (จำลองแทนการดึงจาก Database)
const teachers = ref([
  { id: 1, username: 'T001_teerapat', name: 'อ. ธีรพัฒน์ ใจดี', tel: '081-234-5678', line: 'teerapat_aj' },
  { id: 2, username: 'T002_somsri', name: 'ผศ.ดร. สมศรี มีสุข', tel: '089-876-5432', line: 'somsri.m' },
  { id: 3, username: 'T003_manop', name: 'อ. มานพ ขยันสอน', tel: '082-333-4444', line: 'manop_cs' },
  { id: 4, username: 'T004_kanda', name: 'รศ. กานดา รักษาดี', tel: '-', line: '-' }
])

// ฟังก์ชันค้นหา (กรองข้อมูลตามชื่อ หรือ Username)
const filteredTeachers = computed(() => {
  return teachers.value.filter(t => {
    const search = searchQuery.value.toLowerCase()
    return t.name.toLowerCase().includes(search) || t.username.toLowerCase().includes(search)
  })
})

// ฟังก์ชันลบอาจารย์
const deleteTeacher = (id, name) => {
  if (confirm(`คุณยืนยันที่จะลบข้อมูลของ "${name}" ออกจากระบบใช่หรือไม่?\n* การกระทำนี้ไม่สามารถกู้คืนได้`)) {
    // ลบข้อมูลออกจาก Array (ถ้าต่อ Backend จริงๆ ตรงนี้คือการยิง API DELETE)
    teachers.value = teachers.value.filter(t => t.id !== id)
    alert('ลบข้อมูลเรียบร้อยแล้ว')
  }
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>