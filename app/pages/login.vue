<template>
  <div class="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] font-['Prompt']">
    
    <div class="bg-white w-full max-w-[500px] p-[45px] rounded-[20px] shadow-[0_15px_35px_rgba(0,0,0,0.1)]">
      
      <h2 class="text-[#1a1a40] font-bold text-center mb-[30px] text-[2rem]">
        <i class="bi bi-box-arrow-in-right"></i> เข้าสู่ระบบ
      </h2>

      <form @submit.prevent="handleLogin">
        
        <div class="mb-4">
          <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">อีเมล หรือ รหัสนักศึกษา</label>
          <input type="text" name="email_or_id" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="กรอกข้อมูลเพื่อเข้าสู่ระบบ">
        </div>

        <div class="mb-4">
          <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">รหัสผ่าน</label>
          <input type="password" name="password" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="กรอกรหัสผ่าน">
        </div>

        <button type="submit" class="w-full bg-[#1a1a40] text-white p-[14px] rounded-full text-[1.1rem] font-semibold mt-[20px] transition-all duration-200 hover:bg-[#2c2c54] hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(26,26,64,0.2)]">
          เข้าสู่ระบบ
        </button>

        <div class="text-center mt-[25px] text-[0.95rem] text-[#666]">
          ยังไม่มีบัญชีใช่ไหม? <NuxtLink to="/register" class="text-[#1a1a40] font-semibold no-underline hover:underline">สมัครสมาชิกที่นี่</NuxtLink>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
// นำเข้าฟังก์ชันสำหรับเปลี่ยนหน้าของ Nuxt
const router = useRouter()

definePageMeta({
  layout: false
})

const handleLogin = () => {
  // 1. (อนาคต) ตรงนี้จะส่งข้อมูลไปเช็กกับ Back-end
  // 2. ตอนนี้เราสั่งให้ "เปลี่ยนหน้า" ไปที่ /student ทันที
  useRouter().push('/student')
}

useHead({
  title: 'เข้าสู่ระบบ | BSRU Computer Project',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600&display=swap' },
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css' }
  ]
})
</script>