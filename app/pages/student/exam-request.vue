<template>
  <div class="min-h-screen py-8 px-4 font-['Prompt']">
    <div class="max-w-[900px] mx-auto w-full">
      
      <div class="mb-8">
        <NuxtLink to="/student" class="flex items-center gap-2 text-gray-500 hover:text-[#1a1a40] transition-colors mb-2 font-medium w-fit">
          <i class="bi bi-arrow-left"></i> กลับหน้าหลัก
        </NuxtLink>
        <h2 class="font-bold text-[24px] md:text-[28px] text-[#1a1a40]">
          🎓 จัดการเอกสารยื่นขอสอบจบ
        </h2>
        <p class="text-gray-500 mt-1">กรุณากรอกข้อมูลและพิมพ์เอกสารทั้ง 2 ชุด เพื่อนำไปยื่นขอสอบจบโครงงาน</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <NuxtLink to="/student/cp2" class="group bg-white rounded-[20px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)] border-2 border-transparent hover:border-blue-500 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
          
          <div class="w-[80px] h-[80px] bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[35px] mb-5 z-10 group-hover:scale-110 transition-transform duration-300">
            <i class="bi bi-file-earmark-text-fill"></i>
          </div>
          
          <h3 class="font-bold text-[20px] text-[#1a1a40] mb-2 z-10">แบบขอสอบจบ (CP2)</h3>
          
          
          <div class="mt-6 text-blue-600 font-medium text-sm flex items-center gap-2 z-10 group-hover:translate-x-1 transition-transform">
            จัดการเอกสาร <i class="bi bi-arrow-right"></i>
          </div>
        </NuxtLink>

        <NuxtLink to="/student/cp3" class="group bg-white rounded-[20px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] border-2 border-transparent hover:border-emerald-500 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
          
          <div class="w-[80px] h-[80px] bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[35px] mb-5 z-10 group-hover:scale-110 transition-transform duration-300">
            <i class="bi bi-file-earmark-check-fill"></i>
          </div>
          
          <h3 class="font-bold text-[20px] text-[#1a1a40] mb-2 z-10">แบบประเมินสอบ (CP3)</h3>
         
          
          <div class="mt-6 text-emerald-600 font-medium text-sm flex items-center gap-2 z-10 group-hover:translate-x-1 transition-transform">
            จัดการเอกสาร <i class="bi bi-arrow-right"></i>
          </div>
        </NuxtLink>

      </div>

    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'จัดการเอกสารยื่นขอสอบจบ (CP2 & CP3)'
})
</script>