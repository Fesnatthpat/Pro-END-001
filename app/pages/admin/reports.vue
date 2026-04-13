<template>
  <div class="p-4 md:p-8 font-['Prompt',_sans-serif]">
    
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
      <div>
        <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">รายงานสรุปผล</h2>
        <p class="text-slate-500 text-sm">สถิติภาพรวมโครงงานนักศึกษา แยกตามปีการศึกษา</p>
      </div>
      
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <div class="relative w-full sm:w-[180px]">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#1a1a40]"><i class="bi bi-calendar3"></i></div>
          <select 
            v-model="selectedYear" 
            class="w-full bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl pl-11 pr-10 py-2.5 outline-none focus:border-[#1a1a40] transition-all appearance-none cursor-pointer shadow-sm"
          >
            <option value="all">ทุกปีการศึกษา</option>
            <option value="2568">ปี 2568</option>
            <option value="2567">ปี 2567</option>
          </select>
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400"><i class="bi bi-chevron-down font-bold"></i></div>
        </div>

        <button 
          @click="printReport"
          class="bg-[#1a1a40] hover:bg-[#2c2c54] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
        >
          <i class="bi bi-printer-fill"></i> พิมพ์รายงาน
        </button>
      </div>
    </div>

    <div class="hidden print:block text-center mb-8">
      <h3 class="text-2xl font-bold text-black mb-2">รายงานสรุปโครงงานนักศึกษา</h3>
      <p class="text-lg text-black">
        ปีการศึกษา: {{ selectedYear === 'all' ? 'ทั้งหมด' : selectedYear }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      <div class="bg-white rounded-[20px] p-6 text-center border-b-[5px] border-[#1a1a40] shadow-sm print:border-black print:shadow-none">
        <div class="text-[3rem] font-black leading-none text-[#1a1a40] mb-2 print:text-black">{{ stats.total }}</div>
        <div class="text-sm font-bold text-slate-500 uppercase tracking-wide print:text-black">โครงงานทั้งหมด</div>
      </div>

      <div class="bg-white rounded-[20px] p-6 text-center border-b-[5px] border-emerald-500 shadow-sm print:border-black print:shadow-none">
        <div class="text-[3rem] font-black leading-none text-emerald-500 mb-2 print:text-black">{{ stats.passed }}</div>
        <div class="text-sm font-bold text-slate-500 uppercase tracking-wide print:text-black">สอบผ่าน / จบแล้ว</div>
      </div>

      <div class="bg-white rounded-[20px] p-6 text-center border-b-[5px] border-amber-400 shadow-sm print:border-black print:shadow-none">
        <div class="text-[3rem] font-black leading-none text-amber-500 mb-2 print:text-black">{{ stats.doing }}</div>
        <div class="text-sm font-bold text-slate-500 uppercase tracking-wide print:text-black">กำลังดำเนินการ</div>
      </div>

    </div>

    <div class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 min-h-[400px] print:shadow-none print:border-none print:p-0">
      <h5 class="font-bold text-slate-800 text-lg mb-6 print:text-black print:mb-4"><i class="bi bi-list-ul mr-2 print:hidden"></i> รายชื่อโครงงาน</h5>
      
      <div class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse min-w-[900px] print:min-w-full print:border print:border-black">
          <thead>
            <tr class="bg-slate-50 text-slate-500 text-sm print:bg-gray-100 print:text-black print:border-b print:border-black">
              <th class="py-4 px-4 font-bold border-b border-slate-100 print:border-black text-center w-[120px]">รหัสนักศึกษา</th>
              <th class="py-4 px-4 font-bold border-b border-slate-100 print:border-black w-[200px]">ชื่อ - นามสกุล</th>
              <th class="py-4 px-4 font-bold border-b border-slate-100 print:border-black">ชื่อโครงงาน</th>
              <th class="py-4 px-4 font-bold border-b border-slate-100 print:border-black text-center w-[100px]">ปีการศึกษา</th>
              <th class="py-4 px-4 font-bold border-b border-slate-100 print:border-black text-center w-[120px]">สถานะ</th>
              <th class="py-4 px-4 font-bold border-b border-slate-100 print:border-black text-center w-[120px]">วันสอบจบ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in filteredProjects" :key="project.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors print:border-b print:border-black print:hover:bg-transparent">
              <td class="py-4 px-4 text-center font-bold text-slate-500 print:text-black">{{ project.code }}</td>
              <td class="py-4 px-4 font-bold text-slate-800 print:text-black">{{ project.name }}</td>
              <td class="py-4 px-4 text-[13px] text-slate-600 print:text-black">{{ project.project_name || '-' }}</td>
              <td class="py-4 px-4 text-center font-bold text-slate-500 print:text-black">{{ project.year }}</td>
              <td class="py-4 px-4 text-center">
                <span v-if="project.status === 'PASSED'" class="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-bold print:border-none print:bg-transparent print:text-black print:p-0">ผ่านแล้ว</span>
                <span v-else class="bg-slate-50 text-slate-500 border border-slate-200 px-3 py-1 rounded-full text-[11px] font-bold print:border-none print:bg-transparent print:text-black print:p-0">กำลังทำ</span>
              </td>
              <td class="py-4 px-4 text-center text-sm text-slate-500 print:text-black">{{ project.exam_date || '-' }}</td>
            </tr>
            <tr v-if="filteredProjects.length === 0">
              <td colspan="6" class="py-16 text-center text-slate-400 print:text-black">ไม่พบข้อมูลโครงงานในปีการศึกษานี้</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="hidden print:block mt-20 text-right text-black">
        <p class="mb-6">ลงชื่อ ....................................................... ผู้ตรวจสอบ</p>
        <p>วันที่ ........./........./.............</p>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({ layout: 'admin' })

const selectedYear = ref('all')

// Mock Data โครงงานทั้งหมด
const projectsList = ref([
  { id: 1, code: '6611223301', name: 'นายใจดี รักเรียน', project_name: 'ระบบบริหารจัดการโครงงานคอมพิวเตอร์', year: '2568', status: 'PASSED', exam_date: '15/03/2568' },
  { id: 2, code: '6611223302', name: 'นางสาวเรียนดี ขยันยิ่ง', project_name: 'แอปพลิเคชันจองคิวคลินิกทันตกรรม', year: '2568', status: 'DOING', exam_date: null },
  { id: 3, code: '6611223304', name: 'นายมานะ อดทน', project_name: 'ระบบ AI ตรวจจับการสวมหมวกกันน็อค', year: '2567', status: 'PASSED', exam_date: '20/02/2567' },
  { id: 4, code: '6611223306', name: 'นายสมชาย สายเสมอ', project_name: 'เว็บไซต์อีคอมเมิร์ซขายสินค้าเกษตร', year: '2567', status: 'DOING', exam_date: null },
  { id: 5, code: '6611223307', name: 'นางสาวสมหญิง จริงใจ', project_name: 'เกมส่งเสริมการเรียนรู้คำศัพท์', year: '2568', status: 'PASSED', exam_date: '10/03/2568' }
])

// ฟังก์ชันกรองข้อมูลตามปีการศึกษาที่เลือก
const filteredProjects = computed(() => {
  if (selectedYear.value === 'all') return projectsList.value
  return projectsList.value.filter(p => p.year === selectedYear.value)
})

// คำนวณตัวเลขสถิติด้านบน (อิงจากข้อมูลที่ถูกกรองแล้ว)
const stats = computed(() => {
  const total = filteredProjects.value.length
  const passed = filteredProjects.value.filter(p => p.status === 'PASSED').length
  const doing = total - passed
  return { total, passed, doing }
})

// ฟังก์ชันสั่งพิมพ์
const printReport = () => {
  window.print()
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* เทคนิคการเขียน CSS สำหรับตอน Print ใน Tailwind 
  เราใช้ class แบบ `print:hidden` หรือ `print:text-black` ใน HTML ได้เลย 
  แต่เผื่อไว้บังคับบางจุดให้ชัวร์ร้อยเปอร์เซ็นต์
*/
@media print {
  @page { margin: 1cm; size: A4 portrait; }
  body { background-color: white !important; }
  
  /* ซ่อน Sidebar ของ Layout Admin ตอนพิมพ์ */
  aside { display: none !important; }
  
  /* ขยายพื้นที่หลักให้เต็ม 100% */
  main { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
}
</style>