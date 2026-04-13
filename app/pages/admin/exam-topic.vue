<template>
  <div class="p-4 md:p-8 font-['Prompt',_sans-serif]">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">คำร้องขอสอบหัวข้อ (CP1)</h2>
        <p class="text-slate-500 text-sm">จัดการคำร้องและจัดตารางสอบหัวข้อโครงงาน</p>
      </div>
      
      <div class="flex bg-white rounded-full p-1 shadow-sm border border-slate-100">
        <button @click="activeTab = 'waiting'" 
                :class="activeTab === 'waiting' ? 'bg-[#1a1a40] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'"
                class="px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 text-nowrap">
          <i class="bi bi-inbox"></i> รอดำเนินการ
        </button>
        <button @click="activeTab = 'scheduled'" 
                :class="activeTab === 'scheduled' ? 'bg-[#1a1a40] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'"
                class="px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 text-nowrap">
          <i class="bi bi-calendar-week"></i> ตารางนัดสอบ
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'waiting'" class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 min-h-[500px] animate-[fadeIn_0.3s_ease-in-out]">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b-2 border-slate-100 text-slate-400 text-[15px]">
              <th class="pb-4 font-medium px-4">ชื่อโครงงาน</th>
              <th class="pb-4 font-medium">ผู้วิจัย</th>
              <th class="pb-4 font-medium">วันที่ยื่น</th>
              <th class="pb-4 font-medium text-center">เอกสาร</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in waitList" :key="item.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td class="py-4 px-4 font-bold text-slate-800 text-[15px]">{{ item.title }}</td>
              <td class="py-4 text-slate-600">{{ item.student }}</td>
              <td class="py-4 text-slate-500 text-sm">{{ item.date }}</td>
              <td class="py-4 text-center">
                <button class="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
                  <i class="bi bi-file-earmark-pdf text-rose-500"></i> View
                </button>
              </td>
              <td class="py-4 text-center">
                <button @click="openScheduleModal(item)" class="bg-white border-2 border-[#1a1a40] text-[#1a1a40] hover:bg-[#1a1a40] hover:text-white px-5 py-1.5 rounded-full text-sm font-bold transition-colors">
                  ระบุวันสอบ
                </button>
              </td>
            </tr>
            <tr v-if="waitList.length === 0">
              <td colspan="5" class="py-10 text-center text-slate-400 font-medium">ไม่มีรายการคำร้องใหม่</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="activeTab === 'scheduled'" class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 min-h-[500px] animate-[fadeIn_0.3s_ease-in-out]">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b-2 border-slate-100 text-slate-400 text-[15px]">
              <th class="pb-4 font-medium px-4">วันสอบ</th>
              <th class="pb-4 font-medium">เวลา</th>
              <th class="pb-4 font-medium text-center">ห้อง</th>
              <th class="pb-4 font-medium">ผู้วิจัย</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in scheduleList" :key="item.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td class="py-4 px-4 font-bold text-indigo-600 text-lg">{{ item.examDate }}</td>
              <td class="py-4 font-bold text-slate-700">{{ item.examTime }}</td>
              <td class="py-4 text-center">
                <span class="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold">{{ item.examRoom }}</span>
              </td>
              <td class="py-4 text-slate-600">{{ item.student }}</td>
              <td class="py-4 text-center">
                <button @click="openResultModal(item)" class="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-1.5 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 mx-auto">
                  <i class="bi bi-clipboard-check"></i> บันทึกผลสอบ
                </button>
              </td>
            </tr>
            <tr v-if="scheduleList.length === 0">
              <td colspan="5" class="py-10 text-center text-slate-400 font-medium">ยังไม่มีตารางนัดสอบ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showScheduleModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-in-out]">
      <div class="bg-white w-full max-w-[500px] rounded-[28px] p-6 md:p-8 shadow-2xl relative" @click.stop>
        <button @click="showScheduleModal = false" class="absolute top-4 right-4 text-slate-300 hover:text-rose-500 text-2xl transition-colors">
          <i class="bi bi-x-circle-fill"></i>
        </button>
        <h3 class="font-bold text-2xl text-center text-slate-900 mb-6">ระบุวันสอบหัวข้อ (CP1)</h3>
        
        <form @submit.prevent="saveSchedule" class="space-y-4">
          <div class="flex flex-col gap-1.5">
            <label class="font-bold text-slate-700 text-sm">วันที่</label>
            <input type="date" v-model="scheduleForm.date" required class="w-full bg-white border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#1a1a40] transition-colors">
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="font-bold text-slate-700 text-sm">เวลา</label>
            <input type="text" v-model="scheduleForm.time" placeholder="เช่น 13:00 - 16:00" required class="w-full bg-white border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#1a1a40] transition-colors">
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="font-bold text-slate-700 text-sm">ห้อง</label>
            <input type="text" v-model="scheduleForm.room" placeholder="เช่น 6125" required class="w-full bg-white border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#1a1a40] transition-colors">
          </div>
          <button type="submit" class="w-full bg-[#1a1a40] hover:bg-[#2c2c54] text-white font-bold text-base py-3 rounded-full mt-6 shadow-md flex justify-center items-center gap-2 transition-transform hover:scale-[1.02]">
            <i class="bi bi-plus-circle-fill"></i> บันทึกตารางสอบหัวข้อ
          </button>
        </form>
      </div>
    </div>

    <div v-if="showResultModal" class="fixed inset-0 z-[101] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-in-out]">
      <div class="bg-white w-full max-w-[520px] rounded-[28px] p-6 md:p-8 shadow-2xl relative" @click.stop>
        <button @click="showResultModal = false" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors">
          <i class="bi bi-x-lg"></i>
        </button>
        <h3 class="font-bold text-2xl text-center text-slate-900 mb-6">บันทึกผลการสอบหัวข้อ (CP1)</h3>

        <form @submit.prevent="saveResult" class="space-y-4">
          
          <div class="flex flex-col gap-2">
            <label class="font-bold text-slate-700 text-sm">ผลการสอบ</label>
            <div class="flex gap-3 w-full">
              <label class="flex-1 cursor-pointer group">
                <input type="radio" v-model="resultForm.status" value="pass" class="hidden peer">
                <div class="px-4 py-2.5 rounded-xl border-2 border-slate-100 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 text-slate-500 peer-checked:text-emerald-700 font-bold transition-all text-center text-sm">
                  <i class="bi bi-check-circle-fill mr-1"></i> ผ่าน
                </div>
              </label>
              <label class="flex-1 cursor-pointer group">
                <input type="radio" v-model="resultForm.status" value="fail" class="hidden peer">
                <div class="px-4 py-2.5 rounded-xl border-2 border-slate-100 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600 peer-checked:border-rose-500 peer-checked:bg-rose-50 text-slate-500 peer-checked:text-rose-700 font-bold transition-all text-center text-sm">
                  <i class="bi bi-x-circle-fill mr-1"></i> ไม่ผ่าน
                </div>
              </label>
            </div>
          </div>

          <div v-if="resultForm.status === 'pass'" class="flex flex-col gap-2 animate-[fadeIn_0.2s_ease-in-out]">
            <label class="font-bold text-slate-700 text-sm">อาจารย์ที่ปรึกษาหลัก</label>
            <div class="relative">
              <select v-model="resultForm.advisorMain" class="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-[#1a1a40] appearance-none cursor-pointer">
                <option value="" disabled selected>-- เลือกอาจารย์ที่ปรึกษาหลัก --</option>
                <option value="1">อ. ธีรพัฒน์ ใจดี</option>
                <option value="2">ผศ.ดร. สมศรี มีสุข</option>
                <option value="3">อ. มานพ ขยันสอน</option>
              </select>
              <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                <i class="bi bi-chevron-down font-bold"></i>
              </div>
            </div>
          </div>

          <div v-if="resultForm.status === 'pass'" class="flex flex-col gap-2 animate-[fadeIn_0.2s_ease-in-out]">
            <label class="font-bold text-slate-700 text-sm">อาจารย์ที่ปรึกษาร่วม (ถ้ามี)</label>
            <div class="relative">
              <select v-model="resultForm.advisorCo" class="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-[#1a1a40] appearance-none cursor-pointer">
                <option value="">-- ไม่มีอาจารย์ที่ปรึกษาร่วม --</option>
                <option value="1">อ. ธีรพัฒน์ ใจดี</option>
                <option value="2">ผศ.ดร. สมศรี มีสุข</option>
                <option value="3">อ. มานพ ขยันสอน</option>
              </select>
              <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                <i class="bi bi-chevron-down font-bold"></i>
              </div>
            </div>
          </div>

          <div v-if="resultForm.status === 'pass'" class="flex flex-col gap-2 animate-[fadeIn_0.2s_ease-in-out]">
            <label class="font-bold text-slate-700 text-sm">ให้เกรด</label>
            <div class="relative">
              <select v-model="resultForm.grade" class="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-[#1a1a40] appearance-none cursor-pointer">
                <option value="A">Grade A </option>
                <option value="B+">Grade B+ </option>
                <option value="B">Grade B </option>
                <option value="C+">Grade C+ </option>
                <option value="C">Grade C </option>
                <option value="D+">Grade D+ </option>
                <option value="D">Grade D </option>
              </select>
              <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                <i class="bi bi-chevron-down font-bold"></i>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-bold text-slate-700 text-sm">รายละเอียด / หมายเหตุ</label>
            <textarea v-model="resultForm.details" rows="2" placeholder="กรอกข้อเสนอแนะ การแก้ไข หรือสาเหตุที่ไม่ผ่าน..." class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#1a1a40] transition-all text-sm text-slate-700 resize-none"></textarea>
          </div>

          <button type="submit" class="w-full bg-[#1a1a40] hover:bg-[#2c2c54] text-white font-bold text-base py-3.5 rounded-xl mt-4 shadow-md flex justify-center items-center gap-2 transition-transform hover:-translate-y-0.5">
            <i class="bi bi-cloud-arrow-up-fill"></i> ยืนยันบันทึกผลสอบหัวข้อ
          </button>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

const activeTab = ref('waiting')
const showScheduleModal = ref(false)
const showResultModal = ref(false)

const scheduleForm = ref({ projectId: null, date: '', time: '', room: '' })
const resultForm = ref({ 
  projectId: null, 
  status: 'pass', 
  advisorMain: '', 
  advisorCo: '', 
  grade: 'A', 
  details: '' 
})

// ข้อมูลจำลอง (Mock Data)
const waitList = ref([
  { id: 1, title: 'ระบบบริหารจัดการโครงงานคอมพิวเตอร์แบบครบวงจร', student: 'นางสาวตัวอย่าง ใจดี', date: '25/08/2026' },
  { id: 2, title: 'แอปพลิเคชันจองคิวคลินิกทันตกรรม', student: 'นายสมมติ นามสกุล', date: '26/08/2026' }
])

const scheduleList = ref([
  { id: 3, title: 'ระบบ AI ตรวจจับการสวมหมวกกันน็อค', student: 'นายชาญฉลาด มากมาย', examDate: '30/08/2026', examTime: '09:00 - 12:00', examRoom: '412' }
])

const openScheduleModal = (item) => {
  scheduleForm.value.projectId = item.id
  scheduleForm.value.date = ''
  scheduleForm.value.time = ''
  scheduleForm.value.room = ''
  showScheduleModal.value = true
}

const openResultModal = (item) => {
  resultForm.value.projectId = item.id
  resultForm.value.status = 'pass'
  resultForm.value.advisorMain = ''
  resultForm.value.advisorCo = ''
  resultForm.value.grade = 'A'
  resultForm.value.details = ''
  showResultModal.value = true
}

const saveSchedule = () => {
  alert('จัดตารางสอบหัวข้อเรียบร้อยแล้ว!')
  showScheduleModal.value = false
}

// 🌟 อัปเดตฟังก์ชัน Save ให้เช็คการเลือกอาจารย์เฉพาะตอนที่ผลสอบ "ผ่าน" 🌟
const saveResult = () => {
  if (resultForm.value.status === 'pass' && !resultForm.value.advisorMain) {
    alert('กรุณาเลือกอาจารย์ที่ปรึกษาหลัก')
    return
  }

  let text = 'ไม่ผ่าน'
  let advisorInfo = ''
  
  if (resultForm.value.status === 'pass') {
    text = `ผ่าน (เกรด ${resultForm.value.grade})`
    advisorInfo = `\nที่ปรึกษาหลัก: ${resultForm.value.advisorMain}${resultForm.value.advisorCo ? ', ที่ปรึกษาร่วม: ' + resultForm.value.advisorCo : ''}`
  }
  
  alert(`บันทึกผลสอบหัวข้อสำเร็จ: ${text}${advisorInfo}\nรายละเอียด: ${resultForm.value.details}`)
  showResultModal.value = false
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>