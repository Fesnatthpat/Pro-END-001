<template>
  <div class="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-['Kanit',_sans-serif] text-slate-800">
    <div class="max-w-[900px] mx-auto w-full">
      
      <div class="mb-6">
        <NuxtLink to="/student" class="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 transition-all text-sm font-bold w-fit hover:-translate-x-1">
          <i class="bi bi-arrow-left"></i> ย้อนกลับไปหน้าหลัก
        </NuxtLink>
      </div>

      <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 class="font-bold text-2xl md:text-3xl text-slate-900 tracking-tight flex items-center gap-3">
          <span class="bg-indigo-600 text-white p-2 rounded-2xl shadow-lg shadow-indigo-200">
            <i class="bi bi-person-badge text-xl"></i>
          </span>
          โปรไฟล์ของฉัน
        </h2>
        <button @click="isEditing = !isEditing" 
                :class="isEditing ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'"
                class="px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 w-fit">
          <i :class="isEditing ? 'bi bi-x-lg' : 'bi bi-pencil-square'"></i>
          {{ isEditing ? 'ยกเลิกการแก้ไข' : 'แก้ไขข้อมูล' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="md:col-span-1 space-y-6">
          <div class="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
            <div class="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-4 border-white shadow-md">
              {{ student.name.substring(0, 2) }}
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-1">{{ student.name }}</h3>
            <p class="text-slate-400 text-sm font-medium mb-6">รหัส: {{ student.id }}</p>
            
            <div class="inline-block bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
              <i class="bi bi-shield-check mr-1"></i> นักศึกษาปัจจุบัน
            </div>
          </div>

          <div class="bg-indigo-900 rounded-[32px] p-6 shadow-lg text-white relative overflow-hidden">
            <i class="bi bi-code-square absolute -right-4 -bottom-4 text-6xl opacity-10"></i>
            <h4 class="text-sm font-bold text-indigo-300 mb-4 uppercase tracking-wider">โครงงานของฉัน</h4>
            <p class="text-[15px] font-medium leading-relaxed mb-4">
              {{ student.projectTitle }}
            </p>
            <div class="text-xs text-indigo-200 flex items-center gap-2">
              <i class="bi bi-person-workspace"></i> ที่ปรึกษา: {{ student.advisor }}
            </div>
          </div>
        </div>

        <div class="md:col-span-2 space-y-6">
          <div class="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-slate-200">
            
            <h4 class="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
              <i class="bi bi-clipboard2-data text-indigo-500"></i> รายละเอียดข้อมูลส่วนตัว
            </h4>

            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">ชื่อ-นามสกุล</label>
                  <input type="text" :value="student.name" disabled class="w-full bg-slate-50 border border-slate-200 text-slate-500 text-sm rounded-2xl px-4 py-3 outline-none cursor-not-allowed">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">รหัสนักศึกษา</label>
                  <input type="text" :value="student.id" disabled class="w-full bg-slate-50 border border-slate-200 text-slate-500 text-sm rounded-2xl px-4 py-3 outline-none cursor-not-allowed">
                </div>
              </div>

              <hr class="border-slate-100 my-4">

              <div class="space-y-6">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">เบอร์โทรศัพท์ติดต่อ</label>
                  <div class="relative">
                    <i class="bi bi-telephone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="text" v-model="student.tel" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10' : 'bg-slate-50 border-slate-200'"
                           class="w-full border text-sm font-medium text-slate-700 rounded-2xl pl-11 pr-4 py-3 outline-none transition-all">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">อีเมล (Email)</label>
                  <div class="relative">
                    <i class="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="email" v-model="student.email" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10' : 'bg-slate-50 border-slate-200'"
                           class="w-full border text-sm font-medium text-slate-700 rounded-2xl pl-11 pr-4 py-3 outline-none transition-all">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">LINE ID</label>
                  <div class="relative">
                    <i class="bi bi-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="text" v-model="student.line" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10' : 'bg-slate-50 border-slate-200'"
                           class="w-full border text-sm font-medium text-slate-700 rounded-2xl pl-11 pr-4 py-3 outline-none transition-all">
                  </div>
                </div>
              </div>

              <div v-if="isEditing" class="pt-6 animate-[fadeIn_0.3s_ease-in-out]">
                <button @click="saveProfile" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                  <i class="bi bi-check-circle-fill"></i> บันทึกข้อมูลที่แก้ไข
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">
             <h4 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <i class="bi bi-key text-amber-500"></i> เปลี่ยนรหัสผ่านใหม่
            </h4>
            <button class="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-6 py-2.5 rounded-xl transition-all border border-indigo-100 w-fit">
              ดำเนินการเปลี่ยนรหัสผ่าน <i class="bi bi-arrow-right ml-1"></i>
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
  title: 'My Profile | Student Panel',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap' }
  ]
})

// บังคับใช้ Layout ของนักศึกษา
definePageMeta({
  layout: 'student'
})

const isEditing = ref(false)

// ข้อมูลจำลองของนักศึกษา
const student = ref({
  id: '6611223344',
  name: 'นางสาวตัวอย่าง ใจดี',
  tel: '081-234-5678',
  email: 'example.student@bsru.ac.th',
  line: 'jaidee_student',
  projectTitle: 'ระบบบริหารจัดการโครงงานคอมพิวเตอร์แบบครบวงจร',
  advisor: 'อ.ธีรพัฒน์ ใจดี'
})

const saveProfile = () => {
  alert('บันทึกข้อมูลสำเร็จแล้ว!')
  isEditing.value = false
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>