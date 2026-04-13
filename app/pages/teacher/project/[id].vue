<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4 md:px-8 font-['Kanit',_sans-serif] text-slate-800">
    <div class="max-w-[1200px] mx-auto w-full">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <NuxtLink to="/teacher" class="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 transition-colors w-fit font-medium text-sm">
          <i class="bi bi-arrow-left"></i> กลับหน้ารวมโครงงาน
        </NuxtLink>

        <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-sm font-medium">
          <span class="text-slate-500">สถานะปัจจุบัน:</span>
          <span :class="getOverallStatusColor(project.currentStep)" class="px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wide">
            {{ getOverallStatusText(project.currentStep) }}
          </span>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
        <i class="bi bi-laptop absolute -right-10 -bottom-10 text-[150px] text-slate-50 opacity-50 pointer-events-none"></i>
        <div class="relative z-10">
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-2 pr-10">
            {{ project.titleTh }}
          </h1>
          <p class="text-slate-500 text-lg font-light relative z-10">{{ project.titleEn }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div class="lg:col-span-8 space-y-6">
          <div class="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden">
            
            <h3 class="text-xl font-bold text-slate-900 mb-10 relative z-10">
              ความคืบหน้าโครงงาน (Timeline)
            </h3>

            <div class="relative pl-4 md:pl-6">
              <div class="absolute left-[39px] md:left-[47px] top-4 bottom-12 w-[2px] bg-slate-100 z-0"></div>

              <div class="relative z-10 flex gap-6 pb-12 mb-12 border-b border-slate-100/70 group">
                <div class="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md shadow-emerald-200 z-10">1</div>
                <div class="pt-2 w-full">
                  <h4 class="text-xl font-bold text-slate-900 mb-2">สอบหัวข้อ (CP1)</h4>
                  <div class="mb-4">
                    <span class="text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg text-sm font-medium">อนุมัติแล้ว</span>
                  </div>
                  <div v-if="project.cp1File" class="inline-flex items-center gap-4 bg-rose-50/50 border border-rose-100 pl-4 pr-2 py-2 rounded-xl">
                    <span class="text-sm font-medium text-slate-700">แบบเสนอหัวข้อ_CP1.pdf</span>
                    <button class="text-indigo-600 hover:bg-indigo-50 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                      เปิดดู
                    </button>
                  </div>
                </div>
              </div>

              <div class="relative z-10 flex gap-6 pb-12 mb-12 border-b border-slate-100/70 group">
                <div class="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md shadow-indigo-200 ring-4 ring-indigo-50 z-10">2</div>
                
                <div class="pt-2 w-full">
                  <h4 class="text-xl font-bold text-slate-900 mb-2">พัฒนาโปรแกรม (Program)</h4>
                  <div class="mb-5">
                    <span class="text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg text-sm font-medium">กำลังดำเนินการ</span>
                  </div>
                  
                  <div class="w-full bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-10">
                    <div class="flex justify-between text-sm font-bold text-slate-700 mb-3">
                      <span>ความคืบหน้าของระบบ</span>
                      <span class="text-indigo-600">{{ project.programProgress }}%</span>
                    </div>
                    <div class="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div class="h-full bg-indigo-500 rounded-full transition-all" :style="`width: ${project.programProgress}%`"></div>
                    </div>
                  </div>

                  <div v-if="project.programReports.length > 0" class="w-full">
                    <h5 class="text-lg font-bold text-slate-900 mb-6">ประวัติการรายงานล่าสุด</h5>
                    
                    <div class="relative border-l-2 border-indigo-100 ml-2 space-y-8 pb-2">
                      <div v-for="(report, index) in project.programReports" :key="index" class="relative pl-8">
                        <div class="absolute -left-[9px] top-1 w-4 h-4 bg-white border-[3px] border-indigo-500 rounded-full"></div>
                        
                        <div class="text-sm text-slate-500 font-medium mb-3 flex items-center gap-2">
                          <i class="bi bi-clock text-slate-400"></i> {{ report.date }}
                        </div>
                        
                        <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                          <span class="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                            System {{ report.percent }}%
                          </span>
                          <p class="text-slate-700 text-[15px] leading-relaxed mb-4">
                            {{ report.detail }}
                          </p>
                          <a v-if="report.file" :href="report.link || '#'" class="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 px-4 py-2 rounded-full text-sm font-medium transition-all">
                            <i class="bi bi-file-earmark-text text-indigo-500"></i> เปิดดูไฟล์แนบ
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="relative z-10 flex gap-6 pb-12 mb-12 border-b border-slate-100/70 group">
                <div class="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md shadow-amber-200 ring-4 ring-amber-50 z-10">3</div>
                <div class="pt-2 w-full">
                  <h4 class="text-xl font-bold text-slate-900 mb-2">ทำเล่มปริญญานิพนธ์ (Thesis)</h4>
                  <div class="mb-5">
                    <span class="text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg text-sm font-medium">กำลังดำเนินการ</span>
                  </div>
                  
                  <div class="w-full bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-10">
                    <div class="flex justify-between text-sm font-bold text-slate-700 mb-3">
                      <span>ความคืบหน้าของเอกสาร</span>
                      <span class="text-amber-600">{{ project.thesisProgress }}%</span>
                    </div>
                    <div class="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div class="h-full bg-amber-400 rounded-full transition-all" :style="`width: ${project.thesisProgress}%`"></div>
                    </div>
                  </div>

                  <div v-if="project.thesisReports && project.thesisReports.length > 0" class="w-full">
                    <h5 class="text-lg font-bold text-slate-900 mb-6">ประวัติการรายงานล่าสุด</h5>
                    
                    <div class="relative border-l-2 border-amber-100 ml-2 space-y-8 pb-2">
                      <div v-for="(report, index) in project.thesisReports" :key="index" class="relative pl-8">
                        <div class="absolute -left-[9px] top-1 w-4 h-4 bg-white border-[3px] border-amber-500 rounded-full"></div>
                        
                        <div class="text-sm text-slate-500 font-medium mb-3 flex items-center gap-2">
                          <i class="bi bi-clock text-slate-400"></i> {{ report.date }}
                        </div>
                        
                        <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                          <span class="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide">
                            Thesis {{ report.percent }}%
                          </span>
                          <p class="text-slate-700 text-[15px] leading-relaxed mb-4">
                            {{ report.detail }}
                          </p>
                          <a v-if="report.file" :href="report.link || '#'" class="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-amber-600 px-4 py-2 rounded-full text-sm font-medium transition-all">
                            <i class="bi bi-file-earmark-pdf text-amber-500"></i> เปิดดูไฟล์เอกสารเล่ม
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="relative z-10 flex gap-6 group">
                <div class="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl shrink-0 z-10 border border-slate-200">
                  <i class="bi bi-mortarboard-fill"></i>
                </div>
                <div class="pt-3 w-full">
                  <h4 class="text-xl font-bold text-slate-400 mb-2">สอบจบ (CP2, CP3)</h4>
                  <span class="text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-sm font-medium">รอขั้นตอนก่อนหน้า</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 pl-2">
            <i class="bi bi-people-fill text-slate-400"></i> ข้อมูลนักศึกษา
          </h3>

          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex items-center gap-5">
            <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold shrink-0 border border-indigo-100">
              {{ getInitials(project.student1.name) }}
            </div>
            <div class="w-full">
              <h4 class="text-lg font-bold text-slate-800">{{ project.student1.name }}</h4>
              <p class="text-slate-500 text-sm mb-2">{{ project.student1.id }}</p>
              <div class="flex items-center gap-4 text-sm text-slate-600">
                <span class="flex items-center gap-1.5"><i class="bi bi-telephone-fill text-slate-400"></i> {{ project.student1.tel || '-' }}</span>
              </div>
            </div>
          </div>

          <div v-if="project.student2" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex items-center gap-5">
            <div class="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold shrink-0 border border-emerald-100">
              {{ getInitials(project.student2.name) }}
            </div>
            <div class="w-full">
              <h4 class="text-lg font-bold text-slate-800">{{ project.student2.name }}</h4>
              <p class="text-slate-500 text-sm mb-2">{{ project.student2.id }}</p>
              <div class="flex items-center gap-4 text-sm text-slate-600">
                <span class="flex items-center gap-1.5"><i class="bi bi-telephone-fill text-slate-400"></i> {{ project.student2.tel || '-' }}</span>
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

useHead({
  title: 'Project Detail | Teacher Panel',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap' }
  ]
})

// 🌟 จุดสำคัญ: ต้องมั่นใจว่าในไฟล์ app.vue มี <NuxtLayout> ครอบ <NuxtPage /> ไว้นะครับ
definePageMeta({
  layout: 'teacher'
})

// ================= ข้อมูลจำลอง (Mock Data) =================
const project = ref({
  id: 101,
  titleTh: 'ระบบบริหารจัดการโครงงานคอมพิวเตอร์แบบครบวงจร',
  titleEn: 'Comprehensive Computer Project Management System',
  currentStep: 3, // สมมติว่าตอนนี้ทำทั้งเล่มทั้งโปรแกรมอยู่
  
  cp1Status: 'APPROVED', 
  cp1File: 'cp1_doc.pdf',
  
  programProgress: 45, 
  thesisProgress: 30,  
  
  // ประวัติการรายงานโปรแกรม
  programReports: [
    { 
      date: '18/03/2026 10:30 น.', 
      percent: 45, 
      detail: 'ทำระบบ Login, วางโครงสร้าง Database และหน้า Dashboard ของนักศึกษาเสร็จเรียบร้อยแล้วครับ',
      file: true,
      link: '#'
    },
    { 
      date: '10/03/2026 14:15 น.', 
      percent: 20, 
      detail: 'ออกแบบ UI/UX เบื้องต้นใน Figma และกำหนดขอบเขตของระบบ',
      file: false 
    }
  ],

  // ประวัติการรายงานเล่มปริญญานิพนธ์
  thesisReports: [
    { 
      date: '20/03/2026 09:00 น.', 
      percent: 30, 
      detail: 'ส่งร่างเอกสารบทที่ 1 และบทที่ 2 พร้อมแก้ไขจุดประสงค์ตามที่อาจารย์แนะนำในการประชุมครั้งที่แล้วค่ะ',
      file: true,
      link: '#'
    }
  ],

  cp2Status: 'NONE', 

  student1: {
    id: '6611223344', name: 'นางสาวตัวอย่าง ใจดี', tel: '081-234-5678', line: 'example.jaidee'
  },
  student2: {
    id: '6611223345', name: 'นายทดสอบ ขยันเรียน', tel: '089-876-5432', line: 'test_student'
  }
})

// ================= UI Helpers =================
const getInitials = (name) => {
  if (!name) return '?'
  let cleanName = name.replace('นาย', '').replace('นางสาว', '').replace('นาง', '').trim()
  return cleanName.substring(0, 2)
}

const getOverallStatusText = (step) => {
  if (step === 5) return 'เสร็จสมบูรณ์'
  if (step === 4) return 'รอสอบจบ / รอดำเนินการเอกสาร'
  if (step >= 2) return 'อยู่ระหว่างการพัฒนาโครงงาน'
  return 'เพิ่งอนุมัติหัวข้อ'
}

const getOverallStatusColor = (step) => {
  if (step === 5) return 'bg-emerald-100 text-emerald-700'
  if (step === 4) return 'bg-amber-100 text-amber-700'
  if (step >= 2) return 'bg-indigo-100 text-indigo-700'
  return 'bg-slate-100 text-slate-700'
}
</script>