<template>
  <div class="p-4 md:p-8 font-['Prompt',_sans-serif]">
    
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">ข้อมูลอาจารย์ที่ปรึกษา</h2>
        <p class="text-slate-500 text-sm">รายชื่อและช่องทางการติดต่อของอาจารย์ทั้งหมดในระบบ</p>
      </div>
      
      <button 
        @click="showAddModal = true"
        class="bg-[#1a1a40] hover:bg-[#2c2c54] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-2 w-fit"
      >
        <i class="bi bi-person-plus-fill"></i> เพิ่มอาจารย์ใหม่
      </button>
    </div>

    <div class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 min-h-[70vh] animate-[fadeIn_0.3s_ease-in-out]">
      
      <div class="flex mb-8">
        <div class="w-full xl:w-[400px] relative">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <i class="bi bi-search text-lg"></i>
          </div>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ค้นหาชื่อ หรือ ชื่อผู้ใช้อาจารย์..." 
            class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-all"
          >
        </div>
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a1a40]"></div>
      </div>

      <div v-else class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr class="border-b-2 border-slate-100 text-slate-400 text-sm">
              <th class="pb-4 px-4 w-[80px] text-center">รูป</th>
              <th class="pb-4 font-medium">ชื่อผู้ใช้ (Username)</th>
              <th class="pb-4 font-medium">ชื่อ - นามสกุล</th>
              <th class="pb-4 font-medium">อีเมล</th>
              <th class="pb-4 font-medium">เบอร์โทรศัพท์</th>
              <th class="pb-4 font-medium">LINE ID</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in filteredTeachers" :key="teacher.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              
              <td class="py-4 px-2 text-center">
                <div v-if="teacher.profileImage" class="w-10 h-10 rounded-full mx-auto overflow-hidden border border-slate-200">
                  <img :src="teacher.profileImage" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center border border-indigo-100 mx-auto">
                  {{ teacher.fullname.substring(0, 1) }}
                </div>
              </td>

              <td class="py-4 font-bold text-slate-500">{{ teacher.username }}</td>
              <td class="py-4 font-bold text-slate-800">{{ teacher.fullname }}</td>
              <td class="py-4 text-[14px] text-slate-600">{{ teacher.email }}</td>
              <td class="py-4 text-[15px] text-slate-600">{{ teacher.tel || '-' }}</td>
              <td class="py-4 text-[15px] text-[#00B900] font-medium">{{ teacher.lineId || '-' }}</td>

              <td class="py-4 text-center">
                <button @click="confirmDelete(teacher)" class="text-rose-400 hover:text-white hover:bg-rose-500 border border-rose-200 hover:border-rose-500 transition-all px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-sm">
                  <i class="bi bi-trash"></i> ลบ
                </button>
              </td>

            </tr>
          </tbody>
        </table>

        <div v-if="filteredTeachers.length === 0" class="py-20 text-center text-slate-400">
          <i class="bi bi-person-badge text-5xl opacity-20"></i>
          <p class="mt-4 font-medium text-slate-500">ไม่พบข้อมูลอาจารย์</p>
        </div>
      </div>

    </div>

    <!-- Modal เพิ่มอาจารย์ -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 class="text-xl font-bold text-slate-900">เพิ่มอาจารย์ที่ปรึกษาใหม่</h3>
          <button @click="showAddModal = false" class="text-slate-400 hover:text-slate-600">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        
        <form @submit.prevent="handleAddTeacher" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">ชื่อผู้ใช้ (Username)</label>
            <input v-model="form.username" type="text" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a1a40] focus:ring-2 focus:ring-[#1a1a40]/10 outline-none transition-all text-sm" placeholder="เช่น teacher_name">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">รหัสผ่าน</label>
            <input v-model="form.password" type="password" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a1a40] focus:ring-2 focus:ring-[#1a1a40]/10 outline-none transition-all text-sm" placeholder="รหัสผ่านสำหรับเข้าสู่ระบบ">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">ชื่อ - นามสกุล</label>
            <input v-model="form.fullname" type="text" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a1a40] focus:ring-2 focus:ring-[#1a1a40]/10 outline-none transition-all text-sm" placeholder="เช่น อ. สมชาย ใจดี">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">อีเมล</label>
            <input v-model="form.email" type="email" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a1a40] focus:ring-2 focus:ring-[#1a1a40]/10 outline-none transition-all text-sm" placeholder="example@bsru.ac.th">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">เบอร์โทรศัพท์</label>
              <input v-model="form.tel" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a1a40] focus:ring-2 focus:ring-[#1a1a40]/10 outline-none transition-all text-sm" placeholder="08x-xxx-xxxx">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">LINE ID</label>
              <input v-model="form.lineId" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a1a40] focus:ring-2 focus:ring-[#1a1a40]/10 outline-none transition-all text-sm" placeholder="ID LINE">
            </div>
          </div>

          <div class="pt-4 flex gap-3">
            <button 
              type="button" 
              @click="showAddModal = false"
              class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
            >
              ยกเลิก
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="flex-1 px-4 py-2.5 rounded-xl bg-[#1a1a40] text-white font-bold text-sm hover:bg-[#2c2c54] transition-all disabled:opacity-50"
            >
              {{ loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({ layout: 'admin' })

const searchQuery = ref('')
const showAddModal = ref(false)
const loading = ref(false)

const form = ref({
  username: '',
  password: '',
  fullname: '',
  email: '',
  tel: '',
  lineId: ''
})

// ดึงข้อมูลอาจารย์
const { data: teachersData, pending, refresh } = await useFetch('/api/admin/teachers')
const teachers = computed(() => teachersData.value?.teachers || [])

// ฟังก์ชันค้นหา
const filteredTeachers = computed(() => {
  return teachers.value.filter(t => {
    const search = searchQuery.value.toLowerCase()
    return t.fullname.toLowerCase().includes(search) || t.username.toLowerCase().includes(search)
  })
})

// เพิ่มอาจารย์ใหม่
const handleAddTeacher = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/admin/teachers', {
      method: 'POST',
      body: form.value
    })

    if (response.success) {
      alert('เพิ่มข้อมูลอาจารย์เรียบร้อยแล้ว')
      showAddModal.value = false
      // Reset form
      form.value = {
        username: '',
        password: '',
        fullname: '',
        email: '',
        tel: '',
        lineId: ''
      }
      refresh()
    }
  } catch (error) {
    alert(error.statusMessage || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    loading.value = false
  }
}

// ลบอาจารย์
const confirmDelete = async (teacher) => {
  if (confirm(`คุณยืนยันที่จะลบข้อมูลของ "${teacher.fullname}" ออกจากระบบใช่หรือไม่?\n* การกระทำนี้ไม่สามารถกู้คืนได้`)) {
    try {
      const response = await $fetch(`/api/admin/teachers?id=${teacher.id}`, {
        method: 'DELETE'
      })
      if (response.success) {
        alert('ลบข้อมูลเรียบร้อยแล้ว')
        refresh()
      }
    } catch (error) {
      alert(error.statusMessage || 'เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>