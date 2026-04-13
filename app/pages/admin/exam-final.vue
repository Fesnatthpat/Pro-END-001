<template>
  <div class="p-4 md:p-8 font-['Prompt',_sans-serif]">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">คำร้องขอสอบจบ (CP2/CP3)</h2>
        <p class="text-slate-500 text-sm">จัดการคำร้องและบันทึกผลการสอบจบ</p>
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
          <i class="bi bi-calendar-check"></i> ตารางนัดสอบ
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
              <th class="pb-4 font-medium text-center">เอกสาร (CP2 / CP3)</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in waitList" :key="item.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td class="py-4 px-4 font-bold text-slate-800 text-[15px]">{{ item.title }}</td>
              <td class="py-4 text-slate-600">{{ item.student }}</td>
              <td class="py-4 text-slate-500 text-sm">{{ item.date }}</td>
              <td class="py-4">
                <div class="flex items-center justify-center gap-2">
                  <button class="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 border border-indigo-100">
                    <i class="bi bi-file-earmark-pdf-fill"></i> CP2
                  </button>
                  <button class="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 border border-rose-100">
                    <i class="bi bi-file-earmark-pdf-fill"></i> CP3
                  </button>
                </div>
              </td>
              <td class="py-4 text-center">
                <button @click="openScheduleModal(item)" class="bg-white border-2 border-[#1a1a40] text-[#1a1a40] hover:bg-[#1a1a40] hover:text-white px-5 py-1.5 rounded-full text-sm font-bold transition-colors">
                  ระบุวันสอบ
                </button>
              </td>
            </tr>
            <tr v-if="waitList.length === 0">
              <td colspan="5" class="py-10 text-center text-slate-400 font-medium">ไม่มีรายการคำร้องขอสอบจบ</td>
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
              <th class="pb-4 font-medium px-4">วันสอบจบ</th>
              <th class="pb-4 font-medium">เวลา</th>
              <th class="pb-4 font-medium text-center">ห้อง</th>
              <th class="pb-4 font-medium">ผู้วิจัย</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in scheduleList" :key="item.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td class="py-4 px-4 font-bold text-rose-600 text-lg">{{ item.examDate }}</td>
              <td class="py-4 font-bold text-slate-700">{{ item.examTime }}</td>
              <td class="py-4 text-center">
                <span class="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold">{{ item.examRoom }}</span>
              </td>
              <td class="py-4 text-slate-600">{{ item.student }}</td>
              <td class="py-4 text-center">
                <button @click="openResultModal(item)" class="bg-[#1a1a40] hover:bg-emerald-600 text-white px-5 py-1.5 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 mx-auto">
                  <i class="bi bi-mortarboard"></i> บันทึกผลสอบจบ
                </button>
              </td>
            </tr>
            <tr v-if="scheduleList.length === 0">
              <td colspan="5" class="py-10 text-center text-slate-400 font-medium">ยังไม่มีตารางนัดสอบจบ</td>
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
        <h3 class="font-bold text-2xl text-center text-slate-900 mb-6">ระบุวันสอบจบ (CP2/CP3)</h3>
        
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
            <i class="bi bi-plus-circle-fill"></i> บันทึกตารางสอบจบ
          </button>
        </form>
      </div>
    </div>

    <div v-if="showResultModal" class="fixed inset-0 z-[101] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-in-out]">
      <div class="bg-white w-full max-w-[500px] rounded-[28px] p-6 md:p-8 shadow-2xl relative" @click.stop>
        <button @click="showResultModal = false" class="absolute top-4 right-4 text-slate-300 hover:text-rose-500 text-2xl transition-colors">
          <i class="bi bi-x-circle-fill"></i>
        </button>
        <h3 class="font-bold text-2xl text-center text-slate-900 mb-6">บันทึกผลการสอบจบ</h3>

        <form @submit.prevent="saveResult" class="space-y-5">
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
            <label class="font-bold text-slate-700 text-sm">ให้เกรด</label>
            <select v-model="resultForm.grade" class="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-[#1a1a40]">
             <option value="A">Grade A </option>
              <option value="B">Grade B+ </option>
              <option value="B">Grade B </option>
              <option value="C">Grade C </option>
              <option value="C">Grade C+ </option>
              <option value="D">Grade D </option>
              <option value="D">Grade D+ </option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-bold text-slate-700 text-sm">รายละเอียด / หมายเหตุ</label>
            <textarea v-model="resultForm.details" rows="3" placeholder="กรอกข้อเสนอแนะ การแก้ไขเล่ม..." class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#1a1a40] transition-all text-sm text-slate-700"></textarea>
          </div>

          <button type="submit" class="w-full bg-[#1a1a40] hover:bg-emerald-600 text-white font-bold text-base py-3 rounded-full mt-4 shadow-md flex justify-center items-center gap-2 transition-transform hover:scale-[1.02]">
            <i class="bi bi-cloud-check-fill"></i> ยืนยันบันทึกผลสอบจบ
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
const resultForm = ref({ projectId: null, status: 'pass', grade: 'A', details: '' })

const waitList = ref([
  { id: 4, title: 'เกมส่งเสริมการเรียนรู้คำศัพท์ภาษาอังกฤษแบบ AR', student: 'นางสาวรักเรียน เพียรศึกษา', date: '20/08/2026' }
])

const scheduleList = ref([
  { id: 5, title: 'ระบบ IoT ตรวจวัดคุณภาพดินอัจฉริยะ', student: 'นายเก่ง กล้าหาญ', examDate: '01/09/2026', examTime: '10:00 - 12:00', examRoom: 'IT-502' }
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
  resultForm.value.grade = 'A'
  resultForm.value.details = ''
  showResultModal.value = true
}

const saveSchedule = () => {
  alert('จัดตารางสอบจบเรียบร้อยแล้ว!')
  showScheduleModal.value = false
}

const saveResult = () => {
  const text = resultForm.value.status === 'pass' ? `ผ่าน (เกรด ${resultForm.value.grade})` : 'ไม่ผ่าน'
  alert(`บันทึกผลสอบจบสำเร็จ: ${text}\nรายละเอียด: ${resultForm.value.details}`)
  showResultModal.value = false
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>