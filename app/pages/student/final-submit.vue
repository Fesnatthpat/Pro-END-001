<template>
  <div class="min-h-screen py-8 px-4 font-['Prompt']">
    <div class="max-w-[800px] mx-auto w-full">
      
      <div class="mb-8">
        <NuxtLink to="/student" class="flex items-center gap-2 text-gray-500 hover:text-[#1a1a40] transition-colors mb-2 font-medium w-fit">
          <i class="bi bi-arrow-left"></i> กลับหน้าหลัก
        </NuxtLink>
        <h2 class="font-bold text-[24px] md:text-[28px] text-[#1a1a40] flex items-center gap-3">
          <i class="bi bi-box-seam-fill text-blue-600"></i> ส่งเล่มและโปรแกรมฉบับสมบูรณ์
        </h2>
        <p class="text-gray-500 mt-1">ขั้นตอนสุดท้าย: อัปโหลดไฟล์เอกสารรูปเล่มและซอร์สโค้ดโปรแกรมฉบับสมบูรณ์</p>
      </div>

      <div class="bg-white rounded-[20px] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        
        <div class="mb-8">
          <h3 class="font-bold text-[18px] text-[#1a1a40] mb-4 flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
            แนบไฟล์รูปเล่มปริญญานิพนธ์
          </h3>
          <div class="ml-0 md:ml-10">
            <label class="block text-sm text-gray-600 mb-2">ไฟล์รูปเล่มฉบับสมบูรณ์ (รองรับเฉพาะไฟล์ .pdf)</label>
            <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-gray-50 transition-colors text-center relative">
              <input type="file" accept=".pdf" @change="handleDocumentUpload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
              
              <div v-if="!form.documentName" class="text-gray-500">
                <i class="bi bi-file-earmark-pdf text-[30px] mb-2 block text-red-500"></i>
                <p class="text-sm font-medium">คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่</p>
                <p class="text-xs mt-1">ขนาดไฟล์ไม่เกิน 20MB</p>
              </div>
              <div v-else class="text-green-600 font-medium flex items-center justify-center gap-2">
                <i class="bi bi-check-circle-fill"></i> {{ form.documentName }}
              </div>
            </div>
          </div>
        </div>

        <hr class="border-gray-100 mb-8">

        <div class="mb-8">
          <h3 class="font-bold text-[18px] text-[#1a1a40] mb-4 flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">2</span>
            แนบซอร์สโค้ดโปรแกรม
          </h3>
          <div class="ml-0 md:ml-10 space-y-5">
            
            <div>
              <label class="block text-sm text-gray-600 mb-2">ไฟล์ Source Code (รองรับไฟล์ .zip, .rar)</label>
              <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-gray-50 transition-colors text-center relative">
                <input type="file" accept=".zip,.rar" @change="handleProgramUpload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                
                <div v-if="!form.programName" class="text-gray-500">
                  <i class="bi bi-file-earmark-zip text-[30px] mb-2 block text-emerald-500"></i>
                  <p class="text-sm font-medium">คลิกเพื่อเลือกไฟล์ ซิป (Zip/Rar)</p>
                  <p class="text-xs mt-1">ขนาดไฟล์ไม่เกิน 100MB</p>
                </div>
                <div v-else class="text-green-600 font-medium flex items-center justify-center gap-2">
                  <i class="bi bi-check-circle-fill"></i> {{ form.programName }}
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm text-gray-600 mb-2">หรือ ระบุลิงก์ดาวน์โหลด / GitHub Repository (กรณีไฟล์ใหญ่มาก)</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="bi bi-link-45deg text-gray-400 text-lg"></i>
                </div>
                <input type="url" v-model="form.programLink" placeholder="https://github.com/... หรือ https://drive.google.com/..." class="w-full bg-gray-50 border border-gray-200 text-[#1a1a40] text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block pl-11 p-3 outline-none transition-colors">
              </div>
            </div>

          </div>
        </div>

        <div class="flex justify-end mt-10">
          <button @click="submitFinalProject" class="bg-[#1a1a40] hover:bg-[#2a2a5c] text-white font-medium py-3 px-8 rounded-full transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(26,26,64,0.3)]">
            <i class="bi bi-send-fill"></i> ยืนยันการส่งงานฉบับสมบูรณ์
          </button>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

useHead({
  title: 'ส่งเล่มและโปรแกรมฉบับสมบูรณ์'
})

const form = reactive({
  documentName: '',
  programName: '',
  programLink: ''
})

// จำลองการรับชื่อไฟล์ที่อัปโหลด
const handleDocumentUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.documentName = file.name
  }
}

const handleProgramUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.programName = file.name
  }
}

const submitFinalProject = () => {
  // เช็คเงื่อนไขเบื้องต้น ว่าต้องส่งเล่ม และ (ต้องมีไฟล์โปรแกรม หรือ ลิงก์โปรแกรม อย่างใดอย่างหนึ่ง)
  if (!form.documentName) {
    alert('กรุณาแนบไฟล์รูปเล่ม (PDF) ก่อนครับ')
    return
  }
  if (!form.programName && !form.programLink) {
    alert('กรุณาแนบไฟล์ Source Code หรือ ระบุลิงก์สำหรับดาวน์โหลดโปรแกรมครับ')
    return
  }

  // ถ้าผ่าน
  alert('🎉 ส่งงานฉบับสมบูรณ์เรียบร้อยแล้ว! ขอแสดงความยินดีด้วยครับ คุณเรียนจบแล้ว!')
  
  // นำทางกลับหน้าหลัก หรือเปลี่ยนสถานะ
  // useRouter().push('/student')
}
</script>