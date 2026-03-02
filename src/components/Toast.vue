<template>
  <Transition name="toast">
    <div v-if="show" class="fixed top-4 right-4 z-[9999] max-w-sm">
      <div :class="[
        'rounded-lg shadow-2xl p-4 flex items-start gap-3 border',
        type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
      ]">
        <div class="flex-shrink-0">
          <svg v-if="type === 'success'" class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="flex-1">
          <h3 :class="[
            'font-semibold text-sm',
            type === 'success' ? 'text-green-900' : 'text-red-900'
          ]">{{ title }}</h3>
          <p v-if="message" :class="[
            'text-sm mt-1',
            type === 'success' ? 'text-green-700' : 'text-red-700'
          ]">{{ message }}</p>
        </div>
        <button @click="close" :class="[
          'flex-shrink-0 rounded-lg p-1 hover:bg-white transition-colors',
          type === 'success' ? 'text-green-600' : 'text-red-600'
        ]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  show: boolean
  title: string
  message?: string
  type?: 'success' | 'error'
  duration?: number
}>()

const emit = defineEmits(['close'])

watch(() => props.show, (newVal) => {
  if (newVal && props.duration) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
})

function close() {
  emit('close')
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
