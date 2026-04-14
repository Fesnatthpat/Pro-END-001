<template>
  <div class="w-full font-['Prompt']">
    
    <!-- ส่วนหัวต้อนรับ (แสดงข้อมูลผู้ใช้) -->
    <div v-if="user" class="max-w-[850px] mx-auto mt-10 mb-6 px-4">
      <div class="bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-6 flex items-center gap-6 border border-gray-100">
        <div class="w-20 h-20 rounded-full bg-indigo-50 border-4 border-white shadow-sm overflow-hidden shrink-0 flex items-center justify-center">
          <img v-if="user.profileImage" :src="user.profileImage" alt="Profile" class="w-full h-full object-cover">
          <i v-else class="bi bi-person-fill text-4xl text-indigo-200"></i>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-[#1a1a40]">สวัสดีครับ, {{ user.fullname }}</h2>
          <p class="text-gray-500">ยินดีต้อนรับกลับสู่ระบบจัดการโครงงานคอมพิวเตอร์</p>
        </div>
      </div>
    </div>

    <div v-if="isApproved" class="bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-8 md:p-12 max-w-[850px] mx-auto mb-10 border border-gray-100">
      <div class="text-center mb-12 border-b border-gray-100 pb-8">
        <h3 class="font-bold text-[28px] text-[#1a1a40] mb-2">สถานะการดำเนินงาน</h3>
        <p class="text-gray-500 text-sm">ติดตามความคืบหน้าโครงงานคอมพิวเตอร์ของคุณ</p>
      </div>

      <div class="relative pl-2 md:pl-6">
        <div v-for="(step, index) in steps" :key="step.id" class="flex items-center relative pb-12 last:pb-0 group">
          
          <div v-if="index !== steps.length - 1" class="absolute left-[24px] top-[50px] bottom-[-10px] w-[2px] transition-colors duration-300 z-0" :class="step.isCompleted ? 'bg-blue-600' : 'bg-gray-200 group-hover:bg-gray-300'"></div>

          <div 
            class="w-[50px] h-[50px] rounded-full flex items-center justify-center font-bold text-[18px] border-2 z-10 shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm"
            :class="step.isLocked ? 'border-gray-200 bg-gray-50 text-gray-400' : (step.isCompleted ? 'border-blue-600 bg-blue-600 text-white' : 'border-[#1a1a40] bg-[#1a1a40] text-white')"
          >
            <i v-if="step.isCompleted" class="bi bi-check-lg text-[24px]"></i>
            <span v-else>{{ step.id }}</span>
          </div>

          <div class="flex-grow ml-6 md:ml-8 flex flex-col md:flex-row md:items-center justify-between mt-1 md:mt-0 bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none">
            <div class="font-bold text-lg mb-3 md:mb-0" :class="step.isLocked ? 'text-gray-400' : 'text-[#1a1a40]'">
              {{ step.title }}
            </div>
            
            <div class="flex flex-row items-center justify-between md:justify-end gap-4 md:gap-6">
              <div class="text-[14px] md:text-[15px] font-medium min-w-[140px] md:text-right" :class="step.statusColor">
                {{ step.statusText }}
              </div>
              
              <div v-if="step.isLocked" class="w-[42px] h-[42px] rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 shadow-sm cursor-not-allowed">
                <i class="bi bi-lock-fill text-lg"></i>
              </div>

              <NuxtLink v-else :to="step.link" class="w-[42px] h-[42px] rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 shadow-sm" :class="step.isCompleted ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' : 'border-[#1a1a40] text-[#1a1a40] hover:bg-[#1a1a40] hover:text-white'">
                <i class="bi text-lg" :class="step.icon"></i>
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-[60px] max-w-[800px] mx-auto my-[60px] text-center">
      <div class="w-[100px] h-[100px] bg-[#fff3cd] text-[#ffc107] rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="bi bi-hourglass-split text-[50px]"></i>
      </div>
      <h3 class="font-bold text-[24px] text-[#1a1a40] mb-3">รอการอนุมัติจากผู้ดูแลระบบ</h3>
      <p class="text-[#6c757d] mb-8 leading-relaxed max-w-[500px] mx-auto">
        บัญชีของคุณกำลังรอการตรวจสอบจากแอดมิน<br>
        เมื่อได้รับการอนุมัติแล้ว คุณถึงจะสามารถเริ่มต้นยื่นเสนอหัวข้อและทำโครงงานได้ครับ
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'สถานะการดำเนินงาน | โครงงานของฉัน'
})

// ดึงข้อมูลผู้ใช้จาก Cookie
const userCookie = useCookie('user_session')
const user = computed(() => userCookie.value)

// บังคับใช้ Layout ของนักศึกษา
definePageMeta({
  layout: 'student'
})

// ================= เปิดให้ผ่านทุกด่านเพื่อทดสอบ UI =================
const isApproved = ref(true) // อนุมัติแล้ว
const isCp1Passed = ref(true) // ผ่าน CP1 แล้ว
const isProgressAndThesisPassed = ref(true) // ผ่านพัฒนาโปรแกรมและเล่มแล้ว
const isCp2Passed = ref(true) // ผ่าน CP2 แล้ว

// ================= คำนวณสถานะ 5 ขั้นตอน =================
const steps = computed(() => [
  {
    id: 1,
    title: 'ยื่นขอสอบหัวข้อ (CP1)',
    statusText: isCp1Passed.value ? 'สอบผ่านแล้ว' : 'กำลังดำเนินการ',
    statusColor: isCp1Passed.value ? 'text-green-600' : 'text-[#1a1a40]',
    icon: isCp1Passed.value ? 'bi-eye-fill' : 'bi-pencil-square',
    link: '/student/cp1',
    isLocked: false, 
    isCompleted: isCp1Passed.value
  },
  {
    id: 2,
    title: 'พัฒนาโปรแกรม',
    statusText: isCp1Passed.value ? (isProgressAndThesisPassed.value ? 'ตรวจแล้ว' : 'กำลังดำเนินการ') : 'รอผ่าน CP1',
    statusColor: isCp1Passed.value ? (isProgressAndThesisPassed.value ? 'text-green-600' : 'text-blue-600') : 'text-gray-400',
    icon: isProgressAndThesisPassed.value ? 'bi-eye-fill' : 'bi-plus-lg',
    link: '/student/progress',
    isLocked: !isCp1Passed.value,
    isCompleted: isProgressAndThesisPassed.value
  },
  {
    id: 3,
    title: 'เล่มบัณฑิตนิพนธ์',
    statusText: isCp1Passed.value ? (isProgressAndThesisPassed.value ? 'ตรวจแล้ว' : 'กำลังดำเนินการ') : 'รอผ่าน CP1',
    statusColor: isCp1Passed.value ? (isProgressAndThesisPassed.value ? 'text-green-600' : 'text-blue-600') : 'text-gray-400',
    icon: isProgressAndThesisPassed.value ? 'bi-eye-fill' : 'bi-plus-lg',
    link: '/student/thesis',
    isLocked: !isCp1Passed.value,
    isCompleted: isProgressAndThesisPassed.value
  },

   {
    id: 4,
    title: 'ยื่นขอสอบจบ (CP2, CP3)', // เติมชื่อ CP3 เข้าไปให้ชัดเจน
    statusText: isProgressAndThesisPassed.value ? (isCp2Passed.value ? 'สอบผ่านแล้ว' : 'คลิกเพื่อจัดการเอกสาร') : 'รอผ่านขั้นตอนที่ 2 และ 3',
    statusColor: isProgressAndThesisPassed.value ? (isCp2Passed.value ? 'text-green-600' : 'text-blue-600') : 'text-gray-400',
    icon: isCp2Passed.value ? 'bi-eye-fill' : 'bi-folder2-open', // เปลี่ยนไอคอนเป็นรูปโฟลเดอร์
    link: '/student/exam-request', // เปลี่ยนลิงก์มาที่หน้าศูนย์รวม
    isLocked: !isProgressAndThesisPassed.value,
    isCompleted: isCp2Passed.value
  },

  {
    id: 5,
    title: 'ส่งเล่มและโปรแกรม',
    statusText: isCp2Passed.value ? 'กำลังดำเนินการ' : 'รอผ่านสอบจบ (CP2)',
    statusColor: isCp2Passed.value ? 'text-blue-600' : 'text-gray-400',
    icon: 'bi-plus-lg',
    link: '/student/final-submit',
    isLocked: !isCp2Passed.value,
    isCompleted: false // ข้อ 5 คือขั้นตอนสุดท้าย เปิดให้กดเข้าไปส่งงานได้ตลอด
  }
])
</script>