<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="absolute inset-0" @click="$emit('close')"></div>
    <div class="bg-white rounded-2xl p-8 w-full max-w-md z-10 shadow-2xl transform transition-all">
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-gray-900">Welcome Back</h3>
        <p class="text-sm text-gray-600 mt-1">Sign in to your account to continue</p>
      </div>
      
      <form @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <input v-model="username" class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="you@example.com" />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <input type="password" v-model="password" class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Enter your password" />
          </div>
        </div>
        
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center">
            <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <span class="ml-2 text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-indigo-600 hover:text-indigo-700 font-medium">Forgot password?</a>
        </div>
        
        <div class="flex gap-3 mt-6">
          <button type="button" @click="$emit('close')" :disabled="props.submitting" class="flex-1 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button>
          <button type="submit" :disabled="!canSubmit || props.submitting" class="flex-1 px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <svg v-if="props.submitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ props.submitting ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </div>
      </form>
      
      <div class="mt-6 text-center text-sm text-gray-600">
        Don't have an account? <a href="/signup" class="text-indigo-600 hover:text-indigo-700 font-semibold">Sign up</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ submitting?: boolean }>()

const username = ref('')
const password = ref('')

const canSubmit = computed(() => username.value.trim() !== '' && password.value.trim() !== '')

function onSubmit() {
  const payload = { username: username.value.trim(), password: password.value }
  // emit payload to parent for handling (design-only, no backend)
  // @ts-ignore
  ;(emit as any)('submit', payload)
}

// helper for TypeScript emit in <script setup>
const emit = defineEmits(['close', 'submit'])
</script>

<style scoped>
/* no additional styles; use Tailwind */
</style>
