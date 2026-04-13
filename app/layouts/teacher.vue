<template>
  <div class="min-h-screen bg-slate-50 font-['Kanit',_sans-serif]">
    
    <nav class="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm print:hidden sticky top-0 z-50">
      
      <div class="flex items-center gap-3 text-indigo-600">
        <i class="bi bi-person-workspace text-2xl"></i>
        <span class="font-bold text-[18px] tracking-wide text-slate-800">Teacher<span class="text-indigo-600">Panel</span></span>
      </div>

      <div class="flex items-center gap-4">
        
        <div class="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-100 bg-slate-50">
          <div class="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-inner">
            อ
          </div>
          <div class="flex flex-col pr-2">
            <span class="text-sm font-bold text-slate-800 leading-none mt-1">อ.ธีรพัฒน์ ใจดี</span>
            <span class="text-[10px] text-slate-400 font-medium">อาจารย์ที่ปรึกษา</span>
          </div>
        </div>

        <button class="flex items-center gap-2 bg-rose-50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-medium px-4 py-2 rounded-full">
          <i class="bi bi-box-arrow-right"></i> <span class="hidden md:inline">ออกจากระบบ</span>
        </button>

      </div>
    </nav>

    <main>
      <slot />
    </main>

  </div>
</template>

<script setup>
// Layout สำหรับอาจารย์
</script>