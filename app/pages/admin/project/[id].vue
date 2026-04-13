<template>
  <div class="p-4 md:p-8 font-['Prompt',_sans-serif]">
    
    <div class="mb-6">
      <NuxtLink to="/admin/projects" class="inline-flex items-center gap-2 text-slate-500 hover:text-[#1a1a40] font-bold text-sm transition-colors group">
        <i class="bi bi-arrow-left group-hover:-translate-x-1 transition-transform"></i> ย้อนกลับไปหน้ารายชื่อโครงงาน
      </NuxtLink>
    </div>

    <div class="mb-8 p-6 bg-white rounded-[24px] shadow-sm border border-slate-100 animate-[fadeIn_0.3s_ease-in-out]">
      <div class="flex items-center gap-2 text-rose-500 font-bold mb-3">
        <i class="bi bi-pin-angle-fill"></i> ข้อมูลโครงงาน
      </div>
      <h1 class="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2">{{ project.title_th }}</h1>
      <h2 class="text-lg md:text-xl text-slate-500 font-medium mb-8">{{ project.title_en }}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
        <div>
          <div class="text-sm font-medium text-slate-400 mb-1">ผู้วิจัย</div>
          <div class="font-bold text-slate-800 text-[15px]">{{ project.student.name }}</div>
        </div>
        <div>
          <div class="text-sm font-medium text-slate-400 mb-1">รหัสนักศึกษา</div>
          <div class="font-bold text-slate-800 text-[15px]">{{ project.student.code }}</div>
        </div>
        <div>
          <div class="text-sm font-medium text-slate-400 mb-1">อาจารย์ที่ปรึกษา</div>
          <div class="font-bold text-slate-800 text-[15px]">{{ project.advisor || '-' }}</div>
        </div>
        <div>
          <div class="text-sm font-medium text-slate-400 mb-1">ปีการศึกษา</div>
          <div class="font-bold text-slate-800 text-[15px]">{{ project.academic_year }}</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-2 space-y-8">
        <div class="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
          
          <div :class="isProjectComplete(project.current_step) ? 'bg-emerald-500' : 'bg-amber-400'" class="absolute top-0 left-0 right-0 h-1.5"></div>

          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <h3 class="font-bold text-xl text-slate-900 flex items-center gap-3">
              <i class="bi bi-list-ol text-rose-500"></i> สถานะการดำเนินงาน (5 ขั้นตอน)
            </h3>
            
            <div class="shrink-0 flex items-center gap-1.5">
              <div v-for="step in 5" :key="step" 
                   :class="getBoxClass(step, project.current_step)"
                   class="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-base border-2 transition-colors">
                <i v-if="step < project.current_step || project.current_step > 5" class="bi bi-check-lg text-lg"></i>
                <span v-else>{{ step }}</span>
              </div>
            </div>
          </div>

          <div class="relative pl-3 space-y-10 ml-2">
            <div class="absolute inset-y-0 left-3 border-l-2 border-slate-100 z-0"></div>

            <div class="relative z-10">
              <div :class="getDotColorClass(1)" class="absolute -left-[30px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-md transition-colors"></div>
              <div class="pl-8">
                <h4 class="font-bold text-lg text-slate-800 mb-1">ยื่นสอบหัวข้อ (CP1)</h4>
                <div class="text-sm font-medium mb-3">
                  <span v-if="project.cp1_status === 'APPROVED'" class="text-emerald-600"><i class="bi bi-check-circle-fill"></i> อนุมัติแล้ว</span>
                  <span v-else-if="project.cp1_status === 'WAITING'" class="text-blue-600"><i class="bi bi-hourglass-split"></i> รอตรวจสอบ</span>
                  <span v-else class="text-slate-400"><i class="bi bi-dash-circle"></i> ยังไม่ดำเนินการ</span>
                </div>
                <button v-if="project.cp1_file" class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 text-xs font-bold transition-colors bg-white">
                  <i class="bi bi-file-earmark-pdf-fill"></i> เปิดดูไฟล์ CP1
                </button>
              </div>
            </div>

            <div class="relative z-10">
              <div :class="getDotColorClass(2)" class="absolute -left-[30px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-md transition-colors"></div>
              <div class="pl-8">
                
                <div class="flex items-center gap-3 mb-4">
                  <h4 class="font-bold text-lg text-slate-800">พัฒนาโปรแกรม (Program)</h4>
                  <span v-if="project.current_step === 2" class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">กำลังดำเนินการ</span>
                </div>

                <div v-if="project.current_step >= 2">
                  <div class="bg-slate-50 p-4 rounded-[16px] border border-slate-100 mb-8">
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-bold text-slate-700 text-sm">ความคืบหน้าของระบบ</span>
                      <span class="font-bold text-blue-600 text-sm">{{ project.program_progress }}%</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div class="bg-blue-500 h-2.5 rounded-full transition-all duration-500" :style="`width: ${project.program_progress}%`"></div>
                    </div>
                  </div>

                  <div class="mb-4">
                    <h5 class="font-bold text-slate-800 text-[15px] mb-6">ประวัติการรายงานล่าสุด</h5>
                    <div class="relative pl-4 space-y-6">
                      <div class="absolute top-2 bottom-0 left-[7px] w-[2px] bg-blue-100 z-0"></div>

                      <div v-for="(history, index) in project.program_history" :key="index" class="relative z-10">
                        <div class="absolute -left-[23px] top-1 w-3.5 h-3.5 bg-white border-[3px] border-blue-500 rounded-full"></div>
                        
                        <div class="text-xs font-medium text-slate-500 mb-2">{{ history.date }}</div>
                        <div class="bg-white border border-slate-200 p-5 rounded-[20px] shadow-sm">
                          <div class="inline-block px-3 py-1 bg-blue-600 text-white text-[11px] font-bold rounded-full mb-3 shadow-sm">
                            System {{ history.percent }}%
                          </div>
                          <p class="text-[14px] text-slate-700 mb-4 leading-relaxed font-medium">{{ history.detail }}</p>
                          <button v-if="history.file" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-xs font-bold transition-colors">
                            <i class="bi bi-file-earmark-text"></i> เปิดดูไฟล์แนบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div v-else class="text-sm font-medium text-slate-400"><i class="bi bi-dash-circle"></i> ยังไม่ถึงขั้นตอนนี้</div>
              </div>
            </div>

            <div class="relative z-10">
              <div :class="getDotColorClass(3)" class="absolute -left-[30px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-md transition-colors"></div>
              <div class="pl-8">
                
                <div class="flex items-center gap-3 mb-4">
                  <h4 class="font-bold text-lg text-slate-800">จัดทำเล่มบัณฑิตนิพนธ์ (Document)</h4>
                  <span v-if="project.current_step === 3" class="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full border border-amber-100">กำลังดำเนินการ</span>
                </div>

                <div v-if="project.current_step >= 3">
                  <div class="bg-slate-50 p-4 rounded-[16px] border border-slate-100 mb-8">
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-bold text-slate-700 text-sm">ความคืบหน้าของรูปเล่ม</span>
                      <span class="font-bold text-amber-500 text-sm">{{ project.thesis_progress }}%</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div class="bg-amber-400 h-2.5 rounded-full transition-all duration-500" :style="`width: ${project.thesis_progress}%`"></div>
                    </div>
                  </div>

                  <div class="mb-4">
                    <h5 class="font-bold text-slate-800 text-[15px] mb-6">ประวัติการส่งเล่มให้ที่ปรึกษา</h5>
                    <div class="relative pl-4 space-y-6">
                      <div class="absolute top-2 bottom-0 left-[7px] w-[2px] bg-amber-100 z-0"></div>

                      <div v-for="(history, index) in project.thesis_history" :key="index" class="relative z-10">
                        <div class="absolute -left-[23px] top-1 w-3.5 h-3.5 bg-white border-[3px] border-amber-400 rounded-full"></div>
                        
                        <div class="text-xs font-medium text-slate-500 mb-2">{{ history.date }}</div>
                        <div class="bg-white border border-slate-200 p-5 rounded-[20px] shadow-sm">
                          <div class="inline-block px-3 py-1 bg-amber-400 text-amber-900 text-[11px] font-bold rounded-full mb-3 shadow-sm">
                            Document {{ history.percent }}%
                          </div>
                          <p class="text-[14px] text-slate-700 mb-4 leading-relaxed font-medium">{{ history.detail }}</p>
                          <button v-if="history.file" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-xs font-bold transition-colors">
                            <i class="bi bi-file-earmark-pdf text-rose-500"></i> เปิดดูไฟล์แนบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div v-else class="text-sm font-medium text-slate-400"><i class="bi bi-dash-circle"></i> ยังไม่ถึงขั้นตอนนี้</div>
              </div>
            </div>

            <div class="relative z-10">
              <div :class="getDotColorClass(4)" class="absolute -left-[30px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-md transition-colors"></div>
              <div class="pl-8">
                <h4 class="font-bold text-lg text-slate-800 mb-1">ยื่นสอบจบ (CP2)</h4>
                <div class="text-sm font-medium mb-3">
                  <span v-if="project.cp2_status === 'PASSED'" class="text-emerald-600"><i class="bi bi-check-circle-fill"></i> ผ่านแล้ว</span>
                  <span v-else-if="project.cp2_status === 'SCHEDULED'" class="text-blue-600"><i class="bi bi-calendar-check-fill"></i> นัดสอบแล้ว</span>
                  <span v-else-if="project.cp2_status === 'WAITING'" class="text-amber-500"><i class="bi bi-hourglass-split"></i> รอตรวจสอบ</span>
                  <span v-else class="text-slate-400"><i class="bi bi-dash-circle"></i> ยังไม่ดำเนินการ</span>
                </div>
                <button v-if="project.cp2_file" class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 text-xs font-bold transition-colors bg-white">
                  <i class="bi bi-file-earmark-pdf-fill"></i> เปิดดูไฟล์ CP2
                </button>
              </div>
            </div>

            <div class="relative z-10">
              <div :class="getDotColorClass(5)" class="absolute -left-[30px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-md transition-colors"></div>
              <div class="pl-8">
                <h4 class="font-bold text-lg text-slate-800 mb-1">ส่งเล่มฉบับสมบูรณ์</h4>
                <div class="text-sm font-medium">
                  <span v-if="project.current_step > 5" class="text-emerald-600"><i class="bi bi-check-circle-fill"></i> ส่งเรียบร้อยแล้ว</span>
                  <span v-else-if="project.current_step === 5" class="text-blue-600"><i class="bi bi-hourglass-split"></i> รอการดำเนินการ</span>
                  <span v-else class="text-slate-400"><i class="bi bi-dash-circle"></i> ยังไม่ดำเนินการ</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="lg:col-span-1 animate-[fadeInUp_0.3s_ease-in-out_0.1s_both]">
        <div class="bg-gradient-to-b from-[#1a1a40] to-[#2c2c54] rounded-[32px] p-8 text-center text-white shadow-xl shadow-indigo-900/20 sticky top-[100px] border-t-8 border-white/10">
          
          <div class="w-[90px] h-[90px] bg-white text-[#1a1a40] rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-inner border-4 border-white/20">
            {{ project.student.name.substring(0, 1) }}
          </div>
          
          <h3 class="font-bold text-2xl mb-1 truncate px-2">{{ project.student.name }}</h3>
          <p class="text-indigo-200 text-xs font-medium mb-8">นักศึกษาเจ้าของโครงงาน (รหัส {{ project.student.code.substring(0, 2) }}xxxxx)</p>

          <div class="space-y-3">
            <div class="bg-white/10 hover:bg-white/20 transition-colors rounded-2xl p-4 flex items-center gap-4 text-left border border-white/5">
              <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <i class="bi bi-telephone-fill text-lg"></i>
              </div>
              <div class="overflow-hidden">
                <div class="text-xs text-indigo-200 font-medium">เบอร์โทรศัพท์</div>
                <div class="font-bold text-[15px] truncate">{{ project.student.tel || '-' }}</div>
              </div>
            </div>

            <div class="bg-white/10 hover:bg-white/20 transition-colors rounded-2xl p-4 flex items-center gap-4 text-left border border-white/5">
              <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <i class="bi bi-line text-lg"></i>
              </div>
              <div class="overflow-hidden">
                <div class="text-xs text-indigo-200 font-medium">LINE ID</div>
                <div class="font-bold text-[15px] truncate">{{ project.student.line || '-' }}</div>
              </div>
            </div>

            <div class="bg-white/10 hover:bg-white/20 transition-colors rounded-2xl p-4 flex items-center gap-4 text-left border border-white/5">
              <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <i class="bi bi-envelope-fill text-lg"></i>
              </div>
              <div class="overflow-hidden">
                <div class="text-xs text-indigo-200 font-medium">อีเมล (Email)</div>
                <div class="font-bold text-[14px] truncate" :title="project.student.email">{{ project.student.email || '-' }}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

// Mock Data โครงงาน (เพิ่มประวัติการรายงานเข้ามาด้วย)
const project = ref({
  id: 'PROJ-001',
  title_th: 'ระบบบริหารจัดการโครงงานคอมพิวเตอร์แบบครบวงจร',
  title_en: 'Comprehensive Computer Science Project Management System',
  academic_year: '2568',
  advisor: 'อ.ธีรพัฒน์ ใจดี',
  current_step: 3,
  cp1_status: 'APPROVED',
  cp2_status: null,
  cp1_file: 'cp1_doc.pdf',
  cp2_file: null,
  program_progress: 45, // แก้ไข % จำลอง
  thesis_progress: 40,
  
  // ประวัติการส่งรายงานโปรแกรม (Step 2)
  program_history: [
    { date: '18/03/2026 10:30 น.', percent: 45, detail: 'ทำระบบ Login, วางโครงสร้าง Database และหน้า Dashboard ของนักศึกษาเสร็จเรียบร้อยแล้วครับ', file: 'update_1.zip' },
    { date: '10/03/2026 14:15 น.', percent: 20, detail: 'ออกแบบ UI/UX เบื้องต้นใน Figma และกำหนดขอบเขตของระบบ', file: null }
  ],

  // ประวัติการส่งเล่ม (Step 3)
  thesis_history: [
    { date: '20/03/2026 09:00 น.', percent: 40, detail: 'ส่งร่างบทที่ 1 ถึงบทที่ 3 (บทนำ, ทฤษฎีที่เกี่ยวข้อง, และวิธีดำเนินการวิจัย) ให้ที่ปรึกษาตรวจสอบครับ', file: 'chapter1-3_draft.pdf' }
  ],

  student: {
    name: 'นางสาวตัวอย่าง ใจดี',
    code: '6611223344',
    tel: '081-234-5678',
    line: 'jaidee_student',
    email: 'example.student@bsru.ac.th'
  }
})

// ฟังก์ชันหาคลาสสีของกล่องสถานะย่อส่วน
const getBoxClass = (stepCheck, currentStep) => {
  if (currentStep > 5 || stepCheck < currentStep) {
    return 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-sm'
  }
  if (stepCheck === currentStep) {
    return 'bg-amber-50 border-amber-400 text-amber-600 shadow-sm'
  }
  return 'bg-slate-50 border-slate-200 text-slate-400'
}

// ฟังก์ชันหาคลาสสีของจุดไข่ปลา
const getDotColorClass = (step) => {
  const current = project.value.current_step
  if (step < current || current > 5) return 'bg-emerald-500 shadow-emerald-500/30'
  if (step === current) return 'bg-amber-400 shadow-amber-400/30'
  return 'bg-slate-200'
}

const isProjectComplete = (currentStep) => {
  return currentStep > 5
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>