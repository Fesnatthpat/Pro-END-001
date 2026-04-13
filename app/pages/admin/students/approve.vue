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
      <p class="text-slate-500 text-sm">ตรวจสอบรายชื่อนักศึกษาใหม่ที่รอการยืนยันสิทธิ์ (ยังไม่มีข้อมูลโครงงาน)</p>
    </div>

    <div class="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100 min-h-[60vh] animate-[fadeIn_0.3s_ease-in-out]">
      
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-6 border-b border-slate-100">
        <div class="text-slate-700 font-bold">
          รายการที่รอตรวจสอบ <span class="text-blue-600 text-xl mx-1">{{ pendingList.length }}</span> รายการ
        </div>

        <div class="flex gap-3 w-full sm:w-auto">
          <button @click="bulkReject" :disabled="selectedIds.length === 0" :class="selectedIds.length > 0 ? 'border-2 border-rose-500 text-rose-500 hover:bg-rose-50' : 'border-2 border-slate-100 text-slate-300 cursor-not-allowed'" class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 flex-1 sm:flex-none">
            <i class="bi bi-trash"></i> ลบคำร้อง ({{ selectedIds.length }})
          </button>
          
          <button @click="bulkApprove" :disabled="selectedIds.length === 0" :class="selectedIds.length > 0 ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:-translate-y-0.5' : 'bg-slate-100 text-slate-300 cursor-not-allowed'" class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 flex-1 sm:flex-none">
            <i class="bi bi-check-lg text-lg"></i> อนุมัติที่เลือก ({{ selectedIds.length }})
          </button>
        </div>
      </div>

      <div v-if="pendingList.length > 0" class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr class="bg-slate-50 text-slate-500 text-sm">
              <th class="py-3 px-4 w-[60px] text-center rounded-l-xl">
                <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" class="w-5 h-5 rounded border-slate-300 text-[#1a1a40] focus:ring-[#1a1a40] cursor-pointer">
              </th>
              <th class="py-3 font-bold px-2 text-center w-[80px]">รูป</th>
              <th class="py-3 font-bold">รหัสนักศึกษา</th>
              <th class="py-3 font-bold">ชื่อ - นามสกุล</th>
              <th class="py-3 font-bold">อีเมล (Email)</th>
              <th class="py-3 font-bold text-center rounded-r-xl">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in pendingList" :key="student.id" class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
              <td class="py-4 px-4 text-center">
                <input type="checkbox" :value="student.id" v-model="selectedIds" class="w-5 h-5 rounded border-slate-300 text-[#1a1a40] focus:ring-[#1a1a40] cursor-pointer transition-all">
              </td>
              <td class="py-4 px-2 text-center">
                <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 font-bold text-sm flex items-center justify-center border border-slate-200 shadow-inner mx-auto">{{ student.name.substring(0, 1) }}</div>
              </td>
              <td class="py-4 font-bold text-slate-500">{{ student.code }}</td>
              <td class="py-4 font-bold text-slate-800">{{ student.name }}</td>
              <td class="py-4 text-[15px] text-slate-500 font-medium">{{ student.email }}</td>
              <td class="py-4 text-center">
                <span class="bg-amber-50 text-amber-600 border border-amber-200 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap inline-flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span> รออนุมัติ
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="py-24 text-center">
        <div class="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner"><i class="bi bi-check-all"></i></div>
        <h3 class="text-2xl font-bold text-slate-800 mb-2">จัดการคำร้องครบถ้วนแล้ว!</h3>
        <p class="text-slate-500 text-sm mb-10 max-w-xs mx-auto">ขณะนี้ไม่มีนักศึกษาที่รอการอนุมัติสิทธิ์เข้าใช้งานระบบ</p>
        <NuxtLink to="/admin/students" class="px-8 py-3 bg-[#1a1a40] hover:bg-[#2c2c54] text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-900/20">
          ไปที่หน้ารายชื่อนักศึกษาทั้งหมด <i class="bi bi-arrow-right ml-1"></i>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
definePageMeta({ layout: 'admin' })

const selectedIds = ref([])

const students = ref([
  { id: 1, code: '6611223301', name: 'นายใจดี รักเรียน', email: 'jaidee.r@bsru.ac.th', status: 'PENDING' },
  { id: 2, code: '6611223302', name: 'นางสาวเรียนดี ขยันยิ่ง', email: 'reandee.k@bsru.ac.th', status: 'APPROVED' },
  { id: 3, code: '6611223303', name: 'นายขยัน หมั่นเพียร', email: 'khayan.m@bsru.ac.th', status: 'PENDING' },
  { id: 4, code: '6611223304', name: 'นายมานะ อดทน', email: 'mana.a@bsru.ac.th', status: 'APPROVED' },
  { id: 5, code: '6611223305', name: 'นางสาวสมใจ นามสกุล', email: 'somjai.n@bsru.ac.th', status: 'PENDING' }
])

// กรองเอาเฉพาะคนที่เป็น PENDING มาแสดง
const pendingList = computed(() => {
  return students.value.filter(s => s.status === 'PENDING')
})

const isAllSelected = computed(() => {
  return pendingList.value.length > 0 && selectedIds.value.length === pendingList.value.length
})

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedIds.value = pendingList.value.map(s => s.id)
  } else {
    selectedIds.value = []
  }
}

const bulkApprove = () => {
  if (confirm(`ยืนยันการอนุมัตินักศึกษาที่เลือกจำนวน ${selectedIds.value.length} รายการ?`)) {
    students.value = students.value.map(s => {
      if (selectedIds.value.includes(s.id)) { return { ...s, status: 'APPROVED' } }
      return s
    })
    selectedIds.value = []
  }
}

const bulkReject = () => {
  if (confirm(`ลบคำร้อง ${selectedIds.value.length} รายการ ทิ้งถาวรใช่หรือไม่?`)) {
    students.value = students.value.filter(s => !selectedIds.value.includes(s.id))
    selectedIds.value = []
  }
}
</script>