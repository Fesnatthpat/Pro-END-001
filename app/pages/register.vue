<template>
  <div class="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] font-['Prompt']">
    
    <div class="bg-white w-full max-w-[650px] p-[45px] rounded-[20px] shadow-[0_15px_35px_rgba(0,0,0,0.1)]">
      
      <h2 class="text-[#1a1a40] font-bold text-center mb-[30px] text-[2rem]">
        <i class="bi bi-person-plus-fill"></i> ลงทะเบียน
      </h2>

      <form @submit.prevent="handleRegister">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">รหัสนักศึกษา (Username)</label>
            <input type="text" name="username" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="เช่น 65xxxxxx">
          </div>
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">อีเมล</label>
            <input type="email" name="email" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="student@university.ac.th">
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">รหัสผ่าน</label>
          <input type="password" name="password" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="กำหนดรหัสผ่าน">
        </div>

        <div class="relative border-t border-dashed border-[#ddd] my-[30px]">
          <span class="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-white px-[15px] text-[#888] text-[0.85rem] font-medium">ข้อมูลส่วนตัวนักศึกษา</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="md:col-span-2">
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">ชื่อ-นามสกุล</label>
            <input type="text" name="fullname" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="นาย/นางสาว...">
          </div>
          <div class="md:col-span-1">
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">ปีการศึกษา</label>
            <select name="academic_year" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none appearance-none" required>
              <option value="">เลือกปี</option>
              <option>2569</option>
              <option>2568</option>
              <option>2567</option>
              <option>2566</option>
              <option>2565</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">เบอร์โทรศัพท์</label>
            <input type="text" name="tel" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="08x-xxx-xxxx">
          </div>
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">Line ID</label>
            <input type="text" name="line_id" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="ไอดีไลน์">
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">รูปโปรไฟล์ <small class="text-gray-400 font-normal">(ถ้ามี)</small></label>
          <input type="file" name="profile_image" class="w-full rounded-[12px] p-[10px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#1a1a40] file:text-white hover:file:bg-[#2c2c54] file:cursor-pointer cursor-pointer" accept="image/png, image/jpeg, image/jpg">
        </div>

        <button type="submit" class="w-full bg-[#1a1a40] text-white p-[14px] rounded-full text-[1.1rem] font-semibold mt-[20px] transition-all duration-200 hover:bg-[#2c2c54] hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(26,26,64,0.2)]">
          ลงทะเบียน
        </button>

        <div class="text-center mt-[25px] text-[0.95rem] text-[#666]">
          มีบัญชีอยู่แล้ว? <NuxtLink to="/login" class="text-[#1a1a40] font-semibold no-underline hover:underline">เข้าสู่ระบบที่นี่</NuxtLink>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'ลงทะเบียน | ระบบจัดการบัณฑิตนิพนธ์',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600&display=swap' },
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css' }
  ]
})

const handleRegister = () => {
  alert('กดลงทะเบียนแล้วครับ เตรียมข้อมูลให้ Back-end ได้เลย!')
}
definePageMeta({
  layout: false // สั่งให้หน้านี้ไม่ต้องใช้ Layout กรอบรูป
})
</script>