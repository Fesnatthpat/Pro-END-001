<template>
  <div class="max-w-[1140px] mx-auto w-full py-8">
    
    <div class="mb-6">
      <button @click="$router.back()" class="flex items-center gap-2 text-gray-500 hover:text-[#1a1a40] transition-colors font-medium">
        <i class="bi bi-arrow-left-circle-fill text-xl"></i> ย้อนกลับไปหน้าก่อนหน้า
      </button>
    </div>

    <div class="bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-6 md:p-10 flex flex-col md:flex-row gap-8 min-h-[600px]">
      
      <div class="w-full md:w-[250px] flex-shrink-0">
        <div class="flex flex-col gap-3 sticky top-[100px]">
          <h4 class="font-bold text-[#1a1a40] mb-2 px-2 flex items-center gap-2">
            <i class="bi bi-journal-bookmark-fill text-[#ffc107]"></i> ข้อมูลโครงงาน
          </h4>
          
          <button 
            v-for="tab in menuTabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-5 py-4 rounded-xl font-bold transition-all duration-300 flex justify-between items-center text-[0.95rem]',
              activeTab === tab.id 
                ? 'bg-[#1a1a40] text-white shadow-md transform scale-[1.02]' 
                : 'bg-[#f8f9fa] text-gray-600 hover:bg-gray-200 hover:text-[#1a1a40]'
            ]"
          >
            <span>{{ tab.label }}</span>
            <i class="bi bi-chevron-right text-sm opacity-70"></i>
          </button>
        </div>
      </div>

      <div class="hidden md:block w-[1px] bg-gray-100"></div>

      <div class="flex-grow">
        
        <div class="text-center mb-10 pb-8 border-b border-gray-100">
          <h2 class="text-2xl md:text-[28px] font-bold text-[#1a1a40] leading-snug">
            {{ mockData.nameTh }}
          </h2>
          <p class="text-gray-500 mt-2">{{ mockData.nameEn }}</p>
        </div>

        <div v-if="activeTab === 'details'" class="animate-fade-in">
          <div class="grid grid-cols-1 gap-6">
            
            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border border-gray-100 hover:shadow-sm transition-shadow">
              <span class="text-sm font-bold text-gray-500 md:w-[150px] flex-shrink-0">ชื่อโครงงาน</span>
              <span class="text-[#1a1a40] font-semibold text-lg">{{ mockData.nameTh }}</span>
            </div>

            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col md:flex-row gap-2 md:gap-6 border border-gray-100 hover:shadow-sm transition-shadow">
              <span class="text-sm font-bold text-gray-500 md:w-[150px] flex-shrink-0 pt-1">ชื่อผู้วิจัย</span>
              <div class="flex flex-col gap-2">
                <span v-for="(researcher, index) in mockData.researchers" :key="index" class="text-[#1a1a40] font-medium">
                  {{ index + 1 }}. {{ researcher }}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 rounded-2xl p-5 flex flex-col gap-1 border border-gray-100 hover:shadow-sm transition-shadow">
                <span class="text-sm font-bold text-gray-500">อาจารย์ที่ปรึกษาหลัก</span>
                <span class="text-[#1a1a40] font-medium">{{ mockData.advisor }}</span>
              </div>
              <div class="bg-gray-50 rounded-2xl p-5 flex flex-col gap-1 border border-gray-100 hover:shadow-sm transition-shadow">
                <span class="text-sm font-bold text-gray-500">อาจารย์ที่ปรึกษาร่วม</span>
                <span class="text-[#1a1a40] font-medium">{{ mockData.coAdvisor || '-' }}</span>
              </div>
            </div>

            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-100 gap-4 hover:shadow-sm transition-shadow">
              <span class="text-sm font-bold text-gray-500">สถานะโครงงาน</span>
              <span class="bg-green-100 text-green-700 px-4 py-1.5 rounded-full font-bold text-[0.95rem] flex items-center gap-2">
                <i class="bi bi-check-circle-fill"></i> {{ mockData.status }}
              </span>
            </div>

          </div>
        </div>

        <div v-else-if="activeTab === 'thesis'" class="animate-fade-in flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl">
          <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <i class="bi bi-file-earmark-pdf-fill text-4xl text-red-500"></i>
          </div>
          <h3 class="text-xl font-bold text-[#1a1a40] mb-2">เอกสารบัณฑิตนิพนธ์ฉบับสมบูรณ์</h3>
          <p class="text-gray-500 mb-6">ขนาดไฟล์: 4.2 MB (อัปเดตล่าสุด: 12 มีนาคม 2566)</p>
          <button class="bg-[#1a1a40] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2c2c54] transition-colors shadow-md flex items-center gap-2">
            <i class="bi bi-cloud-arrow-down-fill"></i> ดาวน์โหลด PDF
          </button>
        </div>

        <div v-else-if="activeTab === 'program'" class="animate-fade-in flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl">
          <div class="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <i class="bi bi-file-earmark-zip-fill text-4xl text-indigo-500"></i>
          </div>
          <h3 class="text-xl font-bold text-[#1a1a40] mb-2">ซอร์สโค้ดและโปรแกรม</h3>
          <p class="text-gray-500 mb-6">ลิงก์ไปยัง GitHub Repository หรือไฟล์โปรแกรมที่ถูกบีบอัด</p>
          <div class="flex gap-4">
            <button class="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors shadow-md flex items-center gap-2">
              <i class="bi bi-github"></i> ไปที่ GitHub
            </button>
            <button class="border-2 border-[#1a1a40] text-[#1a1a40] px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              <i class="bi bi-download"></i> ดาวน์โหลด .ZIP
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'รายละเอียดโครงงาน'
})

// === โครงสร้างเมนู 3 ปุ่ม ===
const menuTabs = [
  { id: 'details', label: 'รายละเอียด' },
  { id: 'thesis', label: 'บัณฑิตนิพนธ์' },
  { id: 'program', label: 'โปรแกรม' }
]

// ตัวแปรเก็บค่าหน้าปัจจุบันที่เลือกอยู่ (เริ่มต้นที่หน้ารายละเอียด)
const activeTab = ref('details')

// === ข้อมูลจำลองของโปรเจกต์ ===
const mockData = ref({
  nameTh: 'ระบบจัดการฟาร์มไก่อัจฉริยะ',
  nameEn: 'Smart Poultry Farm Management System',
  researchers: [
    'นางสาวสมหญิง รักเรียน (รหัสนักศึกษา: 65111xxxx)',
    'นายสมชาย ขยันโค้ด (รหัสนักศึกษา: 65111xxxx)'
  ],
  advisor: 'ผศ.ดร. สมเกียรติ ยอดเยี่ยม',
  coAdvisor: 'อ.ดร. ใจดี มีคุณธรรม',
  status: 'ผ่านการสอบจบโครงงาน (CP2) สมบูรณ์'
})
</script>

<style scoped>
/* คลาสสำหรับทำแอนิเมชันให้ตอนสลับหน้าไปมาดูนุ่มนวลขึ้น */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>