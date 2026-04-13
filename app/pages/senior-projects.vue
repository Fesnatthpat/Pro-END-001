<template>
  <div class="max-w-[1140px] mx-auto w-full py-8">
    
    <h2 class="font-bold text-[28px] text-[#1a1a40] mb-6 flex items-center gap-2">
      <i class="bi bi-mortarboard-fill text-[#ffc107]"></i> ทำเนียบโครงงานรุ่นพี่
    </h2>

    <div class="bg-white p-6 rounded-[20px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] mb-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div class="md:col-span-4">
          <label class="block text-[0.95rem] font-bold text-gray-700 mb-2">ค้นหาโครงงาน</label>
          <input
            v-model="search"
            type="text"
            placeholder="ชื่อโครงงาน..."
            class="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a1a40]/20 focus:border-[#1a1a40] transition-all"
          />
        </div>

        <div class="md:col-span-3">
          <label class="block text-[0.95rem] font-bold text-gray-700 mb-2">ปีการศึกษา</label>
          <select
            v-model="yearFilter"
            class="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a1a40]/20 focus:border-[#1a1a40] appearance-none bg-white transition-all cursor-pointer"
          >
            <option value="">ทั้งหมด</option>
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>

        <div class="md:col-span-3">
          <label class="block text-[0.95rem] font-bold text-gray-700 mb-2">ประเภท</label>
          <select
            v-model="typeFilter"
            class="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a1a40]/20 focus:border-[#1a1a40] appearance-none bg-white transition-all cursor-pointer"
          >
            <option value="">ทั้งหมด</option>
            <option value="WEB">Web Application</option>
            <option value="APP">Mobile App</option>
            <option value="GAME">Game Development</option>
            <option value="IOT">IoT / Hardware</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <button
            class="w-full bg-[#1a1a40] text-white px-5 py-3 rounded-full hover:bg-[#2c2c54] transition-colors font-medium text-[0.95rem] flex items-center justify-center gap-2 shadow-md"
          >
            <i class="bi bi-search"></i> ค้นหา
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="filteredProjects.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full border border-gray-100 min-h-[320px]"
      >
        <div class="p-7 flex-grow flex flex-col">
          <div class="flex justify-between items-start mb-4">
            <span
              :class="[
                'text-xs font-bold px-3 py-1.5 rounded-lg tracking-wide',
                getTypeColor(project.type),
              ]"
            >
              {{ project.type || "OTHER" }}
            </span>
            <span
              class="text-xs text-gray-500 font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
            >
              ปี {{ project.year }}
            </span>
          </div>

          <h5
            class="font-bold text-[#1a1a40] text-[1.25rem] mb-2 line-clamp-2 leading-snug"
          >
            {{ project.nameTh }}
          </h5>
          <p class="text-gray-500 text-[0.95rem] mb-6 line-clamp-2">
            {{ project.nameEn }}
          </p>

          <div class="mt-auto pt-5 border-t border-gray-100">
            <NuxtLink
              to="/student/project-detail"
              class="block text-center w-full bg-transparent border-2 border-[#1a1a40] text-[#1a1a40] hover:bg-[#1a1a40] hover:text-white rounded-full py-2.5 text-[0.95rem] font-bold transition-colors duration-200"
            >
              ดูรายละเอียด
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="text-center py-20 bg-white rounded-[20px] border border-dashed border-gray-300"
    >
      <div
        class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5"
      >
        <i class="bi bi-inbox text-gray-300 text-5xl"></i>
      </div>
      <h4 class="text-xl font-bold text-gray-700">ไม่พบข้อมูลโครงงาน</h4>
      <p class="text-gray-500 mt-2 text-[0.95rem]">
        ลองปรับเปลี่ยนคำค้นหา หรือตัวกรองข้อมูลใหม่อีกครั้ง
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

useHead({
  title: "ทำเนียบโครงงานรุ่นพี่",
});

// === ตัวแปรสำหรับ Filter ===
const search = ref("");
const yearFilter = ref("");
const typeFilter = ref("");

// === ข้อมูลจำลอง (Mock Data) ===
const mockProjects = ref([
  {
    id: 1,
    year: "2566",
    type: "WEB",
    nameTh: "ระบบจัดการฟาร์มไก่อัจฉริยะ",
    nameEn: "Smart Poultry Farm Management System",
  },
  {
    id: 2,
    year: "2566",
    type: "APP",
    nameTh: "แอปพลิเคชันค้นหาร้านอาหารตามสั่ง",
    nameEn: "Custom Cooked Food Finder Application",
  },
  {
    id: 3,
    year: "2565",
    type: "GAME",
    nameTh: "เกมผจญภัยดันเจี้ยน 2 มิติเพื่อการศึกษา",
    nameEn: "2D Educational Dungeon Adventure Game",
  },
  {
    id: 4,
    year: "2565",
    type: "IOT",
    nameTh: "ระบบรดน้ำต้นไม้อัตโนมัติผ่านสมาร์ทโฟน",
    nameEn: "Automated Plant Watering System via Smartphone",
  },
  {
    id: 5,
    year: "2565",
    type: "WEB",
    nameTh: "ระบบบริหารจัดการโครงงานคอมพิวเตอร์",
    nameEn: "Computer Project Management System",
  },
  {
    id: 6,
    year: "2564",
    type: "OTHER",
    nameTh: "การวิเคราะห์ข้อมูลความพึงพอใจร้านกาแฟ",
    nameEn: "Coffee Shop Satisfaction Data Analysis",
  },
]);

// ดึงปีการศึกษา
const availableYears = computed(() => {
  const years = mockProjects.value.map((p) => p.year);
  return [...new Set(years)].sort((a, b) => b - a);
});

// ค้นหาและกรองข้อมูล
const filteredProjects = computed(() => {
  return mockProjects.value.filter((project) => {
    const matchSearch =
      project.nameTh.includes(search.value) ||
      project.nameEn.toLowerCase().includes(search.value.toLowerCase());
    const matchYear = yearFilter.value === "" || project.year === yearFilter.value;
    const matchType = typeFilter.value === "" || project.type === typeFilter.value;

    return matchSearch && matchYear && matchType;
  });
});

// สีของป้ายกำกับ
const getTypeColor = (type) => {
  const colors = {
    WEB: "bg-[#e3f2fd] text-[#0d47a1]",
    APP: "bg-[#f3e5f5] text-[#7b1fa2]",
    GAME: "bg-[#e8f5e9] text-[#1b5e20]",
    IOT: "bg-[#fff3e0] text-[#e65100]",
    OTHER: "bg-[#f5f5f5] text-[#616161]",
  };
  return colors[type] || colors["OTHER"];
};
</script>