<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="m in team" :key="m.id" class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div class="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div class="px-6 pb-6 -mt-16">
        <div class="flex items-end justify-between mb-4">
          <img :src="m.image" :alt="m.name" class="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg" />
          <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            Email
          </button>
        </div>
        
        <div class="mb-4">
          <h3 class="font-bold text-xl text-gray-900 mb-1">{{ m.name }}</h3>
          <p class="text-sm text-indigo-600 font-medium flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            {{ m.role }}
          </p>
        </div>
        
        <p class="text-sm text-gray-600 leading-relaxed mb-4">{{ m.bio }}</p>
        
        <div class="pt-4 border-t border-gray-100">
          <a :href="`mailto:${m.email}`" class="text-sm text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span class="font-medium">{{ m.email }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// defineProps is auto-imported in <script setup>

const props = defineProps<{ team: any[] }>()
</script>

<style scoped>
/* Tailwind for styling */
</style>
