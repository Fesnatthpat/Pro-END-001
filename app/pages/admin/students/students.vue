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
          <select v-model="selectedYear" class="w-full sm:w-[180px] bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl pl-11 pr-10 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-all appearance-none cursor-pointer">
            <option value="">ทุกปีการศึกษา</option>
            <option value="2568">ปี 2568</option>
            <option value="2567">ปี 2567</option>
          </select>
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400"><i class="bi bi-chevron-down font-bold"></i></div>
        </div>
      </div>

      <div class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="border-b-2 border-slate-100 text-slate-400 text-sm">
              <th class="pb-4 px-4 w-[80px] text-center">รูป</th>
              <th class="pb-4 font-medium">รหัสนักศึกษา</th>
              <th class="pb-4 font-medium">ชื่อ - นามสกุล</th>
              <th class="pb-4 font-medium w-[250px]">ชื่อโครงงาน</th>
              <th class="pb-4 font-medium">เบอร์โทรศัพท์</th>
              <th class="pb-4 font-medium">LINE ID</th>
              <th class="pb-4 font-medium text-center">สถานะ</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in approvedList" :key="student.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td class="py-4 px-2 text-center">
                <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-500 font-bold text-sm flex items-center justify-center border border-slate-200 shadow-inner mx-auto">{{ student.name.substring(0, 1) }}</div>
              </td>
              <td class="py-4 font-bold text-slate-500">{{ student.code }}</td>
              <td class="py-4 font-bold text-slate-800">{{ student.name }}</td>
              <td class="py-4 pr-4 text-[13px] text-slate-600">
                <span v-if="student.project" class="line-clamp-2">{{ student.project }}</span>
                <span v-else class="text-slate-300">-</span>
              </td>
              <td class="py-4 text-[15px] text-slate-600">{{ student.tel || '-' }}</td>
              <td class="py-4 text-[15px] text-indigo-600 font-medium">{{ student.line || '-' }}</td>
              <td class="py-4 text-center">
                <span class="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-bold">อนุมัติแล้ว</span>
              </td>
              <td class="py-4 text-center">
                <button @click="deleteStudent(student.id, student.name)" class="text-slate-300 hover:text-rose-500 transition-colors p-2"><i class="bi bi-trash text-lg"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="approvedList.length === 0" class="py-20 text-center text-slate-400">
        <i class="bi bi-people text-5xl opacity-20"></i>
        <p class="mt-4 font-medium text-slate-500">ไม่พบข้อมูลนักศึกษาที่อนุมัติแล้ว</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
definePageMeta({ layout: 'admin' })

const searchQuery = ref('')
const selectedYear = ref('')

const students = ref([
  { id: 1, code: '6611223301', name: 'นายใจดี รักเรียน', project: 'ระบบบริหารจัดการโครงงานคอมพิวเตอร์', tel: '081-111-1111', line: 'jaidee.11', status: 'PENDING' },
  { id: 2, code: '6611223302', name: 'นางสาวเรียนดี ขยันยิ่ง', project: 'แอปพลิเคชันจองคิวคลินิกทันตกรรม', tel: '082-222-2222', line: 'reandee_k', status: 'APPROVED' },
  { id: 3, code: '6611223303', name: 'นายขยัน หมั่นเพียร', project: null, tel: '083-333-3333', line: 'khayan33', status: 'PENDING' },
  { id: 4, code: '6611223304', name: 'นายมานะ อดทน', project: 'ระบบ AI ตรวจจับการสวมหมวกกันน็อค', tel: '084-444-4444', line: 'mana_man', status: 'APPROVED' },
  { id: 5, code: '6611223305', name: 'นางสาวสมใจ นามสกุล', project: null, tel: '085-555-5555', line: 'somjai_za', status: 'PENDING' }
])

// กรองเอาเฉพาะคนที่ APPROVED มาโชว์
const approvedList = computed(() => {
  return students.value.filter(s => {
    const isApproved = s.status === 'APPROVED'
    const search = searchQuery.value.toLowerCase()
    const matchSearch = s.name.toLowerCase().includes(search) || s.code.includes(search)
    return isApproved && matchSearch
  })
})

const deleteStudent = (id, name) => {
  if (confirm(`ลบข้อมูล "${name}" ทิ้งถาวร?`)) {
    students.value = students.value.filter(s => s.id !== id)
  }
}
</script>