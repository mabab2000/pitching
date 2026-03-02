<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article v-for="p in projects" :key="p.id" class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div v-if="p.image" class="h-48 w-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
          <img :src="p.image" :alt="p.title" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
        </div>
        <div v-else class="h-48 w-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <svg class="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        </div>
        
        <div class="p-6">
          <div class="flex items-start justify-between mb-3">
            <h3 class="font-bold text-xl text-gray-900">{{ p.title }}</h3>
            <div class="text-right">
              <div class="text-xs text-gray-500 uppercase tracking-wide">Votes</div>
              <div class="text-2xl font-bold text-indigo-600">{{ p.votes }}</div>
            </div>
          </div>
          
          <p class="text-sm text-gray-600 leading-relaxed mb-4">{{ p.description }}</p>
          
          <div class="flex items-center gap-2 mb-4 text-sm text-gray-700">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span class="font-medium">{{ p.team }}</span>
          </div>
          
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              {{ p.stage }}
            </span>
            <span class="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ${{ p.requested.toLocaleString() }}
            </span>
          </div>
        </div>
        
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button class="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            View Details
          </button>

          <button @click="confirmDelete(p.id)" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4l1 4H9l1-4z"></path></svg>
            Delete
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
// defineProps is auto-imported in <script setup>

const props = defineProps<{ projects: any[] }>()
const emit = defineEmits(['delete'])

function confirmDelete(id: string | number) {
  if (!confirm('Delete this project? This action cannot be undone.')) return
  emit('delete', id)
}
</script>

<style scoped>
/* rely on Tailwind */
</style>
