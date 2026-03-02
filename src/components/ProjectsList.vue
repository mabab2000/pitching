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
          
        
          
         
        </div>
        
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          

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
