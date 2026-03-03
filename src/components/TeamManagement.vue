<template>
  <div class="space-y-6">
    <div v-if="team.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(m, idx) in team" :key="m.id || idx" class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
        <div class="px-6 py-8 flex flex-col items-center text-center">
          <!-- Profile Image -->
          <div class="relative w-28 h-28 mb-4">
            <div class="w-full h-full overflow-hidden rounded-[50%] border-2 border-gray-100 shadow-md">
              <template v-if="m.image">
                <img :src="m.image" :alt="m.name" class="w-full h-full object-cover" />
              </template>
              <template v-else>
                <div class="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2a5 5 0 0110 0h2c0-3.866-3.134-7-7-7z"/></svg>
                </div>
              </template>
            </div>
          </div>

          <!-- Member Info -->
          <h3 class="font-bold text-lg text-gray-900">{{ m.name }}</h3>
          <a :href="'mailto:' + m.email" class="text-sm text-gray-600 mt-1">{{ m.email }}</a>
          <p class="text-xs text-gray-500 mt-2">{{ m.role || 'Team Member' }}</p>

          <!-- Status Badge -->
          <div class="mt-4">
            <span v-if="m.status === 'approved'" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              Approved
            </span>
            <span v-else-if="m.status === 'rejected'" class="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
              Rejected
            </span>
            <span v-else class="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              Pending
            </span>
          </div>

          <!-- Action Buttons -->
          <div v-if="m.status !== 'approved' && m.status !== 'rejected'" class="mt-6 flex gap-2 w-full">
            <button 
              @click="() => onApprove(m, idx)"
              :disabled="approving[idx]"
              class="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <template v-if="approving[idx]">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
              </template>
              <template v-else>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Approve
              </template>
            </button>
            <button 
              @click="() => onReject(m, idx)"
              :disabled="approving[idx]"
              class="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <template v-if="approving[idx]">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
              </template>
              <template v-else>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                Reject
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center py-12">
      <div class="text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">No team members</h3>
        <p class="text-gray-500">Your team is empty</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  team: any[]
}>()

const emit = defineEmits<{
  approve: [member: any, index: number]
  reject: [member: any, index: number]
}>()

const approving = ref<Record<number, boolean>>({})

function onApprove(member: any, index: number) {
  emit('approve', member, index)
}

function onReject(member: any, index: number) {
  emit('reject', member, index)
}

// Called from parent to set loading state
function setApproving(index: number, state: boolean) {
  approving.value[index] = state
}

defineExpose({ setApproving })
</script>

<style scoped>
/* layout uses Tailwind; keep scoped styles minimal */
</style>
